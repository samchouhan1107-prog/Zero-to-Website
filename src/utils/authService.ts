/**
 * WebZoneBW Auth & API Service
 * Connects the React frontend to the Express backend.
 * Falls back to localStorage when backend is unreachable (GitHub Pages static mode).
 */

const API_BASE = import.meta.env.VITE_API_URL || "/api";

interface ApiUser {
  id: string;
  name: string;
  email: string;
  method: "google" | "email" | "guest";
  avatar?: string | null;
}

interface AuthResponse {
  success: boolean;
  user?: ApiUser;
  token?: string;
  expiresAt?: string;
  error?: string;
}

interface ProgressResponse {
  success: boolean;
  progress?: any;
  error?: string;
}

/* ── Token Management ──────────────────────────────────── */

const TOKEN_KEY = "wz_auth_token";
const USER_KEY = "wz_auth_user";

function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function setToken(token: string) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {}
}

function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {}
}

function headers(): Record<string, string> {
  const h: Record<string, string> = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
}

/* ── Auth API ──────────────────────────────────────────── */

export async function signUp(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (data.success && data.token) {
      setToken(data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    }
    return data;
  } catch (err) {
    // Offline / static mode — simulate locally
    const user = { id: "local", name, email, method: "email" as const };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setToken("local-simulated-token");
    return { success: true, user, token: "local-simulated-token" };
  }
}

export async function signIn(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_BASE}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success && data.token) {
      setToken(data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    }
    return data;
  } catch {
    const user = { id: "local", name: email.split("@")[0], email, method: "email" as const };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setToken("local-simulated-token");
    return { success: true, user, token: "local-simulated-token" };
  }
}

export async function signInWithGoogle(
  name: string,
  email: string,
  avatar?: string
): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_BASE}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, avatar }),
    });
    const data = await res.json();
    if (data.success && data.token) {
      setToken(data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    }
    return data;
  } catch {
    const user = { id: "local", name, email, method: "google" as const, avatar };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setToken("local-simulated-token");
    return { success: true, user, token: "local-simulated-token" };
  }
}

export async function signOut(): Promise<void> {
  try {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      headers: headers(),
    });
  } catch {}
  clearToken();
}

export async function getCurrentUser(): Promise<ApiUser | null> {
  // Try backend first
  try {
    const res = await fetch(`${API_BASE}/auth/me`, { headers: headers() });
    const data = await res.json();
    if (data.success && data.user) {
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      return data.user;
    }
  } catch {}

  // Fallback to localStorage
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

/* ── Progress Sync API ─────────────────────────────────── */

export async function syncProgress(progress: any): Promise<any> {
  const token = getToken();
  if (!token || token === "local-simulated-token") return null;

  try {
    const res = await fetch(`${API_BASE}/user/progress`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(progress),
    });
    const data = await res.json();
    return data.success ? data.progress : null;
  } catch {
    return null;
  }
}

export async function fetchProgress(): Promise<any | null> {
  const token = getToken();
  if (!token || token === "local-simulated-token") return null;

  try {
    const res = await fetch(`${API_BASE}/user/progress`, {
      method: "GET",
      headers: headers(),
    });
    const data = await res.json();
    return data.success ? data.progress : null;
  } catch {
    return null;
  }
}

export async function toggleBookmark(lessonId: string): Promise<boolean | null> {
  const token = getToken();
  if (!token || token === "local-simulated-token") return null;

  try {
    const res = await fetch(`${API_BASE}/user/bookmarks/toggle`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ lessonId }),
    });
    const data = await res.json();
    return data.success ? data.bookmarked : null;
  } catch {
    return null;
  }
}

export async function saveNote(lessonId: string, content: string): Promise<boolean> {
  const token = getToken();
  if (!token || token === "local-simulated-token") return true; // Local save is fine

  try {
    const res = await fetch(`${API_BASE}/user/notes/${lessonId}`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify({ content }),
    });
    const data = await res.json();
    return data.success;
  } catch {
    return true;
  }
}

export async function completeLesson(lessonId: string): Promise<{ xpAwarded: number } | null> {
  const token = getToken();
  if (!token || token === "local-simulated-token") return { xpAwarded: 50 };

  try {
    const res = await fetch(`${API_BASE}/user/complete-lesson`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ lessonId }),
    });
    const data = await res.json();
    return data.success ? { xpAwarded: data.xpAwarded } : null;
  } catch {
    return { xpAwarded: 50 };
  }
}

export async function completeActivity(
  activityId: string,
  xpReward: number
): Promise<{ xpAwarded: number } | null> {
  const token = getToken();
  if (!token || token === "local-simulated-token") return { xpAwarded: xpReward };

  try {
    const res = await fetch(`${API_BASE}/user/complete-activity`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ activityId, xpReward }),
    });
    const data = await res.json();
    return data.success ? { xpAwarded: data.xpAwarded } : null;
  } catch {
    return { xpAwarded: xpReward };
  }
}
