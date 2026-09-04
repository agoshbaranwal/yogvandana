import Link from "next/link";
import Band from "@/components/Band";
import { ShareLink } from "@/components/Blocks";
import { FaqList } from "@/components/Faq";
import { AilmentIcon } from "@/components/Icons";
import { breadcrumbSchema, courseSchema, faqSchema, Jsonld } from "@/components/Jsonld";
import SiteShell from "@/components/SiteShell";
import { SlipPad } from "@/components/SlipPad";
import { PriceLine } from "@/components/WhatYouGet";
import { ResultCard } from "@/components/StoryCard";
import { MedicinePanel } from "@/components/Timeline";
import { Tx } from "@/components/Tx";
import {
  absolute,
  type Ailment as AilmentType,
  type Batch,
  FAMILY_COLOUR,
  groupBatches,
  site,
  storiesFor,
  t,
  ui,
} from "@/lib/content";
import { href, type Lang } from "@/lib/routes";

/* A condition page, in the order the visitor asks: is this for my disease,
   what does it do for it, what about my medicine, what will I take home, what
   is the first class like, who else with this got better, which batch, my
   questions, and the one ask. Everything on it is about this one disease. */

function WorksLine({ text }: { text: string }) {
  /* "शुगर लेवल — खाली पेट का अभ्यास…": the thing before the dash is the
     subject, and is set bold. */
  const i = text.indexOf(" — ");
  if (i < 0) return <Tx>{text}</Tx>;
  return (
    <>
      <strong>
        <Tx>{text.slice(0, i)}</Tx>
      </strong>
      <Tx>{text.slice(i)}</Tx>
    </>
  );
}

function BatchLine({ batch, lang }: { batch: Batch; lang: Lang }) {
  const when = batch.id === "morning" ? ui("band.morning", lang) : batch.id === "evening" ? ui("band.evening", lang) : t(batch.name, lang);
  return (
    <div className="card flex items-center gap-3.5">
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="h3">
          <Tx>{`${when} ${t(batch.start, lang)}`}</Tx>
        </p>
        <p className="cap">
          <Tx>{`${t(batch.note, lang)} · ${t(batch.days, lang)}`}</Tx>
        </p>
      </div>
      <div className="text-right">
        <p className="num h2">
          <Tx>{`₹${batch.price}`}</Tx>
        </p>
        <p className="cap">{t(batch.priceUnit, lang)}</p>
      </div>
    </div>
  );
}

