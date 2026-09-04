import { groupBatches, t, ui } from "@/lib/content";
import { href, type Lang } from "@/lib/routes";
import { A as Link } from "./Nav";
import { Tx } from "./Tx";

/* The batches: when they run, what they cost, and what a second person saves.

   This block was first built around a start date and a number of seats left,
   because those are the honest urgency most timetables have. This one has
   neither — the class is online, admission is rolling and there is no cap — so
   both are gone rather than invented. What is true is better anyway: there is
   no date to wait for. A reader who decides today starts this week. */

export function Schedule({ lang }: { lang: Lang }) {
  const shown = groupBatches.slice(0, 2);
  if (shown.length === 0) return null;
  const family = t(shown.find((b) => t(b.familyDiscount, lang))?.familyDiscount, lang);
  const threeMonths = t(shown.find((b) => t(b.firstMonthOffer, lang))?.firstMonthOffer, lang);

  return (
    <div className="sched">
      {shown.map((b) => {
        return (
        <div className="r" key={b.id}>
          <div className="min-w-0">
            <p className="h3">
              <span className="live" aria-hidden="true" />
              {t(b.name, lang)}
            </p>
            <p className="cap">
              <Tx>
                {[
                  t(b.when, lang),
                  b.minutes ? ui("batches.minutes", lang).replace("{m}", b.minutes) : "",
                  ui("batches.rolling", lang),
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </Tx>
            </p>
          </div>
          <div className="flex-none text-right">
            <p className="num point-sm">
              <Tx>{`₹${b.price}`}</Tx>
            </p>
            <p className="cap">
              <Tx>{t(b.priceUnit, lang)}</Tx>
            </p>
          </div>
        </div>
        );
      })}
      <div className="r" style={{ background: "var(--color-amber-tint)" }}>
        <p className="cap" style={{ color: "var(--color-amber-deep)", fontWeight: 700 }}>
          <Tx>{[family, threeMonths].filter(Boolean).join(" · ")}</Tx>
        </p>
        <Link href={href("batches", lang)} className="tap flex-none font-bold underline underline-offset-4 cap">
          {ui("cta.seeBatches", lang)}
        </Link>
      </div>
    </div>
  );
}
