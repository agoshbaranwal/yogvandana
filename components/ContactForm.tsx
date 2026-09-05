"use client";

import { useState } from "react";
import type { Lang } from "@/lib/routes";
import { waHref, waMessage } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

/* Plain HTML that posts to a form service when there is one. Until then the
   same form writes the WhatsApp message for the visitor: name, disease and
   what they typed, so nothing they filled in is lost. */

export default function ContactForm({
  lang,
  endpoint,
  whatsappNumber,
  page,
  pageLabel,
  labels,
  ailments,
}: {
  lang: Lang;
  endpoint: string;
  whatsappNumber: string;
  page: string;
  pageLabel: string;
  labels: Record<string, string>;
  ailments: { slug: string; label: string }[];
}) {
  const [ailment, setAilment] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const all = [...ailments, { slug: "other", label: labels.other }];
  const chosen = ailments.find((a) => a.slug === ailment)?.label;
  const wa = waHref(
    whatsappNumber,
    waMessage({ lang, kind: "talk", ailment: chosen, name: name.trim() || undefined, note: message, page }),
  );
  void pageLabel;

  if (sent) {
    return (
      <p className="card body" role="status">
        {labels.thanks}
      </p>
    );
  }

  const field = "min-h-[56px] rounded-[12px] border-[1.5px] px-3.5 py-3";
  const fieldStyle = { borderColor: "var(--color-field)", background: "var(--color-paper)" };

  return (
    <form
      id="form"
      action={endpoint || undefined}
      method="POST"
      onSubmit={(e) => {
        if (!endpoint) {
          e.preventDefault();
          window.open(wa, "_blank", "noopener");
          return;
        }
        setSent(true);
      }}
      className="flex flex-col gap-4"
    >
      <input type="hidden" name="_subject" value="Yog Vandana — website enquiry" />
      <input type="hidden" name="page" value={page} />
      <input type="hidden" name="ailment" value={ailment} />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="flex flex-col gap-1.5">
        <label className="cap font-bold" htmlFor="cf-name" style={{ color: "var(--color-kohl)" }}>
          {labels.name}{" "}
          <span className="font-normal" style={{ color: "var(--color-muted)" }}>
            {labels.required}
          </span>
        </label>
        <input
          id="cf-name"
          name="name"
          required
          autoComplete="name"
          enterKeyHint="next"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${field} body`}
          style={fieldStyle}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="cap font-bold" htmlFor="cf-phone" style={{ color: "var(--color-kohl)" }}>
          {labels.phone}{" "}
          <span className="font-normal" style={{ color: "var(--color-muted)" }}>
            {labels.required}
          </span>
        </label>
        <input
          id="cf-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          enterKeyHint="next"
          placeholder="+91"
          className={`${field} body`}
          style={fieldStyle}
        />
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="cap mb-1.5 font-bold" style={{ color: "var(--color-kohl)" }}>
          {labels.ailment}
        </legend>
        <div className="flex flex-wrap gap-2">
          {all.map((a) => (
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
        <label className="cap font-bold" htmlFor="cf-message" style={{ color: "var(--color-kohl)" }}>
          {labels.message}
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          placeholder={labels.messageHint}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${field} body min-h-[110px]`}
          style={fieldStyle}
        />
      </div>

      {endpoint ? (
        <button type="submit" data-ev="form_submit" data-ev-source="contact" className="btn btn-dark btn-block">
          {labels.send}
        </button>
      ) : (
        /* no form service yet: the same button sends it on WhatsApp, with
           everything typed above already in the message */
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          data-ev="whatsapp_click"
          data-ev-source="contact-form"
          className="btn btn-dark btn-block"
        >
          <WhatsAppIcon size={22} />
          {labels.whatsapp}
        </a>
      )}

      <p className="cap">
        {labels.privacyNote} {labels.safety}
      </p>
    </form>
  );
}
