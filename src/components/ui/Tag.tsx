import { cn } from "@/lib/utils";

/** Mono chip used for tech stack items, categories and metadata. */
export default function Tag({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "default";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border font-mono tracking-tight transition-colors duration-300",
        size === "sm" ? "px-2 py-0.5 text-[0.65rem]" : "px-2.5 py-1 text-xs",
        "border-border/70 bg-muted/40 text-muted-foreground transition-colors hover:border-border hover:text-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
