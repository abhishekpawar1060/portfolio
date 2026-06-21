"use client";

import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <motion.div
        className="mx-auto max-w-5xl px-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.h2 variants={item} className="mb-8 text-4xl font-bold">
          About Me
        </motion.h2>

        <motion.p variants={item} className="text-lg leading-8 text-muted-foreground">
          I am an AI/ML Engineer and Full Stack
          Developer with experience in building
          production-ready applications using
          React, Next.js, FastAPI, Node.js,
          PostgreSQL, MongoDB, Azure, and
          Large Language Models.
        </motion.p>
      </motion.div>
    </section>
  );
}