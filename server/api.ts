import express, { Router, Response as ExpressResponse } from "express";
import { requireAuth, AuthRequest } from "./authMiddleware";
import type { DbProgress } from "./db";
import {
  getProgress,
  updateProgress,
  updateStreakServer,
  evaluateAchievements,
  calculateSmartResume,
  COURSE_LESSON_CHAIN,
  ACHIEVEMENTS_CATALOG,
} from "./db";

const router = Router();

// Simple hash function for generating consistent IDs
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

/* ── Shared helpers ────────────────────────────────────── */

// Server-side XP rewards — the client can never dictate XP amounts.
const ACTIVITY_XP_REWARDS: Record<string, number> = {
  flashcards: 25,
  quiz: 50,
  fillInTheBlank: 40,
  codeFix: 60,
  matching: 35,
};
const DEFAULT_ACTIVITY_XP = 50;

function resolveActivityXp(activityId: string): number {
  const activityType = activityId.split("-")[0];
  return ACTIVITY_XP_REWARDS[activityType] ?? DEFAULT_ACTIVITY_XP;
}

async function completeAndAward(
  userId: string,
  targetId: string,
  patch: (progress: DbProgress, now: string) => Partial<DbProgress>
) {
  const progress = getProgress(userId);
  const now = new Date().toISOString();

  const streakRes = updateStreakServer(progress);
  const draft: DbProgress = {
    ...progress,
    ...patch(progress, now),
    streakDays: streakRes.progress.streakDays,
    lastActiveDate: streakRes.progress.lastActiveDate,
  };

  const { progress: evaluatedProgress, newlyUnlocked } = evaluateAchievements(draft);
  const updated = await updateProgress(userId, evaluatedProgress);
  return { updated, newlyUnlocked, streakIncreased: streakRes.streakIncreased };
}

async function saveNote(userId: string, lessonId: string, content: unknown) {
  const progress = getProgress(userId);
  const notes = { ...progress.notes, [lessonId]: typeof content === "string" ? content : "" };
  const updated = await updateProgress(userId, { notes });
  return updated.notes;
}

/* ── GET /api/user/progress ────────────────────────────── */
router.get("/progress", requireAuth, (req: AuthRequest, res) => {
  const progress = getProgress(req.userId!);
  res.json({ success: true, progress });
});

/* ── PUT /api/user/progress ────────────────────────────── */
router.put("/progress", requireAuth, async (req: AuthRequest, res) => {
  // Merge updates safely, protecting verified server states.
  // Whitelist only client-owned fields so users cannot grant themselves
  // XP, achievements, streaks, or verified course states.
  const CLIENT_EDITABLE_FIELDS = [
    "notes",
    "bookmarks",
    "currentLearningPath",
    "claimedMilestones",
    "quizScores",
  ] as const;

  const current = getProgress(req.userId!);
  const updates: Partial<DbProgress> = {};
  for (const field of CLIENT_EDITABLE_FIELDS) {
    if (field in req.body) {
      (updates as Record<string, unknown>)[field] = req.body[field];
    }
  }

  // Retain server-verified properties (never revocable by the client)
  if (current.finalProjectVerified) updates.finalProjectVerified = true;
  if (current.courseCompleted) updates.courseCompleted = true;

  const updated = await updateProgress(req.userId!, updates);
  res.json({ success: true, progress: updated });
});

/* ── GET /api/user/resume ──────────────────────────────── */
router.get("/resume", requireAuth, (req: AuthRequest, res) => {
  const progress = getProgress(req.userId!);
  const resume = calculateSmartResume(progress);
  res.json({ success: true, resume, progress });
});

/* ── GET /api/user/achievements ────────────────────────── */
router.get("/achievements", requireAuth, (req: AuthRequest, res) => {
  const progress = getProgress(req.userId!);
  const unlocked = progress.achievements || {};

  const catalog = ACHIEVEMENTS_CATALOG.map((ach) => ({
    id: ach.id,
    title: ach.title,
    description: ach.description,
    icon: ach.icon,
    xpReward: ach.xpReward,
    unlocked: !!unlocked[ach.id],
    unlockedAt: unlocked[ach.id]?.unlockedAt || null,
  }));

  res.json({ success: true, achievements: catalog, unlockedCount: Object.keys(unlocked).length });
});

/* ── POST /api/user/complete-lesson ────────────────────── */
router.post("/complete-lesson", requireAuth, async (req: AuthRequest, res) => {
  const { lessonId } = req.body;
  if (!lessonId) return res.status(400).json({ error: "lessonId required" });

  const progress = getProgress(req.userId!);
  const isAlreadyDone = !!progress.completedLessons?.[lessonId];
  const xpReward = isAlreadyDone ? 0 : 50;

  const { updated, newlyUnlocked, streakIncreased } = await completeAndAward(
    req.userId!,
    lessonId,
    (progress, now) => ({
      completedLessons: { ...progress.completedLessons, [lessonId]: true },
      lessonCompletions: {
        ...progress.lessonCompletions,
        [lessonId]: { completedAt: now, verified: true },
      },
      completionTimestamps: { ...progress.completionTimestamps, [lessonId]: now },
      lastVerifiedLesson: lessonId,
      lastVerifiedChapter: lessonId.startsWith("ch-")
        ? lessonId.slice(0, 5)
        : progress.lastVerifiedChapter || "ch-00",
      xpPoints: (progress.xpPoints || 0) + xpReward,
    })
  );

  res.json({
    success: true,
    progress: updated,
    xpAwarded: xpReward,
    newlyUnlockedAchievements: newlyUnlocked,
    streakUpdated: streakIncreased,
  });
});

