import Link from "next/link";
import { routine, site, t, ui } from "@/lib/content";
import { href, sectionHref, type Lang } from "@/lib/routes";
import { Photo } from "./Photo";
import { Tx } from "./Tx";

/* ------------------------------- routine --------------------------------- */

export function Routine({ lang }: { lang: Lang }) {
  return (
    <section className="wrap flex flex-col gap-3 py-8 md:py-12">
      <h2 className="h2">{ui("home.routineTitle", lang)}</h2>
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

/* --------------------------------- proof ---------------------------------- */

/* Who she is, in one paragraph and one photograph. Six proof sections used to
   sit on the home page — certificates, events, press, gallery, numbers,
   stories — sixteen empty frames between them. They are one section now, and
   the full pages they came from are a link away. */

export function TeacherBio({ lang }: { lang: Lang }) {
  return (
    <div className="grid gap-5 md:grid-cols-[300px_1fr] md:items-center md:gap-10">
      <Photo
        src=""
        alt={t(site.teacher, lang)}
        label={ui("photo.portrait", lang)}
        ratio="4 / 5"
        rounded="rounded-[16px]"
        className="w-full max-w-[260px] md:max-w-none"
        sizes="(min-width: 768px) 300px, 70vw"
      />
      <div className="flex flex-col gap-3">
        <p className="label">{ui("home.whoTitle", lang)}</p>
        <h3 className="h2">{t(site.teacher, lang)}</h3>
        <p className="max-w-[46ch] body">
          <Tx>
            {lang === "hi"
              ? "योग में एम.ए., [विश्वविद्यालय]। [गुरु/संस्था] से सीखा। [X] साल से लखनऊ में और ऑनलाइन सिखा रही हैं।"
              : "MA in Yoga, [university]. Studied with [teacher or school]. Teaching for [X] years, in Lucknow and online."}
          </Tx>
        </p>
        <p className="quote h3" style={{ color: "var(--color-deep)" }} lang="sa">
          {site.motto}
        </p>
        <Link href={href("about", lang)} className="link-strong self-start body">
          {ui("cta.fullAbout", lang)}
        </Link>
      </div>
    </div>
  );
}

/* Three lines instead of a contact sheet: everything checkable, and where. */

export function RecordLinks({ lang }: { lang: Lang }) {
  const rows: { label: string; href: string }[] = [
    { label: ui("home.recordCerts", lang), href: sectionHref("register", lang) },
    { label: ui("home.recordEvents", lang), href: sectionHref("awards", lang) },
    { label: ui("home.recordPhotos", lang), href: sectionHref("gallery", lang) },
  ];
  return (
    <div className="flex max-w-[64ch] flex-col gap-1.5">
      <p className="label">{ui("home.recordTitle", lang)}</p>
      <ul className="flex flex-col">
        {rows.map((r, i) => (
          <li key={r.href} className={i === rows.length - 1 ? "border-b border-rule" : ""}>
            <Link
              href={r.href}
              className="flex items-center justify-between gap-4 border-t border-rule py-3.5 no-underline body"
              style={{ color: "var(--color-kohl)" }}
            >
              <span>{r.label}</span>
              <span aria-hidden="true" style={{ color: "var(--color-deep)" }}>
                ›
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
