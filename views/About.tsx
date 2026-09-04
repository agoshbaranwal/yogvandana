import { NumberCards } from "@/components/Blocks";
import { ChevronIcon, WhatsAppIcon } from "@/components/Icons";
import { Jsonld, personSchema } from "@/components/Jsonld";
import { Photo } from "@/components/Photo";
import SiteShell from "@/components/SiteShell";
import { PendingNote } from "@/components/Pending";
import { Tx } from "@/components/Tx";
import {
  absolute,
  awards,
  type Credential,
  credentials,
  type Ev,
  events,
  experience,
  gurus,
  isTodo,
  journey,
  mediaClippings,
  mediaLogos,
  memberships,
  pending,
  site,
  t,
  ui,
} from "@/lib/content";
import { picture } from "@/lib/media";
import { href, type Lang } from "@/lib/routes";
import { waHref, waMessage } from "@/lib/whatsapp";

/* Who she is, certificate first. Her face and the certifying body's name
   on the first screen; her own words; the four numbers; the government
   certificate large, with the link that checks it; the rest of the register
   as one list; the stage in four photographs; the papers; and the invitation. */

/* Three states, and the difference matters: a link that opens her entry, the
   plain words when the body keeps no public register, or a blank that says
   this has not been filled in yet. Never the second in place of the third. */
function Verify({ credential, lang, pill = false }: { credential: Credential; lang: Lang; pill?: boolean }) {
  if (/^https?:/.test(credential.verifyUrl)) {
    return (
      <a href={credential.verifyUrl} target="_blank" rel="noopener noreferrer" className={pill ? "tap-pill self-start" : "tap cap font-bold"}>
        {pill ? ui("about.checkOnBoard", lang) : ui("about.check", lang)}
        <ChevronIcon size={18} />
      </a>
    );
  }
  if (credential.verifyUrl === "none") {
    return <span className="cap">{ui("about.noRegister", lang)}</span>;
  }
  return (
    <span className="cap">
      <Tx>{ui("credentials.verifyTodo", lang)}</Tx>
    </span>
  );
}


