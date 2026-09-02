import Band from "@/components/Band";
import GalleryGrid, { type Shot } from "@/components/GalleryGrid";
import SiteShell from "@/components/SiteShell";
import { gallery, GALLERY_THEMES, t, ui } from "@/lib/content";
import { picture } from "@/lib/media";
import type { Lang } from "@/lib/routes";

export default function Gallery({ lang }: { lang: Lang }) {
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
    <SiteShell lang={lang} routeKey="gallery">
      <header style={{ background: "linear-gradient(180deg, var(--color-sky) 0%, var(--color-ivory) 100%)" }}>
        <div className="wrap flex flex-col gap-2.5 py-8 md:py-12">
          <h1 className="page-title">{ui("gallery.title", lang)}</h1>
          <p className="lead max-w-[62ch]" style={{ color: "var(--color-heroink)" }}>
            {ui("gallery.lead", lang)}
          </p>
        </div>
      </header>

      <section className="wrap py-7 md:py-11">
        <GalleryGrid
          shots={shots}
          themes={GALLERY_THEMES.map((th) => ({ slug: th, label: ui(`gallery.${th}`, lang) }))}
          allLabel={ui("gallery.all", lang)}
          emptyLabel={ui("gallery.empty", lang)}
          closeLabel={ui("gallery.close", lang)}
          prevLabel={ui("gallery.prev", lang)}
          nextLabel={ui("gallery.next", lang)}
          photoLabel={ui("photo.comingSoon", lang)}
        />
      </section>

      <Band lang={lang} routeKey="gallery" source="gallery" />
    </SiteShell>
  );
}
