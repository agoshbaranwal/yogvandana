import { ailmentBySlug, isTodo, realStories, t, ui } from "@/lib/content";
import type { Lang } from "@/lib/routes";
import { Photo } from "./Photo";
import { PlayIcon } from "./Icons";
import { Tx } from "./Tx";

/* Students in their own voice, on video.

   A written quote is evidence; a face saying it is proof. This audience has
   watched a thousand of these on WhatsApp and reads the shape of one before
   they read a word of the page. Nothing is invented: a card only appears when
   the student has actually given a video. */

export function VideoWall({ lang }: { lang: Lang }) {
  const shown = realStories.filter((s) => s.video && !isTodo(s.video)).slice(0, 3);

  if (shown.length === 0) {
    return (
      <p className="body" style={{ color: "var(--color-heroink)" }}>
        {ui("home.videosPending", lang)}
      </p>
    );
  }

  return (
    <div className="vids">
      {shown.map((s) => {
        const ailment = ailmentBySlug(s.ailmentSlug);
        const after = t(s.after, lang).trim();
        return (
          <a key={s.id} className="vid" href={s.video} target="_blank" rel="noopener noreferrer" data-ev="story_video">
            <span className="thumb block">
              <Photo
                src={s.photo}
                alt={t(s.name, lang)}
                label={ui("photo.student", lang)}
                ratio="4 / 3"
                rounded="rounded-none"
                className="w-full"
                sizes="(min-width: 768px) 340px, 50vw"
              />
              <span className="play">
                <span>
                  <PlayIcon size={20} />
                </span>
              </span>
            </span>
            <span className="block px-3.5 pb-3.5 pt-3">
              {after ? (
                <span className="rb">
                  <Tx>{after}</Tx>
                </span>
              ) : null}
              <span className="h3 mt-1.5 block">
                <Tx>{t(s.name, lang)}</Tx>
              </span>
              <span className="cap block">
                <Tx>{t(s.city, lang)}</Tx>
                {ailment ? ` · ${t(ailment.name, lang)}` : ""}
              </span>
            </span>
          </a>
        );
      })}
    </div>
  );
}
