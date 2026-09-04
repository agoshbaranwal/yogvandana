# Filling the site in

Written for Agosh. You do not need to write code: open a Claude Code session in this folder and
say what you want added, in plain words. This page is what to say, and how to know it landed.

Two rules the site keeps for you:

1. **Nothing is invented.** If you do not give a number, it stays `[N]` and shows as a dotted
   blank. That is deliberate. A site about being believed must never carry a made-up figure.
2. **Every string is bilingual.** Give the Hindi and the English, or say "translate it" and it
   will be written for you. `npm run parity:check` refuses a build where one side is missing.

After any change:

```bash
npm run content:check     # what is still missing
npm run build             # rebuild
npm run serve             # look at it on http://127.0.0.1:4411
```

---

## The facts about her — `content/site.json`

Say: **"Set the year she started to 2011, the WhatsApp number to +91…, the phone to the same,
reply hours to 7 in the morning until 9 at night."**

What is in there: her name, the line under it, the city, the year she started, the four numbers
on the home page (years, students, certificates, awards) each with a `basis` line saying how it
was counted, the Google rating, the WhatsApp and phone numbers, the email, the address, the
business name for the policy pages, the payment and booking links, the Google Analytics id, and
the two switches: `url` and `live`.

The Google line under the numbers stays hidden until you put a rating in. The analytics script
never loads until you put an id in.

---

## Conditions — `content/ailments/<slug>.json`

There are eight. Each one is a page, a card on the home page, a chip on the stories, and an entry
in the sitemap.

Say: **"Add a condition: गर्दन का दर्द, slug gardan, family joint, icon spine, and write the intro
in her voice."** Or: **"On the sugar page, set the practice to Vajrasana, Mandukasana,
Kapalbhati, and the review to 90 days with the report."**

What is in the file: the name and the everyday words people search with (`sub`), the page title,
the claim line for that condition, the intro paragraph, the counts, the slip (practice, time,
batch, alongside, review), what the first class holds, what happens in class, three questions,
and the search terms — the words people type, Roman letters and all, which go into the page's
keywords rather than its title, so the title is never cut off in a search result.

The practice line shows **typical practices for that condition, marked "उदाहरण"** — कपालभाति,
अनुलोम-विलोम, मंडूकासन and so on — with a bracket saying her own list is still to come. That is
Agosh's decision: this audience expects to see named practices, and an honest example says more
than an empty bracket. When she gives you her real list, say: **"On the sugar page, set the
practice to Vajrasana, Mandukasana, Kapalbhati"** and the example and its bracket both go.

---

## Batches and fees — `content/batches/<id>.json`

Say: **"Morning batch: 6:30 to 7:30, Monday to Saturday, ₹1,500 a month, next batch starts
1 October, ₹50 a day. Family discount: two from one house pay ₹2,500."**

The per-day price is a field, not a calculation, so you can round it the way you would say it out
loud. The "next batch" chip and the family and first-month lines hide themselves when empty.

## Turning the payment buttons on — `content/site.json`

This is the whole job, and it is one line.

Build one payment page in the gateway's dashboard with her batches on it, then say:
**"Set the payment page to https://pay.yogvandana.com/fees."**

That one URL turns every "जुड़ें और भुगतान करें" on the batches page, every "भुगतान करें" on the home
page, and every "फ़ीस भरें" on the students' page into a real payment. Until it is set, all of them
open WhatsApp with the message already written, which is the right behaviour and needs no change.

Three things the site does for you once it is set:

- **It refuses a bad link.** The URL must be `https` and on a payment company's domain, or on her
  own `pay.` subdomain. A `http://`, a shortener, or a lookalike like `razorpay.com.something.io`
  fails the build rather than reaching a student.
- **It says which batch.** Each button adds `?batch=morning&for=join` to the URL. If you add a
  field named `batch` to the payment page, the gateway fills it in and every payment record says
  which class it was for — which is the difference between ten minutes of reconciliation a month
  and an hour. If you do not add the field, the parameter is ignored and nothing breaks.
- **It says what the button does** before it is pressed, and repeats the one safety rule that
  matters: she will never ask for a PIN or an OTP.

`joinLink` on a batch and `feeLink` on the students' page override the site-wide page, if she ever
wants a separate payment page per batch. Leave them empty — one page is easier for her to keep
right.

---

## Students' stories — `content/stories/<id>.json`

