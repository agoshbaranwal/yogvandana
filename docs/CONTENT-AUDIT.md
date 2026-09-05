# Content audit

Written 3 September 2026, after Agosh said the site is easy to navigate but hard to take anything
away from. That is the right diagnosis, and it is not something small edits fix. This is the
examination, section by section, and the decisions that follow from it.

---

## 1. What is actually wrong

Six faults, in the order they cost the most.

**1. Every section has the same weight, so nothing has any.** Home is fifteen blocks, and every one
is built the same way: a heading, a line under it, a row of equal cards. "Pick your condition" — the
one thing the page exists to make happen — looks exactly like "In the media". A reader with no
ranking to follow reads the first two blocks and leaves.

**2. Proof is scattered across six sections instead of standing in one place.** Numbers, stories,
certificates, events, press logos and the gallery are six separate blocks on the home page, each
half-convincing on its own. Together in one place they would be an argument. Apart, they are decor.

**3. Sixteen empty photo frames sit in a single block.** The credibility section alone holds a
portrait, four certificates, three events, four press logos and four gallery pictures. Until her
photographs arrive, that is a wall of hatching — and even after they arrive it is a contact sheet,
not a claim. The page should show three photographs it can defend and link to the rest.

**4. The heading names the section; the line under it says the heading again.** "आपको क्या तकलीफ़ है?"
followed by "अपनी समस्या चुनिए" is the same sentence twice. Nine of the eleven leads on the home page
restate their heading instead of adding a fact. The reader learns to skip the second line, and then
skips the ones that mattered.

**5. Every section ends with an ask.** The header button, two buttons in the hero, one after the
stories, one after the batches, the sticky bar, the band. Seven asks means no next step: a page that
asks constantly is a page that is not sure what it wants.

**6. The best thing on the site is described as a mechanism.** "हर रोग की अपनी पर्ची" tells you the
site has a feature. What the reader wants to know is that they walk away with their own practice,
written for their condition, that they can stick on the fridge. Say the outcome.

Two smaller ones: the condition pages carry two sections that answer nearly the same question
("पहली क्लास में क्या होगा" and "क्लास में क्या होता है"); and the batch cards repeat the same
"10 / 30 / 10 minutes" list on every card, so a shared fact is charged to the reader three times.

## 2. What each section is for

A section earns its place by leaving one sentence in the reader's head. If it cannot, it is cut or
folded into one that can.

| Section | The one thing it must leave behind |
|---|---|
| Hero | Yoga can cure what I have, and this teacher teaches it live, every morning |
| Conditions | My problem is on this list, and it has a page of its own |
| How it starts | Talking to her costs nothing; the classes cost money; here is what happens |
| The slip | I walk away with my own practice, written for me |
| The day | Thirty minutes in the morning is all it asks of my life |
| Proof | Real people, real numbers, checkable qualifications — in one place |
| Fees | What it costs, per month and per day, with no surprise |
| Answers | The four objections in my head are already answered |
| The band | One message, already written, and she replies |

## 3. What changes

**The home page goes from fifteen blocks to nine**, in the order a person actually decides in: the
claim, then my problem, then how it starts, then what I leave with, then the day, then the proof,
then the cost, then the answers, then the one ask.

- Certificates, events, press and the gallery leave the home page as separate blocks. They become
  **one proof section** — the numbers, three student stories, and a single compact strip of her
  record — each linking to the full page that already exists.
- Photo frames on the home page drop from sixteen to three.
- Placeholders stop shouting. The hatched blocks become a quiet outline with a small label, so an
  unfilled page reads as a layout waiting for a picture rather than a page of static.
- **Every heading carries the takeaway.** "आपको क्या तकलीफ़ है?" stays — it is a question, which is
  already a takeaway. "हर रोग की अपनी पर्ची" becomes "आप अपनी पर्ची लेकर जाते हैं". Leads that repeat
  their heading are deleted; leads that carry a fact stay and get shorter.
- **One ask per screenful.** The hero has one button, not two. The mid-page asks come out. The band
  and the sticky bar stay, because they are the ask.
- The two class sections on a condition page merge into one. The batch cards say the shared
  "10 / 30 / 10" once, above the cards.

## 4. Typography

Seventeen font sizes were in use in the components and a dozen more in the stylesheet — thirty in a
site with nine kinds of text. Three type families were loaded.

Now: **one Hindi face (Baloo 2), one English face (Montserrat), and seven sizes** — label 13, small
15, body 17, sub 20, head 26, title 34, display. Hierarchy comes from weight (400 / 600 / 800) and
colour, not from a new size for every occasion. A check fails the build if a raw pixel size appears
in a component again.

## 5. The offer

The first class is not free. What is free is the conversation: WhatsApp, and ten minutes with her
about what troubles you. Every button, every prewritten message, every FAQ and every page
description now says that, in both languages. The internal name for the action changed from "trial"
to "talk", so the code says what the site says.

## 6. Two pages folded into two others

Seven items in the menu was two too many, and two of the seven were halves of pages that already
existed.

- **Credentials joined About.** Her story and her record are the same argument; splitting them meant
  the About page carried a strip of certificate thumbnails whose only job was to send you to the
  page with the real table on it. The register, the experience and the memberships now sit on
  `/parichay/`, with a contents row at the top because the page took in a second one. The awards
  section appeared on both pages; there is one now.
- **Gallery joined Stories.** Photographs of classes, camps and the stage prove the same thing the
  students' words prove. They are the lower half of `/kahaniyan/` now, with their own filter intact.
