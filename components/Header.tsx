"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  trialLabel,
  trialHref,
  menuLabel,
  closeLabel,
  studentsLabel,
  studentsHref,
  whatsappLabel,
  whatsappHref,
  onDawn = false,
}: {
  brandHi: string;
  brandTail: string;
  home: string;
  nav: NavItem[];
  switchLabel: string;
  switchTitle: string;
  switchHref: string;
  trialLabel: string;
  trialHref: string;
  menuLabel: string;
  closeLabel: string;
  studentsLabel: string;
  studentsHref: string;
  whatsappLabel: string;
  whatsappHref: string;
  onDawn?: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
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
          className="brand text-[24px] no-underline md:text-[28px]"
          style={{ color: "var(--color-kohl)" }}
        >
          <span style={{ color: onDawn ? "var(--color-deep)" : "var(--color-bhagwa)" }}>
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
              className="text-[17px] font-semibold no-underline"
              style={{ color: item.active ? "var(--color-deep)" : "var(--color-kohl)" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={switchHref}
            title={switchTitle}
            data-ev="language_switch"
            data-ev-to={switchLabel}
            className="inline-flex min-h-[40px] items-center rounded-full border px-3.5 text-[14px] font-semibold no-underline"
            style={{ borderColor: "var(--color-kohl)", color: "var(--color-kohl)" }}
          >
            {switchLabel}
          </Link>
          <Link
            href={trialHref}
            data-ev="trial_cta"
            data-ev-source="header"
            className={`btn btn-sm ${onDawn ? "btn-dark" : "btn-primary"}`}
          >
            {trialLabel}
          </Link>
        </nav>

        <div className="flex items-center gap-1.5 lg:hidden">
          <Link
            href={switchHref}
            title={switchTitle}
            data-ev="language_switch"
            data-ev-to={switchLabel}
            className="inline-flex min-h-[36px] items-center rounded-full border px-3 text-[13px] font-semibold no-underline"
            style={{ borderColor: "var(--color-kohl)", color: "var(--color-kohl)" }}
          >
            {switchLabel}
          </Link>
          <button
            type="button"
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
        <div className="fixed inset-0 z-50 flex flex-col bg-ivory lg:hidden">
          <div className="wrap flex items-center justify-between gap-4 py-2.5">
            <span className="brand text-[24px]">
              <span style={{ color: "var(--color-bhagwa)" }}>{brandHi}</span> {brandTail}
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
              className="border-b border-rule py-3.5 text-[16px] font-bold no-underline"
              style={{ color: "var(--color-deep)" }}
            >
              {studentsLabel}
            </Link>
            <div className="mt-5 flex flex-col gap-2.5">
              <Link
                href={trialHref}
                onClick={() => setOpen(false)}
                data-ev="trial_cta"
                data-ev-source="menu"
                className="btn btn-primary w-full"
              >
                {trialLabel}
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
