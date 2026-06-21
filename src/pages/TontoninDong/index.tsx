import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github, Layers, ShieldCheck, Sparkles } from 'lucide-react';

function TontoninDong() {
  return (
    <main className="relative overflow-hidden py-16 text-text">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#071020] via-transparent to-transparent" />
      <div className="mx-auto max-w-7xl px-4">
        <section className="rounded-[32px] border border-white/10 bg-surface/95 p-8 shadow-glow backdrop-blur-xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-accent">MEDIA CATALOG PROJECT</p>
              <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white">TontoninDong</h1>
              <p className="mt-3 text-xl text-muted">Anime, Film, dan TV Series dalam satu web app.</p>
              <p className="mt-6 max-w-2xl leading-8 text-muted">
                TontoninDong adalah konsep media catalog web app yang dirancang untuk mengeksplorasi integrasi API open-source, pencarian konten, watchlist lokal, continue watching, dan pengalaman menonton berbasis web secara terstruktur.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {['API Integration', 'Local Watchlist', 'Continue Watching', 'Concept Project'].map((label) => (
                  <span key={label} className="rounded-full border border-white/10 bg-[#09131e] px-4 py-2 text-sm text-text">
                    {label}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-[#0f77cf]"
                >
                  Back to Dashboard <ArrowRight size={16} />
                </Link>
                <Link
                  to="/project/tontonin-dong"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#08121d] px-5 py-3 text-sm font-semibold text-text hover:border-accent"
                >
                  View Project Detail <ExternalLink size={16} />
                </Link>
              </div>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-[#08131f]/90 p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-accent">Concept Brief</p>
              <div className="mt-6 space-y-4 text-muted">
                <p>
                  TontoninDong adalah contoh media catalog modern dengan tampilan dark night-sky yang memadukan anime, film, dan TV series dalam satu platform terpadu.
                </p>
                <p>
                  Fokus utamanya adalah integrasi open-source API atau mock API sesuai lisensi, state management lokal, routing, responsive interface, dan player demo yang masuk akal untuk portfolio.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 space-y-6 rounded-[32px] border border-white/10 bg-surface/95 p-8 shadow-glow backdrop-blur-xl">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-accent">Overview</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Media catalog modern dengan pengalaman terpadu</h2>
            <p className="mt-4 leading-8 text-muted">
              Proyek ini terinspirasi oleh katalog media modern dengan pendekatan dark night-sky. Arsitektur fokus pada API wrapper, routing, state management, localStorage, player state, dan responsive interface agar pengalaman eksplorasi terasa konsisten.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'UI/UX dark night-sky',
              'API wrapper',
              'Routing',
              'State management',
              'localStorage',
              'Player state',
              'Responsive interface'
            ].map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-[#08121d] p-6 text-muted">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-8 rounded-[32px] border border-white/10 bg-surface/95 p-8 shadow-glow backdrop-blur-xl">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-accent">Features</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Fitur utama TontoninDong</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-[#08121d] p-6">
              <h3 className="text-xl font-semibold text-white">Anime Mode</h3>
              <ul className="mt-4 space-y-3 text-muted">
                <li>Homepage dengan carousel ongoing/latest</li>
                <li>Browse berdasarkan genre dan status</li>
                <li>Search judul anime</li>
                <li>Detail page berisi poster, metadata, sinopsis, genre, dan episode list</li>
                <li>Watch history berbasis localStorage</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#08121d] p-6">
              <h3 className="text-xl font-semibold text-white">Movie & TV Mode</h3>
              <ul className="mt-4 space-y-3 text-muted">
                <li>Hero banner carousel</li>
                <li>Trending content</li>
                <li>Browse dengan filter genre, tahun, negara, dan sort</li>
                <li>Search autocomplete</li>
                <li>Detail page berisi poster, rating, sinopsis, cast, genre, season, dan episode</li>
                <li>Continue watching</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#08121d] p-6">
              <h3 className="text-xl font-semibold text-white">Shared Features</h3>
              <ul className="mt-4 space-y-3 text-muted">
                <li>Watchlist terpadu</li>
                <li>Continue Watching</li>
                <li>Mode switcher Anime | Film</li>
                <li>Context-aware search</li>
                <li>Responsive mobile/desktop</li>
                <li>Dark night-sky theme</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-10 space-y-6 rounded-[32px] border border-white/10 bg-surface/95 p-8 shadow-glow backdrop-blur-xl">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-accent">Technology</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Tech stack</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'React Router DOM', 'Framer Motion', 'Lucide React', 'localStorage', 'Vercel', 'API Wrapper'].map((tech) => (
              <div key={tech} className="rounded-3xl border border-white/10 bg-[#08121d] px-5 py-4 text-muted">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                  <Layers size={16} className="text-primary" /> {tech}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-6 rounded-[32px] border border-white/10 bg-surface/95 p-8 shadow-glow backdrop-blur-xl">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-accent">Architecture</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Arsitektur data dan state</h2>
          </div>
          <pre className="rounded-3xl border border-white/10 bg-[#07101e] p-6 text-sm text-muted">
{`Open-source API / Mock API
        ↓
API Wrapper
        ↓
Data Transformer
        ↓
React Components
        ↓
Client State + localStorage
        ↓
Browser UI`}
          </pre>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              'API key tidak disimpan langsung di browser jika API bersifat private.',
              'Untuk production, API private harus dipanggil lewat server/proxy.',
              'localStorage digunakan untuk watchlist, history, dan continue watching.',
              'Konten video mengikuti lisensi dan Terms of Service sumber terkait.'
            ].map((note) => (
              <div key={note} className="rounded-3xl border border-white/10 bg-[#08121d] p-6 text-muted">
                <p>{note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-6 rounded-[32px] border border-white/10 bg-surface/95 p-8 shadow-glow backdrop-blur-xl">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-accent">Environment Variables</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Contoh konfigurasi env</h2>
          </div>
          <pre className="rounded-3xl border border-white/10 bg-[#07101e] p-6 text-sm text-muted">
{`VITE_MEDIA_API_BASE_URL=https://example-api.local
VITE_PUBLIC_DEMO_MODE=true`}
          </pre>
          <p className="text-muted">
            Untuk versi portfolio, project dapat berjalan dengan mock data. Jika menggunakan API eksternal, pastikan API tersebut legal, open-source, atau memiliki izin penggunaan yang jelas.
          </p>
        </section>

        <section className="mt-10 space-y-6 rounded-[32px] border border-white/10 bg-surface/95 p-8 shadow-glow backdrop-blur-xl">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-accent">Project Structure</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Struktur proyek</h2>
          </div>
          <pre className="rounded-3xl border border-white/10 bg-[#07101e] p-6 text-sm text-muted">
{`src/
  pages/
    TontoninDong/
      index.tsx
  components/
    media/
      MediaCard.tsx
      HeroCarousel.tsx
      WatchlistPanel.tsx
      ContinueWatching.tsx
  data/
    tontoninDong.ts
  hooks/
    useLocalWatchlist.ts
    useContinueWatching.ts
  lib/
    mediaApi.ts
  types/
    media.ts`}
          </pre>
        </section>

        <section className="mt-10 space-y-6 rounded-[32px] border border-white/10 bg-surface/95 p-8 shadow-glow backdrop-blur-xl">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-accent">Legal & License Note</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Catatan hukum dan lisensi</h2>
          </div>
          <p className="leading-7 text-muted">
            Project ini dibuat untuk eksplorasi teknis dan portfolio. Penggunaan API, metadata, video, subtitle, streaming, dan download harus mengikuti lisensi, hak cipta, serta Terms of Service sumber terkait. Open-source API tidak otomatis berarti semua konten media bebas didistribusikan.
          </p>
          <p className="leading-7 text-muted">
            TontoninDong menggunakan open-source API atau mock API sesuai lisensi dan Terms of Service sumber data. Ini bukan representasi layanan streaming ilegal atau situs bajakan.
          </p>
        </section>

        <section className="mt-10 rounded-[32px] border border-white/10 bg-[#08131f]/95 p-8 shadow-glow backdrop-blur-xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-accent">Call to Action</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Lihat detail, eksplorasi, atau cek repository</h2>
              <p className="mt-4 text-muted">
                Karena project menggunakan HashRouter, URL akhir akan berbentuk https://portfolio-web-pez9.vercel.app/#/tontonin-dong. Semua navigasi internal menggunakan route React.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-[#0f77cf]"
              >
                Back to Dashboard
              </Link>
              <Link
                to="/project/tontonin-dong"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#08121d] px-5 py-3 text-sm font-semibold text-text hover:border-accent"
              >
                Project Detail
              </Link>
              <a
                href="https://github.com/Levii90/portfolio-web"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#08121d] px-5 py-3 text-sm font-semibold text-text hover:border-accent"
              >
                <Github size={16} /> GitHub Repository
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default TontoninDong;
