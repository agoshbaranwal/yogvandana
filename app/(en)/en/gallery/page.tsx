import type { Metadata } from "next";
import Gallery from "@/views/Gallery";
import { ui } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "en",
  routeKey: "gallery",
  title: ui("gallery.title", "en"),
  description: ui("gallery.lead", "en"),
});

export default function Page() {
  return <Gallery lang="en" />;
}
