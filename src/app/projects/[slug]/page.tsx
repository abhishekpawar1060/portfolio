import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Quote } from "lucide-react";

import Container from "@/components/ui/Container";
import MetricStat from "@/components/ui/MetricStat";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Tag from "@/components/ui/Tag";
import ArchitectureDiagram from "@/components/visuals/ArchitectureDiagram";
import Backdrop from "@/components/visuals/Backdrop";
import { getProject, getProjectNeighbours, projects } from "@/data/projects";

type Params = { params: Promise<{ slug: string }> };

/* Prerender every case study at build time. Adding a project to
   src/data/projects.ts is all it takes to get a new static page. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} — ${project.tagline}`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — ${project.tagline}`,
      description: project.summary,
      type: "article",
    },
  };
}

/* Shared heading for the case study body sections. */
function SectionMark({ index, label }: { index: string; label: string }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="font-mono text-xs tabular-nums text-ember">{index}</span>
      <span className="label !text-foreground/70">{label}</span>
      <span aria-hidden className="hairline h-px flex-1" />
    </div>
  );
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const { prev, next } = getProjectNeighbours(slug);

  const externalLinks = [
    { label: "Repository", href: project.links?.repo },
    { label: "Live", href: project.links?.live },
    { label: "Paper", href: project.links?.paper },
  ].filter((l): l is { label: string; href: string } => Boolean(l.href));

  return (
    <article>
      {/* ==================================================== Header ======= */}
      <header className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
        <Backdrop variant="subtle" />

        <Container size="wide">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-ember"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            All work
          </Link>

          <div className="mt-8 flex items-center gap-3">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ember">
              {project.category}
            </span>
            <span className="h-px w-6 bg-border" />
            <span className="font-mono text-[0.7rem] text-muted-foreground">{project.period}</span>
          </div>

          <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
            {project.title}
          </h1>

          <p className="mt-4 max-w-3xl text-balance text-xl font-medium text-foreground/85 sm:text-2xl">
            {project.tagline}
          </p>

          <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {project.summary}
          </p>

          {externalLinks.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {/* TODO: real URLs go in data/projects.ts → links */}
              {externalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 rounded-lg border border-border/70 bg-card/40 px-4 py-2 text-sm backdrop-blur transition-colors duration-300 hover:border-ember/40 hover:text-ember"
                >
                  {link.label}
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          )}

          {/* Headline metrics */}
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-3">
            {project.highlights.map((metric) => (
              <div key={metric.label} className="bg-card/60 p-6 backdrop-blur">
                <MetricStat metric={metric} size="lg" />
              </div>
            ))}
          </div>
        </Container>
      </header>

      {/* ==================================================== Body ========= */}
      <Container size="wide" className="pb-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ------------------------------------------------ Sticky aside */}
          <aside className="lg:col-span-4 lg:order-2">
            <div className="flex flex-col gap-4 lg:sticky lg:top-28">
              {/* Role card */}
              <SpotlightCard accent={project.accent} className="p-6">
                <p className="label">My role</p>
                <p className="mt-2 font-display text-lg font-semibold tracking-tight">
                  {project.role.title}
                </p>
                <p className="mt-1 font-mono text-[0.7rem] text-muted-foreground">
                  {project.role.team}
                </p>

                <ul className="mt-5 flex flex-col gap-3 border-t border-border/60 pt-5">
                  {project.role.contributions.map((c) => (
                    <li key={c} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span aria-hidden className="mt-[0.6em] size-1 shrink-0 rounded-full bg-ember/60" />
                      <span className="text-pretty">{c}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>

              {/* Stack card */}
              <div className="rounded-2xl border border-border/70 bg-card/40 p-6">
                <p className="label">Stack</p>
                <div className="mt-4 flex flex-col gap-4">
                  {project.stack.map((group) => (
                    <div key={group.group}>
                      <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                        {group.group}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <Tag key={item} size="sm">
                            {item}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ------------------------------------------------------- Main */}
          <div className="flex flex-col gap-16 lg:col-span-8 lg:order-1">
            {/* ---- Problem ------------------------------------------- */}
            <Reveal as="section">
              <SectionMark index="01" label="The problem" />
              <p className="text-pretty leading-relaxed text-muted-foreground sm:text-lg">
                {project.problem.context}
              </p>

              <div className="mt-8">
                <p className="label mb-4">Constraints</p>
                <ul className="grid gap-px overflow-hidden rounded-xl border border-border/60 bg-border/60 sm:grid-cols-2">
                  {project.problem.constraints.map((constraint, i) => (
                    <li key={constraint} className="flex gap-3 bg-card/50 p-4">
                      <span className="font-mono text-[0.7rem] tabular-nums text-ember/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-pretty text-sm leading-relaxed text-muted-foreground">
                        {constraint}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* ---- Approach ------------------------------------------ */}
            <Reveal as="section">
              <SectionMark index="02" label="Approach & architecture" />
              <p className="text-pretty leading-relaxed text-muted-foreground sm:text-lg">
                {project.approach.summary}
              </p>

              <div className="mt-8">
                <ArchitectureDiagram
                  image={project.approach.diagram.image}
                  caption={project.approach.diagram.caption}
                  stages={project.approach.diagram.stages}
                />
              </div>

              <div className="mt-10">
                <p className="label mb-4">Decisions worth defending</p>
                <div className="flex flex-col gap-3">
                  {project.approach.decisions.map((decision, i) => (
                    <SpotlightCard key={decision.title} accent={project.accent} className="p-5 sm:p-6">
                      <div className="flex gap-4">
                        <span className="font-mono text-xs tabular-nums text-ember/70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="font-display text-base font-semibold tracking-tight">
                            {decision.title}
                          </h3>
                          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                            {decision.detail}
                          </p>
                        </div>
                      </div>
                    </SpotlightCard>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* ---- Outcomes ------------------------------------------ */}
            <Reveal as="section" stagger={0.08}>
              <SectionMark index="03" label="Outcomes" />
              <div className="grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-2">
                {project.outcomes.map((metric) => (
                  <RevealItem key={metric.label} className="bg-card/50 p-6">
                    <MetricStat metric={metric} />
                  </RevealItem>
                ))}
              </div>
              {/* TODO: placeholder numbers — replace in data/projects.ts */}
            </Reveal>

            {/* ---- Reflection ---------------------------------------- */}
            {project.reflection && (
              <Reveal as="section">
                <SectionMark index="04" label="In hindsight" />
                <blockquote className="relative rounded-2xl border border-border/70 bg-card/40 p-6 sm:p-8">
                  <Quote aria-hidden className="absolute right-6 top-6 size-8 text-ember/15" />
                  <p className="text-pretty text-lg leading-relaxed sm:text-xl">
                    {project.reflection}
                  </p>
                </blockquote>
              </Reveal>
            )}
          </div>
        </div>
      </Container>

      {/* ==================================================== Pager ======== */}
      {(prev || next) && (
        <nav
          aria-label="More projects"
          className="relative border-t border-border/60 py-12"
        >
          <Container size="wide">
            <div className="grid gap-4 sm:grid-cols-2">
              {prev && (
                <Link
                  href={`/projects/${prev.slug}`}
                  className="group rounded-xl border border-border/70 bg-card/40 p-5 transition-colors duration-300 hover:border-ember/40"
                >
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                    Previous
                  </span>
                  <p className="mt-2 font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-ember">
                    {prev.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{prev.tagline}</p>
                </Link>
              )}

              {next && (
                <Link
                  href={`/projects/${next.slug}`}
                  className="group rounded-xl border border-border/70 bg-card/40 p-5 text-right transition-colors duration-300 hover:border-ember/40 sm:col-start-2"
                >
                  <span className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
                    Next
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <p className="mt-2 font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-ember">
                    {next.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{next.tagline}</p>
                </Link>
              )}
            </div>
          </Container>
        </nav>
      )}
    </article>
  );
}
