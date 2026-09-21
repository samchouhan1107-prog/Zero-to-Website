import { Router } from "express";
import crypto from "crypto";
import {
  findUserByEmail,
  findUserById,
  createUser,
  createSession,
  deleteSession,
  findSession,
  verifyPassword,
  getProgress,
} from "./db";

const router = Router();

/* ── POST /api/auth/signup ─────────────────────────────── */
router.post("/signup", async (req, res) => {
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

  const user = await createUser(name.trim(), email.toLowerCase().trim(), password, "email");
  const session = await createSession(user.id);

  res.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email, method: user.method },
    token: session.token,
    expiresAt: session.expiresAt,
  });
});

/* ── POST /api/auth/signin ─────────────────────────────── */
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = findUserByEmail(email.toLowerCase().trim());
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  if (!verifyPassword(password, user)) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const session = await createSession(user.id);

  res.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email, method: user.method },
    token: session.token,
    expiresAt: session.expiresAt,
  });
});

/* ── Google ID token verification ─────────────────────── */
interface GoogleTokenInfo {
  email?: string;
  email_verified?: boolean | string;
  aud?: string;
  exp?: string;
  name?: string;
  picture?: string;
}

async function verifyGoogleIdToken(idToken: string): Promise<GoogleTokenInfo | null> {
  try {
    // Verify the token signature and claims via Google's tokeninfo endpoint.
    const resp = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`
    );
    if (!resp.ok) return null;
    const info = (await resp.json()) as GoogleTokenInfo;

    // Reject expired tokens
    if (info.exp && Number(info.exp) * 1000 < Date.now()) return null;
    // Require a verified email
    if (!info.email || info.email_verified !== true && info.email_verified !== "true") return null;
    // If a client ID is configured, require the audience to match
    const expectedAud = process.env.GOOGLE_CLIENT_ID;
    if (expectedAud && info.aud !== expectedAud) return null;

    return info;
  } catch (err) {
    console.warn("[AUTH] Google ID token verification failed:", err);
    return null;
  }
}

/* ── POST /api/auth/google ─────────────────────────────── */
router.post("/google", async (req, res) => {
  // The client must present a Google ID token (from Google Identity Services);
  // it is verified server-side before any session is issued.
  const { idToken, clientId } = req.body;

  if (!idToken || typeof idToken !== "string") {
    return res.status(400).json({ error: "Google ID token is required" });
  }

  const info = await verifyGoogleIdToken(idToken);
  if (!info) {
    return res.status(401).json({ error: "Invalid or expired Google ID token" });
  }
  if (clientId && process.env.GOOGLE_CLIENT_ID && clientId !== process.env.GOOGLE_CLIENT_ID) {
    return res.status(401).json({ error: "Google client ID mismatch" });
  }

  const email = info.email!.toLowerCase().trim();
  let user = findUserByEmail(email);
  if (!user) {
    user = await createUser(
      info.name || "Google User",
      email,
      crypto.randomBytes(32).toString("hex"), // Random password for Google users
      "google",
      info.picture || undefined
    );
  }

  const session = await createSession(user.id);

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
router.post("/logout", async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (token) await deleteSession(token);

  res.json({ success: true });
});

/* ── POST /api/auth/guest ──────────────────────────────── */
router.post("/guest", async (req, res) => {
  const guestId = "guest_" + crypto.randomUUID();
  const guestUser = await createUser(
    "Guest Learner",
    `${guestId}@guest.webzonebw.shop`,
    crypto.randomBytes(16).toString("hex"),
    "guest"
  );
  const session = await createSession(guestUser.id);
  getProgress(guestUser.id);

  res.json({
    success: true,
    user: { id: guestUser.id, name: guestUser.name, email: guestUser.email, method: "guest" },
    token: session.token,
    expiresAt: session.expiresAt,
  });
});

export default router;
