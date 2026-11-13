import { StructuredLesson } from '../lesson-engine/types';

export interface StorehouseRecord {
  id: string;
  userId?: string;
  title: string;
  type: 'lesson' | 'note' | 'chat-excerpt' | 'snippet';
  data: StructuredLesson | any;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

const LOCAL_STORAGE_KEY = 'zerotowebsite_storehouse_records';

/**
 * Get all Storehouse items: queries server API first, falls back to localStorage mirror.
 */
export async function fetchStorehouseItems(): Promise<StorehouseRecord[]> {
  try {
    const res = await fetch('/api/user/storehouse');
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.items)) {
        // Update local mirror
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(json.items));
        return json.items;
      }
    }
  } catch (err) {
    console.warn('[StorehouseService] API offline, loading from local mirror:', err);
  }

  // Fallback to local storage mirror
  try {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (local) {
      return JSON.parse(local);
    }
  } catch {}

  return [];
}

/**
 * Save or update a Storehouse record on the server and local mirror.
 */
export async function saveStorehouseRecord(
  record: Omit<StorehouseRecord, 'createdAt' | 'updatedAt'>
): Promise<StorehouseRecord> {
  const now = new Date().toISOString();
  const payload = {
    ...record,
    createdAt: (record as any).createdAt || now,
    updatedAt: now,
  };

  try {
    const res = await fetch('/api/user/storehouse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.item) {
        // Sync local mirror
        updateLocalMirror(json.item);
        return json.item;
      }
    }
  } catch (err) {
    console.warn('[StorehouseService] API error during save, caching locally:', err);
  }

  // Local fallback
  const fullRecord: StorehouseRecord = {
    ...payload,
    createdAt: (payload as any).createdAt || now,
    updatedAt: now,
  };
  updateLocalMirror(fullRecord);
  return fullRecord;
}

/**
 * Delete a Storehouse record by ID.
 */
export async function deleteStorehouseRecord(id: string): Promise<boolean> {
  try {
    await fetch(`/api/user/storehouse/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
  } catch (err) {
    console.warn('[StorehouseService] Delete failed on server:', err);
  }

  // Remove from local mirror
  try {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (local) {
      const items: StorehouseRecord[] = JSON.parse(local);
      const filtered = items.filter((i) => i.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    }
  } catch {}

  return true;
}

function updateLocalMirror(item: StorehouseRecord): void {
  try {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    let items: StorehouseRecord[] = local ? JSON.parse(local) : [];
    const idx = items.findIndex((i) => i.id === item.id);
    if (idx >= 0) {
      items[idx] = item;
    } else {
      items.unshift(item);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.warn('[StorehouseService] Local mirror write error:', err);
  }
}
