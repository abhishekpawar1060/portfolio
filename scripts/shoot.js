/**
 * Screenshot harness.
 *
 *   npm run shots                 # dark / desktop
 *   npm run shots -- light        # light / desktop
 *   npm run shots -- dark mobile  # dark / mobile
 *
 * Requires the dev server (or `npm start`) to already be running.
 * Output lands in .screenshots/ which is gitignored.
 *
 * Drives the system Chrome through playwright-core, so there is no bundled
 * browser download. If Chrome isn't installed, set CHANNEL=msedge.
 */

const { chromium } = require("playwright-core");
const path = require("path");
const fs = require("fs");

const THEME = process.argv[2] || "dark";
const DEVICE = process.argv[3] || "desktop";
const BASE = process.env.SHOT_URL || "http://localhost:3000";
const CHANNEL = process.env.CHANNEL || "chrome";
const OUT = path.join(process.cwd(), ".screenshots");

const VIEWPORT =
  DEVICE === "mobile" ? { width: 390, height: 844 } : { width: 1440, height: 950 };

/* One viewport screenshot per anchor. `nudge` scrolls further past the section
   top, for sections too tall to fit in a single frame. */
const SHOTS = [
  { name: "01-hero", sel: "#top", nudge: 0 },
  { name: "02-work-feature", sel: "#work", nudge: 0 },
  { name: "03-work-grid", sel: "#work", nudge: DEVICE === "mobile" ? 1500 : 900 },
  { name: "04-about", sel: "#about", nudge: 0 },
  { name: "05-skills", sel: "#skills", nudge: 0 },
  { name: "06-experience", sel: "#experience", nudge: 0 },
  { name: "07-writing", sel: "#writing", nudge: 0 },
  { name: "08-contact", sel: "#contact", nudge: 0 },
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch({ channel: CHANNEL });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    // Scroll-triggered reveals resolve to their final state under motion's
    // reducedMotion="user", so every element is guaranteed painted rather than
    // caught mid-fade at opacity 0.
    reducedMotion: "reduce",
  });

  await context.addInitScript((t) => {
    try {
      localStorage.setItem("theme", t);
    } catch {}
  }, THEME);

  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  for (const shot of SHOTS) {
    const el = page.locator(shot.sel).first();
    if (!(await el.count())) {
      console.log(`skip  ${shot.name} (${shot.sel} not found)`);
      continue;
    }
    const box = await el.boundingBox();
    const y = Math.max(
      0,
      (box ? box.y + (await page.evaluate(() => window.scrollY)) : 0) + shot.nudge,
    );
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(450);

    const file = path.join(OUT, `${THEME}-${DEVICE}-${shot.name}.png`);
    await page.screenshot({ path: file });
    console.log("wrote", path.basename(file));
  }

  // Case study — the densest layout, desktop only.
  if (DEVICE === "desktop") {
    await page.goto(`${BASE}/projects/atlas-retrieval`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    for (const [i, top] of [0, 1100, 2100, 3100].entries()) {
      await page.evaluate((t) => window.scrollTo({ top: t, behavior: "instant" }), top);
      await page.waitForTimeout(400);
      const file = path.join(OUT, `${THEME}-case-${i + 1}.png`);
      await page.screenshot({ path: file });
      console.log("wrote", path.basename(file));
    }
  }

  await browser.close();
  console.log(`\nDone → ${path.relative(process.cwd(), OUT)}/`);
})().catch((e) => {
  console.error("\nFAILED:", e.message);
  if (/ECONNREFUSED|net::ERR/.test(e.message)) {
    console.error(`Is the site running at ${BASE}?  Start it with: npm run dev`);
  }
  if (/channel/i.test(e.message)) {
    console.error(`Browser channel "${CHANNEL}" not found. Try: CHANNEL=msedge npm run shots`);
  }
  process.exit(1);
});
