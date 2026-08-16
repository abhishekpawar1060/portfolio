"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET = 28;

function offsetFor(direction: Direction) {
  switch (direction) {
    case "up":
      return { y: OFFSET };
    case "down":
      return { y: -OFFSET };
    case "left":
      return { x: OFFSET };
    case "right":
      return { x: -OFFSET };
    default:
      return {};
  }
}

/**
 * Scroll-triggered entrance. Wrap anything that should animate in.
 *
 * Two modes:
 *  - default: animates itself
 *  - `stagger`: animates its direct children in sequence (children must be
 *    <Reveal.Item> or any motion element using the "item" variant)
 *
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">
 * in ThemeProvider — never branch on useReducedMotion() here to change what
 * gets rendered, or the SSR'd `opacity: 0` sticks and the content disappears.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.65,
  direction = "up",
  stagger,
  amount = 0.25,
  once = true,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  /** Seconds between children. Omit for a single element. */
  stagger?: number;
  amount?: number;
  once?: boolean;
  as?: "div" | "section" | "ul" | "li" | "article" | "header" | "span";
}) {
  const MotionTag = motion[Tag] as typeof motion.div;

  const variants: Variants = stagger
    ? {
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }
    : {
        hidden: { opacity: 0, ...offsetFor(direction) },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </MotionTag>
  );
}

/** Child of a `<Reveal stagger={...}>`. */
export function RevealItem({
  children,
  className,
  direction = "up",
  duration = 0.6,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  duration?: number;
  as?: "div" | "li" | "article" | "span" | "p";
}) {
  const MotionTag = motion[Tag] as typeof motion.div;

  return (
    <MotionTag
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, ...offsetFor(direction) },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
