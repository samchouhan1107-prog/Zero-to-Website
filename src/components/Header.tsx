import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  Search,
  Sparkles,
  BookOpen,
  Settings,
  Flame,
  Award,
  Sun,
  Moon,
  Zap,
  Code2,
  Layers,
  Compass,
  Calendar,
  Trophy,
  X,
  Bell,
  BellRing,
  GraduationCap,
} from 'lucide-react';
import { UserProgress, AppTheme, ViewMode } from '../types';
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
  onOpenTutor,
  onOpenMilestones,
  onOpenSettings,
  onOpenCertificate,
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

  // Close streak popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (streakRef.current && !streakRef.current.contains(event.target as Node)) {
        setStreakOpen(false);
      }
    };
    if (streakOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [streakOpen]);

  const weeklyDays = getWeeklyStreakDays(progress.streakDays || 1, true);

  const getThemeIcon = () => {
    switch (theme) {
      case 'batman':
      case 'dark':
        return (
          <div className="relative flex items-center justify-center">
            <Moon className="w-4 h-4 text-yellow-400 fill-yellow-400/40" />
            <span className="absolute -top-1 -right-1 flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-yellow-500"></span>
            </span>
          </div>
        );
      case 'cyber-energy':
        return <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400/30 animate-pulse" />;
      case 'sunset-pulse':
        return <Flame className="w-4 h-4 text-orange-400 fill-orange-400/30 animate-pulse" />;
      case 'emerald-flow':
        return <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />;
      case 'sepia':
        return <BookOpen className="w-4 h-4 text-amber-600" />;
      case 'light':
      default:
        return <Sun className="w-4 h-4 text-amber-500 fill-amber-400/20" />;
    }
  };

  return (
    <header
      id="app-header"
      className="sticky top-0 z-30 w-full bg-[#07090f] dark:bg-[#07090f] border-b border-[#141b2d] px-3 sm:px-5 py-2.5 shadow-xl select-none"
    >
      <div className="flex items-center justify-between gap-2 sm:gap-4 max-w-[1700px] mx-auto">
        
        {/* Left: Hamburger & Brand Identity */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#121829] transition-colors cursor-pointer"
            aria-label="Toggle navigation curriculum"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={onNavigateHome}
            className="flex items-center gap-3 text-left group cursor-pointer transition-transform hover:opacity-95"
            title="SC WebZone Knowledge Base"
          >
            {/* Official SC WebZone Brand Logo */}
            <WebZoneBrandLogo size="md" showSubtitle={true} />
            
            <span className="hidden sm:inline-block text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#1c1444] border border-[#6366f1]/50 text-[#c084fc] tracking-wider shadow-[0_0_10px_rgba(99,102,241,0.2)]">
              INTERACTIVE
            </span>
          </button>
        </div>

        {/* Center: Segmented Navigation Capsule (Matching Screenshot Exactly) */}
        <nav className="hidden lg:flex items-center p-1 rounded-2xl bg-[#090d19] border border-[#1b233a] shadow-inner">
          {/* Curriculum Map */}
          <button
            onClick={onNavigateHome}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              activeView === 'home'
                ? 'bg-[#13233c] text-[#38bdf8] border border-[#1e3a5f] shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-[#121829]'
            }`}
          >
            <Compass className={`w-3.5 h-3.5 ${activeView === 'home' ? 'text-[#38bdf8]' : 'text-slate-400'}`} />
            <span>Curriculum Map</span>
          </button>

          {/* Practice Arena */}
          <button
            onClick={onNavigatePractice}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'practice-hub'
                ? 'bg-[#0f2d25] text-[#34d399] border border-[#059669]/60 shadow-[0_0_12px_rgba(52,211,153,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-[#121829]'
            }`}
          >
            <span className="font-mono text-xs opacity-75">&lt;/&gt;</span>
            <span>Practice Arena</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold bg-[#064e3b] text-[#34d399] border border-[#059669]/40 flex items-center gap-0.5">
              ⚡ Live
            </span>
          </button>

          {/* Visual Lab */}
          <button
            onClick={onNavigateVisualLab}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'visual-lab'
                ? 'bg-[#29173b] text-[#d8b4fe] border border-[#7e22ce]/60 shadow-[0_0_12px_rgba(216,180,254,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-[#121829]'
            }`}
          >
            <Layers className={`w-3.5 h-3.5 ${activeView === 'visual-lab' ? 'text-[#d8b4fe]' : 'text-slate-400'}`} />
            <span>Visual Lab</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold bg-[#3b0764] text-[#d8b4fe] border border-[#7e22ce]/40">
              3D
            </span>
          </button>

          {/* Post-Class Activities Hub */}
          {onNavigateActivities && (
            <button
              onClick={onNavigateActivities}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'activities'
                  ? 'bg-[#1e1a38] text-[#c084fc] border border-[#a855f7]/60 shadow-[0_0_12px_rgba(192,132,252,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-[#121829]'
              }`}
            >
              <GraduationCap className={`w-3.5 h-3.5 ${activeView === 'activities' ? 'text-[#c084fc]' : 'text-slate-400'}`} />
              <span>Activities</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold bg-[#4c1d95] text-[#c084fc] border border-[#a855f7]/40">
                Hub
              </span>
            </button>
          )}
        </nav>

        {/* Right Controls: Search, Days Streak, XP, Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Search Bar Capsule */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl border border-[#1b233a] bg-[#090d19] text-slate-400 hover:text-white hover:border-slate-700 text-xs transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden md:inline text-slate-400">Search textbook...</span>
            <kbd className="hidden md:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#161e33] text-slate-400 border border-slate-700/50">
              ⌘K
            </kbd>
          </button>

          {/* Days Streak Capsule (Matching Screenshot Exactly) */}
          <div className="relative" ref={streakRef}>
            <button
              id="daily-streak-badge"
              onClick={() => setStreakOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-xs font-bold font-mono transition-all cursor-pointer relative ${
                streakOpen
                  ? 'bg-[#2a170a] text-orange-400 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.35)]'
                  : 'bg-gradient-to-r from-[#1c1108] to-[#26150a] border-amber-500/50 text-amber-400 hover:border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
              }`}
              title="Daily Learning Streak: Click for breakdown & weekly progress"
              aria-label={`Daily Streak: ${progress.streakDays} Days`}
            >
              <div className="relative flex items-center justify-center">
                <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 group-hover:scale-115 transition-transform" />
                <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500"></span>
                </span>
              </div>
              <span className="font-black text-orange-400">{progress.streakDays}</span>
              <span className="hidden sm:inline font-extrabold text-amber-300">
                Days Streak
              </span>
            </button>

            {/* Streak Popover */}
            {streakOpen && (
              <div
                id="streak-popover"
                className="absolute right-0 mt-2 w-72 sm:w-80 p-4 rounded-2xl bg-[#0d1222] border border-orange-500/40 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#1b233a]">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-orange-500 text-white shadow-xs">
                      <Flame className="w-4 h-4 fill-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-wider">
                        Daily Learning Streak
                      </h4>
                      <p className="text-[11px] font-bold text-orange-400">
                        🔥 {progress.streakDays} Consecutive {progress.streakDays === 1 ? 'Day' : 'Days'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setStreakOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#161e33]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="py-3.5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-orange-500" /> This Week's Rhythm
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      Active Today ✓
                    </span>
                  </div>

                  <div className="grid grid-cols-7 gap-1 pt-1">
                    {weeklyDays.map((d, i) => (
                      <div
                        key={i}
                        className={`flex flex-col items-center p-1.5 rounded-xl border text-center transition-all ${
                          d.isToday
                            ? 'bg-orange-500/20 border-orange-400 text-orange-300 ring-1 ring-orange-400/40 font-black'
                            : d.isActive
                            ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-300 font-bold'
                            : 'bg-[#080c17] border-[#1b233a] text-slate-500'
                        }`}
                      >
                        <span className="text-[9px] font-mono uppercase">{d.dayName}</span>
                        <div className="my-1">
                          {d.isActive ? (
                            <Flame className={`w-3.5 h-3.5 ${d.isToday ? 'text-orange-500 fill-orange-500 animate-bounce' : 'text-emerald-500 fill-emerald-500'}`} />
                          ) : (
                            <div className="w-3.5 h-3.5 rounded-full border border-dashed border-slate-700 flex items-center justify-center text-[8px]">
                              •
                            </div>
                          )}
                        </div>
                        {d.isToday && (
                          <span className="text-[8px] font-mono uppercase text-orange-400 font-bold">
                            Today
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#141b2f] border border-orange-500/30 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-orange-300">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Streak Continuity Bonus</span>
                  </div>
                  <p className="text-[10px] text-slate-300 leading-relaxed">
                    Complete any lesson or challenge daily for <strong className="text-orange-400">+25 XP</strong> daily bonus!
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#1b233a] flex items-center justify-between">
                  <button
                    onClick={() => {
                      setStreakOpen(false);
                      onOpenMilestones();
                    }}
                    className="text-[11px] font-bold text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    View Milestones ➔
                  </button>
                  <span className="text-[10px] font-mono text-slate-400">
                    {progress.streakDays >= 7 ? '🌟 Habit Formed' : `${7 - (progress.streakDays % 7)}d to next badge`}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 170 XP Badge Capsule (Matching Screenshot Exactly) */}
          <button
            onClick={onOpenMilestones}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-[#1c1505] to-[#261d06] border border-yellow-500/50 text-yellow-400 text-xs font-bold font-mono hover:border-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.2)] transition-all cursor-pointer group"
            title="View XP Milestones & Level Roadmap"
            aria-label="View XP Milestones"
          >
            <Flame className="w-3.5 h-3.5 text-yellow-400 fill-current group-hover:scale-110 transition-transform" />
            <span className="font-black text-yellow-300">{progress.xpPoints} XP</span>
          </button>

          {/* Release News & Push Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            className="p-2 rounded-2xl border border-[#1b233a] bg-[#090d19] text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer relative group"
            title="Notifications, News & Push Updates"
            aria-label="Notifications and Updates"
          >
            {unreadNewsCount > 0 ? (
              <>
                <BellRing className="w-4 h-4 text-amber-400" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 rounded-full text-[9px] font-black flex items-center justify-center shadow-xs">
                  {unreadNewsCount}
                </span>
              </>
            ) : (
              <Bell className="w-4 h-4" />
            )}
          </button>

          {/* Quick Theme Switcher */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-2xl border border-[#1b233a] bg-[#090d19] text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer relative group"
            title={`Current Theme: ${theme}. Click to switch theme`}
          >
            {getThemeIcon()}
          </button>

          {/* Settings Modal */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-2xl border border-[#1b233a] bg-[#090d19] text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
            title="Settings & Themes"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Tabs */}
      <div className="flex lg:hidden items-center justify-around mt-2 pt-2 border-t border-[#141b2d] text-xs font-semibold">
        <button
          onClick={onNavigateHome}
          className={`px-3 py-1 rounded-lg flex items-center gap-1 ${
            activeView === 'home'
              ? 'bg-[#13233c] text-[#38bdf8] font-bold'
              : 'text-slate-400'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          Curriculum
        </button>
        <button
          onClick={onNavigatePractice}
          className={`px-3 py-1 rounded-lg flex items-center gap-1 ${
            activeView === 'practice-hub'
              ? 'bg-[#0f2d25] text-[#34d399] font-bold'
              : 'text-slate-400'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          Arena
        </button>
        <button
          onClick={onNavigateVisualLab}
          className={`px-3 py-1 rounded-lg flex items-center gap-1 ${
            activeView === 'visual-lab'
              ? 'bg-[#29173b] text-[#d8b4fe] font-bold'
              : 'text-slate-400'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Visual Lab
        </button>
      </div>
    </header>
  );
};

