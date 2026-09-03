import Band from "@/components/Band";
import { ShareLink } from "@/components/Blocks";
import Filter from "@/components/Filter";
import SiteShell from "@/components/SiteShell";
import { StoryCard } from "@/components/StoryCard";
import { GallerySection } from "./Gallery";
import { absolute, ailments, stories, t, ui } from "@/lib/content";
import { href, type Lang } from "@/lib/routes";

export default function Stories({ lang }: { lang: Lang }) {
  const page = absolute(href("stories", lang));
  const used = new Set(stories.map((s) => s.ailmentSlug));

  return (
    <SiteShell lang={lang} routeKey="stories">
      <header style={{ background: "linear-gradient(180deg, var(--color-sky) 0%, var(--color-ivory) 100%)" }}>
        <div className="wrap flex flex-col gap-2.5 py-8 md:py-12">
          <h1 className="page-title">{ui("stories.title", lang)}</h1>
          <p className="body max-w-[62ch]" style={{ color: "var(--color-heroink)" }}>
            {ui("stories.lead", lang)}
          </p>
        </div>
      </header>

      <section className="wrap flex flex-col gap-4 py-7 md:py-11">
        <Filter
          event="stories_filter"
          allLabel={ui("stories.all", lang)}
          emptyLabel={ui("stories.empty", lang)}
          chips={ailments
            .filter((a) => used.has(a.slug))
            .map((a) => ({ slug: a.slug, label: t(a.name, lang) }))}
          items={stories.map((s) => ({
            key: s.id,
            slug: s.ailmentSlug,
            node: (
              <StoryCard
                story={s}
                lang={lang}
                showVideo
                share={
                  <ShareLink
                    label={ui("cta.shareStory", lang)}
                    title={`${t(s.name, lang)}, ${t(s.city, lang)} — ${ui("stories.title", lang)}`}
                    url={page}
                    source="story"
                  />
                }
              />
            ),
          }))}
        />
        <p className="cap max-w-[68ch]">{ui("stories.consent", lang)}</p>
      </section>

      {/* the album, on the same page: photographs prove the same thing */}
      <GallerySection lang={lang} />

      <Band lang={lang} routeKey="stories" source="stories" />
    </SiteShell>
  );
}
