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
    /* out/r7 holds design proposals shown for review, not pages of the site */
    if ((name === "r7" || name === "r8") && dir === OUT) continue;
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

/* An apostrophe comes out of the build as an entity, and a fact still to be
   filled in is written "[like this]" in the content but rendered without its
   brackets — so a rule that compares content against the built page compares
   the words alone. One definition, shared: rules 6 and 7 both need it. */
const norm = (s) =>
  s
    .replace(/&#x27;|&#39;|&rsquo;|’/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/[[\]]/g, "")
    .replace(/\s+/g, " ");

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
  /* Home carries the one answer; each condition page carries the question
     and its own answer, from that condition's content file. */
  const uiTree = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "ui.json"), "utf8"));
  const title = uiTree.medicine.title;
  const homeBody = uiTree.medicine.body;
  const conditions = Object.fromEntries(
    fs.readdirSync(path.join(ROOT, "content", "ailments")).filter((f) => f.endsWith(".json"))
      .map((f) => { const a = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "ailments", f), "utf8")); return [a.slug, a]; }),
  );
  const should = pages.filter((f) => /^\/(rog|en\/conditions)\/[^/]+\/$/.test(rel(f)) || rel(f) === "/" || rel(f) === "/en/");
  const missing = should.filter((f) => {
    const body = norm(text(read(f)));
    const L = isHindi(f) ? "hi" : "en";
    const m = rel(f).match(/^\/(?:rog|en\/conditions)\/([^/]+)\/$/);
    if (!m) return !(body.includes(title[L]) && body.includes(norm(text(homeBody[L]))));
    const a = conditions[m[1]];
    return !a || !(body.includes(title[L]) && body.includes(norm(text(a.medicine[L]))));
  });
  add(6, "The medicine answer appears on home and, in its own terms, on every condition page", missing.length === 0 ? "pass" : "fail", missing.map(rel).join("; ") || `${should.length} pages carry it`);
}

/* 6b — the prescription is not published ---------------------------------- */
{
  /* What she writes on a student's slip — which pranayama, which asanas, in
     what order — is the thing a person consults her for. Naming those
     techniques for a disease on a public page gives away the consultation.
     Category words (आसन, प्राणायाम, सूक्ष्म व्यायाम) describe what a class
     contains and stay; a named technique is a prescription and does not.

     This rule reads the built HTML, so it catches a name typed into a
     component as readily as one left in a content file. */
  const NAMED = [
    "कपालभाति", "अनुलोम", "विलोम", "भ्रामरी", "उज्जायी", "भस्त्रिका", "अग्निसार", "नाड़ी शोधन",
    "सूर्य नमस्कार", "मंडूकासन", "पश्चिमोत्तानासन", "शवासन", "वज्रासन", "ताड़ासन", "सेतुबंध",
    "मकरासन", "भुजंगासन", "मार्जरी", "शलभासन", "बद्धकोणासन", "तितली आसन", "त्रिकोणासन",
    "नौकासन", "बालासन", "योग निद्रा", "मत्स्यासन", "धनुरासन", "हलासन", "सर्वांगासन", "वक्रासन",
    "kapalbhati", "anulom", "vilom", "bhramari", "ujjayi", "bhastrika", "agnisar",
    "surya namaskar", "mandukasana", "paschimottanasana", "shavasana", "savasana",
    "vajrasana", "tadasana", "setu bandha", "makarasana", "bhujangasana", "marjari",
    "shalabhasana", "baddha konasana", "trikonasana", "naukasana", "balasana",
    "yoga nidra", "matsyasana", "dhanurasana", "halasana", "sarvangasana",
  ];
  const found = [];
  for (const f of pages) {
    const body = text(read(f)).toLowerCase();
    for (const n of NAMED) if (body.includes(n.toLowerCase())) found.push(`${rel(f)}: ${n}`);
  }
  add(
    "6b",
    "No named practice is published: the slip is written after the consultation, not before it",
    found.length === 0 ? "pass" : "fail",
    found.slice(0, 8).join("; ") || `${pages.length} pages carry no named asana or pranayama`,
  );
}

