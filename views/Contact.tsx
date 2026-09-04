import ContactForm from "@/components/ContactForm";
import { WhatsAppIcon } from "@/components/Icons";
import SiteShell from "@/components/SiteShell";
import { Tx } from "@/components/Tx";
import { PriceLine } from "@/components/WhatYouGet";
import { absolute, ailments, PHONE, phoneShown, site, t, ui } from "@/lib/content";
import { href, type Lang } from "@/lib/routes";
import { telHref, waHref, waMessage } from "@/lib/whatsapp";

/* The number first, big. Then WhatsApp. Then, for the person who would
   rather write it down, a short form. Then the address. */

export default function Contact({ lang }: { lang: Lang }) {
  const page = absolute(href("contact", lang));
  const wa = waHref(site.contact.whatsapp, waMessage({ lang, kind: "talk", page }));
  const socials = [
    { url: site.socials.instagram, label: "Instagram" },
    { url: site.socials.youtube, label: "YouTube" },
    { url: site.socials.facebook, label: "Facebook" },
  ].filter((s) => s.url);
  const callCard = (
    <>
      <p className="label">{ui("contact.callTitle", lang)}</p>
      <p className="num page-title">
        <Tx>{phoneShown(lang)}</Tx>
      </p>
      <p className="cap">
        <Tx>{t(site.contact.replyHours, lang)}</Tx>
      </p>
    </>
  );

  return (
    <SiteShell lang={lang} routeKey="contact" hasBand={false}>
      <section style={{ background: "linear-gradient(180deg, var(--color-sky) 0%, var(--color-ivory) 100%)" }}>
        <div className="wrap flex flex-col gap-3.5 pb-7 pt-6 md:grid md:grid-cols-2 md:items-start md:gap-14 md:py-12">
          <div className="flex flex-col gap-3">
            <h1 className="page-title">{ui("contact.title", lang)}</h1>
            <p className="body max-w-[44ch]" style={{ color: "var(--color-heroink)" }}>
              <Tx>{ui("contact.lead", lang)}</Tx>
            </p>
            <PriceLine lang={lang} />
          </div>
          <div className="flex flex-col gap-3">
            {PHONE ? (
              <a href={telHref(PHONE)} data-ev="call_click" data-ev-source="contact-header" className="card flex flex-col gap-0.5 no-underline" style={{ color: "var(--color-kohl)" }}>
                {callCard}
              </a>
            ) : (
              <div className="card flex flex-col gap-0.5">{callCard}</div>
            )}
            <a href={wa} target="_blank" rel="noopener noreferrer" data-ev="whatsapp_click" data-ev-source="contact-header" className="btn btn-primary">
              <WhatsAppIcon size={22} />
              {ui("cta.whatsappTalk", lang)}
            </a>
            <p className="cap text-center md:text-left">{ui("contact.prewritten", lang)}</p>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap flex flex-col gap-4 section-pad md:max-w-[640px] md:!mx-auto">
          <h2 className="h2">{ui("contact.formTitle", lang)}</h2>
          <ContactForm
            lang={lang}
            endpoint={site.links.formEndpoint}
            whatsappNumber={site.contact.whatsapp}
            page={page}
            pageLabel={ui("nav.contact", lang)}
            labels={{
              name: ui("contact.name", lang),
              phone: ui("contact.phone", lang),
              ailment: ui("contact.ailment", lang),
              other: ui("band.other", lang),
              message: ui("contact.message", lang),
              messageHint: ui("contact.messageHint", lang),
              send: ui("cta.send", lang),
              thanks: ui("contact.thanks", lang),
              privacyNote: ui("contact.privacyNote", lang),
              safety: ui("contact.safety", lang),
              whatsapp: ui("cta.whatsappTalk", lang),
              required: ui("contact.required", lang),
            }}
            ailments={ailments.map((a) => ({ slug: a.slug, label: t(a.name, lang) }))}
          />
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="wrap flex flex-col gap-1.5 py-7 md:max-w-[640px] md:!mx-auto md:py-10">
          <h2 className="h2">{ui("contact.addressTitle", lang)}</h2>
          <p className="body">
            <Tx>{t(site.contact.address, lang)}</Tx>
          </p>
          <p className="cap">{ui("contact.addressNote", lang)}</p>
          {socials.length > 0 ? (
            <p className="mt-1 flex flex-wrap gap-4 font-bold body">
              {socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
            </p>
          ) : null}
        </div>
      </section>
    </SiteShell>
  );
}
