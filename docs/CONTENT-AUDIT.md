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

## 6. Illustrations

Ten of the drawings were placeholders in all but name: the knee did not read as a knee, the thyroid
had a line through the whole figure, and — the expensive one — the WhatsApp mark was a plain speech
bubble, on a site whose entire funnel is WhatsApp. All redrawn on one grid, with one stroke weight,
and the WhatsApp glyph is the real one people recognise.
