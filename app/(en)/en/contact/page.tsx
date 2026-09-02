import type { Metadata } from "next";
import Contact from "@/views/Contact";
import { ui } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "en",
  routeKey: "contact",
  title: ui("contact.title", "en"),
  description: ui("contact.lead", "en"),
});

export default function Page() {
  return <Contact lang="en" />;
}