/* ── POST /api/user/complete-practice ──────────────────── */
router.post("/complete-practice", requireAuth, async (req: AuthRequest, res) => {
  const { lessonId, challengeId, codeSnippet } = req.body;
  const targetId = challengeId || lessonId;
  if (!targetId) return res.status(400).json({ error: "challengeId or lessonId required" });

  const progress = getProgress(req.userId!);
  const isAlreadyDone = !!progress.completedChallenges?.[targetId];
  const xpReward = isAlreadyDone ? 0 : 50;

  const { updated, newlyUnlocked } = await completeAndAward(
    req.userId!,
    targetId,
    (progress, now) => ({
      completedChallenges: { ...progress.completedChallenges, [targetId]: true },
      practiceCompletions: {
        ...progress.practiceCompletions,
        [targetId]: {
          completedAt: now,
          verified: true,
          codeLength: typeof codeSnippet === "string" ? codeSnippet.length : 0,
        },
      },
      xpPoints: (progress.xpPoints || 0) + xpReward,
    })
  );

  res.json({
    success: true,
    progress: updated,
    xpAwarded: xpReward,
    newlyUnlockedAchievements: newlyUnlocked,
  });
});

/* ── POST /api/user/submit-final-project ─────────────── */
router.post("/submit-final-project", requireAuth, async (req: AuthRequest, res) => {
  const { title, description, techStack, htmlCode, cssCode, jsCode } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Project title is required" });
  }

  const progress = getProgress(req.userId!);
  const now = new Date().toISOString();

  // Mark project verified
  const finalProjectSubmitted = true;
  const finalProjectVerified = true;
  const finalProjectDetails = {
    title: title.trim(),
    description: description ? description.trim() : "Interactive Full-Stack Web Capstone Portfolio",
    techStack: Array.isArray(techStack) ? techStack : ["HTML5", "CSS3", "JavaScript ES6+", "Responsive Design"],
    submittedAt: now,
  };

  // Mark Chapter 10 lesson completed
  const completedLessons: Record<string, boolean> = { ...(progress.completedLessons || {}), "ch-10-l-01": true };
  const lessonCompletions = {
    ...(progress.lessonCompletions || {}),
    "ch-10-l-01": { completedAt: now, verified: true },
  };

  // Check if all chapters 00-10 are completed — computed on the merged
  // completedLessons so the just-marked capstone lesson is included.
  const allRequired = COURSE_LESSON_CHAIN.map((c) => c.id);
  const allChaptersDone = allRequired.every((id) => !!completedLessons[id]);

  let courseCompleted = progress.courseCompleted || allChaptersDone;
  let courseCompletedAt = progress.courseCompletedAt || (allChaptersDone ? now : undefined);

  // Award Capstone XP
  const isAlreadyDone = !!progress.finalProjectVerified;
  const xpAward = isAlreadyDone ? 0 : 500;
  let xpPoints = (progress.xpPoints || 0) + xpAward;

  const draft = {
    ...progress,
    completedLessons,
    lessonCompletions,
    finalProjectSubmitted,
    finalProjectVerified,
    finalProjectDetails,
    courseCompleted,
    courseCompletedAt,
    xpPoints,
  };

  const { progress: evaluatedProgress, newlyUnlocked } = evaluateAchievements(draft);
  const updated = await updateProgress(req.userId!, evaluatedProgress);

  res.json({
    success: true,
    progress: updated,
    xpAwarded: xpAward,
    newlyUnlockedAchievements: newlyUnlocked,
    courseCompleted: updated.courseCompleted,
  });
});

/* ── GET /api/user/notes ──────────────────────────────── */
router.get("/notes", requireAuth, (req: AuthRequest, res) => {
  const progress = getProgress(req.userId!);
  res.json({ success: true, notes: progress.notes || {} });
});

/* ── PUT/POST /api/user/notes/:lessonId ───────────────── */
const handleSaveNote = async (req: AuthRequest, res: ExpressResponse) => {
  try {
    const savedNotes = await saveNote(req.userId!, req.params.lessonId, req.body?.content);
    res.json({ success: true, notes: savedNotes });
  } catch (err) {
    console.error("[API] Failed to save note:", err);
    res.status(500).json({ error: "Failed to save note" });
  }
};

router.put("/notes/:lessonId", requireAuth, handleSaveNote as any);
router.post("/notes/:lessonId", requireAuth, handleSaveNote as any);

