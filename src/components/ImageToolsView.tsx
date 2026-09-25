import React, { useState } from "react";
import {
  Check,
  Code2,
  Copy,
  ExternalLink,
  Eye,
  Layers,
  Maximize,
  Move,
  Palette,
  Ratio,
  Sliders,
  Sparkles,
  Sun,
  Wand2,
} from "lucide-react";

interface ImageToolsViewProps {
  onNavigateVisualLab?: (toolId?: string) => void;
  onNavigateWorkspace?: () => void;
}

type ImageToolTab = "gradient-studio" | "shadow-glass" | "aspect-ratio" | "visualizers";

export const ImageToolsView: React.FC<ImageToolsViewProps> = ({
  onNavigateVisualLab,
  onNavigateWorkspace,
}) => {
  const [activeTab, setActiveTab] = useState<ImageToolTab>("gradient-studio");
  const [copied, setCopied] = useState(false);

  // 1. Gradient Studio State
  const [gradientType, setGradientType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState(135);
  const [color1, setColor1] = useState("#3b82f6");
  const [color2, setColor2] = useState("#8b5cf6");
  const [color3, setColor3] = useState("#ec4899");

  const gradientPresets = [
    { name: "Ocean Breeze", c1: "#06b6d4", c2: "#3b82f6", c3: "#6366f1", deg: 135 },
    { name: "Sunset Ember", c1: "#f59e0b", c2: "#ef4444", c3: "#8b5cf6", deg: 120 },
    { name: "Cyberpunk Neon", c1: "#ec4899", c2: "#8b5cf6", c3: "#3b82f6", deg: 90 },
    { name: "Emerald Forest", c1: "#10b981", c2: "#059669", c3: "#047857", deg: 160 },
    { name: "Midnight Obsidian", c1: "#1e1b4b", c2: "#312e81", c3: "#0f172a", deg: 180 },
  ];

  const generatedGradientCss =
    gradientType === "linear"
      ? `background: linear-gradient(${angle}deg, ${color1} 0%, ${color2} 50%, ${color3} 100%);`
      : `background: radial-gradient(circle at center, ${color1} 0%, ${color2} 60%, ${color3} 100%);`;

  // 2. Box Shadow & Glass State
  const [shadowX, setShadowX] = useState(0);
  const [shadowY, setShadowY] = useState(16);
  const [shadowBlur, setShadowBlur] = useState(32);
  const [shadowSpread, setShadowSpread] = useState(-8);
  const [shadowColor, setShadowColor] = useState("#000000");
  const [shadowAlpha, setShadowAlpha] = useState(0.4);
  const [glassBlur, setGlassBlur] = useState(16);
  const [glassOpacity, setGlassOpacity] = useState(0.65);

  const shadowRgba = `rgba(0, 0, 0, ${shadowAlpha})`;
  const generatedShadowCss = `box-shadow: ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowRgba};
backdrop-filter: blur(${glassBlur}px);
-webkit-backdrop-filter: blur(${glassBlur}px);
background: rgba(30, 41, 59, ${glassOpacity});
border: 1px solid rgba(255, 255, 255, 0.12);
border-radius: 16px;`;

  // 3. Aspect Ratio Scaler
  const [baseWidth, setBaseWidth] = useState(1200);
  const [aspectRatioChoice, setAspectRatioChoice] = useState<"16/9" | "4/3" | "1/1" | "9/16" | "21/9">("16/9");

  const ratioMultipliers: Record<string, number> = {
    "16/9": 9 / 16,
    "4/3": 3 / 4,
    "1/1": 1,
    "9/16": 16 / 9,
    "21/9": 9 / 21,
  };

  const calculatedHeight = Math.round(baseWidth * (ratioMultipliers[aspectRatioChoice] || 0.5625));

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* 1. Header Banner */}
      <section className="rounded-2xl border border-app-border bg-gradient-to-br from-violet-950/30 via-app-surface to-app-inset p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-xs font-semibold text-violet-400">
              <Palette className="h-3.5 w-3.5" />
              <span>CSS Visual &amp; Media Studio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-app-ink">
              Image &amp; Visual Tools
            </h1>
            <p className="text-sm text-app-muted leading-relaxed">
              Design high-fidelity gradients, dial in multi-layered elevation box shadows, compute responsive aspect ratios, and test layout visualizers with real-time CSS output.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {onNavigateVisualLab && (
              <button
                type="button"
                onClick={() => onNavigateVisualLab("box")}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all cursor-pointer"
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Box Model Inspector</span>
              </button>
            )}
            {onNavigateWorkspace && (
              <button
                type="button"
                onClick={onNavigateWorkspace}
                className="inline-flex items-center gap-2 rounded-xl border border-app-border bg-app-surface hover:bg-app-active px-4 py-2.5 text-xs font-bold text-app-ink transition-all cursor-pointer"
              >
                <Code2 className="h-3.5 w-3.5 text-blue-400" />
                <span>Open in Workspace</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 flex items-center gap-2 border-b border-app-border pb-1 overflow-x-auto no-scrollbar">
          {[
            { id: "gradient-studio", label: "CSS Gradient Studio", icon: Palette },
            { id: "shadow-glass", label: "Box Shadow & Glassmorphism", icon: Sliders },
            { id: "aspect-ratio", label: "Aspect Ratio Calculator", icon: Ratio },
            { id: "visualizers", label: "Interactive Visualizers", icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as ImageToolTab)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-violet-600 text-white shadow-md shadow-violet-500/20"
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

      {/* TAB 1: Gradient Studio */}
      {activeTab === "gradient-studio" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl border border-app-border bg-app-surface p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-app-ink">Gradient Controls</h3>
                <div className="flex rounded-lg border border-app-border p-0.5 bg-app-inset">
                  <button
                    type="button"
                    onClick={() => setGradientType("linear")}
                    className={`rounded-md px-2.5 py-1 text-xs font-bold transition-all ${
                      gradientType === "linear" ? "bg-violet-600 text-white" : "text-app-muted"
                    }`}
                  >
                    Linear
                  </button>
                  <button
                    type="button"
                    onClick={() => setGradientType("radial")}
                    className={`rounded-md px-2.5 py-1 text-xs font-bold transition-all ${
                      gradientType === "radial" ? "bg-violet-600 text-white" : "text-app-muted"
                    }`}
                  >
                    Radial
                  </button>
                </div>
              </div>

              {gradientType === "linear" && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-app-muted font-bold">Angle ({angle}°)</span>
                    <span className="font-mono text-app-ink">{angle} deg</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="w-full accent-violet-500"
                  />
                </div>
              )}

              {/* Color Stops */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-app-muted block">Color Stops</span>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-app-subtle block">Stop 1 (0%)</label>
                    <div className="flex items-center gap-2 rounded-xl border border-app-border bg-app-inset p-2">
                      <input
                        type="color"
                        value={color1}
                        onChange={(e) => setColor1(e.target.value)}
                        className="h-6 w-6 rounded border-0 cursor-pointer"
                      />
                      <span className="font-mono text-[11px] text-app-ink">{color1}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-app-subtle block">Stop 2 (50%)</label>
                    <div className="flex items-center gap-2 rounded-xl border border-app-border bg-app-inset p-2">
                      <input
                        type="color"
                        value={color2}
                        onChange={(e) => setColor2(e.target.value)}
                        className="h-6 w-6 rounded border-0 cursor-pointer"
                      />
                      <span className="font-mono text-[11px] text-app-ink">{color2}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-app-subtle block">Stop 3 (100%)</label>
                    <div className="flex items-center gap-2 rounded-xl border border-app-border bg-app-inset p-2">
                      <input
                        type="color"
                        value={color3}
                        onChange={(e) => setColor3(e.target.value)}
                        className="h-6 w-6 rounded border-0 cursor-pointer"
                      />
                      <span className="font-mono text-[11px] text-app-ink">{color3}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Presets */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-app-muted block">Curated Palettes</span>
                <div className="flex flex-wrap gap-2">
                  {gradientPresets.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setColor1(p.c1);
                        setColor2(p.c2);
                        setColor3(p.c3);
                        setAngle(p.deg);
                      }}
                      className="rounded-lg border border-app-border bg-app-inset hover:bg-app-active px-3 py-1.5 text-xs font-semibold text-app-muted hover:text-app-ink transition-colors cursor-pointer"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            {/* Live Canvas Preview */}
            <div className="rounded-2xl border border-app-border bg-app-surface p-5 shadow-sm space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-app-subtle block">
                Live Gradient Canvas
              </span>

              <div
                className="h-64 w-full rounded-2xl shadow-xl flex items-center justify-center p-6 transition-all duration-300"
                style={{
                  background:
                    gradientType === "linear"
                      ? `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)`
                      : `radial-gradient(circle at center, ${color1} 0%, ${color2} 60%, ${color3} 100%)`,
                }}
              >
                <div className="rounded-xl border border-white/20 bg-slate-950/60 backdrop-blur-md px-6 py-4 text-center shadow-2xl">
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider block">
                    {gradientType === "linear" ? `${angle}° Linear` : "Radial Glow"}
                  </span>
                  <span className="text-sm font-extrabold text-white">Interactive Preview Stage</span>
                </div>
              </div>

              {/* Code output */}
              <div className="rounded-xl border border-app-border bg-slate-950 p-4 font-mono text-xs text-emerald-300 flex items-center justify-between gap-3">
                <code className="truncate">{generatedGradientCss}</code>
                <button
                  type="button"
                  onClick={() => copyToClipboard(generatedGradientCss)}
                  className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? "Copied" : "Copy CSS"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Box Shadow & Glass */}
      {activeTab === "shadow-glass" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl border border-app-border bg-app-surface p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-app-ink">Shadow &amp; Blur Parameters</h3>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-app-muted">X Offset ({shadowX}px)</span>
                    <span className="font-mono text-app-ink">{shadowX}px</span>
                  </div>
                  <input
                    type="range"
                    min="-40"
                    max="40"
                    value={shadowX}
                    onChange={(e) => setShadowX(Number(e.target.value))}
                    className="w-full accent-violet-500"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-app-muted">Y Offset ({shadowY}px)</span>
                    <span className="font-mono text-app-ink">{shadowY}px</span>
                  </div>
                  <input
                    type="range"
                    min="-40"
                    max="60"
                    value={shadowY}
                    onChange={(e) => setShadowY(Number(e.target.value))}
                    className="w-full accent-violet-500"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-app-muted">Blur Radius ({shadowBlur}px)</span>
                    <span className="font-mono text-app-ink">{shadowBlur}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="80"
                    value={shadowBlur}
                    onChange={(e) => setShadowBlur(Number(e.target.value))}
                    className="w-full accent-violet-500"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-app-muted">Spread Radius ({shadowSpread}px)</span>
                    <span className="font-mono text-app-ink">{shadowSpread}px</span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="30"
                    value={shadowSpread}
                    onChange={(e) => setShadowSpread(Number(e.target.value))}
                    className="w-full accent-violet-500"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-app-muted">Glass Backdrop Blur ({glassBlur}px)</span>
                    <span className="font-mono text-app-ink">{glassBlur}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={glassBlur}
                    onChange={(e) => setGlassBlur(Number(e.target.value))}
                    className="w-full accent-violet-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl border border-app-border bg-app-surface p-5 shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-app-subtle block">
                Glass &amp; Elevation Preview
              </span>

              <div className="relative h-64 w-full rounded-2xl bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center p-8 overflow-hidden">
                {/* Background decorative circles to test glass blur */}
                <div className="absolute top-4 left-6 h-28 w-28 rounded-full bg-pink-500/80 blur-md" />
                <div className="absolute bottom-4 right-8 h-32 w-32 rounded-full bg-cyan-400/80 blur-md" />

                <div
                  className="relative z-10 w-full max-w-sm p-6 text-center space-y-2 transition-all"
                  style={{
                    boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowRgba}`,
                    backdropFilter: `blur(${glassBlur}px)`,
                    WebkitBackdropFilter: `blur(${glassBlur}px)`,
                    background: `rgba(30, 41, 59, ${glassOpacity})`,
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    borderRadius: "16px",
                  }}
                >
                  <span className="font-bold text-sm text-white block">Glassmorphism Card</span>
                  <p className="text-xs text-slate-200">
                    Blur: {glassBlur}px · Shadow: {shadowBlur}px
                  </p>
                </div>
              </div>

              {/* Code */}
              <div className="rounded-xl border border-app-border bg-slate-950 p-4 font-mono text-xs text-emerald-300 relative">
                <button
                  type="button"
                  onClick={() => copyToClipboard(generatedShadowCss)}
                  className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? "Copied" : "Copy CSS"}</span>
                </button>
                <pre className="no-scrollbar overflow-x-auto pr-20 leading-relaxed">
                  {generatedShadowCss}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Aspect Ratio Calculator */}
      {activeTab === "aspect-ratio" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl border border-app-border bg-app-surface p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-app-ink">Aspect Ratio Scaler</h3>

              <div className="space-y-3">
                <span className="text-xs font-bold text-app-muted block">Standard Ratio Presets</span>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {[
                    { id: "16/9", label: "16:9 Video" },
                    { id: "4/3", label: "4:3 Classic" },
                    { id: "1/1", label: "1:1 Square" },
                    { id: "9/16", label: "9:16 Story" },
                    { id: "21/9", label: "21:9 Cinema" },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setAspectRatioChoice(r.id as any)}
                      className={`rounded-xl border p-2 text-center text-xs font-bold transition-all cursor-pointer ${
                        aspectRatioChoice === r.id
                          ? "border-violet-500 bg-violet-600 text-white"
                          : "border-app-border bg-app-inset text-app-muted hover:border-violet-500/40 hover:text-app-ink"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="text-xs font-bold text-app-muted block mb-1">Base Width (pixels)</label>
                  <input
                    type="number"
                    value={baseWidth}
                    onChange={(e) => setBaseWidth(Math.max(1, Number(e.target.value)))}
                    className="w-full rounded-xl border border-app-border bg-app-inset px-3.5 py-2 text-xs text-app-ink focus:border-violet-500 focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-1">
                <span className="text-xs font-mono text-emerald-400 font-bold block">
                  Proportional Calculated Dimensions:
                </span>
                <span className="text-lg font-black text-emerald-300">
                  {baseWidth}px × {calculatedHeight}px ({aspectRatioChoice})
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl border border-app-border bg-app-surface p-5 shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-app-subtle block">
                Scale Simulation ({aspectRatioChoice})
              </span>

              <div className="h-64 rounded-2xl border border-app-border bg-slate-950 flex items-center justify-center p-4">
                <div
                  className="max-h-full max-w-full rounded-xl border-2 border-violet-500 bg-violet-500/20 flex flex-col items-center justify-center p-2 text-center transition-all duration-300 shadow-lg"
                  style={{
                    aspectRatio: aspectRatioChoice,
                    width: aspectRatioChoice === "9/16" ? "120px" : "80%",
                  }}
                >
                  <span className="font-mono text-xs font-bold text-violet-300">{aspectRatioChoice}</span>
                  <span className="font-mono text-[10px] text-app-subtle">
                    {baseWidth} × {calculatedHeight}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-app-border bg-slate-950 p-4 font-mono text-xs text-emerald-300">
                <code>{`/* Modern CSS aspect-ratio */\n.media-wrapper {\n  aspect-ratio: ${aspectRatioChoice};\n  width: 100%;\n  object-fit: cover;\n}`}</code>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Visualizers Direct Cross-Links */}
      {activeTab === "visualizers" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-app-border bg-app-surface p-6 shadow-sm space-y-4">
            <div className="h-12 w-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
              📦
            </div>
            <h3 className="text-lg font-bold text-app-ink">Box Model Inspector</h3>
            <p className="text-xs text-app-muted leading-relaxed">
              Visualize how margins, borders, paddings, and content dimensions calculate in standard content-box and border-box sizing models.
            </p>
            {onNavigateVisualLab && (
              <button
                type="button"
                onClick={() => onNavigateVisualLab("box")}
                className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-2.5 text-xs font-bold text-white transition-all cursor-pointer"
              >
                Launch Box Model →
              </button>
            )}
          </div>

          <div className="rounded-2xl border border-app-border bg-app-surface p-6 shadow-sm space-y-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              📐
            </div>
            <h3 className="text-lg font-bold text-app-ink">Flexbox Studio</h3>
            <p className="text-xs text-app-muted leading-relaxed">
              Interact with justify-content, align-items, flex-direction, and flex-wrap axes with instant visual item reorganization.
            </p>
            {onNavigateVisualLab && (
              <button
                type="button"
                onClick={() => onNavigateVisualLab("flex")}
                className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 text-xs font-bold text-white transition-all cursor-pointer"
              >
                Launch Flexbox Studio →
              </button>
            )}
          </div>

          <div className="rounded-2xl border border-app-border bg-app-surface p-6 shadow-sm space-y-4">
            <div className="h-12 w-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold">
              🔲
            </div>
            <h3 className="text-lg font-bold text-app-ink">CSS Grid Matrix</h3>
            <p className="text-xs text-app-muted leading-relaxed">
              Experiment with 2D grid template columns, minmax fr-units, auto-fit repeat layouts, and gap spacings in real time.
            </p>
            {onNavigateVisualLab && (
              <button
                type="button"
                onClick={() => onNavigateVisualLab("grid")}
                className="w-full rounded-xl bg-purple-600 hover:bg-purple-500 py-2.5 text-xs font-bold text-white transition-all cursor-pointer"
              >
                Launch Grid Matrix →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
