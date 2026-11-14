import React, { useEffect, useMemo, useState } from 'react';
import {
  Lock,
  CheckCircle2,
  X,
} from 'lucide-react';
import privacyPolicyHtml from '../../privacy-policy.html?raw';

interface PublicFooterProps {
  onNavigate: (view: string) => void;
  onOpenSettings?: () => void;
}

type PolicyTab = 'privacy' | 'terms' | 'disclaimers';

export const PublicFooter: React.FC<PublicFooterProps> = ({
  onNavigate,
  onOpenSettings,
}) => {
  const [policyTab, setPolicyTab] = useState<PolicyTab | null>(null);
  const privacyPolicyMarkup = useMemo(
    () => {
      const mainMarkup = privacyPolicyHtml.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? '';
      return mainMarkup
        .replace(/<nav\b(?=[^>]*\bclass=["'][^"']*\bpagination\b[^"']*["'])[^>]*>[\s\S]*?<\/nav>/i, '')
        .replace(/<h1\b[^>]*>[\s\S]*?<\/h1>\s*<p\b[^>]*class=["']policy-updated["'][^>]*>[\s\S]*?<\/p>/i, '');
    },
    [],
  );

  useEffect(() => {
    if (!policyTab) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPolicyTab(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [policyTab]);

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        padding: 'var(--space-12) var(--space-6) var(--space-8)',
        color: 'var(--color-text-muted)',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--space-8)',
          marginBottom: 'var(--space-8)',
        }}
      >
        {/* Column 1: Platform Brand & Publisher */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#f8fafc',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                flexShrink: 0,
                padding: '2px',
              }}
            >
              <img
                src="/assets/sclogo/logo_8c2b321c.png"
                alt="WebZoneBW SC"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
            <span
              className="font-heading"
              style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 800,
                color: 'var(--color-text-strong)',
              }}
            >
              Zero-to-Website
            </span>
          </div>

          <p style={{ fontSize: 'var(--text-xs)', lineHeight: 1.6, margin: '0 0 1rem 0', color: 'var(--color-text-muted)' }}>
            Turn curiosity into practical skills. Explore clear lessons, useful ideas, and guided courses that help you move from beginner to confident creator.
          </p>

          <div
            style={{
              padding: '0.65rem 0.85rem',
              backgroundColor: 'var(--color-surface-subtle)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-md)',
              fontSize: '11px',
              lineHeight: 1.5,
            }}
          >
            <div style={{ fontWeight: 700, color: 'var(--color-text-strong)', marginBottom: '0.2rem' }}>
              Publisher &amp; Content Owner:
            </div>
            <div style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
              Sameer Chouhan / WebZoneBW
            </div>
            <div style={{ fontSize: '10px', color: 'var(--color-text-subtle)', marginTop: '0.25rem' }}>
              Email delivery remains disabled until official domain email verification is completed.
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4
            className="font-heading"
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 700,
              color: 'var(--color-text-strong)',
              marginBottom: '0.85rem',
            }}
          >
            Quick Links
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem 0', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: 'var(--text-xs)' }}>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('courses')}
                className="btn-link"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', textAlign: 'left', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <span>Course Modules &amp; Syllabus</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('public-practice')}
                className="btn-link"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', textAlign: 'left', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <span>Live Code</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('public-blog')}
                className="btn-link"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', textAlign: 'left', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <span>Blog</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('membership')}
                className="btn-link"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', textAlign: 'left', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <span>Pricing Plans &amp; Weekly Membership</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('free-lessons')}
                className="btn-link"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', textAlign: 'left', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <span>Free Introductory Lessons</span>
              </button>
            </li>
          </ul>

          <div style={{ paddingTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.75rem' }}
              title="Open Studio & Merchant Workspace"
            >
              <Lock size={12} />
              <span>Admin Studio</span>
            </button>
            {onOpenSettings && (
              <button
                type="button"
                onClick={onOpenSettings}
                className="btn btn-subtle btn-sm"
                style={{ fontSize: '11px', padding: '0.35rem 0.75rem' }}
              >
                Account &amp; Theme
              </button>
            )}
          </div>
        </div>

        {/* Column 3: Trust & Guarantee */}
        <div>
          <h4
            className="font-heading"
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 700,
              color: 'var(--color-text-strong)',
              marginBottom: '0.85rem',
            }}
          >
            Trust &amp; Guarantee
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: 'var(--text-xs)' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
              <CheckCircle2 size={14} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
              <span>Transparent access and licensing for all educational material</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
              <CheckCircle2 size={14} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
              <span>Clear subscription and cancellation terms</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
              <CheckCircle2 size={14} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
              <span>Privacy and responsible data handling</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
              <CheckCircle2 size={14} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
              <span>Accurate, production-tested course information</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Platform Details */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          borderTop: '1px solid var(--color-border-subtle)',
          paddingTop: 'var(--space-4)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
          fontSize: '11px',
          color: 'var(--color-text-subtle)',
        }}
      >
        <div>
          © 2026 Zero-to-Website. Published by Sameer Chouhan / WebZoneBW.
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setPolicyTab('privacy')}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', fontSize: 'inherit' }}
          >
            Privacy Policy
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => setPolicyTab('terms')}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', fontSize: 'inherit' }}
          >
            Terms of Service
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => setPolicyTab('disclaimers')}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', fontSize: 'inherit' }}
          >
            Disclaimers
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('webzonebw:open-privacy-choices'))}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', fontSize: 'inherit' }}
          >
            Cookie settings
          </button>
        </div>
      </div>

      {/* Policy & Publisher Modal */}
      {policyTab && (
        <div className="modal-overlay" onClick={() => setPolicyTab(null)}>
          <div
            className="modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="footer-policy-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3 id="footer-policy-title" style={{ margin: 0, fontSize: 'var(--text-lg)' }}>
                {policyTab === 'privacy'
                  ? 'Privacy Policy'
                  : policyTab === 'terms'
                    ? 'Terms of Service & Subscription Rules'
                    : 'Publisher Disclaimers & Disclosures'}
              </h3>
              <button
                type="button"
                onClick={() => setPolicyTab(null)}
                className="btn btn-subtle btn-sm btn-icon-only"
                aria-label="Close policy dialog"
              >
                <X size={18} />
              </button>
            </div>
            {policyTab === 'privacy' ? (
              <div className="modal-body privacy-policy-modal-content">
                <div dangerouslySetInnerHTML={{ __html: privacyPolicyMarkup }} />
              </div>
            ) : (
            <div className="modal-body" style={{ fontSize: 'var(--text-xs)', lineHeight: 1.65, color: 'var(--color-text)' }}>
              {policyTab === 'terms' && (
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <p style={{ margin: 0 }}>
                    <strong>Free &amp; Paid Access:</strong> Chapter 00 introductory lessons and Live Code are free for personal learning. Chapters 01–10 and offline PDF study packs unlock automatically after server-side merchant verification of the Weekly Learning Membership ($19.00 USD / month).
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>Cancellation &amp; Refunds:</strong> You may cancel auto-renewal with one click at any time while retaining access through the end of your prepaid billing cycle. Verified 14-day refunds automatically revoke future subscription access.
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>Licences:</strong> Personal learning and downloaded study packs are licensed for individual study and may not be resold or redistributed publicly.
                  </p>
                </div>
              )}
              {policyTab === 'disclaimers' && (
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <p style={{ margin: 0 }}>
                    <strong>Publisher Identity:</strong> Zero-to-Website is published and owned by <strong>Sameer Chouhan / WebZoneBW</strong>.
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>Course Status:</strong> Published tracks contain verified lessons, working code examples, and knowledge checks. Upcoming blueprints are clearly labelled as in editorial development and are not sold as completed courses.
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>Payment Mode:</strong> Checkout enforces server-side order creation, merchant API verification, signed webhooks, and distinct settlement reconciliation. When live merchant credentials are absent from server environment variables, orders run in isolated sandbox verification mode.
                  </p>
                </div>
              )}
            </div>
            )}
            <div className="modal-footer">
              <button
                type="button"
                onClick={() => setPolicyTab(null)}
                className="btn btn-primary btn-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

