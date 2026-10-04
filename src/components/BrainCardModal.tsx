import React, { useState, useEffect, useMemo } from 'react';
import { WebZoneSignatureAIIcon } from './WebZoneSignatureAIIcon';
import { BRAIN_CONCEPT_STONES } from '../data/brainLanguageStones';
import { getDailyBrainIdea } from '../utils/brainIdeas';

interface BrainCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateLesson?: (lessonId: string) => void;
  onAwardXp?: (amount: number, reason: string) => void;
}

const getStoredBonusState = () => {
  const streak = Number(localStorage.getItem('brainCardStreak') || '1');
  const claimedDate = localStorage.getItem('brainCardBonusClaimed');
  const todayDate = new Date().toDateString();

  return {
    streak: Number.isFinite(streak) && streak > 0 ? streak : 1,
    claimed: claimedDate === todayDate,
  };
};

export const BrainCardModal: React.FC<BrainCardModalProps> = ({
  isOpen,
  onClose,
  onNavigateLesson,
  onAwardXp,
}) => {
  const [activeStone, setActiveStone] = useState(0);
  const [bonusState, setBonusState] = useState(() => getStoredBonusState());
  const [userNotes, setUserNotes] = useState('');

  const dailyIdea = useMemo(() => getDailyBrainIdea(new Date()), [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    setBonusState(getStoredBonusState());
    setUserNotes(localStorage.getItem('brainCardNotes') ?? '');
  }, [isOpen]);

  const handlePrevStone = () => {
    setActiveStone((prev) =>
      prev > 0 ? prev - 1 : BRAIN_CONCEPT_STONES.length - 1,
    );
  };

  const handleNextStone = () => {
    setActiveStone((prev) =>
      prev < BRAIN_CONCEPT_STONES.length - 1 ? prev + 1 : 0,
    );
  };

  const handleSaveNotes = () => {
    localStorage.setItem('brainCardNotes', userNotes);
    const originalText = userNotes;
    setUserNotes('✅ Notes saved!');
    setTimeout(() => setUserNotes(originalText), 1600);
  };

  const handleClaimBonus = () => {
    if (bonusState.claimed) return;

    const nextStreak = Math.max(1, bonusState.streak + 1);
    const today = new Date().toDateString();

    localStorage.setItem('brainCardBonusClaimed', today);
    localStorage.setItem('brainCardStreak', String(nextStreak));
    setBonusState({ streak: nextStreak, claimed: true });

    onAwardXp?.(50, `Daily brain bonus: ${dailyIdea.title}`);
  };

  if (!isOpen) return null;

  const stone = BRAIN_CONCEPT_STONES[activeStone];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-[28px] border border-blue-400/30 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 shadow-[0_24px_80px_rgba(59,130,246,0.28)]">
        <div className="flex items-center justify-between border-b border-blue-400/20 bg-slate-900/50 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <WebZoneSignatureAIIcon size="md" variant="brain" interactive={false} className="ring-2 ring-blue-400/30" />
            <div>
              <h2 className="text-xl font-black text-blue-200">Brain Card 💡</h2>
              <p className="text-xs text-blue-300/80">Daily challenge vault • 365-day learning rotation</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-2 text-blue-200 transition hover:bg-blue-500/20 hover:text-white"
            aria-label="Close Brain Card"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          <aside className="w-full border-b border-blue-400/20 bg-slate-900/60 p-5 lg:w-[330px] lg:border-b-0 lg:border-r">
            <div className="mb-5 rounded-2xl border border-amber-400/35 bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-rose-500/10 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-base font-bold text-amber-200">🎁 Daily Bonus</h3>
                <span className="rounded-full bg-amber-400/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-200">
                  {dailyIdea.dayLabel}
                </span>
              </div>

              <div className="mb-3">
                <div className="text-2xl font-black text-amber-100">+50 XP</div>
                <div className="text-xs text-amber-100/80">Current streak: {bonusState.streak} day{bonusState.streak === 1 ? '' : 's'}</div>
              </div>

              <button
                onClick={handleClaimBonus}
                disabled={bonusState.claimed}
                className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-orange-600/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {bonusState.claimed ? '✅ Claimed Today' : 'Claim Bonus'}
              </button>
            </div>

            <div className="mb-5 rounded-2xl border border-sky-500/20 bg-sky-500/5 p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-base font-bold text-sky-200">🧠 Today’s idea</h3>
                <span className="text-xs text-sky-200/80">{dailyIdea.yearProgress}%</span>
              </div>
              <div className={`rounded-xl bg-gradient-to-r ${dailyIdea.accent} p-[1px]`}>
                <div className="rounded-[11px] bg-slate-950/80 px-3 py-3 text-left">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-200/80">{dailyIdea.focus}</div>
                  <div className="mt-2 text-base font-bold text-white">{dailyIdea.title}</div>
                  <p className="mt-2 text-sm text-slate-300">{dailyIdea.summary}</p>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <h3 className="mb-3 text-base font-bold text-blue-200">🧩 Learning stones</h3>
              <div className="space-y-2">
                {BRAIN_CONCEPT_STONES.map((stone, index) => (
                  <button
                    key={stone.id}
                    onClick={() => setActiveStone(index)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
                      activeStone === index
                        ? 'border-blue-400/60 bg-blue-500/15 text-blue-100'
                        : 'border-slate-700 bg-slate-800/60 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-lg">{stone.stoneIcon}</span>
                    <div>
                      <div className="text-sm font-semibold">Stone {stone.stoneNumber}</div>
                      <div className="text-[11px] text-slate-400">{stone.category}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-base font-bold text-blue-200">📝 Personal notes</h3>
              <textarea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="Write your learning notes, reminders, or insights..."
                className="h-28 w-full resize-none rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
              />
              <button
                onClick={handleSaveNotes}
                className="mt-2 w-full rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Save Notes
              </button>
            </div>
          </aside>

          <main className="flex-1 overflow-y-auto bg-slate-950/30 p-5 sm:p-6">
            <div className="mb-6 rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl">{stone.stoneIcon}</span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/80">{stone.category}</div>
                  <h3 className="mt-1 text-2xl font-black text-blue-100">{stone.title}</h3>
                </div>
              </div>
              <p className="text-sm text-blue-200/80">{stone.tagline}</p>
            </div>

            <div className="space-y-5">
              <section className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
                <h4 className="mb-4 text-lg font-bold text-blue-200">🧠 Brain-friendly translations</h4>
                <div className="space-y-4">
                  {stone.tagsToWords.map((mapping, index) => (
                    <div key={index} className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
                      <div className="mb-3">
                        <code className="rounded bg-slate-700 px-2 py-1 font-mono text-xs text-cyan-300">{mapping.tagOrKeyword}</code>
                      </div>
                      <div className="space-y-2 text-sm text-slate-300">
                        <div><span className="font-bold text-blue-200">🎯 Human word:</span> {mapping.humanWord}</div>
                        <div><span className="font-bold text-blue-200">🧠 Mental model:</span> {mapping.mentalModel}</div>
                        <div><span className="font-bold text-blue-200">🏠 Real life:</span> {mapping.realLifeAnalogy}</div>
                        <div><span className="font-bold text-amber-200">💡 Tip:</span> {mapping.beginnerTip}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
                <h4 className="mb-3 text-lg font-bold text-blue-200">🛠️ Practice example</h4>
                <div className="rounded-xl border border-slate-700 bg-slate-950/80 p-3">
                  <h5 className="mb-2 text-base font-bold text-blue-100">{stone.practiceExample.title}</h5>
                  <p className="mb-3 text-sm text-slate-300">{stone.practiceExample.description}</p>
                  <div dangerouslySetInnerHTML={{ __html: stone.practiceExample.html }} />
                  <p className="mt-3 text-xs italic text-blue-300">{stone.practiceExample.interactiveActionPrompt}</p>
                </div>
              </section>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
              <button
                onClick={handlePrevStone}
                className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                Previous
              </button>

              <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Stone {activeStone + 1} / {BRAIN_CONCEPT_STONES.length}
              </span>

              <button
                onClick={handleNextStone}
                className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
              >
                Next
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          </main>
        </div>

        <div className="border-t border-blue-400/20 bg-slate-900/60 px-4 py-3 text-center text-[11px] text-slate-400">
          🎯 Strengthen memory with small daily wins • 💾 Notes saved locally • 🚀 Keep the streak alive all year
        </div>
      </div>
    </div>
  );
};