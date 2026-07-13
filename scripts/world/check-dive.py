#!/usr/bin/env python3
"""
Gate for an island push-in clip.

  1. the zoom is REAL and monotonic (island area grows) -- not a fake or a drift
  2. the cream background never wavers (the model must not invent sky)
  3. endpoint motion -- INFORMATIONAL ONLY, no longer a gate.

On (3): endpoint calmness mattered only because a connector's `start_image` had to be the
previous clip's actual last frame. Connectors were eliminated after measuring the reference,
which DISSOLVES between islands (inter-frame diffs spike to 42/34) rather than flying. Scrubbing
is position-based and never plays past the end, so end-of-clip motion is irrelevant -- and a fast
push-in legitimately moves most at the end. Reported, not enforced.

On (1): this metric is only meaningful when the plate's background is flat and the island does
not touch the frame edges. See check-plate-flat.py -- a gradient plate made this read ~1.0x on a
genuine zoom and cost three wasted rerolls.
"""
import sys, subprocess, tempfile, glob, os
import numpy as np
from PIL import Image, ImageChops

def frames(mp4, n=6):
    d = tempfile.mkdtemp()
    subprocess.run(["ffmpeg","-y","-hide_banner","-loglevel","error","-i",mp4,
                    "-vf",f"fps={n}/8,scale=640:-1",f"{d}/f%02d.jpg"],check=True)
    return sorted(glob.glob(f"{d}/*.jpg"))

def area_bg(f):
    a = np.asarray(Image.open(f).convert("RGB")).astype(int)
    bg = a[3,3]
    m = np.abs(a-bg).sum(2) > 42
    return m.sum()/m.size, tuple(bg)

def endpoint(mp4):
    d = tempfile.mkdtemp()
    subprocess.run(["ffmpeg","-y","-hide_banner","-loglevel","error","-sseof","-0.5","-i",mp4,
                    "-vf","select='eq(n\\,0)+eq(n\\,8)',scale=480:-1","-vsync","0",f"{d}/e-%d.jpg"],
                   check=False, stderr=subprocess.DEVNULL)
    fs = sorted(glob.glob(f"{d}/*.jpg"))
    if len(fs) < 2: return -1
    a,b = Image.open(fs[0]).convert("L"), Image.open(fs[1]).convert("L")
    diff = ImageChops.difference(a,b)
    return sum(diff.getdata())/(diff.size[0]*diff.size[1])

print(f"  {'clip':10} {'zoom':>6} {'mono':>5} {'bg drift':>9} {'endpoint':>9} {'Mbps':>6}  verdict")
fails=0
for mp4 in sorted(sys.argv[1:]):
    name = os.path.basename(mp4).replace("dive-","").replace(".mp4","")
    fs = frames(mp4)
    ab = [area_bg(f) for f in fs]
    areas = [a for a,_ in ab]; bgs = [b for _,b in ab]
    zoom = areas[-1]/max(areas[0],1e-6)
    mono = all(b >= a-0.004 for a,b in zip(areas,areas[1:]))
    bgd  = max(max(abs(c-bgs[0][i]) for i,c in enumerate(b)) for b in bgs)
    ep   = endpoint(mp4)
    sz   = os.path.getsize(mp4); mbps = sz*8/8.04/1e6
    ok = zoom > 1.15 and mono and bgd <= 8   # endpoint reported, not gated (see docstring)
    if not ok: fails += 1
    print(f"  {name:10} {zoom:5.2f}x {str(mono):>5} {bgd:8}  {ep:8.2f} {mbps:6.1f}  {'PASS' if ok else 'FAIL'}")
print(f"\n  {'ALL PASS' if fails==0 else str(fails)+' FAILED'}   gates: zoom>1.15, monotonic, bg drift<=8   (endpoint informational)")
sys.exit(1 if fails else 0)
