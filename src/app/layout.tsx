import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import ThemeProvider from "@/components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Abhishek Pawar",
    template: "%s | Abhishek Pawar",
  },

  description:
    "AI/ML Engineer and Full Stack Developer specializing in RAG Systems, Agentic AI, FastAPI, React, Next.js, and scalable web applications.",

  keywords: [
    "Abhishek Pawar",
    "AI Engineer",
    "Machine Learning Engineer",
    "Full Stack Developer",
    "Next.js",
    "React",
    "FastAPI",
    "RAG",
    "LLM",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}