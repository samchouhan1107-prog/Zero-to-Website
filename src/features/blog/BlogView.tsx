import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Calendar, Clock, Tag, BookOpen, ArrowRight, Search } from 'lucide-react';
import { BlogArticle } from '../../utils/types';
import { FEATURED_ARTICLES, BLOG_ARTICLES } from '../../data/blogArticles';
import { LEGACY_BLOG_ARTICLES } from '../../data/blog/blogAdapter';
import { EXTERNAL_TOOLS } from '../../data/externalTools';
import type { BlogSection } from '../../data/blogData';
import { SEO_PRESETS, useSEOMeta } from '../../utils/useSEOMeta';
import { getBlogArticleHref, getBlogSlugFromLocation } from '../../utils/publicRoutes';

interface BlogViewProps {
  articles?: BlogArticle[];
  featuredArticles?: BlogArticle[];
  onNavigate: (view: string) => void;
  onOpenLesson?: (lessonId: string) => void;
}

const ALL_BLOG_ARTICLES: BlogArticle[] = Array.from(
  new Map([...BLOG_ARTICLES, ...LEGACY_BLOG_ARTICLES].map((article) => [article.slug, article])).values()
);

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
        <pre
          key={`code-${blocks.length}`}
          style={{
            overflowX: 'auto',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-surface-subtle)',
            color: 'var(--color-text-strong)',
            lineHeight: 1.6,
          }}
        >
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
      continue;
    }

    const heading = trimmedLine.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const headingText = heading[2].trim();
      if (!(heading[1].length === 1 && headingText === articleTitle)) {
        const HeadingTag = heading[1].length >= 3 ? 'h3' : 'h2';
        blocks.push(
          <HeadingTag key={`heading-${blocks.length}`} style={{ color: 'var(--color-text-strong)' }}>
            {headingText}
          </HeadingTag>
        );
      }
      index += 1;
      continue;
    }

    const paragraphLines = [line];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^\[([a-z]+)\]$/i.test(lines[index].trim()) &&
      !/^#{1,3}\s+/.test(lines[index].trim())
    ) {
      paragraphLines.push(lines[index]);
      index += 1;
    }

    blocks.push(
      <p key={`paragraph-${blocks.length}`} style={{ lineHeight: 1.75, color: 'var(--color-text-muted)' }}>
        {paragraphLines.join(' ')}
      </p>
    );
  }

  return blocks;
}

