"use client";

import { useState } from "react";
import { Check, Copy, MapPin } from "lucide-react";

import Container from "@/components/ui/Container";
import Magnetic from "@/components/ui/Magnetic";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SocialLinks from "@/components/ui/SocialLinks";
import Backdrop from "@/components/visuals/Backdrop";
import { site } from "@/data/site";

/**
 * Contact. No form — a form on a personal site is a spam funnel with extra
 * steps. A large mailto and a copy button convert better and need no backend.
 *
 * TODO: email, location and socials all live in src/data/site.ts.
 */
export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked by permissions policy — the mailto link
      // beside this button is the fallback, so failing quietly is fine.
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <Backdrop variant="subtle" />
      <div aria-hidden className="hairline absolute inset-x-0 top-0 h-px" />

      <Container size="wide">
        <SectionHeading
          index="06"
          kicker="Contact"
          title={
            <>
              Have a system that&apos;s{" "}
              <span className="text-gradient">plausible and wrong?</span>
            </>
          }
          description="I'm interested in retrieval, agent reliability and evaluation problems — especially the ones that have resisted a couple of attempts already."
        />

        <Reveal className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-end">
          {/* ------------------------------------------------------- Email */}
          <div className="lg:col-span-8">
            <p className="label mb-4">Write to me</p>

            <div className="flex flex-wrap items-center gap-4">
              <Magnetic strength={0.14}>
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-block font-display text-2xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl"
                >
                  <span className="bg-gradient-to-r from-ember to-ember bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                    {site.email}
                  </span>
                </a>
              </Magnetic>

              <button
                type="button"
                onClick={copyEmail}
                aria-label={copied ? "Email copied" : "Copy email address"}
                className="grid size-9 shrink-0 place-items-center rounded-lg border border-border/70 bg-card/50 text-muted-foreground backdrop-blur transition-colors duration-300 hover:border-ember/40 hover:text-ember"
              >
                {copied ? <Check className="size-4 text-jade" /> : <Copy className="size-4" />}
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-3.5" />
                {site.location}
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="relative grid size-3 place-items-center">
                  <span className="absolute size-2 rounded-full bg-jade/50 animate-pulse-ring" />
                  <span className="size-1.5 rounded-full bg-jade" />
                </span>
                {site.availability}
              </span>
            </div>
          </div>

          {/* ------------------------------------------------------ Socials */}
          <div className="lg:col-span-4 lg:flex lg:flex-col lg:items-end">
            <p className="label mb-4">Elsewhere</p>
            <SocialLinks />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
