import type { Metadata } from "next";
import { absolute, asset, site, t } from "./content";
import { href, type Lang, type RouteKey } from "./routes";

/* One place for every page's title, description, canonical, hreflang pair and
   link-preview image. While site.live is false, nothing is indexed. */

export function pageMeta({
  lang,
  routeKey,
  slug,
  title,
  description,
  ogKey,
}: {
  lang: Lang;
  routeKey: RouteKey;
  slug?: string;
  title: string;
  description: string;
  ogKey?: string;
}): Metadata {
  const path = href(routeKey, lang, slug);
  const brand = t(site.brand, lang);
  const og = `${ogKey ?? routeKey}-${lang}`;

  return {
    metadataBase: new URL(absolute("/")),
    title: `${title} | ${brand}`,
    description,
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
      images: [{ url: asset(`/og/${og}.png`), width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${brand}`,
      description,
      images: [asset(`/og/${og}.png`)],
    },
    other: site.searchConsole ? { "google-site-verification": site.searchConsole } : undefined,
  };
}
