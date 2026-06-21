import { motion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const rotatingPhrases = [
  'Web Developer',
  'Cybersecurity Learner',
  'Smart City System Builder',
  'React & PHP Developer'
];

function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayPhrase, setDisplayPhrase] = useState(rotatingPhrases[0]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setDisplayPhrase('');
    const textTimer = window.setTimeout(() => {
      setDisplayPhrase(rotatingPhrases[phraseIndex]);
    }, 150);
    return () => window.clearTimeout(textTimer);
  }, [phraseIndex]);

  return (
    <section className="relative overflow-hidden pb-24 pt-28">
      <div className="absolute inset-0 animated-grid opacity-40" />
      <div className="absolute left-1/2 top-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute right-0 top-32 h-[260px] w-[260px] rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-[#0d1b33]/80 px-4 py-2 text-sm text-accent shadow-glow">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Portfolio hub for web, cybersecurity, and smart city projects
            </div>
            <div className="space-y-5">
              <div className="space-y-3">
                <p className="text-lg uppercase text-primary">Hafid Hidayat / 0xp1et</p>
                <h1 className="text-4xl font-semibold leading-tight text-text sm:text-5xl">
                  Information Systems Student | Web Developer | Cybersecurity Learner
                </h1>
              </div>
              <div className="rounded-3xl border border-white/10 bg-surface/85 p-6 shadow-glow">
                <p className="text-muted max-w-2xl text-base leading-7">
                  Building digital products around cybersecurity, smart city systems, and web development.
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mt-4 inline-flex items-center gap-3 rounded-2xl border border-primary/20 bg-[#07111f] px-4 py-3 text-sm text-white"
                >
                  <span className="text-accent">{displayPhrase}</span>
                  <span className="text-muted">| craft modern solutions.</span>
                </motion.div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-glow hover:bg-[#0f76cf]"
              >
                Explore Portfolio
                <ArrowRight className="ml-2" size={18} />
              </Link>
              <a
                href="https://github.com/Levii90"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-[#09101b] px-6 py-3 text-sm font-semibold text-text hover:border-accent"
              >
                <Github className="mr-2" size={18} />
                View GitHub
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative rounded-[32px] border border-white/10 bg-surface/85 p-6 shadow-glow"
          >
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            <div className="relative space-y-5">
              <div className="rounded-3xl border border-primary/15 bg-[#07101f]/95 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-accent">Featured Insight</p>
                <h2 className="mt-4 text-3xl font-semibold text-text">Future-ready software for smarter cyber decisions.</h2>
                <p className="mt-3 text-muted leading-7">
                  Showcase web systems that combine security awareness, cleaner interfaces, and flexibility for modern workflows.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {['Responsive UI', 'Interactive Dashboard', 'Modern Animations', 'Security Focus'].map((item) => (
                  <div key={item} className="rounded-3xl border border-white/10 bg-[#09131f] p-4 text-sm text-text">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
