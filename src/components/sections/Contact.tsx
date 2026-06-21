"use client";

import { motion, type Variants } from "framer-motion";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fieldClasses =
  "w-full rounded-lg border-border p-4 bg-input text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-background">
      <Container>
        <SectionTitle title="Contact" subtitle="Let's work together" />

        <motion.form
          className="max-w-2xl space-y-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.input
            variants={item}
            type="text"
            placeholder="Name"
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={fieldClasses}
          />

          <motion.input
            variants={item}
            type="email"
            placeholder="Email"
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={fieldClasses}
          />

          <motion.textarea
            variants={item}
            rows={6}
            placeholder="Message"
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={fieldClasses}
          />

          <motion.button
            type="submit"
            variants={item}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="rounded-lg bg-primary px-6 py-3 text-primary-foreground"
          >
            Send Message
          </motion.button>
        </motion.form>
      </Container>
    </section>
  );
}