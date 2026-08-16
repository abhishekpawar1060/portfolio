import type { Project } from "@/types";

/* ============================================================================
   PROJECTS / CASE STUDIES
   ----------------------------------------------------------------------------
   TODO: EVERYTHING IN THIS FILE IS PLACEHOLDER. Replace with real projects.

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
  /* ------------------------------------------------------------------ 01 */
  {
    slug: "atlas-retrieval",
    title: "Atlas",
    tagline: "Grounded retrieval over 12M enterprise documents",
    summary:
      "A hybrid retrieval layer that replaced a naive vector search which was confidently citing the wrong contract clauses. Rebuilt around structured chunking, reciprocal-rank fusion and a citation-verification pass.",
    period: "2024 — 2025",
    category: "Retrieval",
    featured: true,
    accent: "ember",

    highlights: [
      { value: "94%", label: "Citation accuracy", detail: "from 61%", trend: "up" },
      { value: "380ms", label: "p95 retrieval", detail: "from 2.4s", trend: "down" },
      { value: "12M", label: "Documents indexed" },
    ],

    tags: ["Python", "pgvector", "vLLM", "Ray", "Kubernetes"],

    stack: [
      { group: "Modeling", items: ["Llama 3.1 70B", "bge-m3", "Cross-encoder reranker"] },
      { group: "Serving", items: ["vLLM", "Ray Serve", "FastAPI", "Triton"] },
      { group: "Data", items: ["Postgres + pgvector", "Elasticsearch", "Airflow", "dbt"] },
      { group: "Platform", items: ["Kubernetes", "Terraform", "Prometheus", "Grafana"] },
    ],

    problem: {
      context:
        "The legal and compliance teams were spending roughly nine hours a week manually locating clauses across a 12M-document corpus. The existing assistant used single-vector similarity search over fixed 512-token chunks, which shredded tables and cross-references. It answered fluently and cited the wrong document often enough that the team stopped trusting it entirely.",
      constraints: [
        "Answers had to be traceable to an exact page and clause — 'roughly right' was worse than no answer",
        "Corpus grew ~40k documents/day, so full reindexing was off the table",
        "Hard p95 budget of 500ms for retrieval, inside a 3s end-to-end SLA",
        "Documents were tenant-scoped: no leakage across customer boundaries, ever",
      ],
    },

    approach: {
      summary:
        "I replaced fixed-window chunking with a layout-aware splitter that keeps tables and clause hierarchies intact, then ran lexical and dense retrieval in parallel and fused them with reciprocal rank fusion before a cross-encoder rerank. A final verification pass re-reads each generated citation against its source span and drops any claim it cannot ground.",
      diagram: {
        // TODO: drop your real architecture diagram in /public and set the path
        // here, e.g. image: "/diagrams/atlas-architecture.png".
        // While `image` is undefined, the `stages` below render as a diagram.
        image: undefined,
        caption: "Atlas retrieval pipeline — ingestion through grounded generation.",
        stages: [
          {
            name: "Ingest",
            nodes: [
              { title: "Layout parser", detail: "Preserves tables, headers and clause trees", tech: "Unstructured + custom" },
              { title: "Semantic chunker", detail: "Splits on structure, not token count", tech: "Python" },
            ],
          },
          {
            name: "Index",
            nodes: [
              { title: "Dense index", detail: "Tenant-partitioned embeddings", tech: "pgvector / HNSW" },
              { title: "Lexical index", detail: "BM25 for exact clause and ID matches", tech: "Elasticsearch" },
            ],
          },
          {
            name: "Retrieve",
            nodes: [
              { title: "Hybrid fusion", detail: "Reciprocal rank fusion over both indexes", tech: "RRF k=60" },
              { title: "Reranker", detail: "Cross-encoder over the top 100", tech: "bge-reranker" },
            ],
          },
          {
            name: "Generate",
            nodes: [
              { title: "Grounded synthesis", detail: "Answer constrained to retrieved spans", tech: "Llama 3.1 70B / vLLM" },
              { title: "Citation verifier", detail: "Drops any claim it cannot ground", tech: "NLI entailment" },
            ],
          },
        ],
      },
      decisions: [
        {
          title: "Hybrid over pure-dense retrieval",
          detail:
            "Dense-only search kept missing exact identifiers — clause numbers, statute references, party names. BM25 catches those trivially. Fusing both lifted recall@20 by 22 points before any reranking.",
        },
        {
          title: "Verification instead of a bigger model",
          detail:
            "Upgrading the generator improved fluency but not groundedness. A cheap entailment check over each citation cut hallucinated references by roughly 80% at ~40ms of added latency.",
        },
        {
          title: "Tenant partitioning at the index level",
          detail:
            "Filtering after retrieval meant paying for work we would throw away and left a leakage path open. Partitioning the index by tenant made isolation structural rather than a runtime check.",
        },
      ],
    },

    role: {
      title: "Lead ML Engineer",
      team: "4 engineers, 1 PM, 2 domain experts",
      contributions: [
        "Owned retrieval architecture end to end, from chunking strategy through the serving topology",
        "Built the offline evaluation harness — 1,200 expert-labeled queries that gated every deploy",
        "Implemented the RRF fusion and reranking stage, cutting p95 from 2.4s to 380ms",
        "Ran the migration off the legacy index with zero downtime via dual-write and shadow reads",
      ],
    },

    outcomes: [
      { value: "94%", label: "Citation accuracy", detail: "up from 61% at baseline", trend: "up" },
      { value: "380ms", label: "p95 retrieval latency", detail: "down from 2.4s", trend: "down" },
      { value: "9 → 1.5", label: "Hours/week per analyst", detail: "on clause lookup", trend: "down" },
      { value: "$310k", label: "Projected annual saving", detail: "across 40 analysts", trend: "up" },
    ],

    reflection:
      "I would build the evaluation set before writing any retrieval code next time. We spent the first six weeks tuning against intuition, and every one of those decisions got revisited once we could actually measure groundedness.",

    links: { repo: "#", live: "#" },
  },

  /* ------------------------------------------------------------------ 02 */
  {
    slug: "corvus-agents",
    title: "Corvus",
    tagline: "Multi-agent workflows that fail loudly, not silently",
    summary:
      "An orchestration runtime for long-running agent workflows, built after a fleet of autonomous agents burned through a month of API budget in four days without producing a single completed task.",
    period: "2023 — 2024",
    category: "Agents",
    featured: true,
    accent: "iris",

    highlights: [
      { value: "3.1%", label: "Silent failure rate", detail: "from 38%", trend: "down" },
      { value: "71%", label: "Task completion", detail: "from 44%", trend: "up" },
      { value: "$0.11", label: "Median cost/task", detail: "from $0.94", trend: "down" },
    ],

    tags: ["TypeScript", "Temporal", "Redis", "OpenTelemetry", "Postgres"],

    stack: [
      { group: "Runtime", items: ["Temporal", "Node.js", "TypeScript", "Zod"] },
      { group: "Models", items: ["GPT-class APIs", "Claude", "Local 8B fallback"] },
      { group: "State", items: ["Postgres", "Redis Streams", "S3"] },
      { group: "Observability", items: ["OpenTelemetry", "Langfuse", "Grafana"] },
    ],

    problem: {
      context:
        "The first version chained agents with free-form prompts and hoped for the best. When a step failed it retried the whole workflow, and because failures were phrased as plausible prose rather than exceptions, nobody noticed until the invoice arrived. Roughly 38% of runs terminated in a state that looked successful but had produced nothing usable.",
      constraints: [
        "Workflows ran for hours — an in-memory loop could not survive a deploy",
        "Every step needed a hard cost ceiling and a kill switch",
        "Non-determinism made bug reports nearly impossible to reproduce",
        "Tool calls hit real, side-effecting systems: no blind retries",
      ],
    },

    approach: {
      summary:
        "I moved orchestration onto a durable execution engine so workflow state lived outside the process, and made every agent step declare a typed output contract validated before the result could propagate. Steps that fail validation raise instead of continuing, and the whole run is replayable from its event log.",
      diagram: {
        // TODO: replace with a real diagram image when you have one.
        image: undefined,
        caption: "Corvus execution model — durable workflow state with typed step contracts.",
        stages: [
          {
            name: "Plan",
            nodes: [
              { title: "Task decomposer", detail: "Splits the goal into a typed DAG", tech: "Structured output" },
              { title: "Budget allocator", detail: "Per-step token and cost ceilings", tech: "TypeScript" },
            ],
          },
          {
            name: "Execute",
            nodes: [
              { title: "Durable workflow", detail: "State survives crashes and deploys", tech: "Temporal" },
              { title: "Tool sandbox", detail: "Side effects gated and idempotent", tech: "Zod + allowlist" },
            ],
          },
          {
            name: "Verify",
            nodes: [
              { title: "Contract check", detail: "Schema validation on every step output", tech: "Zod" },
              { title: "Critic pass", detail: "Second model reviews before commit", tech: "LLM judge" },
            ],
          },
          {
            name: "Observe",
            nodes: [
              { title: "Trace store", detail: "Every prompt, token and tool call recorded", tech: "OpenTelemetry" },
              { title: "Replay", detail: "Deterministic re-run from the event log", tech: "Event sourcing" },
            ],
          },
        ],
      },
      decisions: [
        {
          title: "Durable execution over an in-process loop",
          detail:
            "Multi-hour workflows and rolling deploys are fundamentally incompatible with in-memory state. Moving to durable execution made a deploy mid-run a non-event rather than a lost task.",
        },
        {
          title: "Typed contracts at every boundary",
          detail:
            "The single highest-leverage change. Free-form text between agents meant errors propagated as confident prose. A schema that fails validation turns a silent failure into a stack trace.",
        },
        {
          title: "Per-step budgets, not a global cap",
          detail:
            "A global ceiling gets consumed by whichever step loops first. Per-step budgets localize the blast radius and made runaway loops visible in minutes instead of days.",
        },
      ],
    },

    role: {
      title: "Senior Engineer — Agent Infrastructure",
      team: "3 engineers",
      contributions: [
        "Designed the execution model and the typed step-contract system",
        "Built the tracing layer that made non-deterministic runs reproducible",
        "Introduced per-step budget enforcement, cutting median task cost by 88%",
        "Wrote the replay tooling the whole team now uses to debug production runs",
      ],
    },

    outcomes: [
      { value: "38% → 3.1%", label: "Silent failure rate", trend: "down" },
      { value: "71%", label: "Task completion rate", detail: "up from 44%", trend: "up" },
      { value: "$0.94 → $0.11", label: "Median cost per task", trend: "down" },
      { value: "< 5 min", label: "Time to reproduce a failure", detail: "previously often impossible", trend: "down" },
    ],

    reflection:
      "The lesson that generalized: agent reliability is an observability problem long before it is a prompting problem. We tried three rounds of prompt engineering before admitting we simply could not see what was happening.",

    links: { repo: "#" },
  },

  /* ------------------------------------------------------------------ 03 */
  {
    slug: "sift-anomaly",
    title: "Sift",
    tagline: "Streaming anomaly detection at 40M events/day",
    summary:
      "A real-time detection pipeline for payment fraud, rebuilt from a nightly batch job that flagged fraud an average of eleven hours after the money had already left.",
    period: "2022 — 2023",
    category: "ML Systems",
    featured: true,
    accent: "jade",

    highlights: [
      { value: "240ms", label: "Detection latency", detail: "from 11 hours", trend: "down" },
      { value: "0.4%", label: "False positive rate", detail: "from 2.8%", trend: "down" },
      { value: "40M", label: "Events/day" },
    ],

    tags: ["Python", "Flink", "Kafka", "Feast", "XGBoost"],

    stack: [
      { group: "Streaming", items: ["Apache Kafka", "Apache Flink", "Protobuf"] },
      { group: "Modeling", items: ["XGBoost", "Isolation Forest", "PyTorch", "ONNX"] },
      { group: "Features", items: ["Feast", "Redis", "BigQuery"] },
      { group: "Ops", items: ["Kubernetes", "Argo", "Evidently", "PagerDuty"] },
    ],

    problem: {
      context:
        "Fraud scoring ran as a nightly Spark job. By the time a transaction was flagged the funds had typically settled, so detection was really just reconciliation. Worse, the training pipeline computed features differently from the scoring path, so the model in production behaved measurably differently from the one that was validated.",
      constraints: [
        "Sub-second scoring at peak throughput of ~2,800 events/second",
        "Training/serving feature parity was non-negotiable — the skew was already causing incidents",
        "Analysts could absorb at most ~400 alerts/day, so precision mattered more than recall",
        "Regulatory requirement: every decision explainable and retained for seven years",
      ],
    },

    approach: {
      summary:
        "I moved scoring into the event stream with a shared feature store serving both training and inference from the same definitions, which eliminated skew by construction. A fast gradient-boosted model handles the common path, and an unsupervised detector catches novel patterns the labeled data has never seen.",
      diagram: {
        // TODO: swap in a real diagram image here.
        image: undefined,
        caption: "Sift streaming topology — single feature definition, two consumers.",
        stages: [
          {
            name: "Stream",
            nodes: [
              { title: "Event bus", detail: "Partitioned by account for ordering", tech: "Kafka" },
              { title: "Windowed aggregates", detail: "Rolling velocity and spend windows", tech: "Flink" },
            ],
          },
          {
            name: "Features",
            nodes: [
              { title: "Feature store", detail: "One definition, online + offline", tech: "Feast" },
              { title: "Online cache", detail: "Sub-ms lookups at scoring time", tech: "Redis" },
            ],
          },
          {
            name: "Score",
            nodes: [
              { title: "Supervised model", detail: "Handles known fraud patterns", tech: "XGBoost / ONNX" },
              { title: "Novelty detector", detail: "Catches unlabeled attack shapes", tech: "Isolation Forest" },
            ],
          },
          {
            name: "Act",
            nodes: [
              { title: "Decision service", detail: "Threshold, hold, or escalate", tech: "gRPC" },
              { title: "Audit log", detail: "Feature values retained per decision", tech: "BigQuery" },
            ],
          },
        ],
      },
      decisions: [
        {
          title: "One feature definition, two serving paths",
          detail:
            "Training/serving skew was the root cause of the previous system's drift. A feature store where offline and online reads share a definition removed an entire category of silent bug.",
        },
        {
          title: "Gradient boosting over a deep model",
          detail:
            "A neural ranker scored ~1.5 points better offline and could not meet the latency budget or the explainability requirement. Boosted trees with SHAP attributions satisfied both, and the gap closed once features improved.",
        },
        {
          title: "Two detectors instead of one",
          detail:
            "The supervised model could only find fraud that resembled its labels. Pairing it with an unsupervised detector surfaced three novel attack patterns in the first quarter that the labeled set had no examples of.",
        },
      ],
    },

    role: {
      title: "ML Engineer",
      team: "5 engineers, 2 data scientists, 1 fraud analyst",
      contributions: [
        "Built the Flink topology handling ~2,800 events/second at peak",
        "Led the feature store migration that eliminated training/serving skew",
        "Tuned the decision thresholds with the analyst team to fit their real review capacity",
        "Set up drift monitoring that now catches feature degradation before it reaches scoring",
      ],
    },

    outcomes: [
      { value: "11h → 240ms", label: "Time to detection", trend: "down" },
      { value: "0.4%", label: "False positive rate", detail: "down from 2.8%", trend: "down" },
      { value: "+31%", label: "Fraud caught pre-settlement", trend: "up" },
      { value: "3", label: "Novel attack patterns surfaced", detail: "in the first quarter", trend: "up" },
    ],

    reflection:
      "Talking to the analysts in week one rather than week ten would have saved a month. We optimized for recall until someone pointed out that an alert nobody has time to review is not a detection.",

    links: { repo: "#", paper: "#" },
  },

  /* ------------------------------------------------------------------ 04 */
  {
    slug: "forge-eval",
    title: "Forge",
    tagline: "The evaluation harness that gates every model deploy",
    summary:
      "An internal evaluation platform that turned 'the new prompt feels better' into a number with a confidence interval. Now blocks any model or prompt change that regresses a tracked capability.",
    period: "2025",
    category: "Platform",
    featured: true,
    accent: "ember",

    highlights: [
      { value: "8 min", label: "Full eval suite", detail: "from 2 days manual", trend: "down" },
      { value: "17", label: "Regressions caught", detail: "pre-deploy" },
      { value: "6", label: "Teams onboarded" },
    ],

    tags: ["Python", "Next.js", "DuckDB", "Modal", "Pydantic"],

    stack: [
      { group: "Harness", items: ["Python", "Pydantic", "pytest", "Modal"] },
      { group: "Scoring", items: ["LLM-as-judge", "Rubric grading", "Exact match", "BERTScore"] },
      { group: "Storage", items: ["DuckDB", "Parquet", "S3"] },
      { group: "Interface", items: ["Next.js", "Tailwind", "Recharts", "GitHub Actions"] },
    ],

    problem: {
      context:
        "Six teams were each shipping prompt and model changes on vibes. There was no shared definition of 'better', no regression net, and no way to answer whether last month's change had helped. Two production incidents traced back to prompt edits that improved one use case while quietly breaking another.",
      constraints: [
        "Had to run inside CI, so a full suite needed to finish in under ten minutes",
        "Judge models are themselves unreliable — scoring needed calibration against human labels",
        "Datasets contained customer data and could never leave the VPC",
        "Adoption was voluntary: if it was awkward to use, nobody would use it",
      ],
    },

    approach: {
      summary:
        "Evaluations are defined as versioned dataset-plus-rubric pairs in code, run in parallel on serverless GPU workers, and scored by a mix of deterministic checks and calibrated LLM judges. Results land in a columnar store and surface as a diff against the current baseline directly in the pull request.",
      diagram: {
        // TODO: replace with your real diagram.
        image: undefined,
        caption: "Forge evaluation flow — from committed dataset to pull-request verdict.",
        stages: [
          {
            name: "Define",
            nodes: [
              { title: "Dataset registry", detail: "Versioned, reviewed like code", tech: "Git + Parquet" },
              { title: "Rubric spec", detail: "Typed criteria per capability", tech: "Pydantic" },
            ],
          },
          {
            name: "Run",
            nodes: [
              { title: "Fan-out executor", detail: "Hundreds of cases in parallel", tech: "Modal" },
              { title: "Response cache", detail: "Skips unchanged model/prompt pairs", tech: "Content hash" },
            ],
          },
          {
            name: "Score",
            nodes: [
              { title: "Deterministic checks", detail: "Schema, exact match, constraints", tech: "Python" },
              { title: "Calibrated judge", detail: "Agreement tracked against human labels", tech: "LLM-as-judge" },
            ],
          },
          {
            name: "Report",
            nodes: [
              { title: "Baseline diff", detail: "Significance-tested deltas", tech: "DuckDB" },
              { title: "PR gate", detail: "Blocks merges on regression", tech: "GitHub Actions" },
            ],
          },
        ],
      },
      decisions: [
        {
          title: "Evals live in the repo, not a dashboard",
          detail:
            "Datasets and rubrics get reviewed, versioned and diffed like any other code. A UI-managed eval set drifts silently and nobody can tell you why last month's numbers moved.",
        },
        {
          title: "Calibrate the judge before trusting it",
          detail:
            "Every judge rubric is validated against a human-labeled slice, and we track agreement over time. An uncalibrated judge produces numbers that feel rigorous and mean nothing.",
        },
        {
          title: "Report deltas with confidence intervals",
          detail:
            "Small eval sets produce noisy point estimates that teams over-read. Showing the interval stopped people from chasing a 1.5-point swing that was pure sampling noise.",
        },
      ],
    },

    role: {
      title: "Founding Engineer — ML Platform",
      team: "2 engineers, part-time",
      contributions: [
        "Designed the eval specification format and the calibration methodology",
        "Built the parallel executor and caching layer that got a full suite under 8 minutes",
        "Drove adoption across 6 teams, largely by making the PR integration one line of YAML",
        "Wrote the internal guide on writing evals that actually discriminate between models",
      ],
    },

    outcomes: [
      { value: "2 days → 8 min", label: "Full suite runtime", trend: "down" },
      { value: "17", label: "Regressions blocked pre-deploy", trend: "up" },
      { value: "6 / 6", label: "Teams onboarded", detail: "voluntary adoption", trend: "up" },
      { value: "0", label: "Prompt-related incidents", detail: "since the gate shipped", trend: "down" },
    ],

    reflection:
      "The technical work was straightforward; the hard part was social. Adoption only moved once the tool made someone's pull request faster instead of adding a step to it.",

    links: { repo: "#", live: "#" },
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
