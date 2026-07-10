# Island clips — log

Settings (validated on the dark-chamber probe, re-validated on the island probe):
`cinematic_studio_video_v2`, `mode=pro`, `duration=8`, `sound=off`, `cfg_scale=0.8`,
`declined_preset_id` set (Higgsfield tries to substitute an "IN THE DARK" preset, which would
override the controlled dolly the probe exists to prove).

## Island probe — `977953b3` — PASS (12 cr)

The dark-chamber probe proved a dolly through rigid *stone*. Clay miniatures on flat cream are a
different physical problem, so the camera was re-validated on one clip before the other fourteen.

| check | result |
|---|---|
| zoom is a real push-in | island area **0.346 → 0.653**, **1.89x**, **monotonic** |
| clay rigidity | trees, buildings, roots, the figure — all hold. No warp, no drift, no spin |
| cream background | **(243,231,215)** on every sampled frame; never wavers |
| endpoint calm (connector start) | mean |diff| final frames **4.40** (dark probe was 3.09) |
| bitrate | **10.7 Mbps** (dark probe 13.2) — encodes down through the same ladder |
| tilt-shift | preserved; depth of field stays shallow |

The prompt that made it hold: state that the island **is a solid physical model** that does not
move, and enumerate what must not warp. Then allow exactly one tiny mechanical motion (lights
glow, core turns imperceptibly). Without that, generative video animates the *subject* rather than
the camera — the same failure as the thrashing filament core.

## Wave 1 — 6 dives (Plus caps at 6 concurrent)
journey `e77cf4fb` · question `d1c1a29a` · build `d6c44f8d` · create `4970ac8c` ·
explain `9503d66e` · impact `908886dc`

Per-island the only motion permitted is named explicitly: way-station lamps glow; a glint on the
telescope brass; rack lights blink in a travelling wave; **the split face on the cinema screen must
not blink, turn or come alive**; the brass lamp glows and the loose pages must not flutter; the
alcove lights glow and nothing else moves at all.

## Remaining
`next` dive, then 7 connectors (`start_image` = island N, `end_image` = island N+1).

## Wave 1 gated — 4 PASS, 3 FAIL

`scripts/world/check-dive.py` checks the three things that would sink the set:
the zoom is real and monotonic; the cream background never wavers (the model must not
invent sky); the final frames are calm, because that frame becomes a connector's `start_image`.

| clip | zoom | monotonic | bg drift | endpoint | Mbps | |
|---|---|---|---|---|---|---|
| explain | 2.12x | yes | 2 | 1.66 | 7.5 | PASS |
| impact | 2.09x | yes | 5 | 0.97 | 7.0 | PASS |
| hero | 1.89x | yes | 1 | 4.40 | 10.7 | PASS |
| create | 1.42x | yes | 3 | 2.29 | 9.2 | PASS |
| question | 1.13x | **no** | 1 | 0.64 | 6.8 | FAIL |
| journey | 1.12x | yes | 3 | 1.08 | 8.1 | FAIL |
| build | **0.97x** | **no** | 5 | 1.90 | 9.4 | FAIL |

**`build` scored 0.97x — the camera pulled BACK.** Not a weak push-in; the wrong direction
entirely. `question` and `journey` crept forward at ~1.1x and would have read as a static image.

The failure mode: "moves slowly and steadily forward" is a *description*, and the model treats
it as a suggestion. The reroll states a **measurable target** — "by the final frame the island
must fill roughly TWICE the frame area it filled in the first" — plus an explicit prohibition:
"must NEVER pull back, retreat, dolly out, zoom out"; "strictly monotonic: every frame is closer
than the one before."

Bitrates all 6.8–10.7 Mbps, below the dark-chamber probe's 13.2. The encode ladder takes these
to ~3 MB each.

## Wave 2
build `885443f7` · journey `f575d8a4` · question `8b24430b` (rerolls) · next `fbae1df5` (new)

## No connectors — the reference dissolves, it doesn't fly

Measured across an island change in `reference-scroll-world.mp4` (3.0s → 4.0s, 8fps):
inter-frame diffs spike to **42.0** and **34.1**. A continuous camera flight between worlds would
show smooth small diffs throughout. That is a dissolve signature.

**Seven connectors were therefore never generated. 84 credits saved**, and the hardest shot type
(each connector's `start_image` must be the previous clip's actual last frame) is eliminated. The
engine's crossfade is exactly what the reference does.

## `build` — three clip rerolls chased a symptom; the defect was in the PLATE

| attempt | zoom | mono | endpoint | Mbps | |
|---|---|---|---|---|---|
| v1 | 0.97x | no | 1.90 | 9.4 | camera pulled BACK |
| v2 (measurable target) | 1.19x | no | 20.21 | 12.7 | wild endpoint |
| v3 (steady lights) | 0.98x | no | 8.25 | 10.0 | still backwards |

Steady lights fixed the endpoint (20.21 → 8.25) and the bitrate (12.7 → 10.0) — the "travelling
wave" of blinking lights I asked for was a large inter-frame change.

But the zoom kept reading ~1.0x. **The plate's background was a gradient** (background luma spread
**13.7**, and the strip covered 59% of the frame), so "anything unlike the background" matched most
of the frame and the area-based zoom metric was meaningless. Regenerated the plate with a flat
background and a strip clear of the frame edges: spread **13.7 → 2.0**, background fraction
0.41 → 0.84.

Also: Higgsfield twice tried to substitute presets — **"IN THE DARK"**, and once **"Earth zoom
out"**, which is literally the opposite of a push-in. Both declined explicitly. This is a plausible
contributor to the backwards camera.

## New gate: `scripts/world/check-plate-flat.py`
A non-flat plate makes every downstream measurement lie. Two versions of this gate were wrong
before it worked: sampling fixed corners reads the *island* on `hero` (bottom-right is its roots),
giving a nonsense variation of 94. It now finds the background by modal colour and measures the
luma spread of background pixels only. Gate: spread ≤ 14. All eight plates pass.
