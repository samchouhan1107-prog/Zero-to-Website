// Brain Storage & 365-Day Vault Management
import {
  BrainNote,
  BrainBackupSnapshot,
  INITIAL_BRAIN_NOTES,
  get365BonusForDay,
  BrainBonusDay
} from '../data/brainCardData';

const STORAGE_KEY = 'webzonebw_brain_card_data';
const BACKUP_HISTORY_KEY = 'webzonebw_brain_365_backups';

export interface BrainStoreState {
  notes: BrainNote[];
  claimedDays: number[];
  lastBonusClaimedTimestamp: number; // epoch ms
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  customCommands: Array<{ name: string; cmd: string; notes: string }>;
  dailyBonusDayOverride?: number;
}

// Calculate current day of year (1-365)
export function getCurrentDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return Math.max(1, Math.min(365, dayOfYear));
}

// Get initial state
function getDefaultState(): BrainStoreState {
  return {
    notes: INITIAL_BRAIN_NOTES,
    claimedDays: [1], // Day 1 claimed by default as welcome bonus
    lastBonusClaimedTimestamp: 0,
    streakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    customCommands: [
      { name: 'User Temp Wipe', cmd: '%temp%', notes: 'Clean browser & app cache files' },
      { name: 'System Temp Wipe', cmd: 'temp', notes: 'Clean OS install leftovers' },
      { name: 'Prefetch Refresh', cmd: 'prefetch', notes: 'Purge stale app traces' }
    ]
  };
}

// Load Brain Store State
export function getBrainStoreState(): BrainStoreState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const defaultState = getDefaultState();
      saveBrainStoreState(defaultState);
      return defaultState;
    }
    const parsed = JSON.parse(raw);
    return {
      notes: Array.isArray(parsed.notes) ? parsed.notes : INITIAL_BRAIN_NOTES,
      claimedDays: Array.isArray(parsed.claimedDays) ? parsed.claimedDays : [1],
      lastBonusClaimedTimestamp: typeof parsed.lastBonusClaimedTimestamp === 'number' ? parsed.lastBonusClaimedTimestamp : 0,
      streakDays: typeof parsed.streakDays === 'number' ? parsed.streakDays : 1,
      lastActiveDate: parsed.lastActiveDate || new Date().toISOString().split('T')[0],
      customCommands: Array.isArray(parsed.customCommands) ? parsed.customCommands : [],
      dailyBonusDayOverride: parsed.dailyBonusDayOverride
    };
  } catch (e) {
    console.error('Error loading Brain Store state:', e);
    return getDefaultState();
  }
}

// Save Brain Store State
export function saveBrainStoreState(state: BrainStoreState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving Brain Store state:', e);
  }
}

// Calculate 24h Daily Bonus Status
export interface DailyBonusStatus {
  currentDayOfYear: number;
  isClaimable: boolean;
  secondsRemaining: number;
  lastClaimDate?: string;
  nextBonusTime: string;
  todayBonus: BrainBonusDay;
}

export function getDailyBonusStatus(): DailyBonusStatus {
  const state = getBrainStoreState();
  const currentDayOfYear = state.dailyBonusDayOverride || getCurrentDayOfYear();
  const now = Date.now();
  const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

  const lastClaimed = state.lastBonusClaimedTimestamp;
  const timeElapsed = now - lastClaimed;
  
  // If never claimed, or >= 24h passed, or today's day number hasn't been claimed yet
  const hasClaimedToday = state.claimedDays.includes(currentDayOfYear);
  const isClaimable = !hasClaimedToday || (timeElapsed >= TWENTY_FOUR_HOURS_MS);

  const secondsRemaining = isClaimable ? 0 : Math.max(0, Math.ceil((TWENTY_FOUR_HOURS_MS - timeElapsed) / 1000));

  const nextBonusDate = new Date(lastClaimed + TWENTY_FOUR_HOURS_MS);

  return {
    currentDayOfYear,
    isClaimable,
    secondsRemaining,
    lastClaimDate: lastClaimed > 0 ? new Date(lastClaimed).toLocaleString() : undefined,
    nextBonusTime: nextBonusDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    todayBonus: get365BonusForDay(currentDayOfYear)
  };
}

// Claim Daily Bonus
export function claimDailyBonusAction(dayNumber?: number): { success: boolean; bonus: BrainBonusDay; xpEarned: number } {
  const state = getBrainStoreState();
  const targetDay = dayNumber || state.dailyBonusDayOverride || getCurrentDayOfYear();
  const bonus = get365BonusForDay(targetDay);

  const now = Date.now();
  const todayStr = new Date().toISOString().split('T')[0];

  // Update streak
  let newStreak = state.streakDays;
  if (state.lastActiveDate !== todayStr) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (state.lastActiveDate === yesterday) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }
  }

  const newClaimedDays = Array.from(new Set([...state.claimedDays, targetDay]));

  const updatedState: BrainStoreState = {
    ...state,
    claimedDays: newClaimedDays,
    lastBonusClaimedTimestamp: now,
    streakDays: newStreak,
    lastActiveDate: todayStr
  };

  saveBrainStoreState(updatedState);
  createAutomaticDailySnapshot(updatedState);

  return {
    success: true,
    bonus,
    xpEarned: bonus.xpReward
  };
}

