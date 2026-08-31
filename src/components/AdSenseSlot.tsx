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
        <span className="flex items-center gap-1 uppercase tracking-wider">
          <Info className="h-3 w-3" />
          {label}
        </span>
        <span className="rounded bg-app-active px-1.5 py-0.5 text-[9px] text-app-muted">
          AdSense Ready · Responsive
        </span>
      </div>

      <div
        className={`flex items-center justify-center rounded-lg border border-dashed border-app-border/80 bg-app-surface/50 p-6 text-center text-xs text-app-muted ${
          format === 'horizontal' ? 'min-h-[90px]' : format === 'rectangle' ? 'min-h-[250px]' : 'min-h-[120px]'
        }`}
      >
        <div className="space-y-1.5 max-w-sm">
          <div className="flex items-center justify-center gap-1.5 font-bold text-app-ink text-xs">
            <Sparkles className="h-3.5 w-3.5 text-app-amber" />
            <span>Google AdSense Slot Container</span>
          </div>
          <p className="text-[11px] text-app-subtle leading-relaxed">
            Standard non-intrusive ad unit configured with GDPR/CCPA consent compliance, optimal contrast, and zero layout shift.
          </p>
        </div>
      </div>
    </div>
  );
};
