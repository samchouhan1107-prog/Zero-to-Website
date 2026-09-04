import React, { useState } from 'react';
import { GitBranch, Globe, Grid, Layers, Layout, Terminal } from 'lucide-react';
import { BoxModelVisualizer } from './visualizers/BoxModelVisualizer';
import { FlexboxVisualizer } from './visualizers/FlexboxVisualizer';
import { GridVisualizer } from './visualizers/GridVisualizer';
import { DomTreeVisualizer } from './visualizers/DomTreeVisualizer';
import { GitFlowVisualizer } from './visualizers/GitFlowVisualizer';
import { NetworkFlowVisualizer } from './visualizers/NetworkFlowVisualizer';

export type VisualizerId = 'box' | 'flex' | 'grid' | 'dom' | 'git' | 'net';

type VisualizerTool = {
  id: VisualizerId;
  name: string;
  shortName: string;
  icon: typeof Layers;
  description: string;
  tone: string;
};

const tools: VisualizerTool[] = [
  { id: 'box', name: 'CSS box model', shortName: 'CSS model', icon: Layers, description: 'Margin, border, padding, and content depth.', tone: 'text-app-amber' },
  { id: 'flex', name: 'Flexbox studio', shortName: 'Flexbox', icon: Layout, description: 'Main and cross-axis alignment.', tone: 'text-violet-400' },
  { id: 'grid', name: 'CSS grid matrix', shortName: 'Grid matrix', icon: Grid, description: 'Two-dimensional tracks and auto-fit sizing.', tone: 'text-teal-400' },
  { id: 'dom', name: 'DOM tree inspector', shortName: 'DOM explorer', icon: Terminal, description: 'HTML hierarchy and selected nodes.', tone: 'text-cyan-400' },
  { id: 'git', name: 'Git commit DAG', shortName: 'Git history', icon: GitBranch, description: 'Branches, commits, and merge flow.', tone: 'text-pink-400' },
  { id: 'net', name: 'HTTP & DNS flow', shortName: 'Network trace', icon: Globe, description: 'Client, DNS, server, and asset requests.', tone: 'text-emerald-400' },
];

interface VisualLabProps {
  initialTool?: VisualizerId;
}

export const VisualLab: React.FC<VisualLabProps> = ({ initialTool = 'box' }) => {
  const [activeVisualizer, setActiveVisualizer] = useState<VisualizerId>(initialTool);

  React.useEffect(() => {
    if (initialTool) {
      setActiveVisualizer(initialTool);
    }
  }, [initialTool]);
  const activeTool = tools.find((tool) => tool.id === activeVisualizer) || tools[0];

  return (
    <div id="visual-lab-view" className="mx-auto w-full max-w-[1180px] min-w-0 space-y-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <section className="panel-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="min-w-0 max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-violet-400"><Layers className="h-4 w-4" aria-hidden="true" /> Visual explainer studio</p>
            <h1 className="mt-3 text-3xl font-black leading-tight tracking-[-0.03em] text-app-ink sm:text-4xl">See the system behind the syntax.</h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-app-muted">Use the stored React visualizers as working mental models. Change the controls, inspect the result, and connect the diagram back to the code you are learning.</p>
          </div>
          <div className="border-l border-app-border pl-4 text-right"><p className="font-mono text-[11px] uppercase tracking-[0.12em] text-app-subtle">Active instrument</p><p className="mt-2 text-sm font-bold text-app-ink">{activeTool.shortName}</p><p className="mt-1 max-w-[180px] text-xs leading-relaxed text-app-muted">{activeTool.description}</p></div>
        </div>
      </section>

      <div className="grid min-w-0 gap-5 lg:grid-cols-[224px_minmax(0,1fr)] lg:items-start">
        <aside className="panel-surface min-w-0 overflow-hidden" aria-label="Visualizer instruments">
          <div className="border-b border-app-border px-4 py-3"><p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-app-subtle">Instrument rail</p><p className="mt-1 text-xs leading-relaxed text-app-muted">Choose a model to explore.</p></div>
          <div className="divide-y divide-app-border">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isSelected = activeVisualizer === tool.id;
              return <button key={tool.id} type="button" onClick={() => setActiveVisualizer(tool.id)} aria-pressed={isSelected} aria-controls="visualizer-stage" className={`group flex min-h-16 w-full min-w-0 items-center gap-3 px-4 py-3 text-left transition-colors ${isSelected ? 'bg-app-active' : 'hover:bg-app-inset'}`}><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-control border border-app-border bg-app-inset ${isSelected ? tool.tone : 'text-app-muted'}`}><Icon className="h-4 w-4" aria-hidden="true" /></span><span className="min-w-0"><span className={`block truncate text-sm font-bold ${isSelected ? 'text-app-ink' : 'text-app-muted group-hover:text-app-ink'}`}>{tool.name}</span><span className="mt-0.5 block truncate font-mono text-[10px] uppercase tracking-[0.1em] text-app-subtle">{tool.shortName}</span></span>{isSelected && <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-app-amber" aria-hidden="true" />}</button>;
            })}
          </div>
        </aside>

        <section id="visualizer-stage" aria-label={`${activeTool.name} teaching stage`} className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3"><div className="min-w-0"><p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-app-amber">Teaching stage</p><h2 className="mt-1 truncate text-lg font-bold text-app-ink">{activeTool.name}</h2></div><span className="shrink-0 rounded-control border border-app-border bg-app-inset px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-app-subtle">Live model</span></div>
          <div className="min-w-0 overflow-hidden rounded-panel border border-app-border bg-app-surface">
            {activeVisualizer === 'box' && <BoxModelVisualizer />}
            {activeVisualizer === 'flex' && <FlexboxVisualizer />}
            {activeVisualizer === 'grid' && <GridVisualizer />}
            {activeVisualizer === 'dom' && <DomTreeVisualizer />}
            {activeVisualizer === 'git' && <GitFlowVisualizer />}
            {activeVisualizer === 'net' && <NetworkFlowVisualizer />}
          </div>
        </section>
      </div>
    </div>
  );
};
