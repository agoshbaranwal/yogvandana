import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import type { Lang } from "./routes";

/* ---------------------------------------------------------------------------
   Content lives in /content as small JSON files, one per item. Every piece of
   text is an object with a Hindi and an English side, so the two languages can
   never drift apart. Everything here runs at build time.
--------------------------------------------------------------------------- */

const ROOT = path.join(process.cwd(), "content");

const Text = z.object({ hi: z.string(), en: z.string() });
export type Text = z.infer<typeof Text>;

export function t(text: Text | undefined, lang: Lang): string {
  if (!text) return "";
  return text[lang] ?? "";
}

/** Items whose label is still a bracketed blank collapse to one example and a
 *  count. Five identical "[प्रमाणपत्र]" rows read as a broken page; one row and
 *  "and 4 more once she sends them" reads as work in progress. Anything real
 *  always shows, in its own order, and the moment she fills these in they all
 *  come back on their own. */
export function pending<T>(
  items: T[],
  label: (item: T) => string,
): { shown: T[]; hidden: number } {
  /* Only rows that are indistinguishable collapse: the same blank label twice
     or more. A row with real words keeps its place even if a date inside it is
     still a blank, because it is telling the reader something. */
  const counts = new Map<string, number>();
  for (const i of items) {
    const l = label(i);
    counts.set(l, (counts.get(l) ?? 0) + 1);
  }
  const repeated = new Set(
    [...counts].filter(([l, n]) => n > 1 && isTodo(l)).map(([l]) => l),
  );
  if (repeated.size === 0) return { shown: items, hidden: 0 };
  const kept = new Set<string>();
  const shown = items.filter((i) => {
    const l = label(i);
    if (!repeated.has(l)) return true;
    if (kept.has(l)) return false;
    kept.add(l);
    return true;
  });
  return { shown, hidden: items.length - shown.length };
}

/** A value that is still to be filled in reads as "[...]". */
export function isTodo(value: string): boolean {
  return /\[[^\]]+\]/.test(value);
}

function readJson(file: string): unknown {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function one<T>(schema: z.ZodType<T>, rel: string): T {
  const file = path.join(ROOT, rel);
  const parsed = schema.safeParse(readJson(file));
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    throw new Error(
      `content/${rel}: ${issue.path.join(".") || "(root)"} — ${issue.message}`,
    );
  }
  return parsed.data;
}

function many<T>(schema: z.ZodType<T>, dir: string): T[] {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => {
      const parsed = schema.safeParse(readJson(path.join(full, f)));
      if (!parsed.success) {
        const issue = parsed.error.issues[0];
        throw new Error(
          `content/${dir}/${f}: ${issue.path.join(".") || "(root)"} — ${issue.message}`,
        );
      }
      return parsed.data;
    });
}

/* ------------------------------- site ----------------------------------- */

const NumberStat = z.object({
  value: z.string(),
  label: Text,
  short: Text,
  basis: Text,
});

/* A payment URL is the one field on this site where a typo costs money. It must
   be empty, or https, and on a payment company's own domain — not http, not a
   shortener, not a link somebody pasted out of a chat. The build fails
   otherwise, which is the point. */
const PAY_HOSTS = [
  "razorpay.com",
  "rzp.io",
  "cashfree.com",
  "cf-pg.com",
  "payments.cashfree.com",
  "phonepe.com",
  "paytm.in",
  "paytm.com",
  "instamojo.com",
  "payu.in",
];

export function payHostOk(url: string): boolean {
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") return false;
    return PAY_HOSTS.some((h) => u.hostname === h || u.hostname.endsWith(`.${h}`)) || u.hostname === PAY_OWN_HOST;
  } catch {
    return false;
  }
}

/* Razorpay's domain linking can put the payment page on her own domain, which
   is the point of doing this at all, so her host is allowed too. */
const PAY_OWN_HOST = process.env.NEXT_PUBLIC_PAY_HOST ?? "pay.yogvandana.com";

const payUrl = z
  .string()
  .refine((v) => v === "" || payHostOk(v), {
    message:
      "a payment URL must be https and on a payment provider's domain (or her own pay. subdomain)",
  });

