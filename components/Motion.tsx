"use client";

import { useEffect } from "react";

/* Movement, kept on a short leash.

   One observer for the whole page rather than a component per section, so
   there is nothing extra in the markup and nothing to forget on a new page.

   Three rules it follows:
   - If the reader asked for less motion, it does nothing at all.
   - It only hides what is below the fold when it starts, so nothing that is
     already on screen blinks, and a page with JavaScript switched off is
     simply a page that does not move.
   - Every section is revealed once and then left alone. */

const EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";

export default function Motion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section, main > div > section"),
    );
    const fold = window.innerHeight;
    for (const el of sections) {
      if (el.getBoundingClientRect().top > fold * 0.9) el.classList.add("reveal");
    }

    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));

    const runCount = (el: HTMLElement) => {
      const target = Number(el.dataset.count);
      if (!Number.isFinite(target) || el.dataset.counted === "1") return;
      el.dataset.counted = "1";
      const suffix = el.dataset.countSuffix ?? "";
      const start = performance.now();
      const ms = 900;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / ms);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString(document.documentElement.lang) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      el.textContent = "0" + suffix;
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.add("in");
          el.classList.remove("reveal");
          io.unobserve(el);
          for (const c of counters) if (el.contains(c)) runCount(c);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    for (const el of sections) io.observe(el);

    // a counter that is already on screen when the page loads still counts
    for (const c of counters) {
      if (c.getBoundingClientRect().top < fold) runCount(c);
    }

    return () => io.disconnect();
  }, []);

  return null;
}

export const MOTION_EASE = EASE;
