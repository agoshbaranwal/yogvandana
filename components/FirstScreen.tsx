import { preload } from "react-dom";
import { PhoneIcon, WhatsAppIcon } from "./Icons";
import { Photo } from "./Photo";
import { PhotoBadges, Trust } from "./Warm";
import { Tx } from "./Tx";
import { picture } from "@/lib/media";
import { absolute, PHONE, phoneShown, site, t, ui } from "@/lib/content";
import { href, type Lang } from "@/lib/routes";
import { telHref, waHref, waMessage } from "@/lib/whatsapp";

/* The first screen.

   Her photograph is the page's hero, not a gap beside the words, and the two
   things a stranger is checking — the rating and who certified her — float on
   top of it. Under the ask sit the three reassurances that decide whether
   somebody calls at all: the first conversation is free, nobody is asked to
   stop their medicine, and it happens from their own house.

   Everything here is conditional on being true. No rating, no rating badge. */

export function FirstScreen({ lang }: { lang: Lang }) {
  const pic = picture(site.photos.portrait);
  if (pic) preload(pic.src, { as: "image", fetchPriority: "high", imageSrcSet: pic.srcSet || undefined });
  const number = phoneShown(lang);
  const wa = waHref(site.contact.whatsapp, waMessage({ lang, kind: "talk", page: absolute(href("home", lang)) }));
  const years = site.numbers[0]?.value ?? "";
  const students = site.numbers[1]?.value ?? "";

  const eyebrow = ui("home.heroBadge", lang)
    .replace("{y}", years)
    .replace("{n}", students)
    .replace("{city}", t(site.city, lang));

  return (
    <section className="hero-warm first">
      <div className="wrap grid gap-7 pb-11 pt-5 md:grid-cols-[minmax(0,1fr)_minmax(0,360px)] md:items-center md:gap-14 md:pb-20 md:pt-12 lg:gap-20">
        <div className="flex flex-col items-start gap-4">
          <span className="badge">
            <Tx>{eyebrow}</Tx>
          </span>

          <h1 className="claim">{t(site.claim, lang)}</h1>

          <p className="body full" style={{ color: "var(--color-kohl)" }}>
            {ui("home.heroLead", lang)}
          </p>

          <div className="flex w-full flex-wrap gap-2.5">
            <a
              className="btn btn-wa"
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              data-ev="whatsapp_click"
              data-ev-source="hero"
            >
              <WhatsAppIcon size={20} />
              {ui("cta.whatsappTalk", lang)}
            </a>
            <a
              className="btn btn-white"
              href={telHref(PHONE)}
              data-ev="call_click"
              data-ev-source="hero"
            >
              <PhoneIcon size={18} />
              {ui("cta.call", lang)}
              {number ? (
                <span className="hidden sm:inline">
                  {" · "}
                  <Tx>{number}</Tx>
                </span>
              ) : null}
            </a>
          </div>

          <Trust lang={lang} />
        </div>

        <div className="relative">
          <Photo
            src={site.photos.portrait}
            alt={t(site.teacher, lang)}
            label={ui("photo.first", lang)}
            ratio="1 / 1"
            rounded="rounded-[var(--radius-lg)]"
            className="w-full shadow-[var(--elev-2)] md:aspect-[4/5]"
            priority
            sizes="(min-width: 768px) 360px, 100vw"
          />
          <PhotoBadges lang={lang} />
        </div>
      </div>
    </section>
  );
}
