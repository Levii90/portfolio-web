import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Layers, Star } from 'lucide-react';
import Hero from '../components/Hero';
import ProjectCarousel from '../components/ProjectCarousel';
import { projects } from '../data/projects';

function Home() {
  return (
    <section className="relative">
      <Hero />
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8">
          <ProjectCarousel items={projects.slice(0, 3)} />
          <section className="rounded-[32px] border border-white/10 bg-surface/90 p-8 shadow-glow backdrop-blur-xl">
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { label: 'Projects Showcase', value: '5+ Projects', icon: Star },
                { label: 'Core Focus', value: 'Web & Cyber', icon: Layers },
                { label: 'Current Goal', value: 'Smart City Vision', icon: Briefcase }
              ].map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="rounded-3xl border border-white/10 bg-[#07131f] p-6"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                    <item.icon size={22} />
                  </div>
                  <p className="mt-5 text-sm uppercase tracking-[0.24em] text-accent">{item.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-text">{item.value}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-[#09131f]/80 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-accent">Why 0xp1et Lab?</p>
                <h3 className="mt-3 text-3xl font-semibold text-text">A portfolio designed for clarity, security, and real developer impact.</h3>
              </div>
              <a
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-[#0f77cf]"
              >
                View Dashboard <ArrowRight size={16} />
              </a>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Home;
