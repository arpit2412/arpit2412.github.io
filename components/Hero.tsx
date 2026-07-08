"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin, GraduationCap, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import ParticleField from "@/components/ParticleField";

const socials = [
  { icon: Github, href: profile.links.github, label: "GitHub" },
  { icon: Linkedin, href: profile.links.linkedin, label: "LinkedIn" },
  { icon: GraduationCap, href: profile.links.scholar, label: "Google Scholar" },
  { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // subtle parallax: content drifts slower than the scroll
  const y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 140]);
  const fade = useTransform(scrollY, [0, 500], [1, 0]);

  const stagger = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 36 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease },
        };

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* backdrop: glow orbs + particle net + grid */}
      <div
        className="pointer-events-none absolute -left-40 top-[-10%] h-[34rem] w-[34rem] rounded-full blur-3xl"
        style={{ background: "var(--glow-a)" }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-[-15%] h-[30rem] w-[30rem] rounded-full blur-3xl"
        style={{ background: "var(--glow-b)" }}
      />
      <div className="grid-texture absolute inset-0 opacity-60" />
      <ParticleField />

      <motion.div
        style={{ y, opacity: fade }}
        className="relative z-10 mx-auto flex w-full max-w-shell flex-1 flex-col justify-center px-6 pb-24 pt-32"
      >
        <motion.p {...stagger(0)} className="eyebrow mb-6">
          AI Researcher · ML Engineer · Founder
        </motion.p>

        <motion.h1 {...stagger(1)} className="font-display text-d-xl font-semibold">
          Arpit Garg<span className="text-signal">.</span>
        </motion.h1>

        <motion.p {...stagger(2)} className="mt-6 max-w-2xl font-display text-d-sm text-muted">
          I build frontier AI systems — and teach them <span className="text-signal">to forget</span>.
        </motion.p>

        <motion.p {...stagger(3)} className="mt-5 max-w-xl leading-relaxed text-muted">
          PhD in machine learning. Research fellow at AIML & CSIRO, senior ML engineer at TikTok,
          co-founder of A2.AI. Published at CVPR, ECCV, and WACV — shipped to production at
          platform scale and onto nine feature films.
        </motion.p>

        <motion.div {...stagger(4)} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#research"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-base transition-transform duration-300 ease-spring hover:scale-[1.03]"
          >
            Explore my research
            <ArrowDown size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-edge-2 px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            Get in touch
            <ArrowUpRight size={15} />
          </a>
          <div className="ml-1 flex items-center gap-1">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-accent"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* stat strip */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="relative z-10 border-t border-edge backdrop-blur-sm"
      >
        <div className="mx-auto grid max-w-shell grid-cols-2 gap-px px-6 py-6 sm:grid-cols-3 md:grid-cols-6">
          {profile.stats.map((s) => (
            <div key={s.label} className="py-2 text-center md:text-left">
              <div className="font-display text-xl font-semibold tracking-tight">{s.value}</div>
              <div className="mt-0.5 font-mono text-2xs uppercase tracking-wider text-faint">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
