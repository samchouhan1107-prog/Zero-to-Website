import React from 'react';
import { ArrowRight, Code2, Layers, Terminal } from 'lucide-react';

interface WebToolsViewProps {
  onNavigateWorkspace?: () => void;
  onNavigateDevTools?: () => void;
  onNavigateVisualLab?: (toolId: string) => void;
}

export const WebToolsView: React.FC<WebToolsViewProps> = ({ onNavigateWorkspace, onNavigateDevTools, onNavigateVisualLab }) => {
  const destinations = [
    { title: 'Code workspace', description: 'Work with project files and continue hands-on experiments.', icon: Code2, action: onNavigateWorkspace, label: 'Open workspace' },
    { title: 'Developer tools', description: 'Inspect browser concepts and explore the rendering path.', icon: Terminal, action: onNavigateDevTools, label: 'Open developer tools' },
    { title: 'Visual lab', description: 'Explore interactive models for layout and browser fundamentals.', icon: Layers, action: () => onNavigateVisualLab?.('box'), label: 'Open visual lab' },
  ];

  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <header className="border-b border-app-border pb-6">
        <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-app-amber">Tool directory</p>
        <h1 className="text-2xl font-bold leading-tight text-app-ink sm:text-3xl">Web development tools</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-app-muted">
          Jump into practical tools for writing code, inspecting browser behavior, and understanding layout systems.
        </p>
      </header>

      <nav aria-label="Web development tools" className="divide-y divide-app-border">
        {destinations.map(({ title, description, icon: Icon, action, label }) => (
          <div key={title} className="flex flex-wrap items-center justify-between gap-4 py-5">
            <div className="flex min-w-0 items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-app-border bg-app-surface text-app-amber">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-app-ink">{title}</h2>
                <p className="mt-1 max-w-2xl text-xs leading-relaxed text-app-muted">{description}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={action}
              className="inline-flex min-h-9 items-center gap-2 rounded-md border border-app-border bg-app-surface px-3 text-xs font-semibold text-app-ink transition-colors hover:border-app-amber/50 hover:text-app-amber"
            >
              {label}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        ))}
      </nav>
    </div>
  );
};