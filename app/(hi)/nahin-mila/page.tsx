import type { Metadata } from "next";
import { NotFoundPage } from "@/views/Simple";
import { ui } from "@/lib/content";

/* The page a static host shows when nothing matches. It is built as a normal
   route and copied to out/404.html, because Next reserves /404 for its own. */

export const metadata: Metadata = {
  title: ui("notFound.title", "hi"),
  robots: { index: false, follow: false },
};

export default function Page() {
  return <NotFoundPage lang="hi" />;
}
