# Design, UI, UX and content audit

Written 4 September 2026, after Agosh set the bar: any design choice that is not a 9 or a 10 for
visibility, accessibility, usability, experience, craft or content gets rebuilt. This is the
examination — who the person is, what was measured, what was looked at, section by section down to
the dropdowns — and then the plan for rebuilding it without making a mess.

Everything scored here was measured in a real browser at 390 px, and again at 360 × 740 with the
CPU slowed six times and the connection held to 400 kbps, which is a ₹10,000 phone on a weak signal.
Screenshots of every state that a page screenshot cannot show — the open menu, an open answer, the
photo viewer, the band mid-choice, the form with a name typed in — were taken and looked at.

---

## Part 1 · Who this is for

Agosh's brief: 25 to 55, Hindi-speaking, Tier 1 and Tier 2 cities, with a disease or a health
problem they want to address, not "posh", and — the part that decides the tone — people who see yoga
and pranayama not as a modern lifestyle but as an *alternative to modern medicine* and a better
answer to their problem. Research fills that in.

**They came for a disease, and it gets truer with age.** Across Indian practitioners, fitness is the
first reason given and disease management the second; for people over 40 the order flips, and the
chronic conditions that push middle-aged and older Indians onto a mat are exactly the ones on this
site — hypertension, diabetes, high cholesterol, pain, and trouble with everyday movement. Half the
motivation is self-driven; a seventh comes from social media.

**Their internet is Hindi, on a phone, in WhatsApp.** 57% of Indian internet users use an Indian
language; 201 million use Hindi; 99% of them are on mobile; about 40% of an Indian-language user's
time online is spent messaging. Hindi search is growing faster than English search as Tier 2 and 3
come online. UPI is 85% of digital payments; PhonePe and Google Pay between them are four in five
UPI transactions.

**Their phone is a ₹10–15,000 Android with a 6.5–6.9 inch HD+ screen.** That is 720 pixels across,
roughly half the density of the phone the site has been tested on. Type that looks fine on a Retina
screen renders softer and smaller on theirs. Hindi text needs at least 16 px for body and 1.6–1.8
line height, because matras need vertical room; older readers prefer larger still. India's own
standard for Hindi-speaking citizens — GIGW 3.0 — takes WCAG 2.1 AA as the floor and adds text
resizing on top. That is the bar this audit uses.

**Their frame for yoga is Ramdev's, not a studio's.** Two decades of morning television taught this
audience a vocabulary — रोग, बीमारी, जड़ से, कपालभाति, अनुलोम-विलोम, योग शिविर — and a promise: yoga
as *treatment*, with named practices for named diseases, and results measured in reports and
reduced medicine. They also carry the counter-message from every doctor they know. So they want
the promise stated plainly *and* they want to be told they will not be asked to stop their
medicine. Both, in the same breath.

**The credential they recognise is the government's.** The Yoga Certification Board under the
Ministry of AYUSH is the only government body certifying yoga teachers; its levels — Yoga Protocol
Instructor, Yoga Wellness Instructor, Yoga Teacher and Evaluator — are what "आयुष प्रमाणित" means to
this audience. "Certified yoga teacher" with no body named is a claim; "आयुष मंत्रालय (YCB) प्रमाणित"
is a fact they can weigh.

**There is a second buyer.** Adult children, often in a metro or abroad, pay for their parents'
health — insurance, care, and increasingly classes. That is who the English side is for: someone
checking that this is legitimate and paying for it, for a parent who will attend in Hindi.

**Trust is the scarce thing.** Indians score low on digital trust — security, accountability,
privacy — and reviews work as decision shortcuts through volume, recency and names. This audience
trusts two kinds of proof: *people like them* (a name, a city, an age, the disease, the report
number, a face, a voice) and *authority* (a government certificate, a doctor, a hospital, a
newspaper, a शिविर banner with her on the stage). And they have been warned, repeatedly and
correctly, about payment links in chats.

### What that means for the site — the eleven rules

1. **Nothing that carries meaning under 16 px.** Body 18. Labels at 14 only when decorative.
   Line height 1.7 for Hindi.
2. **Muted colour is for captions, not for facts.** Prices, fees, promises and results are ink.
3. **Her face on the first screen of a phone**, not only on a desktop.
4. **A phone number where an older person expects one** — top of the page, and the footer.
5. **Their words.** रोग / बीमारी, शिविर, परिचय-पत्र, तस्वीरें, अख़बार. Not सेशन, IST, गैलरी, मीडिया,
   प्रोफ़ाइल.
