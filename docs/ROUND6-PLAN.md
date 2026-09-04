# Round 6 — the build plan

Written 4 September 2026, after Agosh approved the Round 6 boards (agoshbaranwal.github.io/yogvandana/r6/)
and added the requirement that decides the order of everything below: **the site must be extremely
optimised for phones.** The audience sees it on a ₹10–15,000 Android, almost never on anything else.

## Decisions taken

| | Decision | By |
|---|---|---|
| Chooser | **Disease rows.** They read fastest on a 6.5-inch screen, carry the student count, and eight labels never crowd. The body figure is out. | me |
| First screen | Her face full-width, name, आयुष line, the promise, WhatsApp and a phone number | Agosh |
| The slip | A prescription pad — letterhead, ruled paper, number, seal, torn edge, print and share | Agosh |
| Medicine panel | **Kept, dark, under the promise** on home and every condition page. The research is that this audience wants the promise and the reassurance in the same breath; folded into a FAQ it is the answer they came for, hidden. | me |
| The daily-routine block | Not on the Round 6 home. It moves to the students' page, where the 21-day habit matters, unless Agosh wants it back on home. | flagged |

## The method — the same one that held last time

- **Rules before fixes.** Every requirement that can be a build check becomes one first, proven to fail
  on the current site, then made green. New for this round: no fixed width over 360 px in a component;
  every input at 16 px or more (iOS zooms on anything smaller); safe-area padding on every fixed bar;
  `viewport-fit=cover`; every button 56 px; long sections marked `content-visibility: auto`.
- **Content model, then tokens, then components, then pages.** A change made once lands on 37 pages.
- **The phone is the gate.** `scripts/measure.py` runs at 360 × 740 on the slow profile (6× CPU,
  400 kbps, 400 ms) after every phase, alongside 390 and desktop. No phase starts on a red.
- **Every page ships to its real route as it lands**, and Agosh sees it on his own phone before the
  next page starts. `/r6/` is removed at the end.
- **Both languages always.** Every new string is bilingual; parity fails the build otherwise.

## The phases

| # | Phase | What lands | Done when |
|---|---|---|---|
| 0 | **Mobile rules** | The six new build checks, red on today's site; measure.py gains the 360 slow profile as its default gate | `npm run check` red for exactly those reasons |
| 1 | **Content model** | Stories gain a structured result (metric · before · after · medicine change · months) with free text as fallback; conditions gain "what yoga does for it" in three lines and a recommended batch; batches gain structured days; site gains the certifying body and the phone | Schemas, guide and both languages updated; parity green |
| 2 | **Tokens and components** | Scale to the boards (display 40 / head 26 / buttons 56); the new pieces built once: FirstScreen, DiseaseRows, Timeline, MedicinePanel, ResultCard, SlipPad, Timetable, ContactHero, CertificateHero, ConditionHeader, FirstClass | Each renders at 360 with no overflow; rules green |
| 3 | **Home** | The Round 6 home, live at `/` and `/en/` | Measured on the slow phone; Agosh looks on his phone |
| 4 | **Condition pages** | All eight, from the शुगर board | Same gate |
| 5 | **Batches and students** | Timetable; routine block moves to students | Same gate |
| 6 | **About** | Certificate first, timeline, the stage | Same gate |
| 7 | **Contact and stories** | Number first; result cards; the album | Same gate |
| 8 | **Mobile optimisation** | Baloo 2 subset and self-hosted (target ≤ 120 KB from 208); portrait preloaded as the LCP image; responsive images ready for her photos; `content-visibility` on long pages; Web Share for "परिवार को भेजें" with WhatsApp fallback; sticky bar respects the keyboard and the home indicator; input keyboards (tel, name) right; `theme-color` | Slow-phone first paint ≤ 2.2 s; fonts ≤ 120 KB; CLS 0; every tap ≥ 44 |
| 9 | **Mobile audit** | `docs/MOBILE-AUDIT.md`: before/after per page at 360 and 390 — paint, shift, weight, small text, tap failures, overflow — plus a ten-line checklist Agosh runs on his own phone | Every page 9+ on the audit's rubric, measured |
| 10 | **Proof and close** | All 66 screenshots, every rule, deploy, `/r6/` removed, memory and docs updated | Clean tree, green deploy, his sign-off |

Roughly six to eight working sessions. Phases 3 to 7 are independent once 0–2 land and can go in any
order; each is a page Agosh can react to on its own.

## Delivered — 4 September 2026, one session, ten deploys

| Phase | Landed as | Deployed |
|---|---|---|
| 0 | `scripts/mobile-check.mjs` (six rules, all red the day they were written, all green by the first commit); `measure.py --slow` and `--live` | d2abc92 |
| 1 | Conditions: `works`, `medicine`, paid `firstClass` rows, `bestBatch` + why. Stories: `metric / before / after / change / months`. Batches: `start`, `minutes`, `daysOn`, session as minutes + text. Site: `certifyingBody`, `university`, `homeMinutes`, `missedClass`, `photos`, `about`, `primaryCredential`. Guide updated. | 981295c |
| 2–3 | Tokens (display 40, head 26/30, buttons 56/800); FirstScreen, DiseaseRows, Timeline + MedicinePanel, ResultCard, SlipPad + ShareSlip, Timetable + DayChips, WhoTeaches, the band and header redone; home live | 5009076 |
| 4 | All eight condition pages, the index and the 404 on the rows | 097b806 |
| 5 | Batches as a timetable; routine on the students' page; dead blocks removed | 669e5ae |
| 6–7 | About certificate-first; Contact number-first with a form that writes the WhatsApp message; stories tightened; the 149 px overflow found by measurement and fixed | cd50cd2 |
| 8 | Label step 16; sticky bar hides while typing; portrait preload; Montserrat off Hindi pages; deeper fade; overflow in the gate | bd485bb |
| 9–10 | `docs/MOBILE-AUDIT.md`; 66 screenshots retaken; `/r6/` removed; memory and docs | this commit |

