"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Dark/light switch.
 *
 * Deliberately stateless: rather than tracking a `mounted` flag (which forces a
 * re-render and trips the cascading-render lint rule), both icons are always in
 * the DOM and the `dark:` variant decides which one is visible. next-themes
 * sets the class on <html> in a blocking script before first paint, so the
 * correct icon is showing immediately with no flash and no hydration mismatch.
 */
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle colour theme"
      className="group relative grid size-9 place-items-center overflow-hidden rounded-lg border border-border/70 bg-card/50 text-muted-foreground backdrop-blur transition-colors duration-300 hover:border-ember/40 hover:text-ember"
    >
      <Moon className="col-start-1 row-start-1 size-[17px] rotate-0 scale-100 opacity-100 transition-all duration-300 dark:-rotate-90 dark:scale-50 dark:opacity-0" />
      <Sun className="col-start-1 row-start-1 size-[17px] rotate-90 scale-50 opacity-0 transition-all duration-300 dark:rotate-0 dark:scale-100 dark:opacity-100" />
    </button>
  );
}
