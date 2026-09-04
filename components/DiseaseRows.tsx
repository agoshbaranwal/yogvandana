import { A as Link } from "./Nav";
import { ailments, storiesFor, t, ui } from "@/lib/content";
import { href, type Lang } from "@/lib/routes";
import { AilmentIcon } from "./Icons";
import { Tx } from "./Tx";

/* The chooser, as eight tiles.

   It was eight rows of a list. A row is a menu; a tile with an icon, a result
   and a count is eight small proofs — picking your illness already tells you
   it has worked for somebody who has it. The result shown is the strongest one
   on record for that condition, so the tile is never inventing anything: when
   no student with that condition has given a result yet, the line is simply
   not there. */

export function DiseaseRows({
  lang,
  id = "ailments",
  askHref = "#booking-band",
  heading = "h2",
}: {
  lang: Lang;
  id?: string;
  askHref?: string;
  /* the conditions page makes the question its own title */
  heading?: "h1" | "h2";
}) {
  return (
    <div id={id} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="label" style={{ color: "var(--color-amber-deep)" }}>
          {ui("home.chooserKick", lang)}
        </span>
        {heading === "h1" ? (
          <h1 className="page-title">{ui("home.ailmentsTitle", lang)}</h1>
        ) : (
          <h2 className="h2">{ui("home.ailmentsTitle", lang)}</h2>
        )}
        <p className="cap">{ui("home.ailmentsLead", lang)}</p>
      </div>

      <ul className="agrid">
        {ailments.map((a) => {
          /* a lab reading is meaningless without its name: "6.5" says nothing,
             "HbA1c 6.5" says everything */
          const best = storiesFor(a.slug)
            .map((s) => {
              const after = t(s.after, lang).trim();
              const metric = t(s.metric, lang).trim();
              return after ? (metric ? `${metric} ${after}` : after) : "";
            })
            .find(Boolean);
          return (
            <li key={a.slug} className="contents">
              <Link
                href={href("ailment", lang, a.slug)}
                data-ev="ailment_card_tap"
                data-ev-slug={a.slug}
                className="acard"
              >
                <span className="ico iconbox" aria-hidden="true">
                  <AilmentIcon name={a.icon} size={28} />
                </span>
                <span className="h3">{t(a.name, lang)}</span>
                {best ? (
                  <span className="rs">
                    <Tx>{best}</Tx>
                  </span>
                ) : null}
                <span className="cap">
                  <Tx>{`${a.studentCount} ${ui("ailment.students", lang)}`}</Tx>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="body">
        {ui("cta.more", lang)}{" "}
        <Link href={askHref} className="font-bold underline underline-offset-4">
          {ui("cta.ask", lang)}
        </Link>
      </p>
    </div>
  );
}
