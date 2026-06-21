import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Play } from 'lucide-react';
import { mediaItems } from '../../data/tontoninDong';
import { useContinueWatching } from '../../hooks/useContinueWatching';
import { useMediaWatchlist } from '../../hooks/useMediaWatchlist';

function TontoninDongWatch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { saveProgress, getProgress, removeProgress } = useContinueWatching();
  const { watchlist, toggleWatchlist, isInWatchlist } = useMediaWatchlist();
  const [loaded, setLoaded] = useState(false);

  const media = useMemo(() => mediaItems.find((item) => item.id === id), [id]);
  const progress = useMemo(() => (media ? getProgress(media.id) : undefined), [getProgress, media]);

  useEffect(() => {
    if (!media || !videoRef.current || !loaded) return;
    if (progress?.currentTime) {
      videoRef.current.currentTime = progress.currentTime;
    }
  }, [loaded, media, progress]);

  if (!media) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-24 text-center text-text">
        <h2 className="text-3xl font-semibold">Media tidak ditemukan</h2>
        <p className="mt-4 text-muted">Silakan kembali ke katalog TontoninDong.</p>
        <button
          type="button"
          onClick={() => navigate('/tontonin-dong')}
          className="mt-6 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
        >
          Kembali ke TontoninDong
        </button>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden pb-24 pt-28 text-text">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#050b14] via-transparent to-transparent" />
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_0.3fr]">
          <div>
            <div className="rounded-[32px] border border-white/10 bg-[#0b1624]/95 p-8 shadow-glow backdrop-blur-xl">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#112540] px-4 py-2 text-xs uppercase tracking-[0.24em] text-accent">Now Playing</span>
                <span className="rounded-full bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-primary">{media.type.toUpperCase()}</span>
              </div>
              <h1 className="text-4xl font-semibold text-white">{media.title}</h1>
              <p className="mt-4 max-w-3xl leading-8 text-muted">{media.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-[#08131f] px-4 py-2 text-sm text-muted">{media.year}</span>
                <span className="rounded-full bg-[#08131f] px-4 py-2 text-sm text-muted">Rating {media.rating}</span>
                {media.genre.map((item) => (
                  <span key={item} className="rounded-full bg-[#08131f] px-4 py-2 text-sm text-muted">{item}</span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/tontonin-dong"
                  className="inline-flex items-center gap-2 rounded-full bg-secondary border border-white/10 bg-[#112540] px-5 py-3 text-sm font-semibold text-text hover:bg-[#112d59]"
                >
                  <ArrowLeft size={16} /> Back to TontoninDong
                </Link>
                <button
                  type="button"
                  onClick={() => toggleWatchlist(media.id)}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-[#166fd0]"
                >
                  <Heart size={16} className={isInWatchlist(media.id) ? 'text-red-400' : 'text-white'} />
                  {isInWatchlist(media.id) ? 'Remove Watchlist' : 'Add Watchlist'}
                </button>
              </div>
            </div>
            <div className="mt-8 rounded-[32px] border border-white/10 bg-[#0b1624]/95 p-6 shadow-glow backdrop-blur-xl">
              <video
                ref={videoRef}
                controls
                className="h-[360px] w-full rounded-[28px] bg-black object-cover"
                src={media.videoUrl}
                onLoadedMetadata={() => setLoaded(true)}
                onTimeUpdate={(event) => {
                  const target = event.currentTarget;
                  saveProgress(media.id, target.currentTime, target.duration);
                }}
                onEnded={() => removeProgress(media.id)}
              />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[32px] border border-white/10 bg-[#0b1624]/95 p-6 shadow-glow backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.28em] text-accent">Media details</p>
              <div className="mt-6 space-y-4 text-muted">
                <p><span className="font-semibold text-text">Type:</span> {media.type}</p>
                <p><span className="font-semibold text-text">Year:</span> {media.year}</p>
                <p><span className="font-semibold text-text">Rating:</span> {media.rating}</p>
                <p><span className="font-semibold text-text">Status:</span> {media.status}</p>
                <p><span className="font-semibold text-text">Episodes:</span> {media.episodes ?? 'N/A'}</p>
              </div>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-[#0b1624]/95 p-6 shadow-glow backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.28em] text-accent">Progress saved</p>
              <div className="mt-6 text-muted">
                {progress ? (
                  <>
                    <p>Last saved: {new Date(progress.updatedAt).toLocaleString()}</p>
                    <p>Current time: {Math.floor(progress.currentTime)} / {Math.floor(progress.duration)} detik</p>
                  </>
                ) : (
                  <p>Belum ada progress tersimpan untuk media ini.</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default TontoninDongWatch;
