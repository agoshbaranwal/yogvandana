import type { Metadata } from "next";
import Stories from "@/views/Stories";
import { ui } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "hi",
  routeKey: "stories",
  title: ui("stories.title", "hi"),
  description: ui("stories.lead", "hi"),
});

export default function Page() {
  return <Stories lang="hi" />;
}
