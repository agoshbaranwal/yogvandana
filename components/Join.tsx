import { absolute, groupBatches, site, t, ui } from "@/lib/content";
import { payHref, payWays, upiHref } from "@/lib/pay";
import { href, type Lang } from "@/lib/routes";
import { telHref, waHref, waMessage } from "@/lib/whatsapp";
import { PhoneIcon, WhatsAppIcon } from "./Icons";
import { A as Link } from "./Nav";
import { Tx } from "./Tx";

/* The block for somebody who has already decided.

   Every other ask on this site says talk first, because almost everybody
   arriving here is frightened and wants to be told they can keep their
   medicine. But a proportion have read enough — a neighbour sent them, or
   they have watched her for a month — and for those people "message her on
   WhatsApp and wait for a reply" is a wall. This is the one place that takes
   money in a single tap.

   Two channels, in order of who can use them:

   · UPI works on day one. Her id is an account she already has, no gateway,
     no percentage, and the deep link opens whichever app the reader already
     pays their electricity bill with.
   · A hosted payment page takes cards and netbanking and issues a receipt,
     and needs her to finish KYC first.

   · WhatsApp, which is how most teachers in this country actually take a fee
     today: the reader asks to join, she sends a UPI number back.

   THE BUTTON ALWAYS DOES SOMETHING. The first version of this block rendered
   a grey box reading "online payment is being set up" when neither account
   existed — which is what shipped, and it meant that on a page selling a
   ₹1,000 class there was not one clickable way to pay anywhere on the site.
   Agosh said so plainly. A button that cannot be pressed is worse than no
   section at all: it advertises that you cannot buy. The order below is
   gateway, then UPI, then WhatsApp, and the line under the cards says which
   of the three the reader is about to get, so nothing is promised that the
   next screen does not deliver. */

function payFor(batch: (typeof groupBatches)[number], lang: Lang, page: string) {
  const gateway = payHref({ batchId: batch.id, own: batch.joinLink, kind: "join" });
  if (gateway) return { href: gateway, method: "gateway" as const, offsite: false };
  /* The note is what she will read in her passbook at the end of the month,
     so it carries the batch, in Latin, which every UPI app renders. */
  const upi = upiHref({ amount: batch.price, note: `Yog Vandana ${batch.id}` });
  if (upi) return { href: upi, method: "upi" as const, offsite: false };
  /* No account yet — so the button starts the same errand by hand. The
     message already names the batch, so her reply is a UPI number and not a
     question. */
  return {
    href: waHref(
      site.contact.whatsapp,
      waMessage({ lang, kind: "join", batch: t(batch.name, lang), page }),
    ),
    method: "whatsapp" as const,
    offsite: true,
  };
}

export function Join({ lang, source = "join" }: { lang: Lang; source?: string }) {
  const ways = payWays();
  const shown = groupBatches.slice(0, 2);
  if (shown.length === 0) return null;

  /* the full address, not "/", so the link in her WhatsApp opens */
  const page = absolute(href("home", lang));
  const wa = waHref(site.contact.whatsapp, waMessage({ lang, kind: "talk", page }));
  const howLine = ways.gateway ? "pay.note" : ways.upi ? "pay.upiWay" : "pay.viaWhatsapp";

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-3 md:grid-cols-2 md:gap-5">
        {shown.map((b, i) => {
          const pay = payFor(b, lang, page);
          return (
            <article key={b.id} className="card flex flex-col gap-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 flex-col gap-0.5">
                  <h3 className="h3">
                    <Tx>{t(b.name, lang)}</Tx>
                  </h3>
                  <p className="cap">
                    <Tx>
                      {[t(b.when, lang), ui("batches.minutes", lang).replace("{m}", b.minutes)]
                        .filter(Boolean)
                        .join(" · ")}
                    </Tx>
                  </p>
                </div>
                <div className="flex-none text-right">
                  <p className="num point-sm">
                    <Tx>{`₹${b.price}`}</Tx>
                  </p>
                  <p className="cap">
                    <Tx>{t(b.priceUnit, lang)}</Tx>
                  </p>
                </div>
              </div>

              <a
                href={pay.href}
                target={pay.offsite ? "_blank" : undefined}
                rel={pay.offsite ? "noopener noreferrer" : undefined}
                className={`btn btn-block ${i === 0 ? "btn-primary" : "btn-outline"}`}
                data-ev="pay_click"
                data-ev-method={pay.method}
                data-ev-batch={b.id}
                data-ev-source={source}
              >
                {ui("cta.payJoin", lang)}
              </a>

              {b.perDay ? (
                <p className="cap">
                  <Tx>{ui("pay.perDay", lang).replace("{n}", b.perDay)}</Tx>
                </p>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="flex flex-col gap-2.5">
        {/* what the button is about to do, said before it is pressed */}
        <p className="cap">
          <Tx>{ui(howLine, lang)}</Tx>
        </p>

        {/* A upi:// link opens nothing at all on a desktop, so her id is also
            here as text somebody can read off the screen and type into their
            phone. A button that silently does nothing is worse than none. */}
        {ways.upi ? (
          <p className="cap">
            <Tx>{`${ui("pay.upiIdLabel", lang)}: `}</Tx>
            <span className="upi-id">
              <Tx>{site.pay.upiId}</Tx>
            </span>
          </p>
        ) : null}

        {ways.any ? (
          <p className="cap">
            <Tx>{ui("pay.after", lang)}</Tx>
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2.5 border-t border-rule pt-4">
        <p className="label">{ui("pay.talkFirst", lang)}</p>
        <div className="flex flex-wrap gap-2.5">
          <a
            className="btn btn-wa"
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            data-ev="whatsapp_click"
            data-ev-source={source}
          >
            <WhatsAppIcon size={20} />
            {ui("cta.whatsappTalk", lang)}
          </a>
          <a
            className="btn btn-white"
            href={telHref(site.contact.phone)}
            data-ev="call_click"
            data-ev-source={source}
          >
            <PhoneIcon size={20} />
            {ui("cta.call", lang)}
          </a>
        </div>
      </div>

      {/* The one sentence that matters most on a page that asks for money. A
          reader who is about to be told "share your OTP to confirm" by
          somebody pretending to be her has read this first. */}
      <p className="cap paysafe">
        <Tx>{ui("pay.safetyShort", lang)}</Tx>
      </p>

      <p className="cap">
        <Link href={href("refund", lang)} className="tap font-bold underline underline-offset-4">
          {ui("pay.refundLink", lang)}
        </Link>
      </p>
    </div>
  );
}
