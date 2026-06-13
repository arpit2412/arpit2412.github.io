"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative h-[100svh] w-full overflow-hidden bg-ink-950"
    >
      {/* Video background — no transform, no scroll listener.
         Static placement is fast and reliable. */}
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover opacity-70"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero-poster.jpg"
        >
          <source src="/hero.mp4" type="video/mp4" media="(min-width: 768px)" />
          <source src="/hero-720.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Tints + scanlines */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/30 to-ink-950" />
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Foreground content — initial entrance only, no scroll-tied transforms */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 h-full flex flex-col justify-end pb-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: 0.3 }}
          className="eyebrow mb-7 inline-flex items-center gap-3"
        >
          <span className="h-px w-10 bg-gold" />
          {profile.location} · Available for research collaborations
        </motion.div>

        <h1 className="font-display text-hero text-ink-100">
          {profile.name.split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.2, 0.8, 0.2, 1],
                delay: 0.2 + i * 0.1,
              }}
              className="inline-block overflow-hidden mr-[0.18em]"
            >
              <span className="inline-block">{word}</span>
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.6 }}
          className="mt-10 max-w-2xl"
        >
          <p className="italic-display text-3xl text-gold-soft leading-[1.2]">
            {profile.title}
          </p>
          <p className="mt-4 text-ink-300 text-base md:text-lg">
            {profile.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="mt-12 flex items-center gap-8"
        >
          <a
            href="#about"
            className="group inline-flex items-center gap-3 text-ink-300 text-2xs uppercase tracking-eyebrow"
          >
            <span className="h-px w-12 bg-gold transition-all duration-500 group-hover:w-20" />
            Scroll the story
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-ink-400"
      >
        <span className="text-2xs uppercase tracking-eyebrow mb-2.5">scroll</span>
        <ArrowDown className="w-4 h-4 scroll-cue-dot" />
      </motion.div>

      <div className="hidden md:flex absolute bottom-10 right-10 z-10 flex-col items-end gap-1 text-right">
        <span className="text-2xs uppercase tracking-eyebrow text-ink-400 font-mono nums">
          CVPR 2026 · TPAMI · NeurIPS · ECCV · WACV · TikTok · CSIRO
        </span>
      </div>
    </section>
  );
}
