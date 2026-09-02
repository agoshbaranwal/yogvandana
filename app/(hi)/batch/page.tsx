import type { Metadata } from "next";
import { BatchesPage } from "@/views/Simple";
import { ui } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "hi",
  routeKey: "batches",
  title: ui("batches.title", "hi"),
  description: ui("batches.lead", "hi"),
});

export default function Page() {
  return <BatchesPage lang="hi" />;
}
