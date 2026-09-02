import type { Metadata } from "next";
import Home from "@/views/Home";
import { site, t, ui } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "en",
  routeKey: "home",
  title: t(site.claim, "en"),
  description: ui("home.heroLead", "en"),
});

export default function Page() {
  return <Home lang="en" />;
}
