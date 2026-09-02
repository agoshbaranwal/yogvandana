import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { Tx } from "@/components/Tx";
import { absolute, batches, site, students, t, ui } from "@/lib/content";
import { href, type Lang } from "@/lib/routes";
import { waHref, waMessage } from "@/lib/whatsapp";

/* For people already in a batch: the fee, where the class link arrives, the
   holidays and the rules. It keeps the selling pages free of housekeeping. */

export default function Students({ lang }: { lang: Lang }) {
  const page = absolute(href("students", lang));
  const wa = waHref(site.contact.whatsapp, waMessage({ lang, kind: "students", page }));

  return (
    <SiteShell lang={lang} routeKey="students">
      <header style={{ background: "linear-gradient(180deg, var(--color-sky) 0%, var(--color-ivory) 100%)" }}>
        <div className="wrap flex flex-col gap-2.5 py-8 md:py-11">
          <p className="label" style={{ color: "var(--color-deep)" }}>
            {ui("students.eyebrow", lang)}
          </p>
          <h1 className="page-title">{ui("students.title", lang)}</h1>
          <p className="lead max-w-[58ch]" style={{ color: "var(--color-heroink)" }}>
            {ui("students.lead", lang)} {ui("students.newHere", lang)}{" "}
            <Link href={href("home", lang)}>{ui("band.title", lang)}</Link>
          </p>
        </div>
      </header>

      <section className="wrap flex flex-col gap-3.5 py-7 md:py-10">
        <h2 className="h2">{ui("students.feeTitle", lang)}</h2>
        <ul className="grid gap-2.5 md:grid-cols-3 md:gap-5">
          {batches
            .filter((b) => b.type !== "workshop")
            .map((b) => (
              <li key={b.id} className="card flex items-center justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <p className="h3">{t(b.name, lang)}</p>
                  <p className="cap">
                    <Tx>{`₹${b.price} ${t(b.priceUnit, lang)}`}</Tx>
                  </p>
                </div>
                <a
                  href={b.feeLink || wa}
                  target={b.feeLink ? undefined : "_blank"}
                  rel={b.feeLink ? undefined : "noopener noreferrer"}
                  data-ev="fee_pay_click"
                  data-ev-batch={b.id}
                  className="btn btn-sm btn-primary whitespace-nowrap"
                >
                  {b.type === "group" ? ui("cta.payFee", lang) : ui("cta.pay", lang)}
                </a>
              </li>
            ))}
        </ul>
        <p className="cap">
          <Tx>{t(students.payNote, lang)}</Tx>
        </p>
      </section>

      <div className="wrap grid gap-8 pb-8 md:grid-cols-2 md:gap-14 md:pb-12">
        <section className="flex flex-col gap-2.5">
          <h2 className="h2">{ui("students.linkTitle", lang)}</h2>
          <p className="text-[16px] leading-relaxed md:text-[17px]">
            <Tx>{t(students.linkNote, lang)}</Tx>{" "}
            <a href={wa} target="_blank" rel="noopener noreferrer" data-ev="whatsapp_click" data-ev-source="students">
              {ui("students.writeOnWhatsapp", lang)}
            </a>
          </p>

          <h2 className="h2 mt-4">{ui("students.slipTitle", lang)}</h2>
          <p className="text-[16px] leading-relaxed md:text-[17px]">
            <Tx>{t(students.slipNote, lang)}</Tx>{" "}
            <a href={wa} target="_blank" rel="noopener noreferrer" data-ev="whatsapp_click" data-ev-source="students-slip">
              {ui("students.askAgain", lang)}
            </a>
          </p>
        </section>

        <section className="flex flex-col gap-2.5">
          <h2 className="h2">{ui("students.holidaysTitle", lang)}</h2>
          <ul className="flex flex-col">
            {students.holidays.map((h, i) => (
              <li
                key={i}
                className={`grid grid-cols-[110px_1fr] gap-3 border-t border-rule py-2.5 text-[16px] ${
                  i === students.holidays.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="num text-[18px]" style={{ color: "var(--color-deep)" }}>
                  <Tx>{t(h.when, lang)}</Tx>
                </span>
                <span>
                  <Tx>{t(h.what, lang)}</Tx>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="wrap flex flex-col gap-2.5 pb-10 md:pb-14">
        <h2 className="h2">{ui("students.rulesTitle", lang)}</h2>
        <ul className="ml-5 flex list-disc flex-col gap-1.5 text-[16px] leading-relaxed md:max-w-[70ch] md:text-[17px]">
          {students.rules.map((r, i) => (
            <li key={i}>
              <Tx>{t(r, lang)}</Tx>
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}
