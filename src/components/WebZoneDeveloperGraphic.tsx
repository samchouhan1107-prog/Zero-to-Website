import React from 'react';
import { motion } from 'motion/react';
import { Code2, Globe, Layers, Server, Terminal, Zap } from 'lucide-react';

export const WebZoneDeveloperGraphic: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center p-2 sm:p-4 select-none" aria-hidden="true">
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-tr from-blue-600/10 via-indigo-600/10 to-transparent blur-2xl" />

      {/* Main Developer Graphic Console Container */}
      <div className="relative w-full max-w-[440px] rounded-2xl border border-app-border bg-app-surface/95 p-4 sm:p-5 shadow-xl overflow-hidden backdrop-blur-md">
        {/* Subtle coordinate dot grid */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px), radial-gradient(#6366f1 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px',
          }}
        />

        {/* Console Header Bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-app-border pb-3 mb-3.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#eab308]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/80" />
          </div>

          <a
            href="https://webzonebw.in/"
            target="_blank"
            rel="noopener noreferrer"
            title="Open WebZone Workspace"
            className="flex items-center gap-2 rounded-md border border-app-border bg-app-inset px-2.5 py-0.5 font-mono text-[10px] text-app-muted transition-colors hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-300"
          >
            <Globe className="h-3 w-3 text-blue-500" />
            <span className="truncate max-w-[190px]">https://webzonebw.in/</span>
          </a>

          <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-blue-500 dark:text-blue-400">
            <span>SC</span>
            <span className="text-emerald-500 dark:text-emerald-400">&gt;&gt;</span>
          </div>
        </div>

        {/* Abstract Network Flow & Interconnecting Nodes (SVG) */}
        <div className="relative z-10 mb-3.5 rounded-xl border border-app-border bg-app-inset/80 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-app-muted flex items-center gap-1.5">
              <Server className="h-3 w-3 text-blue-500" /> Network &amp; DOM Pipeline
            </span>
            <span className="font-mono text-[9px] text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded px-1 py-0.2 bg-emerald-500/10">
              Active Sync
            </span>
          </div>

          <div className="relative h-14 flex items-center justify-between px-3">
            {/* SVG Data Flow Lines */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 320 56" fill="none">
              <path
                d="M 40 28 C 90 28, 110 18, 160 28 C 210 38, 230 28, 280 28"
                stroke="#3b82f6"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-40"
              />
              <motion.circle
                cx="40"
                cy="28"
                r="3"
                fill="#3b82f6"
                animate={{ cx: [40, 160, 280, 40] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
            </svg>

            {/* Node 1: Client / Browser Engine */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-sm">
                <Terminal className="h-3.5 w-3.5" />
              </div>
              <span className="mt-1 font-mono text-[9px] text-app-subtle">Client</span>
            </div>

            {/* Node 2: WebZone Core Engine */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-500/40 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shadow-sm">
                <Layers className="h-3.5 w-3.5" />
              </div>
              <span className="mt-1 font-mono text-[9px] text-app-subtle">DOM Tree</span>
            </div>

            {/* Node 3: Real-Time Output */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-sm">
                <Zap className="h-3.5 w-3.5" />
              </div>
              <span className="mt-1 font-mono text-[9px] text-app-subtle">Render</span>
            </div>
          </div>
        </div>

        {/* Code Fragment Card with Modern CSS Syntax */}
        <motion.div
          animate={{ y: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 rounded-xl border border-app-border bg-app-inset p-3 shadow-sm"
        >
          <div className="flex items-center justify-between border-b border-app-border pb-1.5 mb-2">
            <span className="font-mono text-[10px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <Code2 className="h-3 w-3 text-blue-500" />
              webzone-layout.css
            </span>
            <span className="font-mono text-[9px] text-app-subtle">CSS3 Grid</span>
          </div>

          <pre className="font-mono text-[10px] text-app-ink leading-relaxed overflow-x-auto no-scrollbar">
            <code>
              <span className="text-blue-600 dark:text-blue-400">.webzone-workspace</span> {'{\n'}
              {'  '}<span className="text-rose-600 dark:text-rose-400">display</span>: <span className="text-emerald-600 dark:text-emerald-400">grid</span>;{'\n'}
              {'  '}<span className="text-rose-600 dark:text-rose-400">grid-template-columns</span>: <span className="text-amber-600 dark:text-amber-300">repeat(auto-fit, minmax(280px, 1fr))</span>;{'\n'}
              {'  '}<span className="text-rose-600 dark:text-rose-400">gap</span>: <span className="text-indigo-600 dark:text-indigo-400">1.25rem</span>;{'\n'}
              {'}'}
            </code>
          </pre>
        </motion.div>

        {/* Interactive Bottom Wireframe Bar */}
        <div className="mt-3.5 flex items-center justify-between rounded-lg border border-app-border bg-app-inset px-3 py-2 text-[10px] font-mono text-app-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Instruments Ready</span>
          </span>
          <span className="text-blue-600 dark:text-blue-400 font-bold">SC Knowledge Base</span>
        </div>
      </div>
    </div>
  );
};
