# Final audit — design-auditor, on the rendered page

Run against the finished build, **by rendering it**, not by reading markup. The previous round I
told Arpit to look at a page I had never looked at myself; that is the failure this run exists to
prevent.

## What it caught

1. **Lede text ghosting over the content cards — critical, and worst on mobile.**
   `.mw-ledes` was `z-index: 20`; `.mw-track` (the opaque cream content panel) was `10`. The panel
   could never cover a lede. Measured on a 390x844 phone scrolling into Research: the verb
   "Question" sat at **69%, then 34%, then 6% opacity while the cards were fully in view**, painting
   straight over "Efficient Training & PEFT". Same on Engineering ("Build" over the Frontier-Scale
   card). On desktop it was faint (~6.6%) and I would never have noticed.

   **This is the exact "text not visible" class of failure that got the last two attempts rejected.**
   Fixed: `.mw-ledes { z-index: 5 }` — above the island stage, below the content.

2. **`scale: 0` entrance on the hero accent dot** (`Hero.tsx:146`). STANDARDS.md: *"Never `scale(0)`.
   Start from `scale(0.9–0.97)` + `opacity: 0`."* A period popping from literal nothing is the tell.
   Fixed to `scale: 0.6`.

3. **Nav wordmark washed out.** `body:has(.mind-world) header` recoloured the nav bar to cream but
   left "Arpit Garg." its themed light colour — illegible grey on cream. Fixed.

4. **Framer `x`/`y`/`scale` shorthands** in `Reveal.tsx:22` and `Hero.tsx`. STANDARDS.md: these run
   on the main thread via rAF and are not hardware-accelerated. **Accepted, not fixed.** They are
   one-shot in-view reveals, not scroll-scrubbed, and not under decode load. The auditor rated this
   low severity. Recorded rather than churned.

## What it verified as solid (by rendering)

Hero intact, not washed out by the fixed stage. Cream world genuinely paints, with real tilt-shift
clay dioramas. All eight sections survive and are legible dark-on-cream. Hub doors open at About.
Forcing `theme=dark` still renders cream with no dark-card leak. `prefers-reduced-motion` never
starts the rAF loop and never fetches a clip. Hover gated behind `@media (hover:hover) and
(pointer:fine)`. Scrub smoothing is dt-normalised (`k = 1 - (1-K60)^(dt/16.667)`).
`getBoundingClientRect()` lives in `measure()`, not the scroll handler. Route buttons carry
`aria-label`/`aria-current`; stage and ledes are `aria-hidden`; doors get `tabIndex -1` when closed.
**The verb never becomes a heading or an anchor** — the nouns own the ids, so Ctrl-F "Publications"
still works.

## Z-order, from the built CSS

| layer | z |
|---|---|
| `.mw-stage` (islands) | 0 |
| `.mw-ledes` (sparse copy) | 5 |
| `.mw-track` (content panel) | 10 |
| `.mw-route` (rail) | 40 |
