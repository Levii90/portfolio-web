import { Award, BookOpen, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_0.6fr]">
          <div className="space-y-6 rounded-[32px] border border-white/10 bg-surface/95 p-8 shadow-glow backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.28em] text-accent">About</p>
            <h1 className="text-4xl font-semibold text-text">A developer with an eye on secure systems, smart cities, and strong UI flows.</h1>
            <p className="text-muted leading-8">
              Saya Hafid Hidayat, mahasiswa Sistem Informasi yang membangun solusi web modern sambil belajar keamanan siber dan sistem smart city. Tujuan saya adalah menggabungkan pengalaman pengguna yang bersih dengan arsitektur aplikasi yang tepat untuk kebutuhan digital masa depan.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Coding', value: 'React, PHP, CI3', icon: Code2 },
                { label: 'Design', value: 'Figma, UX Flow', icon: BookOpen },
                { label: 'Learning', value: 'Cybersecurity', icon: Award }
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-[#09131f] p-5">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                    <item.icon size={20} />
                  </div>
                  <p className="mt-4 text-sm uppercase tracking-[0.24em] text-accent">{item.label}</p>
                  <p className="mt-3 text-lg font-semibold text-text">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-[#08111e]/95 p-8 shadow-glow backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.28em] text-accent">Why choose this portfolio?</p>
            <ul className="mt-6 space-y-4 text-muted">
              <li className="rounded-3xl border border-white/10 bg-[#07111f] p-5">
                <p className="font-semibold text-text">Practical project showcase</p>
                <p className="mt-2 text-sm">Menampilkan hasil coding yang jelas, deskriptif, dan mudah dinavigasi.</p>
              </li>
              <li className="rounded-3xl border border-white/10 bg-[#07111f] p-5">
                <p className="font-semibold text-text">Security-aware mindset</p>
                <p className="mt-2 text-sm">Fokus pada solusi yang memiliki pendekatan keamanan dan struktur aplikasi yang baik.</p>
              </li>
              <li className="rounded-3xl border border-white/10 bg-[#07111f] p-5">
                <p className="font-semibold text-text">Scalable portfolio structure</p>
                <p className="mt-2 text-sm">Tambahkan project baru hanya lewat file data statis tanpa perlu backend atau database.</p>
              </li>
              <li className="rounded-3xl border border-white/10 bg-[#07111f] p-5">
                <p className="font-semibold text-text">Project spotlight: TontoninDong</p>
                <p className="mt-2 text-sm">TontoninDong adalah konsep media catalog web app yang mengeksplorasi integrasi API open-source, watchlist lokal, continue watching, dan UI dark night-sky.</p>
              </li>
            </ul>
            <div className="mt-8">
              <Link
                to="/tontonin-dong"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-[#0f77cf]"
              >
                Lihat Project TontoninDong
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
