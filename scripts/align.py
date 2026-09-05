#!/usr/bin/env python3
"""Things that sit together and should line up — across the WHOLE site.

Agosh sent two stacked buttons and asked whether I could see the misalignment.
I fixed those, and he asked whether I had checked the rest of the site. I had
not: scripts/buttons.py looks at seven pages, at two widths, at `.btn` and
nothing else. The site has thirty-seven pages, and the same fault — siblings
that ought to agree and do not — can land on a chip, a pill, a card, a table
row or a list item just as easily as on a button.

This checks every page the build produces, at three widths, over every set of
repeated siblings it can find.

THE PROPERTY

Take any run of two or more sibling elements sharing a tag and a class — the
day chips, the batch cards, the fee rows, a pair of buttons, the counters:

  · Stacked, one per row, they should share a left edge and a width, and
    whatever they lead with — an icon, a label — should start at the same x.
    Ragged widths and drifting marks are what a reader calls misalignment.
  · Side by side on one row, they should share a top edge.

Neither says anything about how tall a thing is or how much text it holds, so
a short card beside a long one is not a finding.

WHERE IT APPLIES, AND WHERE IT DOES NOT

Only inside an explicit column or grid — a parent that is `flex-direction:
column`, or a grid, or block children in normal flow. Those are places where
something PUT the items in a line, so they are meant to agree.

A wrapped row of chips is not that. The condition chips, the tick list, the
press logos and the badges all flow to their own width on purpose, and the
first version of this script called all four misaligned. Flow is allowed to
be ragged. Buttons are the exception and they have their own instrument —
scripts/buttons.py checks a stacked pair wherever it occurs, wrapped or not,
because two parallel actions are compared by the eye in a way a row of
sixteen ailments is not.

    python3 scripts/align.py [--width 390] [url ...]

Needs `node scripts/serve.mjs 4471 out` running.
"""
import sys, json, subprocess
sys.path.insert(0, "/Users/agosh/Game/Climate Change/tools")
sys.path.insert(0, "scripts")
from fresh import require_fresh  # noqa: E402

require_fresh()
from cdp import Chrome  # noqa: E402

BASE = "http://127.0.0.1:4471"
TOL = 2.0          # px; below this the eye reads it as lined up
WIDTHS = (390, 768, 1280)


def all_pages():
    out = subprocess.run(["find", "out", "-name", "index.html"], capture_output=True, text=True).stdout
    paths = []
    for line in out.split():
        p = line.replace("out", "", 1).replace("index.html", "")
        # r7..r14 are design proposals shown for review, not pages of the site
        if p.split("/")[1:2] and p.split("/")[1].startswith("r") and p.split("/")[1][1:].isdigit():
            continue
        paths.append(p)
    return sorted(set(paths))


