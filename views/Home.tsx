import Link from "next/link";
import Band from "@/components/Band";
import { DiseaseRows } from "@/components/DiseaseRows";
import { FirstScreen } from "@/components/FirstScreen";
import { Jsonld, personSchema, websiteSchema } from "@/components/Jsonld";
import SiteShell from "@/components/SiteShell";
import { SlipPad } from "@/components/SlipPad";
import { WhatYouGet } from "@/components/WhatYouGet";
import { ResultCard } from "@/components/StoryCard";
import { MedicinePanel } from "@/components/Timeline";
import { WhoTeaches } from "@/components/WhoTeaches";
import { stories, ui } from "@/lib/content";
import { href, type Lang } from "@/lib/routes";

/* The home page, in the order a person with a disease decides: her face and
   the promise, which disease, what happens next and what about the medicine,
   the proof in the report's own numbers, the slip they leave with, the
   timetable and the fee, who teaches, and the one ask. Eight screens on a
   phone, each one thing. */

export default function Home({ lang }: { lang: Lang }) {
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
          <div className="pt-2 md:pt-12">
            <MedicinePanel lang={lang} />
          </div>
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
          <ul className="grid gap-3 md:grid-cols-3 md:gap-5 [&>li]:min-w-0">
            {shown.map((s, i) => (
              <li key={s.id} className={i === 2 ? "hidden md:block" : ""}>
                <ResultCard story={s} lang={lang} showVideo={i === 0} />
              </li>
            ))}
          </ul>
          <p className="cap">{ui("stories.consent", lang)}</p>
        </div>
      </section>

      {/* 4 · what you get, and the slip at the head of it ---------------- */}
      <section className="border-t border-rule">
        <div className="wrap grid gap-6 section-pad md:grid-cols-2 md:items-start md:gap-14">
          <div className="flex flex-col gap-5">
            <WhatYouGet lang={lang} />
            <Link href="#booking-band" data-ev="talk_cta" data-ev-source="what-you-get" className="btn btn-primary self-start">
              {ui("cta.talk", lang)}
            </Link>
          </div>
          <div className="flex flex-col gap-2.5">
            <SlipPad lang={lang} compact edge="var(--color-ivory)" />
            <p className="cap">{ui("slip.afterTalk", lang)}</p>
          </div>
        </div>
      </section>

      {/* 5 · who teaches ---------------------------------------------------- */}
      <section className="border-t border-rule">
        <div className="wrap section-pad">
          <WhoTeaches lang={lang} />
        </div>
      </section>

      {/* 6 · the one ask ---------------------------------------------------- */}
      <Band lang={lang} routeKey="home" source="home" />
    </SiteShell>
  );
}
