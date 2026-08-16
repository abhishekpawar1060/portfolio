import type { SkillCategory } from "@/types";

/* ============================================================================
   SKILLS
   ----------------------------------------------------------------------------
   `level` is 1–5 and drives the visible indicator, so keep it honest:
     5 = built and operated it in production, could debug it at 3am
     4 = shipped with it repeatedly
     3 = comfortable, used on real work
     2 = working knowledge
     1 = have touched it

   NOTE: the levels below are an estimate inferred from what your CV shows you
   actually shipped. Go through them once and correct anything that's off —
   the Skills section explicitly promises "no inflation", so it should be true.
   ========================================================================= */

export const skillCategories: SkillCategory[] = [
  {
    name: "AI & Agents",
    blurb: "Orchestration, tool protocols, and the guardrails that keep them honest.",
    accent: "ember",
    skills: [
      { name: "Google ADK", level: 5, note: "production" },
      { name: "Multi-agent orchestration", level: 5, note: "6 topologies" },
      { name: "Model Context Protocol", level: 5, note: "self-hosted" },
      { name: "Guardrails & grounding", level: 5 },
      { name: "Structured output", level: 5, note: "Pydantic" },
      { name: "OpenAI / Gemini / DeepSeek", level: 4 },
      { name: "RAG", level: 4 },
      { name: "Watsonx Granite Guardian", level: 3, note: "safety gate" },
    ],
  },
  {
    name: "Data & Retrieval",
    blurb: "Where the agents get their facts, and how those facts stay consistent.",
    accent: "jade",
    skills: [
      { name: "PostgreSQL", level: 5 },
      { name: "MongoDB", level: 5 },
      { name: "Apache Kafka", level: 4, note: "idempotent" },
      { name: "Apache Airflow", level: 4, note: "SDTM ETL" },
      { name: "Weaviate", level: 4, note: "hybrid search" },
      { name: "SQLGlot", level: 4, note: "static validation" },
      { name: "Neo4j", level: 3 },
      { name: "BM25 + dense retrieval", level: 4 },
    ],
  },
  {
    name: "Backend & Infrastructure",
    blurb: "Serving it, streaming it, and getting it deployed without drama.",
    accent: "iris",
    skills: [
      { name: "FastAPI", level: 5 },
      { name: "REST APIs", level: 5 },
      { name: "Azure", level: 4, note: "App Service, ACR" },
      { name: "Docker", level: 4 },
      { name: "Azure Pipelines", level: 4, note: "CI/CD" },
      { name: "WebSocket / SSE", level: 4 },
      { name: "Node.js / Express", level: 4 },
      { name: "OpenTelemetry", level: 3 },
    ],
  },
  {
    name: "Languages & Frontend",
    blurb: "The daily drivers, and enough front-end to ship the whole feature.",
    accent: "ember",
    skills: [
      { name: "Python", level: 5, note: "primary" },
      { name: "SQL", level: 5 },
      { name: "TypeScript / JavaScript", level: 4 },
      { name: "React 19", level: 4 },
      { name: "@xyflow/react", level: 4, note: "node canvas" },
      { name: "Zustand", level: 3 },
      { name: "Java", level: 3 },
      { name: "Linux", level: 4, note: "CLA certified" },
    ],
  },
];

/* Currently learning — update freely, this is meant to move. */
export const currentlyLearning = [
  "Agent evaluation harnesses",
  "Distributed tracing for LLM calls",
  "LangGraph deep research patterns",
];
