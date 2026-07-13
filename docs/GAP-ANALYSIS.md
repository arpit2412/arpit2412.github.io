# Why the local preview is "nowhere near" the reference

Measured, not asserted.

## Gap 1 — there is no video (this is 90% of it)

Reference (`docs/reference-scroll-world.mp4`), sampled at 4fps over 60s:

| metric | reference | our preview |
|---|---|---|
| frames with real inter-frame motion | **82%** (196/238) | **0%** |
| mean inter-frame motion | **23.7** | 0 |
| peak | 130.9 | 0 |

The reference's entire identity is a camera that never stops moving, driven by scroll.
Our preview crossfades eight static plates. The router, scrim and transparency were built
poster-first on purpose — cheap to get wrong at 472KB, expensive at ~50MB and 156 credits —
but the result is the skeleton, not the thing.

**Fix: in progress.** 12 clips at the probe-validated settings (pro, 8s, silent, cfg 0.75).

## Gap 2 — copy density is a genuine design conflict

The reference is a **landing page**: each scene carries a headline, one sentence and two
buttons — roughly 15-20 words. It can afford to leave 80% of the frame as moving image.

This is a **portfolio**: Research alone carries six research areas and a publication list;
Honors carries patents, a grant, awards and an 8-item news rail. That content is the point
("without losing any information"), and it cannot occupy the same viewport as a full-bleed
moving camera without burying it.

**This cannot be solved by tuning the scrim.** It needs a two-beat chapter:
1. a *cinematic beat* — full-bleed moving plate, verb + one line + a scroll cue, ~15 words;
2. a *content beat* — the dense section, on a settled frame, over a heavier scrim.

The camera moves during beat 1 and rests during beat 2. That is how a cinematic portfolio
differs from a cinematic landing page, and it is the structural change the reference cannot
tell us to make, because the reference never had to carry a publication list.

## Constraints discovered while generating

- **Plus caps at 6 concurrent generation jobs.** The 12 clips must run in two waves.
- `cinematic_studio_video_v2` genres: `auto, action, horror, comedy, western, suspense,
  intimate, spectacle`. There is no `epic`.