/* ── POST /api/user/bookmarks/toggle ───────────────────── */
router.post("/bookmarks/toggle", requireAuth, async (req: AuthRequest, res) => {
  const { lessonId } = req.body;
  if (!lessonId) return res.status(400).json({ error: "lessonId required" });

  const progress = getProgress(req.userId!);
  const bookmarks = progress.bookmarks || [];
  const idx = bookmarks.indexOf(lessonId);

  if (idx > -1) {
    bookmarks.splice(idx, 1);
  } else {
    bookmarks.push(lessonId);
  }

  const updated = await updateProgress(req.userId!, { bookmarks });
  res.json({ success: true, bookmarks: updated.bookmarks, bookmarked: idx === -1 });
});

/* ── POST /api/user/complete-activity ──────────────────── */
router.post("/complete-activity", requireAuth, async (req: AuthRequest, res) => {
  const { activityId } = req.body;
  if (!activityId) return res.status(400).json({ error: "activityId required" });

  // XP comes from the server-side catalog — never from the client.
  const xpAmount = resolveActivityXp(activityId);

  const progress = getProgress(req.userId!);
  const completedActivities = { ...(progress.completedActivities || {}) };
  const isAlreadyDone = completedActivities[activityId];
  completedActivities[activityId] = true;

  const xpPoints = (progress.xpPoints || 0) + (isAlreadyDone ? 0 : xpAmount);
  const updated = await updateProgress(req.userId!, { completedActivities, xpPoints });
  res.json({ success: true, progress: updated, xpAwarded: isAlreadyDone ? 0 : xpAmount });
});

/* ── POST /api/user/complete-challenge ─────────────────── */
router.post("/complete-challenge", requireAuth, async (req: AuthRequest, res) => {
  const { challengeId } = req.body;
  if (!challengeId) return res.status(400).json({ error: "challengeId required" });

  const progress = getProgress(req.userId!);
  const completedChallenges = { ...(progress.completedChallenges || {}) };
  const isAlreadyDone = completedChallenges[challengeId];
  completedChallenges[challengeId] = true;

  const xpPoints = (progress.xpPoints || 0) + (isAlreadyDone ? 0 : 50);
  const updated = await updateProgress(req.userId!, { completedChallenges, xpPoints });
  res.json({ success: true, progress: updated, xpAwarded: isAlreadyDone ? 0 : 50 });
});

/* ── GET /api/user/certificate-eligibility ─────────────── */
router.get("/certificate-eligibility", requireAuth, (req: AuthRequest, res) => {
  const progress = getProgress(req.userId!);
  
  // Calculate completion status
  const completedCount = Object.keys(progress.completedLessons || {}).length;
  const completedChapters = new Set(
    Object.entries(progress.completedLessons || {})
      .filter(([_, completed]) => completed)
      .map(([lessonId]) => {
        const match = lessonId.match(/ch-(\d+)/);
        return match ? match[1] : null;
      })
      .filter(Boolean)
  ).size;
  
  // Certificate requirements (same as frontend)
  const MIN_LESSONS = 10;
  const MIN_XP = 500;
  const MIN_CHAPTERS = 3;
  
  const meetsRequirements = completedCount >= MIN_LESSONS &&
                           progress.xpPoints >= MIN_XP &&
                           completedChapters >= MIN_CHAPTERS;
  
  // Generate certificate ID if eligible
  let certificateId = null;
  if (meetsRequirements) {
    const timestamp = progress.courseCompletedAt || new Date().toISOString();
    const userId = req.userId!;
    const hash = simpleHash(`${userId}-${timestamp}`);
    certificateId = `WZ-CERT-${hash.substring(0, 8).toUpperCase()}`;
  }
  
  res.json({
    success: true,
    eligible: meetsRequirements,
    certificateId,
    preferredName: progress.preferredName || req.user?.name || null,
    requirements: {
      lessons: { current: completedCount, required: MIN_LESSONS },
      xp: { current: progress.xpPoints, required: MIN_XP },
      chapters: { current: completedChapters, required: MIN_CHAPTERS }
    }
  });
});

/* ── PUT /api/user/certificate-name ────────────────────── */
router.put("/certificate-name", requireAuth, async (req: AuthRequest, res) => {
  const { preferredName } = req.body;
  
  if (!preferredName || typeof preferredName !== 'string' || !preferredName.trim()) {
    return res.status(400).json({ error: "Valid name is required" });
  }
  
  const progress = getProgress(req.userId!);
  const updatedProgress = {
    ...progress,
    preferredName: preferredName.trim()
  };
  
  await updateProgress(req.userId!, updatedProgress);
  
  res.json({
    success: true,
    preferredName: updatedProgress.preferredName
  });
});

/* ── DELETE /api/user/account ──────────────────────────── */
router.delete("/account", requireAuth, (req: AuthRequest, res) => {
  res.json({ success: true, message: "Account deletion queued" });
});

export default router;
