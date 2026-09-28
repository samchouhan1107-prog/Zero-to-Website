import React, { useState, useEffect } from 'react';
import {
  Keyboard,
  X,
  Sparkles,
  Command,
  Search,
  BookOpen,
  Code2,
  Terminal,
  Zap,
  Lightbulb,
  Check,
  Flame,
  ArrowRight,
} from 'lucide-react';

interface ShortcutKeysModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutItem {
  id: string;
  keys: string[];
  name: string;
  description: string;
  category: 'workspace' | 'vscode' | 'devtools' | 'navigation';
  realLifeTip: string;
  mnemonicAnchor: string;
  timeSavedPerDay: string;
}

const SHORTCUT_ITEMS: ShortcutItem[] = [
  // Navigation & Search
  {
    id: 'search-modal',
    keys: ['Ctrl', 'K'],
    name: 'Universal Search & Curriculum Finder',
    description: 'Instantly jump to any lesson, concept, visualizer, or cheat sheet without touching the mouse.',
    category: 'navigation',
    realLifeTip: 'Standardized across Slack, GitHub, VS Code, and browser address bars. Never click a search bar manually.',
    mnemonicAnchor: 'K = Knowledge Finder',
    timeSavedPerDay: '8 mins / day',
  },
  {
    id: 'shortcut-cheatsheet',
    keys: ['?'],
    name: 'Open Shortcuts & Muscle Memory Guide',
    description: 'Toggle this interactive shortcut guide anytime from anywhere in the app.',
    category: 'navigation',
    realLifeTip: 'Supported on YouTube, Gmail, GitHub, and Twitter to quickly recall application hotkeys.',
    mnemonicAnchor: '? = Need help / Query',
    timeSavedPerDay: '3 mins / day',
  },
  {
    id: 'escape-key',
    keys: ['Esc'],
    name: 'Dismiss Any Modal or Dropdown',
    description: 'Close active overlays, search modals, and tutors instantly to restore primary viewport focus.',
    category: 'navigation',
    realLifeTip: 'Keeps your hands glued to the home row without searching for the tiny "X" close button.',
    mnemonicAnchor: 'Escape = Immediate safe exit',
    timeSavedPerDay: '5 mins / day',
  },

  // VS Code & Code Editing Secrets
  {
    id: 'move-line',
    keys: ['Alt', '↑ / ↓'],
    name: 'Move Line Up or Down',
    description: 'Reorders current line or selected block without tedious cut, paste, and line-break fixing.',
    category: 'vscode',
    realLifeTip: 'Used dozens of times daily when reordering CSS properties, HTML tags, or array items.',
    mnemonicAnchor: 'Alt = Alternate position',
    timeSavedPerDay: '15 mins / day',
  },
  {
    id: 'multi-cursor',
    keys: ['Ctrl', 'D'],
    name: 'Add Next Matching Selection (Multi-Cursor)',
    description: 'Selects the next occurrence of the highlighted word, letting you rename multiple variables simultaneously.',
    category: 'vscode',
    realLifeTip: 'Far safer and faster than a global search & replace for localized variable renaming.',
    mnemonicAnchor: 'D = Duplicate selection',
    timeSavedPerDay: '18 mins / day',
  },
  {
    id: 'toggle-comment',
    keys: ['Ctrl', '/'],
    name: 'Toggle Line Comment On / Off',
    description: 'Instantly comments out or re-enables code during debugging without typing // or <!-- -->.',
    category: 'vscode',
    realLifeTip: 'Quickest way to test code variations by temporarily disabling suspect logic lines.',
    mnemonicAnchor: '/ = Slash through the line',
    timeSavedPerDay: '10 mins / day',
  },
  {
    id: 'format-document',
    keys: ['Shift', 'Alt', 'F'],
    name: 'Format Code & Align Indentation',
    description: 'Runs Prettier auto-formatting across the current file, instantly snapping messy code into clean shape.',
    category: 'vscode',
    realLifeTip: 'Stop manually adjusting spaces and tabs. Hit this once before saving or committing git changes.',
    mnemonicAnchor: 'F = Format cleanly',
    timeSavedPerDay: '12 mins / day',
  },

  // Browser DevTools Mastery
  {
    id: 'open-devtools',
    keys: ['F12'],
    name: 'Toggle Browser Developer Tools',
    description: 'Opens the Elements inspector, Console logs, Network waterfall, and responsive device toolbar.',
    category: 'devtools',
    realLifeTip: 'Professional frontend engineers keep DevTools open 100% of the time during active coding.',
    mnemonicAnchor: 'F12 = Frontend Diagnostic Dock',
    timeSavedPerDay: '20 mins / day',
  },
  {
    id: 'inspect-element',
    keys: ['Ctrl', 'Shift', 'C'],
    name: 'Inspect Element Cursor',
    description: 'Turns your cursor into an element scanner to jump straight to a button or header’s CSS box model.',
    category: 'devtools',
    realLifeTip: 'Hover over any strange layout glitch to see the exact margin, padding, or flexbox container.',
    mnemonicAnchor: 'C = Cursor Inspector',
    timeSavedPerDay: '14 mins / day',
  },
  {
    id: 'clear-console',
    keys: ['Ctrl', 'L'],
    name: 'Clear Console Screen',
    description: 'Wipes accumulated logs and warnings from the terminal or browser console for a fresh debugging slate.',
    category: 'devtools',
    realLifeTip: 'Matches the standard Unix/Linux terminal shortcut clear command.',
    mnemonicAnchor: 'L = Wipe slate Clean',
    timeSavedPerDay: '6 mins / day',
  },

  // WebZoneBW Learning Controls
  {
    id: 'open-tutor',
    keys: ['T'],
    name: 'Summon 24/7 AI Tutor Assistant',
    description: 'Directly opens the interactive tutor for instant code explanations and real-time guidance.',
    category: 'workspace',
    realLifeTip: 'Whenever you hit an ambiguous concept, summon your tutor without breaking reading concentration.',
    mnemonicAnchor: 'T = Tutor on demand',
    timeSavedPerDay: '10 mins / day',
  },
  {
    id: 'open-roadmap',
    keys: ['M'],
    name: 'View Milestones & Stepping Stones',
    description: 'Opens your XP progression map and brain understanding stones roadmap.',
    category: 'workspace',
    realLifeTip: 'Check your technical progression and unlocked milestones regularly to stay motivated.',
    mnemonicAnchor: 'M = Milestones & Mastery',
    timeSavedPerDay: '4 mins / day',
  },
];

