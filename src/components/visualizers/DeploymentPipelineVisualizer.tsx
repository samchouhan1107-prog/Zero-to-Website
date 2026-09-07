import React, { useState } from 'react';
import {
  Cloud,
  CheckCircle2,
  ArrowRight,
  GitBranch,
  ShieldCheck,
  Globe,
  ExternalLink,
  Layers,
  Sparkles,
  RotateCcw,
  Play,
  FileCode2,
} from 'lucide-react';

export const DeploymentPipelineVisualizer: React.FC = () => {
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedTraceConcept, setSelectedTraceConcept] = useState<number>(0);
  const [depthStage, setDepthStage] = useState<'simple' | 'structured' | 'practical'>('simple');

  const stages = [
    {
      id: 0,
      title: '1. Local Push',
      badge: 'Git Stage',
      desc: 'Developer commits code and executes "git push origin main" from local workspace.',
      status: 'Source Committed',
      terminal: '$ git commit -m "Deploy v1.0 Production"\n$ git push origin main',
    },
    {
      id: 1,
      title: '2. CI/CD Build',
      badge: 'Build Pipeline',
      desc: 'Automated runner compiles assets, runs linter checks, and verifies HTML/CSS validity.',
      status: 'Passed (0 errors)',
      terminal: '$ npm run build\n> tsc --noEmit && vite build\n✓ Build succeeded in 1.42s',
    },
    {
      id: 2,
      title: '3. Cloud Container',
      badge: 'Cloud Run / Server',
      desc: 'Production container initializes with Node.js/Nginx and issues automated SSL certificates.',
      status: 'TLS 1.3 Active',
      terminal: 'Container provisioned: port 3000\nSSL certificate verified (Let\'s Encrypt)\nHTTPS ingress routing bound',
    },
    {
      id: 3,
      title: '4. Global CDN',
      badge: 'Edge Caching',
      desc: 'Static HTML, CSS, and JS assets replicate to 200+ edge caching servers worldwide.',
      status: 'Cache Purged & Primed',
      terminal: 'Edge nodes: North America, Europe, Asia\nDNS lookup resolved in 14ms',
    },
    {
      id: 4,
      title: '5. Live Production',
      badge: 'Global HTTPS',
      desc: 'Website is live globally at https://webzonebw.in/er/index.html with zero downtime.',
      status: '200 OK Live',
      terminal: 'HTTP/2 200 OK\nDomain: https://webzonebw.in/er/index.html\nReady for global visitors!',
    },
  ];

  // Traceability Matrix linking Capstone to all previous chapters
  const traceConcepts = [
    {
      ch: 'Ch 00',
      name: 'Internet & DNS Architecture',
      role: 'Global Routing',
      appliedIn: 'Domain name resolution & HTTP GET packet delivery for the live portfolio.',
      code: 'https://webzonebw.in/er/index.html -> 200 OK HTML payload',
    },
    {
      ch: 'Ch 02',
      name: 'Semantic HTML5 Architecture',
      role: 'Document Structure',
      appliedIn: '<header>, <nav>, <main>, <article>, and <footer> landmark tags.',
      code: '<header><nav>...</nav></header>\n<main><article class="project-card">...</article></main>',
    },
    {
      ch: 'Ch 03',
      name: 'CSS Box Model & Design Tokens',
      role: 'Spacing & Colors',
      appliedIn: 'Design tokens (--bg-primary, --accent) and box-sizing: border-box geometry.',
      code: '* { box-sizing: border-box; }\n:root { --accent: #f59e0b; }',
    },
    {
      ch: 'Ch 04',
      name: 'CSS Flexbox Alignment',
      role: 'Navigation & Headers',
      appliedIn: 'Navbar item distribution with justify-content: space-between and badge centering.',
      code: '.navbar { display: flex; justify-content: space-between; align-items: center; }',
    },
    {
      ch: 'Ch 05',
      name: 'CSS Grid Matrix',
      role: 'Project Showcase',
      appliedIn: '2D grid showcase with grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)).',
      code: '.portfolio-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }',
    },
    {
      ch: 'Ch 06',
      name: 'JavaScript DOM & State',
      role: 'Interactivity & Theme',
      appliedIn: 'Event listeners for theme switching, filter tabs, and dynamic contact form feedback.',
      code: 'themeToggle.addEventListener("click", () => document.body.classList.toggle("dark"));',
    },
    {
      ch: 'Ch 07',
      name: 'Responsive Media Queries',
      role: 'Mobile Adaptation',
      appliedIn: 'Mobile-first styling with @media (min-width: 768px) layout reflow.',
      code: '@media (min-width: 768px) { .portfolio-grid { gap: 24px; } }',
    },
    {
      ch: 'Ch 08',
      name: 'Component Systems',
      role: 'UI Consistency',
      appliedIn: 'Reusable atomic components for badges, project cards, and call-to-action buttons.',
      code: '<button class="btn btn-primary">View Project</button>',
    },
    {
      ch: 'Ch 09',
      name: 'Git Version Control',
      role: 'Source History',
      appliedIn: 'Commit timeline history and branch merges deployed to GitHub repository.',
      code: 'git add . && git commit -m "Final portfolio release" && git push',
    },
  ];

  const triggerPlay = () => {
    setIsPlaying(true);
    setPipelineStep(0);
    let curr = 0;
    const interval = setInterval(() => {
      curr += 1;
      if (curr >= stages.length) {
        clearInterval(interval);
        setIsPlaying(false);
      } else {
        setPipelineStep(curr);
      }
    }, 1200);
  };

  return (
    <div id="deployment-pipeline-visualizer" className="panel-surface min-w-0 overflow-hidden p-5 sm:p-6 space-y-6">
      {/* Header & Concept Standard Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-app-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
              CONCEPT: PRODUCTION CI/CD &amp; TRACEABILITY
            </span>
            <span className="font-mono text-xs text-app-subtle">Ch 10 Capstone Architecture</span>
          </div>
          <h3 className="text-lg font-bold text-app-ink flex items-center gap-2 mt-1">
            <Cloud className="w-5 h-5 text-emerald-400" />
            Production Cloud Deployment &amp; Curriculum Traceability Matrix
          </h3>
          <p className="text-xs text-app-muted">
            Step through the deployment lifecycle from git push to live URL, and trace all applied curriculum concepts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={triggerPlay}
            disabled={isPlaying}
            className="text-xs px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Simulate Deploy</span>
          </button>
          <button
            type="button"
            onClick={() => setPipelineStep(0)}
            className="text-xs px-2.5 py-1.5 rounded-md border border-app-border bg-app-inset text-app-muted hover:text-app-ink flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Deployment Pipeline Stepper */}
      <div className="rounded-xl border border-app-border bg-app-inset p-4 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-app-ink font-bold flex items-center gap-1.5">
            <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
            CI/CD Cloud Deployment Pipeline Stages
          </span>
          <span className="text-emerald-400 font-bold text-[11px]">
            Stage {pipelineStep + 1} of 5: {stages[pipelineStep].status}
          </span>
        </div>

        {/* 5 Pipeline Stages Visual Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 font-mono text-xs">
          {stages.map((st, idx) => {
            const isCurrent = pipelineStep === idx;
            const isCompleted = pipelineStep > idx;
            return (
              <div
                key={st.id}
                onClick={() => setPipelineStep(idx)}
                className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                  isCurrent
                    ? 'border-emerald-400 bg-emerald-500/15 text-app-ink ring-1 ring-emerald-400'
                    : isCompleted
                    ? 'border-emerald-500/40 bg-emerald-500/5 text-app-muted'
                    : 'border-app-border bg-app-surface text-app-subtle hover:text-app-muted'
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-cyan-400">{st.badge}</span>
                  {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                  {isCurrent && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
                </div>
                <div className="font-bold text-[11px] mt-1 text-app-ink">{st.title}</div>
                <div className="text-[10px] text-app-subtle mt-0.5">{st.status}</div>
              </div>
            );
          })}
        </div>

        {/* Terminal Log Output for Active Pipeline Stage */}
        <div className="rounded-lg border border-slate-800 bg-[#0a0c12] p-3 font-mono text-xs text-slate-300 space-y-1">
          <div className="text-[10px] text-slate-500 flex items-center justify-between">
            <span>Terminal Output: {stages[pipelineStep].title}</span>
            <span>https://webzonebw.in/er/index.html</span>
          </div>
          <pre className="text-emerald-400 text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed">
            {stages[pipelineStep].terminal}
          </pre>
        </div>
      </div>

      {/* Capstone Concept Traceability Matrix: Tracing Capstone Back to Chapters 0-9 */}
      <div className="rounded-xl border border-indigo-500/30 bg-app-surface p-5 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-app-border pb-3">
          <div>
            <span className="rounded-md bg-indigo-500/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-indigo-400">
              CURRICULUM TRACEABILITY MATRIX
            </span>
            <h4 className="text-base font-black text-app-ink flex items-center gap-2 mt-1">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              How the Final Capstone Synthesizes Every Prior Chapter
            </h4>
          </div>
          <span className="text-xs font-mono text-app-muted">
            Click any chapter below to view applied code
          </span>
        </div>

        {/* Horizontal Chapter Track */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
          {traceConcepts.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedTraceConcept(idx)}
              className={`p-2 rounded-lg border text-left font-mono cursor-pointer transition-all ${
                selectedTraceConcept === idx
                  ? 'border-indigo-400 bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400'
                  : 'border-app-border bg-app-inset text-app-muted hover:border-app-border hover:text-app-ink'
              }`}
            >
              <div className="text-[10px] font-bold">{item.ch}</div>
              <div className="text-[9px] truncate opacity-75">{item.role}</div>
            </button>
          ))}
        </div>

        {/* Detail for Selected Trace Concept */}
        <div className="rounded-xl border border-app-border bg-app-inset p-4 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-indigo-400">
                {traceConcepts[selectedTraceConcept].ch}: {traceConcepts[selectedTraceConcept].name}
              </span>
            </div>
            <div className="text-xs text-app-ink font-bold">
              Applied Purpose in Portfolio:
            </div>
            <p className="text-xs text-app-muted leading-relaxed">
              {traceConcepts[selectedTraceConcept].appliedIn}
            </p>
          </div>

          <div className="md:col-span-6 rounded-lg border border-slate-800 bg-[#0f1117] p-3 font-mono text-xs text-slate-300 space-y-1">
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <FileCode2 className="w-3 h-3 text-cyan-400" />
              Applied Code Implementation
            </div>
            <pre className="text-amber-300 text-xs overflow-x-auto leading-relaxed pt-1">
              <code>{traceConcepts[selectedTraceConcept].code}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Live Destination Card */}
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold text-app-ink">
              Official Production Destination:
            </span>
          </div>
          <div className="font-mono text-sm font-bold text-emerald-400">
            https://webzonebw.in/er/index.html
          </div>
        </div>

        <a
          href="https://webzonebw.in/er/index.html"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all"
        >
          <span>Open Live Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Concept Check / Reasoning Callout */}
      <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-app-ink flex items-start gap-3">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-app-ink font-bold block mb-0.5">
            Key Mental Model · The Full Engineering Lifecycle:
          </strong>
          <p className="text-app-muted leading-relaxed">
            Every professional web application is the cumulative sum of its architectural layers: semantic HTML content, calibrated CSS box geometry, responsive breakpoint reflow, state-driven JavaScript, and reliable Git deployment. When you publish to the cloud, all these layers coordinate to serve users worldwide.
          </p>
        </div>
      </div>
    </div>
  );
};
