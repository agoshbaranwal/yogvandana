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
const families = [...css.matchAll(/font-family:\s*([^;]+);/g)].map((m) => m[1].trim());
const strayFamily = families.find((f) => !/var\(--font-(hindi|english)\)/.test(f));
if (strayFamily) problems.push(`app/globals.css  font-family: ${strayFamily} — Baloo 2 and Montserrat only`);

if (problems.length) {
  console.error(`type: ${problems.length} problem(s)\n  ` + problems.join("\n  "));
  process.exit(1);
}
console.log(
  `type: ${files.length} files clean · ${stepNames.size} steps (${[...stepNames].join(", ")}) · ${families.length} font-family declarations, both from the two faces`,
);
