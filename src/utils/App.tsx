import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CHAPTERS_DATA } from '../data/chaptersData';
import { UserProgress, Chapter, Lesson, XpMilestone, AppTheme, ViewMode } from './types';
import { applyAppTheme, normalizeAppTheme } from './theme';
import { XP_MILESTONES } from '../data/milestonesData';
import { calculateDailyStreak, getLocalDateString } from './streakUtils';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { HomeHero } from '../components/HomeHero';
import { LessonView } from '../components/LessonView';
import { PracticeHub } from '../components/PracticeHub';
import { VisualLab, VisualizerId } from '../components/VisualLab';
import { ActivitiesView } from '../components/ActivitiesView';
import { SearchModal } from '../components/SearchModal';
import { TutorModal } from '../components/TutorModal';
import { SettingsModal } from '../components/SettingsModal';
import { CertificateModal } from '../components/CertificateModal';
import { XpMilestoneModal } from '../components/XpMilestoneModal';
import { XpMilestonesRoadmapModal } from '../components/XpMilestonesRoadmapModal';
import { CookieNotificationBanner } from '../components/CookieNotificationBanner';
import { NotificationCenterModal } from '../components/NotificationCenterModal';
import { AccountModal } from '../components/AccountModal';
import { ToastNotification, ToastMessage } from '../components/ToastNotification';
import { LegalComplianceModal, PolicyTab } from '../components/LegalComplianceModal';
import { Footer } from '../components/Footer';
import { NEWS_UPDATES } from '../data/newsData';
import { useAuth } from './AuthContext';
import * as authService from './authService';

const INITIAL_PROGRESS: UserProgress = {
  completedLessons: {},
  completedChallenges: {},
  quizScores: {},
  claimedMilestones: ['milestone-100'],
  notes: {},
  bookmarks: [],
  xpPoints: 120,
  streakDays: 3,
  lastActiveDate: getLocalDateString(),
};

