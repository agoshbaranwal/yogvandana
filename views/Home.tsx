import Link from "next/link";
import Band from "@/components/Band";
import { DiseaseRows } from "@/components/DiseaseRows";
import { FirstScreen } from "@/components/FirstScreen";
import { Jsonld, personSchema, websiteSchema } from "@/components/Jsonld";
import PrintSlip from "@/components/PrintSlip";
import ShareSlip from "@/components/ShareSlip";
import SiteShell from "@/components/SiteShell";
import { SlipPad } from "@/components/SlipPad";
import { ResultCard } from "@/components/StoryCard";
import { NextSteps } from "@/components/Timeline";
import { Timetable } from "@/components/Timetable";
import { WhoTeaches } from "@/components/WhoTeaches";
import { absolute, ailmentBySlug, site, stories, t, ui } from "@/lib/content";
import { href, type Lang } from "@/lib/routes";

/* The home page, in the order a person with a disease decides: her face and
   the promise, which disease, what happens next and what about the medicine,
   the proof in the report's own numbers, the slip they leave with, the
   timetable and the fee, who teaches, and the one ask. Eight screens on a
   phone, each one thing. */

export default function Home({ lang }: { lang: Lang }) {
  const page = absolute(href("home", lang));
  const sample = ailmentBySlug("sugar");
  const shown = stories.slice(0, 3);

  return (
    <SiteShell lang={lang} routeKey="home" overlay>
      <Jsonld data={[websiteSchema(lang), personSchema(lang)]} />

      {/* 1 · her face, the promise, a number ------------------------------ */}
      <FirstScreen lang={lang} />

      {/* 2 · which disease, and what happens next ------------------------- */}
      <section>
        <div className="wrap flex flex-col gap-2 py-6 md:grid md:grid-cols-[1.3fr_1fr] md:gap-14 md:py-16">
          <DiseaseRows lang={lang} />
          <NextSteps lang={lang} />
        </div>
      </section>

      {/* 3 · the proof, in the report's own numbers ----------------------- */}
      <section style={{ background: "var(--color-sky)" }}>
        <div className="wrap flex flex-col gap-3.5 section-pad">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="h2">{ui("home.resultsTitle", lang)}</h2>
            <Link href={href("stories", lang)} className="tap whitespace-nowrap font-bold cap">
              {ui("cta.allStories", lang)}
            </Link>
          </div>
          <ul className="grid gap-3 md:grid-cols-3 md:gap-5">
            {shown.map((s, i) => (
              <li key={s.id} className={i === 2 ? "hidden md:block" : ""}>
                <ResultCard story={s} lang={lang} showVideo={i === 0} />
              </li>
            ))}
          </ul>
          <p className="cap">{ui("stories.consent", lang)}</p>
        </div>
      </section>

      {/* 4 · the slip they leave with -------------------------------------- */}
      {sample ? (
        <section>
          <div className="wrap grid gap-4 section-pad md:grid-cols-2 md:items-center md:gap-14">
            <div className="flex flex-col gap-3">
              <h2 className="h2">{ui("home.slipTitle", lang)}</h2>
              <p className="body max-w-[46ch]" style={{ color: "var(--color-heroink)" }}>
                {ui("home.slipLead", lang)}
              </p>
              <div className="hidden flex-wrap items-center gap-x-6 gap-y-2 md:flex">
                <PrintSlip label={ui("slip.printSample", lang)} />
                <ShareSlip
                  label={ui("slip.share", lang)}
                  title={`${ui("slip.title", lang)} — ${t(site.brand, lang)}`}
                  url={page}
                  source="home-slip"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <SlipPad lang={lang} ailment={sample} compact edge="var(--color-ivory)" />
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 md:hidden">
                <PrintSlip label={ui("slip.printSample", lang)} />
                <ShareSlip
                  label={ui("slip.share", lang)}
                  title={`${ui("slip.title", lang)} — ${t(site.brand, lang)}`}
                  url={page}
                  source="home-slip"
                />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* 5 · the timetable and the fee ------------------------------------ */}
      <section style={{ background: "var(--color-apricot)" }}>
        <div className="wrap flex flex-col gap-3.5 section-pad md:max-w-[880px]">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="h2">{ui("home.batchesTitle", lang)}</h2>
            <Link href={href("batches", lang)} className="tap whitespace-nowrap font-bold cap">
              {ui("home.fullDetail", lang)}
            </Link>
          </div>
          <Timetable lang={lang} />
        </div>
      </section>

      {/* 6 · who teaches ---------------------------------------------------- */}
      <section>
        <div className="wrap section-pad">
          <WhoTeaches lang={lang} />
        </div>
      </section>

      {/* 7 · the one ask ---------------------------------------------------- */}
      <Band lang={lang} routeKey="home" source="home" />
    </SiteShell>
  );
}
