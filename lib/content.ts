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

const SiteSchema = z.object({
  url: z.string(),
  live: z.boolean(),
  brand: Text,
  teacher: Text,
  credential: Text,
  credentialShort: Text,
  city: Text,
  motto: z.string(),
  mottoGloss: Text,
  claim: Text,
  sinceYear: Text,
  morningTime: Text,
  eveningTime: Text,
  classMinutes: z.string(),
  talkMinutes: z.string(),
  groupSize: z.string(),
  reviewDays: z.string(),
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
  links: z.object({
    formEndpoint: z.string(),
    cal: z.string(),
    introVideo: z.string(),
    profilePdf: z.string(),
  }),
  analyticsId: z.string(),
  searchConsole: z.string(),
  updated: z.string(),
});
export type Site = z.infer<typeof SiteSchema>;
export const site: Site = one(SiteSchema, "site.json");

/* ------------------------------- ui ------------------------------------- */

type UiTree = { [k: string]: Text | UiTree };
const uiRaw = readJson(path.join(ROOT, "ui.json")) as UiTree;

/** ui("cta.trial", lang) — a missing key throws at build, never at run time. */
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
  studentCount: z.string(),
  storyCount: z.string(),
  videoCount: z.string(),
  searchTerms: Text,
  metaDescription: Text,
  slip: z.object({
    practice: Text,
    time: Text,
    batch: Text,
    alongside: Text,
    review: Text,
  }),
  firstClass: z.array(z.object({ strong: Text, rest: Text })),
  classNotes: z.array(Text),
  faq: z.array(z.object({ q: Text, a: Text })),
  batchNote: Text,
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
  days: Text,
  level: Text,
  note: Text,
  session: z.array(Text),
  price: z.string(),
  priceUnit: Text,
  perDay: z.string(),
  nextStart: Text,
  seats: z.string(),
  date: Text,
  joinLink: z.string(),
  feeLink: z.string(),
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
  before: Text,
  after: Text,
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
export const storiesFor = (slug: string): Story[] =>
  stories.filter((s) => s.ailmentSlug === slug);

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
  women: { ink: "#D6336C", tint: "#FBE3EB" },
};

/** Absolute URL for metadata, including the sub-folder a project site lives in. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const SITE_ORIGIN = site.url.replace(/\/$/, "");
export const absolute = (p: string) => `${SITE_ORIGIN}${BASE_PATH}${p}`;
/** Prefix for anything in /public that is not handled by next/link. */
export const asset = (p: string) => `${BASE_PATH}${p}`;
