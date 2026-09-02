// One screenshot, sized to the page.
//
// Headless Chrome clamps a window to 500px wide, so a 390px phone shot taken
// directly comes back cropped and fakes a right-edge overflow. Everything
// therefore goes through a same-origin shell that holds the page in an iframe
// of the true width and grows it to the page's own height; the white space
// left under the page is then trimmed off.
//
//   node scripts/shot.mjs <out.png> <url> [width] [height]
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SHOT = "/Users/agosh/Game/Witness/ui-harness/shot";

async function trimBottom(file) {
  const image = sharp(file);
  const { width, height } = await image.metadata();
  if (!width || !height) return;
  const { data, info } = await image
    .clone()
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let last = info.height - 1;
  outer: for (; last > 0; last--) {
    const row = last * info.width;
    for (let x = 0; x < info.width; x += 4) {
      if (data[row + x] < 250) break outer;
    }
  }
  const keep = Math.min(info.height, last + 24);
  if (keep < info.height - 8) {
    const buf = await sharp(file).extract({ left: 0, top: 0, width, height: keep }).png().toBuffer();
    fs.writeFileSync(file, buf);
  }
}

export async function shot(out, url, width = 1440, height = 2000) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const target = new URL(url);
  const shell = `${target.origin}/__shell?u=${encodeURIComponent(target.pathname + target.search)}&w=${width}`;
  const windowWidth = Math.max(width, 520);
  execFileSync(SHOT, [out, shell, String(windowWidth), String(height)], { stdio: "pipe" });
  await trimBottom(out);
  // The window is never narrower than 520, so a phone shot comes back with
  // dead space beside it. The page sits at the left edge of the shell.
  if (windowWidth > width) {
    const { width: w, height: h } = await sharp(out).metadata();
    if (w && h && w > width) {
      const buf = await sharp(out).extract({ left: 0, top: 0, width, height: h }).png().toBuffer();
      fs.writeFileSync(out, buf);
    }
  }
}

if (process.argv[1] && process.argv[1].endsWith("shot.mjs")) {
  const [out, url, w, h] = process.argv.slice(2);
  await shot(out, url, Number(w ?? 1440), Number(h ?? 2000));
  console.log(`shot ${out}`);
}
