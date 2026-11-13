import express from "express";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const router = express.Router();

export interface StoredStudentAccount {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // scrypt salt:hash
  method: "email" | "guest" | "google";
  createdAt: string;
  updatedAt: string;
}

export interface StudentSessionRecord {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
}

export interface PublicStudentUser {
  id: string;
  name: string;
  email: string;
  method: "email" | "guest" | "google";
}

const ACCOUNTS_FILE = path.join(process.cwd(), "server", "student-accounts.json");
const SESSIONS_FILE = path.join(process.cwd(), "server", "student-sessions.json");

let accountsCache: StoredStudentAccount[] = [];
let sessionsCache: StudentSessionRecord[] = [];

function hashPasswordScrypt(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

function verifyPasswordScrypt(password: string, stored: string): boolean {
  const parts = stored.split(":");
  if (parts.length !== 2) return false;
  const [salt, expectedHex] = parts;
  const derived = crypto.scryptSync(password, salt, 64);
  const expectedBuf = Buffer.from(expectedHex, "hex");
  if (derived.length !== expectedBuf.length) return false;
  return crypto.timingSafeEqual(derived, expectedBuf);
}

function saveAccounts(): void {
  try {
    fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(accountsCache, null, 2), "utf-8");
  } catch (err) {
    console.warn("[Auth] Failed to persist student accounts:", err);
  }
}

function saveSessions(): void {
  try {
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessionsCache, null, 2), "utf-8");
  } catch (err) {
    console.warn("[Auth] Failed to persist student sessions:", err);
  }
}

function loadAuthStores(): void {
  try {
    if (fs.existsSync(ACCOUNTS_FILE)) {
      accountsCache = JSON.parse(fs.readFileSync(ACCOUNTS_FILE, "utf-8"));
    } else {
      const now = new Date().toISOString();
      accountsCache = [
        {
          id: "stu-demo-scholar",
          name: "Demo Scholar",
          email: "scholar@demo.local",
          passwordHash: hashPasswordScrypt("DemoPass123!"),
          method: "email",
          createdAt: now,
          updatedAt: now,
        },
      ];
      saveAccounts();
    }
  } catch {
    accountsCache = [];
  }

  try {
    if (fs.existsSync(SESSIONS_FILE)) {
      sessionsCache = JSON.parse(fs.readFileSync(SESSIONS_FILE, "utf-8"));
    } else {
      sessionsCache = [];
      saveSessions();
    }
  } catch {
    sessionsCache = [];
  }
}

loadAuthStores();

function issueSessionToken(userId: string): string {
  const token = `zts_${crypto.randomBytes(24).toString("hex")}`;
  const now = Date.now();
  const expiresAt = new Date(now + 30 * 24 * 60 * 60 * 1000).toISOString();
  sessionsCache = sessionsCache.filter(
    (s) => new Date(s.expiresAt).getTime() > now
  );
  sessionsCache.push({
    token,
    userId,
    createdAt: new Date(now).toISOString(),
    expiresAt,
  });
  saveSessions();
  return token;
}

function toPublicUser(acc: StoredStudentAccount): PublicStudentUser {
  return {
    id: acc.id,
    name: acc.name,
    email: acc.email,
    method: acc.method,
  };
}

export function resolveUserFromToken(token?: string | null): PublicStudentUser | null {
  if (!token) return null;
  const cleanToken = token.replace(/^Bearer\s+/i, "").trim();
  if (!cleanToken) return null;

  const session = sessionsCache.find((s) => s.token === cleanToken);
  if (!session) return null;

  if (new Date(session.expiresAt).getTime() <= Date.now()) {
    sessionsCache = sessionsCache.filter((s) => s.token !== cleanToken);
    saveSessions();
    return null;
  }

  const acc = accountsCache.find((a) => a.id === session.userId);
  return acc ? toPublicUser(acc) : null;
}

export function resolveAuthenticatedRequestUser(req: express.Request): PublicStudentUser | null {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    return resolveUserFromToken(authHeader);
  }
  const tokenHeader = req.headers["x-session-token"];
  if (typeof tokenHeader === "string") {
    return resolveUserFromToken(tokenHeader);
  }
  return null;
}

export function getStudentById(userId: string): PublicStudentUser | null {
  const acc = accountsCache.find((a) => a.id === userId);
  return acc ? toPublicUser(acc) : null;
}

// Health
router.get("/health", (_req, res) => res.json({ status: "ok" }));

// Sign up new student account
router.post("/signup", (req, res) => {
  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body?.password === "string" ? req.body.password : "";

  if (!name || name.length < 2) {
    res.status(400).json({ success: false, error: "Please enter your full name (at least 2 characters)." });
    return;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ success: false, error: "Please enter a valid email address." });
    return;
  }
  if (!password || password.length < 6) {
    res.status(400).json({ success: false, error: "Password must be at least 6 characters long." });
    return;
  }

  const existing = accountsCache.find((a) => a.email === email);
  if (existing) {
    res.status(409).json({ success: false, error: "An account with this email already exists. Please sign in." });
    return;
  }

  const now = new Date().toISOString();
  const newAcc: StoredStudentAccount = {
    id: `stu-${crypto.randomBytes(6).toString("hex")}`,
    name,
    email,
    passwordHash: hashPasswordScrypt(password),
    method: "email",
    createdAt: now,
    updatedAt: now,
  };
  accountsCache.push(newAcc);
  saveAccounts();

  const token = issueSessionToken(newAcc.id);
  res.json({ success: true, user: toPublicUser(newAcc), token });
});

// Sign in existing student account
router.post("/signin", (req, res) => {
  const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body?.password === "string" ? req.body.password : "";

  if (!email || !password) {
    res.status(400).json({ success: false, error: "Email and password are required." });
    return;
  }

  const acc = accountsCache.find((a) => a.email === email);
  if (!acc || !verifyPasswordScrypt(password, acc.passwordHash)) {
    res.status(401).json({ success: false, error: "Invalid email or password." });
    return;
  }

  const token = issueSessionToken(acc.id);
  res.json({ success: true, user: toPublicUser(acc), token });
});

// Guest session creation
router.post("/guest", (_req, res) => {
  const now = new Date().toISOString();
  const guestId = `guest-${crypto.randomBytes(5).toString("hex")}`;
  const guestAcc: StoredStudentAccount = {
    id: guestId,
    name: "Guest Learner",
    email: "",
    passwordHash: "",
    method: "guest",
    createdAt: now,
    updatedAt: now,
  };
  accountsCache.push(guestAcc);
  saveAccounts();

  const token = issueSessionToken(guestAcc.id);
  res.json({ success: true, user: toPublicUser(guestAcc), token });
});

// Verify active session
router.get("/me", (req, res) => {
  const user = resolveAuthenticatedRequestUser(req);
  if (!user) {
    res.status(401).json({ success: false, error: "Session invalid or expired." });
    return;
  }
  res.json({ success: true, user });
});

// Sign out and revoke token
router.post("/logout", (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const cleanToken = authHeader.replace(/^Bearer\s+/i, "").trim();
    sessionsCache = sessionsCache.filter((s) => s.token !== cleanToken);
    saveSessions();
  }
  res.json({ success: true });
});

export default router;
