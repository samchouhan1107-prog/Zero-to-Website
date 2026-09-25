import React, { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  ExternalLink,
  Eye,
  FileCode,
  FileJson,
  Layers,
  Maximize2,
  Minimize2,
  RefreshCw,
  Search,
  Share2,
  Sparkles,
  Terminal,
  Wand2,
} from "lucide-react";

interface WebToolsViewProps {
  onNavigateWorkspace?: (snippet?: { html?: string; css?: string; js?: string }) => void;
  onNavigateDevTools?: () => void;
  onNavigateVisualLab?: (toolId?: string) => void;
}

type WebToolTab = "html-validator" | "css-optimizer" | "json-formatter" | "meta-tags";

export const WebToolsView: React.FC<WebToolsViewProps> = ({
  onNavigateWorkspace,
  onNavigateDevTools,
  onNavigateVisualLab,
}) => {
  const [activeTab, setActiveTab] = useState<WebToolTab>("html-validator");
  const [copied, setCopied] = useState(false);

  // 1. HTML Validator State
  const [htmlInput, setHtmlInput] = useState<string>(
`<div class="card">
  <h2>Welcome to WebZoneBW SC</h2>
  <p>Learn web engineering with hands-on tools.</p>
  <img src="banner.jpg">
  <button id="cta" class="btn">Get Started</button>
</div>`
  );
  const [htmlIssues, setHtmlIssues] = useState<Array<{ type: "error" | "warning" | "info"; msg: string }>>([]);
  const [htmlValidated, setHtmlValidated] = useState(false);

  const validateHtml = (code: string) => {
    const issues: Array<{ type: "error" | "warning" | "info"; msg: string }> = [];
    if (!code.trim()) {
      setHtmlIssues([{ type: "error", msg: "Input is empty. Please enter HTML code to analyze." }]);
      setHtmlValidated(true);
      return;
    }

    // Check 1: Missing alt on images
    const imgMatches = code.match(/<img[^>]*>/gi) || [];
    imgMatches.forEach((img) => {
      if (!/alt=["'][^"']*["']/i.test(img)) {
        issues.push({
          type: "warning",
          msg: `Accessibility: <img /> is missing an alt attribute. Example: alt="Descriptive text"`,
        });
      }
    });

    // Check 2: Unclosed self-closing void elements or open tags
    const openDivs = (code.match(/<div\b/gi) || []).length;
    const closeDivs = (code.match(/<\/div>/gi) || []).length;
    if (openDivs !== closeDivs) {
      issues.push({
        type: "error",
        msg: `Tag mismatch: Found ${openDivs} opening <div> tags and ${closeDivs} closing </div> tags.`,
      });
    }

    // Check 3: Check for inline style attributes
    if (/style=["'][^"']*["']/i.test(code)) {
      issues.push({
        type: "info",
        msg: "Best practice: Inline styles detected. Consider moving styles to external CSS classes.",
      });
    }

    // Check 4: Check for missing doctype in full documents
    if (code.includes("<html") && !/<!doctype html>/i.test(code)) {
      issues.push({
        type: "warning",
        msg: "Full page missing standard <!DOCTYPE html> declaration at top.",
      });
    }

    if (issues.length === 0) {
      issues.push({
        type: "info",
        msg: "Clean HTML! Semantic elements and tag closures are well structured.",
      });
    }

    setHtmlIssues(issues);
    setHtmlValidated(true);
  };

  const formatHtml = () => {
    try {
      // Basic clean indentation formatter
      let formatted = "";
      let indent = 0;
      const tokens = htmlInput.replace(/>\s*</g, "><").split(/(<[^>]+>)/g).filter(Boolean);
      tokens.forEach((token) => {
        if (/^<\/[^>]+>/.test(token)) {
          indent = Math.max(0, indent - 1);
        }
        if (token.trim()) {
          formatted += "  ".repeat(indent) + token.trim() + "\n";
        }
        if (/^<[^\/!][^>]*[^\/]>$/.test(token) && !/^(<img|<br|<hr|<input|<meta|<link)/i.test(token)) {
          indent++;
        }
      });
      setHtmlInput(formatted.trim());
      validateHtml(formatted.trim());
    } catch {
      // fallback
    }
  };

  // 2. CSS Optimizer State
  const [cssInput, setCssInput] = useState<string>(
`.hero-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  background-color: #0f172a;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.hero-title {
  font-size: 2.25rem;
  font-weight: 800;
  color: #38bdf8;
  margin-bottom: 12px;
}`
  );
  const [minifiedCss, setMinifiedCss] = useState<string>("");

  const optimizeCss = (raw: string) => {
    // Basic CSS minification
    const min = raw
      .replace(/\/\*[\s\S]*?\*\//g, "") // remove comments
      .replace(/\s+/g, " ") // collapse whitespaces
      .replace(/\s*([\{\}:;,])\s*/g, "$1") // remove spaces around symbols
      .replace(/;}/g, "}") // remove trailing semicolon
      .trim();
    setMinifiedCss(min);
  };

  // 3. JSON Formatter State
  const [jsonInput, setJsonInput] = useState<string>(
`{"project":"WebZoneBW SC","version":"2.4.0","features":["Editor","Learn","Visualizer"],"active":true,"stars":1280}`
  );
  const [jsonError, setJsonError] = useState<string | null>(null);

  const formatJson = (spaces = 2) => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, spaces));
      setJsonError(null);
    } catch (e: any) {
      setJsonError(e.message || "Invalid JSON syntax");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed));
      setJsonError(null);
    } catch (e: any) {
      setJsonError(e.message || "Invalid JSON syntax");
    }
  };

  // 4. Meta Tags State
  const [metaTitle, setMetaTitle] = useState("WebZoneBW SC — Interactive Web Engineering");
  const [metaDesc, setMetaDesc] = useState("Master modern HTML, CSS, JavaScript, and responsive design with real-time browser sandbox tools.");
  const [metaUrl, setMetaUrl] = useState("https://webzonebw.shop/");
  const [metaImg, setMetaImg] = useState("https://webzonebw.shop/og-image.svg");

  const generatedMetaHtml = `<!-- Primary Meta Tags -->
<title>${metaTitle}</title>
<meta name="title" content="${metaTitle}" />
<meta name="description" content="${metaDesc}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${metaUrl}" />
<meta property="og:title" content="${metaTitle}" />
<meta property="og:description" content="${metaDesc}" />
<meta property="og:image" content="${metaImg}" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="${metaUrl}" />
<meta name="twitter:title" content="${metaTitle}" />
<meta name="twitter:description" content="${metaDesc}" />
<meta name="twitter:image" content="${metaImg}" />`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* 1. Header Banner */}
      <section className="rounded-2xl border border-app-border bg-gradient-to-br from-emerald-950/30 via-app-surface to-app-inset p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-400">
              <Code2 className="h-3.5 w-3.5" />
              <span>Developer Productivity Suite</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-app-ink">
              Interactive Web Tools
            </h1>
            <p className="text-sm text-app-muted leading-relaxed">
              Essential, zero-install web utilities to validate markup, minify and optimize stylesheets, verify JSON payloads, and generate SEO-ready social share metadata.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {onNavigateWorkspace && (
              <button
                type="button"
                onClick={() => onNavigateWorkspace({ html: htmlInput, css: minifiedCss || cssInput })}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all cursor-pointer"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Open in Workspace</span>
              </button>
            )}
            {onNavigateDevTools && (
              <button
                type="button"
                onClick={onNavigateDevTools}
                className="inline-flex items-center gap-2 rounded-xl border border-app-border bg-app-surface hover:bg-app-active px-4 py-2.5 text-xs font-bold text-app-ink transition-all cursor-pointer"
              >
                <Terminal className="h-3.5 w-3.5 text-amber-400" />
                <span>Launch DevTools</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 flex items-center gap-2 border-b border-app-border pb-1 overflow-x-auto no-scrollbar">
          {[
            { id: "html-validator", label: "HTML Validator & Cleaner", icon: FileCode },
            { id: "css-optimizer", label: "CSS Minifier & Optimizer", icon: Wand2 },
            { id: "json-formatter", label: "JSON Formatter & Linter", icon: FileJson },
            { id: "meta-tags", label: "OpenGraph & Meta Generator", icon: Share2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as WebToolTab)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                    : "text-app-muted hover:bg-app-active hover:text-app-ink"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Tab Contents */}
      {/* TAB 1: HTML Validator */}
      {activeTab === "html-validator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl border border-app-border bg-app-surface p-4 sm:p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-app-ink uppercase tracking-wider">
                  HTML Markup Input
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={formatHtml}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-app-border bg-app-inset hover:bg-app-active px-2.5 py-1 text-xs font-bold text-app-muted hover:text-app-ink transition-colors cursor-pointer"
                  >
                    <Wand2 className="h-3 w-3 text-blue-400" />
                    <span>Auto-Format</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => validateHtml(htmlInput)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1 text-xs font-bold text-white transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Validate Code</span>
                  </button>
                </div>
              </div>

              <textarea
                value={htmlInput}
                onChange={(e) => {
                  setHtmlInput(e.target.value);
                  setHtmlValidated(false);
                }}
                rows={12}
                className="w-full rounded-xl border border-app-border bg-slate-950 p-4 font-mono text-xs text-emerald-300 focus:border-emerald-500 focus:outline-hidden resize-y leading-relaxed"
                placeholder="Paste or write HTML tags to validate..."
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-app-border bg-app-surface p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-app-ink flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Validation &amp; Diagnostics
              </h3>

              {!htmlValidated ? (
                <div className="rounded-xl border border-dashed border-app-border p-6 text-center text-xs text-app-muted">
                  Click <strong>Validate Code</strong> above to inspect tag closures, image accessibility, and HTML5 conformance.
                </div>
              ) : (
                <div className="space-y-2">
                  {htmlIssues.map((issue, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-2.5 rounded-xl border p-3 text-xs leading-relaxed ${
                        issue.type === "error"
                          ? "border-red-500/30 bg-red-500/10 text-red-300"
                          : issue.type === "warning"
                            ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                            : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      }`}
                    >
                      {issue.type === "error" ? (
                        <AlertTriangle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                      ) : issue.type === "warning" ? (
                        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                      )}
                      <span>{issue.msg}</span>
                    </div>
                  ))}
                </div>
              )}

              {onNavigateWorkspace && (
                <div className="pt-2 border-t border-app-border">
                  <button
                    type="button"
                    onClick={() => onNavigateWorkspace({ html: htmlInput })}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-2.5 text-xs font-bold text-white transition-all cursor-pointer"
                  >
                    <span>Send this HTML to Workspace Editor</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CSS Optimizer */}
      {activeTab === "css-optimizer" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-app-border bg-app-surface p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-app-ink uppercase tracking-wider">
                Raw CSS
              </span>
              <button
                type="button"
                onClick={() => optimizeCss(cssInput)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                <Wand2 className="h-3 w-3" />
                <span>Minify &amp; Compress</span>
              </button>
            </div>
            <textarea
              value={cssInput}
              onChange={(e) => setCssInput(e.target.value)}
              rows={12}
              className="w-full rounded-xl border border-app-border bg-slate-950 p-4 font-mono text-xs text-sky-300 focus:border-sky-500 focus:outline-hidden resize-y leading-relaxed"
            />
          </div>

          <div className="rounded-2xl border border-app-border bg-app-surface p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-app-ink uppercase tracking-wider">
                Minified CSS Output
              </span>
              {minifiedCss && (
                <button
                  type="button"
                  onClick={() => copyToClipboard(minifiedCss)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-app-border bg-app-inset hover:bg-app-active px-2.5 py-1 text-xs font-bold text-app-muted hover:text-app-ink transition-colors cursor-pointer"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? "Copied!" : "Copy CSS"}</span>
                </button>
              )}
            </div>

            <textarea
              readOnly
              value={minifiedCss || "Click 'Minify & Compress' to generate production-ready CSS..."}
              rows={12}
              className="w-full rounded-xl border border-app-border bg-slate-950 p-4 font-mono text-xs text-amber-300 focus:outline-hidden resize-y leading-relaxed"
            />

            {minifiedCss && (
              <div className="flex items-center justify-between pt-2 text-xs font-mono text-app-muted">
                <span>Original: {cssInput.length} bytes</span>
                <span className="text-emerald-400 font-bold">
                  Minified: {minifiedCss.length} bytes (
                  {Math.round(((cssInput.length - minifiedCss.length) / (cssInput.length || 1)) * 100)}% saved)
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: JSON Formatter */}
      {activeTab === "json-formatter" && (
        <div className="rounded-2xl border border-app-border bg-app-surface p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-xs font-bold text-app-ink uppercase tracking-wider">
              JSON Parser &amp; Formatter
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => formatJson(2)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 px-3 py-1.5 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                <span>Format (2 spaces)</span>
              </button>
              <button
                type="button"
                onClick={minifyJson}
                className="inline-flex items-center gap-1.5 rounded-lg border border-app-border bg-app-inset hover:bg-app-active px-3 py-1.5 text-xs font-bold text-app-muted hover:text-app-ink transition-colors cursor-pointer"
              >
                <span>Minify</span>
              </button>
              <button
                type="button"
                onClick={() => copyToClipboard(jsonInput)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-app-border bg-app-inset hover:bg-app-active px-3 py-1.5 text-xs font-bold text-app-muted hover:text-app-ink transition-colors cursor-pointer"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          <textarea
            value={jsonInput}
            onChange={(e) => {
              setJsonInput(e.target.value);
              setJsonError(null);
            }}
            rows={14}
            className="w-full rounded-xl border border-app-border bg-slate-950 p-4 font-mono text-xs text-purple-300 focus:border-purple-500 focus:outline-hidden resize-y leading-relaxed"
          />

          {jsonError && (
            <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400 font-mono">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>{jsonError}</span>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: OpenGraph & Meta Tags */}
      {activeTab === "meta-tags" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl border border-app-border bg-app-surface p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-app-ink">Metadata Parameters</h3>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-app-muted block mb-1">Page Title</label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="w-full rounded-xl border border-app-border bg-app-inset px-3.5 py-2 text-xs text-app-ink focus:border-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-app-muted block mb-1">Description</label>
                  <textarea
                    value={metaDesc}
                    onChange={(e) => setMetaDesc(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-app-border bg-app-inset px-3.5 py-2 text-xs text-app-ink focus:border-blue-500 focus:outline-hidden resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-app-muted block mb-1">Canonical URL</label>
                  <input
                    type="text"
                    value={metaUrl}
                    onChange={(e) => setMetaUrl(e.target.value)}
                    className="w-full rounded-xl border border-app-border bg-app-inset px-3.5 py-2 text-xs text-app-ink focus:border-blue-500 focus:outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-app-muted block mb-1">OG Image URL</label>
                  <input
                    type="text"
                    value={metaImg}
                    onChange={(e) => setMetaImg(e.target.value)}
                    className="w-full rounded-xl border border-app-border bg-app-inset px-3.5 py-2 text-xs text-app-ink focus:border-blue-500 focus:outline-hidden font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            {/* Live Social Card Preview */}
            <div className="rounded-2xl border border-app-border bg-app-surface p-5 shadow-sm space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-app-subtle block">
                Live Social Card Preview
              </span>

              <div className="overflow-hidden rounded-xl border border-app-border bg-slate-900 shadow-md">
                <div className="h-36 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 flex items-center justify-center p-4">
                  <span className="font-extrabold text-white text-base tracking-tight text-center drop-shadow-md">
                    {metaTitle}
                  </span>
                </div>
                <div className="p-4 space-y-1 bg-slate-950">
                  <span className="text-[10px] font-mono text-app-subtle uppercase block truncate">
                    {metaUrl}
                  </span>
                  <h4 className="text-xs font-bold text-slate-100 line-clamp-1">{metaTitle}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {metaDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Generated HTML */}
            <div className="rounded-2xl border border-app-border bg-app-surface p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-app-ink">Generated Meta HTML</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(generatedMetaHtml)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-app-border bg-app-inset hover:bg-app-active px-2.5 py-1 text-xs font-bold text-app-muted hover:text-app-ink transition-colors cursor-pointer"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? "Copied" : "Copy Tags"}</span>
                </button>
              </div>

              <pre className="max-h-48 overflow-y-auto rounded-xl border border-app-border bg-slate-950 p-3 font-mono text-[11px] text-emerald-300 leading-relaxed no-scrollbar">
                {generatedMetaHtml}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
