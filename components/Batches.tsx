import { type Batch, isTodo, site, t, ui } from "@/lib/content";
import { payHref, payWays, upiHref } from "@/lib/pay";
import type { Lang } from "@/lib/routes";
import { waHref, waMessage } from "@/lib/whatsapp";
import { DayChips } from "./Timetable";
import { Tx } from "./Tx";

/* The payment page if she has one, and WhatsApp until she does. `pays` tells
   the button which of the two it turned out to be, because a link that takes
   money should not look like a link that opens a chat. */
/* The three ways to start paying, in the order of who can use them: her
   payment page, her UPI id, and — until either exists — WhatsApp, carrying a
   message that already names the batch and asks the fee question, so her
   reply is a number rather than another question.

   This page is called "बैच और शुल्क" and it is the one in the navigation, so
   it is where somebody who has decided goes looking. It used to offer them
   "वंदना जी से बात करें" and nothing else. */
export function joinHref(batch: Batch, lang: Lang, page: string): { href: string; onsite: boolean } {
  const pay = payHref({ batchId: batch.id, own: batch.joinLink, kind: "join" });
  if (pay) return { href: pay, onsite: true };
  const upi = upiHref({ amount: batch.price, note: `Yog Vandana ${batch.id}` });
  if (upi) return { href: upi, onsite: true };
  const kind = batch.type === "workshop" ? "workshop" : batch.type === "private" ? "private" : "join";
  return {
    href: waHref(site.contact.whatsapp, waMessage({ lang, kind, batch: t(batch.name, lang), page })),
    onsite: false,
  };
}

function JoinButton({ batch, lang, page, outline = false }: { batch: Batch; lang: Lang; page: string; outline?: boolean }) {
  const join = joinHref(batch, lang, page);
  /* A one-to-one class has no fixed fee to pay yet, so that card still asks
     for a conversation; a group batch has a price on it and offers to take
     it. Either way the button leads somewhere. */
  const buys = batch.type !== "private";
  return (
    <a
      href={join.href}
      target={join.onsite ? undefined : "_blank"}
      rel={join.onsite ? "noopener" : "noopener noreferrer"}
      data-ev={buys ? "pay_click" : "batch_join_click"}
      data-ev-batch={batch.id}
      data-ev-source="batches"
      className={`btn btn-block ${outline ? "btn-outline" : "btn-primary"}`}
    >
      {buys ? ui("cta.payJoin", lang) : ui("cta.talk", lang)}
    </a>
  );
}

/* A fee still to be decided is not a fee. `₹${price}` printed "₹शुल्क" on the
   one-to-one card — a rupee sign in front of the word "fee" — which reads as
   a bug to anybody who can read Hindi. A blank price says so in words. */
function Fee({ batch, lang, unit = false }: { batch: Batch; lang: Lang; unit?: boolean }) {
  if (isTodo(batch.price) || !batch.price.trim()) {
    return <p className="cap todo whitespace-nowrap text-right">{ui("batches.feeTodo", lang)}</p>;
  }
  const shown = t(batch.priceUnit, lang);
  return (
    <div className="text-right">
      <p className="num point-sm whitespace-nowrap">
        <Tx>{`₹${batch.price}`}</Tx>
      </p>
      {unit && shown ? <p className="cap">{shown}</p> : null}
    </div>
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
      {/* The name and the fee used to sit side by side at two different
          display sizes, and on a 1,280px screen "सुबह का बैच" ran straight
          into "₹1,000". They are the same two facts, so they are set as two
          aligned rows: what it is against what it costs, then when it runs
          against how often you pay. */}
      <div
        className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1 px-4 pb-3.5 pt-4"
        style={{ background: first ? "var(--color-apricot)" : "var(--color-sky)" }}
      >
        <h2 className="h2 min-w-0">{t(batch.name, lang)}</h2>
        <Fee batch={batch} lang={lang} />
        <p className="cap num" style={{ color: "var(--color-deep)", fontWeight: 700 }}>
          <Tx>{`${t(batch.when, lang)} · ${ui("batches.minutes", lang).replace("{m}", batch.minutes)}`}</Tx>
        </p>
        <p className="cap text-right">{t(batch.priceUnit, lang)}</p>
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
      {/* what pressing it does, said before it is pressed — the same three
          states the home page's block uses */}
      <p className="cap px-4 pb-4 -mt-2">
        <Tx>{ui(payWays().gateway ? "pay.note" : payWays().upi ? "pay.upiWay" : "pay.viaWhatsapp", lang)}</Tx>
      </p>
    </article>
  );
}

