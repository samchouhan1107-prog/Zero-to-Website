import React, { useState } from 'react';
import {
  Terminal,
  Eye,
  RefreshCw,
  ArrowRight,
  Monitor,
  Cpu,
  CheckCircle2,
  FileCode,
  Network,
} from 'lucide-react';

export const DevToolsVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'elements' | 'console' | 'network'>('elements');
  const [selectedNode, setSelectedNode] = useState<'h1' | 'button' | 'badge'>('h1');
  const [h1Color, setH1Color] = useState<string>('#38bdf8');
  const [btnText, setBtnText] = useState<string>('Click to Inspect');
  const [consoleLogs, setConsoleLogs] = useState<Array<{ type: 'input' | 'output' | 'error'; text: string }>>([
    { type: 'input', text: 'console.log("DevTools REPL Connected");' },
    { type: 'output', text: 'DevTools REPL Connected' },
    { type: 'input', text: 'document.querySelector("h1").textContent' },
    { type: 'output', text: '"WebZone Interactive Studio"' },
  ]);
  const [consoleInput, setConsoleInput] = useState('');
  const [depthStage, setDepthStage] = useState<'simple' | 'structured' | 'practical'>('simple');

  const executeConsoleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    const newLogs = [...consoleLogs, { type: 'input' as const, text: trimmed }];

    if (trimmed.includes('console.log')) {
      const match = trimmed.match(/console\.log\((.*)\)/);
      const val = match ? match[1].replace(/['"]/g, '') : 'undefined';
      newLogs.push({ type: 'output', text: val });
    } else if (trimmed.includes('2 + 2')) {
      newLogs.push({ type: 'output', text: '4' });
    } else if (trimmed.includes('h1') && trimmed.includes('color')) {
      setH1Color('#22c55e');
      newLogs.push({ type: 'output', text: 'DOM mutated: h1.style.color = "#22c55e"' });
    } else if (trimmed.includes('button') || trimmed.includes('textContent')) {
      setBtnText('Updated via Console!');
      newLogs.push({ type: 'output', text: '"Updated via Console!"' });
    } else {
      try {
        // Safe evaluation simulation
        newLogs.push({ type: 'output', text: `Evaluated: ${trimmed}` });
      } catch {
        newLogs.push({ type: 'error', text: 'Uncaught SyntaxError' });
      }
    }
    setConsoleLogs(newLogs);
    setConsoleInput('');
  };

  const resetAll = () => {
    setH1Color('#38bdf8');
    setBtnText('Click to Inspect');
    setSelectedNode('h1');
    setConsoleLogs([
      { type: 'input', text: 'console.log("DevTools REPL Connected");' },
      { type: 'output', text: 'DevTools REPL Connected' },
    ]);
  };

  return (
    <div id="devtools-visualizer" className="panel-surface min-w-0 overflow-hidden p-5 sm:p-6 space-y-6">
      {/* Header & Concept Standard Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-app-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-cyan-400">
              CONCEPT: DEVTOOLS INSPECTION LOOP
            </span>
            <span className="font-mono text-xs text-app-subtle">Ch 01 Diagnostic Tool</span>
          </div>
          <h3 className="text-lg font-bold text-app-ink flex items-center gap-2 mt-1">
            <Terminal className="w-5 h-5 text-cyan-400" />
            Browser DevTools &amp; Live DOM/CSS Inspector
          </h3>
          <p className="text-xs text-app-muted">
            Visualize how Chrome/Firefox DevTools inspect and manipulate the live DOM in RAM without altering disk files.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetAll}
            className="text-xs px-2.5 py-1.5 rounded-md border border-app-border bg-app-inset text-app-muted hover:text-app-ink flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset State</span>
          </button>
        </div>
      </div>

      {/* Standard Step-by-Step Concept Pipeline: Input -> Process -> Output */}
      <div className="rounded-xl border border-app-border bg-app-inset p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-app-ink flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            How DevTools Works: Architectural Flow
          </span>
          <div className="flex items-center gap-1 text-[10px] font-mono">
            {(['simple', 'structured', 'practical'] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setDepthStage(lvl)}
                className={`px-2 py-0.5 rounded capitalize font-bold cursor-pointer transition-colors ${
                  depthStage === lvl
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
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
            <div className="text-[10px] text-cyan-400 font-bold uppercase">1. Live Viewport (Input)</div>
            <p className="text-[11px] text-app-muted">
              {depthStage === 'simple'
                ? 'User or test triggers an inspection on a rendered UI element.'
                : 'Clicking any element on the page highlights its bounding client box in the browser render tree.'}
            </p>
          </div>
          <div className="rounded-lg border border-app-border bg-app-surface p-2.5 space-y-1">
            <div className="text-[10px] text-amber-400 font-bold uppercase">2. DevTools Engine (Process)</div>
            <p className="text-[11px] text-app-muted">
              {depthStage === 'simple'
                ? 'DevTools queries in-memory DOM & CSSOM nodes in RAM.'
                : 'Calculates cascaded & inherited CSS specificity rules for the active element node.'}
            </p>
          </div>
          <div className="rounded-lg border border-app-border bg-app-surface p-2.5 space-y-1">
            <div className="text-[10px] text-emerald-400 font-bold uppercase">3. Real-time Mutate (Output)</div>
            <p className="text-[11px] text-app-muted">
              {depthStage === 'simple'
                ? 'Editing styles or typing in console instantly mutates screen pixels.'
                : 'Applies hot runtime patches directly in browser RAM before persisting to disk files.'}
            </p>
          </div>
        </div>
      </div>

      {/* Simulated DevTools Split Window */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Simulated Web Page Viewport */}
        <div className="lg:col-span-5 rounded-xl border border-app-border bg-app-inset overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-3 py-2 bg-app-surface border-b border-app-border text-xs">
            <div className="flex items-center gap-2">
              <Monitor className="w-3.5 h-3.5 text-app-muted" />
              <span className="font-mono text-[11px] font-bold text-app-ink">Simulated Viewport</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Live RAM Render
            </span>
          </div>

          <div className="p-6 flex-1 flex flex-col items-center justify-center space-y-4 text-center">
            <div
              onClick={() => setSelectedNode('badge')}
              className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold cursor-pointer transition-all ${
                selectedNode === 'badge'
                  ? 'ring-2 ring-cyan-400 bg-cyan-500/20 text-cyan-300'
                  : 'bg-app-surface border border-app-border text-app-muted hover:border-cyan-500/40'
              }`}
            >
              &lt;span id=&quot;badge&quot;&gt;Chapter 01 Lab&lt;/span&gt;
            </div>

            <h1
              onClick={() => setSelectedNode('h1')}
              style={{ color: h1Color }}
              className={`text-xl sm:text-2xl font-black cursor-pointer p-2 rounded transition-all ${
                selectedNode === 'h1' ? 'ring-2 ring-cyan-400 bg-cyan-500/10' : 'hover:bg-app-surface'
              }`}
            >
              WebZone Interactive Studio
            </h1>

            <button
              type="button"
              onClick={() => {
                setSelectedNode('button');
                executeConsoleCommand('button.click()');
              }}
              className={`px-4 py-2 rounded-lg font-bold text-xs cursor-pointer transition-all shadow-sm ${
                selectedNode === 'button'
                  ? 'ring-2 ring-cyan-400 bg-indigo-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              {btnText}
            </button>

            <p className="text-[11px] text-app-subtle max-w-xs leading-relaxed">
              💡 Click any element above to select it in the DevTools Elements tree on the right!
            </p>
          </div>
        </div>

        {/* Right Simulated DevTools Panel */}
        <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-[#0f1117] overflow-hidden flex flex-col font-mono text-xs shadow-lg">
          {/* DevTools Top Tab Rail */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#181a24] border-b border-slate-800">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('elements')}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'elements' ? 'bg-[#252836] text-cyan-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> Elements
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('console')}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'console' ? 'bg-[#252836] text-cyan-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" /> Console
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('network')}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'network' ? 'bg-[#252836] text-cyan-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Network className="w-3.5 h-3.5" /> Network
              </button>
            </div>
            <span className="text-[10px] text-slate-500">DevTools v1.0</span>
          </div>

          {/* TAB CONTENT: ELEMENTS */}
          {activeTab === 'elements' && (
            <div className="p-4 space-y-4">
              <div className="text-[11px] text-slate-400">
                // Live DOM Tree (Click node to inspect styles)
              </div>
              <div className="space-y-1 bg-[#13151f] p-3 rounded-lg border border-slate-800 text-slate-300 leading-relaxed">
                <div className="text-slate-500">&lt;!DOCTYPE html&gt;</div>
                <div className="text-slate-500">&lt;html lang=&quot;en&quot;&gt;</div>
                <div className="pl-4 text-slate-500">&lt;body&gt;</div>
                <div
                  onClick={() => setSelectedNode('badge')}
                  className={`pl-8 cursor-pointer rounded px-1 transition-colors ${
                    selectedNode === 'badge' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'hover:bg-slate-800'
                  }`}
                >
                  &lt;span id=&quot;badge&quot;&gt;Chapter 01 Lab&lt;/span&gt;
                </div>
                <div
                  onClick={() => setSelectedNode('h1')}
                  className={`pl-8 cursor-pointer rounded px-1 transition-colors ${
                    selectedNode === 'h1' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'hover:bg-slate-800'
                  }`}
                >
                  &lt;h1 style=&quot;color: {h1Color}&quot;&gt;WebZone Interactive Studio&lt;/h1&gt;
                </div>
                <div
                  onClick={() => setSelectedNode('button')}
                  className={`pl-8 cursor-pointer rounded px-1 transition-colors ${
                    selectedNode === 'button' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'hover:bg-slate-800'
                  }`}
                >
                  &lt;button id=&quot;cta-btn&quot;&gt;{btnText}&lt;/button&gt;
                </div>
                <div className="pl-4 text-slate-500">&lt;/body&gt;</div>
                <div className="text-slate-500">&lt;/html&gt;</div>
              </div>

              {/* Styles Panel for Selected Node */}
              <div className="rounded-lg border border-slate-800 bg-[#13151f] p-3 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
                  <span className="font-bold text-cyan-300">Styles Cascade ({selectedNode})</span>
                  <span className="text-[10px]">element.style</span>
                </div>

                {selectedNode === 'h1' && (
                  <div className="space-y-2 pt-1 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-pink-400">color:</span>
                      <div className="flex items-center gap-2">
                        {['#38bdf8', '#22c55e', '#f59e0b', '#ec4899'].map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setH1Color(c)}
                            style={{ backgroundColor: c }}
                            className={`w-4 h-4 rounded-full border cursor-pointer ${
                              h1Color === c ? 'ring-2 ring-white' : 'border-slate-700'
                            }`}
                          />
                        ))}
                        <span className="text-slate-300">{h1Color};</span>
                      </div>
                    </div>
                    <div className="text-slate-500">font-weight: 900;</div>
                  </div>
                )}

                {selectedNode === 'button' && (
                  <div className="space-y-1 pt-1 text-[11px]">
                    <div className="text-pink-400">background-color: #4f46e5;</div>
                    <div className="text-pink-400">border-radius: 8px;</div>
                    <div className="text-slate-400 pt-1">
                      // Try clicking the button on the left or type in console tab!
                    </div>
                  </div>
                )}

                {selectedNode === 'badge' && (
                  <div className="space-y-1 pt-1 text-[11px]">
                    <div className="text-pink-400">font-family: monospace;</div>
                    <div className="text-pink-400">text-transform: uppercase;</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB CONTENT: CONSOLE */}
          {activeTab === 'console' && (
            <div className="p-4 space-y-3 flex-1 flex flex-col">
              <div className="flex flex-wrap gap-1.5 pb-2 border-b border-slate-800">
                <span className="text-[10px] text-slate-500 self-center mr-1">Quick Run:</span>
                <button
                  type="button"
                  onClick={() => executeConsoleCommand('console.log("Status: OK")')}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] cursor-pointer"
                >
                  console.log()
                </button>
                <button
                  type="button"
                  onClick={() => executeConsoleCommand('h1.style.color = "#22c55e"')}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[10px] cursor-pointer"
                >
                  h1.style.color
                </button>
                <button
                  type="button"
                  onClick={() => executeConsoleCommand('2 + 2')}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-[10px] cursor-pointer"
                >
                  2 + 2
                </button>
              </div>

              <div className="space-y-1.5 flex-1 overflow-y-auto max-h-[160px] bg-[#13151f] p-3 rounded-lg border border-slate-800 text-[11px]">
                {consoleLogs.map((log, lIdx) => (
                  <div
                    key={lIdx}
                    className={`flex items-start gap-1.5 ${
                      log.type === 'input'
                        ? 'text-cyan-300'
                        : log.type === 'error'
                        ? 'text-rose-400'
                        : 'text-slate-300'
                    }`}
                  >
                    <span className="text-slate-600 shrink-0">{log.type === 'input' ? '>' : '<'}</span>
                    <span className="break-all">{log.text}</span>
                  </div>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  executeConsoleCommand(consoleInput);
                }}
                className="flex items-center gap-2 pt-1"
              >
                <span className="text-cyan-400 font-bold">&gt;</span>
                <input
                  type="text"
                  value={consoleInput}
                  onChange={(e) => setConsoleInput(e.target.value)}
                  placeholder="Type JS expression or console command..."
                  className="flex-1 bg-[#13151f] border border-slate-800 rounded px-2.5 py-1 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-bold cursor-pointer"
                >
                  Run
                </button>
              </form>
            </div>
          )}

          {/* TAB CONTENT: NETWORK */}
          {activeTab === 'network' && (
            <div className="p-4 space-y-3">
              <div className="text-[11px] text-slate-400">
                // Simulated Network Waterfall (Status, Protocol &amp; Latency)
              </div>
              <div className="border border-slate-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-[#181a24] text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-2">Name</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Type</th>
                      <th className="p-2">Size</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="p-2 text-cyan-300 flex items-center gap-1">
                        <FileCode className="w-3 h-3" /> index.html
                      </td>
                      <td className="p-2 text-emerald-400">200 OK</td>
                      <td className="p-2 text-slate-400">document</td>
                      <td className="p-2">1.8 KB</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-cyan-300 flex items-center gap-1">
                        <FileCode className="w-3 h-3" /> style.css
                      </td>
                      <td className="p-2 text-emerald-400">200 OK</td>
                      <td className="p-2 text-slate-400">stylesheet</td>
                      <td className="p-2">4.2 KB</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-cyan-300 flex items-center gap-1">
                        <FileCode className="w-3 h-3" /> script.js
                      </td>
                      <td className="p-2 text-emerald-400">200 OK</td>
                      <td className="p-2 text-slate-400">script</td>
                      <td className="p-2">3.1 KB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Concept Check / Reasoning Callout */}
      <div className="p-3.5 rounded-xl border border-cyan-500/20 bg-cyan-500/5 text-xs text-app-ink flex items-start gap-3">
        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-app-ink font-bold block mb-0.5">
            Key Mental Model · The Browser RAM Loop:
          </strong>
          <p className="text-app-muted leading-relaxed">
            When you change CSS in DevTools or mutate text in the Console, you are editing the in-memory parsed DOM in your local computer's RAM. The moment you refresh the page, the original HTML/CSS files are re-downloaded unless you save your edits back to your local VS Code workspace.
          </p>
        </div>
      </div>
    </div>
  );
};