const SiteSchema = z.object({
  url: z.string(),
  live: z.boolean(),
  brand: Text,
  teacher: Text,
  credential: Text,
  /* The body that certified her, named: "certified" with no body is a claim. */
  certifyingBody: Text,
  university: Text,
  credentialShort: Text,
  city: Text,
  motto: z.string(),
  mottoGloss: Text,
  /* the about page's two paragraphs: what the name means, and her own words */
  about: z.object({ intro: Text, words: Text }),
  claim: Text,
  sinceYear: Text,
  morningTime: Text,
  eveningTime: Text,
  /* A class is [50] minutes; what she writes on the slip for home is [30]. */
  classMinutes: z.string(),
  homeMinutes: z.string(),
  talkMinutes: z.string(),
  /* The conversation that produces the slip. An empty price means it costs
     nothing, which is what the site says today; put a number in and every
     page says the price instead. */
  consultation: z.object({ price: z.string(), minutes: z.string() }),
  groupSize: z.string(),
  reviewDays: z.string(),
  missedClass: Text,
  numbers: z.array(NumberStat),
  google: z.object({ rating: z.string(), reviews: z.string(), url: z.string() }),
  whatsappGroupCount: z.string(),
  contact: z.object({
    whatsapp: z.string(),
    phone: z.string(),
    phoneDisplay: z.string(),
    email: z.string(),
    replyHours: Text,
    address: Text,
    businessName: Text,
  }),
  socials: z.object({ instagram: z.string(), youtube: z.string(), facebook: z.string() }),
  /* Her photographs, as media keys; empty until they exist, and every slot
     then draws a plain frame rather than a stock picture. */
  photos: z.object({ portrait: z.string(), teaching: z.string(), signature: z.string() }),
  links: z.object({
    formEndpoint: z.string(),
    cal: z.string(),
    introVideo: z.string(),
    profilePdf: z.string(),
    /* The one hosted payment page every "join" and "pay the fee" button opens.
       Empty until she has an account, and every button falls back to WhatsApp
       until then. A batch can override it with its own joinLink. */
    paymentPage: payUrl,
  }),
  /* the id of the certificate the certifying body issued: shown large on the about page */
  primaryCredential: z.string(),
  analyticsId: z.string(),
  searchConsole: z.string(),
  updated: z.string(),
});
export type Site = z.infer<typeof SiteSchema>;
export const site: Site = one(SiteSchema, "site.json");

/* A phone number still in brackets is not a number: no tel: link is made
   from it, and the buttons say "[phone number]" in the reader's language. */
export const PHONE: string =
  site.contact.phone && !isTodo(site.contact.phone) ? site.contact.phone : "";
export function phoneShown(lang: Lang): string {
  if (!PHONE) return ui("contact.phoneTodo", lang);
  const shown = site.contact.phoneDisplay;
  return shown && !isTodo(shown) ? shown : PHONE;
}

/* ------------------------------- ui ------------------------------------- */

type UiTree = { [k: string]: Text | UiTree };
const uiRaw = readJson(path.join(ROOT, "ui.json")) as UiTree;

/** ui("cta.talk", lang) — a missing key throws at build, never at run time. */
export function ui(key: string, lang: Lang): string {
  const value = key.split(".").reduce<unknown>((node, part) => {
    if (node && typeof node === "object" && part in (node as object)) {
      return (node as Record<string, unknown>)[part];
    }
    return undefined;
  }, uiRaw);
  const parsed = Text.safeParse(value);
  if (!parsed.success) throw new Error(`content/ui.json: missing string "${key}"`);
  return parsed.data[lang];
}
export const uiTree = uiRaw;

/* ------------------------------ ailments -------------------------------- */

export const FAMILIES = ["joint", "metabolic", "mind", "women"] as const;
export type Family = (typeof FAMILIES)[number];

const AilmentSchema = z.object({
  slug: z.string(),
  order: z.number(),
  family: z.enum(FAMILIES),
  icon: z.string(),
  name: Text,
  sub: Text,
  titleFull: Text,
  claimLine: Text,
  intro: Text,
  /* The three things the practice works on for this disease, one line each. */
  works: z.array(Text).length(3),
  /* What happens to the doctor's medicine, in this disease's own terms. */
  medicine: Text,
  studentCount: z.string(),
  storyCount: z.string(),
  videoCount: z.string(),
  searchTerms: Text,
  metaDescription: Text,
  /* The first class is a paid class: [10] + [30] + [10] minutes. The talk
     before it is what costs nothing. */
  firstClass: z.object({
    rows: z.array(z.object({ minutes: z.string(), text: Text })),
    note: Text,
  }),
  classNotes: z.array(Text),
  faq: z.array(z.object({ q: Text, a: Text })),
  batchNote: Text,
  /* Which batch she would put this disease in, and why; "" means either. */
  bestBatch: z.enum(["morning", "evening", ""]),
  bestBatchWhy: Text,
});
export type Ailment = z.infer<typeof AilmentSchema>;
export const ailments: Ailment[] = many(AilmentSchema, "ailments").sort(
  (a, b) => a.order - b.order,
);
export const ailmentBySlug = (slug: string): Ailment | undefined =>
  ailments.find((a) => a.slug === slug);

