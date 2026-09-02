import type { Metadata } from "next";
import { LegalPage } from "@/views/Simple";
import { ui } from "@/lib/content";
import { legalSections } from "@/lib/legal";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "hi",
  routeKey: "refund",
  title: ui("legal.refund", "hi"),
  description: ui("legal.refund", "hi"),
  ogKey: "legal",
});

export default function Page() {
  return (
    <LegalPage
      lang="hi"
      routeKey="refund"
      title={ui("legal.refund", "hi")}
      sections={legalSections("refund", "hi")}
    />
  );
}
