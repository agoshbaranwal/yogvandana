# What the site costs to open

The audience is on a ₹10–15,000 Android on Indian mobile data. Page weight is a
feature here, not a metric.

## Measure the transfer, not the file

The first numbers I took for this were wrong by more than half, and the mistake
is easy to repeat: **`ls` and DevTools' "size" column report decoded bytes**.
GitHub Pages gzips everything except the fonts and images, so a 222 KB
JavaScript chunk is 70 KB on the wire. Reading decoded bytes made the home page
look like a megabyte when it was around 500 KB.

Two ways to get the real number:

```bash
# every asset the HTML names, as the network sends it
curl -s --compressed -o /dev/null -w '%{size_download}\n' <url>
```

```python
# everything, including what the CSS pulls in — this is the honest one
performance.getEntriesByType('resource').reduce((s, e) => s + e.transferSize, 0)
```

Prefer the second. The first misses anything referenced only from the
stylesheet, which is where the Latin font lives.

## Where it stands

Measured in a browser at 390 px against the live site, cache disabled,
throttled to 1.6 Mbit / 150 ms latency with the CPU at a quarter speed:

| | |
|---|---|
| first visit, home | **357 KB** |
| first paint | **1.05 s** |
| fully loaded | **2.19 s** |
| layout shift | **0.0003** |

Before this round the same page was **503 KB** (measured with curl over the
same host, which is like-for-like for everything the HTML names).

What is left, roughly: 177 KB fonts, 145 KB JavaScript, 19 KB HTML, 8 KB CSS.

## What was done

**Fonts, 296 → 177 KB on a Hindi page.** Google served Anek as one variable
file carrying every weight from 100 to 800 — 252 KB for the Devanagari alone.
`scripts/fonts.py` instances the two weights the site actually sets and subsets
each to its script. Latin is a second family behind its own `unicode-range`, so
a Hindi page never fetches it at all: the measurement above shows zero Latin
bytes, because nothing on the phone home page draws a Latin glyph.

Going further — subsetting to the site's own text — was measured and rejected.
It saves 26 KB, because Devanagari conjuncts close over each other and 862 of
967 glyphs survive either way, and it drops ड़ ढ़ क़ ज़ फ़: ordinary Hindi that
would vanish from the page without an error the day someone writes जोड़ों into
`content/`.

**Route prefetching, off.** `next/link` fetches a route's payload when the link
scrolls into view. The home page has 25 internal links and each payload is
about 10 KB gzipped, so a reader who scrolls the page pays for pages they never
open. `components/Nav.tsx` is the same `Link` with `prefetch={false}`, and
`type:check` fails on a raw `next/link` import. Navigation still fetches the
payload — on the tap, when it is actually wanted.

**Nothing waits on the font.** `font-display: swap` plus an `Anek Fallback`
face built from `local()` Devanagari, with `size-adjust` measured rather than
guessed (see `app/globals.css`), so the page is readable immediately and does
not move when Anek arrives.

## The lever not pulled

145 KB of the remaining 357 is React and the App Router client runtime. The
site uses it for eight small islands — the menu, the sticky bar, the story
filter, the photo viewer, the contact form, analytics, the scroll motion and
the booking band — all of which are a few kilobytes of behaviour each.

Cutting it means not hydrating the pages, which is an architecture decision
rather than a tweak: it would take the home page to roughly 210 KB. Worth
raising before a launch, not worth doing quietly.
