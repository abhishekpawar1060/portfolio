import type { Post } from "@/types";

/* ============================================================================
   WRITING — TODO: replace with your real posts, or delete this section.
   ----------------------------------------------------------------------------
   `href` can be external (Substack, Medium, your newsletter) or an internal
   route if you later add MDX posts. To remove the section entirely, delete
   the <Writing /> import and usage in src/app/page.tsx.
   ========================================================================= */

export const posts: Post[] = [
  {
    slug: "evaluation-before-architecture",
    title: "Write the eval before you write the retriever",
    excerpt:
      "Six weeks of retrieval tuning against intuition, all of it revisited the moment we could measure groundedness. A case for building the measurement first.",
    date: "2025-11-04",
    readingTime: "8 min",
    tag: "Evaluation",
    href: "#",
  },
  {
    slug: "agents-observability-problem",
    title: "Agent reliability is an observability problem",
    excerpt:
      "Three rounds of prompt engineering before we admitted we couldn't see what was happening. What changed when every step got a typed contract and a trace.",
    date: "2025-08-19",
    readingTime: "12 min",
    tag: "Agents",
    href: "#",
  },
  {
    slug: "hybrid-retrieval-notes",
    title: "Notes on hybrid retrieval that actually shipped",
    excerpt:
      "Reciprocal rank fusion, why dense-only search keeps missing clause numbers, and the 22-point recall jump that came before any reranking.",
    date: "2025-05-27",
    readingTime: "10 min",
    tag: "Retrieval",
    href: "#",
  },
  {
    slug: "cost-of-a-silent-failure",
    title: "The real cost of a silent failure",
    excerpt:
      "A month of API budget in four days, zero completed tasks, and nobody noticed. On making failure loud by construction.",
    date: "2025-02-11",
    readingTime: "6 min",
    tag: "Systems",
    href: "#",
  },
];
