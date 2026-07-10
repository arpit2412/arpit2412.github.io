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
