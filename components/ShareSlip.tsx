"use client";

import { ShareIcon } from "./Icons";
import { shareHref } from "@/lib/whatsapp";

/* "Send to family": the phone's own share sheet where there is one, WhatsApp
   where there is not. The link works with JavaScript switched off. */
export default function ShareSlip({ label, title, url, source }: { label: string; title: string; url: string; source: string }) {
  return (
    <a
      href={shareHref(title, url)}
      target="_blank"
      rel="noopener noreferrer"
      data-ev="share_click"
      data-ev-source={source}
      className="link-strong cap"
      onClick={(e) => {
        if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
          e.preventDefault();
          navigator.share({ title, text: title, url }).catch(() => {});
        }
      }}
    >
      <ShareIcon size={18} />
      {label}
    </a>
  );
}
