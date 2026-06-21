import { useEffect, useState } from 'react';

export interface MediaProgress {
  mediaId: string;
  currentTime: number;
  duration: number;
  updatedAt: string;
}

const PROGRESS_KEY = 'tontonindong_continue_watching';

export function useContinueWatching() {
  const [progressList, setProgressList] = useState<MediaProgress[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(PROGRESS_KEY);
      if (stored) {
        setProgressList(JSON.parse(stored));
      }
    } catch {
      setProgressList([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressList));
    } catch {
      // ignore storage errors
    }
  }, [progressList]);

  function saveProgress(mediaId: string, currentTime: number, duration: number) {
    const percentage = duration ? (currentTime / duration) * 100 : 0;
    if (percentage > 95) {
      removeProgress(mediaId);
      return;
    }

    setProgressList((current) => {
      const existing = current.find((item) => item.mediaId === mediaId);
      const next = {
        mediaId,
        currentTime,
        duration,
        updatedAt: new Date().toISOString()
      };
      if (existing) {
        return current.map((item) => (item.mediaId === mediaId ? next : item));
      }
      return [...current, next];
    });
  }

  function getProgress(mediaId: string) {
    return progressList.find((item) => item.mediaId === mediaId);
  }

  function removeProgress(mediaId: string) {
    setProgressList((current) => current.filter((item) => item.mediaId !== mediaId));
  }

  return { progressList, saveProgress, getProgress, removeProgress };
}
