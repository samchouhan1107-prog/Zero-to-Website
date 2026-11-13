/**
 * WebZoneBW Auth, Entitlement & Merchant Payment Client Service
 */

import type {
  MerchantDashboardSummary,
  MerchantProviderType,
  PaidSubscriptionRecord,
  PaymentOrderRecord,
  PlanCatalogItem,
  StudentEntitlementSummary,
} from "../shared/paymentTypes";

function resolveApiBase(): string {
  const envUrl = (import.meta.env.VITE_API_URL || "").trim();
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host.endsWith(".run.app") ||
      !envUrl
    ) {
      return "/api";
    }
    try {
      const parsed = new URL(envUrl, window.location.origin);
      if (parsed.origin === window.location.origin) {
        return parsed.pathname.replace(/\/$/, "") || "/api";
      }
      return "/api";
    } catch {
      return "/api";
    }
  }
  return envUrl || "/api";
}

const API_BASE = resolveApiBase();

async function parseJsonSafe<T = any>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text) return {} as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(`Unexpected response from server (${res.status}).`);
  }
}

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
  error?: string;
}

/* ── Storage Keys ──────────────────────────────────────── */

const USER_KEY = "webzonebw_user";
const USERS_KEY = "webzonebw_users";     // Offline fallback cache
const SESSION_KEY = "webzonebw_session"; // Current session token

