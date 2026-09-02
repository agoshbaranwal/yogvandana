// The two languages must never drift apart: every string carries both, and
// every route exists twice.
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "content");
const OUT = path.join(ROOT, "out");

const problems = [];

/* 1. every {hi, en} pair is complete ------------------------------------- */
const files = [];
const walk = (dir) => {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (name.endsWith(".json")) files.push(full);
  }
};
walk(CONTENT);

let pairs = 0;
const visit = (node, file, trail) => {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((c, i) => visit(c, file, [...trail, String(i)]));
    return;
  }
  const keys = Object.keys(node);
  const looksLikeText =
    keys.length === 2 && keys.includes("hi") && keys.includes("en") &&
    typeof node.hi === "string" && typeof node.en === "string";
  if (looksLikeText) {
    pairs++;
    const where = `${path.relative(CONTENT, file)}:${trail.join(".")}`;
    const emptyHi = node.hi.trim() === "";
    const emptyEn = node.en.trim() === "";
    if (emptyHi !== emptyEn) {
      problems.push(
        `${where} — only ${emptyHi ? "English" : "Hindi"} is filled in; both or neither.`,
      );
    }
    if (!emptyHi && !/[ऀ-ॿ]/.test(node.hi) && /[A-Za-z]{4}/.test(node.hi) &&
        node.hi === node.en && !/^https?:/.test(node.hi)) {
      // the same Latin string on both sides is usually a missed translation,
      // but proper nouns and single words are fine
      if (node.hi.split(/\s+/).length > 2) {
        problems.push(`${where} — Hindi and English are the same sentence.`);
      }
    }
    return;
  }
  for (const [k, v] of Object.entries(node)) visit(v, file, [...trail, k]);
};
for (const f of files) visit(JSON.parse(fs.readFileSync(f, "utf8")), f, []);

/* 2. every route exists in both languages -------------------------------- */
const ROUTES = [
  ["/", "/en/"],
  ["/rog/", "/en/conditions/"],
  ["/batch/", "/en/batches/"],
  ["/kahaniyan/", "/en/stories/"],
  ["/parichay/", "/en/about/"],
  ["/yogyata/", "/en/credentials/"],
  ["/gallery/", "/en/gallery/"],
  ["/sampark/", "/en/contact/"],
  ["/vidyarthi/", "/en/students/"],
  ["/privacy/", "/en/privacy/"],
  ["/terms/", "/en/terms/"],
  ["/refund/", "/en/refund/"],
];
const ailments = fs
  .readdirSync(path.join(CONTENT, "ailments"))
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(fs.readFileSync(path.join(CONTENT, "ailments", f), "utf8")).slug);
for (const slug of ailments) ROUTES.push([`/rog/${slug}/`, `/en/conditions/${slug}/`]);

let routesChecked = 0;
if (fs.existsSync(OUT)) {
  for (const [hi, en] of ROUTES) {
    for (const route of [hi, en]) {
      routesChecked++;
      const file = path.join(OUT, route, "index.html");
      if (!fs.existsSync(file)) problems.push(`${route} — not in the build.`);
    }
  }
} else {
  console.log("parity: out/ not built yet, checking content only.");
}

/* 3. report --------------------------------------------------------------- */
console.log(`parity: ${pairs} bilingual strings, ${routesChecked} routes checked.`);
if (problems.length === 0) {
  console.log("parity: Hindi and English match.");
  process.exit(0);
}
for (const p of problems) console.log(`  ✗ ${p}`);
console.log(`\nparity: ${problems.length} problem(s).`);
process.exit(1);
