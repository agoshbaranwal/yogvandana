import type { Metadata } from "next";
import { LegalPage } from "@/views/Simple";
import { ui } from "@/lib/content";
import { legalSections } from "@/lib/legal";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "en",
  routeKey: "refund",
  title: ui("legal.refund", "en"),
  description: ui("legal.refund", "en"),
  ogKey: "legal",
});

export default function Page() {
  return (
    <LegalPage
      lang="en"
      routeKey="refund"
      title={ui("legal.refund", "en")}
      sections={legalSections("refund", "en")}
    />
  );
}
