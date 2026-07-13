# Mind World — working directory

**All work on the scroll-scrubbed portfolio happens in this worktree and nowhere else.**

- `docs/mind-world-spec.pdf` — the spec. Concept, structure, measured costs, blockers, corrections.
- `docs/mind-world-spec.html` — source for the PDF. Edit here, re-render with:
  `google-chrome --headless --no-pdf-header-footer --print-to-pdf=docs/mind-world-spec.pdf docs/mind-world-spec.html`
- `docs/reference-scroll-world.mp4` — the actual demo video. Three sites, two photoreal.
  Watch it before proposing art direction.
- `docs/reference-frames-*.jpg` — contact sheets from that video.
- `components/world/scrubEngine.ts` — the forked scrub engine. Component-agnostic; survives the graph rewrite.

## Abandoned

Branch `world/latent-space-descent` in the *other* checkout (`~/Desktop/Resume/site`) was built against a
tree 5 commits behind `origin/master`. Its `ScrollWorld.tsx` wires `Publications.tsx` / `FilmsMarquee.tsx`,
which no longer exist. Do not merge it. Only `scrubEngine.ts` was salvaged, and it is now here.

## Blocked on

1. Higgsfield credits (workspace is `free`, `credits: 0`).
2. Full-body photos of Arpit, several angles, for Soul training.
3. A decision on the film footage (see spec §4, B3 — the studios own it).
