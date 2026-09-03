import { t, type Text } from "@/lib/content";
import type { Lang } from "@/lib/routes";
import { Tx } from "./Tx";

/* <details> so the questions work with no JavaScript, and a screen reader
   announces them as buttons for free. */

export function FaqList({
  items,
  lang,
  columns = false,
  openFirst = false,
}: {
  items: { q: Text; a: Text }[];
  lang: Lang;
  columns?: boolean;
  /* On a condition page the first question is "should I stop my medicine?",
     the one this audience arrived with. It opens already answered. */
  openFirst?: boolean;
}) {
  return (
    <div className={columns ? "grid gap-x-10 md:grid-cols-2" : "flex flex-col"}>
      {items.map((item, i) => (
        <details key={i} className="faq-item" open={openFirst && i === 0 ? true : undefined}>
          <summary>{t(item.q, lang)}</summary>
          <p className="faq-answer">
            <Tx>{t(item.a, lang)}</Tx>
          </p>
        </details>
      ))}
    </div>
  );
}
