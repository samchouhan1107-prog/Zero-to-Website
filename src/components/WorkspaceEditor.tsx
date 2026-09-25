import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
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
  Sparkles,
  Columns,
  Rows,
  Laptop,
  Tablet,
  Smartphone,
  Wand2,
  Trash2,
  Send,
  AlertTriangle,
  RefreshCw,
  Sliders,
  ChevronDown,
} from "lucide-react";

export interface CodeTemplate {
  id: string;
  title: string;
  desc: string;
  category?: string;
  html: string;
  css: string;
  js: string;
}

export const WORKSPACE_TEMPLATES: CodeTemplate[] = [
  {
    id: "starter-component",
    title: "Interactive Glass Card & State",
    category: "Components",
    desc: "Modern CSS glass card with interactive button, event listeners, and live state.",
    html: `<div class="card">
  <div class="badge">WebZoneBW Workspace</div>
  <h2>Interactive Developer Studio</h2>
  <p>Modify HTML, CSS, and JS in real-time. Every change renders instantly in the preview stage.</p>
  
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

  <div class="btn-group">
    <button id="action-btn" class="btn primary">
      <span>Trigger Event</span>
      <span class="arrow">&rarr;</span>
    </button>
    <button id="reset-btn" class="btn secondary">
      <span>Reset</span>
    </button>
  </div>
</div>`,
    css: `body {
  margin: 0;
  padding: 2rem;
  background: #090d16;
  color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

.card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 2rem;
  border-radius: 16px;
  max-width: 440px;
  width: 100%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
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
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.25);
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

.btn-group {
  display: flex;
  gap: 0.75rem;
}

.btn {
  flex: 1;
  padding: 0.85rem;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.btn.primary {
  background: #2563eb;
  color: white;
}

.btn.primary:hover {
  background: #1d4ed8;
  box-shadow: 0 8px 20px -4px rgba(37, 99, 235, 0.5);
}

.btn.secondary {
  background: rgba(255, 255, 255, 0.08);
  color: #cbd5e1;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn.secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  color: white;
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
const actionBtn = document.getElementById('action-btn');
const resetBtn = document.getElementById('reset-btn');

actionBtn.addEventListener('click', () => {
  count++;
  countEl.textContent = count;
  statusEl.textContent = 'Active #' + count;
  statusEl.style.color = '#10b981';
  console.log('Real-time workspace event fired! Iteration:', count);
});

resetBtn.addEventListener('click', () => {
  count = 0;
  countEl.textContent = count;
  statusEl.textContent = 'Ready';
  statusEl.style.color = '#38bdf8';
  console.warn('Workspace state reset to 0');
});

console.log('Interactive Glass Card mounted & ready in sandbox.');`,
  },
  {
    id: "flex-grid-layout",
    title: "Responsive CSS Auto-Fit Grid",
    category: "Layouts",
    desc: "Fluid auto-fit CSS grid layout with dynamic media card components.",
    html: `<div class="container">
  <header class="header">
    <div class="logo">&starf; ModernGrid Studio</div>
    <div class="tagline">Auto-Fit Columns Without Media Queries</div>
  </header>
  
  <div class="grid-layout">
    <div class="card card-hero">
      <span class="badge">CSS Grid 2D</span>
      <h3>Intrinsic Responsive Layout</h3>
      <p>Resize your browser or change viewport modes above to watch columns reflow fluidly.</p>
    </div>
    
    <div class="card">
      <h4>repeat(auto-fit, minmax(220px, 1fr))</h4>
      <p>Automatically wraps into columns as space permits.</p>
    </div>
    
    <div class="card">
      <h4>Gap Geometry</h4>
      <p>Clean spacing without margin hacks or negative margins.</p>
    </div>

    <div class="card">
      <h4>Flexbox Internal</h4>
      <p>Micro-alignments inside grid cells for perfect symmetry.</p>
    </div>
  </div>
</div>`,
    css: `body {
  margin: 0;
  padding: 1.5rem;
  background: #090d16;
  color: #f1f5f9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #1e293b;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.logo {
  font-weight: 800;
  font-size: 1.2rem;
  color: #38bdf8;
}

.tagline {
  color: #64748b;
  font-size: 0.85rem;
  font-family: monospace;
}

.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}

.card {
  background: #0f172a;
  border: 1px solid #1e293b;
  padding: 1.5rem;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.card:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
}

.card-hero {
  grid-column: 1 / -1;
  background: linear-gradient(135deg, #1e1b4b, #0f172a);
  border-color: #3730a3;
}

.badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #a855f7;
  margin-bottom: 0.5rem;
}

h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
}

h4 {
  margin: 0 0 0.5rem 0;
  color: #38bdf8;
  font-family: monospace;
  font-size: 0.95rem;
}

p {
  color: #94a3b8;
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
}`,
    js: `console.log('CSS Auto-Fit Grid initialized.');
console.log('Try resizing the preview frame to observe fluid column reflow!');`,
  },
  {
    id: "canvas-particle-animation",
    title: "HTML5 Canvas Interactive Motion",
    category: "Canvas & Graphics",
    desc: "High-performance 60FPS particle physics system rendered on HTML5 Canvas.",
    html: `<div class="canvas-wrap">
  <div class="overlay">
    <h2>HTML5 Canvas Particles</h2>
    <p>Move your cursor across the stage to interact with particles.</p>
  </div>
  <canvas id="stage"></canvas>
</div>`,
    css: `body {
  margin: 0;
  padding: 0;
  background: #050508;
  color: white;
  font-family: sans-serif;
  overflow: hidden;
}

.canvas-wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.overlay {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  pointer-events: none;
  z-index: 10;
}

.overlay h2 {
  margin: 0 0 0.25rem 0;
  font-size: 1.25rem;
  color: #38bdf8;
}

.overlay p {
  margin: 0;
  font-size: 0.85rem;
  color: #94a3b8;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}`,
    js: `const canvas = document.getElementById('stage');
const ctx = canvas.getContext('2d');

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

const particles = [];
const PARTICLE_COUNT = 60;

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    this.radius = Math.random() * 2.5 + 1;
    this.color = Math.random() > 0.5 ? '#38bdf8' : '#818cf8';
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  
  // Draw connecting lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 110) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = \`rgba(56, 189, 248, \${1 - dist / 110 * 0.8})\`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

animate();
console.log('HTML5 Canvas animation loop active at 60 FPS');`,
  },
  {
    id: "api-simulator",
    title: "Mock REST API & Dynamic DOM Fetcher",
    category: "JavaScript",
    desc: "Asynchronous network requests, loading states, and dynamic DOM injection.",
    html: `<div class="api-console">
  <div class="toolbar">
    <button id="fetch-btn" class="fetch-btn">
      <span class="icon">&uArr;</span> Fetch Web Architecture Data
    </button>
    <span id="req-status" class="status">Idle</span>
  </div>
  
  <div id="results-list" class="list">
    <div class="empty">Click "Fetch Web Architecture Data" to simulate asynchronous network request.</div>
  </div>
</div>`,
    css: `body {
  margin: 0;
  padding: 1.5rem;
  background: #090d16;
  color: #ededed;
  font-family: monospace;
}

.api-console {
  max-width: 640px;
  margin: 0 auto;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.fetch-btn {
  background: #0284c7;
  color: white;
  border: none;
  padding: 0.65rem 1.2rem;
  border-radius: 8px;
  font-family: inherit;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.fetch-btn:hover {
  background: #0369a1;
  transform: translateY(-1px);
}

.status {
  font-size: 0.85rem;
  color: #94a3b8;
}

.list {
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 10px;
  padding: 1rem;
  min-height: 180px;
}

.item {
  padding: 0.75rem;
  border-bottom: 1px solid #1e293b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: fadeIn 0.25s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.item:last-child {
  border-bottom: none;
}

.item-title {
  color: #38bdf8;
  font-weight: 600;
}

.item-tag {
  color: #a1a1aa;
  font-size: 0.75rem;
  background: #1e293b;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.empty {
  color: #64748b;
  text-align: center;
  padding: 3rem 1rem;
}`,
    js: `const fetchBtn = document.getElementById('fetch-btn');
const statusEl = document.getElementById('req-status');
const listEl = document.getElementById('results-list');

const MOCK_DATA = [
  { title: 'DNS Resolution Protocol', tag: 'Web Architecture' },
  { title: 'CSS Box Model Margin Collapse', tag: 'Layout Engine' },
  { title: 'Event Loop Microtask Queue', tag: 'JavaScript Engine' },
  { title: 'Content Security Policy (CSP)', tag: 'Security Headers' },
  { title: 'IndexedDB Offline Storage', tag: 'Browser Persistence' }
];

fetchBtn.addEventListener('click', async () => {
  statusEl.textContent = 'Simulating HTTP GET /api/v1/specs...';
  statusEl.style.color = '#eab308';
  fetchBtn.disabled = true;
  
  await new Promise(r => setTimeout(r, 400));
  
  listEl.innerHTML = '';
  MOCK_DATA.forEach((item, idx) => {
    const row = document.createElement('div');
    row.className = 'item';
    row.innerHTML = '<span class="item-title">' + (idx + 1) + '. ' + item.title + '</span><span class="item-tag">' + item.tag + '</span>';
    listEl.appendChild(row);
  });
  
  statusEl.textContent = '200 OK (5 items returned)';
  statusEl.style.color = '#22c55e';
  fetchBtn.disabled = false;
  console.log('HTTP 200 OK: payload rendered into DOM successfully.');
});

console.log('REST API simulator ready.');`,
  },
  {
    id: "clean-slate",
    title: "Blank Slate (Clean Canvas)",
    category: "Minimal",
    desc: "Start with an empty sandbox canvas to code freely from scratch.",
    html: `<!DOCTYPE html>
<div class="sandbox-root">
  <h1>Hello, Web Developer!</h1>
  <p>Start writing HTML, styling with CSS, and animating with JavaScript.</p>
</div>`,
    css: `body {
  margin: 0;
  padding: 2rem;
  background: #0f172a;
  color: #f8fafc;
  font-family: system-ui, -apple-system, sans-serif;
}

.sandbox-root {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding-top: 4rem;
}

h1 {
  color: #38bdf8;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

p {
  color: #94a3b8;
  font-size: 1.1rem;
}`,
    js: `console.log('Blank canvas initialized.');`,
  },
];

