import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CHAPTERS_DATA } from './data/chaptersData';
import { UserProgress, Chapter, Lesson, XpMilestone, AppTheme, ViewMode } from './types';
import { XP_MILESTONES } from './data/milestonesData';
import { calculateDailyStreak, getLocalDateString } from './utils/streakUtils';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HomeHero } from './components/HomeHero';
import { LessonView } from './components/LessonView';
import { PracticeHub } from './components/PracticeHub';
import { VisualLab } from './components/VisualLab';
import { ActivitiesView } from './components/ActivitiesView';
import { SearchModal } from './components/SearchModal';
import { TutorModal } from './components/TutorModal';
import { SettingsModal } from './components/SettingsModal';
import { CertificateModal } from './components/CertificateModal';
import { XpMilestoneModal } from './components/XpMilestoneModal';
import { XpMilestonesRoadmapModal } from './components/XpMilestonesRoadmapModal';
import { CookieNotificationBanner } from './components/CookieNotificationBanner';
import { NotificationCenterModal } from './components/NotificationCenterModal';
import { ToastNotification, ToastMessage } from './components/ToastNotification';
import { NEWS_UPDATES } from './data/newsData';

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
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message: string, type: 'info' | 'success' | 'update' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`;
    const newToast: ToastMessage = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const unreadNewsCount = NEWS_UPDATES.filter((n) => n.isUnread).length;

  // Settings State
  const [theme, setTheme] = useState<AppTheme>(() => {
    try {
      const savedTheme = localStorage.getItem('wz_storehouse_theme');
      if (savedTheme) return savedTheme as AppTheme;
    } catch {}
    return 'batman'; // Batcave Dark Knight theme by default
  });
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif' | 'mono'>('sans');

  // Load progress from localStorage with Daily Streak Verification
  const [progress, setProgress] = useState<UserProgress>(() => {
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
        return updatedProgress;
      }
    } catch {}
    const { updatedProgress } = calculateDailyStreak(INITIAL_PROGRESS);
    return updatedProgress;
  });

  // Verify daily streak on mount / date change
  useEffect(() => {
    setProgress((prev) => {
      const { updatedProgress } = calculateDailyStreak(prev);
      return updatedProgress;
    });
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wz_storehouse_progress', JSON.stringify(progress));
    } catch {}
  }, [progress]);

  // Save theme to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wz_storehouse_theme', theme);
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

  // Apply Batman Dark Knight, Light, and energetic themes to document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'batman', 'light', 'sepia', 'cyber-energy', 'sunset-pulse', 'emerald-flow');
    
    if (theme === 'batman' || theme === 'dark') {
      root.classList.add('dark', 'batman');
    } else if (theme === 'light') {
      root.classList.add('light');
    } else if (theme === 'sepia') {
      root.classList.add('sepia');
    } else if (theme === 'cyber-energy') {
      root.classList.add('dark', 'cyber-energy');
    } else if (theme === 'sunset-pulse') {
      root.classList.add('dark', 'sunset-pulse');
    } else if (theme === 'emerald-flow') {
      root.classList.add('dark', 'emerald-flow');
    }
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

  const navigateToView = (view: ViewMode) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLesson = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    setActiveView('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateActivities = (lessonId?: string) => {
    if (lessonId) {
      setCurrentLessonId(lessonId);
    }
    setActiveView('activities');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteActivity = (activityId: string, xpReward: number) => {
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
    setProgress((prev) => {
      const isBookmarked = prev.bookmarks.includes(lessonId);
      return {
        ...prev,
        bookmarks: isBookmarked
          ? prev.bookmarks.filter((id) => id !== lessonId)
          : [...prev.bookmarks, lessonId],
      };
    });
  };

  const handleSaveNote = (lessonId: string, note: string) => {
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

  const THEMES: AppTheme[] = ['batman', 'light', 'cyber-energy', 'sunset-pulse', 'emerald-flow', 'sepia'];
  const handleCycleTheme = () => {
    const nextIdx = (THEMES.indexOf(theme) + 1) % THEMES.length;
    setTheme(THEMES[nextIdx]);
  };

  const totalLessons = chapters.flatMap((c) => c.lessons).length;

  return (
    <div
      id="wz-storehouse-app"
      className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex ${fontClass}`}
    >
      {/* Sidebar Navigation */}
      <Sidebar
        chapters={chapters}
        currentLessonId={currentLessonId}
        onSelectLesson={handleSelectLesson}
        progress={progress}
        isOpen={sidebarOpen}
        onCloseMobile={() => setSidebarOpen(false)}
        onOpenPracticeHub={() => navigateToView('practice-hub')}
        onOpenVisualLab={() => navigateToView('visual-lab')}
        onOpenActivities={() => handleNavigateActivities()}
        onOpenMilestones={() => setRoadmapOpen(true)}
        onOpenTutor={() => handleOpenTutor()}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Header */}
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenTutor={() => handleOpenTutor()}
          onOpenMilestones={() => setRoadmapOpen(true)}
          onOpenSettings={() => setSettingsOpen(true)}
          onOpenCertificate={() => setCertificateOpen(true)}
          onOpenNotifications={() => setNotificationsOpen(true)}
          unreadNewsCount={unreadNewsCount}
          onNavigateHome={() => navigateToView('home')}
          onNavigatePractice={() => navigateToView('practice-hub')}
          onNavigateVisualLab={() => navigateToView('visual-lab')}
          onNavigateActivities={() => handleNavigateActivities()}
          progress={progress}
          activeView={activeView}
          theme={theme}
          onToggleTheme={handleCycleTheme}
        />

        {/* View Router with Fluid Transitions */}
        <main className={`flex-1 ${sizeClass} overflow-x-hidden relative`}>
          <AnimatePresence mode="wait" initial={false}>
            {activeView === 'home' && (
              <motion.div
                key="home-view"
                initial={{ opacity: 0, y: 14, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(3px)' }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <HomeHero
                  chapters={chapters}
                  progress={progress}
                  onSelectLesson={handleSelectLesson}
                  onOpenPracticeHub={() => navigateToView('practice-hub')}
                  onOpenVisualLab={() => navigateToView('visual-lab')}
                  onOpenActivities={() => handleNavigateActivities()}
                  onOpenTutor={() => handleOpenTutor()}
                  onOpenMilestones={() => setRoadmapOpen(true)}
                />
              </motion.div>
            )}

            {activeView === 'lesson' && activeLesson && activeChapter && (
              <motion.div
                key={`lesson-${activeLesson.id}`}
                initial={{ opacity: 0, y: 14, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(3px)' }}
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
                initial={{ opacity: 0, y: 14, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(3px)' }}
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
                initial={{ opacity: 0, y: 14, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(3px)' }}
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
                initial={{ opacity: 0, y: 14, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(3px)' }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <VisualLab />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        chapters={chapters}
        onSelectLesson={handleSelectLesson}
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
      />
    </div>
  );
}

