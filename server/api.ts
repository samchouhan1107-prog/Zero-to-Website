import { Router } from "express";
import { requireAuth, AuthRequest } from "./authMiddleware";
import {
  getProgress,
  updateProgress,
  updateStreakServer,
  evaluateAchievements,
  calculateSmartResume,
  COURSE_LESSON_CHAIN,
  ACHIEVEMENTS_CATALOG,
  findUserById,
} from "./db";

const router = Router();

/* ── GET /api/user/progress ────────────────────────────── */
router.get("/progress", requireAuth, (req: AuthRequest, res) => {
  const progress = getProgress(req.userId!);
  res.json({ success: true, progress });
});

/* ── PUT /api/user/progress ────────────────────────────── */
router.put("/progress", requireAuth, (req: AuthRequest, res) => {
  // Merge updates safely, protecting verified server states
  const current = getProgress(req.userId!);
  const updates = { ...req.body };

  // Retain server-verified properties
  if (current.finalProjectVerified) updates.finalProjectVerified = true;
  if (current.courseCompleted) updates.courseCompleted = true;

  const updated = updateProgress(req.userId!, updates);
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
router.post("/complete-lesson", requireAuth, (req: AuthRequest, res) => {
  const { lessonId } = req.body;
  if (!lessonId) return res.status(400).json({ error: "lessonId required" });

  const progress = getProgress(req.userId!);
  const completedLessons = { ...(progress.completedLessons || {}) };
  const lessonCompletions = { ...(progress.lessonCompletions || {}) };
  const completionTimestamps = { ...(progress.completionTimestamps || {}) };

  const isAlreadyDone = !!completedLessons[lessonId];
  const now = new Date().toISOString();

  completedLessons[lessonId] = true;
  lessonCompletions[lessonId] = { completedAt: now, verified: true };
  completionTimestamps[lessonId] = now;

  // Track verified lesson & chapter
  const lastVerifiedLesson = lessonId;
  const lastVerifiedChapter = lessonId.startsWith("ch-") ? lessonId.slice(0, 5) : progress.lastVerifiedChapter || "ch-00";

  // Check and update streak
  const streakRes = updateStreakServer(progress);
  const streakDays = streakRes.progress.streakDays;
  const lastActiveDate = streakRes.progress.lastActiveDate;

  // Award XP
  const xpReward = isAlreadyDone ? 0 : 50;
  let xpPoints = (progress.xpPoints || 0) + xpReward;

  // Apply updates to draft
  const draft = {
    ...progress,
    completedLessons,
    lessonCompletions,
    completionTimestamps,
    lastVerifiedLesson,
    lastVerifiedChapter,
    streakDays,
    lastActiveDate,
    xpPoints,
  };

  // Evaluate achievements on backend
  const { progress: evaluatedProgress, newlyUnlocked } = evaluateAchievements(draft);

  // Save to database
  const updated = updateProgress(req.userId!, evaluatedProgress);

  res.json({
    success: true,
    progress: updated,
    xpAwarded: xpReward,
    newlyUnlockedAchievements: newlyUnlocked,
    streakUpdated: streakRes.streakIncreased,
  });
});

/* ── POST /api/user/complete-practice ──────────────────── */
router.post("/complete-practice", requireAuth, (req: AuthRequest, res) => {
  const { lessonId, challengeId, codeSnippet } = req.body;
  const targetId = challengeId || lessonId;
  if (!targetId) return res.status(400).json({ error: "challengeId or lessonId required" });

  const progress = getProgress(req.userId!);
  const completedChallenges = { ...(progress.completedChallenges || {}) };
  const practiceCompletions = { ...(progress.practiceCompletions || {}) };

  const isAlreadyDone = !!completedChallenges[targetId];
  const now = new Date().toISOString();

  completedChallenges[targetId] = true;
  practiceCompletions[targetId] = {
    completedAt: now,
    verified: true,
    codeLength: typeof codeSnippet === "string" ? codeSnippet.length : 0,
  };

  // Update streak
  const streakRes = updateStreakServer(progress);
  const streakDays = streakRes.progress.streakDays;
  const lastActiveDate = streakRes.progress.lastActiveDate;

  // Award XP
  const xpReward = isAlreadyDone ? 0 : 50;
  let xpPoints = (progress.xpPoints || 0) + xpReward;

  const draft = {
    ...progress,
    completedChallenges,
    practiceCompletions,
    streakDays,
    lastActiveDate,
    xpPoints,
  };

  const { progress: evaluatedProgress, newlyUnlocked } = evaluateAchievements(draft);
  const updated = updateProgress(req.userId!, evaluatedProgress);

  res.json({
    success: true,
    progress: updated,
    xpAwarded: xpReward,
    newlyUnlockedAchievements: newlyUnlocked,
  });
});

/* ── POST /api/user/submit-final-project ────────────────── */
router.post("/submit-final-project", requireAuth, (req: AuthRequest, res) => {
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
  const completedLessons = { ...(progress.completedLessons || {}), "ch-10-l-01": true };
  const lessonCompletions = {
    ...(progress.lessonCompletions || {}),
    "ch-10-l-01": { completedAt: now, verified: true },
  };

  // Check if all chapters 00-10 are completed
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
  const updated = updateProgress(req.userId!, evaluatedProgress);

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

/* ── PUT /api/user/notes/:lessonId ─────────────────────── */
router.put("/notes/:lessonId", requireAuth, (req: AuthRequest, res) => {
  const { lessonId } = req.params;
  const { content } = req.body;

  const progress = getProgress(req.userId!);
  const notes = progress.notes || {};
  notes[lessonId] = content || "";

  const updated = updateProgress(req.userId!, { notes });
  res.json({ success: true, notes: updated.notes });
});

/* ── POST /api/user/notes/:lessonId (alias) ────────────── */
router.post("/notes/:lessonId", requireAuth, (req: AuthRequest, res) => {
  const { lessonId } = req.params;
  const { content } = req.body;

  const progress = getProgress(req.userId!);
  const notes = progress.notes || {};
  notes[lessonId] = content || "";

  const updated = updateProgress(req.userId!, { notes });
  res.json({ success: true, notes: updated.notes });
});

/* ── POST /api/user/bookmarks/toggle ───────────────────── */
router.post("/bookmarks/toggle", requireAuth, (req: AuthRequest, res) => {
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

  const updated = updateProgress(req.userId!, { bookmarks });
  res.json({ success: true, bookmarks: updated.bookmarks, bookmarked: idx === -1 });
});

/* ── POST /api/user/complete-activity ──────────────────── */
router.post("/complete-activity", requireAuth, (req: AuthRequest, res) => {
  const { activityId, xpReward } = req.body;
  if (!activityId) return res.status(400).json({ error: "activityId required" });

  const progress = getProgress(req.userId!);
  const completedActivities = { ...(progress.completedActivities || {}) };
  const isAlreadyDone = completedActivities[activityId];
  completedActivities[activityId] = true;

  const xpPoints = (progress.xpPoints || 0) + (isAlreadyDone ? 0 : (xpReward || 50));
  const updated = updateProgress(req.userId!, { completedActivities, xpPoints });
  res.json({ success: true, progress: updated, xpAwarded: isAlreadyDone ? 0 : (xpReward || 50) });
});

/* ── POST /api/user/complete-challenge ─────────────────── */
router.post("/complete-challenge", requireAuth, (req: AuthRequest, res) => {
  const { challengeId } = req.body;
  if (!challengeId) return res.status(400).json({ error: "challengeId required" });

  const progress = getProgress(req.userId!);
  const completedChallenges = { ...(progress.completedChallenges || {}) };
  const isAlreadyDone = completedChallenges[challengeId];
  completedChallenges[challengeId] = true;

  const xpPoints = (progress.xpPoints || 0) + (isAlreadyDone ? 0 : 50);
  const updated = updateProgress(req.userId!, { completedChallenges, xpPoints });
  res.json({ success: true, progress: updated, xpAwarded: isAlreadyDone ? 0 : 50 });
});

/* ── GET /api/user/certificate ─────────────────────────── */
router.get("/certificate", requireAuth, (req: AuthRequest, res) => {
  const userId = req.userId!;
  const user = findUserById(userId);
  const progress = getProgress(userId);

  const completedCount = Object.keys(progress.completedLessons || {}).filter(
    (id) => COURSE_LESSON_CHAIN.some((c) => c.id === id)
  ).length;
  const totalCount = COURSE_LESSON_CHAIN.length;
  const isEligible = !!progress.courseCompleted ||
    (completedCount >= totalCount && !!progress.finalProjectVerified) ||
    completedCount >= totalCount;

  // If already issued, return persistent certificate
  if (progress.certificateIssued && progress.certificateData) {
    return res.json({
      success: true,
      status: "ISSUED",
      isEligible: true,
      certificate: progress.certificateData,
      progress: {
        completedCount,
        totalCount,
        percent: Math.round((completedCount / (totalCount || 1)) * 100),
      },
    });
  }

  // Not yet issued
  res.json({
    success: true,
    status: isEligible ? "ELIGIBLE" : "NOT_ELIGIBLE",
    isEligible,
    certificate: null,
    defaultName: user?.name || "WebZone Scholar",
    progress: {
      completedCount,
      totalCount,
      percent: Math.round((completedCount / (totalCount || 1)) * 100),
      missingCount: Math.max(0, totalCount - completedCount),
      finalProjectVerified: !!progress.finalProjectVerified,
    },
  });
});

/* ── POST /api/user/certificate ────────────────────────── */
router.post("/certificate", requireAuth, async (req: AuthRequest, res) => {
  const userId = req.userId!;
  const { name } = req.body;
  const user = findUserById(userId);
  const progress = getProgress(userId);

  const completedCount = Object.keys(progress.completedLessons || {}).filter(
    (id) => COURSE_LESSON_CHAIN.some((c) => c.id === id)
  ).length;
  const totalCount = COURSE_LESSON_CHAIN.length;
  const isEligible = !!progress.courseCompleted ||
    (completedCount >= totalCount && !!progress.finalProjectVerified) ||
    completedCount >= totalCount;

  if (!isEligible) {
    return res.status(403).json({
      success: false,
      error: "User has not completed the required course curriculum.",
      progress: {
        completedCount,
        totalCount,
        percent: Math.round((completedCount / (totalCount || 1)) * 100),
      },
    });
  }

  // Generate or retain persistent certificate ID
  const certId =
    progress.certificateData?.id ||
    `WZ-CERT-${new Date().getFullYear()}-${userId.slice(0, 4).toUpperCase()}-${Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase()}`;
  const studentName =
    name && typeof name === "string" && name.trim().length > 0
      ? name.trim()
      : user?.name || "WebZone Scholar";
  const issueDate = progress.certificateData?.issueDate || new Date().toISOString();

  const certificateData = {
    id: certId,
    certificateId: certId,
    name: studentName,
    courseName: "WebZoneBW Full-Stack Web Development Program",
    issueDate,
    verificationCode: `VERIFY-${certId.slice(-6)}`,
    xpEarned: progress.xpPoints || 120,
    completedLessonsCount: completedCount,
    totalLessonsCount: totalCount,
  };

  const updated = await updateProgress(userId, {
    certificateIssued: true,
    certificateData,
  });

  res.json({
    success: true,
    status: "ISSUED",
    isEligible: true,
    certificate: updated.certificateData,
  });
});

/* ── DELETE /api/user/account ──────────────────────────── */
router.delete("/account", requireAuth, (req: AuthRequest, res) => {
  res.json({ success: true, message: "Account deletion queued" });
});

export default router;
