import { UserProgress } from './types';

export function getLocalDateString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export interface LearningContinuityResult {
  updatedProgress: UserProgress;
  conceptsMastered: number;
  todayActive: boolean;
}

/**
 * Calculates genuine conceptual learning progress:
 * Replaces punitive streak counters with authentic Concept Mastery
 */
export function calculateLearningContinuity(progress: UserProgress): LearningContinuityResult {
  const todayStr = getLocalDateString(new Date());
  
  const lessonCount = Object.values(progress.completedLessons || {}).filter(Boolean).length;
  const challengeCount = Object.values(progress.completedChallenges || {}).filter(Boolean).length;
  const activityCount = Object.values(progress.completedActivities || {}).filter(Boolean).length;
  const computedConcepts = lessonCount + challengeCount + activityCount;

  const currentMastered = Math.max(progress.conceptsMastered || 0, computedConcepts);
  const updatedProgress: UserProgress = {
    ...progress,
    conceptsMastered: currentMastered,
    lastActiveDate: todayStr,
  };

  return {
    updatedProgress,
    conceptsMastered: currentMastered,
    todayActive: true,
  };
}

/**
 * Backward compatibility alias for calculateDailyStreak
 * Purely tracks concept mastery and never resets progress
 */
export function calculateDailyStreak(progress: UserProgress) {
  const { updatedProgress } = calculateLearningContinuity(progress);
  return {
    updatedProgress,
    streakIncremented: false,
    streakMaintained: true,
    streakReset: false,
    todayActive: true,
  };
}

/**
 * Concept mastery weekly progress tracker
 */
export function getWeeklyStreakDays(conceptsCount: number = 0, isTodayActive: boolean = true) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const currentDayIndex = (today.getDay() + 6) % 7; // 0 for Mon, 6 for Sun

  return days.map((dayName, index) => {
    const isToday = index === currentDayIndex;
    const isPast = index < currentDayIndex;
    const isFuture = index > currentDayIndex;
    const isActive = isToday ? isTodayActive : isPast && (conceptsCount > index);

    return {
      dayName,
      isToday,
      isPast,
      isFuture,
      isActive,
    };
  });
}
