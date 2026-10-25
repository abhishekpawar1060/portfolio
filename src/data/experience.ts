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
      "Led a centralized Model Context Protocol hub, bringing independently maintained tool servers into a consistent integration layer for AI workflows.",
      "Designed agent orchestration and a no-code workflow builder so users can compose multi-step AI workflows through a visual interface.",
      "Built a natural-language data-query experience with read-only access controls and validation checks to limit unsafe or invalid queries.",
      "Contributed to safety checks, model selection, and event-driven data processing across the AI platform.",
    ],
    stack: ["React", "Python", "Google ADK", "MCP", "FastAPI", "MongoDB", "PostgreSQL", "Kafka", "Airflow", "Azure", "Vertex AI", "FastMCP", "Docker", "Azure Container Apps", "MLflow"]
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
