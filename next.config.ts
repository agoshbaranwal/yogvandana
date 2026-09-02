import type { NextConfig } from "next";

// Static export. `out/` is a folder of plain files that any host can serve,
// including a shared host such as Hostinger and GitHub Pages.
// BASE_PATH is set when the site lives under a sub-folder (GitHub Pages project
// site). It is empty on a real domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
