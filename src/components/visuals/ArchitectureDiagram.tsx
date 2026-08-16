import Image from "next/image";
import { ChevronRight } from "lucide-react";

import type { ArchitectureStage } from "@/types";

/**
 * Architecture figure for a case study.
 *
 * If `image` is set, it renders that file from /public and nothing else — this
 * is the drop-in slot for a real diagram (Excalidraw, Figma, Mermaid export).
 * Until then it builds a styled stage-flow from the `stages` data, so a case
 * study never has an empty box where the diagram should be.
 */
export default function ArchitectureDiagram({
  image,
  caption,
  stages,
}: {
  image?: string;
  caption: string;
  stages: ArchitectureStage[];
}) {
  return (
    <figure className="not-prose">
      <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/40">
        <div aria-hidden className="grid-field absolute inset-0 !opacity-[0.07]" />

        {image ? (
          /* TODO: real diagram path comes from data/projects.ts →
             approach.diagram.image. Sizes assume a full-width figure. */
          <Image
            src={image}
            alt={caption}
            width={1600}
            height={900}
            className="relative w-full"
            sizes="(min-width: 1024px) 900px, 100vw"
          />
        ) : (
          <div className="relative overflow-x-auto p-5 sm:p-7">
            <div className="flex min-w-max items-stretch gap-3 lg:min-w-0">
              {stages.map((stage, i) => (
                <div key={stage.name} className="flex items-stretch gap-3">
                  <div className="flex w-[190px] shrink-0 flex-col gap-2 lg:w-auto lg:flex-1">
                    {/* Stage label */}
                    <div className="flex items-center gap-2 px-1">
                      <span className="font-mono text-[0.65rem] tabular-nums text-ember">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="label !text-foreground/70">{stage.name}</span>
                    </div>

                    {/* Nodes */}
                    <div className="flex flex-1 flex-col gap-2">
                      {stage.nodes.map((node) => (
                        <div
                          key={node.title}
                          className="flex-1 rounded-lg border border-border/70 bg-background/60 p-3 backdrop-blur transition-colors duration-300 hover:border-ember/40"
                        >
                          <p className="font-display text-sm font-semibold tracking-tight">
                            {node.title}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {node.detail}
                          </p>
                          {node.tech && (
                            <p className="mt-2 font-mono text-[0.65rem] text-ember">{node.tech}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Connector */}
                  {i < stages.length - 1 && (
                    <div aria-hidden className="flex items-center">
                      <ChevronRight className="size-4 shrink-0 text-border" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <figcaption className="mt-3 flex items-start gap-2 font-mono text-[0.7rem] leading-relaxed text-muted-foreground">
        <span className="text-ember">Fig.</span>
        {caption}
      </figcaption>
    </figure>
  );
}
