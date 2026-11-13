import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  PaymentEngine,
  computeHmacSignature,
  containsSensitiveCardFields,
} from './payments';

function createTempEngine(
  opts: {
    nowFn?: () => number;
    verificationTimeoutMs?: number;
    webhookSecret?: string;
  } = {}
) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zw-pay-test-'));
  const storageFile = path.join(tmpDir, 'ledger.json');
  const engine = new PaymentEngine({
    storageFile,
    webhookSecret: opts.webhookSecret || 'test-webhook-secret-32chars-minimum!',
    verificationTimeoutMs: opts.verificationTimeoutMs ?? 120,
    syncLegacyEntitlements: false,
    nowFn: opts.nowFn,
  });
  return { engine, tmpDir, storageFile };
}

test('containsSensitiveCardFields detects raw card numbers and CVV codes', () => {
  assert.equal(containsSensitiveCardFields({ planId: 'monthly-pack-19' }), false);
  assert.equal(containsSensitiveCardFields({ cardNumber: '4242' }), true);
  assert.equal(containsSensitiveCardFields({ nested: { cvv: '123' } }), true);
  assert.equal(containsSensitiveCardFields({ PAN: '4111111111111111' }), true);
});

test('1. Order creation assigns unique order ID, enforces $19.00 USD server price, and rejects raw card data', async () => {
  const { engine, tmpDir } = createTempEngine();
  try {
    const rejected = await engine.createOrder({
      userId: 'stu-1',
      studentName: 'Ada',
      studentEmail: 'ada@example.com',
      planId: 'monthly-pack-19',
      rawPayload: { planId: 'monthly-pack-19', cvv: '999' },
    });
    assert.equal(rejected.success, false);

    const o1 = await engine.createOrder({
      userId: 'stu-1',
      studentName: 'Ada',
      studentEmail: 'ada@example.com',
      planId: 'monthly-pack-19',
    });
    const o2 = await engine.createOrder({
      userId: 'stu-1',
      studentName: 'Ada',
      studentEmail: 'ada@example.com',
      planId: 'monthly-pack-19',
    });

    assert.equal(o1.success, true);
    assert.equal(o2.success, true);
    assert.notEqual(o1.order!.orderId, o2.order!.orderId);
    assert.equal(o1.order!.grossAmountUsd, 19);
    assert.equal(o1.order!.amountCents, 1900);
    assert.equal(o1.order!.currency, 'USD');
    assert.equal(o1.order!.financialStatus, 'Payment Initiated');
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('2. Successful payment verifies server-side and automatically unlocks Monthly Pack while keeping settlement distinct', async () => {
  const fixedNow = Date.parse('2026-06-01T10:00:00.000Z');
  const { engine, tmpDir } = createTempEngine({ nowFn: () => fixedNow });
  try {
    // Before payment: Ch 00 free, Ch 01 locked
    assert.equal(engine.canAccessLesson('stu-1', 'ch-00-l-01', 'ch-00').allowed, true);
    assert.equal(engine.canAccessLesson('stu-1', 'ch-01-l-01', 'ch-01').allowed, false);

    const created = await engine.createOrder({
      userId: 'stu-1',
      studentName: 'Ada',
      studentEmail: 'ada@example.com',
      planId: 'monthly-pack-19',
    });
    assert.equal(created.success, true);
    const orderId = created.order!.orderId;

    engine.submitSandboxCheckoutDecision({
      orderId,
      userId: 'stu-1',
      scenario: 'succeed',
    });

    const verified = await engine.verifyOrderPayment({ orderId, userId: 'stu-1' });
    assert.equal(verified.success, true);
    assert.equal(verified.verified, true);
    assert.equal(verified.pendingVerification, false);
    assert.equal(verified.order!.financialStatus, 'Subscription Activated');
    assert.equal(verified.order!.settlementStatus, 'settlement_pending');
    assert.equal(verified.order!.payoutReference, null);
    assert.ok(verified.subscription);
    assert.equal(verified.subscription!.status, 'active');
    assert.equal(verified.subscription!.verifiedAmountUsd, 19);
    assert.ok(verified.subscription!.expiresAt);

    // Ch 01 and PDF access unlocked immediately
    assert.equal(engine.canAccessLesson('stu-1', 'ch-01-l-01', 'ch-01').allowed, true);
    const ent = engine.getStudentEntitlement('stu-1');
    assert.equal(ent.hasActiveMonthlyPack, true);
    assert.equal(ent.hasDownloadAccess, true);

    // Dashboard shows pending settlement (not funds settled!)
    const dash = engine.getMerchantDashboardSummary();
    assert.equal(dash.verifiedGrossUsd, 19);
    assert.equal(dash.settledNetUsd, 0);
    assert.ok(dash.pendingSettlementUsd > 0);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('3. Failed payment marks Payment Failed / Refunded and keeps paid chapters locked', async () => {
  const { engine, tmpDir } = createTempEngine();
  try {
    const created = await engine.createOrder({
      userId: 'stu-fail',
      studentName: 'Bob',
      studentEmail: 'bob@example.com',
      planId: 'monthly-pack-19',
    });
    const orderId = created.order!.orderId;

    engine.submitSandboxCheckoutDecision({
      orderId,
      userId: 'stu-fail',
      scenario: 'fail',
    });

    const verified = await engine.verifyOrderPayment({ orderId, userId: 'stu-fail' });
    assert.equal(verified.success, false);
    assert.equal(verified.verified, false);
    assert.equal(verified.statusCode, 402);
    assert.equal(verified.order!.financialStatus, 'Payment Failed / Refunded');
    assert.equal(engine.canAccessLesson('stu-fail', 'ch-01-l-01', 'ch-01').allowed, false);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('4. Delayed (>SLA timeout) or pending gateway response places order in Pending Verification without unlocking', async () => {
  const { engine, tmpDir } = createTempEngine({ verificationTimeoutMs: 60 });
  try {
    const created = await engine.createOrder({
      userId: 'stu-delay',
      studentName: 'Cara',
      studentEmail: 'cara@example.com',
      planId: 'monthly-pack-19',
    });
    const orderId = created.order!.orderId;

    engine.submitSandboxCheckoutDecision({
      orderId,
      userId: 'stu-delay',
      scenario: 'delayed_timeout',
    });

    const verified = await engine.verifyOrderPayment({ orderId, userId: 'stu-delay' });
    assert.equal(verified.success, true);
    assert.equal(verified.verified, false);
    assert.equal(verified.pendingVerification, true);
    assert.equal(verified.statusCode, 202);
    assert.equal(verified.order!.financialStatus, 'Payment Pending');
    assert.equal(engine.canAccessLesson('stu-delay', 'ch-01-l-01', 'ch-01').allowed, false);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('5 & 6. Duplicate verification, webhook signature verification, and webhook idempotency', async () => {
  const secret = 'whsec_super_secret_key_for_tests';
  const { engine, tmpDir } = createTempEngine({ webhookSecret: secret });
  try {
    const created = await engine.createOrder({
      userId: 'stu-wh',
      studentName: 'Dev',
      studentEmail: 'dev@example.com',
      planId: 'monthly-pack-19',
    });
    const orderId = created.order!.orderId;

    const payloadObj = {
      eventId: 'evt_unique_001',
      eventType: 'payment.succeeded',
      orderId,
      merchantTransactionId: 'gw_txn_99887766',
      amountCents: 1900,
      currency: 'USD',
    };
    const rawBody = JSON.stringify(payloadObj);

    // Missing / forged signature rejected
    const forged = await engine.handleSignedWebhook({
      rawBody,
      signatureHeader: '0'.repeat(64),
      payload: payloadObj,
    });
    assert.equal(forged.success, false);
    assert.equal(forged.statusCode, 401);
    assert.equal(engine.canAccessLesson('stu-wh', 'ch-01-l-01', 'ch-01').allowed, false);

    // Valid signature activates subscription
    const sig = computeHmacSignature(rawBody, secret);
    const valid = await engine.handleSignedWebhook({
      rawBody,
      signatureHeader: `sha256=${sig}`,
      payload: payloadObj,
    });
    assert.equal(valid.success, true);
    assert.equal(valid.statusCode, 200);
    assert.equal(engine.canAccessLesson('stu-wh', 'ch-01-l-01', 'ch-01').allowed, true);

    // Duplicate webhook + duplicate verify call remain strictly idempotent (1 subscription total)
    const dupWh = await engine.handleSignedWebhook({
      rawBody,
      signatureHeader: sig,
      payload: payloadObj,
    });
    assert.equal(dupWh.duplicate, true);

    const dupVerify = await engine.verifyOrderPayment({ orderId, userId: 'stu-wh' });
    assert.equal(dupVerify.verified, true);
    assert.equal(engine.getMerchantDashboardSummary().subscriptions.length, 1);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('7 & 8. Amount mismatch, transaction replay, and cross-student ownership mismatch are blocked', async () => {
  const secret = 'whsec_integrity_checks_123456';
  const { engine, tmpDir } = createTempEngine({ webhookSecret: secret });
  try {
    const o1 = await engine.createOrder({
      userId: 'stu-a',
      studentName: 'Alice',
      studentEmail: 'alice@example.com',
      planId: 'monthly-pack-19',
    });
    const o2 = await engine.createOrder({
      userId: 'stu-b',
      studentName: 'Bob',
      studentEmail: 'bob@example.com',
      planId: 'monthly-pack-19',
    });

    // Cross-student ownership check: stu-b tries to verify stu-a's order
    const stolenVerify = await engine.verifyOrderPayment({
      orderId: o1.order!.orderId,
      userId: 'stu-b',
    });
    assert.equal(stolenVerify.statusCode, 403);
    assert.equal(stolenVerify.verified, false);

    // Amount mismatch on o1
    engine.submitSandboxCheckoutDecision({
      orderId: o1.order!.orderId,
      userId: 'stu-a',
      scenario: 'amount_mismatch',
    });
    const mismatchRes = await engine.verifyOrderPayment({
      orderId: o1.order!.orderId,
      userId: 'stu-a',
    });
    assert.equal(mismatchRes.statusCode, 422);
    assert.equal(mismatchRes.verified, false);
    assert.equal(engine.canAccessLesson('stu-a', 'ch-01-l-01', 'ch-01').allowed, false);

    // Valid payment on o2 with txn_replay_ref
    engine.submitSandboxCheckoutDecision({
      orderId: o2.order!.orderId,
      userId: 'stu-b',
      scenario: 'succeed',
    });
    const okRes = await engine.verifyOrderPayment({
      orderId: o2.order!.orderId,
      userId: 'stu-b',
      verificationPayload: { merchantTransactionId: 'txn_shared_999999' },
    });
    assert.equal(okRes.verified, true);

    // Replay attempt using same merchantTransactionId on a fresh order for stu-a via webhook
    const o3 = await engine.createOrder({
      userId: 'stu-a',
      studentName: 'Alice',
      studentEmail: 'alice@example.com',
      planId: 'monthly-pack-19',
    });
    const replayPayload = {
      eventId: 'evt_replay_1',
      eventType: 'payment.succeeded',
      orderId: o3.order!.orderId,
      merchantTransactionId: 'txn_shared_999999',
      amountCents: 1900,
      currency: 'USD',
    };
    const raw = JSON.stringify(replayPayload);
    const sig = computeHmacSignature(raw, secret);
    const replayRes = await engine.handleSignedWebhook({
      rawBody: raw,
      signatureHeader: sig,
      payload: replayPayload,
    });
    assert.equal(replayRes.statusCode, 422);
    assert.equal(engine.canAccessLesson('stu-a', 'ch-01-l-01', 'ch-01').allowed, false);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('9 & 10. Subscription expiry, refund revocation, and settlement payout reconciliation', async () => {
  let fakeNow = Date.parse('2026-06-01T00:00:00.000Z');
  const { engine, tmpDir } = createTempEngine({ nowFn: () => fakeNow });
  try {
    const created = await engine.createOrder({
      userId: 'stu-life',
      studentName: 'Elena',
      studentEmail: 'elena@example.com',
      planId: 'monthly-pack-19',
    });
    const orderId = created.order!.orderId;

    engine.submitSandboxCheckoutDecision({
      orderId,
      userId: 'stu-life',
      scenario: 'succeed',
    });
    const verified = await engine.verifyOrderPayment({ orderId, userId: 'stu-life' });
    assert.equal(verified.verified, true);
    assert.equal(engine.canAccessLesson('stu-life', 'ch-02-l-01', 'ch-02').allowed, true);

    // Settlement reconciliation transitions Settlement Pending -> Funds Settled
    const settled = engine.reconcileOrderSettlement(orderId, 'PAYOUT-BANK-2026-01', '2026-06-03T12:00:00.000Z');
    assert.equal(settled.success, true);
    assert.equal(settled.order!.financialStatus, 'Funds Settled');
    assert.equal(settled.order!.payoutReference, 'PAYOUT-BANK-2026-01');
    const dash = engine.getMerchantDashboardSummary();
    assert.ok(dash.settledNetUsd > 0);
    assert.equal(dash.pendingSettlementUsd, 0);

    // Advance clock 31 days past 30-day expiry -> paid lessons lock, free Ch 00 remains allowed
    fakeNow += 31 * 24 * 60 * 60 * 1000;
    assert.equal(engine.canAccessLesson('stu-life', 'ch-02-l-01', 'ch-02').allowed, false);
    assert.equal(engine.canAccessLesson('stu-life', 'ch-00-l-01', 'ch-00').allowed, true);

    // New order + refund revokes immediately
    const created2 = await engine.createOrder({
      userId: 'stu-ref',
      studentName: 'Frank',
      studentEmail: 'frank@example.com',
      planId: 'monthly-pack-19',
    });
    engine.submitSandboxCheckoutDecision({
      orderId: created2.order!.orderId,
      userId: 'stu-ref',
      scenario: 'succeed',
    });
    await engine.verifyOrderPayment({ orderId: created2.order!.orderId, userId: 'stu-ref' });
    assert.equal(engine.canAccessLesson('stu-ref', 'ch-01-l-01', 'ch-01').allowed, true);

    const refunded = await engine.refundOrder(created2.order!.orderId, '14-day guarantee');
    assert.equal(refunded.success, true);
    assert.equal(refunded.order!.financialStatus, 'Payment Failed / Refunded');
    assert.equal(engine.canAccessLesson('stu-ref', 'ch-01-l-01', 'ch-01').allowed, false);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});