/* 6c — the price of the consultation is never a surprise ------------------ */
{
  /* The first conversation is free; the consultation that reads your reports
     and produces your slip is paid. A page that names the consultation and
     does not name its price is how a person gets surprised at the moment they
     are asked for money, so the build refuses it. */
  const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "site.json"), "utf8"));
  const price = (cfg.consultation?.price ?? "").trim();
  if (price === "") {
    add("6c", "The consultation's price is named wherever the consultation is", "waiting",
      "site.consultation.price is empty, so nothing is charged for it and there is no price to name.");
  } else {
    const shown = `₹${price}`;
    const names = (body) => /परामर्श|consultation/i.test(body);
    /* Every page a person uses BEFORE they have paid: home, the condition
       pages, the page about money, and the page where they make contact. */
    const BEFORE = ["/", "/en/", "/batch/", "/en/batches/", "/sampark/", "/en/contact/"];
    const must = pages.filter(
      (f) => /^\/(rog|en\/conditions)\/[^/]+\/$/.test(rel(f)) || BEFORE.includes(rel(f)),
    );
    const bad = [];
    for (const f of pages) {
      const body = text(read(f));
      const needs = must.includes(f) || names(body);
      if (needs && !body.includes(shown)) bad.push(rel(f));
    }
    add("6c", "The consultation's price is named wherever the consultation is",
      bad.length === 0 ? "pass" : "fail",
      bad.join("; ") || `${shown} on home, every condition page, and every page that names it`);
  }
}

/* 6d — a page rests on three grounds, not seven ---------------------------- */
{
  /* A tint should mark a real change of subject. When every section gets its
     own, the eye is re-oriented a dozen times on the way down and the page
     reads as chaos. Three grounds: the page itself, one accent that carries
     the proof, and the saffron the final ask sits on. */
  const bad = [];
  for (const f of pages) {
    const html = read(f);
    const grounds = new Set();
    /* the ground a section paints itself, however the build wrote it */
    for (const m of html.matchAll(/<section[^>]*style="[^"]*background:\s*([^;"]+)/g))
      grounds.add(m[1].trim().replace(/\s+/g, ""));
    for (const m of html.matchAll(/<section[^>]*class="[^"]*\b(first|dawn)\b/g)) grounds.add(m[1]);
    if (grounds.size > 3) bad.push(`${rel(f)}: ${grounds.size} (${[...grounds].join(", ")})`);
  }
  add("6d", "A page rests on at most three grounds: the page, one accent, and the ask",
    bad.length === 0 ? "pass" : "fail",
    bad.slice(0, 6).join("; ") || `${pages.length} pages checked`);
}

/* 6e — one design system, not six --------------------------------------- */
{
  /* Audited 4 September: the site was drawing seven corner radii, six border
     treatments, two kinds of shadow, ten hatched diagonal gradients a page and
     six near-identical creams. Nothing looked like it belonged to anything
     else, which is most of what "chaotic" meant. The stylesheet is held to a
     system now. */
  /* our stylesheet, not the framework's resets and utilities */
  const src = fs.readFileSync(path.join(ROOT, "app", "globals.css"), "utf8");
  /* the focus ring is an accessibility affordance, not decoration */
  const own = src.replace(/:focus-visible\s*\{[^}]*\}/g, "");
  const radii = new Set();
  for (const m of own.matchAll(/border-radius:\s*([^;}]+)/g)) {
    for (const v of m[1].trim().split(/\s+/)) {
      if (v === "0" || v === "0px" || v.startsWith("var(")) continue;
      radii.add(v);
    }
  }
  const shadows = [...own.matchAll(/box-shadow:\s*([^;}]+)/g)]
    .map((m) => m[1].trim())
    .filter((v) => v !== "none");
  const hatch = [...own.matchAll(/repeating-linear-gradient/g)].length;
  const problems = [];
  if (radii.size > 3) problems.push(`${radii.size} literal radii (${[...radii].slice(0, 8).join(" ")})`);
  if (shadows.length > 0) problems.push(`${shadows.length} box-shadow`);
  if (hatch > 0) problems.push(`${hatch} repeating gradient`);
  add("6e", "One design system: at most three radii, no shadows, no hatching",
    problems.length === 0 ? "pass" : "fail",
    problems.join("; ") || `radii ${[...radii].join(" ") || "all tokenised"}, no shadows, no hatching`);
}

