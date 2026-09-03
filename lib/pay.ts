import { site } from "./content";

/* Where a "join this batch" or "pay the fee" button goes.

   One hosted payment page for the whole site, pasted once into
   content/site.json → links.paymentPage. A batch may override it with its own
   joinLink if she ever wants a separate page per batch.

   The batch travels with the link. Her dashboard tells her a payment arrived;
   it does not tell her which of two Sunitas sent it, and reconciliation is the
   real monthly work. If she adds a field named `batch` to the payment page,
   the gateway fills it in from this and every payment says which class it was
   for. If she does not, the parameter is ignored and nothing breaks. */

export type PayKind = "join" | "fee";

export function payHref(opts: { batchId?: string; own?: string; kind?: PayKind }): string | null {
  const base = (opts.own || "").trim() || site.links.paymentPage.trim();
  if (!base) return null;
  try {
    const url = new URL(base);
    if (opts.batchId) url.searchParams.set("batch", opts.batchId);
    if (opts.kind) url.searchParams.set("for", opts.kind);
    return url.toString();
  } catch {
    return null;
  }
}

/** True once she has pasted a payment page in, which is what turns the buttons
 *  from "message her on WhatsApp" into "pay". */
export const takingPayments = (): boolean => site.links.paymentPage.trim() !== "";
