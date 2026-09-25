import { AppTheme } from './types';

export const APP_THEMES = ['dark', 'light'] as const;

export const LEGACY_THEME_CLASSES = [
  'batman',
  'cyber-energy',
  'sunset-pulse',
  'emerald-flow',
  'sepia',
] as const;

export function normalizeAppTheme(value: string | null): AppTheme {
  return value === 'light' ? 'light' : 'dark';
}

export function applyAppTheme(theme: AppTheme | 'auto'): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const themeClasses: string[] = [...APP_THEMES, ...LEGACY_THEME_CLASSES];

  root.classList.remove(...themeClasses);

  if (theme === 'auto') {
    // Use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const effectiveTheme = prefersDark ? 'dark' : 'light';
    root.classList.add(effectiveTheme);
  } else {
    root.classList.add(theme);
  }
}

export function getSystemThemePreference(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