/* ------------------------------ batches --------------------------------- */

const BatchSchema = z.object({
  id: z.string(),
  type: z.enum(["group", "private", "workshop"]),
  order: z.number(),
  name: Text,
  when: Text,
  /* The clock time and the length, kept apart so the timetable can draw them. */
  start: Text,
  minutes: z.string(),
  days: Text,
  /* 0 = Monday … 6 = Sunday. Empty until she confirms; the timetable then
     shows seven blank days rather than inventing a week. */
  daysOn: z.array(z.number().int().min(0).max(6)),
  level: Text,
  note: Text,
  /* one class, in minutes: [10] + [30] + [10]; drawn as a bar on the batches page */
  session: z.array(z.object({ minutes: z.string(), text: Text })),
  price: z.string(),
  priceUnit: Text,
  perDay: z.string(),
  nextStart: Text,
  seats: z.string(),
  date: Text,
  joinLink: payUrl,
  feeLink: payUrl,
  familyDiscount: Text,
  firstMonthOffer: Text,
  refundLine: Text,
  payLine: Text,
});
export type Batch = z.infer<typeof BatchSchema>;
export const batches: Batch[] = many(BatchSchema, "batches").sort(
  (a, b) => a.order - b.order,
);
export const groupBatches = batches.filter((b) => b.type === "group");

/* ------------------------------ stories --------------------------------- */

const StorySchema = z.object({
  id: z.string(),
  order: z.number(),
  name: Text,
  city: Text,
  age: z.string(),
  ailmentSlug: z.string(),
  quote: Text,
  /* The result, in the report's own terms: the metric ("HbA1c", "बीपी", or
     none), the before and after, what happened to the medicine, and over how
     many months. before/after alone still read as a plain then-and-now. */
  metric: Text,
  before: Text,
  after: Text,
  change: Text,
  months: z.string(),
  since: Text,
  written: Text,
  photo: z.string(),
  video: z.string(),
  consent: z.boolean(),
});
export type Story = z.infer<typeof StorySchema>;
export const stories: Story[] = many(StorySchema, "stories")
  .filter((s) => s.consent)
  .sort((a, b) => a.order - b.order);
/** A story with nothing real in it is not proof of anything. Three cards of
 *  grey blanks — a blank name, a blank city, a blank quote — say less than one
 *  sentence saying the stories are coming, and they look like a broken page.
 *  A card earns its place once it carries either the student's own words or a
 *  real before and after. They all come back the moment she sends them. */
export function storyHasSubstance(s: Story): boolean {
  const real = (v: Text) => v.hi.trim() !== "" && !isTodo(v.hi);
  return real(s.quote) || (real(s.before) && real(s.after));
}
export const realStories: Story[] = stories.filter(storyHasSubstance);

export const storiesFor = (slug: string): Story[] =>
  realStories.filter((s) => s.ailmentSlug === slug);

/* ------------------------ her record: about pages ------------------------ */

const JourneySchema = z.object({
  id: z.string(),
  order: z.number(),
  year: z.string(),
  text: Text,
  photo: z.string(),
  photoAlt: Text,
});
export type Journey = z.infer<typeof JourneySchema>;
export const journey: Journey[] = many(JourneySchema, "journey").sort(
  (a, b) => a.order - b.order,
);

const CredentialSchema = z.object({
  id: z.string(),
  order: z.number(),
  name: Text,
  body: Text,
  year: z.string(),
  /* the certificate number as printed; "" until she reads it off the paper */
  number: z.string(),
  hours: Text,
  image: z.string(),
  verifyUrl: z.string(),
  verifyLabel: Text,
});
export type Credential = z.infer<typeof CredentialSchema>;
export const credentials: Credential[] = many(CredentialSchema, "credentials").sort(
  (a, b) => a.order - b.order,
);

