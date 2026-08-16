/**
 * The accent system.
 *
 * Three accents carry the whole site. Every component that needs to colour
 * itself by accent reads from here — previously four files each hand-rolled
 * their own `accent === "jade" ? ... : ...` ternary, which is how they drift.
 *
 * Alpha steps are fixed on purpose. Anything outside this scale is a bug, not
 * a design decision:
 *   /10  tint      — filled chip or wash behind an icon
 *   /20  tintHover — the same fill on hover
 *   /30  edge      — resting border on an accented element
 *   /40  edgeHover — border on hover/active
 *   /60  marker    — small solid-ish marks (list bullets, pulse rings)
 */
export type Accent = "ember" | "jade" | "iris";

type AccentStyles = {
  /** Foreground colour for text and icons. */
  text: string;
  /** Solid fill, e.g. a meter segment or a timeline dot. */
  fill: string;
  /** Bordered + tinted container, e.g. the category count badge. */
  chip: string;
  /** Raw CSS custom property, for inline styles and gradients. */
  cssVar: string;
};

export const ACCENTS: Record<Accent, AccentStyles> = {
  ember: {
    text: "text-ember",
    fill: "bg-ember",
    chip: "border-ember/30 bg-ember/10 text-ember",
    cssVar: "var(--ember)",
  },
  jade: {
    text: "text-jade",
    fill: "bg-jade",
    chip: "border-jade/30 bg-jade/10 text-jade",
    cssVar: "var(--jade)",
  },
  iris: {
    text: "text-iris",
    fill: "bg-iris",
    chip: "border-iris/30 bg-iris/10 text-iris",
    cssVar: "var(--iris)",
  },
};

export const accentStyles = (accent: Accent): AccentStyles => ACCENTS[accent];
