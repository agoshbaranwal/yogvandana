import type { Metadata } from "next";
import Gallery from "@/views/Gallery";
import { ui } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "hi",
  routeKey: "gallery",
  title: ui("gallery.title", "hi"),
  description: ui("gallery.lead", "hi"),
});

export default function Page() {
  return <Gallery lang="hi" />;
}
