/**
 * scrubEngine — scroll-driven video scrubbing.
 *
 * Forked from scroll-world's `mountScrollWorld` (MIT, oso95/scroll-world). We keep the
 * parts that are hard to get right — Blob loading so seeking never depends on HTTP
 * byte-range, seek coalescing so a fast flick can't pile up decodes, iOS gesture
 * priming, linger remapping — and drop its DOM/copy layer entirely. Upstream renders
 * six short copy blocks over a fixed stage; this site has full-length content sections,
 * so React owns the DOM and the engine only owns `video.currentTime`.
 *
 * Two deliberate divergences from upstream:
 *
 *  1. dt-normalised smoothing. Upstream does `cur += (target - cur) * 0.18` once per
 *     rAF, which converges twice as fast on a 120Hz display as on 60Hz. We solve the
 *     same exponential for the actual frame delta so the feel is refresh-rate
 *     independent. Kept as a lerp, NOT a spring: a spring can overshoot, and an
 *     overshoot on a media seek scrubs past the target frame and visibly rewinds.
 *
 *  2. Offsets are cached and recomputed on resize/ResizeObserver, never measured in
 *     the scroll handler. Reading getBoundingClientRect() per frame would thrash
 *     layout against the video decoder.
 */

export type SegmentSpec = {
  /** The in-flow element whose scroll range drives this clip. */
  track: HTMLElement;
  /** The fixed, full-viewport layer this clip paints into. */
  scene: HTMLElement;
  clip: string;
  clipMobile?: string;
  /** Remaps scroll→time so the camera settles mid-scene. 0 = linear. Keep <= 0.6. */
  linger?: number;
};

type Segment = SegmentSpec & {
  video: HTMLVideoElement | null;
  loading: boolean;
  ready: boolean;
  primed: boolean;
  cur: number;
  target: number;
  top: number;
  height: number;
};

/** Smoothing constant, expressed at 60fps. ~85ms time constant. */
const K60 = 0.18;
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const smooth = (x: number) => { const t = clamp(x); return t * t * (3 - 2 * t); };
/** Seam dissolve width, in viewport heights. Narrow beats wide: a short ghost < a long one. */
const CROSSFADE = 0.1;

/** Monotone remap: slower mid-scene (where the copy peaks), quicker at the seams. */
function lingerEase(x: number, L: number) {
  const c = x - 0.5;
  return (1 - L) * x + L * (4 * c * c * c + 0.5);
}

export type ScrubEngine = {
  destroy: () => void;
  /** 0..1 progress of each segment, for React to drive nav/route state. */
  onProgress: (cb: (index: number, progress: number) => void) => void;
};

