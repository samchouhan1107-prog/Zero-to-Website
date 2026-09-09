import React, { useState } from 'react';
import {
  Smartphone,
  Tablet,
  Monitor,
  Maximize2,
  Layers,
  CheckCircle2,
  Code2,
  RotateCcw,
} from 'lucide-react';

export const ResponsiveViewportVisualizer: React.FC = () => {
  const [viewportWidth, setViewportWidth] = useState<number>(375);
  const [depthStage, setDepthStage] = useState<'simple' | 'structured' | 'practical'>('simple');

  // Determine current breakpoint
  const getBreakpoint = (width: number) => {
    if (width < 640) return { name: 'Mobile (xs)', query: 'Base CSS (Mobile-First)', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
    if (width < 768) return { name: 'Small (sm)', query: '@media (min-width: 640px)', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
    if (width < 1024) return { name: 'Tablet (md)', query: '@media (min-width: 768px)', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' };
    if (width < 1280) return { name: 'Desktop (lg)', query: '@media (min-width: 1024px)', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
    return { name: 'Wide (xl)', query: '@media (min-width: 1280px)', color: 'text-violet-400 bg-violet-500/10 border-violet-500/30' };
  };

  const currentBp = getBreakpoint(viewportWidth);

  // Cards layout determination
  const getColumns = (width: number) => {
    if (width < 640) return 'grid-cols-1';
    if (width < 1024) return 'grid-cols-2';
    return 'grid-cols-3';
  };

  return (
    <div id="responsive-viewport-visualizer" className="panel-surface min-w-0 overflow-hidden p-5 sm:p-6 space-y-6">
      {/* Header & Concept Standard Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-app-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-teal-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-teal-400">
              CONCEPT: MOBILE-FIRST RESPONSIVE DESIGN
            </span>
            <span className="font-mono text-xs text-app-subtle">Ch 07 Viewport Breakpoints</span>
          </div>
          <h3 className="text-lg font-bold text-app-ink flex items-center gap-2 mt-1">
            <Smartphone className="w-5 h-5 text-teal-400" />
            Responsive Viewport &amp; Media Query Breakpoint Matrix
          </h3>
          <p className="text-xs text-app-muted">
            Drag the viewport slider or click device presets to observe how layouts reflow across screen dimensions.
          </p>
        </div>

        {/* Device Preset Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-app-inset border border-app-border">
          <button
            type="button"
            onClick={() => setViewportWidth(375)}
            className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors ${
              viewportWidth === 375 ? 'bg-teal-600 text-white shadow-sm' : 'text-app-muted hover:text-app-ink'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>375px</span>
          </button>
          <button
            type="button"
            onClick={() => setViewportWidth(768)}
            className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors ${
              viewportWidth === 768 ? 'bg-teal-600 text-white shadow-sm' : 'text-app-muted hover:text-app-ink'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>768px</span>
          </button>
          <button
            type="button"
            onClick={() => setViewportWidth(1024)}
            className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors ${
              viewportWidth === 1024 ? 'bg-teal-600 text-white shadow-sm' : 'text-app-muted hover:text-app-ink'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>1024px</span>
          </button>
        </div>
      </div>

      {/* Standard Step-by-Step Concept Pipeline: Input -> Process -> Output */}
      <div className="rounded-xl border border-app-border bg-app-inset p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-app-ink flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-teal-400" />
            Responsive Pipeline (Viewport Input → Media Query Match → Layout Reflow)
          </span>
          <div className="flex items-center gap-1 text-[10px] font-mono">
            {(['simple', 'structured', 'practical'] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setDepthStage(lvl)}
                className={`px-2 py-0.5 rounded capitalize font-bold cursor-pointer transition-colors ${
                  depthStage === lvl
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                    : 'text-app-subtle hover:text-app-muted'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono pt-1">
          <div className="rounded-lg border border-app-border bg-app-surface p-2.5 space-y-1">
            <div className="text-[10px] text-cyan-400 font-bold uppercase">1. Viewport Meta (Input)</div>
            <p className="text-[11px] text-app-muted">
              {depthStage === 'simple'
                ? '&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;'
                : 'Maps physical device pixels 1:1 to CSS pixels, preventing mobile browsers from zooming out.'}
            </p>
          </div>
          <div className="rounded-lg border border-app-border bg-app-surface p-2.5 space-y-1">
            <div className="text-[10px] text-amber-400 font-bold uppercase">2. Media Query (Process)</div>
            <p className="text-[11px] text-app-muted">
              {depthStage === 'simple'
                ? 'CSS engine checks screen width and activates matching @media rule.'
                : 'Evaluates boolean media conditions: @media (min-width: 768px) becomes true at 768px+.'}
            </p>
          </div>
          <div className="rounded-lg border border-app-border bg-app-surface p-2.5 space-y-1">
            <div className="text-[10px] text-emerald-400 font-bold uppercase">3. Fluid Reflow (Output)</div>
            <p className="text-[11px] text-app-muted">
              {depthStage === 'simple'
                ? 'Single column smoothly expands into 2 or 3 columns without horizontal scroll.'
                : 'Content adapts density, font sizes scale with clamp(), and touch targets remain >= 44px.'}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Width Range Slider */}
      <div className="rounded-xl border border-app-border bg-app-surface p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-app-ink font-bold">Viewport Width:</span>
            <span className="text-teal-400 font-bold text-sm bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
              {viewportWidth}px
            </span>
          </div>
          <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${currentBp.color}`}>
            Active: {currentBp.name} · {currentBp.query}
          </span>
        </div>

        <input
          type="range"
          min="320"
          max="1280"
          step="5"
          value={viewportWidth}
          onChange={(e) => setViewportWidth(Number(e.target.value))}
          className="w-full accent-teal-500 cursor-ew-resize"
        />

        <div className="flex justify-between text-[10px] font-mono text-app-subtle">
          <span>320px (Mobile)</span>
          <span>640px (sm)</span>
          <span>768px (md)</span>
          <span>1024px (lg)</span>
          <span>1280px (xl)</span>
        </div>
      </div>

      {/* Simulated Device Frame Preview */}
      <div className="rounded-xl border border-slate-800 bg-[#0a0c12] p-4 flex flex-col items-center justify-center overflow-x-auto">
        <div
          style={{ width: `${Math.min(viewportWidth, 900)}px`, maxWidth: '100%' }}
          className="rounded-lg border-2 border-slate-700 bg-app-surface p-4 transition-all duration-300 space-y-4 shadow-xl"
        >
          {/* Simulated Mini Browser Header */}
          <div className="flex items-center justify-between border-b border-app-border pb-2 text-[10px] font-mono text-app-subtle">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500/80" />
              <span className="w-2 h-2 rounded-full bg-amber-500/80" />
              <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
            </div>
            <span>https://webzonebw.in/er/index.html ({viewportWidth}px)</span>
          </div>

          {/* Responsive Fluid Grid of Cards */}
          <div className={`grid ${getColumns(viewportWidth)} gap-3 transition-all`}>
            <div className="p-3 rounded-lg border border-app-border bg-app-inset space-y-1">
              <div className="text-xs font-bold text-app-ink">Card A: Foundations</div>
              <p className="text-[10px] text-app-muted leading-relaxed">
                Client-server packet lifecycle and HTML skeleton.
              </p>
            </div>
            <div className="p-3 rounded-lg border border-app-border bg-app-inset space-y-1">
              <div className="text-xs font-bold text-app-ink">Card B: Modern CSS</div>
              <p className="text-[10px] text-app-muted leading-relaxed">
                Box model math, Flexbox alignment, and Grid matrix.
              </p>
            </div>
            <div className="p-3 rounded-lg border border-app-border bg-app-inset space-y-1">
              <div className="text-xs font-bold text-app-ink">Card C: JavaScript</div>
              <p className="text-[10px] text-app-muted leading-relaxed">
                Event handlers, DOM state mutation, and Cloud deploy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Code Link & Specificity Breakdown */}
      <div className="rounded-xl border border-slate-800 bg-[#0f1117] p-4 text-xs font-mono text-slate-300 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-1.5">
          <span className="text-teal-400 font-bold flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5" /> Active Media Query CSS Rule
          </span>
          <span className="text-[10px] text-slate-500">Mobile-First Cascade</span>
        </div>

        <pre className="text-slate-300 text-xs leading-relaxed overflow-x-auto">
          <code>
            {viewportWidth < 640 && `/* Mobile Base Style (Always Applied) */
.card-grid {
  display: grid;
  grid-template-columns: 1fr; /* Single column */
  gap: 16px;
}`}
            {viewportWidth >= 640 && viewportWidth < 1024 && `/* Tablet Breakpoint */
@media (min-width: 640px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columns */
  }
}`}
            {viewportWidth >= 1024 && `/* Desktop Breakpoint */
@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 columns */
  }
}`}
          </code>
        </pre>
      </div>

      {/* Concept Check / Reasoning Callout */}
      <div className="p-3.5 rounded-xl border border-teal-500/20 bg-teal-500/5 text-xs text-app-ink flex items-start gap-3">
        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-app-ink font-bold block mb-0.5">
            Key Mental Model · Mobile-First is Progressive Enhancement:
          </strong>
          <p className="text-app-muted leading-relaxed">
            Write your simple, single-column CSS outside of any media query first. Then use <code className="text-teal-400 font-bold">@media (min-width: ...)</code> to selectively add columns and richer layouts for users who have the screen space. This guarantees ultra-fast load times on mobile phones without overriding heavy desktop styles.
          </p>
        </div>
      </div>
    </div>
  );
};
