"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CHAPTERS, DOORS, HUB_ID, ISLAND_ORIGIN } from "./mindWorld";

/**
 * The miniature world stage.
 *
 * Scroll drives a **continuous zoom into each island**, not a crossfade between stills.
 * The island starts small on flat cream and the camera closes on it until you are inside it;
 * then the next island appears small and it happens again. Because the background is flat and
 * empty there is no page edge and no parallax cue, so it reads as a world approaching rather
 * than a page moving. That is the reference's mechanic (82% of its frames carry real motion).
 *
 * The zoom origin is the island's actual position in frame (~66%/48%), NOT frame centre —
 * scaling about the centre would slide the island out of view as it grows.
 *
 * Only `transform` and `opacity` are animated; both are compositor-only. Offsets are cached
 * and recomputed on resize / ResizeObserver, never measured in the scroll handler.
 *
 * Copy is sparse and lives in the left third, which every island was generated to leave
 * empty. It fades out as the zoom begins — the reference does exactly this. The dense content
 * section then arrives on the settled frame. That is the two-beat chapter, and it is how a
 * cinematic portfolio differs from a cinematic landing page: the landing page never had to
 * carry a publication list.
 */

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const smooth = (x: number) => { const t = clamp(x); return t * t * (3 - 2 * t); };

export default function MindWorld({ sections }: { sections: ReactNode[] }) {
  const trackRefs = useRef<(HTMLElement | null)[]>([]);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ledeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [atHub, setAtHub] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    let bounds: { top: number; height: number }[] = [];
    let ticking = false;
    let laidOutWidth = window.innerWidth;

    const measure = () => {
      laidOutWidth = window.innerWidth;
      const pageTop = window.scrollY;
      bounds = trackRefs.current.map((el) => {
        if (!el) return { top: 0, height: 1 };
        const r = el.getBoundingClientRect();
        return { top: r.top + pageTop, height: Math.max(1, r.height) };
      });
      read();
    };

    const read = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      let front = 0;

      for (let i = 0; i < bounds.length; i++) {
        const scene = sceneRefs.current[i];
        const lede = ledeRefs.current[i];
        if (!scene) continue;
        const { top, height } = bounds[i];
        const ch = CHAPTERS[i];

        // p: 0 when the chapter's top hits the viewport top, 1 at its bottom.
        const p = clamp((y - top + vh * 0.5) / height, 0, 1);
        if (y >= top - vh * 0.5 && y < top + height - vh * 0.5) front = i;

        if (reduce) {
          // No zoom, no motion. The island simply appears. Everything stays reachable.
          scene.style.transform = "none";
          scene.style.opacity = i === front ? "1" : "0";
          if (lede) lede.style.opacity = i === front ? "1" : "0";
          continue;
        }

        // The camera closes on the island. Scaling about the island's own position keeps it
        // centred in the lens as it grows; scaling about frame centre would slide it away.
        const scale = 1 + (ch.zoom - 1) * smooth(p);
        scene.style.transform = `scale3d(${scale.toFixed(4)}, ${scale.toFixed(4)}, 1)`;

        // Fade in over the first 12% of the chapter, out over the last 12%.
        const op = Math.min(smooth(p / 0.12), smooth((1 - p) / 0.12));
        scene.style.opacity = String(op);
        scene.style.zIndex = i === front ? "2" : "1";

        // Copy is legible only while the island is still small. It leaves as the zoom bites.
        if (lede) {
          const l = smooth(p / 0.08) * smooth((0.42 - p) / 0.14);
          lede.style.opacity = String(clamp(l));
          lede.style.transform = `translate3d(0, ${(-p * 40).toFixed(1)}px, 0)`;
        }
      }

      if (front !== active) setActive(front);
      setAtHub(CHAPTERS[front]?.id === HUB_ID);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(read); }
    };
    // Mobile fires resize when the URL bar slides; re-measuring there yanks scroll position.
    const onResize = () => {
      if (coarse && window.innerWidth === laidOutWidth) return;
      measure();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", measure);
    const ro = new ResizeObserver(() => measure());
    trackRefs.current.forEach((el) => el && ro.observe(el));
    measure();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", measure);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const jumpTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="mind-world">
      {/* Fixed island stage. Decorative — all meaning lives in the content above it. */}
      <div className="mw-stage" aria-hidden="true">
        {CHAPTERS.map((c, i) => (
          <div
            key={c.id}
            ref={(el) => { sceneRefs.current[i] = el; }}
            className="mw-scene"
            style={{ transformOrigin: `${ISLAND_ORIGIN.x}% ${ISLAND_ORIGIN.y}%` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.island} alt="" className="mw-scene__img" decoding="async" loading={i < 2 ? "eager" : "lazy"} />
          </div>
        ))}
      </div>

      {/* Sparse copy, in the left third every island was generated to leave empty. */}
      <div className="mw-ledes" aria-hidden="true">
        {CHAPTERS.map((c, i) => (
          <div key={c.id} ref={(el) => { ledeRefs.current[i] = el; }} className="mw-lede">
            <span className="mw-lede__verb">{c.verb}</span>
            <p>{c.lede}</p>
          </div>
        ))}
      </div>

      <nav className="mw-route" aria-label="Chapters">
        {CHAPTERS.map((c, i) => (
          <button
            key={c.id}
            type="button"
            onClick={() => jumpTo(c.id)}
            className={`mw-route__dot${i === active ? " is-active" : ""}`}
            aria-label={c.noun}
            aria-current={i === active ? "true" : undefined}
          >
            <span className="mw-route__label">{c.noun}</span>
            <i />
          </button>
        ))}
      </nav>

      <div className={`mw-doors${atHub ? " is-open" : ""}`} aria-hidden={!atHub}>
        <p className="mw-doors__lead">One mind. Five expressions.</p>
        <ul>
          {DOORS.map((d) => (
            <li key={d.id}>
              <button type="button" onClick={() => jumpTo(d.id)} tabIndex={atHub ? 0 : -1}>
                <span className="mw-doors__verb">{d.verb}</span>
                <span className="mw-doors__noun">{d.noun}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Beat two: the dense content, arriving after the zoom has settled. */}
      <div className="mw-track">
        {CHAPTERS.map((c, i) => (
          <section
            key={c.id}
            id={c.id}
            ref={(el) => { trackRefs.current[i] = el; }}
            className="mw-chapter"
            style={{ minHeight: `${c.scroll * 100}vh` }}
          >
            <div className="mw-chapter__spacer" />
            <div className="mw-chapter__content">{sections[i]}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
