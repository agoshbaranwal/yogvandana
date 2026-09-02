import type { Metadata } from "next";
import { AilmentsIndex } from "@/views/Simple";
import { ui } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "en",
  routeKey: "ailments",
  title: ui("home.ailmentsTitle", "en"),
  description: ui("home.ailmentsLead", "en"),
});

export default function Page() {
  return <AilmentsIndex lang="en" />;
}
