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
