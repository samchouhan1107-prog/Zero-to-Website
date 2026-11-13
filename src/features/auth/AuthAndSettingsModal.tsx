import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Download,
  Upload,
  LogOut,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  KeyRound,
} from 'lucide-react';
import { AppTheme, UserProgress } from '../../utils/types';
import { useAuth } from '../../utils/AuthContext';
import * as authService from '../../utils/authService';

interface AuthAndSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
  progress: UserProgress;
  onImportProgress?: (progress: UserProgress) => void;
}

export const AuthAndSettingsModal: React.FC<AuthAndSettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onThemeChange,
  progress,
  onImportProgress,
}) => {
  const [activeTab, setActiveTab] = useState<'theme' | 'account' | 'data'>('theme');
  const { user, isAuthenticated, entitlement, login, logout, refreshEntitlement } = useAuth();

  // Account auth form state
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [authBusy, setAuthBusy] = useState(false);
  const [cancelBusy, setCancelBusy] = useState(false);
  const [accountMessage, setAccountMessage] = useState('');

  if (!isOpen) return null;

  const isEmailStudent = Boolean(user && user.method !== 'guest' && user.email);

  const handleGuestLogin = async () => {
    setAuthError('');
    setAccountMessage('');
    const guestUser = await authService.createGuestSession();
    login(guestUser);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAccountMessage('');
    setAuthBusy(true);
    try {
      const res =
        authMode === 'signup'
          ? await authService.signUp(nameInput, emailInput, passwordInput)
          : await authService.signIn(emailInput, passwordInput);
      if (res.success && res.user) {
        login(res.user);
        setPasswordInput('');
        setAccountMessage(
          authMode === 'signup'
            ? 'Student account created and signed in.'
            : 'Signed in to your student account.'
        );
      } else {
        setAuthError(res.error || 'Authentication failed.');
      }
    } catch (err: any) {
      setAuthError(err?.message || 'Network error while signing in.');
    } finally {
      setAuthBusy(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!entitlement.activeSubscription?.subscriptionId) return;
    setCancelBusy(true);
    setAuthError('');
    setAccountMessage('');
    try {
      const res = await authService.cancelMonthlySubscription(
        entitlement.activeSubscription.subscriptionId
      );
      if (res.success) {
        await refreshEntitlement();
        setAccountMessage(
          'Auto-renewal cancelled. Your Monthly Pack remains active until the end of the current paid period.'
        );
      } else {
        setAuthError(res.error || 'Unable to cancel subscription.');
      }
    } catch (err: any) {
      setAuthError(err?.message || 'Error cancelling subscription.');
    } finally {
      setCancelBusy(false);
    }
  };

  const handleExportData = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(progress, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute(
      'download',
      `zerotowebsite-progress-${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (onImportProgress && typeof parsed === 'object') {
          onImportProgress(parsed);
          setAccountMessage('Progress successfully imported!');
        }
      } catch {
        setAuthError('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const activeSub = entitlement.activeSubscription;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ margin: 0, fontSize: 'var(--text-lg)' }}>
            Platform Settings &amp; Student Account
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-subtle btn-sm"
            aria-label="Close settings modal"
          >
            ✕
          </button>
        </div>

        {/* Tab Selection */}
        <div
          className="tabs-nav"
          style={{ padding: '0 var(--space-6)', marginTop: 'var(--space-2)' }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('theme')}
            className={`tab-btn ${activeTab === 'theme' ? 'active' : ''}`}
          >
            Appearance &amp; Theme
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('account')}
            className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`}
          >
            Student Account &amp; Plan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('data')}
            className={`tab-btn ${activeTab === 'data' ? 'active' : ''}`}
          >
            Data &amp; Backup
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'theme' && (
            <div>
              <h4 style={{ marginBottom: 'var(--space-2)' }}>Theme Selection</h4>
              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                Choose between Soft Porcelain Light for bright daytime study or Midnight Obsidian Dark for low-glare reading.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'var(--space-4)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                <button
                  type="button"
                  onClick={() => onThemeChange('light')}
                  style={{
                    padding: 'var(--space-5)',
                    borderRadius: 'var(--radius-lg)',
                    border:
                      theme === 'light'
                        ? '2px solid var(--color-accent)'
                        : '1px solid var(--color-border)',
                    backgroundColor: '#f8fafc',
                    color: '#0f172a',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <Sun size={18} style={{ color: '#d97706' }} />
                    <strong style={{ color: '#0f172a' }}>Soft Porcelain Light</strong>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 'var(--text-xs)',
                      color: '#475569',
                      lineHeight: 1.4,
                    }}
                  >
                    Clean editorial daylight surfaces with crisp typography and indigo accents.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => onThemeChange('dark')}
                  style={{
                    padding: 'var(--space-5)',
                    borderRadius: 'var(--radius-lg)',
                    border:
                      theme === 'dark'
                        ? '2px solid var(--color-accent)'
                        : '1px solid var(--color-border)',
                    backgroundColor: '#0b0e14',
                    color: '#f8fafc',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <Moon size={18} style={{ color: '#38bdf8' }} />
                    <strong style={{ color: '#ffffff' }}>Midnight Obsidian Dark</strong>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 'var(--text-xs)',
                      color: '#94a3b8',
                      lineHeight: 1.4,
                    }}
                  >
                    Deep obsidian background with high-contrast text and sky-blue accents.
                  </p>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div>
              {/* Current Account Banner */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--space-4)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--color-surface-subtle)',
                  border: '1px solid var(--color-border)',
                  marginBottom: 'var(--space-5)',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-primary-subtle)',
                      border: '1px solid var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-primary)',
                      fontSize: '1.2rem',
                      fontWeight: 800,
                    }}
                  >
                    {user?.name?.slice(0, 1).toUpperCase() || 'G'}
                  </div>
                  <div>
                    <h4 style={{ margin: 0 }}>{user?.name || 'Guest Learner'}</h4>
                    <p
                      style={{
                        margin: '0.15rem 0 0 0',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {isEmailStudent
                        ? `${user?.email} · Authenticated Student`
                        : isAuthenticated
                        ? 'Guest session (sign in below to purchase or sync Monthly Pack)'
                        : 'Not signed in'}
                    </p>
                  </div>
                </div>

                {isAuthenticated && (
                  <button
                    type="button"
                    onClick={logout}
                    className="btn btn-secondary btn-sm"
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                )}
              </div>

              {/* Subscription Entitlement Summary */}
              {isEmailStudent && (
                <div
                  style={{
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-md)',
                    border: entitlement.hasActiveMonthlyPack
                      ? '1px solid var(--color-success-border)'
                      : '1px solid var(--color-border)',
                    backgroundColor: entitlement.hasActiveMonthlyPack
                      ? 'var(--color-success-bg)'
                      : 'var(--color-surface-subtle)',
                    marginBottom: 'var(--space-5)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-strong)' }}>
                      Monthly Pack &amp; Subscription Status
                    </strong>
                    <span
                      className={`badge ${
                        entitlement.hasActiveMonthlyPack ? 'badge-success' : 'badge-subtle'
                      }`}
                    >
                      {entitlement.status === 'active'
                        ? 'Subscription Activated'
                        : entitlement.status === 'cancelled_active_until_expiry'
                        ? 'Cancelled (Active Until Expiry)'
                        : entitlement.status === 'expired'
                        ? 'Expired'
                        : entitlement.status === 'refunded'
                        ? 'Refunded'
                        : 'Free Chapter 00 Only'}
                    </span>
                  </div>

                  {activeSub ? (
                    <div
                      style={{
                        display: 'grid',
                        gap: '0.3rem',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      <div>
                        Plan: <strong>{activeSub.planTitle}</strong> (${activeSub.verifiedAmountUsd.toFixed(2)} {activeSub.currency})
                      </div>
                      <div>
                        Start Date: <strong>{new Date(activeSub.startDate).toLocaleDateString()}</strong>
                        {activeSub.expiresAt && (
                          <>
                            {' '}· Expires: <strong>{new Date(activeSub.expiresAt).toLocaleDateString()}</strong>
                          </>
                        )}
                      </div>
                      <div>
                        Merchant Txn Ref: <code>{activeSub.merchantTransactionId}</code>
                      </div>
                      {activeSub.status === 'active' && activeSub.autoRenew && (
                        <div style={{ marginTop: '0.5rem' }}>
                          <button
                            type="button"
                            onClick={handleCancelSubscription}
                            disabled={cancelBusy}
                            className="btn btn-secondary btn-sm"
                          >
                            {cancelBusy ? 'Cancelling Auto-Renewal...' : 'Cancel Auto-Renewal (1-Click)'}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                      No verified paid Monthly Pack on this account yet. Chapter 00 is free for all learners.
                    </p>
                  )}
                </div>
              )}

              {authError && (
                <div
                  style={{
                    backgroundColor: 'var(--color-danger-bg)',
                    border: '1px solid var(--color-danger-border)',
                    color: 'var(--color-danger)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-xs)',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                  }}
                >
                  <AlertTriangle size={14} />
                  <span>{authError}</span>
                </div>
              )}

              {accountMessage && (
                <div
                  style={{
                    backgroundColor: 'var(--color-success-bg)',
                    border: '1px solid var(--color-success-border)',
                    color: 'var(--color-success)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-xs)',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                  }}
                >
                  <CheckCircle2 size={14} />
                  <span>{accountMessage}</span>
                </div>
              )}

              {/* Sign In / Create Account Form */}
              {!isEmailStudent && (
                <form
                  onSubmit={handleAuthSubmit}
                  style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-4)',
                    display: 'grid',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: 'var(--text-sm)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <KeyRound size={15} style={{ color: 'var(--color-primary)' }} />
                      {authMode === 'signin' ? 'Student Sign In' : 'Create Student Account'}
                    </strong>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                        setAuthError('');
                      }}
                      className="btn btn-subtle btn-sm"
                      style={{ fontSize: '11px' }}
                    >
                      {authMode === 'signin' ? 'Need an account? Sign Up' : 'Already registered? Sign In'}
                    </button>
                  </div>

                  {authMode === 'signup' && (
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '0.25rem' }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Student Name"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '0.25rem' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="you@example.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '0.25rem' }}>
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-input"
                      placeholder="Minimum 6 characters"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ fontSize: '11px', color: 'var(--color-text-subtle)' }}>
                    Seeded test student account: <code>scholar@demo.local</code> / <code>DemoPass123!</code>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button type="submit" disabled={authBusy} className="btn btn-primary btn-sm">
                      <ShieldCheck size={14} />
                      <span>
                        {authBusy
                          ? 'Authenticating...'
                          : authMode === 'signin'
                          ? 'Sign In'
                          : 'Create Account'}
                      </span>
                    </button>
                    {!isAuthenticated && (
                      <button
                        type="button"
                        onClick={handleGuestLogin}
                        className="btn btn-secondary btn-sm"
                      >
                        Continue as Guest
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          )}

          {activeTab === 'data' && (
            <div>
              <h4 style={{ marginBottom: 'var(--space-2)' }}>Data Portability &amp; Backup</h4>
              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                Your learning progress belongs to you. Export your entire course completion log, notes, and milestones to JSON anytime.
              </p>

              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleExportData}
                  className="btn btn-secondary btn-md"
                >
                  <Download size={16} />
                  <span>Export Progress JSON</span>
                </button>

                <label className="btn btn-secondary btn-md" style={{ cursor: 'pointer' }}>
                  <Upload size={16} />
                  <span>Import Progress JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportFile}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" onClick={onClose} className="btn btn-primary btn-md">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
