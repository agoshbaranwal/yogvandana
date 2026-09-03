import type { Metadata, Viewport } from "next";
import "../globals.css";
import { fontClass } from "@/lib/fonts";
import { absolute, site, t } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(absolute("/")),
  title: {
    default: `${t(site.claim, "en")} | ${t(site.brand, "en")}`,
    template: `%s`,
  },
  description: t(site.claim, "en"),
  manifest: absolute("/manifest.webmanifest"),
};

export const viewport: Viewport = {
  themeColor: "#FF9933",
  colorScheme: "light",
  viewportFit: "cover",
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontClass}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
