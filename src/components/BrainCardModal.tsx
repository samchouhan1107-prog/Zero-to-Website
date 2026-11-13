import React from 'react';

interface BrainCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateLesson?: (lessonId: string) => void;
  onAwardXp?: (amount: number, reason: string) => void;
}

export const BrainCardModal: React.FC<BrainCardModalProps> = ({
  isOpen,
  onClose,
  onNavigateLesson,
  onAwardXp,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg panel-surface p-6 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-black text-app-ink">Brain Card 💡</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-app-border bg-app-inset text-app-muted transition-colors hover:bg-app-active hover:text-app-ink"
          >
            ×
          </button>
        </div>
        <div className="mt-4 space-y-3 text-sm text-app-muted">
          <p>Your personal knowledge hub inside WebZoneBW SC.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Brain Notes — save snippets and insights</li>
            <li>Space Wiper — clear temp storage and prefetch cache</li>
            <li>365d Daily Bonus Vault — claim XP and perks</li>
          </ul>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {onNavigateLesson && (
            <button
              type="button"
              onClick={() => onNavigateLesson('ch-00-l-01')}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-500"
            >
              Resume Learning
            </button>
          )}
          {onAwardXp && (
            <button
              type="button"
              onClick={() => onAwardXp(50, 'Brain Card Daily Bonus')}
              className="rounded-lg border border-app-amber/40 bg-app-amber/15 px-4 py-2 text-sm font-bold text-app-amber transition-colors hover:bg-app-amber/25"
            >
              Claim 50 XP
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-app-border bg-app-inset px-4 py-2 text-sm font-semibold text-app-ink transition-colors hover:bg-app-active"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
