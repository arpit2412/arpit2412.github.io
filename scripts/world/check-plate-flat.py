#!/usr/bin/env python3
"""
Background flatness gate for an island plate.

Why: `build`'s plate had a shaded backdrop. A non-flat background means "anything unlike the
corner" matches most of the frame, so the dive gate's zoom metric becomes meaningless -- three
clip rerolls chased a symptom while the defect sat in the plate. And a flat empty background is
what kills the sense of scrolling; it is not decoration.

Two earlier versions of this gate were wrong:
  v1 sampled fixed corners -> on `hero` the bottom-right corner IS the island's roots, giving a
     nonsense variation of 94.
  So: identify the background by its MODE colour, keep only pixels near that mode, and measure
     how much those background pixels vary from top of frame to bottom.

GATE: background luma spread (p90 - p10 across background pixels) <= 14.
"""
import sys
import numpy as np
from PIL import Image

def bg_spread(path):
    a = np.asarray(Image.open(path).convert("RGB").resize((480, 270))).astype(int)
    flat = a.reshape(-1, 3)
    # modal colour, quantised — the background is by far the most common colour
    q = (flat // 8) * 8
    uniq, counts = np.unique(q, axis=0, return_counts=True)
    mode = uniq[counts.argmax()]
    d = np.abs(flat - mode).sum(1)
    bg = flat[d < 30]                      # background pixels only; island excluded
    if len(bg) < 500:
        return None, None, 0
    lum = bg.sum(1) / 3
    return tuple(mode), float(np.percentile(lum, 90) - np.percentile(lum, 10)), len(bg) / len(flat)

fails = 0
print(f"  {'plate':12} {'bg mode':>18} {'spread':>8} {'bg frac':>8}")
for p in sorted(sys.argv[1:]):
    mode, spread, frac = bg_spread(p)
    name = p.split("island-")[-1].replace(".png", "")
    if mode is None:
        print(f"  {name:12} {'no background found':>18}"); fails += 1; continue
    ok = spread <= 14
    if not ok: fails += 1
    print(f"  {name:12} {str(mode):>18} {spread:8.1f} {frac:8.2f}  {'PASS' if ok else 'FAIL — gradient'}")
print(f"\n  {'ALL FLAT' if fails==0 else str(fails)+' NOT FLAT'}   gate: background luma spread <= 14")
sys.exit(1 if fails else 0)
