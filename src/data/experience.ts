import type { Certification, ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    role: "AI/ML Engineer",
    company: "Dizzaroo Pvt Ltd",
    companyNote: "Clinical trial data platforms · regulated environment",
    period: "Feb 2025 — Present",
    location: "Pune, Maharashtra",
    current: true,
    points: [
      "Architected six multi-agent orchestration topologies — graph, coordinator-delegate, hierarchical, iterative-refinement, sequential and parallel — on Google's Agent Development Kit, compiling user-authored configurations stored in MongoDB into live agent execution trees at request time.",
      "Built the no-code platform on top of it: a drag-and-drop canvas where non-technical users design agent workflows and configure each agent's model, tools and instructions through the UI, removing the need to hand-write agent code per workflow.",
      "Self-hosted Model Context Protocol servers and clients exposing 29+ tools across PostgreSQL, Neo4j, MongoDB and Weaviate, plus six external clinical, regulatory and financial APIs, with a global retry plugin that recovers failed tool calls up to twice without terminating the run.",
      "Engineered a natural-language-to-SQL query and dashboard system behind a defense-in-depth guardrail layer — sqlglot static validation, read-only allow-list parsing and per-tenant access policy — covered by 14 dedicated security tests for SQL injection and destructive statements.",
      "Gated every generation through a safety classifier (IBM Watsonx Granite Guardian) across three LLM providers, and routed models per task on cost tiers at 15+ configuration points: cheap models for high-volume classification, stronger ones for synthesis and planning.",
      "Orchestrated the event-driven data layer — an idempotent Kafka consumer/producer pipeline for cross-service entity sync, and Airflow ETL converting raw EDC data into SDTM-compliant PostgreSQL datasets with automatic rollback on failure.",
    ],
    stack: ["React", "Python", "Google ADK", "MCP", "FastAPI", "MongoDB", "PostgreSQL", "Kafka", "Airflow", "Azure", "Vertex AI"]
  },
  {
    role: "AI Intern",
    company: "Tech Mahindra",
    companyNote: "IT services and consulting",
    period: "Dec 2024 — Feb 2025",
    location: "Pune, Maharashtra",
    points: [
      "Designed and built a no-code multi-agent platform on the CrewAI framework, letting users create agents, define tasks and wire tool integrations through an Angular visual builder without writing code.",
      "Architected the Express REST APIs and MongoDB schemas behind the core entities — Agent, Task, Tool and User — so agent orchestration stayed modular and extensible as workflows grew.",
    ],
    stack: ["Angular", "Node.js", "Express", "MongoDB", "CrewAI"],
  },
];

export const education = [
  {
    degree: "B.Tech, Computer Science & Engineering",
    school: "Jawaharlal Nehru Engineering College, MGM University",
    period: "2021 — May 2025",
    note: "CGPA 9.07/10 ·  Chhatrapati Sambhajinagar, MH",
  },
];

/* Certifications, rendered under the timeline. `href` points at the PDF in
   /public/certificate — drop a new file there and add an entry to list it.
   Ordered by relevance to the work, not by date. */
export const certifications: Certification[] = [
  {
    name: "Model Context Protocol: Advanced Topics",
    issuer: "Anthropic Education",
    href: "/certificate/anthropic-mcp-certificate.pdf",
  },
  {
    name: "Deep Research with LangGraph",
    issuer: "LangChain",
    href: "/certificate/deep-research-with-langgraph.pdf",
  },
  {
    name: "Certified Linux Administrator (CLA)",
    issuer: "Linux Academy Australia",
    href: "/certificate/Abhishek_Pawar_CLA_Certificate.pdf",
  },
  {
    name: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services",
    href: "/certificate/aws-cloud-practitioner.pdf",
  },
];
