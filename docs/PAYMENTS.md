# Taking money on this site

The site can take a fee two ways. Both are already coded. Neither is switched
on, because switching them on means pasting in an account that belongs to a
real person, and that is Agosh's to paste, not mine.

Until one is filled in, the two batch cards on the home page show a reserved
box saying online payment is being set up, and WhatsApp carries the reader.
Nothing is broken and nothing is a dead link.

---

## Way 1 — UPI. Works today, no KYC, nothing to sign up for.

A UPI id is an account you already have. No gateway, no percentage taken, no
onboarding. Every phone in the country can send to it.

**What to do**

1. Open GPay, PhonePe or your bank app and find your UPI id. It looks like
   `something@okhdfcbank` or `9876543210@ybl`.
2. Open `content/site.json`.
3. Fill in the two fields:

```json
"pay": {
  "upiId": "vandana@okaxis",
  "upiName": "Yog Vandana"
}
```

4. Save. That is the whole change.

**What the reader gets.** The button opens whichever UPI app is on their phone
with the id, the ₹1,000 and a note saying which batch already filled in. They
approve it and the money is in the account. On a computer, where `upi://` links
do nothing, the id is also printed on the page as text they can copy.

**What to know before choosing this.**

- The money lands in whichever account the id belongs to. Use one you are
  happy to hand out publicly.
- Nobody sends a receipt. The note says `Yog Vandana morning` so the bank
  statement is readable, but matching payments to students is manual work
  every month.
- No refund button. A refund is you sending money back.
- It is income either way. Being outside a gateway does not make it untaxed.

---

## Way 2 — Razorpay. Cards, netbanking, receipts. Needs KYC first.

**What to do**

1. Go to **razorpay.com** and sign up.
2. Finish **KYC**. For one person trading under their own name that is PAN,
   a bank account in the same name, and an address proof. Expect a few working
   days for approval.
3. Once the account is live, open **Payment Pages** in the dashboard and
   create one.
   - Amount: **1000**
   - Add fields for **name** and **phone** — otherwise a payment arrives with
     no idea who sent it.
   - Add a field named exactly **`batch`**. The site appends `?batch=morning`
     or `?batch=evening` to the link, and Razorpay fills that field in on its
     own, so every payment says which class it was for. Name it anything else
     and it is simply ignored — nothing breaks.
4. **Publish** the page and copy its link. It looks like
   `https://rzp.io/l/xxxxx` or `https://pages.razorpay.com/xxxxx`.
5. Open `content/site.json` and paste it in:

```json
"links": {
  "paymentPage": "https://rzp.io/l/xxxxx"
}
```

**Fees.** Roughly 2% plus GST on cards and netbanking. UPI through a gateway is
usually free. Check their live pricing page — it changes.

**Only these hosts are accepted:** razorpay.com, rzp.io, cashfree.com, cf-pg.com,
phonepe.com, paytm.in, paytm.com, instamojo.com, payu.in — and a `pay.` subdomain
of her own domain once there is one. Anything else, including a shortened link
or an `http://` one, **fails the build on purpose**. A payment link is the one
field here where a typo sends a stranger's ₹1,000 to a stranger.

---

## If both are filled in

The card button uses **Razorpay**, because it takes every payment method and
issues a receipt. The UPI id still appears underneath as the second way.

## What happens after someone pays

The site tells them the Zoom link and timing arrive on WhatsApp. Nothing
automates that yet — a payment notification arrives on the phone and someone
sends the message. That is fine at ten students a month and is the first thing
to automate at a hundred.

## Two rules watch this

Both run in `npm run check` and stop a deploy.

- **23** — every button that takes money reaches a real payment channel. With
  an account configured it checks every destination; with none, it checks that
  there are no dead buttons *and* that the reserved box is standing in their
  place, so the rule still means something while the site has no account.
- **24** — every page that asks for a fee also carries the line saying she
  will never ask for a UPI PIN or an OTP. The commonest way this audience
  loses money is somebody phoning to say they are from her office.

## Still to do, whichever way is chosen

- `content/batches/*.json` → `refundLine` is still `[the refund rule in one
  line]` in both languages, and the refund page links off the payment block.
  Write the real rule before taking a rupee.
- `content/site.json` → `contact.businessName` and `contact.address` are still
  in brackets. A payment gateway's KYC will ask for both anyway.
