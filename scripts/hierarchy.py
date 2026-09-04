"""Does every section have something to look at?

A page that sells has one element per section three or four times the size of
its body text. A page that only informs is flat: everything within a few pixels
of everything else, and the eye has nowhere to land.

For each section this reports the largest type size in it and the size that
carries most of its text. A section whose largest element is under 1.6x its
dominant size is FLAT — that was nine of thirteen sections when Agosh said the
site was not readable and did not sell.

    /opt/anaconda3/bin/python3 scripts/hierarchy.py [url ...]

Needs `node scripts/serve.mjs 4471 out` running.
"""
import sys
sys.path.insert(0, "/Users/agosh/Game/Climate Change/tools")
from cdp import Chrome

PAGES = [a for a in sys.argv[1:]] or ["/", "/rog/sugar/", "/kahaniyan/", "/batch/", "/parichay/", "/sampark/", "/vidyarthi/"]
RATIO = 1.6

JS = r"""
return (() => {
  const out = [];
  for (const s of document.querySelectorAll('main section, main > div > section')) {
    const h = s.querySelector('h1,h2,.page-title,.h2,.claim');
    const sizes = {};
    let chars = 0, biggest = 0, biggestText = '';
    for (const el of s.querySelectorAll('*')) {
      if (el.children.length) continue;
      const t = (el.textContent || '').trim(); if (!t) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') continue;
      const px = Math.round(parseFloat(cs.fontSize));
      sizes[px] = (sizes[px] || 0) + t.length; chars += t.length;
      if (px > biggest) { biggest = px; biggestText = t.slice(0, 26); }
    }
    if (!chars) continue;
    const dominant = +Object.entries(sizes).sort((a, b) => b[1] - a[1])[0][0];
    out.push({ title: (h ? h.textContent : '(no heading)').slice(0, 26), chars, biggest, dominant, biggestText });
  }
  return out;
})()
"""

flat_total = 0
sections = 0
for page in PAGES:
    with Chrome(width=390, height=844, mobile=True) as c:
        c.goto(f"http://127.0.0.1:4471{page}index.html".replace("//index", "/index"), settle=2.5)
        c.eval("return window.scrollTo(0, document.body.scrollHeight)")
        c.sleep(1.3)
        rows = c.eval(JS)
    print(f"\n  {page}")
    for r in rows:
        sections += 1
        flat = r["biggest"] < r["dominant"] * RATIO
        flat_total += flat
        mark = "FLAT" if flat else "    "
        print(f"    {mark}  {r['title']:<28} body {r['dominant']:>2}px · biggest {r['biggest']:>2}px  “{r['biggestText']}”")
print(f"\n  {flat_total} flat of {sections} sections (a section is flat when nothing in it reaches {RATIO}x its body size)")
sys.exit(1 if flat_total else 0)
