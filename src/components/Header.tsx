import React, { useEffect, useRef, useState } from 'react';
import {
  Bell,
  BellRing,
  Calendar,
  Code2,
  Compass,
  Flame,
  GraduationCap,
  Layers,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  Trophy,
  X,
} from 'lucide-react';
import { UserProgress, AppTheme, ViewMode } from '../utils/types';
import { getWeeklyStreakDays } from '../utils/streakUtils';
import { WebZoneBrandLogo } from './WebZoneBrandLogo';

interface HeaderProps {
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
  onOpenTutor: () => void;
  onOpenMilestones: () => void;
  onOpenSettings: () => void;
  onOpenCertificate: () => void;
  onNavigateHome: () => void;
  onNavigatePractice: () => void;
  onNavigateVisualLab: () => void;
  onNavigateActivities?: () => void;
  onOpenNotifications?: () => void;
  unreadNewsCount?: number;
  progress: UserProgress;
  activeView: ViewMode;
  theme: AppTheme;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onOpenSearch,
  onOpenMilestones,
  onOpenSettings,
  onNavigateHome,
  onNavigatePractice,
  onNavigateVisualLab,
  onNavigateActivities,
  onOpenNotifications,
  unreadNewsCount = 0,
  progress,
  activeView,
  theme,
  onToggleTheme,
}) => {
  const [streakOpen, setStreakOpen] = useState(false);
  const streakRef = useRef<HTMLDivElement>(null);
  const weeklyDays = getWeeklyStreakDays(progress.streakDays || 1, true);
  const themeLabel = theme === 'dark' ? 'Switch to light reading' : 'Switch to dark reading';

  useEffect(() => {
    if (!streakOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (streakRef.current && !streakRef.current.contains(event.target as Node)) {
        setStreakOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [streakOpen]);

  const desktopNavClass = (view: ViewMode) =>
    `flex min-h-11 items-center gap-2 rounded-control px-3 text-xs font-bold transition-colors ${
      activeView === view
        ? 'bg-app-active text-app-ink ring-1 ring-app-amber/60'
        : 'text-app-muted hover:bg-app-active hover:text-app-ink'
    }`;

  const mobileNavClass = (view: ViewMode) =>
    `flex min-h-10 items-center justify-center gap-1.5 rounded-control px-3 text-xs font-bold transition-colors ${
      activeView === view ? 'bg-app-active text-app-ink' : 'text-app-muted hover:bg-app-active hover:text-app-ink'
    }`;

  return (
    <header id="app-header" className="sticky top-0 z-30 border-b border-app-border bg-app-surface text-app-ink">
      <div className="mx-auto flex min-h-16 min-w-0 max-w-[1700px] items-center gap-2 px-3 sm:gap-3 sm:px-5">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-control text-app-muted transition-colors hover:bg-app-active hover:text-app-ink lg:hidden"
          aria-label="Open course outline"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>

        <button type="button" onClick={onNavigateHome} className="flex min-w-0 shrink-0 items-center text-left" aria-label="Open curriculum map">
          <span className="hidden sm:block"><WebZoneBrandLogo size="sm" showSubtitle /></span>
          <span className="sm:hidden"><WebZoneBrandLogo size="sm" showSubtitle={false} /></span>
        </button>
        <span className="hidden shrink-0 rounded-control border border-app-border bg-app-inset px-2 py-1 font-mono text-[10px] font-bold tracking-[0.12em] text-app-amber sm:inline-block">INTERACTIVE</span>

        <nav aria-label="Primary navigation" className="ml-auto hidden min-w-0 items-center gap-1 rounded-panel border border-app-border bg-app-inset p-1 xl:flex">
          <button type="button" onClick={onNavigateHome} className={desktopNavClass('home')} aria-current={activeView === 'home' ? 'page' : undefined}>
            <Compass className="h-4 w-4 text-app-amber" aria-hidden="true" /> Curriculum map
          </button>
          <button type="button" onClick={onNavigatePractice} className={desktopNavClass('practice-hub')} aria-current={activeView === 'practice-hub' ? 'page' : undefined}>
            <Code2 className="h-4 w-4 text-emerald-400" aria-hidden="true" /> Practice arena
          </button>
          <button type="button" onClick={onNavigateVisualLab} className={desktopNavClass('visual-lab')} aria-current={activeView === 'visual-lab' ? 'page' : undefined}>
            <Layers className="h-4 w-4 text-violet-400" aria-hidden="true" /> Visual lab
          </button>
          {onNavigateActivities && (
            <button type="button" onClick={onNavigateActivities} className={desktopNavClass('activities')} aria-current={activeView === 'activities' ? 'page' : undefined}>
              <GraduationCap className="h-4 w-4 text-cyan-400" aria-hidden="true" /> Activities
            </button>
          )}
        </nav>

        <div className="ml-auto flex min-w-0 shrink-0 items-center gap-1 sm:gap-2 xl:ml-3">
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-control border border-app-border bg-app-inset px-2 text-app-muted transition-colors hover:bg-app-active hover:text-app-ink sm:px-3 md:min-w-36 md:justify-start"
            aria-label="Search textbook"
          >
            <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="hidden text-xs md:inline">Search textbook...</span>
            <kbd className="hidden rounded border border-app-border bg-app-active px-1.5 py-0.5 font-mono text-[10px] text-app-subtle md:ml-auto md:inline">⌘K</kbd>
          </button>

          <div className="relative" ref={streakRef}>
            <button
              type="button"
              id="daily-streak-badge"
              onClick={() => setStreakOpen((previous) => !previous)}
              className={`flex min-h-11 items-center gap-1.5 rounded-control border px-2 font-mono text-xs font-bold transition-colors sm:px-3 ${streakOpen ? 'border-app-amber bg-app-active text-app-amber' : 'border-app-border bg-app-inset text-app-amber hover:bg-app-active'}`}
              title="Open daily learning streak"
              aria-label={`Daily streak: ${progress.streakDays} days`}
              aria-expanded={streakOpen}
              aria-controls="streak-popover"
            >
              <Flame className="h-4 w-4 text-orange-400" aria-hidden="true" />
              <span className="tabular-nums">{progress.streakDays}</span>
              <span className="hidden sm:inline">day streak</span>
            </button>

            {streakOpen && (
              <div id="streak-popover" role="dialog" aria-label="Daily learning streak" className="absolute right-0 top-[calc(100%+8px)] z-50 w-[min(320px,calc(100vw-24px))] rounded-panel border border-app-border bg-app-surface p-4 text-app-ink shadow-2xl">
                <div className="flex items-start justify-between gap-3 border-b border-app-border pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-control bg-app-amber text-slate-950"><Flame className="h-4 w-4" aria-hidden="true" /></span>
                    <div><h2 className="text-sm font-bold">Daily learning streak</h2><p className="font-mono text-xs text-orange-400">{progress.streakDays} consecutive {progress.streakDays === 1 ? 'day' : 'days'}</p></div>
                  </div>
                  <button type="button" onClick={() => setStreakOpen(false)} className="flex min-h-11 min-w-11 items-center justify-center rounded-control text-app-muted hover:bg-app-active hover:text-app-ink" aria-label="Close streak details"><X className="h-4 w-4" aria-hidden="true" /></button>
                </div>
                <div className="space-y-2 py-4">
                  <div className="flex items-center justify-between text-xs font-bold"><span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-app-amber" aria-hidden="true" /> This week</span><span className="text-emerald-400">Active today</span></div>
                  <div className="grid grid-cols-7 gap-1">
                    {weeklyDays.map((day) => (
                      <div key={`${day.dayName}-${day.isToday}`} className={`flex min-h-14 flex-col items-center justify-center rounded-control border text-center ${day.isToday ? 'border-app-amber bg-app-amber/15 text-app-amber' : day.isActive ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-400' : 'border-app-border bg-app-inset text-app-subtle'}`}>
                        <span className="font-mono text-[10px] uppercase">{day.dayName}</span>
                        <Flame className={`my-1 h-4 w-4 ${day.isActive ? 'text-orange-400' : 'text-app-subtle'}`} aria-hidden="true" />
                        {day.isToday && <span className="font-mono text-[9px] uppercase">Today</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-control border border-app-border bg-app-inset p-3 text-xs leading-relaxed text-app-muted"><span className="flex items-center gap-1.5 font-bold text-app-ink"><Trophy className="h-4 w-4 text-app-amber" aria-hidden="true" /> Streak continuity bonus</span><p className="mt-1">Complete any lesson or challenge daily for <strong className="text-app-amber">+25 XP</strong>.</p></div>
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-app-border pt-3"><button type="button" onClick={() => { setStreakOpen(false); onOpenMilestones(); }} className="min-h-11 text-xs font-bold text-app-amber hover:underline">View milestones →</button><span className="font-mono text-[11px] text-app-subtle">{progress.streakDays >= 7 ? 'Habit formed' : `${7 - (progress.streakDays % 7)}d to next badge`}</span></div>
              </div>
            )}
          </div>

          <button type="button" onClick={onOpenMilestones} className="hidden min-h-11 items-center gap-1.5 rounded-control border border-app-border bg-app-inset px-3 font-mono text-xs font-bold text-app-amber transition-colors hover:bg-app-active sm:flex" title="View XP milestones" aria-label={`View ${progress.xpPoints} XP milestones`}>
            <span className="text-app-subtle">XP</span><span className="tabular-nums">{progress.xpPoints}</span>
          </button>

          <button type="button" onClick={onOpenNotifications} className="relative flex min-h-11 min-w-11 items-center justify-center rounded-control border border-app-border bg-app-inset text-app-muted transition-colors hover:bg-app-active hover:text-app-ink" title="Notifications and release news" aria-label="Notifications and release news">
            {unreadNewsCount > 0 ? <BellRing className="h-4 w-4 text-app-amber" aria-hidden="true" /> : <Bell className="h-4 w-4" aria-hidden="true" />}
            {unreadNewsCount > 0 && <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-app-amber px-1 font-mono text-[9px] font-black text-slate-950">{unreadNewsCount}</span>}
          </button>

          <button type="button" onClick={onToggleTheme} className="flex min-h-11 min-w-11 items-center justify-center rounded-control border border-app-border bg-app-inset text-app-muted transition-colors hover:bg-app-active hover:text-app-ink" title={themeLabel} aria-label={themeLabel}>
            {theme === 'dark' ? <Sun className="h-4 w-4 text-app-amber" aria-hidden="true" /> : <Moon className="h-4 w-4 text-app-amber" aria-hidden="true" />}
          </button>
          <button type="button" onClick={onOpenSettings} className="flex min-h-11 min-w-11 items-center justify-center rounded-control border border-app-border bg-app-inset text-app-muted transition-colors hover:bg-app-active hover:text-app-ink" title="Open settings" aria-label="Open settings">
            <Settings className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <nav aria-label="Compact navigation" className="flex min-w-0 items-center gap-1 overflow-x-auto border-t border-app-border bg-app-inset px-3 py-1 xl:hidden">
        <button type="button" onClick={onNavigateHome} className={mobileNavClass('home')} aria-current={activeView === 'home' ? 'page' : undefined}><Compass className="h-4 w-4 text-app-amber" aria-hidden="true" /> Curriculum</button>
        <button type="button" onClick={onNavigatePractice} className={mobileNavClass('practice-hub')} aria-current={activeView === 'practice-hub' ? 'page' : undefined}><Code2 className="h-4 w-4 text-emerald-400" aria-hidden="true" /> Arena</button>
        <button type="button" onClick={onNavigateVisualLab} className={mobileNavClass('visual-lab')} aria-current={activeView === 'visual-lab' ? 'page' : undefined}><Layers className="h-4 w-4 text-violet-400" aria-hidden="true" /> Visual lab</button>
        {onNavigateActivities && <button type="button" onClick={onNavigateActivities} className={mobileNavClass('activities')} aria-current={activeView === 'activities' ? 'page' : undefined}><GraduationCap className="h-4 w-4 text-cyan-400" aria-hidden="true" /> Activities</button>}
      </nav>
    </header>
  );
};
