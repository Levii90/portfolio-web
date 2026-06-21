export type ProjectStatus = 'Completed' | 'In Development' | 'Academic Project' | 'Concept Project';

export interface Project {
  id: string;
  title: string;
  category: string;
  status: ProjectStatus;
  description: string;
  problem: string;
  tech: string[];
  features: string[];
  githubUrl: string;
  liveUrl: string;
  previewPath?: string;
  image: string;
  tags: string[];
}
