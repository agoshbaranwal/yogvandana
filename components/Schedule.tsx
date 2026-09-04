import { groupBatches, t, ui } from "@/lib/content";
import { href, type Lang } from "@/lib/routes";
import { A as Link } from "./Nav";
import { Tx } from "./Tx";

/* The batches, as a thing with times and a number of seats.

   Every fact on this block was already in content/batches and never reached
   the home page: when it starts, how long it runs, what it costs, how many
   places are left, and whether two people from one house get something. A
   start date and a seat count are urgency you do not have to invent — so long
   as they are true, which is why each one disappears when it is still blank. */

export function Schedule({ lang }: { lang: Lang }) {
  const shown = groupBatches.slice(0, 2);
  if (shown.length === 0) return null;
  const family = t(shown.find((b) => t(b.familyDiscount, lang))?.familyDiscount, lang);

  return (
    <div className="sched">
      {shown.map((b) => {
        const nextStart = t(b.nextStart, lang);
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
                  nextStart ? ui("batches.nextFrom", lang).replace("{d}", nextStart) : "",
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
              <Tx>
                {b.seats ? ui("batches.seatsLeft", lang).replace("{n}", b.seats) : t(b.priceUnit, lang)}
              </Tx>
            </p>
          </div>
        </div>
        );
      })}
      <div className="r" style={{ background: "var(--color-amber-tint)" }}>
        <p className="cap" style={{ color: "var(--color-amber-deep)", fontWeight: 700 }}>
          <Tx>
            {family
              ? `${ui("batches.familyRow", lang)} — ${family}`
              : ui("batches.youChoose", lang)}
          </Tx>
        </p>
        <Link href={href("batches", lang)} className="tap flex-none font-bold underline underline-offset-4 cap">
          {ui("cta.seeBatches", lang)}
        </Link>
      </div>
    </div>
  );
}
