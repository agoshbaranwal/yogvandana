import type { Metadata } from "next";
import Students from "@/views/Students";
import { ui } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "hi",
  routeKey: "students",
  title: ui("students.title", "hi"),
  description: ui("students.lead", "hi"),
});

export default function Page() {
  return <Students lang="hi" />;
}
