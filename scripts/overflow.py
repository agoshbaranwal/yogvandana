"""Is anything on this site cut off, or pushing the page sideways?

Two different faults, both of which look like carelessness to a reader:

  CLIPPED   an element whose content is wider than the box drawn round it, so
            the last letters are simply not there. "HbA1c" at 30px in half a
            card on a 360px phone is the case Agosh caught.
  SIDEWAYS  an element wider than the viewport, which makes the whole page
            scroll left and right.

    /opt/anaconda3/bin/python3 scripts/overflow.py [--w 360] [url ...]

Needs `node scripts/serve.mjs 4471 out` running.
"""
import sys
sys.path.insert(0, "/Users/agosh/Game/Climate Change/tools")
from cdp import Chrome

W = 360
if "--w" in sys.argv:
    W = int(sys.argv[sys.argv.index("--w") + 1])
PAGES = [a for a in sys.argv[1:] if a.startswith("/")] or [
    "/", "/rog/sugar/", "/rog/bp/", "/kahaniyan/", "/batch/", "/parichay/",
    "/sampark/", "/vidyarthi/", "/en/", "/en/conditions/sugar/",
]

JS = r"""
return (() => {
  const out = [];
  const doc = document.documentElement;
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    const label = el.tagName.toLowerCase() +
      (el.className && el.className.baseVal === undefined
        ? '.' + String(el.className).trim().split(/\s+/).slice(0, 2).join('.')
        : '');
    const text = (el.textContent || '').trim().slice(0, 30);

    /* content wider than its own box, with no way to scroll to it */
    const clipped = el.scrollWidth - el.clientWidth > 1 &&
      cs.overflowX !== 'auto' && cs.overflowX !== 'scroll' && el.children.length === 0;
    if (clipped) out.push({ kind: 'clipped', label, text, by: el.scrollWidth - el.clientWidth });

    /* sticking out past the right edge of the page */
    if (r.right > doc.clientWidth + 1 && cs.position !== 'fixed')
      out.push({ kind: 'sideways', label, text, by: Math.round(r.right - doc.clientWidth) });
  }
  return out;
})()
"""

total = 0
for page in PAGES:
    with Chrome(width=W, height=800, mobile=True) as c:
        c.goto(f"http://127.0.0.1:4471{page}index.html".replace("//index", "/index"), settle=2.2)
        c.eval("return window.scrollTo(0, document.body.scrollHeight)")
        c.sleep(1.1)
        found = c.eval(JS)
    seen, rows = set(), []
    for f in found:
        k = (f["kind"], f["label"], f["text"])
        if k in seen:
            continue
        seen.add(k)
        rows.append(f)
    total += len(rows)
    mark = "  " if not rows else "✗ "
    print(f"{mark}{page:<26} {len(rows)} problem(s)")
    for f in rows[:6]:
        print(f"      {f['kind']:<8} +{f['by']:>3}px  {f['label'][:34]:<34} “{f['text']}”")
print(f"\n  {total} across {len(PAGES)} pages at {W}px")
sys.exit(1 if total else 0)
