import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  Code2,
  Flame,
  GraduationCap,
  Layers,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { Chapter, UserProgress } from '../types';
import { WebZoneBrandLogo } from './WebZoneBrandLogo';

interface SidebarProps {
  chapters: Chapter[];
  currentLessonId?: string;
  onSelectLesson: (lessonId: string) => void;
  progress: UserProgress;
  isOpen: boolean;
  onCloseMobile: () => void;
  onOpenPracticeHub: () => void;
  onOpenVisualLab: () => void;
  onOpenActivities?: () => void;
  onOpenMilestones: () => void;
  onOpenTutor?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  chapters,
  currentLessonId,
  onSelectLesson,
  progress,
  isOpen,
  onCloseMobile,
  onOpenPracticeHub,
  onOpenVisualLab,
  onOpenActivities,
  onOpenMilestones,
  onOpenTutor,
}) => {
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    'ch-00': true,
    'ch-01': true,
    'ch-02': true,
    'ch-03': true,
    'ch-04': true,
  });
  const [filterQuery, setFilterQuery] = useState('');

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => ({ ...prev, [chapterId]: !prev[chapterId] }));
  };

  const toggleAllChapters = () => {
    const anyCollapsed = chapters.some((chapter) => !expandedChapters[chapter.id]);
    const next: Record<string, boolean> = {};
    chapters.forEach((chapter) => {
      next[chapter.id] = anyCollapsed;
    });
    setExpandedChapters(next);
  };

  const totalLessons = chapters.reduce((total, chapter) => total + chapter.lessons.length, 0);
  const completedCount = Object.values(progress.completedLessons).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / (totalLessons || 1)) * 100);
  const normalizedQuery = filterQuery.trim().toLowerCase();
  const filteredChapters = chapters
    .map((chapter) => {
      const chapterMatches = chapter.title.toLowerCase().includes(normalizedQuery);
      const lessons = chapterMatches
        ? chapter.lessons
        : chapter.lessons.filter((lesson) => lesson.title.toLowerCase().includes(normalizedQuery));
      return { ...chapter, lessons };
    })
    .filter((chapter) => chapter.lessons.length > 0);

  const closeAfter = (action: () => void) => {
    action();
    onCloseMobile();
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/65 lg:hidden"
          aria-label="Close course outline"
        />
      )}

      <aside
        id="curriculum-sidebar"
        aria-label="Course outline"
        className={`fixed inset-y-0 left-0 z-50 flex h-[100dvh] w-[min(304px,calc(100vw-24px))] min-w-0 -translate-x-full flex-col border-r border-app-border bg-app-surface text-app-ink transition-transform duration-200 lg:static lg:z-auto lg:h-[100dvh] lg:w-full lg:translate-x-0 ${isOpen ? 'translate-x-0' : ''}`}
      >
        <div className="flex min-h-16 shrink-0 items-center justify-between border-b border-app-border bg-app-inset px-4">
          <div className="flex min-w-0 items-center gap-2">
            <WebZoneBrandLogo size="sm" showSubtitle />
            <span className="rounded-control border border-app-border bg-app-active px-2 py-1 font-mono text-[10px] font-bold tracking-[0.12em] text-app-muted">STUDIO</span>
          </div>
          <button type="button" onClick={onCloseMobile} className="flex min-h-11 min-w-11 items-center justify-center rounded-control text-app-muted transition-colors hover:bg-app-active hover:text-app-ink lg:hidden" aria-label="Close course outline">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="grid shrink-0 grid-cols-3 gap-2 border-b border-app-border bg-app-surface p-3">
          <button type="button" onClick={() => closeAfter(onOpenPracticeHub)} className="group min-h-16 rounded-control border border-app-border bg-app-inset p-2 text-left transition-colors hover:border-emerald-400/70 hover:bg-app-active">
            <span className="flex items-center gap-1 text-xs font-bold text-app-ink"><Code2 className="h-4 w-4 text-emerald-400" aria-hidden="true" /> Practice</span>
            <span className="mt-1 block text-[11px] text-app-muted">Sandbox</span>
          </button>
          <button type="button" onClick={() => closeAfter(onOpenVisualLab)} className="group min-h-16 rounded-control border border-app-border bg-app-inset p-2 text-left transition-colors hover:border-violet-400/70 hover:bg-app-active">
            <span className="flex items-center gap-1 text-xs font-bold text-app-ink"><Layers className="h-4 w-4 text-violet-400" aria-hidden="true" /> Visual</span>
            <span className="mt-1 block text-[11px] text-app-muted">3D models</span>
          </button>
          {onOpenActivities && (
            <button type="button" onClick={() => closeAfter(onOpenActivities)} className="group min-h-16 rounded-control border border-app-border bg-app-inset p-2 text-left transition-colors hover:border-cyan-400/70 hover:bg-app-active">
              <span className="flex items-center gap-1 text-xs font-bold text-app-ink"><GraduationCap className="h-4 w-4 text-cyan-400" aria-hidden="true" /> Activities</span>
              <span className="mt-1 block text-[11px] text-app-muted">After class</span>
            </button>
          )}
        </div>

        <button type="button" onClick={() => closeAfter(onOpenMilestones)} className="mx-3 my-3 shrink-0 rounded-control border border-app-border bg-app-inset p-3 text-left transition-colors hover:border-app-amber/70 hover:bg-app-active" title="Open XP milestones and level roadmap">
          <span className="flex items-center justify-between gap-3 text-xs font-bold"><span className="flex items-center gap-2 text-app-ink"><Award className="h-4 w-4 text-app-amber" aria-hidden="true" /> Progress &amp; mastery</span><span className="font-mono tabular-nums text-app-amber">{progressPercent}%</span></span>
          <span className="mt-3 block h-2 overflow-hidden rounded-full bg-app-active"><span className="block h-full rounded-full bg-app-amber transition-[width] duration-500" style={{ width: `${progressPercent}%` }} /></span>
          <span className="mt-2 flex items-center justify-between gap-2 font-mono text-[11px] text-app-muted"><span>{completedCount} of {totalLessons} lessons</span><span className="flex items-center gap-2"><span className="flex items-center gap-1 text-orange-400"><Flame className="h-3.5 w-3.5" aria-hidden="true" />{progress.streakDays}d</span><span className="text-app-subtle">·</span><span className="text-app-amber">{progress.xpPoints} XP</span></span></span>
        </button>

        <div className="flex shrink-0 items-center gap-2 px-3 pb-3">
          <label className="relative min-w-0 flex-1"><span className="sr-only">Search chapters or topics</span><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-subtle" aria-hidden="true" /><input type="search" placeholder="Search chapters or topics..." value={filterQuery} onChange={(event) => setFilterQuery(event.target.value)} className="h-11 w-full rounded-control border border-app-border bg-app-inset pl-9 pr-9 text-sm text-app-ink placeholder:text-app-subtle" />{filterQuery && <button type="button" onClick={() => setFilterQuery('')} className="absolute right-1 top-1/2 flex min-h-9 min-w-9 -translate-y-1/2 items-center justify-center rounded-control text-app-subtle hover:bg-app-active hover:text-app-ink" aria-label="Clear chapter search"><X className="h-4 w-4" aria-hidden="true" /></button>}</label>
          <button type="button" onClick={toggleAllChapters} className="flex min-h-11 min-w-11 items-center justify-center rounded-control border border-app-border bg-app-inset text-app-muted transition-colors hover:bg-app-active hover:text-app-ink" title="Expand or collapse all chapters" aria-label="Expand or collapse all chapters"><ChevronsUpDown className="h-4 w-4" aria-hidden="true" /></button>
        </div>

        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 pb-3 scrollbar-thin">
          {filteredChapters.length === 0 ? (
            <div className="rounded-control border border-dashed border-app-border bg-app-inset p-4 text-center"><p className="text-sm font-bold text-app-ink">No chapters or lessons match</p><p className="mt-1 text-xs leading-relaxed text-app-muted">Try a broader search or return to the full outline.</p><button type="button" onClick={() => setFilterQuery('')} className="mt-3 min-h-11 rounded-control border border-app-amber/70 px-3 text-xs font-bold text-app-amber hover:bg-app-active">Clear search</button></div>
          ) : filteredChapters.map((chapter) => {
            const isExpanded = expandedChapters[chapter.id];
            const chapterCompletedCount = chapter.lessons.filter((lesson) => progress.completedLessons[lesson.id]).length;
            const isChapterAllDone = chapterCompletedCount === chapter.lessons.length && chapter.lessons.length > 0;
            return (
              <div key={chapter.id} className="overflow-hidden rounded-control border border-app-border bg-app-inset">
                <button type="button" onClick={() => toggleChapter(chapter.id)} className={`flex min-h-12 w-full items-center justify-between gap-2 px-3 text-left transition-colors ${isExpanded ? 'bg-app-active text-app-ink' : 'text-app-muted hover:bg-app-active hover:text-app-ink'}`} aria-expanded={isExpanded} aria-controls={`chapter-lessons-${chapter.id}`}>
                  <span className="flex min-w-0 items-center gap-2"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-control border border-app-amber/40 bg-app-amber/15 font-mono text-[11px] font-bold text-app-amber">{chapter.number}</span><span className="truncate text-sm font-bold">{chapter.title}</span></span>
                  <span className="flex shrink-0 items-center gap-1.5"><span className="font-mono text-[11px] text-app-subtle">{chapterCompletedCount}/{chapter.lessons.length}</span>{isChapterAllDone ? <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-label="Chapter complete" /> : isExpanded ? <ChevronDown className="h-4 w-4" aria-hidden="true" /> : <ChevronRight className="h-4 w-4" aria-hidden="true" />}</span>
                </button>
                {isExpanded && <div id={`chapter-lessons-${chapter.id}`} className="divide-y divide-app-border/70 border-t border-app-border bg-app-canvas/50">{chapter.lessons.map((lesson) => { const isSelected = currentLessonId === lesson.id; const isDone = progress.completedLessons[lesson.id]; return <button type="button" key={lesson.id} onClick={() => closeAfter(() => onSelectLesson(lesson.id))} className={`flex min-h-11 w-full items-center justify-between gap-2 border-l-2 px-3 pl-10 text-left text-sm transition-colors ${isSelected ? 'border-app-amber bg-app-amber/12 font-bold text-app-amber' : 'border-transparent text-app-muted hover:bg-app-active hover:text-app-ink'}`} aria-current={isSelected ? 'page' : undefined}><span className="truncate">{lesson.title}</span>{isDone ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-label="Lesson complete" /> : <span className={`h-2 w-2 shrink-0 rounded-full ${isSelected ? 'bg-app-amber' : 'bg-app-subtle'}`} aria-hidden="true" />}</button>; })}</div>}
              </div>
            );
          })}
        </div>

        {onOpenTutor && <div className="shrink-0 border-t border-app-border bg-app-inset p-3"><button type="button" onClick={() => closeAfter(onOpenTutor)} className="flex min-h-14 w-full items-center justify-between gap-3 rounded-control border border-app-amber/40 bg-app-active px-3 text-left transition-colors hover:border-app-amber hover:bg-app-surface"><span className="flex min-w-0 items-center gap-2"><Sparkles className="h-5 w-5 shrink-0 text-app-amber" aria-hidden="true" /><span className="min-w-0"><span className="block truncate text-xs font-bold text-app-ink">Ask 24/7 AI tutor</span><span className="block truncate text-[11px] text-app-muted">Resolve code doubts instantly</span></span></span><span className="shrink-0 rounded-control bg-app-amber px-2 py-1 font-mono text-[10px] font-black text-slate-950">AI 24/7</span></button></div>}
      </aside>
    </>
  );
};
