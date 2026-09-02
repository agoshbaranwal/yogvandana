# Build prompt: योग वंदना · Yog Vandana

How to use this file: open a Claude Code session in this folder (`~/Game/yoga-site`) and say
"Read BUILD-PROMPT.md and EXECUTION-PLAN.md, then build." This file is the specification. The
visual truth is in `design/*.dc.html`: read those files, they carry the exact colours, sizes,
spacing and the Hindi copy. The canvas with every board, for looking:
https://claude.ai/code/artifact/4d5a08d2-9e93-4ad0-903c-31dca96c0a11 (page "Round 5").

Where a fact is not known yet it is a bracketed placeholder, in Hindi on Hindi pages and in
English on English pages. Build with the placeholder; never invent a value.

## 0. Facts

| Fact | Value |
|---|---|
| Her name | वंदना बरनवाल · Vandana Baranwal |
| Brand | योग वंदना · Yog Vandana ("a prayer to yoga") |
| The mark | The word योग in bhagwa, वंदना beside it in kohl, Martel 800. No monogram, no symbol. Favicon: योग on a bhagwa square |
| Motto | सर्वे सन्तु निरामयाः · "May all be free from disease" |
| Credential line | योग में एम.ए. · प्रमाणित योग शिक्षिका · MA in Yoga · Certified Yoga Teacher (more come later) |
| City | लखनऊ · Lucknow |
| Year she started teaching | [वर्ष] / [year] |
| Her teachers and study | [गुरु], [विश्वविद्यालय]; optional |
| WhatsApp (with country code) | [WHATSAPP] |
| Phone for calls (can be the same number) | [PHONE] |
| Reply hours | [REPLY_HOURS], for example सुबह 7 से रात 9 |
| Email | [EMAIL] |
| Instagram, YouTube, Facebook | [SOCIALS] |
| Postal address | [पता] / [ADDRESS] |
| Business name for the policy pages | [BUSINESS_NAME] |
| Domain | Parked. Use `https://example.invalid` in `site.json.url` until told |
| Photos | None yet. Every photo slot is a labelled placeholder block |

## 1. What this is, and what was decided

A website for a yoga teacher who sells live online classes to **people in India who want to fix
their diseases with yoga**. Its one job: turn a person with an illness into a booked free first
class. Hindi first; one tap to English.

Decided by Agosh, 2 and 3 September 2026:

1. **The claim is the site's own words**, verbatim, on Home and on every ailment page:
   Hindi "योग से हर बीमारी ठीक हो सकती है।", English "Yoga can cure any disease." Do not soften it
   and do not add disclaimers. The one health-safety line that stays is the FAQ answer about
   medicines: "नहीं। दवा अपने डॉक्टर की सलाह से ही घटाएँ। रिपोर्ट सुधरे तो डॉक्टर खुद घटाते हैं। योग
   साथ-साथ चलता है।"
2. **Ailment-first structure.** A visitor picks their illness on the home page from eight cards
   with organ icons; every ailment has its own page. The eight: कमर दर्द, घुटने का दर्द, शुगर,
   बीपी, थायराइड, मोटापा, नींद और तनाव, महिलाओं की समस्याएँ. A ninth link "और भी" lists गर्दन,
   अस्थमा, साइनस, कब्ज़, गठिया as smaller pages later.
3. **The slip, योग की पर्ची**, on every ailment page: a card with her letterhead (logo, her name
   and degree, city), the ailment chip, rows अभ्यास · समय · बैच · साथ में · जाँच, a signature slot
   and a round seal reading योग वंदना.
4. **What is sold:** live group batches (सुबह, शाम), private one-to-one sessions, workshops. Paid
   by a payment link. Delivered on Zoom with a WhatsApp group. The first class is free.
5. **Design:** the "dawn and the body" direction, World B + World C from the canvas, with the
   cards chooser (not the figure). Baloo 2 for display, Martel for the logo and quotes, Mukta for
   text. Bhagwa is #FF9933. Full system in section 3.
6. **Hindi first.** The whole site in Devanagari at `/`; the same site in English at `/en/`;
   an "English" / "हिन्दी" pill in the header switches and keeps the page.