6. **Name the practices.** Even the template should say कपालभाति and अनुलोम-विलोम where it now
   says [आसन 1].
7. **Results first, in their measure:** the report number, the medicine that came down, the stairs
   climbed. Age and city on every story. A face where there is consent.
8. **The medicine answer within reach on every page that carries the claim** — open, not folded.
9. **The government certificate is the headline credential**, if she holds one.
10. **Plain and direct over refined.** Fewer thin captions, fewer nested cards, bolder saffron,
    bigger numbers. A clinic board, not a wellness app.
11. **Nothing heavy.** No third-party scripts, animation that switches itself off, fonts as light
    as hierarchy allows.

---

## Part 2 · How each element was scored

One score from 1 to 10 per element, with the dimensions that pulled it down named. The dimensions:

- **Visibility** — can it be seen and found on a 6.5-inch HD+ screen held at arm's length
- **Accessibility** — contrast, size, tap area, keyboard, screen reader, motion
- **Usability** — can the person do the thing, first time, without help
- **Experience** — does it fit how this person decides, in the order they decide
- **UI** — craft, consistency, restraint
- **Content** — the right words, at the right length, leaving the right sentence behind

**9 or above stays. Anything below is rebuilt.** Where a score is above 9 the rationale is short.

---

## Part 3 · What was measured

Numbers first, because they settle arguments.

| Measure | At the audit | After the rebuild (4 Sep, measured the same way) |
|---|---|---|
| Text sizes rendered on the home page | 13 ×20 · **15 ×89** · 17 ×49 · 19 ·23 · 28 · 35 | 14 (eyebrows, placeholder captions) · **16 · 18 · 20 · 24 · 30 · 36** |
| Share of home text under 16 px | **55%** | **3%** — all of it decorative eyebrows and placeholder captions |
| Form labels on the contact page | **13 px** | 16 px bold, (ज़रूरी) on the required two |
| Slip row labels | **13 px** | 16 px labels, 18 px values |
| Contrast failures at 390 px | Wordmark 2.0:1 · band placeholders 2.9:1 · footer placeholders 2.8:1 | **0** on every page; rule 15 measures 17 painted pairs, the closest at 4.62:1 |
| Tap targets under 24 px wide | Footer links down to **18 px** | **0**; footer cells are 48 px tall and the width of their column |
| Distinct button styles | **5** | 3 (primary, outline, dark on saffron) |
| Distinct button labels | **9** for two actions | **2 verbs** — वंदना जी से बात करें / व्हाट्सऐप पर बात करें, and जुड़ें और भुगतान करें / फ़ीस भरें / भुगतान करें; 190 buttons, 0 strays, guarded by rule 19 |
| Home page height on a phone | 6,314 px | 7,177 px — bigger type and the portrait cost a screen; the order is unchanged |
| About page height on a phone | **7,252 px** | 7,131 px, name first |
| Photo viewer | No focus, placeholder label, bar on top | Takes focus, traps it, returns it, labelled तस्वीरें, bar hidden — keyboard-driven |
| Sticky bar | Everywhere | Off policy pages and the 404; under any dialog; guarded by rule 18 |
| Vocabulary | तकलीफ़ 28× · बीमारी 1× | बीमारी in the menu and every category lead; the question kept |
| Loanwords the audience does not use | सेशन · IST · मीडिया · गैलरी · प्रोफ़ाइल · लेवल | **none** |
| Slow-phone run (live, 6× CPU, 400 kbps, 400 ms) | First paint 2.6–2.7 s, fonts 175–208 KB | First paint **2.65–2.73 s, unchanged**; fonts **208 KB, unchanged** — see Phase 8 |
| Placeholder instructions facing a reader | 47, incl. the form hint | The form hint is a real hint; the rest are labelled examples or bracketed facts |

---

## Part 4 · Site-wide elements

### 4.1 Typography — 5 → **9**

*Visibility, accessibility, content.* The scale is 13 / 15 / 17 / 19 / 23 / 28 / 35 and the page
is mostly its bottom two steps: 55% of the text on the home page is 15 px or smaller, on a script
that needs 16 as a floor and on a screen half as dense as the one it was designed on. Form labels
are 13. The slip — the site's signature — is set in its smallest type. Line height is 1.65 where
Hindi wants 1.7.

Two faces, one per language, was the right decision and stays. Baloo 2 for long Hindi reading is
heavier than Mukta would be, but it holds at 18 and above. The fix is size, not face.

