/* ============================================================================
   CONTENT TYPES
   ----------------------------------------------------------------------------
   The shape of every piece of content on the site. The files in `src/data/`
   are the only place you need to edit to swap placeholder content for real
   content — TypeScript will tell you if you miss a required field.
   ========================================================================= */

/** A single headline number, e.g. "p95 latency · 2.4s → 380ms". */
export interface Metric {
  /** The number itself. Keep it short — it's rendered large. */
  value: string;
  /** What the number measures. */
  label: string;
  /** Optional delta/context line, e.g. "vs. 2.4s baseline". */
  detail?: string;
  /** `up` renders jade (a win), `down` renders jade too when lower is better. */
  trend?: "up" | "down" | "neutral";
}

/** One box in the architecture diagram fallback (rendered when no image exists). */
export interface ArchitectureNode {
  /** Short name, e.g. "Retriever". */
  title: string;
  /** One line on what it does. */
  detail: string;
  /** Optional stack note rendered in mono, e.g. "pgvector + BM25". */
  tech?: string;
}

/** A grouped stage of the architecture, rendered as a column/row of nodes. */
export interface ArchitectureStage {
  /** Stage name, e.g. "Ingestion". */
  name: string;
  nodes: ArchitectureNode[];
}

export interface Project {
  /** URL segment: /projects/<slug> */
  slug: string;
  /** Project name. */
  title: string;
  /** 4–8 words. Rendered under the title in the card. */
  tagline: string;
  /** 1–2 sentences. Card body + case study intro. */
  summary: string;
  /** Year or range, rendered in mono. */
  period: string;
  /** Category chip, e.g. "Retrieval", "Agents", "Platform". */
  category: string;
  /** Show on the homepage. Non-featured projects appear only on /projects. */
  featured: boolean;
  /** Drives the card's accent hue so the grid doesn't read as monotone. */
  accent: "ember" | "jade" | "iris";

  /** Up to 3 headline numbers shown on the card. */
  highlights: Metric[];
  /** Full stack, grouped for the case study page. */
  stack: { group: string; items: string[] }[];
  /** Flat list for the compact card chips. Keep to ~5. */
  tags: string[];

  /* --- Case study body --------------------------------------------------- */
  problem: {
    /** The situation in 2–4 sentences. */
    context: string;
    /** Bulleted constraints/pain points. */
    constraints: string[];
  };
  approach: {
    /** How you solved it, 2–4 sentences. */
    summary: string;
    /** The diagram. Drop a real image at `image` and it replaces the fallback. */
    diagram: {
      /** Optional path in /public, e.g. "/diagrams/rag.png". */
      image?: string;
      /** Alt text / caption for the diagram. */
      caption: string;
      /** Rendered as a styled flow when `image` is absent. */
      stages: ArchitectureStage[];
    };
    /** Notable engineering decisions, each a title + rationale. */
    decisions: { title: string; detail: string }[];
  };
  role: {
    /** Your title on the project. */
    title: string;
    /** Team context, e.g. "3 engineers, 1 PM". */
    team: string;
    /** What you personally owned. */
    contributions: string[];
  };
  /** Outcome metrics for the results section. */
  outcomes: Metric[];
  /** Closing reflection — what you'd do differently. */
  reflection?: string;

  links?: {
    repo?: string;
    live?: string;
    paper?: string;
  };
}

export interface SkillCategory {
  /** e.g. "LLM & Agent Frameworks" */
  name: string;
  /** One line describing your depth in this area. */
  blurb: string;
  accent: "ember" | "jade" | "iris";
  skills: {
    name: string;
    /** 1–5. Drives the bar/dot indicator. Be honest — it's visible. */
    level: number;
    /** Optional context chip, e.g. "production". */
    note?: string;
  }[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  /** e.g. "Feb 2025 — Present" */
  period: string;
  /** e.g. "Remote · Pune, IN" */
  location: string;
  /** One-line company descriptor. */
  companyNote: string;
  /** 2–4 bullets. Lead with impact. */
  points: string[];
  /** Rendered as mono chips under the bullets. */
  stack: string[];
  /** Highlights the entry as the current role. */
  current?: boolean;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date — formatted at render time. */
  date: string;
  readingTime: string;
  tag: string;
  /** External link (Substack, Medium, etc.) or an internal route. */
  href: string;
}
