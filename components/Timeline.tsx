"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { experience } from "@/data/experience";

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const line = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <section id="journey" className="relative border-t border-edge bg-surface py-28 transition-colors duration-500 md:py-40">
      <div className="mx-auto max-w-shell px-6">
        <SectionHeading
          eyebrow="Journey"
          title="Defence labs to frontier datacenters."
          lede="Eight years across research, industry, film, and national-scale AI infrastructure."
        />

        <div ref={ref} className="relative">
          {/* spine: static track + scroll-driven fill */}
          <div className="absolute bottom-0 left-[7px] top-2 w-px bg-edge md:left-1/2" />
          <motion.div
            style={{ scaleY: reduce ? 1 : line }}
            className="absolute bottom-0 left-[7px] top-2 w-px origin-top md:left-1/2"
            // gradient spine picks up both accents
            initial={false}
          >
            <div className="h-full w-full" style={{ background: "linear-gradient(to bottom, var(--accent), var(--accent-2))" }} />
          </motion.div>

          <div className="space-y-16 md:space-y-24">
            {experience.map((e, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal key={`${e.role}-${e.org}`} className="relative">
                  <div className={`md:grid md:grid-cols-2 md:gap-16 ${left ? "" : ""}`}>
                    {/* node */}
                    <span className="absolute left-[3px] top-2 h-[9px] w-[9px] rounded-full border-2 border-accent bg-base md:left-1/2 md:-translate-x-1/2" />

                    <div
                      className={`pl-10 md:pl-0 ${
                        left ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"
                      }`}
                    >
                      <p className="font-mono text-2xs uppercase tracking-wider text-accent">{e.dates}</p>
                      <h3 className="mt-2 font-display text-d-sm font-semibold">{e.role}</h3>
                      <p className="mt-1 font-medium text-muted">{e.org}</p>
                      {e.meta && <p className="mt-0.5 font-mono text-2xs uppercase tracking-wider text-faint">{e.meta}</p>}

                      <ul className={`mt-5 space-y-2.5 text-sm leading-relaxed text-muted ${left ? "md:ml-auto" : ""} max-w-lg`}>
                        {e.bullets.slice(0, 3).map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>

                      {e.tags && (
                        <div className={`mt-5 flex flex-wrap gap-2 ${left ? "md:justify-end" : ""}`}>
                          {e.tags.map((t) => (
                            <span key={t} className="rounded-full bg-accent-soft px-3 py-1 font-mono text-2xs text-accent">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