function renderStructuredContent(
  sections: BlogSection[],
  onNavigate: (view: string) => void
): React.ReactNode[] {
  const internalLinkViews: Record<string, string> = {
    workspace: 'public-practice',
    webtools: 'webtools',
    learn: 'courses',
    'visual-lab': 'public-practice',
    developertools: 'webtools',
  };

  return sections.flatMap((section, index) => {
    const blocks: React.ReactNode[] = [];
    if (section.heading) {
      blocks.push(
        <h2 key={`heading-${index}`} style={{ color: 'var(--color-text-strong)' }}>
          {section.heading}
        </h2>
      );
    }
    if (section.text.trim()) {
      blocks.push(
        <p key={`text-${index}`} style={{ lineHeight: 1.75, color: 'var(--color-text-muted)', whiteSpace: 'pre-line' }}>
          {section.text}
        </p>
      );
    }
    if (section.code) {
      blocks.push(
        <pre
          key={`code-${index}`}
          style={{
            overflowX: 'auto',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-surface-subtle)',
            color: 'var(--color-text-strong)',
            lineHeight: 1.6,
          }}
        >
          <code className={`language-${section.code.language}`}>{section.code.code}</code>
        </pre>
      );
    }
    if (section.list?.length) {
      blocks.push(
        <ul key={`list-${index}`} style={{ color: 'var(--color-text-muted)', lineHeight: 1.75 }}>
          {section.list.map((item, itemIndex) => <li key={`${index}-${itemIndex}`}>{item}</li>)}
        </ul>
      );
    }
    if (section.callout) {
      blocks.push(
        <aside
          key={`callout-${index}`}
          aria-label={section.callout.title || section.callout.type}
          style={{
            marginBlock: 'var(--space-4)',
            padding: 'var(--space-4)',
            borderLeft: '4px solid var(--color-accent)',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-surface-subtle)',
            color: 'var(--color-text-muted)',
          }}
        >
          {section.callout.title && <strong>{section.callout.title}</strong>}
          <p style={{ marginBottom: 0, lineHeight: 1.7 }}>{section.callout.text}</p>
        </aside>
      );
    }
    if (section.table) {
      blocks.push(
        <div key={`table-${index}`} style={{ overflowX: 'auto', marginBlock: 'var(--space-5)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--color-text-muted)' }}>
            <thead>
              <tr>{section.table.headers.map((heading) => <th key={heading} scope="col" style={{ textAlign: 'left', padding: 'var(--space-3)', borderBottom: '1px solid var(--color-border)' }}>{heading}</th>)}</tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`}>
                  {section.table?.headers.map((_, columnIndex) => (
                    <td key={`cell-${columnIndex}`} style={{ verticalAlign: 'top', padding: 'var(--space-3)', borderBottom: '1px solid var(--color-border)' }}>
                      {row[columnIndex] || ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (section.checkpoint) {
      blocks.push(
        <aside key={`checkpoint-${index}`} className="blog-checkpoint" style={{ marginBlock: 'var(--space-5)', padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
          <h3 style={{ color: 'var(--color-text-strong)' }}>Quick check</h3>
          <p style={{ color: 'var(--color-text-muted)' }}>{section.checkpoint.question}</p>
          <details>
            <summary>Show answer</summary>
            <p style={{ color: 'var(--color-text-muted)' }}>{section.checkpoint.answer}</p>
            {section.checkpoint.hint && <p style={{ color: 'var(--color-text-subtle)' }}>Hint: {section.checkpoint.hint}</p>}
          </details>
        </aside>
      );
    }
    if (section.internalLink) {
      const targetView = internalLinkViews[section.internalLink.target] || 'courses';
      blocks.push(
        <aside key={`internal-link-${index}`} style={{ marginBlock: 'var(--space-5)', padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
          <button type="button" className="btn btn-secondary" onClick={() => onNavigate(targetView)}>
            {section.internalLink.label}
          </button>
          {section.internalLink.description && <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{section.internalLink.description}</p>}
        </aside>
      );
    }
    if (section.resources?.length) {
      const linkedTools = section.resources
        .map((toolId) => EXTERNAL_TOOLS.find((tool) => tool.id === toolId))
        .filter((tool): tool is (typeof EXTERNAL_TOOLS)[number] => Boolean(tool));
      if (linkedTools.length) {
        blocks.push(
          <aside key={`resources-${index}`} aria-label="Official external tools" style={{ marginBlock: 'var(--space-5)', padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface-subtle)' }}>
            <h3 style={{ marginTop: 0, color: 'var(--color-text-strong)' }}>Official tools for this guide</h3>
            <ul style={{ display: 'grid', gap: 'var(--space-2)', margin: 0, paddingInlineStart: '1.25rem' }}>
              {linkedTools.map((tool) => (
                <li key={tool.id}>
                  <a href={tool.officialUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)' }}>
                    {tool.name} <span aria-hidden="true">↗</span>
                  </a>
                  <span style={{ color: 'var(--color-text-muted)' }}> — {tool.purpose}</span>
                </li>
              ))}
            </ul>
          </aside>
        );
      }
    }
    return blocks;
  });
}

export const BlogView: React.FC<BlogViewProps> = ({
  articles = ALL_BLOG_ARTICLES,
  featuredArticles = FEATURED_ARTICLES,
  onNavigate,
  onOpenLesson,
}) => {
  const [articleQuery, setArticleQuery] = useState('');
  const [articleCategory, setArticleCategory] = useState('All categories');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return getBlogSlugFromLocation(window.location);
  });
  const availableArticles = useMemo(
    () => Array.from(new Map([...articles, ...featuredArticles].map((article) => [article.slug, article])).values()),
    [articles, featuredArticles]
  );
  const recentArticles = useMemo(
    () => articles.filter((article) => !article.structuredContent).sort((a, b) => b.date.localeCompare(a.date)),
    [articles]
  );
  const articleCategories = useMemo(
    () => Array.from(new Set(articles.map((article) => article.category))).sort((a, b) => a.localeCompare(b)),
    [articles]
  );
  const filteredArticles = useMemo(() => {
    const normalizedQuery = articleQuery.trim().toLowerCase();
    return [...articles]
      .filter((article) => articleCategory === 'All categories' || article.category === articleCategory)
      .filter((article) => !normalizedQuery || [article.title, article.excerpt, article.category, article.author, ...article.tags].join(' ').toLowerCase().includes(normalizedQuery))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [articleCategory, articleQuery, articles]);
  const selectedArticle = selectedArticleId
    ? availableArticles.find((article) => article.slug === selectedArticleId)
      ?? availableArticles.find((article) => article.id === selectedArticleId)
      ?? null
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
      setSelectedArticleId(getBlogSlugFromLocation(window.location));
    };
    window.addEventListener('popstate', syncArticleFromUrl);
    return () => window.removeEventListener('popstate', syncArticleFromUrl);
  }, []);

  const openArticle = (article: BlogArticle) => {
    const url = new URL(window.location.href);
    url.pathname = getBlogArticleHref(article.slug);
    url.search = '';
    window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
    setSelectedArticleId(article.slug);
  };

  const returnToBlog = () => {
    const url = new URL(window.location.href);
    url.pathname = '/blog/';
    url.search = '';
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    setSelectedArticleId(null);
    onNavigate('blog');
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
          <button type="button" className="btn btn-secondary" onClick={returnToBlog}>
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Blog
          </button>
          <h1 id="blog-article-unavailable">Article unavailable</h1>
          <p>This article could not be found. Return to Blog to choose another article.</p>
        </section>
      );
    }

    return (
      <article className="app-main" aria-labelledby="blog-article-title">
        <nav aria-label="Blog breadcrumbs" style={{ marginBottom: 'var(--space-5)' }}>
          <button type="button" className="btn btn-secondary" onClick={returnToBlog}>
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Blog
          </button>
        </nav>

        <header
          style={{
            maxWidth: '860px',
            margin: '0 auto var(--space-8)',
            paddingBottom: 'var(--space-6)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <p style={{ color: 'var(--color-accent)', fontWeight: 700 }}>{selectedArticle.category}</p>
          <h1 id="blog-article-title" style={{ color: 'var(--color-text-strong)' }}>
            {selectedArticle.title}
          </h1>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{selectedArticle.excerpt}</p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-4)',
              color: 'var(--color-text-subtle)',
              fontSize: 'var(--text-sm)',
            }}
          >
            <span>{selectedArticle.author}</span>
            <time dateTime={selectedArticle.date}>{selectedArticle.dateLabel || 'Published'} {selectedArticle.date}</time>
            {selectedArticle.updatedAt && (
              <time dateTime={selectedArticle.updatedAt}>Updated {selectedArticle.updatedAt}</time>
            )}
            <span>{selectedArticle.readTime}</span>
            {selectedArticle.relatedChapter && <span>{selectedArticle.relatedChapter}</span>}
          </div>
          {selectedArticle.tags.length > 0 && (
            <ul
              aria-label="Article tags"
              style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', padding: 0, listStyle: 'none' }}
            >
              {selectedArticle.tags.map((tag) => (
                <li key={tag} className="badge badge-subtle">{tag}</li>
              ))}
            </ul>
          )}
        </header>

        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          {selectedArticle.structuredContent
            ? renderStructuredContent(selectedArticle.structuredContent, onNavigate)
            : renderArticleContent(selectedArticle.content, selectedArticle.title)}
          <section
            aria-label="Continue learning with practice"
            style={{
              marginTop: 'var(--space-8)',
              padding: 'var(--space-6)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            <h2 style={{ marginTop: 0, color: 'var(--color-text-strong)' }}>Turn this idea into a skill</h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
              {selectedArticle.practiceChallenge || 'Choose one idea from this article and try it in the interactive coding space, or continue with a guided course.'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              <button type="button" className="btn btn-primary" onClick={() => onNavigate('public-practice')}>
                Practise in Live Code <ArrowRight size={16} aria-hidden="true" />
              </button>
              {selectedArticle.relatedLessonId && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    if (selectedArticle.relatedLessonId && onOpenLesson) {
                      onOpenLesson(selectedArticle.relatedLessonId);
                    } else {
                      onNavigate('courses');
                    }
                  }}
                >
                  Open related lesson
                </button>
              )}
              <button type="button" className="btn btn-secondary" onClick={() => onNavigate('courses')}>
                Explore Courses
              </button>
            </div>
          </section>
          {relatedArticles.length > 0 && (
            <nav aria-labelledby="related-articles-heading" style={{ marginTop: 'var(--space-8)' }}>
              <h2 id="related-articles-heading" style={{ color: 'var(--color-text-strong)' }}>Related reading</h2>
              <ul style={{ display: 'grid', gap: 'var(--space-3)', padding: 0, listStyle: 'none' }}>
                {relatedArticles.map((article) => (
                  <li key={article.slug}>
                    <a
                      href={getBlogArticleHref(article.slug)}
                      onClick={(event) => {
                        event.preventDefault();
                        openArticle(article);
                      }}
                      style={{ color: 'var(--color-accent)' }}
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
      {/* Blog Header */}
      <div className="blog-header" style={{ marginBottom: 'var(--space-8)', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-4)' }}>
          <BookOpen size={24} style={{ color: 'var(--color-accent)' }} />
          <h1 style={{ margin: 0, fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-text-strong)' }}>
            Blog
          </h1>
        </div>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Read or watch a focused lesson, then put the idea into practice with guided courses and Live Code.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
          <button type="button" className="btn btn-primary" onClick={() => onNavigate('public-practice')}>
            Practise in Live Code <ArrowRight size={16} aria-hidden="true" />
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => onNavigate('courses')}>
            Explore Courses
          </button>
        </div>
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section style={{ marginBottom: 'var(--space-10)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-5)' }}>
            <Tag size={20} style={{ color: 'var(--color-accent)' }} />
            <h2 style={{ margin: 0, fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-text-strong)' }}>
              Featured Articles
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--space-6)' }}>
            {featuredArticles.map((article) => (
              <article
                key={article.slug}
                className="blog-article-card featured"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '2px solid var(--color-accent)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                role="link"
                tabIndex={0}
                aria-label={`Read article: ${article.title}`}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') openArticle(article);
                }}
                onClick={() => openArticle(article)}
              >
                {/* Article Image Placeholder */}
                <div
                  style={{
                    height: '200px',
                    backgroundColor: 'var(--color-surface-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-muted)',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  <BookOpen size={48} style={{ opacity: 0.5 }} />
                </div>

                <div style={{ padding: 'var(--space-5)' }}>
                  {/* Category Badge */}
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      backgroundColor: 'var(--color-accent-subtle)',
                      color: 'var(--color-accent)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    {article.category}
                  </span>

                  {/* Article Title */}
                  <h3 style={{ margin: '0 0 var(--space-2) 0', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-text-strong)' }}>
                    {article.title}
                  </h3>

                  {/* Article Excerpt */}
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
                    {article.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap', fontSize: 'var(--text-xs)', color: 'var(--color-text-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={14} />
                      <span>{article.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={14} />
                      <span>{article.readTime}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Tag size={14} />
                      <span>{article.tags?.slice(0, 2).join(', ')}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Recent Articles */}
      <section style={{ marginBottom: 'var(--space-10)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-5)' }}>
          <BookOpen size={20} style={{ color: 'var(--color-primary)' }} />
          <h2 style={{ margin: 0, fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-text-strong)' }}>
            Recent Articles
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {recentArticles.slice(0, 5).map((article) => (
            <article
              key={article.slug}
              className="blog-article-card"
              style={{
                display: 'flex',
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
              role="link"
              tabIndex={0}
              aria-label={`Read article: ${article.title}`}
              onKeyDown={(event) => {
                if (event.key === 'Enter') openArticle(article);
              }}
              onClick={() => openArticle(article)}
            >
              <div style={{ padding: 'var(--space-5)', flex: 1 }}>
                {/* Category Badge */}
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: 'var(--color-primary-subtle)',
                    color: 'var(--color-primary)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  {article.category}
                </span>

                {/* Article Title */}
                <h3 style={{ margin: '0 0 var(--space-2) 0', fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--color-text-strong)' }}>
                  {article.title}
                </h3>

                {/* Article Excerpt */}
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
                  {article.excerpt}
                </p>

                {/* Meta Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap', fontSize: 'var(--text-xs)', color: 'var(--color-text-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={14} />
                    <span>{article.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={14} />
                    <span>{article.readTime}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Tag size={14} />
                    <span>{article.tags?.slice(0, 2).join(', ')}</span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 'var(--space-5)',
                  backgroundColor: 'var(--color-surface-subtle)',
                  borderLeft: '1px solid var(--color-border)',
                }}
              >
                <ArrowRight size={20} style={{ color: 'var(--color-text-muted)' }} />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* All Articles Section */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-5)' }}>
          <BookOpen size={20} style={{ color: 'var(--color-info)' }} />
          <h2 style={{ margin: 0, fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-text-strong)' }}>
            All Articles ({filteredArticles.length})
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', minWidth: 0 }}>
            <Search size={17} aria-hidden="true" style={{ color: 'var(--color-text-subtle)', flexShrink: 0 }} />
            <span className="sr-only">Search articles</span>
            <input type="search" value={articleQuery} onChange={(event) => setArticleQuery(event.target.value)} placeholder="Search titles, topics, and tools" />
          </label>
          <label>
            <span className="sr-only">Filter articles by category</span>
            <select value={articleCategory} onChange={(event) => setArticleCategory(event.target.value)} style={{ width: '100%' }}>
              <option>All categories</option>
              {articleCategories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>
        </div>

        {filteredArticles.length ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 18.75rem), 1fr))', gap: 'var(--space-5)' }}>
          {filteredArticles.map((article) => (
            <article
              key={article.slug}
              className="blog-article-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
              role="link"
              tabIndex={0}
              aria-label={`Read article: ${article.title}`}
              onKeyDown={(event) => {
                if (event.key === 'Enter') openArticle(article);
              }}
              onClick={() => openArticle(article)}
            >
              {/* Article Image Placeholder */}
              <div
                style={{
                  height: '140px',
                  backgroundColor: 'var(--color-surface-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-text-muted)',
                  fontSize: 'var(--text-sm)',
                }}
              >
                <BookOpen size={32} style={{ opacity: 0.5 }} />
              </div>

              <div style={{ padding: 'var(--space-4)' }}>
                {/* Category Badge */}
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: 'var(--color-info-subtle)',
                    color: 'var(--color-info)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {article.category}
                </span>

                {/* Article Title */}
                <h3 style={{ margin: '0 0 var(--space-2) 0', fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--color-text-strong)' }}>
                  {article.title}
                </h3>

                {/* Article Excerpt */}
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: 'var(--space-3)' }}>
                  {article.excerpt}
                </p>

                {/* Meta Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap', fontSize: 'var(--text-xs)', color: 'var(--color-text-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={14} />
                    <span>{article.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={14} />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        ) : (
          <p role="status" className="card">No articles match those filters. Try a different title, topic, tool, or category.</p>
        )}
      </section>
    </div>
  );
};
