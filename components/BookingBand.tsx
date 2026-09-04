"use client";

import { useState } from "react";
import type { Lang } from "@/lib/routes";
import { telHref, waHref, waMessage } from "@/lib/whatsapp";
import { PhoneIcon, WhatsAppIcon } from "./Icons";
import { Tx } from "./Tx";

export type BandChoice = { slug: string; name: string };

/* The one ask on every page: talk first, no charge. The chips only rewrite
   the message; with JavaScript switched off the buttons still work, carrying
   whatever the page itself is about. A condition page also asks which time. */

export default function BookingBand({
  lang,
  title,
  lead,
  step1,
  step2,
  choices,
  otherLabel,
  defaultSlug,
  showTime = false,
  morningLabel,
  eveningLabel,
  whatsappNumber,
  whatsappLabel,
  phone,
  phoneShown,
  callLabel,
  contactHref,
  previewLabel,
  page,
  pageLabel,
  source,
}: {
  lang: Lang;
  title: string;
  lead: string;
  step1: string;
  step2: string;
  choices: BandChoice[];
  otherLabel: string;
  defaultSlug: string;
  showTime?: boolean;
  morningLabel: string;
  eveningLabel: string;
  whatsappNumber: string;
  whatsappLabel: string;
  phone: string;
  phoneShown: string;
  callLabel: string;
  /* where the call button goes until she has a number: the contact page */
  contactHref: string;
  previewLabel: string;
  page: string;
  pageLabel: string;
  source: string;
}) {
  const all = [...choices, { slug: "other", name: otherLabel }];
  const [slug, setSlug] = useState(defaultSlug || "other");
  const [time, setTime] = useState<"" | "morning" | "evening">("");

  const chosen = all.find((c) => c.slug === slug) ?? all[0];
  const timeLabel = time === "morning" ? morningLabel : time === "evening" ? eveningLabel : undefined;
  const args = {
    lang,
    kind: "talk" as const,
    ailment: chosen.slug === "other" ? undefined : chosen.name,
    time: showTime ? timeLabel : undefined,
  };
  const message = waMessage({ ...args, page });
  const shown = waMessage({ ...args, pageLabel });

  return (
    <section
      id="booking-band"
      className="no-print close-band on-dark"
      
      aria-labelledby="booking-band-title"
    >
      <div className="wrap flex flex-col gap-5 py-8 md:mx-auto md:max-w-[620px] md:py-16">
        <div className="flex flex-col gap-3">
          <h2 id="booking-band-title" className="page-title">
            {title}
          </h2>
          <p className="body">
            <Tx>{lead}</Tx>
          </p>
        </div>

        <div className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-2">
            <p className="label">
              {step1}
            </p>
            <div className="flex flex-wrap gap-2">
              {all.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  className="tchip"
                  aria-pressed={c.slug === slug}
                  onClick={() => setSlug(c.slug)}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {showTime ? (
            <div className="flex flex-col gap-2">
              <p className="label">
                {step2}
              </p>
              <div className="flex flex-wrap gap-2">
                {(["morning", "evening"] as const).map((k) => (
                  <button
                    key={k}
                    type="button"
                    className="tchip"
                    aria-pressed={time === k}
                    onClick={() => setTime(time === k ? "" : k)}
                  >
                    {k === "morning" ? morningLabel : eveningLabel}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <a
            href={waHref(whatsappNumber, message)}
            target="_blank"
            rel="noopener noreferrer"
            data-ev="whatsapp_click"
            data-ev-source={source}
            data-ev-ailment={chosen.slug}
            data-ev-time={time || "any"}
            className="btn btn-wa w-full"
          >
            <WhatsAppIcon size={22} />
            {whatsappLabel}
          </a>
          <a
            href={phone ? telHref(phone) : contactHref}
            data-ev="call_click"
            data-ev-source={source}
            className="btn btn-onink w-full"
          >
            <PhoneIcon size={20} />
            <Tx>{`${callLabel} · ${phoneShown}`}</Tx>
          </a>
          <p className="cap">
            {previewLabel} “{shown}”
          </p>
        </div>
      </div>
    </section>
  );
}
