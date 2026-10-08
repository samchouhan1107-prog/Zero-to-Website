import React from 'react';

interface WebToolsViewProps {
  onNavigateWorkspace?: () => void;
  onNavigateDevTools?: () => void;
  onNavigateVisualLab?: (toolId: string) => void;
}

export const WebToolsView: React.FC<WebToolsViewProps> = ({
  onNavigateWorkspace,
  onNavigateDevTools,
  onNavigateVisualLab,
}) => {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black text-app-ink mb-4">Web Tools</h1>
      <p className="text-app-muted mb-8">
        A curated suite of browser-based utilities for inspecting, debugging, and optimizing web pages.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { name: 'REPL Sandbox', desc: 'Live HTML/CSS/JS editor with instant preview.', action: () => onNavigateWorkspace && onNavigateWorkspace() },
          { name: 'DOM Inspector', desc: 'Visualize live document trees and node attributes.', action: () => onNavigateVisualLab && onNavigateVisualLab('dom') },
          { name: 'HTTP & DNS Trace', desc: 'Trace request pipelines, DNS resolution, and TLS handshakes.', action: () => onNavigateVisualLab && onNavigateVisualLab('net') },
          { name: 'Critical Path', desc: 'Inspect DOM + CSSOM construction and render pipeline.', action: () => onNavigateVisualLab && onNavigateVisualLab('criticalpath') },
          { name: 'Semantic HTML', desc: 'Audit landmark hierarchies and SEO structure.', action: () => onNavigateVisualLab && onNavigateVisualLab('semantic-html') },
          { name: 'Accessibility', desc: 'Validate ARIA roles, states, and WCAG contrast.', action: () => onNavigateVisualLab && onNavigateVisualLab('html-skeleton') },
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
