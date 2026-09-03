# योग वंदना · Yog Vandana

The website for **Vandana Baranwal**, a yoga teacher in Lucknow who sells live online classes
to people who want to fix their diseases with yoga.

Hindi is the site. English is one tap away. Every page exists twice.

- **Live preview:** https://agoshbaranwal.github.io/yogvandana/
- **What it should look like:** `design/*.dc.html` and the canvas at
  https://claude.ai/code/artifact/4d5a08d2-9e93-4ad0-903c-31dca96c0a11
- **The specification:** `BUILD-PROMPT.md` · **the order of work:** `EXECUTION-PLAN.md`
- **What was built, measured and left undone:** `docs/AUDIT.md`

Nothing about her is invented. Every fact still to come is written `[like this]` and shows on
the page as a dotted blank. `npm run content:check` lists every one of them.

## Running it on your Mac

```bash
npm install       # once
npm run dev       # http://localhost:3000
```

To build exactly what goes on the host:

```bash
npm run build     # writes out/ — plain files, no server needed
npm run serve     # serves out/ on http://127.0.0.1:4411
```

## The scripts

| Command | What it does |
|---|---|
| `npm run dev` | The site on your Mac, reloading as you edit |
| `npm run build` | Builds `out/`: every page in Hindi and English, plus 404, sitemap and robots |
| `npm run serve` | Serves `out/` the way the real host will |
| `npm run content:check` | Lists every fact and photo still to be filled in. Fails while any remain |
| `npm run parity:check` | Fails if a string or a page exists in one language and not the other |
| `npm run credibility:check` | The sixteen credibility rules over the built site, into `docs/CHECKS.md` |
| `npm run media:prepare` | Resizes her photographs from `media-src/` into `public/media/` |
| `npm run og` | Redraws the link-preview images and the app icon |
| `npm run screens` | Photographs every page, both widths, both languages, into `docs/screens/` |
| `npm run check` | Lint, types, parity, build, credibility — everything, in one go |

## Adding her material

The short version is below. `CONTENT-GUIDE.md` has the long version, written for you to hand to
Claude Code.

Everything lives in `content/` as small JSON files. Every piece of text is a pair:

```json
{ "name": { "hi": "सुबह का बैच", "en": "Morning batch" } }
```

**One condition** — `content/ailments/<slug>.json`. Copy an existing file, change the slug, the
name, the intro and the slip. The page, the card on the home page, the chooser and the sitemap
all pick it up on the next build.

**One batch** — `content/batches/<id>.json`. `type` is `group`, `private` or `workshop`.

**One story** — `content/stories/<id>.json`. Set `ailmentSlug` to the condition it belongs to,
`consent: true` only when the student has agreed, and `before`/`after` when there is a number
worth showing.

**One photograph** — put the file in `media-src/<folder>/<name>.jpg`, run `npm run media:prepare`,
then write `"<folder>/<name>.jpg"` into the `photo` or `image` field of the content file that
needs it. Every photo needs `alt` and a caption with the place and the date.

**One certificate** — `content/credentials/<id>.json`, with the issuing body, the year, the hours,
the scan, and a `verifyUrl` that has three states: the `https://…` that opens her entry; the word
`none` when you have checked and that body keeps no public register; or empty, which prints a blank
saying the link is still to come. Never write `none` just to tidy an empty field — the difference
between "there is no register" and "we have not looked yet" is the whole point of the page.

## Going live

1. `npm run content:check` until nothing is left.
2. Put the real numbers, links and hours into `content/site.json`.
3. Set `"live": true` in `content/site.json`. That switches `noindex` off, tells robots to come
   in, and hides any section whose content is still empty.
4. Set `url` to the real domain and build with no `NEXT_PUBLIC_BASE_PATH`.
5. `npm run check`, then upload `out/`. `docs/DEPLOY.md` has the details.

## How it is built

Next.js 16 with the App Router, TypeScript and Tailwind 4, exported as static files. No server,
no database, no login. Hindi pages live at `/`, English under `/en/`, sharing the same
components through a `lang` prop, so the two can never drift apart.
