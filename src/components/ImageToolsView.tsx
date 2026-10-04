import React from 'react';
import { ArrowRight, Image, Layers, MonitorUp } from 'lucide-react';

interface ImageToolsViewProps {
  onNavigateVisualLab?: (toolId: string) => void;
  onNavigateWorkspace?: () => void;
}

export const ImageToolsView: React.FC<ImageToolsViewProps> = ({
  onNavigateVisualLab,
  onNavigateWorkspace,
}) => (
  <div className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
    <header className="border-b border-app-border pb-6">
      <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-app-amber">
        Tool directory
      </p>
      <h1 className="text-2xl font-bold leading-tight text-app-ink sm:text-3xl">Image tools</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-app-muted">
        Image editing and optimization tools are not available yet. You can prepare assets in the workspace and explore responsive layout behavior in the visual lab.
      </p>
    </header>

    <main className="grid gap-6 py-7 md:grid-cols-[minmax(0,1fr)_minmax(240px,0.7fr)]">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Image className="h-4 w-4 text-app-amber" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-app-ink">Image processing</h2>
        </div>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-app-muted">
          Dedicated image conversion, compression, and cropping workflows are still in development. No files are uploaded or modified on this page.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onNavigateWorkspace}
            className="inline-flex min-h-10 items-center gap-2 rounded-md bg-app-amber px-3.5 text-sm font-semibold text-white transition-colors hover:bg-app-amber-hover"
          >
            <MonitorUp className="h-4 w-4" aria-hidden="true" />
            Open workspace
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onNavigateVisualLab?.('box')}
            className="inline-flex min-h-10 items-center gap-2 rounded-md border border-app-border bg-app-surface px-3.5 text-sm font-semibold text-app-ink transition-colors hover:border-app-amber/50 hover:text-app-amber"
          >
            <Layers className="h-4 w-4" aria-hidden="true" />
            Explore visual lab
          </button>
        </div>
      </div>
      <aside className="border-l-2 border-app-amber/60 bg-app-inset/60 px-4 py-3">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-app-subtle">
          Availability
        </p>
        <p className="mt-1 text-sm font-semibold text-app-ink">In development</p>
        <p className="mt-1 text-xs leading-relaxed text-app-muted">
          This page will update when image workflows are ready to use.
        </p>
      </aside>
    </main>
  </div>
);