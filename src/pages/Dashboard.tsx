import { useMemo, useState } from 'react';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import StatsCard from '../components/StatsCard';

const filters = ['All', 'React', 'PHP', 'CodeIgniter', 'Cybersecurity', 'UI/UX'];

function Dashboard() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((project) =>
      project.tags.some((tag) => tag.toLowerCase() === activeFilter.toLowerCase()) ||
      project.category.toLowerCase().includes(activeFilter.toLowerCase())
    );
  }, [activeFilter]);

  return (
    <section className="relative overflow-hidden pb-20">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#112243] via-transparent to-transparent" />
      <div className="mx-auto max-w-7xl px-4 pt-8">
        <div className="rounded-[32px] border border-white/10 bg-surface/90 p-8 shadow-glow backdrop-blur-xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-accent">Project Dashboard</p>
              <h1 className="mt-4 text-4xl font-semibold text-text">A curated collection of my web development, cybersecurity, and academic system projects.</h1>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <StatsCard label="Total Projects" value={`${projects.length}`} />
              <StatsCard label="Main Stack" value="React, PHP, CI3" />
              <StatsCard label="Focus Area" value="Cybersecurity & Smart City" />
              <StatsCard label="Current Project" value="CyberVault" />
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[32px] border border-white/10 bg-[#08111e]/90 p-6 shadow-glow backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeFilter === filter
                    ? 'bg-primary text-[#050b14]'
                    : 'border border-white/10 bg-[#09131c] text-muted hover:bg-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
