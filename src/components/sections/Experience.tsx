"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { GraduationCap } from "lucide-react";

import Container from "@/components/ui/Container";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Tag from "@/components/ui/Tag";
import { experience, education } from "@/data/experience";
import { cn } from "@/lib/utils";

/**
 * Vertical timeline. The spine is a static hairline with a coloured overlay
 * whose scaleY is bound to scroll progress, so the line appears to draw itself
 * as you read down the section.
 *
 * TODO: roles live in src/data/experience.ts.
 */
export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.55"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="experience" className="relative scroll-mt-24 py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 bg-surface/40" />
      <div aria-hidden className="hairline absolute inset-x-0 top-0 h-px" />

      <Container size="wide">
        <SectionHeading
          index="04"
          kicker="Experience"
          title="Where I've been putting models into production."
          description="Six years of moving from notebooks that worked to services that stayed working."
        />

        <div ref={containerRef} className="relative mt-14">
          {/* --- Spine ---------------------------------------------------- */}
          <div
            aria-hidden
            className="absolute bottom-0 left-[7px] top-2 w-px bg-border sm:left-[calc(11rem+7px)]"
          />
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-ember via-ember/60 to-transparent sm:left-[calc(11rem+7px)]"
            style={{ scaleY: lineScale }}
          />

          <ol className="flex flex-col gap-12 sm:gap-14">
            {experience.map((item) => (
              <Reveal as="li" key={`${item.company}-${item.period}`} className="relative">
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                  {/* --- Period rail (desktop) -------------------------- */}
                  <div className="hidden w-44 shrink-0 pt-0.5 text-right sm:block">
                    <p className="font-mono text-xs text-muted-foreground">{item.period}</p>
                    <p className="mt-1 font-mono text-[0.7rem] text-muted-foreground">
                      {item.location}
                    </p>
                  </div>

                  {/* --- Marker ----------------------------------------- */}
                  <div className="absolute left-0 top-1.5 sm:left-[11rem]">
                    <span className="relative grid size-[15px] place-items-center">
                      {item.current && (
                        <span className="absolute size-[15px] rounded-full bg-ember/40 animate-pulse-ring" />
                      )}
                      <span
                        className={cn(
                          "size-[9px] rounded-full ring-4 ring-background",
                          item.current ? "bg-ember" : "bg-border",
                        )}
                      />
                    </span>
                  </div>

                  {/* --- Body ------------------------------------------- */}
                  <div className="min-w-0 flex-1 pl-7 sm:pl-8">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                        {item.role}
                      </h3>
                      {item.current && (
                        <span className="rounded-full border border-jade/30 bg-jade/10 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-jade">
                          Current
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm">
                      <span className="font-medium text-ember">{item.company}</span>
                      <span className="text-muted-foreground"> · {item.companyNote}</span>
                    </p>

                    {/* Period/location inline on mobile, where the rail is hidden */}
                    <p className="mt-2 font-mono text-xs text-muted-foreground sm:hidden">
                      {item.period} · {item.location}
                    </p>

                    <ul className="mt-4 flex flex-col gap-2.5">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                          <span aria-hidden className="mt-[0.6em] size-1 shrink-0 rounded-full bg-ember/60" />
                          <span className="text-pretty">{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.stack.map((tech) => (
                        <Tag key={tech} size="sm">
                          {tech}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* --- Education ------------------------------------------------- */}
        {education.length > 0 && (
          <Reveal stagger={0.1} className="panel-grid mt-16 rounded-xl sm:grid-cols-2">
            {education.map((item) => (
              <RevealItem key={item.degree} className="panel-cell p-5">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md border border-iris/30 bg-iris/10 text-iris">
                    <GraduationCap className="size-3.5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-sm font-semibold tracking-tight">{item.degree}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.school}</p>
                    <p className="mt-1.5 font-mono text-[0.7rem] text-muted-foreground">
                      {item.period} · {item.note}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        )}
      </Container>
    </section>
  );
}
