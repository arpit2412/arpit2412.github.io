"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CHAPTERS, DOORS, HUB_ID } from "./mindWorld";

/**
 * The Mind World stage.
 *
 * A fixed, full-viewport layer of plates behind the real content. Each chapter is a normal
 * in-flow <section> whose scroll range crossfades its plate in. Content scrolls over the
 * top, so nothing is clipped and nothing is lost.
 *
 * This pass is POSTER-ONLY on purpose: the plates cost 472KB, the clips will cost ~50MB.
 * Getting the router, the scrim and the transparency treatment wrong is cheap to discover
 * here and expensive to discover after 156 credits of video. When the clips land, each
 * scene gets a <video> appended by the scrub engine and the poster becomes its fallback —
 * exactly the shape the engine already expects (it hides `.world-scene__still` once a real
 * frame paints).
 *
 * Only `opacity` is animated. Offsets are cached and recomputed on resize / ResizeObserver,
 * never measured in the scroll handler, because that would thrash layout.
 */

const CROSSFADE = 0.35; // viewport-heights of overlap between adjacent plates
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const smooth = (x: number) => {
  const t = clamp(x);
  return t * t * (3 - 2 * t);
};

export default function MindWorld({ sections }: { sections: ReactNode[] }) {
  const trackRefs = useRef<(HTMLElement | null)[]>([]);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [atHub, setAtHub] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let bounds: { top: number; height: number }[] = [];
    let ticking = false;
    let laidOutWidth = window.innerWidth;
    const coarse = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

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
      const fade = CROSSFADE * vh;
      let front = 0;
      for (let i = 0; i < bounds.length; i++) if (y >= bounds[i].top - fade) front = i;

      for (let i = 0; i < bounds.length; i++) {
        const scene = sceneRefs.current[i];
        if (!scene) continue;
        const { top, height } = bounds[i];
        let outside = 0;
        if (y < top) outside = top - y;
        else if (y > top + height) outside = y - (top + height);
        const op = reduce ? (i === front ? 1 : 0) : smooth(1 - outside / fade);
        scene.style.opacity = String(op);
        scene.style.zIndex = i === front ? "2" : "1";
      }

      if (front !== active) setActive(front);
      setAtHub(CHAPTERS[front]?.id === HUB_ID);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(read);
      }
    };
    // Mobile browsers fire resize when the URL bar slides; re-measuring there yanks scroll.
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
      {/* Fixed plate stage. Decorative — all meaning lives in the content above it. */}
      <div className="mw-stage" aria-hidden="true">
        {CHAPTERS.map((c, i) => (
          <div
            key={c.id}
            ref={(el) => { sceneRefs.current[i] = el; }}
            className="mw-scene"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.plate} alt="" className="mw-scene__still" decoding="async" loading={i < 2 ? "eager" : "lazy"} />
          </div>
        ))}
        <div className="mw-scrim" />
      </div>

      {/* Route rail. Hover gated to fine pointers so a tap can't stick a hover. */}
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

      {/* The five doors, offered when the visitor is in the hub. */}
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

      <div className="mw-track">
        {CHAPTERS.map((c, i) => (
          <section
            key={c.id}
            id={c.id}
            ref={(el) => { trackRefs.current[i] = el; }}
            className="mw-chapter"
            style={{ minHeight: `${c.minScroll * 100}vh` }}
          >
            {sections[i]}
          </section>
        ))}
      </div>
    </div>
  );
}
