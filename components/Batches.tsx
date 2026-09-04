import { type Batch, site, t, ui } from "@/lib/content";
import { payHref } from "@/lib/pay";
import type { Lang } from "@/lib/routes";
import { waHref, waMessage } from "@/lib/whatsapp";
import { DayChips } from "./Timetable";
import { Tx } from "./Tx";

/* The payment page if she has one, and WhatsApp until she does. `pays` tells
   the button which of the two it turned out to be, because a link that takes
   money should not look like a link that opens a chat. */
export function joinHref(batch: Batch, lang: Lang, page: string): { href: string; pays: boolean } {
  const pay = payHref({ batchId: batch.id, own: batch.joinLink, kind: "join" });
  if (pay) return { href: pay, pays: true };
  const kind = batch.type === "workshop" ? "workshop" : batch.type === "private" ? "private" : "batch";
  return {
    href: waHref(site.contact.whatsapp, waMessage({ lang, kind, batch: t(batch.name, lang), page })),
    pays: false,
  };
}

function JoinButton({ batch, lang, page, outline = false }: { batch: Batch; lang: Lang; page: string; outline?: boolean }) {
  const join = joinHref(batch, lang, page);
  return (
    <a
      href={join.href}
      target={join.pays ? undefined : "_blank"}
      rel={join.pays ? "noopener" : "noopener noreferrer"}
      data-ev={join.pays ? "pay_click" : "batch_join_click"}
      data-ev-batch={batch.id}
      data-ev-source="batches"
      className={`btn w-full ${outline ? "btn-outline" : "btn-primary"}`}
    >
      {join.pays ? ui("cta.payJoin", lang) : ui("batches.talkAboutBatch", lang)}
    </a>
  );
}

/* A group batch: the week, two times, one fee. The first card is saffron
   and its button solid; the second is sky and its button outlined, so the
   page reads as one choice between two, not two adverts. */
export function GroupBatchCard({ batch, lang, page, first = false }: { batch: Batch; lang: Lang; page: string; first?: boolean }) {
  const meta = [
    t(batch.nextStart, lang).trim() ? ui("batches.nextFrom", lang).replace("{d}", t(batch.nextStart, lang)) : "",
    batch.seats.trim() ? ui("batches.seatsLeft", lang).replace("{n}", batch.seats) : "",
  ].filter(Boolean);
  return (
    <article className="card overflow-hidden p-0">
      <div
        className="flex items-start justify-between gap-3 px-4 pb-3 pt-4"
        style={{ background: first ? "var(--color-apricot)" : "var(--color-sky)" }}
      >
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2 className="h2">{t(batch.name, lang)}</h2>
          <p className="num h3" style={{ color: "var(--color-deep)" }}>
            <Tx>{`${t(batch.start, lang)} · ${ui("batches.minutes", lang).replace("{m}", batch.minutes)}`}</Tx>
          </p>
        </div>
        <div className="flex-none text-right">
          <p className="num page-title">
            <Tx>{`₹${batch.price}`}</Tx>
          </p>
          <p className="cap">{t(batch.priceUnit, lang)}</p>
        </div>
      </div>
      <div className="border-t border-rule px-4 py-3">
        <DayChips daysOn={batch.daysOn} lang={lang} />
        {batch.daysOn.length === 0 ? (
          <p className="cap pt-2">
            <Tx>{t(batch.days, lang)}</Tx>
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-1.5 border-t border-rule px-4 py-3">
        <p className="body">
          <Tx>{t(batch.note, lang)}</Tx>
        </p>
        {meta.length > 0 ? (
          <p className="cap">
            <Tx>{meta.join(" · ")}</Tx>
          </p>
        ) : null}
      </div>
      <div className="px-4 pb-4">
        <JoinButton batch={batch} lang={lang} page={page} outline={!first} />
      </div>
      {payHref({ batchId: batch.id, own: batch.joinLink, kind: "join" }) ? (
        <p className="cap px-4 pb-4 -mt-2">{ui("pay.note", lang)}</p>
      ) : null}
    </article>
  );
}

/* One to one, and a camp when there is one: name, price, two lines. */
export function SmallBatchCard({ batch, lang, page }: { batch: Batch; lang: Lang; page: string }) {
  const head =
    batch.type === "workshop"
      ? [t(batch.date, lang), t(batch.when, lang)].filter((x) => x.trim()).join(" · ")
      : "";
  return (
    <article className="card flex flex-col gap-2.5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-0.5">
          {head ? (
            <p className="cap">
              <Tx>{head}</Tx>
            </p>
          ) : null}
          <h2 className="h2">
            <Tx>{t(batch.name, lang)}</Tx>
          </h2>
        </div>
        <div className="flex-none text-right">
          <p className="num h2">
            <Tx>{`₹${batch.price}`}</Tx>
          </p>
          <p className="cap">{t(batch.priceUnit, lang) || (batch.seats ? ui("batches.workshopSeats", lang).replace("{n}", batch.seats) : "")}</p>
        </div>
      </div>
      {t(batch.note, lang).trim() ? (
        <p className="body">
          <Tx>{t(batch.note, lang)}</Tx>
        </p>
      ) : null}
      <JoinButton batch={batch} lang={lang} page={page} outline />
    </article>
  );
}

/* One class as a bar: ten, thirty, ten. The widths follow the minutes. */
export function SessionBar({ rows, lang }: { rows: Batch["session"]; lang: Lang }) {
  if (rows.length === 0) return null;
  const weight = (m: string) => Math.max(1, Number(m.replace(/[^\d]/g, "")) || 1);
  return (
    <ol className="flex items-stretch overflow-hidden rounded-[14px] border border-rule">
      {rows.map((r, i) => {
        const main = i === Math.floor(rows.length / 2);
        return (
          <li
            key={i}
            className={`flex min-w-0 flex-col gap-0.5 px-2.5 py-3 ${main ? "on-bhagwa" : ""}`}
            style={{ flex: weight(r.minutes), background: main ? "var(--color-bhagwa)" : "var(--color-apricot)" }}
          >
            <span className="num h2" style={main ? { color: "var(--color-deeper)" } : undefined}>
              <Tx>{r.minutes}</Tx>
            </span>
            <span className="cap" style={main ? { color: "var(--color-deeper)" } : undefined}>
              <Tx>{t(r.text, lang)}</Tx>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/* The money, said once: per day, two from one home, how, a missed class, refund. */
export function FeeFacts({ batch, lang }: { batch: Batch; lang: Lang }) {
  const rows: [string, string][] = [
    [ui("batches.perDayRow", lang), batch.perDay ? ui("batches.perDayValue", lang).replace("{r}", batch.perDay) : ""],
    [ui("batches.familyRow", lang), t(batch.familyDiscount, lang).replace(/^.*?:\s*/, "")],
    [ui("batches.howRow", lang), ui("batches.howValue", lang)],
    [ui("batches.missedRow", lang), t(site.missedClass, lang)],
    [ui("batches.refundRow", lang), t(batch.refundLine, lang)],
  ];
  return (
    <dl className="flex flex-col border-t border-rule">
      {rows
        .filter(([, v]) => v.trim() !== "")
        .map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-3 border-b border-rule py-3">
            <dt className="body">{k}</dt>
            <dd className="body text-right font-bold">
              <Tx>{v}</Tx>
            </dd>
          </div>
        ))}
    </dl>
  );
}
