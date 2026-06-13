"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "publications", label: "Research" },
  { id: "films", label: "Films" },
  { id: "news", label: "Latest" },
  { id: "blog", label: "Writing" },
  { id: "contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink-950/75 backdrop-blur-xl border-b border-ink-800/70"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link href="#top" className="flex items-baseline gap-2 group">
          <span className="font-display italic text-gold text-2xl leading-none">A</span>
          <span className="font-display text-ink-100 text-base">
            Arpit Garg
          </span>
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-2xs uppercase tracking-eyebrow text-ink-300">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="link-underline hover:text-ink-100 transition-colors duration-500"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 text-2xs uppercase tracking-eyebrow px-4 py-2 border border-gold/60 text-gold hover:bg-gold hover:text-ink-950 transition-all duration-500 rounded-full"
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}
