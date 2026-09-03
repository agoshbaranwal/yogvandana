# Taking money on this site

Written for Agosh, 3 September 2026, and researched again the same day against live sources. Plain
words. Rates and rules change; every number here says "check it on the day", and the tax section
goes to a CA rather than coming from me.

---

## The short answer

**Her own button, on her own page, opening a branded payment page. And a real domain first.**

The site already has the two fields this needs — `joinLink` on every batch and `feeLink` for
existing students. Paste a payment-page URL into them and every "इस बैच में जुड़ें" and "फ़ीस भरें"
button works, in her design, with no code and nothing to maintain.

Two things the research changed:

1. **A gateway is not free on UPI.** Zero MDR is a rule about the *banking network*, not about the
   gateway sitting on top of it. Razorpay charges its 2% platform fee on UPI as well as on cards.
   PhonePe and Paytm advertise 0% on UPI. This is the single biggest number in the decision, because
   eight in ten of her students will pay by UPI. See section 5.
2. **Cashfree is giving new merchants 0% up to ₹20 lakh of takings**, for sign-ups between 21 July
   2026 and 31 March 2027. At ₹45,000 a month that is roughly three and a half years of free
   processing. If that offer is still open when she applies, it decides the provider.

**What we are not doing: sending payment links on WhatsApp.** See section 3.

---

## 1. Every option, and how each one works

**1. Cash, or a bank transfer.** She gives her account number; the student does an NEFT or IMPS from
their banking app. No third party, no fee, no record beyond the bank statement.

**2. UPI to her personal ID, sent in a chat.** She types `vandana@okaxis` into WhatsApp, or sends a
photo of a QR. The student opens their UPI app, pays, screenshots it. This is how most Indian
teachers are actually paid today.

**3. The same UPI ID and QR, printed on her website.** Identical money movement, different framing:
the student found it on a page that also has her certificates, her photographs and her phone number,
instead of receiving it in a message. Free, and much less alarming than option 2.

**4. A payment link, one per student.** She creates a link in the gateway dashboard for a fixed
amount and sends it. It looks like `rzp.io/i/AbC123`. The student taps it, lands on the gateway's
page, pays by UPI or card. No website needed at all.

**5. A payment page (branded, hosted by the gateway).** She builds one page in the dashboard —
logo, colours, her batches, an amount field — and it lives at a URL of its own. **Her website's own
button links to it.** The student taps a button on her site and lands somewhere that looks like a
continuation of it, run by a regulated company. This is the recommendation.

**6. A payment button embedded in her page.** A snippet of code puts *the gateway's own button*
inside her page. Clicking it still sends the student to the gateway to pay — Razorpay's
documentation is explicit: "when customers click on the Pay button, they will be redirected to the
Razorpay Payment Gateway to complete the payment." So this is not a way to keep anyone on her site;
it only changes who draws the button. See section 3a.

**7. A checkout built into the site.** The card form is ours, the whole flow never leaves the page.
This needs a **server** to decide the amount and verify the payment, which a static site on GitHub
Pages does not have. It is the thing big brands do and there is no reason for her to do it.

**8. Auto-debit — UPI AutoPay or a card e-mandate.** The student approves a standing permission
once; the fee is taken every month automatically. Under the RBI's 2026 e-mandate framework, debits
up to ₹15,000 need no OTP after the first, and she must send a notice 24 hours before every charge.

**9. An all-in-one platform for coaches.** Exly, Graphy, Bookee, Momence, Ubindi and others give her
a booking page, class scheduling, reminders and payments in one product. She pays them a fee, and
the payment page is theirs.

**10. Selling through a marketplace.** Listing her classes on someone else's app. They bring the
students, take a large cut, and own the relationship.

## 2. All ten, compared

Costs are at her scale — thirty students at ₹1,500 a month, about ₹45,000, four in five paying by
UPI. "Scam-look" is how it reads to a stranger in India who found her online and is nervous.

