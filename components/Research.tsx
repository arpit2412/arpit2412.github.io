import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { researchAreas } from "@/data/projects";
import { publications } from "@/data/publications";
import { profile } from "@/data/profile";

export default function Research() {
  const selected = publications.slice(0, 6);
  return (
    <section id="research" className="relative border-t border-edge bg-surface py-28 md:py-40">
      <div className="mx-auto max-w-shell px-6">
        <SectionHeading
          eyebrow="Research"
          title="Making models efficient, multimodal, and able to forget."
          lede="Six threads run through my work, from machine unlearning to million-token attention."
        />

        {/* editorial two-column list: hairlines, no card boxes */}
        <div className="grid gap-x-16 sm:grid-cols-2">
          {researchAreas.map((a, i) => (
            <Reveal key={a.title} delay={(i % 2) * 0.08}>
              <div className="group border-t border-edge py-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold transition-colors group-hover:text-accent">
                    {a.title}
                  </h3>
                  <span className="shrink-0 font-mono text-2xs text-faint">{a.pubs}</span>
                </div>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h3 className="font-display text-d-md font-semibold">Selected publications</h3>
            <a
              href={profile.links.scholar}
              target="_blank"
              rel="noreferrer"
              className="link-ink hidden shrink-0 items-center gap-1 text-sm text-muted hover:text-ink sm:inline-flex"
            >
              All on Google Scholar <ArrowUpRight size={14} />
            </a>
          </div>
        </Reveal>

        <div className="border-t border-edge">
          {selected.map((p, i) => {
            const inner = (
              <div className="group grid gap-2 py-6 transition-colors sm:grid-cols-[7rem,1fr,auto] sm:items-baseline sm:gap-6">
                <span className="font-mono text-2xs uppercase tracking-wider text-accent">{p.short}</span>
                <div>
                  <p className={`font-display leading-snug ${p.highlight ? "font-semibold" : "font-medium"} ${p.arxiv || p.url ? "group-hover:text-accent" : ""} transition-colors`}>
                    {p.title}
                  </p>
                  <p className="mt-1.5 text-sm text-faint">{p.authors}</p>
                </div>
                <span className="hidden font-mono text-2xs text-faint sm:block">{p.status}</span>
              </div>
            );
            const href = p.arxiv || p.url;
            return (
              <Reveal key={p.title} delay={Math.min(i * 0.05, 0.25)}>
                {href ? (
                  <a href={href} target="_blank" rel="noreferrer" className="block">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