export default function Ailment({ lang, ailment }: { lang: Lang; ailment: AilmentType }) {
  const colour = FAMILY_COLOUR[ailment.family];
  const page = absolute(href("ailment", lang, ailment.slug));
  const name = t(ailment.name, lang);
  const stories = storiesFor(ailment.slug);
  const best = groupBatches.find((b) => b.id === ailment.bestBatch);
  const ailmentFaq = faqSchema(ailment.faq.map((f) => ({ q: t(f.q, lang), a: t(f.a, lang) })));

  return (
    <SiteShell lang={lang} routeKey="ailment" slug={ailment.slug} ailmentName={name}>
      <Jsonld
        data={[
          breadcrumbSchema([
            { name: ui("nav.home", lang), url: absolute(href("home", lang)) },
            { name: ui("nav.ailments", lang), url: absolute(href("ailments", lang)) },
            { name, url: page },
          ]),
          courseSchema(lang, t(ailment.titleFull, lang), t(ailment.metaDescription, lang)),
          ...(ailmentFaq ? [ailmentFaq] : []),
        ]}
      />

      {/* 1 · the disease, the promise, what the practice does for it ------- */}
      <section
        className="border-t-[6px]"
        style={{
          borderColor: "var(--color-bhagwa)",
          background: "linear-gradient(180deg, var(--color-sky) 0%, var(--color-ivory) 100%)",
        }}
      >
        <div className="wrap flex flex-col gap-3.5 pb-7 pt-5 md:grid md:grid-cols-[1.2fr_1fr] md:items-start md:gap-14 md:py-12">
          <div className="flex flex-col gap-3.5">
            <nav aria-label="breadcrumb" className="flex items-center gap-2 cap">
              <Link href={href("ailments", lang)} className="tap" style={{ color: "var(--color-muted)" }}>
                {ui("cta.backToAilments", lang)}
              </Link>
              <span aria-hidden="true">›</span>
              <span className="chip">
                {name}
              </span>
            </nav>
            <div className="flex items-center gap-3.5">
              <span
                className="flex h-16 w-16 flex-none items-center justify-center rounded-full"
                style={{ background: "var(--color-paper)", color: colour.ink }}
                aria-hidden="true"
              >
                <AilmentIcon name={ailment.icon} size={34} />
              </span>
              <h1 className="page-title">{t(ailment.titleFull, lang)}</h1>
            </div>
            <p className="h3" style={{ color: "var(--color-deep)" }}>
              {t(ailment.claimLine, lang)}
            </p>
            <ol className="flex flex-col gap-2.5">
              {ailment.works.map((w, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="n-dot num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <p className="body">
                    <WorksLine text={t(w, lang)} />
                  </p>
                </li>
              ))}
            </ol>
            <p className="cap">
              <Tx>
                {`${ui("ailment.reviewEvery", lang).replace("{d}", site.reviewDays)} ${ui("ailment.sameDisease", lang).replace("{n}", ailment.studentCount)}`}
              </Tx>
            </p>
            <div className="flex flex-col items-start gap-2">
              <Link
                href="#booking-band"
                data-ev="talk_cta"
                data-ev-source="ailment-header"
                data-ev-slug={ailment.slug}
                className="btn btn-primary w-full md:w-auto"
              >
                {ui("ailment.talkAbout", lang).replace("{x}", name)}
              </Link>
              <ShareLink
                label={ui("cta.sharePage", lang)}
                title={`${t(ailment.titleFull, lang)} — ${t(ailment.claimLine, lang)}`}
                url={page}
                source={`ailment-${ailment.slug}`}
              />
            </div>
          </div>

          {/* 2 · the medicine, in the same breath as the promise ----------- */}
          <div className="md:pt-14">
            <MedicinePanel lang={lang} body={t(ailment.medicine, lang)} />
          </div>
        </div>
      </section>

      {/* 3 · what you get for this disease, and the slip at the head ----- */}
      <section className="border-t border-rule">
        <div className="wrap flex flex-col gap-5 section-pad">
          <div className="flex flex-col gap-3">
            <h2 className="h2">{ui("ailment.slipTitle", lang).replace("{x}", name)}</h2>
            <p className="body" style={{ color: "var(--color-heroink)" }}>
              {ui("ailment.slipNote", lang)}
            </p>
            <PriceLine lang={lang} />
          </div>
          <div className="w-full md:max-w-[560px]">
            <SlipPad lang={lang} disease={`${name} · ${t(ailment.sub, lang)}`} edge="var(--color-ivory)" />
          </div>
        </div>
      </section>

      {/* 4 · the first class, as a clock ------------------------------------ */}
      <section className="border-t border-rule">
        <div className="wrap flex flex-col gap-3 section-pad">
          <h2 className="h2">{ui("ailment.firstClassTitle", lang)}</h2>
          <ol className="flex flex-col border-t border-rule">
            {ailment.firstClass.rows.map((row, i) => (
              <li key={i} className="flex items-start gap-3.5 border-b border-rule py-3.5">
                <span className="num h3 w-[72px] flex-none" style={{ color: "var(--color-deep)" }}>
                  <Tx>{`${row.minutes} ${ui("ailment.min", lang)}`}</Tx>
                </span>
                <p className="body">
                  <Tx>{t(row.text, lang)}</Tx>
                </p>
              </li>
            ))}
          </ol>
          <p className="body font-bold">
            <Tx>{t(ailment.firstClass.note, lang)}</Tx>
          </p>
        </div>
      </section>

      {/* 5 · people with this, who felt the difference ---------------------- */}
      <section style={{ background: "var(--color-sky)" }}>
        <div className="wrap wrap-wide flex flex-col gap-3 section-pad">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="h2">{ui("ailment.studentsTitle", lang).replace("{x}", name)}</h2>
            <Link href={href("stories", lang)} className="tap whitespace-nowrap font-bold cap">
              {ui("stories.all", lang)}
            </Link>
          </div>
          {stories.length > 0 ? (
            <ul className="grid gap-3 md:grid-cols-2 md:gap-5 [&>li]:min-w-0">
              {stories.map((s, i) => (
                <li key={s.id}>
                  <ResultCard story={s} lang={lang} showVideo={i === 0} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="body" style={{ color: "var(--color-muted)" }}>
              {ui("ailment.noStories", lang)}
            </p>
          )}
          <p className="cap">{ui("stories.consent", lang)}</p>
        </div>
      </section>

      {/* 6 · which batch, in one line --------------------------------------- */}
      <section className="border-t border-rule">
        <div className="wrap flex flex-col gap-3 section-pad">
          <h2 className="h2">
            {ui("ailment.batchTitle", lang)
              .replace("{x}", name)
              .replace("{batch}", best ? t(best.name, lang) : ui("nav.batches", lang))}
          </h2>
          {best ? (
            <>
              <BatchLine batch={best} lang={lang} />
              <p className="cap">
                <Tx>{t(ailment.bestBatchWhy, lang)}</Tx>
              </p>
            </>
          ) : (
            <>
              <div className="grid gap-3 md:grid-cols-2">
                {groupBatches.map((b) => (
                  <BatchLine key={b.id} batch={b} lang={lang} />
                ))}
              </div>
              <p className="cap">{ui("ailment.anyBatch", lang)}</p>
            </>
          )}
          <Link href={href("batches", lang)} className="link-strong self-start body">
            {ui("cta.seeBatches", lang)}
          </Link>
        </div>
      </section>

      {/* 7 · questions ------------------------------------------------------ */}
      <section className="border-t border-rule">
        <div className="wrap flex flex-col gap-2 pb-10">
          <h2 className="h2 pb-2">{ui("ailment.faqTitle", lang)}</h2>
          <FaqList items={ailment.faq} lang={lang} openFirst />
        </div>
      </section>

      {/* 8 · the ask -------------------------------------------------------- */}
      <Band
        lang={lang}
        routeKey="ailment"
        slug={ailment.slug}
        source={`ailment-${ailment.slug}`}
        defaultSlug={ailment.slug}
        title={ui("ailment.bandTitle", lang).replace("{x}", name)}
        lead={ui("ailment.bandLead", lang)}
      />
    </SiteShell>
  );
}
