// Serves out/ the way a plain file host does: /a/ -> out/a/index.html.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), process.argv[3] ?? "out");
const PORT = Number(process.argv[2] ?? 4411);
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

http
  .createServer((req, res) => {
    const raw = req.url ?? "/";
    // A same-origin shell so a screenshot can be taken at a real phone width:
    // headless Chrome clamps a window to 500px, and an iframe of the same
    // origin can be sized to its own content.
    if (raw.startsWith("/__shell")) {
      const q = new URL(raw, "http://127.0.0.1");
      const target = q.searchParams.get("u") ?? "/";
      const width = q.searchParams.get("w") ?? "390";
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      res.end(`<!doctype html><meta charset="utf-8"><style>
html,body{margin:0;padding:0;background:#fff}
iframe{width:${width}px;border:0;display:block}</style>
<iframe id="f" src="${target}" scrolling="no"></iframe>
<script>
var f=document.getElementById("f");
function fit(){try{var d=f.contentDocument;
 f.style.height=Math.max(d.documentElement.scrollHeight,d.body.scrollHeight)+"px";}catch(e){}}
f.addEventListener("load",function(){fit();setTimeout(fit,250);setTimeout(fit,900);});
setTimeout(fit,1400);
</script>`);
      return;
    }
    const url = decodeURIComponent(raw.split("?")[0]);
    let file = path.join(ROOT, url);
    if (url.endsWith("/")) file = path.join(file, "index.html");
    if (!fs.existsSync(file) && fs.existsSync(`${file}.html`)) file = `${file}.html`;
    if (fs.existsSync(file) && fs.statSync(file).isDirectory())
      file = path.join(file, "index.html");
    if (!fs.existsSync(file)) {
      const notFound = path.join(ROOT, "404.html");
      res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
      res.end(fs.existsSync(notFound) ? fs.readFileSync(notFound) : "404");
      return;
    }
    res.writeHead(200, { "content-type": TYPES[path.extname(file)] ?? "application/octet-stream" });
    res.end(fs.readFileSync(file));
  })
  .listen(PORT, () => console.log(`serving ${ROOT} on http://127.0.0.1:${PORT}`));
