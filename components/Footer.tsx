import Link from "next/link";
import { site, t, ui } from "@/lib/content";
import { href, type Lang } from "@/lib/routes";
import { Tx } from "./Tx";

export default function Footer({ lang }: { lang: Lang }) {
  const links: { key: Parameters<typeof href>[0]; label: string }[] = [
    { key: "ailments", label: ui("nav.ailments", lang) },
    { key: "batches", label: ui("nav.batches", lang) },
    { key: "stories", label: ui("nav.stories", lang) },
    { key: "about", label: ui("nav.about", lang) },
    { key: "credentials", label: ui("nav.credentials", lang) },
    { key: "gallery", label: ui("nav.gallery", lang) },
    { key: "contact", label: ui("nav.contact", lang) },
    { key: "privacy", label: ui("legal.privacy", lang) },
    { key: "terms", label: ui("legal.terms", lang) },
    { key: "refund", label: ui("legal.refund", lang) },
  ];

  return (
    <footer
      className="no-print mt-auto"
      style={{ background: "var(--color-kohl)", color: "var(--color-ivory)" }}
    >
      <div className="wrap flex flex-col gap-5 py-8 md:flex-row md:items-end md:justify-between md:gap-10 md:py-10">
        <div className="flex flex-col gap-1.5">
          <div className="brand text-[24px] md:text-[26px]">
            <span style={{ color: "var(--color-bhagwa)" }}>योग</span> वंदना
          </div>
          <div
            className="quote text-[16px]"
            style={{ color: "var(--color-bhagwa)" }}
            lang="sa"
          >
            {site.motto}
          </div>
          <p className="max-w-[40ch] text-[14px] leading-relaxed" style={{ color: "rgba(251,248,241,0.8)" }}>
            {t(site.teacher, lang)}, {t(site.credentialShort, lang)} ·{" "}
            <Tx>{t(site.contact.address, lang)}</Tx>
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-[14px] md:justify-end" aria-label={ui("nav.menu", lang)}>
            {links.map((l) => (
              <Link
                key={l.key}
                href={href(l.key, lang)}
                className="no-underline"
                style={{ color: "var(--color-ivory)" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            href={href("students", lang)}
            className="text-[14px] font-bold no-underline"
            style={{ color: "var(--color-bhagwa)" }}
          >
            {ui("nav.students", lang)}
          </Link>
        </div>
      </div>
    </footer>
  );
}
