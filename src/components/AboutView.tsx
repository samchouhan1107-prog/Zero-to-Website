import React from 'react';

interface AboutViewProps {
  onNavigateHome?: () => void;
  onNavigateLearn?: () => void;
  onNavigateWorkspace?: () => void;
  onNavigateWebTools?: () => void;
  onNavigateImageTools?: () => void;
  onNavigateDevTools?: () => void;
  onOpenLegal?: (tab: string) => void;
  onOpenTutor?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onNavigateHome,
  onNavigateLearn,
  onNavigateWorkspace,
  onNavigateWebTools,
  onNavigateImageTools,
  onNavigateDevTools,
  onOpenLegal,
  onOpenTutor,
}) => {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black text-app-ink mb-6">About WebZoneBW SC</h1>
      <div className="panel-surface p-6 sm:p-8 space-y-4">
        <p className="text-app-muted leading-relaxed">
          WebZoneBW SC is an open, independent developer learning platform built for modern web engineering.
          It combines interactive tools, visual labs, a structured curriculum, and an AI tutor to help
          learners build real-world skills from zero to professional.
        </p>
        <p className="text-app-muted leading-relaxed">
          Built by <strong className="text-app-ink">Sameer Chouhan</strong> with a focus on privacy,
          performance, and open standards. No ads, no tracking—just engineering.
        </p>
        <div className="flex flex-wrap gap-3 pt-4">
          {onNavigateHome && (
            <button type="button" onClick={onNavigateHome} className="rounded-lg border border-app-border bg-app-inset px-4 py-2 text-sm font-semibold text-app-ink transition-colors hover:bg-app-active">
              Home
            </button>
          )}
          {onNavigateLearn && (
            <button type="button" onClick={onNavigateLearn} className="rounded-lg border border-app-border bg-app-inset px-4 py-2 text-sm font-semibold text-app-ink transition-colors hover:bg-app-active">
              Curriculum
            </button>
          )}
          {onOpenTutor && (
            <button type="button" onClick={onOpenTutor} className="rounded-lg border border-app-amber/40 bg-app-amber/15 px-4 py-2 text-sm font-semibold text-app-amber transition-colors hover:bg-app-amber/25">
              Ask AI Tutor
            </button>
          )}
          {onOpenLegal && (
            <button type="button" onClick={() => onOpenLegal && onOpenLegal('privacy')} className="rounded-lg border border-app-border bg-app-inset px-4 py-2 text-sm font-semibold text-app-muted transition-colors hover:bg-app-active">
              Privacy Policy
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
