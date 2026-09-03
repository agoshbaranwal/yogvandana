# Taking money on this site

Written for Agosh, 3 September 2026. Plain words, in the order you would actually do it.
Rates and rules change; treat every number here as "check it on the day", and take the tax
paragraph to a CA rather than from me.

---

## The short answer

**You do not need a payment gateway to start taking money, and you should not integrate one yet.**

This site already has two fields waiting for a link — `joinLink` on every batch and `feeLink` for
existing students. Paste a Razorpay **Payment Link** into them and every "इस बैच में जुड़ें" and
"फ़ीस भरें" button becomes a working payment, with no code, no server, and nothing to maintain.
That is a Saturday afternoon's work, most of it her KYC.

Integrating a checkout — the card form appearing inside the page — needs a server this site does
not have, and buys almost nothing at her volume. Do it later, if ever.

---

## The decision, in one table

Rows that were the same down every column have been taken out — they cannot decide anything. What
is left is only what differs. Rates change; check them on the day.

| | UPI QR / her UPI ID | Payment link | Hosted payment page | Checkout on the site | Auto-debit |
|---|---|---|---|---|---|
| **What it is** | She sends a QR; they scan and pay her | She sends a link on WhatsApp | One page of hers listing every batch | They pay without leaving the site | The fee is pulled every month |
| **She can take money** | Today | In a few days, once KYC clears | In a few days | Two weeks or more | Two weeks or more |
| **Who does the work** | Her, alone | Her, alone | Her, plus dashboard setup | Me, days of building | Her, plus setup help |
| **Cost on ₹45,000 a month** | **₹0** | **about ₹210** | about ₹210 | about ₹210 | about ₹210, plus mandate charges |
| **Her work every month** | Hours — matching names to a bank statement | Minutes — send one link | Minutes | Minutes | None, once it runs |
| **When a refund is needed** | She sends money back by hand | A button | A button | A button | A button |
| **If she cannot deliver** | The student has **no recourse** — it is cash | A dispute process, both sides protected | Same | Same | Same |
| **What can go wrong** | Fake payment screenshots; no record of who paid for what | Account frozen if disputes spike — rare | Same, plus two places to keep in step | Our own bugs, and a secret key in a public repo | Mandates fail silently and you find out late |
| **To a stranger who found her online** | **Looks like a scam** — the exact pattern they are warned about | **Most convincing** — a page they know, a business name, a receipt | Most convincing | Less convincing than a redirect: a card form on an unknown site | Least convincing — asks permission before any result |
| **Easy to leave later** | Yes | Yes | Yes | Code has to be unpicked | Every student must re-approve |
| **Verdict** | **Keep as a second option** for people who already know her | **Do this** | Later, if she gets tired of making links | **No** — not until drop-off proves it is worth it | **Not yet** |

**Read the money row twice.** The 2% card fee sounds like the reason to avoid a gateway, and it is
not: on thirty students at ₹1,500, with eight in ten paying by UPI where the fee is nil, a payment
link costs her about **₹210 a month**. That ₹210 buys a receipt for every student, a record of who
paid for what, a refund button, and a page a stranger is willing to type their card into.

Two things that are true of every column, so they are not in the table: **no provider should charge
her a setup fee or an annual fee** (Razorpay and Cashfree do not; if one asks, walk), and **money
reaches her bank in two to three working days** in every option except the UPI QR, where it is
instant.

## 1. The three routes, and what each one costs you

| | What the student sees | What it needs | When it is right |
|---|---|---|---|
| **Payment link** | Taps "जुड़ें", lands on Razorpay's page, pays by UPI or card, comes back | A Razorpay account. No code. | Now, and probably for the next year |
| **Payment page** | A branded page of her own with the batch list on it | Same account, a bit of setup in their dashboard | When there are several batches and she is tired of making links |
| **Checkout on the site** | Pays without leaving your page | A **server** to create the order and verify the signature — a serverless function on Vercel or Cloudflare | When enough people drop off at the hand-off to justify it, and not before |

The reason the third one needs a server is worth understanding, because it is the whole
difference: the amount must be decided somewhere the student cannot edit, and the "payment
succeeded" message must be verified with a secret key. Do either of those in the browser and
anyone can join a batch for ₹1.

## 2. Which provider

**Razorpay** for an Indian teacher taking Indian money: UPI, cards, netbanking and wallets in one
account, a decent dashboard she can read on a phone, payment links by WhatsApp built in.
Cashfree and Instamojo do the same job; Instamojo is the easiest to open and the most expensive
per rupee. PayU and Paytm are fine and more fiddly. Stripe is not the tool for this — its India
support is limited and its strength is international cards she will rarely see.

