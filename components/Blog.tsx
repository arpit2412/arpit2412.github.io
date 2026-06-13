"use client";

import { motion } from "framer-motion";
import { posts } from "@/data/blog";
import SectionHeading from "./SectionHeading";
import { ArrowUpRight } from "lucide-react";

export default function Blog() {
  return (
    <section id="blog" className="relative py-32 md:py-40 bg-ink-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Writing"
          title="Long-form essays."
          description="Visual deep dives into the papers and ideas shaping modern deep learning. Each post is a fully-rendered HTML reading experience."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <motion.a
              key={p.slug}
              href={p.file}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
              className="group relative block border border-ink-800 bg-ink-900/40 overflow-hidden lift"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-800">
                <img
                  src={p.cover}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[30%] group-hover:grayscale-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
                <div className="absolute top-4 left-4 px-2.5 py-1 bg-gold/90 text-ink-950 text-2xs uppercase tracking-eyebrow font-medium">
                  {p.topic}
                </div>
                <ArrowUpRight className="absolute top-4 right-4 w-5 h-5 text-ink-100 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0 duration-500" />
              </div>
              <div className="p-7">
                <div className="flex items-center justify-between text-2xs uppercase tracking-eyebrow text-ink-500 font-mono nums">
                  <span>{p.date}</span>
                  <span>{p.readTime}</span>
                </div>
                <h3 className="mt-4 font-display text-3xl text-ink-100 leading-[1.15] group-hover:text-gold-soft transition-colors duration-500">
                  {p.title}
                </h3>
                <p className="mt-4 text-sm text-ink-300 leading-reading line-clamp-3">
                  {p.blurb}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
