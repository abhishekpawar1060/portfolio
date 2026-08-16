import Link from "next/link";
import { ArrowUp } from "lucide-react";

import Container from "@/components/ui/Container";
import { navLinks } from "@/data/navigation";
import { site } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/60 py-12">
      <Container size="wide">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-sm font-semibold tracking-tight">{site.name}</p>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">{site.tagline}</p>
            <p className="mt-4 font-mono text-[0.7rem] text-muted-foreground/70">
              © {year} · Built with Next.js and too many revisions
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-ember"
                  >
                    <span className="font-mono text-[0.65rem] opacity-50">{link.index}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="#top"
            className="group inline-flex h-fit items-center gap-2 rounded-lg border border-border/70 bg-card/40 px-4 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:border-ember/40 hover:text-ember"
          >
            Back to top
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
