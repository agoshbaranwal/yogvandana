import { type Ailment, FAMILY_COLOUR, site, t, ui } from "@/lib/content";
import type { Lang } from "@/lib/routes";
import { Photo } from "./Photo";
import { Tx } from "./Tx";

/* योग की पर्ची — the shape every Indian knows from a doctor's pad, used for a
   daily practice. Her name and degree do the work at the top; the rows are
   what she actually gives a student after the first class. */

export function Slip({ lang, ailment }: { lang: Lang; ailment: Ailment }) {
  const colour = FAMILY_COLOUR[ailment.family];
  const rows: [string, string][] = [
    [ui("slip.practice", lang), t(ailment.slip.practice, lang)],
    [ui("slip.time", lang), t(ailment.slip.time, lang)],
    [ui("slip.batch", lang), t(ailment.slip.batch, lang)],
    [ui("slip.alongside", lang), t(ailment.slip.alongside, lang)],
    [ui("slip.review", lang), t(ailment.slip.review, lang)],
  ];

  return (
    <div className="slip" style={{ ["--slip-accent" as string]: colour.ink }}>
      <div className="slip-head">
        <div className="flex flex-col gap-0.5">
          <div className="brand text-[18px] md:text-[22px]">
            <span style={{ color: "var(--color-bhagwa)" }}>योग</span> वंदना
          </div>
          <p className="text-[12px] md:text-[13px]" style={{ color: "var(--color-muted)" }}>
            {t(site.teacher, lang)}, {t(site.credentialShort, lang)} · {t(site.city, lang)}
          </p>
        </div>
        <span className="chip" style={{ background: colour.ink }}>
          {t(ailment.name, lang)}
        </span>
      </div>

      <dl className="grid grid-cols-[74px_1fr] gap-x-3 gap-y-2 px-3.5 py-3 text-[15px] leading-relaxed md:grid-cols-[100px_1fr] md:gap-y-2.5 md:px-5 md:py-4 md:text-[16px]">
        {rows.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="label pt-1">{label}</dt>
            <dd>
              <Tx>{value}</Tx>
            </dd>
          </div>
        ))}
      </dl>

      <div className="flex items-end justify-between gap-4 px-3.5 pb-3 pt-1 md:px-5 md:pb-4">
        <Photo
          src=""
          alt={ui("slip.signature", lang)}
          label={ui("slip.signature", lang)}
          className="h-9 w-[100px] md:h-11 md:w-[130px]"
          rounded="rounded-[8px]"
        />
        <span className="slip-seal" aria-hidden="true">
          योग
          <br />
          वंदना
        </span>
      </div>
    </div>
  );
}
