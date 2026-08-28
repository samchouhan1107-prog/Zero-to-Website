import React from 'react';

interface WebZoneBrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const WebZoneBrandLogo: React.FC<WebZoneBrandLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  // Exact aspect ratio matches the official SC >> WEBZONE logo image uploaded
  const height = size === 'sm' ? 24 : size === 'lg' ? 42 : 32;

  return (
    <div className={`inline-flex items-center select-none ${className}`} title="SC WebZone Knowledge Base">
      <svg
        height={height}
        viewBox="0 0 280 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-auto max-h-full block transition-transform group-hover:scale-[1.02]"
      >
        {/* Bold Blue SC */}
        <text
          x="2"
          y="42"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="44"
          fill="#1d75f2"
          letterSpacing="-1.5"
        >
          SC
        </text>

        {/* Dual Green Chevrons >> */}
        {/* First chevron */}
        <path
          d="M72 16 L88 33 L72 50 L81 50 L97 33 L81 16 Z"
          fill="#3dbb56"
        />
        {/* Second chevron */}
        <path
          d="M88 16 L104 33 L88 50 L97 50 L113 33 L97 16 Z"
          fill="#3dbb56"
        />

        {/* Slanted Slate Trapezoid Banner */}
        <polygon
          points="114,14 278,14 270,52 122,52"
          fill="#5a6e85"
        />

        {/* WEBZONE text in electric cyan-blue */}
        <text
          x="130"
          y="42"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="24"
          letterSpacing="2.5"
          fill="#38bdf8"
        >
          WEBZONE
        </text>

        {/* Bottom KNOWLEDGE BASE sub-banner */}
        {showSubtitle && (
          <>
            <polygon
              points="140,48 256,48 250,60 146,60"
              fill="#3a4a5e"
            />
            <text
              x="152"
              y="57.5"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              fontWeight="800"
              fontSize="8"
              letterSpacing="1.8"
              fill="#e2e8f0"
            >
              KNOWLEDGE BASE
            </text>
          </>
        )}
      </svg>
    </div>
  );
};
