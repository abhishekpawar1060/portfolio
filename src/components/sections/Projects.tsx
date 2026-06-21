"use client";

import { motion, type Variants } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ProjectCard from "../ui/ProjectCard";
import { projects } from "@/data/projects";

const grid: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-background">
      <Container>
        <SectionTitle title="Projects" subtitle="Some projects I've worked on." />

        <motion.div
          className="grid gap-8 md:grid-cols-2"
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={card}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}