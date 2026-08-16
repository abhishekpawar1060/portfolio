import type { SkillCategory } from "@/types";

/* ============================================================================
   SKILLS — TODO: replace with your real stack.
   ----------------------------------------------------------------------------
   `level` is 1–5 and drives the visible indicator, so keep it honest:
     5 = built and operated it in production, could debug it at 3am
     4 = shipped with it repeatedly
     3 = comfortable, used on real work
     2 = working knowledge
     1 = have touched it

   Category order is the display order. 4 categories fits the layout best;
   the grid handles 3–6 without changes.
   ========================================================================= */

export const skillCategories: SkillCategory[] = [
  {
    name: "LLM & Agent Frameworks",
    blurb: "Retrieval, orchestration, and everything that keeps a model honest.",
    accent: "ember",
    skills: [
      { name: "RAG architecture", level: 5, note: "production" },
      { name: "LangGraph", level: 4 },
      { name: "Temporal", level: 4, note: "durable agents" },
      { name: "vLLM", level: 5, note: "self-hosted" },
      { name: "DSPy", level: 3 },
      { name: "Evaluation harnesses", level: 5 },
      { name: "Structured output", level: 5 },
      { name: "Fine-tuning / LoRA", level: 4 },
    ],
  },
  {
    name: "ML & Data",
    blurb: "From feature pipelines to the models that consume them.",
    accent: "jade",
    skills: [
      { name: "PyTorch", level: 5 },
      { name: "Transformers", level: 5 },
      { name: "XGBoost", level: 4 },
      { name: "Apache Flink", level: 4, note: "streaming" },
      { name: "Kafka", level: 4 },
      { name: "Feature stores", level: 4, note: "Feast" },
      { name: "Airflow / dbt", level: 4 },
      { name: "pandas / Polars", level: 5 },
    ],
  },
  {
    name: "Infrastructure",
    blurb: "Where models stop being notebooks and start having an on-call rota.",
    accent: "iris",
    skills: [
      { name: "Kubernetes", level: 4 },
      { name: "Docker", level: 5 },
      { name: "Terraform", level: 4 },
      { name: "AWS", level: 4 },
      { name: "GPU scheduling", level: 4, note: "Ray" },
      { name: "Prometheus / Grafana", level: 4 },
      { name: "OpenTelemetry", level: 4 },
      { name: "CI/CD", level: 5 },
    ],
  },
  {
    name: "Languages & Tools",
    blurb: "The daily drivers.",
    accent: "ember",
    skills: [
      { name: "Python", level: 5, note: "primary" },
      { name: "TypeScript", level: 4 },
      { name: "SQL", level: 5 },
      { name: "Go", level: 3 },
      { name: "Rust", level: 2 },
      { name: "Postgres / pgvector", level: 5 },
      { name: "Next.js", level: 4 },
      { name: "Git", level: 5 },
    ],
  },
];

/* Currently-learning strip under the grid. TODO: update or delete. */
export const currentlyLearning = [
  "CUDA kernel authoring",
  "Speculative decoding",
  "Mechanistic interpretability",
];
