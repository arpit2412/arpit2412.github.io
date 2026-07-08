"use client";

import { useRef } from "react";

/**
 * Card with a cursor-tracked radial highlight on the border and surface.
 * Writes CSS vars directly in the pointer handler: zero React re-renders.
 */
export default function SpotlightCard({
  children,
  className = "",
  innerClassName = "relative h-full",
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        ref.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
        ref.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={`spotlight-card card-lift relative rounded-2xl border border-edge bg-card ${className}`}
    >
      <div className="spotlight-layer pointer-events-none absolute inset-0 rounded-2xl" aria-hidden />
      <div className={innerClassName}>{children}</div>
    </div>
  );
}
