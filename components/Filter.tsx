"use client";

import { useState } from "react";

/* Chips that narrow a list. Server-rendered cards are handed in as nodes, so
   the filtering costs nothing at build and the page still works if the chips
   are never touched. */

export type FilterItem = { key: string; slug: string; node: React.ReactNode };

export default function Filter({
  chips,
  items,
  allLabel,
  emptyLabel,
  className = "grid gap-2.5 md:grid-cols-2 md:gap-5",
  event,
}: {
  chips: { slug: string; label: string }[];
  items: FilterItem[];
  allLabel: string;
  emptyLabel: string;
  className?: string;
  event: string;
}) {
  const [active, setActive] = useState("all");
  const shown = active === "all" ? items : items.filter((i) => i.slug === active);
  const all = [{ slug: "all", label: allLabel }, ...chips];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2" role="group">
        {all.map((c) => (
          <button
            key={c.slug}
            type="button"
            className="tchip"
            aria-pressed={c.slug === active}
            data-ev={event}
            data-ev-filter={c.slug}
            onClick={() => setActive(c.slug)}
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
        <ul className={className}>
          {shown.map((i) => (
            <li key={i.key}>{i.node}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
