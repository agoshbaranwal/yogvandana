import { absolute, ailments, site, t, ui } from "@/lib/content";
import { href, type Lang, type RouteKey } from "@/lib/routes";
import BookingBand from "./BookingBand";

/** Server wrapper: pulls the strings and the ailment list, hands the client
 *  component only what it needs. */
export default function Band({
  lang,
  routeKey,
  slug,
  source,
  defaultSlug = "",
}: {
  lang: Lang;
  routeKey: RouteKey;
  slug?: string;
  source: string;
  defaultSlug?: string;
}) {
  return (
    <BookingBand
      lang={lang}
      title={ui("band.title", lang)}
      lead={ui("band.lead", lang)}
      step1={ui("band.step1", lang)}
      step2={ui("band.step2", lang)}
      choices={ailments.map((a) => ({ slug: a.slug, name: t(a.name, lang) }))}
      otherLabel={ui("band.other", lang)}
      defaultSlug={defaultSlug}
      morningLabel={ui("band.morning", lang)}
      eveningLabel={ui("band.evening", lang)}
      whatsappNumber={site.contact.whatsapp}
      whatsappLabel={ui("cta.whatsapp", lang)}
      phone={site.contact.phone}
      callLabel={ui("cta.call", lang)}
      formHref={`${href("contact", lang)}#form`}
      formLabel={ui("cta.form", lang)}
      previewLabel={ui("band.preview", lang)}
      replyLine={ui("band.reply", lang)}
      page={absolute(href(routeKey, lang, slug))}
      source={source}
    />
  );
}
