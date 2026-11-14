import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  FolderArchive,
  Code2,
  Bot,
  Flame,
  Award,
  BarChart3,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  BookMarked,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Compass,
  FileText,
  CreditCard,
} from 'lucide-react';

interface HumanCentredSidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  isDrawerOpen: boolean;
  onCloseDrawer: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  totalStorehouseCount?: number;
  streakDays?: number;
}

export const HumanCentredSidebar: React.FC<HumanCentredSidebarProps> = ({
  activeView,
  onNavigate,
  isDrawerOpen,
  onCloseDrawer,
  isCollapsed,
  onToggleCollapse,
  totalStorehouseCount = 0,
  streakDays = 1,
}) => {
  const NAV_ITEMS: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
    count?: number;
    badge?: string;
  }> = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'learning', label: 'Learning Centre', icon: BookOpen },
    { id: 'lesson-reader', label: 'Lesson Reader', icon: BookMarked },
    { id: 'course-intelligence', label: 'Course Intelligence', icon: Compass },
    { id: 'publishing', label: 'Publishing & Rights', icon: FileText },
    { id: 'merchant', label: 'Merchant & Payments', icon: CreditCard },
    { id: 'storehouse', label: 'Storehouse', icon: FolderArchive, count: totalStorehouseCount },
    { id: 'practice', label: 'Live Code', icon: Code2 },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'assistant', label: 'AI Assistant', icon: Bot },
    { id: 'workspace', label: 'Workspace', icon: LayoutDashboard },
    { id: 'webtools', label: 'Web Tools', icon: Code2 },
    { id: 'campaign', label: 'Progress & Rewards', icon: Award },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'profile', label: 'User Profile', icon: User },
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isDrawerOpen && (
        <div
          className="app-sidebar-backdrop"
          onClick={onCloseDrawer}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Component */}
      <aside
        className={`app-sidebar ${isCollapsed ? 'collapsed' : ''} ${
          isDrawerOpen ? 'drawer-open' : ''
        }`}
        aria-label="Platform Sidebar Navigation"
      >
        {/* Sidebar Header */}
        <div className="app-sidebar-header">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                flexShrink: 0,
                padding: '2px',
              }}
              title="WebZoneBW SC"
            >
              <img
                src="/assets/sclogo/logo_8c2b321c.png"
                alt="WebZoneBW SC"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>

            <div className="sidebar-full-only" style={{ minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-strong)',
                  whiteSpace: 'nowrap',
                  lineHeight: 1.2,
                }}
              >
                Zero-to-Website
              </div>
              <div
                style={{
                  fontSize: '10px',
                  color: 'var(--color-text-subtle)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  whiteSpace: 'nowrap',
                }}
              >
                Academy
              </div>
            </div>
          </div>

          {/* Desktop Collapse / Expand Toggle Button */}
          <button
            type="button"
            onClick={onToggleCollapse}
            className="sidebar-collapse-toggle btn btn-subtle btn-sm btn-icon-only"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onCloseDrawer}
            className="app-sidebar-mobile-close btn btn-subtle btn-sm btn-icon-only"
            style={{ display: 'none' }}
            title="Close navigation drawer"
            aria-label="Close navigation drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="app-sidebar-nav">
          <div className="sidebar-full-only" style={{ padding: '0 0.25rem 0.65rem' }}>
            <button
              type="button"
              onClick={() => {
                onNavigate('home');
                onCloseDrawer();
              }}
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', justifyContent: 'center', fontSize: '11px', padding: '0.4rem 0.6rem' }}
              title="Return to Public Website"
            >
              ← Public Website
            </button>
          </div>

          <div
            className="sidebar-full-only"
            style={{
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-text-subtle)',
              padding: '0 0.5rem 0.5rem 0.5rem',
            }}
          >
            Curriculum &amp; Tools
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onNavigate(item.id);
                    onCloseDrawer();
                  }}
                  className={`nav-item-btn ${isActive ? 'active' : ''}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <div className="nav-item-left">
                    <div className="nav-item-icon-box">
                      <Icon
                        size={17}
                        style={{
                          color: isActive
                            ? 'var(--color-accent)'
                            : 'var(--color-text-muted)',
                        }}
                      />
                    </div>
                    <span className="sidebar-full-only nav-item-label">
                      {item.label}
                    </span>
                  </div>

                  {item.badge && (
                    <span
                      className="sidebar-full-only badge badge-accent"
                      style={{ flexShrink: 0, padding: '0.12rem 0.45rem', fontSize: '10px' }}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && item.count > 0 && (
                    <span
                      className="sidebar-full-only badge"
                      style={{ flexShrink: 0, padding: '0.12rem 0.45rem', fontSize: '10px' }}
                    >
                      {item.count}
                    </span>
                  )}

                  {/* Accessible hover tooltip shown only in collapsed desktop mode */}
                  <span className="nav-tooltip">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="app-sidebar-footer">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-accent-subtle)',
                color: 'var(--color-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 800,
                flexShrink: 0,
              }}
              title="Scholar Account"
            >
              S
            </div>
            <span
              className="sidebar-full-only"
              style={{ fontSize: 'var(--text-xs)', fontWeight: 600, whiteSpace: 'nowrap' }}
            >
              Scholar
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <button
              type="button"
              onClick={() => {
                onNavigate('settings');
                onCloseDrawer();
              }}
              className="btn btn-subtle btn-sm btn-icon-only"
              title="Preferences & Settings"
              aria-label="Settings"
            >
              <Settings size={15} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
