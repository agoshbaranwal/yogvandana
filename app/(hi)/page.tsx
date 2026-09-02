import type { Metadata } from "next";
import Home from "@/views/Home";
import { site, t, ui } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "hi",
  routeKey: "home",
  title: t(site.claim, "hi"),
  description: ui("home.heroLead", "hi"),
});

export default function Page() {
  return <Home lang="hi" />;
}
