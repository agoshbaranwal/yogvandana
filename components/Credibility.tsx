import { routine, t, ui } from "@/lib/content";
import type { Lang } from "@/lib/routes";
import { Tx } from "./Tx";

/* ------------------------------- routine --------------------------------- */

export function Routine({ lang }: { lang: Lang }) {
  return (
    <section className="wrap flex flex-col gap-3 section-pad">
      <h2 className="h2">{ui("batches.routineTitle", lang)}</h2>
      <p className="body max-w-[52ch]">{t(routine.note, lang)}</p>
      <ol className="mt-1 flex flex-col">
        {routine.rows.map((row, i) => (
          <li
            key={i}
            className={`grid grid-cols-[72px_1fr] gap-3 border-t border-rule py-2.5 md:grid-cols-[110px_1fr] md:py-3 ${
              i === routine.rows.length - 1 ? "border-b" : ""
            } ${row.highlight ? "-mx-4 rounded-[10px] px-4 md:-mx-4" : ""}`}
            style={row.highlight ? { background: "var(--color-apricot)" } : undefined}
          >
            <span className="num h3" style={{ color: "var(--color-deep)" }}>
              <Tx>{t(row.time, lang)}</Tx>
            </span>
            <span className="body">
              {t(row.strong, lang) ? <strong>{t(row.strong, lang)} </strong> : null}
              <Tx>{t(row.text, lang)}</Tx>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

