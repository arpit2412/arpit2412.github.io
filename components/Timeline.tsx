"use client";

import { motion } from "framer-motion";
import { experience, education } from "@/data/experience";
import SectionHeading from "./SectionHeading";

export default function Timeline() {
  return (
    <section id="experience" className="relative py-32 md:py-40 bg-ink-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Experience"
          title="A research career, shipped to production."
          description="Lab to live system, from defence imagery and indie VFX through TikTok-scale Trust & Safety MLLMs to frontier H200 training."
        />

        <ol className="relative border-l border-ink-800/80 pl-8 md:pl-12 space-y-16">
          {experience.map((job, i) => (
            <motion.li
              key={job.role + i}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.05 }}
              className="relative"
            >
              <span className="absolute -left-[42px] md:-left-[54px] top-2 flex items-center justify-center">
                <span className="absolute h-9 w-9 rounded-full bg-gold/10 animate-float-slow" />
                <span className="relative h-3 w-3 rounded-full bg-gold ring-4 ring-ink-950" />
              </span>
              <div className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-3 text-2xs uppercase tracking-eyebrow text-ink-400 font-mono nums pt-3">
                  {job.dates}
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-display text-4xl text-ink-100">
                    {job.role}
                  </h3>
                  <p className="mt-2 text-gold text-sm">
                    {job.org}
                    {job.meta && (
                      <span className="text-ink-400"> · {job.meta}</span>
                    )}
                    {job.location && (
                      <span className="text-ink-500"> · {job.location}</span>
                    )}
                  </p>
                  <ul className="mt-6 space-y-3.5 text-ink-200 text-base leading-reading max-w-prose">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="flex gap-4">
                        <span className="text-gold/70 select-none mt-3 w-1 h-1 rounded-full bg-current shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  {job.tags && (
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {job.tags.map((t) => (
                        <span
                          key={t}
                          className="text-2xs uppercase tracking-eyebrow px-3 py-1 border border-ink-700 text-ink-300 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>

        {/* Education */}
        <div className="mt-32">
          <div className="eyebrow mb-8 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" /> Education
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {education.map((ed, i) => (
              <motion.div
                key={ed.degree}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="border border-ink-800 bg-ink-900/40 p-7 lift"
              >
                <div className="text-2xs uppercase tracking-eyebrow text-ink-400 font-mono nums">
                  {ed.dates}
                </div>
                <h4 className="mt-4 font-display text-2xl text-ink-100 leading-[1.2]">
                  {ed.degree}
                </h4>
                <p className="mt-3 text-sm text-gold">{ed.org}</p>
                {ed.meta && <p className="mt-1 text-xs text-ink-400">{ed.meta}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
