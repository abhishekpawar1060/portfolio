"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Dark by default, with an explicit toggle.
 *
 * `enableSystem` is off deliberately: the palette is designed dark-first, and
 * defaulting to the OS preference means half of first-time visitors never see
 * the intended look. Set `enableSystem` to true if you'd rather respect it.
 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
