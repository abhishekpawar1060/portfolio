export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;

  techStack: string[];

  githubUrl: string;
  liveUrl?: string;

  featured: boolean;

  image: string;

  overview: string;
  problem: string;
  solution: string;
  architecture: string[];
}