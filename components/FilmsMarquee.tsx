"use client";

import { motion } from "framer-motion";
import { films, type Film } from "@/data/films";
import { profile } from "@/data/profile";

/* ------------------------------------------------------------
   Marquee banner — auto-scrolls horizontally. Animation kicks in
   only after enter (no scroll listener — just continuous CSS).
   ------------------------------------------------------------ */

function BannerCard({ film }: { film: Film }) {
  return (
    <div className="group relative shrink-0 w-[320px] md:w-[480px] aspect-video overflow-hidden border border-ink-800 bg-ink-900">
      <img
        src={film.banner}
        alt={film.themeNote}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
      <div className="absolute inset-0 bg-ink-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="font-mono text-2xs uppercase tracking-eyebrow text-gold nums mb-1.5">
          {film.year} · {film.studio}
        </div>
        <h3 className="font-display text-3xl text-ink-100 leading-[1.05]">
          {film.title}
        </h3>
        <div className="mt-2 text-2xs uppercase tracking-eyebrow text-ink-300">
          {film.role}
        </div>
      </div>

      <div className="absolute top-3 right-3 text-2xs uppercase tracking-eyebrow text-ink-200 font-mono bg-ink-950/70 backdrop-blur-md px-2.5 py-1 border border-ink-700/60">
        Rising Sun Pictures
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: Film[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden reveal-mask">
      <div
        className={`marquee-track gap-4 md:gap-6 py-1 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{ animationDuration: "60s" }}
      >
        {doubled.map((f, i) => (
          <BannerCard key={`${f.title}-${i}`} film={f} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   Poster card — RSP-inspired filmography grid.
   Clean poster by default; on hover the image lifts/zooms, a dim
   overlay fades in, and year / studio / role / IMDb cue reveal.
   ------------------------------------------------------------ */

function PosterCard({ film, i }: { film: Film; i: number }) {
  return (
    <motion.a
      href={profile.links.imdb}
      target="_blank"
      rel="noreferrer"
      aria-label={`${film.title} — view credit on IMDb`}
      className="group relative block aspect-[2/3] overflow-hidden rounded-sm bg-ink-900 border border-ink-800 hover:border-gold/40 transition-colors duration-500"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        ease: [0.2, 0.8, 0.2, 1],
        delay: (i % 3) * 0.08,
      }}
    >
      <img
        src={film.poster}
        alt={film.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
      />

      {/* base gradient (always) + hover dim */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/15 to-transparent" />
      <div className="absolute inset-0 bg-ink-950/55 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* top meta — reveals on hover */}
      <div className="absolute top-0 inset-x-0 p-4 flex items-center justify-between text-2xs uppercase tracking-eyebrow font-mono opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
        <span className="text-gold nums">{film.year}</span>
        <span className="text-ink-200">{film.studio}</span>
      </div>

      {/* bottom — title always; role + IMDb cue on hover */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display text-2xl leading-tight text-ink-100 transition-transform duration-500 group-hover:-translate-y-1">
          {film.title}
        </h3>
        <div className="mt-2 flex items-center gap-2 text-2xs uppercase tracking-eyebrow text-ink-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <span className="h-px w-5 bg-gold" />
          {film.role}
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 text-2xs uppercase tracking-eyebrow text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          View on IMDb <span aria-hidden>↗</span>
        </div>
      </div>
    </motion.a>
  );
}

export default function FilmsMarquee() {
  return (
    <section id="films" className="relative py-32 md:py-40 overflow-hidden bg-ink-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="eyebrow mb-6 inline-flex items-center gap-3"
        >
          <span className="h-px w-8 bg-gold" /> Filmography · VFX ML Research
        </motion.div>

        {/* Word-by-word display heading */}
        <h2 className="font-display text-6xl text-ink-100 max-w-4xl">
          {["Nine", "features."].map((word, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.85,
                ease: [0.2, 0.8, 0.2, 1],
                delay: 0.1 + i * 0.1,
              }}
              className="inline-block overflow-hidden mr-[0.18em]"
            >
              <span className="inline-block">{word}</span>
            </motion.span>
          ))}
          <br />
          {["One", "ML", "pipeline."].map((word, i) => (
            <motion.em
              key={i}
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.85,
                ease: [0.2, 0.8, 0.2, 1],
                delay: 0.4 + i * 0.08,
              }}
              className="inline-block overflow-hidden mr-[0.18em] italic-display text-gold-soft"
            >
              <span className="inline-block">{word}</span>
            </motion.em>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 max-w-prose text-ink-200 text-lg leading-reading"
        >
          Generative-AI pipelines built at Rising Sun Pictures — deepfake, gaze, super-resolution, NeRF / Gaussian Splatting — integrated into shipping VFX workflows on:
        </motion.p>
      </div>

      {/* Marquee rows */}
      <div className="space-y-5">
        <MarqueeRow items={films} />
        <MarqueeRow items={[...films].reverse()} reverse />
      </div>

      {/* Filmography grid — RSP-inspired */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mt-28">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-10"
        >
          <div className="eyebrow inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" /> Title cards
          </div>
          <a
            href={profile.links.imdb}
            target="_blank"
            rel="noreferrer"
            className="text-2xs uppercase tracking-eyebrow text-ink-400 hover:text-gold transition-colors inline-flex items-center gap-1.5"
          >
            Full credits on IMDb <span aria-hidden>↗</span>
          </a>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
          {films.map((f, i) => (
            <PosterCard key={f.title} film={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
