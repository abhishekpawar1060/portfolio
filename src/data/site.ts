/* ============================================================================
   SITE CONFIG
   ----------------------------------------------------------------------------
   This single object feeds the nav, hero, footer, contact section and all
   page metadata. Change it once and it propagates everywhere.
   ========================================================================= */

export const site = {
  name: "Abhishek Pawar",
  shortName: "AP",
  role: "AI/ML Engineer",

  /** Rotating phrases in the hero. 3–5 works best. */
  roles: [
    "multi-agent systems",
    "MCP tool servers",
    "clinical data platforms",
    "LLM guardrails",
  ],

  /** The positioning statement — the most important sentence on the site. */
  positioning:
    "I build multi-agent LLM systems for regulated clinical data, where a confidently wrong answer is a compliance problem rather than a bad demo. Agent orchestration on Google ADK, self-hosted MCP tool servers, and the guardrails that decide what the system refuses to do.",

  /** One-line descriptor under the nav mark and in metadata. */
  tagline: "Multi-agent LLM systems for regulated clinical data.",

  location: "Pune, India",
  /** Shown in the hero pill and beside the contact section's status dot.
   *  Keep it short — long text crowds the pill on narrow screens. */
  availability: "Open to AI/ML engineering roles",

  email: "abhishekpawar7218@gmail.com",
  resume: "/Abhishek_Pawar_Resume.pdf",

  socials: {
    github: "https://github.com/abhishekpawar1060",
    linkedin: "https://www.linkedin.com/in/abhishekpawar7218",
    leetcode: "https://leetcode.com/u/abhishekpawar7218",
  },

  /** Canonical URL — used for metadata + Open Graph. TODO: set your domain. */
  url: "https://example.com",
} as const;

/** Headline stats in the hero. Every one of these is verifiable from work
 *  you've actually shipped — keep it that way. */
export const heroStats = [
  { value: "6", label: "Agent topologies shipped" },
  { value: "29+", label: "MCP tools self-hosted" },
  { value: "3", label: "LLM providers integrated" },
] as const;
