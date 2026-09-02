// Lists every fact still to be filled in, page by page, and fails while any
// remain. Launch is blocked until this passes: a site about being believed
// must not go live with brackets on it.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "content");
const site = JSON.parse(fs.readFileSync(path.join(ROOT, "site.json"), "utf8"));

const WHERE = {
  "site.json": "everywhere",
  "ui.json": "everywhere",
  ailments: "the condition pages and the home chooser",
  batches: "the batches page and the home batch rows",
  stories: "the stories page and the results on home",
  journey: "about",
  credentials: "credentials and about",
  experience: "credentials",
  memberships: "credentials",
  awards: "credentials and about",
  events: "about and the credibility block on home",
  media: "about and the credibility block on home",
  gurus: "about",
  gallery: "the gallery, about and home",
  "routine.json": "home",
  "faq.json": "home and the batches page",
  "students.json": "the students page",
};

const files = [];
const walk = (dir) => {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (name.endsWith(".json")) files.push(full);
  }
};
walk(ROOT);

const IMAGE_KEYS = new Set(["image", "photo"]);
const LINK_KEYS = new Set([
  "joinLink",
  "feeLink",
  "verifyUrl",
  "formEndpoint",
  "cal",
  "introVideo",
  "profilePdf",
  "whatsapp",
  "phone",
  "email",
  "instagram",
  "youtube",
  "facebook",
  "video",
  "link",
  "url",
  "rating",
  "reviews",
  "analyticsId",
  "searchConsole",
  "seats",
  "perDay",
]);

const findings = [];
const visit = (node, file, trail) => {
  if (typeof node === "string") {
    const key = trail[trail.length - 1];
    for (const m of node.matchAll(/\[[^\]]+\]/g)) {
      findings.push({ file, path: trail.join("."), kind: "text", value: m[0] });
    }
    if (node.trim() === "" && IMAGE_KEYS.has(key)) {
      findings.push({ file, path: trail.join("."), kind: "photo", value: "" });
    }
    if (node.trim() === "" && LINK_KEYS.has(key)) {
      findings.push({ file, path: trail.join("."), kind: "link", value: "" });
    }
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((child, i) => visit(child, file, [...trail, String(i)]));
    return;
  }
  if (node && typeof node === "object") {
    for (const [key, child] of Object.entries(node)) visit(child, file, [...trail, key]);
  }
};

for (const file of files) {
  const rel = path.relative(ROOT, file);
  visit(JSON.parse(fs.readFileSync(file, "utf8")), rel, []);
}

const groups = new Map();
for (const f of findings) {
  const top = f.file.includes(path.sep) ? f.file.split(path.sep)[0] : f.file;
  if (!groups.has(top)) groups.set(top, []);
  groups.get(top).push(f);
}

const counts = { text: 0, photo: 0, link: 0 };
for (const f of findings) counts[f.kind]++;

console.log("योग वंदना — what is still to be filled in\n");
for (const [group, items] of [...groups.entries()].sort()) {
  const t = items.filter((i) => i.kind === "text").length;
  const p = items.filter((i) => i.kind === "photo").length;
  const l = items.filter((i) => i.kind === "link").length;
  console.log(
    `${group}  (${WHERE[group] ?? "the site"})\n` +
      `    ${t} fact(s) in brackets, ${p} photo slot(s), ${l} link(s) or number(s)`,
  );
  const sample = [...new Set(items.filter((i) => i.kind === "text").map((i) => i.value))].slice(0, 4);
  if (sample.length) console.log(`    e.g. ${sample.join("  ")}`);
  console.log("");
}

console.log(
  `Total: ${counts.text} bracketed facts, ${counts.photo} photographs, ${counts.link} links or numbers.`,
);

if (findings.length === 0) {
  console.log("\nNothing left. The site can go live: set live to true in content/site.json.");
  process.exit(0);
}

console.log(
  `\nsite.live is ${site.live}. ` +
    (site.live
      ? "It is TRUE while placeholders remain — set it back to false or fill these in."
      : "Keep it false until this list is empty."),
);
process.exit(1);
