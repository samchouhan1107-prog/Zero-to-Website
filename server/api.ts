import { Router } from "express";
import { requireAuth, AuthRequest } from "./authMiddleware";
import { getProgress, updateProgress } from "./db";

const router = Router();

/* ── GET /api/user/progress ────────────────────────────── */
router.get("/progress", requireAuth, (req: AuthRequest, res) => {
  const progress = getProgress(req.userId!);
  if (!progress) {
    return res.json({ success: true, progress: null });
  }
  res.json({ success: true, progress });
});

/* ── PUT /api/user/progress ────────────────────────────── */
router.put("/progress", requireAuth, (req: AuthRequest, res) => {
  const updated = updateProgress(req.userId!, req.body);
  res.json({ success: true, progress: updated });
});

/* ── PUT /api/user/notes/:lessonId ─────────────────────── */
router.put("/notes/:lessonId", requireAuth, (req: AuthRequest, res) => {
  const { lessonId } = req.params;
  const { content } = req.body;

  const progress = getProgress(req.userId!);
  const notes = progress?.notes || {};
  notes[lessonId] = content || "";

  const updated = updateProgress(req.userId!, { notes });
  res.json({ success: true, notes: updated.notes });
});

/* ── POST /api/user/bookmarks/toggle ───────────────────── */
router.post("/bookmarks/toggle", requireAuth, (req: AuthRequest, res) => {
  const { lessonId } = req.body;
  if (!lessonId) return res.status(400).json({ error: "lessonId required" });

  const progress = getProgress(req.userId!);
  const bookmarks = progress?.bookmarks || [];
  const idx = bookmarks.indexOf(lessonId);

  if (idx > -1) {
    bookmarks.splice(idx, 1);
  } else {
    bookmarks.push(lessonId);
  }

  const updated = updateProgress(req.userId!, { bookmarks });
  res.json({ success: true, bookmarks: updated.bookmarks, bookmarked: idx === -1 });
});

/* ── POST /api/user/complete-lesson ────────────────────── */
router.post("/complete-lesson", requireAuth, (req: AuthRequest, res) => {
  const { lessonId } = req.body;
  if (!lessonId) return res.status(400).json({ error: "lessonId required" });

  const progress = getProgress(req.userId!);
  const completedLessons = { ...(progress?.completedLessons || {}) };
  const isAlreadyDone = completedLessons[lessonId];
  completedLessons[lessonId] = true;

  const xpPoints = (progress?.xpPoints || 0) + (isAlreadyDone ? 0 : 50);
  const updated = updateProgress(req.userId!, { completedLessons, xpPoints });
  res.json({ success: true, progress: updated, xpAwarded: isAlreadyDone ? 0 : 50 });
});

/* ── POST /api/user/complete-activity ──────────────────── */
router.post("/complete-activity", requireAuth, (req: AuthRequest, res) => {
  const { activityId, xpReward } = req.body;
  if (!activityId) return res.status(400).json({ error: "activityId required" });

  const progress = getProgress(req.userId!);
  const completedActivities = { ...(progress?.completedActivities || {}) };
  const isAlreadyDone = completedActivities[activityId];
  completedActivities[activityId] = true;

  const xpPoints = (progress?.xpPoints || 0) + (isAlreadyDone ? 0 : (xpReward || 50));
  const updated = updateProgress(req.userId!, { completedActivities, xpPoints });
  res.json({ success: true, progress: updated, xpAwarded: isAlreadyDone ? 0 : (xpReward || 50) });
});

/* ── POST /api/user/complete-challenge ─────────────────── */
router.post("/complete-challenge", requireAuth, (req: AuthRequest, res) => {
  const { challengeId } = req.body;
  if (!challengeId) return res.status(400).json({ error: "challengeId required" });

  const progress = getProgress(req.userId!);
  const completedChallenges = { ...(progress?.completedChallenges || {}) };
  const isAlreadyDone = completedChallenges[challengeId];
  completedChallenges[challengeId] = true;

  const xpPoints = (progress?.xpPoints || 0) + (isAlreadyDone ? 0 : 50);
  const updated = updateProgress(req.userId!, { completedChallenges, xpPoints });
  res.json({ success: true, progress: updated, xpAwarded: isAlreadyDone ? 0 : 50 });
});

/* ── DELETE /api/user/account ──────────────────────────── */
router.delete("/account", requireAuth, (req: AuthRequest, res) => {
  // In production, soft-delete or archive
  res.json({ success: true, message: "Account deletion queued" });
});

export default router;
