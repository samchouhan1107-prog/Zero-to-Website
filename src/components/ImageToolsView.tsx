import React from 'react';

interface ImageToolsViewProps {
  onNavigateVisualLab?: (toolId: string) => void;
  onNavigateWorkspace?: () => void;
}

export const ImageToolsView: React.FC<ImageToolsViewProps> = ({
  onNavigateVisualLab,
  onNavigateWorkspace,
}) => {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black text-app-ink mb-4">Image &amp; Visual Tools</h1>
      <p className="text-app-muted mb-8">
        Responsive viewport simulation, CSS visualizers, and media engineering tools.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { name: 'CSS Box Model Studio', desc: 'Visualize margin, border, padding, and content geometry.', action: () => onNavigateVisualLab && onNavigateVisualLab('box') },
          { name: 'Flexbox Studio', desc: 'Interactive 1D alignment engine with live controls.', action: () => onNavigateVisualLab && onNavigateVisualLab('flex') },
          { name: 'CSS Grid Matrix', desc: '2D grid track generator with fr units and template areas.', action: () => onNavigateVisualLab && onNavigateVisualLab('grid') },
          { name: 'Responsive Viewport', desc: 'Simulate device widths, breakpoints, and fluid scaling.', action: () => onNavigateVisualLab && onNavigateVisualLab('responsive-view') },
          { name: 'Color Palette', desc: 'Extract and refine accessible color systems.', action: () => onNavigateVisualLab && onNavigateVisualLab('color-palette') },
          { name: 'Workspace', desc: 'Open the full integrated workspace.', action: () => onNavigateWorkspace && onNavigateWorkspace() },
        ].map((tool) => (
          <button
            key={tool.name}
            type="button"
            onClick={tool.action}
            className="panel-surface p-5 text-left transition-all hover:border-blue-500/50 hover:shadow-lg"
          >
            <h3 className="text-sm font-bold text-app-ink">{tool.name}</h3>
            <p className="mt-1 text-xs text-app-muted">{tool.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
