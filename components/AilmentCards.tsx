import Link from "next/link";
import { ailments, FAMILY_COLOUR, t, ui } from "@/lib/content";
import { href, type Lang } from "@/lib/routes";
import { AilmentIcon } from "./Icons";
import { Tx } from "./Tx";

/* The front door. A person arrives with a problem, not with an interest in
   yoga, so the first thing the site asks is what is wrong. */

export function AilmentCards({
  lang,
  columns = "grid-cols-2",
  compact = false,
}: {
  lang: Lang;
  columns?: string;
  compact?: boolean;
}) {
  return (
    <ul className={`grid ${columns} gap-2.5 md:gap-3`}>
      {ailments.map((a) => {
        const colour = FAMILY_COLOUR[a.family];
        return (
          <li key={a.slug}>
            <Link
              href={href("ailment", lang, a.slug)}
              data-ev="ailment_card_tap"
              data-ev-slug={a.slug}
              className={`card flex h-full no-underline transition-colors hover:border-[color:var(--color-deep)] ${
                compact
                  ? "flex-row items-center gap-3 p-3"
                  : "flex-col gap-2 p-3.5 md:p-4"
              }`}
              style={{ color: "var(--color-kohl)" }}
            >
              <span
                className="flex h-11 w-11 flex-none items-center justify-center rounded-[12px] md:h-12 md:w-12"
                style={{ background: colour.tint, color: colour.ink }}
              >
                <AilmentIcon name={a.icon} size={compact ? 24 : 26} />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="h3 text-[20px] md:text-[22px]">{t(a.name, lang)}</span>
                <span className="cap">{t(a.sub, lang)}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function AilmentChooser({
  lang,
  id = "ailments",
  columns = "grid-cols-2",
}: {
  lang: Lang;
  id?: string;
  columns?: string;
}) {
  return (
    <section id={id} className="wrap flex flex-col gap-4 py-8 md:py-12">
      <div className="flex flex-col gap-1.5">
        <h2 className="h2">{ui("home.ailmentsTitle", lang)}</h2>
        <p className="max-w-[68ch] text-[16px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
          {ui("home.ailmentsLead", lang)}
        </p>
      </div>
      <AilmentCards lang={lang} columns={columns} />
      <Link href={href("ailments", lang)} className="link-strong self-start text-[16px]">
        <Tx>{ui("cta.allAilments", lang)}</Tx>
      </Link>
    </section>
  );
}
