import { A as Link } from "../components/Nav";
import { DiseaseRows } from "@/components/DiseaseRows";
import Band from "@/components/Band";
import { FeeFacts, GroupBatchCard, SessionBar, SmallBatchCard } from "@/components/Batches";
import { PriceLine } from "@/components/WhatYouGet";
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
      <section>
        <div className="wrap py-6 md:py-14">
          <DiseaseRows lang={lang} heading="h1" />
        </div>
      </section>
      <Band lang={lang} routeKey="ailments" source="ailments" />
    </SiteShell>
  );
}

/* ------------------------------ batches ---------------------------------- */

/* The week, two times, one fee. Then one class as a bar, the money said
   once, and the ask: which batch is a question she answers, by the disease. */
export function BatchesPage({ lang }: { lang: Lang }) {
  const page = absolute(href("batches", lang));
  const group = batches.filter((b) => b.type === "group");
  const others = batches.filter((b) => b.type !== "group");
  const first = group[0];

  return (
    <SiteShell lang={lang} routeKey="batches">
      <Jsonld data={group.map((b) => courseSchema(lang, t(b.name, lang), t(b.note, lang)))} />
      <header className="hero-warm">
        <div className="wrap flex flex-col gap-2 pb-5 pt-6 md:pb-8 md:pt-12">
          <h1 className="page-title">{ui("batches.title", lang)}</h1>
          <p className="body max-w-[52ch]" style={{ color: "var(--color-heroink)" }}>
            <Tx>{ui("batches.lead", lang)}</Tx>
          </p>
          <PriceLine lang={lang} />
        </div>
      </header>

      <section>
        <div className="wrap flex flex-col gap-3 pb-2 pt-2 md:grid md:grid-cols-2 md:gap-5 md:pt-4">
          {group.map((b, i) => (
            <GroupBatchCard key={b.id} batch={b} lang={lang} page={page} first={i === 0} />
          ))}
          {others.map((b) => (
            <SmallBatchCard key={b.id} batch={b} lang={lang} page={page} />
          ))}
        </div>
      </section>

      {first ? (
        <section>
          <div className="wrap flex flex-col gap-3 section-pad">
            <h2 className="h2">{ui("batches.inSession", lang)}</h2>
            <SessionBar rows={first.session} lang={lang} />
            <FeeFacts batch={first} lang={lang} />
            <p className="cap">{ui("pay.safetyShort", lang)}</p>
          </div>
        </section>
      ) : null}

      <section>
        <div className="wrap flex flex-col gap-2 pb-10">
          <h2 className="h2 pb-2">{ui("home.faqTitle", lang)}</h2>
          <FaqList items={faq} lang={lang} />
        </div>
      </section>

      <Band
        lang={lang}
        routeKey="batches"
        source="batches"
        title={ui("batches.whichTitle", lang)}
        lead={ui("batches.whichLead", lang)}
      />
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
    <SiteShell lang={lang} routeKey={routeKey} hasBand={false} quiet>
      <header className="border-b border-rule">
        <div className="wrap flex flex-col gap-2 section-pad">
          <h1 className="page-title">{title}</h1>
          <p className="cap">
            {ui("legal.reviewNote", lang)} · {ui("about.updated", lang)} {site.updated}
          </p>
        </div>
      </header>
      <div className="wrap flex max-w-[68ch] flex-col gap-6 section-pad">
        {sections.map((s, i) => (
          <section key={i} className="flex flex-col gap-2">
            <h2 className="h3">{s.heading}</h2>
            {s.body.map((p, j) => (
              <p key={j} className="body">
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
    <SiteShell lang={lang} routeKey="home" hasBand={false} quiet>
      <section className="wrap flex flex-col gap-4 py-12 md:py-20">
        <h1 className="page-title">{ui("notFound.title", lang)}</h1>
        <p className="body max-w-[62ch]">{ui("notFound.lead", lang)}</p>
        <p className="body" style={{ color: "var(--color-muted)" }}>
          {ui("notFound.title", lang === "hi" ? "en" : "hi")}{" "}
          <Link href={href("home", lang === "hi" ? "en" : "hi")}>
            {ui("notFound.english", lang)}
          </Link>
        </p>
        <div className="flex flex-wrap gap-2.5">
          <Link href={href("home", lang)} className="link-strong body">
            {ui("nav.home", lang)}
          </Link>
          <Link href={href("contact", lang)} className="link-strong body">
            {ui("nav.contact", lang)}
          </Link>
        </div>
        <div className="mt-4">
          <DiseaseRows lang={lang} id="nahin-mila-rog" askHref={href("contact", lang)} />
        </div>
      </section>
    </SiteShell>
  );
}
