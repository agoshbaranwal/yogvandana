import { isTodo, site, t, ui } from "@/lib/content";
import { mediaLogos } from "@/lib/content";
import type { Lang } from "@/lib/routes";
import { Photo } from "./Photo";
import { Tx } from "./Tx";

/* Small furniture for the warm system: the things a person checks before they
   trust someone with their diabetes, made visible instead of filed away on the
   about page. */

/* Four counts, hairline-separated and lifted off the page. Years, students,
   whose medicine came down, and the Google rating — the last two are the ones
   that actually answer a doubt, so they are not buried behind the first two. */
export function Counters({ lang }: { lang: Lang }) {
  const n = site.numbers;
  const rating = site.google.rating.trim();
  const cells: { value: string; label: string }[] = [
    { value: n[1]?.value ?? "", label: t(n[1]?.short, lang) },
    { value: n[0]?.value ?? "", label: t(n[0]?.short, lang) },
    { value: n[4]?.value ?? "", label: ui("home.medicineCount", lang) },
    rating
      ? { value: `${rating}★`, label: ui("home.googleLine", lang) }
      : { value: n[2]?.value ?? "", label: t(n[2]?.short, lang) },
  ].filter((c) => c.value);

  if (cells.length < 2) return null;
  return (
    <div className="counts">
      {cells.map((c) => (
        <div key={c.label}>
          <span className="n">
            <Tx>{c.value}</Tx>
          </span>
          <span className="l">
            <Tx>{c.label}</Tx>
          </span>
        </div>
      ))}
    </div>
  );
}

/* The newspapers and channels, in grey. A logo strip is the cheapest
   credibility on any page and this site had it sitting on /parichay/ where a
   visitor deciding on the home page never reaches it. */
export function PressStrip({ lang }: { lang: Lang }) {
  const shown = mediaLogos.slice(0, 6);
  if (shown.length === 0) return null;
  return (
    <div className="flex flex-col items-center gap-3.5">
      <p className="label" style={{ color: "var(--color-muted)" }}>
        {ui("home.pressTitle", lang)}
      </p>
      <div className="press">
        {shown.map((m) => (
          <Photo
            key={m.id}
            src={m.image}
            alt={t(m.name, lang)}
            label={ui("photo.logo", lang)}
            ratio="5 / 2"
            rounded="rounded-[var(--radius-sm)]"
            className="w-[104px] opacity-80 grayscale"
            compact
            sizes="104px"
          />
        ))}
      </div>
    </div>
  );
}

/* The three reassurances that sit under the first ask. Each one answers a
   thing this audience worries about before they will call at all. */
export function Trust({ lang }: { lang: Lang }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {["home.trustFree", "home.trustMedicine", "home.trustHome"].map((k) => (
        <span className="tick" key={k}>
          <CheckMark />
          {ui(k, lang)}
        </span>
      ))}
    </div>
  );
}

function CheckMark() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="flex-none">
      <circle cx="10" cy="10" r="9" fill="var(--color-amber-tint)" />
      <path
        d="M6 10.3l2.6 2.6L14 7.5"
        stroke="var(--color-amber-deep)"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Her rating and her certifying body, floated on the photograph rather than
   listed beside it — the badge is read before the picture is, which is the
   point of putting it there. */
export function PhotoBadges({ lang }: { lang: Lang }) {
  const rating = site.google.rating.trim();
  const reviews = site.google.reviews.trim();
  const body = t(site.certifyingBody, lang);
  return (
    <>
      {rating ? (
        <span className="badge absolute bottom-3.5 left-3">
          <span className="stars" aria-hidden="true">
            ★★★★★
          </span>
          {rating}
          {reviews ? (
            <span style={{ fontWeight: 400, color: "var(--color-muted)" }}>
              {" · "}
              {reviews} {ui("home.googleReviews", lang)}
            </span>
          ) : null}
        </span>
      ) : null}
      {body && !isTodo(body) ? (
        <span className="badge absolute right-3 top-3.5 max-w-[78%]">
          <Tx>{ui("about.certTitle", lang).replace("{body}", body)}</Tx>
        </span>
      ) : null}
    </>
  );
}
