import React from 'react';

interface MDNLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const MDNLogo: React.FC<MDNLogoProps> = ({
  className = '',
  size = 'md',
  showLabel = true,
}) => {
  const height = size === 'sm' ? 24 : size === 'lg' ? 36 : 28;

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`} title="MDN Web Docs">
      {/* Authentic MDN Mark */}
      <svg
        height={height}
        viewBox="0 0 92 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto shrink-0"
        aria-hidden="true"
      >
        {/* Background container */}
        <rect width="92" height="32" rx="4" fill="#000000" />
        <rect x="0.5" y="0.5" width="91" height="31" rx="3.5" stroke="#333333" />
        
        {/* 'm' letterform */}
        <text
          x="8"
          y="23"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, monospace"
          fontWeight="900"
          fontSize="22"
          fill="#ffffff"
          letterSpacing="-0.5"
        >
          m
        </text>

        {/* Slash divider / in MDN blue */}
        <path
          d="M32 25 L40 7 L43 7 L35 25 Z"
          fill="#2b7fff"
        />

        {/* 'dn' letterform */}
        <text
          x="46"
          y="23"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, monospace"
          fontWeight="900"
          fontSize="22"
          fill="#ffffff"
          letterSpacing="-0.5"
        >
          dn
        </text>
      </svg>

      {showLabel && (
        <span className="flex flex-col leading-none">
          <span className="font-sans text-[15px] font-black tracking-tight text-white">
            mdn<span className="text-[#2b7fff]">_</span>
          </span>
          <span className="font-mono text-[9px] font-bold tracking-wider text-[#a0a0a0] uppercase">
            Web Docs
          </span>
        </span>
      )}
    </div>
  );
};
