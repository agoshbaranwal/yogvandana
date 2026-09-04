import { preload } from "react-dom";
import { PhoneIcon, WhatsAppIcon } from "./Icons";
import { Tx } from "./Tx";
import { picture } from "@/lib/media";
import { absolute, PHONE, phoneShown, site, t, ui } from "@/lib/content";
import { href, type Lang } from "@/lib/routes";
import { telHref, waHref, waMessage } from "@/lib/whatsapp";

/* The first screen, built like a clinic's board: her face, her name, the
   body that certified her, the promise, and a number to call. On a phone the
   photograph is the whole first screen and the header sits on it; from a
   tablet up the photograph takes the left column and the words the right. */

function Silhouette() {
  /* Until her photograph exists: a plain figure on the dawn sky, never a
     stock picture and never hatching. */
  return (
    <svg
      viewBox="0 0 390 380"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <circle cx="300" cy="150" r="110" fill="var(--color-sun)" />
      <path d="M115 380 C115 300 150 268 195 262 C240 268 275 300 275 380 Z" fill="#B5A08A" />
      <circle cx="195" cy="205" r="52" fill="#B5A08A" />
    </svg>
  );
}

export function FirstScreen({ lang }: { lang: Lang }) {
  const pic = picture(site.photos.portrait);
  /* the largest thing on the first screen: fetched before the stylesheet finishes */
  if (pic) preload(pic.src, { as: "image", fetchPriority: "high", imageSrcSet: pic.srcSet || undefined });
  const phone = PHONE;
  const number = phoneShown(lang);
  const since = lang === "hi" ? `${t(site.sinceYear, lang)} से` : `since ${t(site.sinceYear, lang)}`;
  const certified = lang === "hi" ? `${t(site.certifyingBody, lang)} प्रमाणित` : `${t(site.certifyingBody, lang)} certified`;
  const wa = waHref(
    site.contact.whatsapp,
    waMessage({ lang, kind: "talk", page: absolute(href("home", lang)) }),
  );

  return (
    <section className="first">
      <div className="md:grid md:min-h-[640px] md:grid-cols-[440px_1fr] lg:grid-cols-[560px_1fr]">
        {/* the photograph ------------------------------------------------ */}
        <div className="first-frame relative h-[380px] overflow-hidden md:h-auto">
          {pic ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={pic.src}
              srcSet={pic.srcSet || undefined}
              sizes="(min-width: 1024px) 560px, (min-width: 768px) 440px, 100vw"
              width={pic.width || undefined}
              height={pic.height || undefined}
              alt={t(site.teacher, lang)}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          ) : (
            <Silhouette />
          )}
          <div className="first-fade md:hidden" aria-hidden="true" />
          {/* her name on the picture, the way a clinic board reads */}
          <div className="on-dark absolute inset-x-4 bottom-4 flex h-[116px] flex-col gap-1 overflow-hidden md:hidden" style={{ color: "var(--color-ivory)" }} data-on-photo="">
            <p className="page-title">{t(site.teacher, lang)}</p>
            {/* The block has a fixed height and the name sits at its top; the
                caption is two short lines that each fit whatever font is
                showing, so nothing re-wraps or moves when Baloo 2 arrives. */}
            <p className="cap" style={{ color: "var(--color-ivory)", opacity: 0.92 }}>
              <Tx>{`${t(site.credentialShort, lang)} · `}</Tx>
              <strong>
                <Tx>{certified}</Tx>
              </strong>
              <br />
              <Tx>{`${t(site.city, lang)} · ${since}`}</Tx>
            </p>
          </div>
          {!pic ? (
            <p className="cap absolute bottom-3 left-6 hidden md:block" style={{ color: "var(--color-deeper)" }}>
              {ui("photo.first", lang)}
            </p>
          ) : null}
        </div>

        {/* the promise ---------------------------------------------------- */}
        <div className="flex flex-col gap-3.5 px-4 pb-6 pt-5 md:justify-end md:gap-4 md:px-12 md:py-16 lg:px-16 lg:pr-28">
          <p className="hidden font-bold body md:block" style={{ color: "var(--color-deeper)" }}>
            <Tx>{`${t(site.teacher, lang)} · ${t(site.credentialShort, lang)} · ${certified} · ${t(site.city, lang)}`}</Tx>
          </p>
          <h1 className="claim md:max-w-[12ch]">{t(site.claim, lang)}</h1>
          <p className="body max-w-[44ch]" style={{ color: "var(--color-heroink)" }}>
            {ui("home.heroLead", lang)}
          </p>
          <div className="mt-1 flex flex-col gap-2.5 md:flex-row md:items-center md:gap-3">
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
              href={phone ? telHref(phone) : `${href("contact", lang)}`}
              data-ev="call_click"
              data-ev-source="first-screen"
              className="btn btn-outline"
            >
              <PhoneIcon size={20} />
              <Tx>{`${ui("cta.call", lang)} · ${number}`}</Tx>
            </a>
          </div>
          <p className="cap text-center md:text-left">{ui("home.heroNote", lang)}</p>
        </div>
      </div>
    </section>
  );
}