**9 looks like:** 14 (decorative eyebrows only) · 16 · **18** · 20 · 24 · 30 · display, line
height 1.7 on body, and a build rule that fails the moment anything meaningful drops under 16.

### 4.2 Colour and contrast — 6 → **9**

*Accessibility.* Three failures, all measured. The saffron योग of the wordmark sits at 2.0:1 on
ivory and 2.1 on white — it is the mark, and it is also the slip's header. Placeholders use the
muted colour everywhere, which is 2.9:1 on the saffron band and 2.8:1 on the dark footer: the
site, as it is shown today, fails contrast on its two most emphatic surfaces. Muted (#6E5F4E) is
otherwise sound on every tint, but it is used for facts — prices, batch levels, the fee promise —
and a fact should not be the quietest thing in its card.

**9 looks like:** placeholders inherit their surroundings' ink; muted reserved for true captions;
and one decision from Agosh on the mark — either the योग goes to deep saffron on light grounds
(5.4:1, still reads as saffron) with bhagwa kept for the icon, the footer and the band, or the mark
gets a dark tile behind it. The contrast rule is widened to measure every text-on-ground pair the
browser actually paints, not just the palette.

### 4.3 Buttons — 5 → **9**

*Usability, UI, content.* Five visual variants on one page; nine different labels for what are
only two actions (talk to her; pay). "जुड़ें", "इस बैच में जुड़ें", "सेशन बुक करें", "समय चुनें" and
"सीट बुक करें" are five ways of saying the same thing to a person who is trying to work out what
happens when they press. Two labels, two shapes.

**9 looks like:** primary (saffron, 52 px), secondary (outline), and dark only on the saffron band.
Two labels: **वंदना जी से बात करें** everywhere the action is a conversation; **जुड़ें और भुगतान करें**
everywhere it is money. A build rule that counts the distinct labels.

### 4.4 Tap targets and spacing — 6 → **9**

*Accessibility.* Every control is 44 px tall, which was the earlier fix, but footer links are as
narrow as 18 px and sit in a wrapping row with 16 px between them — a thumb cannot pick बैच from
कहानियाँ. Sections sit 32–36 px apart on a phone, which is tight for a reader scanning by thumb.

**9 looks like:** footer navigation as a two-column list with 48 px rows; 40–48 px between sections
on a phone; chips stay at 44.

### 4.5 Header — **8**

Wordmark (contrast, above), five links, an English pill, a 44 px menu. Clear. The mobile menu is
clean and holds the two right buttons. What is missing for this audience is a phone number, and a
one-line gloss under each menu item so that "तकलीफ़" is not a word to decode.

**9 looks like:** a phone number in the header on every width, and nav words in their register
(see 4.11).

### 4.6 Sticky bar — 6 → **9**

*Experience, accessibility.* 65 px of saffron on every page, including the policy pages, the 404,
and — a real defect — **over the top of the photo viewer**, where it covers the caption and the
previous/next controls on a phone. It repeats the band's line and the band's button, so on pages
that have the band, the same ask is on screen twice at the bottom.

**9 looks like:** hidden while any dialog is open; not on policy pages or the 404; hidden once the
band is in view (that part already works).

### 4.7 The booking band — 7 → **9**

*Content, UI.* The best mechanism on the site — two questions, a prewritten message — with two
faults. The message preview prints a raw URL in the middle of a Hindi sentence
("(पन्ना: https://agoshbaranwal.github.io/rog/)"), which is noise to the reader and looks technical
in exactly the place that should look human. And the lead paragraph carries the fee statement in
17 px while the heading takes 28 — the fee is what the reader is checking.

**9 looks like:** preview says "(पन्ना: शुगर)" while the message she receives keeps the address;
the fee sentence set in bold ink; chips unchanged.

### 4.8 The FAQ dropdowns — 8 → **9**

*Accessibility, UI.* Native `details/summary`, so keyboard and screen reader work without help,
and several can be open at once, which is right for this reader. The chevron is a 12 px rotated
border — small, faint — and the answer text is muted where the question is bold ink, which inverts
their importance. The medicine question, the one they came to ask, is folded like the others.

**9 looks like:** a 20 px chevron in a 44 px circle; answers in ink; the medicine question open by
default on every condition page.

### 4.9 Placeholders — **8**

Quiet frames with a caption; they no longer shout. Two problems remain: their label is 13 px, and
47 of them are *instructions to Vandana* sitting where a reader will see copy — the contact form's
hint reads "[दो-तीन पंक्तियाँ: कब से तकलीफ़ है…]" to the person filling the form.

**9 looks like:** 14 px labels; every instruction that faces a reader replaced with a real hint
even before her material arrives.

### 4.10 Motion — **9**

Reveals once, the sun once, the slip writes itself, a real number counts. Off entirely under
reduced motion; nothing hidden without JavaScript. Stays.

### 4.11 Vocabulary and voice — 6 → **9**

*Content.* Sentences are short — median four words — and the voice is plain, which is right. The
words are wrong in three places.

- **The frame word.** तकलीफ़ appears 28 times; बीमारी and रोग once each. The claim says बीमारी; every
  heading and the menu say तकलीफ़. तकलीफ़ is what a gentle doctor says; बीमारी and रोग are what this
  audience says, and what the claim promises to cure. The question "आपको क्या तकलीफ़ है?" can stay —
  it is a kind question — but the noun in the menu and the leads should be the honest one.
- **Loanwords they do not use.** सेशन (7), IST, मीडिया में, गैलरी, प्रोफ़ाइल डाउनलोड, लेवल. The
  audience's words exist and one of them is already on the site: **योग शिविर** is used in the gallery
  filter while the batches page says कार्यशाला.
- **Placeholder names for practices.** "[आसन 1] · [आसन 2]" is honest but tells this audience
  nothing. Their expectation is named practices — कपालभाति, अनुलोम-विलोम, भ्रामरी, मंडूकासन — and the
  template can carry an example set per condition, marked as an example, until she confirms.

Also missing for this reader: age on the stories (a 54-year-old trusts a 54-year-old), "दवा कम हुई"
as the headline kind of result, and a doctor's-report framing of before/after.

**9 looks like:** the word list applied across both languages; example practices in the template;
age and city on every story card.

### 4.12 Trust content — 7 → **8** (the body and the number wait on her)

*Content, experience.* The numbers strip with a basis line, the checkable register, the consent
line under stories — all right in principle, all placeholders in practice. Three gaps the research
makes specific: the credential is "प्रमाणित योग शिक्षिका" with no body named, where "आयुष मंत्रालय
(YCB) प्रमाणित" would be the strongest single line on the site if she holds it; no phone number is
visible anywhere on a phone without scrolling; and the Google rating line is built but has nothing
to show.

**9 looks like:** the certifying body in the credential line; a phone number in the header and
footer; the rating line filled the day there is a rating.

### 4.13 Performance on their phone — **8** (unchanged; see Phase 8)

On a six-times-slower CPU over 400 kbps, first paint in 2.6–2.7 s and nothing shifts. Good. The
page is 385–436 KB of which fonts are 175–208 KB and the framework's JavaScript 146–155 KB; full
load takes 8–9 s, though nothing the reader needs waits for it.

**9 looks like:** drop the 600 weight if 400/800 carry the hierarchy (about 60 KB), preload the
display weight so the claim never flashes.

---

## Part 5 · Page by page

### 5.1 Home

| Section | Score | What pulls it down | What 9 looks like |
|---|---|---|---|
| Hero | 6 → **9** | Her photograph is hidden on phones (`hidden md:block`) — the strongest trust signal is absent on the device 99% of the audience uses. No phone number. Eyebrow 15 px. | Portrait on mobile beside or under the claim; phone number under the button; eyebrow 16. |
| Teacher line + numbers | 8 → **9** | Labels 15 px. | Labels 16; nothing else. |
| Conditions chooser | 8 → **9** | Sub-lines 15 px; icon 26. The names are exactly the audience's words. | Sub 16, icon 30. |
| How it starts | 7 → **9** | The fee sentence — the most important line in the section — is the smallest text in it. | Fee line as bold body. |
| The slip | 6 → **9** | Labels 13, values 15: the signature device in the smallest type. | Rows 16/17; seal unchanged. |
| Your day | 7 → **9** | The 21-day WhatsApp promise is a 15 px muted lead. | Promise as body ink. |
| Proof: stories | 7 → **9** | Quote in muted; before/after labels 13; no age; placeholder avatar. | Quote in ink; before/after as the visual centre with 24 px numbers; age + city; face when consented. |
| Proof: who teaches | **8** | Bio at 17, fine. | Credential line names the body. |
| Proof: record links | **8** | Fine. | — |
| Fees | 8 → **9** | Meta line 15 muted under a 19 time. | Price is the loudest thing in the row. |
| Answers | 8 → **9** | See 4.8. | Chevron, ink answers. |
| Band | 7 → **9** | See 4.7. | — |
| Footer | 6 → **9** | See 4.4 and 4.2. | Two-column links, 48 px rows, phone + WhatsApp + address block, placeholders in light ink. |

### 5.2 Conditions index — **8**

The chooser and the band. Clean. Lead 15 px; "और भी: गर्दन, अस्थमा…" is a good line that links to
contact — make it a button-sized target.

### 5.3 A condition page (शुगर as the sample)

| Section | Score | What pulls it down | What 9 looks like |
|---|---|---|---|
| Header + claim | **8** | Count line "[N] विद्यार्थी · [N] कहानियाँ · [N] वीडियो" at 15; the claim line is deep saffron 19 — right. | Count line 16. |
| The slip | **6** | As 5.1. Print button fine. | Rows 16/17. |
| First class + in class | **8** | Merged and clear. Bullets 17. | — |
| Students with this | **7** | As stories above. | — |
| Which batch | **7** | Card meta muted; "IST". | Price loud; drop IST. |
| Answers | **7** | Medicine question folded. | Open by default. |
| Band | **7** | — | — |

### 5.4 Batches — 7 → **9**

Cards carry five lines of muted text under a 19 px time, and the price — the reason the page is
opened — is 19 px in a row with a button that outweighs it. "सभी समय IST" is an abbreviation nobody
in India needs. The shared "एक क्लास में" block above the cards is right. Workshops are called
कार्यशाला here and योग शिविर elsewhere.

**9 looks like:** price at 24 px bold as the first thing in the money row; per-day line in ink;
one muted line at most; शिविर throughout; no IST.

### 5.5 Stories with the album — 7 → **9**

The filter chips scroll sideways with no sign that they do — बीपी is cut off at the right edge and
a reader does not know there are more. Cards as above; the share-with-family link is right for this
audience. The album's photo viewer is the weakest interactive element on the site: it opens, but
focus stays behind it, its label is a placeholder, and the sticky bar draws over its controls.

**9 looks like:** chips wrap to two rows on a phone; the viewer takes focus, traps it, is labelled
by its caption, hides the bar, and returns focus on close.

### 5.6 About with the record — 7 → **8**

7,252 px on a phone. The portrait pushes her name below the first screen; the contents row helps.
The timeline is right. The register cards are right. Awards, events and press are fine but every
one is a card, and the page reads as forty frames. The "प्रोफ़ाइल डाउनलोड करें" button in the invite
band exists whether or not there is a profile to download — it needs checking, because a button
that does nothing is the pattern this audit keeps finding.

**9 looks like:** name and credential first on a phone, portrait beside; the invite button only
when the file exists; the "अपडेट" date on the register visible.

### 5.7 Contact — 6 → **9**

Labels at 13 px on a form for a 55-year-old. Required fields not marked. The message hint is an
instruction to Vandana in brackets, shown to the person typing. The chips work. The WhatsApp button
first is right; "कॉल करें: [फ़ोन नंबर]" as plain text is right until there is a number, and becomes
a button after.

**9 looks like:** labels 16 ink; required marked; a real hint ("जैसे: दो साल से शुगर, सुबह की दवा
चलती है, शाम का समय ठीक है"); the invite band not repeated here.

### 5.8 Students — 8 → **9**

The plainest, most usable page on the site: fee rows, the class link, the slip, holidays, rules,
the safety line. Price 15 px muted under a 19 px name — the fee page should show the fee loudest.

**9 looks like:** price at 20 bold; nothing else.

### 5.9 Policy pages and 404 — **8**

Plain, readable, the draft note honest. The sticky bar has no business on them.

---

## Part 6 · The rebuild list

Everything under 9, grouped by what fixes it. Twenty-two items.

**Foundations (fix once, lands everywhere)**
1. Type scale to 14 / 16 / 18 / 20 / 24 / 30 / display; line height 1.7; a rule that fails under 16
2. Placeholders inherit ink; muted reserved for captions; every rendered text/ground pair measured
3. The wordmark's saffron on light grounds — *needs Agosh's decision*
4. Three button shapes, two labels, a rule that counts them
5. Footer: two-column links, 48 px rows, contact block, light-ink placeholders
6. Sticky bar: hidden under dialogs, absent on policy/404
7. Section rhythm 40–48 px on a phone
8. Phone number in header and footer

**Words**
9. Frame word: बीमारी/रोग in the menu and leads; the question stays — *needs Agosh's decision on the menu word*
10. Loanwords: सेशन → एक-से-एक क्लास; कार्यशाला → योग शिविर; मीडिया में → अख़बार और टीवी में; गैलरी → तस्वीरें; प्रोफ़ाइल डाउनलोड → परिचय-पत्र; IST → gone; लेवल/स्तर → शुरुआती भी
11. Example practices in the template, per condition, marked as examples
12. Age and city on every story; "दवा कम हुई" result type; report-style before/after
13. The credential line names the body (once she confirms which)
14. Band preview without the raw URL; fee sentence in bold ink
15. Contact form: real hint, required marks

**Pages**
16. Hero: portrait on mobile, phone number
17. Slip rows 16/17 (home and condition pages)
18. Story cards: quote in ink, results as the centrepiece
19. Batches and students: price hierarchy
20. FAQ: chevron, ink answers, medicine question open on condition pages
21. Stories: chips wrap; photo viewer focus, label, trap, bar
22. About: mobile order; invite button only with a file; contact page loses the duplicate band

---

## Part 7 · The plan

The task is large and the way to not make a mistake on a large task is to change things in the
order they propagate, and to let a machine check each step before a person looks.

### The method

- **Tokens before components before pages.** A size or a colour changed once in `globals.css`
  lands on 37 pages; the same change made page by page lands unevenly and takes ten times as long.
- **Write the rule before the fix.** Every requirement that can be a build check becomes one
  *first*, so it fails on the current site, passes when the fix lands, and cannot creep back: the
  16 px floor, contrast on every painted pair, the sticky bar under dialogs, the two button labels.
  Each new rule is proven to fail before it is trusted.
- **Every phase ends the same way.** Build; lint, types, type-check, parity, credibility; the
  measurement script re-run at 390 and at 360 × 740 slow; screenshots retaken; the scores in Part 5
  re-scored against the new numbers; commit; deploy; Agosh looks. The next phase does not start on a
  red.
- **Copy only through the content files.** No string in a component. Parity keeps English honest.
- **Two decisions from Agosh, taken before Phase 1**, because they change the mark and the menu.
  Everything else is a judgement I make and record.

### The phases

| Phase | What | Done when | Size |
|---|---|---|---|
| **0 · Guardrails** | The four new build rules, each proven to fail on today's site | `npm run check` is red for exactly the reasons this audit names | ½ day |
| **1 · Foundations** | Type scale, line height, placeholder ink, muted discipline, button system, footer, sticky rules, section rhythm, phone number, the wordmark decision | Rules from Phase 0 green; measurement shows no meaningful text under 16 and no contrast failure on any painted pair | 1 day |
| **2 · Words** | The frame word, the loanword list, example practices, story fields (age), credential body, band preview, form hint | Parity green; loanword count for the banned list is zero; every condition page names practices | ½ day |
| **3 · Home** | Hero with portrait and phone; fee line; slip rows; story cards; numbers labels | Home re-scored, every row 9+ | ½ day |
| **4 · Condition pages** | Slip; medicine question open; batch card hierarchy; count line | Sample page re-scored 9+ | ½ day |
| **5 · Batches + Students** | Price hierarchy; शिविर; no IST; students price | Both pages 9+ | ¼ day |
| **6 · Stories + About** | Chip wrap; photo viewer accessibility; About mobile order; invite button gate | Viewer passes a keyboard drive (focus in, trapped, Escape, focus back); both pages 9+ | ½ day |
| **7 · Contact, policies, 404** | Form labels and hint; required marks; duplicate band removed; sticky absent | Pages 9+ | ¼ day |
| **8 · Weight** | Drop the 600 weight if hierarchy survives; preload the display weight | Slow-phone first paint at or under today's, fonts ≤ 150 KB | ¼ day |
| **9 · Proof** | Full re-measure, every rule, all 66 screenshots, deploy, this document re-scored with the new numbers | Nothing in Part 5 below 9; the audit's tables updated with evidence | ½ day |

About four and a half days of work, in two or three sittings. Phases 3 to 7 are independent of
each other once 1 and 2 have landed, so they can go in any order and any one of them can be reviewed
on its own.

### The decisions — taken 4 September 2026

Agosh answered four questions before Phase 1 began:

1. **The wordmark.** योग goes to deep saffron (#A05000) on light grounds — 5.4:1, still saffron.
   The icon, the footer and the saffron band keep the full bhagwa, where it already passes.
2. **The menu word.** **बीमारी.** The question "आपको क्या तकलीफ़ है?" stays as the question.
3. **Tone.** Plainer and bolder within the dawn world: bigger type, bolder saffron, results in large
   numbers, fewer thin captions and nested cards. Not a poster.
4. **Practices on the slip.** Typical practices per condition, clearly marked उदाहरण, until she
   confirms the real list.

### Progress

- **Phase 0 · Guardrails — done, 4 September.** Four rules written and proven red on the audited
  site: type floors (14/16/18, line height 1.7, no label-step on form labels or table headers),
  contrast on the four painted pairs the palette list had missed, the sticky bar's place (absent on
  quiet pages, beneath dialogs, reveal animation leaves no transform), and two verbs on every button.
  `scripts/measure.py` is the phase gate.
- **Phase 1 · Foundations — done, 4 September.** Scale 14 / 16 / 18 / 20 / 24 / 30 / display, body
  19 on desktop, line height 1.7. The mark's योग in deep saffron on light grounds, bhagwa on the
  footer, band and icon. Placeholders paint in a per-ground ink. Three button shapes, 52 px, no
  ghost; every button one of two verbs (190 buttons, zero strays). बीमारी in the menu and the
  category leads; the question kept. The loanword list applied: एक-से-एक क्लास, योग शिविर, अख़बार
  और टीवी में, तस्वीरें, परिचय-पत्र, no IST. The contact hint speaks to the person typing. Footer
  rebuilt as a two-column list, 48 px cells, phone and WhatsApp when known. Sticky bar off the
  policy and 404 pages and hidden under any dialog; the reveal keeps no transform.
  **Gate:** 17 rules pass; contrast failures 0 on every page; tap failures 0; home text under
  16 px 10% (was 55%), stories 20%, about 17% — the rest is chips and badges that the page phases
  own.

- **Phase 2 · Words — done, 4 September.** Every slip carries typical practices for its condition,
  marked उदाहरण with a bracket that keeps it on the to-do list until her own list arrives. Age on
  every story card, between name and city. The band's preview says "(पन्ना: शुगर)" while the
  message she receives keeps the address. The credential line asks for the certifying body. The
  guide explains the examples.

- **Phase 3 · Home — done, 4 September.** Her face on the first screen of a phone (an 88 px
  portrait above the claim; the desktop keeps the full frame) and a phone number under the button
  the day she has one. The fee sentence under the steps is bold ink. The slip's rows are 16/18, not
  14/16. Numbers two by two on a phone. The 21-day promise is body ink. Story results are the
  largest thing on the card, in the "after" colour. Sections breathe at 40 px.
  **Gate:** home text under 16 px **6%** (was 55%); contrast 0; taps 0.

- **Phases 4–7 · Condition pages, batches and students, stories and about, contact — done,
  4 September.** The medicine question opens already answered on every condition page; the FAQ
  chevron is a 40 px saffron circle and answers are ink. The price is the largest thing on a batch
  card and on the fee page; one muted line per card. Filter chips wrap instead of scrolling off the
  edge. The photo viewer is a dialog in fact: focus moves to its close button, Tab stays inside,
  Escape returns focus to the thumbnail, and the sticky bar hides while it is open and comes back
  after — driven by keyboard and verified. Its label is "तस्वीरें", never a placeholder. Condition
  badges at 16. On a phone her name leads the About page with a small portrait beside it. Contact:
  labels 16 bold, (ज़रूरी) on the two required fields, a hint that speaks to the person typing, the
  duplicate invite band gone.
  **Gate:** under-16 px text — home 3%, sugar 6%, batches 7%, stories 11%, about 16%, contact 0%;
  contrast 0; taps 0; 17 rules pass.

- **Phase 8 · Weight — half done, 4 September.** The 600 weight is gone and every section takes its
  room from one token. But measured live on the same slow-phone profile, **fonts are 208 KB before
  and after, and first paint is unchanged at 2.65–2.73 s.** The floor is Baloo 2's Devanagari
  regular at 113 KB; `next/font` ships whole weight files, so removing a weight the pages already
  did not download saved nothing. Moving that number means subsetting the font to the glyphs the
  site uses, self-hosted — a separate piece of work, recorded as open.
- **Phase 9 · Proof — 4 September.** Every rule green (17 pass, 2 waiting on her material), the
  gate run on every page at 390 and at 360 × 740, the viewer driven by keyboard, all 66 screenshots
  retaken. Scores in Parts 4 and 5 re-scored against the new numbers: everything that was under 9
  is at 9 except three things that wait on material rather than on design — the credential body,
  the rating line, and the About page's forty frames until they are photographs — and the font
  weight above.

- **Round 6 — done, 4 September, later the same day.** Agosh's verdict on the rebuild above was that
  it was not deep or big enough, so the site was redesigned rather than repaired: boards first
  (`design/R6*.dc.html`, reviewed as real pages), his four decisions taken, then built phase by
  phase to a mobile-first plan (`docs/ROUND6-PLAN.md`). Every page changed shape: the clinic-board
  first screen, disease rows, the timeline with the medicine answer in the dark, result cards in
  the report's numbers, the prescription pad, the timetable, certificate-first About, number-first
  Contact. The mobile audit is `docs/MOBILE-AUDIT.md`. The scores in Parts 4 and 5 describe the
  site before Round 6 and are kept as the record of why it was redone.

### What this audit did not check, and says so

Real photographs and real numbers change how every card reads; this audit scored the frames, not
the pictures. English copy was scored for parity and size, not rewritten for its different buyer —
that is still the open question from the content audit. Nothing was tested with an actual reader
from the audience, and the first five of those conversations will be worth more than this document.

---

## Sources

Checked 4 September 2026.

- Reasons Indians practise yoga, by age; disease management second overall and rising with age — [Frontiers in Public Health](https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2017.00184/full) · [PMC: characteristics of yoga practitioners](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5529335/) · [Nature Sci Rep: middle-aged and older adults](https://www.nature.com/articles/s41598-023-49388-4)
- Hindi and Indian-language internet use, mobile share, messaging time — [KPMG–Google Indian Languages study via Social Beat](https://www.socialbeat.in/blog/kpmg-google-study-on-regional-content/) · [Inc42 on Hindi search](https://inc42.com/buzz/most-of-india-prefers-using-hindi-for-search-says-google/) · [Slator on the KPMG report](https://slator.com/kpmg-report-examines-indias-online-language-and-content-preferences/)
- UPI share and app shares — [DD News, RBI report](https://ddnews.gov.in/en/upis-share-in-indias-digital-payments-surged-to-83-rbi-report/) · [DemandSage](https://www.demandsage.com/upi-statistics/)
- Budget phones and screens — [91mobiles](https://www.91mobiles.com/list-of-phones/value-for-money-phones-under-15000) · [Gizbot](https://www.gizbot.com/mobile/best-budget-smartphones-in-2026-under-15-000-121882.html)
- Hindi body text ≥ 16 px, line height 1.6–1.8 — [HindiCheck](https://www.hindicheck.in/blogs/best-hindi-fonts-for-websites) · [W3C Devanagari layout requirements](https://www.w3.org/International/ilreq/devanagari/)
- Older readers and text size — [Frontiers in Psychology](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2022.931646/full)
- GIGW 3.0 takes WCAG 2.1 AA as its floor — [guidelines.india.gov.in](https://guidelines.india.gov.in/introduction/) · [GIGW 3.0 PDF](https://cdnbbsr.s3waas.gov.in/s3c92a10324374fac681719d63979d00fe/uploads/2025/02/2025021775.pdf)
- The Yoga Certification Board, Ministry of AYUSH — [yogacertificationboard.nic.in](https://yogacertificationboard.nic.in/) · [levels explained](https://www.ayushmanyog.com/post/what-is-ycb-certification)
- The Ramdev frame: yoga as treatment, against allopathy — [Deccan Herald](https://www.deccanherald.com/amp/story/india%2Fcancer-high-bp-diabetes-have-treatment-in-ayurveda-but-not-in-allopathy-ramdev-1202080.html) · [Al Jazeera](https://www.aljazeera.com/amp/news/2021/6/2/india-doctors-protest-against-ramdevs-yoga-beats-covid-remarks)
- Adult children and NRIs paying for parents' health — [Niva Bupa](https://www.nivabupa.com/health-insurance-articles/nris-can-manage-healthcare-needs-of-elderly-parents-back-in-india.html) · [Samarth](https://care.samarth.community/blog/communication/elderly-care-for-nris/)
- Digital trust and reviews as decision shortcuts — [Digital Health News](https://www.digitalhealthnews.com/digital-trust-in-healthcare-what-indian-patients-think-about-sharing-health-data) · [Tebra](https://www.tebra.com/theintake/healthcare-reports/online-healthcare-reviews-patient-trust)