const ExperienceSchema = z.object({
  id: z.string(),
  order: z.number(),
  institution: Text,
  role: Text,
  years: z.string(),
});
export const experience = many(ExperienceSchema, "experience").sort(
  (a, b) => a.order - b.order,
);

const MembershipSchema = z.object({
  id: z.string(),
  order: z.number(),
  body: Text,
  since: z.string(),
  url: z.string(),
});
export const memberships = many(MembershipSchema, "memberships").sort(
  (a, b) => a.order - b.order,
);

const AwardSchema = z.object({
  id: z.string(),
  order: z.number(),
  name: Text,
  body: Text,
  place: Text,
  year: z.string(),
  forWhat: Text,
  photo: z.string(),
});
export type Award = z.infer<typeof AwardSchema>;
export const awards: Award[] = many(AwardSchema, "awards").sort(
  (a, b) => a.order - b.order,
);

export const EVENT_TYPES = [
  "guest-of-honour",
  "shivir",
  "workshop",
  "yoga-day",
  "press",
] as const;
const EventSchema = z.object({
  id: z.string(),
  order: z.number(),
  type: z.enum(EVENT_TYPES),
  typeLabel: Text,
  title: Text,
  organiser: Text,
  place: Text,
  date: Text,
  photo: z.string(),
  link: z.string(),
});
export type Ev = z.infer<typeof EventSchema>;
export const events: Ev[] = many(EventSchema, "events").sort((a, b) => a.order - b.order);

const MediaSchema = z.object({
  id: z.string(),
  order: z.number(),
  kind: z.enum(["logo", "clipping"]),
  name: Text,
  date: Text,
  image: z.string(),
  link: z.string(),
});
export type Media = z.infer<typeof MediaSchema>;
export const media: Media[] = many(MediaSchema, "media").sort((a, b) => a.order - b.order);
export const mediaLogos = media.filter((m) => m.kind === "logo");
export const mediaClippings = media.filter((m) => m.kind === "clipping");

const GuruSchema = z.object({
  id: z.string(),
  order: z.number(),
  name: Text,
  where: Text,
  years: z.string(),
  photo: z.string(),
});
export const gurus = many(GuruSchema, "gurus").sort((a, b) => a.order - b.order);

export const GALLERY_THEMES = ["class", "shivir", "stage", "certificate", "media"] as const;
const GallerySchema = z.object({
  id: z.string(),
  order: z.number(),
  theme: z.enum(GALLERY_THEMES),
  image: z.string(),
  caption: Text,
  place: Text,
  date: Text,
  alt: Text,
});
export type GalleryItem = z.infer<typeof GallerySchema>;
export const gallery: GalleryItem[] = many(GallerySchema, "gallery").sort(
  (a, b) => a.order - b.order,
);

/* ------------------------- routine, faq, students ------------------------ */

const RoutineSchema = z.object({
  note: Text,
  rows: z.array(z.object({ time: Text, text: Text, strong: Text, highlight: z.boolean() })),
});
export const routine = one(RoutineSchema, "routine.json");

const FaqSchema = z.object({ items: z.array(z.object({ q: Text, a: Text })) });
export const faq = one(FaqSchema, "faq.json").items;

const StudentsSchema = z.object({
  holidays: z.array(z.object({ when: Text, what: Text })),
  rules: z.array(Text),
  linkNote: Text,
  slipNote: Text,
  payNote: Text,
});
export const students = one(StudentsSchema, "students.json");

/* ----------------------------- helpers ---------------------------------- */

export const familyOf = (slug: string): Family =>
  (ailmentBySlug(slug)?.family ?? "metabolic") as Family;

export const FAMILY_COLOUR: Record<Family, { ink: string; tint: string }> = {
  joint: { ink: "#B0304B", tint: "#F8E4E8" },
  metabolic: { ink: "#1A6FA8", tint: "#E4F0F9" },
  mind: { ink: "#5B2A6E", tint: "#EEE3F2" },
  women: { ink: "#D22A65", tint: "#FBE3EB" },
};

/** Absolute URL for metadata, including the sub-folder a project site lives in. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const SITE_ORIGIN = site.url.replace(/\/$/, "");
export const absolute = (p: string) => `${SITE_ORIGIN}${BASE_PATH}${p}`;
/** Prefix for anything in /public that is not handled by next/link. */
export const asset = (p: string) => `${BASE_PATH}${p}`;
