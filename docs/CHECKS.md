# Credibility checks

Run with `npm run credibility:check` over the built site in `out/`.
Last run: 2026-09-03 · 38 pages.

| # | Check | Result | What was looked at |
|---|---|---|---|
| 1 | No superlative or scarcity language | pass | 14 words checked across 38 pages |
| 2 | Every certificate either links to a register, says there is none, or shows a blank still to be filled | pass | 0 credentials pages |
| 3 | No stock or generated images; empty slots are labelled blocks | pass | 0 images, 0 from other sites, 242 labelled placeholder blocks |
| 4 | No countdown, no fake scarcity, no pop-up | pass | checked every page |
| 5 | Every number traces to a content file | waiting on content | Numbers are still [X], [Y], [N], [A] in content/site.json; nothing is hard-coded in the pages. |
| 6 | The medicine answer appears word for word on home and every condition page | pass | 18 pages carry it |
| 7 | The claim appears word for word on home and on every condition page | pass | 2 home pages, 16 condition pages |
| 8 | Every image has alt text; every placeholder block is labelled for a screen reader | pass | 140 labelled blocks; 0 images without alt |
| 9 | The page that carries her record shows when it was last updated | pass | 2 pages |
| 10 | The menu uses the same plain words on every page, in both languages | pass | 38 pages |
| 11 | Every page has a link-preview title, description and image | pass | 32 preview images, one per page per language |
| 12 | Canonical and hreflang on every page; nothing indexed until the site goes live | pass | all pages paired · noindex on 38/38 pages, site.live = false |
| 13 | Every WhatsApp link opens with the message already written | pass | 316 links, 0 without a message |
| 14 | Light theme only; analytics load only once an id is set | pass | 37 KB of CSS read from 1 file(s): no colour-scheme query · analytics on 0 pages, id empty |
| 15 | Every text colour clears 4.5:1 on its background | **fail** | placeholders on the saffron band #6e5f4e on #ff9933 = 2.89:1 · placeholders in the footer #6e5f4e on #231a12 = 2.78:1 · the wordmark on ivory #ff9933 on #fbf8f1 = 2.01:1 · the wordmark on white #ff9933 on #ffffff = 2.13:1 |
| 16 | Every internal link and anchor goes somewhere | pass | 1100 links across 38 pages, and every same-page anchor has its target |
| 17 | Every link that takes money is https, on a payment provider's domain, and says which batch | waiting on content | No payment page in content/site.json yet, so every button still opens WhatsApp. |
| 18 | The sticky bar is absent on policy and 404 pages and can never cover a dialog | **fail** | on /404.html, /en/privacy/, /en/refund/, /en/terms/, /nahin-mila/, /privacy/, /refund/, /terms/ · viewer z-50 above bar z-40 · reveal keeps its transform (fill-mode both/forwards), which traps a dialog under the bar |
| 19 | Every button says one of two things: talk to her, or pay | **fail** | 18 other label(s): "मुख्य पन्ना" ×2 · "संपर्क" ×2 · "व्हाट्सऐप पर बुक करें" ×32 · "इस बैच में जुड़ें" ×18 · "समय चुनें" ×1 · "सीट बुक करें" ×1 · "Download her profile" ×2 · "Book on WhatsApp" ×30 · "Join this batch" ×18 · "Pick a time" ×1 · "Reserve a seat" ×1 · "Message on WhatsApp" ×5 · "Join" ×2 · "Book a session" ×1 · "जुड़ें" ×2 · "सेशन बुक करें" ×1 · "प्रोफ़ाइल डाउनलोड करें" ×2 · "व्हाट्सऐप पर मैसेज करें" ×5 |

14 passed, 3 failed, 2 waiting on her material.
