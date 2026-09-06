/**
 * WebZoneBW File-Based Database
 * JSON file storage — no external dependencies.
 * Swap for PostgreSQL / SQLite in production.
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";

const DB_PATH = path.join(process.cwd(), "data", "webzonebw.json");

/* ── Types ─────────────────────────────────────────────── */

export interface DbUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  avatar: string | null;
  method: "google" | "email";
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
  quizScores: Record<string, number>;
  notes: Record<string, string>;
  bookmarks: string[];
  xpPoints: number;
  streakDays: number;
  lastActiveDate: string;
  claimedMilestones: string[];
}

interface Database {
  users: DbUser[];
  sessions: DbSession[];
  progress: DbProgress[];
}

/* ── Helpers ───────────────────────────────────────────── */

function ensureDir() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function load(): Database {
  ensureDir();
  if (!fs.existsSync(DB_PATH)) {
    const empty: Database = { users: [], sessions: [], progress: [] };
    fs.writeFileSync(DB_PATH, JSON.stringify(empty, null, 2));
    return empty;
  }
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

function save(db: Database) {
  ensureDir();
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
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
  method: "google" | "email" = "email",
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

export function getProgress(userId: string): DbProgress | undefined {
  return load().progress.find((p) => p.userId === userId);
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
      quizScores: {},
      notes: {},
      bookmarks: [],
      xpPoints: 0,
      streakDays: 0,
      lastActiveDate: "",
      claimedMilestones: ["milestone-100"],
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
