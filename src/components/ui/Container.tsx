import { cn } from "@/lib/utils";

/** Consistent page gutter. Every section uses this so the vertical rhythm and
 *  left edge line up across the whole site. */
export default function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  /** `wide` for full-bleed grids, `narrow` for reading columns. */
  size?: "narrow" | "default" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-6xl",
        size === "wide" && "max-w-7xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
