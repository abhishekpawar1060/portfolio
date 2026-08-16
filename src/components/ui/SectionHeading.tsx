"use client";

import { motion } from "framer-motion";
import SectionMark from "@/components/ui/SectionMark";
import { cn } from "@/lib/utils";

/**
 * The section header used by every section. The mono index + rule is the
 * repeating motif that ties the page together — keep it consistent.
 */
export default function SectionHeading({
  index,
  kicker,
  title,
  description,
  align = "left",
  className,
}: {
  /** Two-digit section number, e.g. "01". */
  index: string;
  /** Short uppercase label to the right of the index. */
  kicker: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <SectionMark
        index={index}
        label={kicker}
        className={cn(align === "center" && "justify-center")}
      >
        {/* Same rule as the static SectionMark, but drawn on scroll. */}
        <motion.span
          aria-hidden
          className="hairline h-px flex-1 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </SectionMark>

      <motion.h2
        className={cn(
          "max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-4xl lg:text-5xl",
          align === "center" && "mx-auto",
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          className={cn(
            "max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "center" && "mx-auto",
          )}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
