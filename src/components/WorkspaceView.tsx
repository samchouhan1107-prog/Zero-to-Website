import React, { useState, useEffect, useRef } from "react";
import {
  Code2,
  Play,
  RotateCcw,
  Download,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Terminal,
  ShieldCheck,
  FileText,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Laptop,
  CheckCircle2,
  Layers,
  HelpCircle,
} from "lucide-react";
import { UserProgress } from "../utils/types";

interface WorkspaceViewProps {
  progress?: UserProgress;
  onOpenTutor?: () => void;
  onNavigateHome?: () => void;
}

const TEMPLATES = [
  {
    id: "starter-component",
    title: "Interactive Card & UI State",
    desc: "Modern CSS glass card with interactive button and dynamic counter state.",
    html: `<div class="card">
  <div class="badge">WebZoneBW Workspace</div>
  <h2>Interactive Developer Studio</h2>
  <p>Modify HTML, CSS, and JS live. Everything compiles client-side in memory.</p>
  <div class="metrics-row">
    <div class="metric">
      <span class="val" id="click-count">0</span>
      <span class="lbl">Clicks Recorded</span>
    </div>
    <div class="metric">
      <span class="val" id="active-state">Ready</span>
      <span class="lbl">Engine Status</span>
    </div>
  </div>
  <button id="action-btn" class="btn">
    <span>Trigger Event</span>
    <span class="arrow">â†’</span>
  </button>
</div>`,
    css: `body {
  margin: 0;
  padding: 2rem;
  background: #0f172a;
  color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}
.card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 16px;
  max-width: 440px;
  width: 100%;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.card:hover {
  transform: translateY(-2px);
  border-color: rgba(59, 130, 246, 0.4);
}
.badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.1);
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  margin-bottom: 1rem;
}
h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}
p {
  color: #94a3b8;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}
.metrics-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.metric {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0.75rem;
  border-radius: 10px;
  text-align: center;
}
.metric .val {
  display: block;
  font-size: 1.25rem;
  font-weight: 800;
  color: #38bdf8;
}
.metric .lbl {
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
}
.btn {
  width: 100%;
  padding: 0.85rem;
  border: none;
  background: #2563eb;
  color: white;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}
.btn:hover {
  background: #1d4ed8;
  box-shadow: 0 8px 20px -4px rgba(37, 99, 235, 0.5);
}
.btn .arrow {
  transition: transform 0.2s ease;
}
.btn:hover .arrow {
  transform: translateX(4px);
}`,
    js: `let count = 0;
const countEl = document.getElementById('click-count');
const statusEl = document.getElementById('active-state');
const btn = document.getElementById('action-btn');

btn.addEventListener('click', () => {
  count++;
  countEl.textContent = count;
  statusEl.textContent = 'Active #' + count;
  statusEl.style.color = '#10b981';
  console.log('Workspace event triggered. Iteration:', count);
});`,
  },
  {
    id: "flex-grid-layout",
    title: "CSS Responsive Grid & Flexbox",
    desc: "Fluid responsive layout using CSS auto-fit Grid with flexbox sub-elements.",
    html: `<div class="container">
  <header class="header">
    <div class="logo">âš¡ LayoutMatrix</div>
    <nav class="nav">
      <a href="#flex">Flexbox</a>
      <a href="#grid">Grid</a>
      <a href="#units">Units</a>
    </nav>
  </header>
  
  <div class="grid-layout">
    <div class="card card-hero">
      <h3>Auto-Fit Responsive Grid</h3>
      <p>Resize the preview panel to observe seamless column recalculation without media queries.</p>
    </div>
    <div class="card">
      <h4>Flexbox 1D Axis</h4>
      <p>Optimal for distribution along a single direction.</p>
    </div>
    <div class="card">
      <h4>Grid 2D Coordinate</h4>
      <p>Handles simultaneous row and column placement.</p>
    </div>
    <div class="card">
      <h4>Aspect Ratio Control</h4>
      <p>Consistent visual container proportions.</p>
    </div>
  </div>
</div>`,
    css: `body {
  margin: 0;
  padding: 1.5rem;
  background: #090d16;
  color: #f1f5f9;
  font-family: sans-serif;
}
.container {
  max-width: 800px;
  margin: 0 auto;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #1e293b;
  margin-bottom: 1.5rem;
}
.logo {
  font-weight: 800;
  font-size: 1.1rem;
  color: #38bdf8;
}
.nav {
  display: flex;
  gap: 1rem;
}
.nav a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.85rem;
}
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
.card {
  background: #111827;
  border: 1px solid #1f2937;
  padding: 1.25rem;
  border-radius: 12px;
}
.card-hero {
  grid-column: 1 / -1;
  background: linear-gradient(135deg, #1e1b4b, #0f172a);
  border-color: #3730a3;
}
h3, h4 {
  margin: 0 0 0.5rem 0;
}
p {
  color: #94a3b8;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
}`,
    js: `console.log('Responsive Grid & Flexbox template ready.');`,
  },
  {
    id: "api-simulator",
    title: "Mock API & Dynamic DOM Fetcher",
    desc: "Simulate asynchronous network requests, loading states, and dynamic DOM injection.",
    html: `<div class="api-console">
  <div class="toolbar">
    <button id="fetch-btn" class="fetch-btn">Simulate API Request</button>
    <span id="req-status" class="status">Idle</span>
  </div>
  <div id="results-list" class="list">
    <div class="empty">Click above to request mock developer data.</div>
  </div>
</div>`,
    css: `body {
  margin: 0;
  padding: 1.5rem;
  background: #0a0a0c;
  color: #ededed;
  font-family: monospace;
}
.api-console {
  max-width: 600px;
  margin: 0 auto;
}
.toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.fetch-btn {
  background: #0284c7;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-family: inherit;
  font-weight: bold;
  cursor: pointer;
}
.fetch-btn:hover { background: #0369a1; }
.status { font-size: 0.8rem; color: #94a3b8; }
.list {
  background: #141419;
  border: 1px solid #27272a;
  border-radius: 8px;
  padding: 1rem;
  min-height: 160px;
}
.item {
  padding: 0.6rem;
  border-bottom: 1px solid #27272a;
  display: flex;
  justify-content: space-between;
}
.item:last-child { border-bottom: none; }
.item-title { color: #38bdf8; }
.item-tag { color: #a1a1aa; font-size: 0.8rem; }
.empty { color: #52525b; text-align: center; padding: 2rem 0; }`,
    js: `const fetchBtn = document.getElementById('fetch-btn');
const statusEl = document.getElementById('req-status');
const listEl = document.getElementById('results-list');

const MOCK_DATA = [
  { title: 'DNS Resolution Protocol', tag: 'Web Architecture' },
  { title: 'CSS Box Model Margin Collapse', tag: 'Layout Engine' },
  { title: 'Event Loop Microtask Queue', tag: 'JavaScript Engine' },
  { title: 'Content Security Policy (CSP)', tag: 'Security Headers' }
];

fetchBtn.addEventListener('click', async () => {
  statusEl.textContent = 'Fetching payload... (300ms)';
  statusEl.style.color = '#eab308';
  
  await new Promise(r => setTimeout(r, 300));
  
  listEl.innerHTML = '';
  MOCK_DATA.forEach(item => {
    const row = document.createElement('div');
    row.className = 'item';
    row.innerHTML = '<span class="item-title">' + item.title + '</span><span class="item-tag">' + item.tag + '</span>';
    listEl.appendChild(row);
  });
  
  statusEl.textContent = '200 OK (Loaded 4 items)';
  statusEl.style.color = '#22c55e';
  console.log('Mock fetch resolved with 4 architecture items');
});`,
  },
];

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({
  progress,
  onOpenTutor,
  onNavigateHome,
}) => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<string>("starter-component");
  const [htmlCode, setHtmlCode] = useState<string>(TEMPLATES[0].html);
  const [cssCode, setCssCode] = useState<string>(TEMPLATES[0].css);
  const [jsCode, setJsCode] = useState<string>(TEMPLATES[0].js);
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  const [consoleLogs, setConsoleLogs] = useState<
    Array<{ type: string; message: string; time: string }>
  >([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [scratchpadNote, setScratchpadNote] = useState<string>(() => {
    try {
      return (
        localStorage.getItem("webzonebw_workspace_scratchpad") ||
        "### Architectural Notes & Experiment Log\n- Test CSS Grid with auto-fit and minmax\n- Compare microtasks vs macrotasks in the event loop\n- Everything here saves locally on your device with 100% privacy"
      );
    } catch {
      return "";
    }
  });
  const [scratchpadSaved, setScratchpadSaved] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Save scratchpad
  const handleSaveScratchpad = (val: string) => {
    setScratchpadNote(val);
    try {
      localStorage.setItem("webzonebw_workspace_scratchpad", val);
      setScratchpadSaved(true);
      setTimeout(() => setScratchpadSaved(false), 2000);
    } catch {}
  };

  // Switch template
  const handleSelectTemplate = (templateId: string) => {
    const t = TEMPLATES.find((item) => item.id === templateId);
    if (!t) return;
    setSelectedTemplate(templateId);
    setHtmlCode(t.html);
    setCssCode(t.css);
    setJsCode(t.js);
    setConsoleLogs([]);
  };

  // Compile bundle
  const generateBundle = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    ${cssCode}
  </style>
  <script>
    (function() {
      const origLog = console.log;
      const origWarn = console.warn;
      const origError = console.error;
      window.addEventListener('error', function(e) {
        window.parent.postMessage({ type: 'error', message: e.message }, '*');
      });
      console.log = function(...args) {
        origLog.apply(console, args);
        window.parent.postMessage({ type: 'log', message: args.join(' ') }, '*');
      };
      console.warn = function(...args) {
        origWarn.apply(console, args);
        window.parent.postMessage({ type: 'warn', message: args.join(' ') }, '*');
      };
      console.error = function(...args) {
        origError.apply(console, args);
        window.parent.postMessage({ type: 'error', message: args.join(' ') }, '*');
      };
    })();
  </script>
</head>
<body>
  ${htmlCode}
  <script>
    try {
      ${jsCode}
    } catch (err) {
      console.error(err.message);
    }
  </script>
</body>
</html>`;
  };

  // Listen to iframe postMessages
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (
        e.data &&
        (e.data.type === "log" ||
          e.data.type === "warn" ||
          e.data.type === "error")
      ) {
        const time = new Date().toLocaleTimeString();
        setConsoleLogs((prev) => [
          ...prev.slice(-40),
          { type: e.data.type, message: String(e.data.message), time },
        ]);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Update preview
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = generateBundle();
    }
  }, [htmlCode, cssCode, jsCode]);

  const handleCopyCode = () => {
    let text = htmlCode;
    if (activeTab === "css") text = cssCode;
    if (activeTab === "js") text = jsCode;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadProject = () => {
    const blob = new Blob([generateBundle()], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedTemplate}-workspace.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 space-y-6 transition-all`}
    >
      {/* 1. Header & Platform Independence Trust Banner */}
      <section className="rounded-2xl border border-app-border bg-app-surface/90 p-5 sm:p-6 shadow-sm backdrop-blur-md relative overflow-hidden">
        {/* Subtle accent glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5 min-w-0 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 font-mono text-xs font-semibold text-blue-500 dark:text-blue-400">
                <Laptop className="h-3.5 w-3.5" />
                <span>Developer Workspace &amp; REPL</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-3 w-3" />
                <span>100% Client-Side Private Â· Zero Tracking Lock-In</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-app-ink tracking-tight leading-tight">
              Interactive Web Workspace
            </h1>
            <p className="text-sm sm:text-base text-app-muted leading-relaxed max-w-2xl">
              Write, inspect, and test modern HTML, CSS, and JavaScript in an
              isolated browser sandbox. Your code runs strictly in memory on
              your device with full export freedom.
            </p>
          </div>

          {/* Quick Actions with Arrow Rollover Effects */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleDownloadProject}
              className="group inline-flex items-center gap-2 rounded-xl border border-app-border bg-app-inset px-4 py-2.5 text-xs font-bold text-app-ink transition-all hover:border-blue-500/50 hover:bg-app-active cursor-pointer"
              title="Download standalone HTML file"
            >
              <Download className="h-4 w-4 text-blue-500 transition-transform duration-200 group-hover:-translate-y-0.5" />
              <span>Export HTML</span>
            </button>

            {onOpenTutor && (
              <button
                type="button"
                onClick={onOpenTutor}
                className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-blue-500 shadow-sm cursor-pointer"
              >
                <Sparkles className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />
                <span>Ask AI Assistant</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </div>

        {/* Template Switcher Pills with Arrow Indicator */}
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-app-border pt-4">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-app-subtle mr-1">
            Starter Blueprints:
          </span>
          {TEMPLATES.map((tmpl) => {
            const isSelected = selectedTemplate === tmpl.id;
            return (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => handleSelectTemplate(tmpl.id)}
                className={`group inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "border border-blue-500 bg-blue-500/15 text-blue-500 dark:text-blue-400 shadow-xs"
                    : "border border-app-border bg-app-inset text-app-muted hover:border-app-muted hover:text-app-ink"
                }`}
              >
                <span>{tmpl.title}</span>
                <span className="text-[10px] opacity-60 transition-transform duration-200 group-hover:translate-x-0.5">
                  â†’
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Main Multi-Pane Workspace Layout */}
      <div
        className={`grid gap-6 ${isFullscreen ? "fixed inset-4 z-50 bg-app-canvas overflow-y-auto" : "lg:grid-cols-12"}`}
      >
        {/* Left Side: Code Editor (7 cols) */}
        <div
          className={`space-y-4 ${isFullscreen ? "lg:col-span-6" : "lg:col-span-7"}`}
        >
          <div className="rounded-2xl border border-app-border bg-app-surface overflow-hidden shadow-sm flex flex-col h-[560px]">
            {/* Editor Tab Bar */}
            <div className="flex items-center justify-between border-b border-app-border bg-app-inset px-3 py-2 shrink-0">
              <div className="flex items-center gap-1.5">
                {(["html", "css", "js"] as const).map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`group relative rounded-lg px-3.5 py-1.5 font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                        isActive
                          ? "bg-app-surface text-app-ink shadow-xs border border-app-border"
                          : "text-app-muted hover:text-app-ink hover:bg-app-surface/50"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            tab === "html"
                              ? "bg-orange-500"
                              : tab === "css"
                                ? "bg-blue-500"
                                : "bg-amber-400"
                          }`}
                        />
                        <span>{tab}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Editor Actions */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 rounded-lg border border-app-border bg-app-surface px-2.5 py-1 font-mono text-[11px] text-app-muted hover:text-app-ink transition-colors cursor-pointer"
                  title="Copy snippet"
                >
                  {copied ? (
                    <Check className="h-3 w-3 text-emerald-400" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectTemplate(selectedTemplate)}
                  className="flex items-center gap-1 rounded-lg border border-app-border bg-app-surface px-2.5 py-1 font-mono text-[11px] text-app-muted hover:text-app-ink transition-colors cursor-pointer"
                  title="Reset code"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Code Input Area */}
            <div className="flex-1 relative font-mono text-xs sm:text-sm bg-app-inset/80 p-0">
              {activeTab === "html" && (
                <textarea
                  value={htmlCode}
                  onChange={(e) => setHtmlCode(e.target.value)}
                  className="w-full h-full resize-none bg-transparent p-4 font-mono text-app-ink focus:outline-none leading-relaxed selection:bg-blue-500/30"
                  spellCheck={false}
                  placeholder="<!-- Enter HTML markup -->"
                />
              )}
              {activeTab === "css" && (
                <textarea
                  value={cssCode}
                  onChange={(e) => setCssCode(e.target.value)}
                  className="w-full h-full resize-none bg-transparent p-4 font-mono text-app-ink focus:outline-none leading-relaxed selection:bg-blue-500/30"
                  spellCheck={false}
                  placeholder="/* Enter CSS styles */"
                />
              )}
              {activeTab === "js" && (
                <textarea
                  value={jsCode}
                  onChange={(e) => setJsCode(e.target.value)}
                  className="w-full h-full resize-none bg-transparent p-4 font-mono text-app-ink focus:outline-none leading-relaxed selection:bg-blue-500/30"
                  spellCheck={false}
                  placeholder="// Enter JavaScript logic"
                />
              )}
            </div>

            {/* Editor Footer Status */}
            <div className="flex items-center justify-between border-t border-app-border bg-app-inset px-3 py-1.5 font-mono text-[11px] text-app-subtle shrink-0">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Browser Sandbox Ready</span>
              </span>
              <span>UTF-8 Â· Client-Side Memory</span>
            </div>
          </div>
        </div>

        {/* Right Side: Live Isolated Preview & Console (5 cols) */}
        <div
          className={`space-y-4 ${isFullscreen ? "lg:col-span-6" : "lg:col-span-5"}`}
        >
          <div className="rounded-2xl border border-app-border bg-app-surface overflow-hidden shadow-sm flex flex-col h-[560px]">
            {/* Preview Toolbar */}
            <div className="flex items-center justify-between border-b border-app-border bg-app-inset px-3 py-2 shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-xs font-bold text-app-muted ml-1">
                  Preview Stage
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1 rounded-lg border border-app-border bg-app-surface text-app-muted hover:text-app-ink transition-colors cursor-pointer"
                  title={isFullscreen ? "Exit full screen" : "Expand workspace"}
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-3.5 w-3.5" />
                  ) : (
                    <Maximize2 className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Live iframe render */}
            <div className="flex-1 bg-slate-950 relative overflow-hidden">
              <iframe
                ref={iframeRef}
                title="Live Workspace Output"
                sandbox="allow-scripts allow-modals allow-same-origin"
                className="w-full h-full border-none bg-white dark:bg-slate-950"
              />
            </div>

            {/* Console Output Drawer */}
            <div className="h-36 border-t border-app-border bg-app-inset flex flex-col shrink-0">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-app-border bg-app-surface/60">
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase text-app-muted">
                  <Terminal className="h-3 w-3 text-cyan-400" />
                  <span>Sandbox Console ({consoleLogs.length})</span>
                </div>
                <button
                  type="button"
                  onClick={() => setConsoleLogs([])}
                  className="font-mono text-[10px] text-app-subtle hover:text-app-ink"
                >
                  Clear
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-2 font-mono text-xs space-y-1 scrollbar-thin">
                {consoleLogs.length === 0 ? (
                  <p className="text-[11px] text-app-subtle italic">
                    No log output yet. Call console.log() in JavaScript to
                    inspect values.
                  </p>
                ) : (
                  consoleLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-2 text-[11px] leading-tight ${
                        log.type === "error"
                          ? "text-rose-400"
                          : log.type === "warn"
                            ? "text-amber-400"
                            : "text-app-ink"
                      }`}
                    >
                      <span className="text-app-subtle text-[10px] shrink-0">
                        [{log.time}]
                      </span>
                      <span className="break-all">{log.message}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Developer Scratchpad & Architecture Notes Area */}
      <section className="rounded-2xl border border-app-border bg-app-surface p-5 sm:p-6 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
              <FileText className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-app-ink">
                Developer Scratchpad &amp; Local Notes
              </h2>
              <p className="text-xs text-app-muted">
                Persistent local notes. Autosaves to your browser's private
                storage.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-app-subtle">
            {scratchpadSaved && (
              <span className="inline-flex items-center gap-1 text-emerald-500 font-bold">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Saved Locally</span>
              </span>
            )}
            <span>100% Offline &amp; Private</span>
          </div>
        </div>

        <textarea
          value={scratchpadNote}
          onChange={(e) => handleSaveScratchpad(e.target.value)}
          rows={5}
          placeholder="Jot down architectural questions, code snippets to remember, or next steps..."
          className="w-full rounded-xl border border-app-border bg-app-inset p-3.5 font-mono text-xs sm:text-sm text-app-ink placeholder:text-app-subtle focus:border-blue-500 focus:outline-none leading-relaxed"
        />
      </section>
    </div>
  );
};
