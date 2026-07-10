"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CHAPTERS, DOORS, HUB_ID } from "./mindWorld";

/**
 * The miniature world stage.
 *
 * Scroll drives `video.currentTime` on each island's push-in clip. The zoom lives INSIDE the
 * clip — a real camera on a dolly, with real parallax and light — not a CSS `scale()` on a
 * still. Because the background is flat empty cream there is no page edge and no parallax cue,
 * so it reads as a world approaching rather than a page moving. That is the reference's
 * mechanic (82% of its frames carry real motion; a CSS zoom on a still carries none).
 *
 * Islands DISSOLVE into one another rather than fly. Measured from the reference: inter-frame
 * difference spikes to 42 and 34 at each island change, which is a dissolve signature. A
 * continuous flight would show smooth small diffs. So there are no connector clips — the
 * crossfade here is what the reference actually does.
 *
 * Playback notes, learned the hard way on the v1 engine:
 *  - Clips load as Blobs, so seeking never depends on HTTP byte-range support.
 *  - Never queue a seek while the decoder is still `seeking` — on a phone a fast flick would
 *    otherwise pile up seeks and freeze the clip.
 *  - Smoothing is dt-normalised. A fixed per-rAF lerp converges twice as fast at 120Hz.
 *    Kept a lerp, not a spring: spring overshoot on a media seek scrubs past the target frame
 *    and visibly rewinds.
 *  - iOS will not paint a muted video before a user gesture; prime on first touch.
 *  - Under `prefers-reduced-motion` no clip is ever fetched. The poster stays and cross-fades.
 */

const K60 = 0.18;                     // smoothing, expressed at 60fps (~85ms time constant)
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const smooth = (x: number) => { const t = clamp(x); return t * t * (3 - 2 * t); };

type Scene = {
  el: HTMLDivElement;
  track: HTMLElement;
  video: HTMLVideoElement | null;
  loading: boolean;
  ready: boolean;
  cur: number;
  target: number;
  top: number;
  height: number;
};

