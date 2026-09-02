import type { Metadata } from "next";
import { BatchesPage } from "@/views/Simple";
import { ui } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "en",
  routeKey: "batches",
  title: ui("batches.title", "en"),
  description: ui("batches.lead", "en"),
});

export default function Page() {
  return <BatchesPage lang="en" />;
}
