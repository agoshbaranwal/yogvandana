import type { MetadataRoute } from "next";
import { absolute, ailments, site } from "@/lib/content";
import { href, LANGS, type RouteKey } from "@/lib/routes";

export const dynamic = "force-static";

const PAGES: RouteKey[] = [
  "home",
  "ailments",
  "batches",
  "stories",
  "about",
  "credentials",
  "gallery",
  "contact",
  "privacy",
  "terms",
  "refund",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.updated);
  const rows: MetadataRoute.Sitemap = [];

  for (const key of PAGES) {
    for (const lang of LANGS) {
      rows.push({
        url: absolute(href(key, lang)),
        lastModified,
        changeFrequency: "monthly",
        priority: key === "home" ? 1 : 0.7,
        alternates: {
          languages: {
            hi: absolute(href(key, "hi")),
            en: absolute(href(key, "en")),
          },
        },
      });
    }
  }
  for (const a of ailments) {
    for (const lang of LANGS) {
      rows.push({
        url: absolute(href("ailment", lang, a.slug)),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.9,
        alternates: {
          languages: {
            hi: absolute(href("ailment", "hi", a.slug)),
            en: absolute(href("ailment", "en", a.slug)),
          },
        },
      });
    }
  }
  return rows;
}
