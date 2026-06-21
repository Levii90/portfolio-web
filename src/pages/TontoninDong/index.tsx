import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Heart, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { mediaItems } from '../../data/tontoninDong';
import { useContinueWatching } from '../../hooks/useContinueWatching';
import { useMediaWatchlist } from '../../hooks/useMediaWatchlist';

const modes = ['All', 'Anime', 'Movie', 'TV'] as const;

function TontoninDong() {
  const [mode, setMode] = useState<typeof modes[number]>('All');
  const [search, setSearch] = useState('');
  const [heroIndex, setHeroIndex] = useState(0);
  const { watchlist, toggleWatchlist, isInWatchlist } = useMediaWatchlist();
  const { progressList } = useContinueWatching();

  const heroItems = mediaItems.slice(0, 3);
  const featured = heroItems[heroIndex];

  const filteredItems = useMemo(() => {
    return mediaItems.filter((item) => {
      const typeMatch = mode === 'All' || item.type === mode.toLowerCase();
      const searchMatch = [item.title, ...item.genre].some((value) =>
        value.toLowerCase().includes(search.toLowerCase())
      );
      return typeMatch && searchMatch;
    });
  }, [mode, search]);

  const continueItems = progressList
    .map((progress) => mediaItems.find((item) => item.id === progress.mediaId))
    .filter(Boolean) as typeof mediaItems;

  return (
    <main className="relative overflow-hidden pb-24 pt-28 bg-[#050b14] text-text">
      <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top,_rgba(88,166,255,0.15),_transparent_35%)]" />
      <div className="mx-auto max-w-7xl px-4">
        <section className="rounded-[32px] border border-white/10 bg-[#0b1624]/95 p-8 shadow-glow backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.32em] text-accent">TONTONINDONG</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Anime, Film, dan TV Series dalam satu katalog.</h1>
          <p className="mt-4 max-w-3xl leading-8 text-muted">
            Jelajahi katalog media, simpan watchlist, dan lanjutkan tontonan langsung dari browser.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {['Anime', 'Film', 'TV Series', 'Local Watchlist', 'Continue Watching'].map((label) => (
              <span key={label} className="rounded-full bg-[#08131f] px-4 py-2 text-sm text-text/80">
                {label}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.92fr]">
          <div className="rounded-[32px] border border-white/10 bg-[#0b1624]/95 p-6 shadow-glow backdrop-blur-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {modes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setMode(item)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      mode === item ? 'bg-primary text-white' : 'bg-[#08131f] text-muted hover:bg-white/5'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="relative w-full sm:w-[320px]">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  placeholder="Cari anime, film, atau TV series..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="w-full rounded-full border border-white/10 bg-[#08131f] py-3 pl-12 pr-4 text-sm text-text outline-none placeholder:text-muted"
                />
              </div>
            </div>

            <div className="mt-8 rounded-[32px] border border-white/10 bg-[#08131f]/95 p-6 shadow-glow backdrop-blur-xl">
              <div className="relative overflow-hidden rounded-[28px] bg-black/50">
                <img src={featured.backdrop} alt={featured.title} className="h-72 w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050b14]/95 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-accent">Featured</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">{featured.title}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-text/80">{featured.description}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <span className="rounded-full bg-primary/20 px-3 py-1 text-xs text-primary">Rating {featured.rating}</span>
                    {featured.genre.map((genre) => (
                      <span key={genre} className="rounded-full bg-white/10 px-3 py-1 text-xs text-muted">
                        {genre}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      to={`/tontonin-dong/watch/${featured.id}`}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
                    >
                      <Play size={16} /> Watch Now
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleWatchlist(featured.id)}
                      className="inline-flex items-center gap-2 rounded-full bg-[#08131f] px-5 py-3 text-sm font-semibold text-text"
                    >
                      <Heart size={16} className={isInWatchlist(featured.id) ? 'text-red-400' : 'text-text'} />
                      {isInWatchlist(featured.id) ? 'Remove Watchlist' : 'Add Watchlist'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setHeroIndex((current) => (current - 1 + heroItems.length) % heroItems.length)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#08131f] text-text"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setHeroIndex((current) => (current + 1) % heroItems.length)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#08131f] text-text"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-[#0b1624]/95 p-6 shadow-glow backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.28em] text-accent">Continue Watching</p>
              {continueItems.length ? (
                <div className="mt-5 space-y-4">
                  {continueItems.map((item) => (
                    <div key={item.id} className="rounded-[24px] border border-white/10 bg-[#08131f] p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold text-white">{item.title}</p>
                          <p className="text-sm text-muted">{item.type.toUpperCase()}</p>
                        </div>
                        <Link
                          to={`/tontonin-dong/watch/${item.id}`}
                          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                        >
                          Continue
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-5 text-muted">Belum ada tontonan yang dilanjutkan.</p>
              )}
            </div>
            <div className="rounded-[32px] border border-white/10 bg-[#0b1624]/95 p-6 shadow-glow backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.28em] text-accent">Watchlist</p>
              {watchlist.length ? (
                <div className="mt-5 space-y-4">
                  {watchlist
                    .map((watchId) => mediaItems.find((item) => item.id === watchId))
                    .filter(Boolean)
                    .map((item) => (
                      <div key={item!.id} className="rounded-[24px] border border-white/10 bg-[#08131f] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-semibold text-white">{item!.title}</p>
                            <p className="text-sm text-muted">{item!.type.toUpperCase()}</p>
                          </div>
                          <Link
                            to={`/tontonin-dong/watch/${item!.id}`}
                            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                          >
                            Watch
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="mt-5 text-muted">Watchlist masih kosong.</p>
              )}
            </div>
          </aside>
        </section>

        <section className="mt-10 space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredItems.map((item) => (
              <article key={item.id} className="rounded-[28px] border border-white/10 bg-[#08131f] p-5 transition hover:-translate-y-1">
                <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
                  <img src={item.poster} alt={item.title} className="h-28 w-full rounded-3xl object-cover sm:h-32" />
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#112540] px-3 py-1 text-xs uppercase tracking-[0.24em] text-accent">{item.type}</span>
                      <span className="text-sm text-muted">{item.year}</span>
                      <span className="text-sm text-muted">Rating {item.rating}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {item.genre.map((genre) => (
                        <span key={genre} className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted">{genre}</span>
                      ))}
                    </div>
                    <p className="text-sm leading-6 text-muted line-clamp-3">{item.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={`/tontonin-dong/watch/${item.id}`}
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                      >
                        Watch
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleWatchlist(item.id)}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#08131f] px-4 py-2 text-sm font-semibold text-text"
                      >
                        <Heart size={16} className={isInWatchlist(item.id) ? 'text-red-400' : 'text-text'} />
                        {isInWatchlist(item.id) ? 'Remove' : 'Watchlist'}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default TontoninDong;
