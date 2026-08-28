import React, { useState } from 'react';
import { GitBranch, GitCommit, GitMerge, RotateCcw, Plus } from 'lucide-react';

interface Commit {
  id: string;
  hash: string;
  msg: string;
  branch: 'main' | 'feature';
  parentId?: string;
}

export const GitFlowVisualizer: React.FC = () => {
  const [commits, setCommits] = useState<Commit[]>([
    { id: '1', hash: 'c1a8f9', msg: 'Initial project boilerplate', branch: 'main' },
    { id: '2', hash: 'e4d7b2', msg: 'Add semantic header & nav', branch: 'main' },
  ]);
  const [activeBranch, setActiveBranch] = useState<'main' | 'feature'>('main');
  const [customMsg, setCustomMsg] = useState('');

  const addCommit = () => {
    const nextNum = commits.length + 1;
    const randHash = Math.random().toString(36).substring(2, 8);
    const msg = customMsg.trim() || (activeBranch === 'main' ? `Update release v1.${nextNum}` : `Build feature component #${nextNum}`);
    const newCommit: Commit = {
      id: String(nextNum),
      hash: randHash,
      msg,
      branch: activeBranch,
    };
    setCommits([...commits, newCommit]);
    setCustomMsg('');
  };

  const mergeBranch = () => {
    const hasFeatureCommits = commits.some((c) => c.branch === 'feature');
    if (!hasFeatureCommits) return;
    const randHash = Math.random().toString(36).substring(2, 8);
    const mergeCommit: Commit = {
      id: String(commits.length + 1),
      hash: randHash,
      msg: 'Merge branch "feature" into main',
      branch: 'main',
    };
    setCommits([...commits, mergeCommit]);
    setActiveBranch('main');
  };

  const resetGraph = () => {
    setCommits([
      { id: '1', hash: 'c1a8f9', msg: 'Initial project boilerplate', branch: 'main' },
      { id: '2', hash: 'e4d7b2', msg: 'Add semantic header & nav', branch: 'main' },
    ]);
    setActiveBranch('main');
  };

  return (
    <div id="git-flow-visualizer" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            Interactive Git Commit & Branch Visualizer
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Create commits, switch branches, and merge pull requests to visualize the Directed Acyclic Graph (DAG).
          </p>
        </div>
        <button
          onClick={resetGraph}
          className="text-xs px-2.5 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Visual Graph */}
        <div className="lg:col-span-8 p-6 bg-slate-950 rounded-xl border border-slate-800 min-h-[300px] overflow-x-auto flex flex-col justify-center">
          <div className="space-y-8">
            {/* Main Branch Track */}
            <div className="flex items-center gap-4 relative">
              <span className="w-20 text-xs font-mono font-bold text-cyan-400">main</span>
              <div className="flex-1 flex items-center gap-3 relative py-2">
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-cyan-500/40 -z-0" />
                {commits
                  .filter((c) => c.branch === 'main')
                  .map((c) => (
                    <div
                      key={c.id}
                      className="relative z-10 group flex flex-col items-center cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 font-mono font-bold text-[10px] flex items-center justify-center shadow-lg shadow-cyan-500/30 transition-transform group-hover:scale-125 border-2 border-white">
                        {c.id}
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300 mt-1">{c.hash}</span>
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 hidden group-hover:block z-20 bg-slate-800 text-white text-[11px] font-sans px-2.5 py-1 rounded shadow-md whitespace-nowrap">
                        {c.msg}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Feature Branch Track */}
            <div className="flex items-center gap-4 relative">
              <span className="w-20 text-xs font-mono font-bold text-pink-400">feature</span>
              <div className="flex-1 flex items-center gap-3 relative py-2">
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-pink-500/40 -z-0" />
                {commits
                  .filter((c) => c.branch === 'feature')
                  .map((c) => (
                    <div
                      key={c.id}
                      className="relative z-10 group flex flex-col items-center cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-full bg-pink-500 text-white font-mono font-bold text-[10px] flex items-center justify-center shadow-lg shadow-pink-500/30 transition-transform group-hover:scale-125 border-2 border-white">
                        {c.id}
                      </div>
                      <span className="text-[10px] font-mono text-pink-300 mt-1">{c.hash}</span>
                      <div className="absolute bottom-full mb-2 hidden group-hover:block z-20 bg-slate-800 text-white text-[11px] font-sans px-2.5 py-1 rounded shadow-md whitespace-nowrap">
                        {c.msg}
                      </div>
                    </div>
                  ))}
                {commits.filter((c) => c.branch === 'feature').length === 0 && (
                  <span className="text-xs text-slate-600 font-mono italic">No commits yet on feature branch</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="lg:col-span-4 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Active Working Branch
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveBranch('main')}
                className={`text-xs py-2 px-3 rounded-lg border font-mono font-bold transition-all ${
                  activeBranch === 'main'
                    ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-500 text-cyan-700 dark:text-cyan-300 ring-1 ring-cyan-500'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                }`}
              >
                main
              </button>
              <button
                onClick={() => setActiveBranch('feature')}
                className={`text-xs py-2 px-3 rounded-lg border font-mono font-bold transition-all ${
                  activeBranch === 'feature'
                    ? 'bg-pink-50 dark:bg-pink-950/60 border-pink-500 text-pink-700 dark:text-pink-300 ring-1 ring-pink-500'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                }`}
              >
                feature
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Commit Message (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. feat: add responsive navbar"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="w-full text-xs p-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div className="space-y-2">
            <button
              onClick={addCommit}
              className="w-full py-2 px-3 rounded-md bg-cyan-600 text-white hover:bg-cyan-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <GitCommit className="w-3.5 h-3.5" /> git commit -m "{customMsg || '...'}"
            </button>

            <button
              onClick={mergeBranch}
              disabled={!commits.some((c) => c.branch === 'feature')}
              className="w-full py-2 px-3 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40"
            >
              <GitMerge className="w-3.5 h-3.5" /> git merge feature into main
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
