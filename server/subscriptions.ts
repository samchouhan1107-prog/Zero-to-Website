import fs from 'fs';
import path from 'path';

/**
 * ============================================================================
 * WEEKLY LEARNING SUBSCRIPTIONS & CONTENT DISPATCH ENGINE
 * Allows students to subscribe to vetted, high-value weekly course updates
 * with full preference control and unsubscribe management.
 * ============================================================================
 */

export interface StudentSubscription {
  id: string;
  userId: string;
  studentEmail: string;
  studentName: string;
  subscribedTracks: string[]; // e.g. ['Core Curriculum', 'Full-Stack AI', 'Modern CSS Architecture']
  deliveryCadence: 'weekly' | 'bi-weekly';
  preferredFormat: 'interactive-digest' | 'downloadable-pack' | 'both';
  active: boolean;
  subscribedAt: string;
  lastDispatchedAt?: string;
  unsubscribeToken: string;
}

export interface WeeklyReleaseItem {
  id: string;
  title: string;
  trackName: string;
  summary: string;
  chapterNumber: number;
  lessonCount: number;
  hasDownloadableAssets: boolean;
  releasedAt: string;
  editorialApprovedBy: string; // 'Sameer Chouhan / WebZoneBW'
  readingTimeMinutes: number;
}

const SUBSCRIPTIONS_FILE = path.join(process.cwd(), 'server', 'subscriptions-data.json');

let subscriptionsMemory: StudentSubscription[] = [];

function loadSubscriptions(): void {
  try {
    if (fs.existsSync(SUBSCRIPTIONS_FILE)) {
      subscriptionsMemory = JSON.parse(fs.readFileSync(SUBSCRIPTIONS_FILE, 'utf-8'));
    } else {
      subscriptionsMemory = [
        {
          id: 'sub-scholar-default',
          userId: 'default',
          studentEmail: 'scholar@demo.local',
          studentName: 'Active Scholar',
          subscribedTracks: ['Core Curriculum', 'Full-Stack AI', 'Modern CSS Architecture'],
          deliveryCadence: 'weekly',
          preferredFormat: 'both',
          active: true,
          subscribedAt: new Date().toISOString(),
          unsubscribeToken: 'unsub-scholar-token-12345',
        },
      ];
      saveSubscriptions();
    }
  } catch (err) {
    console.warn('[SubscriptionsEngine] Could not load subscriptions:', err);
    subscriptionsMemory = [];
  }
}

function saveSubscriptions(): void {
  try {
    fs.writeFileSync(SUBSCRIPTIONS_FILE, JSON.stringify(subscriptionsMemory, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[SubscriptionsEngine] Failed to save subscriptions:', err);
  }
}

loadSubscriptions();

export const WEEKLY_CURRICULUM_RELEASES: WeeklyReleaseItem[] = [
  {
    id: 'rel-2026-w10',
    title: 'Modern CSS Subgrid & Logical Spacing Masterclass',
    trackName: 'Modern CSS Architecture',
    summary: 'Master nested grid alignment across complex multi-card layouts without wrapper elements or brittle margin hacks.',
    chapterNumber: 3,
    lessonCount: 4,
    hasDownloadableAssets: true,
    releasedAt: '2026-03-08T00:00:00.000Z',
    editorialApprovedBy: 'Sameer Chouhan / WebZoneBW',
    readingTimeMinutes: 18,
  },
  {
    id: 'rel-2026-w09',
    title: 'Streaming UI State & Reactive Server-Sent Events',
    trackName: 'Full-Stack AI Engineering',
    summary: 'Parse partial token chunks and maintain animated typewriter effects with zero React state thrashing.',
    chapterNumber: 2,
    lessonCount: 3,
    hasDownloadableAssets: true,
    releasedAt: '2026-03-01T00:00:00.000Z',
    editorialApprovedBy: 'Sameer Chouhan / WebZoneBW',
    readingTimeMinutes: 22,
  },
  {
    id: 'rel-2026-w08',
    title: 'Cross-Site Leaks & Secure HTTP-Only Cookie Partitioning',
    trackName: 'Enterprise Web Security',
    summary: 'Deconstruct modern browser cookie partitioning (CHIPS), SameSite attributes, and iframe sandbox boundaries.',
    chapterNumber: 2,
    lessonCount: 4,
    hasDownloadableAssets: true,
    releasedAt: '2026-02-22T00:00:00.000Z',
    editorialApprovedBy: 'Sameer Chouhan / WebZoneBW',
    readingTimeMinutes: 25,
  },
];

export function getAllSubscriptions(): StudentSubscription[] {
  return subscriptionsMemory;
}

export function getSubscriptionByUserId(userId: string): StudentSubscription | null {
  return subscriptionsMemory.find((s) => s.userId === userId || s.userId === 'default') || null;
}

export function subscribeOrUpdate(
  data: Partial<StudentSubscription> & { studentEmail: string }
): StudentSubscription {
  const existingIdx = subscriptionsMemory.findIndex(
    (s) => s.studentEmail.toLowerCase() === data.studentEmail.toLowerCase()
  );

  const now = new Date().toISOString();
  if (existingIdx >= 0) {
    const updated: StudentSubscription = {
      ...subscriptionsMemory[existingIdx],
      ...data,
      active: true,
    };
    subscriptionsMemory[existingIdx] = updated;
    saveSubscriptions();
    return updated;
  } else {
    const newSub: StudentSubscription = {
      id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId: data.userId || 'default',
      studentEmail: data.studentEmail,
      studentName: data.studentName || 'Learner',
      subscribedTracks: data.subscribedTracks || ['Core Curriculum', 'Full-Stack AI'],
      deliveryCadence: data.deliveryCadence || 'weekly',
      preferredFormat: data.preferredFormat || 'interactive-digest',
      active: true,
      subscribedAt: now,
      unsubscribeToken: `unsub-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
    };
    subscriptionsMemory.unshift(newSub);
    saveSubscriptions();
    return newSub;
  }
}

export function unsubscribeStudent(tokenOrEmail: string): boolean {
  const sub = subscriptionsMemory.find(
    (s) => s.unsubscribeToken === tokenOrEmail || s.studentEmail.toLowerCase() === tokenOrEmail.toLowerCase()
  );
  if (sub) {
    sub.active = false;
    saveSubscriptions();
    return true;
  }
  return false;
}
