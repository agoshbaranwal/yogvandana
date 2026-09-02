"use client";

import { useState } from "react";
import type { Lang } from "@/lib/routes";
import { telHref, waHref, waMessage } from "@/lib/whatsapp";
import { PhoneIcon, WhatsAppIcon } from "./Icons";
import { Tx } from "./Tx";

export type BandChoice = { slug: string; name: string };

/* The free class, and the two questions she would ask anyway. The chips only
   rewrite the message; with JavaScript switched off the buttons still work,
   carrying whatever the page itself is about. */

export default function BookingBand({
  lang,
  title,
  lead,
  step1,
  step2,
  choices,
  otherLabel,
  defaultSlug,
  morningLabel,
  eveningLabel,
  whatsappNumber,
  whatsappLabel,
  phone,
  callLabel,
  formHref,
  formLabel,
  previewLabel,
  replyLine,
  page,
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
  morningLabel: string;
  eveningLabel: string;
  whatsappNumber: string;
  whatsappLabel: string;
  phone: string;
  callLabel: string;
  formHref: string;
  formLabel: string;
  previewLabel: string;
  replyLine: string;
  page: string;
  source: string;
}) {
  const all = [...choices, { slug: "other", name: otherLabel }];
  // On a page that is not about one condition, nothing is picked for the
  // visitor: the message then says only that they want the free class.
  const [slug, setSlug] = useState(defaultSlug || "other");
  const [time, setTime] = useState<"morning" | "evening">("morning");

  const chosen = all.find((c) => c.slug === slug) ?? all[0];
  const timeLabel = time === "morning" ? morningLabel : eveningLabel;
  const message = waMessage({
    lang,
    kind: "trial",
    ailment: chosen.slug === "other" ? undefined : chosen.name,
    time: timeLabel,
    page,
  });

  return (
    <section
      id="booking-band"
      className="no-print"
      style={{ background: "var(--color-bhagwa)" }}
      aria-labelledby="booking-band-title"
    >
      <div className="wrap grid gap-6 py-8 md:grid-cols-2 md:items-center md:gap-12 md:py-11">
        <div className="flex flex-col gap-3">
          <h2 id="booking-band-title" className="page-title">
            {title}
          </h2>
          <p className="text-[17px] leading-relaxed md:text-[18px]">
            <Tx>{lead}</Tx>
          </p>
          <p className="hidden text-[13px] leading-relaxed md:block" style={{ color: "var(--color-deeper)" }}>
            {previewLabel} “{message}” <Tx>{replyLine}</Tx>
          </p>
        </div>

        <div
          className="flex flex-col gap-2.5 rounded-[20px] p-4 md:p-5"
          style={{ background: "rgba(251,248,241,0.58)" }}
        >
          <p className="label" style={{ color: "var(--color-deeper)" }}>
            {step1}
          </p>
          <div className="flex flex-wrap gap-1.5">
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

          <p className="label mt-1" style={{ color: "var(--color-deeper)" }}>
            {step2}
          </p>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              className="tchip"
              aria-pressed={time === "morning"}
              onClick={() => setTime("morning")}
            >
              {morningLabel}
            </button>
            <button
              type="button"
              className="tchip"
              aria-pressed={time === "evening"}
              onClick={() => setTime("evening")}
            >
              {eveningLabel}
            </button>
          </div>

          <a
            href={waHref(whatsappNumber, message)}
            target="_blank"
            rel="noopener noreferrer"
            data-ev="whatsapp_click"
            data-ev-source={source}
            data-ev-ailment={chosen.slug}
            data-ev-time={time}
            className="btn btn-dark mt-2 w-full"
          >
            <WhatsAppIcon size={20} />
            {whatsappLabel}
          </a>

          <div className="flex gap-2">
            {phone ? (
              <a
                href={telHref(phone)}
                data-ev="call_click"
                data-ev-source={source}
                className="btn btn-ghost btn-sm flex-1"
              >
                <PhoneIcon size={18} />
                {callLabel}
              </a>
            ) : null}
            <a
              href={formHref}
              data-ev="form_open"
              data-ev-source={source}
              className="btn btn-ghost btn-sm flex-1"
            >
              {formLabel}
            </a>
          </div>

          <p className="text-[13px] leading-relaxed md:hidden" style={{ color: "var(--color-deeper)" }}>
            {previewLabel} “{message}” <Tx>{replyLine}</Tx>
          </p>
        </div>
      </div>
    </section>
  );
}
