"use client";

import { useEffect, useRef } from "react";

/**
 * The ambient clay workshop behind the hero.
 *
 * Tiny figures slotting a GPU card into a rack, someone typing at a miniature laptop, papers
 * drifting, a chalkboard of equations — the same clay language as the islands below.
 *
 * This is a LOOPING clip, not a scrubbed one, so it plays linearly and the browser can use its
 * cheapest decode path. Three safeguards keep it from undoing the smoothness work:
 *
 *  1. It pauses the moment it leaves the viewport. A background video that keeps decoding while
 *     the visitor is eight chapters down is pure waste, and it competes with the island scrub
 *     for the same decoder pool.
 *  2. It pauses when the tab is hidden.
 *  3. Under `prefers-reduced-motion` the clip is never fetched at all — the poster still shows
 *     the workshop, so nothing is lost, it simply does not move.
 *
 * The poster is the clip's own first frame, so there is no flash on load and no layout shift.
 */
export default function HeroBackdrop() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    v.src = "/hero-bg.mp4";
    v.load();
    const play = () => { v.play().catch(() => {}); };

    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? play() : v.pause()),
      { threshold: 0.01 }
    );
    io.observe(v);

    const onVis = () => (document.hidden ? v.pause() : play());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      v.pause();
      v.removeAttribute("src");
      v.load();
    };
  }, []);

  return (
    <div className="hero-bg" aria-hidden>
      <video
        ref={ref}
        className="hero-bg__video"
        poster="/hero-bg.webp"
        muted
        loop
        playsInline
        preload="none"
      />
      <div className="hero-bg__veil" />
    </div>
  );
}