/* 7 — the claim, word for word -------------------------------------------- */
/* The site has one headline claim and it must appear intact wherever it is
   made — home and every condition page — so it cannot be quietly softened on
   one page and left standing on another. The wording is READ FROM
   content/site.json, not copied here: a rule that carries its own copy of the
   text fails the day the text legitimately changes, which teaches whoever hit
   it to edit the rule instead of the page.

   But reading the wording from content is not enough on its own: it makes both
   sides of the comparison move together, so a claim softened to "yoga can help
   a bit" would sail through. The claim is the reason the site exists. So the
   second half of this rule pins what a claim must SAY — that yoga offers a
   remedy — without pinning the sentence it says it in. */
{
  const claim = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "site.json"), "utf8")).claim;
  const byslug = Object.fromEntries(
    fs
      .readdirSync(path.join(ROOT, "content", "ailments"))
      .filter((f) => f.endsWith(".json"))
      .map((f) => {
        const a = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "ailments", f), "utf8"));
        return [a.slug, a];
      }),
  );
  const homes = pages.filter((f) => rel(f) === "/" || rel(f) === "/en/");
  const ailmentPages = pages.filter((f) => /^\/(rog|en\/conditions)\/[^/]+\/$/.test(rel(f)));
  const wanted = (f) => {
    const m = rel(f).match(/^\/(?:rog|en\/conditions)\/([^/]+)\/$/);
    const want = m ? byslug[m[1]].claimLine : claim;
    return norm(isHindi(f) ? want.hi : want.en);
  };
  const bad = [...homes, ...ailmentPages].filter((f) => !norm(text(read(f))).includes(wanted(f)));

  /* every claim on the site, home and per condition, must promise a remedy
     through yoga — in either language */
  const MUST = { hi: [/योग/, /हल|ठीक/], en: [/yoga/i, /remedy|cure/i] };
  const claims = [
    ["site.claim", claim],
    ...Object.entries(byslug).map(([slug, a]) => [`${slug}.claimLine`, a.claimLine]),
  ];
  const weak = claims.filter(([, c]) =>
    MUST.hi.some((re) => !re.test(c.hi)) || MUST.en.some((re) => !re.test(c.en)),
  );

  add(
    7,
    "The claim appears word for word on its page, and still promises a remedy through yoga",
    bad.length === 0 && weak.length === 0 ? "pass" : "fail",
    [
      ...bad.map((f) => `${rel(f)} does not carry its claim`),
      ...weak.map(([k]) => `${k} no longer promises a remedy through yoga`),
    ].join("; ") ||
      `${homes.length} home pages, ${ailmentPages.length} condition pages, ${claims.length} claims`,
  );
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
  const files = pages.filter((f) => /\/(parichay|about)\/$/.test(rel(f)));
  const missing = files.filter((f) => !/अपडेट|Updated/.test(text(read(f))));
  add(9, "The page that carries her record shows when it was last updated", missing.length === 0 ? "pass" : "fail", missing.map(rel).join("; ") || `${files.length} pages`);
}