7. **Materials come later.** Agosh writes the content and adds her photos, certificates, events
   and stories by asking Claude Code. No content editor. Every slot is a labelled placeholder now.
8. **Hosting:** a static export for a shared host, decided later. Preview from a private GitHub
   repo connected to Vercel by Agosh. Domain parked.
9. **One stop** in the build session, after the home page, for approval.

## 2. Pages and routes

Menu, desktop: तकलीफ़ · बैच · कहानियाँ · परिचय · योग्यता · गैलरी · संपर्क, then the language
pill, then the button फ़्री ट्रायल बुक करें. Phone: logo, language pill, a menu button; the trial
button lives in the hero. English menu: Conditions · Batches · Stories · About · Credentials ·
Gallery · Contact · हिन्दी · Book a free trial.

Routes use Latin slugs so links read cleanly on WhatsApp:

| Page | Hindi route | English route | Board to copy |
|---|---|---|---|
| Home | `/` | `/en/` | `design/FinalHome.dc.html`, `design/FinalHomeDesktop.dc.html` |
| All ailments | `/rog/` | `/en/conditions/` | the cards block of Home, as a full page |
| One ailment | `/rog/<slug>/` | `/en/conditions/<slug>/` | `design/FinalAilment.dc.html` |
| Batches | `/batch/` | `/en/batches/` | `design/FinalBatches.dc.html` |
| Stories | `/kahaniyan/` | `/en/stories/` | `design/FinalStories.dc.html` |
| About | `/parichay/` | `/en/about/` | `design/FinalAbout.dc.html`, `design/FinalAboutDesktop.dc.html` |
| Credentials | `/yogyata/` | `/en/credentials/` | `design/FinalCredentials.dc.html` |
| Gallery | `/gallery/` | `/en/gallery/` | grid by theme, see below |
| Contact | `/sampark/` | `/en/contact/` | `design/FinalContact.dc.html` |
| For students | `/vidyarthi/` | `/en/students/` | `design/FinalStudents.dc.html` |
| Privacy, Terms, Refunds | `/privacy/`, `/terms/`, `/refund/` | `/en/...` | plain text pages |

Ailment slugs: `kamar-dard`, `ghutne`, `sugar`, `bp`, `thyroid`, `motapa`, `neend-tanav`,
`mahila`. The same slug in both languages.

### Home, in this order (phone first)

1. Dawn hero: eyebrow (सुबह [समय] · लखनऊ · [वर्ष] से · योग में एम.ए.), the claim, one line, two
   pill buttons: फ़्री ट्रायल बुक करें (kohl, saffron text) and अपनी तकलीफ़ चुनें (translucent
   white) that scrolls to the cards.
2. Teacher line: her round portrait, name, degree, city, since when, and a परिचय link. A face
   right under the claim.
3. Numbers strip: [X] साल का अनुभव · [Y] विद्यार्थी · [N] प्रमाणपत्र · [A] सम्मान, then one line
   "Google पर ★ [4.9] · [N] समीक्षाएँ · [N] विद्यार्थी व्हाट्सऐप ग्रुप में". A missing number
   hides its item; the Google line hides until the rating exists.
