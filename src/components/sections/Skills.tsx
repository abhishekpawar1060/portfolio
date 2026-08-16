"use client";

import { motion } from "framer-motion";

import Container from "@/components/ui/Container";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { skillCategories, currentlyLearning } from "@/data/skills";
import { cn } from "@/lib/utils";

const SEGMENTS = 5;

const accentClasses = {
  ember: { text: "text-ember", fill: "bg-ember", ring: "border-ember/30 bg-ember/10" },
  jade: { text: "text-jade", fill: "bg-jade", ring: "border-jade/30 bg-jade/10" },
  iris: { text: "text-iris", fill: "bg-iris", ring: "border-iris/30 bg-iris/10" },
} as const;

/** Five-segment level meter. Reads faster than a percentage bar and doesn't
 *  pretend to a precision that "how good are you at Kubernetes" doesn't have. */
function LevelMeter({ level, accent }: { level: number; accent: keyof typeof accentClasses }) {


  return (
    <span className="flex shrink-0 items-center gap-[3px]" aria-label={`${level} out of ${SEGMENTS}`}>
      {Array.from({ length: SEGMENTS }, (_, i) => (
        <motion.span
          key={i}
          className={cn(
            "h-3 w-[3px] rounded-full origin-bottom",
            i < level ? accentClasses[accent].fill : "bg-border",
          )}
          initial={{ scaleY: 0.2, opacity: 0.4 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </span>
  );
}

/**
 * Skills grouped by category rather than dumped as a tag cloud, with an honest
 * depth indicator per item.
 *
 * TODO: categories, skills and levels all live in src/data/skills.ts.
 */
export default function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-24 sm:py-32">
      <Container size="wide">
        <SectionHeading
          index="03"
          kicker="Capabilities"
          title="What I reach for, and how deep it goes."
          description="Five bars means I've operated it in production and could debug it at 3am. One means I've read the docs. No inflation."
        />

        <Reveal stagger={0.1} className="mt-14 grid gap-5 md:grid-cols-2" amount={0.05}>
          {skillCategories.map((category) => {
            const accent = accentClasses[category.accent];

            return (
              <RevealItem key={category.name} className="h-full">
                <SpotlightCard accent={category.accent} className="h-full p-6 sm:p-7">
                  <header className="flex flex-col gap-2 border-b border-border/60 pb-5">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "grid size-6 place-items-center rounded-md border font-mono text-[0.65rem] font-semibold",
                          accent.ring,
                          accent.text,
                        )}
                      >
                        {category.skills.length}
                      </span>
                      <h3 className="font-display text-lg font-semibold tracking-tight">
                        {category.name}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{category.blurb}</p>
                  </header>

                  <ul className="mt-5 flex flex-col">
                    {category.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="group/skill flex items-center justify-between gap-4 border-b border-border/30 py-2.5 last:border-0"
                      >
                        <span className="flex min-w-0 items-baseline gap-2">
                          <span className="truncate text-sm transition-colors duration-300 group-hover/skill:text-foreground">
                            {skill.name}
                          </span>
                          {skill.note && (
                            <span className="shrink-0 font-mono text-[0.65rem] text-muted-foreground">
                              {skill.note}
                            </span>
                          )}
                        </span>
                        <LevelMeter level={skill.level} accent={category.accent} />
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </RevealItem>
            );
          })}
        </Reveal>

        {/* Currently learning — TODO: update in data/skills.ts */}
        <Reveal className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-border/60 bg-card/40 px-5 py-4">
          <span className="label">Currently learning</span>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {currentlyLearning.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="size-1 rounded-full bg-ember" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
