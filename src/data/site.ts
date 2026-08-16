/* ============================================================================
   SITE CONFIG — TODO: replace every value below with your real details.
   ----------------------------------------------------------------------------
   This single object feeds the nav, hero, footer, contact section and all
   page metadata. Change it once and it propagates everywhere.
   ========================================================================= */

export const site = {
  // TODO: replace with your real name
  name: "Your Name",
  /** Short form used in the nav mark and footer. */
  shortName: "YN",
  // TODO: replace with your real title
  role: "AI/ML Engineer",

  /** Rotating phrases in the hero. TODO: make these yours — 3–5 works best. */
  roles: [
    "retrieval systems",
    "agent orchestration",
    "inference infrastructure",
    "evaluation harnesses",
  ],

  /** The positioning statement. This is the most important sentence on the
   *  site — it should say what you do and who for. TODO: rewrite. */
  positioning:
    "I build language-model systems that survive contact with production — retrieval that stays grounded, agents that fail loudly, and inference that holds its latency budget under load.",

  /** One-line descriptor under the nav mark and in metadata. */
  tagline: "Building LLM systems that hold up in production.",

  // TODO: replace with your city
  location: "Pune, India",
  /** Availability line in the contact section. TODO: update or set to null. */
  availability: "Open to senior IC roles and select consulting",

  // TODO: replace all links below
  email: "hello@example.com",
  resume: "/resume.pdf",

  socials: {
    github: "https://github.com/your-handle",
    linkedin: "https://linkedin.com/in/your-handle",
    x: "https://x.com/your-handle",
    scholar: "https://scholar.google.com/citations?user=your-id",
  },

  /** Canonical URL — used for metadata + Open Graph. TODO: set your domain. */
  url: "https://example.com",
} as const;

/** Headline stats in the hero. TODO: replace with real numbers (or delete). */
export const heroStats = [
  { value: "6+", label: "Years shipping ML" },
  { value: "14", label: "Systems in production" },
  { value: "40M+", label: "Daily inferences served" },
] as const;
