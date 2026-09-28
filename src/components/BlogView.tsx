import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Code2,
  FileText,
  Tag,
  User,
  Lightbulb,
  AlertTriangle,
  Info,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  BookmarkCheck,
  Compass,
} from 'lucide-react';
import { BlogPost, BLOG_POSTS, BlogSection } from '../data/blogData';
import { useSEOMeta, SEO_PRESETS } from '../utils/useSEOMeta';

interface BlogViewProps {
  onNavigateHome: () => void;
  onNavigateView?: (view: string) => void;
  onSelectLesson?: (lessonId: string) => void;
  initialSlug?: string;
}

export const BlogView: React.FC<BlogViewProps> = ({
  onNavigateHome,
  onNavigateView,
  onSelectLesson,
  initialSlug,
}) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(
    initialSlug ? BLOG_POSTS.find((p) => p.slug === initialSlug) || null : null
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [revealedCheckpoints, setRevealedCheckpoints] = useState<Record<number, boolean>>({});

  const toggleCheckpoint = (idx: number) => {
    setRevealedCheckpoints((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // SEO: blog index or individual post with clean canonical URL
  useSEOMeta(
    selectedPost
      ? SEO_PRESETS.blogPost(selectedPost.title, selectedPost.excerpt, selectedPost.slug, selectedPost.author, selectedPost.date, selectedPost.tags)
      : SEO_PRESETS.blog
  );

  const categories = ['All', ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))];

  const filteredPosts =
    selectedCategory === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === selectedCategory);

  const handleLinkClick = (target?: string) => {
    if (!target) return;
    if (target.startsWith('lesson:') && onSelectLesson) {
      onSelectLesson(target.replace('lesson:', ''));
    } else if (onNavigateView) {
      onNavigateView(target);
    } else {
      onNavigateHome();
    }
  };

  if (selectedPost) {
    return (
      <article className="mx-auto w-full max-w-[920px] space-y-8 px-4 py-8 sm:px-6 sm:py-10">
        {/* Breadcrumbs Navigation */}
        <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-2 text-xs text-app-subtle border-b border-app-border/40 pb-3">
          <button
            type="button"
            onClick={onNavigateHome}
            className="hover:text-app-amber transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => setSelectedPost(null)}
            className="hover:text-app-amber transition-colors"
          >
            Blog
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory(selectedPost.category);
              setSelectedPost(null);
            }}
            className="text-app-muted hover:text-app-amber transition-colors font-medium"
          >
            {selectedPost.category}
          </button>
          <span>/</span>
          <span className="text-app-ink font-semibold truncate max-w-[240px] sm:max-w-md">
            {selectedPost.title}
          </span>
        </nav>

        {/* Back button */}
        <button
          type="button"
          onClick={() => setSelectedPost(null)}
          className="inline-flex items-center gap-2 rounded-lg border border-app-border bg-app-surface px-3 py-1.5 text-xs font-semibold text-app-muted transition-colors hover:border-app-amber/50 hover:text-app-amber shadow-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to All Articles
        </button>

        {/* Article Header */}
        <header className="space-y-4 border-b border-app-border pb-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-app-subtle">
            <span className="rounded bg-app-amber/10 border border-app-amber/30 px-2.5 py-0.5 font-bold text-app-amber tracking-wide uppercase text-[11px]">
              {selectedPost.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(selectedPost.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {selectedPost.readTime}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {selectedPost.author}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-app-ink leading-tight tracking-tight">
            {selectedPost.title}
          </h1>

          <p className="text-base sm:text-lg text-app-muted leading-relaxed font-normal">
            {selectedPost.excerpt}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {selectedPost.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md border border-app-border bg-app-inset px-2.5 py-0.5 font-mono text-[11px] text-app-subtle"
              >
                <Tag className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Body */}
        <div className="space-y-8 text-app-ink">
          {selectedPost.content.map((section, idx) => (
            <section key={idx} className="space-y-4">
              {section.heading && (
                <h2 className="text-xl sm:text-2xl font-bold text-app-ink border-l-4 border-app-amber pl-4 tracking-tight">
                  {section.heading}
                </h2>
              )}

              {section.text && (
                <p className="text-sm sm:text-base text-app-muted leading-relaxed">
                  {section.text}
                </p>
              )}

              {/* Callout box */}
              {section.callout && (
                <div
                  className={`rounded-xl border p-4.5 sm:p-5 space-y-1.5 ${
                    section.callout.type === 'checkpoint'
                      ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-300'
                      : section.callout.type === 'warning'
                      ? 'border-rose-500/30 bg-rose-500/5 text-rose-300'
                      : section.callout.type === 'tip'
                      ? 'border-app-amber/35 bg-app-amber/5 text-app-amber'
                      : 'border-blue-500/30 bg-blue-500/5 text-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                    {section.callout.type === 'checkpoint' && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />}
                    {section.callout.type === 'warning' && <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400" />}
                    {section.callout.type === 'tip' && <Lightbulb className="h-4 w-4 shrink-0 text-app-amber" />}
                    {section.callout.type === 'info' && <Info className="h-4 w-4 shrink-0 text-blue-400" />}
                    <span>{section.callout.title || (section.callout.type === 'checkpoint' ? 'Checkpoint' : section.callout.type.toUpperCase())}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-app-muted leading-relaxed pl-6">
                    {section.callout.text}
                  </p>
                </div>
              )}

              {/* Interactive Checkpoint / Practical Check */}
              {section.checkpoint && (
                <div className="rounded-xl border border-app-amber/30 bg-app-surface p-4 sm:p-5 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between gap-2 border-b border-app-border/60 pb-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-app-amber">
                      <HelpCircle className="h-4 w-4" />
                      <span>Pause &amp; Verify: Checkpoint</span>
                    </div>
                    {section.checkpoint.hint && (
                      <span className="text-[11px] text-app-subtle italic">
                        Hint: {section.checkpoint.hint}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-app-ink leading-relaxed">
                    {section.checkpoint.question}
                  </p>
                  <div>
                    <button
                      type="button"
                      onClick={() => toggleCheckpoint(idx)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-app-amber hover:underline cursor-pointer"
                    >
                      {revealedCheckpoints[idx] ? (
                        <>
                          <ChevronUp className="h-3.5 w-3.5" /> Hide explanation
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-3.5 w-3.5" /> Reveal explanation &amp; key reasoning
                        </>
                      )}
                    </button>
                    {revealedCheckpoints[idx] && (
                      <div className="mt-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs sm:text-sm text-app-muted leading-relaxed animate-in fade-in duration-200">
                        <strong className="text-emerald-400 block mb-1">Key Takeaway:</strong>
                        {section.checkpoint.answer}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Data Table */}
              {section.table && (
                <div className="overflow-x-auto rounded-xl border border-app-border bg-app-surface my-4">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-app-border bg-app-inset/70">
                        {section.table.headers.map((th, thi) => (
                          <th key={thi} className="px-4 py-3 font-bold text-app-ink tracking-wide">
                            {th}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-app-border/40">
                      {section.table.rows.map((row, ri) => (
                        <tr key={ri} className="hover:bg-app-inset/30 transition-colors">
                          {row.map((cell, ci) => (
                            <td key={ci} className="px-4 py-2.5 text-app-muted leading-relaxed">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Code Snippet */}
              {section.code && (
                <div className="overflow-x-auto rounded-xl border border-app-border bg-app-inset p-4 shadow-inner">
                  <div className="mb-2 flex items-center justify-between text-[11px] font-mono text-app-subtle border-b border-app-border/40 pb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Code2 className="h-3 w-3 text-app-amber" />
                      <span className="uppercase tracking-wider font-semibold text-app-amber">{section.code.language}</span>
                    </div>
                    <span className="text-[10px] text-app-subtle">WebZoneBW Code Reference</span>
                  </div>
                  <pre className="text-xs sm:text-sm text-app-ink font-mono leading-relaxed whitespace-pre-wrap">
                    <code>{section.code.code}</code>
                  </pre>
                </div>
              )}

              {/* Bullet List */}
              {section.list && (
                <ul className="space-y-2 pl-2 sm:pl-4">
                  {section.list.map((item, li) => (
                    <li
                      key={li}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-app-muted leading-relaxed"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-app-amber" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Internal Platform Tool Link */}
              {section.internalLink && (
                <div className="rounded-xl border border-app-border bg-app-surface/80 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-app-amber/40 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-app-ink">
                      <Compass className="h-3.5 w-3.5 text-app-amber" />
                      <span>{section.internalLink.label}</span>
                    </div>
                    {section.internalLink.description && (
                      <p className="text-xs text-app-muted">
                        {section.internalLink.description}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleLinkClick(section.internalLink?.target)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-app-amber/30 bg-app-amber/10 px-3.5 py-1.5 text-xs font-bold text-app-amber hover:bg-app-amber hover:text-black transition-colors shrink-0"
                  >
                    <span>Launch in WebZoneBW</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="rounded-2xl border border-app-amber/30 bg-gradient-to-br from-app-amber/10 via-app-surface to-app-surface p-6 sm:p-8 text-center space-y-4 shadow-md">
          <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-app-amber/20 border border-app-amber/40 text-app-amber mx-auto">
            <BookmarkCheck className="h-5 w-5" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-app-ink">
            Apply What You Learned Inside WebZoneBW
          </h3>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-app-muted leading-relaxed">
            Move from passive reading to active muscle memory. Test these exact layout models, algorithms, and commands inside our interactive Web REPL Sandbox, Critical Rendering Path Inspector, and Box Model Visualizer.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 rounded-lg bg-app-amber px-5 py-2.5 text-xs font-bold text-black transition-colors hover:bg-app-amber/90 shadow-sm"
            >
              <span>Explore WebZoneBW Curriculum</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedPost(null)}
              className="inline-flex items-center gap-2 rounded-lg border border-app-border bg-app-surface px-4 py-2.5 text-xs font-bold text-app-muted transition-colors hover:border-app-amber/50 hover:text-app-amber"
            >
              <span>Browse More Articles</span>
            </button>
          </div>
        </div>

        {/* Schema.org Article structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: selectedPost.title,
              description: selectedPost.excerpt,
              author: {
                '@type': 'Organization',
                name: selectedPost.author,
              },
              publisher: {
                '@type': 'Organization',
                name: 'WebZoneBW SC',
                url: 'https://webzonebw.shop',
              },
              datePublished: selectedPost.date,
              keywords: selectedPost.tags.join(', '),
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://webzonebw.shop/#/blog/${selectedPost.slug}`,
              },
            }),
          }}
        />
      </article>
    );
  }

  // Blog listing view
  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-8 px-4 py-8 sm:px-6 sm:py-10">
      {/* Blog Header */}
      <section className="space-y-4 border-b border-app-border pb-6">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-app-amber">
          <FileText className="h-3.5 w-3.5" />
          <span>WebZoneBW Engineering &amp; Editorial Blog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-app-ink tracking-tight">
          Web Development Insights, Architecture &amp; Deep Dives
        </h1>
        <p className="max-w-3xl text-sm sm:text-base text-app-muted leading-relaxed">
          In-depth technical guides, browser runtime internals, modern layout orchestration, and performance engineering. Every article is crafted to help developers build fast, accessible, resilient web applications.
        </p>
      </section>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-app-amber text-black shadow-md'
                : 'border border-app-border bg-app-surface text-app-muted hover:border-app-amber/50 hover:text-app-ink'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="group flex flex-col rounded-xl border border-app-border bg-app-surface p-5 transition-all hover:border-app-amber/50 hover:shadow-lg cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-app-subtle">
              <span className="rounded bg-app-amber/10 border border-app-amber/30 px-2 py-0.5 font-bold text-app-amber uppercase">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-2.5 w-2.5" />
                {post.readTime}
              </span>
            </div>

            <h2 className="mb-2 text-base font-bold text-app-ink leading-snug group-hover:text-app-amber transition-colors">
              {post.title}
            </h2>

            <p className="mb-4 flex-1 text-xs text-app-muted leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between border-t border-app-border/60 pt-3 text-[10px] text-app-subtle">
              <span className="flex items-center gap-1">
                <Calendar className="h-2.5 w-2.5" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="font-semibold text-app-amber group-hover:underline">
                Read full guide →
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Blog Listing Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'WebZoneBW Blog — Web Development Tutorials & Insights',
            description:
              'In-depth articles and tutorials on CSS, HTML, JavaScript, responsive design, and modern web development best practices.',
            url: 'https://webzonebw.shop/#/blog',
            hasPart: filteredPosts.map((post) => ({
              '@type': 'Article',
              headline: post.title,
              description: post.excerpt,
              url: `https://webzonebw.shop/#/blog/${post.slug}`,
              datePublished: post.date,
            })),
          }),
        }}
      />
    </div>
  );
};
