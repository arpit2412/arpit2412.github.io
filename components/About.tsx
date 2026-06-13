"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="relative py-32 md:py-40 bg-ink-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-12 gap-12 items-start">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="md:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-ink-800">
            <img
              src="/arpit.png?v=2"
              alt="Arpit Garg"
              className="absolute inset-0 h-full w-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-ink-100/5" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-[10px] uppercase tracking-[0.3em] text-ink-200 font-mono">
              <span>Australia · 2026</span>
              <span className="text-gold">◆</span>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-gold/40 -z-10" />
        </motion.div>

        {/* Text */}
        <div className="md:col-span-7 md:pl-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="eyebrow mb-6 inline-flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gold" /> About
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: [0.2, 0.8, 0.2, 1], delay: 0.05 }}
            className="font-display text-5xl text-ink-100"
          >
            Research that ships.
            <br />
            <em className="italic-display text-gold-soft">From frontier models to film.</em>
          </motion.h2>
          <div className="mt-9 space-y-5 text-ink-200 text-lg leading-reading max-w-prose">
            {profile.bio.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 + i * 0.1 }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* Stats grid */}
          <motion.dl
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-7 border-t border-ink-800 pt-10"
          >
            {profile.stats.map((s) => (
              <div key={s.label} className="space-y-1.5">
                <dt className="font-display text-4xl text-gold leading-none nums">
                  {s.value}
                </dt>
                <dd className="text-2xs uppercase tracking-eyebrow text-ink-400">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
