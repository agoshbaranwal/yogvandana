import type { Metadata } from "next";
import Stories from "@/views/Stories";
import { ui } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "en",
  routeKey: "stories",
  title: ui("stories.title", "en"),
  description: ui("stories.lead", "en"),
});

export default function Page() {
  return <Stories lang="en" />;
}
