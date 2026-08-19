import { useCallback, useEffect, useState } from 'react';

export interface RecentVisit {
  path: string;
  title: string;
  timestamp: number;
}

const STORAGE_KEY = 'pigeon-recent-visits';
const MAX_VISITS = 8;

function loadVisits(): RecentVisit[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveVisits(visits: RecentVisit[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visits));
  } catch {
    /* ignore */
  }
}

export function useRecentVisits() {
  const [visits, setVisits] = useState<RecentVisit[]>([]);

  useEffect(() => {
    setVisits(loadVisits());
  }, []);

  const recordVisit = useCallback((path: string, title: string) => {
    if (!path || path === '/' || path === '') return;
    setVisits((prev) => {
      const filtered = prev.filter((v) => v.path !== path);
      const updated = [{ path, title, timestamp: Date.now() }, ...filtered].slice(0, MAX_VISITS);
      saveVisits(updated);
      return updated;
    });
  }, []);

  const clearVisits = useCallback(() => {
    saveVisits([]);
    setVisits([]);
  }, []);

  return { visits, recordVisit, clearVisits };
}
