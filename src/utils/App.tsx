import React, { useState, useEffect, useCallback } from 'react';
import { Chapter, UserProgress, AppTheme } from './types';
import { ALL_PLATFORM_CHAPTERS } from '../data/courses/allCourses';
import { calculateDailyStreak, getLocalDateString } from './streakUtils';
import { HumanCentredHeader } from '../components/HumanCentredHeader';
import { HumanCentredSidebar } from '../components/HumanCentredSidebar';
import { DashboardView } from '../features/dashboard/DashboardView';
import { LearningCentreView } from '../features/learning/LearningCentreView';
import { LessonReaderView } from '../features/lesson-engine/LessonReaderView';
import { StorehouseView } from '../features/storehouse/StorehouseView';
import { PracticeClassView } from '../features/practice/PracticeClassView';
import { AILearningAssistant } from '../features/assistant/AILearningAssistant';
import { CampaignCentreView } from '../features/campaign/CampaignCentreView';
import { AchievementEngineView } from '../features/achievements/AchievementEngineView';
import { AnalyticsView } from '../features/analytics/AnalyticsView';
import { UserProfileView } from '../features/profile/UserProfileView';
import { CourseIntelligenceView } from '../features/course-intelligence/CourseIntelligenceView';
import { PublishingWorkflowView } from '../features/publishing/PublishingWorkflowView';
import { PublicHeader } from '../components/PublicHeader';
import { PublicFooter } from '../components/PublicFooter';
import { PublicHomePageView } from '../features/public/PublicHomePageView';
import { CourseCatalogueView } from '../features/public/CourseCatalogueView';
import { MembershipView } from '../features/public/MembershipView';
import { AuthAndSettingsModal } from '../features/auth/AuthAndSettingsModal';
import { MerchantDashboardView } from '../features/analytics/MerchantDashboardView';
import { StructuredLesson } from '../features/lesson-engine/types';
import { fetchStorehouseItems } from '../features/storehouse/storehouseService';
import { useAuth } from './AuthContext';
import { getAuthHeaders } from './authService';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'update';
}

const INITIAL_PROGRESS: UserProgress = {
  completedLessons: {},
  completedChallenges: {},
  quizScores: {},
  claimedMilestones: ['milestone-100'],
  notes: {},
  bookmarks: [],
  xpPoints: 120,
  conceptsMastered: 1,
  studyMinutes: 15,
  lastActiveDate: getLocalDateString(),
};

