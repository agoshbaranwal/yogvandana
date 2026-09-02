import type { Metadata } from "next";
import Contact from "@/views/Contact";
import { ui } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "hi",
  routeKey: "contact",
  title: ui("contact.title", "hi"),
  description: ui("contact.lead", "hi"),
});

export default function Page() {
  return <Contact lang="hi" />;
}
