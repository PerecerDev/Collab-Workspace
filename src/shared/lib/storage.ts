const SESSION_KEY = 'collab-workspace-session';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function readStorage<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

function removeStorage(key: string): void {
  localStorage.removeItem(key);
}

export const storage = {
  get: readStorage,
  set: writeStorage,
  remove: removeStorage,
  SESSION_KEY,
};

export { delay };
