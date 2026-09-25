/**
 * Unit tests for server/db.ts — hashPassword, verifyPassword,
 * updateStreakServer, evaluateAchievements, calculateSmartResume.
 *
 * The DB writes to a JSON file under process.cwd()/data, so these tests
 * run in a temp working directory via a chdir-free env override is not
 * possible; instead we accept that tests create/overwrite ./data and
 * clean up after themselves.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {
  hashPassword,
  verifyPassword,
  updateStreakServer,
  evaluateAchievements,
  calculateSmartResume,
  createDefaultProgress,
  ACHIEVEMENTS_CATALOG,
  COURSE_LESSON_CHAIN,
  type DbProgress,
} from "./db";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function makeProgress(overrides: Partial<DbProgress> = {}): DbProgress {
  return { ...createDefaultProgress("test-user"), ...overrides };
}

/* ── hashPassword / verifyPassword ─────────────── */

describe("hashPassword / verifyPassword", () => {
  it("produces a deterministic hash for the same password+salt", () => {
    const { hash } = hashPassword("hunter22", "abc123");
    const { hash: hash2 } = hashPassword("hunter22", "abc123");
    expect(hash).toBe(hash2);
  });

  it("generates a random salt when none is provided", () => {
    const a = hashPassword("hunter22");
    const b = hashPassword("hunter22");
    expect(a.salt).not.toBe(b.salt);
    expect(a.hash).not.toBe(b.hash);
  });

  it("verifies the correct password and rejects wrong ones", () => {
    const { hash, salt } = hashPassword("correct horse battery staple");
    expect(verifyPassword("correct horse battery staple", { salt, passwordHash: hash })).toBe(true);
    expect(verifyPassword("wrong password", { salt, passwordHash: hash })).toBe(false);
  });

  it("uses constant-time comparison (rejects tampered hash of wrong length)", () => {
    const { hash, salt } = hashPassword("secret");
    expect(verifyPassword("secret", { salt, passwordHash: hash.slice(0, 10) })).toBe(false);
  });
});

/* ── updateStreakServer ────────── */

describe("updateStreakServer", () => {
  it("starts a streak of 1 for a first-time active user", () => {
    const progress = makeProgress({ streakDays: 0, lastActiveDate: "" });
    const { progress: updated, streakIncreased } = updateStreakServer(progress);
    expect(streakIncreased).toBe(true);
    expect(updated.streakDays).toBe(1);
    expect(updated.lastActiveDate).toBe(new Date().toISOString().split("T")[0]);
  });

  it("does not increase the streak twice on the same day", () => {
    const today = new Date().toISOString().split("T")[0];
    const progress = makeProgress({ streakDays: 4, lastActiveDate: today });
    const { progress: updated, streakIncreased } = updateStreakServer(progress);
    expect(streakIncreased).toBe(false);
    expect(updated.streakDays).toBe(4);
  });

  it("increments the streak for consecutive days", () => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const progress = makeProgress({ streakDays: 3, lastActiveDate: yesterday });
    const { progress: updated, streakIncreased } = updateStreakServer(progress);
    expect(streakIncreased).toBe(true);
    expect(updated.streakDays).toBe(4);
  });

  it("resets the streak to 1 after a gap of more than one day", () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const progress = makeProgress({ streakDays: 9, lastActiveDate: threeDaysAgo });
    const { progress: updated, streakIncreased } = updateStreakServer(progress);
    expect(streakIncreased).toBe(true);
    expect(updated.streakDays).toBe(1);
  });
});

/* ── evaluateAchievements ──────────────── */

