import numpy as np
from PIL import Image
import os, itertools

D = "/home/arpit/Desktop/Resume/site-world/public/world/v2/"
names = ["hero","journey","question","build","create","explain","impact","next"]
files = {n: D+f"island-{n}-r1.png" for n in names}

masks = {}
stats = {}
for n in names:
    im = Image.open(files[n]).convert("RGB")
    a = np.asarray(im).astype(np.int16)
    h,w,_ = a.shape
    # cream background sample from top-left corner region
    corner = a[0:60,0:60].reshape(-1,3).mean(0)
    # distance from cream
    dist = np.sqrt(((a-corner)**2).sum(2))
    mask = dist > 22   # foreground = island
    # clean: keep, compute bbox
    ys,xs = np.where(mask)
    y0,y1,x0,x1 = ys.min(),ys.max(),xs.min(),xs.max()
    bw,bh = x1-x0+1, y1-y0+1
    fill = mask.sum()/(bw*bh)               # how much of bbox is filled
    frac = mask.sum()/(w*h)                 # island area / whole frame
    aspect = bw/bh
    masks[n] = mask
    stats[n] = dict(corner=corner.round(0), bbox=(bw,bh), aspect=round(aspect,3),
                    fill=round(fill,3), frac=round(frac,4), area=int(mask.sum()),
                    cx=round((x0+x1)/2/w,3), W=w,H=h)

print("=== per-island silhouette stats ===")
print(f"{'name':9} {'bboxW':>6}{'bboxH':>6} {'aspect':>7} {'fill':>6} {'area%frame':>10}")
for n in names:
    s=stats[n]
    print(f"{n:9} {s['bbox'][0]:6}{s['bbox'][1]:6} {s['aspect']:7} {s['fill']:6} {100*s['frac']:10.2f}")

# scale: island area relative to largest
maxarea = max(stats[n]['area'] for n in names)
print("\n=== relative scale (island pixel area, normalized to largest) ===")
for n in sorted(names, key=lambda k:-stats[k]['area']):
    print(f"{n:9} {stats[n]['area']/maxarea:5.2f}   bboxH={stats[n]['bbox'][1]}")

# Silhouette IoU pairwise. Resize each mask to common canvas by centering bbox scaled.
def norm_mask(m):
    ys,xs=np.where(m); y0,y1,x0,x1=ys.min(),ys.max(),xs.min(),xs.max()
    crop=m[y0:y1+1,x0:x1+1]
    im=Image.fromarray((crop*255).astype(np.uint8)).resize((256,256),Image.NEAREST)
    return np.asarray(im)>127
nm={n:norm_mask(masks[n]) for n in names}
print("\n=== pairwise silhouette IoU (bbox-normalized to 256x256) ===")
print("     "+ " ".join(f"{n[:4]:>5}" for n in names))
ious={}
for a in names:
    row=[]
    for b in names:
        inter=(nm[a]&nm[b]).sum(); uni=(nm[a]|nm[b]).sum()
        iou=inter/uni; ious[(a,b)]=iou; row.append(f"{iou:5.2f}")
    print(f"{a[:4]:>4} "+" ".join(row))

pairs=[(a,b) for a,b in itertools.combinations(names,2)]
vals=sorted(((ious[(a,b)],a,b) for a,b in pairs),reverse=True)
print("\n=== most similar silhouettes ===")
for v,a,b in vals[:8]:
    print(f"{a:9} vs {b:9}  IoU={v:.3f}")
print("mean pairwise IoU:",round(np.mean([ious[(a,b)] for a,b in pairs]),3))

# base-shape: bottom-row width profile symmetry. Also 'dome vs elongated': aspect
print("\n=== aspect grouping (round dome ~1.0-1.4, elongated >1.6) ===")
for n in sorted(names,key=lambda k:stats[k]['aspect']):
    print(f"{n:9} aspect={stats[n]['aspect']}")
