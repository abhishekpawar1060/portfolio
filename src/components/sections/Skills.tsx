"use client";

import { motion, type Variants } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import { skills } from "@/data/skills";

const categoryContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const categoryItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const badgeContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04 },
  },
};

const badgeItem: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-background">
      <Container>
        <SectionTitle title="Skills" subtitle="Technologies I work with" />

        <motion.div
          className="space-y-10"
          variants={categoryContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {Object.entries(skills).map(([category, items]) => (
            <motion.div key={category} variants={categoryItem}>
              <h3 className="mb-4 text-xl font-bold capitalize">{category}</h3>

              <motion.div
                className="flex flex-wrap gap-3"
                variants={badgeContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
              >
                {items.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={badgeItem}
                    whileHover={{ scale: 1.08, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="rounded-full border-border bg-card px-4 py-2 text-muted-foreground"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}