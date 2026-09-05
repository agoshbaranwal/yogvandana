#!/usr/bin/env python3
"""Every button on the site: is its content actually aligned?

Agosh has said three times that the buttons look unpolished and that their
contents are misaligned. "Looks off" is not a thing you can fix; a number is.
For every .btn this reports:

  centre · the icon-and-label GROUP against the middle of the pill. A button
           is one object and the whole of it should sit in the middle.
  reach  · the distance from the mark to the words it leads. This is the check
           that matters and the one this script did not have: an earlier
           version asserted that a full-width button centred its LABEL, which
           is satisfied by pinning the mark into the far-left padding — and on
           the closing band's 540px pill that left 146px of empty green
           between the icon and its own label. The maths passed and the button
           was broken. A leading mark belongs beside what it leads.
  drift  · the icon's centre against the label's, vertically
  wrap   · a label broken across two lines inside a pill
  stack  · buttons that sit one above another must be the same width, with
           their marks in one vertical line and their labels beginning at one
           x. Two pills shrink-wrapped to their own labels sat 87 to 115px
           apart in width with a ragged right edge, and where the widths did
           match the marks still drifted 20 to 35px, because each button
           centred its own content. Agosh called both misalignment.

    python3 scripts/buttons.py [url ...]
"""
import sys
sys.path.insert(0, "/Users/agosh/Game/Climate Change/tools")
from cdp import Chrome  # noqa: E402

BASE = "http://127.0.0.1:4471"
PAGES = ["/", "/batch/", "/sampark/", "/parichay/", "/en/", "/en/batches/", "/en/contact/"]

JS = """return (() => {
  const out = [];
  document.querySelectorAll('a.btn, button.btn').forEach((b) => {
    const bb = b.getBoundingClientRect();
    if (bb.width < 2) return;
    const svg = b.querySelector('svg');
    const r = document.createRange();
    let tb = null;
    const grow = (x) => {
      if (x.width < 1) return;
      tb = tb ? {top: Math.min(tb.top, x.top), bottom: Math.max(tb.bottom, x.bottom),
                 left: Math.min(tb.left, x.left), right: Math.max(tb.right, x.right)}
              : {top: x.top, bottom: x.bottom, left: x.left, right: x.right};
    };
    b.childNodes.forEach((n) => {
      if (n.nodeType === 3 && n.textContent.trim()) { r.selectNodeContents(n); grow(r.getBoundingClientRect()); }
      if (n.nodeType === 1 && n.tagName.toLowerCase() !== 'svg' && n.textContent.trim()) grow(n.getBoundingClientRect());
    });
    if (!tb) return;
    const cs = getComputedStyle(b);
    const mid = (bb.left + bb.right) / 2;
    const sb = svg ? svg.getBoundingClientRect() : null;
    const gl = sb ? Math.min(tb.left, sb.left) : tb.left;
    const gr = sb ? Math.max(tb.right, sb.right) : tb.right;
    const rec = {
      label: b.textContent.trim().slice(0, 30),
      cls: [...b.classList].filter((c) => c.startsWith('btn')).join(' '),
      w: Math.round(bb.width), h: Math.round(bb.height),
      lines: Math.round((tb.bottom - tb.top) / (parseFloat(cs.lineHeight) || 1)),
      block: b.classList.contains('btn-block') ||
             bb.width >= (b.parentElement ? b.parentElement.getBoundingClientRect().width - 1 : 1e9),
      // a button in a column is judged by the stack rule below — its content
      // is left-aligned on purpose so the marks line up, and asking it to be
      // centred as well is asking for two contradictory things
      inCol: !!(b.parentElement && b.parentElement.classList.contains('btn-col')),
      groupOff: +(((gl + gr) / 2) - mid).toFixed(2),
    };
    if (sb) {
      rec.drift = +(((sb.top + sb.bottom) / 2) - ((tb.top + tb.bottom) / 2)).toFixed(2);
      rec.icon = Math.round(sb.width);
      // the mark is always drawn before the words on this site
      rec.reach = Math.round(tb.left - sb.right);
    }
    out.push(rec);
  });
  return out;
})()"""