export default function MindWorld({ sections }: { sections: ReactNode[] }) {
  const trackRefs = useRef<(HTMLElement | null)[]>([]);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ledeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [atHub, setAtHub] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const smallMQ = window.matchMedia("(max-width: 860px)");
    const isMobile = () => coarse || smallMQ.matches;

    const scenes: Scene[] = [];
    CHAPTERS.forEach((_, i) => {
      const el = sceneRefs.current[i];
      const track = trackRefs.current[i];
      if (el && track) {
        scenes.push({ el, track, video: null, loading: false, ready: false, cur: 0, target: 0, top: 0, height: 1 });
      }
    });
    if (!scenes.length) return;

    let raf = 0, last = 0, ticking = false, userReady = false, destroyed = false;
    let laidOutWidth = window.innerWidth;

    const measure = () => {
      laidOutWidth = window.innerWidth;
      const pageTop = window.scrollY;
      scenes.forEach((s) => {
        const r = s.track.getBoundingClientRect();
        s.top = r.top + pageTop;
        s.height = Math.max(1, r.height);
      });
      read();
    };

    const loadClip = (s: Scene, i: number) => {
      if (reduce || s.loading) return;
      const c = CHAPTERS[i];
      const url = isMobile() && c.clipMobile ? c.clipMobile : c.clip;
      if (!url) return;
      s.loading = true;
      fetch(url)
        .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(String(r.status)))))
        .then((blob) => {
          if (destroyed) return;
          const v = document.createElement("video");
          v.className = "mw-scene__video";
          v.muted = true; v.playsInline = true; v.preload = "auto";
          v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
          v.src = URL.createObjectURL(blob);
          v.addEventListener("loadedmetadata", () => { s.ready = true; read(); });
          // Reveal only once a real frame has painted: on iOS a seeked-but-never-played muted
          // video stays blank, so hiding the poster on metadata alone flashes empty.
          v.addEventListener("seeked", () => s.el.classList.add("has-clip"), { once: true });
          v.addEventListener("loadeddata", () => { try { v.pause(); } catch {} if (userReady) prime(v); });
          s.el.appendChild(v);
          s.video = v;
        })
        .catch(() => { s.loading = false; });   // a missing clip is not fatal: the poster stays
    };

    const read = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      let front = 0;
      for (let i = 0; i < scenes.length; i++) if (y >= scenes[i].top - vh * 0.5) front = i;

      scenes.forEach((s, i) => {
        if (y > s.top - 1.6 * vh && y < s.top + s.height + 1.6 * vh) loadClip(s, i);

        // p: 0 at the chapter's start, 1 at its end. This is the camera's position on its dolly.
        const p = clamp((y - s.top + vh * 0.5) / s.height, 0, 1);
        s.target = p;

        const op = reduce ? (i === front ? 1 : 0) : Math.min(smooth(p / 0.12), smooth((1 - p) / 0.12));
        s.el.style.opacity = String(op);
        s.el.style.zIndex = i === front ? "2" : "1";

        // Copy is legible only while the island is still small; it leaves as the zoom bites.
        const lede = ledeRefs.current[i];
        if (lede) {
          const l = reduce ? (i === front ? 1 : 0) : smooth(p / 0.08) * smooth((0.42 - p) / 0.14);
          lede.style.opacity = String(clamp(l));
          if (!reduce) lede.style.transform = `translate3d(0, ${(-p * 40).toFixed(1)}px, 0)`;
        }
      });

      if (front !== active) setActive(front);
      setAtHub(CHAPTERS[front]?.id === HUB_ID);
      ticking = false;
    };

    const frame = (now: number) => {
      const dt = last ? Math.min(now - last, 64) : 16.667;
      last = now;
      const k = 1 - Math.pow(1 - K60, dt / 16.667);   // solve the 60fps constant for real dt
      const eps = isMobile() ? 0.02 : 0.008;

      for (const s of scenes) {
        const v = s.video;
        if (!v || !s.ready || v.seeking) continue;     // never queue a seek mid-decode
        if (Math.abs(s.cur - s.target) < 0.0005) continue;
        s.cur += (s.target - s.cur) * k;
        const t = clamp(s.cur, 0, 0.999) * (v.duration || 1);
        if (Math.abs(v.currentTime - t) > eps) { try { v.currentTime = t; } catch {} }
      }
      raf = requestAnimationFrame(frame);
    };

    const prime = (v: HTMLVideoElement) => {
      if (!isMobile() || !v) return;
      try { const p = v.play(); if (p?.then) p.then(() => { try { v.pause(); } catch {} }).catch(() => {}); } catch {}
    };
    const onFirstGesture = () => {
      if (userReady) return;
      userReady = true;
      scenes.forEach((s) => s.video && prime(s.video));
    };

    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(read); } };
    // Mobile fires resize when the URL bar slides; re-measuring there yanks scroll position.
    const onResize = () => { if (coarse && window.innerWidth === laidOutWidth) return; measure(); };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", measure);
    window.addEventListener("pointerdown", onFirstGesture, { once: true, passive: true });
    window.addEventListener("touchstart", onFirstGesture, { once: true, passive: true });
    const ro = new ResizeObserver(() => measure());
    scenes.forEach((s) => ro.observe(s.track));
    measure();
    if (!reduce) raf = requestAnimationFrame(frame);

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", measure);
      scenes.forEach((s) => { if (s.video) { URL.revokeObjectURL(s.video.src); s.video.remove(); } });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const jumpTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="mind-world">
      <div className="mw-stage" aria-hidden="true">
        {CHAPTERS.map((c, i) => (
          <div key={c.id} ref={(el) => { sceneRefs.current[i] = el; }} className="mw-scene">
            {/* Poster: the first frame. Also the permanent image under reduced motion. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.island} alt="" className="mw-scene__img" decoding="async" loading={i < 2 ? "eager" : "lazy"} />
          </div>
        ))}
      </div>

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
          <button key={c.id} type="button" onClick={() => jumpTo(c.id)}
            className={`mw-route__dot${i === active ? " is-active" : ""}`}
            aria-label={c.noun} aria-current={i === active ? "true" : undefined}>
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

      <div className="mw-track">
        {CHAPTERS.map((c, i) => (
          <section key={c.id} id={c.id} ref={(el) => { trackRefs.current[i] = el; }}
            className="mw-chapter" style={{ minHeight: `${c.scroll * 100}vh` }}>
            <div className="mw-chapter__spacer" />
            <div className="mw-chapter__content">{sections[i]}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
