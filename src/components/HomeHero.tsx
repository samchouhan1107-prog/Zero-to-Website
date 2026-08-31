import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Clock,
  Code2,
  Compass,
  Cpu,
  ExternalLink,
  Flame,
  Globe,
  GraduationCap,
  Layers,
  LayoutGrid,
  Play,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';
import { Chapter, UserProgress } from '../utils/types';
import { AdSenseSlot } from './AdSenseSlot';

interface HomeHeroProps {
  chapters: Chapter[];
  progress: UserProgress;
  onSelectLesson: (lessonId: string) => void;
  onOpenPracticeHub: () => void;
  onOpenVisualLab: () => void;
  onOpenActivities?: () => void;
  onOpenTutor: () => void;
  onOpenMilestones: () => void;
}

// Chapter project archetypes and engineering highlights
const CHAPTER_METADATA: Record<string, { project: string; skills: string[]; highlight: string }> = {
  'ch-00': {
    project: 'Full-Stack Request Inspector',
    skills: ['Client-Server Model', 'DNS & IP Routing', 'HTTP Lifecycle', 'Browser Engine Pipeline'],
    highlight: 'Understand the entire journey from typing a URL to rendering high-performance pixels on screen.',
  },
  'ch-01': {
    project: 'Semantic Product Landing Page',
    skills: ['Semantic HTML5', 'DOM Accessibility (a11y)', 'Forms & Validation', 'SEO Meta Architecture'],
    highlight: 'Build accessible, meaningful web structure that search engines and assistive technology understand.',
  },
  'ch-02': {
    project: 'Modern Dark/Light UI Component Library',
    skills: ['CSS Cascade & Specificity', 'Box Model & Sizing', 'CSS Custom Properties', 'Typography & Units'],
    highlight: 'Master the visual presentation engine, spatial metrics, and modern maintainable design systems.',
  },
  'ch-03': {
    project: 'Responsive Bento-Grid Dashboard',
    skills: ['Flexbox 1D Layout Engine', 'CSS Grid 2D Templates', 'Container Queries', 'Fluid Responsive Design'],
    highlight: 'Architect dynamic, auto-wrapping layouts that adapt seamlessly from mobile watches to ultra-wide monitors.',
  },
  'ch-04': {
    project: 'Interactive State-Driven Web App',
    skills: ['DOM Traversal & Mutation', 'Event Delegation', 'Async / Fetch APIs', 'Local Storage Persistence'],
    highlight: 'Bring web interfaces to life with interactive logic, smooth animations, and asynchronous data flows.',
  },
};

