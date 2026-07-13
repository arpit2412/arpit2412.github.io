# Corrected: the layout is fine. The islands are not.

## 1. The "black page" was MY MEASUREMENT, not the site

I reported that `/#research` rendered a single flat `#05070d` pixel and called the build broken.
That was wrong, and I told Arpit it was broken on the strength of it.

Chrome's one-shot `--screenshot` on a URL *fragment*, for a page taller than the viewport,
captures only the root `<html>` canvas — never the scrolled content. The canvas is `#05070d`
because `themeInit` in `app/layout.tsx` puts `.dark` on `<html>` pre-paint. `--force-prefers-
color-scheme=light` did nothing because the theme is a **class**, not a media query.

Proof it is the harness:
- A trivial 5-section control page with `#research{background:#c0ffee}` screenshots as
  **1 distinct pixel (5,7,13)** under the same flags.
- ~15 CSS overrides (`.mind-world{background:magenta}`, hiding the stage, `position:absolute`,
  `overflow:visible`) all still produced exactly 1 pixel. A real CSS bug would move under one.
- An injected `position:fixed` magenta banner never appeared — the scrolled frame is not painted.
- `--print-to-pdf`: **24 of 25 pages render cream (239,231,218)** with the rail and text visible.
  Only page 1 (the hero) is dark, correctly.
- Computed styles at scrollY≈6878: `.mind-world` background `rgb(239,231,218)`, height 21318px,
  no clipping ancestor.

**Valid capture methods**: `--print-to-pdf`; or CDP `scrollIntoView` → `Page.captureScreenshot`;
or neutralize `vh` and use a window tall enough that no scroll is needed.

The three bugs I *did* fix were real and are fixed: `overflow-x-clip` on `<main>` clipping the
fixed stage (this is what washed the hero text out — Arpit's "text not visible"), `.mind-world`
setting tokens but no `background`, and the content beat having no opaque surface.

## 2. The islands ARE broken — quantified

Audited as a SET for the first time. Arpit's "you used same image set" is empirically correct.

- **Mean pairwise silhouette IoU 0.696.** Genuinely different shapes land near 0.4–0.5.
  Worst pairs: build↔create **0.86**, build↔explain **0.86**, create↔explain 0.83.
  The set is really *two* shapes: `journey` (IoU 0.46–0.52 vs all) and "the dome" ×7.
- **No scale hierarchy.** Five core islands sit within a **6% area spread**. The vault was meant
  to be the smallest (it's 0.69 of the largest); the journey survived (0.57).
- **Repeated furniture**: the same blob tree in 6/8, the identical faceless clay figure in 5/8,
  the same cobble path in ~5/8, gold roots in ~5/8. **The gold yarn-ball core is the literally
  identical asset in `hero` and `next`.**
- **Four islands are the same object**: a roofless clay room-box on a dome (question, build,
  create, explain). At 200px grayscale, build↔explain correlate 0.83. Research and Writing are
  the same picture.

### Mechanism
Every island was generated i2i **from the finished hero island**. That propagated *geometry* —
dome, funnel, trees, figure, core — not just material. **The consistency source was also the
geometry source.** Fixable prompting error, not an inherent tradeoff: carry style through a text
style-token (or a material-only reference) and drive silhouette, camera, scale and content from
text per island.

### The check that would have caught it
Per-image checks (background RGB, left-third luma) *cannot* see set-level redundancy — worse,
they pass **because** everything is the same object in the same light. The checks rewarded the
redundancy.

Added `scripts/world/check-island-variety.py`: threshold each island against its own corner →
silhouette mask → normalize bbox to 256×256 → pairwise IoU.
**Gate: fail if any pair > 0.60, or median > 0.55.** This set: worst 0.86, mean 0.70 — fails hard.

## 3. Regeneration plan (24 cr)
Keep `hero` (the establishing hub, allowed to be the reference disc) and `journey` (proof the
pipeline can vary). Regenerate six with distinct silhouette / camera / scale:

| island | new silhouette | camera |
|---|---|---|
| question | tall thin observatory spire, telescope piercing up | lower, tilted up ~20° |
| build | wide low server-gantry hall, aspect ≥1.7 | pulled back, ~50° top-down |
| create | asymmetric stepped amphitheatre wedge, one big tilted screen | near, seat level |
| explain | open-book island (two sloping page-planes) or leaning book tower | closer |
| impact | tight hexagonal vault on a tall narrow pedestal, ~0.35–0.40 occupancy | pulled back so the small scale reads |
| next | broken fragment island, torn irregular edge, half bare cream | wide, lots of empty ground |

Also: vary tree species per island, remove the clay figure from at least half, and remove the
duplicated gold core from `next`. Gate the regenerated set through the IoU check **before**
spending connector credits.
