import Link from "next/link";
import {
  awards,
  credentials,
  events,
  gallery,
  mediaLogos,
  routine,
  site,
  t,
  ui,
} from "@/lib/content";
import { href, type Lang } from "@/lib/routes";
import { Photo } from "./Photo";
import { Tx } from "./Tx";

/* ------------------------------- routine --------------------------------- */

export function Routine({ lang }: { lang: Lang }) {
  return (
    <section className="wrap flex flex-col gap-3 py-8 md:py-12">
      <h2 className="h2">{ui("home.routineTitle", lang)}</h2>
      <p className="text-[15px] md:text-[16px]" style={{ color: "var(--color-muted)" }}>
        {t(routine.note, lang)}
      </p>
      <ol className="mt-1 flex flex-col">
        {routine.rows.map((row, i) => (
          <li
            key={i}
            className={`grid grid-cols-[72px_1fr] gap-3 border-t border-rule py-2.5 md:grid-cols-[110px_1fr] md:py-3 ${
              i === routine.rows.length - 1 ? "border-b" : ""
            } ${row.highlight ? "-mx-4 rounded-[10px] px-4 md:-mx-4" : ""}`}
            style={row.highlight ? { background: "var(--color-apricot)" } : undefined}
          >
            <span className="num text-[19px] md:text-[22px]" style={{ color: "var(--color-deep)" }}>
              <Tx>{t(row.time, lang)}</Tx>
            </span>
            <span className="text-[16px] leading-relaxed md:text-[17px]">
              {t(row.strong, lang) ? <strong>{t(row.strong, lang)} </strong> : null}
              <Tx>{t(row.text, lang)}</Tx>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ----------------------------- credibility ------------------------------- */

export function CredibilityBlock({ lang }: { lang: Lang }) {
  const certs = credentials.slice(0, 4);
  const shots = gallery.slice(0, 4);

  type CredCard = { photo: string; kind: string; title: string; meta: string };
  const cards: CredCard[] = [];
  if (events[0])
    cards.push({
      photo: events[0].photo,
      kind: t(events[0].typeLabel, lang),
      title: t(events[0].title, lang),
      meta: `${t(events[0].organiser, lang)} · ${t(events[0].place, lang)} · ${t(events[0].date, lang)}`,
    });
  if (awards[0])
    cards.push({
      photo: awards[0].photo,
      kind: ui("about.awardsTitle", lang),
      title: t(awards[0].name, lang),
      meta: `${t(awards[0].body, lang)} · ${awards[0].year}`,
    });
  if (events[1])
    cards.push({
      photo: events[1].photo,
      kind: t(events[1].typeLabel, lang),
      title: t(events[1].title, lang),
      meta: `${t(events[1].organiser, lang)} · ${t(events[1].place, lang)} · ${t(events[1].date, lang)}`,
    });

  return (
    <section style={{ background: "var(--color-sandal)" }}>
      <div className="wrap flex flex-col gap-7 py-9 md:gap-9 md:py-14">
        <div className="grid gap-5 md:grid-cols-[340px_1fr] md:items-center md:gap-12">
          <Photo
            src=""
            alt={t(site.teacher, lang)}
            label={ui("photo.portrait", lang)}
            ratio="4 / 5"
            rounded="rounded-[16px]"
            className="w-full"
            sizes="(min-width: 768px) 340px, 100vw"
          />
          <div className="flex flex-col gap-3">
            <h2 className="h2">{t(site.teacher, lang)}</h2>
            <p className="max-w-[40em] text-[17px] leading-relaxed md:text-[18px]">
              <Tx>
                {lang === "hi"
                  ? "योग में एम.ए., [विश्वविद्यालय]। [गुरु/संस्था] से सीखा। [X] साल से लखनऊ में और ऑनलाइन सिखा रही हैं। [N] प्रमाणपत्र, हर एक की जाँच की जा सकती है। [N] कार्यक्रमों में मुख्य अतिथि।"
                  : "MA in Yoga, [university]. Studied with [teacher or school]. Teaching for [X] years, in Lucknow and online. [N] certifications, every one of them checkable. Guest of honour at [N] events."}
              </Tx>
            </p>
            <p className="quote text-[18px] md:text-[20px]" style={{ color: "var(--color-deep)" }} lang="sa">
              {site.motto}
            </p>
            <Link href={href("about", lang)} className="link-strong self-start text-[16px]">
              {ui("cta.fullAbout", lang)}
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="label">{ui("home.certsTitle", lang)}</p>
          <ul className="strip">
            {certs.map((c) => (
              <li key={c.id} className="flex w-[96px] flex-none flex-col gap-1.5 md:w-[110px]">
                <Photo
                  src={c.image}
                  alt={`${t(c.name, lang)} — ${t(c.body, lang)}`}
                  label={ui("photo.certificate", lang)}
                  ratio="3 / 4"
                  rounded="rounded-[6px]"
                  className="border border-rule"
                />
                <p className="cap">
                  <Tx>{`${t(c.name, lang)}, ${t(c.body, lang)}`}</Tx>
                </p>
              </li>
            ))}
          </ul>
          <Link href={href("credentials", lang)} className="link-strong self-start text-[15px]">
            {ui("cta.allCerts", lang)}
          </Link>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="label">{ui("home.eventsTitle", lang)}</p>
          <ul className="grid gap-2.5 md:grid-cols-3 md:gap-5">
            {cards.map((item, i) => (
              <li key={i} className="card flex gap-3 p-2.5 md:flex-col md:p-3">
                <Photo
                  src={item.photo}
                  alt={item.title}
                  label={ui("photo.event", lang)}
                  ratio="3 / 2"
                  rounded="rounded-[8px]"
                  className="w-[96px] flex-none md:w-full"
                />
                <div className="flex flex-col gap-0.5">
                  <p className="label" style={{ color: "var(--color-deep)" }}>
                    {item.kind}
                  </p>
                  <p className="text-[15px] font-bold leading-snug md:text-[17px]">
                    <Tx>{item.title}</Tx>
                  </p>
                  <p className="cap">
                    <Tx>{item.meta}</Tx>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <Link href={href("about", lang)} className="link-strong self-start text-[15px]">
            {ui("cta.allEvents", lang)}
          </Link>
        </div>

        <div className="grid gap-7 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col gap-2.5">
            <p className="label">{ui("home.mediaTitle", lang)}</p>
            <ul className="grid grid-cols-4 gap-2 md:gap-3">
              {mediaLogos.map((m) => (
                <li key={m.id}>
                  <Photo
                    src={m.image}
                    alt={t(m.name, lang)}
                    label={ui("photo.logo", lang)}
                    rounded="rounded-[8px]"
                    className="h-11 w-full md:h-14"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-baseline justify-between gap-4">
              <p className="label">{ui("home.galleryTitle", lang)}</p>
              <Link href={href("gallery", lang)} className="tap text-[15px] font-bold">
                {ui("cta.allPhotos", lang)}
              </Link>
            </div>
            <ul className="grid grid-cols-4 gap-2 md:gap-3">
              {shots.map((g) => (
                <li key={g.id}>
                  <Photo
                    src={g.image}
                    alt={t(g.alt, lang)}
                    ratio="1 / 1"
                    rounded="rounded-[8px]"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
