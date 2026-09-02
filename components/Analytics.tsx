"use client";

import Script from "next/script";
import { useEffect } from "react";

/* Nothing loads until a Google Analytics id is set in content/site.json.
   Every call to action carries data-ev and data-ev-source; one delegated
   listener turns those into events, so no button needs its own component. */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(name: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

export default function Analytics({ id }: { id: string }) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.("[data-ev]");
      if (!(el instanceof HTMLElement)) return;
      const name = el.dataset.ev;
      if (!name) return;
      const params: Record<string, string> = {};
      for (const [key, value] of Object.entries(el.dataset)) {
        if (key.startsWith("ev") && key !== "ev" && value) {
          params[key.slice(2).replace(/^[A-Z]/, (c) => c.toLowerCase())] = value;
        }
      }
      track(name, params);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!id) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga-setup" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}
