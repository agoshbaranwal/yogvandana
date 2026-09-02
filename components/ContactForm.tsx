"use client";

import { useState } from "react";
import type { Lang } from "@/lib/routes";
import { telHref, waHref, waMessage } from "@/lib/whatsapp";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

/* Plain HTML that posts to a form service. Until a key is set the form still
   shows, so the page is complete, and the buttons hand over to WhatsApp. */

export default function ContactForm({
  lang,
  endpoint,
  whatsappNumber,
  phone,
  page,
  labels,
  interests,
  ailments,
}: {
  lang: Lang;
  endpoint: string;
  whatsappNumber: string;
  phone: string;
  page: string;
  labels: Record<string, string>;
  interests: { key: string; label: string }[];
  ailments: { slug: string; label: string }[];
}) {
  const [interest, setInterest] = useState(interests[0]?.key ?? "");
  const [ailment, setAilment] = useState("");
  const [sent, setSent] = useState(false);

  const chosenAilment = ailments.find((a) => a.slug === ailment)?.label;
  const wa = waHref(
    whatsappNumber,
    waMessage({ lang, kind: "trial", ailment: chosenAilment, page }),
  );

  if (sent) {
    return (
      <p className="card text-[17px]" role="status">
        {labels.thanks}
      </p>
    );
  }

  return (
    <form
      id="form"
      action={endpoint || undefined}
      method="POST"
      onSubmit={(e) => {
        if (!endpoint) {
          e.preventDefault();
          return;
        }
        setSent(true);
      }}
      className="flex flex-col gap-4"
    >
      <input type="hidden" name="_subject" value="Yog Vandana — website enquiry" />
      <input type="hidden" name="page" value={page} />
      <input type="hidden" name="interest" value={interest} />
      <input type="hidden" name="ailment" value={ailment} />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-1.5">
        <label className="label" htmlFor="cf-name">
          {labels.name}
        </label>
        <input
          id="cf-name"
          name="name"
          required
          autoComplete="name"
          className="min-h-[50px] rounded-[12px] border-[1.5px] px-3.5 py-3 text-[17px]"
          style={{ borderColor: "#D9C7A8", background: "var(--color-paper)" }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="label" htmlFor="cf-phone">
          {labels.phone}
        </label>
        <input
          id="cf-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          placeholder="+91"
          className="min-h-[50px] rounded-[12px] border-[1.5px] px-3.5 py-3 text-[17px]"
          style={{ borderColor: "#D9C7A8", background: "var(--color-paper)" }}
        />
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="label mb-1">{labels.about}</legend>
        <div className="flex flex-wrap gap-1.5">
          {interests.map((i) => (
            <button
              key={i.key}
              type="button"
              className="tchip"
              aria-pressed={i.key === interest}
              onClick={() => setInterest(i.key)}
            >
              {i.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <legend className="label mb-1">{labels.ailment}</legend>
        <div className="flex flex-wrap gap-1.5">
          {ailments.map((a) => (
            <button
              key={a.slug}
              type="button"
              className="tchip"
              aria-pressed={a.slug === ailment}
              onClick={() => setAilment(a.slug === ailment ? "" : a.slug)}
            >
              {a.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-1.5">
        <label className="label" htmlFor="cf-message">
          {labels.message}
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          placeholder={labels.messageHint}
          className="min-h-[110px] rounded-[12px] border-[1.5px] px-3.5 py-3 text-[17px]"
          style={{ borderColor: "#D9C7A8", background: "var(--color-paper)" }}
        />
      </div>

      {endpoint ? (
        <button type="submit" data-ev="form_submit" data-ev-source="contact" className="btn btn-primary">
          {labels.send}
        </button>
      ) : (
        <div className="flex flex-col gap-2.5">
          <p className="cap">{labels.formOffline}</p>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            data-ev="whatsapp_click"
            data-ev-source="contact-form"
            className="btn btn-primary"
          >
            <WhatsAppIcon size={20} />
            {labels.whatsapp}
          </a>
          <a
            href={telHref(phone)}
            data-ev="call_click"
            data-ev-source="contact-form"
            className="btn btn-outline"
          >
            <PhoneIcon size={18} />
            {labels.call}
          </a>
        </div>
      )}

      <p className="cap">{labels.privacyNote}</p>
    </form>
  );
}
