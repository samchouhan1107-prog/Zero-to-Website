import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Sparkles, Terminal } from 'lucide-react';

interface DOMNode {
  id: string;
  tag: string;
  className?: string;
  text?: string;
  children?: DOMNode[];
}

const SAMPLE_DOM: DOMNode = {
  id: 'html-root',
  tag: 'html',
  children: [
    {
      id: 'head-node',
      tag: 'head',
      children: [
        { id: 'title-node', tag: 'title', text: 'WZ Storehouse' },
        { id: 'meta-node', tag: 'meta', text: 'charset="UTF-8"' },
      ],
    },
    {
      id: 'body-node',
      tag: 'body',
      children: [
        {
          id: 'header-node',
          tag: 'header',
          className: 'site-header',
          children: [
            { id: 'h1-node', tag: 'h1', text: 'Learn Web Development' },
            {
              id: 'nav-node',
              tag: 'nav',
              children: [
                { id: 'a1-node', tag: 'a', text: 'Chapters' },
                { id: 'a2-node', tag: 'a', text: 'Practice Sandbox' },
              ],
            },
          ],
        },
        {
          id: 'main-node',
          tag: 'main',
          className: 'container',
          children: [
            {
              id: 'article-node',
              tag: 'article',
              className: 'card',
              children: [
                { id: 'h2-node', tag: 'h2', text: 'Interactive Lessons' },
                { id: 'p-node', tag: 'p', text: 'Learn by visual inspection.' },
                { id: 'btn-node', tag: 'button', className: 'btn-primary', text: 'Start Practice' },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const DomTreeVisualizer: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<DOMNode>(SAMPLE_DOM.children![1].children![1].children![0].children![2]); // default button node
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'html-root': true,
    'body-node': true,
    'main-node': true,
    'article-node': true,
    'header-node': true,
  });

  const toggleExpand = (id: string) => {
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderTree = (node: DOMNode, depth = 0) => {
    const isExpanded = expandedNodes[node.id];
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedNode?.id === node.id;

    return (
      <div key={node.id} className="text-xs font-mono select-none">
        <div
          onClick={() => setSelectedNode(node)}
          className={`flex items-center gap-1.5 py-1 px-2 rounded cursor-pointer transition-colors ${
            isSelected
              ? 'bg-amber-500/20 text-amber-900 dark:text-amber-200 font-bold border border-amber-500/40'
              : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
          }`}
          style={{ paddingLeft: `${depth * 14 + 6}px` }}
        >
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(node.id);
              }}
              className="p-0.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
            >
              {isExpanded ? <ChevronDown className="w-3 h-3 text-slate-400" /> : <ChevronRight className="w-3 h-3 text-slate-400" />}
            </button>
          ) : (
            <span className="w-3.5" />
          )}
          <span className="text-purple-600 dark:text-purple-400 font-bold">&lt;{node.tag}&gt;</span>
          {node.className && <span className="text-emerald-600 dark:text-emerald-400">.{node.className}</span>}
          {node.text && <span className="text-slate-400 truncate max-w-[140px]">"{node.text}"</span>}
        </div>

        {hasChildren && isExpanded && (
          <div className="border-l border-slate-200 dark:border-slate-800 ml-4">
            {node.children!.map((child) => renderTree(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div id="dom-tree-visualizer" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          Interactive Document Object Model (DOM) Tree Explorer
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Click any branch in the DOM tree hierarchy to inspect its node properties, parents, and live JavaScript selectors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left: Interactive Tree */}
        <div className="lg:col-span-6 p-4 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 max-h-[360px] overflow-y-auto">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            DOM Hierarchy Tree
          </div>
          {renderTree(SAMPLE_DOM)}
        </div>

        {/* Right: Inspector Details */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40">
            <div className="flex items-center justify-between pb-2 border-b border-amber-200/60 dark:border-amber-800/40">
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Selected Node: &lt;{selectedNode.tag}&gt;
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-800/50 text-amber-900 dark:text-amber-200 font-mono">
                id: #{selectedNode.id}
              </span>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">HTML Tag:</span>
                <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{selectedNode.tag.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Class Name:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">{selectedNode.className || 'None'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Child Elements:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{selectedNode.children?.length || 0} node(s)</span>
              </div>
              {selectedNode.text && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Text Content:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300 truncate max-w-[200px]">"{selectedNode.text}"</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              JavaScript Query Selector
            </label>
            <div className="bg-slate-900 rounded-lg p-3 text-xs font-mono text-amber-300">
              <code>{`const el = document.querySelector("${selectedNode.className ? `.${selectedNode.className}` : `#${selectedNode.id}`}");\nel.addEventListener("click", () => {\n  console.log("Clicked <${selectedNode.tag}>!");\n});`}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
