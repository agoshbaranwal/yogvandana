// The phone rules. Written before the fixes they demand.
//
// The audience sees this site on a ₹10–15,000 Android and almost nothing else,
// so the things that break a page on a small screen are build failures, not
// review notes. Each rule below was red on the site the day it was written.
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const files = [];
const walk = (dir) => {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name === "out") continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (/\.tsx$/.test(name)) files.push(full);
  }
};
for (const dir of ["components", "views", "app"]) if (fs.existsSync(path.join(ROOT, dir))) walk(path.join(ROOT, dir));

const problems = [];
const css = read("app/globals.css");

/* 1 — nothing in a component is wider than the narrowest phone ------------ */
for (const file of files) {
  const src = fs.readFileSync(file, "utf8");
  src.split("\n").forEach((line, i) => {
    for (const m of line.matchAll(/(?<![a-z:-])(?:w|min-w|max-w)-\[(\d+)px\]/g)) {
      if (Number(m[1]) > 360)
        problems.push(`${path.relative(ROOT, file)}:${i + 1}  ${m[0]} — wider than a 360 px phone with no md: prefix`);
    }
  });
}

/* 2 — a field never asks a phone to zoom ---------------------------------- */
for (const file of files) {
  /* an arrow function inside an attribute has a ">" in it; read past it */
  const src = fs.readFileSync(file, "utf8").replace(/=>/g, "→");
  for (const m of src.matchAll(/<(input|textarea|select)\b([^>]*)>/g)) {
    if (/type="hidden"/.test(m[2]) || /className="hidden"/.test(m[2])) continue;
    if (!/\b(body|cap|h3|h2)\b/.test(m[2]))
      problems.push(`${path.relative(ROOT, file)}  <${m[1]}> without a body or cap step — under 16 px iOS zooms the page on focus`);
  }
}

/* 3 — a fixed bar clears the home indicator ------------------------------- */
{
  const sticky = read("components/StickyCta.tsx");
  const safe = /safe-area-inset-bottom/.test(sticky) || /\[data-sticky-cta\][^}]*safe-area-inset-bottom/.test(css);
  if (!safe) problems.push("components/StickyCta.tsx  no env(safe-area-inset-bottom) — the bar sits under the home indicator on an iPhone");
}

/* 4 — the page may paint edge to edge ------------------------------------- */
for (const f of ["app/(hi)/layout.tsx", "app/(en)/layout.tsx"]) {
  if (!/viewportFit:\s*"cover"/.test(read(f))) problems.push(`${f}  viewport has no viewportFit: "cover"`);
}

/* 5 — buttons are 56 px on a phone ---------------------------------------- */
{
  const m = css.match(/\.btn\s*\{[^}]*min-height:\s*(\d+)px/);
  const px = m ? Number(m[1]) : 0;
  if (px < 56) problems.push(`app/globals.css  .btn min-height is ${px}px — 56 on a phone`);
}

/* 6 — no section is allowed to paint late ---------------------------------- */
/* This rule used to demand content-visibility: auto. It shipped a bug: every
   section past the second rendered as an empty coloured slab until scrolled
   into. The rule now forbids what it once required. */
if (/content-visibility:\s*auto/.test(css))
  problems.push("app/globals.css  content-visibility: auto — sections render as empty coloured slabs until scrolled into view");

if (problems.length) {
  console.error(`mobile: ${problems.length} problem(s)\n  ` + problems.join("\n  "));
  process.exit(1);
}
console.log(`mobile: ${files.length} files clean · no width over 360, fields at 16 px, safe-area bar, edge-to-edge viewport, 56 px buttons, no section paints late`);
