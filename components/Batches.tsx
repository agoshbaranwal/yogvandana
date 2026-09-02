import { type Batch, site, t, ui } from "@/lib/content";
import type { Lang } from "@/lib/routes";
import { waHref, waMessage } from "@/lib/whatsapp";
import { Tx } from "./Tx";

/* A price a person can weigh: the month, and what that comes to in a day. */

function joinHref(batch: Batch, lang: Lang, page: string) {
  if (batch.joinLink) return batch.joinLink;
  const kind = batch.type === "workshop" ? "workshop" : batch.type === "private" ? "private" : "batch";
  return waHref(
    site.contact.whatsapp,
    waMessage({ lang, kind, batch: t(batch.name, lang), page }),
  );
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
        href={joinHref(batch, lang, page)}
        target={batch.joinLink ? undefined : "_blank"}
        rel={batch.joinLink ? undefined : "noopener noreferrer"}
        data-ev="batch_join_click"
        data-ev-batch={batch.id}
        data-ev-source="home"
        className={`btn btn-sm whitespace-nowrap ${isPrivate ? "btn-outline" : "btn-primary"}`}
      >
        {isPrivate ? ui("cta.bookSession", lang) : ui("cta.join", lang)}
      </a>
    </div>
  );
}

export function BatchCard({
  batch,
  lang,
  page,
}: {
  batch: Batch;
  lang: Lang;
  page: string;
}) {
  const money = `₹${batch.price}`;
  const perDay = batch.perDay
    ? `${ui("batches.perDay", lang)} ₹${batch.perDay} ${ui("batches.perDayTail", lang)}${lang === "hi" ? "।" : "."}`
    : "";
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
            className="rounded-full px-2.5 py-1 text-[12px] font-bold"
            style={{ background: "var(--color-apricot)" }}
          >
            {ui("batches.nextStart", lang)} <Tx>{t(batch.nextStart, lang)}</Tx>
          </span>
        ) : null}
        {batch.seats ? (
          <span
            className="rounded-full px-2.5 py-1 text-[12px] font-bold"
            style={{ background: "var(--color-apricot)" }}
          >
            <Tx>{batch.seats}</Tx> {ui("batches.seats", lang)}
          </span>
        ) : null}
      </div>

      <p className="h3 text-[21px] md:text-[24px]">
        <Tx>{batch.type === "workshop" ? t(batch.name, lang) : t(batch.when, lang)}</Tx>
      </p>
      <p className="text-[16px]" style={{ color: "var(--color-muted)" }}>
        <Tx>{t(batch.level, lang)}</Tx>
      </p>
      {t(batch.note, lang).trim() !== "" ? (
        <p className="text-[16px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
          <Tx>{t(batch.note, lang)}</Tx>
        </p>
      ) : null}

      {batch.session.length > 0 ? (
        <div className="flex flex-col gap-1">
          <p className="label">{ui("batches.inSession", lang)}</p>
          <ul className="ml-5 list-disc text-[16px] leading-relaxed">
            {batch.session.map((row, i) => (
              <li key={i}>
                <Tx>{t(row, lang)}</Tx>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-1 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-3">
        <p className="num text-[22px] md:text-[24px]">
          <Tx>{money}</Tx>{" "}
          <span className="text-[14px] font-semibold" style={{ color: "var(--color-muted)", fontFamily: "var(--font-body)" }}>
            {t(batch.priceUnit, lang)}
          </span>
        </p>
        <a
          href={joinHref(batch, lang, page)}
          target={batch.joinLink ? undefined : "_blank"}
          rel={batch.joinLink ? undefined : "noopener noreferrer"}
          data-ev="batch_join_click"
          data-ev-batch={batch.id}
          data-ev-source="batches"
          className={`btn btn-sm ${batch.type === "private" ? "btn-outline" : "btn-primary"}`}
        >
          {batch.type === "workshop"
            ? ui("cta.reserveSeat", lang)
            : batch.type === "private"
              ? ui("cta.pickTime", lang)
              : ui("cta.joinBatch", lang)}
        </a>
      </div>

      {perDay || extras.length > 0 || t(batch.payLine, lang) ? (
        <p className="cap">
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