4. The ailment cards, eight, with the "और भी" link.
5. कैसे शुरू करें: three numbered cards (व्हाट्सऐप पर बुक करें · फ़्री क्लास लीजिए · बैच में जुड़ें).
6. ऐसे ठीक हुए: three result cards with ailment chips; the first two carry a पहले / अब row
   (before and after, from the story's `before` and `after` fields; hidden when empty), one video
   slot, the link to Stories, and a saffron pill "अगली कहानी आपकी: फ़्री ट्रायल बुक करें".
7. आपकी दिनचर्या, योग के साथ, with the line "पहले 21 दिन हम व्हाट्सऐप पर रोज़ याद दिलाते हैं",
   the four-row routine, the class row highlighted.
8. हर रोग की अपनी पर्ची: the slip, sample for शुगर.
9. बैच: three rows (सुबह, शाम, व्यक्तिगत सेशन) with prices and buttons.
10. Credibility block on sandalwood: her portrait and three lines, the motto, certificates strip
    (four thumbnails with body and year), three cards (मुख्य अतिथि, पुरस्कार, योग शिविर), media
    logos (four), gallery strip (four photos), links to About, Credentials and Gallery.
11. लोग अक्सर पूछते हैं: four questions (online works, no time, what you need at home, the
    medicine answer).
12. पहली क्लास मुफ़्त है: the booking band, section 2b.
13. Footer on kohl: logo, motto, her name and degree, address, links, and a saffron link
    "पुराने विद्यार्थी: फ़ीस भरें" to the students page.

Desktop: the same order; the hero is two columns with the cards panel on the right (see the
desktop board); the teacher line and the Google line share one row; grids go three or four across;
the booking band is two columns, words left, the widget right.

### An ailment page, in this order

Sky-tint header band: breadcrumb (तकलीफ़ › chip), the icon in a white circle, the title
"<ailment> के लिए योग", a count line "इस तकलीफ़ के [N] विद्यार्थी · [N] कहानियाँ · [N] वीडियो"
(hidden while empty), the claim line in deep bhagwa "योग से <ailment> ठीक हो सकती है।", the intro,
the trial button, and a share link "यह पन्ना परिवार को भेजें" (WhatsApp share of the page URL).
Then: पहली क्लास में क्या होगा (three lines: the live class, the ten-minute talk, no fee no
pressure), आपकी पर्ची (the slip), क्लास में क्या होता है (four bullets), <ailment> वाले विद्यार्थी
(two story cards with पहले / अब rows and a video slot), कौन सा बैच (two rows with the per-day
price "यानी रोज़ ₹[शुल्क÷30] से कम" and the line "अगला बैच [तारीख़] से शुरू। बीच में भी जुड़ सकते
हैं।"), लोग अक्सर पूछते हैं (three questions, the medicine answer first), the booking band with
this ailment preselected, the footer. Desktop: intro and slip side by side, the rest in two
columns where it fits.

### Batches page

From `design/FinalBatches.dc.html`: each group batch card carries a chip "अगला बैच [तारीख़] से",
the per-day price, and the line "परिवार के दो लोग: [छूट]। [पहले महीने की छूट, अगर हो।]" (each
part hidden when its field is empty). The intro says what is needed at home.

### Stories page

From `design/FinalStories.dc.html`: filter chips by ailment; cards with the ailment chip, the
पहले / अब row where the story has it, a video slot where it has one, and "यह कहानी परिवार को भेजें".

### Contact page

From `design/FinalContact.dc.html`: WhatsApp first, then a call button "कॉल करें: [फ़ोन]"
(`tel:` link), the reply hours line, the form, the invite block, the address.

### For students (`/vidyarthi/`)

From `design/FinalStudents.dc.html`, for people already in a batch: this month's fee with a
payment button per batch, where the class link arrives, holidays, the batch rules, and how to get
the slip again. Linked from the footer of every page. It is `noindex` even after launch.

### Gallery

Filter chips: सभी · क्लास · योग शिविर · मंच · प्रमाणपत्र · मीडिया. A uniform grid of squares
(three across on phones, five on desktop), a lightbox with the caption (place, date) in both
languages.

### Credentials on phones

The desktop table becomes stacked cards, one per certificate, with the same fields and the
जाँचें link.

## 2b. The booking band and the prefilled messages

The booking band ("पहली क्लास मुफ़्त है।") is the same component on Home, every ailment page,
Batches and Stories. It states what the free class is (a [30]-minute live class, then [10] minutes
with her, no fee, no pressure), then two rows of chips: 1 · आपकी तकलीफ़ (the eight ailments plus
कुछ और; preselected on an ailment page) and 2 · कौन सा समय (सुबह [समय] / शाम [समय]). Below them
the WhatsApp button, then कॉल करें and फ़ॉर्म भरें side by side, then the line that shows what the
message will say and the reply time.

The WhatsApp button opens `https://wa.me/<number>?text=<encoded>` with the message built from the
chips: "नमस्ते वंदना जी, मुझे <ailment> है। <time> के फ़्री ट्रायल के लिए बात करना चाहता/चाहती हूँ।
(पन्ना: <page URL>)". Without JavaScript the link still works with the page's own ailment and
सुबह. The call button is `tel:<phone>`. The form button goes to the contact form with the ailment
preselected. Every other WhatsApp link on the site (header, hero, batch rows) carries a shorter
prefilled message that names the page it came from. English pages use English messages.

## 3. Design system

Read `design/FinalTheme.dc.html` first; these are its values.

### Colour

| Name | Hex | Job |
|---|---|---|
| Ivory | #FBF8F1 | Page background |
| Sky tint | #EAF2F8 | Calm bands: results, stories, inner-page headers |
| Apricot tint | #FFF3E3 | The class row in the routine, highlights |
| Sandalwood | #F1E7D6 | The credibility block, batches band, photo placeholders |
| Bhagwa | #FF9933 | Buttons (dark text on it), the mark, points, the free-class band |
| Deep bhagwa | #A85400 | Links, small labels, the claim line on ailment pages |
| Kohl | #231A12 | Text, the footer, the hero's primary button (saffron text on it) |
| Muted | #6E5F4E | Captions, dates, second lines |
| Rule | #E4D9C7 | Hairlines, card borders |

Dawn hero background: `linear-gradient(180deg, #DDEBF5 0%, #FBE7CF 52%, #FF9933 100%)` with a
sun disc `#FFE3B8` behind the claim and a horizon hairline `rgba(35,26,18,0.25)`. Phone and
desktop values are in the two home boards.

Ailment families, for chips and icons only: joints madder #B0304B (icon tint #F8E4E8); sugar,
BP, thyroid, weight peacock blue #1A6FA8 (tint #E4F0F9); mind, sleep, breath plum #5B2A6E (tint
#EEE3F2); women's health rani pink #D6336C (tint #FBE3EB).

Light only. No dark theme, no colour-scheme media query.

### Type

- Baloo 2, weights 600, 700, 800: the claim (46px on phones, 84px desktop), page titles (44 / 64
  to 72), section titles (28 to 30 / 36 to 38), ailment names (22 to 24), the big numbers.
  Line-height 1.05 to 1.2.
- Martel, weights 700, 800: the logo wordmark, the motto, quotes.
- Mukta, weights 400, 500, 600, 700: everything else. Body 17 to 18px on phones, 18 to 20px on
  desktop, line-height 1.6 to 1.75 (Devanagari needs the room).
- Load all three with `next/font/google`, subsets `latin` and `devanagari`, so nothing is
  requested from Google at runtime.

### Shapes and parts

Pills (999px) for buttons and chips; cards 12 to 14px radius; the hero cards panel 20px;
hairlines #E4D9C7; no shadows. Every component exists on a board; copy its values:

DawnHero · NumbersStrip · AilmentCard with the eight icons from `design/ChooserCards.dc.html` ·
ResultCard with an ailment chip · RoutineStrip · Slip (पर्ची) · BatchRow and BatchCard ·
CredibilityBlock (portrait, CertificateStrip, EventCard, MediaLogos, GalleryStrip) · TrialBand ·
Footer · LanguagePill · WhatsAppButton · VideoPlaceholder · PhotoPlaceholder (hatched sandalwood
with a Hindi label) · FAQ list · FilterChips · the Credentials table and its phone cards.

### Photos and placeholders

Every image has alt text and a caption in both languages. A placeholder is the hatched
sandalwood block with the label from the board ("फ़ोटो: वंदना, क्लास में"). No stock images, no
generated images, ever. Motion: hover only; respect `prefers-reduced-motion`.

## 4. Copy rules

- Hindi register as on the boards: everyday words (क्लास, बैच, ज़ूम, व्हाट्सऐप, शुगर, बीपी),
  nukta where standard (फ़्री, ज़ूम, फ़ोटो, रिफ़ंड). Not Sanskritised, not Hinglish in Latin script.
- Use the boards' strings verbatim where they exist. Every string exists in Hindi and English.
- Buttons say what happens: फ़्री ट्रायल बुक करें, इस बैच में जुड़ें, व्हाट्सऐप पर बुक करें,
  प्रोफ़ाइल डाउनलोड करें, भेजें.
- The claim verbatim, the medicine FAQ answer verbatim.
- On Stories only: "हर कहानी विद्यार्थी की अनुमति से, उनके नाम और शहर के साथ। हर व्यक्ति का अनुभव
  अलग होता है।"
- Placeholders in square brackets, believable in shape: "[रिपोर्ट में क्या बदला, दवा कितनी घटी,
  उनके शब्दों में।]". Never invent a number, year, name, price, time, organiser or quote.
- English pages: plain English, same structure; the claim "Yoga can cure any disease."

## 5. The content system, in two languages

One small file per item; every text field is an object `{ "hi": "...", "en": "..." }`.

- `content/site.json`: brand, her name, credential line, city, year started, the numbers each
  with a `basis`, contacts (WhatsApp, phone, email, reply hours), socials, links (payment,
  Cal.com, YouTube), `googleRating` and `reviewCount`, `groupSize`, the trial description
  (minutes of class, minutes of talk), `url`, `live`, `analyticsId`.
- `content/ui.hi.json` and `content/ui.en.json`: every interface string (menu, buttons, labels,
  section titles, the claim, the FAQ answer about medicines).
- `content/ailments/<slug>.json`: slug, name, family, icon key, `sub` (the words people say),
  claimLine, intro, `studentCount`, slip (practices, time, batch, alongside, review),
  firstClass (three lines), classNotes, faq, storyIds, video, order, `searchTerms` (Hinglish
  words for the title tag, for example "sugar ke liye yoga").
- `content/batches/*.json`: type group | private | workshop, name, schedule, days, level, group
  size, what happens, price (the per-day price is computed as price ÷ 30 and rounded up),
  `nextStart` date, `familyDiscount` and `firstMonthOffer` (optional), join link, fee link for
  existing students, date and seats for workshops, refund line.
- `content/stories/*.json`: name, city, age, ailmentSlug, quote, `before` and `after` (short,
  optional), since, photo, video, consent.
- `content/journey/*.json`, `content/credentials/*.json` (name, body, year, hours, image, verify
  URL or none), `content/awards/*.json`, `content/events/*.json` (type guest-of-honour | shivir |
  workshop | yoga-day | press), `content/media/*.json` (logos and clippings),
  `content/gurus/*.json`, `content/gallery/*.json` (theme, caption, place, date),
  `content/routine.json`, `content/faq.json`, `content/students.json` (holidays, rules,
  this month's fee dates).
- Originals under `media-src/<section>/`; a build step writes WebP at several widths into
  `public/media/` with a size manifest; the Photo component emits `srcset`, sizes and lazy loading.

Schemas (zod) validate every file at build; a bad file fails the build with a plain-words message
naming the file and field. `npm run content:check` lists every remaining placeholder by page and
language and fails while any remain. `npm run parity:check` fails if any route or string exists in
one language and not the other.

Seed so every page renders full: the 8 ailments complete, 3 batches and 1 workshop, 6 stories
(two each for शुगर, कमर दर्द, पीसीओडी), 8 journey entries, 6 credentials, 3 awards, 6 events across
the types, 4 media logos and 3 clippings, 2 gurus, 12 gallery slots, the 4 routine rows, 6 FAQs.
Every seeded value is bracketed.

## 6. Tech

- Next.js App Router, TypeScript, Tailwind, **static export** (`output: 'export'`,
  `trailingSlash: true`, `images.unoptimized: true`). The build writes `out/`, plain files for
  any host.
- Two locales: Hindi at `/`, English under `/en/`. `<html lang>` per page, `hreflang` alternates
  on every page, the switch links to the same page in the other language. No redirects.
- Fonts through `next/font/google` with the `devanagari` subset. Check every heading renders
  Devanagari conjuncts correctly in Baloo 2 and Martel.
- Link-preview images per page per language, generated at build; the generator must load a
  Devanagari-capable font file (Baloo 2 or Mukta TTF) or Hindi titles render as boxes.
- Forms: plain HTML posting to a form-service endpoint and key from `site.json` (Web3Forms or
  Formspree), honeypot field, thank-you state; WhatsApp fallback while the key is empty.
- Payments: links from content. Booking: Cal.com link, WhatsApp fallback. Video: YouTube facades.
- Analytics: Google Analytics 4 behind `site.json.analyticsId`; nothing loads while it is empty.
  Every call to action sends an event with its source: `trial_cta` (place: hero, results, band,
  ailment header), `whatsapp_click` (ailment, time, page), `call_click`, `form_submit`,
  `ailment_card_tap` (slug), `batch_join_click` (batch), `fee_pay_click`, `share_click` (page),
  `language_switch`, `video_play`. The privacy page says analytics cookies are used; no banner.
  Google Search Console is verified through a meta tag from `site.json` when Agosh provides it.
- Live mode: while `site.json.live` is false, placeholders show. When it is true, any section
  whose content is empty hides itself (results, media, gallery, awards, the Google line) instead
  of showing brackets.
- Share buttons open `https://wa.me/?text=<page title and URL>` so a page or a story can be
  forwarded to family in one tap.
- Title tags on ailment pages carry the Hindi name, the Hinglish search terms and the brand:
  "शुगर के लिए योग | sugar ke liye yoga | योग वंदना".
- Search: metadata per page, JSON-LD (Person, Course, Event), `sitemap.xml` with both languages,
  `robots.txt`; while `site.json.live` is false every page is `noindex`.
- `public/.htaccess` for the future shared host: 404, HTTPS, cache headers.
- Repo: `git init`; private GitHub repo `agoshbaranwal/yoga-site` (the Mac's `gh` is logged in as
  agoshbaranwal; verify with `gh auth status`); push at the stop and at the end. Never the work
  account. No deploy to any live host.
- No database, no authentication. Node 22.

## 7. Checks that must pass

1. Every number on the site comes from a content file.
2. Every certificate row has a जाँचें link or the words "सार्वजनिक रजिस्टर नहीं".
3. No stock or generated images; every empty slot is a labelled placeholder block.
4. No countdowns, no fake scarcity, no pop-ups.
5. Every image has alt text and a caption in both languages.
6. The Events and About pages show their "अपडेट" date.
7. Menu words exact, in both languages.
8. Link-preview title, description and image on every page, both languages, Devanagari rendering.
9. Fast: fonts bundled, images resized and lazy; Home reaches Largest Contentful Paint under
   2.5 seconds on a simulated 4G phone; no layout shift.
10. Language parity: every route and every string exists in both languages.
11. The claim verbatim on Home and every ailment page; the medicine FAQ answer verbatim.
12. The three policy pages exist in both languages.
13. Every WhatsApp link on every page carries a prefilled message naming the page and, where the
    page has one, the ailment; the booking band builds it from the chips.
14. Every call to action fires its analytics event with a source when `analyticsId` is set, and
    nothing fires when it is empty.

## 8. Out of scope

A members area, recorded courses, subscriptions, a blog, a map, an Instagram embed, the figure
chooser, the domain and the live host, real photos, Round 1 to 4 boards.

## 9. How to run the build session

1. Read this file, `EXECUTION-PLAN.md`, `design/FinalTheme.dc.html` and the page boards. Show a
   numbered plan in plain words, one line per stage, and what you are not doing. Wait for the go.
2. Stages 0 and 1: setup, the design system, Home in both languages. Screenshot at 390 and 1440,
   Hindi and English, with the headless rules in `~/Game/CLAUDE.md`. Create the private repo and
   push. Stop, show the screenshots, wait for the go. The only planned stop.
3. Stages 2 to 5 without stopping unless something needs a decision; gather questions and ask
   them together as MCQs after finishing everything that does not depend on them.
4. Stage 6: verify against section 7; screenshots of every page, both widths, both languages.
5. Report in plain words: What I built, What I found, What is left, What I need from you.
6. Push. Do not deploy anywhere. Do not buy anything.

## 10. Definition of done

- Every route in section 2 exists in both languages and renders full with bracketed content, on
  a phone and a desktop, matching the boards.
- The content system, both checks, `CONTENT-GUIDE.md` (written for Agosh telling Claude Code
  what to add) and `README.md` exist; `content:check` lists exactly the seeded placeholders.
- The checks in section 7 pass, except those waiting on real content, which are listed.
- Screenshots of every page at both widths and both languages are in `docs/screens/`.
- The code is on the private repo; the preview link opens on a phone once Agosh connects Vercel.
