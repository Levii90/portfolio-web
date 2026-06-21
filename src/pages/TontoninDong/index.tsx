import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles } from 'lucide-react';
import { useContinueWatching } from '../../hooks/useContinueWatching';
import { useMediaWatchlist } from '../../hooks/useMediaWatchlist';
import TontoninDongNavbar from './TontoninDongNavbar';
import type { MediaItem } from '../../types/media';
import { getLatestAnime, getTrendingMovies, searchAnime, searchMovies } from '../../lib/tontoninDongApi';
import { mediaItems as fallbackMediaItems } from '../../data/tontoninDong';

const modes = ['All', 'Anime', 'Movie', 'TV'] as const;

type Mode = (typeof modes)[number];

function TontoninDong() {
  const [mode, setMode] = useState<Mode>('All');
  const [search, setSearch] = useState('');
  const [items, setItems] = useState<MediaItem[]>([]);
  const [latestAnime, setLatestAnime] = useState<MediaItem[]>([]);
  const [movieProjects, setMovieProjects] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { watchlist, toggleWatchlist, isInWatchlist } = useMediaWatchlist();
  const { progressList } = useContinueWatching();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const [animeData, movieData] = await Promise.all([getLatestAnime(), getTrendingMovies()]);
        const normalizedAnime = animeData.map((item) => ({ ...item, source: 'otakudesu' as const }));
        const normalizedMovies = movieData.map((item) => ({ ...item, source: 'moviebox' as const }));

        setLatestAnime(normalizedAnime.slice(0, 6));
        setMovieProjects(normalizedMovies.slice(0, 6));
        setItems([...normalizedAnime, ...normalizedMovies]);
      } catch (err) {
        setError(
          'API belum aktif atau endpoint belum sesuai. Pastikan API berjalan di localhost:8000 atau env production sudah diatur.'
        );
        setItems(fallbackMediaItems.map((item) => ({ ...item, source: 'moviebox' } as MediaItem)));
        setLatestAnime(fallbackMediaItems.filter((item) => item.type === 'anime').slice(0, 6));
        setMovieProjects(fallbackMediaItems.filter((item) => item.type !== 'anime').slice(0, 6));
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    async function searchData() {
      if (!search.trim()) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const queries: Promise<MediaItem[]>[] = [];

        if (mode === 'All' || mode === 'Anime') {
          queries.push(searchAnime(search).then((list) => list.map((item) => ({ ...item, source: 'otakudesu' } as MediaItem))));
        }

        if (mode === 'All' || mode === 'Movie' || mode === 'TV') {
          queries.push(searchMovies(search).then((list) => list.map((item) => ({ ...item, source: 'moviebox' } as MediaItem))));
        }

        const results = await Promise.all(queries);
        setItems(results.flat());
      } catch (err) {
        setError(
          'Search API gagal. Pastikan API berjalan di localhost:8000 atau endpoint belum sesuai.'
        );
      } finally {
        setLoading(false);
      }
    }

    const timeout = setTimeout(() => {
      if (search.trim()) {
        void searchData();
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, mode]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const typeMatch = mode === 'All' || item.type === mode.toLowerCase();
      const searchMatch = [item.title, ...item.genre].some((value) =>
        value.toLowerCase().includes(search.toLowerCase())
      );
      return typeMatch && searchMatch;
    });
  }, [items, mode, search]);

  const top10Items = useMemo(() => {
    return [...filteredItems].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 10);
  }, [filteredItems]);

  const continueItems = progressList
    .map((progress) => items.find((item) => item.id === progress.mediaId && item.source === progress.source))
    .filter(Boolean) as MediaItem[];

  const watchlistItems = watchlist
    .map((watchId) => items.find((item) => item.id === watchId) ?? fallbackMediaItems.find((item) => item.id === watchId))
    .filter(Boolean) as MediaItem[];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <TontoninDongNavbar
        search={search}
        onSearchChange={(event) => setSearch(event.target.value)}
        mode={mode}
        setMode={setMode}
      />
      <main className="mx-auto max-w-[1180px] px-4 pb-28 pt-6">
        <section className="rounded-[32px] border border-white/10 bg-[#111827]/95 p-8 shadow-glow backdrop-blur-xl">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_0.3fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full bg-[#111827] px-4 py-2 text-sm text-primary">
                <Sparkles size={18} /> Prototype Portfolio
              </div>
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.28em] text-accent">Notice</p>
                <h1 className="text-4xl font-semibold text-white">TontoninDong</h1>
                <p className="max-w-3xl leading-8 text-muted">
                  Website ini adalah prototype portfolio TontoninDong. Data menggunakan mock API dan video demo legal untuk keperluan eksplorasi UI, search, watchlist, dan player.
                </p>
                {loading && <p className="text-sm text-primary">Memuat katalog...</p>}
                {error && <p className="text-sm text-red-400">{error}</p>}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-[#111827] p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-muted">Mode</p>
                  <p className="mt-2 text-lg font-semibold text-white">{mode}</p>
                </div>
                <div className="rounded-3xl bg-[#111827] p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-muted">Data</p>
                  <p className="mt-2 text-lg font-semibold text-white">{items.length} titles</p>
                </div>
              </div>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-[#0d1725]/95 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-accent">Menu Cepat</p>
              <div className="mt-6 grid gap-3">
                {['Anime Terbaru', 'Daftar Anime', 'Batch', 'Jadwal Rilis'].map((label) => (
                  <a key={label} href={`#${label.toLowerCase().replace(/ /g, '')}`} className="rounded-3xl bg-[#111827] px-4 py-4 text-sm text-white transition hover:bg-white/10">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="top10" className="mt-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-accent">Top 10 Minggu Ini</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Ranking Katalog</h2>
            </div>
            <Link to="/tontonin-dong" className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-black md:inline-flex">
              Refresh List
            </Link>
          </div>
          <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
            {top10Items.map((item, index) => (
              <article key={`${item.source}-${item.id}`} className="min-w-[220px] rounded-[28px] border border-white/10 bg-[#111827]/95 p-4 shadow-glow">
                <div className="relative overflow-hidden rounded-3xl">
                  <img src={item.poster} alt={item.title} className="h-56 w-full object-cover" />
                  <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-black">
                    TOP {index + 1}
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-muted">Rating {item.rating ?? 'N/A'}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.genre.slice(0, 2).map((genre) => (
                      <span key={genre} className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase text-muted">
                        {genre}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/tontonin-dong/watch/${item.source}/${encodeURIComponent(item.id)}`}
                    className="inline-flex w-full items-center justify-center rounded-full bg-primary px-3 py-2 text-sm font-semibold text-black"
                  >
                    Watch
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="batch" className="mt-10 grid gap-6 lg:grid-cols-[0.72fr_0.28fr]">
          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-[#111827]/95 p-8 shadow-glow">
              <p className="text-sm uppercase tracking-[0.28em] text-accent">Batch Release</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Anime Batch Terbaru</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {latestAnime.slice(0, 2).map((item) => (
                  <div key={item.id} className="rounded-3xl bg-[#0d1725] p-5">
                    <div className="flex items-center gap-4">
                      <img src={item.poster} alt={item.title} className="h-24 w-24 rounded-3xl object-cover" />
                      <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-accent">Batch</p>
                        <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                        <p className="mt-2 text-sm text-muted">{item.episode}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#111827]/95 p-8 shadow-glow">
              <p className="text-sm uppercase tracking-[0.28em] text-accent">Anime Terbaru</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {latestAnime.map((item) => (
                  <article key={item.id} className="rounded-3xl bg-[#0d1725] p-5">
                    <div className="flex gap-4">
                      <img src={item.poster} alt={item.title} className="h-24 w-20 rounded-3xl object-cover" />
                      <div className="grow">
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        <p className="mt-1 text-sm text-muted">{item.postedBy} • {item.releasedAt}</p>
                        <p className="mt-2 text-sm text-muted line-clamp-3">{item.description}</p>
                        <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase text-muted">
                          {item.genre.slice(0, 3).map((genre) => (
                            <span key={genre} className="rounded-full bg-white/10 px-2 py-1">
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/tontonin-dong/watch/${item.source}/${encodeURIComponent(item.id)}`}
                      className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-primary px-3 py-2 text-sm font-semibold text-black"
                    >
                      Watch
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-[#111827]/95 p-6 shadow-glow">
              <p className="text-sm uppercase tracking-[0.28em] text-accent">Release Schedule</p>
              <div className="mt-5 space-y-4">
                {fallbackMediaItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="rounded-3xl border border-white/10 bg-[#0d1725] p-4">
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-muted">{item.releasedAt}</p>
                    <p className="mt-2 text-xs text-muted">{item.status}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-[#111827]/95 p-6 shadow-glow">
              <p className="text-sm uppercase tracking-[0.28em] text-accent">Contact</p>
              <p className="mt-4 text-sm leading-7 text-muted">contact@tontonindong.local</p>
            </div>
          </aside>
        </section>

        <section id="catalog" className="mt-10 rounded-[32px] border border-white/10 bg-[#111827]/95 p-8 shadow-glow">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-accent">Daftar Katalog</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Eksplor Semua Media</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {modes.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMode(option)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    mode === option ? 'bg-primary text-black' : 'bg-[#0f172a] text-muted hover:bg-white/5'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {filteredItems.map((item) => (
              <article key={item.id} className="rounded-[28px] border border-white/10 bg-[#0d1725] p-5 shadow-sm">
                <div className="flex gap-4">
                  <img src={item.poster} alt={item.title} className="h-28 w-20 rounded-3xl object-cover" />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted">
                      <span>{item.type}</span>
                      <span>{item.year}</span>
                      <span>Rating {item.rating}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted line-clamp-3">{item.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.genre.map((genre) => (
                        <span key={genre} className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-muted">
                          {genre}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link
                        to={`/tontonin-dong/watch/${item.source}/${encodeURIComponent(item.id)}`}
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-black"
                      >
                        Watch
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleWatchlist(item.id)}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111827] px-4 py-2 text-sm font-semibold text-white"
                      >
                        <Heart size={16} className={isInWatchlist(item.id) ? 'text-red-400' : 'text-white'} />
                        {isInWatchlist(item.id) ? 'Remove' : 'Watchlist'}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[0.68fr_0.32fr]">
          <div className="rounded-[32px] border border-white/10 bg-[#111827]/95 p-8 shadow-glow">
            <p className="text-sm uppercase tracking-[0.28em] text-accent">Rekomendasi lainnya</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Temukan Pilihan Baru</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {top10Items.slice(0, 4).map((item) => (
                <article key={item.id} className="rounded-3xl bg-[#0d1725] p-4">
                  <div className="flex items-center gap-3">
                    <img src={item.poster} alt={item.title} className="h-16 w-16 rounded-3xl object-cover" />
                    <div>
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-muted">{item.type}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <aside className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-[#111827]/95 p-6 shadow-glow">
              <p className="text-sm uppercase tracking-[0.28em] text-accent">Project Movie TontoninDong</p>
              <div className="mt-5 space-y-4">
                {movieProjects.map((item) => (
                  <div key={item.id} className="rounded-3xl border border-white/10 bg-[#0d1725] p-4">
                    <div className="flex items-start gap-3">
                      <img src={item.poster} alt={item.title} className="h-16 w-16 rounded-3xl object-cover" />
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                        <p className="mt-1 text-xs text-muted">{item.genre.slice(0, 2).join(', ')}</p>
                        <p className="mt-2 text-xs text-muted">{item.releasedAt}</p>
                        <p className="mt-1 text-xs text-muted">Rating {item.rating}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-[#111827]/95 p-6 shadow-glow">
              <p className="text-sm uppercase tracking-[0.28em] text-accent">Watchlist</p>
              {watchlistItems.length ? (
                <div className="mt-5 space-y-4">
                  {watchlistItems.map((item) => (
                    <div key={item.id} className="rounded-3xl bg-[#0d1725] p-4">
                      <div className="flex items-center gap-3">
                        <img src={item.poster} alt={item.title} className="h-14 w-14 rounded-3xl object-cover" />
                        <div>
                          <p className="text-sm font-semibold text-white">{item.title}</p>
                          <p className="text-xs text-muted">{item.genre.slice(0, 2).join(', ')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-5 text-muted">Watchlist masih kosong.</p>
              )}
            </div>
            <div className="rounded-[32px] border border-white/10 bg-[#111827]/95 p-6 shadow-glow">
              <p className="text-sm uppercase tracking-[0.28em] text-accent">Continue Watching</p>
              {continueItems.length ? (
                <div className="mt-5 space-y-4">
                  {continueItems.map((item) => (
                    <div key={item.id} className="rounded-3xl bg-[#0d1725] p-4">
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-xs text-muted">{item.type} • {item.releasedAt}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-5 text-muted">Belum ada tontonan yang dilanjutkan.</p>
              )}
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default TontoninDong;