- The journey block was a four-column grid, so entries that had a photograph stood a head taller
  than the ones that did not and the years lined up with nothing. It is a timeline: year, what
  happened, then the picture if there is one.

The menu is five items. Links that pointed at the two pages now point at the sections that replaced
them, through `sectionHref()` in `lib/routes.ts`, so a link to the register still lands on the
register.

**One defect fell out of the merge.** The header's main button linked to `#booking-band` on the page
you were reading — and six pages have no booking band, so on those it was a button that did nothing.
It goes to the contact form on those pages now, and check 16 was widened to follow a hash across
pages, which is how it was caught.

## 7. Illustrations

Ten of the drawings were placeholders in all but name: the knee did not read as a knee, the thyroid
had a line through the whole figure, and — the expensive one — the WhatsApp mark was a plain speech
bubble, on a site whose entire funnel is WhatsApp. All redrawn on one grid, with one stroke weight,
and the WhatsApp glyph is the real one people recognise.

---

# Second audit — 5 September 2026

Agosh: *"The website has too much content in some places… Check if all content is important and
plays an important role. Basically a full audit."*

Measured rather than eyeballed: rendered words per page and per section at 390px, repeated
sentences within a page, boilerplate shared between pages, and every UI string that is never
rendered. `/tmp` scripts did the counting; the numbers below are what they returned.

## What the site actually weighs

| page | words |
|---|---|
| home (hi / en) | **831 / 837** |
| each of 16 condition pages | 451–520 |
| stories | 362 | 
| about | 378 |
| batches | 314 |
| students | 272 |
| contact | 120 |

Home was **11 sections and 9,432px** on a 390px phone — about **24 phone screens**.

## Finding 1 — one section said the same thing three times · FIXED

"कैसे शुरू करें" was **198 words and 1,893px**: a fifth of the page's words and a fifth of its
height. Inside it:

- the **three steps** — call, consultation and slip, batch — with what each gives you
- a list of **five things the batch includes**
- the **slip** itself, drawn

Every one of the five was already in the three steps, three of them word for word:

| the list said | the step above already said |
|---|---|
| रोज़ की लाइव क्लास | रोज़ की लाइव क्लास, छोटे ग्रुप में। |
| व्हाट्सऐप पर रोज़ साथ | व्हाट्सऐप पर रोज़ साथ। |
| हर 60 दिन जाँच | हर 60 दिन जाँच, आपकी रिपोर्ट के साथ। |
| क्या खाना है, क्या सावधानी, दिनचर्या, कौन से प्राणायाम और आसन, और किस समय | आपका अपना हल: खान-पान, सावधानी, दिनचर्या, प्राणायाम, आसन, और समय। |

And that last line is drawn a **third** time on the slip below it, as खान-पान / प्राणायाम / आसन /
समय.

The list was put there on 4 Sep to fill the empty half of a two-column grid — the right problem and
the wrong answer. The fix for an empty column is not more words, it is not having the column. The
list is gone and the slip stands on its own, centred.

**198 → 121 words. 1,893 → 1,450px. No dead space: the section's content now fills its height
exactly (measured, 0px).** Home: **831 → 754 words.**

## Finding 2 — 61% of every condition page is boilerplate · NOT FIXED, needs a decision

Comparing `/rog/sugar/` with `/rog/bp/` line by line: **304 of 493 words are identical**. Only 39%
of a condition page is about the condition. Multiplied by sixteen pages, that is the largest block
of repeated words on the site.

Some of it should repeat — the medicine question is the first thing everybody asks, and a reader
landing from Google sees only one page. But three blocks are candidates:

- **the slip** appears in full on all 16, and in full on the home page
- **"पहली क्लास कैसी होगी"** (67 words) is identical on all 16
- **the price line** appears in the header of all 16 and again in the closing band

Cutting the first-class block to a line and letting the slip be a link on condition pages would
take roughly **120 words off each of sixteen pages** without removing a single fact from the site.
It is a real design change, so it is a decision for Agosh rather than something to do quietly.

## Finding 3 — 79 written strings were never on any page

`content/ui.json` held **335 strings; 79 appeared nowhere in the source.** Ten of those I orphaned
with Finding 1 and have deleted, since they were duplicates by definition. The other **69 are
written Hindi and English copy that has simply never been wired to a page** — a credentials table
(12 strings), interest options for the contact form (9), alternative headings for home (14).

They are not deleted. They cost nothing at runtime — `ui.json` is read at build time and never
shipped to a browser — and they are Agosh's copy, not mine to throw away. The list is in the commit
message; the choice is delete or wire up.

## Finding 4 — the WhatsApp button appears five times on the home page

Hero, after the medicine panel, after the results, in the join block, in the closing band, plus the
sticky bar: **six ways to reach one action.** This is not an accident — Agosh asked for it on 4 Sep
("marketing managers say that the action button must be there at multiple points"). Recording it
because it is the largest remaining repetition on the page and the two requests pull against each
other. Five is defensible; if it should be four, the one after the results is the weakest, since
the results section already ends with a card that leads somewhere.

## What was left alone, and why

- **The stories page's 268-word block** is four student stories. That is the page.
- **The eight condition tiles** (82 words) each carry a result. Cutting them would cut evidence.
- **The four press placeholders** repeat "अख़बार या चैनल का लोगो" four times, which reads as noise
  — but the rule that a frame says what goes in it is Agosh's, and it stops mattering the day the
  logos arrive.