export function createScrubEngine(specs: SegmentSpec[]): ScrubEngine {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  const smallMQ = window.matchMedia("(max-width: 860px)");
  const isMobile = () => coarse || smallMQ.matches;

  const segs: Segment[] = specs.map((s) => ({
    ...s,
    video: null,
    loading: false,
    ready: false,
    primed: false,
    cur: 0,
    target: 0,
    top: 0,
    height: 1,
  }));

  let progressCb: (i: number, p: number) => void = () => {};
  let raf = 0;
  let last = 0;
  let ticking = false;
  let userReady = false;
  let destroyed = false;
  let laidOutWidth = window.innerWidth;

  function measure() {
    laidOutWidth = window.innerWidth;
    const pageTop = window.scrollY || window.pageYOffset;
    for (const s of segs) {
      const r = s.track.getBoundingClientRect();
      s.top = r.top + pageTop;
      s.height = Math.max(1, r.height);
    }
    read();
  }

  function loadClip(s: Segment) {
    // Under reduced motion we never fetch the clips at all — the <img> poster the
    // component already rendered simply stays up. No decode cost, no moving background.
    if (reduce || s.loading || !s.clip) return;
    s.loading = true;
    const url = isMobile() && s.clipMobile ? s.clipMobile : s.clip;
    fetch(url)
      .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(String(r.status)))))
      .then((blob) => {
        if (destroyed) return;
        const v = document.createElement("video");
        v.className = "world-scene__video";
        v.muted = true;
        v.playsInline = true;
        v.preload = "auto";
        v.setAttribute("muted", "");
        v.setAttribute("playsinline", "");
        v.src = URL.createObjectURL(blob);
        v.addEventListener("loadedmetadata", () => {
          s.ready = true;
          read();
        });
        // Reveal only once a real frame has painted. On iOS a seeked-but-never-played
        // muted video stays blank, so hiding the poster on metadata alone flashes empty.
        v.addEventListener("seeked", () => s.scene.classList.add("has-clip"), { once: true });
        v.addEventListener("loadeddata", () => {
          try {
            v.pause();
          } catch {}
          if (userReady) prime(v);
        });
        s.scene.appendChild(v);
        s.video = v;
      })
      .catch(() => {
        // A missing clip is not fatal: the poster stays, the section still reads.
        s.loading = false;
      });
  }

  function read() {
    const y = window.scrollY || window.pageYOffset;
    const vh = window.innerHeight;
    const fade = CROSSFADE * vh;
    // The frontmost segment: the last one whose range we have entered.
    let front = 0;
    for (let i = 0; i < segs.length; i++) if (y >= segs[i].top) front = i;

    for (let i = 0; i < segs.length; i++) {
      const s = segs[i];
      // Preload a viewport ahead/behind so the clip is decoded before it is seen.
      if (y > s.top - 1.6 * vh && y < s.top + s.height + 1.6 * vh) loadClip(s);
      // Progress across the segment's own scroll range, referenced to viewport centre.
      const local = clamp((y + vh * 0.5 - s.top) / s.height, 0, 1);
      s.target = s.linger ? lingerEase(local, clamp(s.linger)) : local;
      progressCb(i, local);

      // Seam dissolve. Two live video frames overlapping read as a ghost, so we blur
      // the pair for the width of the crossfade — a short blur is a cleaner mask than
      // a longer fade. Blur stays under 4px; it is a one-shot at the seam, never
      // scroll-bound per frame beyond this dissolve, and Safari pays dearly above ~20px.
      let outside = 0;
      if (y < s.top) outside = s.top - y;
      else if (y > s.top + s.height) outside = y - (s.top + s.height);
      const op = smooth(1 - outside / fade);
      s.scene.style.opacity = String(op);
      s.scene.style.zIndex = i === front ? "3" : String(1 + Math.round(op));
      s.scene.style.filter = op > 0.995 || reduce ? "none" : `blur(${(3 * (1 - op)).toFixed(2)}px)`;
      // Under reduced motion no clip is ever fetched, so the poster <img> the component
      // rendered is what stays on screen: the scene becomes a static chapter still that
      // cross-dissolves. No scrub, no moving background, no rAF loop.
    }
    ticking = false;
  }

  function frame(now: number) {
    const dt = last ? Math.min(now - last, 64) : 16.667;
    last = now;
    // Solve the 60fps-tuned exponential for the real frame delta.
    const k = 1 - Math.pow(1 - K60, dt / 16.667);
    const eps = isMobile() ? 0.02 : 0.008;

    for (const s of segs) {
      const v = s.video;
      if (!v || !s.ready) continue;
      // Never queue a seek while the decoder is still resolving the last one.
      if (v.seeking) continue;
      if (Math.abs(s.cur - s.target) < 0.0005) continue;
      s.cur += (s.target - s.cur) * k;
      const t = clamp(s.cur, 0, 0.999) * (v.duration || 1);
      if (Math.abs(v.currentTime - t) > eps) {
        try {
          v.currentTime = t;
        } catch {}
      }
    }
    raf = requestAnimationFrame(frame);
  }

  // iOS will not decode/paint a muted video before a user gesture.
  function prime(v: HTMLVideoElement) {
    if (!isMobile() || !v) return;
    try {
      const p = v.play();
      if (p && p.then) p.then(() => { try { v.pause(); } catch {} }).catch(() => {});
    } catch {}
  }
  function onFirstGesture() {
    if (userReady) return;
    userReady = true;
    for (const s of segs) if (s.video) prime(s.video);
  }

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(read);
    }
  };
  // Mobile browsers fire resize whenever the URL bar slides. Re-measuring there yanks
  // the scroll position, so on touch we only relayout when the width actually changes.
  const onResize = () => {
    if (coarse && window.innerWidth === laidOutWidth) return;
    measure();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  window.addEventListener("orientationchange", measure);
  window.addEventListener("pointerdown", onFirstGesture, { once: true, passive: true });
  window.addEventListener("touchstart", onFirstGesture, { once: true, passive: true });

  // Content sections grow when fonts load or images decode; keep offsets truthful.
  const ro = new ResizeObserver(() => measure());
  for (const s of segs) ro.observe(s.track);

  measure();
  if (!reduce) raf = requestAnimationFrame(frame);

  return {
    onProgress(cb) {
      progressCb = cb;
    },
    destroy() {
      destroyed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", measure);
      for (const s of segs) {
        if (s.video) {
          URL.revokeObjectURL(s.video.src);
          s.video.remove();
        }
      }
    },
  };
}
