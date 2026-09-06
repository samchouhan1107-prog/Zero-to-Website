import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Code2,
  FileText,
  Tag,
  User,
} from 'lucide-react';
import { BlogPost, BLOG_POSTS } from '../data/blogData';

interface BlogViewProps {
  onNavigateHome: () => void;
  onSelectLesson?: (lessonId: string) => void;
  initialSlug?: string;
}

export const BlogView: React.FC<BlogViewProps> = ({
  onNavigateHome,
  initialSlug,
}) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(
    initialSlug ? BLOG_POSTS.find((p) => p.slug === initialSlug) || null : null
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))];

  const filteredPosts =
    selectedCategory === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === selectedCategory);

  if (selectedPost) {
    return (
      <article className="mx-auto w-full max-w-[900px] space-y-8 px-4 py-8 sm:px-6 sm:py-10">
        {/* Back button */}
        <button
          type="button"
          onClick={() => setSelectedPost(null)}
          className="inline-flex items-center gap-2 rounded-lg border border-app-border bg-app-surface px-3 py-1.5 text-xs font-semibold text-app-muted transition-colors hover:border-app-amber/50 hover:text-app-amber"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Blog
        </button>

        {/* Article Header */}
        <header className="space-y-4 border-b border-app-border pb-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-app-subtle">
            <span className="rounded bg-app-amber/10 border border-app-amber/30 px-2 py-0.5 font-bold text-app-amber">
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

          <h1 className="text-3xl sm:text-4xl font-black text-app-ink leading-tight">
            {selectedPost.title}
          </h1>

          <p className="text-lg text-app-muted leading-relaxed">
            {selectedPost.excerpt}
          </p>

          <div className="flex flex-wrap gap-2">
            {selectedPost.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md border border-app-border bg-app-inset px-2 py-0.5 font-mono text-[10px] text-app-subtle"
              >
                <Tag className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Body */}
        <div className="space-y-8">
          {selectedPost.content.map((section, idx) => (
            <section key={idx} className="space-y-3">
              {section.heading && (
                <h2 className="text-xl sm:text-2xl font-bold text-app-ink border-l-3 border-app-amber pl-4">
                  {section.heading}
                </h2>
              )}
              <p className="text-sm sm:text-base text-app-muted leading-relaxed">
                {section.text}
              </p>
              {section.list && (
                <ul className="space-y-2 pl-4">
                  {section.list.map((item, li) => (
                    <li
                      key={li}
                      className="flex items-start gap-2 text-sm text-app-muted leading-relaxed"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-app-amber" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.code && (
                <div className="overflow-x-auto rounded-xl border border-app-border bg-app-inset p-4">
                  <div className="mb-2 flex items-center gap-1.5 text-[10px] font-mono text-app-subtle">
                    <Code2 className="h-3 w-3" />
                    <span className="uppercase tracking-wider">{section.code.language}</span>
                  </div>
                  <pre className="text-xs sm:text-sm text-app-ink font-mono leading-relaxed whitespace-pre-wrap">
                    <code>{section.code.code}</code>
                  </pre>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="rounded-xl border border-app-amber/30 bg-app-amber/5 p-6 text-center space-y-3">
          <p className="text-sm font-semibold text-app-ink">
            Ready to put what you learned into practice?
          </p>
          <p className="text-xs text-app-muted">
            WebZoneBW SC offers free interactive tools and hands-on lessons to reinforce every concept in this article.
          </p>
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 rounded-lg bg-app-amber px-5 py-2 text-xs font-bold text-black transition-colors hover:bg-app-amber/90"
          >
            <span>Explore WebZoneBW SC</span>
          </button>
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
          <span>WebZoneBW Blog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-app-ink">
          Web Development Insights &amp; Tutorials
        </h1>
        <p className="max-w-2xl text-sm sm:text-base text-app-muted leading-relaxed">
          In-depth articles, tutorials, and best practices for modern web development.
          Learn CSS, HTML, JavaScript, responsive design, and more from the WebZoneBW editorial team.
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
            <div className="flex items-center gap-2 mb-3 text-[10px] font-mono text-app-subtle">
              <span className="rounded bg-app-amber/10 border border-app-amber/30 px-1.5 py-0.5 font-bold text-app-amber">
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
                Read more →
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
