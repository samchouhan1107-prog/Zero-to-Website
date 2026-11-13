import React, { useEffect } from 'react';
import {
  BookOpen,
  Check,
  Download,
  Lock,
  Moon,
  RotateCcw,
  Scale,
  Settings,
  Shield,
  Sun,
  Type,
  Upload,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { UserProgress, AppTheme } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: AppTheme;
  onSelectTheme: (theme: AppTheme) => void;
  fontSize: 'sm' | 'md' | 'lg';
  onSelectFontSize: (size: 'sm' | 'md' | 'lg') => void;
  fontFamily: 'sans' | 'serif' | 'mono';
  onSelectFontFamily: (font: 'sans' | 'serif' | 'mono') => void;
  onResetProgress: () => void;
  progress: UserProgress;
  onOpenLegal?: (tab: 'privacy' | 'terms' | 'cookies' | 'about' | 'contact') => void;
}

type ThemeOption = {
  id: AppTheme;
  label: string;
  description: string;
  icon: LucideIcon;
  swatchClass: string;
};

const themeOptions: ThemeOption[] = [
  {
    id: 'dark',
    label: 'Dark reading',
    description: 'Low-glare navy canvas for focused study sessions.',
    icon: Moon,
    swatchClass: 'bg-slate-900 border-slate-600',
  },
  {
    id: 'light',
    label: 'Warm cream reading',
    description: 'Gentle warm cream and linen surfaces soothing on the eyes.',
    icon: Sun,
    swatchClass: 'bg-[#f6f3eb] border-[#ded8cb]',
  },
];

const fontSizeOptions = [
  { id: 'sm', label: 'Compact', detail: '14px' },
  { id: 'md', label: 'Standard', detail: '16px' },
  { id: 'lg', label: 'Large', detail: '18px' },
] as const;