**Targets, honestly.** Nothing under 16 px that is read: met (the remaining 14 px text is the seal
and the captions inside empty photo frames). Every tap ≥ 44: met. CLS: home 0.002, About 0.004, every
other page at or under 0.003 after the fallback face was sized to Baloo 2 (Google's "good" line is
0.1). Sideways overflow: 0 on every route at 360, now a
gate. **Fonts ≤ 120 KB: not met.** Baloo 2's Devanagari file is 113 KB on its own and it is a
variable font that already covers both weights; the 35 KB Montserrat that Hindi pages used to fetch
is gone, so a Hindi page now carries about 145 KB of font. Going lower means subsetting Devanagari
glyphs, which breaks conjuncts in words she has not written yet — not done, on purpose. **First
paint ≤ 2.2 s on the slow profile:** see the live numbers in `docs/MOBILE-AUDIT.md`; the page is
lighter than before, but the floor is the font plus the Next runtime, not the design.

## What this plan does not do

Real photographs and her facts still gate the last mile; the build carries drawn placeholders and
brackets until then. English stays a faithful translation, not a rewrite for the second buyer.
Nobody from the audience has used it yet — the mobile checklist in Phase 9 is written so that the
first person who does can be watched.

## After Round 6 — the practice comes off the website (4 September 2026)

Agosh: *"Don't give too much info. Lock it behind paywall maybe. The goal is that the website
shows clearly and unequivocally what this teacher is capable of and what the user will get. This
gets much higher priority."*

The site was publishing eight complete prescriptions — the exact asanas and pranayama for each
disease, on a public page, free. That is the thing a student consults her for.

| | Before | Now |
|---|---|---|
| The slip | A filled sample, with the practice named for each of eight diseases | A blank prescription: rows named, values sealed and **not present in the page source** |
| Condition pages | "what yoga does for it", part method | The change a person sees — the outcome, never the technique |
| The offer | Implied across the page | `WhatYouGet`: the consultation, the slip, the daily class, the WhatsApp support, the review — stated in one block on home and every condition page |
| The guard | None | Rule 6b: a named asana or pranayama anywhere on the built site fails the build (proven red, then green) |

The order the site now argues in: what she can do → what you get → talk to her → she writes your
slip → you join a batch. The conversation still costs nothing; `site.consultation.price` is the
single field that changes that if he wants it paid.

### The price, settled (4 September 2026)

Agosh: *"speaking first time free. understanding problems and consultation and sending materials
is paid. 200"*

| Step | What it is | Price |
|---|---|---|
| 1 | The first conversation — what is wrong, and what yoga can do about it | Free |
| 2 | The consultation — your reports, your medicine, your whole condition, and your own slip sent on WhatsApp | **₹200** |
| 3 | The batch — the daily live class, WhatsApp support, a review every [90] days | Monthly |

Eight condition pages had been saying the consultation was free ("क्लास से पहले वंदना जी से बात
होती है — आपकी रिपोर्ट, आपकी दवा। उसका कोई शुल्क नहीं।"), which described the ₹200 step exactly.
That, and every other "बिना शुल्क" attached to the consultation, now says **पहली बात मुफ़्त** — the
first conversation is free — so nothing promises away what is being charged for. `WhatYouGet` is a
three-tier ladder carrying all three prices; the home timeline is four steps, not three. Rule 6c
makes the price mandatory on any page that names the consultation (proven red, then green).

## The calm pass — "too chaotic, crowded and confusing" (4 September 2026)

Measured before cutting, with `scripts/density.py` at 360 px: it counts screens, sections, boxes
(a container with a fill or four borders — a hairline divider is not a box), how many times the
ground colour changes, buttons, chips and any visible string repeated on a page.

**What was actually wrong**, in the order it mattered:

1. **The ground changed seven times on home**, six on About and on every condition page. Every
   section had its own tint, so nothing read as a break and nothing read as rest.
2. **Walls of identical blanks.** Stories drew "फ़ोटो जल्द" twelve times; About drew
   "[कार्यक्रम का नाम]" nine times, "[जाँच का लिंक]" six, "[प्रमाणपत्र]" five. It reads as broken
   rather than unfinished.
3. **The same thing said twice.** Home explained the steps twice — "आगे क्या होगा" and
   "आपको क्या मिलेगा" two screens apart — and repeated the batch price in a timetable the ladder
   already carried. Condition pages repeated home's whole three-tier ladder. Four identical batch
   buttons; six identical share links.

**What shipped:** three grounds per page and hairlines everywhere else (**rule 6d**, proven red);
`pending()` collapses only *identical* blank rows to one example plus a count, so a row with real
words keeps its place and everything returns the moment she fills it in; home lost the duplicate
timetable and one of its two step explanations; condition pages lost the duplicated ladder and one
of two identical asks; About folded its numbers and its certificate into the sections they belong
to; the empty gallery became one sentence; each batch button names its own batch.

| | Before | After |
|---|---|---|
| Boxes across 8 pages | 179 | **147** |
| Sections | 40 | **37** |
| Home | 9.1 screens, 7 grounds | **7.5 screens, 3 grounds** |
| शुगर | 8.9 screens, 6 grounds | **7.7 screens, 3 grounds** |
| About | 8.3 screens, 9 sections | **7.6 screens, 7 sections** |
| Stories | 45 boxes, 28 chips | **29 boxes, 22 chips** |

Text under 16 px, contrast failures, tap failures and sideways overflow all stayed at their
post-Round-6 values, so none of this was bought with legibility.
