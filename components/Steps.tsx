import { groupBatches, site, ui } from "@/lib/content";
import type { Lang } from "@/lib/routes";
import { Tx } from "./Tx";

/* The three steps, each wearing its price.

   The ladder used to be a column of tiers a reader had to work down. Here each
   step is a card with a numbered disc hanging off its corner and its price set
   large in the top right, so the whole offer — free, ₹200, ₹1,000 — can be
   taken in without reading a sentence. Nothing here says buy; it says what
   each step costs, which is the thing people are actually looking for. */

export function Steps({ lang }: { lang: Lang }) {
  const group = groupBatches[0];
  const steps = [
    {
      title: ui("get.s1title", lang),
      price: ui("get.s1price", lang),
      body: ui("get.s1b", lang),
    },
    {
      title: ui("get.s2title", lang),
      price: `₹${site.consultation.price}`,
      body: ui("get.s2b", lang),
    },
    {
      title: ui("get.s3title", lang),
      price: group ? `₹${group.price}` : "",
      body: ui("get.s3a", lang),
    },
  ];

  return (
    <div className="steps">
      {steps.map((s, i) => (
        <div className="step" key={s.title}>
          <span className="no num" aria-hidden="true">
            {lang === "hi" ? ["१", "२", "३"][i] : i + 1}
          </span>
          <div className="flex items-start justify-between gap-3">
            <p className="h3 pt-1.5">{s.title}</p>
            <p className="num point-sm whitespace-nowrap" style={{ color: "var(--color-amber-deep)" }}>
              <Tx>{s.price}</Tx>
            </p>
          </div>
          <p className="body pt-1" style={{ color: "var(--color-heroink)" }}>
            <Tx>{s.body}</Tx>
          </p>
        </div>
      ))}
    </div>
  );
}
