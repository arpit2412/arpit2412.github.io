"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { Mail, Github, Linkedin, GraduationCap, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-ink-950 border-t border-ink-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-28 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="eyebrow mb-7 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gold" /> Contact
          </div>
          <h2 className="font-display text-6xl text-ink-100">
            Let&apos;s build something
            <br />
            <em className="italic-display text-gold-soft">that ships.</em>
          </h2>
          <p className="mt-8 max-w-xl text-ink-300 text-lg leading-relaxed">
            Open to research collaborations on LLMs, multimodal AI, and machine unlearning &mdash; and to consulting on frontier-scale training and production ML pipelines.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 gap-10">
          <div className="space-y-5">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 text-ink-100 hover:text-gold transition-colors group"
            >
              <Mail className="w-4 h-4 text-gold" />
              <span className="font-display text-2xl link-underline">{profile.email}</span>
            </a>
            <a
              href={`mailto:${profile.emailAcademic}`}
              className="flex items-center gap-3 text-ink-300 hover:text-gold transition-colors group"
            >
              <GraduationCap className="w-4 h-4 text-gold" />
              <span className="text-base link-underline">{profile.emailAcademic}</span>
            </a>
            <div className="flex items-center gap-3 text-ink-400">
              <MapPin className="w-4 h-4 text-gold" />
              <span className="text-base">{profile.location}</span>
            </div>
          </div>

          <div className="md:text-right space-y-3 text-sm">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-ink-200 hover:text-gold transition-colors group"
            >
              <Github className="w-4 h-4" />
              <span className="link-underline">github.com/arpit2412</span>
            </a>
            <br />
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-ink-200 hover:text-gold transition-colors group"
            >
              <Linkedin className="w-4 h-4" />
              <span className="link-underline">linkedin.com/in/arpit2412</span>
            </a>
            <br />
            <a
              href={profile.links.scholar}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-ink-200 hover:text-gold transition-colors group"
            >
              <GraduationCap className="w-4 h-4" />
              <span className="link-underline">Google Scholar</span>
            </a>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-ink-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-2xs uppercase tracking-eyebrow text-ink-500 font-mono nums">
          <span>© {new Date().getFullYear()} Arpit Garg, PhD. All rights reserved.</span>
          <span className="text-ink-600">Designed & built in Adelaide ◆</span>
        </div>
      </div>
    </footer>
  );
}
