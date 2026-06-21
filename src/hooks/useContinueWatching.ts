import { useEffect, useState } from 'react';
import type { MediaSource } from '../types/media';

export interface MediaProgress {
  mediaId: string;
  source: MediaSource;
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

  function saveProgress(mediaId: string, source: MediaSource, currentTime: number, duration: number) {
    const percentage = duration ? (currentTime / duration) * 100 : 0;
    if (percentage > 95) {
      removeProgress(mediaId, source);
      return;
    }

    setProgressList((current) => {
      const next: MediaProgress = {
        mediaId,
        source,
        currentTime,
        duration,
        updatedAt: new Date().toISOString()
      };
      const exists = current.find((item) => item.mediaId === mediaId && item.source === source);
      if (exists) {
        return current.map((item) =>
          item.mediaId === mediaId && item.source === source ? next : item
        );
      }
      return [...current, next];
    });
  }

  function getProgress(mediaId: string, source: MediaSource) {
    return progressList.find((item) => item.mediaId === mediaId && item.source === source);
  }

  function removeProgress(mediaId: string, source: MediaSource) {
    setProgressList((current) => current.filter((item) => !(item.mediaId === mediaId && item.source === source)));
  }

  return { progressList, saveProgress, getProgress, removeProgress };
}
