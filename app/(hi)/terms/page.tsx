import type { Metadata } from "next";
import { LegalPage } from "@/views/Simple";
import { ui } from "@/lib/content";
import { legalSections } from "@/lib/legal";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  lang: "hi",
  routeKey: "terms",
  title: ui("legal.terms", "hi"),
  description: ui("legal.terms", "hi"),
  ogKey: "legal",
});

export default function Page() {
  return (
    <LegalPage
      lang="hi"
      routeKey="terms"
      title={ui("legal.terms", "hi")}
      sections={legalSections("terms", "hi")}
    />
  );
}
