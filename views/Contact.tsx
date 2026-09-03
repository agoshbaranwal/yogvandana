import ContactForm from "@/components/ContactForm";
import { PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import SiteShell from "@/components/SiteShell";
import { Tx } from "@/components/Tx";
import { absolute, ailments, site, t, ui } from "@/lib/content";
import { href, type Lang } from "@/lib/routes";
import { telHref, waHref, waMessage } from "@/lib/whatsapp";

export default function Contact({ lang }: { lang: Lang }) {
  const page = absolute(href("contact", lang));
  const wa = waHref(site.contact.whatsapp, waMessage({ lang, kind: "general", page }));
  const socials = [
    { url: site.socials.instagram, label: "Instagram" },
    { url: site.socials.youtube, label: "YouTube" },
    { url: site.socials.facebook, label: "Facebook" },
  ].filter((s) => s.url);

  return (
    <SiteShell lang={lang} routeKey="contact" hasBand={false}>
      <header style={{ background: "linear-gradient(180deg, var(--color-sky) 0%, var(--color-ivory) 100%)" }}>
        <div className="wrap flex flex-col gap-3 py-8 md:py-12">
          <h1 className="page-title">{ui("contact.title", lang)}</h1>
          <p className="body max-w-[58ch]" style={{ color: "var(--color-heroink)" }}>
            {ui("contact.lead", lang)}
          </p>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              data-ev="whatsapp_click"
              data-ev-source="contact-header"
              className="btn btn-primary"
            >
              <WhatsAppIcon size={20} />
              {ui("cta.whatsappMsg", lang)}
            </a>
            {site.contact.phone ? (
              <a
                href={telHref(site.contact.phone)}
                data-ev="call_click"
                data-ev-source="contact-header"
                className="btn btn-outline"
              >
                <PhoneIcon size={18} />
                {ui("cta.call", lang)}: <Tx>{site.contact.phoneDisplay}</Tx>
              </a>
            ) : (
              <p className="cap self-center">
                <Tx>{`${ui("cta.call", lang)}: ${site.contact.phoneDisplay}`}</Tx>
              </p>
            )}
          </div>
          <p className="cap">
            <Tx>{`${t(site.contact.replyHours, lang)} · ${site.contact.email}`}</Tx>
          </p>
        </div>
      </header>

      <div className="wrap grid gap-8 py-8 md:grid-cols-2 md:gap-14 md:py-12">
        <section className="flex flex-col gap-4">
          <h2 className="h2">{ui("contact.formTitle", lang)}</h2>
          <ContactForm
            lang={lang}
            endpoint={site.links.formEndpoint}
            whatsappNumber={site.contact.whatsapp}
            phone={site.contact.phone}
            page={page}
            labels={{
              name: ui("contact.name", lang),
              phone: ui("contact.phone", lang),
              about: ui("contact.about", lang),
              ailment: ui("contact.ailment", lang),
              message: ui("contact.message", lang),
              messageHint: ui("contact.messageHint", lang),
              send: ui("cta.send", lang),
              thanks: ui("contact.thanks", lang),
              privacyNote: ui("contact.privacyNote", lang),
              formOffline: ui("contact.formOffline", lang),
              whatsapp: ui("cta.whatsappMsg", lang),
              call: ui("cta.call", lang),
            }}
            interests={[
              { key: "group", label: ui("contact.interestGroup", lang) },
              { key: "private", label: ui("contact.interestPrivate", lang) },
              { key: "workshop", label: ui("contact.interestWorkshop", lang) },
              { key: "invite", label: ui("contact.interestInvite", lang) },
            ]}
            ailments={ailments.map((a) => ({ slug: a.slug, label: t(a.name, lang) }))}
          />
        </section>

        <div className="flex flex-col gap-8">
          <section
            className="flex flex-col gap-3 rounded-[16px] p-5 md:p-6"
            style={{ background: "var(--color-sky)" }}
          >
            <h2 className="h2">{ui("about.inviteTitle", lang)}</h2>
            <p className="body" style={{ color: "var(--color-heroink)" }}>
              {ui("about.inviteLead", lang)}
            </p>
            <a
              href={site.links.profilePdf || wa}
              target="_blank"
              rel="noopener noreferrer"
              data-ev="profile_download"
              data-ev-source="contact"
              className="btn btn-dark self-start"
            >
              {ui("cta.downloadProfile", lang)}
            </a>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="h2">{ui("contact.addressTitle", lang)}</h2>
            <p className="body">
              <Tx>{t(site.contact.address, lang)}</Tx>
            </p>
            <p className="cap">
              <Tx>{ui("contact.addressNote", lang)}</Tx>
            </p>
            {socials.length > 0 ? (
              <p className="mt-1 flex flex-wrap gap-4 font-bold body">
                {socials.map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                ))}
              </p>
            ) : (
              <p className="cap">
                <Tx>{lang === "hi" ? "[इंस्टाग्राम, यूट्यूब के लिंक]" : "[Instagram and YouTube links]"}</Tx>
              </p>
            )}
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
