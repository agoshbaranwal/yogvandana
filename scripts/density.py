#!/usr/bin/env python3
"""How crowded a page is, counted rather than felt.

"Chaotic" is usually a small number of measurable things: too many sections,
too many boxes, too many competing colour bands, the same words repeated, and
too many buttons asking for the same thing. This counts each of them so a
redesign can be argued from evidence and checked afterwards.

    python3 scripts/density.py            # every route at 360
Needs `npm run serve` on 4411.
"""
import argparse, json, sys, collections
sys.path.insert(0, "/Users/agosh/Game/Climate Change/tools")
from cdp import Chrome  # noqa: E402

ROUTES = [("home", "/"), ("conditions", "/rog/"), ("sugar", "/rog/sugar/"), ("batches", "/batch/"),
          ("stories", "/kahaniyan/"), ("about", "/parichay/"), ("contact", "/sampark/"),
          ("students", "/vidyarthi/")]

JS = r"""
const vis = el => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
  return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
const out = {};
const main = document.querySelector('main');
out.height = document.documentElement.scrollHeight;
out.screens = +(out.height / 740).toFixed(1);

/* sections a reader must get past */
const sections = [...main.querySelectorAll(':scope > section, :scope > div > section')].filter(vis);
out.sections = sections.length;
out.sectionHeights = sections.map(s => Math.round(s.getBoundingClientRect().height));

/* a box: anything drawing its own border or its own fill against the page */
const page = 'rgb(251, 248, 241)';
const boxes = [...main.querySelectorAll('*')].filter(el => {
  if (!vis(el)) return false;
  const cs = getComputedStyle(el);
  /* A single hairline is a divider, not a box. A box is something the eye
     reads as a container: enclosed on every side, or filled. */
  const sides = ['Top', 'Right', 'Bottom', 'Left']
    .filter(s => parseFloat(cs['border' + s + 'Width']) > 0).length;
  const bg = cs.backgroundColor;
  const hasFill = bg !== 'rgba(0, 0, 0, 0)' && bg !== page;
  const r = el.getBoundingClientRect();
  return (sides === 4 || hasFill) && r.height > 34 && r.width > 60;
});
out.boxes = boxes.length;
/* a box inside a box inside a box is where a page starts to feel like a form */
out.maxNesting = Math.max(0, ...boxes.map(b => boxes.filter(o => o !== b && o.contains(b)).length));

/* colour bands: how many times the ground changes as you scroll */
let bands = 0, last = null;
for (const s of sections) { const bg = getComputedStyle(s).backgroundColor;
  if (bg !== last) { bands++; last = bg; } }
out.colourBands = bands;

/* asks */
out.buttons = [...main.querySelectorAll('a.btn, button.btn')].filter(vis).length;
out.allLinks = [...main.querySelectorAll('a')].filter(vis).length;
out.chips = [...main.querySelectorAll('.tchip, .chip')].filter(vis).length;
out.headings = [...main.querySelectorAll('h2, h3')].filter(vis).length;

/* the same words twice: the surest sign of a page saying one thing many times */
const words = {};
[...main.querySelectorAll('p, h2, h3, span, li, a')].filter(vis).forEach(el => {
  const own = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 8);
  if (!own) return;
  const t = el.textContent.trim().replace(/\s+/g, ' ');
  if (t.length < 10 || t.length > 120) return;
  words[t] = (words[t] || 0) + 1;
});
out.repeats = Object.entries(words).filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1]).slice(0, 8);
return JSON.stringify(out);
"""

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--width", type=int, default=360)
    ap.add_argument("--base", default="http://127.0.0.1:4411")
    a = ap.parse_args()
    tot = collections.Counter()
    for name, path in ROUTES:
        c = Chrome(width=a.width, height=740)
        try:
            c.goto(a.base + path, settle=1.6)
            c.eval("window.scrollTo(0,document.body.scrollHeight);return 1")
            c.eval("window.scrollTo(0,0);return 1")
            v = json.loads(c.eval(JS))
        finally:
            c.close()
        print(f"{name:11} {v['screens']:5.1f} screens  sections={v['sections']:2}  boxes={v['boxes']:3} "
              f"(nested {v['maxNesting']})  bands={v['colourBands']:2}  buttons={v['buttons']:2}  "
              f"links={v['allLinks']:3}  chips={v['chips']:2}  headings={v['headings']:2}")
        if v["repeats"]:
            for t, n in v["repeats"][:4]:
                print(f"              repeated {n}x: {t[:70]}")
        big = [h for h in v["sectionHeights"] if h > 1200]
        if big:
            print(f"              sections over 1200px: {big}")
        for k in ("sections", "boxes", "buttons", "chips"):
            tot[k] += v[k]
    print(f"\ntotals across 8 pages: {dict(tot)}")

if __name__ == "__main__":
    main()
