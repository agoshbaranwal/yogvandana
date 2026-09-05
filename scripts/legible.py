"""How much of a page is hard to read, measured rather than felt.

Walks the rendered page, and for every run of visible text records its colour,
its size, its weight and the background actually painted behind it. Reports the
contrast of each pair and what share of the page's words sit below a floor.

WCAG AA (4.5:1) is a floor written for young eyes on good screens. This site is
read by 25-55 year olds on ₹10-15,000 Androids, often outdoors, so the floor
here is 7:1 for anything under 24px, and 4.5:1 at 24px and above where the
letterforms are heavy enough to carry themselves.

Every page is sampled twice, at the top and after a scroll, because the sticky
bar and every revealed section only exist in the second state.

    /opt/anaconda3/bin/python3 scripts/legible.py [--floor 7] [url ...]

Needs `node scripts/serve.mjs 4471 out` running.
"""
import sys, json, collections
sys.path.insert(0, "/Users/agosh/Game/Climate Change/tools")
sys.path.insert(0, "scripts")
from fresh import require_fresh

require_fresh()
from cdp import Chrome

FLOOR = 7.0
args = [a for a in sys.argv[1:] if not a.startswith("--")]
if "--floor" in sys.argv:
    FLOOR = float(sys.argv[sys.argv.index("--floor") + 1])
PAGES = args or ["/", "/rog/sugar/", "/kahaniyan/", "/batch/", "/parichay/", "/sampark/", "/vidyarthi/"]

JS = r"""
return (() => {
  const lum = (c) => {
    const [r, g, b] = c;
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const parse = (s) => (s.match(/[\d.]+/g) || []).slice(0, 4).map(Number);
  const over = (fg, bg) => {              // flatten a translucent colour onto its ground
    const a = fg.length > 3 ? fg[3] : 1;
    return [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a));
  };
  /* Returns every colour the ground behind this text might actually be. A flat
     background is one colour; a gradient is all of its stops, because text runs
     across the whole sweep and is only as legible as its worst point. Checking
     the first stop alone passed a strip whose dark end was 5.59:1 and a band
     whose white text was 2.38:1 — Agosh caught both by looking. */
  const ground = (el) => {                // the first ancestor that actually paints
    /* Layers between the text and the first OPAQUE ground, nearest first.

       A translucent background used to be treated as if it were opaque: only
       alpha exactly 0 was skipped, so `rgba(251,248,241,0.08)` — an 8% ivory
       tint painted on a near-black band to lift a button off it — was read as
       solid ivory, and the ivory label on top came back at 1.03:1 on four
       pages. The design was right and the instrument was wrong, which is the
       worse way round: it would have argued me out of a good button. Anything
       between 0 and 1 is now remembered and composited over whatever turns
       out to be behind it. */
    const veils = [];
    const under = (base) => {
      let out = base;
      for (let i = veils.length - 1; i >= 0; i--) out = over(veils[i], out);
      return out.map((x) => Math.round(x));
    };
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      const cs = getComputedStyle(n);
      /* A gradient paints too, and computedStyle reports backgroundColor as
         transparent for it — which made a dark gradient panel measure as ivory
         text on the ivory page behind it, i.e. 1.00:1, invisible. */
      const img = cs.backgroundImage;
      if (img && img !== 'none') {
        /* A background-image can be several gradient layers, listed front to
           back — so the LAST layer is the one actually painting the ground
           under everything else. Taking the first layer instead reported the
           hero's top radial highlight as the ground for the whole screen and
           failed text that sits on near-white. Split on layer boundaries, take
           the last, and use its colour stops: text runs across the whole sweep
           and is only as legible as its worst point. */
        const layers = img.split(/,(?![^(]*\))/);
        for (let i = layers.length - 1; i >= 0; i--) {
          const stops = [];
          for (const m of layers[i].matchAll(/rgba?\(([^)]+)\)/g)) {
            const c = parse('rgb(' + m[1] + ')');
            if (c.length > 3 && c[3] === 0) continue;
            stops.push(under(c.slice(0, 3)));
          }
          if (stops.length) return stops;
        }
      }
      const c = parse(cs.backgroundColor);
      const a = c.length > 3 ? c[3] : 1;
      if (a === 0) continue;              // paints nothing at all
      if (a < 1) { veils.push(c); continue; }   // a tint: keep looking for what is under it
      return [under(c.slice(0, 3))];
    }
    return [under([255, 255, 255])];
  };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

  const out = [];
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walk.nextNode(); n; n = walk.nextNode()) {
    const words = (n.textContent || "").trim();
    if (!words) continue;
    const el = n.parentElement;
    if (!el || el.closest("script,style,svg,[hidden],[aria-hidden='true']")) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none" || Number(cs.opacity) === 0) continue;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    const grounds = ground(el);
    /* the worst point of the sweep is the one that decides legibility */
    let bg = grounds[0], fg = over(parse(cs.color), bg), worst = Infinity;
    for (const g of grounds) {
      const f = over(parse(cs.color), g);
      const r = ratio(f, g);
      if (r < worst) { worst = r; bg = g; fg = f; }
    }
    out.push({
      words: words.split(/\s+/).length,
      chars: words.length,
      size: Math.round(parseFloat(cs.fontSize)),
      weight: cs.fontWeight,
      fg: fg.map(Math.round).join(","),
      bg: bg.map(Math.round).join(","),
      ratio: Math.round(worst * 100) / 100,
      sample: words.slice(0, 40),
      cls: (el.className && el.className.baseVal === undefined ? String(el.className) : "").split(" ")[0],
    });
  }
  return out;
})()
"""

print(f"  floor {FLOOR}:1 under 24px, 4.5:1 at 24px and up\n")
worst = collections.Counter()
for page in PAGES:
    with Chrome(width=390, height=844, mobile=True) as c:
        c.goto(f"http://127.0.0.1:4471{page}index.html".replace("//index", "/index"), settle=2.5)
        runs = c.eval(JS)
        c.eval("return window.scrollTo(0, document.body.scrollHeight * 0.6)")
        c.sleep(1.4)
        seen = {(r["fg"], r["bg"], r["size"], r["sample"]) for r in runs}
        for r in c.eval(JS):
            if (r["fg"], r["bg"], r["size"], r["sample"]) not in seen:
                runs.append(r)
    total = sum(r["chars"] for r in runs)
    low = [r for r in runs if r["ratio"] < (FLOOR if r["size"] < 24 else 4.5)]
    share = sum(r["chars"] for r in low) / total * 100 if total else 0
    print(f"  {page:<14} {share:5.1f}% of characters below the floor   ({total} chars in {len(runs)} runs)")
    by = collections.defaultdict(lambda: [0, 0, ""])
    for r in low:
        k = (r["fg"], r["bg"], r["ratio"])
        by[k][0] += r["chars"]; by[k][1] += 1; by[k][2] = r["sample"]
    for (fg, bg, ratio), (ch, n, sample) in sorted(by.items(), key=lambda x: -x[1][0])[:4]:
        print(f"        rgb({fg}) on rgb({bg})  {ratio}:1  {ch:>5} chars  “{sample}”")
        worst[(fg, bg, ratio)] += ch
print("\n  worst pairs across every page")
for (fg, bg, ratio), ch in worst.most_common(6):
    print(f"    {ratio:5.2f}:1   rgb({fg}) on rgb({bg})   {ch} chars")
