"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SectionBreak({
  src,
  caption,
  align = "left",
  height = "h-[70vh]",
}: {
  src: string;
  caption?: string;
  align?: "left" | "right" | "center";
  height?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Translate only — no scale. Keeps the GPU layer cheap.
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const alignmentClass =
    align === "right"
      ? "right-10 text-right"
      : align === "center"
      ? "left-1/2 -translate-x-1/2 text-center"
      : "left-10";

  return (
    <section ref={ref} className={`relative ${height} w-full overflow-hidden`}>
      <motion.div style={{ y }} className="absolute inset-[-6%] will-change-transform">
        <img
          src={src}
          alt={caption ?? ""}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/10 to-ink-950" />
      {caption && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className={`absolute bottom-12 ${alignmentClass} max-w-md text-ink-200 font-display italic text-2xl md:text-3xl leading-snug`}
        >
          &ldquo;{caption}&rdquo;
        </motion.div>
      )}
    </section>
  );
}
