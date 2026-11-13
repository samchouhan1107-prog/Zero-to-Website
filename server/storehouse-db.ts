import fs from 'fs';
import path from 'path';

export interface StorehouseItem {
  id: string;
  userId: string;
  title: string;
  type: 'lesson' | 'note' | 'chat-excerpt' | 'snippet';
  data: any;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

const DATA_FILE = path.join(process.cwd(), 'server', 'storehouse-data.json');

// In-memory cache synced to disk
let storehouseMemory: StorehouseItem[] = [];

function loadFromDisk(): void {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      storehouseMemory = JSON.parse(raw);
    } else {
      storehouseMemory = [];
      saveToDisk();
    }
  } catch (err) {
    console.warn('[StorehouseDB] Could not read data file, using in-memory store:', err);
    storehouseMemory = [];
  }
}

function saveToDisk(): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(storehouseMemory, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[StorehouseDB] Failed to persist data file:', err);
  }
}

// Initial load
loadFromDisk();

export function getAllStorehouseItems(userId: string = 'default'): StorehouseItem[] {
  return storehouseMemory.filter((item) => item.userId === userId || item.userId === 'default');
}

export function getStorehouseItemById(id: string, userId: string = 'default'): StorehouseItem | null {
  const item = storehouseMemory.find(
    (i) => i.id === id && (i.userId === userId || i.userId === 'default')
  );
  return item || null;
}

export function saveStorehouseItem(
  userId: string = 'default',
  itemData: Omit<StorehouseItem, 'createdAt' | 'updatedAt'>
): StorehouseItem {
  const existingIdx = storehouseMemory.findIndex(
    (i) => i.id === itemData.id && (i.userId === userId || i.userId === 'default')
  );

  const now = new Date().toISOString();
  if (existingIdx >= 0) {
    const updated: StorehouseItem = {
      ...storehouseMemory[existingIdx],
      ...itemData,
      updatedAt: now,
    };
    storehouseMemory[existingIdx] = updated;
    saveToDisk();
    return updated;
  } else {
    const newItem: StorehouseItem = {
      ...itemData,
      userId,
      createdAt: now,
      updatedAt: now,
    };
    storehouseMemory.unshift(newItem);
    saveToDisk();
    return newItem;
  }
}

export function deleteStorehouseItem(id: string, userId: string = 'default'): boolean {
  const initialLength = storehouseMemory.length;
  storehouseMemory = storehouseMemory.filter(
    (i) => !(i.id === id && (i.userId === userId || i.userId === 'default'))
  );
  if (storehouseMemory.length !== initialLength) {
    saveToDisk();
    return true;
  }
  return false;
}
