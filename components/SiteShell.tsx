import { absolute, site, ui } from "@/lib/content";
import { href, type Lang, NAV, type RouteKey } from "@/lib/routes";
import { telHref, waHref, waMessage } from "@/lib/whatsapp";
import Analytics from "./Analytics";
import Footer from "./Footer";
import Header from "./Header";
import Motion from "./Motion";
import StickyCta from "./StickyCta";

export default function SiteShell({
  lang,
  routeKey,
  hasBand = true,
  quiet = false,
  slug,
  onDawn = false,
  ailmentName,
  children,
}: {
  lang: Lang;
  routeKey: RouteKey;
  /* Pages without a booking band send the header button to the contact page.
     It used to jump to #booking-band on every page, which on six of them was
     a button that did nothing. */
  hasBand?: boolean;
  /* Policy pages and the 404 carry no sticky bar: nothing there is a decision. */
  quiet?: boolean;
  slug?: string;
  onDawn?: boolean;
  ailmentName?: string;
  children: React.ReactNode;
}) {
  const nav = NAV.map((item) => ({
    label: ui(item.ui, lang),
    href: href(item.key, lang),
    active: item.key === routeKey,
  }));

  const wa = waHref(
    site.contact.whatsapp,
    waMessage({
      lang,
      kind: "talk",
      ailment: ailmentName,
      page: absolute(href(routeKey, lang, slug)),
    }),
  );

  return (
    <>
      <a className="skip-link" href="#main">
        {ui("nav.skip", lang)}
      </a>
      <Header
        brandHi="योग"
        brandTail="वंदना"
        home={href("home", lang)}
        nav={nav}
        switchLabel={ui("nav.switch", lang)}
        switchTitle={ui("nav.switchLabel", lang)}
        switchHref={href(routeKey, lang === "hi" ? "en" : "hi", slug)}
        talkLabel={ui("cta.talk", lang)}
        talkHref={hasBand ? `${href(routeKey, lang, slug)}#booking-band` : `${href("contact", lang)}#form`}
        menuLabel={ui("nav.menu", lang)}
        closeLabel={ui("nav.close", lang)}
        studentsLabel={ui("nav.students", lang)}
        studentsHref={href("students", lang)}
        whatsappLabel={ui("cta.whatsappTalk", lang)}
        phoneHref={site.contact.phone ? telHref(site.contact.phone) : ""}
        phoneLabel={site.contact.phoneDisplay || ""}
        whatsappHref={wa}
        onDawn={onDawn}
      />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer lang={lang} />
      <Motion />
      {quiet ? null : (
      <StickyCta
        label={ui("cta.whatsappTalk", lang)}
        href={wa}
        noteLabel={ui("band.title", lang)}
      />
      )}
      <Analytics id={site.analyticsId} />
    </>
  );
}
