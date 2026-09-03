import type { Lang } from "./routes";

/* Every WhatsApp link on the site carries a message that is already written,
   naming the page the visitor came from and, where the page has one, the
   ailment. She then knows why they are writing before she says hello. */

export type MsgKind = "talk" | "batch" | "private" | "workshop" | "general" | "students";

export function waMessage(opts: {
  lang: Lang;
  kind: MsgKind;
  ailment?: string;
  time?: string;
  batch?: string;
  page?: string;
}): string {
  const { lang, kind, ailment, time, batch, page } = opts;
  const hi = lang === "hi";
  const parts: string[] = [];

  parts.push(hi ? "नमस्ते वंदना जी," : "Hello Vandana ji,");

  if (ailment) {
    parts.push(hi ? `मुझे ${ailment} है।` : `I have ${ailment}.`);
  }

  if (kind === "talk") {
    const when = time ? (hi ? `${time} के बैच` : `the ${time} batch`) : hi ? "क्लास" : "your classes";
    parts.push(
      hi
        ? `${when} के बारे में बात करनी है।`
        : `I would like to talk about ${when}.`,
    );
  } else if (kind === "batch") {
    parts.push(
      hi
        ? `मैं ${batch ?? "बैच"} में जुड़ना चाहता/चाहती हूँ।`
        : `I would like to join the ${batch ?? "batch"}.`,
    );
  } else if (kind === "private") {
    parts.push(
      hi
        ? "व्यक्तिगत सेशन के लिए समय तय करना है।"
        : "I would like to fix a time for a private session.",
    );
  } else if (kind === "workshop") {
    parts.push(
      hi
        ? `${batch ?? "कार्यशाला"} में सीट बुक करनी है।`
        : `I would like a seat in ${batch ?? "the workshop"}.`,
    );
  } else if (kind === "students") {
    parts.push(hi ? "मैं आपके बैच में हूँ।" : "I am in one of your batches.");
  } else {
    parts.push(hi ? "मुझे जानकारी चाहिए।" : "I would like to know more.");
  }

  if (page) parts.push(hi ? `(पन्ना: ${page})` : `(page: ${page})`);
  return parts.filter(Boolean).join(" ");
}

/** wa.me needs a plain number: no plus, no spaces. */
export function waHref(number: string, message: string): string {
  const digits = (number || "").replace(/[^\d]/g, "");
  const text = encodeURIComponent(message);
  return digits ? `https://wa.me/${digits}?text=${text}` : `https://wa.me/?text=${text}`;
}

/** Forward a page or a story to family, the way this audience actually shares. */
export function shareHref(title: string, url: string): string {
  return `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`;
}

export function telHref(phone: string): string {
  const digits = (phone || "").replace(/[^\d+]/g, "");
  return `tel:${digits}`;
}
