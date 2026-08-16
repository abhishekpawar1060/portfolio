"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";

import Container from "@/components/ui/Container";
import Magnetic from "@/components/ui/Magnetic";
import SocialLinks from "@/components/ui/SocialLinks";
import Backdrop from "@/components/visuals/Backdrop";
import ParticleField from "@/components/visuals/ParticleField";
import { site, heroStats } from "@/data/site";

const ROTATE_MS = 2600;

export default function Hero() {
  const reduced = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  /* Cycles the rotating phrase in the headline. Pauses entirely under
     reduced-motion, which leaves the first phrase visible. */
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % site.roles.length),
      ROTATE_MS,
    );
    return () => clearInterval(id);
  }, [reduced]);

  const headline = "I build systems for";

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32 sm:pt-36"
    >
      <Backdrop variant="hero" />
      <ParticleField className="pointer-events-none absolute inset-0 -z-10 size-full opacity-70" />

      <Container size="wide" className="relative">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          {/* ------------------------------------------------ Left: headline */}
          <div className="lg:col-span-8">
            {/* Availability pill — TODO: edit or remove in data/site.ts */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-card/50 py-1.5 pl-2 pr-4 backdrop-blur"
            >
              <span className="relative grid size-4 place-items-center">
                <span className="absolute size-2 rounded-full bg-jade/50 animate-pulse-ring" />
                <span className="size-1.5 rounded-full bg-jade" />
              </span>
              <span className="font-mono text-[0.7rem] tracking-tight text-muted-foreground">
                {site.availability}
              </span>
            </motion.div>

            {/* Headline. Word-by-word rise — the classic reveal, but the second
                line swaps its tail phrase on a timer so the hero keeps moving
                without anything spinning or bouncing. */}
            <h1 className="mt-8 font-display text-[clamp(2.5rem,7.5vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
              <span className="sr-only">
                {headline} {site.roles.join(", ")}
              </span>

              <span aria-hidden className="block">
                {headline.split(" ").map((word, i) => (
                  <motion.span
                    key={word + i}
                    className="mr-[0.25em] inline-block"
                    initial={reduced ? undefined : { opacity: 0, y: "0.5em", filter: "blur(6px)" }}
                    animate={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.85,
                      delay: 0.15 + i * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>

              {/* Rotating phrase */}
              <span aria-hidden className="relative mt-1 block h-[1.05em] overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={site.roles[roleIndex]}
                    initial={reduced ? undefined : { y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduced ? undefined : { y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="text-gradient absolute inset-x-0 block"
                  >
                    {site.roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* Positioning statement — TODO: rewrite in data/site.ts */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {site.positioning}
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={0.22}>
                <Link
                  href="/#work"
                  className="group inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors duration-300 hover:bg-ember hover:text-primary-foreground"
                >
                  View selected work
                  <ArrowDownRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </Link>
              </Magnetic>

              <Magnetic strength={0.22}>
                <a
                  /* TODO: drop your PDF at public/resume.pdf (path in data/site.ts) */
                  href={site.resume}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card/40 px-5 py-3 text-sm font-medium backdrop-blur transition-colors duration-300 hover:border-ember/40 hover:text-ember"
                >
                  Résumé
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Magnetic>

              <SocialLinks className="ml-1" />
            </motion.div>
          </div>

          {/* ------------------------------------------------- Right: stats */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-end gap-6 lg:col-span-4 lg:items-end"
          >
            <div className="flex items-center gap-2 text-muted-foreground lg:justify-end">
              <MapPin className="size-3.5" />
              <span className="font-mono text-xs">{site.location}</span>
            </div>

            {/* Stat strip — TODO: real numbers in data/site.ts */}
            <dl className="grid w-full grid-cols-3 gap-px overflow-hidden rounded-xl border border-border/60 bg-border/60 lg:max-w-xs lg:grid-cols-1">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-1 bg-card/60 p-4 backdrop-blur transition-colors duration-300 hover:bg-card lg:flex-row lg:items-baseline lg:justify-between lg:gap-3"
                >
                  <dt className="order-2 text-[0.7rem] leading-tight text-muted-foreground lg:order-1 lg:text-xs">
                    {stat.label}
                  </dt>
                  <dd className="order-1 font-display text-xl font-semibold tabular-nums tracking-tight lg:order-2 lg:text-2xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </Container>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center sm:flex"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="label">Scroll</span>
          <span className="relative h-10 w-px overflow-hidden bg-border">
            <motion.span
              className="absolute inset-x-0 top-0 h-4 bg-ember"
              animate={reduced ? undefined : { y: ["-100%", "260%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
