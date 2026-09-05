import { absolute, isTodo, site, t } from "@/lib/content";
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
    image: absolute(`/og/about-${lang}.png`),
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

/* The record Google Maps and local search read. Agosh said Maps is the third
   way people will find her, after search and word of mouth (5 Sep 2026), and
   until now the site handed Google a Person and a WebSite but no business at
   an address. The address, phone and hours are the real ones. Nothing still
   in brackets goes in — same rule as everything else in this file. */
export function localBusinessSchema(lang: Lang) {
  const hours = real(t(site.contact.replyHours, lang));
  return clean({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": absolute("/") + "#business",
    name: t(site.brand, lang),
    alternateName: t(site.teacher, lang),
    description: t(site.claim, lang),
    url: absolute(href("home", lang)),
    telephone: real(site.contact.phone),
    image: absolute(`/og/home-${lang}.png`),
    priceRange: "₹200–₹1,000",
    address: clean({
      "@type": "PostalAddress",
      streetAddress: real(t(site.contact.address, lang)),
      addressLocality: t(site.city, lang),
      addressRegion: "Uttar Pradesh",
      postalCode: "226012",
      addressCountry: "IN",
    }),
    areaServed: ["Lucknow", "Uttar Pradesh", "India"],
    /* replies 7 to 7, every day: the hours a reader can expect a person */
    openingHoursSpecification: hours
      ? {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "07:00",
          closes: "19:00",
        }
      : undefined,
    founder: { "@type": "Person", name: t(site.teacher, lang) },
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
