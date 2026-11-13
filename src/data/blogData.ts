import { CSS_ARTICLES } from './blog/cssArticles';
import { HTML_ACCESSIBILITY_ARTICLES } from './blog/htmlAccessibilityArticles';
import { JAVASCRIPT_ARTICLES } from './blog/javascriptArticles';
import { PERF_NETWORK_ARTICLES } from './blog/perfNetworkArticles';
import { SYSTEM_ARTICLES } from './blog/systemArticles';

export interface BlogSection {
  heading?: string;
  text: string;
  code?: { language: string; code: string };
  list?: string[];
  callout?: {
    type: 'tip' | 'warning' | 'checkpoint' | 'info';
    title?: string;
    text: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  checkpoint?: {
    question: string;
    answer: string;
    hint?: string;
  };
  internalLink?: {
    label: string;
    target: string;
    description?: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  content: BlogSection[];
}

// Concatenate and sort deterministically by id (blog-001 -> blog-027)
const ALL_POSTS_RAW: BlogPost[] = [
  ...CSS_ARTICLES,
  ...HTML_ACCESSIBILITY_ARTICLES,
  ...JAVASCRIPT_ARTICLES,
  ...PERF_NETWORK_ARTICLES,
  ...SYSTEM_ARTICLES,
];

export const BLOG_POSTS: BlogPost[] = ALL_POSTS_RAW.sort((a, b) =>
  a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' })
);
