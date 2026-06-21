"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-lg border-border bg-background p-2 text-foreground"
      aria-label="Toggle theme"
    >
      {mounted ? (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />) : null}
    </button>
  );
}