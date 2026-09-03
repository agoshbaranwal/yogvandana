import Link from "next/link";
import { site, t, ui } from "@/lib/content";
import { href, type Lang } from "@/lib/routes";
import { shareHref } from "@/lib/whatsapp";
import { PlayIcon, ShareIcon, StarIcon } from "./Icons";
import { Photo } from "./Photo";
import { Tx } from "./Tx";

/* ---------------------------- section heading ---------------------------- */

export function SectionHead({
  title,
  lead,
  link,
  id,
}: {
  title: string;
  lead?: string;
  link?: { label: string; href: string };
  id?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 className="h2" id={id}>
          {title}
        </h2>
        {link ? (
          <Link href={link.href} className="tap font-bold body">
            {link.label}
          </Link>
        ) : null}
      </div>
      {lead ? (
        <p className="max-w-[68ch] body" style={{ color: "var(--color-muted)" }}>
          <Tx>{lead}</Tx>
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------ teacher line ----------------------------- */

export function TeacherLine({ lang }: { lang: Lang }) {
  return (
    <div className="border-b border-rule">
      <div className="wrap flex items-center gap-3 py-3.5 md:gap-4">
        <Photo
          src=""
          alt={t(site.teacher, lang)}
          rounded="rounded-full"
          className="h-14 w-14 flex-none md:h-16 md:w-16"
        />
        <div className="flex min-w-0 flex-col">
          <span className="font-bold leading-tight body">
            {t(site.teacher, lang)}
          </span>
          <span className="cap">
            {t(site.credential, lang)} · {t(site.city, lang)} ·{" "}
            <Tx>{t(site.sinceYear, lang)}</Tx> {lang === "hi" ? "से" : "onwards"}
          </span>
        </div>
        <Link
          href={href("about", lang)}
          className="tap ml-auto whitespace-nowrap font-bold cap"
        >
          {ui("cta.aboutShort", lang)}
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------ numbers strip ---------------------------- */

/** `1,200+` counts; `[Y]` does not. */
function countAttrs(value: string) {
  const m = value.trim().match(/^([\d,]+)(\+?)$/);
  if (!m) return {};
  return { "data-count": m[1].replace(/,/g, ""), "data-count-suffix": m[2] };
}

export function NumbersStrip({ lang, long = false }: { lang: Lang; long?: boolean }) {
  const shown = site.numbers.filter((n) => n.value.trim() !== "");
  if (shown.length === 0) return null;
  const g = site.google;
  const hasGoogle = g.rating.trim() !== "";

  return (
    <div className="border-b border-rule">
      <div className="wrap py-4 md:py-5">
        <dl
          className={`grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4 ${long ? "md:gap-8" : "md:gap-6"}`}
          aria-label={lang === "hi" ? "एक नज़र में" : "At a glance"}
        >
          {shown.map((n) => (
            <div
              key={n.short.en}
              className="flex flex-col items-center text-center md:flex-row md:items-baseline md:gap-2.5 md:text-left"
            >
              {/* A real number counts up once. A number still to come is
                  a dotted blank and stays perfectly still. */}
              <dd className="num h2" {...countAttrs(n.value)}>
                <Tx>{n.value}</Tx>
              </dd>
              <dt className="leading-tight cap" style={{ color: "var(--color-muted)" }}>
                <span className="md:hidden">{t(n.short, lang)}</span>
                <span className="hidden md:inline">
                  <Tx>{t(long ? n.label : n.short, lang)}</Tx>
                </span>
              </dt>
            </div>
          ))}
        </dl>
        {hasGoogle ? (
          <p className="cap mt-2.5 text-center md:text-right">
            {ui("home.googleLine", lang)}{" "}
            <span className="font-bold" style={{ color: "var(--color-deep)" }}>
              <StarIcon size={13} /> {g.rating}
            </span>
            {g.reviews ? ` · ${g.reviews} ${ui("home.googleReviews", lang)}` : ""}
            {site.whatsappGroupCount
              ? ` · ${site.whatsappGroupCount} ${ui("home.inGroup", lang)}`
              : ""}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------------- steps ---------------------------------- */

export function Steps({ lang }: { lang: Lang }) {
  const steps = [
    { n: "1", title: ui("home.step1", lang), sub: ui("home.step1sub", lang) },
    { n: "2", title: ui("home.step2", lang), sub: ui("home.step2sub", lang) },
    { n: "3", title: ui("home.step3", lang), sub: ui("home.step3sub", lang) },
  ];
  return (
    <section className="wrap flex flex-col gap-4 py-8 md:py-12">
      <h2 className="h2">{ui("home.stepsTitle", lang)}</h2>
      {/* Three columns on a phone squeezed every step into four wrapped
         lines. One per row until there is room for three. */}
      <ol className="grid gap-2 md:grid-cols-3 md:gap-5">
        {steps.map((s) => (
          <li key={s.n} className="card flex items-start gap-3.5 p-3.5 md:gap-4 md:p-5">
            <span className="num h2" style={{ color: "var(--color-deep)" }}>
              {s.n}
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="body font-bold leading-tight">{s.title}</span>
              <span className="cap">
                <Tx>{s.sub}</Tx>
              </span>
            </span>
          </li>
        ))}
      </ol>
      {/* The one place the site says what money is involved. */}
      <p className="body font-bold">{ui("home.stepsNote", lang)}</p>
    </section>
  );
}

/* ------------------------------ video slot ------------------------------- */

export function VideoSlot({
  lang,
  note,
  accent = "var(--color-kohl)",
}: {
  lang: Lang;
  note?: string;
  accent?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="ph relative flex items-center justify-center rounded-[12px]"
        style={{ aspectRatio: "16 / 9" }}
        role="img"
        aria-label={ui("photo.video", lang)}
      >
        <span
          className="flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: accent, color: "var(--color-bhagwa)" }}
          aria-hidden="true"
        >
          <PlayIcon size={22} />
        </span>
      </div>
      {note ? (
        <p className="cap">
          <Tx>{note}</Tx>
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------- share link ------------------------------ */

export function ShareLink({
  label,
  title,
  url,
  source,
}: {
  label: string;
  title: string;
  url: string;
  source: string;
}) {
  return (
    <a
      href={shareHref(title, url)}
      target="_blank"
      rel="noopener noreferrer"
      data-ev="share_click"
      data-ev-source={source}
      className="link-strong self-start cap"
    >
      <ShareIcon size={18} />
      {label}
    </a>
  );
}

/* ------------------------------ motto line ------------------------------- */

export function MottoLine({ lang }: { lang: Lang }) {
  return (
    <div className="border-b border-rule">
      <div className="wrap flex flex-col gap-1 py-5 md:flex-row md:items-baseline md:gap-5">
        <p className="quote h3" style={{ color: "var(--color-deep)" }} lang="sa">
          {site.motto}
        </p>
        <p className="cap" style={{ color: "var(--color-muted)" }}>
          {t(site.mottoGloss, lang)}
        </p>
      </div>
    </div>
  );
}
