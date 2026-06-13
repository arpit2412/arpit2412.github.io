"use client";

import { motion } from "framer-motion";
import { films, type Film } from "@/data/films";

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
   Poster card — large, with dramatic on-enter reveal:
   (1) image: scaleY mask grows from 0 → 1 (curtain raise)
   (2) title: word-by-word slide-up (matches hero name animation)
   (3) meta: simple fade in
   ------------------------------------------------------------ */

function PosterCard({ film, i }: { film: Film; i: number }) {
  const baseDelay = i * 0.12;

  return (
    <motion.article
      className="group relative aspect-[2/3] overflow-hidden bg-ink-900 border border-ink-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {},
      }}
    >
      {/* Image with curtain reveal (clip-path) */}
      <motion.div
        className="absolute inset-0"
        variants={{
          hidden: { clipPath: "inset(0 0 100% 0)" },
          visible: { clipPath: "inset(0 0 0% 0)" },
        }}
        transition={{
          duration: 1.1,
          ease: [0.7, 0, 0.3, 1],
          delay: baseDelay,
        }}
      >
        <img
          src={film.poster}
          alt={film.themeNote}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
      </motion.div>

      {/* Frame edge — appears after image */}
      <motion.div
        className="absolute inset-0 ring-1 ring-inset ring-ink-100/5 pointer-events-none"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        transition={{ duration: 0.6, delay: baseDelay + 0.4 }}
      />

      {/* Year / studio badge */}
      <motion.div
        className="absolute top-4 left-4 right-4 flex items-center justify-between text-2xs uppercase tracking-eyebrow font-mono"
        variants={{
          hidden: { opacity: 0, y: -8 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6, delay: baseDelay + 0.6 }}
      >
        <span className="text-gold nums">{film.year}</span>
        <span className="text-ink-300">{film.studio}</span>
      </motion.div>

      {/* Title — word-by-word reveal */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display text-3xl text-ink-100 leading-[1.0] tracking-tight">
          {film.title.split(" ").map((word, j) => (
            <span
              key={j}
              className="inline-block overflow-hidden mr-[0.18em] align-baseline"
            >
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: "110%", opacity: 0 },
                  visible: { y: "0%", opacity: 1 },
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.2, 0.8, 0.2, 1],
                  delay: baseDelay + 0.7 + j * 0.06,
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h3>
        <motion.div
          className="mt-3 flex items-center gap-2 text-2xs uppercase tracking-eyebrow text-ink-300"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.6, delay: baseDelay + 1.1 }}
        >
          <span className="h-px w-6 bg-gold" />
          {film.role}
        </motion.div>
      </div>
    </motion.article>
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

      {/* Poster grid with dramatic reveal */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mt-28">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="eyebrow mb-10 inline-flex items-center gap-3"
        >
          <span className="h-px w-8 bg-gold" /> Title cards
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {films.map((f, i) => (
            <PosterCard key={f.title} film={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
