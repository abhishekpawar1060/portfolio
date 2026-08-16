import { ArrowUpRight } from "lucide-react";

import Container from "@/components/ui/Container";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { posts } from "@/data/writing";

/**
 * Writing index. An editorial list rather than cards — posts are text, and a
 * list gives the titles room to be the thing you actually read.
 *
 * TODO: posts live in src/data/writing.ts. To drop this section entirely,
 * remove <Writing /> from src/app/page.tsx and delete the nav entry.
 */
export default function Writing() {
  return (
    <section id="writing" className="relative scroll-mt-24 py-24 sm:py-32">
      <Container size="wide">
        <SectionHeading
          index="05"
          kicker="Writing"
          title="Notes from things that broke."
          description="Mostly post-mortems with the names removed, and the occasional argument about evaluation."
        />

        <Reveal stagger={0.08} className="mt-14 border-t border-border/60" amount={0.05}>
          {posts.map((post) => (
            <RevealItem key={post.slug} as="div">
              <a
                href={post.href}
                target={post.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
                className="group relative grid gap-3 border-b border-border/60 py-7 transition-colors duration-500 sm:grid-cols-12 sm:items-baseline sm:gap-6"
              >
                {/* Hover wash — bleeds slightly past the gutter so the row
                    reads as a full-width band, not a boxed card. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-x-4 inset-y-0 -z-10 rounded-lg bg-gradient-to-r from-ember/[0.07] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="flex items-center gap-3 sm:col-span-3 sm:flex-col sm:items-start sm:gap-1.5">
                  <time
                    dateTime={post.date}
                    className="font-mono text-xs text-muted-foreground"
                  >
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                  <span className="rounded-md border border-border/70 px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground transition-colors duration-300 group-hover:border-ember/40 group-hover:text-ember">
                    {post.tag}
                  </span>
                </div>

                <div className="sm:col-span-8">
                  <h3 className="text-balance font-display text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-ember sm:text-2xl">
                    {post.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <p className="mt-2 font-mono text-[0.7rem] text-muted-foreground/70">
                    {post.readingTime} read
                  </p>
                </div>

                <div className="hidden justify-end sm:col-span-1 sm:flex">
                  <span className="grid size-8 place-items-center rounded-full border border-border/70 text-muted-foreground transition-all duration-300 group-hover:border-ember/40 group-hover:text-ember">
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