interface QuickSnippet {
  name: string;
  lang: "html" | "css" | "js";
  snippet: string;
}

const QUICK_SNIPPETS: QuickSnippet[] = [
  {
    name: "Flex Center (CSS)",
    lang: "css",
    snippet: `display: flex;\nalign-items: center;\njustify-content: center;`,
  },
  {
    name: "Grid 3-Column (CSS)",
    lang: "css",
    snippet: `display: grid;\ngrid-template-columns: repeat(3, 1fr);\ngap: 1rem;`,
  },
  {
    name: "Glassmorphism Card (CSS)",
    lang: "css",
    snippet: `background: rgba(30, 41, 59, 0.7);\nbackdrop-filter: blur(12px);\nborder: 1px solid rgba(255, 255, 255, 0.1);\nborder-radius: 14px;\npadding: 1.5rem;`,
  },
  {
    name: "Primary Button (HTML)",
    lang: "html",
    snippet: `<button class="btn btn-primary" onclick="alert('Clicked!')">\n  <span>Click Me</span>\n</button>`,
  },
  {
    name: "Input & Label Group (HTML)",
    lang: "html",
    snippet: `<div class="form-group">\n  <label for="user-input">Your Input</label>\n  <input type="text" id="user-input" placeholder="Type here..." />\n</div>`,
  },
  {
    name: "Event Listener (JS)",
    lang: "js",
    snippet: `document.getElementById('my-btn').addEventListener('click', (e) => {\n  console.log('Clicked element:', e.target);\n});`,
  },
  {
    name: "Async Fetch Template (JS)",
    lang: "js",
    snippet: `async function loadData() {\n  try {\n    console.log('Fetching...');\n    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');\n    const data = await res.json();\n    console.log('Received:', data);\n  } catch (err) {\n    console.error('Fetch failed:', err);\n  }\n}\nloadData();`,
  },
];

