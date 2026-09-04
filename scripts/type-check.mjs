// The type scale, guarded.
//
// This site had seventeen font sizes in its components and a dozen more in the
// stylesheet, which is why every section looked equally important. The scale is
// seven steps now, declared once in app/globals.css. This fails the build if a
// component sets a size of its own again, or if the stylesheet grows a pixel
// size outside the scale.
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const files = [];
const walk = (dir) => {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name === "out") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (/\.(tsx|ts)$/.test(name)) files.push(full);
  }
};
for (const dir of ["components", "views", "app", "lib"]) {
  const full = path.join(ROOT, dir);
  if (fs.existsSync(full)) walk(full);
}

const problems = [];

for (const file of files) {
  const lines = fs.readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const m of line.matchAll(/(?:md:|sm:|lg:)?text-\[[^\]]+\]/g)) {
      problems.push(`${path.relative(ROOT, file)}:${i + 1}  ${m[0]} — use claim / page-title / h2 / h3 / body / cap / label`);
    }
    for (const m of line.matchAll(/fontSize:/g)) {
      problems.push(`${path.relative(ROOT, file)}:${i + 1}  ${m[0]} — the scale lives in globals.css`);
    }
    for (const m of line.matchAll(/fontFamily:/g)) {
      problems.push(`${path.relative(ROOT, file)}:${i + 1}  ${m[0]} — two faces only, both set on <body>`);
    }
  });
}

const css = fs.readFileSync(path.join(ROOT, "app", "globals.css"), "utf8");
const stepNames = new Set([...css.matchAll(/--step-([a-z]+):/g)].map((m) => m[1]));

/* The floors. Hindi needs 16 px for anything a person has to read, and this
   audience reads it on a 720p screen; 18 for body, 1.7 line height so the
   matras have room. The first value of each token is the phone value. */
const FLOOR = { label: 16, cap: 16, body: 18 };
// --step-fine (14) is the stamp and a placeholder caption: not text a person reads, and never on a component
for (const [name, min] of Object.entries(FLOOR)) {
  const m = css.match(new RegExp(`--step-${name}:\\s*([\\d.]+)px`));
  const px = m ? parseFloat(m[1]) : NaN;
  if (!(px >= min)) problems.push(`app/globals.css  --step-${name} is ${px}px — the floor for this audience is ${min}px`);
}
const bodyLh = css.match(/\n\s*body\s*\{[^}]*line-height:\s*([\d.]+)/);
if (!bodyLh || parseFloat(bodyLh[1]) < 1.7) problems.push(`app/globals.css  body line-height is ${bodyLh ? bodyLh[1] : "unset"} — Hindi wants 1.7`);
// a form label or a table header is something a person must read: never the smallest step
for (const file of files) {
  const src = fs.readFileSync(file, "utf8");
  for (const m of src.matchAll(/<(label|th)\b[^>]*className="([^"]*)"/g)) {
    if (/\blabel\b/.test(m[2])) problems.push(`${path.relative(ROOT, file)}  <${m[1]}> uses the "label" step — a form label or table header is read, not glanced at; use cap or body`);
  }
}
for (const m of css.matchAll(/font-size:\s*([^;]+);/g)) {
  const value = m[1].trim();
  if (!value.startsWith("var(--step-")) {
    problems.push(`app/globals.css  font-size: ${value} — every size comes from a --step- token`);
  }
}
const families = [...css.replace(/@font-face\s*\{[^}]*\}/g, "").matchAll(/font-family:\s*([^;]+);/g) /* an @font-face that DEFINES a fallback face is not a third family in use */].map((m) => m[1].trim());
const strayFamily = families.find((f) => !/var\(--font-(hindi|english)\)/.test(f));
if (strayFamily) problems.push(`app/globals.css  font-family: ${strayFamily} — Anek Devanagari is the only face`);

/* — the stylesheet may only name a weight the site actually ships ---------- */
/* Two files go down the wire, 400 and 700. A `font-weight: 600` still parses
   and still looks like a decision, but the browser rounds it to 700, so the
   stylesheet quietly stops describing the page. Fail instead. */
{
  const shipped = new Set(["400", "700", "normal", "bold", "inherit"]);
  for (const m of css.matchAll(/font-weight:\s*([a-z0-9]+)/g)) {
    if (!shipped.has(m[1]))
      problems.push(`app/globals.css  font-weight: ${m[1]} — only 400 and 700 are shipped; the browser rounds anything else`);
  }
}

/* — links do not prefetch ------------------------------------------------- */
/* next/link fetches the payload of every link that scrolls into view. Eight
   links on a page is eight downloads the reader did not ask for, on a metered
   connection. components/Nav.tsx is the same Link with that turned off. */
{
  for (const file of files) {
    const rel = path.relative(ROOT, file);
    if (rel === "components/Nav.tsx") continue;
    if (/from "next\/link"/.test(fs.readFileSync(file, "utf8")))
      problems.push(`${rel}  imports next/link — import { A as Link } from Nav instead, so the page does not prefetch every link in view`);
  }
}

/* — a section heading outranks its body by enough to be seen ---------------- */
/* Nine of thirteen sections once had nothing in them bigger than 26px against
   an 18px body — a 1.4x jump, which reads as no hierarchy at all: the eye has
   nowhere to land and the page informs instead of selling. Headings start at
   the title step and the one element carrying a section's point at the display
   step. scripts/hierarchy.py measures the rendered result; this guards the two
   rules it depends on, so they cannot be quietly turned back. */
{
  const step = (name) => {
    const m = css.match(new RegExp(`--step-${name}:\\s*([^;]+);`));
    return m ? parseInt(m[1], 10) : 0;
  };
  const sizeOf = (cls) => {
    const m = css.match(new RegExp(`\\.${cls}\\s*\\{[^}]*font-size:\\s*var\\(--step-([a-z]+)\\)`));
    return m ? m[1] : null;
  };
  const body = step("body");
  for (const [cls, min] of [["h2", 1.6], ["point", 2.2], ["point-sm", 1.6]]) {
    const named = sizeOf(cls);
    if (!named) {
      problems.push(`app/globals.css  .${cls} has no font-size from the type scale`);
      continue;
    }
    const px = step(named);
    if (px < body * min)
      problems.push(
        `app/globals.css  .${cls} is ${px}px against an ${body}px body — needs ${Math.ceil(body * min)}px to read as a level of its own`,
      );
  }
}

if (problems.length) {
  console.error(`type: ${problems.length} problem(s)\n  ` + problems.join("\n  "));
  process.exit(1);
}
console.log(
  `type: ${files.length} files clean · ${stepNames.size} steps (${[...stepNames].join(", ")}) · ${families.length} font-family declarations, all from the one face`,
);
