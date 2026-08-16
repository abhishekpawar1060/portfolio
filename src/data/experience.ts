import type { ExperienceItem } from "@/types";

/* ============================================================================
   EXPERIENCE — TODO: replace with your real roles.
   ----------------------------------------------------------------------------
   Newest first. Set `current: true` on the role you're in now — it gets the
   pulsing marker and accent treatment on the timeline.
   ========================================================================= */

export const experience: ExperienceItem[] = [
  {
    role: "Senior ML Engineer",
    company: "Northwind Systems",
    companyNote: "Enterprise document intelligence · Series C",
    period: "Feb 2024 — Present",
    location: "Remote · Pune, IN",
    current: true,
    points: [
      "Lead the retrieval platform serving 12M documents to 40+ enterprise customers, owning architecture from chunking through serving topology.",
      "Cut p95 retrieval latency from 2.4s to 380ms while raising citation accuracy from 61% to 94%.",
      "Built the evaluation harness that now gates every model and prompt deploy across six product teams.",
      "Mentor three engineers; run the internal reading group on retrieval and evaluation.",
    ],
    stack: ["Python", "vLLM", "pgvector", "Ray", "Kubernetes"],
  },
  {
    role: "ML Engineer",
    company: "Halden Labs",
    companyNote: "Payments risk infrastructure",
    period: "Jun 2022 — Jan 2024",
    location: "Pune, IN",
    points: [
      "Rebuilt nightly batch fraud scoring as a streaming pipeline handling 40M events/day at ~2,800 events/second peak.",
      "Led the feature store migration that eliminated training/serving skew, the root cause of two prior incidents.",
      "Reduced false positive rate from 2.8% to 0.4% by tuning thresholds against real analyst review capacity.",
    ],
    stack: ["Flink", "Kafka", "XGBoost", "Feast", "BigQuery"],
  },
  {
    role: "Machine Learning Engineer",
    company: "Cobalt Analytics",
    companyNote: "B2B forecasting · Series A",
    period: "Aug 2020 — May 2022",
    location: "Bengaluru, IN",
    points: [
      "Shipped the demand forecasting models behind the company's flagship product, serving 200+ retail accounts.",
      "Took the training pipeline from ad-hoc notebooks to a reproducible, scheduled workflow with model versioning.",
      "Introduced the first drift monitoring in the org, catching three silent degradations in the first six months.",
    ],
    stack: ["Python", "scikit-learn", "Airflow", "Postgres", "AWS"],
  },
  {
    role: "Data Science Intern",
    company: "Meridian Retail Group",
    companyNote: "Retail analytics",
    period: "Jan 2020 — Jul 2020",
    location: "Pune, IN",
    points: [
      "Built the customer segmentation pipeline that became the basis of the retention team's targeting.",
      "Automated a weekly reporting process that had been consuming two analyst-days per week.",
    ],
    stack: ["Python", "pandas", "SQL", "Tableau"],
  },
];

/* Education block under the timeline. TODO: replace or delete. */
export const education = [
  {
    degree: "M.Tech, Computer Science",
    school: "Placeholder Institute of Technology",
    period: "2018 — 2020",
    note: "Thesis on sequence models for demand forecasting",
  },
  {
    degree: "B.E., Information Technology",
    school: "Placeholder University",
    period: "2014 — 2018",
    note: "Graduated with distinction",
  },
];
