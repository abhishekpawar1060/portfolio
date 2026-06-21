import Container from "../ui/Container";
import ProjectCard from "../ui/ProjectCard";

import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-24 bg-background"
    >
      <Container>

        <div className="mb-16">
          <h2 className="text-4xl font-bold">
            Projects
          </h2>

          <p className="mt-3 text-muted-foreground">
            Some projects I've worked on.
          </p>
        </div>

        <div
          className="
            grid
            gap-8
            md:grid-cols-2
          "
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>

      </Container>
    </section>
  );
}