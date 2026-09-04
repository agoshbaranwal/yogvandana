"use client";

import { A as Link } from "./Nav";
import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "./Icons";
import { Tx } from "./Tx";

export type NavItem = { label: string; href: string; active: boolean };

/* The header. On a phone it is the wordmark, a phone number in a pill and the
   menu: an older reader looks for a number before anything else. On the home
   page it sits on her photograph; everywhere else on its own ivory bar. The
   language switch lives at the top of the menu and in the desktop bar. */

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
  callLabel,
  overlay = false,
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
  /* tel: link and the number as written; the label is a bracketed blank until she has one */
  phoneHref: string;
  phoneLabel: string;
  callLabel: string;
  overlay?: boolean;
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

  const pill = overlay ? "pill pill-solid md:pill" : "pill";

  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-30 md:relative md:border-b md:border-rule md:bg-ivory"
          : "relative z-30 border-b border-rule bg-ivory"
      }
    >
      <div className="wrap flex items-center justify-between gap-3 py-2 md:py-3">
        <Link
          href={home}
          className="brand inline-block py-2 no-underline h2"
          style={{ color: "var(--color-kohl)" }}
        >
          <span>{brandHi}</span> {brandTail}
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label={menuLabel}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className="tap font-bold no-underline body"
              style={{ color: item.active ? "var(--color-deep)" : "var(--color-kohl)" }}
            >
              {item.label}
            </Link>
          ))}
          <a href={phoneHref || talkHref} className="pill" data-ev="call_click" data-ev-source="header" aria-label={`${callLabel}: ${phoneLabel}`}>
            {/* A real phone number is eleven digits plus a country code, and
                beside the wordmark and the menu that is wider than a 360px
                phone. The number shows from 400px up; below it the pill is the
                icon and the word, which is what a thumb is aiming at anyway. */}
            <PhoneIcon size={18} />
            <span className="hidden min-[400px]:inline">
              <Tx>{phoneLabel}</Tx>
            </span>
            <span className="min-[400px]:hidden">{callLabel}</span>
          </a>
          <Link
            href={switchHref}
            title={switchTitle}
            data-ev="language_switch"
            data-ev-to={switchLabel}
            className="pill"
          >
            {switchLabel}
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a href={phoneHref || talkHref} className={pill} data-ev="call_click" data-ev-source="header" aria-label={`${callLabel}: ${phoneLabel}`}>
            {/* A real phone number is eleven digits plus a country code, and
                beside the wordmark and the menu that is wider than a 360px
                phone. The number shows from 400px up; below it the pill is the
                icon and the word, which is what a thumb is aiming at anyway. */}
            <PhoneIcon size={18} />
            <span className="hidden min-[400px]:inline">
              <Tx>{phoneLabel}</Tx>
            </span>
            <span className="min-[400px]:hidden">{callLabel}</span>
          </a>
          <button
            type="button"
            ref={toggle}
            onClick={() => setOpen(true)}
            aria-label={menuLabel}
            aria-expanded={open}
            className={`flex h-11 w-11 items-center justify-center rounded-full ${overlay ? "bg-ivory" : ""}`}
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
          <div className="wrap flex items-center justify-between gap-4 py-2">
            <span className="brand h2">
              <span>{brandHi}</span> {brandTail}
            </span>
            <div className="flex items-center gap-2">
              <Link
                href={switchHref}
                title={switchTitle}
                data-ev="language_switch"
                data-ev-to={switchLabel}
                className="pill"
                onClick={() => setOpen(false)}
              >
                {switchLabel}
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={closeLabel}
                className="-mr-2 flex h-11 w-11 items-center justify-center"
              >
                <CloseIcon size={24} />
              </button>
            </div>
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
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-ev="whatsapp_click"
                data-ev-source="menu"
                className="btn btn-primary w-full"
              >
                <WhatsAppIcon size={20} />
                {whatsappLabel}
              </a>
              <a
                href={phoneHref || talkHref}
                onClick={() => setOpen(false)}
                data-ev={phoneHref ? "call_click" : "talk_cta"}
                data-ev-source="menu"
                className="btn btn-outline w-full"
              >
                <PhoneIcon size={20} />
                <Tx>{`${callLabel} · ${phoneLabel}`}</Tx>
              </a>
              <span className="sr-only">{talkLabel}</span>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
