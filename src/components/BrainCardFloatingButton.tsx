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
      className={`fixed bottom-6 right-6 z-40 group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-full shadow-2xl shadow-blue-950/50 transition-all duration-300 transform hover:scale-110 active:scale-95 ${
        pulse ? 'animate-pulse' : ''
      }`}
      aria-label="Open Brain Card"
      title="Brain Card 💡: Learning Stones, Notes & Daily Bonus"
    >
      <WebZoneSignatureAIIcon size="md" variant="brain" interactive={false} />
      <span className="hidden sm:inline text-sm">Brain Card 💡</span>
      
      {/* Floating notification dot */}
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white animate-ping"></div>
      
      {/* Hover effects */}
      <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
    </button>
  );
};