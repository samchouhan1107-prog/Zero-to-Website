import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Rocket, CheckCircle2, Circle, Bookmark, Star, Pin } from 'lucide-react';
import { Chapter, Lesson } from '../utils/types';

const TOTAL_STAGES = 3;
const STAGE_KEY = 'webzonebw_lesson_stages';

interface StageState {
  [lessonId: string]: { visited: number[]; marks: string[] };
}

const readStages = (): StageState => {
  try { return JSON.parse(localStorage.getItem(STAGE_KEY) || '{}'); } catch { return {}; }
};

const writeStages = (s: StageState) => {
  try { localStorage.setItem(STAGE_KEY, JSON.stringify(s)); } catch {}
};

const getChapterIndex = (allChapters: Chapter[], chapterId: string) =>
  allChapters.findIndex((c) => c.id === chapterId);

const getNextChapterLesson = (allChapters: Chapter[], chapter: Chapter) => {
  const idx = getChapterIndex(allChapters, chapter.id);
  if (idx >= 0 && idx < allChapters.length - 1) {
    const next = allChapters[idx + 1];
    return next.lessons[0] || null;
  }
  return null;
};

/** Splits a lesson's theory sections into three guided stages. */
const splitIntoStages = (lesson: Lesson) => {
  const all = [
    {
      id: 'intro',
      icon: '📖',
      label: 'Introduction',
      heading: 'Stage ① — Introduction & Objectives',
      body: lesson.tagline,
      bullets: lesson.learningObjectives.slice(0, 3),
    },
    ...lesson.theorySections.map((s) => ({
      id: s.heading.toLowerCase().replace(/\s+/g, '-'),
      icon: '📖',
      label: s.heading,
      heading: s.heading,
      body: s.content,
      bullets: s.bulletPoints || [],
      callout: s.callout,
    })),
    {
      id: 'practice',
      icon: '💡',
      label: 'Practical Example',
      heading: 'Stage ② — Practical Example & Code',
      body: `Explore the annotated code and hands-on sandbox for "${lesson.title}".`,
      bullets: lesson.codeExample.breakdown.slice(0, 3).map((b) => `${b.title}: ${b.explanation}`),
    },
    {
      id: 'outcome',
      icon: '🎯',
      label: 'Outcome & Knowledge Check',
      heading: 'Stage ③ — Outcome & Knowledge Check',
      body: `You've reached the completion stage of "${lesson.title}". Review the summary, then take the checkpoint quiz to lock the topic in.`,
      bullets: lesson.summary,
    },
  ];
  const perStage = Math.ceil(all.length / TOTAL_STAGES);
  return [0, 1, 2].map((i) => all.slice(i * perStage, (i + 1) * perStage)).filter((s) => s.length > 0);
};

export interface LessonStageNavProps {
  lesson: Lesson;
  chapter: Chapter;
  allChapters: Chapter[];
  onNavigateLesson: (lessonId: string) => void;
  onJumpToStage: (stageIndex: number) => void;
  isCompleted: boolean;
  onToggleMark: (mark: string) => void;
  marks: string[];
}

