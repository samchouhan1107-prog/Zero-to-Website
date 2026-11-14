import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Compass,
  Search,
  Sparkles,
  Tag,
} from 'lucide-react';
import { BlogArticle } from '../../utils/types';
import { BLOG_ARTICLES, FEATURED_ARTICLES } from '../../data/blogArticles';
import { LEGACY_BLOG_ARTICLES } from '../../data/blog/blogAdapter';
import { EXTERNAL_TOOLS } from '../../data/externalTools';
import type { BlogSection } from '../../data/blogData';
import { SEO_PRESETS, useSEOMeta } from '../../utils/useSEOMeta';
import {
  BlogShellContext,
  formatBlogDate,
  resolveBlogTargetAction,
} from './blogUtils';

interface BlogViewProps {
  articles?: BlogArticle[];
  featuredArticles?: BlogArticle[];
  shellContext?: BlogShellContext;
  onNavigate: (view: string) => void;
  onOpenLesson?: (lessonId: string) => void;
}

const ALL_BLOG_ARTICLES: BlogArticle[] = [...BLOG_ARTICLES, ...LEGACY_BLOG_ARTICLES];

function renderArticleContent(content: string, articleTitle: string): React.ReactNode[] {
  const lines = content.split(/\r?\n/);
  const blocks: React.ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      index += 1;
      continue;
    }

    const codeStart = trimmedLine.match(/^\[([a-z]+)\]$/i);
    if (codeStart) {
      const language = codeStart[1].toLowerCase();
      const closingTag = `[/${language}]`;
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && lines[index].trim().toLowerCase() !== closingTag) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) index += 1;
      blocks.push(
        <div key={`code-${blocks.length}`} className="blog-code-block">
          <div className="blog-code-header">
            <span>{language}</span>
          </div>
          <pre className="blog-code-pre">
            <code>{codeLines.join('\n')}</code>
          </pre>
        </div>
      );
      continue;
    }

    const heading = trimmedLine.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const headingText = heading[2].trim();
      if (!(heading[1].length === 1 && headingText === articleTitle)) {
        const HeadingTag = heading[1].length >= 3 ? 'h3' : 'h2';
        blocks.push(
          <HeadingTag key={`heading-${blocks.length}`} className="blog-section-heading">
            {headingText}
          </HeadingTag>
        );
      }
      index += 1;
      continue;
    }

    if (/^[-*]\s+/.test(trimmedLine) || /^\d+\.\s+/.test(trimmedLine)) {
      const isOrdered = /^\d+\.\s+/.test(trimmedLine);
      const listItems: string[] = [];
      while (
        index < lines.length &&
        (/^[-*]\s+/.test(lines[index].trim()) || /^\d+\.\s+/.test(lines[index].trim()))
      ) {
        listItems.push(lines[index].trim().replace(/^([-*]|\d+\.)\s+/, ''));
        index += 1;
      }
      const ListTag = isOrdered ? 'ol' : 'ul';
      blocks.push(
        <ListTag key={`list-${blocks.length}`} className="blog-section-list">
          {listItems.map((item, idx) => (
            <li key={idx}>{item.replace(/\*\*(.*?)\*\*/g, '$1')}</li>
          ))}
        </ListTag>
      );
      continue;
    }

    const paragraphLines = [line];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^\[([a-z]+)\]$/i.test(lines[index].trim()) &&
      !/^#{1,3}\s+/.test(lines[index].trim()) &&
      !/^[-*]\s+/.test(lines[index].trim()) &&
      !/^\d+\.\s+/.test(lines[index].trim())
    ) {
      paragraphLines.push(lines[index]);
      index += 1;
    }

    blocks.push(
      <p key={`paragraph-${blocks.length}`} className="blog-section-text">
        {paragraphLines.join(' ').replace(/\*\*(.*?)\*\*/g, '$1')}
      </p>
    );
  }

  return blocks;
}

