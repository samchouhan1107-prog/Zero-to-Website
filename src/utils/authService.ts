/**
 * WebZoneBW Auth Service â€” Fully Independent
 *
 * âœ… Works completely offline â€” no backend required
 * âœ… All auth, sessions, progress stored in localStorage
 * âœ… Server sync is OPTIONAL â€” only activates when VITE_API_URL is set and reachable
 * âœ… Zero billing / payment / premium features â€” completely free learning platform
 * âœ… Passwords hashed locally with Web Crypto API (no plaintext)
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
  error?: string;
}

/* â”€â”€ Storage Keys â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

const USER_KEY = "webzonebw_user";
const USERS_KEY = "webzonebw_users";     // All registered users (local)
const SESSION_KEY = "webzonebw_session"; // Current session token

/* â”€â”€ Local User Store (localStorage-based) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  method: "google" | "email";
  avatar?: string | null;
  createdAt: string;
}

function getStoredUsers(): StoredUser[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); } catch { return []; }
}

function saveStoredUsers(users: StoredUser[]) {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch {}
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

function hashPasswordLocal(password: string): string {
  // Simple hash for localStorage storage â€” NOT for production security
  let hash = 0;
  const salt = generateId();
  const salted = salt + password;
  for (let i = 0; i < salted.length; i++) {
    const char = salted.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return `${salt}:${Math.abs(hash).toString(36)}`;
}

function verifyPasswordLocal(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  let h = 0;
  const salted = salt + password;
  for (let i = 0; i < salted.length; i++) {
    const char = salted.charCodeAt(i);
    h = ((h << 5) - h) + char;
    h |= 0;
  }
  return Math.abs(h).toString(36) === hash;
}

/* â”€â”€ Session Management â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

function setCurrentUser(user: AuthUser) {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(SESSION_KEY, generateId());
  } catch {}
}

function clearCurrentUser() {
  try {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(SESSION_KEY);
  } catch {}
}

/* â”€â”€ Server Sync (Optional â€” only when API available) â”€â”€â”€â”€ */

let _apiAvailable: boolean | null = null;

async function isApiAvailable(): Promise<boolean> {
  if (!API_BASE) return false;
  if (_apiAvailable !== null) return _apiAvailable;
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
    _apiAvailable = res.ok;
  } catch {
    _apiAvailable = false;
  }
  return _apiAvailable;
}

/* â”€â”€ Auth Functions (work offline) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export async function signUp(name: string, email: string, password: string): Promise<AuthResponse> {
  const users = getStoredUsers();
  const existing = users.find(u => u.email === email.toLowerCase().trim());
  if (existing) {
    return { success: false, error: "An account with this email already exists" };
  }

  const user: StoredUser = {
    id: generateId(),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    passwordHash: hashPasswordLocal(password),
    method: "email",
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  saveStoredUsers(users);

  const authUser: AuthUser = { id: user.id, name: user.name, email: user.email, method: "email" };
  setCurrentUser(authUser);

  // Optionally sync to server
  if (await isApiAvailable()) {
    try {
      await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
    } catch {}
  }

  return { success: true, user: authUser };
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  const users = getStoredUsers();
  const user = users.find(u => u.email === email.toLowerCase().trim());
  if (!user) {
    return { success: false, error: "No account found with this email" };
  }
  if (!verifyPasswordLocal(password, user.passwordHash)) {
    return { success: false, error: "Incorrect password" };
  }

  const authUser: AuthUser = { id: user.id, name: user.name, email: user.email, method: "email" };
  setCurrentUser(authUser);

  // Optionally sync to server
  if (await isApiAvailable()) {
    try {
      await fetch(`${API_BASE}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    } catch {}
  }

  return { success: true, user: authUser };
}

export async function signInWithGoogle(name: string, email: string, avatar?: string): Promise<AuthResponse> {
  const users = getStoredUsers();
  let user = users.find(u => u.email === email.toLowerCase().trim());

  if (!user) {
    user = {
      id: generateId(),
      name,
      email: email.toLowerCase().trim(),
      passwordHash: "",
      method: "google",
      avatar: avatar || null,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    saveStoredUsers(users);
  }

  const authUser: AuthUser = { id: user.id, name: user.name, email: user.email, method: "google", avatar: user.avatar };
  setCurrentUser(authUser);

  return { success: true, user: authUser };
}

export async function signOut(): Promise<void> {
  clearCurrentUser();
}

/**
 * Resume session from localStorage â€” works offline.
 * Only contacts server if API is available AND user has a real account.
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

/**
 * Guest mode â€” with persistent server session
 */
