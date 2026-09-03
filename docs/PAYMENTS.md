# Taking money on this site

Written for Agosh, 3 September 2026, and rewritten the same day after he pushed back on the first
version. Plain words. Rates and rules change; treat every number as "check it on the day", and take
the tax section to a CA rather than from me.

---

## The short answer

**Her own button, on her own page, opening a Razorpay payment page. And a real domain first.**

The site already has the two fields this needs — `joinLink` on every batch and `feeLink` for
existing students. Paste a Razorpay URL into them and every "इस बैच में जुड़ें" and "फ़ीस भरें"
button works, in her design, with no code and nothing to maintain.

**What we are not doing: sending payment links on WhatsApp.** The first version of this document
recommended that, and it was wrong. See section 2.

---

## 1. The options, and what each one costs to build

| | UPI QR | Her button → gateway page | Pay button embedded on her page | Link sent on WhatsApp | Auto-debit |
|---|---|---|---|---|---|
| **How the student gets there** | She sends a QR | They are on her site and tap her button | They are on her site and tap Razorpay's button | A link arrives in a chat | They approve a mandate once |
| **Does a raw payment URL travel?** | No | No | No | **Yes — this is the problem** | No |
| **Work from me** | Half an hour | **Ten minutes** — it is a URL in a content file | Half a day, plus a decision about how it looks | Ten minutes | Days |
| **Work from her** | Minutes | A day, mostly KYC | A day, mostly KYC | A day | A day, plus mandate setup |
| **She can take money** | Today | Days, once KYC clears | Days | Days | Two weeks or more |
| **Cost on ₹45,000 a month** | ₹0 | about ₹210 | about ₹210 | about ₹210 | about ₹210, plus mandate charges |
| **Her work every month** | Hours, matching names to a bank statement | Minutes | Minutes | Minutes | None, once it runs |
| **If she cannot deliver** | The student has **no recourse** — it is cash | A dispute process | A dispute process | A dispute process | A dispute process |
| **Looks like our site** | n/a | **Yes** — our button, our type, our colour | No — their button renders in a frame our stylesheet cannot reach | n/a | n/a |
| **To a stranger who found her online** | Looks like a scam | **Familiar — a Pay button on a website** | Familiar, and no page change | **Suspicious — the scam pattern** | Worst: permission before any result |
| **Verdict** | Keep for people who already know her | **Do this** | Later, if the hand-off is shown to lose people | Only to someone who asks for it | Not yet |

Full custom checkout — the one that needs a server — is not in the table any more. Razorpay's
embedded button gets most of the way there for a fraction of the work, so a server is now a
solution to a problem we do not have. It stays a no.

## 2. Why not a payment link on WhatsApp

The first version of this document said payment links were the most convincing option for a
stranger. That confused two different things.

**The destination earns trust. The delivery loses it.** A Razorpay page showing her registered
business name and an amount is reassuring. An unsolicited `rzp.io/l/AbC123` arriving in WhatsApp is
the exact pattern every cautious Indian has been warned about — opaque, tells you nothing before
you tap, and "do not click links people send you" is advice her students have been given repeatedly
and correctly.

Payment links are common in India, but for **collection**: insurance renewals, loan EMIs, hospital
bills, an Instagram seller invoicing you. They are not how someone buys a service for the first
time. For that, what people know is a Pay button on a website.

So: the payment URL lives behind a button on her site and never travels on its own.

- **A new student** talks to her on WhatsApp; she sends *the website* link, and they tap the button.
- **An existing student** gets the students-page link in the group and taps फ़ीस भरें.
- **Someone who already knows her** scans the UPI QR.

## 3. The domain is now part of the payment decision

`agoshbaranwal.github.io/yogvandana/` undercuts exactly the trust this design is buying. A person
who is already nervous about paying a stranger online, handed off from a URL with someone else's
name in it, is a person who does not pay. **Get the domain before the first rupee.** It moved from
nice-to-have to required the moment money entered the picture.

## 4. Which provider

**Razorpay** for an Indian teacher taking Indian money: UPI, cards, netbanking and wallets in one
account, a dashboard she can read on a phone, and both the hosted page and the embeddable button.
Cashfree does the same job. Instamojo is the easiest to open and the most expensive per rupee. PayU
and Paytm are fine and more fiddly. Stripe is not the tool for this — its strength is international
cards she will rarely see.

## 5. What she needs to open the account

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

## 6. What it costs

Roughly, and check on the day:

- **UPI** — usually **nil**. Most of her students will pay this way, so her blended cost lands far
  below the headline rate: on thirty students at ₹1,500 with eight in ten paying by UPI, a gateway
  costs her about **₹210 a month**.
- **Cards and netbanking** — about **2%**, plus 18% GST on that fee.
- **Settlement** — the money reaches her bank in **two to three working days**. Tell her before the
  first payment, or the first Monday is a phone call.
- **Setup and annual fees** — none. Razorpay and Cashfree charge neither on their standard plans.
  If a provider asks for one at her volume, walk.

## 7. Monthly fees: the part that will bite

She is selling a **monthly** class, and the obvious wish is auto-debit. What that involves:

- Recurring payments in India run on **e-mandate / UPI Autopay**, which the student registers once
  with their bank's approval.
- The RBI requires a **pre-debit notification** before each charge, and additional authentication
  above a threshold that has moved more than once — check the current figure when you set it up.
- Mandates fail silently, and you find out a month later.

For a batch of thirty, this is more machinery than it is worth. **Post the students-page link in
the WhatsApp group on the first of the month.** Move to mandates when chasing payments actually
costs her an evening.

## 8. Tax

Two things to settle with a CA before the first rupee, not after:

- **GST registration** becomes compulsory for a service provider above a turnover threshold —
  ₹20 lakh in most states, ₹10 lakh in the special-category ones. Below it, she need not register.
- Whether her teaching is **exempt** is genuinely not obvious. Yoga taught by an entity registered
  under section 12AA as a charitable activity is exempt; an individual teacher selling classes
  usually is not. Do not guess this from a website — hers or mine.

Also: keep the money in a **separate bank account** from her personal one from day one. Every
accountant will tell you the same thing, and it costs nothing to do at the start and a weekend to
fix later.

## 9. Things to keep in mind

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

## 10. What to do, in order

1. **Buy the domain.** Nothing else here is worth doing from a github.io address.
2. Get her **Udyam registration** (free, online) if she has no GST certificate.
3. Open the **Razorpay account** with the documents in section 5.
4. Have her **read the terms, refund and privacy pages** on this site and tell you what to change.
5. Build a **payment page** in Razorpay's dashboard with her batches on it, and paste its URL into
   `joinLink` in `content/batches/<id>.json` and into `feeLink` for the students' page.
6. Take **one real ₹1 payment** yourself, end to end, and refund it.
7. Only then tell her the buttons are live.

Nothing in steps 1 to 7 needs a line of code from me. Step 5 is a ten-minute content edit, and
`CONTENT-GUIDE.md` explains it well enough that you can do it without me.
