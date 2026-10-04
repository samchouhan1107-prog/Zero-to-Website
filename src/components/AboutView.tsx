import React from 'react';
import { ArrowRight, BookOpen, Code2, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import { PolicyTab } from './LegalComplianceModal';

interface AboutViewProps {
  onNavigateHome?: () => void;
  onNavigateLearn?: () => void;
  onNavigateWorkspace?: () => void;
  onNavigateWebTools?: () => void;
  onNavigateImageTools?: () => void;
  onNavigateDevTools?: () => void;
  onOpenLegal?: (tab?: PolicyTab) => void;
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
  const links = [
    { label: 'Learning path', icon: BookOpen, action: onNavigateLearn },
    { label: 'Code workspace', icon: Code2, action: onNavigateWorkspace },
    { label: 'Web tools', icon: Compass, action: onNavigateWebTools },
    { label: 'Image tools', icon: Compass, action: onNavigateImageTools },
    { label: 'Developer tools', icon: Code2, action: onNavigateDevTools },
  ];

  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <header className="border-b border-app-border pb-6">
        <button
          type="button"
          onClick={onNavigateHome}
          className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-app-muted transition-colors hover:text-app-amber"
        >
          <Compass className="h-4 w-4" aria-hidden="true" />
          Back to overview
        </button>
        <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-app-amber">About the platform</p>
        <h1 className="text-2xl font-bold leading-tight text-app-ink sm:text-3xl">A practical place to learn the web</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-app-muted">
          WebZoneBW brings together a structured web development curriculum, hands-on practice, and interactive browser tools.
        </p>
      </header>

      <div className="grid gap-8 py-7 lg:grid-cols-[minmax(0,1.3fr)_minmax(240px,0.7fr)]">
        <div className="space-y-7">
          <section aria-labelledby="about-mission">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-app-amber" aria-hidden="true" />
              <h2 id="about-mission" className="text-sm font-semibold text-app-ink">How we teach</h2>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-app-muted">
              Learn by connecting clear explanations to real code. Lessons pair core concepts with examples, practice, and progress tracking so you can build confidence one step at a time.
            </p>
          </section>
          <section aria-labelledby="about-principles" className="border-t border-app-border pt-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-app-amber" aria-hidden="true" />
              <h2 id="about-principles" className="text-sm font-semibold text-app-ink">What you will find here</h2>
            </div>
            <ul className="mt-3 grid gap-x-6 gap-y-2 text-sm text-app-muted sm:grid-cols-2">
              <li>HTML, CSS, and JavaScript lessons</li>
              <li>Interactive visual learning tools</li>
              <li>Practice with immediate feedback</li>
              <li>Learning progress and achievements</li>
            </ul>
          </section>
        </div>

        <nav aria-label="Explore WebZoneBW" className="border-t border-app-border lg:border-l lg:border-t-0 lg:pl-6">
          <h2 className="py-3 text-sm font-semibold text-app-ink">Explore</h2>
          <ul className="divide-y divide-app-border border-y border-app-border">
            {links.map(({ label, icon: Icon, action }) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={action}
                  className="flex min-h-11 w-full items-center justify-between gap-3 text-left text-xs font-medium text-app-muted transition-colors hover:text-app-amber"
                >
                  <span className="flex items-center gap-2"><Icon className="h-4 w-4" aria-hidden="true" />{label}</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            <button type="button" onClick={() => onOpenLegal?.('about')} className="text-xs font-medium text-app-muted underline decoration-app-border underline-offset-4 hover:text-app-amber">About &amp; policies</button>
            <button type="button" onClick={onOpenTutor} className="text-xs font-medium text-app-muted underline decoration-app-border underline-offset-4 hover:text-app-amber">Ask the tutor</button>
          </div>
        </nav>
      </div>
    </div>
  );
};