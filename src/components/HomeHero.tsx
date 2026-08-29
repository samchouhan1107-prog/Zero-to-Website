import React from 'react';
import {
  ArrowRight,
  Award,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Compass,
  Flame,
  GraduationCap,
  Layers,
  Play,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { Chapter, UserProgress } from '../utils/types';

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

type ToolItem = {
  label: string;
  detail: string;
  description: string;
  icon: typeof Code2;
  tone: string;
  action: () => void;
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
  const allLessons = chapters.flatMap((chapter) => chapter.lessons);
  const completedCount = Object.values(progress.completedLessons).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / (allLessons.length || 1)) * 100);
  const nextIncompleteLesson = allLessons.find((lesson) => !progress.completedLessons[lesson.id]) || allLessons[0];
  const nextChapter = chapters.find((chapter) => chapter.lessons.some((lesson) => lesson.id === nextIncompleteLesson?.id)) || chapters[0];
  const level = Math.floor(progress.xpPoints / 100) + 1;

  const tools: ToolItem[] = [
    {
      label: 'Practice Arena',
      detail: 'Sandbox',
      description: 'Edit HTML, CSS, and JavaScript with a live preview and verification.',
      icon: Code2,
      tone: 'text-emerald-400',
      action: onOpenPracticeHub,
    },
    {
      label: 'Visual Lab',
      detail: '3D models',
      description: 'Use six interactive instruments to see layout, DOM, Git, and network concepts.',
      icon: Layers,
      tone: 'text-violet-400',
      action: onOpenVisualLab,
    },
    ...(onOpenActivities
      ? [{
          label: 'Activities',
          detail: 'After class',
          description: 'Revisit lessons with flashcards, bug hunts, code ordering, and speed checks.',
          icon: GraduationCap,
          tone: 'text-cyan-400',
          action: onOpenActivities,
        }]
      : []),
    {
      label: 'Ask the tutor',
      detail: '24 / 7 help',
      description: 'Bring a confusing concept or code snippet to the guided AI tutor.',
      icon: BrainCircuit,
      tone: 'text-app-amber',
      action: onOpenTutor,
    },
    {
      label: 'Milestones',
      detail: 'XP roadmap',
      description: 'Track your learning rhythm and see which badges are next.',
      icon: Award,
      tone: 'text-app-amber',
      action: onOpenMilestones,
    },
  ];

  return (
    <div id="home-dashboard" className="mx-auto w-full max-w-[1180px] min-w-0 space-y-10 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <section className="panel-surface relative overflow-hidden p-6 sm:p-9 lg:p-10">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-end">
          <div className="min-w-0 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-control border border-app-amber/60 bg-app-amber/12 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-app-amber">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Complete web engineering curriculum
              </span>
              <span className="rounded-control border border-app-border bg-app-inset px-3 py-1.5 font-mono text-[11px] text-app-muted">
                {chapters.length} chapters · {allLessons.length} interactive lessons
              </span>
            </div>
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl font-black leading-[1.05] tracking-[-0.04em] text-app-ink sm:text-5xl lg:text-6xl">
                Master modern <span className="block text-app-amber">web development.</span>
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-app-muted sm:text-lg">
                An interactive textbook for learning HTML, CSS layout engines, JavaScript fundamentals, responsive paradigms, and modern component architecture through practice—not passive reading.
              </p>
            </div>
            {nextIncompleteLesson && (
              <button
                type="button"
                onClick={() => onSelectLesson(nextIncompleteLesson.id)}
                className="inline-flex min-h-12 items-center gap-2 rounded-control bg-app-amber px-5 text-sm font-black text-slate-950 transition-colors hover:bg-app-amber-hover active:scale-[0.98]"
              >
                <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                {completedCount > 0 ? 'Continue lesson' : 'Start first lesson'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="border-t border-app-border pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-app-subtle">Current route</p>
            <p className="mt-2 text-sm font-bold leading-snug text-app-ink">{nextChapter?.title || 'Curriculum map'}</p>
            <div className="mt-5 flex items-end justify-between gap-3 border-t border-app-border pt-4">
              <span className="font-mono text-3xl font-black tabular-nums text-app-amber">{progressPercent}%</span>
              <span className="pb-1 text-right text-xs text-app-muted">{completedCount} of {allLessons.length}<br />lessons complete</span>
            </div>
          </div>
        </div>
      </section>

      {nextIncompleteLesson && (
        <section className="grid min-w-0 gap-5 rounded-panel border border-app-amber/50 bg-app-active p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em]">
              <span className="rounded-control bg-app-amber px-2.5 py-1 font-bold text-slate-950">Recommended next step</span>
              <span className="text-app-subtle">Chapter {nextChapter?.number}</span>
            </div>
            <h2 className="mt-3 truncate text-xl font-bold text-app-ink sm:text-2xl">{nextIncompleteLesson.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-app-muted">Continue through {nextChapter?.title}. Each lesson pairs a clear mental model with a stored visual, a code example, a sandbox, and a checkpoint.</p>
          </div>
          <button type="button" onClick={() => onSelectLesson(nextIncompleteLesson.id)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control border border-app-border bg-app-surface px-4 text-sm font-bold text-app-ink transition-colors hover:border-app-amber hover:bg-app-inset">
            Open lesson <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </section>
      )}

      <section aria-labelledby="progress-ledger-heading" className="panel-surface overflow-hidden">
        <div className="border-b border-app-border px-5 py-4 sm:px-6"><h2 id="progress-ledger-heading" className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-app-subtle">Learning ledger</h2></div>
        <div className="grid divide-y divide-app-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
          <div className="min-w-0 p-5"><div className="flex items-center justify-between gap-3"><span className="text-xs font-bold uppercase tracking-[0.08em] text-app-muted">Curriculum progress</span><Compass className="h-4 w-4 text-app-amber" aria-hidden="true" /></div><p className="mt-3 font-mono text-2xl font-black tabular-nums text-app-ink">{completedCount} <span className="text-sm font-bold text-app-muted">/ {allLessons.length}</span></p><div className="mt-3 h-2 overflow-hidden rounded-full bg-app-inset"><span className="block h-full rounded-full bg-app-amber" style={{ width: `${progressPercent}%` }} /></div></div>
          <div className="min-w-0 p-5"><div className="flex items-center justify-between gap-3"><span className="text-xs font-bold uppercase tracking-[0.08em] text-app-muted">Daily streak</span><Flame className="h-4 w-4 text-orange-400" aria-hidden="true" /></div><p className="mt-3 font-mono text-2xl font-black tabular-nums text-orange-400">{progress.streakDays} days</p><p className="mt-2 text-xs leading-relaxed text-app-muted">Complete a quiz or challenge each day to keep the rhythm.</p></div>
          <button type="button" onClick={onOpenMilestones} className="group min-w-0 p-5 text-left transition-colors hover:bg-app-active"><div className="flex items-center justify-between gap-3"><span className="text-xs font-bold uppercase tracking-[0.08em] text-app-muted">Mastery experience</span><Award className="h-4 w-4 text-app-amber" aria-hidden="true" /></div><p className="mt-3 font-mono text-2xl font-black tabular-nums text-app-amber">{progress.xpPoints} XP</p><p className="mt-2 flex items-center gap-2 text-xs font-bold text-app-muted group-hover:text-app-ink">Level {level} · View roadmap <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></p></button>
          <button type="button" onClick={onOpenTutor} className="group min-w-0 p-5 text-left transition-colors hover:bg-app-active"><div className="flex items-center justify-between gap-3"><span className="text-xs font-bold uppercase tracking-[0.08em] text-app-muted">Tutor availability</span><BrainCircuit className="h-4 w-4 text-violet-400" aria-hidden="true" /></div><p className="mt-3 text-2xl font-black text-app-ink">Online</p><p className="mt-2 flex items-center gap-2 text-xs font-bold text-emerald-400 group-hover:text-app-ink"><span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" /> Ask a question <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></p></button>
        </div>
      </section>

      <section aria-labelledby="tools-heading" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-app-border pb-4"><div><p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-app-amber">Teaching tools</p><h2 id="tools-heading" className="mt-1 text-2xl font-black text-app-ink">Practice what you read.</h2></div><p className="max-w-md text-sm leading-relaxed text-app-muted">Move between explanation, experimentation, and recall without losing your place.</p></div>
        <div className="divide-y divide-app-border border-y border-app-border">
          {tools.map((tool) => { const Icon = tool.icon; return <button key={tool.label} type="button" onClick={tool.action} className="group grid min-w-0 gap-4 py-4 text-left transition-colors hover:bg-app-active sm:grid-cols-[auto_minmax(150px,0.8fr)_minmax(0,1.6fr)_auto] sm:items-center sm:px-3"><span className={`flex h-11 w-11 items-center justify-center rounded-control border border-app-border bg-app-inset ${tool.tone}`}><Icon className="h-5 w-5" aria-hidden="true" /></span><span className="min-w-0"><span className="block text-sm font-bold text-app-ink">{tool.label}</span><span className="font-mono text-[11px] uppercase tracking-[0.1em] text-app-subtle">{tool.detail}</span></span><span className="text-sm leading-relaxed text-app-muted">{tool.description}</span><ArrowRight className={`h-5 w-5 text-app-subtle transition-transform group-hover:translate-x-1 ${tool.tone}`} aria-hidden="true" /></button>; })}
        </div>
      </section>

      <section aria-labelledby="roadmap-heading" className="space-y-5 pb-8">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-app-border pb-4"><div><p className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-app-amber"><Compass className="h-4 w-4" aria-hidden="true" /> Curriculum roadmap</p><h2 id="roadmap-heading" className="mt-1 text-2xl font-black text-app-ink">The course outline.</h2></div><p className="max-w-md text-sm leading-relaxed text-app-muted">A route from browser fundamentals to shipping a responsive portfolio.</p></div>
        <div className="grid min-w-0 gap-x-8 xl:grid-cols-2">
          {chapters.map((chapter) => {
            const completedInChapter = chapter.lessons.filter((lesson) => progress.completedLessons[lesson.id]).length;
            const isAllDone = completedInChapter === chapter.lessons.length && chapter.lessons.length > 0;
            return <article key={chapter.id} className="min-w-0 border-b border-app-border py-5"><div className="flex items-start justify-between gap-3"><span className="rounded-control border border-app-amber/60 bg-app-amber/12 px-2.5 py-1 font-mono text-[11px] font-bold text-app-amber">CHAPTER {chapter.number}</span><span className="font-mono text-[11px] tabular-nums text-app-subtle">{completedInChapter}/{chapter.lessons.length} complete</span></div><div className="mt-4 flex items-start gap-3"><span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${isAllDone ? 'bg-emerald-400' : 'bg-app-amber'}`} aria-hidden="true" /><div className="min-w-0"><h3 className="text-lg font-bold text-app-ink">{chapter.title}</h3><p className="mt-2 text-sm leading-relaxed text-app-muted">{chapter.description}</p></div></div><div className="mt-4 space-y-2 pl-5">{chapter.lessons.map((lesson) => { const isDone = progress.completedLessons[lesson.id]; return <button key={lesson.id} type="button" onClick={() => onSelectLesson(lesson.id)} className="group flex min-h-11 w-full min-w-0 items-center justify-between gap-3 rounded-control border border-app-border bg-app-inset px-3 text-left transition-colors hover:border-app-amber/70 hover:bg-app-active"><span className="flex min-w-0 items-center gap-3"><span className="shrink-0 font-mono text-[11px] text-app-subtle group-hover:text-app-amber">{lesson.number}</span><span className="truncate text-sm font-bold text-app-ink">{lesson.title}</span></span>{isDone ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-label="Lesson complete" /> : <ArrowRight className="h-4 w-4 shrink-0 text-app-subtle transition-transform group-hover:translate-x-1 group-hover:text-app-amber" aria-hidden="true" />}</button>; })}</div></article>;
          })}
        </div>
      </section>
    </div>
  );
};
