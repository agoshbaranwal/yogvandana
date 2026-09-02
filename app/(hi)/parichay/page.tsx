import type { Metadata } from "next";
import About from "@/views/About";
import { site, t, ui } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "hi",
  routeKey: "about",
  title: t(site.teacher, "hi"),
  description: `${t(site.credential, "hi")} · ${ui("about.eyebrow", "hi")}`,
});

export default function Page() {
  return <About lang="hi" />;
}
