import type { Metadata } from "next";
import About from "@/views/About";
import { site, t, ui } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "en",
  routeKey: "about",
  title: t(site.teacher, "en"),
  description: `${t(site.credential, "en")} · ${ui("about.eyebrow", "en")}`,
});

export default function Page() {
  return <About lang="en" />;
}
