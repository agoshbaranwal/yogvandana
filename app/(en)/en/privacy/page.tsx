import type { Metadata } from "next";
import { LegalPage } from "@/views/Simple";
import { ui } from "@/lib/content";
import { legalSections } from "@/lib/legal";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "en",
  routeKey: "privacy",
  title: ui("legal.privacy", "en"),
  description: ui("legal.privacy", "en"),
  ogKey: "legal",
});

export default function Page() {
  return (
    <LegalPage
      lang="en"
      routeKey="privacy"
      title={ui("legal.privacy", "en")}
      sections={legalSections("privacy", "en")}
    />
  );
}
