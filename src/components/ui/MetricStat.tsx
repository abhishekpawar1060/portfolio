import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { Metric } from "@/types";
import { cn } from "@/lib/utils";

/**
 * A single headline number. Used on project cards, case study results and the
 * hero stat strip. `trend` colours the value jade — for a latency metric a
 * "down" trend is the win, which is why the direction and the colour are
 * decoupled here.
 */
export default function MetricStat({
  metric,
  size = "default",
  className,
}: {
  metric: Metric;
  size?: "sm" | "default" | "lg";
  className?: string;
}) {
  const Icon = metric.trend === "down" ? ArrowDownRight : ArrowUpRight;
  const isWin = metric.trend === "up" || metric.trend === "down";

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-baseline gap-1.5">
        <span
          className={cn(
            "font-display font-semibold tracking-[-0.03em] tabular-nums",
            isWin ? "text-jade" : "text-foreground",
            size === "sm" && "text-xl",
            size === "default" && "text-2xl sm:text-3xl",
            size === "lg" && "text-3xl sm:text-4xl lg:text-5xl",
          )}
        >
          {metric.value}
        </span>
        {isWin && (
          <Icon
            aria-hidden
            className={cn(
              "text-jade/70",
              size === "sm" ? "size-3.5" : "size-4",
            )}
          />
        )}
      </div>

      <span
        className={cn(
          "font-medium leading-snug text-foreground/80",
          size === "sm" ? "text-xs" : "text-sm",
        )}
      >
        {metric.label}
      </span>

      {metric.detail && (
        <span className="font-mono text-[0.7rem] leading-snug text-muted-foreground">
          {metric.detail}
        </span>
      )}
    </div>
  );
}
