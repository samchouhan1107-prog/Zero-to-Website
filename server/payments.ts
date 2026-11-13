import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import type {
  MerchantDashboardSummary,
  MerchantProviderType,
  PaidSubscriptionRecord,
  PaymentAuditLogEntry,
  PaymentOrderRecord,
  PlanCatalogItem,
  StudentEntitlementSummary,
} from '../src/shared/paymentTypes';
import { grantUserAccess, revokeGrantsByTransactionId } from './ownership-licensing';
import { subscribeOrUpdate } from './subscriptions';

/**
 * ============================================================================
 * SECURE MERCHANT PAYMENT, VERIFICATION & SUBSCRIPTION ENGINE
 * Platform Owner & Publisher: Sameer Chouhan / WebZoneBW
 *
 * Security invariants:
 * - Secret keys & webhook secrets remain strictly on backend.
 * - Never invents live merchant credentials when env vars are unset.
 * - Never stores raw card numbers or CVV codes.
 * - Verifies payment status, exact USD amount, currency, ownership, and
 *   transaction uniqueness via server-side merchant API / signed webhooks.
 * - Distinguishes Payment Successful / Subscription Activated from Settlement
 *   Pending / Funds Settled.
 * ============================================================================
 */

export const PLAN_CATALOG: Record<string, PlanCatalogItem> = {
  'monthly-pack-19': {
    planId: 'monthly-pack-19',
    licenceType: 'subscription-access',
    contentId: 'curriculum-core-webzone',
    title: 'Weekly Learning Membership — Monthly Pack',
    description:
      'Unlocks all 11 core engineering chapters, weekly curriculum releases, and downloadable PDF study packs for 30 days.',
    amountUsd: 19.0,
    amountCents: 1900,
    currency: 'USD',
    durationDays: 30,
    isRecurringMonthly: true,
  },
  'downloadable-learning-29': {
    planId: 'downloadable-learning-29',
    licenceType: 'downloadable-learning',
    contentId: 'curriculum-core-webzone',
    title: 'Downloadable Study Pack Licence',
    description: 'Lifetime personal offline PDF study pack downloads for the core curriculum.',
    amountUsd: 29.0,
    amountCents: 2900,
    currency: 'USD',
    durationDays: null,
    isRecurringMonthly: false,
  },
  'commercial-use-149': {
    planId: 'commercial-use-149',
    licenceType: 'commercial-use',
    contentId: 'curriculum-core-webzone',
    title: 'Commercial & Team Training Licence',
    description: 'Annual organization licence covering up to 25 team members.',
    amountUsd: 149.0,
    amountCents: 14900,
    currency: 'USD',
    durationDays: 365,
    isRecurringMonthly: false,
  },
};

export interface MerchantVerificationOutcome {
  status: 'succeeded' | 'pending' | 'failed';
  merchantTransactionId?: string;
  amountCents?: number;
  currency?: string;
  paymentMethodSummary?: string;
  failureReason?: string;
}

export interface MerchantAdapter {
  provider: MerchantProviderType;
  liveCredentialsConfigured: boolean;
  providerModeLabel: string;
  createCheckoutSession(order: PaymentOrderRecord): Promise<{
    providerOrderRef: string;
    checkoutUrl: string;
  }>;
  verifyPaymentWithMerchant(
    order: PaymentOrderRecord,
    verificationPayload?: Record<string, unknown>
  ): Promise<MerchantVerificationOutcome>;
  refundPaymentWithMerchant(
    order: PaymentOrderRecord,
    reason?: string
  ): Promise<{ refunded: boolean; refundRef?: string; reason?: string }>;
}

export interface SandboxIntentState {
  scenario: 'succeed' | 'pending' | 'delayed_timeout' | 'fail' | 'amount_mismatch';
  submittedAt?: string;
  forcedDelayMs?: number;
  amountCentsOverride?: number;
  currencyOverride?: string;
  paymentMethodSummary?: string;
}

interface PersistedPaymentLedger {
  orders: PaymentOrderRecord[];
  subscriptions: PaidSubscriptionRecord[];
  auditLogs: PaymentAuditLogEntry[];
  processedWebhookEventIds: string[];
  sandboxIntents: Record<string, SandboxIntentState>;
}

const CARD_FIELD_KEYS = new Set([
  'cardnumber',
  'card_number',
  'pan',
  'cvv',
  'cvc',
  'securitycode',
  'expiry',
  'exp_month',
  'exp_year',
]);

export function containsSensitiveCardFields(payload: unknown): boolean {
  if (!payload || typeof payload !== 'object') return false;
  for (const [key, val] of Object.entries(payload as Record<string, unknown>)) {
    const normalized = key.toLowerCase().replace(/[^a-z_]/g, '');
    if (CARD_FIELD_KEYS.has(normalized)) return true;
    if (val && typeof val === 'object' && containsSensitiveCardFields(val)) return true;
  }
  return false;
}

export function detectConfiguredMerchantProvider(): {
  provider: MerchantProviderType;
  liveCredentialsConfigured: boolean;
  providerModeLabel: string;
} {
  if (process.env.STRIPE_SECRET_KEY) {
    return {
      provider: 'stripe',
      liveCredentialsConfigured: true,
      providerModeLabel: 'Stripe Merchant API (Live Env Configured)',
    };
  }
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    return {
      provider: 'razorpay',
      liveCredentialsConfigured: true,
      providerModeLabel: 'Razorpay Merchant API (Live Env Configured)',
    };
  }
  return {
    provider: 'webzone-sandbox',
    liveCredentialsConfigured: false,
    providerModeLabel: 'WebZone Merchant Sandbox (No live merchant keys configured in env)',
  };
}

export function resolvePlanByInput(planId?: string, licenceType?: string): PlanCatalogItem | null {
  if (planId && PLAN_CATALOG[planId]) {
    return PLAN_CATALOG[planId];
  }
  if (licenceType === 'subscription-access') return PLAN_CATALOG['monthly-pack-19'];
  if (licenceType === 'downloadable-learning') return PLAN_CATALOG['downloadable-learning-29'];
  if (licenceType === 'commercial-use') return PLAN_CATALOG['commercial-use-149'];
  return null;
}

export function computeHmacSignature(rawBody: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex');
}

