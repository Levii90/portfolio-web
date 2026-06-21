import type { MediaItem } from '../types/media';

const FALLBACK_IMAGE = 'https://picsum.photos/seed/tontonindong-fallback/300/420';

type RawMedia = Record<string, any>;

function toString(value: unknown) {
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  return value == null ? '' : String(value);
}

function toNumber(value: unknown) {
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === 'string');
  }
  if (typeof value === 'string') {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

function safePoster(raw: RawMedia) {
  return (
    raw.poster ||
    raw.image ||
    raw.thumbnail ||
    raw.cover ||
    raw.backdrop ||
    raw.background ||
    raw.picture ||
    FALLBACK_IMAGE
  );
}

function safeBackdrop(raw: RawMedia, fallback: string) {
  return raw.backdrop || raw.cover || raw.background || raw.poster || raw.image || fallback;
}

function resolveId(raw: RawMedia) {
  return (
    String(raw.id || raw.slug || raw.mal_id || raw.movieId || raw.animeId || raw.url || raw.link || '')
      .trim()
      .replace(/^\/|\/$/g, '') ||
    `unknown-${Math.random().toString(36).slice(2, 8)}`
  );
}

function resolveType(raw: RawMedia, source: 'moviebox' | 'otakudesu'): MediaItem['type'] {
  const knownType = String(raw.type || raw.category || raw.mediaType || '').toLowerCase();
  if (knownType.includes('anime')) return 'anime';
  if (knownType.includes('tv')) return 'tv';
  if (knownType.includes('movie')) return 'movie';
  return source === 'otakudesu' ? 'anime' : 'movie';
}

export function transformMovieBoxItem(raw: RawMedia): MediaItem {
  const poster = safePoster(raw);
  const backdrop = safeBackdrop(raw, poster);

  return {
    id: resolveId(raw),
    title: raw.title || raw.name || raw.movie_title || 'Untitled',
    type: resolveType(raw, 'moviebox'),
    year: toNumber(raw.year || raw.release_year || raw.date),
    episode: raw.episode || raw.currentEpisode || undefined,
    postedBy: raw.postedBy || raw.author || raw.source || undefined,
    releasedAt: raw.releasedAt || raw.releaseDate || raw.updatedAt || undefined,
    genre: toArray(raw.genre || raw.genres || raw.category),
    status: raw.status || raw.state || 'Released',
    rating: toNumber(raw.rating || raw.score || raw.ratingValue),
    poster,
    backdrop,
    description:
      raw.description || raw.synopsis || raw.overview || raw.summary || 'No description available.',
    videoUrl:
      raw.videoUrl || raw.streamUrl || raw.url || raw.sourceUrl || raw.watchUrl || undefined,
    source: 'moviebox'
  };
}

export function transformOtakudesuItem(raw: RawMedia): MediaItem {
  const poster = safePoster(raw);
  const backdrop = safeBackdrop(raw, poster);

  return {
    id: resolveId(raw),
    title: raw.title || raw.name || raw.anime_title || 'Untitled',
    type: resolveType(raw, 'otakudesu'),
    year: toNumber(raw.year || raw.release_year || raw.date),
    episode: raw.episode || raw.currentEpisode || raw.eps || undefined,
    postedBy: raw.postedBy || raw.author || raw.uploader || undefined,
    releasedAt: raw.releasedAt || raw.releaseDate || raw.updatedAt || undefined,
    genre: toArray(raw.genre || raw.genres || raw.category),
    status: raw.status || raw.state || 'Ongoing',
    rating: toNumber(raw.rating || raw.score || raw.ratingValue),
    poster,
    backdrop,
    description:
      raw.description || raw.synopsis || raw.overview || raw.summary || 'No description available.',
    videoUrl:
      raw.videoUrl || raw.streamUrl || raw.url || raw.sourceUrl || raw.watchUrl || undefined,
    source: 'otakudesu'
  };
}

export function resolveStreamUrl(raw: any): string | undefined {
  if (!raw) {
    return undefined;
  }

  const candidates = [
    raw.videoUrl,
    raw.streamUrl,
    raw.url,
    raw.sourceUrl,
    raw.watchUrl,
    raw.playbackUrl,
    raw.link,
    raw.data?.videoUrl,
    raw.data?.streamUrl,
    raw.data?.url,
    raw.data?.sources?.[0]?.url,
    raw.sources?.[0]?.url
  ];

  return candidates.find((value) => typeof value === 'string' && value.length > 0);
}

export function resolveIframeUrl(raw: any): string | undefined {
  if (!raw) {
    return undefined;
  }

  return (
    raw.iframe ||
    raw.embedUrl ||
    raw.data?.iframe ||
    raw.data?.embedUrl ||
    raw.embed ||
    undefined
  );
}