/* One to one, and a camp when there is one: name, price, two lines. */
export function SmallBatchCard({ batch, lang, page }: { batch: Batch; lang: Lang; page: string }) {
  const head =
    batch.type === "workshop"
      ? [t(batch.date, lang), t(batch.when, lang)].filter((x) => x.trim()).join(" · ")
      : "";
  const seats =
    !t(batch.priceUnit, lang) && batch.seats.trim() && !isTodo(batch.seats)
      ? ui("batches.workshopSeats", lang).replace("{n}", batch.seats)
      : "";
  /* One to one is a different kind of offer from the two group batches, so it
     takes a row of its own and reads ACROSS it: what it is on the left, what
     it costs and how to ask on the right. Sitting in half of a two-column grid
     it left an empty half beside it — the shape Agosh objected to on 4 Sep. */
  return (
    <article className="card flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
      <div className="flex min-w-0 flex-col gap-1 md:flex-1">
        {head ? (
          <p className="cap">
            <Tx>{head}</Tx>
          </p>
        ) : null}
        <h2 className="h2">
          <Tx>{t(batch.name, lang)}</Tx>
        </h2>
        {t(batch.note, lang).trim() ? (
          <p className="body">
            <Tx>{t(batch.note, lang)}</Tx>
          </p>
        ) : null}
      </div>
      <div className="flex flex-none flex-col gap-2.5 md:w-[268px]">
        <div className="flex items-baseline justify-between gap-3 md:justify-end">
          <Fee batch={batch} lang={lang} unit />
          {seats ? <p className="cap">{seats}</p> : null}
        </div>
        <JoinButton batch={batch} lang={lang} page={page} outline />
      </div>
    </article>
  );
}

/* One class, drawn as a proportion of the hour: a track whose segments follow
   the minutes, and the words underneath it where they have room to be read. */
export function SessionBar({ rows, lang }: { rows: Batch["session"]; lang: Lang }) {
  if (rows.length === 0) return null;
  const weight = (m: string) => Math.max(1, Number(m.replace(/[^\d]/g, "")) || 1);
  const main = Math.floor(rows.length / 2);
  return (
    <div className="flex flex-col gap-3">
      <div className="track" aria-hidden="true">
        {rows.map((r, i) => (
          <span key={i} className={i === main ? "main" : ""} style={{ flex: weight(r.minutes) }} />
        ))}
      </div>
      <ol className="legend">
        {rows.map((r, i) => (
          <li key={i} className={i === main ? "main" : ""}>
            {/* the row's own text already begins "मिनट …", so the number
                stands alone above it — ui.batches.minutes here would print
                "10 मिनट" over "मिनट सूक्ष्म व्यायाम" */}
            <span className="m num">
              <Tx>{r.minutes}</Tx>
            </span>
            <span className="cap">
              <Tx>{t(r.text, lang)}</Tx>
            </span>
          </li>
        ))}
      </ol>
    </div>
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
    <dl className="facts flex flex-col">
      {rows
        .filter(([, v]) => v.trim() !== "")
        .map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-3 py-3">
            <dt className="body">{k}</dt>
            <dd className="body text-right font-bold">
              <Tx>{v}</Tx>
            </dd>
          </div>
        ))}
    </dl>
  );
}
