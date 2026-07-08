import { Award, FileBadge, Landmark, Mic, Star } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";
import { honors, patents } from "@/data/patents";
import { news } from "@/data/news";

const icons = [Award, Landmark, Mic, Star];

export default function Honors() {
  return (
    <section id="honors" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-shell px-6">
        <SectionHeading title="Recognition along the way." />

        <div className="grid gap-5 sm:grid-cols-2">
          {honors.map((h, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={h.title} delay={(i % 2) * 0.1}>
                <SpotlightCard className="h-full p-7" innerClassName="relative flex h-full items-start gap-5">
                  <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon size={19} />
                  </span>
                  <div>
                    <h3 className="font-display font-semibold leading-snug">{h.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{h.body}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}

          {patents.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.1}>
              <SpotlightCard className="h-full p-7" innerClassName="relative flex h-full items-start gap-5">
                <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <FileBadge size={19} />
                </span>
                <div>
                  <p className="font-mono text-2xs uppercase tracking-wider text-accent">{p.kind}</p>
                  <h3 className="mt-1.5 font-display font-semibold leading-snug">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {p.meta}
                    {p.number ? ` · ${p.number}` : ""}
                    {p.date ? ` · ${p.date}` : ""}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* compact latest-news rail */}
        <Reveal className="mt-24">
          <h3 className="mb-8 font-display text-d-md font-semibold">Latest</h3>
        </Reveal>
        <div className="grid gap-x-12 gap-y-6 border-t border-edge pt-8 md:grid-cols-2">
          {news.slice(0, 8).map((n, i) => (
            <Reveal key={n.title} delay={Math.min(i * 0.04, 0.2)}>
              <div className="flex items-baseline gap-5">
                <span className="w-20 shrink-0 font-mono text-2xs uppercase tracking-wider text-faint">{n.date}</span>
                <p className="text-sm leading-relaxed">
                  <span className="font-medium">{n.title}.</span>
                  <span className="text-muted"> {n.body}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
