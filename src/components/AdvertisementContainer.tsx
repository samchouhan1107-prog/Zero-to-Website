import React from 'react';
import { Info, ShieldAlert } from 'lucide-react';

interface AdvertisementContainerProps {
  className?: string;
  slotId?: string;
  format?: 'horizontal-leaderboard' | 'responsive-banner';
}

export const AdvertisementContainer: React.FC<AdvertisementContainerProps> = ({
  className = '',
  slotId = 'wz-ad-slot-header',
  format = 'horizontal-leaderboard',
}) => {
  return (
    <aside
      aria-label="Advertisement"
      className={`relative my-8 overflow-hidden rounded-xl border border-[#27272a] bg-[#111114] p-4 text-center select-none ${className}`}
    >
      {/* Explicit ADVERTISEMENT Label */}
      <div className="mb-3 flex items-center justify-between border-b border-[#27272a]/60 pb-2 text-[10px] font-mono uppercase tracking-widest text-[#71717a]">
        <span className="flex items-center gap-1.5 font-bold">
          <Info className="h-3 w-3 text-[#71717a]" aria-hidden="true" />
          ADVERTISEMENT
        </span>
        <span className="rounded bg-[#1c1c22] px-2 py-0.5 text-[9px] text-[#a1a1aa] border border-[#27272a]">
          Sponsor / Google AdSense Slot
        </span>
      </div>

      {/* Reserved responsive space container (no CLS / cumulative layout shift) */}
      <div
        className={`mx-auto flex w-full max-w-[970px] items-center justify-center rounded-lg border border-dashed border-[#27272a] bg-[#16161a] p-4 text-center transition-colors ${
          format === 'horizontal-leaderboard' ? 'min-h-[90px] sm:min-h-[110px]' : 'min-h-[140px]'
        }`}
      >
        <div className="space-y-1.5 max-w-md">
          <div className="font-mono text-xs font-semibold text-[#a1a1aa] tracking-tight">
            Reserved Sponsor Space (970×90 / 728×90 / 320×100)
          </div>
          <p className="text-[11px] leading-relaxed text-[#71717a]">
            Non-intrusive developer-targeted ad placement adhering to privacy guidelines and contrast standards.
          </p>
        </div>
      </div>
    </aside>
  );
};
