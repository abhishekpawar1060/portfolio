import type { Project } from "@/types";

/* ============================================================================
   PROJECTS / CASE STUDIES
   ----------------------------------------------------------------------------
   Case study content is curated here. Include only information approved for public sharing.

   How to use it:
   - Each object here generates a card on the homepage (if `featured: true`),
     a row on /projects, and a full case study page at /projects/<slug>.
   - Adding/removing a project needs no component changes — the routes are
     generated from this array via generateStaticParams().
   - `approach.diagram.image` is the drop-in slot for a real architecture
     diagram: put a file in /public and set the path. Until then, the
     `stages` below render as a styled flow diagram automatically.
   - Keep 3–4 featured projects. More than that and the section loses its
     hierarchy.
   ========================================================================= */

export const projects: Project[] = [
  /* ------------------------------------------------------------------ 00 */
  {
    slug: "mcp-integration-hub",
    title: "MCP Integration Hub",
    tagline: "One interface for a growing tool ecosystem",
    summary:
      "I led the development of a centralized Model Context Protocol hub that brings independently built tools and data integrations into a consistent interface for AI workflows.",
    period: "2025 - Present",
    category: "AI Platform",
    featured: true,
    accent: "jade",

    highlights: [
      { value: "Central", label: "Shared integration layer" },
      { value: "Composable", label: "Independent MCP servers" },
      { value: "Resilient", label: "Tool-call recovery" },
    ],

    tags: ["MCP", "FastMCP", "FastAPI", "Docker", "Azure Container Apps"],

    stack: [
      { group: "Integration", items: ["Model Context Protocol", "FastMCP"] },
      { group: "API", items: ["Python", "FastAPI"] },
      { group: "Deployment", items: ["Docker", "Azure Container Apps"] },
      { group: "Use cases", items: ["Research discovery", "Regulatory information", "Structured data access"] },
    ],

    problem: {
      context:
        "AI workflows need access to tools and information from multiple independently maintained services. Integrating each service directly into every workflow makes tool discovery, consistent invocation, and ongoing maintenance harder as the ecosystem grows.",
      constraints: [
        "Integrations should remain independently maintainable",
        "Workflows need a consistent way to discover and call tools",
      ],
    },

    approach: {
      summary:
        "I led the MCP hub project, organizing separate tool servers behind a common integration layer for agent workflows. I focused on making integrations composable and consistent to consume, while adding shared recovery behavior for failed tool calls. This lets the platform expand its tool ecosystem without embedding service-specific details in every workflow.",
      diagram: {
        caption: "A high-level view of the MCP integration hub.",
        stages: [
          {
            name: "Connect",
            nodes: [
              { title: "Independent services", detail: "Data and information sources remain separately maintained" },
            ],
          },
          {
            name: "Expose",
            nodes: [
              { title: "MCP servers", detail: "Tools are presented through a shared integration pattern", tech: "FastMCP / FastAPI" },
            ],
          },
          {
            name: "Deploy",
            nodes: [
              { title: "Containerized services", detail: "Services are packaged and deployed as containers", tech: "Docker / Azure Container Apps" },
            ],
          },
          {
            name: "Discover",
            nodes: [
              { title: "Tool catalog", detail: "Agent workflows can access available capabilities" },
            ],
          },
          {
            name: "Use",
            nodes: [
              { title: "Agent workflows", detail: "Tools are invoked with shared recovery behavior", tech: "Google ADK" },
            ],
          },
        ],
      },
      decisions: [
        {
          title: "Keep integrations modular",
          detail:
            "Separate MCP servers let integrations evolve independently and keep service-specific behavior out of workflow definitions.",
        },
        {
          title: "Use a shared protocol boundary",
          detail:
            "A common MCP interface gives agent workflows a consistent way to discover and invoke tools across different sources.",
        },
        {
          title: "Recover failed calls centrally",
          detail:
            "Shared retry behavior can recover transient tool-call failures without duplicating recovery logic in each workflow.",
        },
      ],
    },

    role: {
      title: "Project Lead",
      team: "Platform project",
      contributions: [
        "Led the MCP hub project from integration design through platform delivery",
        "Coordinated independently maintained MCP servers behind a consistent tool interface",
        "Built services with FastMCP and FastAPI, packaged them with Docker, and deployed them on Azure Container Apps",
        "Added shared retry behavior to improve recovery from failed tool calls",
        "Connected the hub to agent workflows while keeping internal service details out of workflow configuration",
      ],
    },

    outcomes: [
      { value: "Shared", label: "Integration pattern across tools" },
      { value: "Modular", label: "Independent server lifecycle" },
      { value: "Reusable", label: "Tool access for agent workflows" },
    ],

    reflection:
      "I would define the public and internal documentation boundary at the start of a platform project. The same high-level architecture can communicate the engineering work without publishing operational inventories or endpoint details.",
  },
];

/* --- Derived helpers — no need to edit below this line ------------------- */

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Next/previous project for the case study footer navigation. */
export function getProjectNeighbours(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  };
}
