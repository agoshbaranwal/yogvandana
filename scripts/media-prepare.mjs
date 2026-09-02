// Resizes whatever is in media-src/ into public/media/ and writes a manifest.
// While media-src/ is empty this does nothing and every photo slot stays a
// labelled placeholder.
import fs from "node:fs";
import path from "node:path";

const SRC = path.join(process.cwd(), "media-src");
const OUT = path.join(process.cwd(), "public", "media");
const WIDTHS = [480, 960, 1600];

if (!fs.existsSync(SRC)) {
  fs.mkdirSync(SRC, { recursive: true });
  fs.writeFileSync(
    path.join(SRC, "README.md"),
    "Put her photographs here, in folders that match the content files\n" +
      "(portrait/, class/, events/, certificates/, stories/, gallery/, media/).\n" +
      "`npm run media:prepare` resizes them into public/media/ and writes a manifest.\n",
  );
}

const files = [];
const walk = (dir, rel = "") => {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, path.join(rel, name));
    else if (/\.(jpe?g|png|webp|avif)$/i.test(name)) files.push({ full, rel: path.join(rel, name) });
  }
};
walk(SRC);

if (files.length === 0) {
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, "manifest.json"), "{}\n");
  console.log("media: nothing to prepare yet (media-src/ is empty)");
  process.exit(0);
}

const sharp = (await import("sharp")).default;
const manifest = {};
for (const { full, rel } of files) {
  const image = sharp(full);
  const meta = await image.metadata();
  const base = rel.replace(/\.[^.]+$/, "");
  const widths = WIDTHS.filter((w) => w <= (meta.width ?? 0));
  if (widths.length === 0) widths.push(meta.width ?? 480);
  fs.mkdirSync(path.join(OUT, path.dirname(rel)), { recursive: true });
  for (const w of widths) {
    await sharp(full)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(OUT, `${base}-${w}.webp`));
  }
  manifest[rel] = {
    width: meta.width ?? 0,
    height: meta.height ?? 0,
    widths,
    ext: "webp",
  };
  console.log(`media: ${rel} → ${widths.join(", ")}`);
}
fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`media: ${files.length} file(s) prepared`);