| # | Option | Cost per month | Ready in | Her money is | Student's recourse | How normal in India | Scam-look | Her monthly work |
|---|---|---|---|---|---|---|---|---|
| 1 | Cash / bank transfer | ₹0 | Today | In her account instantly | **None** | Normal locally, not online | n/a offline | Hours |
| 2 | UPI ID or QR sent in a chat | ₹0 | Today | Instant, final | **None** — a UPI push cannot be reversed | Universal between people who know each other | **High** for a stranger | Hours |
| 3 | UPI ID + QR **on her website** | ₹0 | Today | Instant, final | None, but she is identifiable | Fairly common | Medium | Hours |
| 4 | Payment link sent per student | ~₹1,060, or ₹0 on an intro offer | Days | Escrow at an RBI-licensed aggregator | Real: disputes, refunds | Very common — for **bills**, not first purchases | **High** — the warned-about pattern | Minutes |
| 5 | **Her button → branded payment page** | ~₹1,060, or ₹0 on an intro offer | Days | Same | Same | **The norm for buying online** | **Low** | Minutes |
| 6 | Gateway button embedded in her page | Same | Days + half a day of my work | Same | Same | The norm | Low — same as 5 | Minutes |
| 7 | Custom checkout on our own server | Same, plus hosting | Weeks | Same | Same | The norm for large brands | Lowest | Minutes |
| 8 | Auto-debit (UPI AutoPay / e-mandate) | Same, plus mandate costs | Weeks | Same | Strong on paper | Normal for Netflix, SIPs, insurance | **Highest** — permission before any result | None, when it works |
| 9 | All-in-one coaching platform | Their fee **plus** the gateway cut | Days | Held by the platform | Whatever the platform allows | Common among Indian coaches | Low — but it is their brand | Minutes |
| 10 | A marketplace | A large cut of every fee | Days | Held by them | Theirs | Common | Low | None |

Short verdicts: **5 is the answer.** 3 stays, free, for people who already know her. 4 only for
someone who explicitly asks. 6 is not an upgrade over 5 — section 3a explains why. 8 when chasing
payments costs her an evening a month. 9 if she wants scheduling and reminders more than she wants
her own site. 1, 2, 7 and 10 are no.

## 3a. Options 5 and 6, since they look like the same thing

They are not, and the difference is smaller and in the opposite direction to what I first wrote.

**A payment page (5)** is a page the gateway hosts and she builds in their dashboard by dragging
things around — her logo, her colours, a description, her batches, an amount. It gets a URL of its
own. By default that is `pages.razorpay.com/yogvandana`; Razorpay also has **domain linking**, an
on-request beta, which puts the same page at `pay.yogvandana.com` or `yogvandana.com/fees`, so the
student never sees a stranger's domain at all. On her site, the thing that links to it is **an
ordinary link of ours** — `<a class="btn btn-primary">फ़ीस भरें</a>` — in her type, her saffron, her
corner radius. Nothing of theirs runs on her site.

**A payment button (6)** is a snippet from their dashboard that renders **their button** inside her
page. It loads their script, which draws a button we do not control, and when it is clicked the
student is **redirected to the gateway anyway** — their documentation says so in as many words.

So the honest comparison:

| | 5 · payment page | 6 · embedded button |
|---|---|---|
| What sits on her page | Our own link, styled by us | Their button, styled by them |
| Extra code on her page | **None** | **184 KB of third-party JavaScript** (56 KB compressed), measured |
| Where the student pays | The gateway's page | The gateway's page — the same place |
| Whose domain they land on | Hers, with domain linking | Theirs |
| What can break | A URL that is wrong | A script that is blocked, slow, or changed under us |
| My work | Paste a URL into a content file | A snippet per batch, plus arguing with their styles |
| Effect on the site's speed | Nothing | A third more weight on every page that carries one |

**5 wins on every line.** The one advantage 6 seemed to have — not sending the student away — does
not exist. The only way to genuinely keep the payment inside her page is option 7, the full
integration, and that needs a server this site does not have. That is the real trade, and it is not
worth making for thirty students.

