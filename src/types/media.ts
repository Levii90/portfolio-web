export type MediaType = 'anime' | 'movie' | 'tv';

export interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  year?: number;
  episode?: string;
  postedBy?: string;
  releasedAt?: string;
  genre: string[];
  status?: string;
  rating?: number;
  poster: string;
  backdrop: string;
  description: string;
  videoUrl?: string;
  source: 'moviebox' | 'otakudesu';
}
