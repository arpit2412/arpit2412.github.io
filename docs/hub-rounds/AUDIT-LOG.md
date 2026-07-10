# Hub still — audit log

3 rounds, 12 credits (4 each). Gate: `design-auditor`, default REVISE.

| Round | Verdict | What it fixed | What it broke |
|---|---|---|---|
| r1 | REVISE | — | steel-blue 2nd hue (b−r ≈ +10); core = sci-fi reactor tube; 2 apertures were blind niches; blown-white voids |
| r2 | REVISE | hue (0 blue px); core → neural filament; doorways recede into rooms | **fatal: true left/right mirror** |
| r3 | REVISE (escalated) | **mirror broken** — off-axis corner view, depth ranking survives squint, left third clean for copy | only **4** apertures, not 5; core flat on wall, no shadow gap |

## Verified independently, not taken on trust
- r1 blue: sampled crops, `b−r ≈ +5..+10` on the right niches. Real.
- r3 aperture count: brightened 5x and counted — 4 hub arches (x≈440/555/740/1140). The 5th "arch" is a room interior seen *through* the big right arch. Auditor correct.
- A `mean|L − flip(L)|` mirror metric was tried and **discarded**: it scored the rejected r2 mirror (33.8) as *more* asymmetric than r3 (29.9). Luminance-dominated, structurally blind. Judge symmetry by eye.

## Auditor's cost advice (why not a 4th blind reroll)
r2→r3 shows rerolls fix one defect and break another. Prefer:
1. **Comp, ~0 credits** — composite one dim mid-depth arch into the empty left-centre wall; add a shadow gap + radial bloom behind the core to float it.
2. **img2img seeded on `hub-r3.png`, denoise ~0.35** — protects the corner geometry, the broken mirror, and the copy region.

A blind from-scratch reroll risks losing the one thing r3 finally got right.

## Ship ranking
r3 > r2 > r1. r3 is the only frame satisfying the non-negotiable "not symmetric" (§9.1).

## Round 4 — img2img, seeded on hub-r3.png (8 cr, 2 variants)

Not a blind reroll: `nano_banana_pro` image-to-image with r3 as `medias[role=image]`, so the
off-axis camera, broken mirror and copy region were protected while three edits were requested
(add a 5th aperture; lift the core off the wall; sphere not spiral).

| | apertures | core form | core suspended | verdict |
|---|---|---|---|---|
| r4a | **5** | pinwheel — spiral cliché lingers | halo, no gap | rejected |
| r4b | **5** | chaotic spherical tangle | halo, no gap | **PASS — SHIP** |

Auditor explicitly said **do not reroll**: the residual defects are grade/composite fixes, and any
reroll risks the five-aperture ranking img2img just secured.

## Post grade (0 credits) → `hub-final.png`

Black point only, no vignette. Measured:

| | left third | centre | right | lit px | blue px |
|---|---|---|---|---|---|
| r3 | 12.0 | 23.8 | 46.5 | 7880 | 0 |
| r4b | 16.7 | 31.2 | 54.9 | 10228 | 0 |
| **final** | **8.9** | 21.3 | 46.1 | 6661 | **0** |

Two grades were thrown away before this one:
- `curves=0/0 0.06/0.005 …` + vignette → crushed the whole frame (lit px 10228 → 1274).
- vignette at `x0=w*0.10` → darkens *away* from that point, so it crushed the RIGHT side to luma 0.3.
  A left-side vignette was never needed; r4b's left third was already darkest.

## Still open on the hub still
- The core has a halo but **no offset contact shadow**; it reads as a glowing object pooling light on
  the wall rather than fully suspended. A real composite, not a curve — deliberately not faked.
- Far-left IMPACT aperture reads shallow. Acceptable: it is the deepest/dimmest door by design.
