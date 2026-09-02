import type { Metadata } from "next";
import { absolute, site, t } from "./content";
import { href, type Lang, type RouteKey } from "./routes";

/* One place for every page's title, description, canonical, hreflang pair and
   link-preview image. While site.live is false, nothing is indexed.

   Image URLs are absolute on purpose: Next resolves a relative one against
   metadataBase, which already carries the sub-folder, and the prefix would
   land twice. */

export function pageMeta({
  lang,
  routeKey,
  slug,
  title,
  description,
  keywords,
  ogKey,
}: {
  lang: Lang;
  routeKey: RouteKey;
  slug?: string;
  title: string;
  description: string;
  /* The words people type, in Roman letters as often as not. They sit here
     rather than in the title: a title past about sixty characters is cut off
     in the result, and a stuffed one reads as spam to the person choosing. */
  keywords?: string;
  ogKey?: string;
}): Metadata {
  const path = href(routeKey, lang, slug);
  const brand = t(site.brand, lang);
  const og = `${ogKey ?? routeKey}-${lang}`;

  return {
    metadataBase: new URL(absolute("/")),
    title: `${title} | ${brand}`,
    description,
    keywords: keywords ? keywords.split(",").map((k) => k.trim()) : undefined,
    alternates: {
      canonical: absolute(path),
      languages: {
        hi: absolute(href(routeKey, "hi", slug)),
        en: absolute(href(routeKey, "en", slug)),
        "x-default": absolute(href(routeKey, "hi", slug)),
      },
    },
    robots: site.live
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
    openGraph: {
      type: "website",
      siteName: brand,
      locale: lang === "hi" ? "hi_IN" : "en_IN",
      url: absolute(path),
      title: `${title} | ${brand}`,
      description,
      images: [{ url: absolute(`/og/${og}.png`), width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${brand}`,
      description,
      images: [absolute(`/og/${og}.png`)],
    },
    other: site.searchConsole ? { "google-site-verification": site.searchConsole } : undefined,
  };
}
