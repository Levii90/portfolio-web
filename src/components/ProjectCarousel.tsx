import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../types/project';

interface ProjectCarouselProps {
  items: Project[];
}

const transition = { type: 'spring', stiffness: 130, damping: 18 };

function ProjectCarousel({ items }: ProjectCarouselProps) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeItem = items[active];

  useEffect(() => {
    if (isPaused) return undefined;
    const interval = window.setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [isPaused, items.length]);

  const dots = useMemo(
    () => items.map((project, index) => ({ id: project.id, active: index === active })),
    [active, items]
  );

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-surface/90 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-accent">Featured Projects</p>
          <h2 className="mt-3 text-3xl font-semibold text-text">Carousel highlight</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActive((prev) => (prev - 1 + items.length) % items.length)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#09101b] text-text hover:bg-primary/10"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => setActive((prev) => (prev + 1) % items.length)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#09101b] text-text hover:bg-primary/10"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <motion.div
        key={activeItem.id}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={transition}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="grid gap-6 lg:grid-cols-[0.7fr_0.3fr]"
      >
        <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#09131e] p-6">
          <img
            src={activeItem.image}
            alt={activeItem.title}
            className="h-80 w-full rounded-3xl object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 rounded-b-[28px] bg-gradient-to-t from-black/65 via-transparent to-transparent p-6 text-text">
            <p className="text-sm uppercase tracking-[0.24em] text-accent">{activeItem.category}</p>
            <h3 className="mt-3 text-3xl font-semibold leading-tight">{activeItem.title}</h3>
          </div>
        </div>

        <div className="space-y-5 rounded-[28px] border border-white/10 bg-[#08111d] p-6">
          <p className="text-muted text-sm">{activeItem.description}</p>
          <div className="grid gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-accent">Tech stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeItem.tech.map((tech) => (
                  <span key={tech} className="rounded-full border border-white/10 bg-[#06111b] px-3 py-1 text-xs text-muted">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-accent">Status</p>
              <span className="mt-2 inline-flex rounded-full bg-primary/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                {activeItem.status}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate(`/project/${activeItem.id}`)}
            className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-[#050b14] hover:bg-[#4e99ff]"
          >
            Explore project
          </button>
        </div>
      </motion.div>

      <div className="mt-6 flex items-center gap-2">
        {dots.map((dot, index) => (
          <button
            key={dot.id}
            type="button"
            aria-label={`Slide ${index + 1}`}
            onClick={() => setActive(index)}
            className={`h-3.5 w-3.5 rounded-full transition ${dot.active ? 'bg-primary' : 'bg-white/20 hover:bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  );
}

export default ProjectCarousel;
