export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content?: string;
  date: string;
  category: 'curriculum' | 'feature' | 'update' | 'announcement';
  badge: string;
  accentColor: string;
  isUnread?: boolean;
  actionLabel?: string;
  targetView?: 'home' | 'lesson' | 'practice-hub' | 'visual-lab';
  targetLessonId?: string;
}

export const NEWS_UPDATES: NewsItem[] = [
  {
    id: 'news-v24-visual-lab',
    title: 'Visual Explainer Studio & 3D Box Model Simulator Launched',
    summary: 'Interactive mental model visualizers with real-time CSS Box Model, Flexbox Playground, CSS Grid Builder, and Event Loop simulators are now live.',
    date: 'Just now',
    category: 'feature',
    badge: 'NEW FEATURE',
    accentColor: 'from-cyan-500 to-blue-600',
    isUnread: true,
    actionLabel: 'Launch Visual Lab',
    targetView: 'visual-lab',
  },
  {
    id: 'news-themes-atmosphere',
    title: '6 Atmospheric Visual Themes with Dynamic Color Cascade',
    summary: 'Switch seamlessly between Obsidian Dark Knight, Light Clean, Cyber Energy, Sunset Pulse, Emerald Flow, and Warm Sepia with ⌘K or header quick-toggle.',
    date: 'Today',
    category: 'update',
    badge: 'THEMING',
    accentColor: 'from-amber-500 to-yellow-400',
    isUnread: true,
    actionLabel: 'Explore Home',
    targetView: 'home',
  },
  {
    id: 'news-practice-sandboxes',
    title: 'Complete Hands-On Practice Coding Arena with Automated Tests',
    summary: 'Master full-stack skills with in-browser live code sandboxes, instant test runner validation, code diffing, and AI tutor feedback.',
    date: '1 day ago',
    category: 'curriculum',
    badge: 'PRACTICE',
    accentColor: 'from-emerald-500 to-teal-400',
    isUnread: false,
    actionLabel: 'Try Practice Hub',
    targetView: 'practice-hub',
  },
  {
    id: 'news-browser-push-support',
    title: 'Web Push & Instant Release Notification System',
    summary: 'Opt-in to real-time browser push notifications and cookie-backed updates so you never miss new curriculum modules or interactive exercises.',
    date: '2 days ago',
    category: 'announcement',
    badge: 'SYSTEM',
    accentColor: 'from-indigo-500 to-purple-600',
    isUnread: false,
  },
];
