import Image from "next/image";
import { Terminal } from "lucide-react";

import Container from "@/components/ui/Container";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Tag from "@/components/ui/Tag";
import { site } from "@/data/site";

const bio = [
  "I build multi-agent LLM systems for clinical trial data — a domain where a confidently wrong answer isn't a bad demo, it's a regulatory problem. Most of my work sits in the gap between a model that produces plausible text and a system you can actually let near a validated dataset.",
  "Day to day that means agent orchestration on Google's ADK, self-hosted MCP servers exposing database and clinical-API tools, and the guardrail layers underneath: static SQL validation, read-only allow-lists, per-tenant access policy, a safety classifier on every generation. The interesting problems are rarely the prompts — they're the retries, the idempotency, and deciding what a system should refuse to do.",
  "I finished my B.Tech in Computer Science in 2025 and have been shipping production LLM systems since before I graduated. I'm still early enough in this to be genuinely curious about how other people solve these problems, and far enough in to know which parts break.",
];

/* Drawn from decisions actually made on the systems in the timeline —
   change these if your thinking changes, but keep them defensible. */
const principles = [
  {
    title: "Guard the boundary",
    detail: "Validate and allow-list before the query runs, not after it returns.",
  },
  {
    title: "Retry, don't restart",
    detail: "Idempotent consumers and tool-level recovery beat re-running the whole job.",
  },
  {
    title: "Keep a human on the merge",
    detail: "Extraction proposes, a reviewer approves — especially on regulated data.",
  },
  {
    title: "Route by cost, not habit",
    detail: "Cheap models for classification, strong ones for synthesis and planning.",
  },
];

/* The stack front and centre. Full breakdown lives in data/skills.ts */
const quickStack = [
  "Python", "Google ADK", "MCP", "FastAPI", "React",
  "PostgreSQL", "MongoDB", "Weaviate", "Kafka", "Airflow", "Azure",
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      {/* Section-level tint so the page doesn't read as one flat colour */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-surface/40" />
      <div aria-hidden className="hairline absolute inset-x-0 top-0 h-px" />

      <Container size="wide">
        <SectionHeading
          index="02"
          kicker="About"
          title="Plausible text is the easy part."
          description="The rest is guardrails, retries and knowing what the system should refuse to do."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ------------------------------------------------------ Portrait */}
          <Reveal direction="right" className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              {/* /public/portrait.png is a background-removed cutout, so the
                  layers below show *through* it: grid, then glow, then the
                  subject on top. Swap the file to change the photo — but keep
                  it a transparent PNG or the treatment collapses. */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/70 bg-card/50">
                <div
                  aria-hidden
                  className="grid-field absolute inset-0"
                  style={{ "--grid-field-opacity": 0.14 } as React.CSSProperties}
                />
                {/* Glow sits BEHIND the subject — a wash on top would tint
                    his face and look like a filter. */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(75% 55% at 50% 42%, color-mix(in oklch, var(--ember) 34%, transparent), transparent 70%)",
                  }}
                />
                <Image
                  src="/portrait.png"
                  alt={`${site.name}, ${site.role}`}
                  fill
                  sizes="(min-width: 1024px) 22rem, 100vw"
                  priority
                  className="object-cover object-top"
                />
                {/* Grounds the cutout so it doesn't float — the subject fades
                    into the frame rather than ending on a hard cut. */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent"
                />
                {/* Corner registration marks — instrument-panel detail */}
                {["left-3 top-3", "right-3 top-3", "left-3 bottom-3", "right-3 bottom-3"].map((pos) => (
                  <span
                    key={pos}
                    aria-hidden
                    className={`absolute ${pos} size-2 border border-ember/40`}
                  />
                ))}
              </div>

              {/* Caption strip */}
              <div className="mt-3 flex items-center justify-between gap-3 font-mono text-[0.7rem] text-muted-foreground">
                <span>{site.name}</span>
                <span>{site.location}</span>
              </div>
            </div>
          </Reveal>

          {/* ----------------------------------------------------------- Bio */}
          <div className="lg:col-span-8">
            <Reveal stagger={0.1}>
              {bio.map((paragraph) => (
                <RevealItem key={paragraph.slice(0, 24)} as="p" className="mb-5 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
                  {paragraph}
                </RevealItem>
              ))}
            </Reveal>

            {/* Principles grid */}
            <Reveal stagger={0.08} className="panel-grid mt-12 rounded-xl sm:grid-cols-2">
              {principles.map((p) => (
                <RevealItem
                  key={p.title}
                  className="panel-cell group p-5 transition-colors duration-300 hover:bg-card"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border border-ember/30 bg-ember/10 text-ember transition-transform duration-300 group-hover:scale-110">
                      <Terminal className="size-3" />
                    </span>
                    <div>
                      <h3 className="font-display text-sm font-semibold tracking-tight">{p.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.detail}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </Reveal>

            {/* Quick stack */}
            <Reveal className="mt-10" delay={0.1}>
              <p className="label mb-3 text-muted-foreground">Working stack</p>
              <div className="flex flex-wrap gap-1.5">
                {quickStack.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
