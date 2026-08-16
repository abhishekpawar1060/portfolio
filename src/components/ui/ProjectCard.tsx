"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/types";
import MetricStat from "@/components/ui/MetricStat";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Tag from "@/components/ui/Tag";
import { cn } from "@/lib/utils";

/**
 * Project card in two densities:
 *  - `feature`: full-width lead card, two columns, all metrics visible
 *  - `standard`: grid card, single metric, condensed
 *
 * The whole card is one link to the case study. Everything else is decoration,
 * so nothing inside is separately focusable.
 */
export default function ProjectCard({
  project,
  index,
  variant = "standard",
}: {
  project: Project;
  /** 1-based position, rendered as the watermark index. */
  index: number;
  variant?: "feature" | "standard";
}) {
  const reduced = useReducedMotion();
  const isFeature = variant === "feature";

  const accentText =
    project.accent === "jade"
      ? "text-jade"
      : project.accent === "iris"
        ? "text-iris"
        : "text-ember";

  return (
    <SpotlightCard
      as="article"
      accent={project.accent}
      className="h-full"
    >
      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          "flex h-full flex-col gap-6 p-6 sm:p-8",
          isFeature && "lg:grid lg:grid-cols-12 lg:items-start lg:gap-12 lg:p-10",
        )}
      >
        {/* Watermark index — large, low-contrast, purely typographic texture */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-5 top-3 font-display text-6xl font-bold leading-none text-foreground/[0.045] sm:text-7xl"
        >
          {String(index).padStart(2, "0")}
        </span>

        {/* ------------------------------------------------------- Content */}
        <div className={cn("flex flex-1 flex-col", isFeature && "lg:col-span-7")}>
          <div className="flex items-center gap-3">
            <span className={cn("font-mono text-[0.7rem] uppercase tracking-[0.16em]", accentText)}>
              {project.category}
            </span>
            <span className="h-px w-6 bg-border" />
            <span className="font-mono text-[0.7rem] text-muted-foreground">{project.period}</span>
          </div>

          <h3
            className={cn(
              "mt-4 font-display font-semibold tracking-[-0.03em]",
              isFeature ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl",
            )}
          >
            {project.title}
          </h3>

          <p
            className={cn(
              "mt-2 text-pretty font-medium text-foreground/85",
              isFeature ? "text-lg sm:text-xl" : "text-base",
            )}
          >
            {project.tagline}
          </p>

          <p
            className={cn(
              "mt-4 text-pretty text-sm leading-relaxed text-muted-foreground",
              isFeature && "sm:text-base",
            )}
          >
            {project.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Tag key={tag} size="sm">
                {tag}
              </Tag>
            ))}
          </div>

          {/* Read-more affordance pinned to the bottom of the card */}
          <div className="mt-auto flex items-center gap-2 pt-8">
            <span className="text-sm font-medium">Read case study</span>
            <motion.span
              aria-hidden
              className={cn("grid size-7 place-items-center rounded-full border border-border/70", accentText)}
              whileHover={reduced ? undefined : { scale: 1.1 }}
            >
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/spot:-translate-y-0.5 group-hover/spot:translate-x-0.5" />
            </motion.span>
          </div>
        </div>

        {/* ------------------------------------------------------- Metrics */}
        <div
          className={cn(
            isFeature
              ? "grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border/50 bg-border/50 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1"
              : "border-t border-border/60 pt-5",
          )}
        >
          {isFeature ? (
            project.highlights.map((metric) => (
              <div key={metric.label} className="bg-card/60 p-5">
                <MetricStat metric={metric} size="default" />
              </div>
            ))
          ) : (
            <MetricStat metric={project.highlights[0]} size="sm" />
          )}
        </div>
      </Link>
    </SpotlightCard>
  );
}
