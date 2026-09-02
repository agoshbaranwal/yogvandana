import type { Metadata } from "next";
import { LegalPage } from "@/views/Simple";
import { ui } from "@/lib/content";
import { legalSections } from "@/lib/legal";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "en",
  routeKey: "terms",
  title: ui("legal.terms", "en"),
  description: ui("legal.terms", "en"),
  ogKey: "legal",
});

export default function Page() {
  return (
    <LegalPage
      lang="en"
      routeKey="terms"
      title={ui("legal.terms", "en")}
      sections={legalSections("terms", "en")}
    />
  );
}
