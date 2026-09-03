import { absolute, site, ui } from "@/lib/content";
import { href, type Lang, NAV, type RouteKey } from "@/lib/routes";
import { waHref, waMessage } from "@/lib/whatsapp";
import Analytics from "./Analytics";
import Footer from "./Footer";
import Header from "./Header";
import Motion from "./Motion";
import StickyCta from "./StickyCta";

export default function SiteShell({
  lang,
  routeKey,
  slug,
  onDawn = false,
  ailmentName,
  children,
}: {
  lang: Lang;
  routeKey: RouteKey;
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
        talkHref={`${href(routeKey, lang, slug)}#booking-band`}
        menuLabel={ui("nav.menu", lang)}
        closeLabel={ui("nav.close", lang)}
        studentsLabel={ui("nav.students", lang)}
        studentsHref={href("students", lang)}
        whatsappLabel={ui("cta.whatsappMsg", lang)}
        whatsappHref={wa}
        onDawn={onDawn}
      />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer lang={lang} />
      <Motion />
      <StickyCta
        label={ui("cta.whatsapp", lang)}
        href={wa}
        noteLabel={ui("band.title", lang)}
      />
      <Analytics id={site.analyticsId} />
    </>
  );
}
