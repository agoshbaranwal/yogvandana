# The phone audit — Round 6

Measured 4 September 2026 with `scripts/measure.py`, the same tool before and after, at 360 × 740
(a ₹10,000 Android) and 390 × 800, and on the **slow profile**: CPU throttled 6×, 400 kbps down,
400 ms latency, against the deployed site. "Before" is the live site of the morning of 4 September,
before Round 6; "after" is the live site after the tenth deploy. Structure numbers (text under
16 px, contrast, taps, sideways overflow) are the same live or local; timings are live only.

## What the tool counts

- **under 16 px** — visible text nodes under 16 px, as a share of all text nodes on the page.
- **contrast** — text under 4.5:1 (3:1 for large bold), measured against the painted ground.
- **taps** — links, buttons and fields under 44 px tall or 24 px wide, inline text links excepted.
- **over** — how many pixels wider than the phone the page is (any number but 0 means a sideways scroll).
- **paint** — largest contentful paint on the slow profile; **shift** — cumulative layout shift;
  **KB** — everything transferred; **fonts** — the font files alone.

## Before and after, at 360

| Page | under 16 px before → after | contrast | taps | over | paint before → after | shift | KB before → after | fonts before → after |
|---|---|---|---|---|---|---|---|---|
| Home | 3% → **1%** | 0 | 0 | 0 | 2.68 s → **2.52 s** | 0.002 | 440 → **367** | 208 → **173** |
| Conditions | 3% → **0%** | 0 | 0 | 0 | 2.66 s → **2.54 s** | 0.002 | 386 → **389** | 180 → **145** |
| शुगर | 6% → **1%** | 0 | 0 | 0 | 2.67 s → **2.56 s** | 0.001 | 423 → **353** | 208 → **145** |
| Batches | 7% → **0%** | 0 | 0 | 0 | 2.60 s → **2.54 s** | 0.001 | 399 → **360** | 208 → **173** |
| Stories | 11% → **0%** | 0 | 0 | 0 | 2.67 s → **2.54 s** | 0.003 | 374 → **335** | 180 → **145** |
| About | 16% → **6%** | 0 | 0 | 0 | 2.59 s → **2.46 s** | 0.004 | 385 → **333** | 180 → **145** |
| Contact | 0% → **0%** | 0 | 0 | 0 | 2.68 s → **2.49 s** | 0.002 | 368 → **329** | 180 → **145** |
| Students | 2% → **0%** | 0 | 0 | 0 | 2.57 s → **2.48 s** | 0.001 | 402 → **355** | 208 → **173** |
| Privacy | 0% → **0%** | 0 | 0 | 0 | 2.63 s → **2.62 s** | 0.003 | 364 → **328** | 180 → **145** |
| 404 | 0% → **0%** | 0 | 0 | 0 | 2.44 s → **2.57 s** | 0.002 | 370 → **396** | 180 → **145** |

**The shift on home and About (was 0.095 / 0.096).** Traced with the layout-shift sources: text
re-wrapped when Baloo 2 replaced the phone's own Devanagari face, and on the photograph the
bottom-anchored name jumped with it. Two fixes, both measured live: a fallback face sized to
Baloo 2 per platform (Noto Sans Devanagari 101.4%, Kohinoor 93.9%, Devanagari Sangam 98.8%,
measured on the same sentence), so line breaks hold when the font swaps in — About went from
0.096 to 0.004 and the privacy page from 0.056 to 0.003 on that alone; and the name on the
photograph pinned at the top of a fixed box with the caption as two short lines — home from 0.095
to 0.002. What remains on home is the bracketed placeholders' Latin glyphs arriving after the
Devanagari file; it shrinks as real facts replace the brackets.

**Fonts: 145 KB, and 173 on three pages.** Home, batches and students fetch one more 27 KB file:
Google's Latin-extended subset, which is where the browser finds the rupee sign (its range is
declared after the Devanagari one, which also carries it). One glyph, 27 KB; recorded, not fixed.

Before: the worst page had 16% of its text under 16 px (About) and home 3%; no page failed
contrast or a tap size; the stories page (after the Round 6 build, before its fix) was 149 px
wider than the phone — the tool found it, the eye had not.

After: the only text under 16 px is the seal on the slip and the captions inside photo frames
that are still empty (About's 6% is twelve such captions). The remaining structure numbers are
zero on every route.

## The six rules the build now enforces (`scripts/mobile-check.mjs`)

1. No fixed width over 360 px in a component without a breakpoint prefix.
2. Every input and textarea carries a 16 px step — iOS zooms the page on anything smaller.
3. The fixed bar pads for `env(safe-area-inset-bottom)` — it clears the home indicator.
4. `viewport-fit=cover` in both layouts.
5. Every button is 56 px tall.
6. Sections below the first screen carry `content-visibility: auto`.

And in `measure.py`: sideways overflow is reported per page, and text over the photograph's fade is
measured against the fade, not the page.

## What changed for the phone, beyond the rules

- The label step went from 14 to 16 px: slip row keys, "पहले / अब", column heads, the band's question.
- The sticky bar hides while a field has focus, so it cannot ride up on the keyboard over the form.
- Montserrat is no longer preloaded on Hindi pages (35 KB); the first-screen photograph is preloaded when it exists.
- The result row on a story card wraps instead of widening the page.
- The contact form writes the WhatsApp message from what was typed until a form service is connected.
- Sections take their room from one token; the page is eight screens, each one thing.

## Not met, and why

- **Fonts ≤ 120 KB.** A Hindi page carries about 145 KB: Baloo 2's Devanagari file is 113 KB and
  already covers both weights. Subsetting Devanagari glyphs would break conjuncts in text she has
  not written yet. Left at 145 on purpose; recorded.
- **First paint ≤ 2.2 s on the slow profile.** The live numbers above are what they are; the floor
  is the font and the framework runtime (about 150 KB of JavaScript), not the layout.

## The ten-line phone check — for Agosh, on his own phone

1. Open the home page on mobile data, not Wi-Fi. Her name and the promise should be readable before the font has finished loading.
2. Turn the phone sideways and back. Nothing should scroll left–right on any page.
3. Tap every button with a thumb, not a fingertip. None should need a second try.
4. Open the menu: the phone number is at the top; Escape or the cross closes it.
5. On the contact page, tap into the name field. The saffron bar at the bottom must disappear while the keyboard is up.
6. On a condition page, tap "पर्ची प्रिंट करें": only the slip prints. Tap "परिवार को भेजें": the phone's share sheet opens (or WhatsApp).
7. On the batches page, the week shows seven blank days until the days are confirmed — that is deliberate.
8. Tap the WhatsApp button on any page: the message already names the page (and the disease, on a condition page).
9. Switch to English from the menu: every page has its twin.
10. Come back tomorrow on the same phone: the second load should be quicker, because the fonts and pages are cached by the browser.
