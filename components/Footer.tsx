import Link from "next/link";
import { site, t, ui } from "@/lib/content";
import { href, type Lang } from "@/lib/routes";
import { telHref, waHref, waMessage } from "@/lib/whatsapp";
import { PhoneIcon, WhatsAppIcon } from "./Icons";
import { Tx } from "./Tx";

/* The last thing on every page, and for an older reader often the first
   place they look for a phone number.

   The links used to sit in a wrapping row where बैच was 18 px wide — a thumb
   could not pick it from its neighbours. They are a two-column list now, each
   cell the whole tap target, 48 px tall. Placeholders here paint in a light
   ink the dark ground can carry; the muted brown failed at 2.8:1. */

export default function Footer({ lang }: { lang: Lang }) {
  const pages: { key: Parameters<typeof href>[0]; label: string }[] = [
    { key: "ailments", label: ui("nav.ailments", lang) },
    { key: "batches", label: ui("nav.batches", lang) },
    { key: "stories", label: ui("nav.stories", lang) },
    { key: "about", label: ui("nav.about", lang) },
    { key: "contact", label: ui("nav.contact", lang) },
    { key: "students", label: ui("nav.students", lang) },
  ];
  const legal: { key: Parameters<typeof href>[0]; label: string }[] = [
    { key: "privacy", label: ui("legal.privacy", lang) },
    { key: "terms", label: ui("legal.terms", lang) },
    { key: "refund", label: ui("legal.refund", lang) },
  ];
  const phone = site.contact.phone ? telHref(site.contact.phone) : "";
  const wa = site.contact.whatsapp
    ? waHref(site.contact.whatsapp, waMessage({ lang, kind: "general" }))
    : "";
  const cell = "flex min-h-[48px] items-center no-underline";

  return (
    <footer
      className="no-print mt-auto"
      style={{ background: "var(--color-kohl)", color: "var(--color-ivory)" }}
    >
      <div className="wrap grid gap-8 py-10 md:grid-cols-[1.2fr_1fr] md:gap-14 md:py-14">
        {/* who, and how to reach her ---------------------------------- */}
        <div className="flex flex-col gap-3">
          <div className="brand h2">
            <span>योग</span> वंदना
          </div>
          <div className="quote body" style={{ color: "var(--color-bhagwa)" }} lang="sa">
            {site.motto}
          </div>
          <p className="body max-w-[44ch]">
            {t(site.teacher, lang)}, {t(site.credentialShort, lang)}
          </p>
          <p className="cap max-w-[44ch]" style={{ color: "rgba(251,248,241,0.82)" }}>
            <Tx>{t(site.contact.address, lang)}</Tx>
          </p>
          {phone || wa ? (
            <div className="mt-1 flex flex-col gap-1">
              {phone ? (
                <a
                  href={phone}
                  className={`${cell} body gap-2.5 font-bold`}
                  style={{ color: "var(--color-ivory)" }}
                  data-ev="call_click"
                  data-ev-source="footer"
                >
                  <PhoneIcon size={20} />
                  {site.contact.phoneDisplay || site.contact.phone}
                </a>
              ) : null}
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cell} body gap-2.5 font-bold`}
                  style={{ color: "var(--color-bhagwa)" }}
                  data-ev="whatsapp_click"
                  data-ev-source="footer"
                >
                  <WhatsAppIcon size={20} />
                  {ui("cta.whatsappTalk", lang)}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* where else to go -------------------------------------------- */}
        <div className="flex flex-col gap-4">
          <nav aria-label={ui("nav.menu", lang)}>
            <ul className="grid grid-cols-2 gap-x-6">
              {pages.map((l) => (
                <li key={l.key}>
                  <Link
                    href={href(l.key, lang)}
                    className={`${cell} body`}
                    style={{ color: l.key === "students" ? "var(--color-bhagwa)" : "var(--color-ivory)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="grid grid-cols-3 gap-x-4 border-t pt-2" style={{ borderColor: "rgba(251,248,241,0.18)" }}>
            {legal.map((l) => (
              <li key={l.key}>
                <Link
                  href={href(l.key, lang)}
                  className={`${cell} cap`}
                  style={{ color: "rgba(251,248,241,0.82)" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
