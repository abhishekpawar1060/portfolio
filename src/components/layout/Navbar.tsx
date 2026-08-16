"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { Menu, X } from "lucide-react";

import { navLinks } from "@/data/navigation";
import { site } from "@/data/site";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Tracked only while on the homepage; derived below so leaving the page
  // clears the highlight without a state write.
  const [spied, setSpied] = useState<string>("");
  const active = isHome ? spied : "";

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  /* Scroll-spy. Watches the middle band of the viewport so a section counts as
     "active" when it's actually being read, not when its top edge grazes the
     bottom of the screen. Only meaningful on the homepage. */
  useEffect(() => {
    if (!isHome) return;

    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setSpied(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  /* Lock body scroll while the mobile menu is open. */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* Close the menu on Escape. */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <nav
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 transition-all duration-500 sm:px-8 lg:px-12",
            scrolled ? "h-14" : "h-20",
          )}
        >
          {/* --- Mark ---------------------------------------------------- */}
          <Link href="/" className="group flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <span className="relative grid size-8 shrink-0 place-items-center rounded-md border border-ember/30 bg-ember/10 font-mono text-[0.7rem] font-semibold text-ember">
              {/* TODO: replace with your initials (or swap for a logo/SVG) */}
              {site.shortName}
              <span className="absolute inset-0 rounded-md border border-ember/40 opacity-0 animate-pulse-ring group-hover:opacity-100" />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-sm font-semibold tracking-tight">{site.name}</span>
              <span className="mt-1 font-mono text-[0.65rem] text-muted-foreground">{site.role}</span>
            </span>
          </Link>

          {/* --- Desktop links ------------------------------------------- */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative block rounded-md px-3 py-2 text-sm transition-colors duration-300",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-md border border-ember/30 bg-ember/10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* --- Actions -------------------------------------------------- */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Link
              href="/#contact"
              className="hidden rounded-lg border border-ember/30 bg-ember/10 px-4 py-2 text-sm font-medium text-ember transition-colors duration-300 hover:border-ember/40 hover:bg-ember/20 sm:block"
            >
              Get in touch
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="grid size-9 place-items-center rounded-lg border border-border/70 bg-card/50 text-muted-foreground backdrop-blur transition-colors hover:text-foreground md:hidden"
            >
              {menuOpen ? <X className="size-[17px]" /> : <Menu className="size-[17px]" />}
            </button>
          </div>
        </nav>

        {/* --- Reading progress ------------------------------------------- */}
        <motion.div
          aria-hidden
          className="h-px origin-left bg-gradient-to-r from-ember via-ember-soft to-transparent"
          style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
        />
      </motion.header>

      {/* --- Mobile menu ------------------------------------------------- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col justify-center px-8">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-baseline gap-4 border-b border-border/60 py-4 transition-colors hover:text-ember"
                    >
                      <span className="font-mono text-xs text-ember">{link.index}</span>
                      <span className="font-display text-3xl font-medium tracking-tight">
                        {link.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.a
                href={`mailto:${site.email}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-10 font-mono text-sm text-muted-foreground"
              >
                {site.email}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
