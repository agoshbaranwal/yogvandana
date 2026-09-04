import { preload } from "react-dom";
import { PhoneIcon, WhatsAppIcon } from "./Icons";
import { Photo } from "./Photo";
import { Tx } from "./Tx";
import { picture } from "@/lib/media";
import { absolute, PHONE, phoneShown, site, t, ui } from "@/lib/content";
import { href, type Lang } from "@/lib/routes";
import { telHref, waHref, waMessage } from "@/lib/whatsapp";

/* The first screen, built like a clinic's board: her face, her name, the body
   that certified her, the promise, and a number to call.

   On a phone the photograph is the whole first screen and her name sits on it.
   On a desktop it is a framed portrait beside the words — it used to bleed to
   the left edge as a half-screen of empty gradient, which is what half of a
   1,440 px first impression was: nothing. */

export function FirstScreen({ lang }: { lang: Lang }) {
  const pic = picture(site.photos.portrait);
  if (pic) preload(pic.src, { as: "image", fetchPriority: "high", imageSrcSet: pic.srcSet || undefined });
  const phone = PHONE;
  const number = phoneShown(lang);
  const since = lang === "hi" ? `${t(site.sinceYear, lang)} से` : `since ${t(site.sinceYear, lang)}`;
  const certified =
    lang === "hi" ? `${t(site.certifyingBody, lang)} प्रमाणित` : `${t(site.certifyingBody, lang)} certified`;
  const wa = waHref(site.contact.whatsapp, waMessage({ lang, kind: "talk", page: absolute(href("home", lang)) }));

  return (
    <section className="first">
      {/* the phone: her photograph is the screen, her name reads off it. With
          no photograph there is nothing to read off, so the block is not
          rendered at all and her name moves into the words below. */}
      <div className={`relative h-[340px] overflow-hidden md:hidden ${pic ? "" : "hidden"}`}>
        {pic ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={pic.src}
            srcSet={pic.srcSet || undefined}
            sizes="100vw"
            alt={t(site.teacher, lang)}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : (
          <p className="cap absolute inset-x-6 top-1/2 -translate-y-1/2 text-center" style={{ color: "var(--color-deeper)" }}>
            {ui("photo.first", lang)}
          </p>
        )}
        {pic ? <div className="first-fade" aria-hidden="true" /> : null}
        <div
          className={`${pic ? "on-dark" : "on-bhagwa"} absolute inset-x-4 bottom-4 flex flex-col gap-1`}
          style={{ color: pic ? "var(--color-ivory)" : "var(--color-kohl)" }}
          data-on-photo={pic ? "" : undefined}
        >
          <p className="page-title">{t(site.teacher, lang)}</p>
          <p className="cap" style={{ color: pic ? "var(--color-ivory)" : "var(--color-kohl)" }}>
            <Tx>{`${t(site.credentialShort, lang)} · `}</Tx>
            <strong>
              <Tx>{certified}</Tx>
            </strong>
            <br />
            <Tx>{`${t(site.city, lang)} · ${since}`}</Tx>
          </p>
        </div>
      </div>

      {/* the promise, on both --------------------------------------------- */}
      <div className="wrap wrap-wide md:grid md:min-h-[560px] md:grid-cols-[1fr_380px] md:items-center md:gap-16">
        <div className="flex flex-col gap-3.5 pb-7 pt-5 md:gap-5 md:py-16">
          <p className={`font-bold body ${pic ? "hidden md:block" : "block"}`} style={{ color: "var(--color-deep)" }}>
            <Tx>{`${t(site.teacher, lang)} · ${t(site.credentialShort, lang)} · ${certified} · ${t(site.city, lang)}`}</Tx>
          </p>
          <h1 className="claim md:max-w-[13ch]">{t(site.claim, lang)}</h1>
          <p className="body" style={{ color: "var(--color-heroink)" }}>
            {ui("home.heroLead", lang)}
          </p>
          <div className="mt-1 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              data-ev="whatsapp_click"
              data-ev-source="first-screen"
              className="btn btn-first"
            >
              <WhatsAppIcon size={22} />
              {ui("cta.whatsappTalk", lang)}
            </a>
            <a
              href={phone ? telHref(phone) : href("contact", lang)}
              data-ev="call_click"
              data-ev-source="first-screen"
              className="btn btn-outline"
            >
              <PhoneIcon size={20} />
              <Tx>{`${ui("cta.call", lang)} · ${number}`}</Tx>
            </a>
          </div>
          <p className="cap text-center sm:text-left">{ui("home.heroNote", lang)}</p>
        </div>

        {/* the portrait: a frame that says what belongs in it. On a phone it
            appears only when there is no photograph to bleed off the top. */}
        <div className={pic ? "hidden md:block" : "block"}>
          <Photo
            src={site.photos.portrait}
            alt={t(site.teacher, lang)}
            label={ui("photo.first", lang)}
            ratio="4 / 5"
            rounded="rounded-[12px]"
            className="w-full max-h-[300px] md:max-h-none"
            sizes="380px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
