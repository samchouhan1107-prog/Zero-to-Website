import React, { useState, useEffect } from 'react';
import { Brain, Sparkles, Lightbulb } from 'lucide-react';
import { getDailyBonusStatus, getBrainStoreState } from '../utils/brainStorage';

interface BrainCardFloatingButtonProps {
  onClick: () => void;
}

export const BrainCardFloatingButton: React.FC<BrainCardFloatingButtonProps> = ({ onClick }) => {
  const [isBonusClaimable, setIsBonusClaimable] = useState(false);
  const [dayOfYear, setDayOfYear] = useState(1);
  const [notesCount, setNotesCount] = useState(0);

  useEffect(() => {
    const update = () => {
      const status = getDailyBonusStatus();
      const state = getBrainStoreState();
      setIsBonusClaimable(status.isClaimable);
      setDayOfYear(status.currentDayOfYear);
      setNotesCount(state.notes.length);
    };

    update();
    const interval = setInterval(update, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group">
      {/* Tooltip hint on hover */}
      <div className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex flex-col items-end mr-1">
        <div className="rounded-xl border border-blue-500/30 bg-slate-900/95 px-3 py-1.5 text-xs text-slate-100 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-1.5 font-bold text-blue-400">
            <Brain className="h-3.5 w-3.5" />
            <span>Brain Card 💡</span>
          </div>
          <span className="text-[10px] text-slate-300">
            {isBonusClaimable ? '🎁 24h Daily Bonus Ready!' : `Day ${dayOfYear}/365 · ${notesCount} Notes`}
          </span>
        </div>
      </div>

      {/* Main Floating Brain Button */}
      <button
        type="button"
        onClick={onClick}
        aria-label="Open Brain Card with Notes, Space Wiper & 365d Daily Bonus"
        className={`relative flex h-13 w-13 items-center justify-center rounded-2xl shadow-xl transition-all duration-300 active:scale-95 touch-manipulation cursor-pointer ${
          isBonusClaimable
            ? 'bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 text-white ring-4 ring-amber-400/40 shadow-amber-500/40 hover:scale-105'
            : 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white ring-2 ring-blue-400/30 shadow-blue-500/30 hover:scale-105'
        }`}
      >
        <Brain className={`h-6 w-6 ${isBonusClaimable ? 'animate-bounce' : 'group-hover:rotate-12 transition-transform'}`} />
        
        {/* Lightbulb indicator badge */}
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-black ring-2 ring-white shadow">
          💡
        </span>

        {/* Pulsing glow if bonus is ready */}
        {isBonusClaimable && (
          <span className="absolute inset-0 rounded-2xl bg-amber-400/30 animate-ping pointer-events-none" />
        )}
      </button>
    </div>
  );
};
