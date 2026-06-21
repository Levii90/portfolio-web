import { useEffect, useState } from 'react';
import type { MediaSource } from '../types/media';

const WATCHLIST_KEY = 'tontonindong_watchlist';

function createWatchlistKey(id: string, source: MediaSource) {
  return `${source}:${id}`;
}

export function useMediaWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(WATCHLIST_KEY);
      if (stored) {
        setWatchlist(JSON.parse(stored));
      }
    } catch {
      setWatchlist([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
    } catch {
      // ignore storage errors
    }
  }, [watchlist]);

  function toggleWatchlist(id: string, source: MediaSource) {
    const watchKey = createWatchlistKey(id, source);
    setWatchlist((current) => {
      const exists = current.includes(watchKey);
      return exists ? current.filter((item) => item !== watchKey) : [...current, watchKey];
    });
  }

  function isInWatchlist(id: string, source: MediaSource) {
    return watchlist.includes(createWatchlistKey(id, source));
  }

  return { watchlist, toggleWatchlist, isInWatchlist };
}
