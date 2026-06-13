"use client";

import { motion } from "framer-motion";
import { news } from "@/data/news";
import SectionHeading from "./SectionHeading";
import { Award, FileText, Mic, Sparkles, Banknote, Newspaper } from "lucide-react";

const iconMap = {
  talk: Mic,
  paper: FileText,
  award: Award,
  grant: Banknote,
  patent: Sparkles,
  press: Newspaper,
};

export default function News() {
  return (
    <section id="news" className="relative py-32 md:py-40 bg-ink-900/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Latest"
          title="What's happening now."
          description="Recent talks, papers, awards, patents and grants."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {news.map((n, i) => {
            const Icon = iconMap[n.kind] ?? Newspaper;
            return (
              <motion.article
                key={n.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group p-7 border border-ink-800 bg-ink-950/60 lift relative overflow-hidden"
              >
                <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-gold/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-2 text-2xs uppercase tracking-eyebrow text-gold">
                    <Icon className="w-3.5 h-3.5" /> {n.kind}
                  </span>
                  <span className="text-2xs uppercase tracking-eyebrow text-ink-500 font-mono nums">
                    {n.date}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-ink-100 leading-[1.2] group-hover:text-gold-soft transition-colors duration-500">
                  {n.title}
                </h3>
                <p className="mt-4 text-ink-300 text-sm leading-reading">{n.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
