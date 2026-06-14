export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;

  techStack: string[];

  githubUrl?: string;
  liveUrl?: string;

  featured: boolean;

  overview: string;
  problem: string;
  solution: string;
  architecture: string[];
}