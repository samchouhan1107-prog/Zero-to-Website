import React from 'react';
import { motion } from 'motion/react';

export const MDNDeveloperGraphic: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center p-2 sm:p-6 select-none" aria-hidden="true">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#2b7fff]/15 via-[#635dff]/10 to-transparent blur-2xl" />

      {/* Main Abstract Composition Canvas */}
      <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-[#333333] bg-[#111111]/90 p-5 shadow-2xl overflow-hidden backdrop-blur-md">
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(#388bfd 1px, transparent 1px), radial-gradient(#635dff 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
          }}
        />

        {/* Animated Terminal Window bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#2e2e2e] pb-2.5 mb-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="font-mono text-[10px] tracking-wider text-[#858585]">
            developer.mozilla.org
          </div>
          <div className="font-mono text-[10px] font-bold text-[#2b7fff]">
            MDN_
          </div>
        </div>

        {/* Layer 1: Base CSS Grid & Box Model Wireframe */}
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 rounded-lg border border-[#2b7fff]/40 bg-[#1a1a1a]/95 p-3.5 shadow-lg space-y-2 mb-3"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-bold text-[#4ea8ff]">
              .web-developer {'{'}
            </span>
            <span className="font-mono text-[9px] rounded bg-[#2b7fff]/20 text-[#4ea8ff] px-1.5 py-0.5 font-bold">
              CSS3 / GRID
            </span>
          </div>
          <div className="font-mono text-[10px] text-[#a0a0a0] pl-2 space-y-0.5">
            <div><span className="text-[#ff7b72]">display</span>: <span className="text-[#79c0ff]">grid</span>;</div>
            <div><span className="text-[#ff7b72]">grid-template-columns</span>: <span className="text-[#79c0ff]">repeat(auto-fit, minmax(200px, 1fr))</span>;</div>
            <div><span className="text-[#ff7b72]">gap</span>: <span className="text-[#79c0ff]">1.5rem</span>;</div>
          </div>
          <span className="font-mono text-[11px] font-bold text-[#4ea8ff]">
            {'}'}
          </span>
        </motion.div>

        {/* Layer 2: Floating JavaScript Interaction Card */}
        <motion.div
          animate={{ y: [3, -3, 3], x: [1, -1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="relative z-20 -mt-2 ml-6 rounded-lg border border-[#635dff]/50 bg-[#161618] p-3 shadow-xl space-y-1.5 backdrop-blur"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-bold text-[#9d98ff]">
              async function buildApp() {'{'}
            </span>
            <span className="font-mono text-[9px] rounded bg-[#635dff]/25 text-[#c4b5fd] px-1.5 py-0.5 font-bold">
              ES2026 / DOM
            </span>
          </div>
          <div className="font-mono text-[10px] text-[#a0a0a0] pl-2">
            <span className="text-[#ff7b72]">const</span> api = <span className="text-[#ff7b72]">await</span> <span className="text-[#79c0ff]">fetch</span>(<span className="text-[#a5d6ff]">'/api/mdn'</span>);
          </div>
          <div className="font-mono text-[11px] font-bold text-[#9d98ff]">
            {'}'}
          </div>
        </motion.div>

        {/* Floating Geometric Developer Badges & Syntax Sparks */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-4 bottom-4 z-30 rounded-md border border-[#2b7fff] bg-[#2b7fff] px-2.5 py-1 text-slate-950 font-mono text-[11px] font-black shadow-lg"
        >
          &lt;/&gt; Web APIs
        </motion.div>

        <motion.div
          animate={{ scale: [1, 0.95, 1], y: [-1, 2, -1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute left-4 bottom-3 z-30 rounded-md border border-[#333333] bg-[#1a1a1a] px-2 py-0.5 font-mono text-[10px] font-bold text-[#79c0ff]"
        >
          ✓ HTML5 Standard
        </motion.div>

        {/* Animated pulse dot */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-[9px] text-[#4ea8ff]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2b7fff] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2b7fff]" />
          </span>
          <span className="text-[#858585]">LIVE SPECS</span>
        </div>
      </div>
    </div>
  );
};
