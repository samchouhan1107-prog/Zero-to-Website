import React, { useState } from 'react';
import { Layers, RefreshCw, Copy, Check } from 'lucide-react';

export const BoxModelVisualizer: React.FC = () => {
  const [margin, setMargin] = useState(24);
  const [border, setBorder] = useState(4);
  const [padding, setPadding] = useState(20);
  const [width, setWidth] = useState(220);
  const [height, setHeight] = useState(100);
  const [boxSizing, setBoxSizing] = useState<'content-box' | 'border-box'>('border-box');
  const [copied, setCopied] = useState(false);

  const totalCalculatedWidth =
    boxSizing === 'border-box'
      ? width + margin * 2
      : width + (padding * 2) + (border * 2) + (margin * 2);

  const generatedCss = `/* Generated Box Model Rules */
.my-element {
  box-sizing: ${boxSizing};
  width: ${width}px;
  height: ${height}px;
  padding: ${padding}px;
  border: ${border}px solid #3b82f6;
  margin: ${margin}px;
  background-color: #dbeafe;
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetValues = () => {
    setMargin(24);
    setBorder(4);
    setPadding(20);
    setWidth(220);
    setHeight(100);
    setBoxSizing('border-box');
  };

  return (
    <div id="box-model-visualizer" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Interactive 3D Box Model Explorer
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Adjust the sliders below to see how Margin, Border, Padding, and Content interact in real-time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetValues}
            className="text-xs px-2.5 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            onClick={copyCode}
            className="text-xs px-3 py-1.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-1 font-medium transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy CSS'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Visual Stage */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 min-h-[360px] overflow-hidden">
          {/* MARGIN LAYER */}
          <div
            className="transition-all duration-200 rounded-lg relative flex items-center justify-center border border-dashed border-amber-400/80 bg-amber-500/10 dark:bg-amber-500/15"
            style={{
              padding: `${margin}px`,
            }}
          >
            <span className="absolute top-1 left-2 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Margin ({margin}px)
            </span>

            {/* BORDER LAYER */}
            <div
              className="transition-all duration-200 rounded relative flex items-center justify-center bg-yellow-400/20 dark:bg-yellow-400/20"
              style={{
                border: `${border}px solid #eab308`,
              }}
            >
              <span className="absolute top-0.5 right-1.5 text-[9px] font-mono font-bold uppercase text-yellow-700 dark:text-yellow-300">
                Border ({border}px)
              </span>

              {/* PADDING LAYER */}
              <div
                className="transition-all duration-200 relative flex items-center justify-center bg-emerald-400/20 dark:bg-emerald-400/20"
                style={{
                  padding: `${padding}px`,
                }}
              >
                <span className="absolute bottom-1 left-2 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  Padding ({padding}px)
                </span>

                {/* CONTENT LAYER */}
                <div
                  className="transition-all duration-200 bg-blue-500 text-white rounded font-mono text-xs flex flex-col items-center justify-center shadow-md select-none font-bold"
                  style={{
                    width: `${width}px`,
                    height: `${height}px`,
                  }}
                >
                  <span>Content</span>
                  <span className="text-[11px] opacity-90">{width} × {height}px</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Total Rendered Footprint: <strong className="text-slate-800 dark:text-slate-200 font-bold">{Math.round(totalCalculatedWidth)}px</strong>
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Box-Sizing Model
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setBoxSizing('border-box')}
                className={`text-xs py-2 px-3 rounded-lg border font-medium transition-all ${
                  boxSizing === 'border-box'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-semibold ring-1 ring-emerald-500'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                border-box (Recommended)
              </button>
              <button
                type="button"
                onClick={() => setBoxSizing('content-box')}
                className={`text-xs py-2 px-3 rounded-lg border font-medium transition-all ${
                  boxSizing === 'content-box'
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-700 dark:text-amber-300 font-semibold ring-1 ring-amber-500'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                content-box (Legacy)
              </button>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span className="text-amber-600 dark:text-amber-400 font-semibold">Margin (Outer)</span>
                <span className="font-mono">{margin}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="48"
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span className="text-yellow-600 dark:text-yellow-400 font-semibold">Border (Frame)</span>
                <span className="font-mono">{border}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="16"
                value={border}
                onChange={(e) => setBorder(Number(e.target.value))}
                className="w-full accent-yellow-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Padding (Cushion)</span>
                <span className="font-mono">{padding}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="48"
                value={padding}
                onChange={(e) => setPadding(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">Width</span>
                  <span className="font-mono">{width}px</span>
                </div>
                <input
                  type="range"
                  min="120"
                  max="300"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">Height</span>
                  <span className="font-mono">{height}px</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="160"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full accent-blue-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Generated Code Snippet */}
          <div className="bg-slate-900 rounded-lg p-3 text-[11px] font-mono text-emerald-400 overflow-x-auto mt-3">
            <pre>
              <code>{`box-sizing: ${boxSizing};\nwidth: ${width}px;\npadding: ${padding}px;\nborder: ${border}px solid #3b82f6;\nmargin: ${margin}px;`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
