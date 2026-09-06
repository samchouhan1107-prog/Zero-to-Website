import React, { useState } from 'react';
import * as authService from '../utils/authService';
import {
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
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
} from 'lucide-react';
import { UserProgress } from '../utils/types';
import { useAuth } from '../utils/AuthContext';

export interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onOpenMilestones: () => void;
  onOpenCertificate?: () => void;
  onOpenSettings?: () => void;
}

type AuthTab = 'signin' | 'signup';

const GoogleLogo: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  progress,
  onOpenMilestones,
  onOpenCertificate,
  onOpenSettings,
}) => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [authTab, setAuthTab] = useState<AuthTab>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sign-in form
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign-up form
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirm, setSignUpConfirm] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await authService.signInWithGoogle('Google User', 'user@gmail.com');
      if (result.success && result.user) {
        login(result.user);
      } else {
        setError(result.error || 'Google sign-in failed');
      }
    } catch {
      setError('Google sign-in is not available right now.');
    }
    setLoading(false);
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (signInEmail) {
      const result = await authService.signIn(signInEmail, signInPassword);
      if (result.success && result.user) {
        login(result.user);
        resetForms();
      } else {
        setError(result.error || 'Sign in failed');
      }
    }
    setLoading(false);
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpPassword !== signUpConfirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    if (signUpName && signUpEmail && signUpPassword && agreedToTerms) {
      const result = await authService.signUp(signUpName, signUpEmail, signUpPassword);
      if (result.success && result.user) {
        login(result.user);
        resetForms();
      } else {
        setError(result.error || 'Sign up failed');
      }
    }
    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    resetForms();
  };

  const handleContinueAsGuest = () => {
    const guest = authService.createGuestSession();
    login(guest);
  };

  /* ── Shared input class ────────────────────────────── */
  const inputClass = "w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors";
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
        className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ─────────────────────────────── */}
        <div className="px-6 pt-6 pb-5 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h3 id="account-modal-title" className="text-[15px] font-bold text-white leading-tight">
                  {isAuthenticated
                    ? `Welcome, ${user?.name}`
                    : authTab === 'signin'
                    ? 'Welcome Back'
                    : 'Create Your Account'}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {isAuthenticated
                    ? 'Your learning dashboard'
                    : authTab === 'signin'
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
          {!isAuthenticated && (
            <div className="flex mt-4 bg-zinc-800/50 rounded-lg p-1 border border-zinc-800">
              <button
                type="button"
                onClick={() => { setAuthTab('signin'); resetForms(); }}
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
                onClick={() => { setAuthTab('signup'); resetForms(); }}
                className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${
                  authTab === 'signup'
                    ? 'bg-zinc-700 text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* ── Body ─────────────────────────────── */}
        <div className="px-6 py-5">
          {/* Error Banner */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {isAuthenticated ? (
            /* ══════════ LOGGED-IN ACCOUNT VIEW ══════════ */
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

          ) : authTab === 'signin' ? (
            /* ══════════ SIGN IN TAB ══════════ */
            <div className="space-y-4">
              {/* Google Button */}
              <button type="button" onClick={handleGoogleLogin} disabled={loading} className={btnGoogle}>
                <GoogleLogo />
                <span>Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-zinc-800" />
                <span className="text-[11px] font-medium text-zinc-500">or</span>
                <div className="h-px flex-1 bg-zinc-800" />
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailSignIn} className="space-y-3">
                <input
                  type="email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  autoComplete="email"
                  className={inputClass}
                />
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="Password"
                    required
                    autoComplete="current-password"
                    className={`${inputClass} pr-10`}
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

                <div className="flex items-center justify-end">
                  <button type="button" className="text-xs text-zinc-500 hover:text-blue-400 transition-colors">
                    Forgot password?
                  </button>
                </div>

                <button type="submit" disabled={loading} className={btnPrimary}>
                  <Mail className="h-4 w-4" />
                  <span>{loading ? 'Signing in...' : 'Sign In'}</span>
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
              <div className="text-center pt-1">
                <button type="button" onClick={handleContinueAsGuest} className="text-xs text-zinc-600 hover:text-zinc-400 underline underline-offset-2 transition-colors">
                  Continue as Guest
                </button>
              </div>
            </div>

          ) : (
            /* ══════════ SIGN UP TAB ══════════ */
            <div className="space-y-4">
              {/* Google Button */}
              <button type="button" onClick={handleGoogleLogin} disabled={loading} className={btnGoogle}>
                <GoogleLogo />
                <span>Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-zinc-800" />
                <span className="text-[11px] font-medium text-zinc-500">or</span>
                <div className="h-px flex-1 bg-zinc-800" />
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailSignUp} className="space-y-3">
                <input
                  type="text"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  placeholder="Full name"
                  required
                  autoComplete="name"
                  className={inputClass}
                />
                <input
                  type="email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  autoComplete="email"
                  className={inputClass}
                />
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="Password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    className={`${inputClass} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={signUpConfirm}
                    onChange={(e) => setSignUpConfirm(e.target.value)}
                    placeholder="Confirm password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    className={`${inputClass} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Terms */}
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <div className="relative mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="peer sr-only"
                      required
                    />
                    <div className="h-4 w-4 rounded border border-zinc-600 bg-zinc-800 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors flex items-center justify-center">
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

                <button type="submit" disabled={!agreedToTerms || loading} className={btnPrimary}>
                  <span>{loading ? 'Creating account...' : 'Create Account'}</span>
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
              <div className="text-center pt-1">
                <button type="button" onClick={handleContinueAsGuest} className="text-xs text-zinc-600 hover:text-zinc-400 underline underline-offset-2 transition-colors">
                  Continue as Guest
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
