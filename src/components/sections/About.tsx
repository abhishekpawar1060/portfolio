import { Terminal } from "lucide-react";

import Container from "@/components/ui/Container";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Tag from "@/components/ui/Tag";
import { site } from "@/data/site";

/* TODO: rewrite this bio. Two or three short paragraphs is the right length —
   the projects section carries the detail, this just gives it a voice. */
const bio = [
  "I started out training forecasting models that nobody could deploy, which taught me early that a model is maybe a fifth of the work. The rest is retrieval that stays grounded, evaluation you can trust, and infrastructure that doesn't fold at peak.",
  "These days I work mostly on language-model systems: hybrid retrieval, agent orchestration, and the unglamorous evaluation harnesses that keep both honest. I like problems where the failure mode is subtle — where the system produces something plausible and wrong, and finding out why is the actual job.",
  "Outside of that I write about what breaks in production, mentor engineers moving from notebooks to services, and spend an unreasonable amount of time reading incident reports.",
];

/* TODO: replace with the principles you'd actually defend in a design review. */
const principles = [
  { title: "Measure before you tune", detail: "An eval you trust beats a month of intuition." },
  { title: "Fail loudly", detail: "A silent wrong answer costs more than a crash." },
  { title: "Boring where it counts", detail: "Novel architecture, conventional operations." },
  { title: "Own the whole path", detail: "From ingestion to the on-call page at 3am." },
];

/* TODO: the stack you want front and centre. Full breakdown is in data/skills.ts */
const quickStack = [
  "Python", "PyTorch", "vLLM", "LangGraph", "Temporal",
  "Postgres / pgvector", "Kafka", "Ray", "Kubernetes", "TypeScript",
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
          title="A model is about a fifth of the work."
          description="The other four fifths are the parts nobody demos."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ------------------------------------------------------ Portrait */}
          <Reveal direction="right" className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              {/*
                TODO: REPLACE WITH YOUR PHOTO.
                Drop the file in /public (e.g. /public/portrait.jpg) and swap
                this whole block for:

                  import Image from "next/image";
                  <Image
                    src="/portrait.jpg"
                    alt="Your Name"
                    width={640}
                    height={800}
                    priority
                    className="size-full rounded-2xl object-cover"
                  />

                Keep the wrapper div so the frame treatment survives.
              */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/70 bg-card/50">
                <div
                  aria-hidden
                  className="grid-field absolute inset-0"
                  style={{ "--grid-field-opacity": 0.14 } as React.CSSProperties}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(120% 90% at 30% 10%, color-mix(in oklch, var(--ember) 22%, transparent), transparent 60%)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <span className="grid size-16 place-items-center rounded-2xl border border-border/70 bg-card/80 font-display text-xl font-semibold backdrop-blur">
                    {site.shortName}
                  </span>
                  <span className="label text-muted-foreground">Portrait placeholder</span>
                </div>

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
