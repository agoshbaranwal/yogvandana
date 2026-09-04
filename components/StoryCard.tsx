import { ailmentBySlug, isTodo, type Story, t, ui } from "@/lib/content";
import type { Lang } from "@/lib/routes";
import { LongArrowIcon, PlayIcon } from "./Icons";
import { Photo } from "./Photo";
import { Tx } from "./Tx";

/* A student's result, led by their photograph.

   The photograph is the first thing on the card and the largest, because a
   face is what makes a claim believable to this audience — a number on its own
   is a number. It used to be a 60 px circle with an icon in it and no label,
   which is not a design for a photograph, it is somewhere a photograph was
   forgotten. The frame now says whose picture belongs there. */

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
  const hasResult = before !== "" && after !== "";
  const age = lang === "hi" ? `${story.age} साल` : story.age;

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

        {/* the result, in the report's own terms */}
        {hasResult && metric ? (
          <div className="flex flex-col gap-1">
            <p className="label normal-case">{`${metric} ${ui("stories.before", lang)}`}</p>
            <p className="num page-title flex flex-wrap items-baseline gap-2.5">
              <span style={{ color: "var(--color-muted)" }}>
                <Tx>{before}</Tx>
              </span>
              <LongArrowIcon size={26} style={{ color: "var(--color-deep)" }} />
              <span style={{ color: "var(--color-kohl)" }}>
                <Tx>{after}</Tx>
              </span>
            </p>
            {change || months ? (
              <p className="body font-bold">
                <Tx>
                  {[change, months ? ui("stories.months", lang).replace("{n}", months) : ""]
                    .filter(Boolean)
                    .join(", ")}
                </Tx>
              </p>
            ) : null}
          </div>
        ) : hasResult ? (
          <div className="flex flex-col gap-1.5">
            <p className="body">
              <span className="label normal-case">{ui("stories.before", lang)}</span>{" "}
              <span style={{ color: "var(--color-muted)" }}>
                <Tx>{before}</Tx>
              </span>
            </p>
            <p className="h3">
              <span className="label normal-case">{ui("stories.after", lang)}</span>{" "}
              <Tx>{after}</Tx>
            </p>
            {months ? (
              <p className="body font-bold">
                <Tx>{ui("stories.months", lang).replace("{n}", months)}</Tx>
              </p>
            ) : null}
          </div>
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