export function getSessionToken(): string | null {
  try {
    return localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

export function getAuthHeaders(): Record<string, string> {
  const token = getSessionToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

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

function setCurrentUser(user: AuthUser, token?: string) {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    if (token) {
      localStorage.setItem(SESSION_KEY, token);
    } else if (!localStorage.getItem(SESSION_KEY)) {
      localStorage.setItem(SESSION_KEY, generateId());
    }
  } catch {}
}

function clearCurrentUser() {
  try {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(SESSION_KEY);
  } catch {}
}

/* ── Server Sync (Optional — only when API available) ──── */

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

/* ── Auth Functions (work online with full backend & offline) ── */

export async function signUp(name: string, email: string, password: string): Promise<AuthResponse> {
  const normalizedEmail = email.toLowerCase().trim();
  const trimmedName = name.trim();

  // Try server first if API is available
  if (await isApiAvailable()) {
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, email: normalizedEmail, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Sign up failed. Please try again." };
      }
      if (data.success && data.user) {
        setCurrentUser(data.user, data.token);

        // Also cache locally for seamless offline fallback
        const users = getStoredUsers();
        const existingIdx = users.findIndex(u => u.email === normalizedEmail);
        const storedUser: StoredUser = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          passwordHash: hashPasswordLocal(password),
          method: "email",
          createdAt: new Date().toISOString(),
        };
        if (existingIdx >= 0) {
          users[existingIdx] = storedUser;
        } else {
          users.push(storedUser);
        }
        saveStoredUsers(users);

        return { success: true, user: data.user };
      }
    } catch {
      // If network fails during request, continue to offline fallback
    }
  }

  // Offline fallback
  const users = getStoredUsers();
  const existing = users.find(u => u.email === normalizedEmail);
  if (existing) {
    return { success: false, error: "An account with this email already exists" };
  }

  const user: StoredUser = {
    id: generateId(),
    name: trimmedName,
    email: normalizedEmail,
    passwordHash: hashPasswordLocal(password),
    method: "email",
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  saveStoredUsers(users);

  const authUser: AuthUser = { id: user.id, name: user.name, email: user.email, method: "email" };
  setCurrentUser(authUser);

  return { success: true, user: authUser };
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  const normalizedEmail = email.toLowerCase().trim();

  // Try server first if API is available
  if (await isApiAvailable()) {
    try {
      const res = await fetch(`${API_BASE}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Invalid email or password" };
      }
      if (data.success && data.user) {
        setCurrentUser(data.user, data.token);

        // Also update local cache for offline access
        const users = getStoredUsers();
        const existingIdx = users.findIndex(u => u.email === normalizedEmail);
        const storedUser: StoredUser = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          passwordHash: hashPasswordLocal(password),
          method: "email",
          createdAt: new Date().toISOString(),
        };
        if (existingIdx >= 0) {
          users[existingIdx] = storedUser;
        } else {
          users.push(storedUser);
        }
        saveStoredUsers(users);

        return { success: true, user: data.user };
      }
    } catch {
      // Network unreachable, continue to offline fallback
    }
  }

  // Offline fallback
  const users = getStoredUsers();
  const user = users.find(u => u.email === normalizedEmail);
  if (!user) {
    return { success: false, error: "No account found with this email" };
  }
  if (!verifyPasswordLocal(password, user.passwordHash)) {
    return { success: false, error: "Incorrect password" };
  }

  const authUser: AuthUser = { id: user.id, name: user.name, email: user.email, method: "email" };
  setCurrentUser(authUser);

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
  const token = localStorage.getItem(SESSION_KEY);
  if (token && await isApiAvailable()) {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
  }
  clearCurrentUser();
}

/**
 * Resume session from localStorage with live server verification when online.
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  let cachedUser: AuthUser | null = null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) cachedUser = JSON.parse(raw);
  } catch {}

  // If user has a real account and a token, verify with server if online
  const token = localStorage.getItem(SESSION_KEY);
  if (cachedUser && cachedUser.method !== "guest" && token && await isApiAvailable()) {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          const freshUser: AuthUser = {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            method: data.user.method,
            avatar: data.user.avatar,
          };
          localStorage.setItem(USER_KEY, JSON.stringify(freshUser));
          return freshUser;
        }
      } else if (res.status === 401) {
        // Session expired on server; clear current session
        clearCurrentUser();
        return null;
      }
    } catch {
      // Offline fallback: continue using cached user so platform works offline
    }
  }

  return cachedUser;
}

/**
 * Guest mode — with persistent server session
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
        setCurrentUser(data.user, data.token);
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

/* ── Certificate API (Server-Authoritative) ────────────── */

export interface CertificateData {
  id: string;
  certificateId: string;
  name: string;
  courseName: string;
  issueDate: string;
  verificationCode: string;
  xpEarned: number;
  completedLessonsCount: number;
  totalLessonsCount: number;
}

export interface CertificateApiResponse {
  success: boolean;
  status: 'ISSUED' | 'ELIGIBLE' | 'NOT_ELIGIBLE';
  isEligible: boolean;
  certificate: CertificateData | null;
  defaultName?: string;
  error?: string;
  progress?: {
    completedCount: number;
    totalCount: number;
    percent: number;
    missingCount?: number;
    finalProjectVerified?: boolean;
  };
}

export async function fetchCertificate(): Promise<CertificateApiResponse> {
  const token = localStorage.getItem(SESSION_KEY);
  if (!token) {
    throw new Error('UNAUTHENTICATED');
  }

  const res = await fetch(`${API_BASE}/user/certificate`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401 || res.status === 403) {
    const data = await res.json().catch(() => ({}));
    if (data.error && data.error.includes('curriculum')) {
      return {
        success: false,
        status: 'NOT_ELIGIBLE',
        isEligible: false,
        certificate: null,
        error: data.error,
        progress: data.progress,
      };
    }
    throw new Error('UNAUTHENTICATED');
  }

  if (!res.ok) {
    throw new Error(`SERVER_ERROR_${res.status}`);
  }

  return await res.json();
}

export async function requestCertificate(name: string): Promise<CertificateApiResponse> {
  const token = localStorage.getItem(SESSION_KEY);
  if (!token) {
    throw new Error('UNAUTHENTICATED');
  }

  const res = await fetch(`${API_BASE}/user/certificate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  if (res.status === 401) {
    throw new Error('UNAUTHENTICATED');
  }

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || `HTTP_${res.status}`);
  }

  return data;
}

/* ── Merchant Payments, Verification & Entitlements ────── */

export interface PaymentConfigResponse {
  success: boolean;
  provider: MerchantProviderType;
  liveCredentialsConfigured: boolean;
  providerModeLabel: string;
  plans: PlanCatalogItem[];
}

export interface EntitlementResponse {
  success: boolean;
  authenticated: boolean;
  user?: AuthUser;
  entitlement: StudentEntitlementSummary;
  orders?: PaymentOrderRecord[];
}

export interface LessonAccessResponse {
  success: boolean;
  allowed: boolean;
  isFree: boolean;
  reason?: string;
  entitlement: StudentEntitlementSummary;
}

export async function fetchPaymentConfig(): Promise<PaymentConfigResponse> {
  const res = await fetch(`${API_BASE}/payments/config`);
  return await parseJsonSafe<PaymentConfigResponse>(res);
}

export async function fetchEntitlement(): Promise<EntitlementResponse> {
  const res = await fetch(`${API_BASE}/payments/entitlement`, {
    headers: { ...getAuthHeaders() },
  });
  return await parseJsonSafe<EntitlementResponse>(res);
}

export async function fetchLessonAccess(lessonId: string): Promise<LessonAccessResponse> {
  const res = await fetch(`${API_BASE}/lessons/${encodeURIComponent(lessonId)}/access`, {
    headers: { ...getAuthHeaders() },
  });
  return await parseJsonSafe<LessonAccessResponse>(res);
}

export async function createPaymentOrder(payload: {
  planId?: string;
  licenceType?: string;
}): Promise<{ success: boolean; order?: PaymentOrderRecord; error?: string }> {
  const res = await fetch(`${API_BASE}/payments/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(payload),
  });
  return await parseJsonSafe(res);
}

export async function submitSandboxAuthorize(payload: {
  orderId: string;
  scenario: 'succeed' | 'pending' | 'delayed_timeout' | 'fail' | 'amount_mismatch';
  paymentMethodSummary?: string;
}): Promise<{ success: boolean; order?: PaymentOrderRecord; error?: string }> {
  const res = await fetch(`${API_BASE}/payments/sandbox-authorize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(payload),
  });
  return await parseJsonSafe(res);
}

