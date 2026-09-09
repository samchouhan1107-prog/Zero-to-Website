import React from 'react';
import { Info, Sparkles } from 'lucide-react';

interface AdSenseSlotProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'in-feed';
  label?: string;
  className?: string;
}

export const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  slotId = 'placeholder-slot',
  format = 'horizontal',
  label = 'Sponsored Learning Partner',
  className = '',
}) => {
  return (
    <div
      className={`my-6 overflow-hidden rounded-xl border border-app-border/70 bg-app-inset/60 p-4 transition-all ${className}`}
      aria-label="Advertisement Container"
    >
      <div className="flex items-center justify-between border-b border-app-border/40 pb-2 text-[10px] font-mono text-app-subtle">
        <span className="flex items-center gap-1 uppercase tracking-wider font-semibold">
          <Info className="h-3 w-3" />
          ADVERTISEMENT
        </span>
      </div>

      <div
        className={`flex items-center justify-center rounded-lg border border-dashed border-app-border/80 bg-app-surface/50 p-6 text-center text-xs text-app-muted ${
          format === 'horizontal' ? 'min-h-[90px]' : format === 'rectangle' ? 'min-h-[250px]' : 'min-h-[120px]'
        }`}
      >
        <div className="space-y-2 max-w-sm">
          <div className="text-[11px] font-medium text-app-muted leading-relaxed">
            Please support our free educational content by disabling ad-blockers or allowing ads.
          </div>
        </div>
      </div>
    </div>
  );
};
