import { ailmentBySlug, FAMILY_COLOUR, isTodo, type Story, t, ui } from "@/lib/content";
import type { Lang } from "@/lib/routes";
import { LongArrowIcon, PlayIcon } from "./Icons";
import { Photo } from "./Photo";
import { Tx } from "./Tx";

/* A result card. The audience came to see what happened to the report and to
   the medicine, so the result is the largest thing on the card: a number that
   went from here to there, or in plain words what a person can do now that
   they could not before. The face, the age and the city make it a person. */

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
  const colour = ailment ? FAMILY_COLOUR[ailment.family] : FAMILY_COLOUR.metabolic;
  const metric = t(story.metric, lang).trim();
  const before = t(story.before, lang).trim();
  const after = t(story.after, lang).trim();
  const change = t(story.change, lang).trim();
  const months = story.months.trim();
  const hasResult = before !== "" && after !== "";
  const tail = [change, months ? ui("stories.months", lang).replace("{n}", months) : ""].filter(Boolean);
  const age = lang === "hi" ? `${story.age} साल` : story.age;

  return (
    <article className="card flex h-full flex-col gap-3">
      <div className="flex items-center gap-3">
        <Photo
          src={story.photo}
          alt={`${t(story.name, lang)}, ${t(story.city, lang)}`}
          label={ui("photo.student", lang)}
          compact
          rounded="rounded-full"
          className="h-[60px] w-[60px] flex-none"
        />
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="h3">
            <Tx>{`${t(story.name, lang)}, ${age}`}</Tx>
          </p>
          <p className="cap flex flex-wrap items-center gap-2">
            <Tx>{t(story.city, lang)}</Tx>
            {ailment ? (
              <span className="chip" style={{ background: colour.ink }}>
                {t(ailment.name, lang)}
              </span>
            ) : null}
          </p>
        </div>
      </div>

      {hasResult && metric ? (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-[12px] px-3.5 py-3" style={{ background: "var(--color-ivory)" }}>
          <div className="flex min-w-0 flex-col">
            <p className="label normal-case">{`${metric} ${ui("stories.before", lang)}`}</p>
            <p className="num page-title" style={{ color: "var(--color-muted)" }}>
              <Tx>{before}</Tx>
            </p>
          </div>
          <LongArrowIcon size={30} style={{ color: "var(--color-deep)" }} />
          <div className="flex min-w-0 flex-col">
            <p className="label" style={{ color: "var(--color-deeper)" }}>
              {ui("stories.after", lang)}
            </p>
            <p className="num page-title" style={{ color: "var(--color-deeper)" }}>
              <Tx>{after}</Tx>
            </p>
          </div>
          {tail.length > 0 ? (
            <div className="ml-auto flex flex-col items-end gap-1 text-right">
              {/* wraps under the numbers when the card is narrow */}
              {change ? (
                <span className="result-pill">
                  <Tx>{change}</Tx>
                </span>
              ) : null}
              {months ? (
                <span className="cap">
                  <Tx>{ui("stories.months", lang).replace("{n}", months)}</Tx>
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : hasResult ? (
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-0.5 rounded-[12px] px-3.5 py-3" style={{ background: "var(--color-ivory)" }}>
              <p className="label">{ui("stories.before", lang)}</p>
              <p className="h3" style={{ color: "var(--color-muted)" }}>
                <Tx>{before}</Tx>
              </p>
            </div>
            <div className="flex flex-col gap-0.5 rounded-[12px] px-3.5 py-3" style={{ background: "var(--color-apricot)" }}>
              <p className="label" style={{ color: "var(--color-deeper)" }}>
                {ui("stories.after", lang)}
              </p>
              <p className="h3" style={{ color: "var(--color-deeper)" }}>
                <Tx>{after}</Tx>
              </p>
            </div>
          </div>
          {tail.length > 0 ? (
            <p className="cap font-bold" style={{ color: "var(--color-deeper)" }}>
              <Tx>{tail.join(" · ")}</Tx>
            </p>
          ) : null}
        </div>
      ) : null}

      <blockquote className="body" style={{ color: "var(--color-heroink)" }}>
        “<Tx>{t(story.quote, lang)}</Tx>”
      </blockquote>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        {/* a pill offering a video that does not exist yet is an affordance
            for nothing; it appears the day the link is real */}
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
    </article>
  );
}

/* The old name, so every page that asked for a story card gets the result card. */
export const StoryCard = ResultCard;
