# Audit

Written after the build, by the person who built it, looking for what is missing or weak.
Dated 3 September 2026. The site is live at **https://agoshbaranwal.github.io/yogvandana/**

> **A second pass followed the same day.** Agosh read the site and said it was easy to navigate
> but hard to take anything away from, and set five other changes besides. What was wrong with the
> content, and what changed, is in **`docs/CONTENT-AUDIT.md`**; the offer, the typography, the
> illustrations and the movement all changed with it. Sections 1 and 2 below still describe the
> site, with the home page now nine blocks rather than fifteen and the type down to seven sizes in
> two faces.

---

## 1. What is there

| | |
|---|---|
| Pages built | 41, every one in Hindi and English |
| Conditions | 8, each a page of its own, generated from one file each |
| Content files | 72 small JSON files, 764 bilingual strings |
| Components and views | 21 components, 9 page views, one design system |
| Checks | `content:check`, `parity:check`, `credibility:check`, lint, types |
| Screenshots | every page, phone and desktop, both languages, in `docs/screens/` |

Routes: home · all conditions · one page per condition · batches · stories · about ·
credentials · gallery · contact · students · privacy · terms · refunds · 404. In Hindi at the
root, in English under `/en/`, with a pill in the header that keeps the page you are on.

## 2. Measured, not asserted

On a throttled phone (4× slower CPU, 1.6 Mbps, 150 ms round trip), against the live host:

| | Home | A condition page | Target |
|---|---|---|---|
| Largest contentful paint | 0.93 s | 0.98 s | under 2.5 s |
| Cumulative layout shift | 0.009 | 0.000 | under 0.1 |
| Fully loaded | 2.3 s | 2.2 s | — |
| Transferred | 486 KB | 422 KB | — |
| HTML, compressed | 22 KB | 16 KB | — |

Measured again after the second pass. Everything improved, and the reason is the type: two faces at
three weights each is 208 KB where three faces were 350 KB, and the home page carries a third of the
images it did.

Fonts are 208 KB of that and are the floor: a Devanagari weight is 60 to 110 KB on its own. The
site loads Baloo 2 at three weights and Montserrat at three, and nothing else — it started at
544 KB across three families.

Sixteen credibility rules run over the built pages: **15 pass, 1 waits on her material**
(`docs/CHECKS.md`). Both languages match on every string and every route. No page scrolls
sideways at 390 px or 1440 px. Every page has exactly one `h1`, every image has alt text, every
placeholder block is labelled for a screen reader. Every text colour the site paints clears 4.5:1 on
its own background — thirteen pairs, the closest being the small print on the saffron band at 4.62:1,
and the rule fails the check if a future palette edit drops one below. All 1,670 internal links and
every same-page anchor resolve.

Driven with the keyboard: the skip link comes first, the focus ring is a dark ring inside a pale one
so it shows on the saffron band and on the dark buttons alike, and the full-screen menu behaves like
the dialog it is — focus moves into it, stays inside it, and returns to the menu button on Escape.

Driven in a real browser, not assumed: the language pill keeps the page, the mobile menu opens
and locks the scroll, the gallery filter narrows 12 photos to 4 and the viewer closes on Escape,
the story filter narrows 6 to 1, the booking band rewrites its WhatsApp message when you change
the chips, and the sticky bar appears past the hero and steps aside at the band. With JavaScript
switched off, the band's buttons still carry the right message.

## 3. What is deliberately not finished

These are decisions, not omissions.

- **Every fact about her is a blank.** 791 bracketed facts, 50 photographs, 52 links and
  numbers. They show as dotted blanks, which is the honest state for a site whose whole job is
  to be believed. `npm run content:check` lists them page by page.
- **The site is not indexed.** `content/site.json` says `live: false`, so every page carries
  `noindex` and robots.txt disallows everything. Flip it the day the blanks are gone.
- **The domain is parked.** It runs from a sub-folder on GitHub Pages, which is why the build
  passes `NEXT_PUBLIC_BASE_PATH`. On her own domain that variable is empty.
