import React, { useState } from 'react';
import {
  FileText,
  Eye,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Send,
  Layers,
} from 'lucide-react';

export const SemanticHtmlVisualizer: React.FC = () => {
  const [mode, setMode] = useState<'semantic' | 'divsoup'>('semantic');
  const [activeLandmark, setActiveLandmark] = useState<string>('header');
  const [formInput, setFormInput] = useState({ name: 'Alex Johnson', email: 'alex@webzone.dev' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [depthStage, setDepthStage] = useState<'simple' | 'structured' | 'practical'>('simple');

  const landmarks = [
    {
      tag: '<header>',
      divEquivalent: '<div class="header">',
      role: 'banner',
      desc: 'Top-level brand, logo, and title navigation',
      color: 'border-amber-500/50 bg-amber-500/10 text-amber-300',
    },
    {
      tag: '<nav>',
      divEquivalent: '<div class="nav">',
      role: 'navigation',
      desc: 'Primary website navigation links',
      color: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300',
    },
    {
      tag: '<main>',
      divEquivalent: '<div class="main">',
      role: 'main',
      desc: 'Unique core content of the document (only one per page)',
      color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300',
    },
    {
      tag: '<article>',
      divEquivalent: '<div class="article">',
      role: 'article',
      desc: 'Self-contained, syndicatable content (e.g. blog post, card)',
      color: 'border-indigo-500/50 bg-indigo-500/10 text-indigo-300',
    },
    {
      tag: '<aside>',
      divEquivalent: '<div class="sidebar">',
      role: 'complementary',
      desc: 'Related tangential information, author bio, or ads',
      color: 'border-purple-500/50 bg-purple-500/10 text-purple-300',
    },
    {
      tag: '<footer>',
      divEquivalent: '<div class="footer">',
      role: 'contentinfo',
      desc: 'Copyright, privacy policy, and author contact metadata',
      color: 'border-rose-500/50 bg-rose-500/10 text-rose-300',
    },
  ];

  return (
    <div id="semantic-html-visualizer" className="panel-surface min-w-0 overflow-hidden p-5 sm:p-6 space-y-6">
      {/* Header & Concept Standard Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-app-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
              CONCEPT: DOCUMENT ARCHITECTURE
            </span>
            <span className="font-mono text-xs text-app-subtle">Ch 02 Semantic Foundation</span>
          </div>
          <h3 className="text-lg font-bold text-app-ink flex items-center gap-2 mt-1">
            <FileText className="w-5 h-5 text-emerald-400" />
            Semantic HTML5 Architecture &amp; Accessibility Outline
          </h3>
          <p className="text-xs text-app-muted">
            Visualize the architectural difference between clean semantic landmarks and inaccessible generic &lt;div&gt; soup.
          </p>
        </div>

        {/* Semantic vs Div Soup Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-app-inset border border-app-border">
          <button
            type="button"
            onClick={() => setMode('semantic')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              mode === 'semantic'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-app-muted hover:text-app-ink'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Semantic HTML5</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('divsoup')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              mode === 'divsoup'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-app-muted hover:text-app-ink'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Generic &lt;div&gt; Soup</span>
          </button>
        </div>
      </div>

      {/* Standard Step-by-Step Concept Pipeline: Input -> Process -> Output */}
      <div className="rounded-xl border border-app-border bg-app-inset p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-app-ink flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            Document Landmark Pipeline &amp; Screen Reader Accessibility
          </span>
          <div className="flex items-center gap-1 text-[10px] font-mono">
            {(['simple', 'structured', 'practical'] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setDepthStage(lvl)}
                className={`px-2 py-0.5 rounded capitalize font-bold cursor-pointer transition-colors ${
                  depthStage === lvl
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
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
            <div className="text-[10px] text-cyan-400 font-bold uppercase">1. Authoring (Input)</div>
            <p className="text-[11px] text-app-muted">
              {depthStage === 'simple'
                ? 'Developer wraps content with semantic tags: <header>, <nav>, <main>.'
                : 'Developer defines semantic markup reflecting real content hierarchy rather than layout geometry.'}
            </p>
          </div>
          <div className="rounded-lg border border-app-border bg-app-surface p-2.5 space-y-1">
            <div className="text-[10px] text-amber-400 font-bold uppercase">2. Accessibility Tree (Process)</div>
            <p className="text-[11px] text-app-muted">
              {depthStage === 'simple'
                ? 'Browser assigns ARIA roles and creates an accessibility navigation tree.'
                : 'Browser calculates accessibility node roles (role="banner", role="navigation", role="main").'}
            </p>
          </div>
          <div className="rounded-lg border border-app-border bg-app-surface p-2.5 space-y-1">
            <div className="text-[10px] text-emerald-400 font-bold uppercase">3. User Experience (Output)</div>
            <p className="text-[11px] text-app-muted">
              {depthStage === 'simple'
                ? 'Screen readers and SEO crawlers navigate sections effortlessly.'
                : 'Keyboard navigation jumps directly across landmarks without tabbing through 50 individual links.'}
            </p>
          </div>
        </div>
      </div>

      {/* Visual Landmark Architecture Blueprint */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Visual Document Outline Stage */}
        <div className="lg:col-span-7 rounded-xl border border-app-border bg-app-inset p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-app-ink font-bold">Document Wireframe View</span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                mode === 'semantic'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
              }`}
            >
              {mode === 'semantic' ? 'Score: 100/100 Accessible' : 'Score: 24/100 Inaccessible'}
            </span>
          </div>

          {/* HEADER */}
          <div
            onClick={() => setActiveLandmark('header')}
            className={`p-3 rounded-lg border text-xs font-mono cursor-pointer transition-all ${
              mode === 'semantic'
                ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                : 'border-slate-700 bg-slate-800/40 text-slate-400'
            } ${activeLandmark === 'header' ? 'ring-2 ring-white/50' : ''}`}
          >
            <div className="font-bold flex items-center justify-between">
              <span>{mode === 'semantic' ? '<header role="banner">' : '<div class="header">'}</span>
              <span className="text-[10px] opacity-70">Top Brand Area</span>
            </div>
          </div>

          {/* NAV */}
          <div
            onClick={() => setActiveLandmark('nav')}
            className={`p-2.5 rounded-lg border text-xs font-mono cursor-pointer transition-all ${
              mode === 'semantic'
                ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'
                : 'border-slate-700 bg-slate-800/40 text-slate-400'
            } ${activeLandmark === 'nav' ? 'ring-2 ring-white/50' : ''}`}
          >
            <div className="font-bold flex items-center justify-between">
              <span>{mode === 'semantic' ? '<nav role="navigation">' : '<div class="nav-links">'}</span>
              <span className="text-[10px] opacity-70">Home · Courses · Sandbox · Docs</span>
            </div>
          </div>

          {/* MAIN CONTAINER (MAIN + ASIDE) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* MAIN */}
            <div
              onClick={() => setActiveLandmark('main')}
              className={`sm:col-span-2 p-4 rounded-lg border text-xs font-mono cursor-pointer transition-all space-y-2.5 ${
                mode === 'semantic'
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                  : 'border-slate-700 bg-slate-800/40 text-slate-400'
              } ${activeLandmark === 'main' ? 'ring-2 ring-white/50' : ''}`}
            >
              <div className="font-bold flex items-center justify-between border-b border-white/10 pb-1">
                <span>{mode === 'semantic' ? '<main role="main">' : '<div class="main-body">'}</span>
                <span className="text-[10px] opacity-70">Core Page Content</span>
              </div>

              {/* ARTICLE */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLandmark('article');
                }}
                className={`p-3 rounded border ${
                  mode === 'semantic'
                    ? 'border-indigo-500/40 bg-indigo-500/15 text-indigo-200'
                    : 'border-slate-700 bg-slate-800/50 text-slate-400'
                } ${activeLandmark === 'article' ? 'ring-2 ring-white/50' : ''}`}
              >
                <div className="font-bold">
                  {mode === 'semantic' ? '<article>' : '<div class="blog-post">'}
                </div>
                <div className="text-[11px] opacity-80 mt-1">
                  Semantic article content card with &lt;h2&gt;, &lt;p&gt;, &lt;time&gt;
                </div>
              </div>
            </div>

            {/* ASIDE */}
            <div
              onClick={() => setActiveLandmark('aside')}
              className={`p-4 rounded-lg border text-xs font-mono cursor-pointer transition-all space-y-2 ${
                mode === 'semantic'
                  ? 'border-purple-500/40 bg-purple-500/10 text-purple-300'
                  : 'border-slate-700 bg-slate-800/40 text-slate-400'
              } ${activeLandmark === 'aside' ? 'ring-2 ring-white/50' : ''}`}
            >
              <div className="font-bold border-b border-white/10 pb-1">
                {mode === 'semantic' ? '<aside>' : '<div class="sidebar">'}
              </div>
              <p className="text-[10px] opacity-80 leading-relaxed">
                Complementary author bio, tags, &amp; related tutorials.
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div
            onClick={() => setActiveLandmark('footer')}
            className={`p-3 rounded-lg border text-xs font-mono cursor-pointer transition-all ${
              mode === 'semantic'
                ? 'border-rose-500/40 bg-rose-500/10 text-rose-300'
                : 'border-slate-700 bg-slate-800/40 text-slate-400'
            } ${activeLandmark === 'footer' ? 'ring-2 ring-white/50' : ''}`}
          >
            <div className="font-bold flex items-center justify-between">
              <span>{mode === 'semantic' ? '<footer role="contentinfo">' : '<div class="footer">'}</span>
              <span className="text-[10px] opacity-70">© 2026 WebZone · MIT License</span>
            </div>
          </div>
        </div>

        {/* Right Landmark Detail & Accessibility Tree */}
        <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-[#0f1117] p-4 text-xs font-mono text-slate-300 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-cyan-400 font-bold flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" /> Screen Reader View
            </span>
            <span className="text-[10px] text-slate-500">ARIA Landmark Outline</span>
          </div>

          {mode === 'semantic' ? (
            <div className="space-y-2 text-[11px]">
              <p className="text-emerald-400">✓ 6 accessible landmarks detected:</p>
              <div className="space-y-1 pl-2 border-l border-emerald-500/30">
                <div>• Banner: Header landmark</div>
                <div>• Navigation: Nav landmark (4 links)</div>
                <div>• Main: Primary content landmark</div>
                <div>• Article: Standalone syndicatable story</div>
                <div>• Complementary: Aside sidebar</div>
                <div>• Contentinfo: Footer legal &amp; metadata</div>
              </div>
              <p className="text-slate-400 pt-1">
                Screen reader shortcut <kbd className="px-1 py-0.5 rounded bg-slate-800 text-cyan-300">D</kbd> skips straight across major landmarks!
              </p>
            </div>
          ) : (
            <div className="space-y-2 text-[11px] text-rose-300">
              <p className="text-rose-400 font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Zero landmarks detected!
              </p>
              <p className="text-slate-400 leading-relaxed">
                Screen readers only see generic unlabeled containers: <code className="text-slate-300">&lt;div&gt; &gt; &lt;div&gt; &gt; &lt;div&gt;</code>. Visually impaired users must manually tab through every single element on the page.
              </p>
            </div>
          )}

          {/* Accessible Form Input -> Process -> Output Simulator */}
          <div className="rounded-lg border border-slate-800 bg-[#13151f] p-3 space-y-2">
            <div className="text-[11px] font-bold text-amber-300 border-b border-slate-800 pb-1 flex items-center justify-between">
              <span>Form Data Pipeline (Input → Validation)</span>
              <span className="text-[10px] text-slate-500">&lt;form&gt;</span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSubmitted(true);
                setTimeout(() => setFormSubmitted(false), 3000);
              }}
              className="space-y-2 pt-1 text-[11px]"
            >
              <div>
                <label className="block text-slate-400 mb-0.5">&lt;label for=&quot;name&quot;&gt;Name&lt;/label&gt;</label>
                <input
                  type="text"
                  required
                  value={formInput.name}
                  onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
                  className="w-full bg-[#0a0c12] border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-0.5">&lt;label for=&quot;email&quot;&gt;Email (type=&quot;email&quot;)&lt;/label&gt;</label>
                <input
                  type="email"
                  required
                  value={formInput.email}
                  onChange={(e) => setFormInput({ ...formInput, email: e.target.value })}
                  className="w-full bg-[#0a0c12] border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <Send className="w-3 h-3" />
                <span>Submit &amp; Validate Form</span>
              </button>

              {formSubmitted && (
                <div className="p-2 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px]">
                  ✓ Browser HTML5 validation passed! Payload: <br />
                  <code>{JSON.stringify(formInput)}</code>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Concept Check / Reasoning Callout */}
      <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-app-ink flex items-start gap-3">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-app-ink font-bold block mb-0.5">
            Key Mental Model · Meaning Precedes Presentation:
          </strong>
          <p className="text-app-muted leading-relaxed">
            HTML is designed to describe <em>what content means</em>, not how it looks. Using <code className="text-emerald-400">&lt;main&gt;</code>, <code className="text-emerald-400">&lt;header&gt;</code>, and <code className="text-emerald-400">&lt;nav&gt;</code> allows search engines to rank your content accurately and screen readers to provide barrier-free navigation for millions of users.
          </p>
        </div>
      </div>
    </div>
  );
};
