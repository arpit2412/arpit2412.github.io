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
