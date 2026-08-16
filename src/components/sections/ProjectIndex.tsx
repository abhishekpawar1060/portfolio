"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Minus, Plus } from "lucide-react";

import MetricStat from "@/components/ui/MetricStat";
import Tag from "@/components/ui/Tag";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * The full project index — an accordion rather than more cards, so the archive
 * reads as a reference list. Expanding gives you enough to decide whether to
 * open the full case study.
 *
 * TODO: content comes from src/data/projects.ts.
 */
export default function ProjectIndex() {
  const [openSlug, setOpenSlug] = useState<string | null>(projects[0]?.slug ?? null);
  const reduced = useReducedMotion();

  return (
    <ul className="border-t border-border/60">
      {projects.map((project, i) => {
        const isOpen = openSlug === project.slug;
        const accentText =
          project.accent === "jade"
            ? "text-jade"
            : project.accent === "iris"
              ? "text-iris"
              : "text-ember";

        return (
          <li key={project.slug} className="border-b border-border/60">
            {/* --- Row -------------------------------------------------- */}
            <button
              type="button"
              onClick={() => setOpenSlug(isOpen ? null : project.slug)}
              aria-expanded={isOpen}
              aria-controls={`project-panel-${project.slug}`}
              className="group flex w-full items-center gap-4 py-6 text-left sm:gap-6"
            >
              <span className="font-mono text-xs tabular-nums text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span
                    className={cn(
                      "font-display text-xl font-semibold tracking-tight transition-colors duration-300 sm:text-2xl",
                      isOpen && accentText,
                      !isOpen && "group-hover:text-ember",
                    )}
                  >
                    {project.title}
                  </span>
                  <span className="text-sm text-muted-foreground">{project.tagline}</span>
                </span>
              </span>

              <span className="hidden shrink-0 font-mono text-[0.7rem] text-muted-foreground sm:block">
                {project.period}
              </span>

              <span
                aria-hidden
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-300",
                  isOpen ? "border-ember/40 text-ember" : "border-border/70 text-muted-foreground",
                )}
              >
                {isOpen ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
              </span>
            </button>

            {/* --- Panel ------------------------------------------------ */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`project-panel-${project.slug}`}
                  initial={reduced ? undefined : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-8 pb-8 sm:grid-cols-12 sm:gap-10">
                    <div className="sm:col-span-7 sm:col-start-2">
                      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                        {project.summary}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <Tag key={tag} size="sm">
                            {tag}
                          </Tag>
                        ))}
                      </div>

                      <Link
                        href={`/projects/${project.slug}`}
                        className="group/link mt-6 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-ember"
                      >
                        Read the full case study
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                      </Link>
                    </div>

                    <div className="flex flex-col gap-5 sm:col-span-4">
                      {project.highlights.map((metric) => (
                        <MetricStat key={metric.label} metric={metric} size="sm" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
