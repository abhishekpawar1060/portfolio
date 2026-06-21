"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <motion.article
        whileHover={{ y: -6, boxShadow: "0 12px 24px -8px rgba(0,0,0,0.15)" }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="h-full rounded-2xl border bg-card p-6"
      >
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">{project.title}</h3>

          <p className="text-muted-foreground">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-muted px-3 py-1 text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}