"use client";

import { useRef, useCallback } from "react";
import { ACCENTS, type Accent } from "@/lib/accents";
import { cn } from "@/lib/utils";

/**
 * Card surface with a cursor-tracking spotlight and an accent border glow.
 *
 * The highlight is driven by two CSS custom properties written on pointermove,
 * so the effect costs no React re-renders — the browser just repaints a
 * radial-gradient layer. Falls back to a plain card on touch devices, where
 * there is no cursor to track.
 */
export default function SpotlightCard({
  children,
  className,
  accent = "ember",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  accent?: Accent;
  as?: "div" | "article" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  const handleLeave = useCallback(() => {
    ref.current?.style.setProperty("--spot-opacity", "0");
  }, []);

  const handleEnter = useCallback(() => {
    ref.current?.style.setProperty("--spot-opacity", "1");
  }, []);

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      style={
        {
          "--accent": ACCENTS[accent].cssVar,
          "--spot-opacity": "0",
        } as React.CSSProperties
      }
      className={cn(
        "group/spot relative isolate overflow-hidden rounded-2xl border border-border/70",
        "bg-card/80 card-raise backdrop-blur-sm transition-[border-color,box-shadow] duration-500",
        "hover:border-[color-mix(in_oklch,var(--accent)_45%,transparent)] hover:shadow-warm",
        className,
      )}
    >
      {/* Cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300"
        style={{
          opacity: "var(--spot-opacity)",
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklch, var(--accent) 14%, transparent), transparent 70%)",
        }}
      />
      {/* Top edge accent line, revealed on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            "linear-gradient(to right, transparent, color-mix(in oklch, var(--accent) 70%, transparent), transparent)",
        }}
      />
      {children}
    </Component>
  );
}
