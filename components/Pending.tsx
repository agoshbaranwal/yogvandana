import { ui } from "@/lib/content";
import type { Lang } from "@/lib/routes";

/* The quiet line that stands in for a row of identical blanks. */
export function PendingNote({ lang, n }: { lang: Lang; n: number }) {
  if (n <= 0) return null;
  return <p className="cap">{ui("pending.more", lang).replace("{n}", String(n))}</p>;
}
