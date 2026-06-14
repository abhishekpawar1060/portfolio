import Link from "next/link";
import { Project } from "@/types/project";

interface Props {
  project: Project;
}

export default function ProjectCard({
  project,
}: Props) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block"
    >
      <div className="rounded-xl border-border p-6 transition hover:shadow-lg hover:-translate-y-1">
        <h3 className="text-2xl font-bold">
          {project.title}
        </h3>

        <p className="mt-4 text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}