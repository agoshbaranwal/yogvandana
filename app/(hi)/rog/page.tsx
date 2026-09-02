import type { Metadata } from "next";
import { AilmentsIndex } from "@/views/Simple";
import { ui } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "hi",
  routeKey: "ailments",
  title: ui("home.ailmentsTitle", "hi"),
  description: ui("home.ailmentsLead", "hi"),
});

export default function Page() {
  return <AilmentsIndex lang="hi" />;
}