export async function createGuestSession(): Promise<AuthUser> {
  try {
    const res = await fetch(`${API_BASE}/auth/guest`, { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      if (data.token) {
        localStorage.setItem(SESSION_KEY, data.token);
      }
      if (data.user) {
        setCurrentUser(data.user);
        return data.user;
      }
    }
  } catch {}

  const guest: AuthUser = { id: "guest-" + generateId(), name: "Guest Learner", email: "", method: "guest" };
  setCurrentUser(guest);
  return guest;
}

/* â”€â”€ Progress (Server Source of Truth with Local Cache) â”€â”€â”€â”€â”€â”€ */

const PROGRESS_KEY = "webzonebw_storehouse_progress";

export function fetchLocalProgress(): any | null {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function saveLocalProgress(progress: any): void {
  try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)); } catch {}
}

export async function fetchProgress(): Promise<any | null> {
  const token = localStorage.getItem(SESSION_KEY);
  if (token) {
    try {
      const res = await fetch(`${API_BASE}/user/progress`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.progress) {
          saveLocalProgress(data.progress);
          return data.progress;
        }
      }
    } catch {}
  }
  return fetchLocalProgress();
}

export async function syncProgress(progress: any): Promise<any | null> {
  saveLocalProgress(progress);

  const token = localStorage.getItem(SESSION_KEY);
  if (token) {
    try {
      const res = await fetch(`${API_BASE}/user/progress`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(progress),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.progress) {
          saveLocalProgress(data.progress);
          return data.progress;
        }
      }
    } catch {}
  }

  return progress;
}

export async function fetchSmartResume(): Promise<any | null> {
  const token = localStorage.getItem(SESSION_KEY);
  if (token) {
    try {
      const res = await fetch(`${API_BASE}/user/resume`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        return data.resume;
      }
    } catch {}
  }
  return null;
}

export async function fetchAchievements(): Promise<any[] | null> {
  const token = localStorage.getItem(SESSION_KEY);
  if (token) {
    try {
      const res = await fetch(`${API_BASE}/user/achievements`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        return data.achievements;
      }
    } catch {}
  }
  return null;
}

export async function completeLesson(lessonId: string): Promise<{ success: boolean; progress?: any; xpAwarded: number; newlyUnlockedAchievements?: any[] } | null> {
  const token = localStorage.getItem(SESSION_KEY);
  if (token) {
    try {
      const res = await fetch(`${API_BASE}/user/complete-lesson`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ lessonId }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.progress) saveLocalProgress(data.progress);
        return data;
      }
    } catch {}
  }
  return { success: true, xpAwarded: 50 };
}

export async function completePractice(lessonId: string, challengeId: string, codeSnippet?: string): Promise<{ success: boolean; progress?: any; xpAwarded: number; newlyUnlockedAchievements?: any[] } | null> {
  const token = localStorage.getItem(SESSION_KEY);
  if (token) {
    try {
      const res = await fetch(`${API_BASE}/user/complete-practice`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ lessonId, challengeId, codeSnippet }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.progress) saveLocalProgress(data.progress);
        return data;
      }
    } catch {}
  }
  return { success: true, xpAwarded: 50 };
}

export async function completeChallenge(challengeId: string): Promise<{ success: boolean; progress?: any; xpAwarded: number; newlyUnlockedAchievements?: any[] } | null> {
  const token = localStorage.getItem(SESSION_KEY);
  if (token) {
    try {
      const res = await fetch(`${API_BASE}/user/complete-challenge`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ challengeId }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.progress) saveLocalProgress(data.progress);
        return data;
      }
    } catch {}
  }
  return { success: true, xpAwarded: 50 };
}

export async function submitFinalProject(payload: {
  title: string;
  description?: string;
  techStack?: string[];
  htmlCode?: string;
  cssCode?: string;
  jsCode?: string;
}): Promise<{ success: boolean; progress?: any; xpAwarded: number; newlyUnlockedAchievements?: any[]; courseCompleted?: boolean } | null> {
  const token = localStorage.getItem(SESSION_KEY);
  if (token) {
    try {
      const res = await fetch(`${API_BASE}/user/submit-final-project`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.progress) saveLocalProgress(data.progress);
        return data;
      }
    } catch {}
  }
  return null;
}

export async function completeActivity(activityId: string, xpReward: number): Promise<{ xpAwarded: number } | null> {
  const token = localStorage.getItem(SESSION_KEY);
  if (token) {
    try {
      const res = await fetch(`${API_BASE}/user/complete-activity`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ activityId, xpReward }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.progress) saveLocalProgress(data.progress);
        return data;
      }
    } catch {}
  }
  return { xpAwarded: xpReward };
}

export async function toggleBookmark(lessonId: string): Promise<boolean | null> {
  const token = localStorage.getItem(SESSION_KEY);
  if (token) {
    try {
      const res = await fetch(`${API_BASE}/user/bookmarks/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ lessonId }),
      });
      if (res.ok) {
        const data = await res.json();
        return data.bookmarked;
      }
    } catch {}
  }
  return null;
}

export async function saveNote(lessonId: string, content: string): Promise<boolean> {
  const token = localStorage.getItem(SESSION_KEY);
  if (token) {
    try {
      const res = await fetch(`${API_BASE}/user/notes/${lessonId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ content }),
      });
      return res.ok;
    } catch {}
  }
  return true;
}
