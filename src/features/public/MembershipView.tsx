import React, { useState } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Download,
  HelpCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { LicencePurchaseModal } from '../ownership-licensing/LicencePurchaseModal';
import { useAuth } from '../../utils/AuthContext';
import * as authService from '../../utils/authService';

interface MembershipViewProps {
  onAddToast: (title: string, message: string, type?: 'info' | 'success' | 'update') => void;
  onOpenLesson: (lessonId: string) => void;
}

export const MembershipView: React.FC<MembershipViewProps> = ({
  onAddToast,
  onOpenLesson,
}) => {
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [cancelBusy, setCancelBusy] = useState(false);
  const { entitlement, refreshEntitlement } = useAuth();

  const activeSub = entitlement.activeSubscription;
  const hasActivePack = entitlement.hasActiveMonthlyPack;

  const handleCancelSubscription = async () => {
    if (!activeSub?.subscriptionId) return;
    setCancelBusy(true);
    try {
      const res = await authService.cancelMonthlySubscription(activeSub.subscriptionId);
      if (res.success) {
        await refreshEntitlement();
        onAddToast(
          'Auto-Renewal Cancelled',
          'Your Monthly Pack remains active until the end of the current paid cycle.',
          'info'
        );
      } else {
        onAddToast('Cancellation Error', res.error || 'Could not cancel subscription.', 'info');
      }
    } catch (err: any) {
      onAddToast('Cancellation Error', err?.message || 'Network error.', 'info');
    } finally {
      setCancelBusy(false);
    }
  };

  return (
    <div
      className="membership-container"
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: 'var(--space-12) var(--space-6) var(--space-20)',
      }}
    >
      {/* 1. Page Header */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto var(--space-10)' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-primary-subtle)',
            color: 'var(--color-primary)',
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            marginBottom: 'var(--space-4)',
          }}
        >
          <Sparkles size={14} />
          <span>Continuous Web Engineering Education</span>
        </span>

        <h1
          className="font-heading"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: 'var(--color-text-strong)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: 'var(--space-4)',
          }}
        >
          Weekly Learning Membership
        </h1>

        <p
          style={{
            fontSize: 'var(--text-md)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Master modern web architecture with continuous weekly releases, expanded chapters, formatted offline PDF study sheets, and interactive code sandboxes.
        </p>
      </div>

      {/* Active Subscription Banner (when verified by merchant gateway) */}
      {hasActivePack && activeSub && (
        <div
          className="card"
          style={{
            maxWidth: '760px',
            margin: '0 auto var(--space-10)',
            padding: 'var(--space-6)',
            border: '2px solid var(--color-success)',
            backgroundColor: 'var(--color-success-bg)',
            borderRadius: 'var(--radius-xl)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            <div>
              <span className="badge badge-success" style={{ marginBottom: '0.4rem' }}>
                {activeSub.status === 'cancelled_active_until_expiry'
                  ? 'Cancelled — Active Until Expiry'
                  : 'Subscription Activated'}
              </span>
              <h2 style={{ margin: '0.25rem 0', fontSize: 'var(--text-xl)' }}>
                {activeSub.planTitle}
              </h2>
              <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                Verified Transaction: <code>{activeSub.merchantTransactionId}</code> · Order:{' '}
                <code>{activeSub.orderId}</code>
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-success)' }}>
                ${activeSub.verifiedAmountUsd.toFixed(2)} {activeSub.currency}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                Started {new Date(activeSub.startDate).toLocaleDateString()}
              </div>
              {activeSub.expiresAt && (
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  {activeSub.autoRenew ? 'Next Renewal:' : 'Access Ends:'}{' '}
                  <strong>{new Date(activeSub.expiresAt).toLocaleDateString()}</strong>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => onOpenLesson('ch-01-l-01')}
              className="btn btn-primary btn-sm"
            >
              <span>Open Chapter 01 (Unlocked)</span>
              <ArrowRight size={14} />
            </button>
            {activeSub.status === 'active' && activeSub.autoRenew && (
              <button
                type="button"
                onClick={handleCancelSubscription}
                disabled={cancelBusy}
                className="btn btn-secondary btn-sm"
              >
                {cancelBusy ? 'Cancelling...' : 'Cancel Auto-Renewal (1-Click)'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* 2. Primary Plan Card */}
      <div
        className="card"
        style={{
          maxWidth: '620px',
          margin: '0 auto var(--space-16)',
          padding: 'var(--space-8)',
          backgroundColor: 'var(--color-surface)',
          border: '2px solid var(--color-primary)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-md)',
          position: 'relative',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '-12px',
            right: '24px',
            backgroundColor: 'var(--color-primary)',
            color: '#ffffff',
            fontSize: '11px',
            fontWeight: 800,
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--radius-full)',
          }}
        >
          OFFICIAL MEMBERSHIP
        </span>

        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <div
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--color-primary)',
            }}
          >
            MONTHLY SUBSCRIPTION PLAN
          </div>
          <div
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 800,
              color: 'var(--color-text-strong)',
              lineHeight: 1,
              margin: '0.5rem 0',
            }}
          >
            $19{' '}
            <span
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                color: 'var(--color-text-subtle)',
              }}
            >
              USD / month
            </span>
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
            Content published weekly • Billed once per calendar month • Unlocks automatically after merchant verification
          </p>
        </div>

        {/* Inclusions List */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
            marginBottom: 'var(--space-8)',
            borderTop: '1px solid var(--color-border-subtle)',
            borderBottom: '1px solid var(--color-border-subtle)',
            padding: 'var(--space-6) 0',
          }}
        >
          {[
            'Continuous Access: 1 new deep-dive lesson or expanded chapter released every week',
            'Full Access to all 11 core chapters (HTML5, Modern CSS3, DOM, REST APIs, Git & Deployment)',
            'Downloadable Offline PDF Study Packs with personal study licence and watermark',
            'Interactive In-Browser Code Sandboxes with automated test verification',
            'Priority AI Tutor Guidance and author question answering',
            'Permanent Lifetime Retention: Retain completed lessons even if subscription ends',
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-strong)',
              }}
            >
              <CheckCircle2
                size={16}
                style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '2px' }}
              />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Subscribe / Open Chapters Button */}
        {hasActivePack ? (
          <button
            type="button"
            onClick={() => onOpenLesson('ch-01-l-01')}
            className="btn btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '0.85rem',
              fontSize: 'var(--text-md)',
              fontWeight: 700,
            }}
          >
            <span>Monthly Pack Active — Jump to Chapter 01</span>
            <ArrowRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setPurchaseModalOpen(true)}
            className="btn btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '0.85rem',
              fontSize: 'var(--text-md)',
              fontWeight: 700,
            }}
          >
            <span>Subscribe — $19 USD / Month</span>
            <ArrowRight size={16} />
          </button>
        )}

        <div
          style={{
            textAlign: 'center',
            marginTop: '0.75rem',
            fontSize: '11px',
            color: 'var(--color-text-subtle)',
          }}
        >
          14-Day Money-Back Guarantee • Server-Verified Merchant Checkout • No Hidden Fees
        </div>
      </div>

      {/* 3. Subscription & Expiry Rules (Pre-Checkout Disclosure) */}
      <div style={{ marginBottom: 'var(--space-16)' }}>
        <h2
          className="font-heading"
          style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 800,
            textAlign: 'center',
            marginBottom: 'var(--space-6)',
          }}
        >
          Transparent Membership Terms &amp; Access Rules
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-5)',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Clock size={16} style={{ color: 'var(--color-primary)' }} />
              <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-strong)' }}>
                Billing Cadence vs. Content Delivery
              </strong>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
              <strong>Content is released weekly:</strong> Every week, a new lesson, expanded chapter, or deep-dive masterclass is published to your account. <strong>Billing is monthly:</strong> You are charged once per calendar month ($19.00 USD) until you decide to cancel.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Download size={16} style={{ color: 'var(--color-success)' }} />
              <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-strong)' }}>
                Offline PDF Textbook Retention
              </strong>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
              All PDF textbook packs downloaded during your active membership belong to you permanently for personal study. You are not required to return or delete downloaded reference materials upon subscription cancellation.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <ShieldCheck size={16} style={{ color: 'var(--color-accent)' }} />
              <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-strong)' }}>
                1-Click Cancellation Policy
              </strong>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
              You may cancel your membership at any time with 1 click from this page or Student Settings. Your access remains active until the end of your prepaid billing cycle without penalties.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <HelpCircle size={16} style={{ color: 'var(--color-warning)' }} />
              <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-strong)' }}>
                14-Day Refund Guarantee
              </strong>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
              If you join and feel the lessons do not meet your technical expectations, refunds processed through the merchant dashboard automatically revoke future access while maintaining an accurate audit trail.
            </p>
          </div>
        </div>
      </div>

      {/* 4. FAQs */}
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <h2
          className="font-heading"
          style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 800,
            textAlign: 'center',
            marginBottom: 'var(--space-6)',
          }}
        >
          Frequently Asked Questions
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            {
              q: 'Can I start with free lessons before subscribing?',
              a: 'Yes. Chapter 00 (Foundations & Mental Models) is 100% free and open for public reading with full interactive code sandboxes and quizzes without requiring a credit card or sign-up.',
            },
            {
              q: 'How fast does my Monthly Pack activate after checkout?',
              a: 'Immediately after merchant checkout completes, our backend verifies transaction status, amount, currency, and ownership directly with the merchant API (5–10s target) and unlocks all chapters automatically.',
            },
            {
              q: 'Is there an annual membership plan?',
              a: 'An annual billing option is currently in preparation. Only the confirmed $19.00 USD monthly plan is active until the annual plan terms are finalized.',
            },
            {
              q: 'Who owns and publishes this curriculum?',
              a: 'All course materials are written, reviewed, and published under the official platform ownership of Sameer Chouhan / WebZoneBW.',
            },
          ].map((faq, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'var(--color-surface-subtle)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4)',
              }}
            >
              <strong
                style={{
                  display: 'block',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-strong)',
                  marginBottom: '0.35rem',
                }}
              >
                {faq.q}
              </strong>
              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Checkout Modal */}
      <LicencePurchaseModal
        isOpen={purchaseModalOpen}
        onClose={() => setPurchaseModalOpen(false)}
        contentId="curriculum-core-webzone"
        contentTitle="Weekly Learning Membership — Monthly Pack"
        availableLicences={['subscription-access']}
        defaultSelectedLicence="subscription-access"
        pricingUsd={{
          'personal-learning': 0,
          'downloadable-learning': 29,
          'commercial-use': 149,
          'creator-distribution': 499,
          'subscription-access': 19,
          'limited-term-access': 0,
        }}
        onSuccessGrant={() => {
          void refreshEntitlement();
          onAddToast(
            'Subscription Activated',
            'Merchant verified your Monthly Pack! Chapters 01–10 and PDFs are unlocked.',
            'success'
          );
        }}
      />
    </div>
  );
};