export function verifyHmacSignature(rawBody: string, signatureHeader: string | undefined, secret: string): boolean {
  if (!signatureHeader || !secret) return false;
  const cleaned = signatureHeader.replace(/^sha256=/i, '').trim();
  if (!/^[a-f0-9]{64}$/i.test(cleaned)) return false;
  const expected = computeHmacSignature(rawBody, secret);
  const actualBuf = Buffer.from(cleaned.toLowerCase(), 'utf8');
  const expectedBuf = Buffer.from(expected.toLowerCase(), 'utf8');
  if (actualBuf.length !== expectedBuf.length) return false;
  return crypto.timingSafeEqual(actualBuf, expectedBuf);
}

export interface PaymentEngineOptions {
  storageFile?: string;
  webhookSecret?: string;
  verificationTimeoutMs?: number;
  adapterOverride?: MerchantAdapter;
  syncLegacyEntitlements?: boolean;
  nowFn?: () => number;
}

export class PaymentEngine {
  private storageFile: string;
  private webhookSecret: string;
  private verificationTimeoutMs: number;
  private adapterOverride?: MerchantAdapter;
  private syncLegacyEntitlements: boolean;
  private nowFn: () => number;
  private state: PersistedPaymentLedger;

  constructor(options: PaymentEngineOptions = {}) {
    this.storageFile =
      options.storageFile || path.join(process.cwd(), 'server', 'payment-ledger.json');
    this.webhookSecret =
      options.webhookSecret ||
      process.env.STRIPE_WEBHOOK_SECRET ||
      process.env.MERCHANT_WEBHOOK_SECRET ||
      crypto.randomBytes(32).toString('hex');
    this.verificationTimeoutMs = options.verificationTimeoutMs ?? 8500; // 5-10s verification SLA window
    this.adapterOverride = options.adapterOverride;
    this.syncLegacyEntitlements = options.syncLegacyEntitlements ?? true;
    this.nowFn = options.nowFn || (() => Date.now());
    this.state = this.loadState();
  }

  private loadState(): PersistedPaymentLedger {
    try {
      if (fs.existsSync(this.storageFile)) {
        const parsed = JSON.parse(fs.readFileSync(this.storageFile, 'utf-8'));
        return {
          orders: Array.isArray(parsed.orders) ? parsed.orders : [],
          subscriptions: Array.isArray(parsed.subscriptions) ? parsed.subscriptions : [],
          auditLogs: Array.isArray(parsed.auditLogs) ? parsed.auditLogs : [],
          processedWebhookEventIds: Array.isArray(parsed.processedWebhookEventIds)
            ? parsed.processedWebhookEventIds
            : [],
          sandboxIntents: parsed.sandboxIntents || {},
        };
      }
    } catch (err) {
      console.warn('[PaymentEngine] Failed to read ledger from disk, starting fresh:', err);
    }
    return {
      orders: [],
      subscriptions: [],
      auditLogs: [],
      processedWebhookEventIds: [],
      sandboxIntents: {},
    };
  }

