import React, { useEffect, useState } from 'react';
import { CheckCircle2, Clock, FileText, Info, Layers, Layout, PaintBucket, Palette, Pause, Play, RotateCcw } from 'lucide-react';

type StepId = 'html' | 'css' | 'render' | 'layout' | 'paint';
type StepState = 'pending' | 'active' | 'completed';
const STEPS: ReadonlyArray<{ id: StepId; name: string; description: string; duration: number; icon: React.ComponentType<{ size?: number }> }> = [
  { id: 'html', name: 'HTML parsing', description: 'The browser reads markup and creates the DOM.', duration: 2, icon: FileText },
  { id: 'css', name: 'CSS parsing', description: 'Stylesheets become the CSS object model (CSSOM).', duration: 1, icon: Palette },
  { id: 'render', name: 'Render tree', description: 'Visible DOM nodes are combined with computed styles.', duration: 1, icon: Layers },
  { id: 'layout', name: 'Layout', description: 'The browser calculates visible box sizes and positions.', duration: 3, icon: Layout },
  { id: 'paint', name: 'Paint', description: 'The browser draws boxes, text, borders, and pixels.', duration: 2, icon: PaintBucket },
];
const sampleTree = [{ name: 'html', children: ['head', 'body'] }, { name: 'head', children: ['meta', 'title', 'link'] }, { name: 'body', children: ['header', 'main'] }];

export const CriticalPathInspector: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [completed, setCompleted] = useState<StepId[]>([]);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  useEffect(() => { const update = () => setViewport({ width: window.innerWidth, height: window.innerHeight }); update(); window.addEventListener('resize', update); return () => window.removeEventListener('resize', update); }, []);
  useEffect(() => {
    if (!isPlaying || currentStep >= STEPS.length) return;
    const timer = window.setTimeout(() => { const id = STEPS[currentStep].id; setCompleted((previous) => previous.includes(id) ? previous : [...previous, id]); if (currentStep === STEPS.length - 1) { setCurrentStep(STEPS.length); setIsPlaying(false); } else setCurrentStep((step) => step + 1); }, speed);
    return () => window.clearTimeout(timer);
  }, [currentStep, isPlaying, speed]);
  const reset = () => { setCurrentStep(0); setCompleted([]); setIsPlaying(false); };
  const stateFor = (id: StepId, index: number): StepState => completed.includes(id) ? 'completed' : index === currentStep && currentStep < STEPS.length ? 'active' : 'pending';
  const hasReached = (id: StepId) => completed.includes(id);
  const current = currentStep < STEPS.length ? STEPS[currentStep] : undefined;
  const elapsed = completed.reduce((sum, id) => sum + (STEPS.find((step) => step.id === id)?.duration || 0), 0);
  const styleFor = (state: StepState) => state === 'completed' ? 'border-emerald-500/60 bg-emerald-500/10' : state === 'active' ? 'border-blue-500 bg-blue-500/10' : 'border-app-border bg-app-inset';
  return <section className="space-y-6" aria-labelledby="crp-title">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><h2 id="crp-title" className="text-xl font-bold text-app-ink">Critical Rendering Path Inspector</h2><p className="mt-1 max-w-2xl text-sm text-app-muted">Step through a small page model. This explains the rendering path; it is not a measurement of this site’s network performance.</p></div><div className="flex flex-wrap gap-2"><button type="button" onClick={() => currentStep === STEPS.length ? (reset(), setIsPlaying(true)) : setIsPlaying((playing) => !playing)} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">{isPlaying ? <Pause size={16} /> : <Play size={16} />}{currentStep === STEPS.length ? 'Restart' : isPlaying ? 'Pause' : 'Play animation'}</button><button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-app-border bg-app-surface px-4 py-2 text-sm font-semibold text-app-ink hover:bg-app-inset"><RotateCcw size={16} />Reset</button></div></div>
    <label className="flex flex-wrap items-center gap-3 text-sm text-app-muted">Animation speed <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))} className="rounded-lg border border-app-border bg-app-surface px-3 py-2 text-app-ink"><option value={2000}>Slow</option><option value={1000}>Normal</option><option value={500}>Fast</option></select></label>
    <ol className="grid grid-cols-1 gap-3 md:grid-cols-5">{STEPS.map((step, index) => { const Icon = step.icon; const state = stateFor(step.id, index); return <li key={step.id} className={`rounded-lg border p-4 ${styleFor(state)}`}><div className="flex items-center gap-2"><Icon size={17} aria-hidden="true" /><span className="font-mono text-[11px] uppercase tracking-wide text-app-subtle">Step {index + 1} · {state}</span></div><h3 className="mt-2 text-sm font-bold text-app-ink">{step.name}</h3><p className="mt-1 text-xs leading-relaxed text-app-muted">{step.description}</p></li>; })}</ol>
    <div className="grid gap-5 lg:grid-cols-2"><section className="rounded-lg border border-app-border bg-app-surface p-4"><h3 className="flex items-center gap-2 font-semibold text-app-ink"><Layers size={16} />DOM and render tree</h3>{hasReached('html') ? <div className="mt-3 space-y-2">{sampleTree.map((node) => <div key={node.name} className="rounded border border-app-border bg-app-inset p-2 font-mono text-xs text-app-ink">&lt;{node.name}&gt;<div className="ml-4 mt-1 text-app-muted">{node.children.map((child) => <span key={child} className="mr-2">&lt;{child}&gt;</span>)}</div>{hasReached('render') && <div className="mt-1 text-emerald-400">computed: visible / block</div>}</div>)}</div> : <p className="mt-3 text-sm leading-relaxed text-app-muted">The page model is ready. Press Play to parse its HTML into a DOM tree.</p>}</section><section className="rounded-lg border border-app-border bg-app-surface p-4"><h3 className="flex items-center gap-2 font-semibold text-app-ink"><Palette size={16} />Critical CSS</h3><pre className="mt-3 overflow-x-auto rounded bg-slate-950 p-3 text-xs leading-relaxed text-emerald-300">{hasReached('css') ? 'body { font: 16px system-ui; }\nheader { padding: 1rem; }\nmain { display: block; }' : 'Stylesheet waiting to be parsed…'}</pre></section><section className="rounded-lg border border-app-border bg-app-surface p-4"><h3 className="flex items-center gap-2 font-semibold text-app-ink"><Clock size={16} />Model metrics</h3><dl className="mt-3 space-y-2 text-sm"><div className="flex justify-between gap-4"><dt className="text-app-muted">Viewport</dt><dd className="font-mono text-app-ink">{viewport.width ? `${viewport.width} × ${viewport.height}px` : 'Reading…'}</dd></div><div className="flex justify-between gap-4"><dt className="text-app-muted">Completed model time</dt><dd className="font-mono text-app-ink">{elapsed} ms</dd></div><div className="flex justify-between gap-4"><dt className="text-app-muted">Layout available</dt><dd className="font-mono text-app-ink">{hasReached('layout') ? 'Yes' : 'Not yet'}</dd></div></dl></section><section className="rounded-lg border border-app-border bg-app-surface p-4"><h3 className="flex items-center gap-2 font-semibold text-app-ink"><Info size={16} />Current status</h3>{current ? <><p className="mt-3 text-sm font-semibold text-app-ink">{current.name}</p><p className="mt-1 text-sm leading-relaxed text-app-muted">{current.description}</p></> : <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-emerald-400"><CheckCircle2 size={16} />Model complete — reset to replay it.</p>}</section></div>
  </section>;
};
