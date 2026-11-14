import React from 'react';
import {
  Menu,
  Sun,
  Moon,
  Zap,
  Flame,
  Search,
  Settings,
  Bot,
  BookOpen,
} from 'lucide-react';
import { AppTheme } from '../utils/types';

interface HumanCentredHeaderProps {
  onToggleSidebar: () => void;
  isSidebarCollapsed?: boolean;
  theme: AppTheme;
  onToggleTheme: () => void;
  xpPoints: number;
  streakDays: number;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onOpenAssistant: () => void;
  onNavigateHome?: () => void;
  activeView: string;
}

export const HumanCentredHeader: React.FC<HumanCentredHeaderProps> = ({
  onToggleSidebar,
  isSidebarCollapsed,
  theme,
  onToggleTheme,
  xpPoints,
  streakDays,
  onOpenSearch,
  onOpenSettings,
  onOpenAssistant,
  onNavigateHome,
  activeView,
}) => {
  const getViewTitle = () => {
    switch (activeView) {
      case 'dashboard':
        return 'Overview Dashboard';
      case 'learning':
        return 'Learning Centre';
      case 'lesson-reader':
        return 'Lesson Reader';
      case 'storehouse':
        return 'Storehouse Archive';
      case 'practice':
        return 'Practice Class';
      case 'assistant':
        return 'AI Learning Assistant';
      case 'campaign':
        return 'Campaign Centre';
      case 'achievements':
        return 'Achievement Engine';
      case 'analytics':
        return 'Analytics & Metrics';
      case 'merchant-payments':
        return 'Merchant & Payments';
      case 'publishing':
        return 'Publishing Pipeline';
      case 'rights-licensing':
        return 'Rights & Licensing';
      case 'course-intelligence':
        return 'Course Intelligence';
      case 'downloads':
        return 'Downloads & Exports';
      case 'profile':
        return 'Student Profile';
      default:
        return 'Studio Workspace';
    }
  };

  return (
    <header className="app-header">
      <div className="app-header-left">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="btn btn-subtle btn-sm"
          title="Toggle Navigation Menu"
        >
          <Menu size={18} />
        </button>

        {onNavigateHome && (
          <button
            type="button"
            onClick={onNavigateHome}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '11px', padding: '0.25rem 0.55rem', whiteSpace: 'nowrap' }}
            title="Return to Public Website Homepage"
          >
            ← Public Website
          </button>
        )}

        <span className="app-header-title">
          {getViewTitle()}
        </span>
      </div>

      <div className="app-header-right">
        {/* Quick Search */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.35rem 0.65rem' }}
          title="Search curriculum & Storehouse"
        >
          <Search size={14} />
          <span style={{ display: 'none' }}>Search</span>
          <kbd className="app-header-search-kbd" style={{ fontSize: '10px', opacity: 0.7, padding: '0.1rem 0.3rem', background: 'var(--color-inset)', borderRadius: '3px' }}>⌘K</kbd>
        </button>

        {/* AI Quick Consult */}
        <button
          type="button"
          onClick={onOpenAssistant}
          className="btn btn-subtle btn-sm"
          title="Open AI Learning Assistant"
        >
          <Bot size={15} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
          <span className="app-header-assistant-label">Assistant</span>
        </button>

        {/* Streak chip */}
        <div
          className="badge badge-accent app-header-streak-chip"
          title={`Active daily streak: ${streakDays} days`}
          style={{ cursor: 'default' }}
        >
          <Flame size={12} style={{ color: 'var(--color-primary)' }} />
          <span>{streakDays}d</span>
        </div>

        {/* XP chip */}
        <div
          className="badge badge-primary app-header-xp-chip"
          title={`Total XP: ${xpPoints}`}
          style={{ cursor: 'default' }}
        >
          <Zap size={12} />
          <span>{xpPoints} XP</span>
        </div>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="btn btn-subtle btn-sm btn-icon-only"
          title={theme === 'dark' ? 'Switch to Editorial Light theme' : 'Switch to Volcanic Dark theme'}
        >
          {theme === 'dark' ? (
            <Sun size={16} style={{ color: 'var(--color-accent)' }} />
          ) : (
            <Moon size={16} style={{ color: 'var(--color-primary)' }} />
          )}
        </button>

        {/* Settings button */}
        <button
          type="button"
          onClick={onOpenSettings}
          className="btn btn-subtle btn-sm btn-icon-only"
          title="Open Settings"
        >
          <Settings size={16} />
        </button>
      </div>
    </header>
  );
};
