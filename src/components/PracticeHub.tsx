import React, { useEffect, useState } from 'react';
import { CheckCircle2, Code2, Filter, Play, Sparkles } from 'lucide-react';
import { Chapter, PracticeChallenge, UserProgress } from '../types';
import { PracticeSandbox } from './PracticeSandbox';

interface PracticeHubProps {
  chapters: Chapter[];
  progress: UserProgress;
  onCompleteChallenge: (challengeId: string) => void;
}

const difficultyOptions = ['all', 'Beginner', 'Intermediate', 'Advanced'] as const;
type DifficultyFilter = (typeof difficultyOptions)[number];

export const PracticeHub: React.FC<PracticeHubProps> = ({ chapters, progress, onCompleteChallenge }) => {
  const allChallenges: { challenge: PracticeChallenge; chapterTitle: string; lessonTitle: string }[] = [];
  chapters.forEach((chapter) => {
    chapter.lessons.forEach((lesson) => {
      if (lesson.practice) {
        allChallenges.push({ challenge: lesson.practice, chapterTitle: chapter.title, lessonTitle: lesson.title });
      }
    });
  });

  const [selectedChallengeId, setSelectedChallengeId] = useState(allChallenges[0]?.challenge.id || '');
  const [filterDifficulty, setFilterDifficulty] = useState<DifficultyFilter>('all');
  const filtered = allChallenges.filter(({ challenge }) => filterDifficulty === 'all' || challenge.difficulty === filterDifficulty);
  const activeItem = filtered.find(({ challenge }) => challenge.id === selectedChallengeId) || filtered[0];
  const completedCount = allChallenges.filter(({ challenge }) => progress.completedChallenges[challenge.id]).length;

  useEffect(() => {
    if (filtered.length > 0 && !filtered.some(({ challenge }) => challenge.id === selectedChallengeId)) {
      setSelectedChallengeId(filtered[0].challenge.id);
    }
  }, [filterDifficulty, selectedChallengeId]);

  return (
    <div id="practice-hub-view" className="mx-auto w-full max-w-[1180px] min-w-0 space-y-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <section className="panel-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="min-w-0 max-w-3xl">
            <p className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-400"><Code2 className="h-4 w-4" aria-hidden="true" /> Practice arena / sandbox</p>
            <h1 className="mt-3 text-3xl font-black leading-tight tracking-[-0.03em] text-app-ink sm:text-4xl">Build until the concept sticks.</h1>
            <p className="mt-3 text-base leading-relaxed text-app-muted">Work through isolated HTML, CSS, and JavaScript challenges with live previews, verification, hints, and optional code review.</p>
          </div>
          <div className="border-l border-app-border pl-4"><p className="font-mono text-[11px] uppercase tracking-[0.12em] text-app-subtle">Progress</p><p className="mt-2 font-mono text-2xl font-black tabular-nums text-app-amber">{completedCount}<span className="text-sm text-app-muted"> / {allChallenges.length}</span></p><p className="mt-1 text-xs text-app-muted">challenges mastered</p></div>
        </div>
        <div className="mt-6 flex min-w-0 items-center gap-2 overflow-x-auto border-t border-app-border pt-4" aria-label="Filter challenges by difficulty">
          <Filter className="h-4 w-4 shrink-0 text-app-subtle" aria-hidden="true" />
          {difficultyOptions.map((difficulty) => <button key={difficulty} type="button" onClick={() => setFilterDifficulty(difficulty)} aria-pressed={filterDifficulty === difficulty} className={`min-h-11 shrink-0 rounded-control border px-3 text-xs font-bold transition-colors ${filterDifficulty === difficulty ? 'border-app-amber bg-app-amber text-slate-950' : 'border-app-border bg-app-inset text-app-muted hover:border-app-amber/70 hover:text-app-ink'}`}>{difficulty === 'all' ? 'All challenges' : difficulty}</button>)}
        </div>
      </section>

      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(220px,0.36fr)_minmax(0,0.64fr)] lg:items-start">
        <aside className="panel-surface min-w-0 overflow-hidden" aria-label="Practice challenges">
          <div className="border-b border-app-border px-4 py-3"><p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-app-subtle">Challenge list</p><p className="mt-1 text-xs text-app-muted">{filtered.length} available at this level</p></div>
          <div className="max-h-[720px] min-w-0 overflow-y-auto p-2 scrollbar-thin">
            {filtered.length === 0 ? <div className="m-2 rounded-control border border-dashed border-app-border bg-app-inset p-4 text-center"><p className="text-sm font-bold text-app-ink">No challenges match</p><p className="mt-1 text-xs leading-relaxed text-app-muted">Choose another difficulty to keep practicing.</p><button type="button" onClick={() => setFilterDifficulty('all')} className="mt-3 min-h-11 rounded-control border border-app-amber/70 px-3 text-xs font-bold text-app-amber hover:bg-app-active">Clear filter</button></div> : filtered.map(({ challenge, chapterTitle, lessonTitle }) => {
              const isSelected = selectedChallengeId === challenge.id;
              const isCompleted = progress.completedChallenges[challenge.id];
              return <button key={challenge.id} type="button" onClick={() => setSelectedChallengeId(challenge.id)} aria-pressed={isSelected} className={`w-full min-w-0 rounded-control border p-3 text-left transition-colors ${isSelected ? 'border-app-amber bg-app-active' : 'border-transparent hover:border-app-border hover:bg-app-inset'}`}><div className="flex items-start justify-between gap-2"><span className="min-w-0 truncate font-mono text-[10px] uppercase tracking-[0.08em] text-app-subtle">{chapterTitle}</span><span className={`shrink-0 rounded-control border px-1.5 py-0.5 font-mono text-[10px] font-bold ${challenge.difficulty === 'Beginner' ? 'border-cyan-400/40 text-cyan-400' : challenge.difficulty === 'Intermediate' ? 'border-app-amber/50 text-app-amber' : 'border-red-400/50 text-red-400'}`}>{challenge.difficulty}</span></div><h2 className="mt-2 truncate text-sm font-bold text-app-ink">{challenge.title}</h2><p className="mt-1 line-clamp-2 text-xs leading-relaxed text-app-muted">{challenge.prompt}</p><div className="mt-3 flex items-center justify-between gap-2 border-t border-app-border pt-2 font-mono text-[10px] text-app-subtle"><span className="min-w-0 truncate">{lessonTitle}</span>{isCompleted ? <span className="flex shrink-0 items-center gap-1 font-bold text-emerald-400"><CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> Solved</span> : <span className="flex shrink-0 items-center gap-1 text-app-amber">Solve <Play className="h-3 w-3 fill-current" aria-hidden="true" /></span>}</div></button>;
            })}
          </div>
        </aside>

        <section className="min-w-0" aria-label="Selected practice challenge">
          {activeItem ? <PracticeSandbox key={activeItem.challenge.id} challenge={activeItem.challenge} onComplete={onCompleteChallenge} isCompleted={progress.completedChallenges[activeItem.challenge.id]} /> : <div className="panel-surface p-8 text-center"><Sparkles className="mx-auto h-6 w-6 text-app-amber" aria-hidden="true" /><p className="mt-3 text-sm font-bold text-app-ink">Choose a challenge to begin.</p></div>}
        </section>
      </div>
    </div>
  );
};
