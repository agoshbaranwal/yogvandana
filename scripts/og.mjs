// Link-preview images and the app icon, drawn in a real browser so the
// Devanagari renders in the site's own faces. One Chrome launch per language:
// every card is stacked on one page, captured once, then sliced.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { execFileSync } from "node:child_process";

// the og sheets are local files of an exact size: shoot them directly
const shotFile = async (out, page, w, h) =>
  execFileSync("/Users/agosh/Game/Witness/ui-harness/shot", [out, `file://${page}`, String(w), String(h)], { stdio: "pipe" });

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public", "og");
const read = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, "content", p), "utf8"));
const site = read("site.json");
const ui = read("ui.json");
const ailments = fs
  .readdirSync(path.join(ROOT, "content", "ailments"))
  .filter((f) => f.endsWith(".json"))
  .map((f) => read(`ailments/${f}`))
  .sort((a, b) => a.order - b.order);

const W = 1200;
const H = 630;
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function cards(lang) {
  const u = (k) => k.split(".").reduce((n, p) => n?.[p], ui)?.[lang] ?? "";
  const list = [
    { key: "home", title: site.claim[lang], kicker: u("home.heroLead") },
    { key: "ailments", title: u("home.ailmentsTitle"), kicker: u("home.ailmentsLead") },
    ...ailments.map((a) => ({
      key: `ailment-${a.slug}`,
      title: a.titleFull[lang],
      kicker: a.claimLine[lang],
    })),
    { key: "batches", title: u("batches.title"), kicker: u("band.title") },
    { key: "stories", title: u("stories.title"), kicker: u("stories.lead") },
    { key: "about", title: site.teacher[lang], kicker: site.credential[lang] },
    { key: "credentials", title: u("credentials.title"), kicker: u("credentials.lead") },
    { key: "gallery", title: u("gallery.title"), kicker: u("gallery.lead") },
    { key: "contact", title: u("contact.title"), kicker: u("contact.lead") },
    { key: "students", title: u("students.title"), kicker: u("students.lead") },
    { key: "legal", title: site.brand[lang], kicker: site.mottoGloss[lang] },
  ];
  return list;
}

function html(lang, list) {
  const body = list
    .map(
      (c) => `<section class="card">
  <div class="sky"></div>
  <div class="inner">
    <div class="brand"><span>योग</span> वंदना</div>
    <h1>${esc(c.title)}</h1>
    <p class="kick">${esc(c.kicker)}</p>
    <div class="foot">
      <span class="who">${esc(site.teacher[lang])} · ${esc(site.credentialShort[lang])} · ${esc(site.city[lang])}</span>
      <span class="motto">${esc(site.motto)}</span>
    </div>
  </div>
</section>`,
    )
    .join("\n");

  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Martel:wght@700;800&family=Mukta:wght@400;600&display=swap">
<style>
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:#fff}
.card{width:${W}px;height:${H}px;position:relative;overflow:hidden;background:#FBF8F1;
  font-family:Mukta,sans-serif;color:#231A12}
.sky{position:absolute;inset:0 0 auto 0;height:180px;
  background:linear-gradient(180deg,#DDEBF5 0%,#FBE7CF 60%,#FF9933 100%)}
.card::after{content:"";position:absolute;left:0;right:0;bottom:0;height:14px;background:#FF9933}
.inner{position:relative;height:100%;display:flex;flex-direction:column;gap:14px;
  padding:56px 64px 44px;justify-content:flex-end}
.brand{position:absolute;top:44px;left:64px;font-family:Martel,serif;font-weight:800;font-size:34px;line-height:1.2}
.brand span{color:#A85400}
h1{font-family:"Baloo 2",sans-serif;font-weight:800;font-size:62px;line-height:1.12;margin:0;
  letter-spacing:-0.01em;max-width:15ch}
.kick{margin:0;font-size:24px;line-height:1.5;color:#6E5F4E;max-width:44ch;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.foot{display:flex;justify-content:space-between;align-items:baseline;gap:24px;
  border-top:1px solid #E4D9C7;padding-top:18px;margin-top:6px}
.who{font-size:21px;color:#231A12;font-weight:600}
.motto{font-family:Martel,serif;font-weight:700;font-size:21px;color:#A85400;white-space:nowrap}
</style></head><body>${body}</body></html>`;
}

fs.mkdirSync(OUT, { recursive: true });
const tmp = path.join(ROOT, ".og-tmp");
fs.mkdirSync(tmp, { recursive: true });

for (const lang of ["hi", "en"]) {
  const list = cards(lang);
  const page = path.join(tmp, `og-${lang}.html`);
  fs.writeFileSync(page, html(lang, list));
  const sheet = path.join(tmp, `og-${lang}.png`);
  await shotFile(sheet, page, W, H * list.length);
  for (let i = 0; i < list.length; i++) {
    await sharp(sheet)
      .extract({ left: 0, top: i * H, width: W, height: H })
      .png({ compressionLevel: 9 })
      .toFile(path.join(OUT, `${list[i].key}-${lang}.png`));
  }
  console.log(`og: ${list.length} cards for ${lang}`);
}

/* the app icon: योग on a bhagwa square, drawn once and rasterised */
const iconPage = path.join(tmp, "icon.html");
fs.writeFileSync(
  iconPage,
  `<!doctype html><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Martel:wght@800&display=swap">
<style>html,body{margin:0}div{width:512px;height:512px;background:#FF9933;display:flex;
align-items:center;justify-content:center;font-family:Martel,serif;font-weight:800;
font-size:210px;color:#231A12;line-height:1;padding-top:18px;box-sizing:border-box}</style>
<div>योग</div>`,
);
const iconPng = path.join(tmp, "icon.png");
await shotFile(iconPng, iconPage, 512, 512);
await sharp(iconPng).resize(512, 512).png().toFile(path.join(ROOT, "public", "icon-512.png"));
await sharp(iconPng).resize(192, 192).png().toFile(path.join(ROOT, "public", "icon-192.png"));
await sharp(iconPng).resize(180, 180).png().toFile(path.join(ROOT, "app", "apple-icon.png"));
await sharp(iconPng).resize(32, 32).png().toFile(path.join(ROOT, "app", "icon.png"));
console.log("og: icons written");

fs.rmSync(tmp, { recursive: true, force: true });
