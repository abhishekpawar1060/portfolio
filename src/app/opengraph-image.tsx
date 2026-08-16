import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { site } from "@/data/site";

/* ============================================================================
   OPEN GRAPH IMAGE — the 1200x630 card shown when the site is shared.
   ----------------------------------------------------------------------------
   Rendered in code rather than exported from a design tool, for two reasons:

   1. The text is real text. An image model asked to draw "Abhishek Pawar"
      produces convincing gibberish; this renders actual glyphs.
   2. It reads from data/site.ts, so changing your name or tagline updates
      the link preview automatically — no re-export, no drift.

   The portrait is embedded byte-for-byte from public/portrait.png. It is
   never redrawn or "enhanced" — a subtly-wrong version of your own face is
   worse than no photo at all.
   ========================================================================= */

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Read a local asset and inline it, since satori can't fetch from disk. */
function dataUri(relativePath: string, mime: string) {
  const bytes = readFileSync(join(process.cwd(), relativePath));
  return `data:${mime};base64,${bytes.toString("base64")}`;
}

export default async function OpengraphImage() {
  const background = dataUri("src/app/og-background.png", "image/png");
  const portrait = dataUri("public/portrait.png", "image/png");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          // Matches --background in the dark theme; shows through if the
          // background image ever fails to load.
          backgroundColor: "#0f0b08",
        }}
      >
        {/* Generated atmosphere */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={background}
          alt=""
          width={1200}
          height={630}
          style={{ position: "absolute", inset: 0, objectFit: "cover" }}
        />

        {/* Darkening scrim on the left so the copy always clears contrast,
            whatever the generated background happens to look like. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(15,11,8,0.95) 0%, rgba(15,11,8,0.85) 45%, rgba(15,11,8,0.35) 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            height: "100%",
            padding: "72px 80px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* ---------------------------------------------------- Left: copy */}
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  border: "2px solid rgba(241,144,58,0.45)",
                  backgroundColor: "rgba(241,144,58,0.12)",
                  color: "#f1903a",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                {site.shortName}
              </div>
              <div
                style={{
                  color: "#f1903a",
                  fontSize: 20,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                }}
              >
                {site.role}
              </div>
            </div>

            <div
              style={{
                marginTop: 34,
                color: "#efece7",
                fontSize: 76,
                fontWeight: 700,
                letterSpacing: -2.5,
                lineHeight: 1.02,
              }}
            >
              {site.name}
            </div>

            <div
              style={{
                marginTop: 26,
                color: "rgba(239,236,231,0.78)",
                fontSize: 29,
                lineHeight: 1.35,
                maxWidth: 620,
              }}
            >
              {site.tagline}
            </div>

            <div style={{ display: "flex", marginTop: 42, gap: 12 }}>
              {["Google ADK", "MCP", "Guardrails"].map((chip) => (
                <div
                  key={chip}
                  style={{
                    display: "flex",
                    padding: "9px 18px",
                    borderRadius: 8,
                    border: "1px solid rgba(239,236,231,0.18)",
                    color: "rgba(239,236,231,0.72)",
                    fontSize: 20,
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>
          </div>

          {/* ------------------------------------------------ Right: portrait
              A background-removed cutout, so there's no frame — the subject
              stands directly on the background with a glow behind him. */}
          <div
            style={{
              display: "flex",
              position: "relative",
              width: 372,
              height: 466,
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(closest-side, rgba(241,144,58,0.30), rgba(241,144,58,0.06) 60%, transparent 78%)",
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={portrait}
              alt=""
              width={372}
              height={466}
              style={{ objectFit: "contain" }}
            />
            {/* The cutout was cropped at chest height, so it ends on a hard
                horizontal line. Fade it into the background instead. */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 118,
                background:
                  "linear-gradient(to top, #0f0b08 12%, rgba(15,11,8,0.72) 45%, transparent 100%)",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
