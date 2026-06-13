"use client";

import { motion } from "framer-motion";
import { patents, honors } from "@/data/patents";
import { ShieldCheck, Trophy } from "lucide-react";

export default function Patents() {
  return (
    <section id="patents" className="relative py-32 bg-ink-900/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-2 gap-10">
        <div>
          <div className="eyebrow mb-6 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" /> Patents
          </div>
          <h3 className="font-display text-5xl text-ink-100 mb-10">
            Inventions <em className="italic-display text-gold-soft">on file.</em>
          </h3>
          <div className="space-y-4">
            {patents.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="p-7 border border-ink-800 bg-ink-950/60 lift"
              >
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  <span className="text-2xs uppercase tracking-eyebrow text-gold">
                    {p.kind}
                  </span>
                </div>
                <h4 className="font-display text-2xl text-ink-100 leading-[1.2]">
                  {p.title}
                </h4>
                <p className="mt-3 text-sm text-ink-300 leading-reading">{p.meta}</p>
                {(p.number || p.date) && (
                  <p className="mt-4 text-2xs uppercase tracking-eyebrow text-ink-500 font-mono nums">
                    {[p.number, p.date].filter(Boolean).join(" · ")}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <div className="eyebrow mb-6 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" /> Honors & Recognition
          </div>
          <h3 className="font-display text-5xl text-ink-100 mb-10">
            On <em className="italic-display text-gold-soft">the record.</em>
          </h3>
          <div className="space-y-4">
            {honors.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="p-7 border border-ink-800 bg-ink-950/60 lift"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-4 h-4 text-gold" />
                  <span className="text-2xs uppercase tracking-eyebrow text-gold">
                    Award
                  </span>
                </div>
                <h4 className="font-display text-xl text-ink-100 leading-[1.25]">
                  {h.title}
                </h4>
                <p className="mt-2 text-sm text-ink-300 leading-reading">{h.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