  private saveState(): void {
    try {
      const dir = path.dirname(this.storageFile);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.storageFile, JSON.stringify(this.state, null, 2), 'utf-8');
    } catch (err) {
      console.warn('[PaymentEngine] Failed to persist payment ledger:', err);
    }
  }

  private appendAudit(
    eventType: PaymentAuditLogEntry['eventType'],
    actor: PaymentAuditLogEntry['actor'],
    message: string,
    extra: Partial<PaymentAuditLogEntry> = {}
  ): void {
    const entry: PaymentAuditLogEntry = {
      id: `aud-${this.nowFn()}-${crypto.randomBytes(4).toString('hex')}`,
      timestamp: new Date(this.nowFn()).toISOString(),
      eventType,
      actor,
      message,
      ...extra,
    };
    this.state.auditLogs.unshift(entry);
    if (this.state.auditLogs.length > 500) {
      this.state.auditLogs = this.state.auditLogs.slice(0, 500);
    }
  }

  public getWebhookSecretForTesting(): string {
    return this.webhookSecret;
  }

  private getAdapter(): MerchantAdapter {
    if (this.adapterOverride) return this.adapterOverride;

    const detected = detectConfiguredMerchantProvider();
    if (detected.provider === 'stripe' && process.env.STRIPE_SECRET_KEY) {
      return this.createStripeAdapter(process.env.STRIPE_SECRET_KEY);
    }
    if (
      detected.provider === 'razorpay' &&
      process.env.RAZORPAY_KEY_ID &&
      process.env.RAZORPAY_KEY_SECRET
    ) {
      return this.createRazorpayAdapter(
        process.env.RAZORPAY_KEY_ID,
        process.env.RAZORPAY_KEY_SECRET
      );
    }
    return this.createSandboxAdapter();
  }

  private createStripeAdapter(secretKey: string): MerchantAdapter {
    return {
      provider: 'stripe',
      liveCredentialsConfigured: true,
      providerModeLabel: 'Stripe Merchant API (HTTPS)',
      createCheckoutSession: async (order) => {
        const params = new URLSearchParams();
        params.set('mode', 'payment');
        params.set('success_url', `${process.env.APP_ORIGIN || 'https://webzonebw.shop'}/?payment_status=return&orderId=${encodeURIComponent(order.orderId)}&session_id={CHECKOUT_SESSION_ID}`);
        params.set('cancel_url', `${process.env.APP_ORIGIN || 'https://webzonebw.shop'}/?payment_status=cancelled&orderId=${encodeURIComponent(order.orderId)}`);
        params.set('client_reference_id', order.orderId);
        params.set('customer_email', order.studentEmail);
        params.set('line_items[0][price_data][currency]', 'usd');
        params.set('line_items[0][price_data][product_data][name]', order.planTitle);
        params.set('line_items[0][price_data][unit_amount]', String(order.amountCents));
        params.set('line_items[0][quantity]', '1');
        params.set('metadata[orderId]', order.orderId);
        params.set('metadata[userId]', order.userId);
        params.set('metadata[planId]', order.planId);

        const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${secretKey}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Idempotency-Key': order.idempotencyKey,
          },
          body: params.toString(),
        });
        const data: any = await res.json();
        if (!res.ok || !data?.id) {
          throw new Error(data?.error?.message || 'Stripe session creation failed');
        }
        return {
          providerOrderRef: data.id,
          checkoutUrl: data.url || '',
        };
      },
      verifyPaymentWithMerchant: async (order) => {
        const res = await fetch(
          `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(order.providerOrderRef)}`,
          {
            headers: { Authorization: `Bearer ${secretKey}` },
          }
        );
        const session: any = await res.json();
        if (!res.ok) {
          return {
            status: 'failed',
            failureReason: session?.error?.message || 'Stripe verification query failed',
          };
        }
        if (session.payment_status === 'paid' && session.status === 'complete') {
          return {
            status: 'succeeded',
            merchantTransactionId: String(session.payment_intent || session.id),
            amountCents: Number(session.amount_total),
            currency: String(session.currency || '').toUpperCase(),
            paymentMethodSummary: 'Stripe Hosted Checkout',
          };
        }
        if (session.status === 'expired') {
          return { status: 'failed', failureReason: 'Checkout session expired' };
        }
        return { status: 'pending' };
      },
      refundPaymentWithMerchant: async (order, reason) => {
        if (!order.merchantTransactionId) {
          return { refunded: false, reason: 'Missing payment intent ID' };
        }
        const params = new URLSearchParams();
        params.set('payment_intent', order.merchantTransactionId);
        if (reason) params.set('reason', 'requested_by_customer');
        const res = await fetch('https://api.stripe.com/v1/refunds', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${secretKey}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        });
        const data: any = await res.json();
        if (!res.ok) {
          return { refunded: false, reason: data?.error?.message || 'Stripe refund failed' };
        }
        return { refunded: true, refundRef: data.id };
      },
    };
  }

  private createRazorpayAdapter(keyId: string, keySecret: string): MerchantAdapter {
    const authToken = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    return {
      provider: 'razorpay',
      liveCredentialsConfigured: true,
      providerModeLabel: 'Razorpay Merchant API (HTTPS)',
      createCheckoutSession: async (order) => {
        const res = await fetch('https://api.razorpay.com/v1/orders', {
          method: 'POST',
          headers: {
            Authorization: `Basic ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: order.amountCents,
            currency: order.currency,
            receipt: order.orderId,
            notes: {
              orderId: order.orderId,
              userId: order.userId,
              planId: order.planId,
            },
          }),
        });
        const data: any = await res.json();
        if (!res.ok || !data?.id) {
          throw new Error(data?.error?.description || 'Razorpay order creation failed');
        }
        return {
          providerOrderRef: data.id,
          checkoutUrl: `/merchant-checkout?orderId=${encodeURIComponent(order.orderId)}&providerOrderRef=${encodeURIComponent(data.id)}`,
        };
      },
      verifyPaymentWithMerchant: async (order, verificationPayload) => {
        const paymentId = String(verificationPayload?.merchantPaymentId || '');
        if (!paymentId) return { status: 'pending' };
        const res = await fetch(
          `https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`,
          { headers: { Authorization: `Basic ${authToken}` } }
        );
        const payment: any = await res.json();
        if (!res.ok) {
          return { status: 'failed', failureReason: payment?.error?.description || 'Razorpay lookup failed' };
        }
        if (payment.status === 'captured') {
          return {
            status: 'succeeded',
            merchantTransactionId: payment.id,
            amountCents: Number(payment.amount),
            currency: String(payment.currency || '').toUpperCase(),
            paymentMethodSummary: `Razorpay (${payment.method || 'checkout'})`,
          };
        }
        if (payment.status === 'failed') {
          return { status: 'failed', failureReason: payment.error_description || 'Payment failed at gateway' };
        }
        return { status: 'pending' };
      },
      refundPaymentWithMerchant: async (order) => {
        if (!order.merchantTransactionId) {
          return { refunded: false, reason: 'Missing Razorpay payment ID' };
        }
        const res = await fetch(
          `https://api.razorpay.com/v1/payments/${encodeURIComponent(order.merchantTransactionId)}/refund`,
          {
            method: 'POST',
            headers: {
              Authorization: `Basic ${authToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: order.amountCents }),
          }
        );
        const data: any = await res.json();
        if (!res.ok) return { refunded: false, reason: data?.error?.description || 'Refund failed' };
        return { refunded: true, refundRef: data.id };
      },
    };
  }

  private createSandboxAdapter(): MerchantAdapter {
    return {
      provider: 'webzone-sandbox',
      liveCredentialsConfigured: false,
      providerModeLabel: 'WebZone Merchant Sandbox (Test Mode — no live merchant keys configured)',
      createCheckoutSession: async (order) => {
        const ref = `sbx_sess_${crypto.randomBytes(6).toString('hex')}`;
        return {
          providerOrderRef: ref,
          checkoutUrl: `/sandbox-merchant/checkout?orderId=${encodeURIComponent(order.orderId)}&session=${ref}`,
        };
      },
      verifyPaymentWithMerchant: async (order, verificationPayload) => {
        const intent = this.state.sandboxIntents[order.orderId];
        const scenario =
          (verificationPayload?.sandboxScenario as SandboxIntentState['scenario']) ||
          intent?.scenario ||
          'pending';

        const forcedDelayMs =
          typeof intent?.forcedDelayMs === 'number'
            ? intent.forcedDelayMs
            : scenario === 'delayed_timeout'
            ? this.verificationTimeoutMs + 250
            : 0;

        if (forcedDelayMs > 0) {
          await new Promise((resolve) =>
            setTimeout(resolve, Math.min(forcedDelayMs, this.verificationTimeoutMs + 100))
          );
        }

        if (scenario === 'pending' || scenario === 'delayed_timeout') {
          return { status: 'pending' };
        }
        if (scenario === 'fail') {
          return {
            status: 'failed',
            failureReason: 'Payment declined by sandbox issuer / insufficient test funds.',
          };
        }
        if (scenario === 'amount_mismatch') {
          return {
            status: 'succeeded',
            merchantTransactionId: `sbx_txn_${crypto.randomBytes(6).toString('hex')}`,
            amountCents: intent?.amountCentsOverride ?? Math.max(100, order.amountCents - 500),
            currency: intent?.currencyOverride ?? order.currency,
            paymentMethodSummary: 'Sandbox Merchant Gateway',
          };
        }
        if (scenario === 'succeed') {
          const txnId =
            (typeof verificationPayload?.merchantTransactionId === 'string' &&
              verificationPayload.merchantTransactionId) ||
            `sbx_txn_${crypto.randomBytes(6).toString('hex')}`;
          return {
            status: 'succeeded',
            merchantTransactionId: txnId,
            amountCents: order.amountCents,
            currency: order.currency,
            paymentMethodSummary:
              intent?.paymentMethodSummary || 'WebZone Merchant Sandbox (Verified Test Authorization)',
          };
        }
        return { status: 'pending' };
      },
      refundPaymentWithMerchant: async () => {
        return {
          refunded: true,
          refundRef: `sbx_ref_${crypto.randomBytes(5).toString('hex')}`,
        };
      },
    };
  }

  public async createOrder(input: {
    userId: string;
    studentName: string;
    studentEmail: string;
    planId?: string;
    licenceType?: string;
    rawPayload?: unknown;
  }): Promise<{ success: boolean; order?: PaymentOrderRecord; error?: string }> {
    if (containsSensitiveCardFields(input.rawPayload)) {
      this.appendAudit(
        'SECURITY_REJECTION',
        'system',
        'Rejected request containing prohibited raw card or CVV fields.',
        { userId: input.userId }
      );
      this.saveState();
      return {
        success: false,
        error: 'Raw card numbers and CVV details must never be transmitted to or stored by the platform.',
      };
    }

    if (!input.userId || !input.studentEmail) {
      return {
        success: false,
        error: 'An authenticated student account with an email address is required before starting checkout.',
      };
    }

    const plan = resolvePlanByInput(input.planId, input.licenceType);
    if (!plan) {
      return { success: false, error: 'Selected subscription or licence plan does not exist.' };
    }

    const adapter = this.getAdapter();
    const nowIso = new Date(this.nowFn()).toISOString();
    const orderId = `ORD-${this.nowFn().toString(36).toUpperCase()}-${crypto
      .randomBytes(3)
      .toString('hex')
      .toUpperCase()}`;
    const idempotencyKey = `idem_${crypto.randomBytes(12).toString('hex')}`;

    const order: PaymentOrderRecord = {
      orderId,
      idempotencyKey,
      userId: input.userId,
      studentName: input.studentName || 'Student',
      studentEmail: input.studentEmail.toLowerCase(),
      planId: plan.planId,
      planTitle: plan.title,
      contentId: plan.contentId,
      licenceType: plan.licenceType,
      provider: adapter.provider,
      providerOrderRef: '',
      checkoutUrl: '',
      grossAmountUsd: plan.amountUsd,
      amountCents: plan.amountCents,
      currency: plan.currency,
      paymentStatus: 'initiated',
      financialStatus: 'Payment Initiated',
      merchantTransactionId: null,
      merchantPaymentMethodSummary: null,
      verificationTimeMs: null,
      verifiedAt: null,
      subscriptionId: null,
      subscriptionActivated: false,
      settlementStatus: 'not_applicable',
      merchantFeeUsd: 0,
      netSettlementUsd: 0,
      payoutReference: null,
      settledAt: null,
      bankDepositNote:
        'Awaiting merchant payment completion. Bank settlement is reported only after merchant payout reconciliation.',
      failureReason: null,
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    const session = await adapter.createCheckoutSession(order);
    order.providerOrderRef = session.providerOrderRef;
    order.checkoutUrl = session.checkoutUrl;

    this.state.orders.unshift(order);
    this.appendAudit(
      'ORDER_CREATED',
      'student',
      `Created order ${order.orderId} for ${plan.title} ($${plan.amountUsd.toFixed(2)} ${plan.currency}) via ${adapter.provider}.`,
      { orderId: order.orderId, userId: order.userId }
    );
    this.saveState();

    return { success: true, order };
  }

  public submitSandboxCheckoutDecision(input: {
    orderId: string;
    userId: string;
    scenario: SandboxIntentState['scenario'];
    paymentMethodSummary?: string;
    amountCentsOverride?: number;
    currencyOverride?: string;
    forcedDelayMs?: number;
  }): { success: boolean; order?: PaymentOrderRecord; error?: string } {
    const order = this.state.orders.find((o) => o.orderId === input.orderId);
    if (!order) {
      return { success: false, error: 'Order not found.' };
    }
    if (order.userId !== input.userId) {
      this.appendAudit(
        'SECURITY_REJECTION',
        'student',
        `Unauthorized checkout submission attempt for order ${order.orderId} by user ${input.userId}.`,
        { orderId: order.orderId, userId: input.userId }
      );
      this.saveState();
      return { success: false, error: 'Order does not belong to the authenticated student account.' };
    }
    if (order.paymentStatus === 'succeeded' && order.subscriptionActivated) {
      return { success: true, order };
    }

    this.state.sandboxIntents[order.orderId] = {
      scenario: input.scenario,
      submittedAt: new Date(this.nowFn()).toISOString(),
      paymentMethodSummary: input.paymentMethodSummary,
      amountCentsOverride: input.amountCentsOverride,
      currencyOverride: input.currencyOverride,
      forcedDelayMs: input.forcedDelayMs,
    };
    order.paymentStatus = 'pending_verification';
    order.financialStatus = 'Payment Pending';
    order.updatedAt = new Date(this.nowFn()).toISOString();

    this.appendAudit(
      'CHECKOUT_SUBMITTED',
      'student',
      `Checkout submitted for ${order.orderId}; awaiting server-side merchant verification.`,
      { orderId: order.orderId, userId: order.userId }
    );
    this.saveState();
    return { success: true, order };
  }

  public async verifyOrderPayment(input: {
    orderId: string;
    userId: string;
    verificationPayload?: Record<string, unknown>;
  }): Promise<{
    success: boolean;
    verified: boolean;
    pendingVerification: boolean;
    statusCode: number;
    order?: PaymentOrderRecord;
    subscription?: PaidSubscriptionRecord | null;
    error?: string;
  }> {
    if (containsSensitiveCardFields(input.verificationPayload)) {
      return {
        success: false,
        verified: false,
        pendingVerification: false,
        statusCode: 400,
        error: 'Raw card or CVV fields are prohibited.',
      };
    }

    const order = this.state.orders.find((o) => o.orderId === input.orderId);
    if (!order) {
      return {
        success: false,
        verified: false,
        pendingVerification: false,
        statusCode: 404,
        error: 'Order not found.',
      };
    }

    if (order.userId !== input.userId) {
      this.appendAudit(
        'SECURITY_REJECTION',
        'student',
        `User ${input.userId} attempted to verify order ${order.orderId} belonging to ${order.userId}.`,
        { orderId: order.orderId, userId: input.userId }
      );
      this.saveState();
      return {
        success: false,
        verified: false,
        pendingVerification: false,
        statusCode: 403,
        error: 'Access denied: order ownership mismatch.',
      };
    }

    // Idempotent return if already verified and activated
    if (order.paymentStatus === 'succeeded' && order.subscriptionActivated && order.subscriptionId) {
      const existingSub =
        this.state.subscriptions.find((s) => s.subscriptionId === order.subscriptionId) || null;
      return {
        success: true,
        verified: true,
        pendingVerification: false,
        statusCode: 200,
        order,
        subscription: existingSub,
      };
    }

    if (order.paymentStatus === 'failed' || order.paymentStatus === 'refunded') {
      return {
        success: false,
        verified: false,
        pendingVerification: false,
        statusCode: 402,
        order,
        subscription: null,
        error: order.failureReason || 'Payment failed or refunded.',
      };
    }

    const startedAt = this.nowFn();
    this.appendAudit(
      'VERIFICATION_STARTED',
      'merchant-api',
      `Verifying order ${order.orderId} via ${order.provider} merchant API.`,
      { orderId: order.orderId, userId: order.userId }
    );

    const adapter = this.getAdapter();

    let outcome: MerchantVerificationOutcome;
    let timedOut = false;

    try {
      const timeoutPromise = new Promise<MerchantVerificationOutcome>((resolve) => {
        setTimeout(() => {
          timedOut = true;
          resolve({ status: 'pending' });
        }, this.verificationTimeoutMs);
      });

      outcome = await Promise.race([
        adapter.verifyPaymentWithMerchant(order, input.verificationPayload),
        timeoutPromise,
      ]);
    } catch (err: any) {
      outcome = {
        status: 'failed',
        failureReason: err?.message || 'Merchant API communication error.',
      };
    }

    const elapsedMs = Math.max(1, this.nowFn() - startedAt);
    order.verificationTimeMs = elapsedMs;
    order.updatedAt = new Date(this.nowFn()).toISOString();

    if (timedOut || outcome.status === 'pending') {
      order.paymentStatus = 'pending_verification';
      order.financialStatus = 'Payment Pending';
      this.appendAudit(
        'VERIFICATION_PENDING',
        'merchant-api',
        timedOut
          ? `Verification for ${order.orderId} exceeded ${this.verificationTimeoutMs}ms target; placed in Pending Verification.`
          : `Merchant returned pending status for ${order.orderId}; awaiting confirmation.`,
        { orderId: order.orderId, userId: order.userId }
      );
      this.saveState();
      return {
        success: true,
        verified: false,
        pendingVerification: true,
        statusCode: 202,
        order,
        subscription: null,
      };
    }

    if (outcome.status === 'failed') {
      order.paymentStatus = 'failed';
      order.financialStatus = 'Payment Failed / Refunded';
      order.failureReason = outcome.failureReason || 'Merchant declined payment.';
      order.settlementStatus = 'not_applicable';
      order.bankDepositNote = 'No funds collected — payment failed at merchant gateway.';
      this.appendAudit(
        'VERIFICATION_FAILED',
        'merchant-api',
        `Payment verification failed for ${order.orderId}: ${order.failureReason}`,
        { orderId: order.orderId, userId: order.userId }
      );
      this.saveState();
      return {
        success: false,
        verified: false,
        pendingVerification: false,
        statusCode: 402,
        order,
        subscription: null,
        error: order.failureReason,
      };
    }

    // Merchant returned 'succeeded' — perform strict server-side integrity validation
    const activation = this.finalizeVerifiedPayment(order, outcome, 'merchant-api');
    if (!activation.ok) {
      return {
        success: false,
        verified: false,
        pendingVerification: false,
        statusCode: 422,
        order,
        subscription: null,
        error: activation.error,
      };
    }

    return {
      success: true,
      verified: true,
      pendingVerification: false,
      statusCode: 200,
      order,
      subscription: activation.subscription,
    };
  }

  private finalizeVerifiedPayment(
    order: PaymentOrderRecord,
    outcome: MerchantVerificationOutcome,
    actor: 'merchant-api' | 'webhook'
  ): { ok: true; subscription: PaidSubscriptionRecord } | { ok: false; error: string } {
    const nowIso = new Date(this.nowFn()).toISOString();

    if (!outcome.merchantTransactionId || outcome.merchantTransactionId.trim().length < 6) {
      order.paymentStatus = 'failed';
      order.financialStatus = 'Payment Failed / Refunded';
      order.failureReason = 'Invalid or missing merchant transaction reference.';
      this.appendAudit(
        'SECURITY_REJECTION',
        actor,
        `Rejected order ${order.orderId}: invalid merchant transaction reference.`,
        { orderId: order.orderId, userId: order.userId }
      );
      this.saveState();
      return { ok: false, error: order.failureReason };
    }

    // Verify amount & currency match server order
    const verifiedCurrency = String(outcome.currency || '').toUpperCase();
    if (outcome.amountCents !== order.amountCents || verifiedCurrency !== order.currency) {
      order.paymentStatus = 'failed';
      order.financialStatus = 'Payment Failed / Refunded';
      order.failureReason = `Amount/currency mismatch: expected ${order.amountCents} ${order.currency}, received ${outcome.amountCents} ${verifiedCurrency}.`;
      this.appendAudit(
        'SECURITY_REJECTION',
        actor,
        `Security rejection on ${order.orderId}: ${order.failureReason}`,
        { orderId: order.orderId, userId: order.userId, merchantTransactionId: outcome.merchantTransactionId }
      );
      this.saveState();
      return { ok: false, error: order.failureReason };
    }

    // Replay check: ensure merchantTransactionId was not already used for a different order
    const replayOrder = this.state.orders.find(
      (o) =>
        o.orderId !== order.orderId &&
        o.merchantTransactionId === outcome.merchantTransactionId &&
        (o.paymentStatus === 'succeeded' || o.subscriptionActivated)
    );
    if (replayOrder) {
      order.paymentStatus = 'failed';
      order.financialStatus = 'Payment Failed / Refunded';
      order.failureReason = `Duplicate merchant transaction reference (${outcome.merchantTransactionId}) already claimed by order ${replayOrder.orderId}.`;
      this.appendAudit(
        'SECURITY_REJECTION',
        actor,
        `Blocked replay attack on ${order.orderId} using already-settled transaction ${outcome.merchantTransactionId}.`,
        { orderId: order.orderId, userId: order.userId, merchantTransactionId: outcome.merchantTransactionId }
      );
      this.saveState();
      return { ok: false, error: order.failureReason };
    }

    // If subscription already activated for this order, return idempotently
    if (order.subscriptionActivated && order.subscriptionId) {
      const existingSub = this.state.subscriptions.find(
        (s) => s.subscriptionId === order.subscriptionId
      );
      if (existingSub) {
        return { ok: true, subscription: existingSub };
      }
    }

    const feeUsd = Number((order.grossAmountUsd * 0.029 + 0.3).toFixed(2));
    const netUsd = Number(Math.max(0, order.grossAmountUsd - feeUsd).toFixed(2));

    order.paymentStatus = 'succeeded';
    order.merchantTransactionId = outcome.merchantTransactionId;
    order.merchantPaymentMethodSummary =
      outcome.paymentMethodSummary || `${order.provider} verified`;
    order.verifiedAt = nowIso;
    order.merchantFeeUsd = feeUsd;
    order.netSettlementUsd = netUsd;
    order.settlementStatus = 'settlement_pending';
    order.bankDepositNote =
      'Payment verified by merchant API. Settlement / bank payout pending clearing cycle.';
    order.failureReason = null;

    this.appendAudit(
      'VERIFICATION_SUCCEEDED',
      actor,
      `Verified payment for ${order.orderId} (Txn: ${order.merchantTransactionId}, $${order.grossAmountUsd.toFixed(2)} ${order.currency}).`,
      {
        orderId: order.orderId,
        userId: order.userId,
        merchantTransactionId: order.merchantTransactionId,
      }
    );

    const plan = resolvePlanByInput(order.planId, order.licenceType);
    const durationMs =
      plan && plan.durationDays !== null ? plan.durationDays * 24 * 60 * 60 * 1000 : null;
    const expiresAt = durationMs ? new Date(this.nowFn() + durationMs).toISOString() : null;

    const subscriptionId = `SUB-${this.nowFn().toString(36).toUpperCase()}-${crypto
      .randomBytes(3)
      .toString('hex')
      .toUpperCase()}`;

    const newSubscription: PaidSubscriptionRecord = {
      subscriptionId,
      userId: order.userId,
      studentEmail: order.studentEmail,
      studentName: order.studentName,
      planId: order.planId,
      planTitle: order.planTitle,
      contentId: order.contentId,
      licenceType: order.licenceType,
      orderId: order.orderId,
      merchantTransactionId: order.merchantTransactionId,
      verifiedAmountUsd: order.grossAmountUsd,
      currency: order.currency,
      status: 'active',
      startDate: nowIso,
      expiresAt,
      nextRenewalDate: order.licenceType === 'subscription-access' ? expiresAt : null,
      autoRenew: order.licenceType === 'subscription-access',
      cancelledAt: null,
      refundedAt: null,
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    this.state.subscriptions.unshift(newSubscription);
    order.subscriptionId = subscriptionId;
    order.subscriptionActivated = true;
    order.financialStatus = 'Subscription Activated';
    order.updatedAt = nowIso;

    this.appendAudit(
      'SUBSCRIPTION_ACTIVATED',
      'system',
      `Automatically unlocked ${order.planTitle} for ${order.studentEmail} (Sub: ${subscriptionId}, Expires: ${expiresAt || 'Lifetime'}).`,
      {
        orderId: order.orderId,
        userId: order.userId,
        merchantTransactionId: order.merchantTransactionId,
      }
    );

    if (this.syncLegacyEntitlements) {
      grantUserAccess({
        userId: order.userId,
        contentId: order.contentId,
        licenceType: order.licenceType,
        purchasePriceUsd: order.grossAmountUsd,
        transactionId: order.merchantTransactionId,
        expiresAt,
      });

      if (order.licenceType === 'subscription-access') {
        subscribeOrUpdate({
          userId: order.userId,
          studentEmail: order.studentEmail,
          studentName: order.studentName,
          subscribedTracks: ['Core Curriculum', 'Full-Stack AI', 'Modern CSS Architecture'],
          deliveryCadence: 'weekly',
          preferredFormat: 'both',
        });
      }
    }

    this.saveState();
    return { ok: true, subscription: newSubscription };
  }

  public async handleSignedWebhook(input: {
    rawBody: string;
    signatureHeader?: string;
    payload: Record<string, any>;
  }): Promise<{
    success: boolean;
    statusCode: number;
    duplicate?: boolean;
    message: string;
    order?: PaymentOrderRecord;
  }> {
    if (!verifyHmacSignature(input.rawBody, input.signatureHeader, this.webhookSecret)) {
      this.appendAudit(
        'WEBHOOK_REJECTED',
        'webhook',
        'Rejected merchant webhook with invalid or missing HMAC-SHA256 signature.'
      );
      this.saveState();
      return {
        success: false,
        statusCode: 401,
        message: 'Invalid webhook signature.',
      };
    }

    const eventId = String(input.payload?.eventId || '');
    const eventType = String(input.payload?.eventType || '');
    const orderId = String(input.payload?.orderId || '');

    if (eventId && this.state.processedWebhookEventIds.includes(eventId)) {
      return {
        success: true,
        statusCode: 200,
        duplicate: true,
        message: `Duplicate webhook event ${eventId} ignored (idempotent).`,
      };
    }

    const order = this.state.orders.find((o) => o.orderId === orderId);
    if (!order) {
      return {
        success: false,
        statusCode: 404,
        message: `Order ${orderId} referenced by webhook not found.`,
      };
    }

    if (eventId) {
      this.state.processedWebhookEventIds.push(eventId);
    }

    this.appendAudit(
      'WEBHOOK_RECEIVED',
      'webhook',
      `Verified signed webhook (${eventType}) for order ${order.orderId}.`,
      { orderId: order.orderId, userId: order.userId }
    );

    if (eventType === 'payment.succeeded') {
      const outcome: MerchantVerificationOutcome = {
        status: 'succeeded',
        merchantTransactionId: String(input.payload?.merchantTransactionId || ''),
        amountCents: Number(input.payload?.amountCents),
        currency: String(input.payload?.currency || 'USD').toUpperCase(),
        paymentMethodSummary: String(input.payload?.paymentMethodSummary || 'Merchant Webhook Confirmed'),
      };
      const result = this.finalizeVerifiedPayment(order, outcome, 'webhook');
      if (!result.ok) {
        return {
          success: false,
          statusCode: 422,
          message: result.error,
          order,
        };
      }
      return {
        success: true,
        statusCode: 200,
        message: 'Webhook confirmed payment and activated subscription.',
        order,
      };
    }

    if (eventType === 'payment.failed') {
      order.paymentStatus = 'failed';
      order.financialStatus = 'Payment Failed / Refunded';
      order.failureReason = String(input.payload?.failureReason || 'Merchant reported payment failure.');
      order.updatedAt = new Date(this.nowFn()).toISOString();
      this.appendAudit(
        'VERIFICATION_FAILED',
        'webhook',
        `Webhook marked ${order.orderId} as failed: ${order.failureReason}`,
        { orderId: order.orderId, userId: order.userId }
      );
      this.saveState();
      return { success: true, statusCode: 200, message: 'Failure recorded.', order };
    }

    if (eventType === 'payment.refunded') {
      this.applyRefundState(order, String(input.payload?.reason || 'Refund confirmed by merchant webhook.'), 'webhook');
      return { success: true, statusCode: 200, message: 'Refund processed and access revoked.', order };
    }

    if (eventType === 'settlement.settled') {
      const payoutRef = String(
        input.payload?.payoutReference ||
          `PAYOUT-${crypto.randomBytes(4).toString('hex').toUpperCase()}`
      );
      const settledAt = String(input.payload?.settledAt || new Date(this.nowFn()).toISOString());
      const res = this.reconcileOrderSettlement(order.orderId, payoutRef, settledAt);
      return {
        success: res.success,
        statusCode: res.success ? 200 : 400,
        message: res.error || 'Settlement reconciled from webhook.',
        order: res.order,
      };
    }

    this.saveState();
    return { success: true, statusCode: 200, message: 'Webhook acknowledged.', order };
  }

  private applyRefundState(
    order: PaymentOrderRecord,
    reason: string,
    actor: 'admin' | 'webhook'
  ): void {
    const nowIso = new Date(this.nowFn()).toISOString();
    order.paymentStatus = 'refunded';
    order.financialStatus = 'Payment Failed / Refunded';
    order.settlementStatus = 'reversed';
    order.failureReason = reason;
    order.bankDepositNote = `Payment refunded (${reason}); settlement reversed.`;
    order.updatedAt = nowIso;

    if (order.subscriptionId) {
      const sub = this.state.subscriptions.find(
        (s) => s.subscriptionId === order.subscriptionId
      );
      if (sub) {
        sub.status = 'refunded';
        sub.autoRenew = false;
        sub.refundedAt = nowIso;
        sub.updatedAt = nowIso;
      }
    }

    if (this.syncLegacyEntitlements && order.merchantTransactionId) {
      revokeGrantsByTransactionId(order.merchantTransactionId, 'refunded');
    }

    this.appendAudit(
      'PAYMENT_REFUNDED',
      actor,
      `Refunded order ${order.orderId} and revoked subscription entitlement (${reason}).`,
      {
        orderId: order.orderId,
        userId: order.userId,
        merchantTransactionId: order.merchantTransactionId || undefined,
      }
    );
    this.saveState();
  }

  public async refundOrder(
    orderId: string,
    reason: string = 'Student 14-day refund request'
  ): Promise<{ success: boolean; order?: PaymentOrderRecord; error?: string }> {
    const order = this.state.orders.find((o) => o.orderId === orderId);
    if (!order) return { success: false, error: 'Order not found.' };
    if (order.paymentStatus !== 'succeeded') {
      return { success: false, error: 'Only verified successful payments can be refunded.' };
    }

    const adapter = this.getAdapter();
    const res = await adapter.refundPaymentWithMerchant(order, reason);
    if (!res.refunded) {
      return { success: false, error: res.reason || 'Merchant declined refund.' };
    }

    this.applyRefundState(order, `${reason}${res.refundRef ? ` (Ref: ${res.refundRef})` : ''}`, 'admin');
    return { success: true, order };
  }

  public reconcileOrderSettlement(
    orderId: string,
    payoutReference?: string,
    settledAtIso?: string
  ): { success: boolean; order?: PaymentOrderRecord; error?: string } {
    const order = this.state.orders.find((o) => o.orderId === orderId);
    if (!order) return { success: false, error: 'Order not found.' };
    if (order.paymentStatus !== 'succeeded') {
      return {
        success: false,
        error: 'Settlement reconciliation is only valid for verified successful payments.',
      };
    }
    if (order.settlementStatus === 'funds_settled') {
      return { success: true, order };
    }

    const nowIso = settledAtIso || new Date(this.nowFn()).toISOString();
    const ref =
      payoutReference ||
      `PAYOUT-${this.nowFn().toString(36).toUpperCase()}-${crypto
        .randomBytes(2)
        .toString('hex')
        .toUpperCase()}`;

    order.settlementStatus = 'funds_settled';
    order.financialStatus = 'Funds Settled';
    order.payoutReference = ref;
    order.settledAt = nowIso;
    order.bankDepositNote = `Merchant settlement confirmed (Payout Ref: ${ref}, Net: $${order.netSettlementUsd.toFixed(2)} USD, Deposited: ${nowIso.slice(0, 10)}).`;
    order.updatedAt = nowIso;

    this.appendAudit(
      'SETTLEMENT_RECONCILED',
      'admin',
      `Reconciled settlement for ${order.orderId} -> Funds Settled (Payout Ref: ${ref}, Net: $${order.netSettlementUsd.toFixed(2)}).`,
      {
        orderId: order.orderId,
        userId: order.userId,
        merchantTransactionId: order.merchantTransactionId || undefined,
      }
    );
    this.saveState();
    return { success: true, order };
  }

  public expireElapsedSubscriptions(): void {
    const nowMs = this.nowFn();
    let changed = false;

    for (const sub of this.state.subscriptions) {
      if (
        (sub.status === 'active' || sub.status === 'cancelled_active_until_expiry') &&
        sub.expiresAt &&
        new Date(sub.expiresAt).getTime() <= nowMs
      ) {
        sub.status = 'expired';
        sub.autoRenew = false;
        sub.updatedAt = new Date(nowMs).toISOString();
        changed = true;
        this.appendAudit(
          'SUBSCRIPTION_EXPIRED',
          'system',
          `Subscription ${sub.subscriptionId} expired for ${sub.studentEmail}; paid access locked.`,
          { orderId: sub.orderId, userId: sub.userId, merchantTransactionId: sub.merchantTransactionId }
        );
      }
    }

    if (changed) {
      this.saveState();
    }
  }

  public getStudentEntitlement(userId: string): StudentEntitlementSummary {
    this.expireElapsedSubscriptions();

    if (!userId) {
      return {
        userId: '',
        hasActiveMonthlyPack: false,
        hasDownloadAccess: false,
        unlockedAllChapters: false,
        status: 'none',
        activeSubscription: null,
        freeChaptersAllowed: ['ch-00'],
      };
    }

    const userSubs = this.state.subscriptions.filter((s) => s.userId === userId);
    const activeMonthly = userSubs.find(
      (s) =>
        s.licenceType === 'subscription-access' &&
        (s.status === 'active' || s.status === 'cancelled_active_until_expiry')
    );
    const activeDownload = userSubs.find(
      (s) =>
        (s.licenceType === 'downloadable-learning' || s.licenceType === 'commercial-use') &&
        s.status === 'active'
    );

    const primarySub = activeMonthly || activeDownload || userSubs[0] || null;
    const hasActiveMonthly = Boolean(activeMonthly);
    const hasDownloads = Boolean(activeMonthly || activeDownload);

    return {
      userId,
      hasActiveMonthlyPack: hasActiveMonthly,
      hasDownloadAccess: hasDownloads,
      unlockedAllChapters: hasActiveMonthly,
      status: activeMonthly
        ? activeMonthly.status
        : activeDownload
        ? activeDownload.status
        : primarySub?.status || 'none',
      activeSubscription: activeMonthly || activeDownload || null,
      freeChaptersAllowed: ['ch-00'],
    };
  }

  public cancelSubscription(userId: string, subscriptionId?: string): {
    success: boolean;
    subscription?: PaidSubscriptionRecord;
    error?: string;
  } {
    this.expireElapsedSubscriptions();

    const sub = this.state.subscriptions.find(
      (s) =>
        s.userId === userId &&
        (!subscriptionId || s.subscriptionId === subscriptionId) &&
        s.status === 'active'
    );
    if (!sub) {
      return { success: false, error: 'No active subscription found to cancel.' };
    }

    const nowIso = new Date(this.nowFn()).toISOString();
    sub.status = 'cancelled_active_until_expiry';
    sub.autoRenew = false;
    sub.cancelledAt = nowIso;
    sub.nextRenewalDate = null;
    sub.updatedAt = nowIso;

    this.appendAudit(
      'SUBSCRIPTION_CANCELLED',
      'student',
      `Student cancelled auto-renewal for ${sub.subscriptionId}; access remains active until ${sub.expiresAt || 'term end'}.`,
      { orderId: sub.orderId, userId: sub.userId, merchantTransactionId: sub.merchantTransactionId }
    );
    this.saveState();
    return { success: true, subscription: sub };
  }

  public canAccessLesson(
    userId: string | null,
    lessonId: string,
    chapterId?: string
  ): {
    allowed: boolean;
    isFree: boolean;
    reason?: string;
    entitlement: StudentEntitlementSummary;
  } {
    const entitlement = this.getStudentEntitlement(userId || '');
    const isFree =
      lessonId.startsWith('ch-00') || chapterId === 'ch-00';

    if (isFree) {
      return { allowed: true, isFree: true, entitlement };
    }

    if (entitlement.hasActiveMonthlyPack || entitlement.unlockedAllChapters) {
      return { allowed: true, isFree: false, entitlement };
    }

    return {
      allowed: false,
      isFree: false,
      reason:
        entitlement.status === 'expired'
          ? 'Your Monthly Pack subscription has expired. Renew to restore access to chapters 01–10 and downloads.'
          : entitlement.status === 'refunded'
          ? 'Your previous subscription was refunded. Subscribe to Monthly Pack ($19/mo) to unlock chapters 01–10.'
          : 'This lesson requires an active Weekly Learning Membership ($19/mo) verified by the merchant payment gateway.',
      entitlement,
    };
  }

  public getOrderForStudent(orderId: string, userId: string): PaymentOrderRecord | null {
    const order = this.state.orders.find((o) => o.orderId === orderId && o.userId === userId);
    return order || null;
  }

  public getOrdersForStudent(userId: string): PaymentOrderRecord[] {
    return this.state.orders.filter((o) => o.userId === userId);
  }

  public getMerchantDashboardSummary(): MerchantDashboardSummary {
    this.expireElapsedSubscriptions();
    const detected = detectConfiguredMerchantProvider();

    const verifiedOrders = this.state.orders.filter((o) => o.paymentStatus === 'succeeded');
    const pendingOrders = this.state.orders.filter(
      (o) => o.paymentStatus === 'pending_verification' || o.paymentStatus === 'initiated'
    );
    const failedOrders = this.state.orders.filter(
      (o) => o.paymentStatus === 'failed' || o.paymentStatus === 'refunded'
    );
    const activeSubs = this.state.subscriptions.filter(
      (s) => s.status === 'active' || s.status === 'cancelled_active_until_expiry'
    );

    const verifiedGrossUsd = Number(
      verifiedOrders.reduce((sum, o) => sum + o.grossAmountUsd, 0).toFixed(2)
    );
    const totalMerchantFeesUsd = Number(
      verifiedOrders.reduce((sum, o) => sum + o.merchantFeeUsd, 0).toFixed(2)
    );
    const pendingSettlementUsd = Number(
      verifiedOrders
        .filter((o) => o.settlementStatus === 'settlement_pending')
        .reduce((sum, o) => sum + o.netSettlementUsd, 0)
        .toFixed(2)
    );
    const settledNetUsd = Number(
      verifiedOrders
        .filter((o) => o.settlementStatus === 'funds_settled')
        .reduce((sum, o) => sum + o.netSettlementUsd, 0)
        .toFixed(2)
    );

    return {
      provider: detected.provider,
      providerModeLabel: detected.providerModeLabel,
      liveCredentialsConfigured: detected.liveCredentialsConfigured,
      totalOrders: this.state.orders.length,
      verifiedSuccessfulCount: verifiedOrders.length,
      pendingVerificationCount: pendingOrders.length,
      failedOrRefundedCount: failedOrders.length,
      activeSubscriptionsCount: activeSubs.length,
      verifiedGrossUsd,
      totalMerchantFeesUsd,
      pendingSettlementUsd,
      settledNetUsd,
      orders: this.state.orders,
      subscriptions: this.state.subscriptions,
      auditLogs: this.state.auditLogs,
    };
  }
}

export const defaultPaymentEngine = new PaymentEngine();
