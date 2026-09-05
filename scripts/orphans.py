#!/usr/bin/env python3
"""Lines that break badly: a paragraph ending on one short word.

Agosh pointed at "…घटाते हैं — और घटती है।", where the last two characters sat
alone on their own line, and said there were small issues like it across the
site. This finds them all rather than one at a time.

For every block of text it walks the line boxes the browser actually produced
(a Range over the text node yields one rect per line) and flags a last line
that is both very short in itself and leaves most of the width empty — which
is what an orphan looks like to a reader.

    python3 scripts/orphans.py [url ...]
"""
import sys
sys.path.insert(0, "/Users/agosh/Game/Climate Change/tools")
from cdp import Chrome  # noqa: E402

BASE = "http://127.0.0.1:4471"
PAGES = ["/", "/batch/", "/kahaniyan/", "/parichay/", "/sampark/", "/vidyarthi/",
         "/rog/sugar/", "/en/", "/en/about/", "/en/batches/"]

JS = """return (() => {
  const out = [];
  const r = document.createRange();
  document.querySelectorAll('p, h1, h2, h3, li, dd, dt, figcaption').forEach((el) => {
    const direct = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim());
    if (direct.length !== el.childNodes.length || !direct.length) return;
    r.selectNodeContents(el);
    const rects = [...r.getClientRects()].filter((x) => x.width > 0.5 && x.height > 0.5);
    if (rects.length < 2) return;
    const last = rects[rects.length - 1];
    const wide = Math.max(...rects.map((x) => x.width));
    const txt = el.textContent.trim();
    // the tail that ended up alone
    const frac = last.width / wide;
    if (frac < 0.16 && last.width < 90) {
      out.push({ frac: +frac.toFixed(3), lastW: Math.round(last.width), wide: Math.round(wide),
                 lines: rects.length, cls: (el.className || el.tagName).toString().split(' ')[0],
                 text: txt.slice(0, 46), tail: txt.slice(-14) });
    }
  });
  return out;
})()"""


def run(pages, width):
    c = Chrome(width=width, height=900)
    total = 0
    try:
        for p in pages:
            c.goto(BASE + p, settle=1.2)
            rows = c.eval(JS)
            total += len(rows)
            mark = "✗" if rows else "✓"
            print(f"  {mark} {p:<18} {len(rows)} orphan(s) at {width}px")
            for r in rows[:6]:
                print(f"        {r['lastW']:>3}px of {r['wide']}px on line {r['lines']}  "
                      f"{r['cls']:<12} …{r['tail']}")
    finally:
        c.close()
    return total


if __name__ == "__main__":
    pages = sys.argv[1:] or PAGES
    print("last lines left stranded\n")
    n = sum(run(pages, w) for w in (390, 1280))
    print(f"\n  {n} stranded last line(s)")
    sys.exit(1 if n else 0)
