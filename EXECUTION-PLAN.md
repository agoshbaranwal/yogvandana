# Execution plan: योग वंदना · Yog Vandana

For the build session (Opus). Read `BUILD-PROMPT.md` first: it is the specification. Then read
`design/FinalTheme.dc.html` and the page boards in `design/`: they are the visual truth, with
exact colours, sizes, spacing and Hindi copy. This file is the order of work, the one stop, the
owner actions and the traps. Canvas for looking:
https://claude.ai/code/artifact/4d5a08d2-9e93-4ad0-903c-31dca96c0a11 (page "Round 5").

Planned 2 and 3 September 2026 by Claude with Agosh. Nothing has been built yet.

## Decisions that shape this plan

1. **Hindi first, English second.** Hindi at `/`, English under `/en/`, a pill switches between
   the same page in both. Every string and every route exists twice. A parity check enforces it.
2. **Ailment-first.** Eight ailment cards on Home, one page per ailment from one template and one
   content file each. The slip (योग की पर्ची) is a component used on every ailment page.
3. **The claim** "योग से हर बीमारी ठीक हो सकती है।" / "Yoga can cure any disease." is in the site's
   own words, verbatim, on Home and every ailment page. Agosh's decision; do not soften.
4. **Static export** for a shared host, chosen later. Preview through a private GitHub repo
   `agoshbaranwal/yoga-site` that Agosh connects to Vercel himself. Domain parked.
5. **One stop**, after Home in both languages, with screenshots.
6. **Materials later.** Every fact and photo is a bracketed placeholder or a labelled block.
   `content:check` lists what remains; nothing invented.
7. **The boards are the spec.** Copy their values. Where a page has no board (Gallery, the
   English inner pages, Credentials on a phone), follow the nearest board and the prompt.
8. **The audit additions (3 September, night).** A marketing and product pass added: the teacher
   line and Google line under the hero, the three-step "कैसे शुरू करें", पहले / अब rows on result
   cards, a call-to-action after the results, the 21-day reminder line, a four-question FAQ on
   Home, the booking band with ailment and time chips that build the WhatsApp message, call and
   form buttons beside it, per-day prices and next-batch dates, family and first-month offer
   slots, share-to-family links, the students page for fees and rules, and analytics events on
   every call to action. All of it is on the boards and in the prompt.

## Ground rules for the session

- Plain-words reports under four headings: What I built, What I found, What is left, What I need
  from you. Commit titles say what changed.
- Never invent a fact about her. Square brackets, Hindi inside on Hindi pages.
- Light only. Standard words. The Hindi register of the boards.
- Never open a tab in Chrome. Screenshots through `~/Game/Witness/ui-harness/shot` or
  `~/Game/Climate Change/tools/cdp.py` per `~/Game/CLAUDE.md`; kill headless Chrome after every
  capture, Lighthouse runs included.
- Verify with artifacts: screenshots, check output, numbers. Not adjectives.
- Finish the whole stage. Questions mid-stage: finish what does not depend on them, then ask
  together as MCQs.
- `gh auth status` must show `agoshbaranwal` before creating the repo (checked 2 September: it
  does). Never the work account. Node 22 is installed.
- Do not deploy to any host. Do not buy anything. Do not enter credentials anywhere.

## Stages

### Stage 0. Setup, nothing visible yet

- 0.1 `git init`; `.gitignore` for `node_modules`, `.next`, `out`, generated `public/media`.
- 0.2 Next.js App Router, TypeScript, Tailwind, ESLint. `next.config`: `output: 'export'`,
  `trailingSlash: true`, `images.unoptimized: true`.
- 0.3 Locales: a `[lang]` segment is NOT used; Hindi pages live at the root and English pages
  under `app/en/`, sharing the same page components with a `lang` prop. One helper returns the
  alternate route for the language pill and the `hreflang` tags.
- 0.4 Fonts: Baloo 2, Martel, Mukta via `next/font/google`, subsets `latin` and `devanagari`.
- 0.5 Design tokens in Tailwind from `design/FinalTheme.dc.html`: the nine colours, the four
  family colours and tints, the dawn gradient, the type scale, radii (pill 999, card 12 to 14,
  panel 20), no shadows.
- 0.6 Content schemas (zod) for every folder in prompt section 5; every text field is `{hi, en}`.
  A bad file fails the build with a message naming the file and field.
