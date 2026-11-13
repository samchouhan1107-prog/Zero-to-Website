import express from "express";
import { resolveAuthenticatedRequestUser } from "./auth";
import {
  getAllStorehouseItems,
  getStorehouseItemById,
  saveStorehouseItem,
  deleteStorehouseItem,
} from "./storehouse-db";

const router = express.Router();

function getRequestUserId(req: express.Request): string {
  const authed = resolveAuthenticatedRequestUser(req);
  if (authed?.id) return authed.id;
  return (req.headers["x-user-id"] as string) || "default";
}

// In-memory / file-backed user progress store for persistence
let userProgressStore: Record<string, any> = {
  default: {
    completedLessons: {},
    completedChallenges: {},
    quizScores: {},
    claimedMilestones: ["milestone-100"],
    notes: {},
    bookmarks: [],
    xpPoints: 120,
    conceptsMastered: 1,
    studyMinutes: 15,
    lastActiveDate: new Date().toISOString().split("T")[0],
  },
};

// Health
router.get("/health", (_req, res) => res.json({ status: "ok" }));

// User progress endpoints
router.get("/progress", (req, res) => {
  const userId = getRequestUserId(req);
  const progress = userProgressStore[userId] || userProgressStore["default"];
  res.json({ success: true, progress });
});

router.put("/progress", (req, res) => {
  const userId = getRequestUserId(req);
  const incoming = req.body;
  userProgressStore[userId] = {
    ...(userProgressStore[userId] || userProgressStore["default"]),
    ...incoming,
  };
  res.json({ success: true, progress: userProgressStore[userId] });
});

router.post("/complete-lesson", (req, res) => {
  const userId = getRequestUserId(req);
  const { lessonId } = req.body;
  const current = userProgressStore[userId] || { ...userProgressStore["default"] };

  const completed = { ...(current.completedLessons || {}), [lessonId]: true };
  const updated = {
    ...current,
    completedLessons: completed,
    xpPoints: (current.xpPoints || 0) + 50,
    conceptsMastered: (current.conceptsMastered || 0) + 1,
  };
  userProgressStore[userId] = updated;

  res.json({ success: true, progress: updated, xpAwarded: 50 });
});

router.post("/complete-practice", (req, res) => {
  const userId = getRequestUserId(req);
  const { challengeId } = req.body;
  const current = userProgressStore[userId] || { ...userProgressStore["default"] };

  const completed = { ...(current.completedChallenges || {}), [challengeId]: true };
  const updated = {
    ...current,
    completedChallenges: completed,
    xpPoints: (current.xpPoints || 0) + 50,
  };
  userProgressStore[userId] = updated;

  res.json({ success: true, progress: updated, xpAwarded: 50 });
});

// Storehouse CRUD Endpoints
router.get("/storehouse", (req, res) => {
  const userId = getRequestUserId(req);
  const items = getAllStorehouseItems(userId);
  res.json({ success: true, items });
});

router.get("/storehouse/:id", (req, res) => {
  const userId = getRequestUserId(req);
  const item = getStorehouseItemById(req.params.id, userId);
  if (!item) {
    res.status(404).json({ success: false, error: "Item not found" });
    return;
  }
  res.json({ success: true, item });
});

router.post("/storehouse", (req, res) => {
  const userId = getRequestUserId(req);
  const { id, title, type, data, tags } = req.body;
  if (!title) {
    res.status(400).json({ success: false, error: "Title is required" });
    return;
  }

  const saved = saveStorehouseItem(userId, {
    id: id || `storehouse-${Date.now()}`,
    userId,
    title,
    type: type || "lesson",
    data: data || {},
    tags: tags || [],
  });

  res.json({ success: true, item: saved });
});

router.delete("/storehouse/:id", (req, res) => {
  const userId = getRequestUserId(req);
  const deleted = deleteStorehouseItem(req.params.id, userId);
  res.json({ success: true, deleted });
});

export default router;
