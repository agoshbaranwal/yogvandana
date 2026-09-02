import { absolute, asset, isTodo, site, t } from "@/lib/content";
import { href, type Lang } from "@/lib/routes";

/* Structured data, with one rule: nothing that is still a placeholder goes in.
   A search engine should never be handed "[N] students". */

const real = (value: string) => (value && !isTodo(value) ? value : undefined);
const clean = <T extends object>(obj: T): T =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== "")) as T;

export function Jsonld({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function personSchema(lang: Lang) {
  const sameAs = [site.socials.instagram, site.socials.youtube, site.socials.facebook].filter(
    Boolean,
  );
  return clean({
    "@context": "https://schema.org",
    "@type": "Person",
    name: t(site.teacher, lang),
    jobTitle: t(site.credential, lang),
    url: absolute(href("about", lang)),
    image: absolute(asset("/og/about-" + lang + ".png")),
    telephone: real(site.contact.phone),
    email: real(site.contact.email),
    sameAs: sameAs.length ? sameAs : undefined,
    address: clean({
      "@type": "PostalAddress",
      addressLocality: t(site.city, lang),
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    }),
    knowsLanguage: ["hi", "en"],
  });
}

export function websiteSchema(lang: Lang) {
  return clean({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t(site.brand, lang),
    url: absolute(href("home", lang)),
    inLanguage: lang,
    description: t(site.claim, lang),
  });
}

export function courseSchema(lang: Lang, name: string, description: string) {
  return clean({
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    inLanguage: lang,
    provider: { "@type": "Person", name: t(site.teacher, lang) },
    courseMode: "online",
  });
}

export function faqSchema(items: { q: string; a: string }[]) {
  const usable = items.filter((i) => !isTodo(i.a));
  if (usable.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: usable.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: step.url,
    })),
  };
}
