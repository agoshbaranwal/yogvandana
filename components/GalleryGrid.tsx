"use client";

import { useCallback, useEffect, useState } from "react";
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
}: {
  shots: Shot[];
  themes: { slug: string; label: string }[];
  allLabel: string;
  emptyLabel: string;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
  photoLabel: string;
}) {
  const [active, setActive] = useState("all");
  const [open, setOpen] = useState<number | null>(null);
  const shown = active === "all" ? shots : shots.filter((s) => s.theme === active);

  const move = useCallback(
    (step: number) =>
      setOpen((i) => (i === null ? null : (i + step + shown.length) % shown.length)),
    [shown.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
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
      <div className="strip" role="group">
        {chips.map((c) => (
          <button
            key={c.slug}
            type="button"
            className="tchip flex-none"
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
        <p className="text-[16px]" style={{ color: "var(--color-muted)" }}>
          {emptyLabel}
        </p>
      ) : (
        <ul className="grid grid-cols-3 gap-2 md:grid-cols-5 md:gap-3">
          {shown.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                className="block w-full overflow-hidden rounded-[8px]"
                style={{ aspectRatio: "1 / 1" }}
                onClick={() => setOpen(i)}
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
                  <span className="ph flex h-full w-full items-end p-1.5 text-[10px] leading-tight">
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
          role="dialog"
          aria-modal="true"
          aria-label={current.alt || photoLabel}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3">
            <span className="text-[14px]" style={{ color: "rgba(251,248,241,0.75)" }}>
              {open! + 1} / {shown.length}
            </span>
            <button
              type="button"
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
                className="max-h-[70vh] w-auto max-w-full rounded-[10px] object-contain"
              />
            ) : (
              <div
                className="ph flex w-full max-w-[560px] items-end justify-start rounded-[10px] p-4"
                style={{ aspectRatio: "4 / 3" }}
              >
                <span className="text-[13px]">{photoLabel}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 px-4 py-5">
            <button
              type="button"
              onClick={() => move(-1)}
              className="btn btn-sm btn-ghost"
              aria-label={prevLabel}
            >
              ‹
            </button>
            <p className="flex-1 text-center text-[14px] leading-relaxed" style={{ color: "var(--color-ivory)" }}>
              {current.caption}
              <span className="block" style={{ color: "rgba(251,248,241,0.7)" }}>
                {[current.place, current.date].filter(Boolean).join(" · ")}
              </span>
            </p>
            <button
              type="button"
              onClick={() => move(1)}
              className="btn btn-sm btn-ghost"
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
