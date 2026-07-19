"""Generate dithered field-guide plates for The Sovereign Frontier.

Style: screen-printed / risograph plates in the ATX Settlemint treatment —
cobalt field, coral organic detail, acid-sun disc, bone negative space,
visible dither grain. Compositions are abstract-cartographic (frontier plates),
rendered procedurally then quantized to the restricted palette with dithering.
"""

import math
import random
from PIL import Image, ImageDraw, ImageFilter

OUT = "/Users/curtis/dev/sovereign-frontier/public/plates"

BLUE = (0, 111, 204)      # Texas Blue
CORAL = (255, 133, 116)   # Mission Coral
ACID = (244, 255, 0)      # Acid Sun
BONE = (241, 240, 233)    # Bone
INK = (17, 17, 17)        # Ink
CLAY = (201, 94, 67)
MESQUITE = (56, 77, 53)

def palette_img(colors):
    p = Image.new("P", (1, 1))
    flat = []
    for c in colors:
        flat.extend(c)
    flat += colors[0] * (256 - len(colors))
    p.putpalette(flat)
    return p

def grain(img, amount=26):
    random.seed(7)
    noise = Image.effect_noise(img.size, amount).convert("L")
    base = img.convert("RGB")
    return Image.blend(base, Image.merge("RGB", (noise, noise, noise)), 0.16)

def dither_to(img, colors, upscale=1):
    """Add grain then Floyd-Steinberg dither to the restricted palette."""
    img = grain(img)
    q = img.convert("RGB").quantize(palette=palette_img(colors), dither=Image.Dither.FLOYDSTEINBERG)
    out = q.convert("RGB")
    if upscale > 1:
        out = out.resize((out.width * upscale, out.height * upscale), Image.NEAREST)
    return out

def ridge(draw, w, y0, amp, color, seed, roughness=3):
    random.seed(seed)
    pts = [(0, y0)]
    x = 0
    y = y0
    while x < w:
        x += random.randint(18, 60)
        y = y0 + random.randint(-amp, amp)
        pts.append((min(x, w), y))
    pts += [(w, y0 + amp * roughness + 400), (0, y0 + amp * roughness + 400)]
    draw.polygon(pts, fill=color)

def star8(draw, cx, cy, r, color, rr=0.32):
    pts = []
    for i in range(16):
        ang = math.pi * i / 8 - math.pi / 2
        rad = r if i % 2 == 0 else r * rr
        pts.append((cx + rad * math.cos(ang), cy + rad * math.sin(ang)))
    draw.polygon(pts, fill=color)

# ------------------------------------------------------------------
# HERO — sun over frontier ridges and a river of nodes
# ------------------------------------------------------------------
W, H = 1600, 900
img = Image.new("RGB", (W, H), BLUE)
d = ImageDraw.Draw(img)

# acid sun
d.ellipse([W * 0.30, H * 0.06, W * 0.70, H * 0.78], fill=ACID)

# distant skyline blocks (ink) inside sun
random.seed(3)
bx = W * 0.33
while bx < W * 0.67:
    bw = random.randint(18, 46)
    bh = random.randint(30, 150)
    d.rectangle([bx, H * 0.62 - bh, bx + bw, H * 0.62], fill=(0, 60, 140))
    bx += bw + random.randint(6, 20)

# ridges
ridge(d, W, int(H * 0.60), 26, CORAL, seed=11)
ridge(d, W, int(H * 0.68), 34, CLAY, seed=23)
ridge(d, W, int(H * 0.78), 30, MESQUITE, seed=37)
ridge(d, W, int(H * 0.86), 22, (10, 45, 110), seed=51)

# river polyline (bone) cutting through
random.seed(9)
rx = W * 0.52
pts = []
for yy in range(int(H * 0.60), H + 40, 24):
    rx += random.randint(-38, 38)
    width = 8 + (yy - H * 0.6) * 0.22
    pts.append((rx, yy, width))
for (x, y, wdt) in pts:
    d.ellipse([x - wdt, y - 12, x + wdt, y + 12], fill=BONE)

