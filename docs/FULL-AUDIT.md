# The full audit — content and design, every page, every section

5 September 2026. Agosh: *"Ask whether each and every section, each and every page, is
user-friendly or not. Is it attractive, polished or not? … other than colours, there are no
boundation/limits … I am open to any kind of change … to any extent."*

**How this was done.** Every page template captured as a sequence of phone viewports
(390×844) and the main pages at desktop (1280×800) — 58 phone screens and 43 desktop screens —
and every one of them looked at. Not word counts. Screens. The measurements from the earlier
audit (words per section, boilerplate share, dead strings) stand and are referred to where they
matter.

---

## The finding that outranks every other

**The site is publishing its own scaffolding.**

Every surface that is supposed to be *proof* — the stories, the press logos, the photographs,
the videos, the certificates, the student counts, her timeline — is a labelled blank. What a
stranger sees, on a public site, deciding whether to trust this woman with their diabetes:

| where | what is showing |
|---|---|
| home, 8 disease tiles | **N विद्यार्थी** on every one |
| home, press strip | four identical empty boxes: *अख़बार या चैनल का लोगो* ×4 |
| home, results | three cards whose quote is the author's instruction to herself: *"रिपोर्ट में क्या बदला, दवा कितनी घटी, कितने महीनों में। उनके शब्दों में।"* — under **पूरा नाम, उम्र साल · शहर** |
| home, videos | an entire tinted section whose content is *पहले वीडियो जल्द* |
| every condition page ×16 | **N** three times, a placeholder story, **[60]** in the FAQ |
| stories page | four cards, all five fields blank; then a section that says photos will go here |
| about page | roughly **90% blank** — certificates, gurus, memberships, an 8-row timeline reading *वर्ष … जगह … N विद्यार्थी … Z शहरों*, events, press. A template with her name and one paragraph filled in |
| refund page | *"यह मसौदा है, वंदना जी की जाँच बाकी है"* — **"this is a draft, pending review"** — printed at the top of a public page |

Over 150 placeholder strings are live. The rule that produced them — *"every placeholder is the
size it would be, and says what goes in it"* (Agosh, 4 Sep) — was the right rule **for reviewing
the layout**. It is the wrong thing to ship. To a reader, a blank that says *"guru's photo goes
here"* does not read as honest; it reads as fake, or abandoned.

**A site with six sections that are all real beats a site with fourteen that are half blank.**
This is the single change that would most improve how the site reads, and it needs no new
content at all: hide what is not there yet. Everything below is secondary to it.

The design itself is mostly good. That is worth saying plainly, because it changes what the fix
is: this is not a redesign problem, it is a *what is shown* problem.

---

## Page by page, section by section

