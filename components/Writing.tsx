import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { posts } from "@/data/blog";

export default function Writing() {
  const [lead, ...rest] = posts;
  return (
    <section id="writing" className="relative border-t border-edge bg-surface py-28 transition-colors duration-500 md:py-40">
      <div className="mx-auto max-w-shell px-6">
        <SectionHeading
          title="Interactive deep-dives into how AI actually works."
          lede="Visual, hands-on explainers, from attention mechanisms to inference engines."
        />

        {/* lead post */}
        <Reveal>
          <a
            href={lead.file}
            className="card-lift group mb-5 block overflow-hidden rounded-2xl border border-edge bg-card md:grid md:grid-cols-2"
          >
            <div className="relative aspect-[16/9] overflow-hidden md:aspect-auto md:min-h-[20rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lead.cover}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-spring group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="mb-3 font-mono text-2xs uppercase tracking-wider text-accent">
                {lead.topic} · {lead.readTime}
              </p>
              <h3 className="font-display text-d-sm font-semibold transition-colors group-hover:text-accent">
                {lead.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{lead.blurb}</p>
              <p className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
                Read it <ArrowUpRight size={14} />
              </p>
            </div>
          </a>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              <a href={p.file} className="card-lift group block h-full overflow-hidden rounded-2xl border border-edge bg-card">
                <div className="relative aspect-[16/9] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.cover}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-spring group-hover:scale-[1.05]"
                  />
                </div>
                <div className="p-6">
                  <p className="mb-2 font-mono text-2xs uppercase tracking-wider text-accent">
                    {p.topic} · {p.readTime}
                  </p>
                  <h3 className="font-display font-semibold leading-snug transition-colors group-hover:text-accent">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted">{p.blurb}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
