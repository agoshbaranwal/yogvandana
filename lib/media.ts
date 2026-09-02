import fs from "node:fs";
import path from "node:path";
import { asset } from "./content";

/* scripts/media-prepare.mjs resizes whatever is in media-src/ into
   public/media/ and writes this manifest. Until a photo exists, every slot
   renders as a labelled placeholder block. */

export type MediaEntry = { width: number; height: number; widths: number[]; ext: string };
type Manifest = Record<string, MediaEntry>;

let manifest: Manifest = {};
const file = path.join(process.cwd(), "public", "media", "manifest.json");
if (fs.existsSync(file)) {
  try {
    manifest = JSON.parse(fs.readFileSync(file, "utf8")) as Manifest;
  } catch {
    manifest = {};
  }
}

export function picture(src: string) {
  if (!src) return null;
  const key = src.replace(/^\/?media\//, "").replace(/^\//, "");
  const entry = manifest[key];
  if (!entry) {
    return { src: asset(src.startsWith("/") ? src : `/media/${src}`), srcSet: "", width: 0, height: 0 };
  }
  const base = key.replace(/\.[^.]+$/, "");
  const srcSet = entry.widths
    .map((w) => `${asset(`/media/${base}-${w}.webp`)} ${w}w`)
    .join(", ");
  const widest = entry.widths[entry.widths.length - 1];
  return {
    src: asset(`/media/${base}-${widest}.webp`),
    srcSet,
    width: entry.width,
    height: entry.height,
  };
}
