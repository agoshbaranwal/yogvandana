import Link from "next/link";
import { type Batch, batches, t, ui } from "@/lib/content";
import type { Lang } from "@/lib/routes";
import { Tx } from "./Tx";

/* The week, drawn: seven circles, the days she teaches filled in. Until the
   days are confirmed all seven stay blank rather than showing a guessed week. */
export function DayChips({ daysOn, lang }: { daysOn: number[]; lang: Lang }) {
  const letters = ui("batches.dayLetters", lang).split(" ");
  const names = ui("batches.dayNames", lang).split(" ");
  return (
    <ul className="flex items-center justify-between" aria-label={ui("batches.colDays", lang)}>
      {letters.map((l, i) => {
        const on = daysOn.includes(i);
        return (
          <li key={i} className={`day ${on ? "on" : "off"}`} aria-label={names[i]} title={names[i]}>
            {l}
          </li>
        );
      })}
    </ul>
  );
}

function shortName(b: Batch, lang: Lang): string {
  if (b.id === "morning") return ui("band.morning", lang);
  if (b.id === "evening") return ui("band.evening", lang);
  return t(b.name, lang);
}

/* The home page's timetable: two times, the days, one fee, and the money
   said once underneath. */
export function Timetable({ lang, talkHref = "#booking-band" }: { lang: Lang; talkHref?: string }) {
  const group = batches.filter((b) => b.type === "group");
  const first = group[0];
  const sum = first
    ? ui("home.sumLine", lang)
        .replace("{r}", first.perDay)
        .replace("{pay}", t(first.payLine, lang))
        .replace("{family}", t(first.familyDiscount, lang))
    : "";
  const cols = "grid grid-cols-[1.1fr_1fr_1fr] items-center gap-2 px-4";
  return (
    <div className="card overflow-hidden p-0">
      <div className={`${cols} py-2.5`} style={{ background: "var(--color-sky)" }} aria-hidden="true">
        <p className="label">{ui("batches.colBatch", lang)}</p>
        <p className="label">{ui("batches.colDays", lang)}</p>
        <p className="label text-right">{ui("batches.colFee", lang)}</p>
      </div>
      {group.map((b) => (
        <div key={b.id} className={`${cols} border-t border-rule py-3.5`}>
          <div className="flex min-w-0 flex-col">
            <p className="h3">{shortName(b, lang)}</p>
            <p className="cap num font-normal">
              <Tx>{`${ui("batches.atTime", lang).replace("{t}", t(b.start, lang))} · ${ui("batches.minutes", lang).replace("{m}", b.minutes)}`}</Tx>
            </p>
          </div>
          <p className="body">
            <Tx>{t(b.days, lang)}</Tx>
          </p>
          <div className="text-right">
            <p className="num h2">
              <Tx>{`₹${b.price}`}</Tx>
            </p>
            <p className="cap">{t(b.priceUnit, lang)}</p>
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-2.5 border-t border-rule px-4 pb-4 pt-3">
        {sum ? (
          <p className="cap">
            <Tx>{sum}</Tx>
          </p>
        ) : null}
        <Link href={talkHref} data-ev="talk_cta" data-ev-source="timetable" className="btn btn-outline">
          {ui("home.whichBatch", lang)}
        </Link>
      </div>
    </div>
  );
}
