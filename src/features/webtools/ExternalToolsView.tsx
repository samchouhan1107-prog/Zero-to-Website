import React, { useMemo, useState } from 'react';
import { ArrowRight, ExternalLink, Search, Wrench } from 'lucide-react';
import { EXTERNAL_TOOL_CATEGORIES, EXTERNAL_TOOLS } from '../../data/externalTools';
import { INFRASTRUCTURE_ARTICLES } from '../../data/blog/infrastructureArticles';

interface ExternalToolsViewProps {
  onNavigate: (view: string) => void;
}

export const ExternalToolsView: React.FC<ExternalToolsViewProps> = ({ onNavigate }) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All tools');

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return EXTERNAL_TOOLS.filter((tool) => {
      const matchesCategory = activeCategory === 'All tools' || tool.category === activeCategory;
      const searchable = [tool.name, tool.description, tool.purpose, tool.category, ...tool.useCases].join(' ').toLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [activeCategory, query]);

  const openArticle = (slug: string) => {
    const article = INFRASTRUCTURE_ARTICLES.find((candidate) => candidate.slug === slug);
    if (!article) return;
    const url = new URL(window.location.href);
    url.searchParams.set('blog', article.slug);
    url.searchParams.delete('view');
    window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
    onNavigate('blog');
  };

  return (
    <main className="app-main" aria-labelledby="external-tools-heading">
      <header className="section-heading-bar">
        <div>
          <h1 id="external-tools-heading">External Tools &amp; Infrastructure</h1>
          <p className="lead-paragraph" style={{ margin: 'var(--space-2) 0 0', fontSize: 'var(--text-sm)' }}>
            A practical directory of real network, server, developer, security, and deployment tools. Each link opens the official project or provider resource; this page does not simulate checks or collect credentials.
          </p>
        </div>
      </header>

      <section aria-label="Find tools" style={{ marginBlock: 'var(--space-5)' }}>
        <label htmlFor="external-tool-search" style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 700 }}>
          Search tools
        </label>
        <div style={{ position: 'relative', maxWidth: '36rem' }}>
          <Search size={18} aria-hidden="true" style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-subtle)' }} />
          <input
            id="external-tool-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by tool, task, or category"
            style={{ width: '100%', paddingInlineStart: '2.5rem' }}
          />
        </div>
        <div aria-label="Filter tools by category" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
          {['All tools', ...EXTERNAL_TOOL_CATEGORIES].map((category) => (
            <button
              key={category}
              type="button"
              className={`btn btn-sm ${activeCategory === category ? 'btn-primary' : 'btn-secondary'}`}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <p aria-live="polite" style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)' }}>
        Showing {filteredTools.length} of {EXTERNAL_TOOLS.length} tools.
      </p>

      {filteredTools.length ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 'var(--space-4)' }}>
          {filteredTools.map((tool) => {
            const relatedArticles = tool.relatedArticleSlugs
              .map((slug) => INFRASTRUCTURE_ARTICLES.find((article) => article.slug === slug))
              .filter((article): article is (typeof INFRASTRUCTURE_ARTICLES)[number] => Boolean(article));

            return (
              <article key={tool.id} className="card" aria-labelledby={`tool-${tool.id}`} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <header>
                  <span className="badge badge-subtle">{tool.category}</span>
                  <h2 id={`tool-${tool.id}`} style={{ margin: 'var(--space-2) 0', fontSize: 'var(--text-lg)' }}>
                    <Wrench size={17} aria-hidden="true" style={{ verticalAlign: 'text-bottom', marginInlineEnd: '0.4rem', color: 'var(--color-accent)' }} />
                    {tool.name}
                  </h2>
                  <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>{tool.description}</p>
                </header>

                <p style={{ margin: 0, fontSize: 'var(--text-sm)' }}><strong>Purpose:</strong> {tool.purpose}</p>
                <div>
                  <h3 style={{ margin: '0 0 var(--space-1)', fontSize: 'var(--text-sm)' }}>Useful for</h3>
                  <ul style={{ margin: 0, paddingInlineStart: '1.25rem', color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)', lineHeight: 1.65 }}>
                    {tool.useCases.map((useCase) => <li key={useCase}>{useCase}</li>)}
                  </ul>
                </div>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)' }}><strong>Requirements:</strong> {tool.requirements}</p>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)' }}><strong>Access:</strong> {tool.accessType}</p>
                {tool.notes && <p role="note" style={{ margin: 0, color: 'var(--color-warning, var(--color-text-muted))', fontSize: 'var(--text-xs)' }}><strong>Note:</strong> {tool.notes}</p>}

                <a
                  className="btn btn-primary btn-sm"
                  href={tool.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ alignSelf: 'flex-start', marginTop: 'auto' }}
                >
                  Open official tool or docs <ExternalLink size={14} aria-hidden="true" />
                </a>

                {relatedArticles.length > 0 && (
                  <nav aria-label={`Articles related to ${tool.name}`} style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-3)' }}>
                    <h3 style={{ margin: '0 0 var(--space-2)', fontSize: 'var(--text-xs)' }}>Related learning</h3>
                    <ul style={{ display: 'grid', gap: 'var(--space-2)', margin: 0, padding: 0, listStyle: 'none' }}>
                      {relatedArticles.map((article) => (
                        <li key={article.slug}>
                          <button type="button" className="btn-link" onClick={() => openArticle(article.slug)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textAlign: 'left' }}>
                            {article.title} <ArrowRight size={14} aria-hidden="true" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <p role="status" className="card">No tools match that search. Try another term or select a different category.</p>
      )}
    </main>
  );
};
