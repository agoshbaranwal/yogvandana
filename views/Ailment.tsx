import Link from "next/link";
import Band from "@/components/Band";
import { BatchCard } from "@/components/Batches";
import { SectionHead, ShareLink, VideoSlot } from "@/components/Blocks";
import { FaqList } from "@/components/Faq";
import { AilmentIcon } from "@/components/Icons";
import SiteShell from "@/components/SiteShell";
import { Slip } from "@/components/Slip";
import { StoryCard } from "@/components/StoryCard";
import { Tx } from "@/components/Tx";
import { breadcrumbSchema, courseSchema, faqSchema, Jsonld } from "@/components/Jsonld";
import {
  absolute,
  type Ailment as AilmentType,
  FAMILY_COLOUR,
  groupBatches,
  storiesFor,
  t,
  ui,
} from "@/lib/content";
import { href, type Lang } from "@/lib/routes";

export default function Ailment({ lang, ailment }: { lang: Lang; ailment: AilmentType }) {
  const colour = FAMILY_COLOUR[ailment.family];
  const page = absolute(href("ailment", lang, ailment.slug));
  const stories = storiesFor(ailment.slug);
  const counts = [
    `${ailment.studentCount} ${ui("ailment.students", lang)}`,
    `${ailment.storyCount} ${ui("ailment.storiesWord", lang)}`,
    `${ailment.videoCount} ${ui("ailment.videosWord", lang)}`,
  ].join(" · ");
  const ailmentFaq = faqSchema(
    ailment.faq.map((f) => ({ q: t(f.q, lang), a: t(f.a, lang) })),
  );

  return (
    <SiteShell
      lang={lang}
      routeKey="ailment"
      slug={ailment.slug}
      ailmentName={t(ailment.name, lang)}
    >
      <Jsonld
        data={[
          breadcrumbSchema([
            { name: ui("nav.home", lang), url: absolute(href("home", lang)) },
            { name: ui("nav.ailments", lang), url: absolute(href("ailments", lang)) },
            { name: t(ailment.name, lang), url: page },
          ]),
          courseSchema(lang, t(ailment.titleFull, lang), t(ailment.metaDescription, lang)),
          ...(ailmentFaq ? [ailmentFaq] : []),
        ]}
      />
      {/* header band ---------------------------------------------------- */}
      <header
        className="border-t-[6px]"
        style={{
          /* The bar across the top stays the brand's saffron. The condition's
             own colour is a chip and an icon, at chip size, which is where it
             was meant to live. */
          borderColor: "var(--color-bhagwa)",
          background: "linear-gradient(180deg, var(--color-sky) 0%, var(--color-ivory) 100%)",
        }}
      >
        <div className="wrap grid gap-5 py-6 md:grid-cols-2 md:gap-12 md:py-10">
          <div className="flex flex-col gap-3">
            <nav aria-label="breadcrumb" className="flex items-center gap-2 cap">
              <Link href={href("ailments", lang)} className="tap" style={{ color: "var(--color-muted)" }}>
                {ui("cta.backToAilments", lang)}
              </Link>
              <span aria-hidden="true" style={{ color: "var(--color-muted)" }}>
                ›
              </span>
              <span className="chip" style={{ background: colour.ink }}>
                {t(ailment.name, lang)}
              </span>
            </nav>

            <div className="flex items-center gap-3.5">
              <span
                className="flex h-14 w-14 flex-none items-center justify-center rounded-full"
                style={{ background: "var(--color-paper)", color: colour.ink }}
                aria-hidden="true"
              >
                <AilmentIcon name={ailment.icon} size={30} />
              </span>
              <h1 className="page-title">{t(ailment.titleFull, lang)}</h1>
            </div>

            <p className="cap">
              {ui("ailment.countLine", lang)} <Tx>{counts}</Tx>
            </p>
            <p className="h3" style={{ color: "var(--color-deep)" }}>
              {t(ailment.claimLine, lang)}
            </p>
            <p className="body" style={{ color: "var(--color-heroink)" }}>
              <Tx>{t(ailment.intro, lang)}</Tx>
            </p>
            <div className="flex flex-col items-start gap-2">
              <Link
                href="#booking-band"
                data-ev="talk_cta"
                data-ev-source="ailment-header"
                data-ev-slug={ailment.slug}
                className="btn btn-primary w-full sm:w-auto"
              >
                {ui("cta.talk", lang)}
              </Link>
              <ShareLink
                label={ui("cta.sharePage", lang)}
                title={`${t(ailment.titleFull, lang)} — ${t(ailment.claimLine, lang)}`}
                url={page}
                source={`ailment-${ailment.slug}`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="h3">{ui("ailment.slipTitle", lang)}</h2>
            <Slip lang={lang} ailment={ailment} />
            <p className="cap">{ui("ailment.slipNote", lang)}</p>
          </div>
        </div>
      </header>

      {/* one section, not two: the first class, then how a class runs --- */}
      <section className="wrap flex flex-col gap-4 py-8 md:py-11">
        <h2 className="h2">{ui("ailment.firstClassTitle", lang)}</h2>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8">
          <ul className="card flex flex-col gap-2">
            {ailment.firstClass.map((row, i) => (
              <li key={i} className="body">
                <strong>
                  <Tx>{t(row.strong, lang)}</Tx>
                </strong>
                <Tx>{t(row.rest, lang)}</Tx>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2">
            <p className="label">{ui("ailment.classTitle", lang)}</p>
            <ul className="ml-5 flex list-disc flex-col gap-1.5 body">
              {ailment.classNotes.map((note, i) => (
                <li key={i}>
                  <Tx>{t(note, lang)}</Tx>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* students with the same condition -------------------------------- */}
      <section style={{ background: "var(--color-sky)" }}>
        <div className="wrap flex flex-col gap-4 py-8 md:py-12">
          <SectionHead
            title={ui("ailment.studentsTitle", lang)}
            link={{ label: ui("cta.allStories", lang), href: href("stories", lang) }}
          />
          {stories.length > 0 ? (
            <ul className="grid gap-2.5 md:grid-cols-2 md:gap-5">
              {stories.map((s) => (
                <li key={s.id}>
                  <StoryCard story={s} lang={lang} showVideo />
                </li>
              ))}
            </ul>
          ) : (
            <p className="body" style={{ color: "var(--color-muted)" }}>
              {ui("ailment.noStories", lang)}
            </p>
          )}
          {stories.length === 0 ? <VideoSlot lang={lang} accent={colour.ink} /> : null}
          <p className="cap">{ui("stories.consent", lang)}</p>
        </div>
      </section>

      {/* which batch ---------------------------------------------------- */}
      <section className="wrap flex flex-col gap-4 py-8 md:py-12">
        <SectionHead
          title={ui("ailment.batchTitle", lang)}
          lead={t(ailment.batchNote, lang)}
          link={{ label: ui("cta.seeBatches", lang), href: href("batches", lang) }}
        />
        <ul className="grid gap-2.5 md:grid-cols-2 md:gap-5">
          {groupBatches.map((b) => (
            <li key={b.id}>
              <BatchCard batch={b} lang={lang} page={page} />
            </li>
          ))}
        </ul>
      </section>

      {/* questions ------------------------------------------------------ */}
      <section className="wrap flex flex-col gap-3 pb-9 md:pb-12">
        <h2 className="h2">{ui("ailment.faqTitle", lang)}</h2>
        <FaqList items={ailment.faq} lang={lang} columns />
      </section>

      <Band
        lang={lang}
        routeKey="ailment"
        slug={ailment.slug}
        source={`ailment-${ailment.slug}`}
        defaultSlug={ailment.slug}
      />
    </SiteShell>
  );
}
