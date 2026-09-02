import type { Metadata } from "next";
import Credentials from "@/views/Credentials";
import { ui } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "en",
  routeKey: "credentials",
  title: ui("credentials.title", "en"),
  description: ui("credentials.lead", "en"),
});

export default function Page() {
  return <Credentials lang="en" />;
}
