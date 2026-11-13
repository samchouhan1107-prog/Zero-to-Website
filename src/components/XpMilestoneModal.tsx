import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  Award,
  CheckCircle2,
  Share2,
  Check,
  ChevronRight,
  Flame,
  ArrowRight,
  X,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { XpMilestone } from '../types';
import { playMilestoneFanfare } from '../data/milestonesData';

interface XpMilestoneModalProps {
  milestone: XpMilestone;
  isOpen: boolean;
  onClose: () => void;
  onOpenRoadmap?: () => void;
  currentXp: number;
}

export const XpMilestoneModal: React.FC<XpMilestoneModalProps> = ({
  milestone,
  isOpen,
  onClose,
  onOpenRoadmap,
  currentXp,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // 1. Play synthesized fanfare
      playMilestoneFanfare();

      // 2. Launch vibrant confetti cannons
      const end = Date.now() + 2.5 * 1000;
      const colors = ['#6366f1', '#a855f7', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.65 },
          colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.65 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();

      // Central burst
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.5 },
        colors,
      });
    }
  }, [isOpen, milestone.id]);

  if (!isOpen) return null;

  const handleShare = () => {
    const text = `🎉 I just hit ${milestone.xpRequired} XP in WZ Storehouse and reached the rank of "${milestone.rank}: ${milestone.title}"! Master web development interactively at WZ Storehouse.`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      id="milestone-celebration-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border-2 border-indigo-500/40 shadow-2xl shadow-indigo-500/20 overflow-hidden text-center">
        {/* Glowing Ambient Background Ring */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-tr from-indigo-500/30 via-purple-500/30 to-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close celebration modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6 relative z-10">
          {/* Badge & Level-Up Fanfare Header */}
          <div className="space-y-3">
            <div className="relative inline-block">
              {/* Rotating glowing halo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-indigo-500 blur-md opacity-75 animate-pulse" />
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-4xl shadow-xl shadow-indigo-500/30 border-4 border-white dark:border-slate-800 transform hover:scale-105 transition-transform">
                <span>{milestone.badge}</span>
              </div>
              <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[11px] uppercase tracking-wider shadow-md flex items-center gap-0.5 border-2 border-white dark:border-slate-800">
                <Sparkles className="w-3 h-3 fill-current" /> {milestone.xpRequired} XP
              </div>
            </div>

            <div>
              <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                ✨ Milestone Achieved! ✨
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                {milestone.title}
              </h2>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold font-mono">
                <Award className="w-3.5 h-3.5" /> Rank: {milestone.rank}
              </div>
            </div>
          </div>

          {/* Motivational Quote */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic px-4 leading-relaxed bg-slate-50 dark:bg-slate-950/50 py-3 rounded-xl border border-slate-100 dark:border-slate-800">
            "{milestone.motivationQuote}"
          </p>

          {/* Unlocked Perks Card */}
          <div className="text-left bg-gradient-to-br from-indigo-50/70 to-purple-50/50 dark:from-slate-800/80 dark:to-indigo-950/40 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 space-y-2.5">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-current" /> Unlocked Perks & Powers:
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
              {milestone.unlockedPerks.map((perk, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="font-medium">{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* User Progress Stats Footer */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-current" />
              Total Mastery Score: <strong>{currentXp} XP</strong>
            </span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">
              Level {Math.floor(currentXp / 100) + 1} Scholar
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:brightness-110 text-white font-extrabold text-sm transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Claim Reward & Continue Learning
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="flex-1 py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                {copied ? 'Copied to Clipboard!' : 'Share Milestone'}
              </button>

              {onOpenRoadmap && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenRoadmap();
                  }}
                  className="flex-1 py-2 px-3 rounded-lg border border-indigo-200 dark:border-indigo-800/80 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>View All Milestones</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
