import { LockIcon } from "./Icons";
import { site, t, ui } from "@/lib/content";
import type { Lang } from "@/lib/routes";
import { Tx } from "./Tx";

/* योग की पर्ची — the prescription pad every Indian knows from a doctor's desk,
   and, like a doctor's, blank until you have been seen.

   What she writes on it is the thing a student pays for: what to eat, what to
   avoid, the daily routine, which pranayama and asanas, at what time. So the
   rows are named here and the values are not merely hidden — they are not in
   this page at all. There is nothing to read in the markup, nothing to unblur,
   nothing to copy. A person sees the shape of what they will be given. */

type Row = { label: string; width: string; open?: string };

export function SlipPad({
  lang,
  disease,
  compact = false,
  edge = "var(--color-sky)",
}: {
  lang: Lang;
  /* the one line the visitor already told us: which disease they came with */
  disease?: string;
  compact?: boolean;
  edge?: string;
}) {
  /* The widths differ so the sealed lines read as writing of different
     lengths, the way a filled prescription looks from across a room. */
  const sealed: Row[] = compact
    ? [
        { label: ui("slip.diet", lang), width: "72%" },
        { label: ui("slip.pranayam", lang), width: "88%" },
        { label: ui("slip.asana", lang), width: "94%" },
        { label: ui("slip.timeRow", lang), width: "46%" },
      ]
    : [
        { label: ui("slip.diet", lang), width: "76%" },
        { label: ui("slip.precautions", lang), width: "60%" },
        { label: ui("slip.routine", lang), width: "84%" },
        { label: ui("slip.pranayam", lang), width: "90%" },
        { label: ui("slip.asana", lang), width: "96%" },
        { label: ui("slip.timeRow", lang), width: "48%" },
      ];
  const certified =
    lang === "hi" ? `${t(site.certifyingBody, lang)} प्रमाणित` : `${t(site.certifyingBody, lang)} certified`;

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
          <p className="cap">{ui("slip.blank", lang)}</p>
        </div>
      </div>

      <dl className="pad-rules">
        {/* the two lines a person already knows: their name, and why they came */}
        <div className="slip-row flex gap-3">
          <dt className="label w-[92px] flex-none pt-1.5">{ui("slip.name", lang)}</dt>
          <dd className="min-w-0 flex-1">
            <span className="pad-blank" aria-hidden="true" />
          </dd>
        </div>
        {disease ? (
          <div className="slip-row flex gap-3">
            <dt className="label w-[92px] flex-none pt-1.5">{ui("slip.disease", lang)}</dt>
            <dd className="body min-w-0 font-bold">{disease}</dd>
          </div>
        ) : null}

        {sealed.map((row, i) => (
          <div key={row.label} className="slip-row flex gap-3" style={{ "--row": i + 2 } as React.CSSProperties}>
            <dt className="label w-[92px] flex-none pt-1.5">{row.label}</dt>
            <dd className="min-w-0 flex-1 pt-0.5">
              <span className="sealed" style={{ width: row.width }} role="img" aria-label={ui("slip.locked", lang)}>
                <LockIcon size={15} />
              </span>
            </dd>
          </div>
        ))}

        {/* the promise that is not a method, so it is not sealed */}
        <div className="slip-row flex gap-3">
          <dt className="label w-[92px] flex-none pt-1.5">{ui("slip.medicine", lang)}</dt>
          <dd className="body min-w-0">{ui("slip.medicineLine", lang)}</dd>
        </div>
        <div className="slip-row flex gap-3">
          <dt className="label w-[92px] flex-none pt-1.5">{ui("slip.review", lang)}</dt>
          <dd className="body min-w-0">
            <Tx>
              {lang === "hi"
                ? `${site.reviewDays} दिन बाद, अपनी रिपोर्ट के साथ`
                : `After ${site.reviewDays} days, with your reports`}
            </Tx>
          </dd>
        </div>
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
