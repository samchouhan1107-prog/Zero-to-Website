export const PUBLIC_VIEW_PATHS: Record<string, string> = {
  home: '/',
  courses: '/courses/',
  'free-lessons': '/free-lessons/',
  membership: '/membership/',
  'public-practice': '/live-code/',
  blog: '/blog/',
};

type RouteLocation = Pick<Location, 'pathname' | 'search'>;

export function getBlogSlugFromLocation(location: RouteLocation): string | null {
  const pathMatch = location.pathname.match(/^\/blog\/([^/]+)\/?$/i);
  if (pathMatch) {
    try {
      return decodeURIComponent(pathMatch[1]);
    } catch {
      return null;
    }
  }

  return new URLSearchParams(location.search).get('blog');
}

export function getViewFromLocation(location: RouteLocation): string {
  const normalizedPath = (location.pathname.replace(/\/+$/, '') || '/').toLowerCase();
  const params = new URLSearchParams(location.search);
  if (normalizedPath === '/') {
    if (params.has('blog')) return 'blog';
    if (params.has('lesson')) return 'lesson-reader';
    return params.get('view') || 'home';
  }

  const section = Object.entries(PUBLIC_VIEW_PATHS).find(([, path]) =>
    ((path.replace(/\/+$/, '') || '/').toLowerCase()) === normalizedPath
  );
  if (section) return section[0];

  if (/^\/blog\/[^/]+$/i.test(normalizedPath)) return 'blog';

  return params.get('view') || 'home';
}

export function getViewHref(view: string, params?: Record<string, string>): string {
  if (view === 'blog' && params?.slug) {
    return `/blog/${encodeURIComponent(params.slug)}/`;
  }

  const publicPath = PUBLIC_VIEW_PATHS[view];
  if (publicPath) return publicPath;

  const query = new URLSearchParams({ view, ...params });
  return `/?${query.toString()}`;
}

export function getBlogArticleHref(slug: string): string {
  return `/blog/${encodeURIComponent(slug)}/`;
}
