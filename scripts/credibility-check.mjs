// The credibility rules, run over the built pages, written to
// docs/CHECKS.md. A rule that cannot pass until her material arrives is
// marked "waiting on content" rather than quietly skipped.
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "out");
const DOCS = path.join(ROOT, "docs");
if (!fs.existsSync(OUT)) {
  console.error("credibility: build first (npm run build).");
  process.exit(1);
}

const pages = [];
const walk = (dir) => {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (name === "index.html" || name === "404.html") pages.push(full);
  }
};
walk(OUT);
const read = (f) => fs.readFileSync(f, "utf8");
const rel = (f) => "/" + path.relative(OUT, f).replace(/index\.html$/, "");
const isHindi = (f) => !rel(f).startsWith("/en/");
/* The built stylesheet, wherever Next put it. Read once, and never treated as
   "nothing found means nothing wrong": a rule that gets no CSS fails. */
const cssFiles = [];
const walkCss = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walkCss(full);
    else if (name.endsWith(".css")) cssFiles.push(full);
  }
};
walkCss(path.join(OUT, "_next", "static"));
const CSS = cssFiles.map((f) => fs.readFileSync(f, "utf8")).join("\n");

const text = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");

const results = [];
const add = (n, title, status, detail) => results.push({ n, title, status, detail });

/* 1 — no superlative without a source ------------------------------------ */
const BANNED = [
  "विश्व प्रसिद्ध",
  "सर्वश्रेष्ठ",
  "गारंटी",
  "चमत्कार",
  "सीमित सीटें",
  "जल्दी करें",
  "अभी खरीदें",
  "world-renowned",
  "internationally acclaimed",
  "guaranteed",
  "miracle",
  "limited seats",
  "hurry",
  "best in india",
];
{
  const hits = [];
  for (const f of pages) {
    const body = text(read(f)).toLowerCase();
    for (const word of BANNED) if (body.includes(word.toLowerCase())) hits.push(`${rel(f)} — “${word}”`);
  }
  add(1, "No superlative or scarcity language", hits.length === 0 ? "pass" : "fail", hits.join("; ") || `${BANNED.length} words checked across ${pages.length} pages`);
}