If most students are family and neighbours, note the plainest option of all: **a UPI QR code and
her VPA**. Zero fee, instant, no account with anyone. Its weakness is that nothing reconciles
itself — she is matching names to a bank statement by hand — which is exactly why a payment link
is worth its 2%.

## 3. What she needs to open the account

Keep this list to hand; it is where the week goes.

- **PAN card** (hers, or the business's)
- **Bank account** in the same name, plus a cancelled cheque or a statement page
- **Aadhaar / address proof**
- **Business proof** — for a sole proprietor, usually a **Udyam registration** (free, online, ten
  minutes) or a GST certificate or a shop-and-establishment licence
- **A website with four pages on it**: terms, refund policy, privacy policy, and contact details
  with a real address and phone number

That last one is not a formality. Gateways reject applications over it every day, and it is the
reason this site already has `/terms/`, `/refund/`, `/privacy/` and `/sampark/` written. They are
marked as drafts pending her reading them — she needs to actually read them before you apply,
because the refund page is the one the gateway will hold you to.

## 4. What it costs

Roughly, and check on the day:

- **UPI** — usually **nil** for a merchant this size. This matters: most of her students will pay
  by UPI, so her real blended cost will be well under the headline rate.
- **Cards and netbanking** — about **2%**, plus 18% GST on the fee itself.
- **International cards** — about **3%**.
- **Settlement** — money reaches her bank in **T+2 or T+3** working days. Tell her that before the
  first payment, or the first Monday will be a phone call.
- **Setup and annual fees** — none, at the standard tier.

## 5. Monthly fees: the part that will bite

She is selling a **monthly** class, and the obvious wish is auto-debit. Understand what that
involves before promising it:

- Recurring payments in India run on **e-mandate / UPI Autopay**, which the student registers once
  with their bank's approval.
- The RBI requires a **pre-debit notification** to the customer before each charge, and additional
  authentication above a threshold amount, which has moved more than once — check the current
  figure when you set it up.
- Razorpay calls this **Subscriptions**, and it is a separate product with its own setup.

For a batch of thirty students, this is more machinery than it is worth at the start. **Send a
payment link on the first of the month in the WhatsApp group.** She already has the group; the
message is one tap; students who have not paid are visible in the dashboard. Move to
Subscriptions when chasing payments actually costs her an evening a month.

## 6. Tax

Two things to settle with a CA before the first rupee, not after:

- **GST registration** becomes compulsory for a service provider above a turnover threshold —
  ₹20 lakh in most states, ₹10 lakh in the special-category ones. Below it, she need not register.
- Whether her teaching is **exempt** is genuinely not obvious. Yoga taught by an entity registered
  under section 12AA as a charitable activity is exempt; an individual teacher selling classes
  usually is not. Do not guess this from a website — hers or mine.

Also: keep the money in a **separate bank account** from her personal one from day one. Every
accountant will tell you the same thing, and it costs nothing to do at the start and a weekend to
fix later.

## 7. Things to keep in mind

**This repository is public.** A Razorpay account has a `key_id` (public, safe in the page) and a
`key_secret` (never, under any circumstances, in the repo — it is the key that signs payments). If
you ever build the server-side checkout, the secret goes in the hosting provider's environment
variables and nowhere else. If a secret ever does get committed, rotating it in the dashboard is
the fix; deleting the commit is not, because the history is public.

**Test mode first.** Razorpay gives you test keys and a test card number. Take one full payment in
test mode, refund it in test mode, and watch both appear in the dashboard, before a real student
sees a button.

**The refund page is a promise.** Whatever it says — a month's notice, a pro-rata refund, no
refund after the first week — is what the gateway will enforce when a student disputes a charge.
Write what she will actually honour, not what sounds generous.

**Never take money before the conversation.** The site now says the talk is free and the classes
are paid; the payment link belongs *after* she has spoken to someone, not on the home page. That
is not only kinder, it is what keeps the chargeback rate at zero.

**Reconciliation is the real work.** The dashboard tells you a payment arrived; it does not tell
you which of two Sunitas it was. Put the student's name and batch in the payment link's
description every time, and the monthly matching takes ten minutes instead of an hour.

**Do not store card details.** Not in a spreadsheet, not in WhatsApp, not "just this once". Card
storage is regulated and tokenisation is the gateway's job.

## 8. What to do, in order

1. Get her **Udyam registration** (free, online) if she has no GST certificate.
2. Open the **Razorpay account** with the documents in section 3.
3. Have her **read the terms, refund and privacy pages** on this site and tell you what to change.
   Then take `live: false` off those pages' drafts note.
4. Create **one payment link per batch** and paste each into `joinLink` in
   `content/batches/<id>.json`, and one into `feeLink` for the students' page.
5. Take **one real ₹1 payment** yourself, end to end, and refund it.
6. Only then tell her the buttons are live.

Nothing in steps 1 to 6 needs a line of code.
