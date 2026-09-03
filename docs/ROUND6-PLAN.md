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

## What this plan does not do

Real photographs and her facts still gate the last mile; the build carries drawn placeholders and
brackets until then. English stays a faithful translation, not a rewrite for the second buyer.
Nobody from the audience has used it yet — the mobile checklist in Phase 9 is written so that the
first person who does can be watched.
