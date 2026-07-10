# The v2 preview is broken. Do not generate clips against it.

Found by screenshotting the local build with headless Chrome — which I should have done
before telling Arpit to look at it. I did not. That is the root failure.

## Fixed
1. **`overflow-x-clip` on `<main>` clipped the fixed stage.** An ancestor with non-visible
   overflow clips `position: fixed` descendants: the stage painted cream over the hero
   (washing out "Arpit Garg" to near-invisible) and then disappeared further down, leaving
   the dark body. Moved the clip to `html`.
2. **`.mind-world` set the light tokens but never set `background`.** Nothing painted cream.
3. **The content beat had no legible surface.** Islands leave the LEFT THIRD empty, which is
   enough for a one-line lede and nowhere near enough for a publication list. Added an opaque
   cream panel with a gradient lead-in.

## NOT fixed — the blocker
Production build, real anchors, `serve out`:

| view | mean RGB | distinct pixels |
|---|---|---|
| `/` (hero) | (30,33,39) | 2893 — renders |
| `/#about` | (5,7,13) | **1** |
| `/#research` | (5,7,13) | **1** |
| `/#contact` | (5,7,13) | **1** |

A single flat `#05070d` fills the viewport. `--force-prefers-color-scheme=light` changes
nothing, so it is not the dark-mode pre-paint script. Confirmed present:
- `.mind-world{background:#efe7da}` in the built CSS
- 8 × `class="mw-chapter"` in the exported HTML
- `class="mind-world"` in the exported HTML

So the world SSRs and the rule exists, yet the viewport shows body background. Something
collapses the layout at scroll depth. **Unresolved.**

## The other problem: the islands are samey
Every island is i2i against the hero island. That is why the material, light, hue and gold
roots are consistent — and also why they all sit on the same clay dome, with the same trees,
in the same silhouette. It reads as one asset recoloured seven times.

The i2i chain bought consistency and cost variety. I was checking hue histograms and left-third
luma, and never asked whether the eight islands looked *different from each other*. A measurement
that always passes is not a measurement.

## Do not
- Do not generate the 12–15 clips (~180 cr) against this. Fix the layout first, then re-look.
