import Link from "next/link";
import { AilmentCards } from "@/components/AilmentCards";
import Band from "@/components/Band";
import { BatchCard } from "@/components/Batches";
import { FaqList } from "@/components/Faq";
import SiteShell from "@/components/SiteShell";
import { Tx } from "@/components/Tx";
import { courseSchema, Jsonld } from "@/components/Jsonld";
import { absolute, batches, faq, site, t, ui } from "@/lib/content";
import { href, type Lang } from "@/lib/routes";

/* ------------------------- all conditions -------------------------------- */

export function AilmentsIndex({ lang }: { lang: Lang }) {
  return (
    <SiteShell lang={lang} routeKey="ailments">
      <header style={{ background: "linear-gradient(180deg, var(--color-sky) 0%, var(--color-ivory) 100%)" }}>
        <div className="wrap flex flex-col gap-2.5 py-8 md:py-12">
          <h1 className="page-title">{ui("home.ailmentsTitle", lang)}</h1>
          <p className="lead max-w-[62ch]" style={{ color: "var(--color-heroink)" }}>
            {ui("home.ailmentsLead", lang)}
          </p>
        </div>
      </header>
      <section className="wrap flex flex-col gap-4 py-8 md:py-12">
        <AilmentCards lang={lang} columns="grid-cols-2 md:grid-cols-4" />
        <p className="text-[16px]" style={{ color: "var(--color-muted)" }}>
          <Tx>{ui("cta.allAilments", lang)}</Tx>{" "}
          <Link href={href("contact", lang)}>{ui("nav.contact", lang)}</Link>
        </p>
      </section>
      <Band lang={lang} routeKey="ailments" source="ailments" />
    </SiteShell>
  );
}

/* ------------------------------ batches ---------------------------------- */

export function BatchesPage({ lang }: { lang: Lang }) {
  const page = absolute(href("batches", lang));
  const groups = { group: ui("batches.group", lang), private: ui("batches.private", lang), workshop: ui("batches.workshop", lang) };

  return (
    <SiteShell lang={lang} routeKey="batches">
      <Jsonld
        data={batches
          .filter((b) => b.type === "group")
          .map((b) => courseSchema(lang, t(b.name, lang), t(b.note, lang)))}
      />
      <header style={{ background: "linear-gradient(180deg, var(--color-sky) 0%, var(--color-ivory) 100%)" }}>
        <div className="wrap flex flex-col gap-2.5 py-8 md:py-12">
          <h1 className="page-title">{ui("batches.title", lang)}</h1>
          <p className="lead max-w-[62ch]" style={{ color: "var(--color-heroink)" }}>
            <Tx>{ui("batches.lead", lang)}</Tx>
          </p>
        </div>
      </header>

      {(["group", "private", "workshop"] as const).map((type) => {
        const list = batches.filter((b) => b.type === type);
        if (list.length === 0) return null;
        return (
          <section key={type} className="wrap flex flex-col gap-4 py-6 md:py-9">
            <h2 className="h2">{groups[type]}</h2>
            <ul className={`grid gap-2.5 md:gap-5 ${type === "group" ? "md:grid-cols-2" : ""}`}>
              {list.map((b) => (
                <li key={b.id}>
                  <BatchCard batch={b} lang={lang} page={page} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section className="wrap flex flex-col gap-3 py-8 md:py-12">
        <h2 className="h2">{ui("home.faqTitle", lang)}</h2>
        <FaqList items={faq} lang={lang} columns />
      </section>

      <Band lang={lang} routeKey="batches" source="batches" />
    </SiteShell>
  );
}

/* ------------------------------- legal ----------------------------------- */

export function LegalPage({
  lang,
  routeKey,
  title,
  sections,
}: {
  lang: Lang;
  routeKey: "privacy" | "terms" | "refund";
  title: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <SiteShell lang={lang} routeKey={routeKey}>
      <header className="border-b border-rule">
        <div className="wrap flex flex-col gap-2 py-8 md:py-11">
          <h1 className="page-title">{title}</h1>
          <p className="cap">
            {ui("legal.reviewNote", lang)} · {ui("about.updated", lang)} {site.updated}
          </p>
        </div>
      </header>
      <div className="wrap flex max-w-[68ch] flex-col gap-6 py-8 md:py-12">
        {sections.map((s, i) => (
          <section key={i} className="flex flex-col gap-2">
            <h2 className="h3">{s.heading}</h2>
            {s.body.map((p, j) => (
              <p key={j} className="text-[16px] leading-relaxed md:text-[17px]">
                <Tx>{p}</Tx>
              </p>
            ))}
          </section>
        ))}
        <p className="cap">
          {t(site.contact.businessName, lang)} · <Tx>{t(site.contact.address, lang)}</Tx> ·{" "}
          <Tx>{site.contact.email || "[ईमेल]"}</Tx>
        </p>
      </div>
    </SiteShell>
  );
}

/* ------------------------------ not found -------------------------------- */

export function NotFoundPage({ lang }: { lang: Lang }) {
  return (
    <SiteShell lang={lang} routeKey="home">
      <section className="wrap flex flex-col gap-4 py-12 md:py-20">
        <h1 className="page-title">{ui("notFound.title", lang)}</h1>
        <p className="lead max-w-[62ch]">{ui("notFound.lead", lang)}</p>
        <p className="text-[16px]" style={{ color: "var(--color-muted)" }}>
          {ui("notFound.title", lang === "hi" ? "en" : "hi")}{" "}
          <Link href={href("home", lang === "hi" ? "en" : "hi")}>
            {ui("notFound.english", lang)}
          </Link>
        </p>
        <div className="flex flex-wrap gap-2.5">
          <Link href={href("home", lang)} className="btn btn-primary">
            {ui("nav.home", lang)}
          </Link>
          <Link href={href("contact", lang)} className="btn btn-outline">
            {ui("nav.contact", lang)}
          </Link>
        </div>
        <div className="mt-4">
          <AilmentCards lang={lang} columns="grid-cols-2 md:grid-cols-4" compact />
        </div>
      </section>
    </SiteShell>
  );
}
