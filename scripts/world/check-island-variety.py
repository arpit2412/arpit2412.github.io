#!/usr/bin/env python3
"""
Set-level variety gate for the island world.

Per-image checks (background hue, left-third luma) CANNOT see set-level redundancy --
worse, they pass *because* every island is the same object in the same light. This is the
check that would have caught "you used same image set".

Threshold each island against its own corner sample -> silhouette mask -> normalise the
mask's bbox to 256x256 -> pairwise IoU.

GATE: fail if any pair > 0.60, or median > 0.55.
Also reports normalised area spread (scale hierarchy) and aspect-ratio spread.
"""
import sys, glob, itertools, statistics
from PIL import Image
import numpy as np

def mask(path, n=256):
    """
    Silhouette, centred on an n x n canvas, scaled by its LONGEST side.

    An earlier version normalised each bbox to a square. That destroyed aspect ratio --
    the very thing distinguishing a wide server strip from a stepped wedge -- so two
    obviously different shapes both became "filled quadrilateral" and scored ~0.6 IoU.
    The metric was rewarding the redundancy it existed to catch, which is exactly the
    mistake that let the v2 set through. Scale by the longest side instead: aspect and
    relative proportion survive.
    """
    im = Image.open(path).convert("RGB").resize((512, 288))
    a = np.asarray(im).astype(int)
    bg = a[4, 4]                                   # its own cream corner
    d = np.abs(a - bg).sum(axis=2)
    m = d > 42                                     # island = anything unlike the background
    ys, xs = np.nonzero(m)
    if len(xs) == 0:
        return None, 0.0, 1.0
    area = m.sum() / m.size
    w = xs.max() - xs.min() + 1
    h = ys.max() - ys.min() + 1
    aspect = w / max(1, h)
    crop = Image.fromarray((m[ys.min():ys.max()+1, xs.min():xs.max()+1] * 255).astype("uint8"))
    k = n / max(w, h)                              # longest side -> n, aspect preserved
    crop = crop.resize((max(1, int(w * k)), max(1, int(h * k))))
    canvas = Image.new("L", (n, n), 0)
    canvas.paste(crop, ((n - crop.width) // 2, (n - crop.height) // 2))
    return np.asarray(canvas) > 127, area, aspect

def iou(a, b):
    return (a & b).sum() / max(1, (a | b).sum())

args = sys.argv[1:]
paths = sorted(args) if args else sorted(glob.glob("public/world/v3/island-*.png"))
names = [p.split("island-")[-1].replace(".png", "") for p in paths]
masks, areas, aspects = {}, {}, {}
for p, n in zip(paths, names):
    m, ar, asp = mask(p)
    masks[n], areas[n], aspects[n] = m, ar, asp

pairs = []
for a, b in itertools.combinations(names, 2):
    pairs.append((iou(masks[a], masks[b]), a, b))
pairs.sort(reverse=True)

print("  worst silhouette pairs (IoU):")
for v, a, b in pairs[:5]:
    flag = "  <-- FAIL" if v > 0.60 else ""
    print(f"    {a:9} <-> {b:9}  {v:.3f}{flag}")
med = statistics.median(v for v, _, _ in pairs)
worst = pairs[0][0]
print(f"\n  median IoU {med:.3f} (gate <= 0.55)   worst {worst:.3f} (gate <= 0.60)")

amax = max(areas.values())
print("\n  normalised island area (scale hierarchy):")
for n in names:
    print(f"    {n:9} {areas[n]/amax:.2f}   aspect {aspects[n]:.2f}")
spread = max(areas.values()) / max(1e-6, min(areas.values()))
print(f"\n  area spread (max/min) {spread:.2f}x  (want >= 2.0: the vault must read as smallest)")

ok = worst <= 0.60 and med <= 0.55
print(f"\n  VERDICT: {'PASS' if ok else 'FAIL'}")
sys.exit(0 if ok else 1)
