import { BLOG_POSTS } from '../blogData';
import type { BlogArticle } from '../../utils/types';

const RELATED_LESSONS: Record<string, string> = {
  'blog-001': 'ch-04-l-03',
  'blog-002': 'ch-05-l-02',
  'blog-003': 'ch-02-l-02',
  'blog-004': 'ch-08-l-01',
  'blog-005': 'css-03-01',
  'blog-007': 'ch-05-l-02',
  'blog-008': 'ch-07-l-01',
  'blog-009': 'ch-02-l-02',
  'blog-010': 'ch-10-l-03',
  'blog-011': 'ch-10-l-03',
  'blog-012': 'css-03-03',
  'blog-013': 'ch-07-l-02',
  'blog-015': 'ch-10-l-04',
  'blog-016': 'ch-10-l-02',
  'blog-017': 'ch-01-l-03',
  'blog-018': 'css-08-01',
  'blog-019': 'ch-08-l-03',
  'blog-022': 'css-06-01',
  'blog-024': 'css-03-04',
  'blog-025': 'ch-00-l-02',
  'blog-026': 'ch-09-l-03',
  'blog-027': 'ch-09-l-02',
  'blog-028': 'ai-04-04',
};

/**
 * Adapts the original structured article records to the Blog view's shared
 * article shape without changing their source IDs, slugs, or content blocks.
 */
export const LEGACY_BLOG_ARTICLES: BlogArticle[] = BLOG_POSTS.map((post) => ({
  id: post.id,
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  content: '',
  author: post.author,
  date: post.date,
  dateLabel: 'Article date',
  category: post.category,
  readTime: post.readTime,
  featured: false,
  relatedChapter: post.courseRef?.chapterLabel,
  relatedLessonId: post.courseRef?.lessonId ?? RELATED_LESSONS[post.id],
  courseRef: post.courseRef,
  tags: [...new Set([...post.tags, post.category])],
  structuredContent: post.content,
}));
