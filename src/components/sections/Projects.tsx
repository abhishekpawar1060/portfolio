import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/ui/Container";
import ProjectCard from "@/components/ui/ProjectCard";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { featuredProjects, projects } from "@/data/projects";

/**
 * Selected work. Deliberately asymmetric: the first project gets a full-width
 * lead card with all three metrics, the rest sit in a three-up grid. A flat
 * grid of identical cards would give every project the same weight, which is
 * exactly what a portfolio should not do.
 *
 * TODO: project content lives in src/data/projects.ts — nothing here needs
 * editing to add, remove or reorder projects.
 */
export default function Projects() {
  const [lead, ...rest] = featuredProjects;

  return (
    <section id="work" className="relative scroll-mt-24 py-24 sm:py-32">
      <Container size="wide">
        <SectionHeading
          index="01"
          kicker="Selected work"
          title={
            <>
              Four systems, and what it actually took{" "}
              <span className="text-muted-foreground">to make them hold.</span>
            </>
          }
          description="Each one is a full case study — the problem, the architecture, the decisions I'd defend, and the numbers that came out the other side."
        />

        <Reveal stagger={0.12} className="mt-14 grid gap-5 lg:grid-cols-3" amount={0.05}>
          {lead && (
            <RevealItem className="lg:col-span-3">
              <ProjectCard project={lead} index={1} variant="feature" />
            </RevealItem>
          )}

          {rest.map((project, i) => (
            <RevealItem key={project.slug}>
              <ProjectCard project={project} index={i + 2} />
            </RevealItem>
          ))}
        </Reveal>

        {/* Archive link — only rendered when there are non-featured projects */}
        {projects.length > featuredProjects.length && (
          <Reveal className="mt-10 flex justify-center" delay={0.1}>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card/40 px-5 py-3 text-sm font-medium backdrop-blur transition-colors duration-300 hover:border-ember/40 hover:text-ember"
            >
              All projects ({projects.length})
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
