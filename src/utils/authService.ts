/**
 * WebZoneBW Auth & API Service
 *
 * ✅ Server is the authoritative source for: auth, passwords, sessions, XP, progress
 * ✅ localStorage is ONLY used for: token persistence (session resume) and guest offline cache
 * ✅ Passwords NEVER leave the server — only hashed versions stored
 * ✅ XP / progress is synced to server on every change when authenticated
 *
 * When backend is unreachable (GitHub Pages static mode), falls back to localStorage
 * for guest/offline use — but clearly marks these as unsynced.
 */

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  method: "google" | "email" | "guest";
  avatar?: string | null;
}

interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  token?: string;
  expiresAt?: string;
  error?: string;
}

/* ── Token Management (session resume only — NOT auth source) ── */

const TOKEN_KEY = "wz_auth_token";
const USER_KEY = "wz_auth_user";

function getToken(): string | null {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}

function setToken(token: string) {
  try { localStorage.setItem(TOKEN_KEY, token); } catch {}
}

function clearAuthStorage() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {}
}

function authHeaders(): Record<string, string> {
  const h: Record<string, string> = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
}

/* ── Offline Detection ─────────────────────────────────── */

async function apiCall<T>(path: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: { ...authHeaders(), ...options?.headers },
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    return await res.json();
  } catch {
    return null; // Backend unreachable — caller decides fallback
  }
}

/* ── Auth API ──────────────────────────────────────────── */

export async function signUp(name: string, email: string, password: string): Promise<AuthResponse> {
  const data = await apiCall<any>("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  if (data?.success && data.token) {
    setToken(data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    return data;
  }

  return { success: false, error: data?.error || "Unable to connect to server. Please try again." };
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  const data = await apiCall<any>("/auth/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (data?.success && data.token) {
    setToken(data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    return data;
  }

  return { success: false, error: data?.error || "Unable to connect to server. Please try again." };
}

export async function signInWithGoogle(name: string, email: string, avatar?: string): Promise<AuthResponse> {
  const data = await apiCall<any>("/auth/google", {
    method: "POST",
    body: JSON.stringify({ name, email, avatar }),
  });

  if (data?.success && data.token) {
    setToken(data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    return data;
  }

  return { success: false, error: data?.error || "Unable to connect to Google auth. Please try again." };
}

export async function signOut(): Promise<void> {
  await apiCall("/auth/logout", { method: "POST" });
  clearAuthStorage();
}

/**
 * Resume session — checks if there's a valid server session.
 * Server is the source of truth for auth, NOT localStorage.
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const data = await apiCall<any>("/auth/me");
  if (data?.success && data.user) {
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    return data.user;
  }

  // Server unreachable — clear stale token
  clearAuthStorage();
  return null;
}

/**
 * Guest mode — no account, no server session.
 * Progress is stored locally only and will NOT sync.
 */
export function createGuestSession(): AuthUser {
  const guest: AuthUser = { id: "guest", name: "Guest", email: "", method: "guest" };
  localStorage.setItem(USER_KEY, JSON.stringify(guest));
  return guest;
}

/* ── Progress Sync API (Server is XP source of truth) ───── */

export async function fetchProgress(): Promise<any | null> {
  const data = await apiCall<any>("/user/progress", { method: "GET" });
  return data?.success ? data.progress : null;
}

export async function syncProgress(progress: any): Promise<any | null> {
  const data = await apiCall<any>("/user/progress", {
    method: "PUT",
    body: JSON.stringify(progress),
  });
  return data?.success ? data.progress : null;
}

export async function toggleBookmark(lessonId: string): Promise<boolean | null> {
  const data = await apiCall<any>("/user/bookmarks/toggle", {
    method: "POST",
    body: JSON.stringify({ lessonId }),
  });
  return data?.success ? data.bookmarked : null;
}

export async function saveNote(lessonId: string, content: string): Promise<boolean> {
  const data = await apiCall<any>(`/user/notes/${lessonId}`, {
    method: "PUT",
    body: JSON.stringify({ content }),
  });
  return data?.success ?? false;
}

export async function completeLesson(lessonId: string): Promise<{ xpAwarded: number } | null> {
  const data = await apiCall<any>("/user/complete-lesson", {
    method: "POST",
    body: JSON.stringify({ lessonId }),
  });
  return data?.success ? { xpAwarded: data.xpAwarded } : null;
}

export async function completeActivity(activityId: string, xpReward: number): Promise<{ xpAwarded: number } | null> {
  const data = await apiCall<any>("/user/complete-activity", {
    method: "POST",
    body: JSON.stringify({ activityId, xpReward }),
  });
  return data?.success ? { xpAwarded: data.xpAwarded } : null;
}
