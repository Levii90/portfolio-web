import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import { ArrowLeft, ExternalLink, Github, Layers, ShieldCheck, Sparkles } from 'lucide-react';

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = useMemo(() => projects.find((item) => item.id === id), [id]);

  if (!project) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-24 text-center text-text">
        <h2 className="text-3xl font-semibold">Project tidak ditemukan</h2>
        <p className="mt-4 text-muted">Silakan kembali ke dashboard dan pilih project lain.</p>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-[#0f77cf]"
        >
          Kembali ke Dashboard
        </button>
      </section>
    );
  }

  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_0.3fr]">
          <div className="space-y-6 rounded-[32px] border border-white/10 bg-surface/95 p-8 shadow-glow backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-accent">{project.category}</p>
                <h1 className="mt-4 text-4xl font-semibold text-text">{project.title}</h1>
              </div>
              <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                {project.status}
              </span>
            </div>

            <img src={project.image} alt={project.title} className="w-full rounded-[28px] object-cover" />

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-[#08121d] p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-accent">Problem</p>
                <p className="mt-3 text-text leading-7">{project.problem}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-[#08121d] p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-accent">Features</p>
                <ul className="mt-3 space-y-2 text-muted">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Sparkles size={16} className="mt-1 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#09131f] p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-accent">Description</p>
              <p className="mt-3 leading-7 text-muted">{project.description}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-[#0f77cf]"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#09131b] px-5 py-3 text-sm font-semibold text-text hover:border-accent"
              >
                <Github size={16} /> GitHub
              </a>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#07111a] px-5 py-3 text-sm font-semibold text-text hover:border-accent"
              >
                <ArrowLeft size={16} /> Back to Dashboard
              </button>
            </div>
          </div>

          <aside className="space-y-6 rounded-[32px] border border-white/10 bg-[#08111e]/95 p-8 shadow-glow backdrop-blur-xl">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.28em] text-accent">Tech stack</p>
              <div className="grid gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="inline-flex items-center gap-2 rounded-3xl bg-[#091421] px-4 py-3 text-sm text-text">
                    <Layers size={16} className="text-primary" /> {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#07111c] p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-accent">Project details</p>
              <div className="mt-4 space-y-3 text-muted">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={18} className="text-primary" />
                  <span>Status: {project.status}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles size={18} className="text-accent" />
                  <span>{project.category}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetail;
