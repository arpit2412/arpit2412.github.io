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
