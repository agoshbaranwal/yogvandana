import { ailmentBySlug, FAMILY_COLOUR, type Story, t, ui } from "@/lib/content";
import type { Lang } from "@/lib/routes";
import { PlayIcon } from "./Icons";
import { Photo } from "./Photo";
import { Tx } from "./Tx";

/* A result card always names the condition, so the proof matches the problem
   the visitor arrived with. */

export function StoryCard({
  story,
  lang,
  showBeforeAfter = true,
  showVideo = false,
  share,
}: {
  story: Story;
  lang: Lang;
  showBeforeAfter?: boolean;
  showVideo?: boolean;
  share?: React.ReactNode;
}) {
  const ailment = ailmentBySlug(story.ailmentSlug);
  const colour = ailment ? FAMILY_COLOUR[ailment.family] : FAMILY_COLOUR.metabolic;
  const hasBA = showBeforeAfter && t(story.before, lang).trim() !== "";

  return (
    <article className="card flex h-full gap-3">
      <Photo
        src={story.photo}
        alt={`${t(story.name, lang)}, ${t(story.city, lang)}`}
        rounded="rounded-full"
        className="h-12 w-12 flex-none md:h-13 md:w-13"
      />
      <div className="flex min-w-0 flex-col gap-1.5">
        <p className="flex flex-wrap items-center gap-2">
          <span className="font-bold">
            <Tx>{`${t(story.name, lang)}, ${t(story.city, lang)}`}</Tx>
          </span>
          {ailment ? (
            <span className="chip" style={{ background: colour.ink }}>
              {t(ailment.name, lang)}
            </span>
          ) : null}
        </p>
        <blockquote className="text-[16px] leading-relaxed">
          “<Tx>{t(story.quote, lang)}</Tx>”
        </blockquote>

        {hasBA ? (
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-[8px] px-2.5 py-1.5" style={{ background: "var(--color-ivory)" }}>
              <p className="label text-[11px]">{ui("stories.before", lang)}</p>
              <p className="text-[15px] font-bold leading-snug">
                <Tx>{t(story.before, lang)}</Tx>
              </p>
            </div>
            <div className="rounded-[8px] px-2.5 py-1.5" style={{ background: "var(--color-apricot)" }}>
              <p className="label text-[11px]">{ui("stories.after", lang)}</p>
              <p className="text-[15px] font-bold leading-snug">
                <Tx>{t(story.after, lang)}</Tx>
              </p>
            </div>
          </div>
        ) : null}

        {story.video && showVideo ? (
          <div className="flex flex-col gap-1.5">
            <div
              className="ph relative flex items-center justify-center rounded-[10px]"
              style={{ aspectRatio: "16 / 9" }}
              role="img"
              aria-label={ui("photo.video", lang)}
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ background: colour.ink, color: "var(--color-ivory)" }}
                aria-hidden="true"
              >
                <PlayIcon size={20} />
              </span>
            </div>
            <p className="cap">{ui("stories.videoSeconds", lang)}</p>
          </div>
        ) : null}

        <p className="cap">
          <Tx>{ui("stories.with", lang).replace("{y}", t(story.since, lang))}</Tx>
        </p>
        {share}
      </div>
    </article>
  );
}
