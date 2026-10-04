import React from 'react';
import { WebZoneSignatureAIIcon } from './WebZoneSignatureAIIcon';

interface BrainCardFloatingButtonProps {
  onClick: () => void;
}

export const BrainCardFloatingButton: React.FC<BrainCardFloatingButtonProps> = ({ onClick }) => {
  const [pulse, setPulse] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-40 group flex items-center gap-3 rounded-full border border-blue-400/30 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-4 py-3 text-white shadow-[0_20px_50px_rgba(59,130,246,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 ${
        pulse ? 'animate-pulse' : ''
      }`}
      aria-label="Open Brain Card"
      title="Brain Card 💡: learning ideas, notes, and daily bonus"
    >
      <WebZoneSignatureAIIcon size="md" variant="brain" interactive={false} className="ring-2 ring-white/20" />
      <span className="hidden text-sm font-black tracking-wide sm:inline">Brain Card 💡</span>

      <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-amber-400 text-[9px] font-black text-slate-950 shadow-lg animate-ping">
        365
      </div>

      <div className="absolute inset-0 rounded-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
    </button>
  );
};