import GalleryGrid, { type Shot } from "@/components/GalleryGrid";
import { GALLERY_THEMES, gallery, t, ui } from "@/lib/content";
import { picture } from "@/lib/media";
import type { Lang } from "@/lib/routes";

/* The album, as a section rather than a page. Photographs of classes, camps
   and the stage are evidence of the same thing the stories are evidence of,
   so they live on the same page, under it. */

export function GallerySection({ lang }: { lang: Lang }) {
  const shots: Shot[] = gallery.map((g) => ({
    id: g.id,
    theme: g.theme,
    alt: t(g.alt, lang),
    caption: t(g.caption, lang),
    place: t(g.place, lang),
    date: t(g.date, lang),
    img: picture(g.image),
  }));

  return (
    <section id="gallery" style={{ background: "var(--color-sky)" }}>
      <div className="wrap flex flex-col gap-4 py-9 md:py-14">
        <h2 className="h2">{ui("gallery.title", lang)}</h2>
        <p className="body max-w-[62ch]" style={{ color: "var(--color-muted)" }}>
          {ui("gallery.lead", lang)}
        </p>
        <GalleryGrid
          shots={shots}
          themes={GALLERY_THEMES.map((th) => ({ slug: th, label: ui(`gallery.${th}`, lang) }))}
          allLabel={ui("gallery.all", lang)}
          emptyLabel={ui("gallery.empty", lang)}
          closeLabel={ui("gallery.close", lang)}
          prevLabel={ui("gallery.prev", lang)}
          nextLabel={ui("gallery.next", lang)}
          photoLabel={ui("photo.comingSoon", lang)}
          viewerLabel={ui("gallery.title", lang)}
        />
      </div>
    </section>
  );
}
