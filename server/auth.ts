import { Router } from "express";
import crypto from "crypto";
import {
  findUserByEmail,
  findUserById,
  createUser,
  createSession,
  deleteSession,
  findSession,
  hashPassword,
} from "./db";

const router = Router();

/* ── POST /api/auth/signup ─────────────────────────────── */
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }

  const existing = findUserByEmail(email.toLowerCase().trim());
  if (existing) {
    return res.status(409).json({ error: "An account with this email already exists" });
  }

  const user = createUser(name.trim(), email.toLowerCase().trim(), password, "email");
  const session = createSession(user.id);

  res.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email, method: user.method },
    token: session.token,
    expiresAt: session.expiresAt,
  });
});

/* ── POST /api/auth/signin ─────────────────────────────── */
router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = findUserByEmail(email.toLowerCase().trim());
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const { hash } = hashPassword(password, user.salt);
  if (hash !== user.passwordHash) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const session = createSession(user.id);

  res.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email, method: user.method },
    token: session.token,
    expiresAt: session.expiresAt,
  });
});

/* ── POST /api/auth/google ─────────────────────────────── */
router.post("/google", (req, res) => {
  // Simulated Google OAuth — in production, verify the Google ID token
  const { name, email, avatar } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Google email is required" });
  }

  let user = findUserByEmail(email.toLowerCase().trim());
  if (!user) {
    user = createUser(
      name || "Google User",
      email.toLowerCase().trim(),
      crypto.randomBytes(32).toString("hex"), // Random password for Google users
      "google",
      avatar
    );
  }

  const session = createSession(user.id);

  res.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email, method: user.method, avatar: user.avatar },
    token: session.token,
    expiresAt: session.expiresAt,
  });
});

/* ── GET /api/auth/me ──────────────────────────────────── */
router.get("/me", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const session = findSession(token);
  if (!session) {
    return res.status(401).json({ error: "Invalid session" });
  }

  const user = findUserById(session.userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email, method: user.method, avatar: user.avatar },
  });
});

/* ── POST /api/auth/logout ─────────────────────────────── */
router.post("/logout", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (token) deleteSession(token);

  res.json({ success: true });
});

/* ── POST /api/auth/guest ──────────────────────────────── */
router.post("/guest", (req, res) => {
  const token = crypto.randomBytes(48).toString("hex");
  res.json({
    success: true,
    user: { id: "guest", name: "Guest", email: "", method: "guest" },
    token,
  });
});

export default router;
