import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Code2, Layers, ArrowRight } from 'lucide-react';
import { Chapter } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: Chapter[];
  onSelectLesson: (lessonId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  chapters,
  onSelectLesson,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle search
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  // Flatten searchable records
  const allItems: {
    type: 'lesson' | 'chapter';
    id: string;
    title: string;
    subtitle: string;
    chapterNumber: string;
    lessonId?: string;
  }[] = [];

  chapters.forEach((ch) => {
    allItems.push({
      type: 'chapter',
      id: ch.id,
      title: ch.title,
      subtitle: ch.description,
      chapterNumber: ch.number,
    });
    ch.lessons.forEach((l) => {
      allItems.push({
        type: 'lesson',
        id: l.id,
        title: l.title,
        subtitle: l.tagline,
        chapterNumber: ch.number,
        lessonId: l.id,
      });
    });
  });

  const results = query.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : allItems.slice(0, 8);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-fade-in">
        {/* Search Bar Input */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search all lessons, concepts, and code examples..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-sm bg-transparent text-slate-900 dark:text-white outline-none placeholder:text-slate-400"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          {results.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              No matching curriculum topics found for "{query}".
            </div>
          ) : (
            results.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.lessonId) {
                    onSelectLesson(item.lessonId);
                  } else {
                    const firstLesson = chapters.find((c) => c.id === item.id)?.lessons[0];
                    if (firstLesson) onSelectLesson(firstLesson.id);
                  }
                  onClose();
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-start gap-3 truncate pr-2">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0 mt-0.5 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900 group-hover:text-indigo-600">
                    {item.type === 'chapter' ? <BookOpen className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        Ch {item.chapterNumber}
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.subtitle}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-500 flex justify-between">
          <span>Navigate with mouse or keyboard</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
