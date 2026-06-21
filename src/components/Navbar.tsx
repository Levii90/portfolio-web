import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ExternalLink } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Projects', href: '/dashboard' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-glass px-4 py-4 shadow-glow backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-accent">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#112039] text-base">0x</span>
          <span>0xp1et Lab</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-text' : 'text-muted hover:text-text'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/dashboard"
            className="inline-flex items-center rounded-full border border-primary bg-primary px-4 py-2 text-sm font-semibold text-white shadow-glow hover:bg-[#0f77cb]"
          >
            View Portfolio
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#09101b] text-text transition hover:border-primary md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="mt-4 rounded-3xl border border-white/10 bg-[#08101f]/95 p-5 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-text hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white"
            >
              View Portfolio <ExternalLink className="ml-2" size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