const fontFamilyOptions = [
  { id: 'sans', label: 'Modern Sans', className: 'font-sans' },
  { id: 'serif', label: 'Editorial Serif', className: 'font-serif' },
  { id: 'mono', label: 'Technical Mono', className: 'font-mono' },
] as const;

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onSelectTheme,
  fontSize,
  onSelectFontSize,
  fontFamily,
  onSelectFontFamily,
  onResetProgress,
  progress,
  onOpenLegal,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const exportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `wz-storehouse-progress-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="flex max-h-[min(90dvh,720px)] w-full max-w-2xl flex-col overflow-hidden rounded-panel border border-app-border bg-app-surface text-app-ink shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-dialog-title"
      >
        <header className="flex items-center justify-between gap-4 border-b border-app-border bg-app-inset px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control border border-app-border bg-app-active text-app-amber">
              <Settings className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-app-subtle">Workspace settings</p>
              <h2 id="settings-dialog-title" className="truncate text-lg font-bold text-app-ink">Reading preferences</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-control border border-app-border text-app-muted transition-colors hover:bg-app-active hover:text-app-ink"
            aria-label="Close reading preferences"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="min-h-0 space-y-7 overflow-y-auto p-5 sm:p-6">
          <section className="space-y-3" aria-labelledby="theme-heading">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-app-amber">01 / Reading mode</p>
                <h3 id="theme-heading" className="mt-1 text-base font-bold text-app-ink">Choose your study canvas</h3>
              </div>
              <span className="font-mono text-xs font-bold text-app-amber">{theme === 'dark' ? 'Dark reading' : 'Light reading'}</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = theme === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onSelectTheme(option.id)}
                    aria-pressed={isSelected}
                    className={`group flex min-h-28 items-start gap-3 rounded-control border p-4 text-left transition-colors ${
                      isSelected
                        ? 'border-app-amber bg-app-active ring-2 ring-app-amber/35'
                        : 'border-app-border bg-app-inset hover:border-app-amber/70 hover:bg-app-active'
                    }`}
                  >
                    <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-control border ${option.swatchClass}`}>
                      <Icon className={`h-5 w-5 ${isSelected ? 'text-app-amber' : 'text-app-muted'}`} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 text-sm font-bold text-app-ink">
                        {option.label}
                        {isSelected && <Check className="h-4 w-4 text-app-amber" aria-hidden="true" />}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-app-muted">{option.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="space-y-3 border-t border-app-border pt-6" aria-labelledby="type-heading">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-app-amber">02 / Type scale</p>
              <h3 id="type-heading" className="mt-1 flex items-center gap-2 text-base font-bold text-app-ink">
                <Type className="h-4 w-4 text-app-muted" aria-hidden="true" /> Reading text size
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {fontSizeOptions.map((option) => {
                const isSelected = fontSize === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onSelectFontSize(option.id)}
                    aria-pressed={isSelected}
                    className={`min-h-14 rounded-control border px-3 py-2 text-left transition-colors ${
                      isSelected
                        ? 'border-app-amber bg-app-active text-app-ink ring-2 ring-app-amber/25'
                        : 'border-app-border bg-app-inset text-app-muted hover:border-app-amber/70 hover:text-app-ink'
                    }`}
                  >
                    <span className="block text-xs font-bold">{option.label}</span>
                    <span className="font-mono text-[11px] text-app-subtle">{option.detail}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="space-y-3 border-t border-app-border pt-6" aria-labelledby="font-heading">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-app-amber">03 / Typeface</p>
              <h3 id="font-heading" className="mt-1 flex items-center gap-2 text-base font-bold text-app-ink">
                <BookOpen className="h-4 w-4 text-app-muted" aria-hidden="true" /> Choose a reading voice
              </h3>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {fontFamilyOptions.map((option) => {
                const isSelected = fontFamily === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onSelectFontFamily(option.id)}
                    aria-pressed={isSelected}
                    className={`min-h-12 rounded-control border px-3 py-2 text-left text-sm transition-colors ${option.className} ${
                      isSelected
                        ? 'border-app-amber bg-app-active font-bold text-app-ink ring-2 ring-app-amber/25'
                        : 'border-app-border bg-app-inset text-app-muted hover:border-app-amber/70 hover:text-app-ink'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="space-y-3 border-t border-app-border pt-6" aria-labelledby="privacy-heading">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-app-amber">04 / Notifications</p>
              <h3 id="privacy-heading" className="mt-1 text-base font-bold text-app-ink">Keep up with new lessons</h3>
            </div>
            <div className="flex flex-col gap-3 rounded-control border border-app-border bg-app-inset p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-sm leading-relaxed text-app-muted">Enable browser notifications for new curriculum and coding challenge releases.</p>
              <button
                type="button"
                onClick={async () => {
                  if ('Notification' in window) {
                    const permission = await Notification.requestPermission();
                    if (permission === 'granted') {
                      localStorage.setItem('webzone_push_enabled', 'true');
                      new Notification('WebZone Knowledge Base', {
                        body: 'Push notifications are active!',
                        icon: '/icon.png',
                      });
                    }
                  }
                }}
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-control bg-app-amber px-4 text-xs font-bold text-slate-950 transition-colors hover:bg-app-amber-hover"
              >
                <Upload className="h-4 w-4" aria-hidden="true" /> Configure push
              </button>
            </div>
          </section>

          {onOpenLegal && (
            <section className="space-y-3 border-t border-app-border pt-6" aria-labelledby="compliance-heading">
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-app-amber">05 / Trust &amp; Compliance</p>
                <h3 id="compliance-heading" className="mt-1 flex items-center gap-2 text-base font-bold text-app-ink">
                  <Shield className="h-4 w-4 text-app-amber" aria-hidden="true" /> Privacy &amp; Ad Policies
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenLegal('privacy');
                  }}
                  className="flex items-center gap-2 rounded-control border border-app-border bg-app-inset p-3 text-xs font-bold text-app-ink hover:border-app-amber hover:bg-app-active transition-colors"
                >
                  <Lock className="h-3.5 w-3.5 text-app-amber" />
                  <span>Privacy Policy</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenLegal('terms');
                  }}
                  className="flex items-center gap-2 rounded-control border border-app-border bg-app-inset p-3 text-xs font-bold text-app-ink hover:border-app-amber hover:bg-app-active transition-colors"
                >
                  <Scale className="h-3.5 w-3.5 text-app-amber" />
                  <span>Terms of Use</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenLegal('cookies');
                  }}
                  className="flex items-center gap-2 rounded-control border border-app-border bg-app-inset p-3 text-xs font-bold text-app-ink hover:border-app-amber hover:bg-app-active transition-colors"
                >
                  <Shield className="h-3.5 w-3.5 text-app-amber" />
                  <span>Cookie Policy</span>
                </button>
              </div>
            </section>
          )}

          <section className="space-y-3 border-t border-app-border pt-6" aria-labelledby="data-heading">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-app-amber">06 / Your data</p>
              <h3 id="data-heading" className="mt-1 text-base font-bold text-app-ink">Back up or reset progress</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={exportData}
                className="inline-flex min-h-11 items-center gap-2 rounded-control border border-app-border bg-app-inset px-4 text-xs font-bold text-app-ink transition-colors hover:border-app-amber/70 hover:bg-app-active"
              >
                <Download className="h-4 w-4 text-app-amber" aria-hidden="true" /> Export progress
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Are you sure you want to reset all completed lessons and practice records?')) {
                    onResetProgress();
                    onClose();
                  }
                }}
                className="ml-auto inline-flex min-h-11 items-center gap-2 rounded-control border border-red-400/50 px-4 text-xs font-bold text-red-500 transition-colors hover:bg-red-500/10"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset progress
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
