import { Photo } from "@/components/Photo";
import { Tx } from "@/components/Tx";
import { credentials, experience, memberships, t, ui } from "@/lib/content";
import type { Lang } from "@/lib/routes";

/* Three states, and the difference matters: a link that opens her entry, the
   plain words when the body keeps no public register, or a blank that says
   this has not been filled in yet. Never the second in place of the third. */
function Verify({
  credential,
  lang,
  small = false,
}: {
  credential: (typeof credentials)[number];
  lang: Lang;
  small?: boolean;
}) {
  if (/^https?:/.test(credential.verifyUrl)) {
    return (
      <a
        href={credential.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={small ? "tap cap font-bold" : undefined}
      >
        {t(credential.verifyLabel, lang)}
      </a>
    );
  }
  if (credential.verifyUrl === "none") {
    return (
      <span className={small ? "cap" : undefined} style={{ color: "var(--color-muted)" }}>
        {ui("credentials.noRegistry", lang)}
      </span>
    );
  }
  return (
    <span className={small ? "cap" : undefined}>
      <Tx>{ui("credentials.verifyTodo", lang)}</Tx>
    </span>
  );
}

/* Her record, as sections rather than a page of its own: the register belongs
   next to her story, not one click away from it. */

export function CertificateRegister({ lang }: { lang: Lang }) {
  const cols = [
    ui("credentials.colName", lang),
    ui("credentials.colBody", lang),
    ui("credentials.colYear", lang),
    ui("credentials.colHours", lang),
    ui("credentials.colImage", lang),
    ui("credentials.colVerify", lang),
  ];

  return (
    <section id="yogyata" className="wrap flex flex-col gap-4 py-8 md:py-12">
      <h2 className="h2">{ui("credentials.title", lang)}</h2>
      <p className="body max-w-[62ch]" style={{ color: "var(--color-muted)" }}>
        {ui("credentials.lead", lang)}
      </p>
      <div>
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse overflow-hidden rounded-[14px] body">
            <thead>
              <tr>
                {cols.map((c) => (
                  <th
                    key={c}
                    scope="col"
                    className="cap border-b-2 px-4 py-3.5 text-left font-bold"
                    style={{ background: "var(--color-apricot)", borderColor: "var(--color-kohl)" }}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody style={{ background: "var(--color-paper)" }}>
              {credentials.map((c) => (
                <tr key={c.id}>
                  <td className="border-b border-rule px-4 py-4 font-bold align-top">
                    <Tx>{t(c.name, lang)}</Tx>
                  </td>
                  <td className="border-b border-rule px-4 py-4 align-top">
                    <Tx>{t(c.body, lang)}</Tx>
                  </td>
                  <td className="border-b border-rule px-4 py-4 align-top tabular-nums">
                    <Tx>{c.year}</Tx>
                  </td>
                  <td className="border-b border-rule px-4 py-4 align-top">
                    <Tx>{t(c.hours, lang)}</Tx>
                  </td>
                  <td className="border-b border-rule px-4 py-4 align-top">
                    <Photo
                      src={c.image}
                      alt={`${t(c.name, lang)} — ${t(c.body, lang)}`}
                      ratio="3 / 4"
                      rounded="rounded-[4px]"
                      className="w-11 border border-rule"
                    />
                  </td>
                  <td className="border-b border-rule px-4 py-4 align-top">
                    <Verify credential={c} lang={lang} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="flex flex-col gap-2.5 md:hidden">
          {credentials.map((c) => (
            <li key={c.id} className="card flex gap-3.5">
              <Photo
                src={c.image}
                alt={`${t(c.name, lang)} — ${t(c.body, lang)}`}
                label={ui("photo.certificate", lang)}
                ratio="3 / 4"
                rounded="rounded-[6px]"
                className="w-[74px] flex-none border border-rule"
              />
              <div className="flex flex-col gap-0.5">
                <p className="font-bold leading-snug">
                  <Tx>{t(c.name, lang)}</Tx>
                </p>
                <p className="cap">
                  <Tx>{`${t(c.body, lang)} · ${c.year} · ${t(c.hours, lang)}`}</Tx>
                </p>
                <Verify credential={c} lang={lang} small />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ExperienceAndMemberships({ lang }: { lang: Lang }) {
  return (
    <section style={{ background: "var(--color-sandal)" }}>
        <div className="wrap grid gap-8 py-9 md:grid-cols-2 md:gap-12 md:py-12">
          <div className="card flex flex-col gap-3">
            <h2 className="h2">{ui("credentials.experience", lang)}</h2>
            <ul className="flex flex-col">
              {experience.map((e, i) => (
                <li
                  key={e.id}
                  className={`grid grid-cols-[1.4fr_1fr_0.7fr] gap-3 border-t border-rule py-3 ${ i === experience.length - 1 ? "border-b" : "" } body`}
                >
                  <span className="font-bold">
                    <Tx>{t(e.institution, lang)}</Tx>
                  </span>
                  <span style={{ color: "var(--color-muted)" }}>
                    <Tx>{t(e.role, lang)}</Tx>
                  </span>
                  <span className="tabular-nums" style={{ color: "var(--color-muted)" }}>
                    <Tx>{e.years}</Tx>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card flex flex-col gap-3">
            <h2 className="h2">{ui("credentials.memberships", lang)}</h2>
            <ul className="flex flex-col">
              {memberships.map((m, i) => (
                <li
                  key={m.id}
                  className={`grid grid-cols-[1.4fr_1fr] gap-3 border-t border-rule py-3 ${ i === memberships.length - 1 ? "border-b" : "" } body`}
                >
                  <span className="font-bold">
                    <Tx>{t(m.body, lang)}</Tx>
                  </span>
                  <span className="tabular-nums" style={{ color: "var(--color-muted)" }}>
                    <Tx>{`${m.since} ${ui("credentials.sinceWord", lang)}`}</Tx>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
  );
}
