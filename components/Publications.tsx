"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { publications } from "@/data/publications";
import { profile } from "@/data/profile";
import SectionHeading from "./SectionHeading";

const statusColor: Record<string, string> = {
  accepted: "bg-gold text-ink-950",
  "in submission": "border border-gold/60 text-gold",
  published: "border border-ink-600 text-ink-200",
};

export default function Publications() {
  return (
    <section id="publications" className="relative py-32 md:py-40 bg-ink-900/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Publications"
          title="Selected research."
          description="Top-tier peer-reviewed venues across LLMs, multimodal AI, computer vision, and machine unlearning."
        />

        <div className="grid md:grid-cols-2 gap-5">
          {publications.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.arxiv ?? p.url ?? profile.links.scholar}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.04 }}
              className={`group relative block p-7 border border-ink-800 bg-ink-950/60 hover:border-gold/50 lift ${
                p.highlight ? "md:col-span-2" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-5">
                <span
                  className={`inline-block px-2.5 py-1 text-2xs uppercase tracking-eyebrow font-mono nums ${
                    statusColor[p.status ?? "published"]
                  }`}
                >
                  {p.short}
                </span>
                <span className="text-2xs uppercase tracking-eyebrow text-ink-500 font-mono">
                  {p.status}
                </span>
              </div>
              <h3
                className={`font-display text-ink-100 leading-[1.15] group-hover:text-gold-soft transition-colors duration-500 ${
                  p.highlight ? "text-5xl" : "text-2xl"
                }`}
              >
                {p.title}
              </h3>
              <p className="mt-4 text-sm text-ink-400 leading-relaxed max-w-prose">{p.authors}</p>
              {p.arxiv && (
                <div className="mt-6 inline-flex items-center gap-2 text-2xs uppercase tracking-eyebrow text-gold">
                  arXiv <ExternalLink className="w-3 h-3" />
                </div>
              )}
            </motion.a>
          ))}
        </div>

        {/* Scholar link panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-14 border border-ink-800 bg-ink-950/60 p-9 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-7"
        >
          <div>
            <div className="eyebrow mb-3 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-gold" /> Live · Google Scholar
            </div>
            <p className="font-display text-3xl text-ink-100">
              Full publication record, citations & h-index.
            </p>
            <p className="mt-3 text-ink-400 text-sm">
              Continuously updated with new accepted papers and preprints.
            </p>
          </div>
          <a
            href={profile.links.scholar}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 text-2xs uppercase tracking-eyebrow px-7 py-3.5 border border-gold text-gold hover:bg-gold hover:text-ink-950 transition-all duration-500 rounded-full shrink-0"
          >
            Open Google Scholar <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