export const HomeHero: React.FC<HomeHeroProps> = ({
  chapters,
  progress,
  onSelectLesson,
  onOpenPracticeHub,
  onOpenVisualLab,
  onOpenActivities,
  onOpenTutor,
  onOpenMilestones,
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(chapters[0]?.id || 'ch-00');

  const allLessons = chapters.flatMap((chapter) => chapter.lessons);
  const completedCount = Object.values(progress.completedLessons).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / (allLessons.length || 1)) * 100);
  const nextIncompleteLesson = allLessons.find((lesson) => !progress.completedLessons[lesson.id]) || allLessons[0];
  const nextChapter = chapters.find((chapter) => chapter.lessons.some((lesson) => lesson.id === nextIncompleteLesson?.id)) || chapters[0];
  const userLevel = Math.floor(progress.xpPoints / 100) + 1;

  const currentInspectedChapter = chapters.find((c) => c.id === selectedChapterId) || chapters[0];
  const inspectedMeta = CHAPTER_METADATA[currentInspectedChapter.id] || {
    project: 'Interactive Web Prototype',
    skills: ['Web Architecture', 'Responsive Design', 'Interactive Logic'],
    highlight: currentInspectedChapter.description,
  };

  const inspectedCompletedLessons = currentInspectedChapter.lessons.filter((l) => progress.completedLessons[l.id]).length;
  const inspectedChapterPercent = Math.round((inspectedCompletedLessons / (currentInspectedChapter.lessons.length || 1)) * 100);

  return (
    <div id="home-dashboard" className="mx-auto w-full max-w-[1280px] min-w-0 space-y-12 px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
      {/* 1. Hero Exploration Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-app-border bg-app-surface p-6 sm:p-10 lg:p-12 shadow-sm">
        {/* Subtle Ambient Background Grids */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-app-amber/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-app-amber/50 bg-app-amber/10 px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-app-amber">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Modern Web Engineering Studio
              </span>
              <span className="rounded-full border border-app-border bg-app-inset px-3.5 py-1.5 font-mono text-xs font-medium text-app-muted">
                {chapters.length} Modules · {allLessons.length} Interactive Labs
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-app-ink leading-[1.1]">
                Explore. Experiment. <br className="hidden sm:inline" />
                <span className="text-app-amber">Build Real Software.</span>
              </h1>
              <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-app-muted">
                Ditch the dry textbook rote memory. Master modern frontend architecture, layout engines, and JavaScript logic through live interactive visualizers, hands-on sandboxes, and production-grade coding challenges.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {nextIncompleteLesson && (
                <button
                  type="button"
                  onClick={() => onSelectLesson(nextIncompleteLesson.id)}
                  className="inline-flex min-h-12 items-center gap-2.5 rounded-xl bg-app-amber px-6 text-sm font-black text-slate-950 transition-all hover:bg-app-amber-hover hover:shadow-md hover:shadow-app-amber/20 active:scale-[0.98]"
                >
                  <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                  <span>{completedCount > 0 ? 'Resume: ' + nextIncompleteLesson.title : 'Start First Lesson'}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              )}

              <button
                type="button"
                onClick={onOpenPracticeHub}
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-app-border bg-app-inset px-5 text-sm font-bold text-app-ink transition-all hover:border-emerald-500/60 hover:bg-app-active hover:text-emerald-400"
              >
                <Code2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                <span>Open Coding Sandbox</span>
              </button>
            </div>
          </div>

          {/* Quick Learning Tracker Widget */}
          <div className="rounded-xl border border-app-border bg-app-inset p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-app-subtle">
                Curriculum Progress
              </span>
              <span className="font-mono text-xs font-bold text-app-amber">
                Level {userLevel}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-4xl font-black tabular-nums text-app-ink">
                  {progressPercent}%
                </span>
                <span className="text-xs text-app-muted">
                  {completedCount} of {allLessons.length} lessons
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-app-active">
                <div
                  className="h-full rounded-full bg-app-amber transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-app-border">
              <div className="rounded-lg bg-app-surface p-2.5 text-center border border-app-border">
                <div className="flex items-center justify-center gap-1 text-orange-400 font-bold text-xs">
                  <Flame className="h-3.5 w-3.5" />
                  <span>{progress.streakDays} Days</span>
                </div>
                <span className="font-mono text-[10px] text-app-subtle">Daily Streak</span>
              </div>
              <button
                type="button"
                onClick={onOpenMilestones}
                className="rounded-lg bg-app-surface p-2.5 text-center border border-app-border transition-colors hover:border-app-amber/60 hover:bg-app-active"
              >
                <div className="flex items-center justify-center gap-1 text-app-amber font-bold text-xs">
                  <Award className="h-3.5 w-3.5" />
                  <span>{progress.xpPoints} XP</span>
                </div>
                <span className="font-mono text-[10px] text-app-subtle">View Badges</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Exploration Studio Instruments & Quick Hubs */}
      <section aria-labelledby="studio-instruments-heading" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-app-border pb-4">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-app-amber">
              Interactive Instruments
            </p>
            <h2 id="studio-instruments-heading" className="text-2xl font-black text-app-ink">
              Choose How You Want to Learn
            </h2>
          </div>
          <p className="text-sm text-app-muted max-w-md">
            Experiment with code in real-time, inspect 3D layout engines, or reinforce topics with active drills.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Practice Arena */}
          <button
            type="button"
            onClick={onOpenPracticeHub}
            className="group relative flex flex-col justify-between rounded-xl border border-app-border bg-app-surface p-5 text-left transition-all hover:border-emerald-500/60 hover:bg-app-active hover:shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <Code2 className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                  LIVE REPL
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-app-ink group-hover:text-emerald-400 transition-colors">
                  Coding Sandbox
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-app-muted">
                  Full HTML, CSS &amp; JS editor with instant browser execution and automated unit tests.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-400">
              <span>Launch Arena</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </button>

          {/* Visual Lab */}
          <button
            type="button"
            onClick={onOpenVisualLab}
            className="group relative flex flex-col justify-between rounded-xl border border-app-border bg-app-surface p-5 text-left transition-all hover:border-violet-500/60 hover:bg-app-active hover:shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-violet-500/30 bg-violet-500/10 text-violet-400">
                  <Layers className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-violet-500/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-violet-400">
                  3D MODELS
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-app-ink group-hover:text-violet-400 transition-colors">
                  Visual Lab
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-app-muted">
                  Interactive models for Box Model, Flexbox alignment, CSS Grid, DOM Tree, and Git workflows.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-violet-400">
              <span>Inspect Models</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </button>

          {/* Post-Class Activities */}
          {onOpenActivities && (
            <button
              type="button"
              onClick={onOpenActivities}
              className="group relative flex flex-col justify-between rounded-xl border border-app-border bg-app-surface p-5 text-left transition-all hover:border-cyan-500/60 hover:bg-app-active hover:shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-cyan-500/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-cyan-400">
                    DRILLS
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-app-ink group-hover:text-cyan-400 transition-colors">
                    Drills &amp; Bug Hunts
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-app-muted">
                    Active recall flashcards, spot-the-bug puzzles, syntax sequencing, and speed sprints.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                <span>Start Drills</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          )}

          {/* 24/7 AI Tutor */}
          <button
            type="button"
            onClick={onOpenTutor}
            className="group relative flex flex-col justify-between rounded-xl border border-app-border bg-app-surface p-5 text-left transition-all hover:border-app-amber/60 hover:bg-app-active hover:shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-app-amber/30 bg-app-amber/10 text-app-amber">
                  <BrainCircuit className="h-5 w-5" />
                </span>
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-app-ink group-hover:text-app-amber transition-colors">
                  24/7 AI Code Tutor
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-app-muted">
                  Ask doubts, paste broken code snippets, or get personalized conceptual analogies anytime.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-app-amber">
              <span>Ask Doubt</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        </div>
      </section>

      {/* 3. Interactive Chapter Inspector (The Chapter Deep-Dive) */}
      <section aria-labelledby="chapter-explorer-heading" className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-app-border pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-app-amber" />
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-app-amber">
                Curriculum Explorer
              </p>
            </div>
            <h2 id="chapter-explorer-heading" className="mt-1 text-2xl sm:text-3xl font-black text-app-ink">
              Check the Chapters &amp; Projects
            </h2>
          </div>
          <p className="text-sm text-app-muted max-w-md">
            Select any chapter below to inspect its real-world project deliverable, core technologies, and lesson roadmap.
          </p>
        </div>

        {/* Chapter Selection Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {chapters.map((ch) => {
            const isSelected = ch.id === selectedChapterId;
            const completedInCh = ch.lessons.filter((l) => progress.completedLessons[l.id]).length;
            const isChComplete = completedInCh === ch.lessons.length && ch.lessons.length > 0;

            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => setSelectedChapterId(ch.id)}
                className={`flex shrink-0 items-center gap-2.5 rounded-xl border px-4 py-3 text-left transition-all ${
                  isSelected
                    ? 'border-app-amber bg-app-active text-app-ink shadow-sm ring-1 ring-app-amber/50'
                    : 'border-app-border bg-app-surface text-app-muted hover:border-app-border hover:bg-app-inset hover:text-app-ink'
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-md font-mono text-xs font-black ${
                    isChComplete
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : isSelected
                      ? 'bg-app-amber text-slate-950'
                      : 'bg-app-inset text-app-subtle'
                  }`}
                >
                  {isChComplete ? '✓' : ch.number}
                </span>
                <div className="min-w-0">
                  <span className="block text-xs font-bold truncate max-w-[140px] sm:max-w-[200px]">
                    {ch.title}
                  </span>
                  <span className="block font-mono text-[10px] text-app-subtle">
                    {completedInCh}/{ch.lessons.length} complete
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Chapter Studio Showcase Card */}
        <div className="rounded-2xl border border-app-border bg-app-surface p-6 sm:p-8 space-y-8 shadow-sm">
          {/* Chapter Header Overview */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-app-amber/60 bg-app-amber/10 px-3 py-1 font-mono text-xs font-black text-app-amber">
                  CHAPTER {currentInspectedChapter.number}
                </span>
                <span className="rounded-full border border-app-border bg-app-inset px-3 py-1 font-mono text-xs text-app-muted">
                  {currentInspectedChapter.estimatedHours || '2.0 hrs'}
                </span>
                <span className="rounded-full border border-app-border bg-app-inset px-3 py-1 font-mono text-xs text-app-muted">
                  {currentInspectedChapter.lessons.length} Interactive Lessons
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-app-ink">
                  {currentInspectedChapter.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-app-muted">
                  {currentInspectedChapter.description}
                </p>
              </div>

              {/* Skills badges */}
              <div className="space-y-2 pt-1">
                <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-app-subtle">
                  Core Technologies &amp; Concepts
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {inspectedMeta.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-app-border bg-app-inset px-2.5 py-1 font-mono text-xs font-semibold text-app-ink"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Chapter Milestone Project Deliverable Box */}
            <div className="rounded-xl border border-app-amber/30 bg-app-active/60 p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-app-amber">
                    <Terminal className="h-3.5 w-3.5" />
                    Chapter Project Target
                  </span>
                  <span className="font-mono text-xs font-bold text-app-amber">
                    {inspectedChapterPercent}% Done
                  </span>
                </div>
                <h4 className="text-base font-bold text-app-ink">
                  {inspectedMeta.project}
                </h4>
                <p className="text-xs leading-relaxed text-app-muted">
                  {inspectedMeta.highlight}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-app-border">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-app-inset">
                  <div
                    className="h-full rounded-full bg-app-amber transition-all duration-500"
                    style={{ width: `${inspectedChapterPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between font-mono text-[11px] text-app-subtle">
                  <span>{inspectedCompletedLessons} of {currentInspectedChapter.lessons.length} lessons finished</span>
                  {inspectedChapterPercent === 100 && (
                    <span className="text-emerald-400 font-bold">Chapter Mastered!</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Lessons Grid in this Chapter */}
          <div className="space-y-3 pt-4 border-t border-app-border">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-app-subtle">
              Chapter Lesson Roadmap
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentInspectedChapter.lessons.map((lesson) => {
                const isLessonDone = !!progress.completedLessons[lesson.id];
                const isBookmarked = progress.bookmarks.includes(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    type="button"
                    onClick={() => onSelectLesson(lesson.id)}
                    className="group relative flex flex-col justify-between rounded-xl border border-app-border bg-app-inset p-4 text-left transition-all hover:border-app-amber/70 hover:bg-app-active"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold ${
                            isLessonDone
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-app-surface text-app-muted border border-app-border group-hover:border-app-amber/50 group-hover:text-app-amber'
                          }`}
                        >
                          {isLessonDone ? '✓' : lesson.number}
                        </span>
                        <div className="min-w-0">
                          <h5 className="text-sm font-bold text-app-ink group-hover:text-app-amber transition-colors">
                            {lesson.title}
                          </h5>
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-app-muted">
                            {lesson.tagline}
                          </p>
                        </div>
                      </div>

                      {isLessonDone ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                      ) : (
                        <ArrowRight className="h-4 w-4 shrink-0 text-app-subtle transition-transform group-hover:translate-x-1 group-hover:text-app-amber" />
                      )}
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2 border-t border-app-border/60 pt-2 font-mono text-[11px] text-app-subtle">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {lesson.durationMinutes} min
                      </span>
                      <div className="flex items-center gap-2">
                        {lesson.video && <span className="text-app-muted">Video</span>}
                        {lesson.practice && <span className="text-emerald-400">Sandbox</span>}
                        {isBookmarked && <span className="text-app-amber">Saved</span>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Responsive AdSense Educational Unit */}
      <AdSenseSlot slotId="home-syllabus-mid" format="horizontal" label="Educational Sponsor &amp; Career Tools" />

      {/* 4. Complete Full Curriculum Tree Overview */}
      <section aria-labelledby="all-curriculum-heading" className="space-y-6 pb-8">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-app-border pb-4">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-app-amber">
              Curriculum Map
            </p>
            <h2 id="all-curriculum-heading" className="text-2xl font-black text-app-ink">
              All 5 Engineering Modules
            </h2>
          </div>
          <p className="text-sm text-app-muted max-w-md">
            From foundational protocols to building full interactive state-driven web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {chapters.map((chapter) => {
            const completedInChapter = chapter.lessons.filter((l) => progress.completedLessons[l.id]).length;
            const isAllDone = completedInChapter === chapter.lessons.length && chapter.lessons.length > 0;
            const chapterMeta = CHAPTER_METADATA[chapter.id];

            return (
              <article
                key={chapter.id}
                className="flex flex-col justify-between rounded-xl border border-app-border bg-app-surface p-5 space-y-4 hover:border-app-amber/50 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md border border-app-amber/50 bg-app-amber/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-app-amber">
                      CHAPTER {chapter.number}
                    </span>
                    <span className="font-mono text-xs tabular-nums text-app-muted">
                      {completedInChapter}/{chapter.lessons.length} done
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-app-ink">
                      {chapter.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-app-muted line-clamp-3">
                      {chapter.description}
                    </p>
                  </div>

                  {chapterMeta && (
                    <div className="rounded-lg bg-app-inset p-2.5 border border-app-border text-xs">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-app-subtle block">
                        Build Target:
                      </span>
                      <span className="font-bold text-app-ink mt-0.5 block">
                        {chapterMeta.project}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-2 border-t border-app-border">
                  <button
                    type="button"
                    onClick={() => onSelectLesson(chapter.lessons[0].id)}
                    className="w-full flex items-center justify-between rounded-lg border border-app-border bg-app-inset px-3 py-2 text-xs font-bold text-app-ink hover:border-app-amber/60 hover:bg-app-active transition-colors"
                  >
                    <span>Open Chapter Track</span>
                    <ArrowRight className="h-3.5 w-3.5 text-app-amber" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