STACK_JS = """return (() => {
  const out = [];
  const seen = new Set();
  document.querySelectorAll('a.btn, button.btn').forEach((b) => {
    const p = b.parentElement; if (!p || seen.has(p)) return;
    const sibs = [...p.children].filter((c) => c.classList && c.classList.contains('btn'));
    if (sibs.length < 2) return;
    seen.add(p);
    const rows = sibs.map((s) => {
      const r = s.getBoundingClientRect();
      const svg = s.querySelector('svg');
      const rg = document.createRange(); let tl = null;
      s.childNodes.forEach((n) => {
        const has = n.nodeType === 3 ? n.textContent.trim() : (n.nodeType === 1 && n.tagName.toLowerCase() !== 'svg' && n.textContent.trim());
        if (!has) return;
        let x;
        if (n.nodeType === 3) { rg.selectNodeContents(n); x = rg.getBoundingClientRect(); }
        else x = n.getBoundingClientRect();
        if (x.width > 1) tl = tl === null ? x.left : Math.min(tl, x.left);
      });
      return { top: r.top, h: r.height, w: r.width,
               iconL: svg ? svg.getBoundingClientRect().left : null, textL: tl };
    });
    const tops = rows.map((r) => r.top);
    const h = Math.max(...rows.map((r) => r.h));
    if (Math.max(...tops) - Math.min(...tops) < h * 0.5) return;   // side by side, not stacked
    const span = (xs) => { const v = xs.filter((x) => x !== null); return v.length ? Math.max(...v) - Math.min(...v) : 0; };
    out.push({
      where: (p.className || p.tagName).toString().split(' ').slice(0, 2).join(' '),
      n: rows.length,
      width: +span(rows.map((r) => r.w)).toFixed(1),
      icon: +span(rows.map((r) => r.iconL)).toFixed(1),
      text: +span(rows.map((r) => r.textL)).toFixed(1),
    });
  });
  return out;
})()"""


def run(pages, width):
    c = Chrome(width=width, height=900)
    bad = 0
    try:
        for p in pages:
            c.goto(BASE + p, settle=1.1)
            rows = c.eval(JS)
            print(f"\n  {p}   ({len(rows)} buttons at {width}px)")
            for g in c.eval(STACK_JS):
                off = []
                if g["width"] > 2: off.append(f"widths differ by {g['width']:.0f}px")
                if g["icon"] > 2: off.append(f"marks {g['icon']:.0f}px apart")
                if g["text"] > 2: off.append(f"labels start {g['text']:.0f}px apart")
                if off:
                    bad += 1
                    print(f"      ✗ stack of {g['n']} in .{g['where'][:30]}")
                    print(f"          {' · '.join(off)}")
            for r in rows:
                flags = []
                if not r.get("inCol") and abs(r["groupOff"]) > 1.5:
                    flags.append(f"content {r['groupOff']:+.1f}px off the button's centre")
                # 16px is the site's own gap plus a little; 146px was the bug
                if r.get("reach") is not None and not (0 <= r["reach"] <= 16):
                    flags.append(f"mark stranded {r['reach']}px from its label")
                if r.get("drift") is not None and abs(r["drift"]) > 1.0:
                    flags.append(f"mark {r['drift']:+.1f}px off the label's centre")
                if r["lines"] > 1:
                    flags.append(f"label broken onto {r['lines']} lines")
                if flags:
                    bad += 1
                    kind = "block" if r["block"] else "inline"
                    print(f"      ✗ {r['cls']:<24} {kind:<6} “{r['label']}”")
                    for f in flags:
                        print(f"          {f}")
    finally:
        c.close()
    return bad


if __name__ == "__main__":
    pages = sys.argv[1:] or PAGES
    total = sum(run(pages, w) for w in (390, 1280))
    print(f"\n  {total} button(s) with something out of true")
    sys.exit(1 if total else 0)
