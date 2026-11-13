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

export function applyAppTheme(theme: AppTheme): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const themeClasses: string[] = [...APP_THEMES, ...LEGACY_THEME_CLASSES];

  root.classList.remove(...themeClasses);
  root.classList.add(theme);
}
