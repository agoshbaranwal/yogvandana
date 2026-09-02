# Putting the site online

The build writes `out/`: a folder of plain HTML, CSS, JavaScript and images. There is no server,
no database and nothing to install on the host. Any web host can serve it.

## Where it is now

**https://agoshbaranwal.github.io/yogvandana/** — a preview, rebuilt by GitHub every time you
push. Every page carries `noindex` while `content/site.json` says `"live": false`, so Google
will not list it. Anyone with the link can open it.

The preview lives in a sub-folder, so the build sets `NEXT_PUBLIC_BASE_PATH=/yogvandana`. On a
real domain that variable is empty and every link drops the prefix by itself.

## Moving it to her own domain, later

On a shared host such as Hostinger:

1. In `content/site.json` set `"url": "https://<her domain>"` and `"live": true`.
2. Build without the sub-folder:

   ```bash
   npm run build
   ```

3. Upload **everything inside `out/`** to `public_html/` — the file manager or FTP is fine. Keep
   the folder structure; `public_html/rog/sugar/index.html` is what makes
   `https://<her domain>/rog/sugar/` work.
4. `out/.htaccess` goes up with it. It sends 404s to `404.html`, forces HTTPS, and tells the
   browser to keep the images and fonts for a year.
5. Turn on the free SSL certificate in the host's panel.

Nothing else. There is no Node, no build step and no process to keep alive on the host.

## The two switches

| In `content/site.json` | Before launch | After launch |
|---|---|---|
| `url` | `https://agoshbaranwal.github.io` | `https://<her domain>` |
| `live` | `false` — every page `noindex`, robots disallow, placeholders visible | `true` — indexed, and any section with no content hides itself |

## What to do the day it goes live

1. `npm run content:check` — it must say nothing is left.
2. `npm run check` — lint, types, both languages, the build, the sixteen credibility rules.
3. A one-rupee test payment through the Razorpay link in `content/batches/morning.json`.
4. Open the site on a phone and send yourself the link on WhatsApp: the preview card should show
   her name, the claim and the saffron image.
5. Google Search Console: add the domain, paste the verification code into
   `content/site.json` → `searchConsole`, rebuild, upload, then submit `sitemap.xml`.
6. Google Business Profile: create it with the same name, photo and one-line description. Its
   rating feeds the line under the numbers on the home page.

## Rebuilding after you add content

On GitHub Pages, pushing to `main` is enough: the workflow in `.github/workflows/deploy.yml`
builds and publishes. On a shared host, run `npm run build` and upload `out/` again.

## If something looks wrong

- **A page 404s on the host** — the folder was uploaded without its `index.html`, or
  `trailingSlash` was turned off. Every page is a folder with an `index.html` inside.
- **Styles missing** — the `_next` folder did not upload. On GitHub Pages the `.nojekyll` file
  at the root is what keeps it; it is in `out/` already.
- **Hindi shows as boxes in a link preview** — the preview images are pre-drawn PNGs in
  `public/og/`. Run `npm run og` and rebuild.
