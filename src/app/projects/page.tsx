import Link from "next/link";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">

      <h1 className="mb-10 text-5xl font-bold">
        Projects
      </h1>

      <div className="grid gap-8 md:grid-cols-2">

        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
          >
            <div className="rounded-xl border-border p-6">

              <h2 className="text-2xl font-bold">
                {project.title}
              </h2>

              <p className="mt-3 text-muted-foreground">
                {project.description}
              </p>

            </div>
          </Link>
        ))}

      </div>

    </div>
  );
}