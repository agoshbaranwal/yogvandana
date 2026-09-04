import Link from "next/link";
import type { ComponentProps } from "react";

/* The site's only link.

   Next fetches the route payload of every <Link> the moment it scrolls into
   view. On a page with eight links that is eight extra downloads before the
   reader has decided anything — on a metered ₹10–15,000 Android, most of them
   paid for and never read. The payload is small and the pages are static, so
   fetching it on the tap costs a moment and saves the rest.

   Import this, not next/link. scripts/type-check.mjs enforces it. */
export function A(props: ComponentProps<typeof Link>) {
  return <Link prefetch={false} {...props} />;
}
