import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as authService from '../utils/authService';
import {
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Eye,
  EyeOff,
  FileCheck,
  Flame,
  LogOut,
  Mail,
  Settings,
  Sparkles,
  User,
  X,
  AlertCircle,
  CheckCircle,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { UserProgress } from '../utils/types';
import { useAuth } from '../utils/AuthContext';

export interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: () => void;
  progress: UserProgress;
  onOpenMilestones: () => void;
  onOpenCertificate?: () => void;
  onOpenSettings?: () => void;
}

type AuthTab = 'signin' | 'signup';
type AuthPhase = 'form' | 'loading' | 'success' | 'logged-in';

const GoogleLogo: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

/* ── Validation helpers ─────────────────────────────────── */
function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Please enter a valid email address';
  return null;
}

function validatePassword(password: string): string | null {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
}

function validateName(name: string): string | null {
  if (!name.trim()) return 'Full name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  return null;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  progress,
  onOpenMilestones,
  onOpenCertificate,
  onOpenSettings,
}) => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [authTab, setAuthTab] = useState<AuthTab>('signin');
  const [phase, setPhase] = useState<AuthPhase>('form');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  // Sign-in form
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign-up form
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirm, setSignUpConfirm] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Inline field errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const hasRealAccount = isAuthenticated && user?.method !== 'guest';

  /* ── Body scroll lock ─────────────────────────────────── */
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  /* ── Keyboard escape ──────────────────────────────────── */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  /* ── Determine phase from auth state ──────────────────── */
  useEffect(() => {
    if (hasRealAccount && phase === 'form') {
      setPhase('logged-in');
    }
  }, [hasRealAccount, phase]);

  /* ── Reset everything when modal opens ────────────────── */
  useEffect(() => {
    if (isOpen) {
      if (hasRealAccount) {
        setPhase('logged-in');
      } else {
        setPhase('form');
        setAuthTab('signin');
      }
      resetForms();
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isOpen) return null;

  const userLevel = Math.floor(progress.xpPoints / 100) + 1;
  const completedCount = Object.values(progress.completedLessons).filter(Boolean).length;

  const resetForms = () => {
    setSignInEmail('');
    setSignInPassword('');
    setSignUpName('');
    setSignUpEmail('');
    setSignUpPassword('');
    setSignUpConfirm('');
    setAgreedToTerms(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setError('');
    setFieldErrors({});
  };

  /* ── Google Sign-In (unavailable) ─────────────────────── */
  const handleGoogleLogin = () => {
    setError('Google Sign-In is not configured yet. Please use email sign-in instead.');
  };

  /* ── Sign In ──────────────────────────────────────────── */
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    // Validate
    const emailErr = validateEmail(signInEmail);
    const passErr = validatePassword(signInPassword);
    if (emailErr || passErr) {
      const errs: Record<string, string> = {};
      if (emailErr) errs.email = emailErr;
      if (passErr) errs.password = passErr;
      setFieldErrors(errs);
      return;
    }

    setLoading(true);
    try {
      const result = await authService.signIn(signInEmail.trim(), signInPassword);
      if (result.success && result.user) {
        setPhase('success');
        login(result.user);
        // Auto-close after brief success animation
        setTimeout(() => {
          if (onAuthSuccess) {
            onAuthSuccess();
          } else {
            onClose();
          }
        }, 1200);
      } else {
        setError(result.error || 'Sign in failed. Please check your credentials.');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    }
    setLoading(false);
  };

  /* ── Sign Up ──────────────────────────────────────────── */
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    // Validate all fields
    const nameErr = validateName(signUpName);
    const emailErr = validateEmail(signUpEmail);
    const passErr = validatePassword(signUpPassword);
    const errs: Record<string, string> = {};
    if (nameErr) errs.name = nameErr;
    if (emailErr) errs.email = emailErr;
    if (passErr) errs.password = passErr;
    if (signUpPassword !== signUpConfirm) errs.confirm = 'Passwords do not match';
    if (!agreedToTerms) errs.terms = 'You must agree to the Terms of Service';

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      if (errs.terms) setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    setLoading(true);
    try {
      const result = await authService.signUp(signUpName.trim(), signUpEmail.trim(), signUpPassword);
      if (result.success && result.user) {
        setPhase('success');
        login(result.user);
        // Auto-close after brief success animation
        setTimeout(() => {
          if (onAuthSuccess) {
            onAuthSuccess();
          } else {
            onClose();
          }
        }, 1200);
      } else {
        setError(result.error || 'Sign up failed. Please try again.');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    }
    setLoading(false);
  };

  /* ── Logout ───────────────────────────────────────────── */
  const handleLogout = async () => {
    await logout();
    resetForms();
    setPhase('form');
    setAuthTab('signin');
  };

  /* ── Guest ────────────────────────────────────────────── */
  const handleContinueAsGuest = () => {
    const guest = authService.createGuestSession();
    login(guest);
    if (onAuthSuccess) {
      onAuthSuccess();
    } else {
      onClose();
    }
  };

  /* ── Field error helper ───────────────────────────────── */
  const fieldError = (key: string) =>
    fieldErrors[key] ? (
      <p className="mt-1 flex items-center gap-1 text-[11px] text-red-400">
        <AlertCircle className="h-3 w-3 shrink-0" />
        {fieldErrors[key]}
      </p>
    ) : null;

  const inputClass = "w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors";
  const inputErrorClass = "w-full rounded-lg border border-red-500/50 bg-zinc-800/50 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-500/30 transition-colors";
  const btnPrimary = "w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-bold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";
  const btnGoogle = "w-full flex items-center justify-center gap-3 rounded-lg border border-zinc-600 bg-white py-3 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-100 hover:shadow-md active:scale-[0.98]";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── SUCCESS PHASE ───────────────────────────── */}
        {phase === 'success' ? (
          <div className="px-6 py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Welcome to WebZoneBW!</h3>
            <p className="text-sm text-zinc-400">Your account has been created successfully.</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-zinc-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Setting up your dashboard...</span>
            </div>
          </div>

        ) : phase === 'logged-in' && hasRealAccount ? (
          /* ══════════ LOGGED-IN ACCOUNT VIEW ══════════ */
          <div className="px-6 py-5">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 id="account-modal-title" className="text-[15px] font-bold text-white leading-tight">
                    Welcome, {user?.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Your learning dashboard</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Profile Card */}
              <div className="flex items-center gap-3.5 rounded-xl border border-zinc-800 bg-zinc-800/30 p-4">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-base shadow-lg shadow-blue-500/20">
                    {user?.method === 'google' ? <GoogleLogo className="h-6 w-6" /> : user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 border border-zinc-700">
                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-500 text-[8px] font-bold text-white">
                      {userLevel}
                    </span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm truncate">{user?.name}</span>
                    <span className="font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Lvl {userLevel}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 truncate mt-0.5">
                    {user?.method === 'google' ? 'Signed in with Google' : user?.method === 'guest' ? 'Guest session' : user?.email}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="rounded-xl border border-zinc-800 bg-zinc-800/30 p-3 text-center hover:border-zinc-700 transition-colors">
                  <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-sm">
                    <Flame className="h-3.5 w-3.5" />
                    <span>{progress.streakDays}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 mt-1 block">Day Streak</span>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-800/30 p-3 text-center hover:border-zinc-700 transition-colors">
                  <div className="flex items-center justify-center gap-1 text-blue-400 font-bold text-sm">
                    <Award className="h-3.5 w-3.5" />
                    <span>{progress.xpPoints}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 mt-1 block">XP Earned</span>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-800/30 p-3 text-center hover:border-zinc-700 transition-colors">
                  <div className="flex items-center justify-center gap-1 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{completedCount}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 mt-1 block">Completed</span>
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-1.5">
                {[
                  { icon: Sparkles, color: 'text-blue-400', label: 'Badges & Milestones', action: () => { onClose(); onOpenMilestones(); } },
                  ...(onOpenCertificate ? [{ icon: FileCheck, color: 'text-emerald-400', label: 'View Certificate', action: () => { onClose(); onOpenCertificate(); } }] : []),
                  ...(onOpenSettings ? [{ icon: Settings, color: 'text-zinc-400', label: 'Settings', action: () => { onClose(); onOpenSettings(); } }] : []),
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={item.action}
                    className="w-full flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-800/30 px-4 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700 hover:text-white transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                  </button>
                ))}
              </div>

              {/* Sign Out */}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-transparent py-2.5 text-xs font-semibold text-zinc-500 hover:text-white hover:bg-zinc-800/50 hover:border-zinc-700 transition-all"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

        ) : (
          /* ══════════ AUTH FORMS ══════════ */
          <>
            {/* ── Header ─────────────────────────────── */}
            <div className="px-6 pt-6 pb-5 border-b border-zinc-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 id="account-modal-title" className="text-[15px] font-bold text-white leading-tight">
                      {authTab === 'signin' ? 'Welcome Back' : 'Create Your Account'}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {authTab === 'signin'
                        ? 'Sign in to save your progress'
                        : 'Start your learning journey for free'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* ── Auth Tabs ────────────────────────── */}
              <div className="flex mt-4 bg-zinc-800/50 rounded-lg p-1 border border-zinc-800">
                <button
                  type="button"
                  onClick={() => { setAuthTab('signin'); resetForms(); setPhase('form'); }}
                  className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${
                    authTab === 'signin'
                      ? 'bg-zinc-700 text-white shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthTab('signup'); resetForms(); setPhase('form'); }}
                  className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${
                    authTab === 'signup'
                      ? 'bg-zinc-700 text-white shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* ── Body ─────────────────────────────── */}
            <div className="px-6 py-5">
              {/* Error Banner */}
              {error && (
                <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {authTab === 'signin' ? (
                /* ══════════ SIGN IN TAB ══════════ */
                <div className="space-y-4">
                  {/* Google Button (Unavailable) */}
                  <button type="button" onClick={handleGoogleLogin} className={btnGoogle} disabled>
                    <GoogleLogo />
                    <span className="opacity-60">Continue with Google</span>
                    <span className="ml-1 rounded bg-zinc-200 px-1.5 py-0.5 text-[9px] font-bold text-zinc-600">Soon</span>
                  </button>

                  {/* Divider */}
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-zinc-800" />
                    <span className="text-[11px] font-medium text-zinc-500">or sign in with email</span>
                    <div className="h-px flex-1 bg-zinc-800" />
                  </div>

                  {/* Email Form */}
                  <form onSubmit={handleEmailSignIn} className="space-y-3" noValidate>
                    <div>
                      <input
                        type="email"
                        value={signInEmail}
                        onChange={(e) => { setSignInEmail(e.target.value); setFieldErrors(prev => ({ ...prev, email: '' })); setError(''); }}
                        placeholder="Email address"
                        autoComplete="email"
                        className={fieldErrors.email ? inputErrorClass : inputClass}
                      />
                      {fieldError('email')}
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={signInPassword}
                        onChange={(e) => { setSignInPassword(e.target.value); setFieldErrors(prev => ({ ...prev, password: '' })); setError(''); }}
                        placeholder="Password"
                        autoComplete="current-password"
                        className={`${fieldErrors.password ? inputErrorClass : inputClass} pr-10`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {fieldErrors.password && (
                      <p className="flex items-center gap-1 text-[11px] text-red-400">
                        <AlertCircle className="h-3 w-3 shrink-0" />
                        {fieldErrors.password}
                      </p>
                    )}

                    <div className="flex items-center justify-end">
                      <button type="button" className="text-xs text-zinc-500 hover:text-blue-400 transition-colors">
                        Forgot password?
                      </button>
                    </div>

                    <button type="submit" disabled={loading} className={btnPrimary}>
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <>
                          <Mail className="h-4 w-4" />
                          <span>Sign In</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Switch to Sign Up */}
                  <p className="text-center text-sm text-zinc-500">
                    Don't have an account?{' '}
                    <button type="button" onClick={() => { setAuthTab('signup'); resetForms(); }} className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                      Sign Up
                    </button>
                  </p>

                  {/* Guest */}
                  <div className="text-center pt-1 border-t border-zinc-800">
                    <button type="button" onClick={handleContinueAsGuest} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors pt-3 inline-flex items-center gap-1">
                      <span>Continue as Guest</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>

              ) : (
                /* ══════════ SIGN UP TAB ══════════ */
                <div className="space-y-4">
                  {/* Google Button (Unavailable) */}
                  <button type="button" onClick={handleGoogleLogin} className={btnGoogle} disabled>
                    <GoogleLogo />
                    <span className="opacity-60">Continue with Google</span>
                    <span className="ml-1 rounded bg-zinc-200 px-1.5 py-0.5 text-[9px] font-bold text-zinc-600">Soon</span>
                  </button>

                  {/* Divider */}
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-zinc-800" />
                    <span className="text-[11px] font-medium text-zinc-500">or sign up with email</span>
                    <div className="h-px flex-1 bg-zinc-800" />
                  </div>

                  {/* Email Form */}
                  <form onSubmit={handleEmailSignUp} className="space-y-3" noValidate>
                    <div>
                      <input
                        type="text"
                        value={signUpName}
                        onChange={(e) => { setSignUpName(e.target.value); setFieldErrors(prev => ({ ...prev, name: '' })); setError(''); }}
                        placeholder="Full name"
                        autoComplete="name"
                        className={fieldErrors.name ? inputErrorClass : inputClass}
                      />
                      {fieldError('name')}
                    </div>
                    <div>
                      <input
                        type="email"
                        value={signUpEmail}
                        onChange={(e) => { setSignUpEmail(e.target.value); setFieldErrors(prev => ({ ...prev, email: '' })); setError(''); }}
                        placeholder="Email address"
                        autoComplete="email"
                        className={fieldErrors.email ? inputErrorClass : inputClass}
                      />
                      {fieldError('email')}
                    </div>
                    <div>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={signUpPassword}
                          onChange={(e) => { setSignUpPassword(e.target.value); setFieldErrors(prev => ({ ...prev, password: '' })); setError(''); }}
                          placeholder="Password (min. 6 characters)"
                          autoComplete="new-password"
                          className={`${fieldErrors.password ? inputErrorClass : inputClass} pr-10`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {fieldErrors.password && (
                        <p className="mt-1 flex items-center gap-1 text-[11px] text-red-400">
                          <AlertCircle className="h-3 w-3 shrink-0" />
                          {fieldErrors.password}
                        </p>
                      )}
                    </div>
                    <div>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={signUpConfirm}
                          onChange={(e) => { setSignUpConfirm(e.target.value); setFieldErrors(prev => ({ ...prev, confirm: '' })); setError(''); }}
                          placeholder="Confirm password"
                          autoComplete="new-password"
                          className={`${fieldErrors.confirm ? inputErrorClass : inputClass} pr-10`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {fieldErrors.confirm && (
                        <p className="mt-1 flex items-center gap-1 text-[11px] text-red-400">
                          <AlertCircle className="h-3 w-3 shrink-0" />
                          {fieldErrors.confirm}
                        </p>
                      )}
                    </div>

                    {/* Terms */}
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <div className="relative mt-0.5 shrink-0">
                        <input
                          type="checkbox"
                          checked={agreedToTerms}
                          onChange={(e) => { setAgreedToTerms(e.target.checked); setFieldErrors(prev => ({ ...prev, terms: '' })); setError(''); }}
                          className="peer sr-only"
                        />
                        <div className={`h-4 w-4 rounded border ${fieldErrors.terms ? 'border-red-500/50' : 'border-zinc-600'} bg-zinc-800 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors flex items-center justify-center`}>
                          {agreedToTerms && <Check className="h-3 w-3 text-white" />}
                        </div>
                      </div>
                      <span className="text-xs text-zinc-500 leading-relaxed">
                        I agree to the{' '}
                        <span className="text-blue-400 hover:text-blue-300 cursor-pointer">Terms of Service</span>
                        {' '}and{' '}
                        <span className="text-blue-400 hover:text-blue-300 cursor-pointer">Privacy Policy</span>
                      </span>
                    </label>
                    {fieldErrors.terms && (
                      <p className="flex items-center gap-1 text-[11px] text-red-400">
                        <AlertCircle className="h-3 w-3 shrink-0" />
                        {fieldErrors.terms}
                      </p>
                    )}

                    <button type="submit" disabled={loading} className={btnPrimary}>
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Creating account...</span>
                        </>
                      ) : (
                        <span>Create Account</span>
                      )}
                    </button>
                  </form>

                  {/* Switch to Sign In */}
                  <p className="text-center text-sm text-zinc-500">
                    Already have an account?{' '}
                    <button type="button" onClick={() => { setAuthTab('signin'); resetForms(); }} className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                      Sign In
                    </button>
                  </p>

                  {/* Guest */}
                  <div className="text-center pt-1 border-t border-zinc-800">
                    <button type="button" onClick={handleContinueAsGuest} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors pt-3 inline-flex items-center gap-1">
                      <span>Continue as Guest</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