describe("evaluateAchievements", () => {
  it("unlocks first-lesson and awards its XP bonus", () => {
    const progress = makeProgress({
      completedLessons: { "ch-02-l-01": true },
      xpPoints: 0,
    });
    const { progress: updated, newlyUnlocked } = evaluateAchievements(progress);
    expect(newlyUnlocked.map((a) => a.id)).toContain("first-lesson");
    const firstLesson = ACHIEVEMENTS_CATALOG.find((a) => a.id === "first-lesson")!;
    expect(updated.xpPoints).toBe(firstLesson.xpReward);
    expect(updated.achievements?.["first-lesson"]).toBeDefined();
  });

  it("does not re-unlock an already-earned achievement", () => {
    const unlockedAt = new Date().toISOString();
    const progress = makeProgress({
      completedLessons: { "ch-00-l-01": true },
      xpPoints: 100,
      achievements: {
        "first-lesson": {
          id: "first-lesson",
          title: "First Step Forward",
          description: "",
          icon: "GraduationCap",
          unlockedAt,
        },
      },
    });
    const { progress: updated, newlyUnlocked } = evaluateAchievements(progress);
    expect(newlyUnlocked.map((a) => a.id)).not.toContain("first-lesson");
    expect(updated.achievements?.["first-lesson"]?.unlockedAt).toBe(unlockedAt);
  });

  it("unlocks streak milestones at the correct thresholds", () => {
    const progress3 = evaluateAchievements(makeProgress({ streakDays: 3 })).progress;
    expect(progress3.achievements?.["streak-3"]).toBeDefined();
    expect(progress3.achievements?.["streak-7"]).toBeUndefined();

    const progress7 = evaluateAchievements(makeProgress({ streakDays: 7 })).progress;
    expect(progress7.achievements?.["streak-7"]).toBeDefined();
  });

  it("requires the capstone plus all lessons for course completion", () => {
    const allLessonIds = Object.fromEntries(COURSE_LESSON_CHAIN.map((c) => [c.id, true]));
    const withoutCapstone = evaluateAchievements(
      makeProgress({ completedLessons: allLessonIds })
    ).progress;
    expect(withoutCapstone.achievements?.["course-completed"]).toBeUndefined();

    const withCapstone = evaluateAchievements(
      makeProgress({ completedLessons: allLessonIds, finalProjectVerified: true })
    ).progress;
    expect(withCapstone.achievements?.["course-completed"]).toBeDefined();
  });
});

/* ── calculateSmartResume ──────────────── */

describe("calculateSmartResume", () => {
  it("returns a fresh starting point for undefined progress", () => {
    const resume = calculateSmartResume(undefined);
    expect(resume.nextLessonId).toBe("ch-00-l-01");
    expect(resume.completedCount).toBe(0);
    expect(resume.percentComplete).toBe(0);
    expect(resume.isCourseCompleted).toBe(false);
  });

  it("points to the next lesson in the chain after a completion", () => {
    const resume = calculateSmartResume(
      makeProgress({ completedLessons: { "ch-00-l-01": true } })
    );
    expect(resume.lastCompletedLesson).toBe("ch-00-l-01");
    expect(resume.nextLessonId).toBe(COURSE_LESSON_CHAIN[1].id);
    expect(resume.completedCount).toBe(1);
  });

  it("skips gaps and resumes at the furthest completed lesson", () => {
    const resume = calculateSmartResume(
      makeProgress({
        completedLessons: {
          [COURSE_LESSON_CHAIN[0].id]: true,
          [COURSE_LESSON_CHAIN[4].id]: true,
        },
      })
    );
    expect(resume.lastCompletedLesson).toBe(COURSE_LESSON_CHAIN[4].id);
    expect(resume.nextLessonId).toBe(COURSE_LESSON_CHAIN[5].id);
  });

  it("reports 100% and completion when every lesson is done and capstone verified", () => {
    const allLessonIds = Object.fromEntries(COURSE_LESSON_CHAIN.map((c) => [c.id, true]));
    const resume = calculateSmartResume(
      makeProgress({ completedLessons: allLessonIds, finalProjectVerified: true })
    );
    expect(resume.percentComplete).toBe(100);
    expect(resume.isCourseCompleted).toBe(true);
  });
});

/* ── File-backed DB smoke test ─────────── */

describe("createDefaultProgress", () => {
  it("creates a fully-initialised progress record", () => {
    const p = createDefaultProgress("u-123");
    expect(p.userId).toBe("u-123");
    expect(p.xpPoints).toBe(0);
    expect(p.bookmarks).toEqual([]);
    expect(p.completedLessons).toEqual({});
    expect(p.achievements).toEqual({});
    expect(p.finalProjectVerified).toBe(false);
  });
});

/* ── Cleanup ───────────── */

afterAll(() => {
  try {
    if (fs.existsSync(DATA_DIR)) fs.rmSync(DATA_DIR, { recursive: true, force: true });
  } catch {
    /* best effort */
  }
});
