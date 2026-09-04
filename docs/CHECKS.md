# Credibility checks

Run with `npm run credibility:check` over the built site in `out/`.
Last run: 2026-09-04 · 38 pages.

| # | Check | Result | What was looked at |
|---|---|---|---|
| 1 | No superlative or scarcity language | pass | 14 words checked across 38 pages |
| 2 | Every certificate either links to a register, says there is none, or shows a blank still to be filled | pass | 0 credentials pages |
| 3 | No stock or generated images; empty slots are labelled blocks | pass | 0 images, 0 from other sites, 89 labelled placeholder blocks |
| 4 | No countdown, no fake scarcity, no pop-up | pass | checked every page |
| 5 | Every number traces to a content file | waiting on content | Numbers are still [X], [Y], [N], [A] in content/site.json; nothing is hard-coded in the pages. |
| 6 | The medicine answer appears on home and, in its own terms, on every condition page | pass | 18 pages carry it |
| 6b | No named practice is published: the slip is written after the consultation, not before it | pass | 38 pages carry no named asana or pranayama |
| 6c | The consultation's price is named wherever the consultation is | pass | ₹200 on home, every condition page, and every page that names it |
| 6d | A page rests on at most three grounds: the page, one accent, and the ask | pass | 38 pages checked |
| 6e | One design system: at most three radii, no shadows, no hatching | pass | radii 999px 50% 12px, no shadows, no hatching |
| 7 | The claim appears word for word on home and on every condition page | pass | 2 home pages, 16 condition pages |
| 8 | Every image has alt text; every placeholder block is labelled for a screen reader | pass | 139 labelled blocks; 0 images without alt |
| 9 | The page that carries her record shows when it was last updated | pass | 2 pages |
| 10 | The menu uses the same plain words on every page, in both languages | pass | 38 pages |
| 11 | Every page has a link-preview title, description and image | pass | 32 preview images, one per page per language |
| 12 | Canonical and hreflang on every page; nothing indexed until the site goes live | pass | all pages paired · noindex on 38/38 pages, site.live = false |
| 13 | Every WhatsApp link opens with the message already written | pass | 204 links, 0 without a message |
| 14 | Light theme only; analytics load only once an id is set | pass | 33 KB of CSS read from 1 file(s): no colour-scheme query · analytics on 0 pages, id empty |
| 15 | Every text colour clears 4.5:1 on its background | pass | 16 pairs measured, the closest being links on the apricot bands at 4.74:1 |
| 16 | Every internal link and anchor goes somewhere | pass | 1052 links across 38 pages, and every same-page anchor has its target |
| 17 | Every link that takes money is https, on a payment provider's domain, and says which batch | waiting on content | No payment page in content/site.json yet, so every button still opens WhatsApp. |
| 18 | The sticky bar is absent on policy and 404 pages and can never cover a dialog | pass | absent on 8 quiet pages · viewer z-50 above bar z-40 · reveal leaves no transform behind |
| 19 | Every button says one of two things: talk to her, or pay | pass | 120 buttons, every one from the allowed set |

21 passed, 0 failed, 2 waiting on her material.
