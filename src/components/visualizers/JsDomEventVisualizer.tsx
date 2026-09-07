import React, { useState } from 'react';
import {
  Zap,
  Play,
  RotateCcw,
  ArrowRight,
  MousePointer,
  Cpu,
  Layers,
  CheckCircle2,
  Code2,
} from 'lucide-react';

export const JsDomEventVisualizer: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [depthStage, setDepthStage] = useState<'simple' | 'structured' | 'practical'>('simple');
  const [activeTab, setActiveTab] = useState<'counter' | 'theme'>('counter');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const pipelineStages = [
    {
      id: 0,
      name: '1. User Action (Input)',
      badge: 'DOM Event',
      desc: 'User clicks the button in the browser window, generating a MouseEvent object.',
      code: 'button.addEventListener("click", (event) => { ... })',
      highlight: 'input',
    },
    {
      id: 1,
      name: '2. Call Stack & Handler (Process)',
      badge: 'V8 Engine RAM',
      desc: 'JavaScript event loop pushes handler onto call stack and mutates state variable: count = count + 1.',
      code: 'let count = ' + count + '; count++;',
      highlight: 'process',
    },
    {
      id: 2,
      name: '3. DOM Tree Mutation (Output)',
      badge: 'DOM Tree Patch',
      desc: 'Engine targets document.querySelector("#counter-val") and updates textContent node.',
      code: 'document.querySelector("#counter-val").textContent = count;',
      highlight: 'dom',
    },
    {
      id: 3,
      name: '4. Browser Re-Paint',
      badge: 'Screen Pixels',
      desc: 'Browser recalculates layout and rasterizes updated pixels on display.',
      code: '// UI renders updated count: ' + count,
      highlight: 'paint',
    },
  ];

  const triggerIncrement = () => {
    setCount((prev) => prev + 1);
    setActiveStep(1);
    setTimeout(() => setActiveStep(2), 600);
    setTimeout(() => setActiveStep(3), 1200);
  };

  const resetAll = () => {
    setCount(0);
    setActiveStep(0);
    setIsDarkMode(false);
  };

  return (
    <div id="js-dom-event-visualizer" className="panel-surface min-w-0 overflow-hidden p-5 sm:p-6 space-y-6">
      {/* Header & Concept Standard Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-app-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-400">
              CONCEPT: EVENT-DRIVEN DOM ARCHITECTURE
            </span>
            <span className="font-mono text-xs text-app-subtle">Ch 06 JavaScript Runtime</span>
          </div>
          <h3 className="text-lg font-bold text-app-ink flex items-center gap-2 mt-1">
            <Zap className="w-5 h-5 text-amber-400" />
            JavaScript DOM Events &amp; State Mutation Simulator
          </h3>
          <p className="text-xs text-app-muted">
            Trace how user interactions trigger event listeners, execute handlers in RAM, and re-paint the DOM tree.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetAll}
            className="text-xs px-2.5 py-1.5 rounded-md border border-app-border bg-app-inset text-app-muted hover:text-app-ink flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Standard Step-by-Step Concept Pipeline: Input -> Process -> Output */}
      <div className="rounded-xl border border-app-border bg-app-inset p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-app-ink flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            The Event Loop &amp; DOM Lifecycle (Input → Process → Output)
          </span>
          <div className="flex items-center gap-1 text-[10px] font-mono">
            {(['simple', 'structured', 'practical'] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setDepthStage(lvl)}
                className={`px-2 py-0.5 rounded capitalize font-bold cursor-pointer transition-colors ${
                  depthStage === lvl
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-app-subtle hover:text-app-muted'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Pipeline Stages */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
          {pipelineStages.map((st, sIdx) => {
            const isActive = activeStep === sIdx;
            return (
              <div
                key={st.id}
                onClick={() => setActiveStep(sIdx)}
                className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                  isActive
                    ? 'border-amber-400 bg-amber-500/15 text-app-ink ring-1 ring-amber-400'
                    : 'border-app-border bg-app-surface text-app-muted hover:border-app-border hover:text-app-ink'
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-amber-400">{st.badge}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />}
                </div>
                <div className="font-bold text-[11px] mt-1 text-app-ink">{st.name}</div>
                <p className="text-[10px] text-app-muted mt-1 leading-relaxed line-clamp-2">
                  {st.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Testing Studio: Live Counter & Theme Switch */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Simulated UI Widget */}
        <div className="lg:col-span-6 rounded-xl border border-app-border bg-app-inset p-5 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-app-border pb-3">
            <span className="font-mono text-xs font-bold text-app-ink flex items-center gap-2">
              <MousePointer className="w-4 h-4 text-amber-400" />
              Interactive UI Widget (Target)
            </span>
            <div className="flex items-center gap-1 font-mono text-[10px]">
              <button
                type="button"
                onClick={() => setActiveTab('counter')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  activeTab === 'counter' ? 'bg-amber-500/20 text-amber-400 font-bold' : 'text-app-muted'
                }`}
              >
                Counter
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('theme')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  activeTab === 'theme' ? 'bg-amber-500/20 text-amber-400 font-bold' : 'text-app-muted'
                }`}
              >
                Theme Toggle
              </button>
            </div>
          </div>

          {activeTab === 'counter' ? (
            <div className="py-6 flex flex-col items-center justify-center space-y-4">
              <div className="text-[11px] font-mono text-app-subtle uppercase tracking-wider">
                &lt;span id=&quot;counter-val&quot;&gt;
              </div>
              <div className="text-5xl font-black font-mono text-app-ink tracking-tight bg-app-surface px-6 py-3 rounded-2xl border border-app-border shadow-xs">
                {count}
              </div>
              <p className="text-xs text-app-muted text-center max-w-xs">
                Clicking the button fires a click event to the listener in JS memory.
              </p>

              <button
                type="button"
                onClick={triggerIncrement}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 cursor-pointer shadow-sm transition-all active:scale-95"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Increment (+1)</span>
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-xl border transition-all text-center space-y-4 ${
              isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className="text-sm font-bold">
                Theme: {isDarkMode ? '🌙 Dark Mode Active' : '☀️ Light Mode Active'}
              </div>
              <p className="text-xs opacity-75">
                Mutates document.body.classList.toggle(&quot;dark-mode&quot;).
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsDarkMode(!isDarkMode);
                  setActiveStep(1);
                  setTimeout(() => setActiveStep(2), 500);
                  setTimeout(() => setActiveStep(3), 1000);
                }}
                className="px-4 py-2 rounded-lg font-mono text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer transition-all"
              >
                Toggle Dark Mode Class
              </button>
            </div>
          )}

          <div className="text-[11px] font-mono text-app-subtle text-center pt-2 border-t border-app-border">
            State variable in memory: <code className="text-amber-400 font-bold">count = {count}</code>
          </div>
        </div>

        {/* Right Code & Engine Execution Breakdown */}
        <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-[#0f1117] p-4 text-xs font-mono text-slate-300 space-y-3 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-cyan-400 font-bold flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" /> Engine Execution Trace
            </span>
            <span className="text-[10px] text-slate-500">Stage: {pipelineStages[activeStep]?.badge}</span>
          </div>

          <div className="bg-[#13151f] p-3 rounded-lg border border-slate-800 space-y-2">
            <div className="text-[11px] text-slate-400">// Active JavaScript Code Segment</div>
            <pre className="text-amber-300 text-xs overflow-x-auto leading-relaxed">
              <code>{pipelineStages[activeStep]?.code}</code>
            </pre>
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="font-bold text-slate-200">What is happening in this step?</div>
            <p className="text-slate-400 leading-relaxed">
              {pipelineStages[activeStep]?.desc}
            </p>
          </div>

          {/* DOM Tree Node Mutation Preview */}
          <div className="rounded-lg border border-slate-800 bg-[#0a0c12] p-3 space-y-1.5">
            <div className="text-[10px] text-slate-500 uppercase">DOM Tree Node Representation</div>
            <div className="text-[11px] text-slate-300">
              &lt;div id=&quot;app&quot;&gt; <br />
              &nbsp;&nbsp;&lt;span id=&quot;counter-val&quot;&gt;
              <span className="bg-amber-500/20 text-amber-300 px-1 py-0.5 rounded font-bold">
                {count}
              </span>
              &lt;/span&gt; <br />
              &nbsp;&nbsp;&lt;button id=&quot;btn-inc&quot;&gt;Increment&lt;/button&gt; <br />
              &lt;/div&gt;
            </div>
          </div>
        </div>
      </div>

      {/* Concept Check / Reasoning Callout */}
      <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs text-app-ink flex items-start gap-3">
        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-app-ink font-bold block mb-0.5">
            Key Mental Model · Separation of Event and Render:
          </strong>
          <p className="text-app-muted leading-relaxed">
            Never store your application data inside HTML strings or DOM attributes. Store your truth in JavaScript memory as numbers, booleans, or objects, and let your event listener handlers update the DOM to reflect that state.
          </p>
        </div>
      </div>
    </div>
  );
};
