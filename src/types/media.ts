export type MediaType = 'anime' | 'movie' | 'tv';

export interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  year: number;
  genre: string[];
  status: string;
  rating: number;
  poster: string;
  backdrop: string;
  description: string;
  episodes?: number;
  videoUrl: string;
}
