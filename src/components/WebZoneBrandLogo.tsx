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
  // Aspect ratio matches the official SC >> WEBZONE logo image (220 x 147)
  const height = size === 'sm' ? 24 : size === 'lg' ? 42 : 32;
  const width = (height * 220) / 147;

  return (
    <div className={`inline-flex items-center select-none ${className}`} title="SC WebZone Knowledge Base">
      <img
        src="/logo.png"
        alt="SC >> WEBZONE Knowledge Base logo"
        height={height}
        width={width}
        className="block h-auto w-auto"
        style={{ height, width: 'auto' }}
      />
    </div>
  );
};
