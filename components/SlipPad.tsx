import type React from "react";
import { type Ailment, site, t, ui } from "@/lib/content";
import type { Lang } from "@/lib/routes";
import { Tx } from "./Tx";

/* योग की पर्ची as a prescription pad: the letterhead every Indian knows from
   a doctor's desk, ruled paper, a signature line, a seal and a torn edge. The
   rows are what she actually writes after the first class. `compact` is the
   home page's glance; the condition page shows the whole pad. The torn edge
   is cut in the colour of the ground it sits on. */

export function SlipPad({
  lang,
  ailment,
  compact = false,
  edge = "var(--color-sky)",
}: {
  lang: Lang;
  ailment: Ailment;
  compact?: boolean;
  edge?: string;
}) {
  const name = t(ailment.name, lang);
  const rows: [string, string, boolean][] = compact
    ? [
        [ui("slip.name", lang), `${ui("slip.sampleName", lang)} · ${name}`, true],
        [ui("slip.practice", lang), t(ailment.slip.practice, lang), false],
        [ui("slip.home", lang), t(ailment.slip.time, lang), false],
        [ui("slip.alongside", lang), t(ailment.slip.alongside, lang), false],
        [ui("slip.review", lang), t(ailment.slip.review, lang), false],
      ]
    : [
        [ui("slip.name", lang), ui("slip.sampleName", lang), true],
        [ui("slip.disease", lang), `${name} · ${t(ailment.sub, lang)}`, true],
        [ui("slip.practice", lang), t(ailment.slip.practice, lang), false],
        [ui("slip.home", lang), t(ailment.slip.time, lang), false],
        [ui("slip.batch", lang), t(ailment.slip.batch, lang), false],
        [ui("slip.alongside", lang), t(ailment.slip.alongside, lang), false],
        [ui("slip.medicine", lang), ui("slip.medicineLine", lang), false],
        [ui("slip.review", lang), t(ailment.slip.review, lang), false],
      ];
  const certified = lang === "hi" ? `${t(site.certifyingBody, lang)} प्रमाणित` : `${t(site.certifyingBody, lang)} certified`;

  return (
    <div className="slip pad">
      <div className="pad-bar" aria-hidden="true" />
      <div className="pad-head">
        <div className="flex min-w-0 flex-col">
          <p className="brand h3">
            <span>योग</span> वंदना
          </p>
          <p className="cap">
            <Tx>{`${t(site.teacher, lang)} · ${t(site.credentialShort, lang)} · ${certified} · ${t(site.city, lang)}`}</Tx>
          </p>
        </div>
        <div className="flex flex-none flex-col items-end text-right">
          <p className="label">{ui("slip.word", lang)}</p>
          <p className="cap font-bold" style={{ color: "var(--color-kohl)" }}>
            <Tx>{ui("slip.date", lang)}</Tx>
          </p>
          {compact ? null : (
            <p className="cap">
              <Tx>{`${ui("slip.no", lang)} ${ui("slip.sampleNo", lang)}`}</Tx>
            </p>
          )}
        </div>
      </div>

      <dl className="pad-rules">
        {rows.map(([label, value, strong], i) => (
          <div key={label} className="slip-row flex gap-3" style={{ "--row": i } as React.CSSProperties}>
            <dt className="label w-[76px] flex-none pt-1.5">{label}</dt>
            <dd className={`body min-w-0 ${strong ? "font-bold" : ""}`}>
              <Tx>{value}</Tx>
            </dd>
          </div>
        ))}
      </dl>

      <div className="flex items-end justify-between gap-4 px-4 pb-4 pt-2">
        <div className="flex flex-col gap-0.5">
          <div className="pad-sign" aria-hidden="true" />
          <p className="label">{ui("slip.signature", lang)}</p>
        </div>
        <span className="slip-seal" aria-hidden="true">
          योग
          <br />
          वंदना
        </span>
      </div>
      <svg viewBox="0 0 390 12" preserveAspectRatio="none" aria-hidden="true" className="pad-edge">
        <path
          d="M0 0 L0 6 L10 12 L20 6 L30 12 L40 6 L50 12 L60 6 L70 12 L80 6 L90 12 L100 6 L110 12 L120 6 L130 12 L140 6 L150 12 L160 6 L170 12 L180 6 L190 12 L200 6 L210 12 L220 6 L230 12 L240 6 L250 12 L260 6 L270 12 L280 6 L290 12 L300 6 L310 12 L320 6 L330 12 L340 6 L350 12 L360 6 L370 12 L380 6 L390 12 L390 0 Z"
          fill={edge}
        />
      </svg>
    </div>
  );
}