export const LessonStageNav: React.FC<LessonStageNavProps> = ({
  lesson,
  chapter,
  allChapters,
  onNavigateLesson,
  onJumpToStage,
  isCompleted,
  onToggleMark,
  marks,
}) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [stageState, setStageState] = useState<StageState>(() => readStages());
  const [topicCompleted, setTopicCompleted] = useState(false);

  const stages = useMemo(() => splitIntoStages(lesson), [lesson]);
  const totalStages = Math.min(stages.length, TOTAL_STAGES);
  const key = lesson.id;

  // Persist on change
  useEffect(() => {
    writeStages(stageState);
  }, [stageState]);

  // Restore progress for this lesson on mount/lesson change
  useEffect(() => {
    const saved = readStages()[key];
    if (saved?.visited?.length) {
      setCurrentStage(Math.min(...saved.visited, totalStages - 1));
    } else {
      setCurrentStage(0);
    }
    setTopicCompleted(false);
  }, [key]);

  const visitStage = (idx: number) => {
    setStageState((prev) => {
      const forLesson = prev[key] || { visited: [], marks: [] };
      return { ...prev, [key]: { ...forLesson, visited: Array.from(new Set([...forLesson.visited, idx])) } };
    });
    setCurrentStage(idx);
    onJumpToStage(idx);
  };

  const allVisited = Array.from({ length: totalStages }, (_, i) => stageState[key]?.visited?.includes(i)).every(Boolean);
  const isFinalStage = currentStage === totalStages - 1;
  const canAdvance = isFinalStage ? allVisited || isCompleted : true;
  const nextChapterLesson = getNextChapterLesson(allChapters, chapter);
  const progressPercent = Math.round(((currentStage + 1) / totalStages) * 100);
  const progressDots = Array.from({ length: totalStages }, (_, i) =>
    stageState[key]?.visited?.includes(i) ? '●' : '○'
  ).join('');

  // Keyboard navigation: ArrowLeft / ArrowRight
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName?.match(/INPUT|TEXTAREA|SELECT/)) return;
      if (e.key === 'ArrowRight' && currentStage < totalStages - 1) visitStage(currentStage + 1);
      if (e.key === 'ArrowLeft' && currentStage > 0) visitStage(currentStage - 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentStage, totalStages, key]);

  const stageLabels = ['① Page 1 — Start', '② Page 2 — Continue', '③ Page 3 — Complete'];

  return (
    <div className="space-y-4" role="region" aria-label="Guided learning sequence">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-app-amber">
          🧭 Guided Learning Sequence
        </h2>
        <span className="font-mono text-xs text-app-muted" aria-live="polite">
          📚 Topics / Pages — {currentStage + 1} of {totalStages}
        </span>
      </div>

      {/* Progress bar */}
      <div className="rounded-xl border border-app-border bg-app-inset p-4 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-app-ink font-bold">Page {currentStage + 1} of {totalStages}</span>
          <span aria-hidden="true">{progressDots}</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2 w-full overflow-hidden rounded-full bg-app-active"
        >
          <div
            className="h-full rounded-full bg-app-amber transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {topicCompleted && (
          <p className="flex items-center gap-1.5 text-xs font-black text-emerald-400" aria-live="polite">
            <CheckCircle2 className="h-4 w-4" /> ✓ Topic Complete
          </p>
        )}
      </div>

      {/* Stage nav buttons */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          type="button"
          disabled={currentStage === 0}
          onClick={() => visitStage(currentStage - 1)}
          aria-label="Previous page"
          className="flex shrink-0 items-center gap-1.5 rounded-xl border border-app-border bg-app-surface px-3.5 py-2 text-xs font-bold text-app-ink hover:border-app-amber disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="h-4 w-4" /> ⬅️ Previous
        </button>

        {Array.from({ length: totalStages }, (_, i) => {
          const active = currentStage === i;
          const visited = stageState[key]?.visited?.includes(i);
          return (
            <button
              key={i}
              type="button"
              aria-current={active ? 'page' : undefined}
              onClick={() => visitStage(i)}
              className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-app-amber/60 ${
                active
                  ? 'border-app-amber bg-app-amber text-slate-950 shadow-xs'
                  : visited
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                  : 'border-app-border bg-app-surface text-app-muted hover:text-app-ink'
              }`}
            >
              <span aria-hidden="true">{active ? '★' : visited ? '✓' : '○'}</span>
              <span className="hidden sm:inline">{stageLabels[i]}</span>
              <span className="sm:hidden">{['①', '②', '③'][i]}</span>
            </button>
          );
        })}

        {isFinalStage ? (
          <button
            type="button"
            onClick={() => {
              if (!topicCompleted && (allVisited || isCompleted)) setTopicCompleted(true);
              else if (topicCompleted) visitStage(0);
            }}
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-app-amber px-4 py-2 text-xs font-black text-slate-950 hover:bg-app-amber-hover transition-all"
          >
            {topicCompleted ? '↺ Review Topic' : '🎯 Complete Topic'}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => visitStage(currentStage + 1)}
            aria-label="Next page"
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-app-amber px-4 py-2 text-xs font-black text-slate-950 hover:bg-app-amber-hover transition-all"
          >
            Next ➡️ <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Topic Complete + Next Chapter panel */}
      {topicCompleted && (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5 space-y-3" aria-live="polite">
          <p className="flex items-center gap-2 font-black text-emerald-400 text-sm">
            <CheckCircle2 className="h-5 w-5" /> 🎯 Topic Completed
          </p>
          <div className="space-y-1 text-xs font-mono text-app-ink">
            <p>📚 {chapter.title}</p>
            <ul className="pl-5 space-y-0.5">
              {Array.from({ length: totalStages }, (_, i) => (
                <li key={i}>✅ {stageLabels[i]}</li>
              ))}
            </ul>
          </div>
          {nextChapterLesson ? (
            <button
              type="button"
              onClick={() => {
                onNavigateLesson(nextChapterLesson.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 rounded-xl bg-app-amber px-5 py-3 text-xs font-black text-slate-950 hover:bg-app-amber-hover transition-all shadow-sm"
            >
              🚀 Continue to Chapter {allChapters[getChapterIndex(allChapters, chapter.id) + 1]?.number || 'Next'}
              <Rocket className="h-4 w-4" />
            </button>
          ) : (
            <p className="text-xs font-bold text-app-muted">🏆 You've reached the final chapter of the course.</p>
          )}
        </div>
      )}

      {/* Important marks / references */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-app-subtle">🔖 Marks:</span>
        {[
          { label: '⭐ Key Point', icon: Star },
          { label: '🔖 Important', icon: Bookmark },
          { label: '📌 Reference', icon: Pin },
        ].map(({ label, icon: Icon }) => {
          const active = marks.includes(label);
          return (
            <button
              key={label}
              type="button"
              aria-pressed={active}
              onClick={() => onToggleMark(label)}
              className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-bold transition-all focus:outline-none focus:ring-2 focus:ring-app-amber/60 ${
                active
                  ? 'border-app-amber bg-app-amber/15 text-app-amber'
                  : 'border-app-border bg-app-surface text-app-muted hover:text-app-ink'
              }`}
            >
              <Icon className="h-3 w-3" /> {label}
            </button>
          );
        })}
        {marks.length === 0 && <span className="text-[11px] text-app-subtle">No marks yet — tag key ideas as you read.</span>}
      </div>

      {/* Stage content preview */}
      <div className="rounded-xl border border-app-border bg-app-surface p-5 space-y-3">
        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-app-amber">
          {stages[currentStage]?.[0]?.icon} {stages[currentStage]?.[0]?.heading}
        </p>
        {stages[currentStage]?.slice(0, 3).map((block, i) => (
          <div key={i} className="space-y-1.5">
            {i > 0 && <p className="text-xs font-bold text-app-ink">{block.heading}</p>}
            <p className="text-xs sm:text-sm text-app-muted leading-relaxed">{block.body}</p>
            {block.bullets?.length > 0 && (
              <ul className="space-y-1 pl-4 text-xs text-app-ink">
                {block.bullets.map((b, bi) => (
                  <li key={bi} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-app-amber" />
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            )}
            {'callout' in block && block.callout && (
              <p className="rounded-lg border-l-4 border-app-amber bg-app-inset p-3 text-xs text-app-ink">
                <strong className="font-bold text-app-amber block mb-0.5">Key Takeaway:</strong>
                <span className="text-app-muted">{block.callout.text}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
