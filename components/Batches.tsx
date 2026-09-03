import { type Batch, site, t, ui } from "@/lib/content";
import { payHref } from "@/lib/pay";
import type { Lang } from "@/lib/routes";
import { waHref, waMessage } from "@/lib/whatsapp";
import { Tx } from "./Tx";

/* A price a person can weigh: the month, and what that comes to in a day. */

/* The payment page if she has one, and WhatsApp until she does. `pays` tells
   the button which of the two it turned out to be, because a link that takes
   money should not look like a link that opens a chat. */
function joinHref(batch: Batch, lang: Lang, page: string): { href: string; pays: boolean } {
  const pay = payHref({ batchId: batch.id, own: batch.joinLink, kind: "join" });
  if (pay) return { href: pay, pays: true };
  const kind = batch.type === "workshop" ? "workshop" : batch.type === "private" ? "private" : "batch";
  return {
    href: waHref(site.contact.whatsapp, waMessage({ lang, kind, batch: t(batch.name, lang), page })),
    pays: false,
  };
}

export function BatchRow({
  batch,
  lang,
  page,
}: {
  batch: Batch;
  lang: Lang;
  page: string;
}) {
  const isPrivate = batch.type !== "group";
  const join = joinHref(batch, lang, page);
  return (
    <div className="card flex items-center justify-between gap-3">
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="h3">
          <Tx>{batch.type === "workshop" ? t(batch.name, lang) : t(batch.when, lang)}</Tx>
        </p>
        <p className="cap">
          <Tx>
            {batch.type === "group"
              ? `${t(batch.days, lang)} · ₹${batch.price} ${t(batch.priceUnit, lang)}`
              : `${t(batch.level, lang)} · ₹${batch.price} ${t(batch.priceUnit, lang)}`}
          </Tx>
        </p>
      </div>
      <a
        href={join.href}
        target={join.pays ? undefined : "_blank"}
        rel={join.pays ? "noopener" : "noopener noreferrer"}
        data-ev={join.pays ? "pay_click" : "batch_join_click"}
        data-ev-batch={batch.id}
        data-ev-source="home"
        className={`btn btn-sm whitespace-nowrap ${isPrivate ? "btn-outline" : "btn-primary"}`}
      >
        {join.pays ? ui("cta.pay", lang) : ui("cta.talk", lang)}
      </a>
    </div>
  );
}

/* Every group batch runs to the same shape — ten minutes of warm-up, thirty of
   asana, ten of breath. Printed on each card it is the same paragraph charged
   to the reader three times, so it is said once above them instead. */
export function sharedSession(list: Batch[], lang: Lang): string[] | null {
  const withRows = list.filter((b) => b.session.length > 0);
  if (withRows.length < 2) return null;
  const first = withRows[0].session.map((r) => t(r, lang));
  const same = withRows.every(
    (b) =>
      b.session.length === first.length &&
      b.session.every((r, i) => t(r, lang) === first[i]),
  );
  return same ? first : null;
}

export function SharedSession({ rows, lang }: { rows: string[]; lang: Lang }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="label">{ui("batches.inSession", lang)}</p>
      <ul className="ml-5 flex list-disc flex-wrap gap-x-8 gap-y-0.5 body">
        {rows.map((row, i) => (
          <li key={i}>
            <Tx>{row}</Tx>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BatchCard({
  batch,
  lang,
  page,
  hideSession = false,
}: {
  batch: Batch;
  lang: Lang;
  page: string;
  hideSession?: boolean;
}) {
  const money = `₹${batch.price}`;
  const perDay = batch.perDay
    ? `${ui("batches.perDay", lang)} ₹${batch.perDay} ${ui("batches.perDayTail", lang)}${lang === "hi" ? "।" : "."}`
    : "";
  const join = joinHref(batch, lang, page);
  const extras = [
    t(batch.familyDiscount, lang),
    t(batch.firstMonthOffer, lang),
    t(batch.refundLine, lang),
  ].filter((x) => x.trim() !== "");

  return (
    <article className="card flex flex-col gap-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="label" style={{ color: "var(--color-deep)" }}>
          {batch.type === "workshop" ? (
            <Tx>{`${t(batch.date, lang)} · ${t(batch.when, lang)}`}</Tx>
          ) : (
            t(batch.name, lang)
          )}
        </p>
        {t(batch.nextStart, lang).trim() !== "" ? (
          <span
            className="rounded-full px-2.5 py-1 font-bold cap"
            style={{ background: "var(--color-apricot)" }}
          >
            {ui("batches.nextStart", lang)} <Tx>{t(batch.nextStart, lang)}</Tx>
          </span>
        ) : null}
        {batch.seats ? (
          <span
            className="rounded-full px-2.5 py-1 font-bold cap"
            style={{ background: "var(--color-apricot)" }}
          >
            <Tx>{batch.seats}</Tx> {ui("batches.seats", lang)}
          </span>
        ) : null}
      </div>

      <p className="h3">
        <Tx>{batch.type === "workshop" ? t(batch.name, lang) : t(batch.when, lang)}</Tx>
      </p>
      <p className="cap">
        <Tx>{t(batch.level, lang)}</Tx>
      </p>
      {t(batch.note, lang).trim() !== "" ? (
        <p className="body">
          <Tx>{t(batch.note, lang)}</Tx>
        </p>
      ) : null}

      {batch.session.length > 0 && !hideSession ? (
        <div className="flex flex-col gap-1">
          <p className="label">{ui("batches.inSession", lang)}</p>
          <ul className="ml-5 list-disc body">
            {batch.session.map((row, i) => (
              <li key={i}>
                <Tx>{t(row, lang)}</Tx>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-1 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-3">
        {/* The reason the page was opened. Larger than the button beside it. */}
        <p className="num h2">
          <Tx>{money}</Tx>{" "}
          <span className="cap font-bold" style={{ color: "var(--color-muted)" }}>
            {t(batch.priceUnit, lang)}
          </span>
        </p>
        <a
          href={join.href}
          target={join.pays ? undefined : "_blank"}
          rel={join.pays ? "noopener" : "noopener noreferrer"}
          data-ev={join.pays ? "pay_click" : "batch_join_click"}
          data-ev-batch={batch.id}
          data-ev-source="batches"
          className={`btn btn-sm ${batch.type === "private" ? "btn-outline" : "btn-primary"}`}
        >
          {join.pays
            ? batch.type === "group"
              ? ui("cta.payJoin", lang)
              : ui("cta.pay", lang)
            : ui("cta.talk", lang)}
        </a>
      </div>
      {/* What the button is about to do, said before it is pressed. */}
      {join.pays ? <p className="cap">{ui("pay.note", lang)}</p> : null}

      {perDay || extras.length > 0 || t(batch.payLine, lang) ? (
        <p className="body">
          {perDay ? (
            <>
              <Tx>{perDay}</Tx>{" "}
            </>
          ) : null}
          <Tx>{[t(batch.payLine, lang), ...extras].filter(Boolean).join(" ")}</Tx>
        </p>
      ) : null}
    </article>
  );
}
