/**
 * WebZoneBW File-Based Database
 * JSON file storage — no external dependencies.
 * Swap for PostgreSQL / SQLite in production.
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";
import { allChapters } from "../src/data/chapters";

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "webzonebw.json");

/* ── Types ─────────────────────────────────────────────── */

export interface DbUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  avatar: string | null;
  method: "google" | "email" | "guest";
  createdAt: string;
}

export interface DbSession {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
}

export interface DbProgress {
  userId: string;
  completedLessons: Record<string, boolean>;
  completedChallenges: Record<string, boolean>;
  completedActivities: Record<string, boolean>;
  practiceCompletions?: Record<string, { completedAt: string; verified: boolean; codeLength?: number }>;
  lessonCompletions?: Record<string, { completedAt: string; verified: boolean }>;
  lastVerifiedLesson?: string;
  lastVerifiedChapter?: string;
  currentLearningPath?: string;
  completionTimestamps?: Record<string, string>;
  quizScores: Record<string, number>;
  notes: Record<string, string>;
  bookmarks: string[];
  xpPoints: number;
  streakDays: number;
  lastActiveDate: string;
  claimedMilestones: string[];
  achievements?: Record<string, { id: string; title: string; unlockedAt: string; icon: string; description: string }>;
  finalProjectSubmitted?: boolean;
  finalProjectVerified?: boolean;
  finalProjectDetails?: { title: string; techStack?: string[]; description?: string; submittedAt: string };
  courseCompleted?: boolean;
  courseCompletedAt?: string;
}

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  condition: (p: DbProgress) => boolean;
}

export const ACHIEVEMENTS_CATALOG: AchievementDef[] = [
  {
    id: "first-lesson",
    title: "First Step Forward",
    description: "Completed your first verified interactive lesson",
    icon: "GraduationCap",
    xpReward: 50,
    condition: (p) => Object.keys(p.completedLessons || {}).length >= 1,
  },
  {
    id: "first-practice",
    title: "Hands On Keyboard",
    description: "Successfully solved and verified your first coding practice challenge",
    icon: "Code2",
    xpReward: 50,
    condition: (p) => Object.keys(p.completedChallenges || {}).length >= 1 || Object.keys(p.practiceCompletions || {}).length >= 1,
  },
  {
    id: "first-chapter",
    title: "Chapter Conquered",
    description: "Completed all lessons in Chapter 00 or Chapter 01",
    icon: "Award",
    xpReward: 100,
    condition: (p) => !!p.completedLessons?.["ch-00-l-01"] || !!p.completedLessons?.["ch-01-l-01"],
  },
  {
    id: "streak-3",
    title: "Consistent Learner",
    description: "Maintained a 3-day active learning streak with verified lessons",
    icon: "Flame",
    xpReward: 150,
    condition: (p) => (p.streakDays || 0) >= 3,
  },
  {
    id: "streak-7",
    title: "Unstoppable Momentum",
    description: "Achieved a full 7-day verified learning streak",
    icon: "Zap",
    xpReward: 300,
    condition: (p) => (p.streakDays || 0) >= 7,
  },
  {
    id: "final-project",
    title: "Capstone Architect",
    description: "Built and verified your Chapter 10 final capstone web project",
    icon: "Rocket",
    xpReward: 250,
    condition: (p) => !!p.finalProjectVerified,
  },
  {
    id: "course-completed",
    title: "Full Course Completion",
    description: "Completed every single chapter from Chapter 00 to Chapter 10 and shipped your capstone",
    icon: "Crown",
    xpReward: 500,
    condition: (p) => {
      const allIds = COURSE_LESSON_CHAIN.map((c) => c.id);
      return allIds.every((id) => !!p.completedLessons?.[id]) && !!p.finalProjectVerified;
    },
  },
];

export const COURSE_LESSON_CHAIN = allChapters.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({
    id: lesson.id,
    chapterId: chapter.id,
    title: lesson.title,
    chapterNumber: chapter.number,
  }))
);

