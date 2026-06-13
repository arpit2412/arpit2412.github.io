"use client";

// Native scroll. Lenis was causing input lag + jitter when combined with
// framer-motion useScroll. The browser's native smooth scroll (set via
// `scroll-behavior: smooth` in globals.css) is snappy and handles anchor
// links / touch correctly across devices.
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
