import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  CheckCircle2,
  Lock,
  X,
  Info,
  Clock,
  AlertTriangle,
  ShieldCheck,
  RefreshCw,
  KeyRound,
} from 'lucide-react';
import { LicenceType, STANDARD_LICENCES } from '../../shared/ownershipTypes';
import type {
  MerchantProviderType,
  PaidSubscriptionRecord,
  PaymentOrderRecord,
} from '../../shared/paymentTypes';
import { useAuth } from '../../utils/AuthContext';
import * as authService from '../../utils/authService';

interface LicencePurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentId: string;
  contentTitle: string;
  availableLicences?: LicenceType[];
  pricingUsd?: Record<LicenceType, number>;
  defaultSelectedLicence?: LicenceType;
  onSuccessGrant?: (licenceType: LicenceType) => void;
}

type CheckoutStep =
  | 'review'
  | 'merchant_authorize'
  | 'verifying'
  | 'pending_verification'
  | 'activated'
  | 'failed';

export const LicencePurchaseModal: React.FC<LicencePurchaseModalProps> = ({
  isOpen,
  onClose,
  contentId,
  contentTitle,
  availableLicences = [
    'subscription-access',
    'downloadable-learning',
    'commercial-use',
    'personal-learning',
  ],
  pricingUsd = {
    'personal-learning': 0,
    'downloadable-learning': 29,
    'commercial-use': 149,
    'creator-distribution': 499,
    'subscription-access': 19,
    'limited-term-access': 0,
  },
  defaultSelectedLicence,
  onSuccessGrant,
}) => {
  const { user, login, refreshEntitlement } = useAuth();

  const initialTier: LicenceType =
    defaultSelectedLicence ||
    (availableLicences.includes('subscription-access')
      ? 'subscription-access'
      : availableLicences[0] || 'subscription-access');

  const [selectedLicence, setSelectedLicence] = useState<LicenceType>(initialTier);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [step, setStep] = useState<CheckoutStep>('review');
  const [isBusy, setIsBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Merchant config & active order state
  const [providerLabel, setProviderLabel] = useState('WebZone Merchant Sandbox');
  const [providerType, setProviderType] = useState<MerchantProviderType>('webzone-sandbox');
  const [liveCredentialsConfigured, setLiveCredentialsConfigured] = useState(false);
  const [activeOrder, setActiveOrder] = useState<PaymentOrderRecord | null>(null);
  const [activatedSubscription, setActivatedSubscription] =
    useState<PaidSubscriptionRecord | null>(null);
  const [verifyElapsedMs, setVerifyElapsedMs] = useState(0);

  // Inline student authentication when guest / unauthenticated
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [studentNameInput, setStudentNameInput] = useState('');
  const [studentEmailInput, setStudentEmailInput] = useState('');
  const [studentPasswordInput, setStudentPasswordInput] = useState('');
  const [authBusy, setAuthBusy] = useState(false);

  const isEmailStudent = Boolean(user && user.method !== 'guest' && user.email);

  useEffect(() => {
    if (!isOpen) return;
    setStep('review');
    setErrorMessage('');
    setActiveOrder(null);
    setActivatedSubscription(null);
    setSelectedLicence(initialTier);
    authService
      .fetchPaymentConfig()
      .then((cfg) => {
        if (cfg?.provider) {
          setProviderType(cfg.provider);
          setProviderLabel(cfg.providerModeLabel || cfg.provider);
          setLiveCredentialsConfigured(Boolean(cfg.liveCredentialsConfigured));
        }
      })
      .catch(() => {});
  }, [isOpen, initialTier]);

  useEffect(() => {
    if (step !== 'verifying') {
      setVerifyElapsedMs(0);
      return;
    }
    const start = Date.now();
    const timer = setInterval(() => {
      setVerifyElapsedMs(Date.now() - start);
    }, 100);
    return () => clearInterval(timer);
  }, [step]);

  if (!isOpen) return null;

  const price =
    selectedLicence === 'subscription-access'
      ? 19
      : pricingUsd[selectedLicence] ?? 29;
  const licenceInfo = STANDARD_LICENCES[selectedLicence];

  const gatewayFee = price > 0 ? Number((price * 0.029 + 0.3).toFixed(2)) : 0;
  const estimatedNet = price > 0 ? Number((price - gatewayFee).toFixed(2)) : 0;

  const handleInlineAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setAuthBusy(true);
    try {
      const res =
        authMode === 'signup'
          ? await authService.signUp(
              studentNameInput,
              studentEmailInput,
              studentPasswordInput
            )
          : await authService.signIn(studentEmailInput, studentPasswordInput);

      if (res.success && res.user) {
        login(res.user);
        setStudentPasswordInput('');
      } else {
        setErrorMessage(res.error || 'Authentication failed.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Unable to authenticate right now.');
    } finally {
      setAuthBusy(false);
    }
  };

  const handleStartOrder = async () => {
    setErrorMessage('');

    // Free personal access only
    if (price === 0) {
      setIsBusy(true);
      try {
        const res = await fetch('/api/licensing/grant-access', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...authService.getAuthHeaders(),
          },
          body: JSON.stringify({
            contentId,
            licenceType: selectedLicence,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setStep('activated');
          await refreshEntitlement();
          if (onSuccessGrant) onSuccessGrant(selectedLicence);
        } else {
          setErrorMessage(data.error || 'Unable to activate free licence.');
        }
      } catch (err: any) {
        setErrorMessage(err?.message || 'Server error.');
      } finally {
        setIsBusy(false);
      }
      return;
    }

    if (!isEmailStudent) {
      setErrorMessage('Please sign in or create a student email account before purchasing.');
      return;
    }

    if (!termsAgreed) {
      setErrorMessage('Please accept the licensing terms and billing disclosures.');
      return;
    }

    setIsBusy(true);
    try {
      const planId =
        selectedLicence === 'subscription-access'
          ? 'monthly-pack-19'
          : selectedLicence === 'downloadable-learning'
          ? 'downloadable-learning-29'
          : 'commercial-use-149';

      const res = await authService.createPaymentOrder({
        planId,
        licenceType: selectedLicence,
      });

      if (!res.success || !res.order) {
        setErrorMessage(res.error || 'Could not initialize merchant payment order.');
        return;
      }

      setActiveOrder(res.order);
      setStep('merchant_authorize');
    } catch (err: any) {
      setErrorMessage(err?.message || 'Merchant order creation failed.');
    } finally {
      setIsBusy(false);
    }
  };

  const handleAuthorizeAndVerify = async (
    scenario: 'succeed' | 'pending' | 'fail'
  ) => {
    if (!activeOrder) return;
    setErrorMessage('');
    setIsBusy(true);

    try {
      if (activeOrder.provider === 'webzone-sandbox') {
        const authRes = await authService.submitSandboxAuthorize({
          orderId: activeOrder.orderId,
          scenario,
          paymentMethodSummary: 'WebZone Merchant Sandbox Checkout',
        });
        if (!authRes.success) {
          setErrorMessage(authRes.error || 'Checkout authorization failed.');
          setIsBusy(false);
          return;
        }
      }

      setStep('verifying');
      const verifyRes = await authService.verifyPaymentOrder(activeOrder.orderId, {
        sandboxScenario: scenario,
      });

      if (verifyRes.order) {
        setActiveOrder(verifyRes.order);
      }

      if (verifyRes.verified && verifyRes.subscription) {
        setActivatedSubscription(verifyRes.subscription);
        setStep('activated');
        await refreshEntitlement();
        if (onSuccessGrant) onSuccessGrant(selectedLicence);
      } else if (verifyRes.pendingVerification) {
        setStep('pending_verification');
      } else {
        setErrorMessage(verifyRes.error || 'Payment declined or verification failed.');
        setStep('failed');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Merchant verification request failed.');
      setStep('failed');
    } finally {
      setIsBusy(false);
    }
  };

  const handlePollVerification = async () => {
    if (!activeOrder) return;
    setIsBusy(true);
    setErrorMessage('');
    try {
      const res = await authService.verifyPaymentOrder(activeOrder.orderId);
      if (res.order) setActiveOrder(res.order);
      if (res.verified && res.subscription) {
        setActivatedSubscription(res.subscription);
        setStep('activated');
        await refreshEntitlement();
        if (onSuccessGrant) onSuccessGrant(selectedLicence);
      } else if (res.pendingVerification) {
        setStep('pending_verification');
      } else {
        setErrorMessage(res.error || 'Payment failed verification.');
        setStep('failed');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Unable to check verification status.');
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 'var(--z-modal)',
        padding: 'var(--space-4)',
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          maxWidth: '600px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-xl)',
          padding: 'var(--space-6)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <CreditCard size={20} style={{ color: 'var(--color-primary)' }} />
              <h3 style={{ margin: 0, fontSize: 'var(--text-xl)', fontWeight: 800 }}>
                Verified Merchant Checkout
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              {contentTitle} · Provider: <strong>{providerLabel}</strong>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-subtle btn-sm"
            aria-label="Close checkout modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* STEP: ACTIVATED */}
        {step === 'activated' && (
          <div style={{ padding: 'var(--space-4) 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-success-bg)',
                  color: 'var(--color-success)',
                  border: '2px solid var(--color-success-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--space-3)',
                }}
              >
                <CheckCircle2 size={32} />
              </div>
              <span className="badge badge-success" style={{ marginBottom: '0.5rem' }}>
                Subscription Activated
              </span>
              <h4 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, margin: '0.25rem 0' }}>
                Payment Verified &amp; Chapters Unlocked
              </h4>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
                Server-side merchant verification confirmed your transaction. All 11 curriculum chapters and PDF packs are now unlocked on your account.
              </p>
            </div>

            {activeOrder && (
              <div
                style={{
                  backgroundColor: 'var(--color-surface-subtle)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                  fontSize: '12px',
                  display: 'grid',
                  gap: '0.4rem',
                  marginBottom: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Order ID:</span>
                  <strong>{activeOrder.orderId}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Merchant Txn ID:</span>
                  <code>{activeOrder.merchantTransactionId}</code>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Verified Amount:</span>
                  <strong>
                    ${activeOrder.grossAmountUsd.toFixed(2)} {activeOrder.currency}
                  </strong>
                </div>
                {activatedSubscription && (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Start Date:</span>
                      <strong>
                        {new Date(activatedSubscription.startDate).toLocaleDateString()}
                      </strong>
                    </div>
                    {activatedSubscription.expiresAt && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--color-text-muted)' }}>
                          Expires / Next Renewal:
                        </span>
                        <strong>
                          {new Date(activatedSubscription.expiresAt).toLocaleDateString()}
                        </strong>
                      </div>
                    )}
                  </>
                )}
                <div
                  style={{
                    borderTop: '1px solid var(--color-border-subtle)',
                    paddingTop: '0.4rem',
                    marginTop: '0.2rem',
                    fontSize: '11px',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <strong>Settlement Status:</strong> Settlement Pending (Payment verified; bank payout clears on merchant payout schedule).
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button type="button" onClick={onClose} className="btn btn-primary btn-md">
                Start Reading Unlocked Chapters
              </button>
            </div>
          </div>
        )}

        {/* STEP: REVIEW */}
        {step === 'review' && (
          <>
            {/* Student Account Gate for Paid Tiers */}
            {price > 0 && !isEmailStudent && (
              <form
                onSubmit={handleInlineAuth}
                style={{
                  backgroundColor: 'var(--color-surface-subtle)',
                  border: '1px solid var(--color-primary)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                  marginBottom: '1.25rem',
                  display: 'grid',
                  gap: '0.65rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                  }}
                >
                  <strong
                    style={{
                      fontSize: 'var(--text-xs)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: 'var(--color-text-strong)',
                    }}
                  >
                    <KeyRound size={14} style={{ color: 'var(--color-primary)' }} />
                    {authMode === 'signin'
                      ? 'Sign in to link your subscription'
                      : 'Create student account'}
                  </strong>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                      setErrorMessage('');
                    }}
                    className="btn btn-subtle btn-sm"
                    style={{ fontSize: '11px', padding: '0.15rem 0.5rem' }}
                  >
                    {authMode === 'signin' ? 'Create Account Instead' : 'Use Existing Account'}
                  </button>
                </div>

                {authMode === 'signup' && (
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Full Name"
                    value={studentNameInput}
                    onChange={(e) => setStudentNameInput(e.target.value)}
                    required
                  />
                )}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Student Email"
                    value={studentEmailInput}
                    onChange={(e) => setStudentEmailInput(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Password (min 6 chars)"
                    value={studentPasswordInput}
                    onChange={(e) => setStudentPasswordInput(e.target.value)}
                    required
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                  }}
                >
                  <span style={{ fontSize: '11px', color: 'var(--color-text-subtle)' }}>
                    Test account: <code>scholar@demo.local</code> / <code>DemoPass123!</code>
                  </span>
                  <button type="submit" disabled={authBusy} className="btn btn-primary btn-sm">
                    {authBusy
                      ? 'Signing in...'
                      : authMode === 'signin'
                      ? 'Sign In & Continue'
                      : 'Create & Continue'}
                  </button>
                </div>
              </form>
            )}

            {isEmailStudent && (
              <div
                style={{
                  backgroundColor: 'var(--color-surface-subtle)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.6rem 0.85rem',
                  marginBottom: '1rem',
                  fontSize: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>
                  Purchasing as: <strong>{user?.name}</strong> ({user?.email})
                </span>
                <span className="badge badge-success" style={{ fontSize: '10px' }}>
                  Verified Account
                </span>
              </div>
            )}

            {/* Plan Selection */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.1rem' }}>
              <label
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--color-text-subtle)',
                }}
              >
                Select Plan / Access Tier:
              </label>

              {availableLicences.map((licKey) => {
                const lic = STANDARD_LICENCES[licKey];
                const tierPrice =
                  licKey === 'subscription-access' ? 19 : pricingUsd[licKey] ?? 0;
                const isSelected = selectedLicence === licKey;

                return (
                  <button
                    key={licKey}
                    type="button"
                    onClick={() => setSelectedLicence(licKey)}
                    style={{
                      padding: 'var(--space-3) var(--space-4)',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected
                        ? '2px solid var(--color-primary)'
                        : '1px solid var(--color-border)',
                      backgroundColor: isSelected
                        ? 'var(--color-primary-subtle)'
                        : 'var(--color-surface)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      width: '100%',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span
                          style={{
                            fontWeight: 700,
                            fontSize: 'var(--text-sm)',
                            color: 'var(--color-text-strong)',
                          }}
                        >
                          {licKey === 'subscription-access'
                            ? 'Weekly Learning Membership — Monthly Pack'
                            : lic.title}
                        </span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                        {licKey === 'subscription-access'
                          ? '30-Day Full Curriculum + Weekly Releases + PDF Packs'
                          : `${lic.termDuration} · ${lic.description}`}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', flexShrink: 0, paddingLeft: '0.75rem' }}>
                      <div
                        style={{
                          fontSize: 'var(--text-base)',
                          fontWeight: 800,
                          color: 'var(--color-text-strong)',
                        }}
                      >
                        {tierPrice === 0 ? 'Free' : `$${tierPrice}.00 USD`}
                      </div>
                      {licKey === 'subscription-access' && (
                        <div style={{ fontSize: '10px', color: 'var(--color-text-subtle)' }}>
                          per month
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {price > 0 && (
              <div
                style={{
                  backgroundColor: 'var(--color-surface-subtle)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-3) var(--space-4)',
                  marginBottom: '1rem',
                  fontSize: '11px',
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--color-text-subtle)',
                    marginBottom: '0.4rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <Info size={13} /> Server-Verified Billing Summary (USD)
                </div>
                <div style={{ display: 'grid', gap: '0.25rem', color: 'var(--color-text-muted)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Charge Amount (Authoritative Server Price):</span>
                    <strong style={{ color: 'var(--color-text-strong)' }}>
                      ${price.toFixed(2)} USD
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Estimated Merchant Gateway Fee (2.9% + $0.30):</span>
                    <span>-${gatewayFee.toFixed(2)} USD</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Estimated Net Pending Settlement:</span>
                    <strong style={{ color: 'var(--color-text-strong)' }}>
                      ${estimatedNet.toFixed(2)} USD
                    </strong>
                  </div>
                </div>
              </div>
            )}

            <label
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                fontSize: '11px',
                color: 'var(--color-text-muted)',
                marginBottom: '1rem',
                cursor: 'pointer',
                lineHeight: 1.5,
              }}
            >
              <input
                type="checkbox"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
                style={{ marginTop: '2px' }}
              />
              <span>
                I agree to the <strong>{licenceInfo.title}</strong> terms under publisher{' '}
                <strong>Sameer Chouhan / WebZoneBW</strong>. Access activates automatically only after server-side merchant payment confirmation.
              </span>
            </label>

            {errorMessage && (
              <div
                style={{
                  backgroundColor: 'var(--color-danger-bg)',
                  border: '1px solid var(--color-danger-border)',
                  color: 'var(--color-danger)',
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-xs)',
                  marginBottom: '1rem',
                }}
              >
                {errorMessage}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button type="button" onClick={onClose} className="btn btn-secondary btn-md">
                Cancel
              </button>
              <button
                type="button"
                onClick={handleStartOrder}
                disabled={isBusy || (price > 0 && (!termsAgreed || !isEmailStudent))}
                className="btn btn-primary btn-md"
              >
                <Lock size={15} />
                <span>
                  {isBusy
                    ? 'Creating Order...'
                    : price === 0
                    ? 'Activate Free Personal Licence'
                    : `Proceed to Merchant Checkout ($${price}.00 USD)`}
                </span>
              </button>
            </div>
          </>
        )}

        {/* STEP: MERCHANT AUTHORIZE */}
        {step === 'merchant_authorize' && activeOrder && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div
              style={{
                backgroundColor: 'var(--color-surface-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4)',
                fontSize: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Order Created:</span>
                <strong>{activeOrder.orderId}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Gateway Reference:</span>
                <code>{activeOrder.providerOrderRef}</code>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Amount Due:</span>
                <strong style={{ fontSize: 'var(--text-base)', color: 'var(--color-primary)' }}>
                  ${activeOrder.grossAmountUsd.toFixed(2)} {activeOrder.currency}
                </strong>
              </div>
            </div>

            {!liveCredentialsConfigured ? (
              <div
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--color-surface)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
                  <ShieldCheck size={16} style={{ color: 'var(--color-primary)' }} />
                  <strong style={{ fontSize: 'var(--text-sm)' }}>
                    WebZone Merchant Sandbox Gateway
                  </strong>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
                  No live external gateway secrets are configured in this environment. No raw card numbers or CVV are requested or stored. Choose an authorization response to verify end-to-end server-side verification and subscription activation:
                </p>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => handleAuthorizeAndVerify('succeed')}
                    className="btn btn-primary btn-md"
                    style={{ justifyContent: 'center' }}
                  >
                    <CheckCircle2 size={16} />
                    <span>
                      Authorize Payment (${activeOrder.grossAmountUsd.toFixed(2)} USD)
                    </span>
                  </button>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => handleAuthorizeAndVerify('pending')}
                      className="btn btn-secondary btn-sm"
                    >
                      <Clock size={14} />
                      <span>Simulate Pending (&gt;10s)</span>
                    </button>
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => handleAuthorizeAndVerify('fail')}
                      className="btn btn-secondary btn-sm"
                    >
                      <AlertTriangle size={14} />
                      <span>Simulate Declined</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0 }}>
                  Complete payment on the hosted {providerType} checkout page, then verify your order below.
                </p>
                {activeOrder.checkoutUrl && (
                  <a
                    href={activeOrder.checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-md"
                    style={{ justifyContent: 'center' }}
                  >
                    Open Hosted Merchant Checkout
                  </a>
                )}
                <button
                  type="button"
                  onClick={handlePollVerification}
                  disabled={isBusy}
                  className="btn btn-secondary btn-md"
                >
                  Verify Payment Status with Server
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP: VERIFYING */}
        {step === 'verifying' && (
          <div style={{ textAlign: 'center', padding: 'var(--space-8) 0' }}>
            <RefreshCw
              size={36}
              style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}
            />
            <h4 style={{ margin: '0 0 0.5rem 0' }}>
              Verifying Payment with Merchant API...
            </h4>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
              Checking order ownership, USD amount, currency, and transaction signature ({(verifyElapsedMs / 1000).toFixed(1)}s / 5–10s target)
            </p>
          </div>
        )}

        {/* STEP: PENDING VERIFICATION */}
        {step === 'pending_verification' && activeOrder && (
          <div style={{ textAlign: 'center', padding: 'var(--space-4) 0' }}>
            <Clock size={40} style={{ color: 'var(--color-warning)', marginBottom: '0.75rem' }} />
            <span className="badge badge-warning" style={{ marginBottom: '0.5rem' }}>
              Payment Pending — Verification in Progress
            </span>
            <h4 style={{ margin: '0.25rem 0 0.5rem 0' }}>
              Awaiting Merchant Confirmation
            </h4>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Order <strong>{activeOrder.orderId}</strong> has not been confirmed by the merchant yet. Subscriptions are never unlocked without verified confirmation.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handlePollVerification}
                disabled={isBusy}
                className="btn btn-secondary btn-sm"
              >
                <RefreshCw size={14} />
                <span>Re-check Merchant Status</span>
              </button>
              {activeOrder.provider === 'webzone-sandbox' && (
                <button
                  type="button"
                  onClick={() => handleAuthorizeAndVerify('succeed')}
                  disabled={isBusy}
                  className="btn btn-primary btn-sm"
                >
                  Complete Delayed Sandbox Confirmation
                </button>
              )}
            </div>
          </div>
        )}

        {/* STEP: FAILED */}
        {step === 'failed' && (
          <div style={{ textAlign: 'center', padding: 'var(--space-4) 0' }}>
            <AlertTriangle size={40} style={{ color: 'var(--color-danger)', marginBottom: '0.75rem' }} />
            <span className="badge badge-danger" style={{ marginBottom: '0.5rem' }}>
              Payment Failed / Cancelled
            </span>
            <h4 style={{ margin: '0.25rem 0 0.5rem 0' }}>Subscription Not Activated</h4>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
              {errorMessage || 'The merchant declined this transaction. Paid chapters remain locked.'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => {
                  setErrorMessage('');
                  setStep('review');
                }}
                className="btn btn-primary btn-sm"
              >
                Try Another Payment
              </button>
              <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