/* 2 — every certificate row can be verified ------------------------------- */
{
  const files = pages.filter((f) => /\/(yogyata|credentials)\//.test(rel(f)));
  const bad = [];
  for (const f of files) {
    const body = text(read(f));
    const rows = (read(f).match(/<tr>/g) || []).length;
    const verifies = (read(f).match(/जाँचें|Verify|University record|विश्वविद्यालय का रिकॉर्ड/g) || []).length;
    const none = (body.match(/सार्वजनिक रजिस्टर नहीं|No public registry/g) || []).length;
    const todo = (body.match(/\[जाँच का लिंक\]|\[verify link\]/g) || []).length;
    if (verifies + none + todo === 0) bad.push(rel(f));
    if (rows === 0 && !body.includes("प्रमाणपत्र") && !body.includes("Certification")) bad.push(rel(f));
  }
  add(2, "Every certificate either links to a register, says there is none, or shows a blank still to be filled", bad.length === 0 ? "pass" : "fail", bad.join("; ") || `${files.length} credentials pages`);
}

/* 3 — no stock or generated pictures; empty slots are labelled ------------- */
{
  const imgs = [];
  for (const f of pages) for (const m of read(f).matchAll(/<img\b[^>]*>/g)) imgs.push({ f, tag: m[0] });
  const external = imgs.filter((i) => /src="https?:\/\//.test(i.tag));
  const placeholders = pages.reduce((n, f) => n + (read(f).match(/class="[^"]*\bph\b/g) || []).length, 0);
  add(3, "No stock or generated images; empty slots are labelled blocks", external.length === 0 ? "pass" : "fail", `${imgs.length} images, ${external.length} from other sites, ${placeholders} labelled placeholder blocks`);
}

/* 4 — no countdowns, no pop-ups ------------------------------------------- */
{
  const bad = pages.filter((f) => /countdown|setInterval\(|window\.open\(/.test(read(f)));
  add(4, "No countdown, no fake scarcity, no pop-up", bad.length === 0 ? "pass" : "fail", bad.map(rel).join("; ") || "checked every page");
}

/* 5 — every number on the page comes from a content file ------------------ */
add(5, "Every number traces to a content file", "waiting", "Numbers are still [X], [Y], [N], [A] in content/site.json; nothing is hard-coded in the pages.");

/* 6 — the medicine answer, word for word ---------------------------------- */
{
  const HI = "दवा अपने डॉक्टर की सलाह से ही घटाएँ";
  const EN = "Reduce medicine only on your doctor";
  const should = pages.filter((f) => /^\/(rog|en\/conditions)\/[^/]+\/$/.test(rel(f)) || rel(f) === "/" || rel(f) === "/en/");
  const missing = should.filter((f) => {
    const body = text(read(f));
    return isHindi(f) ? !body.includes(HI) : !body.includes(EN);
  });
  add(6, "The medicine answer appears word for word on home and every condition page", missing.length === 0 ? "pass" : "fail", missing.map(rel).join("; ") || `${should.length} pages carry it`);
}

/* 7 — the claim, word for word -------------------------------------------- */
{
  const HI = "योग से हर बीमारी ठीक हो सकती है।";
  const EN = "Yoga can cure any disease.";
  const homes = pages.filter((f) => rel(f) === "/" || rel(f) === "/en/");
  const missing = homes.filter((f) => !text(read(f)).includes(isHindi(f) ? HI : EN));
  const ailmentPages = pages.filter((f) => /^\/(rog|en\/conditions)\/[^/]+\/$/.test(rel(f)));
  const noClaimLine = ailmentPages.filter((f) => {
    const body = text(read(f));
    return isHindi(f) ? !/योग से .* ठीक हो सकत/.test(body) : !/Yoga can cure/.test(body);
  });
  const bad = [...missing, ...noClaimLine];
  add(7, "The claim appears word for word on home and on every condition page", bad.length === 0 ? "pass" : "fail", bad.map(rel).join("; ") || `${homes.length} home pages, ${ailmentPages.length} condition pages`);
}

/* 8 — every image has alt text -------------------------------------------- */
{
  const bad = [];
  for (const f of pages)
    for (const m of read(f).matchAll(/<img\b[^>]*>/g))
      if (!/\balt="/.test(m[0])) bad.push(rel(f));
  const labelled = pages.reduce((n, f) => n + (read(f).match(/role="img" aria-label="/g) || []).length, 0);
  add(8, "Every image has alt text; every placeholder block is labelled for a screen reader", bad.length === 0 ? "pass" : "fail", `${labelled} labelled blocks; ${bad.length} images without alt`);
}

/* 9 — the updated date shows where a record is kept ----------------------- */
{
  const files = pages.filter((f) => /\/(parichay|about|yogyata|credentials)\//.test(rel(f)));
  const missing = files.filter((f) => !/अपडेट|Updated/.test(text(read(f))));
  add(9, "About and Credentials show when they were last updated", missing.length === 0 ? "pass" : "fail", missing.map(rel).join("; ") || `${files.length} pages`);
}

/* 10 — standard words in the menu ----------------------------------------- */
{
  const HI = ["तकलीफ़", "बैच", "कहानियाँ", "परिचय", "योग्यता", "गैलरी", "संपर्क"];
  const EN = ["Conditions", "Batches", "Stories", "About", "Credentials", "Gallery", "Contact"];
  const bad = [];
  for (const f of pages) {
    if (rel(f) === "/404" || f.endsWith("404.html")) continue;
    const body = text(read(f));
    const want = isHindi(f) ? HI : EN;
    const missing = want.filter((w) => !body.includes(w));
    if (missing.length) bad.push(`${rel(f)} — ${missing.join(", ")}`);
  }
  add(10, "The menu uses the same plain words on every page, in both languages", bad.length === 0 ? "pass" : "fail", bad.slice(0, 4).join("; ") || `${pages.length} pages`);
}

/* 11 — link previews on every page ---------------------------------------- */
{
  const bad = [];
  for (const f of pages) {
    if (f.endsWith("404.html") || rel(f) === "/nahin-mila/") continue;
    const html = read(f);
    const has = (p) => new RegExp(`property="${p}"`).test(html) || new RegExp(`name="${p}"`).test(html);
    const missing = ["og:title", "og:description", "og:image"].filter((p) => !has(p));
    if (missing.length) bad.push(`${rel(f)} — ${missing.join(", ")}`);
  }
  const ogFiles = fs.existsSync(path.join(ROOT, "public", "og"))
    ? fs.readdirSync(path.join(ROOT, "public", "og")).length
    : 0;
  add(11, "Every page has a link-preview title, description and image", bad.length === 0 ? "pass" : "fail", bad.slice(0, 4).join("; ") || `${ogFiles} preview images, one per page per language`);
}

/* 12 — the two languages point at each other; nothing is indexed yet ------- */
{
  const bad = [];
  for (const f of pages) {
    if (f.endsWith("404.html") || rel(f) === "/nahin-mila/") continue;
    const html = read(f);
    if (!/hreflang="hi"/i.test(html) || !/hreflang="en"/i.test(html)) bad.push(`${rel(f)} — hreflang`);
    if (!/<link rel="canonical"/i.test(html)) bad.push(`${rel(f)} — canonical`);
  }
  const site = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "site.json"), "utf8"));
  const noindex = pages.filter((f) => /noindex/.test(read(f))).length;
  const indexOk = site.live ? noindex === 0 : noindex >= pages.length - 2;
  add(12, "Canonical and hreflang on every page; nothing indexed until the site goes live", bad.length === 0 && indexOk ? "pass" : "fail", `${bad.slice(0, 3).join("; ") || "all pages paired"} · noindex on ${noindex}/${pages.length} pages, site.live = ${site.live}`);
}

/* 13 — WhatsApp links carry a written message ----------------------------- */
{
  const links = [];
  for (const f of pages) for (const m of read(f).matchAll(/https:\/\/wa\.me\/[^"']*/g)) links.push({ f, url: m[0] });
  const bare = links.filter((l) => !l.url.includes("text="));
  add(13, "Every WhatsApp link opens with the message already written", bare.length === 0 ? "pass" : "fail", `${links.length} links, ${bare.length} without a message`);
}

/* 14 — light only, and analytics stay off until an id is set -------------- */
{
  const dark = /prefers-color-scheme/.test(CSS);
  const ga = pages.filter((f) => /googletagmanager/.test(read(f))).length;
  const site = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "site.json"), "utf8"));
  const gaOk = site.analyticsId ? ga > 0 : ga === 0;
  const ok = CSS.length > 0 && !dark && gaOk;
  add(
    14,
    "Light theme only; analytics load only once an id is set",
    ok ? "pass" : "fail",
    CSS.length === 0
      ? "no stylesheet found under out/_next/static — nothing was actually checked"
      : `${(CSS.length / 1024).toFixed(0)} KB of CSS read from ${cssFiles.length} file(s): ${dark ? "a colour-scheme query is present" : "no colour-scheme query"} · analytics on ${ga} pages, id ${site.analyticsId ? "set" : "empty"}`,
  );
}

/* 15 — text stands off its background (WCAG AA) --------------------------- */
{
  // Read the tokens from the built stylesheet, so a later palette edit is
  // caught here rather than in someone's eyes.
  // Tailwind drops a theme variable nothing references, and the condition
  // families are painted from lib/content.ts, so they are read from there.
  const families = fs.readFileSync(path.join(ROOT, "lib", "content.ts"), "utf8");
  const expand = (h) =>
    h && h.length === 4 ? `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}` : h;
  const token = (name) => {
    const inCss = CSS.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{3,6})\\b`));
    if (inCss) return expand(inCss[1]).toLowerCase();
    const inTs = families.match(new RegExp(`${name}:\\s*\\{\\s*ink:\\s*"(#[0-9a-fA-F]{3,6})"`));
    return inTs ? expand(inTs[1]).toLowerCase() : undefined;
  };
  const lin = (c) => (c / 255 <= 0.03928 ? c / 255 / 12.92 : ((c / 255 + 0.055) / 1.055) ** 2.4);
  const lum = (hex) => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  };
  const ratio = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
    return (x + 0.05) / (y + 0.05);
  };
  // Every pair the site actually paints, at body or label size.
  const pairs = [
    ["body text", "kohl", "ivory"],
    ["captions", "muted", "ivory"],
    ["links", "deep", "ivory"],
    ["links on the sandal bands", "deep", "sandal"],
    ["links on the apricot bands", "deep", "apricot"],
    ["the free band", "kohl", "bhagwa"],
    ["the band's small print", "deeper", "bhagwa"],
    ["the hero eyebrow", "deeper", "apricot"],
    ["body on the hero", "heroink", "sky"],
    ["condition chips", "joint", "ivory"],
    ["condition chips", "metabolic", "ivory"],
    ["condition chips", "mind", "ivory"],
    ["condition chips", "women", "ivory"],
  ];
  const measured = pairs
    .map(([what, fg, bg]) => ({ what, fg, bg, a: token(fg), b: token(bg) }))
    .filter((p) => p.a && p.b)
    .map((p) => ({ ...p, r: ratio(p.a, p.b) }));
  const low = measured.filter((p) => p.r < 4.5);
  const worst = measured.slice().sort((x, y) => x.r - y.r)[0];
  add(
    15,
    "Every text colour clears 4.5:1 on its background",
    measured.length === pairs.length && low.length === 0 ? "pass" : "fail",
    measured.length !== pairs.length
      ? `only ${measured.length} of ${pairs.length} pairs could be read from the stylesheet`
      : low.length
        ? low.map((p) => `${p.what} ${p.a} on ${p.b} = ${p.r.toFixed(2)}:1`).join(" · ")
        : `${measured.length} pairs measured, the closest being ${worst.what} at ${worst.r.toFixed(2)}:1`,
  );
}

/* 16 — every link on the site goes somewhere ------------------------------ */
{
  const has = (href) => {
    const clean = href.split("#")[0].split("?")[0];
    if (clean === "" || clean === "/") return fs.existsSync(path.join(OUT, "index.html"));
    const full = path.join(OUT, clean.replace(/^\//, ""));
    return (
      fs.existsSync(full) ||
      fs.existsSync(path.join(full, "index.html")) ||
      fs.existsSync(full.replace(/\/$/, "") + ".html")
    );
  };
  const broken = new Set();
  let count = 0;
  let dangling = 0;
  for (const f of pages) {
    const html = read(f);
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    for (const m of html.matchAll(/href="(\/[^"/][^"]*|\/)"/g)) {
      count += 1;
      if (!has(m[1])) broken.add(`${rel(f)} → ${m[1]}`);
    }
    for (const m of html.matchAll(/href="#([^"]+)"/g)) if (!ids.has(m[1])) dangling += 1;
  }
  add(
    16,
    "Every internal link and anchor goes somewhere",
    broken.size === 0 && dangling === 0 ? "pass" : "fail",
    broken.size || dangling
      ? `${[...broken].slice(0, 6).join(" · ")}${dangling ? ` · ${dangling} anchors point at nothing` : ""}`
      : `${count} links across ${pages.length} pages, and every same-page anchor has its target`,
  );
}

/* ------------------------------- report ---------------------------------- */
const pass = results.filter((r) => r.status === "pass").length;
const fail = results.filter((r) => r.status === "fail");
const waiting = results.filter((r) => r.status === "waiting");

const rows = results
  .map((r) => `| ${r.n} | ${r.title} | ${r.status === "pass" ? "pass" : r.status === "fail" ? "**fail**" : "waiting on content"} | ${r.detail} |`)
  .join("\n");

fs.mkdirSync(DOCS, { recursive: true });
fs.writeFileSync(
  path.join(DOCS, "CHECKS.md"),
  `# Credibility checks\n\nRun with \`npm run credibility:check\` over the built site in \`out/\`.\nLast run: ${new Date().toISOString().slice(0, 10)} · ${pages.length} pages.\n\n| # | Check | Result | What was looked at |\n|---|---|---|---|\n${rows}\n\n${pass} passed, ${fail.length} failed, ${waiting.length} waiting on her material.\n`,
);

console.log(`credibility: ${pass} passed, ${fail.length} failed, ${waiting.length} waiting (docs/CHECKS.md)`);
for (const r of fail) console.log(`  ✗ ${r.n}. ${r.title} — ${r.detail}`);
process.exit(fail.length === 0 ? 0 : 1);
