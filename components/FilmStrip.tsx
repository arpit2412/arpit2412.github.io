import Reveal from "@/components/Reveal";
import { films } from "@/data/films";

/** Cinematic poster marquee — the nine films carrying shipped ML research. */
export default function FilmStrip() {
  const loop = [...films, ...films];
  return (
    <Reveal className="mt-24">
      <p className="eyebrow mb-8 text-center">Nine films · VFX ML research in production</p>
      <div
        className="group relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee gap-5 [animation-play-state:running] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {loop.map((f, i) => (
            <figure key={`${f.title}-${i}`} className="w-36 shrink-0 sm:w-44">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.poster}
                alt={f.themeNote}
                loading="lazy"
                className="aspect-[2/3] w-full rounded-lg border border-edge object-cover grayscale transition-all duration-500 hover:scale-[1.03] hover:grayscale-0"
              />
              <figcaption className="mt-2.5 text-center">
                <span className="block truncate font-display text-xs font-medium">{f.title}</span>
                <span className="font-mono text-2xs text-faint">
                  {f.year} · {f.studio}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
