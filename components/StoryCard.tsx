import { ailmentBySlug, isTodo, type Story, t, ui } from "@/lib/content";
import type { Lang } from "@/lib/routes";
import { PlayIcon } from "./Icons";
import { Photo } from "./Photo";
import { Tx } from "./Tx";

/* A student's result, sold rather than listed.

   The card is split down the middle: what it was on the left in the support
   tint and the quiet ink, what it is now on the right on the card's own white
   and in full ink, with a strip across the two carrying how long it took. Then
   their words, then their face and name.

   The version before this printed the same facts as a label/value table —
   पहले / अब / समय / और, every line the same size. It was legible and it sold
   nothing: the largest thing in the whole section was 20px, so a reader
   scrolling past had nowhere to look. Agosh: "Think how marketing people do it
   if they are selling something. Success stories is a part of our USP, it's a
   part of the product."

   The same shape carries a lab number and a sentence — "HbA1c 8.2" against
   "HbA1c 6.5", or "सीढ़ियाँ नहीं चढ़ पाते थे" against "रोज़ तीन मंज़िल" —
   because five of the eight conditions have no number to show. */

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
  const withMetric = (v: string) => (v && metric ? `${metric} ${v}` : v);
  /* a lab reading is three characters and can be shouted; a sentence cannot */
  const longResult = Math.max(before.length, after.length) > 16;
  const val = `val${longResult ? " long" : ""}`;

  /* the unit goes inside the blank while the age is missing, or the line reads
     "उम्र साल" — a muted word then a bold one, which looks broken rather than
     unfinished */
  const age = isTodo(story.age)
    ? story.age.replace(/\]$/, lang === "hi" ? " साल]" : " years]")
    : lang === "hi"
      ? `${story.age} साल`
      : story.age;

  const took = [
    months ? ui("stories.months", lang).replace("{n}", months) : "",
    change,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="card storycard overflow-hidden p-0">
      {before || after ? (
        <div className="ba">
          <div className="was">
            <div className="lab">{ui("stories.before", lang)}</div>
            <div className={val}>
              <Tx>{withMetric(before)}</Tx>
            </div>
          </div>
          <div className="now">
            <div className="lab">{ui("stories.after", lang)}</div>
            <div className={val}>
              <Tx>{withMetric(after)}</Tx>
            </div>
          </div>
        </div>
      ) : null}

      {took ? (
        <p className="took">
          <Tx>{took}</Tx>
        </p>
      ) : null}

      <div className="storycard-body flex flex-col gap-4 p-4 md:p-5">
        <blockquote className="body">
          “<Tx>{t(story.quote, lang)}</Tx>”
        </blockquote>

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Photo
              src={story.photo}
              alt={`${t(story.name, lang)}, ${t(story.city, lang)}`}
              label={ui("photo.student", lang)}
              ratio="1 / 1"
              rounded="rounded-full"
              className="w-[52px] flex-none"
              compact
              sizes="52px"
            />
            <p className="cap">
              <span className="h3 block" style={{ color: "var(--color-kohl)" }}>
                <Tx>{`${t(story.name, lang)}, ${age}`}</Tx>
              </span>
              <Tx>{t(story.city, lang)}</Tx>
              {ailment ? ` · ${t(ailment.name, lang)}` : ""}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
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
      </div>
    </article>
  );
}

export const StoryCard = ResultCard;
