"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { navigationLinks } from "@/constants/navigation";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-background"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-[height] duration-300 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>

        <Link href="/" className="text-xl font-bold">
          Abhishek
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navigationLinks.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="group relative text-sm font-medium text-foreground"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}