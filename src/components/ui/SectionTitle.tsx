"use client";

import { motion, type Variants } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <motion.div
      className="mb-12"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
    >
      <motion.h2 variants={item} className="text-4xl font-bold">
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p variants={item} className="mt-3 text-muted-foreground">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}