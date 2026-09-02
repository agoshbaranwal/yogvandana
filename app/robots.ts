import type { MetadataRoute } from "next";
import { absolute, site } from "@/lib/content";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return site.live
    ? {
        rules: [{ userAgent: "*", allow: "/" }],
        sitemap: absolute("/sitemap.xml"),
      }
    : { rules: [{ userAgent: "*", disallow: "/" }] };
}
