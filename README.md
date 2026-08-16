# Portfolio

Next.js 16 (App Router) + React 19 + Tailwind v4 + Framer Motion.
Dark-first, token-driven design system. All content is placeholder — see below.

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Swapping in your real content

**You should not need to touch a component.** Everything lives in `src/data/`,
typed by `src/types/index.ts`, so TypeScript flags anything you miss.

| File | Feeds |
| --- | --- |
| `src/data/site.ts` | Name, role, positioning statement, hero stats, email, socials, résumé path, metadata |
| `src/data/projects.ts` | Project cards, `/projects` index, and every `/projects/[slug]` case study |
| `src/data/skills.ts` | Skills grid + "currently learning" strip |
| `src/data/experience.ts` | Timeline + education |
| `src/data/writing.ts` | Writing section |
| `src/data/navigation.ts` | Navbar/footer links (`id` must match a section `id` in `page.tsx`) |

A handful of longer prose blocks live inline in the component that renders them,
each marked `TODO:` — the About bio, principles and quick-stack in
`src/components/sections/About.tsx`, and the section headings/descriptions in
each section file. Grep for `TODO:` to find every placeholder:

```bash
grep -rn "TODO:" src/
```

### Adding a project

Append an object to `projects` in `src/data/projects.ts`. The case study route
is prerendered from that array via `generateStaticParams()` — no new files.

### Architecture diagrams

Each project has `approach.diagram`. Leave `image` undefined and the `stages`
data renders as a styled flow diagram. To use a real diagram, drop the file in
`public/` and set `image: "/diagrams/your-file.png"` — it replaces the fallback.

### Portrait

`src/components/sections/About.tsx` has a placeholder frame with the exact
`next/image` snippet to paste in, commented above it.

### Résumé

Drop your PDF at `public/resume.pdf` (path configurable via `site.resume`).

## Design system

Everything is driven by tokens at the top of `src/app/globals.css`:

- **Palette** — warm ink base (never blue-grey), `--ember` accent, `--jade` for
  positive metrics, `--iris` for depth. OKLCH throughout. Light and dark are
  defined in `:root` and `.dark`; retheme the whole site from those two blocks.
- **Type** — Space Grotesk (display) / Inter (body) / JetBrains Mono (labels and
  metrics, used as a design element). Swap in `src/app/layout.tsx`.
- **Custom utilities** — `grid-field`, `grain`, `hairline`, `label`,
  `text-gradient`, `shadow-warm`.

Dark is the default with an explicit toggle; `enableSystem` is off in
`src/components/providers/ThemeProvider.tsx` — flip it to respect the OS.

## Structure

```
src/
├── app/
│   ├── layout.tsx              fonts, metadata, theme, nav/footer
│   ├── page.tsx                homepage section order
│   ├── globals.css             design tokens + utilities
│   └── projects/
│       ├── page.tsx            full index (accordion)
│       └── [slug]/page.tsx     case study (SSG)
├── components/
│   ├── layout/                 Navbar (scroll-spy), Footer
│   ├── sections/               one file per homepage section
│   ├── ui/                     primitives: Reveal, SpotlightCard, Magnetic…
│   └── visuals/                ParticleField (canvas), Backdrop, diagram
├── data/                       ← all content lives here
└── types/                      content shapes
```

## Notes

- `motion`/canvas work respects `prefers-reduced-motion`; the particle field
  also pauses when scrolled off-screen or the tab is hidden.
- `package.json` still declares `gsap`, `shadcn`, `class-variance-authority`,
  `radix-ui` and `tw-animate-css` from the initial scaffold. Nothing imports
  them — drop them, or keep them if you plan to pull in shadcn components.