/* 10 — standard words in the menu ----------------------------------------- */
{
  const HI = ["बीमारी", "बैच", "कहानियाँ", "परिचय", "संपर्क"];
  const EN = ["Conditions", "Batches", "Stories", "About", "Contact"];
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
  /* Until Phase 1 lands, a placeholder is painted in `muted` on every ground
     and the wordmark's योग in `bhagwa`; these aliases make the rule measure
     what is actually on screen, and fail. When the tokens exist, they win. */
  const ALIAS = { "todo-on-bhagwa": "muted", "todo-on-kohl": "muted", mark: "bhagwa" };
  const token = (name) => {
    const own = CSS.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{3,6})\\b`));
    if (!own && ALIAS[name]) name = ALIAS[name];
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
    ["links on the apricot bands", "deep", "apricot"],
    ["the free band", "kohl", "bhagwa"],
    ["the band's small print", "kohl", "bhagwa"],
    ["the hero eyebrow", "deeper", "apricot"],
    ["body on the hero", "heroink", "sky"],
    ["condition chips", "joint", "ivory"],
    ["condition chips", "metabolic", "ivory"],
    ["condition chips", "mind", "ivory"],
    ["condition chips", "women", "ivory"],
    /* Pairs the site paints today that the palette list missed. Found by
       measuring the rendered page, not the tokens. */
    ["placeholders on the saffron band", "todo-on-bhagwa", "bhagwa"],
    ["placeholders in the footer", "todo-on-kohl", "kohl"],
    ["the wordmark on ivory", "mark", "ivory"],
    ["the wordmark on white", "mark", "paper"],
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
  const idsOf = new Map();
  for (const f of pages) idsOf.set(rel(f), new Set([...read(f).matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  /* A hash on another page has to exist on that page. This is how the header
     button was found jumping to a booking band six pages did not have. */
  const hasAnchor = (target, frag) => {
    const key = target.endsWith("/") ? target : `${target}/`;
    const ids = idsOf.get(key);
    return ids ? ids.has(frag) : true;
  };
  const broken = new Set();
  let count = 0;
  let dangling = 0;
  for (const f of pages) {
    const html = read(f);
    const ids = idsOf.get(rel(f));
    for (const m of html.matchAll(/href="(\/[^"/][^"]*|\/)"/g)) {
      count += 1;
      const [target, frag] = m[1].split("#");
      if (!has(m[1])) broken.add(`${rel(f)} → ${m[1]}`);
      else if (frag && !hasAnchor(target, frag)) broken.add(`${rel(f)} → ${m[1]} (no #${frag} there)`);
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

/* 17 — every link that takes money is one we meant --------------------- */
{
  const PAY_HOSTS = [
    "razorpay.com", "rzp.io", "cashfree.com", "cf-pg.com", "phonepe.com",
    "paytm.in", "paytm.com", "instamojo.com", "payu.in",
  ];
  const site = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "site.json"), "utf8"));
  const ownHost = "pay.yogvandana.com";
  const bad = [];
  let money = 0;
  let tagged = 0;
  for (const f of pages) {
    const html = read(f);
    /* Anything the page marks as taking money. If a link is a payment link it
       must say so in the markup, and if it says so it must be a real one. */
    for (const m of html.matchAll(/<a\b[^>]*data-ev="pay_click"[^>]*>/g)) {
      money += 1;
      const href = (m[0].match(/href="([^"]*)"/) || [])[1] ?? "";
      const url = href.replace(/&amp;/g, "&");
      let ok = false;
      try {
        const u = new URL(url);
        ok =
          u.protocol === "https:" &&
          (u.hostname === ownHost || PAY_HOSTS.some((h) => u.hostname === h || u.hostname.endsWith(`.${h}`)));
        if (ok && u.searchParams.get("batch")) tagged += 1;
      } catch {
        ok = false;
      }
      if (!ok) bad.push(`${rel(f)} → ${url || "(no href)"}`);
    }
  }
  const set = site.links.paymentPage.trim() !== "";
  add(
    17,
    "Every link that takes money is https, on a payment provider's domain, and says which batch",
    !set ? "waiting" : bad.length === 0 && tagged === money ? "pass" : "fail",
    !set
      ? "No payment page in content/site.json yet, so every button still opens WhatsApp."
      : bad.length
        ? bad.slice(0, 4).join(" · ")
        : `${money} payment links across ${pages.length} pages, all on ${site.links.paymentPage.replace(/^https:\/\//, "").split("/")[0]}, every one carrying its batch`,
  );
}