export default function App() {
  const { user, entitlement } = useAuth();
  const [chapters] = useState<Chapter[]>(ALL_PLATFORM_CHAPTERS);
  const [activeView, setActiveView] = useState<string>('home');
  const [currentLessonId, setCurrentLessonId] = useState<string>('ch-00-l-01');
  const [customLesson, setCustomLesson] = useState<StructuredLesson | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('zerotowebsite_sidebar_collapsed');
      return saved === 'true'; // Default is false (expanded)
    } catch {
      return false;
    }
  });

  const toggleSidebarCollapse = useCallback(() => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('zerotowebsite_sidebar_collapsed', String(next));
      } catch {}
      return next;
    });
  }, []);

  const handleToggleSidebar = useCallback(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 960) {
      setMobileDrawerOpen((prev) => !prev);
    } else {
      toggleSidebarCollapse();
    }
  }, [toggleSidebarCollapse]);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [storehouseCount, setStorehouseCount] = useState(0);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Theme management: 'light' (Soft Porcelain) as default, 'dark' (Midnight Obsidian) as optional
  const [theme, setTheme] = useState<AppTheme>(() => {
    try {
      const saved = localStorage.getItem('zerotowebsite_theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    try {
      localStorage.setItem('zerotowebsite_theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // User progress state with server synchronization
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const local = localStorage.getItem('zerotowebsite_progress');
      if (local) {
        return JSON.parse(local);
      }
    } catch {}
    return INITIAL_PROGRESS;
  });

  // Load progress from server on mount and when authenticated student changes
  useEffect(() => {
    fetch('/api/user/progress', {
      headers: { ...getAuthHeaders() },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.progress) {
          const merged = { ...INITIAL_PROGRESS, ...data.progress };
          const { updatedProgress } = calculateDailyStreak(merged);
          setProgress(updatedProgress);
          localStorage.setItem('zerotowebsite_progress', JSON.stringify(updatedProgress));
        }
      })
      .catch(() => {});

    // Count storehouse records
    fetchStorehouseItems().then((items) => setStorehouseCount(items.length));
  }, [user?.id]);

  // Save progress changes to server and local storage
  const syncProgress = useCallback((newProgress: UserProgress) => {
    setProgress(newProgress);
    try {
      localStorage.setItem('zerotowebsite_progress', JSON.stringify(newProgress));
    } catch {}

    fetch('/api/user/progress', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body: JSON.stringify(newProgress),
    }).catch(() => {});
  }, []);

  // Keep document title synchronized with active public/studio view
  useEffect(() => {
    const viewTitles: Record<string, string> = {
      home: 'Zero-to-Website — WebZoneBW SC | Editorial Web Engineering Platform',
      courses: 'Courses — Zero-to-Website | WebZoneBW SC',
      'free-lessons': 'Free Introductory Lessons — Zero-to-Website | WebZoneBW SC',
      membership: 'Weekly Learning Membership — Zero-to-Website | WebZoneBW SC',
      'public-practice': 'Live Code — Zero-to-Website | WebZoneBW SC',
      dashboard: 'Studio Dashboard — Zero-to-Website | WebZoneBW SC',
      merchant: 'Merchant & Payments — Zero-to-Website | WebZoneBW SC',
    };
    if (activeView === 'lesson-reader') {
      const lessonTitle =
        customLesson?.title ||
        chapters.flatMap((c) => c.lessons).find((l) => l.id === currentLessonId)?.title;
      document.title = lessonTitle
        ? `${lessonTitle} — Zero-to-Website | WebZoneBW SC`
        : 'Lesson Reader — Zero-to-Website | WebZoneBW SC';
    } else {
      document.title = viewTitles[activeView] || 'Zero-to-Website — WebZoneBW SC';
    }
  }, [activeView, currentLessonId, customLesson, chapters]);

  const addToast = (
    title: string,
    message: string,
    type: 'info' | 'success' | 'update' = 'info'
  ) => {
    const id = `toast-${Date.now()}`;
    const newToast: ToastMessage = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleOpenLesson = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    setCustomLesson(null);
    setActiveView('lesson-reader');
  };

  const handleOpenCustomLesson = (lesson: StructuredLesson) => {
    setCustomLesson(lesson);
    setCurrentLessonId(lesson.id);
    setActiveView('lesson-reader');
  };

  const handleCompleteLesson = (lessonId: string) => {
    const isAlreadyCompleted = !!progress.completedLessons?.[lessonId];
    if (isAlreadyCompleted) return;

    const updated: UserProgress = {
      ...progress,
      completedLessons: {
        ...(progress.completedLessons || {}),
        [lessonId]: true,
      },
      xpPoints: (progress.xpPoints || 0) + 50,
      conceptsMastered: (progress.conceptsMastered || 0) + 1,
    };
    syncProgress(updated);
    addToast('Lesson Completed!', '+50 XP Awarded to your profile.', 'success');
  };

  const handleToggleBookmark = (lessonId: string) => {
    const currentBookmarks = progress.bookmarks || [];
    const isBookmarked = currentBookmarks.includes(lessonId);
    const newBookmarks = isBookmarked
      ? currentBookmarks.filter((id) => id !== lessonId)
      : [...currentBookmarks, lessonId];

    const updated: UserProgress = {
      ...progress,
      bookmarks: newBookmarks,
    };
    syncProgress(updated);
    addToast(
      isBookmarked ? 'Bookmark Removed' : 'Lesson Bookmarked',
      isBookmarked ? 'Removed from quick reference.' : 'Saved to your profile bookmarks.',
      'info'
    );
  };

  const handleSaveNote = (lessonId: string, noteText: string) => {
    const updated: UserProgress = {
      ...progress,
      notes: {
        ...(progress.notes || {}),
        [lessonId]: noteText,
      },
    };
    syncProgress(updated);
    addToast('Note Saved', 'Your observations are preserved.', 'success');
  };

  const handleClaimMilestone = (milestoneId: string) => {
    const claimed = progress.claimedMilestones || [];
    if (claimed.includes(milestoneId)) return;

    const updated: UserProgress = {
      ...progress,
      claimedMilestones: [...claimed, milestoneId],
      xpPoints: (progress.xpPoints || 0) + 100,
    };
    syncProgress(updated);
    addToast('Milestone Claimed!', '+100 Bonus XP earned!', 'success');
  };

  const isPublicView = ['home', 'courses', 'free-lessons', 'membership', 'public-practice'].includes(activeView);
  const isReaderView = activeView === 'lesson-reader';

  // Public Educational Layout (No admin sidebar, spacious reading and exploration)
  if (isPublicView || isReaderView) {
    return (
      <div className="public-layout-shell">
        <PublicHeader
          activeView={activeView}
          onNavigate={(view) => {
            if (view === 'settings') {
              setSettingsOpen(true);
            } else {
              setActiveView(view);
            }
          }}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenSearch={() => setActiveView('courses')}
          onStartFree={() => handleOpenLesson('ch-00-l-01')}
          hasStudentProgress={Object.keys(progress.completedLessons || {}).length > 0}
        />

        {/* Reader Breadcrumb Bar */}
        {isReaderView && (
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              borderBottom: '1px solid var(--color-border)',
              padding: '0.65rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <button
                type="button"
                onClick={() => setActiveView('courses')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '12px', padding: '0.3rem 0.65rem' }}
                title="Return to Course Catalogue"
              >
                ← Back to Courses
              </button>
              <span style={{ color: 'var(--color-text-subtle)' }}>/</span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                {chapters.find((c) => c.lessons.some((l) => l.id === currentLessonId))?.title || 'Core Curriculum'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {entitlement.hasActiveMonthlyPack || entitlement.unlockedAllChapters ? (
                <span className="badge badge-success" style={{ fontSize: '11px' }}>
                  Active Monthly Pack — All Chapters Unlocked
                </span>
              ) : (
                <>
                  <span className="badge badge-accent" style={{ fontSize: '11px' }}>
                    Free Sample Chapter 00
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveView('membership')}
                    className="btn btn-primary btn-sm"
                    style={{ fontSize: '12px', padding: '0.35rem 0.75rem' }}
                  >
                    Unlock All 11 Chapters ($19/mo)
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        <main style={{ flex: 1, minHeight: 'calc(100vh - 220px)' }}>
          {activeView === 'home' && (
            <PublicHomePageView
              chapters={chapters}
              onNavigate={setActiveView}
              onOpenLesson={handleOpenLesson}
            />
          )}

          {activeView === 'courses' && (
            <CourseCatalogueView
              key="courses"
              chapters={chapters}
              onOpenLesson={handleOpenLesson}
              onNavigateMembership={() => setActiveView('membership')}
            />
          )}

          {activeView === 'free-lessons' && (
            <CourseCatalogueView
              key="free-lessons"
              chapters={chapters}
              onOpenLesson={handleOpenLesson}
              onNavigateMembership={() => setActiveView('membership')}
              showFreeOnly={true}
            />
          )}

          {activeView === 'membership' && (
            <MembershipView
              onAddToast={addToast}
              onOpenLesson={handleOpenLesson}
            />
          )}

          {activeView === 'public-practice' && (
            <div style={{ padding: 'var(--space-6) 0' }}>
              <PracticeClassView
                onAwardXp={(xp) => {
                  const updated = { ...progress, xpPoints: (progress.xpPoints || 0) + xp };
                  syncProgress(updated);
                  addToast('Challenge Complete!', `+${xp} XP awarded!`, 'success');
                }}
              />
            </div>
          )}

          {isReaderView && (
            <LessonReaderView
              lessonId={currentLessonId}
              customLesson={customLesson}
              chapters={chapters}
              progress={progress}
              onNavigateLesson={handleOpenLesson}
              onCompleteLesson={handleCompleteLesson}
              onToggleBookmark={handleToggleBookmark}
              onSaveNote={handleSaveNote}
              onOpenSandbox={() => setActiveView('public-practice')}
              onOpenAssistant={(topic) => {
                setActiveView('assistant');
              }}
              onAddToast={addToast}
            />
          )}
        </main>

        <PublicFooter
          onNavigate={(view) => {
            if (view === 'settings') {
              setSettingsOpen(true);
            } else {
              setActiveView(view);
            }
          }}
          onOpenSettings={() => setSettingsOpen(true)}
        />

        {/* Settings Modal */}
        <AuthAndSettingsModal
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          theme={theme}
          onThemeChange={setTheme}
          progress={progress}
          onImportProgress={(imported) => {
            syncProgress(imported);
            addToast('Progress Restored', 'Your learning data was imported.', 'success');
          }}
        />

        {/* Toast Notification Stack */}
        <div className="toast-container">
          {toasts.map((toast) => (
            <div key={toast.id} className="toast">
              <div>
                <strong style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-strong)' }}>
                  {toast.title}
                </strong>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  {toast.message}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Private Administrative Studio & Platform Management Layout
  return (
    <div className="app-root">
      {/* Sidebar Navigation */}
      <HumanCentredSidebar
        activeView={activeView}
        onNavigate={(view) => {
          if (view === 'settings') {
            setSettingsOpen(true);
          } else {
            setActiveView(view);
          }
        }}
        isDrawerOpen={mobileDrawerOpen}
        onCloseDrawer={() => setMobileDrawerOpen(false)}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
        totalStorehouseCount={storehouseCount}
        streakDays={progress.streakDays || 1}
      />

      {/* Main Content Area */}
      <div className="app-content-wrapper">
        <HumanCentredHeader
          onToggleSidebar={handleToggleSidebar}
          isSidebarCollapsed={sidebarCollapsed}
          theme={theme}
          onToggleTheme={toggleTheme}
          xpPoints={progress.xpPoints || 0}
          streakDays={progress.streakDays || 1}
          onOpenSearch={() => setActiveView('learning')}
          onOpenSettings={() => setSettingsOpen(true)}
          onOpenAssistant={() => setActiveView('assistant')}
          onNavigateHome={() => setActiveView('home')}
          activeView={activeView}
        />

        {/* Feature Views */}
        {activeView === 'dashboard' && (
          <DashboardView
            progress={progress}
            chapters={chapters}
            onNavigateView={setActiveView}
            onOpenLesson={handleOpenLesson}
            onOpenAssistant={() => setActiveView('assistant')}
          />
        )}

        {activeView === 'learning' && (
          <LearningCentreView
            chapters={chapters}
            progress={progress}
            onOpenLesson={handleOpenLesson}
          />
        )}

        {activeView === 'course-intelligence' && (
          <CourseIntelligenceView
            onOpenLesson={handleOpenLesson}
            onAddToast={addToast}
          />
        )}

        {activeView === 'publishing' && (
          <PublishingWorkflowView
            onAddToast={addToast}
          />
        )}

        {activeView === 'merchant' && (
          <MerchantDashboardView onAddToast={addToast} />
        )}

        {activeView === 'storehouse' && (
          <StorehouseView
            onOpenLesson={handleOpenCustomLesson}
            onOpenAssistant={() => setActiveView('assistant')}
          />
        )}

        {activeView === 'practice' && (
          <PracticeClassView
            onAwardXp={(xp) => {
              const updated = { ...progress, xpPoints: (progress.xpPoints || 0) + xp };
              syncProgress(updated);
              addToast('Challenge Complete!', `+${xp} XP awarded!`, 'success');
            }}
          />
        )}

        {activeView === 'assistant' && (
          <div className="app-main" style={{ height: 'calc(100vh - 100px)', padding: 'var(--space-4)' }}>
            <AILearningAssistant
              currentLessonTitle={
                chapters.flatMap((c) => c.lessons).find((l) => l.id === currentLessonId)?.title
              }
              onOpenStorehouse={() => setActiveView('storehouse')}
            />
          </div>
        )}

        {activeView === 'campaign' && (
          <CampaignCentreView
            progress={progress}
            onClaimMilestone={handleClaimMilestone}
            onOpenLesson={handleOpenLesson}
          />
        )}

        {activeView === 'achievements' && (
          <AchievementEngineView progress={progress} />
        )}

        {activeView === 'analytics' && (
          <AnalyticsView progress={progress} chapters={chapters} />
        )}

        {activeView === 'profile' && (
          <UserProfileView
            progress={progress}
            chapters={chapters}
            onOpenLesson={handleOpenLesson}
            onOpenSettings={() => setSettingsOpen(true)}
          />
        )}
      </div>

      {/* Settings Modal */}
      <AuthAndSettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        theme={theme}
        onThemeChange={setTheme}
        progress={progress}
        onImportProgress={(imported) => {
          syncProgress(imported);
          addToast('Progress Restored', 'Your learning data was imported.', 'success');
        }}
      />

      {/* Toast Notification Stack */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            <div>
              <strong style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-strong)' }}>
                {toast.title}
              </strong>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                {toast.message}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
