/* ============================================================================
   NAVIGATION
   ----------------------------------------------------------------------------
   `id` must match the `id` attribute on the corresponding <section> in
   src/app/page.tsx — the navbar uses it for scroll-spy highlighting.
   ========================================================================= */

export const navLinks = [
  { id: "work", label: "Work", href: "/#work", index: "01" },
  { id: "about", label: "About", href: "/#about", index: "02" },
  { id: "skills", label: "Skills", href: "/#skills", index: "03" },
  { id: "experience", label: "Experience", href: "/#experience", index: "04" },
  { id: "writing", label: "Writing", href: "/#writing", index: "05" },
  { id: "contact", label: "Contact", href: "/#contact", index: "06" },
] as const;

export type NavLink = (typeof navLinks)[number];