export default function App() {
  const [chapters] = useState<Chapter[]>(CHAPTERS_DATA);
  const [currentLessonId, setCurrentLessonId] = useState<string>('ch-00-l-01');
  const [activeView, setActiveView] = useState<ViewMode>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [tutorOpen, setTutorOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState<string | undefined>();
  const [aiCode, setAiCode] = useState<string | undefined>();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [celebratingMilestone, setCelebratingMilestone] = useState<XpMilestone | null>(null);
  const [roadmapOpen, setRoadmapOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<PolicyTab>('privacy');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const { isAuthenticated, user } = useAuth();
  const hasRealAccount = isAuthenticated && user?.method !== 'guest';

  const requireAuth = useCallback((action: () => void) => {
    if (hasRealAccount) {
      action();
    } else {
      addToast('Sign In Required', 'Create a free account to save your progress and access all features.', 'info');
      setAccountOpen(true);
    }
  }, [hasRealAccount]);

  const handleOpenLegal = (tab: PolicyTab = 'privacy') => {
    setLegalModalTab(tab);
    setLegalModalOpen(true);
  };

  const addToast = (title: string, message: string, type: 'info' | 'success' | 'update' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`;
    const newToast: ToastMessage = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const unreadNewsCount = NEWS_UPDATES.filter((n) => n.isUnread).length;
  const mainContentRef = useRef<HTMLElement>(null);

  // Keep the reading mode migration-safe: all legacy themes resolve to dark.
  const [theme, setTheme] = useState<AppTheme>(() => {
    try {
      return normalizeAppTheme(localStorage.getItem('wz_storehouse_theme'));
    } catch {
      return 'dark';
    }
  });
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif' | 'mono'>('sans');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedVisualizerTool, setSelectedVisualizerTool] = useState<VisualizerId>('box');
  const [searchInitialQuery, setSearchInitialQuery] = useState<string>('');

  const handleOpenVisualLab = (toolId?: string) => {
    if (toolId) {
      setSelectedVisualizerTool(toolId as VisualizerId);
    }
    navigateToView('visual-lab');
  };

  // Load progress — server is source of truth when authenticated, localStorage for guests
  const [progress, setProgress] = useState<UserProgress>(INITIAL_PROGRESS);
  const [progressLoaded, setProgressLoaded] = useState(false);

  // On mount: fetch from server if authenticated, otherwise use localStorage
  useEffect(() => {
    if (hasRealAccount) {
      authService.fetchProgress().then((serverProgress) => {
        if (serverProgress) {
          const merged: UserProgress = {
            ...INITIAL_PROGRESS,
            ...serverProgress,
            claimedMilestones: serverProgress.claimedMilestones || ['milestone-100'],
          };
          const { updatedProgress } = calculateDailyStreak(merged);
          setProgress(updatedProgress);
        } else {
          const { updatedProgress } = calculateDailyStreak(INITIAL_PROGRESS);
          setProgress(updatedProgress);
        }
        setProgressLoaded(true);
      });
    } else {
      // Guest: use localStorage as offline cache
      try {
        const saved = localStorage.getItem('wz_storehouse_progress');
        if (saved) {
          const parsed = JSON.parse(saved);
          const merged: UserProgress = {
            ...INITIAL_PROGRESS,
            ...parsed,
            claimedMilestones: parsed.claimedMilestones || ['milestone-100'],
          };
          const { updatedProgress } = calculateDailyStreak(merged);
          setProgress(updatedProgress);
        } else {
          const { updatedProgress } = calculateDailyStreak(INITIAL_PROGRESS);
          setProgress(updatedProgress);
        }
      } catch {
        const { updatedProgress } = calculateDailyStreak(INITIAL_PROGRESS);
        setProgress(updatedProgress);
      }
      setProgressLoaded(true);
    }
  }, [hasRealAccount]);

  // Verify daily streak on mount / date change
  useEffect(() => {
    setProgress((prev) => {
      const { updatedProgress } = calculateDailyStreak(prev);
      return updatedProgress;
    });

    // Deep-link URL parameter resolution for sitemap indexing & direct navigation
    try {
      const params = new URLSearchParams(window.location.search);
      const lessonParam = params.get('lesson');
      const chapterParam = params.get('chapter');
      const viewParam = params.get('view') as ViewMode | null;
      const toolParam = params.get('tool') as VisualizerId | null;
      const legalParam = params.get('legal') as PolicyTab | null;

      if (legalParam && ['privacy', 'terms', 'cookies', 'about', 'contact'].includes(legalParam)) {
        setLegalModalTab(legalParam);
        setLegalModalOpen(true);
      }

      if (lessonParam) {
        const lessonFound = chapters.some((c) => c.lessons.some((l) => l.id === lessonParam));
        if (lessonFound) {
          setCurrentLessonId(lessonParam);
          setActiveView('lesson');
          return;
        }
      }

      if (chapterParam) {
        const foundChapter = chapters.find((c) => c.id === chapterParam);
        if (foundChapter && foundChapter.lessons.length > 0) {
          setCurrentLessonId(foundChapter.lessons[0].id);
          setActiveView('lesson');
          return;
        }
      }

      if (toolParam && ['box', 'flex', 'grid', 'dom', 'git', 'net'].includes(toolParam)) {
        setSelectedVisualizerTool(toolParam);
        setActiveView('visual-lab');
        return;
      }

      if (viewParam && ['home', 'lesson', 'practice-hub', 'visual-lab', 'activities', 'curriculum'].includes(viewParam)) {
        setActiveView(viewParam);
      }
    } catch {}
  }, [chapters]);

  // Save progress — server is source of truth when authenticated, localStorage for guests
  useEffect(() => {
    if (!progressLoaded) return; // Don't save before initial load
    if (hasRealAccount) {
      // Sync to server (server overwrites localStorage)
      authService.syncProgress(progress);
    } else {
      // Guest fallback: localStorage only
      try {
        localStorage.setItem('wz_storehouse_progress', JSON.stringify(progress));
      } catch {}
    }
  }, [progress, hasRealAccount, progressLoaded]);

  // Save theme to localStorage (synchronizing both React SPA and standalone keys)
  useEffect(() => {
    try {
      localStorage.setItem('wz_storehouse_theme', theme);
      localStorage.setItem('wz-theme', theme);
    } catch {}
  }, [theme]);

  // Check for newly reached XP milestones and trigger congratulatory modal
  useEffect(() => {
    const currentClaimed = progress.claimedMilestones || [];
    // Find uncelebrated milestones that the user has already reached
    const newlyReached = XP_MILESTONES.find(
      (m) => progress.xpPoints >= m.xpRequired && !currentClaimed.includes(m.id)
    );

    if (newlyReached) {
      setCelebratingMilestone(newlyReached);
      setProgress((prev) => ({
        ...prev,
        claimedMilestones: [...(prev.claimedMilestones || []), newlyReached.id],
      }));
    }
  }, [progress.xpPoints]);

  // Apply the selected reading mode without leaving legacy classes behind.
  useEffect(() => {
    applyAppTheme(theme);
  }, [theme]);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Find active lesson and chapter
  let activeLesson: Lesson | undefined;
  let activeChapter: Chapter | undefined;

  for (const ch of chapters) {
    const found = ch.lessons.find((l) => l.id === currentLessonId);
    if (found) {
      activeLesson = found;
      activeChapter = ch;
      break;
    }
  }

  const scrollMainToTop = () => {
    mainContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToView = (view: ViewMode) => {
    setActiveView(view);
    scrollMainToTop();
  };

  const handleSelectLesson = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    setActiveView('lesson');
    scrollMainToTop();
  };

  const handleNavigateActivities = (lessonId?: string) => {
    if (lessonId) {
      setCurrentLessonId(lessonId);
    }
    setActiveView('activities');
    scrollMainToTop();
  };

  const handleCompleteActivity = (activityId: string, xpReward: number) => {
    requireAuth(() => {
      setProgress((prev) => {
        const isAlreadyDone = prev.completedActivities?.[activityId];
        const withStreak = calculateDailyStreak(prev).updatedProgress;
        return {
          ...withStreak,
          completedActivities: {
            ...(withStreak.completedActivities || {}),
            [activityId]: true,
          },
          xpPoints: isAlreadyDone ? withStreak.xpPoints : withStreak.xpPoints + xpReward,
        };
      });

      addToast(
        'Activity Mastered! 🌟',
        `You earned +${xpReward} XP for conquering this post-class exercise!`,
        'success'
      );
    });
  };

  const handleCompleteLesson = (lessonId: string) => {
    setProgress((prev) => {
      const isAlreadyDone = prev.completedLessons[lessonId];
      const withStreak = calculateDailyStreak(prev).updatedProgress;
      return {
        ...withStreak,
        completedLessons: {
          ...withStreak.completedLessons,
          [lessonId]: true,
        },
        xpPoints: isAlreadyDone ? withStreak.xpPoints : withStreak.xpPoints + 50,
      };
    });
  };

  const handleCompleteChallenge = (challengeId: string) => {
    setProgress((prev) => {
      const isAlreadyDone = prev.completedChallenges[challengeId];
      const withStreak = calculateDailyStreak(prev).updatedProgress;
      return {
        ...withStreak,
        completedChallenges: {
          ...withStreak.completedChallenges,
          [challengeId]: true,
        },
        xpPoints: isAlreadyDone ? withStreak.xpPoints : withStreak.xpPoints + 50,
      };
    });
  };

  const handleToggleBookmark = (lessonId: string) => {
    requireAuth(() => {
      setProgress((prev) => {
        const isBookmarked = prev.bookmarks.includes(lessonId);
        return {
          ...prev,
          bookmarks: isBookmarked
            ? prev.bookmarks.filter((id) => id !== lessonId)
            : [...prev.bookmarks, lessonId],
        };
      });
    });
  };

  const handleSaveNote = (lessonId: string, note: string) => {
    requireAuth(() => {
      setProgress((prev) => {
        const withStreak = calculateDailyStreak(prev).updatedProgress;
        return {
          ...withStreak,
          notes: {
            ...withStreak.notes,
            [lessonId]: note,
          },
        };
      });
    });
  };

  const handleResetProgress = () => {
    setProgress(INITIAL_PROGRESS);
  };

  const handleOpenTutor = (topic?: string, code?: string) => {
    setAiTopic(topic);
    setAiCode(code);
    setTutorOpen(true);
  };

  const fontClass =
    fontFamily === 'serif' ? 'font-serif' : fontFamily === 'mono' ? 'font-mono' : 'font-sans';
  const sizeClass =
    fontSize === 'sm' ? 'text-sm leading-relaxed' : fontSize === 'lg' ? 'text-lg leading-loose' : 'text-base leading-normal';

  const handleCycleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const totalLessons = chapters.flatMap((c) => c.lessons).length;

  return (
    <div
      id="wz-storehouse-app"
      className={`flex h-[100dvh] min-w-0 flex-col overflow-hidden bg-app-canvas text-app-ink ${fontClass}`}
    >
      {/* Sidebar Navigation */}
      <Sidebar
        chapters={chapters}
        currentLessonId={currentLessonId}
        onSelectLesson={handleSelectLesson}
        progress={progress}
        isOpen={sidebarOpen}
        onCloseMobile={() => setSidebarOpen(false)}
        activeView={activeView}
        onNavigateHome={() => navigateToView('home')}
        onOpenPracticeHub={() => navigateToView('practice-hub')}
        onOpenVisualLab={() => navigateToView('visual-lab')}
        onOpenActivities={() => handleNavigateActivities()}
        onOpenMilestones={() => setRoadmapOpen(true)}
        onOpenTutor={() => handleOpenTutor()}
      />

      {/* Main Content Area */}
      <div className="flex min-h-0 min-w-0 flex-col overflow-hidden">
        {/* Sticky Header */}
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenTutor={() => handleOpenTutor()}
          onOpenMilestones={() => setRoadmapOpen(true)}
          onOpenSettings={() => requireAuth(() => setSettingsOpen(true))}
          onOpenCertificate={() => requireAuth(() => setCertificateOpen(true))}
          onOpenNotifications={() => setNotificationsOpen(true)}
          onOpenAccount={() => setAccountOpen(true)}
          unreadNewsCount={unreadNewsCount}
          onNavigateHome={() => navigateToView('home')}
          onNavigatePractice={() => navigateToView('practice-hub')}
          onNavigateVisualLab={(toolId) => handleOpenVisualLab(toolId)}
          onNavigateActivities={() => handleNavigateActivities()}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            navigateToView('home');
          }}
          progress={progress}
          activeView={activeView}
          theme={theme}
          onToggleTheme={handleCycleTheme}
        />

        {/* View Router with one independent scroll region */}
        <main ref={mainContentRef} id="main-content" className={`min-h-0 min-w-0 flex-1 ${sizeClass} overflow-x-hidden overflow-y-auto relative`}>
          <AnimatePresence mode="wait" initial={false}>
            {activeView === 'home' && (
              <motion.div
                key="home-view"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <HomeHero
                  chapters={chapters}
                  progress={progress}
                  onSelectLesson={handleSelectLesson}
                  onOpenPracticeHub={() => navigateToView('practice-hub')}
                  onOpenVisualLab={(toolId) => handleOpenVisualLab(toolId)}
                  onOpenActivities={() => handleNavigateActivities()}
                  onOpenTutor={() => handleOpenTutor()}
                  onOpenMilestones={() => setRoadmapOpen(true)}
                  onOpenSearch={(query) => {
                    setSearchInitialQuery(query || '');
                    setSearchOpen(true);
                  }}
                  selectedCategory={selectedCategory}
                />
              </motion.div>
            )}

            {activeView === 'lesson' && activeLesson && activeChapter && (
              <motion.div
                key={`lesson-${activeLesson.id}`}
initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <LessonView
                  lesson={activeLesson}
                  chapter={activeChapter}
                  onNavigateLesson={handleSelectLesson}
                  onCompleteLesson={handleCompleteLesson}
                  onNavigateActivities={handleNavigateActivities}
                  isCompleted={!!progress.completedLessons[activeLesson.id]}
                  isBookmarked={progress.bookmarks.includes(activeLesson.id)}
                  onToggleBookmark={handleToggleBookmark}
                  userNote={progress.notes[activeLesson.id] || ''}
                  onSaveNote={handleSaveNote}
                  onOpenTutor={handleOpenTutor}
                  allChapters={chapters}
                  completedLessons={progress.completedLessons}
                />
              </motion.div>
            )}

            {activeView === 'activities' && (
              <motion.div
                key="activities-view"
initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <ActivitiesView
                  chapters={chapters}
                  currentLessonId={currentLessonId}
                  onSelectLesson={(lessonId) => setCurrentLessonId(lessonId)}
                  onNavigateToLesson={handleSelectLesson}
                  progress={progress}
                  onCompleteActivity={handleCompleteActivity}
                />
              </motion.div>
            )}

            {activeView === 'practice-hub' && (
              <motion.div
                key="practice-hub-view"
initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <PracticeHub
                  chapters={chapters}
                  progress={progress}
                  onCompleteChallenge={handleCompleteChallenge}
                />
              </motion.div>
            )}

            {activeView === 'visual-lab' && (
              <motion.div
                key="visual-lab-view"
initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <VisualLab initialTool={selectedVisualizerTool} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Educational Platform Footer with AdSense & Legal Compliance Links */}
          <Footer
            onOpenLegal={handleOpenLegal}
            onOpenTutor={() => handleOpenTutor()}
            onSelectLesson={handleSelectLesson}
            onNavigateHome={() => navigateToView('home')}
            onNavigatePractice={() => navigateToView('practice-hub')}
            onNavigateVisualLab={(toolId) => handleOpenVisualLab(toolId)}
            onNavigateActivities={() => handleNavigateActivities()}
            onOpenMilestones={() => setRoadmapOpen(true)}
            onOpenCertificate={() => setCertificateOpen(true)}
            onOpenSearch={() => setSearchOpen(true)}
            chapters={chapters}
          />
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <AccountModal
        isOpen={accountOpen}
        onClose={() => setAccountOpen(false)}
        onAuthSuccess={() => setAccountOpen(false)}
        progress={progress}
        onOpenCertificate={() => setCertificateOpen(true)}
        onOpenMilestones={() => setRoadmapOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
      />
      <LegalComplianceModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalModalTab}
      />
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        chapters={chapters}
        onSelectLesson={handleSelectLesson}
        onNavigatePractice={() => navigateToView('practice-hub')}
        onNavigateVisualLab={(toolId) => handleOpenVisualLab(toolId)}
        onNavigateActivities={() => handleNavigateActivities()}
        onOpenTutor={() => handleOpenTutor()}
        initialQuery={searchInitialQuery}
      />

      <TutorModal
        isOpen={tutorOpen}
        onClose={() => setTutorOpen(false)}
        initialTopic={aiTopic}
        initialCode={aiCode}
        allChapters={chapters}
        onNavigateLesson={handleSelectLesson}
      />

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        theme={theme}
        onSelectTheme={setTheme}
        fontSize={fontSize}
        onSelectFontSize={setFontSize}
        fontFamily={fontFamily}
        onSelectFontFamily={setFontFamily}
        onResetProgress={handleResetProgress}
        progress={progress}
        onOpenLegal={handleOpenLegal}
      />

      <CertificateModal
        isOpen={certificateOpen}
        onClose={() => setCertificateOpen(false)}
        progress={progress}
        totalLessons={totalLessons}
      />

      {/* Congratulatory XP Milestone Celebration Modal */}
      {celebratingMilestone && (
        <XpMilestoneModal
          milestone={celebratingMilestone}
          isOpen={!!celebratingMilestone}
          onClose={() => setCelebratingMilestone(null)}
          onOpenRoadmap={() => setRoadmapOpen(true)}
          currentXp={progress.xpPoints}
        />
      )}

      {/* XP Milestones & Level Roadmap Modal */}
      <XpMilestonesRoadmapModal
        isOpen={roadmapOpen}
        onClose={() => setRoadmapOpen(false)}
        progress={progress}
        onTriggerCelebration={(m) => {
          setRoadmapOpen(false);
          setCelebratingMilestone(m);
        }}
      />

      {/* Notifications & Release News Modal */}
      <NotificationCenterModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        onNavigateView={(view, lessonId) => {
          if (view === 'lesson' && lessonId) {
            handleSelectLesson(lessonId);
          } else {
            navigateToView(view);
          }
        }}
        onTriggerToast={addToast}
      />

      {/* Toast Notification Container */}
      <ToastNotification
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />

      {/* Cookie & Push Notification Consent Banner */}
      <CookieNotificationBanner
        onAcceptAll={() => {
          addToast('Preferences Saved', 'Cookies and push notification preferences enabled.', 'success');
        }}
        onPreferencesSaved={(prefs) => {
          addToast('Preferences Updated', `Cookie settings saved with push ${prefs.pushNotifications ? 'enabled' : 'disabled'}.`, 'info');
        }}
        onOpenNews={() => setNotificationsOpen(true)}
        onOpenPrivacy={() => handleOpenLegal('privacy')}
      />
    </div>
  );
}

