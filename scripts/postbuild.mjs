// The static host serves 404.html when nothing matches. Next writes its own
// bare one; ours is the real page, in both languages, with the menu on it.
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");
const mine = path.join(OUT, "nahin-mila", "index.html");
if (fs.existsSync(mine)) {
  fs.copyFileSync(mine, path.join(OUT, "404.html"));
  fs.rmSync(path.join(OUT, "_not-found"), { recursive: true, force: true });
  fs.rmSync(path.join(OUT, "404"), { recursive: true, force: true });
  console.log("postbuild: 404.html written from /404/");
} else {
  console.warn("postbuild: /nahin-mila/ was not built; Next's default 404 is in place");
}

// GitHub Pages skips folders that start with an underscore unless this exists.
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");
