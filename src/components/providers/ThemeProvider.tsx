"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Dark by default, with an explicit toggle.
 *
 * `enableSystem` is off deliberately: the palette is designed dark-first, and
 * defaulting to the OS preference means half of first-time visitors never see
 * the intended look. Set `enableSystem` to true if you'd rather respect it.
 *
 * MotionConfig `reducedMotion="user"` is load-bearing, not a nicety. Motion
 * applies the preference *inside* itself — disabling transform and layout
 * animations while still resolving opacity — so the React tree is identical on
 * server and client.
 *
 * Do NOT go back to branching on `useReducedMotion()` to swap `initial`/
 * `animate` during render. The server has no matchMedia, so it renders the
 * `initial` state (opacity: 0) into the HTML; a client with reduced motion then
 * renders no animation props at all, React declines to patch the mismatch, and
 * the element stays invisible permanently. That bug blanked most of this page.
 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}
