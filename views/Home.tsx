import Link from "next/link";
import { AilmentChooser } from "@/components/AilmentCards";
import Band from "@/components/Band";
import { BatchRow } from "@/components/Batches";
import { NumbersStrip, SectionHead, Steps, TeacherLine, VideoSlot } from "@/components/Blocks";
import { CredibilityBlock, Routine } from "@/components/Credibility";
import { FaqList } from "@/components/Faq";
import { Photo } from "@/components/Photo";
import SiteShell from "@/components/SiteShell";
import { Slip } from "@/components/Slip";
import { StoryCard } from "@/components/StoryCard";
import { Tx } from "@/components/Tx";
import { faqSchema, Jsonld, personSchema, websiteSchema } from "@/components/Jsonld";
import {
  absolute,
  ailmentBySlug,
  batches,
  faq,
  site,
  stories,
  t,
  ui,
} from "@/lib/content";
import { href, type Lang } from "@/lib/routes";

export default function Home({ lang }: { lang: Lang }) {
  const page = absolute(href("home", lang));
  const sample = ailmentBySlug("sugar");
  const shown = stories.slice(0, 3);
  const homeFaq = faqSchema(
    faq.slice(0, 4).map((f) => ({ q: t(f.q, lang), a: t(f.a, lang) })),
  );

  return (
    <SiteShell lang={lang} routeKey="home" onDawn>
      <Jsonld
        data={[
          websiteSchema(lang),
          personSchema(lang),
          ...(homeFaq ? [homeFaq] : []),
        ]}
      />
      {/* the dawn hero ------------------------------------------------- */}
      <section className="dawn">
        <div
          className="dawn-sun left-1/2 top-[250px] h-[300px] w-[300px] -translate-x-1/2 md:left-[24%] md:top-[300px] md:h-[520px] md:w-[520px]"
          aria-hidden="true"
        />
        <div className="dawn-horizon top-[420px] md:top-[660px]" aria-hidden="true" />
        <div className="wrap relative grid gap-8 pb-9 pt-[84px] md:min-h-[620px] md:grid-cols-[1fr_460px] md:items-center md:gap-12 md:pb-14 md:pt-[104px]">
          <div className="flex flex-col gap-3.5 md:gap-4 md:self-end md:pb-6">
            <p className="text-[13px] font-bold tracking-wide md:text-[14px]" style={{ color: "var(--color-deeper)" }}>
              <Tx>
                {`${ui("band.morning", lang)} ${t(site.morningTime, lang)} · ${t(site.city, lang)} · ${t(site.sinceYear, lang)} ${lang === "hi" ? "से" : "onwards"} · ${t(site.credentialShort, lang)}`}
              </Tx>
            </p>
            <h1 className="claim">{t(site.claim, lang)}</h1>
            <p className="max-w-[30em] text-[17px] leading-relaxed md:text-[20px]" style={{ color: "var(--color-heroink)" }}>
              {ui("home.heroLead", lang)}
            </p>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <Link
                href="#booking-band"
                data-ev="trial_cta"
                data-ev-source="hero"
                className="btn btn-dark sm:flex-1 md:flex-none"
              >
                {ui("cta.trial", lang)}
              </Link>
              <Link
                href="#ailments"
                data-ev="chooser_jump"
                data-ev-source="hero"
                className="btn btn-ghost sm:flex-1 md:flex-none"
              >
                {ui("cta.chooseAilment", lang)}
              </Link>
            </div>
          </div>
          <Photo
            src=""
            alt={t(site.teacher, lang)}
            label={ui("photo.teaching", lang)}
            ratio="4 / 5"
            rounded="rounded-[16px]"
            className="hidden w-full md:block"
            sizes="460px"
            priority
          />
        </div>
      </section>

      <TeacherLine lang={lang} />
      <NumbersStrip lang={lang} long />
      <AilmentChooser lang={lang} columns="grid-cols-2 md:grid-cols-4" />
      <Steps lang={lang} />

      {/* results ------------------------------------------------------- */}
      <section style={{ background: "var(--color-sky)" }}>
        <div className="wrap flex flex-col gap-4 py-9 md:py-14">
          <SectionHead
            title={ui("home.resultsTitle", lang)}
            link={{ label: ui("cta.allStories", lang), href: href("stories", lang) }}
          />
          <ul className="grid gap-2.5 md:grid-cols-3 md:gap-5">
            {shown.map((s) => (
              <li key={s.id}>
                <StoryCard story={s} lang={lang} />
              </li>
            ))}
          </ul>
          <div className="grid gap-4 md:grid-cols-[1fr_1fr] md:items-center md:gap-8">
            <VideoSlot lang={lang} note={ui("home.videoNote", lang)} />
            <Link
              href="#booking-band"
              data-ev="trial_cta"
              data-ev-source="results"
              className="btn btn-primary"
            >
              {ui("cta.nextStory", lang)}
            </Link>
          </div>
          <p className="cap">{ui("stories.consent", lang)}</p>
        </div>
      </section>

      <Routine lang={lang} />

      {/* the slip ------------------------------------------------------ */}
      {sample ? (
        <section className="wrap grid gap-5 py-8 md:grid-cols-2 md:items-start md:gap-12 md:py-12">
          <div className="flex flex-col gap-2.5">
            <h2 className="h2">{ui("home.slipTitle", lang)}</h2>
            <p className="max-w-[46ch] text-[16px] leading-relaxed md:text-[17px]" style={{ color: "var(--color-muted)" }}>
              {ui("home.slipLead", lang)}
            </p>
            <Link
              href={href("ailment", lang, sample.slug)}
              className="link-strong self-start text-[16px]"
            >
              {t(sample.titleFull, lang)}
            </Link>
          </div>
          <Slip lang={lang} ailment={sample} />
        </section>
      ) : null}

      {/* batches ------------------------------------------------------- */}
      <section className="wrap flex flex-col gap-4 py-8 md:py-12">
        <SectionHead
          title={ui("home.batchesTitle", lang)}
          link={{ label: ui("cta.seeBatches", lang), href: href("batches", lang) }}
        />
        <ul className="grid gap-2.5 md:grid-cols-3 md:gap-5">
          {batches
            .filter((b) => b.type !== "workshop")
            .map((b) => (
              <li key={b.id}>
                <BatchRow batch={b} lang={lang} page={page} />
              </li>
            ))}
        </ul>
      </section>

      <CredibilityBlock lang={lang} />

      {/* questions ----------------------------------------------------- */}
      <section className="wrap flex flex-col gap-3 py-9 md:py-14">
        <h2 className="h2">{ui("home.faqTitle", lang)}</h2>
        <FaqList items={faq.slice(0, 4)} lang={lang} columns />
      </section>

      <Band lang={lang} routeKey="home" source="home" />
    </SiteShell>
  );
}
