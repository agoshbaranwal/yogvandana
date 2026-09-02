import type { Metadata } from "next";
import Credentials from "@/views/Credentials";
import { ui } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "hi",
  routeKey: "credentials",
  title: ui("credentials.title", "hi"),
  description: ui("credentials.lead", "hi"),
});

export default function Page() {
  return <Credentials lang="hi" />;
}
