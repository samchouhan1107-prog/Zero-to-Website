import React, { useState } from 'react';
import { Layers, Layout, Grid, Terminal, GitBranch, Globe } from 'lucide-react';
import { BoxModelVisualizer } from './Visualizers/BoxModelVisualizer';
import { FlexboxVisualizer } from './Visualizers/FlexboxVisualizer';
import { GridVisualizer } from './Visualizers/GridVisualizer';
import { DomTreeVisualizer } from './Visualizers/DomTreeVisualizer';
import { GitFlowVisualizer } from './Visualizers/GitFlowVisualizer';
import { NetworkFlowVisualizer } from './Visualizers/NetworkFlowVisualizer';

export const VisualLab: React.FC = () => {
  const [activeVisualizer, setActiveVisualizer] = useState<'box' | 'flex' | 'grid' | 'dom' | 'git' | 'net'>('box');

  const tools = [
    { id: 'box', name: 'CSS Box Model', icon: Layers, desc: 'Margin, Border, Padding 3D Depth' },
    { id: 'flex', name: 'Flexbox Studio', icon: Layout, desc: 'Main vs Cross Axis Alignment' },
    { id: 'grid', name: 'CSS Grid Matrix', icon: Grid, desc: '2D Tracks & Auto-Fit Sizing' },
    { id: 'dom', name: 'DOM Tree Inspector', icon: Terminal, desc: 'HTML Hierarchy & JS Nodes' },
    { id: 'git', name: 'Git Commit DAG', icon: GitBranch, desc: 'Branching & Merge simulator' },
    { id: 'net', name: 'HTTP & DNS Flow', icon: Globe, desc: 'Client-Server Packet Cycle' },
  ];

  return (
    <div id="visual-lab-view" className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-10 sm:py-14 space-y-12">
      {/* 1. Atmospheric Hero Presentation */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 dark:bg-[#0b0d13] border border-slate-800 dark:border-[#1a1e2a] p-8 sm:p-12 text-white shadow-2xl">
        {/* Ambient Glow Gradients */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-12 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider bg-cyan-400/15 text-cyan-300 border border-cyan-400/30 flex items-center gap-2 shadow-xs">
              <Layers className="w-3.5 h-3.5 text-cyan-400" /> Visual Explainer Studio
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.2]">
            Interactive Concept <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">
              Visualizers & Simulators
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed pt-1">
            Explore mental models directly with hands-on sliders, live graph rendering, 3D depth simulations, and instant code generation.
          </p>
        </div>
      </section>

      {/* Tool Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {tools.map((t) => {
          const Icon = t.icon;
          const isSelected = activeVisualizer === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveVisualizer(t.id as any)}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 dark:bg-[#0b0d13] border-cyan-400 text-white shadow-xl ring-2 ring-cyan-400/50 scale-[1.02]'
                  : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:scale-[1.01]'
              }`}
            >
              {isSelected && (
                <span className="absolute top-0 right-0 w-12 h-12 bg-cyan-500/20 rounded-bl-3xl pointer-events-none" />
              )}
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-cyan-500 text-slate-950 shadow-xs font-black' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                {isSelected && (
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400/80" />
                )}
              </div>
              <h4 className="text-xs font-black text-slate-900 dark:text-white tracking-tight">{t.name}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">{t.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Active Visualizer Card */}
      <div className="mt-6">
        {activeVisualizer === 'box' && <BoxModelVisualizer />}
        {activeVisualizer === 'flex' && <FlexboxVisualizer />}
        {activeVisualizer === 'grid' && <GridVisualizer />}
        {activeVisualizer === 'dom' && <DomTreeVisualizer />}
        {activeVisualizer === 'git' && <GitFlowVisualizer />}
        {activeVisualizer === 'net' && <NetworkFlowVisualizer />}
      </div>
    </div>
  );
};
