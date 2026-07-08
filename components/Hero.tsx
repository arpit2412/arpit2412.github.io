"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin, GraduationCap, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import ParticleField from "@/components/ParticleField";
import Magnetic from "@/components/Magnetic";

const socials = [
  { icon: Github, href: profile.links.github, label: "GitHub" },
  { icon: Linkedin, href: profile.links.linkedin, label: "LinkedIn" },
  { icon: GraduationCap, href: profile.links.scholar, label: "Google Scholar" },
  { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/** Per-letter masked rise: each glyph slides up out of a clipped line. */
function KineticName({ text }: { text: string }) {
  const reduce = useReducedMotion();
  return (
    <span aria-label={text} className="inline-block">
      {text.split("").map((ch, i) =>
        ch === " " ? (
          <span key={i} className="inline-block w-[0.28em]" />
        ) : (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              aria-hidden
              className="inline-block"
              initial={reduce ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.045, ease: EASE }}
            >
              {ch}
            </motion.span>
          </span>
        )
      )}
    </span>
  );
}

/** Portrait with pointer-tracked 3D tilt, spring-smoothed. Motion values only. */
function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 16 });
  const sry = useSpring(ry, { stiffness: 120, damping: 16 });

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.92, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: EASE }}
      className="relative mx-auto w-64 sm:w-80 lg:w-full lg:max-w-sm"
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={ref}
        style={reduce ? {} : { rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
          rx.set(((e.clientY - r.top) / r.height - 0.5) * -10);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        className="relative"
      >
        {/* ambient backing */}
        <div className="cta-glow absolute -inset-8 rounded-[2.5rem]" aria-hidden />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/arpit.png"
          alt="Arpit Garg"
          width={640}
          height={618}
          fetchPriority="high"
          className="relative aspect-square w-full rounded-3xl border border-edge-2 object-cover shadow-2xl"
        />
        {/* floating credential chips, real facts */}
        <motion.div
          animate={reduce ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-6 top-8 rounded-full border border-edge bg-card px-4 py-2 font-mono text-2xs shadow-lg"
          style={{ transform: "translateZ(40px)" }}
        >
          CVPR 2026 · first author
        </motion.div>
        <motion.div
          animate={reduce ? {} : { y: [0, 9, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute -right-4 bottom-10 rounded-full border border-edge bg-card px-4 py-2 font-mono text-2xs shadow-lg"
          style={{ transform: "translateZ(40px)" }}
        >
          256× H200 cluster
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 140]);
  const fade = useTransform(scrollY, [0, 500], [1, 0]);

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 36 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="hero-glow absolute inset-0" />
      <div className="grid-texture absolute inset-0 opacity-60" />
      <ParticleField />

      <motion.div
        style={{ y, opacity: fade }}
        className="relative z-10 mx-auto grid w-full max-w-shell flex-1 items-center gap-14 px-6 pb-20 pt-28 lg:grid-cols-[1.15fr,0.85fr] lg:gap-8"
      >
        <div>
          <h1 className="font-display text-d-xl font-semibold">
            <KineticName text="Arpit Garg" />
            <motion.span
              className="inline-block text-accent"
              initial={reduce ? false : { opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
            >
              .
            </motion.span>
          </h1>

          <motion.p {...rise(0.55)} className="mt-6 max-w-2xl font-display text-d-sm text-muted">
            I build frontier AI systems and teach them <em className="text-accent">to forget</em>.
          </motion.p>

          <motion.p {...rise(0.68)} className="mt-5 max-w-xl leading-relaxed text-muted">
            PhD, machine learning. Research fellow at AIML and CSIRO. Senior ML engineer at
            TikTok. Co-founder of A2.AI.
          </motion.p>

          <motion.div {...rise(0.8)} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#research"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-base transition-transform duration-300 ease-spring active:scale-[0.98]"
              >
                Explore my research
                <ArrowDown size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-edge-2 px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent active:scale-[0.98]"
              >
                Get in touch
                <ArrowUpRight size={15} />
              </a>
            </Magnetic>
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
        </div>

        <Portrait />
      </motion.div>

      {/* stat strip */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 1 }}
        className="relative z-10 border-t border-edge"
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
