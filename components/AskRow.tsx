import { absolute, PHONE, phoneShown, realStories, site, t, ui } from "@/lib/content";
import { href, type Lang } from "@/lib/routes";
import { telHref, waHref, waMessage } from "@/lib/whatsapp";
import { PhoneIcon, WhatsAppIcon } from "./Icons";
import { Tx } from "./Tx";

/* The ask, repeated down the page.

   Direct-response practice, and the thing Agosh asked to have researched: a
   reader does not decide at the bottom. They decide at the moment their own
   objection is answered — after the medicine panel for one person, after the
   results for another, after the price for a third — and if there is no way to
   act at that moment the decision is lost. So the ask appears roughly every
   screen and a half rather than once at the end.

   Three rules keep repetition from reading as pestering:

   1 · it never says buy. Every one of them asks for the same free
       conversation, so the page is not escalating, it is just available.
   2 · the line above it changes, and belongs to the section it follows —
       after the results it talks about results, after the price about price.
   3 · the risk reversal is restated every single time, because "free" read
       once at the top is not remembered eight screens later.

   Where there is a real student result on record it rides along beside the
   button: proof placed at the point of action does more than proof filed in a
   section of its own. */

export function AskRow({
  lang,
  note,
  source,
  proof = true,
}: {
  lang: Lang;
  /* the sentence that belongs to the section this follows */
  note: string;
  source: string;
  proof?: boolean;
}) {
  const wa = waHref(
    site.contact.whatsapp,
    waMessage({ lang, kind: "talk", page: absolute(href("home", lang)) }),
  );
  const number = phoneShown(lang);
  const witness = proof ? realStories.find((s) => t(s.quote, lang).trim()) : undefined;

  return (
    <div className="askrow">
      <div className="flex min-w-0 flex-col gap-1">
        <p className="h3">
          <Tx>{note}</Tx>
        </p>
        <p className="cap">{ui("home.trustFree", lang)}</p>
      </div>

      <div className="btn-col flex-none">
        <a
          className="btn btn-wa"
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          data-ev="whatsapp_click"
          data-ev-source={source}
        >
          <WhatsAppIcon size={20} />
          {ui("cta.whatsappTalk", lang)}
        </a>
        <a className="btn btn-white" href={telHref(PHONE)} data-ev="call_click" data-ev-source={source}>
          <PhoneIcon size={18} />
          {ui("cta.call", lang)}
          {number ? (
            <span className="hidden sm:inline">
              {" · "}
              <Tx>{number}</Tx>
            </span>
          ) : null}
        </a>
      </div>

      {witness ? (
        <p className="askrow-proof cap">
          “<Tx>{t(witness.quote, lang)}</Tx>” — <Tx>{t(witness.name, lang)}</Tx>,{" "}
          <Tx>{t(witness.city, lang)}</Tx>
        </p>
      ) : null}
    </div>
  );
}
