import { site, ui } from "@/lib/content";
import type { Lang } from "@/lib/routes";
import { Tx } from "./Tx";

/* The site's first job, said in one place and without hedging: what she does
   for you, and what you walk away holding. The slip is first among them,
   because it is the thing nobody else on the internet will write for you. */

export function WhatYouGet({ lang, columns = false }: { lang: Lang; columns?: boolean }) {
  const items = ["t1", "t2", "t3", "t4", "t5"].map((k) => ({
    title: ui(`get.${k}`, lang).replace("{d}", site.reviewDays),
    sub: ui(`get.${k}sub`, lang),
  }));
  const price = site.consultation.price.trim();
  const note = price
    ? ui("get.paid", lang).replace("{p}", price)
    : ui("get.free", lang);

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex flex-col gap-1">
        <h2 className="h2">{ui("get.title", lang)}</h2>
        <p className="cap">{ui("get.lead", lang)}</p>
      </div>
      <ol className={`flex flex-col border-b border-rule ${columns ? "md:grid md:grid-cols-2 md:gap-x-8" : ""}`}>
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3.5 border-t border-rule py-3.5">
            <span className="n-dot num" aria-hidden="true">
              {i + 1}
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="h3">
                <Tx>{item.title}</Tx>
              </span>
              <span className="body" style={{ color: "var(--color-heroink)" }}>
                <Tx>{item.sub}</Tx>
              </span>
            </span>
          </li>
        ))}
      </ol>
      <p className="body font-bold">
        <Tx>{note}</Tx>
      </p>
    </div>
  );
}
