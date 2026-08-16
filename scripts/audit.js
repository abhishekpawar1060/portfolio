/**
 * Rendering audit — a regression guard, not a screenshotter.
 *
 *   npm run audit
 *
 * Loads every route twice (normal motion and prefers-reduced-motion) and fails
 * if it finds either:
 *
 *   1. Console/page errors — most importantly React hydration mismatches.
 *   2. Text that renders at opacity 0.
 *
 * Both exist because of a real bug: branching on `useReducedMotion()` during
 * render made the server emit `opacity: 0` while the client emitted no
 * animation props. React refuses to patch that mismatch, so entire sections
 * stayed invisible for anyone with "reduce motion" enabled — while the build,
 * typecheck and lint all passed. Keep this in CI.
 *
 * Requires the site to be running. Exits non-zero on failure.
 *
 * Don't run this while `next build` is running against the same directory —
 * the dev server recompiles mid-sweep and reveals report as unsettled, which
 * looks like a failure but isn't.
 */

const { chromium } = require("playwright-core");

const BASE = process.env.SHOT_URL || "http://localhost:3000";
const CHANNEL = process.env.CHANNEL || "chrome";

const ROUTES = ["/", "/projects", "/projects/atlas-retrieval"];
const MOTION_MODES = ["no-preference", "reduce"];
const THEMES = ["dark", "light"];

/** Ignore motion's own advisory about the OS setting being active. */
const IGNORE = [/Reduced Motion enabled on your device/i];

(async () => {
  const browser = await chromium.launch({ channel: CHANNEL });
  const failures = [];

  for (const theme of THEMES) {
    for (const motion of MOTION_MODES) {
      const ctx = await browser.newContext({
        viewport: { width: 1440, height: 950 },
        reducedMotion: motion,
      });
      await ctx.addInitScript((t) => {
        try {
          localStorage.setItem("theme", t);
        } catch {}
      }, theme);

      for (const route of ROUTES) {
        const page = await ctx.newPage();
        const errors = [];
        page.on("console", (m) => {
          if (m.type() !== "error") return;
          const text = m.text();
          if (!IGNORE.some((re) => re.test(text))) errors.push(text.split("\n")[0].slice(0, 160));
        });
        page.on("pageerror", (e) => errors.push(`pageerror: ${e.message.slice(0, 160)}`));

        await page.goto(BASE + route, { waitUntil: "networkidle" });
        // Scroll the full page so every whileInView reveal is triggered.
        // Dwell at each step: some headings only animate once 60% of the
        // element is in view, and a faster sweep can skip past that threshold
        // without IntersectionObserver ever firing.
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 600) {
            window.scrollTo({ top: y, behavior: "instant" });
            await new Promise((r) => setTimeout(r, 120));
          }
          window.scrollTo({ top: 0, behavior: "instant" });
        });
        await page.waitForTimeout(1200);

        const sampleInvisible = () =>
          page.evaluate(() => {
            const out = [];
            for (const el of document.querySelectorAll("h1,h2,h3,p,li,span,a")) {
              const text = (el.textContent || "").trim();
              if (text.length < 3) continue;
              if (el.closest(".sr-only")) continue;
              const cs = getComputedStyle(el);
              if (cs.visibility === "hidden" || cs.display === "none") continue;
              if (parseFloat(cs.opacity) > 0.05) continue;
              // Only report the outermost offender, not every descendant.
              if (out.some((o) => o.node.contains(el))) continue;
              out.push({ node: el, text: text.slice(0, 60), tag: el.tagName });
            }
            return out.map(({ text, tag }) => ({ text, tag }));
          });

        /* Sample twice, ~1s apart, and keep only what is invisible in both.
           A single sample can catch a legitimately animating element mid-fade
           (the hero's rotating phrase crossfades every 2.6s). Anything stuck
           because of a hydration mismatch never recovers, so it survives the
           intersection while transient states drop out. */
        const first = await sampleInvisible();
        let invisible = [];
        if (first.length) {
          await page.waitForTimeout(1000);
          const second = await sampleInvisible();
          const seen = new Set(second.map((e) => e.tag + e.text));
          invisible = first.filter((e) => seen.has(e.tag + e.text));
        }

        const label = `${theme}/${motion}${route}`;
        if (errors.length) failures.push(`${label} → ${errors.length} console error(s):\n     ${errors[0]}`);
        if (invisible.length)
          failures.push(
            `${label} → ${invisible.length} element(s) rendered at opacity 0:\n     <${invisible[0].tag}> "${invisible[0].text}"`,
          );

        const status = errors.length || invisible.length ? "FAIL" : "ok  ";
        console.log(`${status} ${label}`);
        await page.close();
      }
      await ctx.close();
    }
  }

  await browser.close();

  if (failures.length) {
    console.error(`\n${failures.length} failure(s):\n`);
    for (const f of failures) console.error("  - " + f);
    process.exit(1);
  }
  console.log("\nAll routes render cleanly in both themes and both motion modes.");
})().catch((e) => {
  console.error("\nFAILED:", e.message);
  if (/ECONNREFUSED|net::ERR/.test(e.message)) {
    console.error(`Is the site running at ${BASE}?  Start it with: npm run dev`);
  }
  process.exit(1);
});
