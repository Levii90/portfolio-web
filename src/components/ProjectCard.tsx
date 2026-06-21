import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const hasPreviewPage = Boolean(project.previewPath);
  const hasLiveDemo = Boolean(project.liveUrl && project.liveUrl !== '#');
  const hasGithub = project.githubUrl && project.githubUrl !== '#';

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group rounded-[28px] border border-white/10 bg-surface/95 p-4 shadow-glow backdrop-blur-xl"
    >
      <div className="relative overflow-hidden rounded-3xl">
        <img src={project.image} alt={project.title} className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-transparent to-transparent px-4 py-3 text-text">
          <p className="text-sm uppercase tracking-[0.24em] text-accent">{project.category}</p>
          <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <p className="text-sm leading-6 text-muted">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-[#07101f] px-3 py-1 text-[13px] text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-blue-950/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {project.status}
          </span>
          <div className="flex gap-2">
            {hasPreviewPage ? (
              <Link
                to={project.previewPath!}
                className="inline-flex h-9 items-center rounded-full border border-white/10 bg-primary px-3 text-xs font-semibold text-white hover:bg-[#0f77cf]"
              >
                Open Page
              </Link>
            ) : hasLiveDemo ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center rounded-full border border-white/10 bg-primary px-3 text-xs font-semibold text-white hover:bg-[#0f77cf]"
              >
                Demo
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex h-9 items-center rounded-full border border-white/10 bg-[#26344f] px-3 text-xs font-semibold text-muted"
              >
                Coming Soon
              </button>
            )}
            {hasGithub ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center rounded-full border border-white/10 bg-[#08141f] px-3 text-xs font-semibold text-text hover:border-accent"
              >
                <Github size={14} className="mr-2" />
                Code
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex h-9 items-center rounded-full border border-white/10 bg-[#26344f] px-3 text-xs font-semibold text-muted"
              >
                No Code
              </button>
            )}
          </div>
        </div>
        <Link
          to={`/project/${project.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent"
        >
          View Detail <ExternalLink size={14} />
        </Link>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
