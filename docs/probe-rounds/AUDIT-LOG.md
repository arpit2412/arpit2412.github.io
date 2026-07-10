# Motion probe — audit log

The probe exists to validate the camera on ONE 12-credit clip before ~156 credits of clips
are committed at the same settings.

## v1 — `8f79a395` — REVISE

**Camera PASSED.** Genuine mounted dolly: five arches grow and separate with real geometric
parallax, right arch swings correctly toward frame edge, stone holds rigid in both normal and
5x-brightened sheets. No melting, morphing, breathing, or vanishing geometry — including in the
dark left arches where warping hides. That is what the probe was chartered to prove.

**The core FAILED.** Prompt said filaments "turn very slowly." They whipped, lashed and sprawled;
by frame 4-5 tendrils streamed past the halo and the sphere broke containment. Reads as a burning
tumbleweed, not a breathing mind. Note this is a *clip-level* defect, not a still-level one that
survived: the source plate `hub-r4b.png` is a calm, contained tangle. The animation introduced it.

Three consequences, one root cause:
1. The CTA (§9.3) becomes a distraction.
2. The core inflates under its own power (~22% → ~42% of frame width) while the right arch grows
   far less — betraying it as a self-animating layer rather than an object in space.
3. The **last frame is peak chaos**. That frame becomes a connector's start frame and gets scrubbed
   slowly in both directions. The endpoint must be the calmest state, not the wildest.

## Bitrate: content-driven, not encode-driven

14.7 MB / 8.04s ≈ **14.6 Mbps**. The auditor measured per-frame packets swinging **45 KB → 197 KB**,
spiking exactly on the core's wildest frames, with a single keyframe — so the cost is inter-frame
residuals from thousands of thin bright filaments changing shape, not GOP structure.

`-crf`/`-preset` buys maybe 15-25%; the motion stays expensive. **Calming the core fixes the weight.**
Thirteen clips at this rate ≈ 190 MB of video on a portfolio page — a problem baked in at generation
time, not at encode time.

## v2 — `d8e001f5` — core-only delta, camera clauses untouched

Added: fixed contained sphere; filaments rotate "almost imperceptibly, like a slow-breathing brain";
explicit ban on whip/lash/flail/sprawl/tendrils/sparks/embers/fire; silhouette and radius constant so
it grows ONLY from camera proximity; **final frame must be settled and stable, not mid-motion**;
haze "barely drifts". `cfg_scale` 0.65 → 0.75 to tighten prompt adherence.

Also: declined Higgsfield's "IN THE DARK" preset substitution on both runs — a canned preset would
override the exact controlled dolly the probe exists to test.

## v2 — `d8e001f5` — ACCEPTED as probe

Core-only delta. Camera clauses untouched. `cfg_scale` 0.65 → 0.75.

| | v1 | v2 |
|---|---|---|
| endpoint motion (mean abs diff, last frames) | 9.32 | **3.09** |
| packet swing (excl. keyframe) | 2.9x | 2.4x |
| source bitrate | 14.6 Mbps | 13.2 Mbps |

Endpoint is 3x calmer — that is what a connector's start frame needs. Core is contained through
most of the clip, though a few tendrils still escape in the final frames. Accepted: this is a probe,
not a shipped asset. The real hub dive is regenerated during the build.

## BOTH bitrate predictions were wrong — corrected by measurement

The auditor predicted (a) calming the core would collapse the bitrate, and (b) re-encoding would buy
only 15-25%. **Both were backwards.**

- Calming the core: 14.6 → 13.2 Mbps. **Only ~10%.**
- Re-encoding, measured ladder from the v2 source (12.6 MB):

| variant | size | Mbps |
|---|---|---|
| 1920 crf20 g8 slower | 5.3 MB | 5.6 |
| **1600 crf22 g8 slower** | **2.9 MB** | **3.1** |
| 1440 crf23 g8 slower | 2.2 MB | 2.3 |
| 854 crf26 g4 slower (mobile) | 0.9 MB | 1.0 |

**~58% reduction**, not 15-25%. The weight was never the filaments — Higgsfield simply returns a fat
delivery encode. `-g 8` costs bits but is what makes scroll-seeking cheap (pipeline.md).

Ship settings: **1600/crf22/g8** desktop, **854/crf26/g4** mobile.
13 clips project to ~38 MB desktop + ~12 MB mobile, not the feared ~190 MB.

## Probe verdict
Camera: **PASS.** Settings: **validated.** Encode budget: **solved.**
Cleared to commit the remaining generation.
