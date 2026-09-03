"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "./Icons";

export type NavItem = { label: string; href: string; active: boolean };

export default function Header({
  brandHi,
  brandTail,
  home,
  nav,
  switchLabel,
  switchTitle,
  switchHref,
  talkLabel,
  talkHref,
  menuLabel,
  closeLabel,
  studentsLabel,
  studentsHref,
  whatsappLabel,
  whatsappHref,
  phoneHref,
  phoneLabel,
  onDawn = false,
}: {
  brandHi: string;
  brandTail: string;
  home: string;
  nav: NavItem[];
  switchLabel: string;
  switchTitle: string;
  switchHref: string;
  talkLabel: string;
  talkHref: string;
  menuLabel: string;
  closeLabel: string;
  studentsLabel: string;
  studentsHref: string;
  whatsappLabel: string;
  whatsappHref: string;
  /* An older person looks for a number before a button. Shown once she has one. */
  phoneHref: string;
  phoneLabel: string;
  onDawn?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  /* The menu covers the whole screen, so it has to behave like one: the
     keyboard stays inside it while it is open, Escape closes it, and focus
     goes back to the button that opened it. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !open || !panel.current) return;
      const items = panel.current.querySelectorAll<HTMLElement>("a[href], button");
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const here = document.activeElement;
      if (e.shiftKey && (here === first || !panel.current.contains(here))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && here === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const opened = useRef(false);
  useEffect(() => {
    if (open) {
      opened.current = true;
      panel.current?.querySelector<HTMLElement>("button")?.focus();
    } else if (opened.current) {
      // only after a menu the visitor actually opened: never on page load
      toggle.current?.focus({ preventScroll: true });
    }
  }, [open]);

  return (
    <header
      className={
        onDawn
          ? "absolute inset-x-0 top-0 z-30"
          : "relative z-30 border-b border-rule bg-ivory"
      }
    >
      <div className="wrap flex items-center justify-between gap-4 py-2.5 md:py-3">
        <Link
          href={home}
          className="brand inline-block py-2 no-underline h2"
          style={{ color: "var(--color-kohl)" }}
        >
          <span>
            {brandHi}
          </span>{" "}
          {brandTail}
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label={menuLabel}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className="tap font-semibold no-underline body"
              style={{ color: item.active ? "var(--color-deep)" : "var(--color-kohl)" }}
            >
              {item.label}
            </Link>
          ))}
          {phoneHref ? (

            <a href={phoneHref} className="tap body font-bold no-underline" style={{ color: "var(--color-kohl)" }} data-ev="call_click" data-ev-source="header">

              {phoneLabel}

            </a>

          ) : null}
          <Link
            href={switchHref}
            title={switchTitle}
            data-ev="language_switch"
            data-ev-to={switchLabel}
            className="inline-flex min-h-[44px] items-center rounded-full border px-3.5 font-semibold no-underline cap"
            style={{ borderColor: "var(--color-kohl)", color: "var(--color-kohl)" }}
          >
            {switchLabel}
          </Link>
          <Link
            href={talkHref}
            data-ev="talk_cta"
            data-ev-source="header"
            className={`btn btn-sm ${onDawn ? "btn-dark" : "btn-primary"}`}
          >
            {talkLabel}
          </Link>
        </nav>

        <div className="flex items-center gap-1.5 lg:hidden">
          <Link
            href={switchHref}
            title={switchTitle}
            data-ev="language_switch"
            data-ev-to={switchLabel}
            className="inline-flex min-h-[44px] items-center rounded-full border px-3 font-semibold no-underline cap"
            style={{ borderColor: "var(--color-kohl)", color: "var(--color-kohl)" }}
          >
            {switchLabel}
          </Link>
          <button
            type="button"
            ref={toggle}
            onClick={() => setOpen(true)}
            aria-label={menuLabel}
            aria-expanded={open}
            className="-mr-2 flex h-11 w-11 items-center justify-center"
            style={{ color: "var(--color-kohl)" }}
          >
            <MenuIcon size={24} />
          </button>
        </div>
      </div>

      {open ? (
        <div
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label={menuLabel}
          className="fixed inset-0 z-50 flex flex-col bg-ivory lg:hidden"
        >
          <div className="wrap flex items-center justify-between gap-4 py-2.5">
            <span className="brand h2">
              <span>{brandHi}</span> {brandTail}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={closeLabel}
              className="-mr-2 flex h-11 w-11 items-center justify-center"
            >
              <CloseIcon size={24} />
            </button>
          </div>
          <nav
            className="wrap flex flex-1 flex-col gap-1 overflow-y-auto pb-8"
            aria-label={menuLabel}
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={item.active ? "page" : undefined}
                className="h3 border-b border-rule py-3.5 no-underline"
                style={{ color: item.active ? "var(--color-deep)" : "var(--color-kohl)" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={studentsHref}
              onClick={() => setOpen(false)}
              className="border-b border-rule py-3.5 font-bold no-underline body"
              style={{ color: "var(--color-deep)" }}
            >
              {studentsLabel}
            </Link>
            <div className="mt-5 flex flex-col gap-2.5">
              <Link
                href={talkHref}
                onClick={() => setOpen(false)}
                data-ev="talk_cta"
                data-ev-source="menu"
                className="btn btn-primary w-full"
              >
                {talkLabel}
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-ev="whatsapp_click"
                data-ev-source="menu"
                className="btn btn-outline w-full"
              >
                <WhatsAppIcon size={18} />
                {whatsappLabel}
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