export default function About({ lang }: { lang: Lang }) {
  const page = absolute(href("about", lang));
  const pic = picture(site.photos.portrait);
  const primary = credentials.find((c) => c.id === site.primaryCredential) ?? credentials[0];
  const rest = pending(credentials.filter((c) => c !== primary), (c) => t(c.name, lang));
  const teachers = pending(gurus, (g) => t(g.name, lang));
  const posts = pending(experience, (e) => t(e.institution, lang));
  const bodies = pending(memberships, (m) => t(m.body, lang));
  const logos = pending(mediaLogos, (m) => t(m.name, lang));
  const clippings = pending(mediaClippings, (m) => t(m.name, lang));
  const certified = lang === "hi" ? `${t(site.certifyingBody, lang)} प्रमाणित` : `${t(site.certifyingBody, lang)} certified`;
  const wa = waHref(site.contact.whatsapp, waMessage({ lang, kind: "general", page }));

  /* the stage, in four: one honour, then one event of each kind */
  const tiles: { key: string; title: string; sub: string; photo: string }[] = [];
  const seen = new Set<Ev["type"]>();
  if (awards[0]) tiles.push({ key: awards[0].id, title: t(awards[0].name, lang), sub: `${t(awards[0].body, lang)} · ${awards[0].year}`, photo: awards[0].photo });
  for (const e of events) {
    if (tiles.length >= 4) break;
    if (seen.has(e.type)) continue;
    seen.add(e.type);
    tiles.push({ key: e.id, title: `${t(e.typeLabel, lang)}, ${t(e.title, lang)}`, sub: `${t(e.place, lang)} · ${t(e.date, lang)}`, photo: e.photo });
  }
  for (const a of awards.slice(1)) {
    if (tiles.length >= 4) break;
    tiles.push({ key: a.id, title: t(a.name, lang), sub: `${t(a.body, lang)} · ${a.year}`, photo: a.photo });
  }
  const honours = awards.length + events.length;
  const stage = pending(tiles, (x) => x.title);
  const honourList = pending(awards, (a) => t(a.name, lang));
  const eventList = pending(events, (e) => t(e.title, lang));

  return (
    <SiteShell lang={lang} routeKey="about" hasBand={false}>
      <Jsonld data={personSchema(lang)} />

      {/* 1 · who: her portrait, her name, the body that certified her ----- */}
      <section className="first">
        {/* the phone: the photograph is the screen */}
        <div className="relative h-[360px] overflow-hidden md:hidden">
          {pic ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={pic.src}
              srcSet={pic.srcSet || undefined}
              sizes="100vw"
              alt={t(site.teacher, lang)}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          ) : (
            <p className="cap absolute inset-x-6 top-1/2 -translate-y-1/2 text-center" style={{ color: "var(--color-deeper)" }}>
              {ui("photo.portrait", lang)}
            </p>
          )}
          {pic ? <div className="first-fade" aria-hidden="true" /> : null}
          <div
            className={`${pic ? "on-dark" : "on-bhagwa"} absolute inset-x-4 bottom-4 flex flex-col gap-1.5`}
            style={{ color: pic ? "var(--color-ivory)" : "var(--color-kohl)" }}
            data-on-photo={pic ? "" : undefined}
          >
            <p className="label" style={{ color: pic ? "var(--color-bhagwa)" : "var(--color-deep)" }}>
              {ui("about.eyebrow", lang)}
            </p>
            <h1 className="page-title">{t(site.teacher, lang)}</h1>
            <p className="cap" style={{ color: pic ? "var(--color-ivory)" : "var(--color-kohl)" }}>
              <Tx>{`${t(site.credentialShort, lang)} · `}</Tx>
              <strong>
                <Tx>{certified}</Tx>
              </strong>
              <br />
              <Tx>{`${t(site.city, lang)} · ${ui("about.teachingSince", lang).replace("{y}", t(site.sinceYear, lang))}`}</Tx>
            </p>
          </div>
        </div>

        {/* the desktop: a framed portrait beside her name */}
        <div className="wrap hidden md:grid md:min-h-[460px] md:grid-cols-[1fr_340px] md:items-center md:gap-16">
          <div className="flex flex-col gap-3 py-14">
            <p className="label" style={{ color: "var(--color-deeper)" }}>
              {ui("about.eyebrow", lang)}
            </p>
            <h1 className="claim">{t(site.teacher, lang)}</h1>
            <p className="body font-bold" style={{ color: "var(--color-deeper)" }}>
              <Tx>{`${t(site.credentialShort, lang)} · ${certified}`}</Tx>
            </p>
            <p className="body" style={{ color: "var(--color-heroink)" }}>
              <Tx>{`${t(site.city, lang)} · ${ui("about.teachingSince", lang).replace("{y}", t(site.sinceYear, lang))}`}</Tx>
            </p>
          </div>
          <Photo
            src={site.photos.portrait}
            alt={t(site.teacher, lang)}
            label={ui("photo.portrait", lang)}
            ratio="4 / 5"
            rounded="rounded-[12px]"
            className="w-full"
            sizes="340px"
            priority
          />
        </div>
      </section>

      {/* 2 · her own words, and the motto --------------------------------- */}
      <section>
        <div className="wrap flex flex-col gap-3 pb-2 pt-6 md:pt-12">
          {/* the motto is the point of this section — it is the name's meaning
              and the whole reason she gives for teaching, so it leads */}
          <p className="point-sm" lang="sa" style={{ color: "var(--color-deep)" }}>
            {site.motto}
          </p>
          <p className="body" style={{ color: "var(--color-muted)" }} lang={lang}>
            — {t(site.mottoGloss, lang)}
          </p>
          <p className="body">
            <Tx>{t(site.about.intro, lang)}</Tx>
          </p>
          <p className="body">
            <Tx>{t(site.about.words, lang)}</Tx>
          </p>
          <div className="flex items-end gap-3 pt-1">
            {site.photos.signature ? (
              <Photo src={site.photos.signature} alt={ui("photo.signature", lang)} className="h-11 w-[140px]" rounded="rounded-[12px]" />
            ) : (
              <span className="pad-sign !w-[140px] !h-11" aria-hidden="true" />
            )}
            <p className="cap">{t(site.teacher, lang)}</p>
          </div>
          {/* the numbers appear once at least one is real; four cards each
              holding a single blank letter said nothing at all */}
          {site.numbers.some((n) => !isTodo(n.value)) ? (
            <div className="pt-3">
              <NumberCards lang={lang} />
            </div>
          ) : null}
        </div>
      </section>

      {/* 3 · her record: the certificate that proves it, then the rest ----- */}
      {primary ? (
        <section id="yogyata" className="border-t border-rule">
          <div className="wrap flex flex-col gap-3 pb-2 pt-6 md:pt-10">
            <h2 className="h2">{ui("about.studyTitle", lang)}</h2>
            <div className="card overflow-hidden p-0 md:grid md:grid-cols-[300px_1fr]">
              <Photo
                src={primary.image}
                alt={`${t(primary.name, lang)} — ${t(primary.body, lang)}`}
                label={ui("about.certScan", lang)}
                ratio="4 / 3"
                rounded="rounded-none"
                className="w-full border-b border-rule md:border-b-0 md:border-r"
                sizes="(min-width: 768px) 300px, 100vw"
              />
              <div className="flex flex-col gap-2 px-4 py-4 md:justify-center md:px-6">
                <p className="h3">
                  <Tx>{t(primary.name, lang)}</Tx>
                </p>
                <p className="cap">
                  <Tx>
                    {[t(primary.body, lang), primary.year, primary.number ? ui("about.certNo", lang).replace("{n}", primary.number) : ""]
                      .filter(Boolean)
                      .join(" · ")}
                  </Tx>
                </p>
                <Verify credential={primary} lang={lang} pill />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* the rest of the register: the same idea, so not a new section */}
      <div>
        <div className="wrap flex flex-col gap-1 pb-4">
          <ul className="flex flex-col border-b border-rule">
            {rest.shown.map((c) => (
              <li key={c.id} className="flex items-center gap-3.5 border-t border-rule py-3.5">
                <Photo
                  src={c.image}
                  alt={`${t(c.name, lang)} — ${t(c.body, lang)}`}
                  label={ui("photo.certificate", lang)}
                  ratio="3 / 4"
                  rounded="rounded-[12px]"
                  className="w-[104px] flex-none md:w-[124px]"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p className="body font-bold leading-snug">
                    <Tx>{t(c.name, lang)}</Tx>
                  </p>
                  <p className="cap">
                    <Tx>{[t(c.body, lang), c.year, t(c.hours, lang)].filter((x) => x.trim()).join(" · ")}</Tx>
                  </p>
                  <Verify credential={c} lang={lang} />
                </div>
              </li>
            ))}
          </ul>
          <PendingNote lang={lang} n={rest.hidden} />

          {gurus.length > 0 ? (
            <>
              <h3 className="h3 pt-6">{ui("about.gurusTitle", lang)}</h3>
              <ul className="flex flex-col border-b border-rule">
                {teachers.shown.map((g) => (
                  <li key={g.id} className="flex items-center gap-3.5 border-t border-rule py-3">
                    <Photo src={g.photo} alt={t(g.name, lang)} label={ui("photo.guru", lang)} ratio="1 / 1" rounded="rounded-[12px]" className="w-[84px] flex-none" />
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <p className="body font-bold leading-snug">
                        <Tx>{t(g.name, lang)}</Tx>
                      </p>
                      <p className="cap">
                        <Tx>{`${t(g.where, lang)} · ${g.years}`}</Tx>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <PendingNote lang={lang} n={teachers.hidden} />
            </>
          ) : null}

          {experience.length + memberships.length > 0 ? (
            <>
              <h3 className="h3 pt-6">{ui("about.expTitle", lang)}</h3>
              <ul className="flex flex-col border-b border-rule">
                {posts.shown.map((e) => (
                  <li key={e.id} className="flex items-baseline justify-between gap-3 border-t border-rule py-3">
                    <span className="body">
                      <strong>
                        <Tx>{t(e.institution, lang)}</Tx>
                      </strong>{" "}
                      <Tx>{`· ${t(e.role, lang)}`}</Tx>
                    </span>
                    <span className="cap num font-normal">
                      <Tx>{e.years}</Tx>
                    </span>
                  </li>
                ))}
                {bodies.shown.map((m) => (
                  <li key={m.id} className="flex items-baseline justify-between gap-3 border-t border-rule py-3">
                    <span className="body font-bold">
                      <Tx>{t(m.body, lang)}</Tx>
                    </span>
                    <span className="cap num font-normal">
                      <Tx>{ui("about.since", lang).replace("{y}", m.since)}</Tx>
                    </span>
                  </li>
                ))}
              </ul>
              <PendingNote lang={lang} n={posts.hidden + bodies.hidden} />
            </>
          ) : null}
        </div>
      </div>

      {/* 6 · the journey ---------------------------------------------------- */}
      {journey.length > 0 ? (
        <section className="border-t border-rule">
          <div className="wrap flex flex-col gap-3 section-pad">
            <h2 className="h2">{ui("about.journeyTitle", lang)}</h2>
            <ol className="flex flex-col border-b border-rule">
              {journey.map((j) => (
                <li key={j.id} className="grid grid-cols-[64px_1fr] items-start gap-3 border-t border-rule py-3 md:grid-cols-[96px_1fr_180px] md:gap-6">
                  <span className="num h3" style={{ color: "var(--color-deep)" }}>
                    <Tx>{j.year}</Tx>
                  </span>
                  <span className="body">
                    <Tx>{t(j.text, lang)}</Tx>
                  </span>
                  {t(j.photoAlt, lang) && j.photo ? (
                    <Photo src={j.photo} alt={t(j.photoAlt, lang)} label={t(j.photoAlt, lang)} ratio="3 / 2" rounded="rounded-[12px]" className="col-span-2 md:col-span-1" />
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* 7 · the stage: honours and events, in four photographs ----------- */}
      <section id="sammaan" style={{ background: "var(--color-sky)" }}>
        <div className="wrap flex flex-col gap-3.5 section-pad">
          <h2 className="h2">{ui("about.stageTitle", lang)}</h2>
          <ul className="flex flex-wrap gap-2.5 md:gap-4">
            {stage.shown.map((tile) => (
              <li key={tile.key} className="flex w-[calc(50%-5px)] flex-col gap-1.5 md:w-[200px]">
                <Photo src={tile.photo} alt={tile.title} label={ui("photo.event", lang)} ratio="4 / 3" rounded="rounded-[12px]" />
                <p className="cap font-bold leading-snug" style={{ color: "var(--color-kohl)" }}>
                  <Tx>{tile.title}</Tx>
                </p>
                <p className="cap">
                  <Tx>{tile.sub}</Tx>
                </p>
              </li>
            ))}
          </ul>
          <PendingNote lang={lang} n={stage.hidden} />
          <details className="faq-item border-b border-rule">
            <summary>{ui("about.fullList", lang).replace("{n}", String(honours))}</summary>
            <div className="flex flex-col gap-5 pb-4">
              <div className="flex flex-col gap-1">
                <h3 className="h3">{ui("about.awardsTitle", lang)}</h3>
                <ul className="flex flex-col">
                  {honourList.shown.map((a) => (
                    <li key={a.id} className="flex flex-col gap-0.5 border-t border-rule py-2.5">
                      <p className="body font-bold leading-snug">
                        <Tx>{t(a.name, lang)}</Tx>
                      </p>
                      <p className="cap">
                        <Tx>{`${t(a.body, lang)} · ${t(a.place, lang)} · ${a.year} · ${t(a.forWhat, lang)}`}</Tx>
                      </p>
                    </li>
                  ))}
                </ul>
                <PendingNote lang={lang} n={honourList.hidden} />
              </div>
              <div id="karyakram" className="flex flex-col gap-1">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="h3">{ui("about.eventsTitle", lang)}</h3>
                  <p className="cap">
                    {ui("about.updated", lang)} {site.updated}
                  </p>
                </div>
                <ul className="flex flex-col">
                  {eventList.shown.map((e) => (
                    <li key={e.id} className="flex flex-col gap-0.5 border-t border-rule py-2.5">
                      <p className="body font-bold leading-snug">
                        <Tx>{`${t(e.typeLabel, lang)} · ${t(e.title, lang)}`}</Tx>
                      </p>
                      <p className="cap">
                        <Tx>{`${t(e.organiser, lang)} · ${t(e.place, lang)} · ${t(e.date, lang)}`}</Tx>
                      </p>
                    </li>
                  ))}
                </ul>
                <PendingNote lang={lang} n={eventList.hidden} />
              </div>
            </div>
          </details>
        </div>
      </section>

      {/* 8 · in the papers -------------------------------------------------- */}
      <section id="media">
        <div className="wrap flex flex-col gap-3.5 section-pad">
          <h2 className="h2">{ui("about.mediaTitle", lang)}</h2>
          {mediaLogos.length > 0 ? (
            <ul className="flex flex-wrap gap-2.5">
              {logos.shown.map((m) => (
                <li key={m.id} className="w-[calc(50%-5px)] md:w-[190px]">
                  <Photo src={m.image} alt={t(m.name, lang)} label={ui("photo.logo", lang)} ratio="5 / 2" rounded="rounded-[12px]" className="w-full" />
                </li>
              ))}
            </ul>
          ) : null}
          <PendingNote lang={lang} n={logos.hidden} />
          <ul className="flex flex-wrap gap-2.5">
            {clippings.shown.map((m) => (
              <li key={m.id} className="flex w-[calc(50%-5px)] flex-col gap-1.5 md:w-[170px]">
                <Photo src={m.image} alt={t(m.name, lang)} label={ui("photo.clipping", lang)} ratio="3 / 4" rounded="rounded-[12px]" />
                <p className="cap">
                  <Tx>{`${t(m.name, lang)} · ${t(m.date, lang)}`}</Tx>
                </p>
              </li>
            ))}
          </ul>
          <PendingNote lang={lang} n={clippings.hidden} />
        </div>
      </section>

      {/* 9 · the invitation ------------------------------------------------- */}
      <section className="on-bhagwa" style={{ background: "var(--color-bhagwa)" }}>
        <div className="wrap flex flex-col gap-3.5 py-8 md:grid md:grid-cols-2 md:items-center md:gap-14 md:py-12">
          <div className="flex flex-col gap-2">
            <h2 className="page-title">{ui("about.inviteTitle", lang)}</h2>
            <p className="body">{ui("about.inviteLead", lang)}</p>
          </div>
          <div className="flex flex-col gap-2.5">
            <a href={wa} target="_blank" rel="noopener noreferrer" data-ev="whatsapp_click" data-ev-source="about-invite" className="btn btn-dark">
              <WhatsAppIcon size={22} />
              {ui("cta.whatsappTalk", lang)}
            </a>
            {site.links.profilePdf ? (
              <a href={site.links.profilePdf} className="link-strong body self-start" style={{ color: "var(--color-kohl)" }} data-ev="profile_download" data-ev-source="about">
                {ui("cta.downloadProfile", lang)}
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
