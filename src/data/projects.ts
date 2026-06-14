import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: 1,
    slug: "text-to-sql",

    title: "Clinical Text To SQL",

    description:
      "Convert natural language into SQL queries.",

    featured: true,

    techStack: [
      "FastAPI",
      "PostgreSQL",
      "SQLCoder",
      "Azure",
    ],

    githubUrl: "#",

    overview:
      "AI-powered platform that converts natural language into SQL queries.",

    problem:
      "Users cannot write complex SQL queries.",

    solution:
      "Used SQLCoder and LLMs to generate SQL from user prompts.",

    architecture: [
      "React",
      "FastAPI",
      "SQLCoder",
      "PostgreSQL",
      "Azure",
    ],
  },

  {
    id: 2,
    slug: "rag-system",

    title: "RAG Question Answering System",

    description:
      "Question answering over documents.",

    featured: true,

    techStack: [
      "FastAPI",
      "Weaviate",
      "OpenAI",
    ],

    githubUrl: "#",

    overview:
      "Document search and Q&A system.",

    problem:
      "Finding answers from large document collections.",

    solution:
      "Implemented RAG pipeline using vector search.",

    architecture: [
      "Frontend",
      "FastAPI",
      "Weaviate",
      "OpenAI",
    ],
  },
];