# scattered node stars
random.seed(21)
for _ in range(26):
    x = random.randint(0, W)
    y = random.randint(int(H * 0.62), H - 20)
    r = random.randint(4, 11)
    star8(d, x, y, r, ACID if random.random() < 0.4 else BONE)

# compass star in sky
star8(d, W * 0.87, H * 0.16, 42, BONE)
star8(d, W * 0.12, H * 0.20, 26, CORAL)

img = img.filter(ImageFilter.GaussianBlur(1.1))
dither_to(img, [BLUE, CORAL, ACID, BONE, INK, CLAY, MESQUITE]).save(f"{OUT}/hero.png")

# ------------------------------------------------------------------
# PART PLATES — square emblems, one per part
# ------------------------------------------------------------------
S = 640

def new_plate(bg):
    im = Image.new("RGB", (S, S), bg)
    return im, ImageDraw.Draw(im)

# Part I — Foundations: compass star over stacked strata
im, d = new_plate(BLUE)
for i, c in enumerate([MESQUITE, CLAY, CORAL, BONE]):
    ridge(d, S, int(S * (0.55 + i * 0.12)), 12, c, seed=60 + i)
star8(d, S * 0.5, S * 0.32, 120, ACID)
star8(d, S * 0.5, S * 0.32, 46, INK, rr=0.3)
im = im.filter(ImageFilter.GaussianBlur(0.8))
dither_to(im, [BLUE, CORAL, ACID, BONE, INK, CLAY, MESQUITE]).save(f"{OUT}/part-1.png")

# Part II — Settlement: mission arch under sun disc
im, d = new_plate(CORAL)
d.ellipse([S * 0.28, S * 0.10, S * 0.72, S * 0.54], fill=ACID)
# arch
d.rectangle([S * 0.30, S * 0.44, S * 0.70, S * 0.88], fill=BLUE)
d.rectangle([S * 0.38, S * 0.56, S * 0.62, S * 0.88], fill=CORAL)
d.ellipse([S * 0.38, S * 0.44, S * 0.62, S * 0.68], fill=CORAL)
# ground
ridge(d, S, int(S * 0.86), 10, MESQUITE, seed=77)
im = im.filter(ImageFilter.GaussianBlur(0.8))
dither_to(im, [BLUE, CORAL, ACID, BONE, INK, CLAY, MESQUITE]).save(f"{OUT}/part-2.png")

# Part III — Architecture: constellation of nodes over grid
im, d = new_plate(MESQUITE)
random.seed(5)
for gx in range(0, S, 64):
    d.line([(gx, 0), (gx, S)], fill=(46, 64, 44), width=2)
    d.line([(0, gx), (S, gx)], fill=(46, 64, 44), width=2)
nodes = [(random.randint(60, S - 60), random.randint(60, S - 60)) for _ in range(9)]
for i in range(len(nodes) - 1):
    d.line([nodes[i], nodes[i + 1]], fill=BONE, width=5)
for i, (x, y) in enumerate(nodes):
    star8(d, x, y, 30 if i % 3 == 0 else 18, ACID if i % 3 == 0 else CORAL)
im = im.filter(ImageFilter.GaussianBlur(0.8))
dither_to(im, [BLUE, CORAL, ACID, BONE, INK, CLAY, MESQUITE]).save(f"{OUT}/part-3.png")

# Part IV — In Practice: sun over tower blocks / river
im, d = new_plate(BLUE)
d.ellipse([S * 0.20, S * 0.12, S * 0.80, S * 0.72], fill=ACID)
random.seed(13)
bx = S * 0.16
while bx < S * 0.84:
    bw = random.randint(24, 60)
    bh = random.randint(60, 220)
    d.rectangle([bx, S * 0.72 - bh, bx + bw, S * 0.72], fill=(0, 60, 140))
    bx += bw + random.randint(8, 22)
ridge(d, S, int(S * 0.74), 14, CORAL, seed=91)
ridge(d, S, int(S * 0.84), 12, CLAY, seed=95)
star8(d, S * 0.82, S * 0.16, 28, BONE)
im = im.filter(ImageFilter.GaussianBlur(0.8))
dither_to(im, [BLUE, CORAL, ACID, BONE, INK, CLAY, MESQUITE]).save(f"{OUT}/part-4.png")

print("plates written")
