import { A as Link } from "../components/Nav";
import Band from "@/components/Band";
import { AskRow } from "@/components/AskRow";
import { Counters, PressStrip } from "@/components/Warm";
import { DiseaseRows } from "@/components/DiseaseRows";
import { FirstScreen } from "@/components/FirstScreen";
import { Join } from "@/components/Join";
import { Jsonld, personSchema, websiteSchema } from "@/components/Jsonld";
import { Schedule } from "@/components/Schedule";
import SiteShell from "@/components/SiteShell";
import { SlipPad } from "@/components/SlipPad";
import { Steps } from "@/components/Steps";
import { ResultCard } from "@/components/StoryCard";
import { MedicinePanel } from "@/components/Timeline";
import { VideoWall } from "@/components/VideoWall";
import { WhoTeaches } from "@/components/WhoTeaches";
import { stories, ui } from "@/lib/content";
import { href, type Lang } from "@/lib/routes";

/* The home page, in the order a frightened person actually asks things.

   Her face and the promise, then the four counts and the newspapers, so a
   stranger knows within one screen that she is real. Then which illness —
   eight tiles, each carrying a result. Then, third, the question that decides
   everything: do I have to stop my medicine. Only after that the videos, the
   records, the three prices, who she is, when the batches run, and the ask.

   Nothing on the page says buy. It is full of the things somebody checks
   before they will trust a stranger with their diabetes. */

