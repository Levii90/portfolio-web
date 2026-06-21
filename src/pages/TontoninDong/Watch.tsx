import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { mediaItems } from '../../data/tontoninDong';
import { useContinueWatching } from '../../hooks/useContinueWatching';
import { useMediaWatchlist } from '../../hooks/useMediaWatchlist';

function TontoninDongWatch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { saveProgress, getProgress, removeProgress } = useContinueWatching();
  const { toggleWatchlist, isInWatchlist } = useMediaWatchlist();
  const [loaded, setLoaded] = useState(false);

  const media = useMemo(() => mediaItems.find((item) => item.id === id), [id]);
  const progress = useMemo(() => (media ? getProgress(media.id) : undefined), [getProgress, media]);

  useEffect(() => {
    if (!media || !videoRef.current || !loaded) return;
    if (progress) {
      videoRef.current.currentTime = progress.currentTime;
    }
  }, [loaded, media, progress]);

  if (!media) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-24 text-center text-white">
        <h2 className="text-3xl font-semibold">Media tidak ditemukan</h2>
        <p className="mt-4 text-muted">Silakan kembali ke katalog TontoninDong.</p>
        <button
          type="button"
          onClick={() => navigate('/tontonin-dong')}
          className="mt-6 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-black"
        >
          Kembali ke TontoninDong
        </button>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#111827]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <Link to="/tontonin-dong" className="text-xl font-semibold text-white">
              TontoninDong Player
            </Link>
            <p className="text-sm text-muted">Watch page untuk media catalog</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/tontonin-dong"
              className="rounded-full bg-[#0d1725] px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Kembali ke Katalog
            </Link>
            <button
              type="button"
              onClick={() => toggleWatchlist(media.id)}
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-black"
            >
              {isInWatchlist(media.id) ? 'Hapus Watchlist' : 'Tambahkan Watchlist'}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1180px] px-4 pb-28 pt-8">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_0.3fr]">
          <div className="space-y-8">
            <section className="rounded-[32px] border border-white/10 bg-[#111827]/95 p-8 shadow-glow">
              <p className="text-sm uppercase tracking-[0.28em] text-accent">Now Playing</p>
              <h1 className="mt-4 text-4xl font-semibold text-white">{media.title}</h1>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted">
                <span>{media.type.toUpperCase()}</span>
                <span>{media.year}</span>
                <span>Rating {media.rating}</span>
                <span>{media.status}</span>
                {media.episode && <span>{media.episode}</span>}
              </div>
              <p className="mt-6 max-w-3xl leading-7 text-muted">{media.description}</p>
            </section>

            <section className="rounded-[32px] border border-white/10 bg-[#111827]/95 p-6 shadow-glow">
              <video
                ref={videoRef}
                controls
                poster={media.backdrop}
                className="h-[420px] w-full rounded-[28px] bg-black object-cover"
                src={media.videoUrl}
                onLoadedMetadata={() => setLoaded(true)}
                onTimeUpdate={(event) => {
                  const target = event.currentTarget;
                  saveProgress(media.id, target.currentTime, target.duration);
                }}
                onEnded={() => removeProgress(media.id)}
              />
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-[32px] border border-white/10 bg-[#111827]/95 p-6 shadow-glow">
              <p className="text-sm uppercase tracking-[0.28em] text-accent">Metadata</p>
              <div className="mt-6 space-y-3 text-sm text-muted">
                <p>
                  <span className="font-semibold text-white">Type:</span> {media.type}
                </p>
                <p>
                  <span className="font-semibold text-white">Year:</span> {media.year}
                </p>
                <p>
                  <span className="font-semibold text-white">Rating:</span> {media.rating}
                </p>
                <p>
                  <span className="font-semibold text-white">Status:</span> {media.status}
                </p>
                <p>
                  <span className="font-semibold text-white">Genre:</span> {media.genre.join(', ')}
                </p>
                {media.postedBy && (
                  <p>
                    <span className="font-semibold text-white">Posted by:</span> {media.postedBy}
                  </p>
                )}
              </div>
            </section>

            <section className="rounded-[32px] border border-white/10 bg-[#111827]/95 p-6 shadow-glow">
              <p className="text-sm uppercase tracking-[0.28em] text-accent">Progress</p>
              <div className="mt-6 text-sm text-muted">
                {progress ? (
                  <>
                    <p>Saved at: {new Date(progress.updatedAt).toLocaleString()}</p>
                    <p>Now: {Math.floor(progress.currentTime)} / {Math.floor(progress.duration)} detik</p>
                  </>
                ) : (
                  <p>Belum ada progress tersimpan untuk media ini.</p>
                )}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default TontoninDongWatch;