- **No payments, no login, no video hosting.** Payment links, the booking calendar and YouTube
  are fields in the content files; every button falls back to WhatsApp until they are filled.
- **The form is not connected.** It renders in full so the page is complete, and hands over to
  WhatsApp until a form-service key is set.

## 4. What I would improve next, in order

1. **Photographs are the whole difference.** Fifty labelled blocks are honest but they cannot
   sell. One good photograph of her teaching, with students in frame, would do more for this
   site than any further code. It is also the only way the credibility block stops reading as a
   grid of hatching.
2. **Two or three real student stories, with a before and after.** The story cards are built for
   a number that changed (a reading, a dose, a flight of stairs). Empty, they are the weakest
   part of the page; filled, they are the strongest.
3. **The home page is long on a phone** — about 7,200 px, eight or nine screens. Everything on it
   earns its place, but if the analytics later show people leaving before the batches, the
   routine and the slip could move to their own page.
4. **The English side is a translation, not a rewrite.** It is correct and complete, but a
   person who reads English in India is often a different buyer (an NRI child buying for a
   parent, say). If that turns out to matter, the English home deserves its own argument.
5. **Google Analytics is wired but off.** Every call to action already carries its event name and
   its source; add the id in `content/site.json` and the funnel starts recording with no code
   change. Until then nothing loads and no cookie is set.
6. **A Google Business Profile would feed the one number the site cannot fake.** The rating line
   under the four numbers stays hidden until there is a rating.
7. **The workshop card is a single placeholder.** If she runs workshops often, that section wants
   a list and past workshops with photographs.
8. **The slip could be printable per condition.** The print stylesheet is there and the slip
   prints cleanly, but no page offers a "print this" button yet.

## 5. Risks worth stating plainly

- **The claim.** "योग से हर बीमारी ठीक हो सकती है" is the site's own sentence on the home page and
  on all eight condition pages, as decided. Two things follow. India's Drugs and Magic Remedies
  (Objectionable Advertisements) Act, 1954 restricts advertising that claims to cure a schedule
  of named diseases, and that schedule includes diabetes. And a doctor or a sceptical relative
  reading the page will weigh it against the rest of the evidence. The site does what it can
  around it: the medicine answer appears word for word on every page that carries the claim, the
  terms page says yoga runs alongside treatment and does not replace it, and no page tells anyone
  to stop a medicine. The decision is recorded here so it is not mistaken for an oversight.
- **A public repository.** The code and content are public at
  github.com/agoshbaranwal/yogvandana, which is what free GitHub Pages requires. There is nothing
  private in it today: no keys, no numbers, no photographs. Once real phone numbers and student
  stories go in, they are public too — which they would be on the website anyway, but the git
  history keeps every version.
- **Placeholders on a reachable URL.** The preview is not indexed, but anyone with the link can
  open it. That is fine for showing Vandana; it is not a page to broadcast yet.

## 6. Things I checked and found sound

- Both languages build from the same components, so a change lands in both or the parity check
  fails the build.
- Structured data (Person, Course, FAQ, breadcrumbs) omits any value that is still a placeholder,
  so no search engine is ever handed "[N] students".
- The sitemap lists 38 URLs with `hreflang` pairs; robots and canonical follow the live switch.
- Link previews are pre-drawn PNGs, one per page per language, so Hindi never renders as boxes in
  a WhatsApp card. Verified live.
- Tap targets are 44 px or more everywhere except four links inside sentences, which the WCAG
  target-size rule exempts.
- Light theme only, no colour-scheme query anywhere, as agreed. That rule now reads the built
  stylesheet and fails if it finds none, rather than passing on an empty look.
- The 404 is the site's own page, in both languages, with the menu on it.
- Every page title now fits in a search result — the longest is 45 characters. The Hinglish search
  terms people actually type sit in `keywords`, where nobody has to read them, instead of trailing
  off the end of the title.
- The layouts that swap between phone and desktop keep both versions in the HTML, which looks like
  a screen reader would hear everything twice. It does not: the copy for the other width is
  `display: none`, so it is out of the accessibility tree and out of the tab order. Checked at both
  widths rather than assumed.
