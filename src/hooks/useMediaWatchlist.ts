import { useEffect, useState } from 'react';

const WATCHLIST_KEY = 'tontonindong_watchlist';

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

  function toggleWatchlist(id: string) {
    setWatchlist((current) => {
      const exists = current.includes(id);
      return exists ? current.filter((item) => item !== id) : [...current, id];
    });
  }

  function isInWatchlist(id: string) {
    return watchlist.includes(id);
  }

  return { watchlist, toggleWatchlist, isInWatchlist };
}
