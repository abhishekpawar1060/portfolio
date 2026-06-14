import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

import ProjectCard from "../ui/ProjectCard";

import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-background">
      <Container>

        <SectionTitle
          title="Projects"
          subtitle="Some things I've built"
        />

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