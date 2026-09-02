import type { Metadata } from "next";
import Students from "@/views/Students";
import { ui } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "en",
  routeKey: "students",
  title: ui("students.title", "en"),
  description: ui("students.lead", "en"),
});

export default function Page() {
  return <Students lang="en" />;
}
