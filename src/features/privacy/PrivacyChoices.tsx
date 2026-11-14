import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const CONSENT_KEY = 'webzonebw_privacy_choices_v1';
const ANALYTICS_ID = 'G-L1KR6MWWP3';

interface PrivacyChoicesRecord {
  analytics: boolean;
  savedAt: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    webzoneAnalyticsLoaded?: boolean;
  }
}

function readChoices(): PrivacyChoicesRecord | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PrivacyChoicesRecord>;
    return typeof parsed.analytics === 'boolean' ? { analytics: parsed.analytics, savedAt: parsed.savedAt || '' } : null;
  } catch {
    return null;
  }
}

function loadAnalytics(): void {
  if (typeof window === 'undefined' || window.webzoneAnalyticsLoaded) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', ANALYTICS_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`;
  script.dataset.webzoneAnalytics = 'true';
  document.head.appendChild(script);
  window.webzoneAnalyticsLoaded = true;
}

function disableAnalytics(): void {
  if (!window.webzoneAnalyticsLoaded) return;
  window.gtag?.('consent', 'update', { analytics_storage: 'denied' });

  const host = window.location.hostname;
  const cookieNames = document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=')[0])
    .filter((name) => name === '_ga' || name.startsWith('_ga_') || name === '_gid');
  for (const name of cookieNames) {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${host}; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${host}; SameSite=Lax`;
  }
}

export const PrivacyChoices: React.FC = () => {
  const [savedChoices, setSavedChoices] = useState<PrivacyChoicesRecord | null>(readChoices);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(() => readChoices()?.analytics ?? false);
  const [settingsOpen, setSettingsOpen] = useState(() => readChoices() === null);

  useEffect(() => {
    if (savedChoices?.analytics) loadAnalytics();
  }, [savedChoices]);

  useEffect(() => {
    const openSettings = () => setSettingsOpen(true);
    window.addEventListener('webzonebw:open-privacy-choices', openSettings);
    return () => window.removeEventListener('webzonebw:open-privacy-choices', openSettings);
  }, []);

  useEffect(() => {
    if (!settingsOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSettingsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [settingsOpen]);

  const saveChoices = (analytics: boolean) => {
    const nextChoices: PrivacyChoicesRecord = { analytics, savedAt: new Date().toISOString() };
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(nextChoices));
    } catch {
      // If preferences cannot be saved, optional analytics stays disabled.
      if (analytics) return;
    }
    if (!analytics) disableAnalytics();
    setAnalyticsEnabled(analytics);
    setSavedChoices(nextChoices);
    setSettingsOpen(false);
  };

  return (
    <>
      {settingsOpen && (
        <div className="modal-overlay" onClick={() => setSettingsOpen(false)}>
          <div
            className="modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-choices-title"
            aria-describedby="privacy-choices-description"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <h3 id="privacy-choices-title" style={{ margin: 0, fontSize: 'var(--text-lg)' }}>
                Cookie settings
              </h3>
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="btn btn-subtle btn-sm btn-icon-only"
                aria-label="Close cookie settings"
              >
                <X size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ fontSize: 'var(--text-xs)', lineHeight: 1.65, color: 'var(--color-text)' }}>
              <p id="privacy-choices-description" style={{ marginTop: 0, marginBottom: 'var(--space-3)', color: 'var(--color-text-muted)' }}>
                Optional Google Analytics helps us understand site usage. It stays off unless you allow it. This setting is for analytics only; advertising consent will be handled separately if ads are introduced.
              </p>
              <label htmlFor="optional-analytics" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBlock: 'var(--space-3)' }}>
                <input
                  id="optional-analytics"
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(event) => setAnalyticsEnabled(event.target.checked)}
                />
                Allow optional Google Analytics
              </label>
              <nav aria-label="Privacy information" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: 'var(--space-3)' }}>
                <a href="/privacy-policy.html">Privacy policy</a>
                <a href="/cookie-policy.html">Cookie policy</a>
              </nav>
            </div>
            <div className="modal-footer" style={{ flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => saveChoices(analyticsEnabled)}>
                Save cookie settings
              </button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => saveChoices(false)}>
                Reject optional analytics
              </button>
              {savedChoices && (
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setSettingsOpen(false)}>
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
