import type { Metadata } from "next";
import { LegalPage } from "@/views/Simple";
import { ui } from "@/lib/content";
import { legalSections } from "@/lib/legal";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "hi",
  routeKey: "privacy",
  title: ui("legal.privacy", "hi"),
  description: ui("legal.privacy", "hi"),
  ogKey: "legal",
});

export default function Page() {
  return (
    <LegalPage
      lang="hi"
      routeKey="privacy"
      title={ui("legal.privacy", "hi")}
      sections={legalSections("privacy", "hi")}
    />
  );
}
