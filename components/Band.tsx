import { absolute, ailmentBySlug, ailments, PHONE, phoneShown, site, t, ui } from "@/lib/content";
import { href, type Lang, type RouteKey } from "@/lib/routes";
import BookingBand from "./BookingBand";

/** Server wrapper: pulls the strings and the ailment list, hands the client
 *  component only what it needs. A condition page passes its own title and
 *  lead, and asks which time. */
export default function Band({
  lang,
  routeKey,
  slug,
  source,
  defaultSlug = "",
  title,
  lead,
}: {
  lang: Lang;
  routeKey: RouteKey;
  slug?: string;
  source: string;
  defaultSlug?: string;
  title?: string;
  lead?: string;
}) {
  /* The reader's preview names the page in words; the message she receives
     carries the address. */
  const NAV_KEYS: Partial<Record<RouteKey, string>> = {
    home: "nav.home", ailments: "nav.ailments", batches: "nav.batches", stories: "nav.stories",
    about: "nav.about", contact: "nav.contact", students: "nav.students",
  };
  const pageLabel = slug
    ? t(ailmentBySlug(slug)?.name ?? { hi: slug, en: slug }, lang)
    : ui(NAV_KEYS[routeKey] ?? "nav.home", lang);

  return (
    <BookingBand
      pageLabel={pageLabel}
      lang={lang}
      title={title ?? ui("band.title", lang)}
      lead={lead ?? ui("band.lead", lang)}
      step1={ui("band.step1", lang)}
      step2={ui("band.step2", lang)}
      choices={ailments.map((a) => ({ slug: a.slug, name: t(a.name, lang) }))}
      otherLabel={ui("band.other", lang)}
      defaultSlug={defaultSlug}
      showTime={Boolean(slug)}
      morningLabel={ui("band.morning", lang)}
      eveningLabel={ui("band.evening", lang)}
      whatsappNumber={site.contact.whatsapp}
      whatsappLabel={ui("cta.whatsappTalk", lang)}
      phone={PHONE}
      phoneShown={phoneShown(lang)}
      callLabel={ui("cta.call", lang)}
      contactHref={href("contact", lang)}
      previewLabel={ui("band.preview", lang)}
      page={absolute(href(routeKey, lang, slug))}
      source={source}
    />
  );
}
