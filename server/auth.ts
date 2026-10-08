import express from "express";
const router = express.Router();

// Auth API routes
router.get("/health", (_req, res) => res.json({ status: "ok" }));

// Auth endpoints
router.post("/signup", (_req, res) => {
  res.json({ success: true, user: { id: "demo", name: "Demo User", email: "demo@example.com" } });
});

router.post("/signin", (_req, res) => {
  res.json({ success: true, user: { id: "demo", name: "Demo User", email: "demo@example.com" } });
});

router.post("/guest", (_req, res) => {
  res.json({ success: true, user: { id: "guest", name: "Guest Learner", email: "" }, token: "demo-token" });
});

router.get("/me", (_req, res) => {
  res.json({ success: true, user: { id: "demo", name: "Demo User", email: "demo@example.com" } });
});

router.post("/logout", (_req, res) => {
  res.json({ success: true });
});

export default router;
