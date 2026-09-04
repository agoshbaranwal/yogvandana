"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CloseIcon } from "./Icons";

export type Shot = {
  id: string;
  theme: string;
  alt: string;
  caption: string;
  place: string;
  date: string;
  img: { src: string; srcSet: string; width: number; height: number } | null;
};

/* A square grid, and a viewer that shows the caption with the place and the
   date, because a photograph with a caption is evidence and one without is
   decoration. */

export default function GalleryGrid({
  shots,
  themes,
  allLabel,
  emptyLabel,
  closeLabel,
  prevLabel,
  nextLabel,
  photoLabel,
  viewerLabel,
}: {
  shots: Shot[];
  themes: { slug: string; label: string }[];
  allLabel: string;
  emptyLabel: string;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
  photoLabel: string;
  /* What a screen reader calls the viewer when the photo's own alt is still a placeholder */
  viewerLabel: string;
}) {
  const [active, setActive] = useState("all");
  const [open, setOpen] = useState<number | null>(null);
  /* The viewer is a dialog, so it behaves like one: focus moves to its close
     button when it opens, stays inside it, and goes back to the thumbnail
     that opened it when it closes. */
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const shown = active === "all" ? shots : shots.filter((s) => s.theme === active);

  const move = useCallback(
    (step: number) =>
      setOpen((i) => (i === null ? null : (i + step + shown.length) % shown.length)),
    [shown.length],
  );

  /* The page knows a dialog is open (the sticky bar hides), focus moves to
     the close button, and on close it goes back to the thumbnail that opened
     the viewer. Its own effect, so no early return can skip it. */
  useEffect(() => {
    if (open !== null) {
      document.body.dataset.dialog = "1";
      closeRef.current?.focus();
    } else {
      delete document.body.dataset.dialog;
      trigger.current?.focus({ preventScroll: true });
      trigger.current = null;
    }
  }, [open]);

  useEffect(() => {
    if (open === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "Tab" && dialogRef.current) {
        const items = dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        const here = document.activeElement;
        if (e.shiftKey && (here === first || !dialogRef.current.contains(here))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && here === last) {
          e.preventDefault();
          first.focus();
        }
      }
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, move]);

  const chips = [{ slug: "all", label: allLabel }, ...themes];
  const current = open === null ? null : shown[open];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2" role="group">
        {chips.map((c) => (
          <button
            key={c.slug}
            type="button"
            className="tchip"
            aria-pressed={c.slug === active}
            data-ev="gallery_filter"
            data-ev-filter={c.slug}
            onClick={() => {
              setActive(c.slug);
              setOpen(null);
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="body" style={{ color: "var(--color-muted)" }}>
          {emptyLabel}
        </p>
      ) : (
        <ul className="grid grid-cols-3 gap-2 md:grid-cols-5 md:gap-3">
          {shown.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                className="block w-full overflow-hidden rounded-[12px]"
                style={{ aspectRatio: "1 / 1" }}
                onClick={(e) => {
                  trigger.current = e.currentTarget;
                  setOpen(i);
                }}
                data-ev="gallery_open"
                data-ev-photo={s.id}
                aria-label={s.alt || photoLabel}
              >
                {s.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={s.img.src}
                    srcSet={s.img.srcSet || undefined}
                    sizes="(min-width: 768px) 220px, 33vw"
                    alt={s.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="ph flex h-full w-full items-end p-1.5 leading-tight label">
                    {photoLabel}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      {current ? (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ background: "rgba(35,26,18,0.94)" }}
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={current.alt && !current.alt.startsWith("[") ? current.alt : viewerLabel}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3">
            <span className="cap" style={{ color: "rgba(251,248,241,0.75)" }}>
              {open! + 1} / {shown.length}
            </span>
            <button
              type="button"
              ref={closeRef}
              onClick={() => setOpen(null)}
              aria-label={closeLabel}
              className="flex h-11 w-11 items-center justify-center"
              style={{ color: "var(--color-ivory)" }}
            >
              <CloseIcon size={24} />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center px-4">
            {current.img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={current.img.src}
                alt={current.alt}
                className="max-h-[70vh] w-auto max-w-full rounded-[12px] object-contain"
              />
            ) : (
              <div
                className="ph flex w-full md:max-w-[560px] items-end justify-start rounded-[12px] p-4"
                style={{ aspectRatio: "4 / 3" }}
              >
                <span className="cap">{photoLabel}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 px-4 py-5">
            <button
              type="button"
              onClick={() => move(-1)}
              className="btn btn-sm btn-outline"
              aria-label={prevLabel}
            >
              ‹
            </button>
            <p className="flex-1 text-center leading-relaxed cap" style={{ color: "var(--color-ivory)" }}>
              {current.caption}
              <span className="block" style={{ color: "rgba(251,248,241,0.7)" }}>
                {[current.place, current.date].filter(Boolean).join(" · ")}
              </span>
            </p>
            <button
              type="button"
              onClick={() => move(1)}
              className="btn btn-sm btn-outline"
              aria-label={nextLabel}
            >
              ›
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
