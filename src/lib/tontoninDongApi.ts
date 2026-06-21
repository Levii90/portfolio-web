import type { MediaItem } from '../types/media';
import { transformMovieBoxItem, transformOtakudesuItem } from './mediaTransformer';

const useApi = import.meta.env.VITE_TONTONINDONG_USE_API === 'true';

async function proxyFetch(proxyPath: string, params?: Record<string, string>) {
  const url = new URL(proxyPath, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    const text = await response.text();
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { message: text };
    }
    throw new Error(parsed.error || parsed.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}

function extractList(raw: any): any[] {
  if (!raw) {
    return [];
  }
  if (Array.isArray(raw)) {
    return raw;
  }
  if (Array.isArray(raw?.data)) {
    return raw.data;
  }
  if (Array.isArray(raw?.results)) {
    return raw.results;
  }
  if (Array.isArray(raw?.items)) {
    return raw.items;
  }
  if (Array.isArray(raw?.list)) {
    return raw.list;
  }
  return [];
}

function extractDetail(raw: any) {
  if (!raw) {
    return null;
  }
  return raw.data || raw.result || raw.item || raw;
}

export async function fetchMovieBox(path: string, params?: Record<string, string>) {
  if (!useApi) {
    throw new Error('MovieBox API is disabled. Set VITE_TONTONINDONG_USE_API=true to enable.');
  }
  return proxyFetch(`/api/moviebox?path=${encodeURIComponent(path)}`, params);
}

export async function fetchOtakudesu(path: string, params?: Record<string, string>) {
  if (!useApi) {
    throw new Error('Otakudesu API is disabled. Set VITE_TONTONINDONG_USE_API=true to enable.');
  }
  return proxyFetch(`/api/otakudesu?path=${encodeURIComponent(path)}`, params);
}

export async function getTrendingMovies(): Promise<MediaItem[]> {
  const raw = await fetchMovieBox('/movies/trending');
  return extractList(raw).map(transformMovieBoxItem);
}

export async function searchMovies(query: string): Promise<MediaItem[]> {
  const raw = await fetchMovieBox('/movies/search', { q: query });
  return extractList(raw).map(transformMovieBoxItem);
}

export async function getMovieDetail(id: string): Promise<MediaItem> {
  const raw = await fetchMovieBox(`/movies/detail/${encodeURIComponent(id)}`);
  const detail = extractDetail(raw);
  return transformMovieBoxItem(detail);
}

export async function getMovieStream(id: string): Promise<any> {
  return fetchMovieBox(`/movies/watch/${encodeURIComponent(id)}`);
}

export async function getLatestAnime(): Promise<MediaItem[]> {
  const raw = await fetchOtakudesu('/anime/latest');
  return extractList(raw).map(transformOtakudesuItem);
}

export async function searchAnime(query: string): Promise<MediaItem[]> {
  const raw = await fetchOtakudesu('/anime/search', { q: query });
  return extractList(raw).map(transformOtakudesuItem);
}

export async function getAnimeDetail(id: string): Promise<MediaItem> {
  const raw = await fetchOtakudesu(`/anime/detail/${encodeURIComponent(id)}`);
  const detail = extractDetail(raw);
  return transformOtakudesuItem(detail);
}

export async function getAnimeStream(id: string): Promise<any> {
  return fetchOtakudesu(`/anime/watch/${encodeURIComponent(id)}`);
}
