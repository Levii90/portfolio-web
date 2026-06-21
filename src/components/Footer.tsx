import { ExternalLink, Mail, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070c14]/95 py-10 text-muted">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.28em] text-accent">0xp1et Lab</p>
          <h3 className="text-2xl font-semibold text-text">Curating code, UI, and cyber thinking.</h3>
          <p className="max-w-xl leading-7">
            Portfolio hub untuk menampilkan karya pengembangan web, analisis keamanan, desain UX, dan sistem akademik.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm text-muted">
            <MapPin size={18} className="text-accent" />
            Jakarta, Indonesia
          </div>
          <div className="flex items-center gap-3 text-sm text-muted">
            <Mail size={18} className="text-accent" />
            <a href="mailto:hello@0xp1etlab.dev" className="text-text hover:text-primary">hello@0xp1etlab.dev</a>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted">
            <ExternalLink size={18} className="text-accent" />
            <a href="https://github.com/Levii90" target="_blank" rel="noreferrer" className="text-text hover:text-primary">
              github.com/Levii90
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted">
            <ExternalLink size={18} className="text-accent" />
            <a href="/tontonin-dong" className="text-text hover:text-primary">
              TontoninDong Showcase
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl px-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} 0xp1et Lab. Designed for modern developer & cybersecurity portfolios.
      </div>
    </footer>
  );
}

export default Footer;
