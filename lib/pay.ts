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

/* ---------------------------------------------------------------------------
   UPI: the channel that works before any gateway does.

   A UPI id is a bank account she already has. No KYC, no onboarding, no
   percentage, and every phone in this country can send to it. The deep link
   below opens whichever app the reader already uses — GPay, PhonePe, Paytm —
   with her id, the amount and a note already filled in, so the only thing
   left to do is approve it.

   It does not work on a desktop, where `upi://` opens nothing at all. So the
   id is always ALSO shown as plain text a person can copy into their phone.
   A button that silently does nothing is worse than no button.

   The note is deliberately Latin and short: several UPI apps drop or mangle a
   long or non-ASCII `tn`, and a payment nobody can identify is a payment she
   has to chase. */

const q = (o: Record<string, string>) =>
  Object.entries(o)
    .filter(([, v]) => v !== "")
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join("&");

export function upiHref(opts: { amount?: string; note?: string } = {}): string | null {
  const pa = site.pay.upiId.trim();
  if (!pa) return null;
  /* ₹1,000 in the content is a string meant for reading. UPI wants a number. */
  const am = (opts.amount ?? "").replace(/[^\d.]/g, "");
  return `upi://pay?${q({
    pa,
    pn: site.pay.upiName.trim(),
    am,
    cu: "INR",
    tn: (opts.note ?? "").replace(/[^\x20-\x7E]/g, "").trim().slice(0, 40),
  })}`;
}

/** Which ways of paying actually exist right now. Both may be false, and the
 *  page then asks the reader to talk instead of showing a dead button. */
export function payWays(): { gateway: boolean; upi: boolean; any: boolean } {
  const gateway = takingPayments();
  const upi = site.pay.upiId.trim() !== "";
  return { gateway, upi, any: gateway || upi };
}
