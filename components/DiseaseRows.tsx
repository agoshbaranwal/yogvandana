import Link from "next/link";
import { ailments, FAMILY_COLOUR, t, ui } from "@/lib/content";
import { href, type Lang } from "@/lib/routes";
import { AilmentIcon, ChevronIcon } from "./Icons";
import { Tx } from "./Tx";

/* The front door: a list of diseases, one per row, the whole row a target.
   Tiles made eight small boxes a thumb had to aim at; rows read top to bottom
   the way a person reads a clinic's board. */

export function DiseaseRows({
  lang,
  id = "ailments",
  askHref = "#booking-band",
}: {
  lang: Lang;
  id?: string;
  askHref?: string;
}) {
  return (
    <div id={id} className="flex flex-col gap-3 pt-2 md:pt-0">
      <div className="flex flex-col gap-1">
        <h2 className="h2">{ui("home.ailmentsTitle", lang)}</h2>
        <p className="cap">{ui("home.ailmentsLead", lang)}</p>
      </div>
      <ul className="rows bleed md:grid md:grid-cols-2 md:gap-x-6">
        {ailments.map((a) => {
          const colour = FAMILY_COLOUR[a.family];
          return (
            <li key={a.slug}>
              <Link
                href={href("ailment", lang, a.slug)}
                data-ev="ailment_card_tap"
                data-ev-slug={a.slug}
                className="row"
              >
                <span className="ico" style={{ background: colour.tint, color: colour.ink }} aria-hidden="true">
                  <AilmentIcon name={a.icon} size={30} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="h3">{t(a.name, lang)}</span>
                  <span className="cap">
                    <Tx>{`${t(a.sub, lang)} · ${a.studentCount} ${ui("ailment.students", lang)}`}</Tx>
                  </span>
                </span>
                <ChevronIcon size={24} style={{ color: "var(--color-deep)" }} />
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="body pt-1">
        {ui("cta.more", lang)}{" "}
        <Link href={askHref} className="font-bold underline underline-offset-4">
          {ui("cta.ask", lang)}
        </Link>
      </p>
    </div>
  );
}