JS = r"""
return (() => {
  const TOL = %f;
  const out = [];
  /* The WHOLE class list, not the first class.

     Keying on the first class grouped a heading <div class="flex flex-col">
     with the grid of cards beside it, because both begin "flex", and then
     complained that two unrelated blocks did not line up. Items that are
     genuinely parallel come out of one .map() and carry identical classes;
     anything else is a layout wrapper that happens to share a utility. */
  const sig = (el) => {
    const cls = (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className) || "";
    return el.tagName + "|" + String(cls).trim().split(/\s+/).sort().join(" ");
  };
  const lead = (el) => {
    // the first thing the element draws: an icon, or its first run of text
    const svg = el.querySelector(":scope > svg");
    if (svg) { const r = svg.getBoundingClientRect(); if (r.width > 0) return r.left; }
    const rg = document.createRange();
    for (const n of el.childNodes) {
      let r = null;
      if (n.nodeType === 3 && n.textContent.trim()) { rg.selectNodeContents(n); r = rg.getBoundingClientRect(); }
      else if (n.nodeType === 1 && n.textContent.trim()) r = n.getBoundingClientRect();
      if (r && r.width > 0.5) return r.left;
    }
    return null;
  };
  const seen = new Set();
  document.querySelectorAll("body *").forEach((parent) => {
    if (seen.has(parent)) return;
    const ps = getComputedStyle(parent);
    // only where something deliberately put the items in a line
    const isGrid = ps.display.includes("grid");
    const isCol = ps.display.includes("flex") && ps.flexDirection.startsWith("column");
    const isFlow = !ps.display.includes("flex") && !isGrid;
    /* A wrapped row is usually flow, and flow may be ragged — sixteen ailment
       chips are meant to find their own widths. But a SMALL wrapped row of
       peer controls is not flow, it is a set of parallel choices, and when it
       wraps the reader compares them down the page. That is the case Agosh
       photographed, and the first version of this script excluded it: it
       passed the broken build and the fixed one identically, which is a rule
       that cannot fail and therefore proves nothing. Two to four links or
       buttons count; a longer run does not. */
    const kidsAll = [...parent.children];
    /* Peers means the same KIND of control. Requiring only <a> or <button>
       paired a saffron pill with the underlined "send this page to family"
       link beneath it on all sixteen condition pages and called them 188px
       misaligned — they are a primary button and a secondary text link, and
       they are supposed to look different. Compare pills with pills. */
    const isPill = (c) => c.classList && c.classList.contains("btn");
    const smallPeerRow = kidsAll.length >= 2 && kidsAll.length <= 4 &&
      kidsAll.every((c) => /^(A|BUTTON)$/.test(c.tagName)) &&
      (kidsAll.every(isPill) || kidsAll.every((c) => !isPill(c)));
    if (!isGrid && !isCol && !isFlow && !smallPeerRow) return;
    const kids = [...parent.children].filter((c) => {
      const r = c.getBoundingClientRect();
      const cs = getComputedStyle(c);
      // a chip sizes itself; that is the point of a chip — unless it is one
      // of a small set of peer controls, which should agree
      if (/^inline/.test(cs.display) && !smallPeerRow) return false;
      return r.width > 4 && r.height > 4 && cs.visibility !== "hidden" && cs.position !== "absolute" && cs.position !== "fixed";
    });
    if (kids.length < 2) return;
    /* Group by what kind of thing each child is — except in a small peer row,
       where the whole point is that a green button and a white one are peers.
       Keying those by their class lists put each in a group of one and the
       check silently had nothing to compare. */
    const groups = new Map();
    if (smallPeerRow) {
      groups.set("peer controls", kids);
    } else {
      for (const k of kids) {
        const g = sig(k);
        if (!groups.has(g)) groups.set(g, []);
        groups.get(g).push(k);
      }
    }
    for (const [s, members] of groups) {
      if (members.length < 2) continue;
      const boxes = members.map((m) => {
        const r = m.getBoundingClientRect();
        /* Where a design centres its content — the counter strip — the x its
           words begin at is a function of how long they are, and asking four
           centred numbers to start at the same place is asking them not to be
           centred. The leading edge is only a property of left-aligned text. */
        const ta = getComputedStyle(m).textAlign;
        const centred = ta === "center" || ta === "right" || ta === "end";
        return { l: r.left, r: r.right, t: r.top, w: r.width, h: r.height,
                 lead: centred ? null : lead(m),
                 text: m.textContent.trim().slice(0, 22) };
      });
      const spread = (xs) => { const v = xs.filter((x) => x !== null && isFinite(x)); return v.length < 2 ? 0 : Math.max(...v) - Math.min(...v); };
      /* A grid is not a stack. Items in a two-column grid have different left
         edges on purpose, and an earlier version of this faulted every one of
         them. Cluster the boxes into the rows and columns they actually
         occupy, then ask the question that belongs to each:

           within a row    · do they share a top edge?
           within a column · do they share a left edge, a width, and the x
                             their first mark or word begins at?

         A single stacked pair is just a grid one column wide, so the same
         code covers the buttons Agosh sent. */
      const bot = (b) => b.t + b.h, rgt = (b) => b.l + b.w;
      const cluster = (items, lo, hi) => {
        const groups = [];
        for (const b of items.slice().sort((x, y) => lo(x) - lo(y))) {
          const g = groups.find((gr) => gr.some((o) => lo(b) < hi(o) - 1 && lo(o) < hi(b) - 1));
          if (g) g.push(b); else groups.push([b]);
        }
        return groups;
      };
      const rows = cluster(boxes, (b) => b.t, bot);
      const cols = cluster(boxes, (b) => b.l, rgt);
      const faults = [];
      let dt = 0, dl = 0, dw = 0, dlead = 0;
      for (const r of rows) if (r.length > 1) dt = Math.max(dt, spread(r.map((b) => b.t)));
      for (const c of cols) if (c.length > 1) {
        dl = Math.max(dl, spread(c.map((b) => b.l)));
        dw = Math.max(dw, spread(c.map((b) => b.w)));
        dlead = Math.max(dlead, spread(c.map((b) => b.lead)));
      }
      if (dt > TOL) faults.push(["top edges in a row", dt]);
      if (dl > TOL) faults.push(["left edges in a column", dl]);
      if (dw > TOL) faults.push(["widths in a column", dw]);
      if (dlead > TOL) faults.push(["what they lead with", dlead]);
      if (faults.length)
        out.push({ what: s, n: members.length,
                   parent: sig(parent), faults: faults.map(([k, v]) => [k, +v.toFixed(1)]),
                   sample: boxes.slice(0, 3).map((b) => b.text) });
    }
    seen.add(parent);
  });
  return out;
})()
""" % TOL


def run(pages, widths):
    findings = []
    for w in widths:
        c = Chrome(width=w, height=900)
        try:
            for p in pages:
                c.goto(BASE + p, settle=0.9)
                for g in c.eval(JS):
                    g["page"], g["width"] = p, w
                    findings.append(g)
        finally:
            c.close()
    return findings


if __name__ == "__main__":
    argv = sys.argv[1:]
    widths = WIDTHS
    if "--width" in argv:
        i = argv.index("--width")
        widths = (int(argv[i + 1]),)
        argv = argv[:i] + argv[i + 2:]
    pages = argv or all_pages()
    print(f"things that should line up · {len(pages)} pages × {len(widths)} widths\n")
    found = run(pages, widths)
    # one line per distinct (component, fault), with where it happens
    by = {}
    for f in found:
        for name, px in f["faults"]:
            k = (f["what"], f["parent"], name)
            by.setdefault(k, {"max": 0, "where": set(), "sample": f["sample"]})
            by[k]["max"] = max(by[k]["max"], px)
            by[k]["where"].add(f"{f['page']}@{f['width']}")
    for (what, parent, name), v in sorted(by.items(), key=lambda kv: -kv[1]["max"]):
        places = sorted(v["where"])
        print(f"  ✗ {what:<26} {name:<20} up to {v['max']:>6.1f}px   ({len(places)} place(s), e.g. {places[0]})")
        print(f"      inside {parent} · e.g. “{v['sample'][0][:26]}”")
    print(f"\n  {len(by)} kind(s) of misalignment, {len(found)} occurrence(s)")
    sys.exit(1 if by else 0)
