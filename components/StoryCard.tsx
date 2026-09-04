import { ailmentBySlug, isTodo, type Story, t, ui } from "@/lib/content";
import type { Lang } from "@/lib/routes";
import { PlayIcon } from "./Icons";
import { Photo } from "./Photo";
import { Tx } from "./Tx";

/* A student's result, led by their photograph and read as a record.

   The photograph is first and largest, because a face is what makes a claim
   believable to this audience — a number on its own is a number.

   Under it the facts are LABELLED ROWS, not a run of sentences. The card used
   to print "HbA1c पहले" over "8.2 → 6.5" and then a bolded fragment, so a
   reader met every number before being told what it meant, and three different
   bold things competed for the eye. Now every line is the same shape — the
   word on the left says what the value on the right is — and only one line,
   "अब", carries the payoff. A result with a measurement and a result told in
   plain words take the same shape, so the column reads as one thing. */

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  if (!value) return null;
  return (
    <>
      <dt className="cap" style={{ color: "var(--color-muted)" }}>
        {label}
      </dt>
      <dd className={strong ? "h3" : "body"}>
        <Tx>{value}</Tx>
      </dd>
    </>
  );
}

export function ResultCard({
  story,
  lang,
  showVideo = false,
  share,
}: {
  story: Story;
  lang: Lang;
  showVideo?: boolean;
  share?: React.ReactNode;
}) {
  const ailment = ailmentBySlug(story.ailmentSlug);
  const metric = t(story.metric, lang).trim();
  const before = t(story.before, lang).trim();
  const after = t(story.after, lang).trim();
  const change = t(story.change, lang).trim();
  const months = story.months.trim();
  /* the unit goes INSIDE the blank while the age is still missing, or the card
     reads "उम्र साल" — a muted word followed by a bold one, which looks like a
     broken sentence rather than a fact not filled in yet */
  const age = isTodo(story.age)
    ? story.age.replace(/\]$/, lang === "hi" ? " साल]" : " years]")
    : lang === "hi"
      ? `${story.age} साल`
      : story.age;

  /* a measurement names itself on the value, so the label column stays the
     same four words on every card in the row */
  const withMetric = (v: string) => (v && metric ? `${metric} ${v}` : v);

  return (
    <article className="card flex h-full flex-col gap-3 p-0">
      <Photo
        src={story.photo}
        alt={`${t(story.name, lang)}, ${t(story.city, lang)}`}
        label={ui("photo.student", lang)}
        ratio="4 / 3"
        rounded="rounded-none"
        className="w-full rounded-t-[12px]"
        sizes="(min-width: 768px) 340px, 100vw"
      />

      <div className="flex flex-1 flex-col gap-3 px-4 pb-4">
        <div className="flex flex-col gap-1">
          <p className="h3">
            <Tx>{`${t(story.name, lang)}, ${age}`}</Tx>
          </p>
          <p className="cap flex flex-wrap items-center gap-2">
            <Tx>{t(story.city, lang)}</Tx>
            {ailment ? <span className="chip">{t(ailment.name, lang)}</span> : null}
          </p>
        </div>

        {before || after || months || change ? (
          <dl className="rec grid grid-cols-[auto_1fr] items-baseline gap-y-2">
            <Row label={ui("stories.before", lang)} value={withMetric(before)} />
            <Row label={ui("stories.after", lang)} value={withMetric(after)} strong />
            <Row
              label={ui("stories.timeLabel", lang)}
              value={months ? ui("stories.months", lang).replace("{n}", months) : ""}
            />
            <Row label={ui("stories.alsoLabel", lang)} value={change} />
          </dl>
        ) : null}

        <blockquote className="body" style={{ color: "var(--color-heroink)" }}>
          “<Tx>{t(story.quote, lang)}</Tx>”
        </blockquote>

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2">
          {showVideo && story.video && !isTodo(story.video) ? (
            <span className="tap-pill" role="img" aria-label={ui("photo.video", lang)}>
              <PlayIcon size={16} />
              <Tx>{ui("stories.videoSeconds", lang)}</Tx>
            </span>
          ) : null}
          <span className="cap">
            <Tx>{ui("stories.withSince", lang).replace("{y}", t(story.since, lang))}</Tx>
          </span>
        </div>
        {share}
      </div>
    </article>
  );
}

export const StoryCard = ResultCard;