function renderStructuredContent(
  sections: BlogSection[],
  onResolveTarget: (target: string) => void
): React.ReactNode[] {
  return sections.map((section, index) => (
    <section key={`section-${index}`} className="blog-section">
      {section.heading && <h2 className="blog-section-heading">{section.heading}</h2>}

      {section.text.trim() && <p className="blog-section-text">{section.text}</p>}

      {section.list && section.list.length > 0 && (
        <ul className="blog-section-list">
          {section.list.map((item, itemIndex) => (
            <li key={`${index}-${itemIndex}`}>{item}</li>
          ))}
        </ul>
      )}

      {section.table && (
        <div className="blog-table-wrap">
          <table className="blog-table">
            <thead>
              <tr>
                {section.table.headers.map((heading) => (
                  <th key={heading} scope="col">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`}>
                  {section.table?.headers.map((_, columnIndex) => (
                    <td key={`cell-${columnIndex}`}>{row[columnIndex] || ''}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.code && (
        <div className="blog-code-block">
          <div className="blog-code-header">
            <span>{section.code.language}</span>
          </div>
          <pre className="blog-code-pre">
            <code className={`language-${section.code.language}`}>{section.code.code}</code>
          </pre>
        </div>
      )}

      {section.callout && (
        <aside
          aria-label={section.callout.title || section.callout.type}
          className={`blog-callout ${
            section.callout.type === 'tip'
              ? 'blog-callout--tip'
              : section.callout.type === 'warning'
              ? 'blog-callout--warning'
              : ''
          }`}
        >
          {section.callout.title && (
            <strong className="blog-callout-title">{section.callout.title}</strong>
          )}
          <p className="blog-section-text" style={{ margin: 0 }}>
            {section.callout.text}
          </p>
        </aside>
      )}

      {section.checkpoint && (
        <aside className="blog-checkpoint" aria-label="Knowledge checkpoint">
          <h3 className="blog-checkpoint-title">Quick Check</h3>
          <p className="blog-section-text" style={{ margin: 0 }}>
            {section.checkpoint.question}
          </p>
          <details>
            <summary>Show answer</summary>
            <div className="blog-checkpoint-answer">
              <p style={{ margin: 0 }}>{section.checkpoint.answer}</p>
              {section.checkpoint.hint && (
                <p style={{ margin: '0.5rem 0 0', color: 'var(--color-text-subtle)' }}>
                  Hint: {section.checkpoint.hint}
                </p>
              )}
            </div>
          </details>
        </aside>
      )}

      {section.internalLink && (
        <aside className="blog-internal-link-box" aria-label="Related course or practice link">
          <div style={{ flex: '1 1 260px' }}>
            {section.internalLink.description && (
              <p className="blog-section-text" style={{ margin: 0, fontSize: 'var(--text-sm)' }}>
                {section.internalLink.description}
              </p>
            )}
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onResolveTarget(section.internalLink!.target)}
          >
            <span>{section.internalLink.label}</span>
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        </aside>
      )}

      {section.resources && section.resources.length > 0 && (() => {
        const linkedTools = section.resources
          .map((toolId) => EXTERNAL_TOOLS.find((tool) => tool.id === toolId))
          .filter((tool): tool is (typeof EXTERNAL_TOOLS)[number] => Boolean(tool));
        if (!linkedTools.length) return null;
        return (
          <aside className="blog-resources-box" aria-label="Official external tools">
            <h3>Official tools for this guide</h3>
            <ul>
              {linkedTools.map((tool) => (
                <li key={tool.id}>
                  <a href={tool.officialUrl} target="_blank" rel="noopener noreferrer">
                    {tool.name} <span aria-hidden="true">↗</span>
                  </a>
                  <span style={{ color: 'var(--color-text-muted)' }}> — {tool.purpose}</span>
                </li>
              ))}
            </ul>
          </aside>
        );
      })()}
    </section>
  ));
}

export const BlogView: React.FC<BlogViewProps> = ({
  articles = ALL_BLOG_ARTICLES,
  featuredArticles = FEATURED_ARTICLES,
  shellContext = 'public',
  onNavigate,
  onOpenLesson,
}) => {
  const [articleQuery, setArticleQuery] = useState('');
  const [articleCategory, setArticleCategory] = useState('All');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return new URLSearchParams(window.location.search).get('blog');
  });

  const availableArticles = useMemo(
    () =>
      Array.from(
        new Map([...articles, ...featuredArticles].map((article) => [article.slug, article])).values()
      ),
    [articles, featuredArticles]
  );

  const articleCategories = useMemo(
    () => [
      'All',
      ...Array.from(new Set(articles.map((article) => article.category))).sort((a, b) =>
        a.localeCompare(b)
      ),
    ],
    [articles]
  );

  const filteredArticles = useMemo(() => {
    const normalizedQuery = articleQuery.trim().toLowerCase();
    return [...articles]
      .filter((article) => articleCategory === 'All' || article.category === articleCategory)
      .filter((article) => {
        if (!normalizedQuery) return true;
        const haystacks = [
          article.title,
          article.excerpt,
          article.category,
          article.author,
          article.relatedChapter ?? '',
          article.courseRef?.courseTitle ?? '',
          article.courseRef?.chapterLabel ?? '',
          article.courseRef?.lessonTitle ?? '',
          ...article.tags,
        ];
        return haystacks.some((val) => val.toLowerCase().includes(normalizedQuery));
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [articleCategory, articleQuery, articles]);

  const selectedArticle = selectedArticleId
    ? availableArticles.find((article) => article.slug === selectedArticleId) ??
      availableArticles.find((article) => article.id === selectedArticleId) ??
      null
    : null;

  useSEOMeta(
    selectedArticle
      ? SEO_PRESETS.blogPost(
          selectedArticle.title,
          selectedArticle.excerpt,
          selectedArticle.slug,
          selectedArticle.author,
          selectedArticle.date,
          selectedArticle.tags,
          selectedArticle.updatedAt
        )
      : SEO_PRESETS.blog
  );

  useEffect(() => {
    const syncArticleFromUrl = () => {
      setSelectedArticleId(new URLSearchParams(window.location.search).get('blog'));
    };
    window.addEventListener('popstate', syncArticleFromUrl);
    return () => window.removeEventListener('popstate', syncArticleFromUrl);
  }, []);

  const handleResolvedAction = (target: string) => {
    const action = resolveBlogTargetAction(target, shellContext);
    if (action.type === 'lesson') {
      if (onOpenLesson) {
        onOpenLesson(action.lessonId);
      } else {
        onNavigate(shellContext === 'public' ? 'courses' : 'learning');
      }
      return;
    }
    onNavigate(action.viewId);
  };

  const openArticle = (article: BlogArticle) => {
    const url = new URL(window.location.href);
    url.searchParams.set('blog', article.slug);
    if (shellContext === 'studio') {
      url.searchParams.set('view', 'blog');
    } else {
      url.searchParams.delete('view');
    }
    window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
    setSelectedArticleId(article.slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const returnToBlog = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('blog');
    url.searchParams.set('view', shellContext === 'studio' ? 'blog' : 'public-blog');
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    setSelectedArticleId(null);
    onNavigate(shellContext === 'studio' ? 'blog' : 'public-blog');
  };

  const relatedArticles = selectedArticle
    ? articles
        .filter((article) => article.slug !== selectedArticle.slug)
        .map((article) => ({
          article,
          sharedTags: article.tags.filter((tag) => selectedArticle.tags.includes(tag)).length,
        }))
        .filter(({ sharedTags }) => sharedTags > 0)
        .sort((a, b) => b.sharedTags - a.sharedTags)
        .slice(0, 3)
        .map(({ article }) => article)
    : [];

  if (selectedArticleId) {
    if (!selectedArticle) {
      return (
        <section className="app-main" aria-labelledby="blog-article-unavailable">
          <div className="blog-article-shell">
            <div className="blog-breadcrumbs">
              <button type="button" className="btn btn-secondary btn-sm" onClick={returnToBlog}>
                <ArrowLeft size={16} aria-hidden="true" />
                <span>Back to Blog</span>
              </button>
            </div>
            <div className="blog-empty-state">
              <h1 id="blog-article-unavailable" style={{ margin: 0 }}>
                Article unavailable
              </h1>
              <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>
                This article could not be found. Return to the Blog library to choose another topic.
              </p>
            </div>
          </div>
        </section>
      );
    }

    const linkedLessonId = selectedArticle.courseRef?.lessonId || selectedArticle.relatedLessonId;

    return (
      <article className="app-main" aria-labelledby="blog-article-title">
        <div className="blog-article-shell">
          <nav className="blog-breadcrumbs" aria-label="Blog breadcrumbs">
            <button type="button" className="btn btn-secondary btn-sm" onClick={returnToBlog}>
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to Blog</span>
            </button>
            <span className="blog-results-meta">
              {selectedArticle.category} · {selectedArticle.readTime}
            </span>
          </nav>

          <header className="blog-article-header">
            <div className="blog-article-meta">
              <span className="badge badge-primary">{selectedArticle.category}</span>
              <span>By {selectedArticle.author}</span>
              <time dateTime={selectedArticle.date}>
                {selectedArticle.dateLabel || 'Published'} {formatBlogDate(selectedArticle.date)}
              </time>
              {selectedArticle.updatedAt && (
                <time dateTime={selectedArticle.updatedAt}>
                  Updated {formatBlogDate(selectedArticle.updatedAt)}
                </time>
              )}
              <span>{selectedArticle.readTime}</span>
            </div>

            <h1 id="blog-article-title" className="blog-article-title">
              {selectedArticle.title}
            </h1>

            <p className="blog-article-excerpt">{selectedArticle.excerpt}</p>

            {selectedArticle.tags.length > 0 && (
              <div className="blog-tag-list" aria-label="Article tags">
                {selectedArticle.tags.map((tag) => (
                  <span key={tag} className="badge badge-subtle">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {(selectedArticle.courseRef || selectedArticle.relatedChapter) && (
              <div className="blog-course-card">
                <div>
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Matched Course Chapter
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--color-text-strong)', marginTop: '0.15rem' }}>
                    {selectedArticle.courseRef?.chapterLabel || selectedArticle.relatedChapter}
                    {selectedArticle.courseRef?.lessonTitle ? ` — ${selectedArticle.courseRef.lessonTitle}` : ''}
                  </div>
                </div>
                {linkedLessonId && (
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handleResolvedAction(`lesson:${linkedLessonId}`)}
                  >
                    <BookOpen size={14} aria-hidden="true" />
                    <span>Open Related Lesson</span>
                  </button>
                )}
              </div>
            )}
          </header>

          <div className="blog-article-body">
            {selectedArticle.structuredContent
              ? renderStructuredContent(selectedArticle.structuredContent, handleResolvedAction)
              : renderArticleContent(selectedArticle.content, selectedArticle.title)}
          </div>

          <section className="blog-practice-box" aria-label="Continue learning with practice">
            <h2 style={{ margin: 0, fontSize: 'var(--text-xl)', color: 'var(--color-text-strong)' }}>
              Turn this idea into a practical skill
            </h2>
            <p className="blog-section-text" style={{ margin: 0 }}>
              {selectedArticle.practiceChallenge ||
                'Try writing the core pattern from memory inside Live Code, or jump straight into the matching course lesson.'}
            </p>
            <div className="blog-practice-actions">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => handleResolvedAction('practice')}
              >
                <span>Practise in Live Code</span>
                <ArrowRight size={15} aria-hidden="true" />
              </button>
              {linkedLessonId && (
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleResolvedAction(`lesson:${linkedLessonId}`)}
                >
                  <span>Open Related Lesson</span>
                </button>
              )}
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => handleResolvedAction('courses')}
              >
                <span>Explore Courses</span>
              </button>
            </div>
          </section>

          {relatedArticles.length > 0 && (
            <nav className="blog-related-card" aria-labelledby="related-articles-heading">
              <h2 id="related-articles-heading" style={{ margin: 0, fontSize: 'var(--text-lg)', color: 'var(--color-text-strong)' }}>
                Related reading
              </h2>
              <ul className="blog-related-list">
                {relatedArticles.map((article) => (
                  <li key={article.slug}>
                    <a
                      href={`/?blog=${encodeURIComponent(article.slug)}`}
                      onClick={(event) => {
                        event.preventDefault();
                        openArticle(article);
                      }}
                    >
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </article>
    );
  }

  return (
    <div className="app-main">
      <div className="blog-shell">
        {/* Editorial Hero Header */}
        <header className="blog-hero">
          <div className="blog-hero-top">
            <div>
              <div className="blog-hero-kicker">
                <BookOpen size={15} aria-hidden="true" />
                <span>Editorial Guides &amp; Lesson Deep-Dives</span>
              </div>
              <h1 className="blog-hero-title">Blog</h1>
              <p className="blog-hero-subtitle">
                Human-authored guides paired directly with course chapters. Read a focused explanation, inspect code examples, and jump straight into Live Code or the matching lesson.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => handleResolvedAction('practice')}
              >
                <span>Practise in Live Code</span>
                <ArrowRight size={15} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => handleResolvedAction('courses')}
              >
                <span>Explore Courses</span>
              </button>
            </div>
          </div>
        </header>

        {/* Search & Category Filter Toolbar */}
        <section className="blog-toolbar" aria-label="Filter articles">
          <div className="blog-search-row">
            <div className="blog-search-box">
              <label className="search-input-wrapper">
                <Search size={16} aria-hidden="true" className="search-input-icon" />
                <span className="sr-only">Search articles</span>
                <input
                  type="search"
                  className="form-input search-input"
                  value={articleQuery}
                  onChange={(event) => setArticleQuery(event.target.value)}
                  placeholder="Search titles, topics, chapters, or tags..."
                />
              </label>
            </div>
            <span className="blog-results-meta">
              Showing {filteredArticles.length} of {articles.length} articles
            </span>
          </div>

          <div className="blog-category-bar" role="group" aria-label="Article categories">
            {articleCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setArticleCategory(category)}
                className={`blog-category-btn ${articleCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Guides (only when viewing default unfiltered list) */}
        {featuredArticles.length > 0 && articleCategory === 'All' && !articleQuery.trim() && (
          <section aria-labelledby="featured-blog-heading">
            <div className="blog-section-label">
              <Sparkles size={18} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
              <h2 id="featured-blog-heading">Featured Guides</h2>
            </div>

            <div className="blog-featured-grid">
              {featuredArticles.map((article) => (
                <article key={article.slug} className="blog-card">
                  <div>
                    <div className="blog-card-header">
                      <span className="badge badge-primary">{article.category}</span>
                      <span className="blog-card-readtime">
                        <Clock size={12} aria-hidden="true" />
                        {article.readTime}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="blog-card-title-btn"
                      onClick={() => openArticle(article)}
                    >
                      {article.title}
                    </button>

                    <p className="blog-card-excerpt">{article.excerpt}</p>

                    {(article.courseRef?.chapterLabel || article.relatedChapter) && (
                      <div className="blog-card-course-ref">
                        <Compass size={13} aria-hidden="true" style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                        <span>{article.courseRef?.chapterLabel || article.relatedChapter}</span>
                      </div>
                    )}
                  </div>

                  <div className="blog-card-footer">
                    <span className="blog-card-date">
                      <Calendar size={12} aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '0.3rem' }} />
                      {formatBlogDate(article.date)}
                    </span>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => openArticle(article)}
                    >
                      <span>Read Guide</span>
                      <ArrowRight size={13} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Filtered Article Catalogue */}
        <section aria-labelledby="all-articles-heading">
          <div className="blog-section-label">
            <Tag size={18} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
            <h2 id="all-articles-heading">
              {articleCategory === 'All' ? 'All Articles' : `${articleCategory} Articles`} ({filteredArticles.length})
            </h2>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="blog-grid">
              {filteredArticles.map((article) => (
                <article key={article.slug} className="blog-card">
                  <div>
                    <div className="blog-card-header">
                      <span className="badge badge-subtle">{article.category}</span>
                      <span className="blog-card-readtime">
                        <Clock size={12} aria-hidden="true" />
                        {article.readTime}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="blog-card-title-btn"
                      onClick={() => openArticle(article)}
                    >
                      {article.title}
                    </button>

                    <p className="blog-card-excerpt">{article.excerpt}</p>

                    {(article.courseRef?.chapterLabel || article.relatedChapter) && (
                      <div className="blog-card-course-ref">
                        <BookOpen size={13} aria-hidden="true" style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                        <span>{article.courseRef?.chapterLabel || article.relatedChapter}</span>
                      </div>
                    )}
                  </div>

                  <div className="blog-card-footer">
                    <span className="blog-card-date">{formatBlogDate(article.date)}</span>
                    <button
                      type="button"
                      className="btn btn-subtle btn-sm"
                      onClick={() => openArticle(article)}
                    >
                      <span>Read Article</span>
                      <ArrowRight size={13} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="blog-empty-state" role="status">
              <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>
                No articles match those filters. Try another topic, chapter, or reset the category filter.
              </p>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setArticleCategory('All');
                  setArticleQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
