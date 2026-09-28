import React from 'react';

interface WebZoneSignatureAIIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'sparkle' | 'brain' | 'wrench';
  interactive?: boolean;
}

export const WebZoneSignatureAIIcon: React.FC<WebZoneSignatureAIIconProps> = ({
  className = '',
  size = 'md',
  variant = 'sparkle',
  interactive = true,
}) => {
  const sizeMap = {
    sm: 'w-7 h-7 p-1 rounded-xl',
    md: 'w-10 h-10 p-2 rounded-2xl',
    lg: 'w-12 h-12 p-2.5 rounded-2xl',
    xl: 'w-16 h-16 p-3 rounded-3xl',
  };

  const iconSizes = {
    sm: 18,
    md: 24,
    lg: 28,
    xl: 38,
  };

  const currentIconSize = iconSizes[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 border transition-all duration-300 ${
        variant === 'sparkle'
          ? 'bg-gradient-to-br from-purple-950/80 via-indigo-950/70 to-slate-900 border-purple-500/40 text-purple-400 shadow-lg shadow-purple-950/50 hover:border-purple-400 hover:shadow-purple-500/25'
          : variant === 'brain'
          ? 'bg-gradient-to-br from-blue-950/80 via-indigo-950/70 to-slate-900 border-blue-500/40 text-blue-400 shadow-lg shadow-blue-950/50 hover:border-blue-400 hover:shadow-blue-500/25'
          : 'bg-gradient-to-br from-blue-900/40 via-slate-900 to-slate-950 border-blue-500/30 text-blue-400 shadow-lg hover:border-blue-400'
      } ${sizeMap[size]} ${interactive ? 'hover:scale-105 active:scale-95 cursor-pointer' : ''} ${className}`}
    >
      {/* Background radial ambient glow */}
      <div
        className={`absolute inset-0 rounded-inherit opacity-30 blur-sm pointer-events-none ${
          variant === 'sparkle' ? 'bg-purple-500' : 'bg-blue-500'
        }`}
      />

      {variant === 'sparkle' ? (
        /* Signature WebZoneBW AI Sparkle Constellation SVG */
        <svg
          width={currentIconSize}
          height={currentIconSize}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 transition-transform duration-300 group-hover:rotate-6"
        >
          <defs>
            <linearGradient id="wz-ai-sparkle-grad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E9D5FF" />
              <stop offset="50%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
            <filter id="wz-ai-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Central Four-Pointed Curved Sparkle Star */}
          <path
            d="M16 2.5C16 8.5 19.5 12 25.5 12C19.5 12 16 15.5 16 21.5C16 15.5 12.5 12 6.5 12C12.5 12 16 8.5 16 2.5Z"
            stroke="url(#wz-ai-sparkle-grad)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#wz-ai-glow)"
          />

          {/* Core Central Light Pulse */}
          <circle cx="16" cy="12" r="1.5" fill="#FAF5FF" />

          {/* Secondary Satellite Plus Sparkle (Top Right) */}
          <path
            d="M25 4V8M23 6H27"
            stroke="#D8B4FE"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Tertiary Quantum Dot (Bottom Left) */}
          <circle cx="8" cy="22" r="2" stroke="url(#wz-ai-sparkle-grad)" strokeWidth="1.8" fill="none" />
          <circle cx="8" cy="22" r="0.8" fill="#F3E8FF" />
        </svg>
      ) : variant === 'brain' ? (
        /* Signature WebZoneBW Brain Card AI Chip SVG */
        <svg
          width={currentIconSize}
          height={currentIconSize}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          <defs>
            <linearGradient id="wz-brain-grad" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="50%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>
          </defs>

          {/* Left Hemisphere */}
          <path
            d="M14 6C10 6 7 8.5 7 12C7 13.5 7.8 14.8 9 15.6C7.5 16.5 6.5 18.2 6.5 20C6.5 23 9 25 12.5 25C13.2 25 13.8 24.8 14 24.5V6Z"
            stroke="url(#wz-brain-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Right Hemisphere */}
          <path
            d="M18 6C22 6 25 8.5 25 12C25 13.5 24.2 14.8 23 15.6C24.5 16.5 25.5 18.2 25.5 20C25.5 23 23 25 19.5 25C18.8 25 18.2 24.8 18 24.5V6Z"
            stroke="url(#wz-brain-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Neural Bridge & Synapse Nodes */}
          <path d="M14 12H18M14 18H18" stroke="#93C5FD" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="11" cy="12" r="1.2" fill="#60A5FA" />
          <circle cx="21" cy="12" r="1.2" fill="#C084FC" />
          <circle cx="10" cy="20" r="1.2" fill="#38BDF8" />
          <circle cx="22" cy="20" r="1.2" fill="#A855F7" />

          {/* Top Inspiration Spark */}
          <circle cx="16" cy="3.5" r="1" fill="#FDE047" />
        </svg>
      ) : (
        /* Wrench Developer Tool SVG */
        <svg
          width={currentIconSize}
          height={currentIconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      )}
    </div>
  );
};