One consequence worth stating: **with 5, nothing of the gateway's runs on her website.** No
third-party script, no tracking, no dependency, no weight. The site stays the 486 KB it is now.

## 3. Why not a payment link on WhatsApp

**The destination earns trust. The delivery destroys it.** A gateway page showing her registered
business name and an amount is reassuring. An unsolicited `rzp.io/i/AbC123` arriving in a chat is
the exact pattern every cautious Indian has been told to distrust — it is opaque, it tells you
nothing before you tap, and the standing advice from every bank in the country is a version of
"treat a payment request that arrives as a link or a QR from someone you were not expecting as
suspicious, however official it looks."

Payment links are genuinely common in India — for **collection**. Insurance renewals, loan EMIs,
hospital bills, an Instagram seller invoicing a customer who already agreed to buy. They are not how
somebody buys a service for the first time. For that, what people know is a Pay button on a website.

So the payment URL lives behind a button on her site and never travels on its own:

- **A new student** talks to her on WhatsApp; she sends *the website* link, and they tap the button.
- **An existing student** gets the students-page link in the group and taps फ़ीस भरें.
- **Someone who already knows her** scans the UPI QR.

## 4. Security, on both sides

**For her.**

- With options 4 to 8 the money sits in an **escrow account at a scheduled commercial bank**, which
  the RBI has required of authorised payment aggregators since 2020. It is not in the gateway's own
  account, and it is not exposed to their business. Razorpay, Cashfree, PhonePe, Paytm, PayU and
  Pine Labs all hold RBI payment-aggregator authorisation — check the RBI's own list before signing,
  and do not use anyone who is not on it.
- With options 1 to 3 the money is hers the instant it lands, which is the advantage, and there is
  **no dispute machinery at all**, which is the risk: the well-known Indian scam here is the **fake
  payment screenshot** — a student shows a doctored "₹1,500 sent" and joins the batch. If she takes
  UPI directly she must check her own bank app, never a screenshot.
- Cards bring **chargebacks**: a student can dispute a payment months later and the gateway will
  claw it back. UPI cannot be reversed this way. Her refund page is what she will be judged against.
- Her real exposure is not fraud, it is **reconciliation** — knowing which of two Sunitas paid.

**For the student.**

- The single rule that protects them, and it is worth her repeating it in the WhatsApp group: **you
  never enter a UPI PIN to receive money.** A PIN is only ever for sending. Every "approve this
  collect request to get your refund" and "scan this QR to receive cashback" scam depends on people
  not knowing this.
- Paying a stranger's personal UPI ID gives them **no recourse whatsoever**. Paying through a
  gateway gives them a company that is regulated, a receipt with a registered business name, and a
  dispute process. That difference is the reason to pay 2% — not the convenience.
- She should never ask for a UPI PIN, an OTP, or card details, on any channel, for any reason. If
  she needs to say that once in the group, it costs nothing and buys a lot.

## 5. What it actually costs, by provider

Advertised rates as of September 2026. All of them are negotiable, all of them change, and the
UPI line is the one that matters because that is how most of her students will pay.

| Provider | UPI | Cards / netbanking | Notable |
|---|---|---|---|
| **Cashfree** | 1.95% | 1.95% | **0% up to ₹20 lakh of takings** for new merchants signing up 21 Jul 2026 – 31 Mar 2027. Has the same no-code hosted pages, under "Payment Forms" |
| **Razorpay** | **2% platform fee** — zero MDR does not mean zero cost | 2% | 0% for 90 days or ₹5 lakh for merchants activating after 1 Jul 2026. Best no-code tools |
| **PhonePe** | Advertised 0% on UPI | 1.99% standard | Largest UPI app in the country, ~46% share |
| **Paytm** | Advertised 0% standard on UPI | ~2% | Interchange may apply on wallet-funded UPI over ₹2,000 |

Add **18% GST on the fee itself**, so a 2% rate is 2.36% in practice — about **₹1,060 a month** on
₹45,000. Nobody charges setup or annual fees at her size; if a provider asks for one, walk.