- 0.7 Seed content in the prompt's counts, all bracketed, Hindi and English.
- 0.8 Image pipeline: `media-src/` originals, `npm run media:prepare` writes WebP at 480, 960
  and 1600 into `public/media/` with a size manifest; the Photo component emits srcset, sizes,
  width, height, lazy loading; hero images not lazy.
- 0.9 Scripts: `dev`, `build`, `media:prepare`, `content:check`, `parity:check`,
  `credibility:check`, `screens` (every route, 390 and 1440, both languages, into
  `docs/screens/`), `profile:pdf`, and `check` (lint, typecheck, the three checks, build).
- 0.10 Commit: "Set up the site: framework, two languages, tokens, content files, image pipeline".

### Stage 1. Design system and Home, then stop

- 1.1 Components from the boards: DawnHero, Header with LanguagePill and menu, Footer with the
  students link, TeacherLine, NumbersStrip with the Google line, AilmentCard and the eight icons
  (`design/ChooserCards.dc.html`), StepsRow (कैसे शुरू करें), ResultCard with chip and the
  पहले / अब row, RoutineStrip with the 21-day line, Slip, BatchRow and BatchCard with per-day
  price and next-batch chip, CredibilityBlock parts (portrait, CertificateStrip, EventCard,
  MediaLogos, GalleryStrip), FAQ list, BookingBand (the chips that build the WhatsApp message,
  the call and form buttons; works without JavaScript with the page's own ailment), ShareLink,
  PhotoPlaceholder, VideoPlaceholder, FilterChips.
- 1.2 Home in Hindi and English, in the order of prompt section 2, from
  `design/FinalHome.dc.html` and `design/FinalHomeDesktop.dc.html`.
- 1.3 The favicon and manifest (योग on a bhagwa square).
- 1.4 Build, serve `out/` locally. Screenshots at 390 and 1440, Hindi and English, full page.
  Lighthouse mobile on Home; note LCP and CLS. Confirm Devanagari renders in all three faces.
  Tap through the booking band: change the ailment and time chips and confirm the WhatsApp link
  text changes; confirm the link is right with JavaScript off.
- 1.5 Create the private repo: `gh repo create agoshbaranwal/yoga-site --private --source=. --push`.
- 1.6 Commit and push. Stop. Report with the screenshots, the two numbers, and the Vercel steps
  for Agosh. Wait for the go. If he asks for changes, make them, re-shoot, push, then continue.

### Stage 2. The ailment pages, Stories, Batches

- 2.1 The ailment template from `design/FinalAilment.dc.html`, phone and desktop, generated for
  every file in `content/ailments/` in both languages (`generateStaticParams`).
- 2.2 The all-ailments page (`/rog/`, `/en/conditions/`): the cards as a full page.
- 2.3 Stories with filter chips by ailment, पहले / अब rows and share links, from
  `design/FinalStories.dc.html`.
- 2.4 Batches from `design/FinalBatches.dc.html`: next-batch chips, per-day prices, the family
  and first-month offer lines that hide when empty.
- 2.5 Commit: "Add the ailment pages, stories and batches".

### Stage 3. About, Credentials, Gallery, Contact

- 3.1 About from `design/FinalAbout.dc.html` and `design/FinalAboutDesktop.dc.html`, all blocks.
- 3.2 Credentials: the desktop table from `design/FinalCredentials.dc.html`; stacked cards on
  phones; Experience, Memberships, Awards.
- 3.3 Gallery: theme chips, square grid, lightbox with bilingual captions.
- 3.4 Contact from `design/FinalContact.dc.html`: WhatsApp click-to-chat with prefilled text, the
  call button and reply hours,
  the form (plain HTML to the form-service endpoint, honeypot, thank-you state, WhatsApp fallback
  while the key is empty), the invite block, the profile page at `/profile/` printed to
  `public/profile.pdf` by `npm run profile:pdf`.
- 3.5 The students page `/vidyarthi/` and `/en/students/` from `design/FinalStudents.dc.html`,
  `noindex`, linked from every footer.
- 3.6 Commit: "Add About, Credentials, Gallery, Contact and the students page".

### Stage 4. System pages and search

- 4.1 Privacy, Terms, Refunds in both languages, plain-words drafts marked for review, in the
  shape Razorpay asks for.
- 4.2 404, `sitemap.xml` (both languages), `robots.txt`; `noindex` everywhere while
  `site.json.live` is false.
- 4.3 Link-preview images per page per language, generated at build with a Devanagari-capable
  font file loaded into the generator. Check one Hindi title by eye.
- 4.4 JSON-LD: Person on Home and About, Course on Batches, Event on each event.
- 4.5 `hreflang` alternates and `<html lang>` on every page.
- 4.6 Google Analytics 4 behind `site.json.analyticsId`, with the named events from prompt
  section 6 on every call to action, each carrying its source; nothing loads while the id is
  empty. Title tags on ailment pages with the Hinglish search terms. Live mode: empty sections
  hide when `site.json.live` is true. `public/.htaccess` for the future shared host.
- 4.7 Commit: "Add policies, search files, link previews and the 404 page".

### Stage 5. The content system and the documents

- 5.1 `content:check`: every remaining placeholder (bracketed text, missing image, empty number)
  by page and language; fails while any remain.
- 5.2 `parity:check`: every route and every string exists in both languages.
- 5.3 `credibility:check` over `out/`: the twelve checks in prompt section 7, written to
  `docs/CHECKS.md` as pass, fail, or waiting on content.
- 5.4 `CONTENT-GUIDE.md` written for Agosh telling Claude Code what to add: for each kind of
  item, what to say, where photos go, what the check prints when it landed, one example in each
  language.
- 5.5 `README.md`: run, build, add one ailment, one batch, one story, one photo, one certificate.
- 5.6 `docs/DEPLOY.md`: how `out/` goes onto a shared host later, the `.htaccess`, the two
  switches at launch (`site.json.url`, `site.json.live`), how the Vercel preview differs.
- 5.7 Commit: "Add the checks, the guide, the README and the deploy notes".

### Stage 6. Verification and the report

- 6.1 `npm run check` clean; `content:check` lists exactly the seeded placeholders.
- 6.2 `npm run screens`: every route, both widths, both languages. Look at each one against its
  board.
- 6.3 Lighthouse mobile on Home, one ailment page and Gallery: LCP, CLS, total weight.
- 6.4 The form: one submission with the key empty (WhatsApp fallback), the honeypot rejects.
- 6.5 Every WhatsApp link opens `wa.me` with its prefilled Hindi text intact and naming the
  page; the booking band message changes with the chips. Analytics events fire with a test id
  (GA debug view) and do not fire with an empty id.
- 6.6 The language pill on every page lands on the same page in the other language.
- 6.7 No broken internal links (a script over `out/`).
- 6.8 Push. Report under the four headings with the screenshots and the tables. List the owner
  actions still open.

## Owner actions for Agosh, in the order they are needed

1. After Stage 1: look at the screenshots and say go, or say what to change.
2. After Stage 1: in Vercel, Add New Project, import `agoshbaranwal/yoga-site`, framework
   Next.js, deploy. The link it gives is the preview. About ten minutes.
3. Any time: the facts in prompt section 0, her photos, certificates, events, stories, awards,
   media, in any order, by telling Claude Code.
4. Later: a free form-service key; the payment and fee links; the Cal.com link; the next batch
   dates each month; the phone number and reply hours; a Google Analytics 4 property id; a Google
   Business Profile (its rating feeds the Google line); WhatsApp Business on her number with a
   greeting and quick replies for the eight ailments; the domain and host.

## Traps to avoid

- A static export has no server: no API routes, no image optimisation at request time, no
  middleware. Every route, in both languages, must be known at build time.
- Do not put the English site behind a redirect or a cookie. `/` is Hindi, `/en/` is English,
  both are plain folders of files.
- Devanagari: line-heights of 1.6 or more for text, 1.15 to 1.2 for display; check conjuncts
  (क्ष, त्र, ज्ञ, र्व) in all three faces; load the `devanagari` subset; the link-preview
  generator needs a font file that has it.
- `trailingSlash: true`, or `/rog/sugar` gives a 404 on a shared host.
- The form key is public in the HTML by design of these services; that is fine.
- Never write a real-looking number, name, award or quote into seed content. Brackets, always.
- The claim is verbatim; the medicine FAQ answer is verbatim.
- Do not add a dark theme, a cookie banner, a chat widget, animations, or a lotus.
- Do not build the figure chooser; Agosh chose the cards.
- The booking band must work as plain links first; the chips only change the message text.
- Analytics must never load without an id, and every event must carry a `source`.

## Not in this plan

The domain, the live host, real photos and facts, the figure chooser, a members area, recorded
courses, subscriptions, a blog, a map, an Instagram feed.

## Done means

- Everything in prompt section 10.
- The code is on the private repo; the preview link opens on a phone after Agosh's Vercel step.
- `docs/CHECKS.md`, `docs/screens/`, `CONTENT-GUIDE.md`, `README.md`, `docs/DEPLOY.md` exist.
