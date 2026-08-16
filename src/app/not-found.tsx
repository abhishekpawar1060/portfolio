import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import Container from "@/components/ui/Container";
import Backdrop from "@/components/visuals/Backdrop";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70svh] items-center overflow-hidden py-32">
      <Backdrop variant="subtle" />
      <Container size="wide">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember">Error 404</p>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,8vw,5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
          Nothing indexed here.
        </h1>
        <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
          The retrieval came back empty. Either the page moved or the link was
          never grounded in the first place.
        </p>
        <Link
          href="/"
          className="group mt-8 inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card/50 px-5 py-3 text-sm font-medium backdrop-blur transition-colors duration-300 hover:border-ember/40 hover:text-ember"
        >
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back home
        </Link>
      </Container>
    </section>
  );
}