export function calculateSmartResume(progress?: DbProgress) {
  if (!progress) {
    return {
      lastCompletedLesson: null,
      nextLessonId: "ch-00-l-01",
      nextChapterId: "ch-00",
      nextLessonTitle: COURSE_LESSON_CHAIN[0].title,
      nextChapterNumber: "00",
      completedCount: 0,
      totalCount: COURSE_LESSON_CHAIN.length,
      percentComplete: 0,
      isCourseCompleted: false,
    };
  }

  const completedLessons = progress.completedLessons || {};
  let lastCompletedIndex = -1;

  for (let i = 0; i < COURSE_LESSON_CHAIN.length; i++) {
    if (completedLessons[COURSE_LESSON_CHAIN[i].id]) {
      lastCompletedIndex = i;
    }
  }

  const completedCount = Object.keys(completedLessons).filter((id) =>
    COURSE_LESSON_CHAIN.some((c) => c.id === id)
  ).length;
  const totalCount = COURSE_LESSON_CHAIN.length;
  const percentComplete = Math.round((completedCount / totalCount) * 100);

  // If none completed, start at 0. If all completed, point to Capstone
  const nextIndex = lastCompletedIndex < totalCount - 1 ? lastCompletedIndex + 1 : totalCount - 1;
  const nextItem = COURSE_LESSON_CHAIN[nextIndex];
  const lastItem = lastCompletedIndex >= 0 ? COURSE_LESSON_CHAIN[lastCompletedIndex] : null;

  return {
    lastCompletedLesson: lastItem ? lastItem.id : null,
    lastCompletedTitle: lastItem ? lastItem.title : null,
    nextLessonId: nextItem.id,
    nextChapterId: nextItem.chapterId,
    nextLessonTitle: nextItem.title,
    nextChapterNumber: nextItem.chapterNumber,
    completedCount,
    totalCount,
    percentComplete,
    isCourseCompleted: !!progress.courseCompleted || (completedCount === totalCount && !!progress.finalProjectVerified),
  };
}

export function evaluateAchievements(progress: DbProgress): { progress: DbProgress; newlyUnlocked: AchievementDef[] } {
  const newlyUnlocked: AchievementDef[] = [];
  const achievements = { ...(progress.achievements || {}) };
  let bonusXp = 0;

  for (const ach of ACHIEVEMENTS_CATALOG) {
    if (!achievements[ach.id] && ach.condition(progress)) {
      achievements[ach.id] = {
        id: ach.id,
        title: ach.title,
        description: ach.description,
        icon: ach.icon,
        unlockedAt: new Date().toISOString(),
      };
      bonusXp += ach.xpReward;
      newlyUnlocked.push(ach);
    }
  }

  if (newlyUnlocked.length > 0) {
    progress.achievements = achievements;
    progress.xpPoints = (progress.xpPoints || 0) + bonusXp;
  }

  return { progress, newlyUnlocked };
}

export function updateStreakServer(progress: DbProgress): { progress: DbProgress; streakIncreased: boolean } {
  const today = new Date().toISOString().split("T")[0];
  const lastActive = progress.lastActiveDate;

  if (lastActive === today) {
    return { progress, streakIncreased: false };
  }

  if (!lastActive) {
    progress.streakDays = 1;
    progress.lastActiveDate = today;
    return { progress, streakIncreased: true };
  }

  const todayDate = new Date(today);
  const lastDate = new Date(lastActive);
  const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    progress.streakDays = (progress.streakDays || 0) + 1;
  } else if (diffDays > 1) {
    progress.streakDays = 1;
  }
  progress.lastActiveDate = today;

  return { progress, streakIncreased: true };
}

interface Database {
  users: DbUser[];
  sessions: DbSession[];
  progress: DbProgress[];
}

/* ── Helpers ───────────────────────────────────────────── */

function ensureDir() {
  try {
    if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
  } catch (err) {
    console.warn("[DB] Could not create data directory:", err);
  }
}

function load(): Database {
  ensureDir();
  try {
    if (!fs.existsSync(DB_PATH)) {
      const empty: Database = { users: [], sessions: [], progress: [] };
      fs.writeFileSync(DB_PATH, JSON.stringify(empty, null, 2));
      return empty;
    }
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  } catch (err) {
    console.warn("[DB] Load failed, using empty database:", err);
    return { users: [], sessions: [], progress: [] };
  }
}

function save(db: Database) {
  try {
    ensureDir();
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
  } catch (err) {
    console.warn("[DB] Save failed:", err);
  }
}

export function hashPassword(password: string, salt?: string) {
  const s = salt || crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, s, 64).toString("hex");
  return { hash, salt: s };
}

export function generateToken(): string {
  return crypto.randomBytes(48).toString("hex");
}

