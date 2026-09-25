import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Globe,
  Laptop,
  Menu,
  Moon,
  Search,
  ShieldCheck,
  Sun,
  User,
} from "lucide-react";
import { UserProgress, AppTheme, ViewMode } from "../utils/types";
import { WebZoneBrandLogo } from "./WebZoneBrandLogo";
import { PlatformTrustModal } from "./PlatformTrustModal";
import { useAuth } from "../utils/AuthContext";

export interface HeaderProps {
  onToggleSidebar?: () => void;
  onOpenSearch: () => void;
  onOpenTutor: () => void;
  onOpenMilestones: () => void;
  onOpenSettings: () => void;
  onOpenCertificate: () => void;
  onOpenAccount: () => void;
  onNavigateHome: () => void;
  onNavigatePractice: () => void;
  onNavigateVisualLab: (toolId?: string) => void;
  onNavigateActivities?: () => void;
  onNavigateBlog?: () => void;
  onNavigateWorkspace?: () => void;
  onNavigateWebTools?: () => void;
  onNavigateImageTools?: () => void;
  onNavigateDeveloperTools?: () => void;
  onNavigateLearn?: () => void;
  onNavigateAbout?: () => void;
  onNavigateView?: (view: ViewMode) => void;
  onOpenNotifications?: () => void;
  onSelectCategory?: (category: string) => void;
  unreadNewsCount?: number;
  progress: UserProgress;
  activeView: ViewMode;
  theme: AppTheme;
  onToggleTheme: () => void;
}

