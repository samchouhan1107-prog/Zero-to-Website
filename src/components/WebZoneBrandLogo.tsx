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
  // Enhanced sizing for better visual hierarchy
  const height = size === 'sm' ? 28 : size === 'lg' ? 48 : 36;
  const fontSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-xl';
  const gap = size === 'sm' ? 'gap-1' : size === 'lg' ? 'gap-3' : 'gap-2';

  return (
    <div className={`inline-flex items-center select-none ${gap} ${className}`} title="WebZoneBW SC">
      {/* Primary Brand Identity: 💠 Diamond emoji */}
      <span className={`${fontSize} font-bold text-blue-600`}>
        💠
      </span>
      
      {/* Brand Text */}
      <div className="flex flex-col">
        <span className="font-bold text-gray-900 dark:text-white text-lg md:text-xl">
          WebZoneBW
        </span>
        {showSubtitle && (
          <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            SC
          </span>
        )}
      </div>
    </div>
  );
};
