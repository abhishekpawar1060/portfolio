import { cn } from "@/lib/utils";

/**
 * The mono index + kicker + rule motif that opens every section and every
 * case-study block. Shared so the two don't drift — the case study previously
 * carried its own copy of this markup.
 *
 * `SectionHeading` composes this and adds the display title; use SectionMark
 * directly where you only need the marker (case study sub-sections).
 */
export default function SectionMark({
  index,
  label,
  className,
  children,
}: {
  /** Two-digit number, or a dash for index pages. */
  index: string;
  label: string;
  className?: string;
  /** Optional slot for the rule, so SectionHeading can animate it. */
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="font-mono text-xs tabular-nums text-ember">{index}</span>
      <span className="label text-foreground/70">{label}</span>
      {children ?? <span aria-hidden className="hairline h-px flex-1" />}
    </div>
  );
}
