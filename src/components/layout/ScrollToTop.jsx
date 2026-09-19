"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToTop } from "./SmoothScroll";

/** Mirrors the ScrollToTop behaviour of the react-router app. */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;

    const frame = window.requestAnimationFrame(() => scrollToTop(false));
    const timer = window.setTimeout(() => scrollToTop(false), 50);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
