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
          <Link href={link.href} className="tap text-[16px] font-bold md:text-[17px]">
            {link.label}
          </Link>
        ) : null}
      </div>
      {lead ? (
        <p className="max-w-[68ch] text-[16px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
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
          <span className="text-[16px] font-bold leading-tight md:text-[17px]">
            {t(site.teacher, lang)}
          </span>
          <span className="cap">
            {t(site.credential, lang)} · {t(site.city, lang)} ·{" "}
            <Tx>{t(site.sinceYear, lang)}</Tx> {lang === "hi" ? "से" : "onwards"}
          </span>
        </div>
        <Link
          href={href("about", lang)}
          className="tap ml-auto whitespace-nowrap text-[14px] font-bold md:text-[15px]"
        >
          {ui("cta.aboutShort", lang)}
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------ numbers strip ---------------------------- */

export function NumbersStrip({ lang, long = false }: { lang: Lang; long?: boolean }) {
  const shown = site.numbers.filter((n) => n.value.trim() !== "");
  if (shown.length === 0) return null;
  const g = site.google;
  const hasGoogle = g.rating.trim() !== "";

  return (
    <div className="border-b border-rule">
      <div className="wrap py-4 md:py-5">
        <dl
          className={`grid grid-cols-4 gap-2 ${long ? "md:gap-8" : "md:gap-6"}`}
          aria-label={lang === "hi" ? "एक नज़र में" : "At a glance"}
        >
          {shown.map((n) => (
            <div
              key={n.short.en}
              className="flex flex-col items-center text-center md:flex-row md:items-baseline md:gap-2.5 md:text-left"
            >
              <dd className="num text-[26px] md:text-[40px]">
                <Tx>{n.value}</Tx>
              </dd>
              <dt className="text-[12px] leading-tight md:text-[15px]" style={{ color: "var(--color-muted)" }}>
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
      <ol className="grid grid-cols-3 gap-2 md:gap-5">
        {steps.map((s) => (
          <li key={s.n} className="card flex flex-col gap-1 p-3 md:flex-row md:items-start md:gap-4 md:p-5">
            <span className="num text-[28px] md:text-[40px]" style={{ color: "var(--color-deep)" }}>
              {s.n}
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-[15px] font-bold leading-tight md:text-[18px]">{s.title}</span>
              <span className="cap">
                <Tx>{s.sub}</Tx>
              </span>
            </span>
          </li>
        ))}
      </ol>
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
      className="link-strong self-start text-[15px]"
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
        <p className="quote text-[20px] md:text-[24px]" style={{ color: "var(--color-deep)" }} lang="sa">
          {site.motto}
        </p>
        <p className="text-[15px] md:text-[16px]" style={{ color: "var(--color-muted)" }}>
          {t(site.mottoGloss, lang)}
        </p>
      </div>
    </div>
  );
}
