import { BlogPost } from '../../data/blogData';

export type BlogShellContext = 'studio' | 'public';

export type ResolvedBlogAction =
  | { type: 'lesson'; lessonId: string }
  | { type: 'view'; viewId: string };

/**
 * Extract unique sorted categories prefixed by 'All'.
 */
export function getBlogCategories(posts: BlogPost[]): string[] {
  const unique = Array.from(new Set(posts.map((post) => post.category))).sort((a, b) =>
    a.localeCompare(b)
  );
  return ['All', ...unique];
}

/**
 * Filter blog posts by category and free-text query across title, excerpt, tags, category, and courseRef.
 */
export function filterBlogPosts(
  posts: BlogPost[],
  category: string,
  searchQuery: string
): BlogPost[] {
  const normalizedCategory = category.trim();
  const q = searchQuery.trim().toLowerCase();

  return posts.filter((post) => {
    const matchesCategory =
      !normalizedCategory || normalizedCategory === 'All' || post.category === normalizedCategory;
    if (!matchesCategory) return false;

    if (!q) return true;

    const haystacks = [
      post.title,
      post.excerpt,
      post.category,
      ...post.tags,
      post.courseRef?.courseTitle ?? '',
      post.courseRef?.chapterLabel ?? '',
      post.courseRef?.lessonTitle ?? '',
    ];

    return haystacks.some((value) => value.toLowerCase().includes(q));
  });
}

/**
 * Format an ISO date string (YYYY-MM-DD) into a readable editorial date.
 */
export function formatBlogDate(isoDate: string): string {
  const parsed = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) {
    return isoDate;
  }
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/**
 * Resolve an article's internalLink target into a valid app navigation action.
 */
export function resolveBlogTargetAction(
  target: string,
  context: BlogShellContext
): ResolvedBlogAction {
  if (target.startsWith('lesson:')) {
    const lessonId = target.slice('lesson:'.length).trim();
    if (lessonId) {
      return { type: 'lesson', lessonId };
    }
  }

  if (target === 'practice') {
    return { type: 'view', viewId: context === 'public' ? 'public-practice' : 'practice' };
  }

  if (target === 'courses' || target === 'learning') {
    return { type: 'view', viewId: context === 'public' ? 'courses' : 'learning' };
  }

  return { type: 'view', viewId: context === 'public' ? 'courses' : 'learning' };
}
