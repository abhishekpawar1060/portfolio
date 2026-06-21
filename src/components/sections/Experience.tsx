"use client";

import { motion, type Variants } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import { experiences } from "@/data/experience";

// Parent: staggers each card as the section scrolls into view
const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-background">
      <Container>
        <SectionTitle title="Experience" subtitle="My professional journey." />

        <motion.div
          className="space-y-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {experiences.map((experience) => (
            <motion.div
              key={experience.id}
              variants={item}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="rounded-xl border p-8 shadow-sm"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">{experience.role}</h3>
                  <p className="text-muted-foreground">{experience.company}</p>
                </div>

                <span className="text-sm text-muted-foreground">
                  {experience.duration}
                </span>
              </div>

              <ul className="mt-6 space-y-3">
                {experience.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span>•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}