export async function verifyPaymentOrder(
  orderId: string,
  extraPayload: Record<string, unknown> = {}
): Promise<{
  success: boolean;
  verified: boolean;
  pendingVerification: boolean;
  order?: PaymentOrderRecord;
  subscription?: PaidSubscriptionRecord | null;
  entitlement?: StudentEntitlementSummary;
  error?: string;
}> {
  const res = await fetch(`${API_BASE}/payments/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ orderId, ...extraPayload }),
  });
  return await parseJsonSafe(res);
}

export async function pollOrderStatus(orderId: string): Promise<{
  success: boolean;
  order?: PaymentOrderRecord;
  entitlement?: StudentEntitlementSummary;
  error?: string;
}> {
  const res = await fetch(`${API_BASE}/payments/status/${encodeURIComponent(orderId)}`, {
    headers: { ...getAuthHeaders() },
  });
  return await parseJsonSafe(res);
}

export async function cancelMonthlySubscription(subscriptionId?: string): Promise<{
  success: boolean;
  subscription?: PaidSubscriptionRecord;
  entitlement?: StudentEntitlementSummary;
  error?: string;
}> {
  const res = await fetch(`${API_BASE}/payments/cancel-subscription`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ subscriptionId }),
  });
  return await parseJsonSafe(res);
}

export async function fetchMerchantDashboard(): Promise<{
  success: boolean;
  summary: MerchantDashboardSummary;
}> {
  const res = await fetch(`${API_BASE}/payments/merchant-dashboard`, {
    headers: { ...getAuthHeaders() },
  });
  return await parseJsonSafe(res);
}

export async function reconcileMerchantSettlement(
  orderId: string,
  payoutReference?: string
): Promise<{ success: boolean; order?: PaymentOrderRecord; error?: string }> {
  const res = await fetch(`${API_BASE}/payments/reconcile-settlement`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ orderId, payoutReference }),
  });
  return await parseJsonSafe(res);
}

export async function refundMerchantOrder(
  orderId: string,
  reason?: string
): Promise<{ success: boolean; order?: PaymentOrderRecord; error?: string }> {
  const res = await fetch(`${API_BASE}/payments/refund`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ orderId, reason }),
  });
  return await parseJsonSafe(res);
}


