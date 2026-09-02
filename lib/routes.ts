export type Lang = "hi" | "en";
export const LANGS: Lang[] = ["hi", "en"];
export const other = (lang: Lang): Lang => (lang === "hi" ? "en" : "hi");

/** Every page of the site, in both languages. Latin slugs, so a link pasted
 *  into WhatsApp still reads cleanly. */
export const ROUTES = {
  home: { hi: "/", en: "/en/" },
  ailments: { hi: "/rog/", en: "/en/conditions/" },
  ailment: { hi: "/rog/:slug/", en: "/en/conditions/:slug/" },
  batches: { hi: "/batch/", en: "/en/batches/" },
  stories: { hi: "/kahaniyan/", en: "/en/stories/" },
  about: { hi: "/parichay/", en: "/en/about/" },
  credentials: { hi: "/yogyata/", en: "/en/credentials/" },
  gallery: { hi: "/gallery/", en: "/en/gallery/" },
  contact: { hi: "/sampark/", en: "/en/contact/" },
  students: { hi: "/vidyarthi/", en: "/en/students/" },
  privacy: { hi: "/privacy/", en: "/en/privacy/" },
  terms: { hi: "/terms/", en: "/en/terms/" },
  refund: { hi: "/refund/", en: "/en/refund/" },
} as const;

export type RouteKey = keyof typeof ROUTES;

export function href(key: RouteKey, lang: Lang, slug?: string): string {
  const path: string = ROUTES[key][lang];
  return slug ? path.replace(":slug", slug) : path;
}

/** The same page in the other language, for the header pill and hreflang. */
export function alternate(key: RouteKey, lang: Lang, slug?: string): string {
  return href(key, other(lang), slug);
}

export const NAV: { key: RouteKey; ui: string }[] = [
  { key: "ailments", ui: "nav.ailments" },
  { key: "batches", ui: "nav.batches" },
  { key: "stories", ui: "nav.stories" },
  { key: "about", ui: "nav.about" },
  { key: "credentials", ui: "nav.credentials" },
  { key: "gallery", ui: "nav.gallery" },
  { key: "contact", ui: "nav.contact" },
];
