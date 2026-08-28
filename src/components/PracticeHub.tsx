import React, { useState } from 'react';
import { Code2, CheckCircle2, Sparkles, Filter, Play } from 'lucide-react';
import { Chapter, PracticeChallenge, UserProgress } from '../types';
import { PracticeSandbox } from './PracticeSandbox';

interface PracticeHubProps {
  chapters: Chapter[];
  progress: UserProgress;
  onCompleteChallenge: (challengeId: string) => void;
}

export const PracticeHub: React.FC<PracticeHubProps> = ({
  chapters,
  progress,
  onCompleteChallenge,
}) => {
  // Extract all practice challenges from curriculum
  const allChallenges: { challenge: PracticeChallenge; chapterTitle: string; lessonTitle: string }[] = [];
  chapters.forEach((ch) => {
    ch.lessons.forEach((l) => {
      if (l.practice) {
        allChallenges.push({
          challenge: l.practice,
          chapterTitle: ch.title,
          lessonTitle: l.title,
        });
      }
    });
  });

  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(
    allChallenges[0]?.challenge.id || 'pc-00-1'
  );
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  const activeItem = allChallenges.find((c) => c.challenge.id === selectedChallengeId) || allChallenges[0];

  const filtered = allChallenges.filter((item) => {
    if (filterDifficulty === 'all') return true;
    return item.challenge.difficulty === filterDifficulty;
  });

  const completedCount = allChallenges.filter((c) => progress.completedChallenges[c.challenge.id]).length;

  return (
    <div id="practice-hub-view" className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-10 sm:py-14 space-y-12">
      {/* 1. Atmospheric Hero Presentation */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 dark:bg-[#0b0d13] border border-slate-800 dark:border-[#1a1e2a] p-8 sm:p-12 text-white shadow-2xl">
        {/* Ambient Glow Gradients */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-12 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider bg-emerald-400/15 text-emerald-300 border border-emerald-400/30 flex items-center gap-2 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Interactive Coding Arena
              </span>
              <span className="text-xs font-mono text-slate-400 bg-slate-800/60 dark:bg-[#141722] px-3.5 py-1.5 rounded-full border border-slate-700/50 dark:border-[#1f2536]">
                {completedCount}/{allChallenges.length} Challenges Mastered
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.2]">
              Hands-On <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Practice Sandbox
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed pt-1">
              Build real components in an isolated sandbox with automated validation, hints, and instant AI code review.
            </p>
          </div>

          {/* Filter Segmented Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-800/80 dark:bg-[#141722] border border-slate-700 dark:border-[#1f2536] text-xs font-bold shadow-inner">
            {['all', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => {
              const isSelected = filterDifficulty === diff;
              return (
                <button
                  key={diff}
                  onClick={() => setFilterDifficulty(diff)}
                  className={`px-4 py-2 rounded-xl transition-all capitalize cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <span>{diff}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Challenge Selector List */}
        <div className="lg:col-span-4 space-y-3 max-h-[750px] overflow-y-auto pr-1 no-scrollbar">
          {filtered.map(({ challenge, chapterTitle, lessonTitle }) => {
            const isSelected = selectedChallengeId === challenge.id;
            const isCompleted = progress.completedChallenges[challenge.id];

            return (
              <button
                key={challenge.id}
                onClick={() => setSelectedChallengeId(challenge.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-2 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-[#0b0d13] border-emerald-500 shadow-lg ring-2 ring-emerald-500/60 scale-[1.01]'
                    : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:scale-[1.005]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-1">
                    <span className="truncate">{chapterTitle}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold uppercase text-[9px] border ${
                        challenge.difficulty === 'Beginner'
                          ? 'bg-blue-500/10 text-blue-600 dark:text-cyan-400 border-blue-500/30'
                          : challenge.difficulty === 'Intermediate'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-yellow-400 border-amber-500/30'
                          : 'bg-red-500/10 text-red-600 dark:text-rose-400 border-red-500/30'
                      }`}
                    >
                      {challenge.difficulty}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {challenge.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {challenge.prompt}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                  <span className="text-indigo-600 dark:text-cyan-400 font-mono text-[10px] truncate max-w-[180px]">
                    {lessonTitle}
                  </span>
                  {isCompleted ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Solved
                    </span>
                  ) : (
                    <span className="text-slate-500 hover:text-slate-200 flex items-center gap-1">
                      Solve <Play className="w-3 h-3 fill-current" />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Sandbox Arena */}
        <div className="lg:col-span-8">
          {activeItem && (
            <PracticeSandbox
              key={activeItem.challenge.id}
              challenge={activeItem.challenge}
              onComplete={onCompleteChallenge}
              isCompleted={progress.completedChallenges[activeItem.challenge.id]}
            />
          )}
        </div>
      </div>
    </div>
  );
};
