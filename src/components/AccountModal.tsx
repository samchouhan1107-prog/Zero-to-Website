import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  FileCheck,
  Flame,
  Globe,
  Lock,
  LogOut,
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
  const [name, setName] = useState('Developer');

  if (!isOpen) return null;

  const userLevel = Math.floor(progress.xpPoints / 100) + 1;
  const completedCount = Object.values(progress.completedLessons).filter(Boolean).length;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setName(email.split('@')[0]);
      setIsLoggedIn(true);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-[#27272a] bg-[#141417] p-6 text-white shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 id="account-modal-title" className="text-base font-bold text-white">
                WebZoneBW Developer Account
              </h3>
              <p className="text-xs text-[#a1a1aa]">Sync progress &amp; developer credentials</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#71717a] hover:bg-[#27272a] hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isLoggedIn ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-xl border border-[#27272a] bg-[#18181c] p-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg">
                {name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white truncate">{name}</span>
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    Lvl {userLevel}
                  </span>
                </div>
                <p className="text-xs text-[#a1a1aa] truncate">{email || 'developer@webzonebw.local'}</p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-[#27272a] bg-[#18181c] p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-sm">
                  <Flame className="h-4 w-4" />
                  <span>{progress.streakDays}d</span>
                </div>
                <span className="font-mono text-[10px] text-[#71717a]">Streak</span>
              </div>

              <div className="rounded-xl border border-[#27272a] bg-[#18181c] p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-blue-400 font-bold text-sm">
                  <Award className="h-4 w-4" />
                  <span>{progress.xpPoints}</span>
                </div>
                <span className="font-mono text-[10px] text-[#71717a]">XP Points</span>
              </div>

              <div className="rounded-xl border border-[#27272a] bg-[#18181c] p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{completedCount}</span>
                </div>
                <span className="font-mono text-[10px] text-[#71717a]">Completed</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenMilestones();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-blue-500/30 bg-blue-600/10 py-2.5 text-xs font-bold text-blue-400 hover:bg-blue-600/20 transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                <span>View Badges &amp; Milestone Roadmap</span>
              </button>

              {onOpenCertificate && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenCertificate();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#27272a] bg-[#1c1c22] py-2.5 text-xs font-bold text-[#d4d4d8] hover:text-white hover:bg-[#27272e] transition-colors"
                >
                  <FileCheck className="h-4 w-4 text-emerald-400" />
                  <span>View Certificate of Completion</span>
                </button>
              )}

              {onOpenSettings && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenSettings();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#27272a] bg-[#1c1c22] py-2.5 text-xs font-bold text-[#d4d4d8] hover:text-white hover:bg-[#27272e] transition-colors"
                >
                  <Settings className="h-4 w-4 text-[#a1a1aa]" />
                  <span>Account &amp; Platform Settings</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsLoggedIn(false)}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#27272a] bg-[#18181c] py-2 text-xs font-semibold text-[#71717a] hover:text-white hover:bg-[#222228] transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">
                Sign in to WebZoneBW
              </h4>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Save your progress, sync coding sandbox sketches, and preserve verified curriculum achievements.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label htmlFor="login-email" className="block font-mono text-xs font-semibold text-[#a1a1aa] mb-1">
                  Developer Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="developer@webzonebw.shop"
                  required
                  className="w-full rounded-xl border border-[#27272a] bg-[#18181c] px-3.5 py-2.5 text-sm text-white placeholder-[#52525b] focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-500"
              >
                <Lock className="h-4 w-4" />
                <span>Sign In with Developer ID</span>
              </button>
            </form>

            <div className="rounded-xl border border-[#27272a] bg-[#18181c] p-3 text-center space-y-1">
              <p className="font-mono text-[11px] text-[#a1a1aa]">
                Current Session: <strong>{progress.xpPoints} XP</strong> · <strong>{progress.streakDays} Day Streak</strong>
              </p>
              <p className="text-[10px] text-[#71717a]">
                All interactive progress is preserved in your local browser sandbox.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
