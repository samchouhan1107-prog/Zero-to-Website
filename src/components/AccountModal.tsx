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

const GoogleLogo: React.FC = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
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
  };

  const handleGoogleLogin = async () => {
    // Production: Use Google Identity Services (GIS) — see https://developers.google.com/identity/gsi/web
    // For now, open Google OAuth popup simulation
    try {
      // In production, replace with:
      // const { credential } = await google.accounts.id.prompt();
      // const decoded = jwt_decode(credential);
      // const result = await authService.signInWithGoogle(decoded.name, decoded.email, decoded.picture);
      
      // Simulated Google account for demo
      const result = await authService.signInWithGoogle('Google User', 'user@gmail.com');
      if (result.success && result.user) {
        login(result.user);
      } else {
        alert(result.error || 'Google sign-in failed');
      }
    } catch {
      alert('Google sign-in is not available right now. Please use email.');
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signInEmail) {
      const result = await authService.signIn(signInEmail, signInPassword);
      if (result.success && result.user) {
        login(result.user);
        resetForms();
      } else {
        alert(result.error || 'Sign in failed');
      }
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpName && signUpEmail && signUpPassword && agreedToTerms) {
      const result = await authService.signUp(signUpName, signUpEmail, signUpPassword);
      if (result.success && result.user) {
        login(result.user);
        resetForms();
      } else {
        alert(result.error || 'Sign up failed');
      }
    }
  };

  const handleLogout = () => {
    logout();
    resetForms();
  };

  const handleContinueAsGuest = () => {
    const guest = authService.createGuestSession();
    login(guest);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-[#27272a] bg-[#141417] shadow-2xl overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-[#27272a]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/15 text-blue-400">
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
                <p className="text-[11px] text-[#71717a] mt-0.5">
                  {isAuthenticated
                    ? 'Your learning dashboard'
                    : 'Track your progress across all courses'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-[#71717a] hover:bg-[#27272a] hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Auth Tabs (only when not authenticated) */}
          {!isAuthenticated && (
            <div className="flex mt-4 bg-[#1a1a1e] rounded-xl p-1 border border-[#27272a]">
              <button
                type="button"
                onClick={() => { setAuthTab('signin'); resetForms(); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  authTab === 'signin'
                    ? 'bg-[#27272a] text-white shadow-sm'
                    : 'text-[#71717a] hover:text-[#a1a1aa]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setAuthTab('signup'); resetForms(); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  authTab === 'signup'
                    ? 'bg-[#27272a] text-white shadow-sm'
                    : 'text-[#71717a] hover:text-[#a1a1aa]'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {isAuthenticated ? (
            /* ── Logged-in Account View ── */
            <div className="space-y-4">
              {/* Profile Card */}
              <div className="flex items-center gap-3.5 rounded-xl border border-[#27272a] bg-[#1a1a1e] p-4">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-base shadow-lg shadow-blue-500/20">
                    {user?.method === 'google' ? <GoogleLogo /> : user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#141417] border border-[#27272a]">
                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-500 text-[8px] font-bold text-white">
                      {userLevel}
                    </span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm truncate">{user?.name}</span>
                    <span className="font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-blue-500/15 text-blue-400 border border-blue-500/20">
                      Lvl {userLevel}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#71717a] truncate mt-0.5">
                    {user?.method === 'google' ? 'Signed in with Google' : user?.method === 'guest' ? 'Guest session' : user?.email}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="rounded-xl border border-[#27272a] bg-[#1a1a1e] p-3 text-center hover:border-[#3f3f46] transition-colors">
                  <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-sm">
                    <Flame className="h-3.5 w-3.5" />
                    <span>{progress.streakDays}</span>
                  </div>
                  <span className="text-[10px] text-[#71717a] mt-1 block">Day Streak</span>
                </div>
                <div className="rounded-xl border border-[#27272a] bg-[#1a1a1e] p-3 text-center hover:border-[#3f3f46] transition-colors">
                  <div className="flex items-center justify-center gap-1 text-blue-400 font-bold text-sm">
                    <Award className="h-3.5 w-3.5" />
                    <span>{progress.xpPoints}</span>
                  </div>
                  <span className="text-[10px] text-[#71717a] mt-1 block">XP Earned</span>
                </div>
                <div className="rounded-xl border border-[#27272a] bg-[#1a1a1e] p-3 text-center hover:border-[#3f3f46] transition-colors">
                  <div className="flex items-center justify-center gap-1 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{completedCount}</span>
                  </div>
                  <span className="text-[10px] text-[#71717a] mt-1 block">Completed</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => { onClose(); onOpenMilestones(); }}
                  className="w-full flex items-center justify-between rounded-xl border border-[#27272a] bg-[#1a1a1e] px-4 py-3 text-sm font-medium text-[#d4d4d8] hover:bg-[#1f1f24] hover:border-[#3f3f46] hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4 text-blue-400" />
                    <span>Badges & Milestones</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#52525b] group-hover:text-[#a1a1aa] transition-colors" />
                </button>

                {onOpenCertificate && (
                  <button
                    type="button"
                    onClick={() => { onClose(); onOpenCertificate(); }}
                    className="w-full flex items-center justify-between rounded-xl border border-[#27272a] bg-[#1a1a1e] px-4 py-3 text-sm font-medium text-[#d4d4d8] hover:bg-[#1f1f24] hover:border-[#3f3f46] hover:text-white transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <FileCheck className="h-4 w-4 text-emerald-400" />
                      <span>View Certificate</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#52525b] group-hover:text-[#a1a1aa] transition-colors" />
                  </button>
                )}

                {onOpenSettings && (
                  <button
                    type="button"
                    onClick={() => { onClose(); onOpenSettings(); }}
                    className="w-full flex items-center justify-between rounded-xl border border-[#27272a] bg-[#1a1a1e] px-4 py-3 text-sm font-medium text-[#d4d4d8] hover:bg-[#1f1f24] hover:border-[#3f3f46] hover:text-white transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Settings className="h-4 w-4 text-[#a1a1aa]" />
                      <span>Settings</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#52525b] group-hover:text-[#a1a1aa] transition-colors" />
                  </button>
                )}
              </div>

              {/* Sign Out */}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#27272a] bg-transparent py-2.5 text-xs font-semibold text-[#71717a] hover:text-white hover:bg-[#1f1f24] hover:border-[#3f3f46] transition-all"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : authTab === 'signin' ? (
            /* ── Sign In Tab ── */
            <div className="space-y-4">
              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-[#3f3f46] bg-white py-3 text-sm font-semibold text-[#1f1f1f] transition-all hover:bg-gray-50 hover:border-[#52525b] hover:shadow-md active:scale-[0.98]"
              >
                <GoogleLogo />
                <span>Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-[#27272a]" />
                <span className="text-[11px] font-medium text-[#52525b]">or</span>
                <div className="h-px flex-1 bg-[#27272a]" />
              </div>

              {/* Email form */}
              <form onSubmit={handleEmailSignIn} className="space-y-3">
                <input
                  type="email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="w-full rounded-xl border border-[#27272a] bg-[#1a1a1e] px-4 py-3 text-sm text-white placeholder-[#52525b] focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors"
                />
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full rounded-xl border border-[#27272a] bg-[#1a1a1e] px-4 py-3 pr-10 text-sm text-white placeholder-[#52525b] focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52525b] hover:text-[#a1a1aa] transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <div className="flex items-center justify-end">
                  <button type="button" className="text-[11px] text-[#71717a] hover:text-blue-400 transition-colors">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]"
                >
                  <Mail className="h-4 w-4" />
                  <span>Sign In</span>
                </button>
              </form>

              {/* Switch to Sign Up */}
              <p className="text-center text-[12px] text-[#71717a]">
                Don't have an account?{' '}
                <button type="button" onClick={() => { setAuthTab('signup'); resetForms(); }} className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                  Sign Up
                </button>
              </p>

              {/* Guest */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={handleContinueAsGuest}
                  className="text-[11px] text-[#52525b] hover:text-[#71717a] underline underline-offset-2 transition-colors"
                >
                  Continue as Guest
                </button>
              </div>
            </div>
          ) : (
            /* ── Sign Up Tab ── */
            <div className="space-y-4">
              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-[#3f3f46] bg-white py-3 text-sm font-semibold text-[#1f1f1f] transition-all hover:bg-gray-50 hover:border-[#52525b] hover:shadow-md active:scale-[0.98]"
              >
                <GoogleLogo />
                <span>Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-[#27272a]" />
                <span className="text-[11px] font-medium text-[#52525b]">or</span>
                <div className="h-px flex-1 bg-[#27272a]" />
              </div>

              {/* Email form */}
              <form onSubmit={handleEmailSignUp} className="space-y-3">
                <input
                  type="text"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  placeholder="Full name"
                  required
                  className="w-full rounded-xl border border-[#27272a] bg-[#1a1a1e] px-4 py-3 text-sm text-white placeholder-[#52525b] focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors"
                />
                <input
                  type="email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="w-full rounded-xl border border-[#27272a] bg-[#1a1a1e] px-4 py-3 text-sm text-white placeholder-[#52525b] focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors"
                />
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="Password"
                    required
                    minLength={6}
                    className="w-full rounded-xl border border-[#27272a] bg-[#1a1a1e] px-4 py-3 pr-10 text-sm text-white placeholder-[#52525b] focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52525b] hover:text-[#a1a1aa] transition-colors"
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
                    className="w-full rounded-xl border border-[#27272a] bg-[#1a1a1e] px-4 py-3 pr-10 text-sm text-white placeholder-[#52525b] focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52525b] hover:text-[#a1a1aa] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Terms */}
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="peer sr-only"
                      required
                    />
                    <div className="h-4 w-4 rounded border border-[#3f3f46] bg-[#1a1a1e] peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors flex items-center justify-center">
                      {agreedToTerms && <Check className="h-3 w-3 text-white" />}
                    </div>
                  </div>
                  <span className="text-[11px] text-[#71717a] leading-relaxed">
                    I agree to the{' '}
                    <span className="text-blue-400 hover:text-blue-300 cursor-pointer">Terms of Service</span>
                    {' '}and{' '}
                    <span className="text-blue-400 hover:text-blue-300 cursor-pointer">Privacy Policy</span>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!agreedToTerms}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-blue-600 disabled:hover:shadow-none"
                >
                  <span>Create Account</span>
                </button>
              </form>

              {/* Switch to Sign In */}
              <p className="text-center text-[12px] text-[#71717a]">
                Already have an account?{' '}
                <button type="button" onClick={() => { setAuthTab('signin'); resetForms(); }} className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                  Sign In
                </button>
              </p>

              {/* Guest */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={handleContinueAsGuest}
                  className="text-[11px] text-[#52525b] hover:text-[#71717a] underline underline-offset-2 transition-colors"
                >
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
