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

Leave the practice bracketed until she tells you the real asanas. That is the one field where a
guess would be a lie about what she teaches.

---

## Batches and fees — `content/batches/<id>.json`

Say: **"Morning batch: 6:30 to 7:30, Monday to Saturday, ₹1,500 a month, next batch starts
1 October, ₹50 a day. Family discount: two from one house pay ₹2,500."**

The per-day price is a field, not a calculation, so you can round it the way you would say it out
loud. The "next batch" chip and the family and first-month lines hide themselves when empty.

`joinLink` is the Razorpay payment page. `feeLink` is the one existing students use on their own
page. Leave them empty and every button falls back to WhatsApp with the message already written.

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

## When nothing is left

`npm run content:check` prints "Nothing left." Then set `"live": true` in `content/site.json`,
put the real domain in `url`, and follow `docs/DEPLOY.md`.
