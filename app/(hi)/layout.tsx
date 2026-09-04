import type { Metadata, Viewport } from "next";
import "../globals.css";
import { hindiFontClass } from "@/lib/fonts";
import { absolute, site, t } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(absolute("/")),
  title: {
    default: `${t(site.claim, "hi")} | ${t(site.brand, "hi")}`,
    template: `%s`,
  },
  description: t(site.claim, "hi"),
  manifest: absolute("/manifest.webmanifest"),
};

export const viewport: Viewport = {
  /* the browser chrome takes the page colour, so the toolbar and the page
     read as one surface */
  themeColor: "#fcfcfb",
  colorScheme: "light",
  viewportFit: "cover",
};

export default function HindiLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi" className={hindiFontClass}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
