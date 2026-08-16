import { cn } from "@/lib/utils";

/**
 * The layered page atmosphere: a slow-moving gradient mesh, an engineering
 * grid faded at the edges, and a film-grain pass over the top.
 *
 * Server component — it's pure CSS, so none of this ships JavaScript. Render
 * it once per section that needs the treatment, positioned absolutely.
 */
export default function Backdrop({
  className,
  variant = "hero",
}: {
  className?: string;
  /** `hero` is the full three-blob mesh; `subtle` is a single quiet wash. */
  variant?: "hero" | "subtle";
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      {/* --- Gradient mesh ------------------------------------------------ */}
      <div className="absolute inset-0" style={{ opacity: "var(--mesh-opacity)" }}>
        <div
          className="absolute -left-[15%] -top-[25%] size-[70vw] max-h-[900px] max-w-[900px] rounded-full blur-[120px] animate-aurora"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, color-mix(in oklch, var(--ember) 30%, transparent), transparent 68%)",
          }}
        />
        {variant === "hero" && (
          <>
            <div
              className="absolute -right-[10%] top-[5%] size-[55vw] max-h-[760px] max-w-[760px] rounded-full blur-[130px] animate-drift"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, color-mix(in oklch, var(--iris) 24%, transparent), transparent 70%)",
                animationDelay: "-6s",
              }}
            />
            <div
              className="absolute bottom-[-20%] left-[25%] size-[50vw] max-h-[680px] max-w-[680px] rounded-full blur-[140px] animate-aurora"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, color-mix(in oklch, var(--jade) 18%, transparent), transparent 70%)",
                animationDelay: "-12s",
              }}
            />
          </>
        )}
      </div>

      {/* --- Engineering grid --------------------------------------------- */}
      <div className="grid-field absolute inset-0" />

      {/* --- Film grain ---------------------------------------------------- */}
      <div className="grain absolute inset-0 mix-blend-overlay" />

      {/* --- Bottom fade into the next section ----------------------------- */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