export default function Home({ lang }: { lang: Lang }) {
  const shown = stories.slice(0, 3);

  return (
    <SiteShell lang={lang} routeKey="home">
      <Jsonld data={[websiteSchema(lang), personSchema(lang)]} />

      {/* 1 · her face, the promise, the ask ------------------------------- */}
      <FirstScreen lang={lang} />

      {/* 2 · the counts and the press, lifted onto the fold --------------- */}
      <section className="relative z-[2] -mt-5">
        <div className="wrap flex flex-col gap-7 pb-2">
          <Counters lang={lang} />
          <PressStrip lang={lang} />
        </div>
      </section>

      {/* 3 · which illness — eight tiles, each with a result -------------- */}
      <section>
        <div className="wrap flex flex-col gap-7 section-pad">
          <DiseaseRows lang={lang} />
        </div>
      </section>

      {/* 4 · the question that decides everything ------------------------- */}
      <section>
        <div className="wrap flex flex-col gap-6 pb-8 md:pb-14">
          <MedicinePanel lang={lang} />
          <AskRow lang={lang} note={ui("home.askAfterMedicine", lang)} source="after-medicine" />
        </div>
      </section>

      {/* 5 · students, on video ------------------------------------------- */}
      <section style={{ background: "var(--color-amber-tint)" }}>
        <div className="wrap flex flex-col gap-4 section-pad">
          <div className="flex flex-col gap-1">
            <span className="label" style={{ color: "var(--color-amber-deep)" }}>
              {ui("home.resultsKick", lang)}
            </span>
            <h2 className="h2">{ui("home.videosTitle", lang)}</h2>
            <p className="cap">{ui("home.videosLead", lang)}</p>
          </div>
          <VideoWall lang={lang} />
        </div>
      </section>

      {/* 6 · what the report said ----------------------------------------- */}
      <section>
        <div className="wrap flex flex-col gap-4 section-pad">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="h2">{ui("home.resultsTitle", lang)}</h2>
            <Link href={href("stories", lang)} className="tap whitespace-nowrap font-bold cap">
              {ui("cta.allStories", lang)}
            </Link>
          </div>
          {shown.length > 0 ? (
            <>
              <ul className="cardgrid grid gap-3 md:grid-cols-3 md:gap-5 [&>li]:min-w-0">
                {shown.map((s, i) => (
                  <li key={s.id} className={i === 2 ? "hidden md:grid" : ""}>
                    <ResultCard story={s} lang={lang} />
                  </li>
                ))}
              </ul>
              <p className="cap">{ui("stories.consent", lang)}</p>
              <AskRow lang={lang} note={ui("home.askAfterResults", lang)} source="after-results" proof={false} />
            </>
          ) : (
            <p className="body" style={{ color: "var(--color-heroink)" }}>
              {ui("stories.pending", lang)}
            </p>
          )}
        </div>
      </section>

      {/* 7 · three steps, three prices ------------------------------------ */}
      <section style={{ background: "var(--color-paper)" }}>
        <div className="wrap flex flex-col gap-7 section-pad">
          <div className="flex flex-col gap-1">
            <span className="label" style={{ color: "var(--color-amber-deep)" }}>
              {ui("home.stepsKick", lang)}
            </span>
            <h2 className="h2">{ui("home.stepsTitle", lang)}</h2>
          </div>
          <Steps lang={lang} />
          {/* The five things this used to list beside the slip are gone.

              Every one of them was already in the three steps above — three
              of them word for word ("रोज़ की लाइव क्लास", "व्हाट्सऐप पर रोज़
              साथ", "हर 60 दिन जाँच") — and step 2's contents were then drawn
              a third time on the slip itself. 198 words in this one section,
              a fifth of the whole page, saying one thing three ways.

              They were put here in the first place to fill the empty half of
              a two-column grid, which was the right problem and the wrong
              answer: the fix for an empty column is not more words, it is
              not having the column. The slip stands on its own now, which is
              what it was always the strongest version of. */}
          <div className="flex flex-col items-center gap-2.5 text-center">
            <h3 className="h3">{ui("home.slipTitle", lang)}</h3>
            <p className="body max-w-[46ch]">{ui("home.slipLead", lang)}</p>
            <div className="w-full pt-1 md:max-w-[420px]">
              <SlipPad lang={lang} compact edge="var(--color-paper)" />
            </div>
            <p className="cap max-w-[52ch]">{ui("slip.afterTalk", lang)}</p>
          </div>
        </div>
      </section>

      {/* 8 · who teaches --------------------------------------------------- */}
      <section>
        <div className="wrap section-pad">
          <WhoTeaches lang={lang} />
        </div>
      </section>

      {/* 9 · when it runs, and how many places are left ------------------- */}
      <section style={{ background: "var(--color-paper)" }}>
        <div className="wrap flex flex-col gap-4 section-pad">
          <div className="flex flex-col gap-1">
            <span className="label" style={{ color: "var(--color-amber-deep)" }}>
              {ui("home.schedTitle", lang)}
            </span>
            <h2 className="h2">{ui("home.whichBatch", lang)}</h2>
            {/* rolling admission is the honest version of urgency: there is no
                date to wait for, so a reader who decides today starts this week */}
            <p className="cap">{ui("batches.rollingLead", lang)}</p>
          </div>
          <Schedule lang={lang} />
        </div>
      </section>

      {/* 10 · for the reader who has already decided ---------------------- */}
      {/* Everything above this asks for a conversation, because almost
          everybody who arrives is frightened and needs to hear they can keep
          their medicine. A few have decided already — a neighbour sent them,
          or they have watched her for a month — and for those people another
          "message her and wait" is a wall. This is the one block that takes
          money in a tap, and it still carries the two ways to talk. */}
      {/* #join is a real address: a link she pastes into a WhatsApp reply
          lands the reader on the payment block rather than the top of a
          page they have already read. */}
      <section id="join" style={{ scrollMarginTop: "84px" }}>
        <div className="wrap flex flex-col gap-5 section-pad">
          <div className="flex flex-col gap-1">
            <span className="label" style={{ color: "var(--color-amber-deep)" }}>
              {ui("pay.lead", lang)}
            </span>
            <h2 className="h2">{ui("pay.title", lang)}</h2>
          </div>
          <Join lang={lang} source="home-join" />
        </div>
      </section>

      {/* 11 · the one ask -------------------------------------------------- */}
      <Band lang={lang} routeKey="home" source="home" />
    </SiteShell>
  );
}
