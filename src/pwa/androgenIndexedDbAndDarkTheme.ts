// IndexedDB Migrations (v1 - v3) & Dark Theme Tokens for Androgen OS

export interface FocusSession { id: string; startTime: number; durationMinutes: number; completed: boolean; }
export interface AudioProfile { id: string; name: string; presetFreq: number; volume: number; }
export interface OfflineSyncItem { id: string; endpoint: string; payload: any; timestamp: number; }

export function initIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('AndrogenOS_DB', 3);
    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = request.result;
      if (event.oldVersion < 1) {
        if (!db.objectStoreNames.contains('focus_sessions')) {
          db.createObjectStore('focus_sessions', { keyPath: 'id' });
        }
      }
      if (event.oldVersion < 2) {
        if (!db.objectStoreNames.contains('audio_profiles')) {
          db.createObjectStore('audio_profiles', { keyPath: 'id' });
        }
      }
      if (event.oldVersion < 3) {
        if (!db.objectStoreNames.contains('offline_sync_queue')) {
          db.createObjectStore('offline_sync_queue', { keyPath: 'id' });
        }
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export const themeTokens = {
  obsidianNavy: '#0b0f19',
  slateWhite: '#f1f5f9',
  signalAmber: '#f59e0b',
  highContrastPWA: {
    background: '#0b0f19',
    text: '#f1f5f9',
    accent: '#f59e0b',
    border: '#1e293b',
  },
};

export const darkThemeCSS = `
:root {
  --bg-obsidian: #0b0f19;
  --text-slate: #f1f5f9;
  --accent-amber: #f59e0b;
}
body {
  background-color: var(--bg-obsidian);
  color: var(--text-slate);
}
.pwa-container {
  border: 1px solid #1e293b;
  accent-color: var(--accent-amber);
}
`;
