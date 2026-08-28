import React, { useState } from 'react';
import { Grid, Copy, Check, Plus, Minus } from 'lucide-react';

export const GridVisualizer: React.FC = () => {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(2);
  const [gap, setGap] = useState(16);
  const [templateType, setTemplateType] = useState<'fr' | 'auto-fit' | 'pixels'>('fr');
  const [copied, setCopied] = useState(false);

  const getTemplateColumnsCss = () => {
    if (templateType === 'fr') return `repeat(${columns}, 1fr)`;
    if (templateType === 'auto-fit') return `repeat(auto-fit, minmax(140px, 1fr))`;
    return `repeat(${columns}, 100px)`;
  };

  const generatedCss = `.grid-matrix {
  display: grid;
  grid-template-columns: ${getTemplateColumnsCss()};
  grid-template-rows: repeat(${rows}, auto);
  gap: ${gap}px;
}`;

  const copyCSS = () => {
    navigator.clipboard.writeText(generatedCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalCells = columns * rows;

  return (
    <div id="grid-visualizer" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Grid className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            CSS Grid Matrix Matrix Builder
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Experiment with 2D tracks, columns, rows, and responsive auto-fit algorithms.
          </p>
        </div>
        <button
          onClick={copyCSS}
          className="text-xs px-3 py-1.5 rounded-md bg-teal-600 text-white hover:bg-teal-700 flex items-center gap-1 font-medium transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Copy CSS'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Grid Preview */}
        <div className="lg:col-span-7 p-4 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 min-h-[340px] flex flex-col justify-center">
          <div
            className="w-full p-4 rounded-lg bg-white dark:bg-slate-900 border-2 border-dashed border-teal-400/60 transition-all duration-300"
            style={{
              display: 'grid',
              gridTemplateColumns: getTemplateColumnsCss(),
              gap: `${gap}px`,
            }}
          >
            {Array.from({ length: totalCells }).map((_, idx) => (
              <div
                key={idx}
                className="bg-teal-500/15 dark:bg-teal-500/20 border border-teal-400/50 rounded-lg p-3 min-h-[60px] flex flex-col items-center justify-center text-teal-800 dark:text-teal-200 font-mono text-xs font-bold transition-all hover:bg-teal-500/25"
              >
                <span>Cell {idx + 1}</span>
                <span className="text-[10px] opacity-75 font-normal">Track {idx % columns + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Column Sizing Strategy
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'fr', label: 'Fractional (fr)' },
                { id: 'auto-fit', label: 'Auto-Fit (Bento)' },
                { id: 'pixels', label: 'Fixed (px)' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setTemplateType(opt.id as any)}
                  className={`text-xs py-1.5 px-2 rounded-md border font-medium transition-all ${
                    templateType === opt.id
                      ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-700 dark:text-teal-300 font-bold ring-1 ring-teal-500'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Columns</span>
                <span className="font-mono">{columns}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setColumns(Math.max(1, columns - 1))}
                  className="p-1.5 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={columns}
                  onChange={(e) => setColumns(Number(e.target.value))}
                  className="w-full accent-teal-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
                <button
                  onClick={() => setColumns(Math.min(6, columns + 1))}
                  className="p-1.5 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Rows</span>
                <span className="font-mono">{rows}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setRows(Math.max(1, rows - 1))}
                  className="p-1.5 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={rows}
                  onChange={(e) => setRows(Number(e.target.value))}
                  className="w-full accent-teal-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
                <button
                  onClick={() => setRows(Math.min(4, rows + 1))}
                  className="p-1.5 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Grid Gap ({gap}px)</span>
            </div>
            <input
              type="range"
              min="4"
              max="32"
              value={gap}
              onChange={(e) => setGap(Number(e.target.value))}
              className="w-full accent-teal-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>

          <div className="bg-slate-900 rounded-lg p-3 text-[11px] font-mono text-teal-300 overflow-x-auto">
            <pre>
              <code>{generatedCss}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
