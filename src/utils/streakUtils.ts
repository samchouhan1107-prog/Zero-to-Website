import { UserProgress } from '../types';

export function getLocalDateString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export interface StreakCheckResult {
  updatedProgress: UserProgress;
  streakIncremented: boolean;
  streakMaintained: boolean;
  streakReset: boolean;
  todayActive: boolean;
}

/**
 * Calculates and updates daily streak based on calendar days
 */
export function calculateDailyStreak(progress: UserProgress): StreakCheckResult {
  const todayStr = getLocalDateString(new Date());
  const rawLastDate = progress.lastActiveDate || '';

  let lastDateStr = todayStr;
  if (rawLastDate) {
    if (rawLastDate.includes('T')) {
      try {
        lastDateStr = getLocalDateString(new Date(rawLastDate));
      } catch {
        lastDateStr = todayStr;
      }
    } else {
      lastDateStr = rawLastDate;
    }
  }

  // Already recorded today
  if (lastDateStr === todayStr) {
    return {
      updatedProgress: {
        ...progress,
        streakDays: Math.max(1, progress.streakDays || 1),
        lastActiveDate: todayStr,
      },
      streakIncremented: false,
      streakMaintained: true,
      streakReset: false,
      todayActive: true,
    };
  }

  // Calculate day difference
  const todayDate = new Date(todayStr + 'T00:00:00');
  const lastDate = new Date(lastDateStr + 'T00:00:00');
  const diffMs = todayDate.getTime() - lastDate.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    // Exactly 1 day apart -> streak continues!
    const newStreak = (progress.streakDays || 0) + 1;
    return {
      updatedProgress: {
        ...progress,
        streakDays: newStreak,
        lastActiveDate: todayStr,
        xpPoints: progress.xpPoints + 25, // +25 XP streak continuity bonus
      },
      streakIncremented: true,
      streakMaintained: true,
      streakReset: false,
      todayActive: true,
    };
  } else if (diffDays > 1) {
    // More than 1 day missed -> reset to 1
    return {
      updatedProgress: {
        ...progress,
        streakDays: 1,
        lastActiveDate: todayStr,
      },
      streakIncremented: false,
      streakMaintained: false,
      streakReset: true,
      todayActive: true,
    };
  }

  // Same day or future
  return {
    updatedProgress: {
      ...progress,
      lastActiveDate: todayStr,
    },
    streakIncremented: false,
    streakMaintained: true,
    streakReset: false,
    todayActive: true,
  };
}

/**
 * Returns array of days in current week for streak visualizer
 */
export function getWeeklyStreakDays(streakDays: number, isTodayActive: boolean) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const currentDayIndex = (today.getDay() + 6) % 7; // 0 for Mon, 6 for Sun

  return days.map((dayName, index) => {
    const isToday = index === currentDayIndex;
    const isPast = index < currentDayIndex;
    const isFuture = index > currentDayIndex;

    // Estimate if active based on current streak count
    const daysAgo = currentDayIndex - index;
    const isActive = isToday
      ? isTodayActive
      : isPast && daysAgo < streakDays;

    return {
      dayName,
      isToday,
      isPast,
      isFuture,
      isActive,
    };
  });
}