interface WorkspaceEditorProps {
  initialTemplateId?: string;
  onOpenTutor?: () => void;
}

export const WorkspaceEditor: React.FC<WorkspaceEditorProps> = ({
  initialTemplateId = "starter-component",
  onOpenTutor,
}) => {
  // State for code
  const [selectedTemplateId, setSelectedTemplateId] =
    useState<string>(initialTemplateId);
  const [htmlCode, setHtmlCode] = useState<string>(() => {
    const t = WORKSPACE_TEMPLATES.find((item) => item.id === initialTemplateId);
    return t ? t.html : WORKSPACE_TEMPLATES[0].html;
  });
  const [cssCode, setCssCode] = useState<string>(() => {
    const t = WORKSPACE_TEMPLATES.find((item) => item.id === initialTemplateId);
    return t ? t.css : WORKSPACE_TEMPLATES[0].css;
  });
  const [jsCode, setJsCode] = useState<string>(() => {
    const t = WORKSPACE_TEMPLATES.find((item) => item.id === initialTemplateId);
    return t ? t.js : WORKSPACE_TEMPLATES[0].js;
  });

  // UI modes
  const [activeCodeTab, setActiveCodeTab] = useState<"html" | "css" | "js">(
    "html"
  );
  const [splitOrientation, setSplitOrientation] = useState<
    "horizontal" | "vertical" | "tri-pane"
  >("horizontal");
  const [viewportMode, setViewportMode] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [autoRun, setAutoRun] = useState<boolean>(true);
  const [lastRenderTime, setLastRenderTime] = useState<string>("Ready");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [syntaxError, setSyntaxError] = useState<string | null>(null);

  // Snippets menu
  const [snippetsOpen, setSnippetsOpen] = useState(false);
  const snippetsRef = useRef<HTMLDivElement>(null);

  // Template dropdown menu
  const [templatesDropdownOpen, setTemplatesDropdownOpen] = useState(false);
  const templatesRef = useRef<HTMLDivElement>(null);

  // Console
  const [consoleLogs, setConsoleLogs] = useState<
    Array<{ type: "log" | "warn" | "error"; message: string; time: string }>
  >([]);
  const [consoleInput, setConsoleInput] = useState<string>("");
  const [logFilter, setLogFilter] = useState<"all" | "log" | "warn" | "error">(
    "all"
  );

  // Refs
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const lineNumbersRef = useRef<HTMLDivElement | null>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        snippetsRef.current &&
        !snippetsRef.current.contains(e.target as Node)
      ) {
        setSnippetsOpen(false);
      }
      if (
        templatesRef.current &&
        !templatesRef.current.contains(e.target as Node)
      ) {
        setTemplatesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // Generate full HTML bundle
  const generateBundle = useCallback(() => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Reset & Base Canvas Styling */
    *, *::before, *::after { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      min-height: 100%;
    }
    ${cssCode}
  </style>
  <script>
    (function() {
      const origLog = console.log;
      const origWarn = console.warn;
      const origError = console.error;
      
      window.addEventListener('error', function(e) {
        window.parent.postMessage({
          type: 'iframe_runtime_error',
          message: e.message || 'Runtime script error',
          filename: e.filename,
          lineno: e.lineno
        }, '*');
      });

      console.log = function(...args) {
        origLog.apply(console, args);
        try {
          window.parent.postMessage({
            type: 'iframe_console',
            level: 'log',
            message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
          }, '*');
        } catch(e) {}
      };

      console.warn = function(...args) {
        origWarn.apply(console, args);
        try {
          window.parent.postMessage({
            type: 'iframe_console',
            level: 'warn',
            message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
          }, '*');
        } catch(e) {}
      };

      console.error = function(...args) {
        origError.apply(console, args);
        try {
          window.parent.postMessage({
            type: 'iframe_console',
            level: 'error',
            message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
          }, '*');
        } catch(e) {}
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
      console.error('[Script Runtime Error]: ' + err.message);
      window.parent.postMessage({
        type: 'iframe_runtime_error',
        message: err.message
      }, '*');
    }
  </script>
</body>
</html>`;
  }, [htmlCode, cssCode, jsCode]);

  // Execute runner into iframe
  const renderPreview = useCallback(() => {
    if (!iframeRef.current) return;
    setIsUpdating(true);
    setSyntaxError(null);

    const bundle = generateBundle();
    iframeRef.current.srcdoc = bundle;

    const time = new Date().toLocaleTimeString();
    setLastRenderTime(time);

    setTimeout(() => {
      setIsUpdating(false);
    }, 200);
  }, [generateBundle]);

  // Auto-run with debounced real-time compilation
  useEffect(() => {
    if (!autoRun) return;
    const timer = setTimeout(() => {
      renderPreview();
    }, 60); // 60ms debounce for near-instant real-time typing response
    return () => clearTimeout(timer);
  }, [htmlCode, cssCode, jsCode, autoRun, renderPreview]);

  // Handle postMessage from iframe
  useEffect(() => {
    const handleMsg = (e: MessageEvent) => {
      if (!e.data) return;
      const time = new Date().toLocaleTimeString();

      if (e.data.type === "iframe_console") {
        setConsoleLogs((prev) => [
          ...prev.slice(-80),
          {
            type: e.data.level || "log",
            message: String(e.data.message || ""),
            time,
          },
        ]);
      } else if (e.data.type === "iframe_runtime_error") {
        setSyntaxError(String(e.data.message || "Runtime Error"));
        setConsoleLogs((prev) => [
          ...prev.slice(-80),
          {
            type: "error",
            message: `Runtime Error: ${e.data.message}`,
            time,
          },
        ]);
      }
    };
    window.addEventListener("message", handleMsg);
    return () => window.removeEventListener("message", handleMsg);
  }, []);

  // Sync line numbers scrolling with textarea
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  // Switch template
  const handleSelectTemplate = (id: string) => {
    const tmpl = WORKSPACE_TEMPLATES.find((t) => t.id === id);
    if (!tmpl) return;
    setSelectedTemplateId(id);
    setHtmlCode(tmpl.html);
    setCssCode(tmpl.css);
    setJsCode(tmpl.js);
    setConsoleLogs([]);
    setSyntaxError(null);
    setTemplatesDropdownOpen(false);
  };

  // Format code (cleans trailing spaces & tabs)
  const handleFormatCode = () => {
    const format = (src: string) =>
      src
        .split("\n")
        .map((line) => line.replace(/[ \t]+$/, ""))
        .join("\n");

    if (activeCodeTab === "html") setHtmlCode(format(htmlCode));
    if (activeCodeTab === "css") setCssCode(format(cssCode));
    if (activeCodeTab === "js") setJsCode(format(jsCode));
  };

  // Insert quick snippet
  const handleInsertSnippet = (snippet: QuickSnippet) => {
    if (snippet.lang === "html") {
      setActiveCodeTab("html");
      setHtmlCode((prev) => prev + "\n\n" + snippet.snippet);
    } else if (snippet.lang === "css") {
      setActiveCodeTab("css");
      setCssCode((prev) => prev + "\n\n" + snippet.snippet);
    } else if (snippet.lang === "js") {
      setActiveCodeTab("js");
      setJsCode((prev) => prev + "\n\n" + snippet.snippet);
    }
    setSnippetsOpen(false);
  };

  // Copy current active tab code
  const handleCopyActive = () => {
    let text = htmlCode;
    if (activeCodeTab === "css") text = cssCode;
    if (activeCodeTab === "js") text = jsCode;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Copy complete standalone HTML bundle
  const handleCopyAllBundle = () => {
    navigator.clipboard.writeText(generateBundle());
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  // Download project as .html file
  const handleDownloadFile = () => {
    const blob = new Blob([generateBundle()], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedTemplateId}-workspace.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Tab key indents by 2 spaces instead of losing focus
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const value = target.value;

      const newValue =
        value.substring(0, start) + "  " + value.substring(end);

      if (activeCodeTab === "html") setHtmlCode(newValue);
      else if (activeCodeTab === "css") setCssCode(newValue);
      else if (activeCodeTab === "js") setJsCode(newValue);

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  // Evaluate JS expression in sandbox from console input
  const handleEvaluateConsole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consoleInput.trim() || !iframeRef.current?.contentWindow) return;

    try {
      const codeToRun = consoleInput;
      setConsoleLogs((prev) => [
        ...prev,
        {
          type: "log",
          message: `> ${codeToRun}`,
          time: new Date().toLocaleTimeString(),
        },
      ]);

      const evalScript = `
        try {
          const res = (function() { return ${codeToRun}; })();
          console.log(res);
        } catch(err) {
          console.error(err.message);
        }
      `;
      iframeRef.current.contentWindow.postMessage(
        { type: "iframe_eval", code: evalScript },
        "*"
      );
      // Run inside iframe if accessible
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        const s = doc.createElement("script");
        s.textContent = evalScript;
        doc.body.appendChild(s);
        doc.body.removeChild(s);
      }
      setConsoleInput("");
    } catch (err: any) {
      setConsoleLogs((prev) => [
        ...prev,
        {
          type: "error",
          message: String(err.message),
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }
  };

  // Current active code string & line count
  const currentCode = useMemo(() => {
    if (activeCodeTab === "html") return htmlCode;
    if (activeCodeTab === "css") return cssCode;
    return jsCode;
  }, [activeCodeTab, htmlCode, cssCode, jsCode]);

  const lineCount = useMemo(() => {
    return currentCode.split("\n").length;
  }, [currentCode]);

  const lineNumbers = useMemo(() => {
    return Array.from({ length: Math.max(lineCount, 1) }, (_, i) => i + 1);
  }, [lineCount]);

  // Filtered console logs
  const filteredLogs = useMemo(() => {
    if (logFilter === "all") return consoleLogs;
    return consoleLogs.filter((l) => l.type === logFilter);
  }, [consoleLogs, logFilter]);

  const activeTemplate =
    WORKSPACE_TEMPLATES.find((t) => t.id === selectedTemplateId) ||
    WORKSPACE_TEMPLATES[0];

  return (
    <div
      className={`flex flex-col w-full transition-all ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-app-canvas p-3 sm:p-4 overflow-hidden"
          : "space-y-4"
      }`}
    >
      {/* 1. Top Control Bar: Template Switcher, Layout & Real-time Controls */}
      <div className="rounded-2xl border border-app-border bg-app-surface/95 p-3 sm:p-4 shadow-sm backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        {/* Left: Template Selector & Real-Time Live Status */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Active Template Selector */}
          <div className="relative" ref={templatesRef}>
            <button
              type="button"
              onClick={() => setTemplatesDropdownOpen(!templatesDropdownOpen)}
              className="group inline-flex items-center gap-2 rounded-xl border border-app-border bg-app-inset px-3.5 py-2 text-xs font-bold text-app-ink transition-all hover:border-blue-500/50 hover:bg-app-active cursor-pointer"
            >
              <Code2 className="h-4 w-4 text-blue-500" />
              <span className="max-w-[140px] sm:max-w-[200px] truncate">
                {activeTemplate.title}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-app-subtle transition-transform duration-200 group-hover:translate-y-0.5" />
            </button>

            {templatesDropdownOpen && (
              <div className="absolute left-0 top-full mt-1.5 z-40 w-72 rounded-xl border border-app-border bg-app-surface p-1.5 shadow-xl backdrop-blur-lg animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-app-subtle border-b border-app-border">
                  Load Template Preset
                </div>
                <div className="max-h-64 overflow-y-auto py-1 space-y-1">
                  {WORKSPACE_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => handleSelectTemplate(tmpl.id)}
                      className={`w-full text-left rounded-lg px-3 py-2 text-xs transition-colors cursor-pointer flex flex-col gap-0.5 ${
                        selectedTemplateId === tmpl.id
                          ? "bg-blue-600/10 text-blue-500 font-bold border border-blue-500/20"
                          : "text-app-ink hover:bg-app-inset"
                      }`}
                    >
                      <span className="font-semibold">{tmpl.title}</span>
                      <span className="text-[11px] text-app-muted line-clamp-1">
                        {tmpl.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Real-time Live Badge */}
          <div className="inline-flex items-center gap-2 rounded-xl border border-app-border bg-app-inset px-3 py-1.5 font-mono text-xs">
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  autoRun
                    ? "animate-ping bg-emerald-400"
                    : "bg-amber-400 opacity-30"
                }`}
              />
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  autoRun ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
            </span>
            <span className="text-app-muted">
              {autoRun ? "Real-Time: " : "Manual: "}
              <strong className="text-app-ink font-semibold">
                {isUpdating ? "Rendering..." : `Synced (${lastRenderTime})`}
              </strong>
            </span>
          </div>

          {/* Auto-update Toggle */}
          <button
            type="button"
            onClick={() => setAutoRun(!autoRun)}
            className={`inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 font-mono text-[11px] font-bold border transition-colors cursor-pointer ${
              autoRun
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-app-border bg-app-inset text-app-muted hover:text-app-ink"
            }`}
            title="Toggle instant keystroke compilation"
          >
            <span>Live Auto-Update</span>
          </button>
        </div>

        {/* Right: Layout Switchers, Run, Snippets & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Snippets Inserter */}
          <div className="relative" ref={snippetsRef}>
            <button
              type="button"
              onClick={() => setSnippetsOpen(!snippetsOpen)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-app-border bg-app-inset px-3 py-2 text-xs font-bold text-app-ink transition-all hover:bg-app-active cursor-pointer"
              title="Insert boilerplate code snippets"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Snippets</span>
              <ChevronDown className="h-3 w-3 text-app-subtle" />
            </button>

            {snippetsOpen && (
              <div className="absolute right-0 top-full mt-1.5 z-40 w-64 rounded-xl border border-app-border bg-app-surface p-1.5 shadow-xl backdrop-blur-lg">
                <div className="px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-app-subtle border-b border-app-border">
                  Quick Insert Snippet
                </div>
                <div className="max-h-60 overflow-y-auto py-1 space-y-1">
                  {QUICK_SNIPPETS.map((snip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleInsertSnippet(snip)}
                      className="w-full text-left rounded-lg px-2.5 py-1.5 text-xs text-app-ink hover:bg-app-inset transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span className="font-medium">{snip.name}</span>
                      <span className="font-mono text-[10px] text-app-subtle uppercase px-1.5 py-0.5 rounded bg-app-active">
                        {snip.lang}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Split Screen Layout Modes */}
          <div className="hidden sm:flex items-center rounded-xl border border-app-border bg-app-inset p-0.5">
            <button
              type="button"
              onClick={() => setSplitOrientation("horizontal")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                splitOrientation === "horizontal"
                  ? "bg-app-surface text-blue-500 shadow-xs"
                  : "text-app-muted hover:text-app-ink"
              }`}
              title="Side-by-side horizontal split"
            >
              <Columns className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setSplitOrientation("vertical")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                splitOrientation === "vertical"
                  ? "bg-app-surface text-blue-500 shadow-xs"
                  : "text-app-muted hover:text-app-ink"
              }`}
              title="Top/bottom vertical split"
            >
              <Rows className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Format Code */}
          <button
            type="button"
            onClick={handleFormatCode}
            className="inline-flex items-center gap-1 rounded-xl border border-app-border bg-app-inset px-2.5 py-2 text-xs font-bold text-app-muted hover:text-app-ink hover:bg-app-active transition-colors cursor-pointer"
            title="Clean whitespace and indent format"
          >
            <Wand2 className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Format</span>
          </button>

          {/* Manual Run */}
          <button
            type="button"
            onClick={renderPreview}
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white transition-all hover:bg-blue-500 shadow-sm cursor-pointer"
            title="Force immediate recompile"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Run</span>
          </button>

          {/* Export Bundle */}
          <button
            type="button"
            onClick={handleDownloadFile}
            className="inline-flex items-center gap-1.5 rounded-xl border border-app-border bg-app-inset px-3 py-2 text-xs font-bold text-app-ink hover:bg-app-active transition-colors cursor-pointer"
            title="Download standalone compiled HTML file"
          >
            <Download className="h-3.5 w-3.5 text-blue-500" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Fullscreen Expansion */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl border border-app-border bg-app-inset text-app-muted hover:text-app-ink transition-colors cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Split View"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* 2. Split-Screen Main Layout: Code Editor on Left, Real-Time Preview on Right */}
      <div
        className={`w-full grid gap-4 ${
          splitOrientation === "horizontal"
            ? "lg:grid-cols-12 min-h-[640px]"
            : "grid-cols-1 min-h-[800px]"
        } ${isFullscreen ? "flex-1 min-h-0" : ""}`}
      >
        {/* LEFT / TOP PANE: Code Editor */}
        <div
          className={`flex flex-col rounded-2xl border border-app-border bg-app-surface shadow-sm overflow-hidden ${
            splitOrientation === "horizontal"
              ? "lg:col-span-7 h-[640px] sm:h-[680px]"
              : "h-[450px]"
          } ${isFullscreen ? "h-full" : ""}`}
        >
          {/* Editor Tab Navigation Bar */}
          <div className="flex items-center justify-between border-b border-app-border bg-app-inset px-3 py-2 shrink-0">
            {/* Tabs for HTML, CSS, JS */}
            <div className="flex items-center gap-1">
              {(
                [
                  { id: "html", label: "index.html", color: "bg-orange-500" },
                  { id: "css", label: "styles.css", color: "bg-blue-500" },
                  { id: "js", label: "script.js", color: "bg-amber-400" },
                ] as const
              ).map((tab) => {
                const isActive = activeCodeTab === tab.id;
                const tabLength =
                  tab.id === "html"
                    ? htmlCode.split("\n").length
                    : tab.id === "css"
                    ? cssCode.split("\n").length
                    : jsCode.split("\n").length;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCodeTab(tab.id)}
                    className={`group relative flex items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-app-surface text-app-ink shadow-xs border border-app-border"
                        : "text-app-muted hover:text-app-ink hover:bg-app-surface/50"
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${tab.color}`} />
                    <span>{tab.label}</span>
                    <span className="text-[10px] opacity-50 font-normal">
                      {tabLength}L
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Editor Action Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopyActive}
                className="flex items-center gap-1 rounded-lg border border-app-border bg-app-surface px-2.5 py-1 font-mono text-[11px] text-app-muted hover:text-app-ink transition-colors cursor-pointer"
                title={`Copy ${activeCodeTab.toUpperCase()}`}
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
                onClick={handleCopyAllBundle}
                className="hidden sm:flex items-center gap-1 rounded-lg border border-app-border bg-app-surface px-2.5 py-1 font-mono text-[11px] text-app-muted hover:text-app-ink transition-colors cursor-pointer"
                title="Copy entire merged HTML+CSS+JS document"
              >
                {copiedAll ? (
                  <Check className="h-3 w-3 text-emerald-400" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                <span>{copiedAll ? "Bundle Copied" : "Copy Bundle"}</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectTemplate(selectedTemplateId)}
                className="flex items-center gap-1 rounded-lg border border-app-border bg-app-surface px-2.5 py-1 font-mono text-[11px] text-app-muted hover:text-app-ink transition-colors cursor-pointer"
                title="Reset to template original"
              >
                <RotateCcw className="h-3 w-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Code Textarea with Synchronized Line Numbers */}
          <div className="flex-1 relative flex overflow-hidden bg-app-inset/90">
            {/* Gutter Line Numbers */}
            <div
              ref={lineNumbersRef}
              className="w-12 select-none overflow-hidden py-3 font-mono text-xs text-app-subtle border-r border-app-border/40 text-right pr-2.5 bg-app-inset shrink-0"
              aria-hidden="true"
            >
              {lineNumbers.map((num) => (
                <div key={num} className="leading-6 h-6">
                  {num}
                </div>
              ))}
            </div>

            {/* Active Code Input */}
            <div className="flex-1 relative h-full">
              {activeCodeTab === "html" && (
                <textarea
                  ref={textareaRef}
                  value={htmlCode}
                  onChange={(e) => setHtmlCode(e.target.value)}
                  onScroll={handleScroll}
                  onKeyDown={handleKeyDown}
                  className="w-full h-full resize-none bg-transparent p-3 font-mono text-xs sm:text-sm text-app-ink focus:outline-none leading-6 selection:bg-blue-500/30 whitespace-pre font-normal"
                  spellCheck={false}
                  placeholder="<!-- Write HTML markup here... -->"
                />
              )}

              {activeCodeTab === "css" && (
                <textarea
                  ref={textareaRef}
                  value={cssCode}
                  onChange={(e) => setCssCode(e.target.value)}
                  onScroll={handleScroll}
                  onKeyDown={handleKeyDown}
                  className="w-full h-full resize-none bg-transparent p-3 font-mono text-xs sm:text-sm text-app-ink focus:outline-none leading-6 selection:bg-blue-500/30 whitespace-pre font-normal"
                  spellCheck={false}
                  placeholder="/* Write CSS rules and declarations here... */"
                />
              )}

              {activeCodeTab === "js" && (
                <textarea
                  ref={textareaRef}
                  value={jsCode}
                  onChange={(e) => setJsCode(e.target.value)}
                  onScroll={handleScroll}
                  onKeyDown={handleKeyDown}
                  className="w-full h-full resize-none bg-transparent p-3 font-mono text-xs sm:text-sm text-app-ink focus:outline-none leading-6 selection:bg-blue-500/30 whitespace-pre font-normal"
                  spellCheck={false}
                  placeholder="// Write JavaScript interaction & logic here..."
                />
              )}
            </div>
          </div>

          {/* Editor Status Bar */}
          <div className="flex items-center justify-between border-t border-app-border bg-app-inset px-3 py-1.5 font-mono text-[11px] text-app-subtle shrink-0">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Sandbox Active</span>
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">
                {currentCode.length} characters
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">{lineCount} lines</span>
            </div>

            <div className="flex items-center gap-2">
              <span>Tab: 2 spaces</span>
              <span>·</span>
              <span>UTF-8</span>
            </div>
          </div>
        </div>

        {/* RIGHT / BOTTOM PANE: Live Output Preview Stage + Console Drawer */}
        <div
          className={`flex flex-col rounded-2xl border border-app-border bg-app-surface shadow-sm overflow-hidden ${
            splitOrientation === "horizontal"
              ? "lg:col-span-5 h-[640px] sm:h-[680px]"
              : "h-[500px]"
          } ${isFullscreen ? "h-full" : ""}`}
        >
          {/* Preview Toolbar */}
          <div className="flex items-center justify-between border-b border-app-border bg-app-inset px-3 py-2 shrink-0">
            {/* Browser Dots & Live Indicator */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-xs font-bold text-app-ink ml-1">
                Live Output Preview
              </span>
              {isUpdating && (
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-blue-400">
                  <RefreshCw className="h-2.5 w-2.5 animate-spin" />
                  <span>Updating</span>
                </span>
              )}
            </div>

            {/* Responsive Viewport Switcher */}
            <div className="flex items-center gap-1 rounded-lg border border-app-border bg-app-surface p-0.5">
              <button
                type="button"
                onClick={() => setViewportMode("desktop")}
                className={`p-1 rounded transition-colors cursor-pointer ${
                  viewportMode === "desktop"
                    ? "bg-blue-600/15 text-blue-500 font-bold"
                    : "text-app-muted hover:text-app-ink"
                }`}
                title="Desktop 100% fluid view"
              >
                <Laptop className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewportMode("tablet")}
                className={`p-1 rounded transition-colors cursor-pointer ${
                  viewportMode === "tablet"
                    ? "bg-blue-600/15 text-blue-500 font-bold"
                    : "text-app-muted hover:text-app-ink"
                }`}
                title="Tablet 768px frame"
              >
                <Tablet className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewportMode("mobile")}
                className={`p-1 rounded transition-colors cursor-pointer ${
                  viewportMode === "mobile"
                    ? "bg-blue-600/15 text-blue-500 font-bold"
                    : "text-app-muted hover:text-app-ink"
                }`}
                title="Mobile 375px frame"
              >
                <Smartphone className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Syntax Error Warning Banner */}
          {syntaxError && (
            <div className="bg-rose-500/10 border-b border-rose-500/30 px-3 py-1.5 flex items-center justify-between text-xs text-rose-400 shrink-0">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                <span className="font-mono truncate">{syntaxError}</span>
              </div>
              <button
                type="button"
                onClick={() => setSyntaxError(null)}
                className="text-[10px] font-mono hover:text-rose-200 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Live Preview Iframe Container */}
          <div className="flex-1 bg-slate-950 relative overflow-hidden flex items-center justify-center p-0">
            <div
              className={`h-full transition-all duration-300 ${
                viewportMode === "desktop"
                  ? "w-full"
                  : viewportMode === "tablet"
                  ? "w-[768px] max-w-full my-auto border-x border-slate-800 shadow-2xl rounded-t-xl"
                  : "w-[375px] max-w-full my-auto border-x border-slate-800 shadow-2xl rounded-t-2xl"
              }`}
            >
              <iframe
                ref={iframeRef}
                title="WebZoneBW Real-Time Preview"
                sandbox="allow-scripts allow-modals allow-same-origin"
                className="w-full h-full border-none bg-white dark:bg-slate-950"
              />
            </div>
          </div>

          {/* Real-Time Sandbox Console Drawer */}
          <div className="h-44 border-t border-app-border bg-app-inset flex flex-col shrink-0">
            {/* Console Bar Header */}
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-app-border bg-app-surface/70">
              <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase text-app-muted">
                <Terminal className="h-3 w-3 text-cyan-400" />
                <span>Console ({consoleLogs.length})</span>
                <span className="text-app-subtle">·</span>

                {/* Filter buttons */}
                <div className="flex items-center gap-1 font-normal">
                  {(["all", "log", "warn", "error"] as const).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setLogFilter(filter)}
                      className={`px-1.5 py-0.5 rounded text-[10px] capitalize cursor-pointer transition-colors ${
                        logFilter === filter
                          ? "bg-app-active text-app-ink font-bold"
                          : "text-app-subtle hover:text-app-ink"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setConsoleLogs([])}
                className="flex items-center gap-1 font-mono text-[10px] text-app-subtle hover:text-app-ink cursor-pointer"
                title="Clear console output"
              >
                <Trash2 className="h-2.5 w-2.5" />
                <span>Clear</span>
              </button>
            </div>

            {/* Console Log Messages Output */}
            <div className="flex-1 overflow-y-auto p-2 font-mono text-xs space-y-1 scrollbar-thin">
              {filteredLogs.length === 0 ? (
                <p className="text-[11px] text-app-subtle italic py-2 px-1">
                  Console ready. Type JavaScript or use console.log() to view
                  real-time runtime values.
                </p>
              ) : (
                filteredLogs.map((log, idx) => (
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
                    <span className="text-app-subtle text-[10px] shrink-0 font-mono">
                      [{log.time}]
                    </span>
                    <span className="break-all font-mono">{log.message}</span>
                  </div>
                ))
              )}
            </div>

            {/* Quick Interactive REPL Evaluator */}
            <form
              onSubmit={handleEvaluateConsole}
              className="flex items-center border-t border-app-border bg-app-surface px-2 py-1 gap-1.5"
            >
              <span className="font-mono text-cyan-400 text-xs font-bold pl-1">
                &gt;
              </span>
              <input
                type="text"
                value={consoleInput}
                onChange={(e) => setConsoleInput(e.target.value)}
                placeholder="Evaluate JS (e.g. document.title, 2 + 2, count)..."
                className="flex-1 bg-transparent font-mono text-xs text-app-ink placeholder:text-app-subtle focus:outline-none"
              />
              <button
                type="submit"
                className="p-1 text-app-muted hover:text-cyan-400 transition-colors cursor-pointer"
                title="Execute JavaScript"
              >
                <Send className="h-3 w-3" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
