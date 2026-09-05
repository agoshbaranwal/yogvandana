#!/usr/bin/env python3
"""Contrast for text that sits ON a photograph.

scripts/legible.py reads colours out of the CSS. That works everywhere except
the one place it matters most: a caption laid over a picture has no CSS
background at all, so legible.py reports the page's ivory and calls white text
on a white sleeve a 1:1 failure — right about the trouble, wrong about the
reason, and equally likely to be wrong the other way and pass something
unreadable.

This measures the pixels instead.

  1 · render the built page
  2 · hide every text layer that sits over an image, and screenshot — that is
      the true background, scrim and all
  3 · put the text back and read each line's box and colour
  4 · for light text take the 90th percentile of background luminance in that
      box (the brightest part of the picture is what fights it), for dark text
      the 10th, and report the WCAG ratio against the text colour

The floor is the site's own: 7:1 under 24px, 4.5:1 at or above it, which is
stricter than WCAG AA on purpose — the readers are 25 to 55 and often on a
cheap screen in daylight.

    python3 scripts/onphoto.py [url ...]
"""
import sys, time, statistics

sys.path.insert(0, "/Users/agosh/Game/Climate Change/tools")
from cdp import Chrome  # noqa: E402

try:
    from PIL import Image
except ImportError:
    sys.exit("onphoto: needs Pillow")

BASE = "http://127.0.0.1:4471"
PAGES = ["/", "/parichay/", "/en/", "/en/about/"]
WIDTH = 390


def lum(rgb):
    def ch(c):
        c /= 255.0
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (ch(x) for x in rgb[:3])
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def ratio(l1, l2):
    a, b = max(l1, l2), min(l1, l2)
    return (a + 0.05) / (b + 0.05)


FIND = """return (() => {
  const imgs = [...document.querySelectorAll('img')].map((i) => i.getBoundingClientRect())
    .filter((r) => r.width > 80 && r.height > 80);
  const over = (r) => imgs.some((i) =>
    r.left >= i.left - 2 && r.right <= i.right + 2 && r.top >= i.top - 2 && r.bottom <= i.bottom + 2);
  const out = [];
  document.querySelectorAll('p, h1, h2, h3, span, a, li').forEach((el) => {
    const direct = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (!direct) return;
    const r = el.getBoundingClientRect();
    if (r.width < 8 || r.height < 6 || !over(r)) return;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.opacity === '0') return;
    const m = cs.color.match(/[\\d.]+/g).map(Number);
    out.push({ x: r.x, y: r.y, w: r.width, h: r.height,
               color: [m[0], m[1], m[2]], size: parseFloat(cs.fontSize),
               text: el.textContent.trim().slice(0, 34),
               sel: el.tagName.toLowerCase() + '.' + (el.className || '').split(' ')[0] });
  });
  window.__onphoto = out;
  return out;
})()"""

HIDE = """return (() => {
  const seen = [];
  document.querySelectorAll('p, h1, h2, h3, span, a, li').forEach((el) => {
    const r = el.getBoundingClientRect();
    for (const t of window.__onphoto || [])
      if (Math.abs(r.x - t.x) < 1 && Math.abs(r.y - t.y) < 1) { el.style.visibility = 'hidden'; seen.push(1); }
  });
  return seen.length;
})()"""


def check(page, out_png):
    c = Chrome(width=WIDTH, height=900)
    bad, total = [], 0
    try:
        c.goto(BASE + page, settle=1.5)
        spots = c.eval(FIND)
        if not spots:
            print(f"  {page:<16} no text over any photograph")
            return []
        c.eval(HIDE)
        time.sleep(0.35)
        c.shot(out_png)
        im = Image.open(out_png).convert("RGB")
        sx = im.width / WIDTH  # the shot may be at device-pixel scale
        for s in spots:
            total += 1
            x0, y0 = int(s["x"] * sx), int(s["y"] * sx)
            x1, y1 = int((s["x"] + s["w"]) * sx), int((s["y"] + s["h"]) * sx)
            x0, y0 = max(0, x0), max(0, y0)
            x1, y1 = min(im.width, x1), min(im.height, y1)
            if x1 - x0 < 2 or y1 - y0 < 2:
                continue
            px = list(im.crop((x0, y0, x1, y1)).getdata())
            ls = sorted(lum(p) for p in px)
            tl = lum(s["color"])
            # the part of the picture that fights this text hardest
            worst = ls[int(len(ls) * 0.90)] if tl > 0.5 else ls[int(len(ls) * 0.10)]
            r = ratio(tl, worst)
            floor = 7.0 if s["size"] < 24 else 4.5
            if r < floor:
                bad.append((r, floor, s, worst))
        mark = "✗" if bad else "✓"
        print(f"  {mark} {page:<16} {len(bad)} of {total} line(s) over a photo below the floor")
        for r, floor, s, w in sorted(bad):
            print(f"        {r:5.2f}:1  (needs {floor})  {s['size']:.0f}px  {s['sel']:<22} “{s['text']}”")
    finally:
        c.close()
    return bad


if __name__ == "__main__":
    pages = sys.argv[1:] or PAGES
    print(f"text over photographs, at {WIDTH}px\n")
    allbad = []
    for i, p in enumerate(pages):
        allbad += check(p, f"/tmp/onphoto-{i}.png")
    print(f"\n  {len(allbad)} line(s) below the floor across {len(pages)} pages")
    sys.exit(1 if allbad else 0)
