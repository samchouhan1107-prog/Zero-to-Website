import React, { useState, useMemo } from 'react';
import {
  Award,
  BookOpen,
  Bookmark,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  Code2,
  Compass,
  Filter,
  Flame,
  GraduationCap,
  Layers,
  Play,
  Search,
  Sparkles,
  Video,
  X,
  Zap,
} from 'lucide-react';
import { Chapter, UserProgress, ViewMode } from '../utils/types';
import { WebZoneBrandLogo } from './WebZoneBrandLogo';

interface SidebarProps {
  chapters: Chapter[];
  currentLessonId?: string;
  onSelectLesson: (lessonId: string) => void;
  progress: UserProgress;
  isOpen: boolean;
  onCloseMobile: () => void;
  activeView?: ViewMode;
  onNavigateHome?: () => void;
  onOpenPracticeHub: () => void;
  onOpenVisualLab: () => void;
  onOpenActivities?: () => void;
  onOpenMilestones: () => void;
  onOpenTutor?: () => void;
}

type LessonFilter = 'all' | 'incomplete' | 'completed' | 'bookmarked';

export const Sidebar: React.FC<SidebarProps> = ({
  chapters,
  currentLessonId,
  onSelectLesson,
  progress,
  isOpen,
  onCloseMobile,
  activeView = 'lesson',
  onNavigateHome,
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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<LessonFilter>('all');

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
  const userLevel = Math.floor(progress.xpPoints / 100) + 1;

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredChapters = useMemo(() => {
    return chapters
      .map((chapter) => {
        const chapterTitleMatches = chapter.title.toLowerCase().includes(normalizedQuery);
        const lessons = chapter.lessons.filter((lesson) => {
          // Status filter check
          const isDone = !!progress.completedLessons[lesson.id];
          const isBookmarked = progress.bookmarks.includes(lesson.id);

          if (activeFilter === 'completed' && !isDone) return false;
          if (activeFilter === 'incomplete' && isDone) return false;
          if (activeFilter === 'bookmarked' && !isBookmarked) return false;

          // Search query check
          if (!normalizedQuery) return true;
          if (chapterTitleMatches) return true;
          return (
            lesson.title.toLowerCase().includes(normalizedQuery) ||
            lesson.number.toLowerCase().includes(normalizedQuery) ||
            lesson.tagline?.toLowerCase().includes(normalizedQuery)
          );
        });

        return { ...chapter, lessons };
      })
      .filter((chapter) => chapter.lessons.length > 0);
  }, [chapters, normalizedQuery, activeFilter, progress.completedLessons, progress.bookmarks]);

  const closeAfter = (action: () => void) => {
    action();
    onCloseMobile();
  };

  const completedChallengesCount = Object.values(progress.completedChallenges).filter(Boolean).length;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <button
          type="button"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/75 backdrop-blur-xs transition-opacity"
          aria-label="Close course outline"
        />
      )}

      {/* Main Sidebar Shell */}
      <aside
        id="curriculum-sidebar"
        aria-label="Course outline and curriculum navigation"
        className={`fixed inset-y-0 left-0 z-50 flex h-[100dvh] w-[min(340px,calc(100vw-16px))] min-w-0 -translate-x-full flex-col border-r border-app-border bg-app-surface text-app-ink shadow-2xl transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : ''
        }`}
      >
        {/* 1. Header & Brand */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-app-border bg-app-surface px-3.5">
          <div className="flex min-w-0 items-center gap-2">
            <WebZoneBrandLogo size="sm" showSubtitle={false} />
            <span className="rounded-md border border-app-border bg-app-inset px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.12em] text-app-muted">
              STUDIO
            </span>
          </div>
          <button
            type="button"
            onClick={onCloseMobile}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-app-subtle transition-colors hover:bg-app-active hover:text-app-ink lg:hidden"
            aria-label="Close course outline"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* 2. Primary Navigation Hub Selector */}
        <nav aria-label="Curriculum Hubs" className="shrink-0 border-b border-app-border bg-app-surface p-2.5">
          <div className="grid grid-cols-2 gap-1.5">
            {/* Syllabus Map / Home */}
            <button
              type="button"
              onClick={() => closeAfter(() => onNavigateHome && onNavigateHome())}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-bold transition-all ${
                activeView === 'home'
                  ? 'border border-app-amber/60 bg-app-amber/10 text-app-amber shadow-xs'
                  : 'border border-transparent bg-app-inset/60 text-app-muted hover:border-app-border hover:bg-app-inset hover:text-app-ink'
              }`}
            >
              <Compass className={`h-4 w-4 shrink-0 ${activeView === 'home' ? 'text-app-amber' : 'text-app-subtle'}`} />
              <span className="truncate">Syllabus Map</span>
            </button>

            {/* Practice Sandbox */}
            <button
              type="button"
              onClick={() => closeAfter(onOpenPracticeHub)}
              className={`flex items-center justify-between gap-1.5 rounded-lg px-2.5 py-2 text-left text-xs font-bold transition-all ${
                activeView === 'practice-hub'
                  ? 'border border-emerald-500/60 bg-emerald-500/10 text-emerald-400 shadow-xs'
                  : 'border border-transparent bg-app-inset/60 text-app-muted hover:border-app-border hover:bg-app-inset hover:text-app-ink'
              }`}
            >
              <span className="flex min-w-0 items-center gap-2">
                <Code2 className={`h-4 w-4 shrink-0 ${activeView === 'practice-hub' ? 'text-emerald-400' : 'text-emerald-500/70'}`} />
                <span className="truncate">Sandbox</span>
              </span>
              {completedChallengesCount > 0 && (
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 font-mono text-[9px] font-bold text-emerald-400">
                  {completedChallengesCount}
                </span>
              )}
            </button>

            {/* Visual Lab */}
            <button
              type="button"
              onClick={() => closeAfter(onOpenVisualLab)}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-bold transition-all ${
                activeView === 'visual-lab'
                  ? 'border border-violet-500/60 bg-violet-500/10 text-violet-400 shadow-xs'
                  : 'border border-transparent bg-app-inset/60 text-app-muted hover:border-app-border hover:bg-app-inset hover:text-app-ink'
              }`}
            >
              <Layers className={`h-4 w-4 shrink-0 ${activeView === 'visual-lab' ? 'text-violet-400' : 'text-violet-500/70'}`} />
              <span className="truncate">Visual Lab</span>
            </button>

            {/* Activities & Drills */}
            {onOpenActivities && (
              <button
                type="button"
                onClick={() => closeAfter(onOpenActivities)}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-bold transition-all ${
                  activeView === 'activities'
                    ? 'border border-cyan-500/60 bg-cyan-500/10 text-cyan-400 shadow-xs'
                    : 'border border-transparent bg-app-inset/60 text-app-muted hover:border-app-border hover:bg-app-inset hover:text-app-ink'
                }`}
              >
                <GraduationCap className={`h-4 w-4 shrink-0 ${activeView === 'activities' ? 'text-cyan-400' : 'text-cyan-500/70'}`} />
                <span className="truncate">Activities</span>
              </button>
            )}
          </div>
        </nav>

        {/* 3. Progress & Mastery Summary Card */}
        <div className="shrink-0 p-2.5">
          <button
            type="button"
            onClick={() => closeAfter(onOpenMilestones)}
            className="group w-full rounded-xl border border-app-border bg-app-inset p-3 text-left transition-all hover:border-app-amber/60 hover:bg-app-active/80"
            title="Open XP milestones and level roadmap"
          >
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="flex items-center gap-1.5 font-bold text-app-ink group-hover:text-app-amber transition-colors">
                <Award className="h-4 w-4 text-app-amber" aria-hidden="true" />
                Level {userLevel} Mastery
              </span>
              <span className="font-mono text-xs font-black tabular-nums text-app-amber">
                {progressPercent}%
              </span>
            </div>

            {/* Progress track */}
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-app-active">
              <div
                className="h-full rounded-full bg-app-amber transition-[width] duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Stats row */}
            <div className="mt-2 flex items-center justify-between gap-2 font-mono text-[11px] text-app-muted">
              <span>
                {completedCount}/{totalLessons} lessons
              </span>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-orange-400 font-bold">
                  <Flame className="h-3 w-3" aria-hidden="true" />
                  {progress.streakDays}d
                </span>
                <span className="text-app-subtle">·</span>
                <span className="text-app-amber font-bold">{progress.xpPoints} XP</span>
              </div>
            </div>
          </button>
        </div>

        {/* 4. Search & Quick Filters Toolbar */}
        <div className="shrink-0 space-y-2 border-b border-app-border px-2.5 pb-2.5">
          {/* Search box */}
          <div className="flex items-center gap-1.5">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search syllabus, topics, or chapters</span>
              <Search
                className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-app-subtle"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search syllabus..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="h-8 w-full rounded-lg border border-app-border bg-app-inset pl-7 pr-7 text-xs text-app-ink placeholder:text-app-subtle focus:border-app-amber focus:ring-1 focus:ring-app-amber outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-1 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-app-subtle hover:bg-app-active hover:text-app-ink"
                  aria-label="Clear search"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              )}
            </label>

            {/* Expand / Collapse all toggle */}
            <button
              type="button"
              onClick={toggleAllChapters}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-app-border bg-app-inset text-app-muted transition-colors hover:bg-app-active hover:text-app-ink"
              title="Expand or collapse all chapters"
              aria-label="Expand or collapse all chapters"
            >
              <ChevronsUpDown className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          {/* Quick status filter pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar pt-1">
            {(
              [
                { id: 'all', label: 'All' },
                { id: 'incomplete', label: 'To Do' },
                { id: 'completed', label: 'Completed' },
                { id: 'bookmarked', label: 'Saved' },
              ] as const
            ).map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`h-6 shrink-0 rounded-md px-2 font-mono text-[10px] font-bold uppercase tracking-wider transition-all ${
                  activeFilter === filter.id
                    ? 'border border-app-amber/70 bg-app-amber/15 text-app-amber shadow-xs'
                    : 'border border-transparent text-app-subtle hover:bg-app-inset hover:text-app-muted'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* 5. Chapters & Lessons Tree Outline */}
        <div className="min-h-0 flex-1 space-y-1.5 overflow-y-auto p-2.5 scrollbar-thin">
          {filteredChapters.length === 0 ? (
            <div className="rounded-xl border border-dashed border-app-border bg-app-inset p-4 text-center">
              <p className="text-xs font-bold text-app-ink">No matches found</p>
              <p className="mt-1 text-[11px] leading-relaxed text-app-muted">
                {searchQuery ? `No lessons matching "${searchQuery}"` : 'No lessons found in this filter category.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="mt-3 inline-flex h-7 items-center rounded-lg border border-app-amber/70 px-2.5 font-mono text-[10px] font-bold text-app-amber hover:bg-app-active transition-colors"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredChapters.map((chapter) => {
              const isExpanded = expandedChapters[chapter.id];
              const chapterCompletedCount = chapter.lessons.filter((l) => progress.completedLessons[l.id]).length;
              const isChapterAllDone = chapterCompletedCount === chapter.lessons.length && chapter.lessons.length > 0;
              const hasActiveLesson = chapter.lessons.some((l) => l.id === currentLessonId);

              return (
                <div
                  key={chapter.id}
                  className={`overflow-hidden rounded-xl border transition-all ${
                    hasActiveLesson ? 'border-app-amber/50 bg-app-surface shadow-xs' : 'border-app-border/80 bg-app-surface'
                  }`}
                >
                  {/* Chapter Header Button */}
                  <button
                    type="button"
                    onClick={() => toggleChapter(chapter.id)}
                    className={`flex min-h-10 w-full items-center justify-between gap-2 px-3 py-2 text-left transition-colors ${
                      isExpanded ? 'bg-app-active/60 text-app-ink' : 'text-app-muted hover:bg-app-active/40 hover:text-app-ink'
                    }`}
                    aria-expanded={isExpanded}
                    aria-controls={`chapter-lessons-${chapter.id}`}
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className={`flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-bold ${
                          isChapterAllDone
                            ? 'border border-emerald-500/50 bg-emerald-500/15 text-emerald-400'
                            : hasActiveLesson
                            ? 'border border-app-amber/60 bg-app-amber/15 text-app-amber'
                            : 'border border-app-border bg-app-inset text-app-subtle'
                        }`}
                      >
                        {chapter.number}
                      </span>
                      <span className="truncate text-xs font-bold text-app-ink">{chapter.title}</span>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5">
                      <span className="font-mono text-[10px] tabular-nums text-app-subtle">
                        {chapterCompletedCount}/{chapter.lessons.length}
                      </span>
                      {isChapterAllDone ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-label="Chapter complete" />
                      ) : isExpanded ? (
                        <ChevronDown className="h-3.5 w-3.5 text-app-subtle" aria-hidden="true" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5 text-app-subtle" aria-hidden="true" />
                      )}
                    </div>
                  </button>

/* Lesson Accordion Body */
                  {isExpanded && (
                    <div
                      id={`chapter-lessons-${chapter.id}`}
                      className="divide-y divide-app-border/40 border-t border-app-border/60 bg-app-inset/40 p-1"
                    >
                      {chapter.lessons.map((lesson) => {
                        const isSelected = currentLessonId === lesson.id && activeView === 'lesson';
                        const isDone = !!progress.completedLessons[lesson.id];
                        const isBookmarked = progress.bookmarks.includes(lesson.id);
                        const hasVideo = !!lesson.video;
                        const hasPractice = !!lesson.practice;

                        return (
                          <button
                            type="button"
                            key={lesson.id}
                            onClick={() => closeAfter(() => onSelectLesson(lesson.id))}
                            className={`group flex min-h-9 w-full items-center justify-between gap-2 px-2 py-1.5 text-left text-xs transition-all rounded-md ${
                              isSelected
                                ? 'bg-app-amber/15 font-bold text-app-ink'
                                : 'text-app-muted hover:bg-app-active/70 hover:text-app-ink'
                            }`}
                            aria-current={isSelected ? 'page' : undefined}
                          >
                            <div className="flex min-w-0 items-center gap-2">
                              {/* Left status bullet / check */}
                              {isDone ? (
                                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" aria-label="Lesson complete" />
                              ) : isSelected ? (
                                <span className="h-2 w-2 shrink-0 rounded-full bg-app-amber shadow-[0_0_8px_rgba(245,158,11,0.6)]" aria-hidden="true" />
                              ) : (
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-app-subtle/60 group-hover:bg-app-muted" aria-hidden="true" />
                              )}

                              <span className="truncate">{lesson.title}</span>
                            </div>

                            {/* Badges / Indicators */}
                            <div className="flex shrink-0 items-center gap-1.5 pr-1">
                              {hasPractice && (
                                <Code2 className="h-3 w-3 text-emerald-500/80 group-hover:text-emerald-400 shrink-0" aria-label="Includes code challenge" />
                              )}
                              {hasVideo && (
                                <Video className="h-3 w-3 text-app-subtle group-hover:text-app-muted shrink-0" aria-label="Includes video" />
                              )}
                              {isBookmarked && (
                                <Bookmark className="h-3 w-3 fill-current text-app-amber shrink-0" aria-label="Bookmarked" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* 6. Footer: 24/7 AI Tutor Launcher */}
        {onOpenTutor && (
          <div className="shrink-0 border-t border-app-border bg-app-surface p-2.5">
            <button
              type="button"
              onClick={() => closeAfter(onOpenTutor)}
              className="group flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border border-app-amber/40 bg-app-active/70 px-3 py-2 text-left transition-all hover:border-app-amber hover:bg-app-active hover:shadow-xs"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-app-amber/15 text-app-amber">
                  <Sparkles className="h-3.5 w-3.5 text-app-amber" aria-hidden="true" />
                  <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                </span>
                <div className="min-w-0">
                  <span className="block truncate text-xs font-bold text-app-ink group-hover:text-app-amber transition-colors">
                    Sameer Chouhan — Code Tutor
                  </span>
                  <span className="block truncate text-[10px] text-app-muted">
                    Ask doubts &amp; live guidance
                  </span>
                </div>
              </div>
              <span className="shrink-0 rounded-lg bg-app-amber px-2 py-0.5 font-mono text-[10px] font-black text-slate-950 shadow-xs">
                ASK
              </span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