export const ShortcutKeysModal: React.FC<ShortcutKeysModalProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'navigation' | 'vscode' | 'devtools' | 'workspace'>('all');
  const [activePressedKey, setActivePressedKey] = useState<string | null>(null);
  const [recentKeyFeedback, setRecentKeyFeedback] = useState<string | null>(null);

  // Live keypress listener to illuminate keys on screen
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if inside an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const keyName = e.key.toUpperCase();
      setActivePressedKey(keyName);
      setRecentKeyFeedback(`Key detected: ${e.key} ${e.ctrlKey ? '(+ Ctrl)' : ''} ${e.altKey ? '(+ Alt)' : ''}`);

      const timer = setTimeout(() => {
        setActivePressedKey(null);
      }, 400);

      return () => clearTimeout(timer);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredItems = activeCategory === 'all'
    ? SHORTCUT_ITEMS
    : SHORTCUT_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center shadow-inner">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                  Long-Term Shortcut Keys &amp; Muscle Memory Gym
                </h3>
                <span className="hidden sm:inline-flex rounded-full bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400">
                  Save 80+ Hours/Year
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Cognitive muscle memory anchors to code at the speed of thought without mouse friction.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Close shortcuts guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cognitive Science Intro Banner */}
        <div className="p-4 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-2.5 max-w-2xl">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>The Flow State Rule:</strong> Every time you lift your hand from the keyboard to grab the mouse, your brain pays a 1.2-second context-switching penalty. Storing these 10 shortcuts into your motor cortex protects deep programming flow.
            </p>
          </div>
          {recentKeyFeedback && (
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 animate-pulse">
              ⚡ {recentKeyFeedback}
            </span>
          )}
        </div>

        {/* Category Tabs */}
        <div className="px-4 pt-3 pb-2 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-1.5 bg-slate-50/50 dark:bg-slate-900/50">
          {[
            { id: 'all', label: 'All Shortcuts' },
            { id: 'navigation', label: 'Universal Navigation' },
            { id: 'vscode', label: 'VS Code Secrets' },
            { id: 'devtools', label: 'DevTools Inspection' },
            { id: 'workspace', label: 'WebZoneBW Keys' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Shortcuts List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/60 p-4 space-y-3 transition-all hover:border-blue-500/40 hover:shadow-sm"
              >
                {/* Header with 3D Keycaps */}
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {item.name}
                  </span>
                  
                  {/* Animated Keycaps */}
                  <div className="flex items-center gap-1 shrink-0">
                    {item.keys.map((k, kIdx) => {
                      const isPressed = activePressedKey === k.toUpperCase();
                      return (
                        <kbd
                          key={kIdx}
                          className={`inline-flex items-center justify-center min-w-[28px] h-7 px-2 font-mono text-xs font-black rounded-md border transition-all duration-150 shadow-xs ${
                            isPressed
                              ? 'bg-blue-600 border-blue-400 text-white scale-95 shadow-inner'
                              : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 border-b-2'
                          }`}
                        >
                          {k}
                        </kbd>
                      );
                    })}
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Real-Life Tip & Mnemonic */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 space-y-1 text-[11px]">
                  <div className="flex items-start gap-1.5 text-blue-600 dark:text-blue-400">
                    <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span><strong>Mnemonic:</strong> {item.mnemonicAnchor}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-500 dark:text-slate-400">
                    <Zap className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-500" />
                    <span><strong>Real-Life Tip:</strong> {item.realLifeTip}</span>
                  </div>
                </div>

                {/* Time Saved Metric */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
                  <span>Muscle Memory Metric</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">⚡ {item.timeSavedPerDay}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-500" />
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] font-bold">?</kbd> anywhere on the page to open this cheatsheet.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Got It, Back to Code
          </button>
        </div>
      </div>
    </div>
  );
};
