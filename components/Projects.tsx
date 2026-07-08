import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";
import { projects } from "@/data/projects";
import FilmStrip from "@/components/FilmStrip";

export default function Projects() {
  return (
    <section id="work" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-shell px-6">
        <SectionHeading
          title="From datacenters to cinema screens."
          lede="Frontier training runs, production safety models, film VFX, and a venture of my own."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => {
            const card = (
              <SpotlightCard
                className={`group h-full p-8 ${p.featured ? "md:p-10" : ""}`}
                innerClassName="relative flex h-full flex-col"
              >
                <p className="mb-4 text-sm font-medium text-faint">{p.kicker}</p>
                <h3 className="font-display text-d-sm font-semibold transition-colors group-hover:text-accent">
                  {p.title}
                </h3>
                <p className="mt-4 flex-1 leading-relaxed text-muted">{p.description}</p>
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-edge px-3 py-1 font-mono text-2xs text-faint transition-colors group-hover:border-edge-2"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {p.href && p.linkLabel && (
                  <p className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    {p.linkLabel}
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </p>
                )}
              </SpotlightCard>
            );
            return (
              <Reveal key={p.title} delay={(i % 2) * 0.1} className={p.featured && i === 0 ? "md:col-span-2" : ""}>
                {p.href ? (
                  <a href={p.href} target={p.href.startsWith("#") ? undefined : "_blank"} rel="noreferrer" className="block h-full">
                    {card}
                  </a>
                ) : (
                  card
                )}
              </Reveal>
            );
          })}
        </div>
      </div>

      <FilmStrip />
    </section>
  );
}
