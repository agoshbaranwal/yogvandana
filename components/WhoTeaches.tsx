import { A as Link } from "./Nav";
import { site, t, ui } from "@/lib/content";
import { sectionHref, type Lang } from "@/lib/routes";
import { ChevronIcon } from "./Icons";
import { Photo } from "./Photo";
import { Tx } from "./Tx";

/* Who teaches, in a photograph, three lines and three links to the record:
   the certificate with a link to check it, the honours, the press. */
export function WhoTeaches({ lang }: { lang: Lang }) {
  const numbers = site.numbers;
  const line = ui("home.whoLine", lang)
    .replace("{cred}", t(site.credentialShort, lang))
    .replace("{uni}", t(site.university, lang))
    .replace("{x}", numbers[0]?.value ?? "[X]")
    .replace("{city}", t(site.city, lang));
  const rows = [
    { label: ui("home.recordCerts", lang).replace("{body}", t(site.certifyingBody, lang)), href: sectionHref("register", lang) },
    { label: ui("home.recordEvents", lang).replace("{n}", numbers[3]?.value ?? "[A]"), href: sectionHref("awards", lang) },
    { label: ui("home.recordPhotos", lang), href: sectionHref("media", lang) },
  ];
  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-[1fr_1fr] md:items-start md:gap-14">
      <div className="flex flex-col gap-3.5">
        <h2 className="h2">{ui("home.whoTitle", lang)}</h2>
        <div className="flex items-start gap-3.5 md:gap-6">
          <Photo
            src={site.photos.portrait}
            alt={t(site.teacher, lang)}
            label={ui("photo.teaching", lang)}
            ratio="4 / 5"
            rounded="rounded-[12px]"
            className="w-[112px] flex-none md:w-[200px]"
            sizes="(min-width: 768px) 200px, 112px"
          />
          <div className="flex min-w-0 flex-col gap-1.5">
            <p className="point-sm">{t(site.teacher, lang)}</p>
            <p className="body" style={{ color: "var(--color-heroink)" }}>
              <Tx>{line}</Tx>
            </p>
            <p className="quote body" style={{ color: "var(--color-deep)" }} lang="sa">
              {site.motto}
            </p>
          </div>
        </div>
      </div>
      <ul className="rows flex flex-col md:mt-12">
        {rows.map((r) => (
          <li key={r.href}>
            <Link href={r.href} className="row !px-0">
              <span className="body flex-1 font-bold">
                <Tx>{r.label}</Tx>
              </span>
              <ChevronIcon size={24} className="row-go" style={{ color: "var(--color-deep)" }} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