const LANGUAGES = [
  { code: "en-US", label: "English (US)" },
  { code: "es-ES", label: "Español" },
  { code: "fr-FR", label: "Français" },
  { code: "ja-JP", label: "日本語" },
  { code: "de-DE", label: "Deutsch" },
  { code: "zh-CN", label: "中文 (简体)" },
];

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onOpenSearch,
  onOpenTutor,
  onOpenMilestones,
  onOpenSettings,
  onOpenCertificate,
  onOpenAccount,
  onNavigateHome,
  onNavigatePractice,
  onNavigateVisualLab,
  onNavigateActivities,
  onNavigateBlog,
  onNavigateWorkspace,
  onNavigateWebTools,
  onNavigateImageTools,
  onNavigateDeveloperTools,
  onNavigateLearn,
  onNavigateAbout,
  onNavigateView,
  onOpenNotifications,
  onSelectCategory,
  unreadNewsCount = 0,
  progress,
  activeView,
  theme,
  onToggleTheme,
}) => {
  const { user, isAuthenticated } = useAuth();
  const hasRealAccount = isAuthenticated && user?.method !== "guest";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en-US");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string>("Home");
  const [isTrustModalOpen, setIsTrustModalOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);

  // Close language dropdown on outside click
  useEffect(() => {
    if (!langDropdownOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [langDropdownOpen]);

  // Synchronize active nav tab with activeView across all 8 standard sections
  useEffect(() => {
    if (activeView === "home") setActiveNav("Home");
    else if (activeView === "workspace") setActiveNav("Workspace");
    else if (activeView === "webtools") setActiveNav("Web Tools");
    else if (activeView === "imagetools") setActiveNav("Image Tools");
    else if (activeView === "developertools") setActiveNav("Developer Tools");
    else if (
      activeView === "learn" ||
      activeView === "curriculum" ||
      activeView === "lesson" ||
      activeView === "chapter" ||
      activeView === "practice-hub" ||
      activeView === "activities"
    )
      setActiveNav("Learn");
    else if (activeView === "blog") setActiveNav("Blog");
    else if (activeView === "about") setActiveNav("About");
  }, [activeView]);

  const handleNavClick = (section: string) => {
    setActiveNav(section);
    setMobileMenuOpen(false);

    if (onSelectCategory) {
      onSelectCategory(section);
    }

    switch (section) {
      case "Home":
        if (onNavigateHome) onNavigateHome();
        else if (onNavigateView) onNavigateView("home");
        else window.location.href = "/index.html";
        break;
      case "Workspace":
        if (onNavigateWorkspace) onNavigateWorkspace();
        else if (onNavigateView) onNavigateView("workspace");
        else window.location.href = "/Workspace.html";
        break;
      case "Web Tools":
        if (onNavigateWebTools) onNavigateWebTools();
        else if (onNavigateView) onNavigateView("webtools");
        else window.location.href = "/webtools.html";
        break;
      case "Image Tools":
        if (onNavigateImageTools) onNavigateImageTools();
        else if (onNavigateView) onNavigateView("imagetools");
        else window.location.href = "/imagetools.html";
        break;
      case "Developer Tools":
        if (onNavigateDeveloperTools) onNavigateDeveloperTools();
        else if (onNavigateView) onNavigateView("developertools");
        else window.location.href = "/developertools.html";
        break;
      case "Learn":
        if (onNavigateLearn) onNavigateLearn();
        else if (onNavigateView) onNavigateView("learn");
        else window.location.href = "/learn.html";
        break;
      case "Blog":
        if (onNavigateBlog) onNavigateBlog();
        else if (onNavigateView) onNavigateView("blog");
        else window.location.href = "/blog.html";
        break;
      case "About":
        if (onNavigateAbout) onNavigateAbout();
        else if (onNavigateView) onNavigateView("about");
        else window.location.href = "/about.html";
        break;
      default:
        if (onNavigateHome) onNavigateHome();
        else window.location.href = "/index.html";
    }
  };

  const navItems = [
    { label: "Home", section: "Home" },
    { label: "Workspace", section: "Workspace", isHighlight: true },
    { label: "Web Tools", section: "Web Tools" },
    { label: "Image Tools", section: "Image Tools" },
    { label: "Developer Tools", section: "Developer Tools" },
    { label: "Learn", section: "Learn" },
    { label: "Blog", section: "Blog" },
    { label: "About", section: "About" },
  ];

  const currentLangObj =
    LANGUAGES.find((l) => l.code === selectedLanguage) || LANGUAGES[0];

  return (
    <>
      <header
        id="app-header"
        role="banner"
        className="sticky top-0 z-30 border-b border-app-border bg-app-surface/95 text-app-ink backdrop-blur-md shadow-xs transition-colors"
      >
        {/* ROW 1: Main Header Navigation Bar - Added padding for better layout */}
        <div className="mx-auto flex min-h-16 max-w-[1600px] items-center justify-between gap-3 sm:gap-4 px-4 sm:px-8">
          {/* Left: Brand Logo & Mobile Menu Toggles */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {onToggleSidebar && (
              <button
                type="button"
                onClick={onToggleSidebar}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-app-border bg-app-inset text-app-muted transition-colors hover:border-blue-500/50 hover:bg-app-active hover:text-app-ink touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                aria-label="Toggle curriculum sidebar"
                title="Toggle curriculum sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}

            {/* Dedicated Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-app-border bg-app-inset text-blue-500 transition-colors hover:border-blue-500/50 hover:bg-app-active touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              aria-label="Toggle site navigation menu"
              aria-expanded={mobileMenuOpen}
              title="Site Navigation Menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={onNavigateHome}
              className="flex items-center text-left focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-xl p-1 sm:p-2 touch-manipulation"
              aria-label="WebZoneBW SC Home"
            >
              <WebZoneBrandLogo size="lg" showSubtitle={true} />
            </button>
          </div>

          {/* Center: Main Navigation (Desktop & Tablet) */}
          <nav
            aria-label="Main Navigation"
            role="navigation"
            className="hidden items-center gap-2 overflow-x-auto no-scrollbar lg:flex"
          >
            {navItems.map((item) => {
              const isActive = activeNav === item.section;
              return (
                <button
                  key={item.section}
                  type="button"
                  onClick={() => handleNavClick(item.section)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative whitespace-nowrap min-h-[44px] px-4 py-2.5 text-sm font-semibold rounded-xl inline-flex items-center transition-all touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                    isActive
                      ? "text-app-ink bg-app-active border border-app-border font-bold"
                      : "text-app-muted hover:text-app-ink hover:bg-app-inset"
                  }`}
                >
                  {item.label}
                  {item.section === "Blog" && unreadNewsCount > 0 && (
                    <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-400" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Search Control & Sign In / Account Access */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Global Search Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex min-h-[44px] items-center gap-3 rounded-xl border border-app-border bg-app-inset px-4 text-sm text-app-muted transition-all hover:border-blue-500/50 hover:bg-app-active hover:text-app-ink touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              aria-label="Open global search"
              title="Search tools, documentation, and resources (⌘K)"
            >
              <Search className="h-5 w-5 shrink-0 text-blue-500" />
              <span className="hidden sm:inline font-sans">Search...</span>
              <kbd className="hidden rounded-lg border border-app-border bg-app-active px-2 py-0.5 font-mono text-[10px] text-app-subtle sm:inline">
                ⌘K
              </kbd>
            </button>

            {/* Sign In / Account Access */}
            <button
              type="button"
              onClick={() => onOpenAccount()}
              className={`flex min-h-[44px] items-center gap-3 rounded-xl px-4 text-sm font-semibold transition-all touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                hasRealAccount
                  ? "border border-app-border bg-app-inset text-app-ink hover:bg-app-active"
                  : "border border-blue-500/30 bg-blue-600/10 text-blue-500 hover:bg-blue-600/20 hover:border-blue-500/60"
              }`}
              aria-label={hasRealAccount ? "View account" : "Sign in"}
              title={hasRealAccount ? "Your Account" : "Sign In / Sign Up"}
            >
              {hasRealAccount ? (
                <>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-[10px] font-bold">
                    {user?.method === "google" ? (
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                    ) : (
                      user?.name?.charAt(0).toUpperCase() || "U"
                    )}
                  </div>
                  <span className="hidden sm:inline font-sans">
                    {user?.name || "Account"}
                  </span>
                </>
              ) : (
                <>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-blue-500">
                    <User className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <span className="hidden sm:inline font-sans">Sign In</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ROW 2: Compact Secondary Navigation & Status Row */}
        <div className="border-t border-app-border/70 bg-app-inset/60 px-4 sm:px-6">
          <div className="mx-auto flex min-h-10 max-w-[1600px] flex-wrap items-center justify-between gap-2 py-1.5 text-xs">
            {/* Left: WebZoneBW Status, Tools & Resources Quick Links */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onNavigateHome}
                className="min-h-[36px] inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors touch-manipulation"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>WebZoneBW</span>
              </button>

              <span className="text-app-subtle">/</span>

              <a
                href="/webtools.html"
                className="font-medium text-app-muted hover:text-app-ink transition-colors text-[11px] min-h-[36px] inline-flex items-center px-1.5 touch-manipulation"
              >
                Tools
              </a>

              <span className="text-app-subtle">·</span>

              <a
                href="/imagetools.html"
                className="font-medium text-app-muted hover:text-app-ink transition-colors text-[11px] min-h-[36px] inline-flex items-center px-1.5 touch-manipulation"
              >
                Resources
              </a>

              <span className="text-app-subtle">·</span>

              <button
                type="button"
                onClick={() => setIsTrustModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors text-[11px] cursor-pointer min-h-[36px] touch-manipulation"
                title="View Platform Independence & Data Sovereignty Guarantee"
              >
                <ShieldCheck className="h-3 w-3" />
                <span>100% Independent &amp; Private</span>
              </button>
            </div>

            {/* Right: Working Theme Control & Localization-Ready Language Selector */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Working Theme Switch */}
              <button
                type="button"
                onClick={onToggleTheme}
                className="flex min-h-[36px] items-center gap-1.5 rounded-lg border border-app-border bg-app-surface px-3 py-1 text-[11px] font-medium text-app-ink transition-colors hover:bg-app-active touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                aria-label={`Current theme: ${theme}. Click to switch theme`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-3.5 w-3.5 text-amber-400" />
                    <span className="hidden xs:inline">Theme: Dark</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-3.5 w-3.5 text-blue-500" />
                    <span className="hidden xs:inline">Theme: Light</span>
                  </>
                )}
              </button>

              {/* Language Selector (Prepared for localization) */}
              <div className="relative" ref={langRef}>
                <button
                  type="button"
                  onClick={() => setLangDropdownOpen((prev) => !prev)}
                  className="flex min-h-[36px] items-center gap-1.5 rounded-lg border border-app-border bg-app-surface px-3 py-1 text-[11px] font-medium text-app-ink transition-colors hover:bg-app-active touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  aria-label={`Selected language: ${currentLangObj.label}`}
                  aria-expanded={langDropdownOpen}
                >
                  <Globe className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
                  <span className="hidden sm:inline">
                    {currentLangObj.label}
                  </span>
                  <span className="sm:hidden">
                    {currentLangObj.code.split("-")[0].toUpperCase()}
                  </span>
                  <ChevronDown className="h-3 w-3 text-app-subtle" />
                </button>

                {langDropdownOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-[calc(100%+4px)] z-50 w-48 rounded-xl border border-app-border bg-app-surface p-1.5 shadow-2xl text-app-ink"
                  >
                    <div className="px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-app-subtle">
                      Language / Locale
                    </div>
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setSelectedLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full min-h-[40px] flex items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors touch-manipulation ${
                          selectedLanguage === lang.code
                            ? "bg-blue-600/15 text-blue-500 font-bold"
                            : "text-app-ink hover:bg-app-active"
                        }`}
                      >
                        <span>{lang.label}</span>
                        {selectedLanguage === lang.code && (
                          <span className="text-xs">✓</span>
                        )}
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
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site Navigation Menu"
            className="border-t border-app-border bg-app-surface px-4 py-4 lg:hidden animate-fade-in shadow-2xl"
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  type="button"
                  onClick={() => handleNavClick(item.section)}
                  aria-current={activeNav === item.section ? "page" : undefined}
                  className={`w-full min-h-[48px] flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                    activeNav === item.section
                      ? "bg-blue-600/15 text-blue-500 border border-blue-500/30"
                      : "text-app-ink hover:bg-app-active border border-transparent"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.section === "Blog" && unreadNewsCount > 0 && (
                    <span className="text-xs bg-blue-500 text-white rounded-full px-2.5 py-0.5 font-bold">
                      {unreadNewsCount} new
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-app-border flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-xl border border-app-border bg-app-inset py-2.5 text-xs font-semibold text-app-ink hover:bg-app-active touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <Search className="h-4 w-4 text-blue-500" />
                <span>Search All Tools &amp; Guides</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white hover:bg-blue-500 touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <User className="h-4 w-4" />
                <span>
                  {hasRealAccount
                    ? `Hi, ${user?.name || "Account"}`
                    : isAuthenticated
                      ? `Guest Mode`
                      : "Sign In / Create Account"}
                </span>
              </button>
            </div>
          </div>
        )}
      </header>

      <PlatformTrustModal
        isOpen={isTrustModalOpen}
        onClose={() => setIsTrustModalOpen(false)}
      />
    </>
  );
};
