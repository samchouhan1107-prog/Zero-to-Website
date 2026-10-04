import React from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Compass, Play, Sparkles } from 'lucide-react';
import { Chapter, UserProgress } from '../utils/types';

interface LearnViewProps {
  chapters: Chapter[];
  progress: UserProgress;
  onSelectLesson: (lessonId: string) => void;
  onOpenPractice: () => void;
  onOpenTutor: (topic?: string) => void;
  onNavigateHome: () => void;
}

export const LearnView: React.FC<LearnViewProps> = ({
  chapters,
  progress,
  onSelectLesson,
  onOpenPractice,
  onOpenTutor,
  onNavigateHome,
}) => {
  const lessons = chapters.flatMap((chapter) => chapter.lessons);
  const completedCount = lessons.filter((lesson) => progress.completedLessons[lesson.id]).length;
  const completion = lessons.length ? Math.round((completedCount / lessons.length) * 100) : 0;

  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-app-border pb-6">
        <div className="max-w-2xl">
          <button
            type="button"
            onClick={onNavigateHome}
            className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-app-muted transition-colors hover:text-app-amber"
          >
            <Compass className="h-4 w-4" aria-hidden="true" />
            Back to overview
          </button>
          <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-app-amber">
            Learning path
          </p>
          <h1 className="text-2xl font-bold leading-tight text-app-ink sm:text-3xl">
            Build your web development skills
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-app-muted">
            Work through the curriculum at your own pace. Your completed lessons stay marked as you progress.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onOpenPractice}
            className="inline-flex min-h-10 items-center gap-2 rounded-md border border-app-border bg-app-surface px-3.5 text-sm font-semibold text-app-ink transition-colors hover:border-app-amber/50 hover:text-app-amber"
          >
            <Play className="h-4 w-4" aria-hidden="true" />
            Practice
          </button>
          <button
            type="button"
            onClick={() => onOpenTutor('web development learning path')}
            className="inline-flex min-h-10 items-center gap-2 rounded-md bg-app-amber px-3.5 text-sm font-semibold text-white transition-colors hover:bg-app-amber-hover"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Ask tutor
          </button>
        </div>
      </header>

      <section aria-labelledby="learning-progress-title" className="mb-8 border-b border-app-border pb-6">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="learning-progress-title" className="text-sm font-semibold text-app-ink">Course progress</h2>
          <p className="font-mono text-xs text-app-muted">
            <span className="font-semibold text-app-ink">{completedCount}</span> of {lessons.length} lessons
            <span className="mx-2 text-app-subtle" aria-hidden="true">/</span>{completion}%
          </p>
        </div>
        <div
          className="h-2 overflow-hidden rounded-full bg-app-inset"
          role="progressbar"
          aria-label="Course completion"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={completion}
        >
          <div className="h-full rounded-full bg-app-amber transition-[width] duration-500" style={{ width: `${completion}%` }} />
        </div>
      </section>

      <section aria-labelledby="curriculum-title">
        <div className="mb-3 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-app-amber" aria-hidden="true" />
          <h2 id="curriculum-title" className="text-sm font-semibold text-app-ink">Curriculum</h2>
        </div>
        <ol className="divide-y divide-app-border border-y border-app-border">
          {chapters.map((chapter) => {
            const chapterCompleted = chapter.lessons.filter((lesson) => progress.completedLessons[lesson.id]).length;
            const nextLesson = chapter.lessons.find((lesson) => !progress.completedLessons[lesson.id]) || chapter.lessons[0];

            return (
              <li key={chapter.id} className="grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-mono text-[11px] font-bold text-app-amber">CH {chapter.number}</span>
                    <h3 className="text-sm font-semibold text-app-ink">{chapter.title}</h3>
                    <span className="text-xs text-app-subtle">{chapterCompleted}/{chapter.lessons.length} complete</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-app-muted">{chapter.subtitle}</p>
                </div>
                {nextLesson && (
                  <button
                    type="button"
                    onClick={() => onSelectLesson(nextLesson.id)}
                    className="inline-flex min-h-9 items-center justify-center gap-2 justify-self-start rounded-md border border-app-border bg-app-surface px-3 text-xs font-semibold text-app-ink transition-colors hover:border-app-amber/50 hover:text-app-amber sm:justify-self-end"
                  >
                    {chapterCompleted === chapter.lessons.length ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                    ) : (
                      <Play className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    {chapterCompleted === chapter.lessons.length ? 'Review chapter' : 'Continue'}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
};