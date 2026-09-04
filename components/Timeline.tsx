import { ui } from "@/lib/content";
import type { Lang } from "@/lib/routes";
import { Tx } from "./Tx";

/* What happens next, as a line with three stops, and under it the one
   question every visitor with a disease is carrying: what about the medicine.
   The answer sits in the dark so it is read as the serious thing it is. */

export function Timeline({ lang }: { lang: Lang }) {
  const steps = [
    { title: ui("home.step1", lang), sub: ui("home.step1sub", lang) },
    { title: ui("home.step2", lang), sub: ui("home.step2sub", lang) },
    { title: ui("home.step3", lang), sub: ui("home.step3sub", lang) },
    { title: ui("home.step4", lang), sub: ui("home.step4sub", lang) },
  ];
  return (
    <ol className="flex flex-col">
      {steps.map((s, i) => (
        <li key={i} className="flex gap-3.5">
          <div className="flex flex-none flex-col items-center">
            <span className="tl-dot num" aria-hidden="true">
              {i + 1}
            </span>
            {i < steps.length - 1 ? <span className="tl-line" aria-hidden="true" /> : null}
          </div>
          <div className={`flex flex-col gap-0.5 ${i < steps.length - 1 ? "pb-4" : ""}`}>
            <p className="h3">
              <Tx>{s.title}</Tx>
            </p>
            <p className="body" style={{ color: "var(--color-heroink)" }}>
              <Tx>{s.sub}</Tx>
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function MedicinePanel({ lang, body }: { lang: Lang; body?: string }) {
  return (
    <div className="panel-dark on-dark flex flex-col gap-1 md:px-6 md:py-5">
      <p className="h3" style={{ color: "var(--color-bhagwa)" }}>
        {ui("medicine.title", lang)}
      </p>
      <p className="body">
        <Tx>{body || ui("medicine.body", lang)}</Tx>
      </p>
    </div>
  );
}

/* The steps and the medicine panel together; on a phone they sit on their
   own apricot band, from a tablet up they take the right-hand column. */
export function NextSteps({ lang }: { lang: Lang }) {
  return (
    <div className="flex flex-col gap-4 pt-6 md:pt-0">
      <h2 className="h2">{ui("home.stepsTitle", lang)}</h2>
      <Timeline lang={lang} />
      <MedicinePanel lang={lang} />
    </div>
  );
}
