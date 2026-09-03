"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./Icons";

/* A slim bar on phones, once the visitor is past the hero and not yet at the
   booking band. Not a pop-up: it never covers what is being read, and it
   steps aside as soon as the band comes into view. */

export default function StickyCta({
  label,
  href,
  noteLabel,
}: {
  label: string;
  href: string;
  noteLabel: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const band = document.getElementById("booking-band");
    let pastHero = false;
    let bandVisible = false;
    const update = () => setShow(pastHero && !bandVisible);

    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.85;
      update();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    let observer: IntersectionObserver | undefined;
    if (band && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          bandVisible = entries[0].isIntersecting;
          update();
        },
        { rootMargin: "0px 0px -20% 0px" },
      );
      observer.observe(band);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      className={`no-print fixed inset-x-0 bottom-0 z-40 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      } transition-transform duration-200`}
      aria-hidden={!show}
    >
      <div
        className="flex items-center gap-3 border-t px-4 py-2.5"
        style={{ background: "var(--color-bhagwa)", borderColor: "rgba(35,26,18,0.15)" }}
      >
        <span className="flex-1 font-bold leading-tight cap">{noteLabel}</span>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={show ? 0 : -1}
          data-ev="whatsapp_click"
          data-ev-source="sticky"
          className="btn btn-dark btn-sm"
        >
          <WhatsAppIcon size={18} />
          {label}
        </a>
      </div>
    </div>
  );
}
