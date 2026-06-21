import type { ChangeEvent } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const modes = ['All', 'Anime', 'Movie', 'TV'] as const;

type Mode = (typeof modes)[number];

interface TontoninDongNavbarProps {
  search: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  mode: Mode;
  setMode: (value: Mode) => void;
  hideSearch?: boolean;
  hideModeToggle?: boolean;
  hideMenu?: boolean;
}

function TontoninDongNavbar({
  search,
  onSearchChange,
  mode,
  setMode,
  hideSearch,
  hideModeToggle,
  hideMenu
}: TontoninDongNavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111827]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <Link to="/tontonin-dong" className="inline-flex items-center gap-3 text-xl font-semibold text-white">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0f172a] text-base text-primary">TD</span>
            <span>TontoninDong</span>
          </Link>
          <span className="text-sm text-muted">Media Catalog</span>
        </div>

        {!hideSearch && (
          <div className="relative w-full max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={onSearchChange}
              placeholder="Cari judul, genre, atau tipe media..."
              className="w-full rounded-full border border-white/10 bg-[#0f172a] py-3 pl-12 pr-4 text-sm text-white outline-none placeholder:text-muted"
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          {!hideModeToggle &&
            modes.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setMode(value)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  mode === value ? 'bg-primary text-black' : 'bg-[#0f172a] text-muted hover:bg-white/5'
                }`}
              >
                {value}
              </button>
            ))}
          <Link
            to="/dashboard"
            className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#0da6d6]"
          >
            Portfolio
          </Link>
        </div>
      </div>

      {!hideMenu && (
        <nav className="border-t border-white/10 bg-[#0f172a]/95 px-4 py-3 text-sm text-muted">
          <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-4">
            <a href="#top10" className="transition hover:text-white">
              Anime Terbaru
            </a>
            <a href="#catalog" className="transition hover:text-white">
              Daftar Anime
            </a>
            <a href="#batch" className="transition hover:text-white">
              Batch
            </a>
            <a href="#release" className="transition hover:text-white">
              Jadwal Rilis
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

export default TontoninDongNavbar;
