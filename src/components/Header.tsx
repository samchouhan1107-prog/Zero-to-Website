import React, { useEffect, useRef, useState } from 'react';
import {
  Award,
  Bell,
  BookOpen,
  ChevronDown,
  Code2,
  Compass,
  Flame,
  Globe,
  Layers,
  Menu,
  Moon,
  Search,
  Settings,
  Sparkles,
  Sun,
  User,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import { UserProgress, AppTheme, ViewMode } from '../utils/types';
import { WebZoneBrandLogo } from './WebZoneBrandLogo';
import { AccountModal } from './AccountModal';

export interface HeaderProps {
  onToggleSidebar?: () => void;
  onOpenSearch: () => void;
  onOpenTutor: () => void;
  onOpenMilestones: () => void;
  onOpenSettings: () => void;
  onOpenCertificate: () => void;
  onNavigateHome: () => void;
  onNavigatePractice: () => void;
  onNavigateVisualLab: (toolId?: string) => void;
  onNavigateActivities?: () => void;
  onOpenNotifications?: () => void;
  onSelectCategory?: (category: string) => void;
  unreadNewsCount?: number;
  progress: UserProgress;
  activeView: ViewMode;
  theme: AppTheme;
  onToggleTheme: () => void;
}

const LANGUAGES = [
  { code: 'en-US', label: 'English (US)' },
  { code: 'es-ES', label: 'Español' },
  { code: 'fr-FR', label: 'Français' },
  { code: 'ja-JP', label: '日本語' },
  { code: 'de-DE', label: 'Deutsch' },
  { code: 'zh-CN', label: '中文 (简体)' },
];

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
  onSelectCategory,
  unreadNewsCount = 0,
  progress,
  activeView,
  theme,
  onToggleTheme,
}) => {
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en-US');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string>('Home');

  const langRef = useRef<HTMLDivElement>(null);

  // Close language dropdown on outside click
  useEffect(() => {
    if (!langDropdownOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langDropdownOpen]);

  // Synchronize active nav tab with activeView
  useEffect(() => {
    if (activeView === 'home') setActiveNav('Home');
    else if (activeView === 'practice-hub') setActiveNav('Web Tools');
    else if (activeView === 'visual-lab') setActiveNav('Developer Tools');
    else if (activeView === 'lesson' || activeView === 'chapter' || activeView === 'curriculum') setActiveNav('Learn');
    else if (activeView === 'activities') setActiveNav('Developer Tools');
  }, [activeView]);

  const handleNavClick = (section: string) => {
    setActiveNav(section);
    setMobileMenuOpen(false);

    if (onSelectCategory) {
      onSelectCategory(section);
    }

    switch (section) {
      case 'Home':
        onNavigateHome();
        break;
      case 'Web Tools':
        onNavigatePractice();
        break;
      case 'Image Tools':
        onNavigateVisualLab('box');
        break;
      case 'Developer Tools':
        onNavigateVisualLab('grid');
        break;
      case 'Learn':
        onNavigateHome();
        break;
      case 'Blog':
        if (onOpenNotifications) {
          onOpenNotifications();
        } else {
          onNavigateHome();
        }
        break;
      case 'About':
        onOpenSettings();
        break;
      default:
        onNavigateHome();
    }
  };

  const navItems = [
    { label: 'Home', section: 'Home' },
    { label: 'Web Tools', section: 'Web Tools' },
    { label: 'Image Tools', section: 'Image Tools' },
    { label: 'Developer Tools', section: 'Developer Tools' },
    { label: 'Learn', section: 'Learn' },
    { label: 'Blog', section: 'Blog' },
    { label: 'About', section: 'About' },
  ];

  const currentLangObj = LANGUAGES.find((l) => l.code === selectedLanguage) || LANGUAGES[0];

  return (
    <>
      <header
        id="app-header"
        className="sticky top-0 z-30 border-b border-[#27272a] bg-[#121215] text-white shadow-md transition-colors"
      >
        {/* ROW 1: Main Header Navigation Bar */}
        <div className="mx-auto flex min-h-14 max-w-[1600px] items-center justify-between gap-3 px-4 sm:px-6">
          {/* Left: Brand Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#27272a] bg-[#18181c] text-[#a1a1aa] transition-colors hover:bg-[#222228] hover:text-white lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={onNavigateHome}
              className="flex items-center text-left focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-lg p-0.5"
              aria-label="WebZoneBW SC Home"
            >
              <WebZoneBrandLogo size="md" showSubtitle={true} />
            </button>
          </div>

          {/* Center: Main Navigation (Desktop & Tablet) */}
          <nav
            aria-label="Main Navigation"
            className="hidden items-center gap-1 overflow-x-auto no-scrollbar lg:flex"
          >
            {navItems.map((item) => {
              const isActive = activeNav === item.section;
              return (
                <button
                  key={item.section}
                  type="button"
                  onClick={() => handleNavClick(item.section)}
                  className={`relative whitespace-nowrap px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    isActive
                      ? 'text-white bg-[#222228] border border-[#3f3f46]'
                      : 'text-[#a1a1aa] hover:text-white hover:bg-[#18181c]'
                  }`}
                >
                  {item.label}
                  {item.section === 'Blog' && unreadNewsCount > 0 && (
                    <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-blue-400" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Search Control & Sign In / Account Access */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Global Search Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex h-9 items-center gap-2 rounded-lg border border-[#27272a] bg-[#18181c] px-3 text-xs text-[#a1a1aa] transition-all hover:border-blue-500/50 hover:bg-[#222228] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              aria-label="Open global search"
              title="Search tools, documentation, and resources (⌘K)"
            >
              <Search className="h-4 w-4 shrink-0 text-blue-400" />
              <span className="hidden sm:inline font-sans">Search tools...</span>
              <kbd className="hidden rounded border border-[#3f3f46] bg-[#27272a] px-1.5 py-0.5 font-mono text-[9px] text-[#9ca3af] sm:inline">
                ⌘K
              </kbd>
            </button>

            {/* Sign In / Account Access */}
            <button
              type="button"
              onClick={() => setAccountOpen(true)}
              className="flex h-9 items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-600/10 px-3 text-xs font-semibold text-blue-400 transition-all hover:bg-blue-600/20 hover:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              aria-label="Sign in or view developer account"
              title="Sign In / Account"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                <User className="h-3.5 w-3.5" />
              </div>
              <span className="hidden sm:inline font-sans">Sign In</span>
            </button>
          </div>
        </div>

        {/* ROW 2: Compact Secondary Navigation & Status Row */}
        <div className="border-t border-[#27272a]/70 bg-[#0e0e11] px-4 sm:px-6">
          <div className="mx-auto flex min-h-9 max-w-[1600px] flex-wrap items-center justify-between gap-2 py-1 text-xs">
            {/* Left: WebZoneBW Status, Tools & Resources Quick Links */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onNavigateHome}
                className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>WebZoneBW</span>
              </button>

              <span className="text-[#3f3f46]">/</span>

              <button
                type="button"
                onClick={() => {
                  onNavigatePractice();
                  setActiveNav('Web Tools');
                }}
                className="font-medium text-[#a1a1aa] hover:text-white transition-colors text-[11px]"
              >
                Tools
              </button>

              <span className="text-[#3f3f46]">·</span>

              <button
                type="button"
                onClick={() => {
                  onNavigateVisualLab('box');
                  setActiveNav('Developer Tools');
                }}
                className="font-medium text-[#a1a1aa] hover:text-white transition-colors text-[11px]"
              >
                Resources
              </button>
            </div>

            {/* Right: Working Theme Control & Localization-Ready Language Selector */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Working Theme Switch */}
              <button
                type="button"
                onClick={onToggleTheme}
                className="flex h-7 items-center gap-1.5 rounded-md border border-[#27272a] bg-[#18181c] px-2 text-[11px] font-medium text-[#d4d4d8] transition-colors hover:border-[#3f3f46] hover:text-white"
                aria-label={`Current theme: ${theme}. Click to switch theme`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="h-3 w-3 text-amber-400" />
                    <span className="hidden xs:inline">Theme: Dark</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-3 w-3 text-blue-400" />
                    <span className="hidden xs:inline">Theme: Light</span>
                  </>
                )}
              </button>

              {/* Language Selector (Prepared for localization) */}
              <div className="relative" ref={langRef}>
                <button
                  type="button"
                  onClick={() => setLangDropdownOpen((prev) => !prev)}
                  className="flex h-7 items-center gap-1.5 rounded-md border border-[#27272a] bg-[#18181c] px-2 text-[11px] font-medium text-[#d4d4d8] transition-colors hover:border-[#3f3f46] hover:text-white"
                  aria-label={`Selected language: ${currentLangObj.label}`}
                  aria-expanded={langDropdownOpen}
                >
                  <Globe className="h-3 w-3 text-blue-400" />
                  <span className="hidden sm:inline">{currentLangObj.label}</span>
                  <span className="sm:hidden">{currentLangObj.code.split('-')[0].toUpperCase()}</span>
                  <ChevronDown className="h-3 w-3 text-[#71717a]" />
                </button>

                {langDropdownOpen && (
                  <div className="absolute right-0 top-[calc(100%+4px)] z-50 w-44 rounded-xl border border-[#27272a] bg-[#18181c] p-1.5 shadow-2xl">
                    <div className="px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-[#71717a]">
                      Language / Locale
                    </div>
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setSelectedLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors ${
                          selectedLanguage === lang.code
                            ? 'bg-blue-600/20 text-blue-400 font-bold'
                            : 'text-[#d4d4d8] hover:bg-[#222228] hover:text-white'
                        }`}
                      >
                        <span>{lang.label}</span>
                        {selectedLanguage === lang.code && <span className="text-xs">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer Dropdown */}
        {mobileMenuOpen && (
          <div className="border-t border-[#27272a] bg-[#141417] px-4 py-4 lg:hidden animate-fade-in shadow-2xl">
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  type="button"
                  onClick={() => handleNavClick(item.section)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeNav === item.section
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-[#d4d4d8] hover:bg-[#1f1f25] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.section === 'Blog' && unreadNewsCount > 0 && (
                    <span className="text-xs bg-blue-500 text-white rounded-full px-2 py-0.5 font-bold">
                      {unreadNewsCount} new
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[#27272a] flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-[#27272a] bg-[#1c1c22] py-2 text-xs font-semibold text-white hover:bg-[#27272e]"
              >
                <Search className="h-4 w-4 text-blue-400" />
                <span>Search All Tools &amp; Guides</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAccountOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-xs font-bold text-white hover:bg-blue-500"
              >
                <User className="h-4 w-4" />
                <span>Sign In / Developer Profile</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Developer Profile / Account Modal */}
      {accountOpen && (
        <AccountModal
          isOpen={accountOpen}
          onClose={() => setAccountOpen(false)}
          progress={progress}
          onOpenCertificate={onOpenCertificate}
          onOpenMilestones={onOpenMilestones}
          onOpenSettings={onOpenSettings}
        />
      )}
    </>
  );
};
