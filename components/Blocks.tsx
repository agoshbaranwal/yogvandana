import { site, t, ui } from "@/lib/content";
import type { Lang } from "@/lib/routes";
import { shareHref } from "@/lib/whatsapp";
import { PlayIcon, ShareIcon, StarIcon } from "./Icons";
import { Tx } from "./Tx";

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