Verdicts: **KEEP** · **FIX** (small, no decision needed) · **CUT** · **HIDE** (until content
exists) · **REBUILD** · **DECIDE** (Agosh's call).

### Home — 11 sections, 754 words, ~24 phone screens

| # | section | verdict | why |
|---|---|---|---|
| 0 | Hero | **KEEP** + FIX | Good hierarchy: two badges, the claim, one-line offer, two buttons, three ticks. The photo is the weak link — a stage shot against a purple backdrop on a warm ivory page, soft at hero size. On a phone it sits under 1,200px of text, so the first screen has no face in it. |
| 1a | Counters | **KEEP** | Redesigned today. Confident, legible, the four facts a stranger checks. |
| 1b | Press strip | **HIDE** | Four empty boxes, 450px, saying the same thing four times. Nothing on the page looks less finished. |
| 2 | Eight disease tiles | **KEEP** + FIX | The right device: pick your illness. Two faults: *N विद्यार्थी* ×8, and the result line is inconsistent — sugar and BP carry one, thyroid and obesity carry nothing, so the grid looks uneven. All eight should carry one or none. |
| 3a | Medicine panel | **KEEP** | The best-designed thing on the site: dark, one question, one answer. |
| 3b | Ask row | **DECIDE** | The second WhatsApp button within two screens of the first. |
| 4 | Videos | **HIDE** | A whole section, its own background band, and the content is two lines saying videos are coming. A section that says *coming soon* says *not ready*. |
| 5 | Results, 3 cards | **HIDE until real** | The before/after cards are well designed — red/green, the record shape. The content is 100% placeholder, including author notes as quotes. One real story beats three fake ones. |
| 6 | Steps + slip | **KEEP** | Fixed today (the five-things list was removed). The slip is the strongest artefact on the page. |
| 7 | Who teaches | **KEEP** + FIX | Portrait, name, credentials, motto — good. But its three link rows (*पतंजलि प्रमाणपत्र*, *10+ सम्मान*, *अख़बार और टीवी में*) point to sections of About that are blank. A link to nothing is worse than no link. |
| 8 | Schedule | **CUT — merge into 9** | Lists morning/evening + ₹1,000. Section 9, directly beneath, lists morning/evening + ₹1,000 with pay buttons. Two blocks, 172 words, one fact. |
| 9 | Join | **KEEP** | New today. Two cards, two real buttons. |
| 10 | Closing band | **KEEP** + DECIDE | Works, but it is 1,000px of near-black on a phone and it is identical on every page — the reader has seen it before they finish the first page. |

**Calls to action on the home page:** hero (2 buttons), sticky bar, ask row after medicine, ask row
after results, join block (2), closing band (2). **Nine buttons, six places, one action.** Agosh
asked for repetition on 4 Sep; this is past the point where repetition adds and into where it
numbs. Recommendation: hero + sticky + join + band. Drop both ask rows.

### Condition page ×16 — ~500 words, 61% identical across pages

| # | section | verdict | why |
|---|---|---|---|
| 0 | Header | **KEEP** + FIX | Strong: icon, name, the हल line, three numbered benefits. *N विद्यार्थी* in the caption. |
| 1 | Medicine panel | **KEEP** + FIX | *यहाँ N लोगों की घटी है* inside the panel. |
| 2 | The slip | **REBUILD — compact** | 1,100px. The same slip as home, on all sixteen pages, with the disease filled into one row. This is the largest single cut on the site: ~800px × 16 pages. Show the slip's header and the two rows that differ by disease, and say the rest is written after the consultation. |
| 3 | पहली क्लास कैसी होगी | **KEEP** | Three clean rows. Identical on all sixteen, but it is short and answers a real question. |
| 4 | Results | **HIDE until real** | One placeholder card. |
| 5 | Batch card | **FIXED today** | Was showing *सुबह 6:30* — the placeholder time — on every condition page. Now 10 बजे. |
| 6 | FAQ | **FIX** | *मेरी उम्र [60] से ऊपर है* — bracketed placeholder in a question. |
| 7 | Band | **KEEP** | |

### Batches — the most polished page on the site

**KEEP** throughout. Header, two cards with the saffron day strip, the 1:1 row, the session
track, the striped fee rows, the FAQ, the band. One fault: *रिफ़ंड का नियम एक पंक्ति में।* in the
fee rows — the refund rule is still unwritten, and this page links to the refund page which
also does not have it.

### Stories

| section | verdict | why |
|---|---|---|
| Filter chips + 4 cards | **HIDE until real** | Every card is blank in all five fields. The page exists to prove results; today it proves the opposite. |
| Photos | **HIDE** | Heading + *तस्वीरें आने पर यहाँ लगेंगी।* |
| Band | KEEP | |

Until there is one real story, this page should not be in the navigation. When there are
three, it should be.

### About — REBUILD

This page is a template with her name and one paragraph in it, and today it works against her.
In order down the page: photo + name panel (good) → motto (good) → intro paragraph (good, *19
साल* now real) → **an author instruction printed as body text**: *"उनके अपने शब्दों में दो-तीन
पंक्तियाँ: वे क्यों सिखाती हैं…"* → a blank signature box → five stat cards that duplicate the
home counters, with one orphaned on its own row → a 550px empty certificate scan → three
credential cards, all *संस्था · वर्ष · जाँच का लिंक* → *मेरे गुरु*: *गुरु का नाम* ×2 → memberships:
*संस्था · भूमिका · वर्ष* → an 8-row timeline, every row *वर्ष* → events: three photo blanks →
press: six blanks → the orange invite band (good).

**What it should be, today:** her photo; her name; the five facts that are real (MA, Lucknow
University · Patanjali Yogpeeth certified · since 2007 · 50,000+ students · Lucknow); the motto
and its gloss; her one paragraph; the invite band. **One screen and a half.** Every other section
appears the day its content does — one at a time, and only then. On desktop the emptiness is
worse: three event cards leave a quarter of the row bare and the timeline is eight lines of the
word *वर्ष*.

### Contact — KEEP

Well done. Phone card with hours, a proper WhatsApp button, a short form with the disease chips
and one free field, the address. Nothing to cut. The second-best page after Batches.

### Students (पुराने विद्यार्थियों के लिए)

| section | verdict | why |
|---|---|---|
| Fee cards | **FIX** | Say *व्हाट्सऐप पर बात करें* where the rest of the site now says *जुड़ें और भुगतान करें*; the 1:1 card showed *₹शुल्क* — fixed today. |
| Class link, slip | KEEP | Short, useful. |
| Holidays | **HIDE until real** | *तारीख़ — त्योहार, क्लास नहीं* ×2, *नियम: रविवार की क्लास है या नहीं*. |
| Routine | **HIDE until real** | *समय* ×3. |
| Rules | KEEP | Real. |

### Refund / Terms / Privacy

Refund opens with **"यह मसौदा है, वंदना जी की जाँच बाकी है"** and its body has author notes as
paragraphs: *रिफ़ंड का नियम: कितने दिनों में, कितना हिस्सा वापस होता है।* Both must go. The refund
rule itself is Agosh's to write — it is the one line between this site and taking money.

### 404

Fine. Says what happened, offers the disease tiles and the two links a lost reader wants.

---

## Design, in one place

**Polished and should not be touched:** hero layout · counters · medicine panel · before/after
card shape · batch cards and the day strip · session track · fee rows · the slip · the contact
form · header · footer · the buttons (after today).

**Weak, and why:**

- **The closing band.** Correct, but 1,000px of near-black on every page, identical each time,
  with the *"संदेश पहले से लिखा होगा: …(पन्ना: मुख्य पन्ना)"* preview line, which is a developer's
  sentence. Could be half the height and vary by page.
- **The photograph.** A stage shot, purple backdrop, 249px wide. It is in the hero, the About
  header, and the *who teaches* block. A real portrait — window light, plain wall, waist up —
  would change the whole site more than any code.
- **The sticky bar.** Lives on every screen of every page, above a page that already has a
  WhatsApp button roughly every two screens.
- **Section rhythm on home.** Ivory → paper → ivory → tint → ivory → paper → ivory → paper →
  ivory → dark. Eleven sections in six backgrounds. Fewer, longer sections with fewer changes of
  ground would read as calmer and more confident.

**Duplicated:** Schedule/Join (home) · About stat cards / home counters · the slip on 17 pages ·
the price line said twice on every condition page.

---

## The plan, in order

**A · Stop publishing blanks.** *No new content needed.* A build rule: any element whose value is
still `[bracketed]`, `N`, or empty does not render in production, and a section with nothing real
in it collapses. Agosh's review rule survives in a preview build. This alone removes 150+
placeholder strings from the public site and is the single biggest improvement available.

**B · Home.** Merge Schedule into Join. Drop the two ask rows. Hide press, videos and results
until each has one real item. Make the eight tiles consistent. Remove the links to blank About
sections.

**C · About.** Rebuild as the short, real page above.

**D · Condition pages.** The compact slip. Fix the `[60]`. Remove the *N*s (covered by A).

**E · Students and Refund.** Fee cards to the pay flow; hide the blank rows; strip the draft
notice.

**F · The band and the sticky bar.** Halve the band; drop the preview line; consider the sticky
bar only below the fold of long pages.

**G · The photograph.** When he has one.

Each of A–F is a day or less. A is first because everything else is nicer with it and nothing
depends on it.

---

## What I need from Agosh before B–F

Four decisions. Everything in A can go ahead without them.

1. **Blanks in public** — hide until real (my strong recommendation), or keep visible?
   *This reverses the 4 Sep rule, so it is his to reverse.*
2. **How readers arrive** — Google search for an illness · a WhatsApp link she sends · word of
   mouth. Google means the condition pages are the front door and home matters less; WhatsApp
   means home is everything.
3. **The primary action** — get them talking (free call) · get them paying (join) · both equally.
   Decides whether the join block or the talk block leads, and how many of each.
4. **What will exist in two weeks** — a real portrait · one to three real stories with names ·
   certificate scans · press cuttings · none of these yet. The rebuild should be shaped around
   what is coming, not what might.
