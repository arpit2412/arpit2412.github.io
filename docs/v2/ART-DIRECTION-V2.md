# Art direction v2 — the miniature world

## What I got wrong

Arpit: *"when it opens in hero there is a small world, when we scroll it zoomed into that world
only, so it doesn't give the effect of scrolling, and everything is 3D miniature form."*

He is describing the mechanic, not the skin. Measured from `docs/reference-scroll-world.mp4`:

| | reference | v1 (dark chambers) |
|---|---|---|
| background | **cream, RGB (208,197,181)–(234,217,202)** | near-black (14,5,6) |
| viewpoint | starts **OUTSIDE** a miniature, zooms in | already inside an interior, always |
| form | tilt-shift diorama, clay, stylised | photoreal stone |
| why no scroll feel | island centred on flat empty bg — no page edge, no parallax cue | full-bleed interior reads as a moving page |

The reference's opening 12s: a small diorama island on cream → camera zooms into it → new island
(the kitchen) → zoom in → new island (the shop) → zoom in. Copy sits left and **fades as the zoom
begins**. That is the two-beat chapter, and the reference already does it.

**I argued Arpit out of "Isometric Studio" early on, calling it too close to copying. That was
wrong. The miniature IS the idea, not the style.** An interior can never produce the effect,
because you can only zoom *into* something you can first see from outside.

## The corrected direction

- **Background: flat, empty, warm cream `#EFE7DA`.** Not dark. This is what kills the scroll feel.
- **Every chapter is a floating tilt-shift diorama island**, seen from outside first, small,
  occupying ~55% of frame height, with generous empty cream around it.
- **Scroll drives a continuous zoom into the island**, ending inside it.
- **Left third stays empty flat cream** for copy. Copy fades out as the zoom starts.
- Materials: soft clay, matte, rounded, soft global illumination, no harsh shadow.
- Palette: cream ground, pale stone, sage green, warm wood, a single gold `#D9A441` accent.
  No blue, no teal. (The one thing v1 got right, and it carries over.)
- Camera high and off-axis, ~35° down.

## Validated

`island-hero-r1.png` (`05297862`, 4 cr). Background corners RGB **(243,230,214)** — inside the
reference's range. Left third is the brightest region, i.e. genuinely empty. The island carries
Arpit's five worlds: study with a seated figure, server shed, cinema, library tower, vault,
around a gold filament core, with gold roots trailing below.

## Cost of the pivot

- **72 credits of v1 dive clips are superseded.** Six were rendering when the pivot landed
  (`411b63d9, cce3e205, 03ea4ba2, 63c8f7f1, db7ee66c, 9a98e3ed`). Sunk. Let them finish; do not
  wire them.
- The 8 dark plates (32 cr) are superseded too, but they are the reason the single-hue and
  copy-zone discipline is now proven, and the probe that validated the camera cost 24 cr and
  still holds — `pro`, 8s, silent, cfg 0.75, no preset. **The camera work transfers. The art
  does not.**
- Remaining: 8 island plates (32 cr) + 8 zoom clips + 7 connectors (180 cr) ≈ 212 cr.
  Balance at pivot: 1,048.

## Constraints found

- Plus caps at **6 concurrent generation jobs**.
- `cinematic_studio_video_v2` genres: auto, action, horror, comedy, western, suspense, intimate,
  spectacle. **No `epic`.**

## Islands generated (i2i against the hero island)

| island | bg corners | left third clear |
|---|---|---|
| hero (the mind) | (243,230,214) | yes |
| journey | (246,232,219) | yes |
| question | (248,231,219) | yes |
| build | (246,231,219) | yes |
| create | (244,229,217) | yes |

All inside the reference's cream range. Every island is i2i against the hero, so the clay
material, the tilt-shift, the gold roots and the single accent propagate — the same mechanism
that held zero-blue across the v1 dark plates.

Notable: **CREATE carried the split face onto the tiny cinema screen at miniature scale** —
wireframe left, photoreal right — without being re-prompted for it.

Decisions taken (Arpit delegated design calls):
- **A new island per chapter**, as the reference does. Not one world flown around.
- **The figure stays an anonymous clay person.** Making it read as Arpit drags the likeness
  problem back in; unnamed, it reads as *a mind* rather than a portrait.

---

# v3 — eight distinguishable worlds (24 cr)

## What changed
Stopped generating each island i2i from the finished hero. **The consistency source was also the
geometry source**, which is why the dome, funnel, trees, figure and gold core propagated as literal
assets. Style now travels through a *text style-token*; silhouette, camera, scale and content are
driven from text, per island.

Kept: `hero` (the establishing hub) and `journey` (the one island that already varied).
Regenerated six with distinct silhouette / camera / scale. `build` needed one reroll — it came
back at aspect 1.20 when 1.7+ was asked for.

| island | silhouette | area | aspect |
|---|---|---|---|
| build | wide thin server runway, flat underside | 1.00 | 1.78 |
| hero | the dome (reference disc) | 0.53 | 1.14 |
| create | asymmetric amphitheatre wedge, giant tilted screen | 0.52 | 1.26 |
| explain | open-book island, two sloping page-planes | 0.34 | 1.37 |
| journey | long thin winding road | 0.32 | 1.02 |
| next | torn fragment, jagged broken edge | 0.30 | 0.90 |
| question | tall thin observatory spire on a spike | 0.20 | 0.85 |
| impact | tight hexagonal vault on a slim pedestal | 0.20 | 0.64 |

## The gate (`scripts/world/check-island-variety.py`)

Pairwise silhouette IoU across the whole set. Per-image checks cannot see set-level redundancy —
they pass *because* everything is the same object in the same light.

| | median IoU | worst pair | area spread |
|---|---|---|---|
| v2 (rejected by Arpit) | **0.677** | 0.824 explain↔question | 1.77x |
| v3 | **0.316** | 0.560 create↔next | **5.13x** |
| gate | ≤ 0.55 | ≤ 0.60 | ≥ 2.0 |

v3 **PASSES**. v2 **FAILS hard** under the same metric — which is the validation the gate needed:
it rejects the set the human rejected.

### I had to fix the gate before trusting it
The first version normalised each silhouette's bbox to a square, destroying the aspect ratio that
distinguishes a wide server strip from a stepped wedge. Both became "filled quadrilateral" and
scored ~0.6. **The metric was rewarding the redundancy it existed to catch** — the same failure mode
as the background-hue check. Now it scales by the longest side, so aspect and proportion survive.

## Verification
Rendered via `--print-to-pdf` (the fragment-screenshot method is provably artifactual, see BROKEN.md):
25 pages, hero page mean RGB (28,31,37) dark and 8,920 distinct pixels; world pages mean (205,198,187)
cream. All 8 islands serve 200. Web weight 356 KB.
