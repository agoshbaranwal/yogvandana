// Photographs every page at a phone width and a desktop width, in both
// languages, into docs/screens/. Two browsers at a time, each killed with its
// own process group, so nothing is left running.
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { shot } from "./shot.mjs";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "docs", "screens");
const PORT = Number(process.env.PORT ?? 4412);
const BASE = `http://127.0.0.1:${PORT}`;

const ailmentSlugs = fs
  .readdirSync(path.join(ROOT, "content", "ailments"))
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(fs.readFileSync(path.join(ROOT, "content", "ailments", f), "utf8")))
  .sort((a, b) => a.order - b.order)
  .map((a) => a.slug);

const only = process.argv.slice(2);
const routes = [
  ["home", "/", "/en/"],
  ["conditions", "/rog/", "/en/conditions/"],
  ...ailmentSlugs.map((s) => [`condition-${s}`, `/rog/${s}/`, `/en/conditions/${s}/`]),
  ["batches", "/batch/", "/en/batches/"],
  ["stories", "/kahaniyan/", "/en/stories/"],
  ["about", "/parichay/", "/en/about/"],
  ["credentials", "/yogyata/", "/en/credentials/"],
  ["gallery", "/gallery/", "/en/gallery/"],
  ["contact", "/sampark/", "/en/contact/"],
  ["students", "/vidyarthi/", "/en/students/"],
  ["privacy", "/privacy/", "/en/privacy/"],
  ["not-found", "/nahin-mila/", null],
].filter(([name]) => only.length === 0 || only.includes(name));

const jobs = [];
for (const [name, hi, en] of routes) {
  jobs.push({ file: `${name}-hi-390.png`, url: BASE + hi, w: 390, h: 7200 });
  jobs.push({ file: `${name}-hi-1440.png`, url: BASE + hi, w: 1440, h: 5200 });
  if (en) {
    jobs.push({ file: `${name}-en-390.png`, url: BASE + en, w: 390, h: 7200 });
    jobs.push({ file: `${name}-en-1440.png`, url: BASE + en, w: 1440, h: 5200 });
  }
}

fs.mkdirSync(OUT, { recursive: true });
const server = spawn("node", [path.join(ROOT, "scripts", "serve.mjs"), String(PORT)], {
  stdio: "ignore",
  detached: false,
});
await new Promise((r) => setTimeout(r, 1200));

let done = 0;
const worker = async (queue) => {
  while (queue.length) {
    const job = queue.shift();
    try {
      await shot(path.join(OUT, job.file), job.url, job.w, job.h);
    } catch {
      console.log(`  ! ${job.file} failed`);
    }
    done++;
    console.log(`  ${done}/${jobs.length} ${job.file}`);
  }
};

const queue = [...jobs];
await Promise.all([worker(queue), worker(queue)]);
server.kill();
console.log(`screens: ${done} images in docs/screens/`);
process.exit(0);