/* ── User CRUD ─────────────────────────────────────────── */

export function findUserByEmail(email: string): DbUser | undefined {
  return load().users.find((u) => u.email === email);
}

export function findUserById(id: string): DbUser | undefined {
  return load().users.find((u) => u.id === id);
}

export function createUser(
  name: string,
  email: string,
  password: string,
  method: "google" | "email" | "guest" = "email",
  avatar?: string
): DbUser {
  const db = load();
  const { hash, salt } = hashPassword(password);
  const user: DbUser = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash: hash,
    salt,
    avatar: avatar || null,
    method,
    createdAt: new Date().toISOString(),
  };
  db.users.push(user);

  // Create default progress
  db.progress.push({
    userId: user.id,
    completedLessons: {},
    completedChallenges: {},
    completedActivities: {},
    quizScores: {},
    notes: {},
    bookmarks: [],
    xpPoints: 0,
    streakDays: 0,
    lastActiveDate: "",
    claimedMilestones: ["milestone-100"],
  });

  save(db);
  return user;
}

/* ── Session CRUD ──────────────────────────────────────── */

export function createSession(userId: string): DbSession {
  const db = load();
  const token = generateToken();
  const now = new Date();
  const session: DbSession = {
    token,
    userId,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
  };
  // Remove old sessions for this user
  db.sessions = db.sessions.filter((s) => s.userId !== userId);
  db.sessions.push(session);
  save(db);
  return session;
}

export function findSession(token: string): DbSession | undefined {
  const db = load();
  const session = db.sessions.find((s) => s.token === token);
  if (session && new Date(session.expiresAt) > new Date()) return session;
  return undefined;
}

export function deleteSession(token: string) {
  const db = load();
  db.sessions = db.sessions.filter((s) => s.token !== token);
  save(db);
}

/* ── Progress CRUD ─────────────────────────────────────── */

export function getProgress(userId: string): DbProgress {
  const db = load();
  let prog = db.progress.find((p) => p.userId === userId);
  if (!prog) {
    prog = {
      userId,
      completedLessons: {},
      completedChallenges: {},
      completedActivities: {},
      practiceCompletions: {},
      lessonCompletions: {},
      quizScores: {},
      notes: {},
      bookmarks: [],
      xpPoints: 0,
      streakDays: 0,
      lastActiveDate: "",
      claimedMilestones: ["milestone-100"],
      achievements: {},
      finalProjectSubmitted: false,
      finalProjectVerified: false,
      courseCompleted: false,
    };
    db.progress.push(prog);
    save(db);
    return prog;
  }

  // Ensure default structures are safe
  if (!prog.completedLessons) prog.completedLessons = {};
  if (!prog.completedChallenges) prog.completedChallenges = {};
  if (!prog.completedActivities) prog.completedActivities = {};
  if (!prog.practiceCompletions) prog.practiceCompletions = {};
  if (!prog.lessonCompletions) prog.lessonCompletions = {};
  if (!prog.quizScores) prog.quizScores = {};
  if (!prog.notes) prog.notes = {};
  if (!prog.bookmarks) prog.bookmarks = [];
  if (!prog.achievements) prog.achievements = {};

  return prog;
}

export function updateProgress(userId: string, updates: Partial<DbProgress>): DbProgress {
  const db = load();
  const idx = db.progress.findIndex((p) => p.userId === userId);
  if (idx === -1) {
    const fresh: DbProgress = {
      userId,
      completedLessons: {},
      completedChallenges: {},
      completedActivities: {},
      practiceCompletions: {},
      lessonCompletions: {},
      quizScores: {},
      notes: {},
      bookmarks: [],
      xpPoints: 0,
      streakDays: 0,
      lastActiveDate: "",
      claimedMilestones: ["milestone-100"],
      achievements: {},
      finalProjectSubmitted: false,
      finalProjectVerified: false,
      courseCompleted: false,
      ...updates,
    };
    db.progress.push(fresh);
    save(db);
    return fresh;
  }
  db.progress[idx] = { ...db.progress[idx], ...updates };
  save(db);
  return db.progress[idx];
}

/* ── Cleanup ───────────────────────────────────────────── */

export function cleanupExpiredSessions() {
  const db = load();
  const now = new Date();
  db.sessions = db.sessions.filter((s) => new Date(s.expiresAt) > now);
  save(db);
}
