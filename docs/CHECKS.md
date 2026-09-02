# Credibility checks

Run with `npm run credibility:check` over the built site in `out/`.
Last run: 2026-09-02 · 42 pages.

| # | Check | Result | What was looked at |
|---|---|---|---|
| 1 | No superlative or scarcity language | pass | 14 words checked across 42 pages |
| 2 | Every certificate has a verify link or says there is no registry | pass | 2 credentials pages |
| 3 | No stock or generated images; empty slots are labelled blocks | pass | 0 images, 0 from other sites, 238 labelled placeholder blocks |
| 4 | No countdown, no fake scarcity, no pop-up | pass | checked every page |
| 5 | Every number traces to a content file | waiting on content | Numbers are still [X], [Y], [N], [A] in content/site.json; nothing is hard-coded in the pages. |
| 6 | The medicine answer appears word for word on home and every condition page | pass | 18 pages carry it |
| 7 | The claim appears word for word on home and on every condition page | pass | 2 home pages, 16 condition pages |
| 8 | Every image has alt text; every placeholder block is labelled for a screen reader | pass | 214 labelled blocks; 0 images without alt |
| 9 | About and Credentials show when they were last updated | pass | 4 pages |
| 10 | The menu uses the same plain words on every page, in both languages | pass | 42 pages |
| 11 | Every page has a link-preview title, description and image | pass | 36 preview images, one per page per language |
| 12 | Canonical and hreflang on every page; nothing indexed until the site goes live | pass | all pages paired · noindex on 42/42 pages, site.live = false |
| 13 | Every WhatsApp link opens with the message already written | pass | 332 links, 0 without a message |
| 14 | Light theme only; analytics load only once an id is set | pass | no colour-scheme query · analytics on 0 pages, id empty |

13 passed, 0 failed, 1 waiting on her material.
