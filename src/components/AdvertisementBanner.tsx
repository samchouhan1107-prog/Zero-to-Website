import React, { useEffect, useRef } from 'react';

interface AdvertisementBannerProps {
  className?: string;
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'vertical';
  responsive?: boolean;
}

export const AdvertisementBanner: React.FC<AdvertisementBannerProps> = ({
  className = '',
  slotId = 'wz-ad-slot-main',
  format = 'horizontal',
  responsive = true,
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only initialize AdSense if the element exists and window.adsbygoogle is available
    const win = typeof window !== 'undefined' ? (window as unknown as { adsbygoogle?: unknown[] }) : undefined;
    const el = adRef.current;
    if (!el || !win?.adsbygoogle) return;

    let hasPushed = false;
    const tryPush = () => {
      if (hasPushed) return;
      if (el.offsetWidth > 0) {
        hasPushed = true;
        try {
          (win.adsbygoogle = win.adsbygoogle || []).push({});
        } catch (error) {
          console.warn('AdSense initialization failed:', error);
        }
      }
    };

    if (el.offsetWidth > 0) {
      tryPush();
    } else if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.width > 0) {
            tryPush();
            resizeObserver.disconnect();
            break;
          }
        }
      });
      resizeObserver.observe(el);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  const getAdStyle = () => {
    if (responsive) {
      return {
        display: 'block',
        width: '100%',
        minHeight: format === 'horizontal' ? '90px' : '250px',
      };
    }
    
    switch (format) {
      case 'horizontal':
        return { display: 'block', width: '728px', height: '90px' };
      case 'rectangle':
        return { display: 'block', width: '336px', height: '280px' };
      case 'vertical':
        return { display: 'block', width: '300px', height: '600px' };
      default:
        return { display: 'block', width: '100%', height: '90px' };
    }
  };

  return (
    <div
      ref={adRef}
      className={`ad-container ${className}`}
      style={responsive ? { margin: '20px auto', maxWidth: '728px' } : {}}
    >
      <ins
        className="adsbygoogle"
        style={getAdStyle()}
        data-ad-client="ca-pub-2904917114665090"
        data-ad-slot="7590829298"
        data-ad-format={responsive ? 'auto' : undefined}
        data-full-width-responsive={responsive ? 'true' : undefined}
      />
    </div>
  );
};