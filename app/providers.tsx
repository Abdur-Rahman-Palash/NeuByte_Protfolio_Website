"use client";

import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { initScrollAnimations } from "@/lib/gsap-animations";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize GSAP scroll animations
    initScrollAnimations();
  }, []);

  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
}
