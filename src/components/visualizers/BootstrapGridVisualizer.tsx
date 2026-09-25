import React, { useState } from 'react';
import {
  Grid,
  Layers,
  CheckCircle2,
  Box,
  Copy,
  Check,
  RotateCcw,
} from 'lucide-react';

export const BootstrapGridVisualizer: React.FC = () => {
  const [activeLayout, setActiveLayout] = useState<'3-equal' | 'sidebar' | 'hero' | '4-col'>('3-equal');
  const [depthStage, setDepthStage] = useState<'simple' | 'structured' | 'practical'>('simple');
  const [copied, setCopied] = useState(false);

  const layouts = {
    '3-equal': {
      name: '3 Equal Columns',
      code: '<div class="row">\n  <div class="col-md-4">Col 4 (33.3%)</div>\n  <div class="col-md-4">Col 4 (33.3%)</div>\n  <div class="col-md-4">Col 4 (33.3%)</div>\n</div>',
      cols: [
        { span: 4, label: 'col-md-4', desc: '4/12 = 33.33%', color: 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' },
        { span: 4, label: 'col-md-4', desc: '4/12 = 33.33%', color: 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' },
        { span: 4, label: 'col-md-4', desc: '4/12 = 33.33%', color: 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' },
      ],
    },
    sidebar: {
      name: 'Sidebar & Main Content',
      code: '<div class="row">\n  <div class="col-md-3">Sidebar (25%)</div>\n  <div class="col-md-9">Main Feed (75%)</div>\n</div>',
      cols: [
        { span: 3, label: 'col-md-3', desc: 'Sidebar 3/12 = 25%', color: 'bg-purple-500/20 border-purple-500/50 text-purple-300' },
        { span: 9, label: 'col-md-9', desc: 'Content 9/12 = 75%', color: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' },
      ],
    },
    hero: {
      name: 'Hero Showcase & Form',
      code: '<div class="row">\n  <div class="col-md-8">Hero Banner (66.6%)</div>\n  <div class="col-md-4">Signup Form (33.3%)</div>\n</div>',
      cols: [
        { span: 8, label: 'col-md-8', desc: 'Hero 8/12 = 66.66%', color: 'bg-amber-500/20 border-amber-500/50 text-amber-300' },
        { span: 4, label: 'col-md-4', desc: 'Form 4/12 = 33.33%', color: 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' },
      ],
    },
    '4-col': {
      name: '4 Feature Cards',
      code: '<div class="row">\n  <div class="col-md-3">Feature 1</div>\n  <div class="col-md-3">Feature 2</div>\n  <div class="col-md-3">Feature 3</div>\n  <div class="col-md-3">Feature 4</div>\n</div>',
      cols: [
        { span: 3, label: 'col-md-3', desc: '25%', color: 'bg-rose-500/20 border-rose-500/50 text-rose-300' },
        { span: 3, label: 'col-md-3', desc: '25%', color: 'bg-rose-500/20 border-rose-500/50 text-rose-300' },
        { span: 3, label: 'col-md-3', desc: '25%', color: 'bg-rose-500/20 border-rose-500/50 text-rose-300' },
        { span: 3, label: 'col-md-3', desc: '25%', color: 'bg-rose-500/20 border-rose-500/50 text-rose-300' },
      ],
    },
  };

  const currentConfig = layouts[activeLayout];

  const copyCode = () => {
    navigator.clipboard.writeText(currentConfig.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="bootstrap-grid-visualizer" className="panel-surface min-w-0 overflow-hidden p-5 sm:p-6 space-y-6">
      {/* Header & Concept Standard Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-app-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-purple-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-purple-400">
              CONCEPT: 12-COLUMN GRID SYSTEM
            </span>
            <span className="font-mono text-xs text-app-subtle">Ch 08 UI Frameworks</span>
          </div>
          <h3 className="text-lg font-bold text-app-ink flex items-center gap-2 mt-1">
            <Grid className="w-5 h-5 text-purple-400" />
            Bootstrap 12-Column Grid &amp; Component System Studio
          </h3>
          <p className="text-xs text-app-muted">
            Visualize how 12 fractional columns divide space, and how container &gt; row &gt; col elements compose clean layouts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={copyCode}
            className="text-xs px-3 py-1.5 rounded-md bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Grid HTML'}</span>
          </button>
        </div>
      </div>

      {/* Standard Step-by-Step Concept Pipeline: Input -> Process -> Output */}
      <div className="rounded-xl border border-app-border bg-app-inset p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-app-ink flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            12-Column Math Pipeline (Input → Percentage Calculation → Output)
          </span>
          <div className="flex items-center gap-1 text-[10px] font-mono">
            {(['simple', 'structured', 'practical'] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setDepthStage(lvl)}
                className={`px-2 py-0.5 rounded capitalize font-bold cursor-pointer transition-colors ${
                  depthStage === lvl
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
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
            <div className="text-[10px] text-cyan-400 font-bold uppercase">1. Grid Container (Input)</div>
            <p className="text-[11px] text-app-muted">
              {depthStage === 'simple'
                ? '&lt;div class="container"&gt;&lt;div class="row"&gt;'
                : 'The row uses negative margins to compensate for column gutter padding.'}
            </p>
          </div>
          <div className="rounded-lg border border-app-border bg-app-surface p-2.5 space-y-1">
            <div className="text-[10px] text-amber-400 font-bold uppercase">2. Math Fraction (Process)</div>
            <p className="text-[11px] text-app-muted">
              {depthStage === 'simple'
                ? 'col-md-4 means 4 slots out of 12 total = 33.333% width.'
                : 'CSS rule: flex: 0 0 auto; width: 33.33333333%; applied at medium breakpoint.'}
            </p>
          </div>
          <div className="rounded-lg border border-app-border bg-app-surface p-2.5 space-y-1">
            <div className="text-[10px] text-emerald-400 font-bold uppercase">3. Total 12 Lock (Output)</div>
            <p className="text-[11px] text-app-muted">
              {depthStage === 'simple'
                ? 'When spans add up to 12 (e.g. 4+4+4 or 3+9), they fill exactly 100% width.'
                : 'If spans exceed 12, extra columns automatically wrap to the next row cleanly.'}
            </p>
          </div>
        </div>
      </div>

      {/* Preset Layout Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {(['3-equal', 'sidebar', 'hero', '4-col'] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveLayout(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
              activeLayout === key
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-app-inset border border-app-border text-app-muted hover:text-app-ink'
            }`}
          >
            {layouts[key].name}
          </button>
        ))}
      </div>

      {/* The 12-Slot Underlying Ruler */}
      <div className="rounded-xl border border-app-border bg-app-surface p-4 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between text-app-subtle text-[11px]">
          <span>The Underlying 12 Fractional Slots:</span>
          <span>100% Row Width</span>
        </div>

        {/* 12 Slots Visual Track */}
        <div className="grid grid-cols-12 gap-1.5 text-center">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="py-1 rounded bg-slate-800/40 border border-slate-700/60 text-slate-400 text-[10px] font-bold"
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* The Rendered Columns Sitting on Top */}
        <div className="pt-2">
          <div className="grid grid-cols-12 gap-2">
            {currentConfig.cols.map((col, idx) => (
              <div
                key={idx}
                style={{ gridColumn: `span ${col.span}` }}
                className={`p-3 rounded-lg border text-center transition-all ${col.color}`}
              >
                <div className="font-bold text-xs">{col.label}</div>
                <div className="text-[10px] opacity-80 mt-0.5">{col.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Component Library Kit Preview */}
      <div className="rounded-xl border border-slate-800 bg-[#0f1117] p-4 text-xs font-mono text-slate-300 space-y-3 shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-cyan-400 font-bold flex items-center gap-1.5">
            <Box className="w-3.5 h-3.5" /> Component System Anatomy
          </span>
          <span className="text-[10px] text-slate-500">Atomic Composition</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3 rounded-lg border border-slate-800 bg-[#13151f] space-y-2">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Button Component</div>
            <button
              type="button"
              className="px-3 py-1 rounded bg-purple-600 text-white font-bold text-xs"
            >
              .btn .btn-primary
            </button>
            <p className="text-[10px] text-slate-400">Pre-styled interactive affordance.</p>
          </div>

          <div className="p-3 rounded-lg border border-slate-800 bg-[#13151f] space-y-2">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Alert Component</div>
            <div className="p-1.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px]">
              .alert .alert-success
            </div>
            <p className="text-[10px] text-slate-400">Standardized feedback notification.</p>
          </div>

          <div className="p-3 rounded-lg border border-slate-800 bg-[#13151f] space-y-2">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Badge Component</div>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
              .badge .bg-warning
            </span>
            <p className="text-[10px] text-slate-400">Status and indicator tag pill.</p>
          </div>
        </div>
      </div>

      {/* Concept Check / Reasoning Callout */}
      <div className="p-3.5 rounded-xl border border-purple-500/20 bg-purple-500/5 text-xs text-app-ink flex items-start gap-3">
        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-app-ink font-bold block mb-0.5">
            Key Mental Model · Why 12 Columns?
          </strong>
          <p className="text-app-muted leading-relaxed">
            The number 12 was chosen by web architects because it is highly composite: it is evenly divisible by 1, 2, 3, 4, and 6. This allows you to split a screen into halves (6+6), thirds (4+4+4), quarters (3+3+3+3), or sixths (2+2+2+2+2+2) without any fractional pixel gaps.
          </p>
        </div>
      </div>
    </div>
  );
};
