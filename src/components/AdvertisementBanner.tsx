import React, { useEffect, useRef, useState } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const insRef = useRef<HTMLModElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Only initialize AdSense if the element exists and window.adsbygoogle is available
    const win = typeof window !== 'undefined' ? (window as unknown as { adsbygoogle?: unknown[] }) : undefined;
    const ins = insRef.current;
    if (!ins || !win?.adsbygoogle) return;

    let hasPushed = false;

    const checkAndPush = () => {
      if (hasPushed) return;
      // AdSense requires availableWidth > 0 on the actual ins element
      const clientWidth = ins.clientWidth || ins.offsetWidth;
      if (clientWidth >= 250) {
        // Ensure not already initialized by AdSense
        if (ins.getAttribute('data-adsbygoogle-status')) {
          hasPushed = true;
          setAdLoaded(true);
          return;
        }

        hasPushed = true;
        try {
          (win.adsbygoogle = win.adsbygoogle || []).push({});
          setAdLoaded(true);
        } catch (error) {
          // Gracefully handle any AdSense push error
          console.warn('AdSense deferred initialization notice:', error);
        }
      }
    };

    // Attempt immediately if width is already available
    if ((ins.clientWidth || ins.offsetWidth) >= 250) {
      checkAndPush();
    } else if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.width >= 250) {
            checkAndPush();
            resizeObserver.disconnect();
            break;
          }
        }
      });

      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
      resizeObserver.observe(ins);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  const getAdStyle = (): React.CSSProperties => {
    if (responsive) {
      return {
        display: 'block',
        width: '100%',
        minWidth: '280px',
        minHeight: format === 'horizontal' ? '90px' : '250px',
      };
    }

    switch (format) {
      case 'horizontal':
        return { display: 'block', width: '728px', minWidth: '728px', height: '90px' };
      case 'rectangle':
        return { display: 'block', width: '336px', minWidth: '336px', height: '280px' };
      case 'vertical':
        return { display: 'block', width: '300px', minWidth: '300px', height: '600px' };
      default:
        return { display: 'block', width: '100%', minWidth: '280px', height: '90px' };
    }
  };

  return (
    <div
      ref={containerRef}
      className={`ad-container overflow-hidden w-full ${className}`}
      style={responsive ? { margin: '20px auto', maxWidth: '728px', minWidth: '280px' } : {}}
      aria-label="Advertisement"
    >
      <ins
        ref={insRef}
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