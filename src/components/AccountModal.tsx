import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
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

export interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onOpenMilestones: () => void;
  onOpenCertificate?: () => void;
  onOpenSettings?: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  progress,
  onOpenMilestones,
  onOpenCertificate,
  onOpenSettings,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loginMethod, setLoginMethod] = useState<'google' | 'email' | null>(null);

  if (!isOpen) return null;

  const userLevel = Math.floor(progress.xpPoints / 100) + 1;
  const completedCount = Object.values(progress.completedLessons).filter(Boolean).length;

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setName(email.split('@')[0]);
      setLoginMethod('email');
      setIsLoggedIn(true);
    }
  };

  const handleGoogleLogin = () => {
    // Google sign-in simulation — in production, connect to Auth0 / Firebase / Google Identity
    setName('Learner');
    setEmail('you@gmail.com');
    setLoginMethod('google');
    setIsLoggedIn(true);
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
        <div className="relative px-6 pt-6 pb-5 border-b border-[#27272a]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/15 text-blue-400">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h3 id="account-modal-title" className="text-[15px] font-bold text-white leading-tight">
                  {isLoggedIn ? `Welcome, ${name}` : 'Welcome to WebZoneBW'}
                </h3>
                <p className="text-[11px] text-[#71717a] mt-0.5">
                  {isLoggedIn ? 'Your learning dashboard' : 'Track your learning progress'}
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
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {isLoggedIn ? (
            <div className="space-y-4">
              {/* Profile Card */}
              <div className="flex items-center gap-3.5 rounded-xl border border-[#27272a] bg-[#1a1a1e] p-4">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-base shadow-lg shadow-blue-500/20">
                    {loginMethod === 'google' ? (
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#141417] border border-[#27272a]">
                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-500 text-[8px] font-bold text-white">
                      {userLevel}
                    </span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm truncate">{name}</span>
                    <span className="font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-blue-500/15 text-blue-400 border border-blue-500/20">
                      Lvl {userLevel}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#71717a] truncate mt-0.5">{email}</p>
                </div>
              </div>

              {/* Progress Stats */}
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
                  onClick={() => {
                    onClose();
                    onOpenMilestones();
                  }}
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
                    onClick={() => {
                      onClose();
                      onOpenCertificate();
                    }}
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
                    onClick={() => {
                      onClose();
                      onOpenSettings();
                    }}
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
                onClick={() => {
                  setIsLoggedIn(false);
                  setLoginMethod(null);
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#27272a] bg-transparent py-2.5 text-xs font-semibold text-[#71717a] hover:text-white hover:bg-[#1f1f24] hover:border-[#3f3f46] transition-all"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Sign-in Copy */}
              <div className="text-center space-y-1.5">
                <div className="flex justify-center mb-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/15 to-blue-600/10 border border-blue-500/20">
                    <BookOpen className="h-7 w-7 text-blue-400" />
                  </div>
                </div>
                <h4 className="text-base font-bold text-white">
                  Start Your Learning Journey
                </h4>
                <p className="text-[12px] text-[#a1a1aa] leading-relaxed max-w-[280px] mx-auto">
                  Create a free account to save your progress and pick up where you left off.
                </p>
              </div>

              {/* Google Sign-In Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-[#3f3f46] bg-white py-3 text-sm font-semibold text-[#1f1f1f] transition-all hover:bg-gray-50 hover:border-[#52525b] hover:shadow-md active:scale-[0.98]"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-[#27272a]" />
                <span className="text-[11px] font-medium text-[#52525b]">or</span>
                <div className="h-px flex-1 bg-[#27272a]" />
              </div>

              {/* Email Sign-In */}
              <form onSubmit={handleEmailLogin} className="space-y-3">
                <div>
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-xl border border-[#27272a] bg-[#1a1a1e] px-4 py-3 text-sm text-white placeholder-[#52525b] focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]"
                >
                  <Mail className="h-4 w-4" />
                  <span>Continue with Email</span>
                </button>
              </form>

              {/* Session Info */}
              <div className="text-center pt-1">
                <p className="text-[11px] text-[#52525b] leading-relaxed">
                  Your progress is saved locally.{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoggedIn(true);
                      setLoginMethod('email');
                      setName('Guest Learner');
                      setEmail('guest@webzonebw.shop');
                    }}
                    className="text-[#71717a] hover:text-blue-400 underline underline-offset-2 transition-colors"
                  >
                    Continue as Guest
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