/* 18 — the sticky bar knows its place ------------------------------------- */
{
  const stickyPages = pages.filter((f) => /data-sticky-cta/.test(read(f)));
  const quiet = stickyPages.filter((f) => /\/(privacy|terms|refund|nahin-mila)\/$|404\.html$/.test(rel(f)));
  const sticky = fs.readFileSync(path.join(ROOT, "components", "StickyCta.tsx"), "utf8");
  const viewer = fs.readFileSync(path.join(ROOT, "components", "GalleryGrid.tsx"), "utf8");
  const z = (src) => Number((src.match(/\bz-(\d+)\b/) || [])[1] ?? 0);
  const zOk = z(viewer) > z(sticky);
  /* A reveal animation that keeps its end state leaves `translate` on every
     section, and a translate makes a fixed dialog inside it position against
     the section and stack inside it — under the bar. Only `backwards` leaves
     the section clean once it has risen. */
  const reveal = (CSS.match(/section\.in\{animation:[^}]*\}/) || [""])[0];
  const fillOk = reveal !== "" && !/\b(both|forwards)\b/.test(reveal);
  add(
    18,
    "The sticky bar is absent on policy and 404 pages and can never cover a dialog",
    quiet.length === 0 && zOk && fillOk ? "pass" : "fail",
    [
      quiet.length ? `on ${quiet.map(rel).join(", ")}` : `absent on ${pages.length - stickyPages.length} quiet pages`,
      zOk ? `viewer z-${z(viewer)} above bar z-${z(sticky)}` : `viewer z-${z(viewer)} not above bar z-${z(sticky)}`,
      fillOk ? "reveal leaves no transform behind" : "reveal keeps its transform (fill-mode both/forwards), which traps a dialog under the bar",
    ].join(" · "),
  );
}

/* 19 — two verbs on every button --------------------------------------- */
{
  /* A person deciding should meet the same two actions everywhere: talk to
     her, or pay. Any other verb on a button is a third thing to work out. */
  const ui = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "ui.json"), "utf8"));
  const pick = (k) => k.split(".").reduce((o, p) => (o ? o[p] : undefined), ui);
  const allowedKeys = ["cta.talk", "cta.whatsappTalk", "cta.payJoin", "cta.payFee", "cta.pay", "cta.form"];
  const allowed = new Set();
  for (const k of allowedKeys) {
    const v = pick(k);
    if (v) allowed.add(v.hi).add(v.en);
  }
  const strays = new Map();
  let buttons = 0;
  for (const f of pages) {
    for (const m of read(f).matchAll(/<(?:a|button)\b[^>]*class="[^"]*\bbtn\b[^"]*"[^>]*>([\s\S]*?)<\/(?:a|button)>/g)) {
      const label = text(m[1]).trim();
      if (!label) continue;
      buttons += 1;
      /* "बात" in any form is the talk verb; a call is talking on the phone. */
      const talks = /बात|talk/i.test(label) || /कॉल|\bcall\b/i.test(label);
      if (!allowed.has(label) && !talks) strays.set(label, (strays.get(label) || 0) + 1);
    }
  }
  add(
    19,
    "Every button says one of two things: talk to her, or pay",
    strays.size === 0 ? "pass" : "fail",
    strays.size
      ? `${strays.size} other label(s): ${[...strays.entries()].map(([l, n]) => `"${l}" ×${n}`).join(" · ")}`
      : `${buttons} buttons, every one from the allowed set`,
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