// Notes Management
export function addBrainNote(note: Omit<BrainNote, 'id' | 'createdAt' | 'updatedAt'>): BrainNote {
  const state = getBrainStoreState();
  const newNote: BrainNote = {
    ...note,
    id: `note-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const updatedNotes = [newNote, ...state.notes];
  saveBrainStoreState({ ...state, notes: updatedNotes });
  createAutomaticDailySnapshot({ ...state, notes: updatedNotes });
  return newNote;
}

export function updateBrainNote(id: string, updates: Partial<BrainNote>): BrainNote | null {
  const state = getBrainStoreState();
  const index = state.notes.findIndex(n => n.id === id);
  if (index === -1) return null;

  const updatedNote: BrainNote = {
    ...state.notes[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  const updatedNotes = [...state.notes];
  updatedNotes[index] = updatedNote;

  saveBrainStoreState({ ...state, notes: updatedNotes });
  return updatedNote;
}

export function deleteBrainNote(id: string): boolean {
  const state = getBrainStoreState();
  const filtered = state.notes.filter(n => n.id !== id);
  if (filtered.length === state.notes.length) return false;

  saveBrainStoreState({ ...state, notes: filtered });
  return true;
}

// 365-Day Automatic Rolling Snapshots & Local Vault
function createAutomaticDailySnapshot(state: BrainStoreState): void {
  try {
    const raw = localStorage.getItem(BACKUP_HISTORY_KEY);
    const history: Array<{ date: string; notesCount: number; timestamp: number }> = raw ? JSON.parse(raw) : [];

    const todayStr = new Date().toISOString().split('T')[0];
    const existsToday = history.some(h => h.date === todayStr);

    if (!existsToday) {
      history.unshift({
        date: todayStr,
        notesCount: state.notes.length,
        timestamp: Date.now()
      });
      // Keep last 365 days rolling history
      if (history.length > 365) history.pop();
      localStorage.setItem(BACKUP_HISTORY_KEY, JSON.stringify(history));
    }
  } catch (e) {
    console.error('Error creating auto snapshot:', e);
  }
}

export function getBackupHistory(): Array<{ date: string; notesCount: number; timestamp: number }> {
  try {
    const raw = localStorage.getItem(BACKUP_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// 365-Day Backup Export
export function export365Backup(): BrainBackupSnapshot {
  const state = getBrainStoreState();
  return {
    version: '2.0-webzonebw-brain',
    exportedAt: new Date().toISOString(),
    dayOfYear: getCurrentDayOfYear(),
    streakDays: state.streakDays,
    notes: state.notes,
    unlockedDays: state.claimedDays,
    claimedDays: state.claimedDays,
    lastBonusClaimedTimestamp: state.lastBonusClaimedTimestamp,
    stats: {
      totalNotes: state.notes.length,
      totalBonusesClaimed: state.claimedDays.length,
      maintenanceCommandsUsed: state.customCommands.length
    }
  };
}

// Trigger browser file download
export function downloadBackupFile(): void {
  const backup = export365Backup();
  const jsonStr = JSON.stringify(backup, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `webzonebw_brain_backup_365d_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Import & Restore 365-Day Backup
export function restoreBackupData(jsonString: string): { success: boolean; message: string; notesCount: number } {
  try {
    const data = JSON.parse(jsonString);
    if (!data || !Array.isArray(data.notes)) {
      return { success: false, message: 'Invalid backup format: missing notes array.', notesCount: 0 };
    }

    const currentState = getBrainStoreState();
    // Merge or replace
    const mergedNotes = [...data.notes];
    const mergedClaimed = Array.from(new Set([...(currentState.claimedDays || []), ...(data.claimedDays || [])]));

    const restoredState: BrainStoreState = {
      notes: mergedNotes,
      claimedDays: mergedClaimed,
      lastBonusClaimedTimestamp: typeof data.lastBonusClaimedTimestamp === 'number' ? data.lastBonusClaimedTimestamp : currentState.lastBonusClaimedTimestamp,
      streakDays: typeof data.streakDays === 'number' ? data.streakDays : currentState.streakDays,
      lastActiveDate: new Date().toISOString().split('T')[0],
      customCommands: currentState.customCommands
    };

    saveBrainStoreState(restoredState);
    createAutomaticDailySnapshot(restoredState);

    return {
      success: true,
      message: `Successfully restored ${mergedNotes.length} Brain Notes and ${mergedClaimed.length} Daily Bonuses!`,
      notesCount: mergedNotes.length
    };
  } catch (err: any) {
    return { success: false, message: `Failed to parse backup JSON: ${err.message}`, notesCount: 0 };
  }
}
