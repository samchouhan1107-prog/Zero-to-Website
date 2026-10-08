import express from "express";
const router = express.Router();

// User API routes
router.get("/health", (_req, res) => res.json({ status: "ok" }));

export default router;
