import { batches, site, t, ui } from "@/lib/content";
import type { Lang } from "@/lib/routes";
import { Tx } from "./Tx";

/* The offer, as three steps with three prices, because the one thing this
   audience must never be surprised by is money. The first conversation is
   free; the consultation and the slip are paid; the batch is monthly. The
   middle step carries the tint, because the slip is the thing she is selling
   and the thing nobody else will write for them. */

export function WhatYouGet({ lang }: { lang: Lang }) {
  const group = batches.find((b) => b.type === "group");
  const steps = [
    {
      title: ui("get.s1title", lang),
      price: ui("get.s1price", lang),
      lines: [ui("get.s1a", lang), ui("get.s1b", lang)],
      tint: false,
    },
    {
      title: ui("get.s2title", lang),
      price: `₹${site.consultation.price}`,
      lines: [ui("get.s2a", lang), ui("get.s2b", lang), ui("get.s2c", lang)],
      tint: true,
    },
    {
      title: ui("get.s3title", lang),
      price: group ? `₹${group.price}` : "",
      unit: group ? t(group.priceUnit, lang) : "",
      lines: [
        ui("get.s3a", lang),
        ui("get.s3b", lang),
        ui("get.s3c", lang).replace("{d}", site.reviewDays),
      ],
      tint: false,
    },
  ];

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex flex-col gap-1">
        <h2 className="h2">{ui("get.title", lang)}</h2>
        <p className="cap">{ui("get.lead", lang)}</p>
      </div>
      <ol className="flex flex-col gap-2.5">
        {steps.map((step, i) => (
          <li
            key={i}
            className="card flex flex-col gap-2 p-0"
            style={step.tint ? { background: "var(--color-apricot)", borderColor: "var(--color-bhagwa)" } : undefined}
          >
            <div className="flex items-start justify-between gap-3 px-4 pt-3.5">
              <div className="flex min-w-0 items-start gap-3">
                <span className="n-dot num" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="h3 pt-0.5">{step.title}</span>
              </div>
              <div className="flex-none text-right">
                <p className="num point-sm">
                  <Tx>{step.price}</Tx>
                </p>
                {step.unit ? <p className="cap">{step.unit}</p> : null}
              </div>
            </div>
            <ul className="flex flex-col gap-1 px-4 pb-3.5 pl-[60px]">
              {step.lines.map((line, j) => (
                <li key={j} className="body" style={{ color: "var(--color-heroink)" }}>
                  <Tx>{line}</Tx>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <p className="body font-bold">{ui("get.onlyThis", lang)}</p>
    </div>
  );
}

/* The same three prices in one line, for pages that already talk about money
   or are where a conversation starts. Nobody should meet the ₹200 for the
   first time at the moment they are asked to pay it. */
export function PriceLine({ lang }: { lang: Lang }) {
  const group = batches.find((b) => b.type === "group");
  const line = ui("get.line", lang)
    .replace("{p}", site.consultation.price)
    .replace("{f}", group ? group.price : "")
    .replace("{u}", group ? t(group.priceUnit, lang) : "");
  return (
    <p className="body font-bold">
      <Tx>{line}</Tx>
    </p>
  );
}