Say: **"Add a story: Sunita Verma, Kanpur, 54, sugar. Before: HbA1c 8.2 and two tablets. Now:
6.5 and one. Her words: …. She has agreed."**

`consent: true` is what publishes it. Without it the story stays in the folder and never appears.
`before` and `after` draw the two boxes; leave them empty and the card simply omits them.

---

## Her record — certificates, awards, events, press, gallery

- `content/credentials/<id>.json` — the certificate, the issuing body, the year, the hours, the
  scan, and `verifyUrl`, which has **three** states and the difference is the whole point:
  a real `https://…` that opens her entry; the word `none` when you have checked and that body
  keeps no public register, which prints "सार्वजनिक रजिस्टर नहीं"; or empty, which prints a
  blank saying the link is still to come. Never write `none` to tidy up an empty field.
- `content/awards/<id>.json` — the award, who gave it, where, the year, one line on what for.
- `content/events/<id>.json` — `type` is `guest-of-honour`, `shivir`, `workshop`, `yoga-day` or
  `press`. Organiser, city, month and year, and a photo with the banner in frame if there is one.
- `content/media/<id>.json` — `kind` is `logo` or `clipping`.
- `content/gallery/<id>.json` — `theme` is `class`, `shivir`, `stage`, `certificate` or `media`.
  Every photo needs a caption, a place and a date; that is what turns a picture into evidence.
- `content/journey/<id>.json` and `content/gurus/<id>.json` — the About page.

---

## Photographs

1. Put the files in `media-src/`, in folders that match: `portrait/`, `class/`, `events/`,
   `certificates/`, `stories/`, `gallery/`, `media/`.
2. `npm run media:prepare` — resizes each one to 480, 960 and 1600 wide as WebP and writes a
   manifest.
3. Write the path into the content file: `"photo": "class/morning-batch.jpg"`.

Until then every slot is a hatched block with a label saying what belongs there. That is the
site telling the truth about itself.

---

## The students' page — `content/students.json`

The holidays, the batch rules, when the class link arrives and how to ask for the slip again.
Say: **"Add a holiday: 20 October, Diwali, no class."**

---

## Words on the buttons and headings — `content/ui.json`

Every label on the site, in both languages. Say: **"Change the trial button to 'पहली क्लास
मुफ़्त बुक करें' everywhere."** One edit changes it on every page in both languages.

---

## New since Round 6 — the fields the redesign reads

**Conditions** (`content/ailments/<slug>.json`): `works` is three lines, the three things the
practice works on for that disease — say **"for sugar, the three lines are…"**. `medicine` is the
one paragraph under "डॉक्टर की दवा?" for that disease. `firstClass.rows` is the [10] + [30] + [10]
of the first class; the first class is a **paid** class, the talk before it is what is free.
`bestBatch` is `morning`, `evening` or empty (either), and `bestBatchWhy` is the one line that
says why — say **"put thyroid in the morning batch because…"**.

**Stories** (`content/stories/<id>.json`): a result is `metric` (HbA1c, बीपी, वज़न, or empty),
`before`, `after`, `change` (what happened to the medicine) and `months`. Say **"Sunita's HbA1c
went from 8.2 to 6.5 in seven months and her medicine was halved."** Leave `metric` empty for a
then-and-now in words (could not climb stairs → three floors a day).

**Batches** (`content/batches/<id>.json`): `start` is the clock time ("6:30"), `minutes` the
length of a class, `daysOn` the weekdays as numbers, Monday = 0 … Sunday = 6, so Monday to
Saturday is `[0,1,2,3,4,5]`. Until you give `daysOn` the timetable shows seven blank days — it
does not guess a week.

**The about page** (`content/site.json`): `about.intro` is the paragraph under the motto,
`about.words` her own two or three lines; `primaryCredential` is the id of the certificate the
certifying body issued (it is shown large, with its check link); each certificate in
`content/credentials/` can carry its `number` as printed.

**Her facts** (`content/site.json`): `certifyingBody` is the body that certified her, spelled
the way it appears on the certificate (say **"Yoga Certification Board, Ministry of AYUSH"** if
that is what it is); `university` is where the MA is from; `classMinutes` is the class ([50]),
`homeMinutes` what she writes on the slip for home ([30]); `missedClass` is the one line on what
happens when someone misses a class.

## When nothing is left

`npm run content:check` prints "Nothing left." Then set `"live": true` in `content/site.json`,
put the real domain in `url`, and follow `docs/DEPLOY.md`.
