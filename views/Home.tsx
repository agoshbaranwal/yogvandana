import Link from "next/link";
import { AilmentChooser } from "@/components/AilmentCards";
import Band from "@/components/Band";
import { BatchRow } from "@/components/Batches";
import { NumbersStrip, SectionHead, Steps, TeacherLine } from "@/components/Blocks";
import { RecordLinks, Routine, TeacherBio } from "@/components/Credibility";
import { FaqList } from "@/components/Faq";
import { Photo } from "@/components/Photo";
import SiteShell from "@/components/SiteShell";
import { Slip } from "@/components/Slip";
import { StoryCard } from "@/components/StoryCard";
import { Tx } from "@/components/Tx";
import { PhoneIcon } from "@/components/Icons";
import { telHref } from "@/lib/whatsapp";
import { Jsonld, faqSchema, personSchema, websiteSchema } from "@/components/Jsonld";
import { absolute, ailmentBySlug, batches, faq, site, stories, t, ui } from "@/lib/content";
import { href, type Lang } from "@/lib/routes";

/* The page in the order a person decides in: what she claims, then my problem,
   then how it starts, then what I walk away with, then what it asks of my day,
   then the proof, then the cost, then my questions, then the one ask.

   It used to be fifteen blocks of equal weight, which is the same as none. */

export default function Home({ lang }: { lang: Lang }) {
  const page = absolute(href("home", lang));
  const sample = ailmentBySlug("sugar");
  const shown = stories.slice(0, 3);
  const homeFaq = faqSchema(faq.slice(0, 4).map((f) => ({ q: t(f.q, lang), a: t(f.a, lang) })));

  return (
    <SiteShell lang={lang} routeKey="home" onDawn>
      <Jsonld data={[websiteSchema(lang), personSchema(lang), ...(homeFaq ? [homeFaq] : [])]} />

      {/* 1 · the claim -------------------------------------------------- */}
      <section className="dawn">
        <div
          className="dawn-sun left-1/2 top-[250px] h-[300px] w-[300px] -translate-x-1/2 md:left-[24%] md:top-[300px] md:h-[520px] md:w-[520px]"
          aria-hidden="true"
        />
        <div className="dawn-horizon top-[420px] md:top-[660px]" aria-hidden="true" />
        <div className="wrap relative grid gap-8 pb-9 pt-[84px] md:min-h-[620px] md:grid-cols-[1fr_460px] md:items-center md:gap-12 md:pb-14 md:pt-[104px]">
          <div className="flex flex-col gap-3.5 md:gap-4 md:self-end md:pb-6">
            {/* On a phone the big photograph is off-screen, and her face is
                the strongest thing this audience can be shown. A small one
                sits above the claim; the desktop keeps the full frame. */}
            <Photo
              src=""
              alt={t(site.teacher, lang)}
              label=""
              ratio="1 / 1"
              rounded="rounded-full"
              className="h-[88px] w-[88px] md:hidden"
              sizes="88px"
            />
            <p className="cap font-bold" style={{ color: "var(--color-deeper)" }}>
              <Tx>
                {`${ui("band.morning", lang)} ${t(site.morningTime, lang)} · ${t(site.city, lang)} · ${t(site.sinceYear, lang)} ${lang === "hi" ? "से" : "onwards"} · ${t(site.credentialShort, lang)}`}
              </Tx>
            </p>
            <h1 className="claim">{t(site.claim, lang)}</h1>
            <p className="body max-w-[30em]" style={{ color: "var(--color-heroink)" }}>
              {ui("home.heroLead", lang)}
            </p>
            {/* One ask, not two. The conditions are the next thing on the page. */}
            <Link
              href="#booking-band"
              data-ev="talk_cta"
              data-ev-source="hero"
              className="btn btn-dark self-start"
            >
              {ui("cta.talk", lang)}
            </Link>
            {/* An older reader looks for a number before a button. */}
            {site.contact.phone ? (
              <a
                href={telHref(site.contact.phone)}
                className="tap body inline-flex items-center gap-2 self-start font-bold no-underline"
                style={{ color: "var(--color-kohl)" }}
                data-ev="call_click"
                data-ev-source="hero"
              >
                <PhoneIcon size={20} />
                {ui("nav.call", lang)}: {site.contact.phoneDisplay || site.contact.phone}
              </a>
            ) : null}
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

      {/* 2 · my problem ------------------------------------------------- */}
      <AilmentChooser lang={lang} columns="grid-cols-2 md:grid-cols-4" />

      {/* 3 · how it starts ---------------------------------------------- */}
      <Steps lang={lang} />

      {/* 4 · what I leave with ------------------------------------------ */}
      {sample ? (
        <section style={{ background: "var(--color-apricot)" }}>
          <div className="wrap grid gap-6 py-9 md:grid-cols-2 md:items-center md:gap-12 md:py-14">
            <div className="flex flex-col gap-3">
              <h2 className="h2">{ui("home.slipTitle", lang)}</h2>
              <p className="body max-w-[42ch]" style={{ color: "var(--color-heroink)" }}>
                {ui("home.slipLead", lang)}
              </p>
              <Link href={href("ailment", lang, sample.slug)} className="link-strong self-start body">
                {t(sample.titleFull, lang)}
              </Link>
            </div>
            <Slip lang={lang} ailment={sample} />
          </div>
        </section>
      ) : null}

      {/* 5 · what it asks of my day ------------------------------------- */}
      <Routine lang={lang} />

      {/* 6 · the proof, in one place ------------------------------------ */}
      <section style={{ background: "var(--color-sky)" }}>
        <div className="wrap flex flex-col gap-8 section-pad md:gap-12">
          <div className="flex flex-col gap-4">
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
            <p className="cap">{ui("stories.consent", lang)}</p>
          </div>
          <TeacherBio lang={lang} />
          <RecordLinks lang={lang} />
        </div>
      </section>

      {/* 7 · what it costs ---------------------------------------------- */}
      <section className="wrap flex flex-col gap-4 section-pad">
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

      {/* 8 · my questions ----------------------------------------------- */}
      <section style={{ background: "var(--color-sandal)" }}>
        <div className="wrap flex flex-col gap-3 section-pad">
          <h2 className="h2">{ui("home.faqTitle", lang)}</h2>
          <FaqList items={faq.slice(0, 4)} lang={lang} columns />
        </div>
      </section>

      {/* 9 · the one ask ------------------------------------------------ */}
      <Band lang={lang} routeKey="home" source="home" />
    </SiteShell>
  );
}
