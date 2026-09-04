import { site, t, ui } from "@/lib/content";
import type { Lang } from "@/lib/routes";
import { shareHref } from "@/lib/whatsapp";
import { PlayIcon, ShareIcon } from "./Icons";
import { Tx } from "./Tx";

/* ------------------------------ numbers strip ---------------------------- */

/** `1,200+` counts; `[Y]` does not. */
function countAttrs(value: string) {
  const m = value.trim().match(/^([\d,]+)(\+?)$/);
  if (!m) return {};
  return { "data-count": m[1].replace(/,/g, ""), "data-count-suffix": m[2] };
}

export function NumberCards({ lang }: { lang: Lang }) {
  const shown = site.numbers.filter((n) => n.value.trim() !== "");
  if (shown.length === 0) return null;
  return (
    <ul className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-4" aria-label={lang === "hi" ? "एक नज़र में" : "At a glance"}>
      {shown.map((n) => (
        <li key={n.short.en} className="card flex flex-col gap-0.5 md:px-5 md:py-4">
          {/* A real number counts up once. A number still to come is a dotted
              blank and stays perfectly still. */}
          <p className="num page-title" {...countAttrs(n.value)}>
            <Tx>{n.value}</Tx>
          </p>
          <p className="cap">
            <Tx>{t(n.label, lang)}</Tx>
          </p>
        </li>
      ))}
    </ul>
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