**Zero MDR is not going away for her.** A bill under discussion in 2026 would let merchant fees
return on UPI, but only for businesses above roughly ₹1–1.5 crore of annual turnover and only on
payments over ₹2,000. Consumers and small merchants stay at zero. She is nowhere near that line.

**Settlement** is T+1 to T+3 depending on provider and plan. Tell her before the first payment, or
the first Monday is a phone call.

## 6. The domain is part of the payment decision

`agoshbaranwal.github.io/yogvandana/` undercuts exactly the trust this design is buying. Somebody
already nervous about paying a stranger online, handed off from a URL with another person's name in
it, is somebody who does not pay. **Get the domain before the first rupee.**

## 7. What she needs to open the account

Keep this list to hand; it is where the week goes.

- **PAN card** (hers, or the business's)
- **Bank account** in the same name, plus a cancelled cheque or a statement page
- **Aadhaar / address proof**
- **Business proof** — for a sole proprietor, usually a **Udyam registration** (free, online, ten
  minutes), or a GST certificate, or a shop-and-establishment licence
- **A website with four pages on it**: terms, refund policy, privacy policy, and contact details
  with a real address and phone number

That last one is not a formality. Gateways reject applications over it every day, and it is why this
site already has `/terms/`, `/refund/`, `/privacy/` and `/sampark/`. They are marked as drafts
pending her reading them — she needs to actually read them before you apply, because the refund page
is the one the gateway will hold you to.

## 8. Monthly fees: the part that will bite

She is selling a **monthly** class, and the obvious wish is auto-debit. What it involves under the
RBI's 2026 e-mandate framework:

- The student registers a mandate once, with authentication. Debits up to **₹15,000** then go
  through without an OTP each month; a higher ₹1 lakh ceiling exists for categories like insurance
  and mutual funds, which is not her.
- A **pre-debit notification at least 24 hours before every charge** is mandatory.
- Mandates fail silently — a closed card, a changed bank — and you find out a month later.

For thirty students this is more machinery than it is worth, and it asks a stranger for standing
permission to take money before she has taught them anything. **Post the students-page link in the
WhatsApp group on the first.** Move to mandates when chasing payments actually costs her an evening.

## 9. Tax

Two things to settle with a CA before the first rupee, not after:

- **GST registration** becomes compulsory for a service provider above a turnover threshold —
  ₹20 lakh in most states, ₹10 lakh in the special-category ones. Below it, she need not register.
- Whether her teaching is **exempt** is genuinely not obvious. Yoga taught by an entity registered
  under section 12AA as a charitable activity is exempt; an individual selling classes usually is
  not. Do not guess this from a website — hers or mine.

Also: keep the money in a **separate bank account** from her personal one from day one. Every
accountant says the same thing; it costs nothing now and a weekend later.

## 10. Things to keep in mind

**This repository is public.** A gateway account has a `key_id` (public, safe in a page) and a
`key_secret` (never, under any circumstances, in the repo — it is the key that signs payments). If a
secret is ever committed, rotating it in the dashboard is the fix; deleting the commit is not,
because the history is public. Nothing in the recommended setup needs a secret at all.

**Test mode first.** Take one full payment in test mode, refund it in test mode, and watch both
appear in the dashboard, before a real student sees a button.

**The refund page is a promise.** Whatever it says is what the gateway enforces when a student
disputes a charge. Write what she will actually honour, not what sounds generous.

**Never take money before the conversation.** The site says the talk is free and the classes are
paid; the payment button belongs *after* she has spoken to someone. That is kinder, and it is what
keeps the chargeback rate at zero.

**Reconciliation is the real work.** The dashboard says a payment arrived, not which Sunita sent it.
Put the student's name and batch in the payment description every time.

**Never trust a screenshot.** If she ever takes UPI directly, the payment is confirmed by her own
bank app and nothing else.

**Do not store card details.** Not in a spreadsheet, not in WhatsApp, not once. Tokenisation is the
gateway's job.

## 11. What to do, in order

1. **Buy the domain.** Nothing else here is worth doing from a github.io address.
2. Check whether **Cashfree's 0%-to-₹20-lakh offer** is still open. If it is, that is the provider;
   if it has closed, compare Razorpay's tooling against PhonePe's UPI rate.
3. Get her **Udyam registration** (free, online) if she has no GST certificate.
4. Open the account with the documents in section 7.
5. Have her **read the terms, refund and privacy pages** and tell you what to change.
6. Build a **payment page** in the dashboard with her batches on it, ask support to enable
   **domain linking** so it sits on her own domain, and paste its URL into `joinLink` in
   `content/batches/<id>.json` and into `feeLink` for the students' page.
7. Take **one real ₹1 payment** yourself, end to end, and refund it.
8. Only then tell her the buttons are live.

Nothing in steps 1 to 8 needs a line of code from me. Step 6 is a ten-minute content edit, and
`CONTENT-GUIDE.md` explains it well enough that you can do it without me.

---

## Sources

Checked 3 September 2026. Rates and rules move; re-check before acting.

- UPI's share of digital payments and app market share — [RBI, via DD News](https://ddnews.gov.in/en/upis-share-in-indias-digital-payments-surged-to-83-rbi-report/), [DemandSage](https://www.demandsage.com/upi-statistics/)
- Zero MDR today, and the bill that would change it for large merchants — [Forbes India](https://www.forbesindia.com/article/news/what-is-merchant-discount-rate-on-upi-and-why-does-india-want-to-bring-it-back/2996894/1), [MediaNama](https://www.medianama.com/2026/03/223-parliamentary-committee-calls-return-mdr-upi-implications-users-small-merchants/)
- Razorpay charges a platform fee on UPI despite zero MDR — [Razorpay's own explainer](https://razorpay.com/learn/upi-transaction-charges/), [Razorpay pricing](https://razorpay.com/blog/razorpay-payment-gateway-pricing-explained/)
- Cashfree's rates and the ₹20 lakh offer — [Cashfree pricing FAQs](https://www.cashfree.com/docs/help/account/pricing)
- PhonePe gateway pricing — [PhonePe for Business](https://www.phonepe.com/business-solutions/payment-gateway/pricing/)
- Payment links vs pages vs buttons — [Razorpay](https://razorpay.com/blog/payment-links-vs-checkout-pages-vs-storefronts/)
- The embedded button redirects rather than staying on the page — [Razorpay docs](https://razorpay.com/docs/payments/payment-button/how-it-works/)
- Payment page URLs and domain linking — [Razorpay docs](https://razorpay.com/docs/payments/payment-pages/domain-linking/?preferred-country=IN)
- Cashfree's no-code hosted forms and pages — [Cashfree docs](https://www.cashfree.com/docs/payments/no-code/payment-forms)
- Checkout script weight — measured directly from `checkout.razorpay.com/v1/checkout.js`, 3 Sep 2026
- Escrow requirement and aggregator authorisation — [Business Standard](https://www.business-standard.com/companies/news/razorpay-cashfree-receive-final-rbi-nod-for-payment-aggregator-biz-123121901296_1.html), [India Briefing](https://www.india-briefing.com/news/indias-central-bank-grants-in-principle-license-to-50-payment-aggregators-key-details-27239.html/)
- Collect-request, QR and fake-screenshot scams, and the "PIN is only for sending" rule — [PhonePe for Business](https://business.phonepe.com/articles/fake-upi-payment-scams-how-to-identify-and-prevent-fraud), [Ujjivan SFB](https://www.ujjivansfb.bank.in/banking-blogs/personal-finance/common-upi-scams-in-india-and-how-to-avoid-them)
- E-mandate framework 2026, ₹15,000 without OTP, 24-hour pre-debit notice — [Outlook Business](https://www.outlookbusiness.com/ampstories/news/rbi-e-mandate-framework-2026-new-rules-for-auto-pay-upi-cards-wallets), [Razorpay](https://razorpay.com/blog/master-recurring-payments-upi-autopay-guide/)
