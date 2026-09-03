import { NumbersStrip, VideoSlot } from "@/components/Blocks";
import { Photo } from "@/components/Photo";
import SiteShell from "@/components/SiteShell";
import { CertificateRegister, ExperienceAndMemberships } from "./Credentials";
import { Tx } from "@/components/Tx";
import { Jsonld, personSchema } from "@/components/Jsonld";
import {
  awards,
  events,
  gurus,
  journey,
  mediaClippings,
  mediaLogos,
  site,
  t,
  ui,
} from "@/lib/content";
import type { Lang } from "@/lib/routes";

export default function About({ lang }: { lang: Lang }) {
  return (
    <SiteShell lang={lang} routeKey="about" hasBand={false}>
      <Jsonld data={personSchema(lang)} />
      {/* who she is ----------------------------------------------------- */}
      <header style={{ background: "linear-gradient(180deg, var(--color-sky) 0%, var(--color-ivory) 100%)" }}>
        <div className="wrap grid gap-6 py-8 md:grid-cols-[420px_1fr] md:items-center md:gap-14 md:py-12">
          {/* On a phone the full portrait pushed her name below the first
              screen. The name leads now, with a small portrait beside it;
              the desktop keeps the full frame on the left. */}
          <div className="hidden flex-col gap-2.5 md:flex">
            <Photo
              src=""
              alt={t(site.teacher, lang)}
              label={ui("photo.portrait", lang)}
              ratio="4 / 5"
              rounded="rounded-[18px]"
              sizes="420px"
              priority
            />
          </div>

          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-4 md:block">
              <Photo
                src=""
                alt={t(site.teacher, lang)}
                label=""
                ratio="1 / 1"
                rounded="rounded-full"
                className="h-24 w-24 flex-none md:hidden"
                sizes="96px"
                priority
              />
              <div className="flex flex-col gap-1">
                <p className="label" style={{ color: "var(--color-deep)" }}>
                  {ui("about.eyebrow", lang)}
                </p>
                <h1 className="page-title">{t(site.teacher, lang)}</h1>
              </div>
            </div>
            <p className="body" style={{ color: "var(--color-heroink)" }}>
              <Tx>
                {`${t(site.credential, lang)} · ${t(site.city, lang)} · ${t(site.sinceYear, lang)} ${lang === "hi" ? "से सिखा रही हैं" : "teaching since"}`}
              </Tx>
            </p>
            <p className="quote h3" style={{ color: "var(--color-deep)" }} lang="sa">
              {site.motto}
            </p>
            <p className="max-w-[42em] body">
              <Tx>
                {lang === "hi"
                  ? "सब रोग-मुक्त हों। यही मेरी वंदना है, और यही इस नाम का मतलब। [X] साल से मैं यही देख रही हूँ: सही तरीके से, रोज़, किसी की नज़र के सामने किया गया योग हर बीमारी को ठीक कर सकता है।"
                  : "May all be free from disease. That is my prayer, and that is what this name means. For [X] years I have seen the same thing: yoga done properly, every day, with someone watching, can cure any disease."}
              </Tx>
            </p>
            <p className="max-w-[42em] body">
              <Tx>
                {lang === "hi"
                  ? "[उनके अपने शब्दों में दो-तीन पंक्तियाँ: वे क्यों सिखाती हैं, और किस तरह के लोगों के साथ काम करना उन्हें सबसे अच्छा लगता है।]"
                  : "[Two or three lines in her own words: why she teaches, and the kind of students she most likes to work with.]"}
              </Tx>
            </p>
            <div className="flex items-end gap-3.5">
              <Photo
                src=""
                alt={ui("photo.signature", lang)}
                label={ui("photo.signature", lang)}
                className="h-13 w-[150px]"
                rounded="rounded-[8px]"
              />
              <p className="cap">
                {t(site.teacher, lang)}
                <br />
                {t(site.credentialShort, lang)}
              </p>
            </div>
          </div>
        </div>
      </header>

      <NumbersStrip lang={lang} long />

      {/* This page took in the whole register, so it says where things are. */}
      <nav className="wrap flex flex-wrap items-baseline gap-x-5 gap-y-1 py-4 md:py-5" aria-label={ui("about.onThisPage", lang)}>
        <span className="label">{ui("about.onThisPage", lang)}</span>
        {[
          { hash: "#yogyata", label: ui("credentials.title", lang) },
          { hash: "#sammaan", label: ui("about.awardsTitle", lang) },
          { hash: "#karyakram", label: ui("about.eventsTitle", lang) },
          { hash: "#media", label: ui("about.mediaTitle", lang) },
        ].map((item) => (
          <a key={item.hash} href={item.hash} className="tap cap font-bold">
            {item.label}
          </a>
        ))}
      </nav>

      {/* video + teachers ------------------------------------------------ */}
      <div className="wrap grid gap-8 py-8 md:grid-cols-2 md:gap-14 md:py-12">
        <VideoSlot lang={lang} note={ui("about.videoNote", lang)} />
        <section className="flex flex-col gap-3">
          <h2 className="h2">{ui("about.gurusTitle", lang)}</h2>
          <ul className="flex flex-col gap-2.5">
            {gurus.map((g) => (
              <li key={g.id} className="card flex items-center gap-3.5">
                <Photo
                  src={g.photo}
                  alt={t(g.name, lang)}
                  rounded="rounded-full"
                  className="h-16 w-16 flex-none"
                />
                <div className="flex flex-col gap-0.5">
                  <p className="font-bold">
                    <Tx>{t(g.name, lang)}</Tx>
                  </p>
                  <p className="cap">
                    <Tx>{`${t(g.where, lang)} · ${g.years}`}</Tx>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* the journey ----------------------------------------------------- */}
      <section style={{ background: "var(--color-sandal)" }}>
        <div className="wrap flex flex-col gap-5 py-9 md:py-14">
          <h2 className="h2">{ui("about.journeyTitle", lang)}</h2>
          {/* A four-column grid left entries with photographs standing a head
              taller than the ones without, so the years did not line up with
              anything. A timeline reads in one direction: year, then what
              happened, then the picture if there is one. */}
          <ol className="flex flex-col">
            {journey.map((j, i) => (
              <li
                key={j.id}
                className={`grid grid-cols-[64px_1fr] items-start gap-3 border-t border-rule py-3.5 md:grid-cols-[110px_1fr_200px] md:gap-6 md:py-4 ${
                  i === journey.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="num h3" style={{ color: "var(--color-deep)" }}>
                  <Tx>{j.year}</Tx>
                </span>
                <span className="body max-w-[54ch]">
                  <Tx>{t(j.text, lang)}</Tx>
                </span>
                {t(j.photoAlt, lang) ? (
                  <Photo
                    src={j.photo}
                    alt={t(j.photoAlt, lang)}
                    label={t(j.photoAlt, lang)}
                    ratio="3 / 2"
                    rounded="rounded-[10px]"
                    className="col-span-2 md:col-span-1"
                  />
                ) : (
                  <span aria-hidden="true" className="hidden md:block" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* her record, which used to be a page of its own ------------------ */}
      <CertificateRegister lang={lang} />
      <ExperienceAndMemberships lang={lang} />

      {/* awards and events ----------------------------------------------- */}
      <section id="sammaan" style={{ background: "var(--color-sky)" }}>
        <div className="wrap grid gap-8 py-9 md:grid-cols-2 md:gap-14 md:py-14">
          <div className="flex flex-col gap-3.5">
            <h2 className="h2">{ui("about.awardsTitle", lang)}</h2>
            <ul className="flex flex-col gap-2.5">
              {awards.map((a) => (
                <li key={a.id} className="card flex gap-3.5">
                  <Photo
                    src={a.photo}
                    alt={t(a.name, lang)}
                    label={ui("photo.event", lang)}
                    ratio="3 / 2"
                    rounded="rounded-[8px]"
                    className="w-[110px] flex-none"
                  />
                  <div className="flex flex-col gap-0.5">
                    <p className="font-bold leading-snug">
                      <Tx>{t(a.name, lang)}</Tx>
                    </p>
                    <p className="cap">
                      <Tx>{`${t(a.body, lang)} · ${t(a.place, lang)} · ${a.year}`}</Tx>
                    </p>
                    <p className="cap">
                      <Tx>{t(a.forWhat, lang)}</Tx>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div id="karyakram" className="flex flex-col gap-3.5">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="h2">{ui("about.eventsTitle", lang)}</h2>
              <p className="cap">
                {ui("about.updated", lang)} {site.updated}
              </p>
            </div>
            <ul className="flex flex-col gap-2.5">
              {events.map((e) => (
                <li key={e.id} className="card flex gap-3.5">
                  <Photo
                    src={e.photo}
                    alt={t(e.title, lang)}
                    label={ui("photo.event", lang)}
                    ratio="3 / 2"
                    rounded="rounded-[8px]"
                    className="w-[110px] flex-none"
                  />
                  <div className="flex flex-col gap-0.5">
                    <p className="label" style={{ color: "var(--color-deep)" }}>
                      {t(e.typeLabel, lang)}
                    </p>
                    <p className="font-bold leading-snug">
                      <Tx>{t(e.title, lang)}</Tx>
                    </p>
                    <p className="cap">
                      <Tx>{`${t(e.organiser, lang)} · ${t(e.place, lang)} · ${t(e.date, lang)}`}</Tx>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* press ------------------------------------------------------------ */}
      <div className="wrap grid gap-8 py-8 md:gap-14 md:py-12">
        <section id="media" className="flex flex-col gap-3.5">
          <h2 className="h2">{ui("about.mediaTitle", lang)}</h2>
          <ul className="grid grid-cols-2 gap-2.5">
            {mediaLogos.map((m) => (
              <li key={m.id}>
                <Photo
                  src={m.image}
                  alt={t(m.name, lang)}
                  label={ui("photo.logo", lang)}
                  rounded="rounded-[8px]"
                  className="h-14 w-full"
                />
              </li>
            ))}
          </ul>
          <ul className="grid grid-cols-3 gap-2.5">
            {mediaClippings.map((m) => (
              <li key={m.id} className="flex flex-col gap-1.5">
                <Photo
                  src={m.image}
                  alt={t(m.name, lang)}
                  label={ui("photo.clipping", lang)}
                  ratio="3 / 4"
                  rounded="rounded-[8px]"
                />
                <p className="cap">
                  <Tx>{`${t(m.name, lang)}, ${t(m.date, lang)}`}</Tx>
                </p>
              </li>
            ))}
          </ul>
        </section>

      </div>

      {/* invite ---------------------------------------------------------- */}
      <section style={{ background: "var(--color-bhagwa)" }}>
        <div className="wrap flex flex-col gap-3 py-8 md:flex-row md:items-center md:justify-between md:gap-10 md:py-11">
          <div className="flex flex-col gap-2">
            <h2 className="page-title">{ui("about.inviteTitle", lang)}</h2>
            <p className="body">
              {ui("about.inviteLead", lang)}
            </p>
          </div>
          {site.links.profilePdf ? (
            <a
              href={site.links.profilePdf}
              className="link-strong body self-start"
              style={{ color: "var(--color-kohl)" }}
              data-ev="profile_download"
              data-ev-source="about"
            >
              {ui("cta.downloadProfile", lang)}
            </a>
          ) : null}
        </div>
      </section>
    </SiteShell>
  );
}
