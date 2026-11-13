import React, { useState } from 'react';
import { Layout, Plus, Trash2, Copy, Check, RotateCcw } from 'lucide-react';

export const FlexboxVisualizer: React.FC = () => {
  const [flexDirection, setFlexDirection] = useState<'row' | 'row-reverse' | 'column' | 'column-reverse'>('row');
  const [justifyContent, setJustifyContent] = useState<string>('space-between');
  const [alignItems, setAlignItems] = useState<string>('center');
  const [flexWrap, setFlexWrap] = useState<'nowrap' | 'wrap' | 'wrap-reverse'>('nowrap');
  const [gap, setGap] = useState<number>(12);
  const [items, setItems] = useState([
    { id: 1, label: 'Item 1', color: 'bg-indigo-500' },
    { id: 2, label: 'Item 2', color: 'bg-violet-500' },
    { id: 3, label: 'Item 3', color: 'bg-purple-500' },
  ]);
  const [copied, setCopied] = useState(false);

  const addItem = () => {
    if (items.length >= 8) return;
    const colors = ['bg-indigo-500', 'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500', 'bg-pink-500', 'bg-rose-500'];
    const nextId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    setItems([...items, { id: nextId, label: `Item ${nextId}`, color: colors[nextId % colors.length] }]);
  };

  const removeItem = (id: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((item) => item.id !== id));
  };

  const copyCSS = () => {
    const code = `.flex-container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
  gap: ${gap}px;
}`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="flexbox-visualizer" className="panel-surface min-w-0 overflow-hidden p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layout className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            Interactive Flexbox Alignment Studio
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Observe the Main Axis and Cross Axis reflow in real-time as you toggle layout properties.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={addItem}
            disabled={items.length >= 8}
            className="text-xs px-2.5 py-1.5 rounded-md bg-violet-50 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 hover:bg-violet-100 flex items-center gap-1 font-medium disabled:opacity-50"
          >
            <Plus className="w-3.5 h-3.5" /> Add Box
          </button>
          <button
            onClick={copyCSS}
            className="text-xs px-3 py-1.5 rounded-md bg-violet-600 text-white hover:bg-violet-700 flex items-center gap-1 font-medium transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy CSS'}
          </button>
        </div>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-6 mt-6 lg:grid-cols-12">
        {/* Visual Stage */}
        <div className="lg:col-span-7 flex flex-col justify-between p-4 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 min-h-[360px]">
          {/* Axis Indicator Banner */}
          <div className="flex items-center justify-between text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 pb-2 border-b border-dashed border-slate-200 dark:border-slate-800">
            <span>
              Main Axis: <strong className="text-violet-600 dark:text-violet-400">{flexDirection.includes('column') ? 'Vertical ↕' : 'Horizontal ↔'}</strong>
            </span>
            <span>
              Cross Axis: <strong className="text-indigo-600 dark:text-indigo-400">{flexDirection.includes('column') ? 'Horizontal ↔' : 'Vertical ↕'}</strong>
            </span>
          </div>

          {/* Active Flex Container */}
          <div
            className="flex-1 my-3 p-4 rounded-lg bg-white dark:bg-slate-900 border-2 border-dashed border-violet-400/60 min-h-[220px] transition-all duration-300"
            style={{
              display: 'flex',
              flexDirection,
              justifyContent,
              alignItems,
              flexWrap,
              gap: `${gap}px`,
            }}
          >
            {items.map((item, idx) => (
              <div
                key={item.id}
                className={`${item.color} text-white font-mono text-xs font-bold rounded-lg p-3 shadow-md flex items-center justify-between gap-2 min-w-[70px] min-h-[50px] transition-all duration-200 hover:scale-105 select-none`}
              >
                <span>{item.label}</span>
                {items.length > 1 && (
                  <button
                    onClick={() => removeItem(item.id)}
                    className="opacity-70 hover:opacity-100 hover:text-red-200 transition-opacity"
                    title="Remove item"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="text-center text-xs text-slate-400">
            Container active with {items.length} flex items
          </div>
        </div>

        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-3.5">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              flex-direction (Main Axis Direction)
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {(['row', 'row-reverse', 'column', 'column-reverse'] as const).map((dir) => (
                <button
                  key={dir}
                  onClick={() => setFlexDirection(dir)}
                  className={`text-xs py-1.5 px-2 rounded-md border font-mono transition-all ${
                    flexDirection === dir
                      ? 'bg-violet-50 dark:bg-violet-950/60 border-violet-500 text-violet-700 dark:text-violet-300 font-bold ring-1 ring-violet-500'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {dir}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              justify-content (Main Axis Distribution)
            </label>
            <select
              value={justifyContent}
              onChange={(e) => setJustifyContent(e.target.value)}
              className="w-full text-xs font-mono p-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="flex-start">flex-start (Start edge)</option>
              <option value="center">center (Packed in middle)</option>
              <option value="flex-end">flex-end (End edge)</option>
              <option value="space-between">space-between (Edges pushed out)</option>
              <option value="space-around">space-around (Equal surrounding space)</option>
              <option value="space-evenly">space-evenly (Exact equal gaps)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              align-items (Cross Axis Alignment)
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {['flex-start', 'center', 'flex-end', 'stretch', 'baseline'].map((align) => (
                <button
                  key={align}
                  onClick={() => setAlignItems(align)}
                  className={`text-xs py-1.5 px-1.5 rounded-md border font-mono truncate transition-all ${
                    alignItems === align
                      ? 'bg-violet-50 dark:bg-violet-950/60 border-violet-500 text-violet-700 dark:text-violet-300 font-bold ring-1 ring-violet-500'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {align}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              <span>gap ({gap}px)</span>
            </div>
            <input
              type="range"
              min="0"
              max="32"
              value={gap}
              onChange={(e) => setGap(Number(e.target.value))}
              className="w-full accent-violet-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>

          <div className="bg-slate-900 rounded-lg p-3 text-[11px] font-mono text-violet-300 overflow-x-auto">
            <pre>
              <code>{`display: flex;\nflex-direction: ${flexDirection};\njustify-content: ${justifyContent};\nalign-items: ${alignItems};\ngap: ${gap}px;`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
