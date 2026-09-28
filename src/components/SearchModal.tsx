import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Code2, Layers, ArrowRight, Wrench, Sparkles, Terminal, Activity, FileText } from 'lucide-react';
import { Chapter } from '../utils/types';

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: Chapter[];
  onSelectLesson: (lessonId: string) => void;
  onNavigatePractice?: () => void;
  onNavigateVisualLab?: (toolId?: string) => void;
  onNavigateActivities?: () => void;
  onOpenTutor?: () => void;
  initialQuery?: string;
}

interface SearchItem {
  id: string;
  type: 'tool' | 'lesson' | 'chapter' | 'resource';
  title: string;
  subtitle: string;
  category: string;
  lessonId?: string;
  onAction?: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  chapters,
  onSelectLesson,
  onNavigatePractice,
  onNavigateVisualLab,
  onNavigateActivities,
  onOpenTutor,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, initialQuery]);

  // Build searchable index
  const allItems: SearchItem[] = [
    // Web Tools
    {
      id: 'tool-sandbox',
      type: 'tool',
      title: 'Interactive Web REPL Sandbox',
      subtitle: 'Build and test HTML, CSS, and JavaScript with instant live preview and syntax checking.',
      category: 'Web Tools',
      onAction: onNavigatePractice,
    },
    {
      id: 'tool-dom',
      type: 'tool',
      title: 'DOM Tree Inspector',
      subtitle: 'Inspect live HTML nodes, element hierarchies, and parent-child document tree structures.',
      category: 'Web Tools',
      onAction: onNavigateVisualLab ? () => onNavigateVisualLab('dom') : undefined,
    },
    {
      id: 'tool-http',
      type: 'tool',
      title: 'HTTP & DNS Flow Trace',
      subtitle: 'Visualize client-server lifecycle, DNS lookups, TCP handshakes, and asset request pipelines.',
      category: 'Web Tools',
      onAction: onNavigateVisualLab ? () => onNavigateVisualLab('net') : undefined,
    },

    // Image Tools
    {
      id: 'tool-box-model',
      type: 'tool',
      title: 'CSS Box Model Visualizer',
      subtitle: 'Inspect margin, border, padding, and content dimensions with interactive controls.',
      category: 'Image Tools',
      onAction: onNavigateVisualLab ? () => onNavigateVisualLab('box') : undefined,
    },
    {
      id: 'tool-responsive',
      type: 'tool',
      title: 'Responsive Viewport & CSS Media Previewer',
      subtitle: 'Test how fluid interfaces scale across mobile, tablet, and widescreen breakpoints.',
      category: 'Image Tools',
      onAction: onNavigatePractice,
    },

    // Developer Tools
    {
      id: 'tool-flexbox',
      type: 'tool',
      title: 'Flexbox Studio',
      subtitle: 'Explore 1D main and cross-axis alignment, flex-grow, flex-shrink, and wrap rules.',
      category: 'Developer Tools',
      onAction: onNavigateVisualLab ? () => onNavigateVisualLab('flex') : undefined,
    },
    {
      id: 'tool-grid',
      type: 'tool',
      title: 'CSS Grid Matrix Workbench',
      subtitle: 'Two-dimensional grid template areas, fractional units, and auto-fit responsive tracks.',
      category: 'Developer Tools',
      onAction: onNavigateVisualLab ? () => onNavigateVisualLab('grid') : undefined,
    },
    {
      id: 'tool-git',
      type: 'tool',
      title: 'Git Commit DAG Flow',
      subtitle: 'Visualize Git branches, commit parent trees, merge flows, and head pointers.',
      category: 'Developer Tools',
      onAction: onNavigateVisualLab ? () => onNavigateVisualLab('git') : undefined,
    },

    // Utilities & Resources
    {
      id: 'res-tutor',
      type: 'resource',
      title: 'Developer AI Code Tutor',
      subtitle: 'Ask targeted questions, debug tricky code snippets, and master web standards.',
      category: 'Utilities',
      onAction: onOpenTutor,
    },
    {
      id: 'res-drills',
      type: 'resource',
      title: 'Recall Drills & Bug Hunt Puzzles',
      subtitle: 'Spot syntax errors, unscramble code sequences, and test knowledge with speed flashcards.',
      category: 'Utilities',
      onAction: onNavigateActivities,
    },
  ];

  // Index chapters & lessons
  chapters.forEach((ch) => {
    allItems.push({
      id: ch.id,
      type: 'chapter',
      title: `Ch ${ch.number}: ${ch.title}`,
      subtitle: ch.description,
      category: 'Articles',
      lessonId: ch.lessons[0]?.id,
    });

    ch.lessons.forEach((l) => {
      allItems.push({
        id: l.id,
        type: 'lesson',
        title: l.title,
        subtitle: l.tagline,
        category: 'Articles',
        lessonId: l.id,
      });
    });
  });

  // Filter items
  const filtered = allItems.filter((item) => {
    const matchesFilter = activeFilter === 'All' || item.category === activeFilter;
    if (!matchesFilter) return false;

    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const displayResults = filtered.slice(0, 10);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < displayResults.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : displayResults.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (displayResults[selectedIndex]) {
          handleItemClick(displayResults[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [displayResults, selectedIndex]);

  const handleItemClick = (item: SearchItem) => {
    if (item.onAction) {
      item.onAction();
    } else if (item.lessonId) {
      onSelectLesson(item.lessonId);
    }
    onClose();
  };

  if (!isOpen) return null;

  const categories = ['All', 'Web Tools', 'Developer Tools', 'Image Tools', 'Articles', 'Utilities'];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search WebZoneBW tools, articles, and resources"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-app-surface text-app-ink rounded-2xl border border-app-border shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="p-4 border-b border-app-border flex items-center gap-3 bg-app-inset">
          <Search className="w-5 h-5 text-blue-500 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search web tools, image utilities, articles, or resources..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full text-sm sm:text-base bg-transparent text-app-ink outline-none placeholder:text-app-subtle"
            aria-label="Search input"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded text-app-subtle hover:text-app-ink cursor-pointer"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg border border-app-border hover:bg-app-active text-app-muted transition-colors text-xs cursor-pointer font-mono"
            aria-label="Close search dialog"
          >
            ESC
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-app-border bg-app-surface overflow-x-auto no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveFilter(cat);
                setSelectedIndex(0);
              }}
              className={`whitespace-nowrap px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                activeFilter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-app-inset text-app-muted hover:text-app-ink hover:bg-app-active'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-app-border/50 max-h-[420px]">
          {displayResults.length === 0 ? (
            <div className="p-10 text-center space-y-2">
              <Search className="w-8 h-8 text-app-subtle mx-auto mb-2" />
              <p className="text-sm font-bold text-app-ink">No tools or resources found</p>
              <p className="text-xs text-app-muted max-w-sm mx-auto">
                We couldn't find any results matching "{query}". Try checking for typos or search for "Flexbox", "Sandbox", "HTTP", or "Box model".
              </p>
            </div>
          ) : (
            displayResults.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600/10 border border-blue-500/40 text-app-ink shadow-xs'
                      : 'border border-transparent text-app-ink hover:bg-app-active/60'
                  }`}
                >
                  <div className="flex items-start gap-3 truncate pr-2">
                    <div
                      className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                        item.type === 'tool'
                          ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400'
                          : item.type === 'resource'
                          ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400'
                          : 'bg-app-active text-app-muted'
                      }`}
                    >
                      {item.type === 'tool' ? (
                        <Wrench className="w-4 h-4" />
                      ) : item.type === 'resource' ? (
                        <Sparkles className="w-4 h-4" />
                      ) : (
                        <BookOpen className="w-4 h-4" />
                      )}
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-app-active text-app-muted">
                          {item.category}
                        </span>
                        <span className="text-sm font-bold text-app-ink truncate">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-xs text-app-muted truncate mt-1">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-blue-500 translate-x-1' : 'text-app-subtle'
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Keyboard Footer */}
        <div className="p-3 bg-app-inset border-t border-app-border text-[11px] font-mono text-app-subtle flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 rounded bg-app-surface border border-app-border text-app-muted">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-app-surface border border-app-border text-app-muted">↓</kbd> navigate</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-app-surface border border-app-border text-app-muted">Enter</kbd> open</span>
          </div>
          <span><kbd className="px-1.5 py-0.5 rounded bg-app-surface border border-app-border text-app-muted">ESC</kbd> close</span>
        </div>
      </div>
    </div>
  );
};
