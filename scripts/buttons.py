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
  stack  · buttons that sit one above another must be the same width. Two
           pills shrink-wrapped to their own labels sat 87 to 115px apart with
           a ragged right edge; that is the fault. (An earlier version also
           demanded their marks share an x, which a centred label cannot give
           when labels differ in length — and which nobody asked for.)

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
    // when the label is wrapped, THAT is the thing that must be centred —
    // the .lbl span, not the union of every child
    const lblEl = b.querySelector(':scope > .lbl');
    if (lblEl) { const lr = lblEl.getBoundingClientRect(); if (lr.width > 1) tb = {top: lr.top, bottom: lr.bottom, left: lr.left, right: lr.right}; }
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
      // tb is the .lbl box when the label is wrapped — so this is the label's centre
      labelOff: +(((tb.left + tb.right) / 2) - mid).toFixed(2),
      hasLbl: !!lblEl,
      hindi: document.documentElement.lang === 'hi',
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
                # Only the widths. The stack check used to demand that stacked
                # buttons' marks and label-starts share an x — which is exactly
                # what a centred label cannot do when two labels differ in
                # length, and Agosh never once asked for it. He asked, three
                # times, for the label to be centred; the 87px he photographed
                # was the WIDTHS. That half stays.
                off = []
                if g["width"] > 2: off.append(f"widths differ by {g['width']:.0f}px")
                if off:
                    bad += 1
                    print(f"      ✗ stack of {g['n']} in .{g['where'][:30]}")
                    print(f"          {' · '.join(off)}")
            for r in rows:
                flags = []
                # The LABEL is what is centred, on every button, whatever its width.
                # This line asserted the icon-and-label GROUP for most of 5 Sep, and
                # so passed buttons Agosh could see were off and — once the label
                # rule went in — failed buttons that were dead centre. Where a .lbl
                # exists it is the thing measured; a button with no mark has nothing
                # to shift its words, so its group and its label are the same box.
                off = r["labelOff"] if r.get("hasLbl") else r["groupOff"]
                if abs(off) > 1.5:
                    flags.append(f"label {off:+.1f}px off the button's centre")
                # 16px is the site's own gap plus a little; 146px was the bug
                if r.get("reach") is not None and not (0 <= r["reach"] <= 16):
                    flags.append(f"mark stranded {r['reach']}px from its label")
                # Vertical. The mark is centred on the label's LINE BOX by the browser,
                # but Devanagari's ink is top-heavy (headline and matras above, few
                # descenders), so on Hindi pages the CSS lifts the mark 3px to meet the
                # ink — measured on the hero buttons at 3.5 to 6.5px low before, 0.5 to
                # 3.5 after. The check expects that lift rather than failing it; Latin
                # digits centre on their x-height and measured level, so English expects 0.
                if r.get("drift") is not None:
                    expected = -3.0 if r.get("hindi") else 0.0
                    if abs(r["drift"] - expected) > 1.0:
                        flags.append(f"mark {r['drift']:+.1f}px against the label box (expected {expected:+.0f})")
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
