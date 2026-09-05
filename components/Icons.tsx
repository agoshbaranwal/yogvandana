import type { SVGProps } from "react";

/* One drawing per condition, all on the same 48px grid, all stroke-only at the
   same weight, so a row of them reads as one set and each still recolours with
   its family.

   These were redrawn on 3 September 2026. The first set were shapes that
   suggested the idea to whoever drew them and to nobody else: the knee was an
   assembly of lines, the thyroid had a stroke running the whole height of the
   figure, and the spine was a squiggle with three pills beside it. Each one
   here is built from the thing itself. */

type P = SVGProps<SVGSVGElement> & { size?: number };

function S({ size = 28, children, ...rest }: P) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const AILMENT_ICONS: Record<string, (p: P) => React.ReactElement> = {
  /* कमर दर्द — five vertebrae down a lumbar curve, each with its process */
  spine: (p) => (
    <S {...p}>
      <path d="M25.5 5.5c-2.6 3.4-3.4 7.2-2.4 11.4 1 4.2.8 8-.6 11.4-1.2 3-1.3 6.2-.3 9.6l1.3 4.6" />
      <path d="M20.6 11.2h8.6" />
      <path d="M20.2 18.6h9" />
      <path d="M19.6 26h9" />
      <path d="M19.8 33.4h8.8" />
    </S>
  ),
  /* घुटने का दर्द — thigh bone, kneecap, shin, foot */
  knee: (p) => (
    <S {...p}>
      <path d="M16.5 5v10.6c0 3 .9 5.3 3 7" />
      <circle cx="24.5" cy="24.5" r="5.5" />
      <path d="M28.6 28.6c1.6 1.8 2.4 3.8 2.4 6V43" />
      <path d="M26.5 43h10" />
    </S>
  ),
  /* शुगर — a blood drop, with the light on its shoulder */
  sugar: (p) => (
    <S {...p}>
      <path d="M24 5.5c0 0-12.5 13.7-12.5 21.8A12.5 12.5 0 0 0 36.5 27.3C36.5 19.2 24 5.5 24 5.5z" />
      <path d="M17.6 28.2a6.4 6.4 0 0 0 6.4 6.4" />
    </S>
  ),
  /* बीपी — the heart, and the reading it gives, side by side not on top */
  heart: (p) => (
    <S {...p}>
      <path d="M24 30.5s-11.5-7.4-11.5-14.2A5.8 5.8 0 0 1 24 13.4a5.8 5.8 0 0 1 11.5 2.9C35.5 23.1 24 30.5 24 30.5z" />
      <path d="M7 38.5h7.5l2.6-5 4.4 10 2.8-5H41" />
    </S>
  ),
  /* थायराइड — the gland's two lobes joined at the isthmus, under the throat */
  thyroid: (p) => (
    <S {...p}>
      <path d="M23 17.5c-2.6-3.6-7-4.8-10.2-2.2-3.6 3-3.4 10.4.4 14.6 2.8 3.2 6.8 3 8.6-.4 1-1.9 1.4-4.4 1.4-7z" />
      <path d="M25 17.5c2.6-3.6 7-4.8 10.2-2.2 3.6 3 3.4 10.4-.4 14.6-2.8 3.2-6.8 3-8.6-.4-1-1.9-1.4-4.4-1.4-7z" />
      <path d="M21.5 24h5" />
    </S>
  ),
  /* मोटापा — a bathroom scale, seen from above */
  weight: (p) => (
    <S {...p}>
      <rect x="8" y="8" width="32" height="32" rx="6.5" />
      <path d="M14.5 30.5a9.5 9.5 0 0 1 19 0" />
      <path d="M24 30.5l6.5-7" />
    </S>
  ),
  /* नींद और तनाव — the crescent, and one star to say it is night */
  moon: (p) => (
    <S {...p}>
      <path d="M39 28.5A15.5 15.5 0 1 1 19.5 9a12.4 12.4 0 0 0 19.5 19.5z" />
      <path d="M33 8.5l1.4 3.1 3.1 1.4-3.1 1.4-1.4 3.1-1.4-3.1-3.1-1.4 3.1-1.4z" />
    </S>
  ),
  /* महिलाओं की समस्याएँ — the sign, drawn to the same grid as the rest */
  women: (p) => (
    <S {...p}>
      <circle cx="24" cy="17.5" r="9" />
      <path d="M24 26.5V42" />
      <path d="M17.5 35.5h13" />
    </S>
  ),
};

export function AilmentIcon({ name, size = 28 }: { name: string; size?: number }) {
  const Icon = AILMENT_ICONS[name] ?? AILMENT_ICONS.sugar;
  return Icon({ size });
}

/* ------------------------------ interface -------------------------------- */

function U({ size = 20, children, ...rest }: P) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

/* The mark people actually recognise. Every path on this site leads to
   WhatsApp, and an outlined bubble read as thin and unfinished beside bold
   Devanagari, so the mark is solid: the bubble filled, the handset knocked
   out of it, which is how WhatsApp draws its own. The old drawing asked the reader
   to guess. */
export const WhatsAppIcon = ({ size = 20, ...rest }: P) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.16c-.24.68-1.42 1.31-1.96 1.36-.5.05-1.13.07-1.83-.11-.42-.11-.96-.29-1.66-.59-2.92-1.26-4.82-4.2-4.97-4.4-.14-.2-1.19-1.58-1.19-3.02 0-1.43.75-2.14 1.02-2.43.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.59.83 2.03.9 2.18.07.15.12.32.02.51-.09.2-.14.32-.28.49-.14.17-.29.38-.42.51-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.93 1.07.95 1.97 1.25 2.25 1.39.28.14.44.12.6-.07.17-.19.69-.8.87-1.08.18-.28.36-.23.61-.14.25.09 1.58.75 1.86.88.27.14.45.21.52.32.07.12.07.68-.17 1.35Z" />
  </svg>
);

/* Solid, because it is never seen alone.

   The phone and the WhatsApp mark sit side by side on the same buttons, and
   this one was drawn with the 1.9px stroke every small UI icon here uses. Next
   to a filled bubble and bold Devanagari it read as a lighter, unfinished
   thing — visible in the buttons Agosh sent back on 5 Sep. The stroked `U`
   wrapper still serves every other icon on the site; this pair matches each
   other. */
export const PhoneIcon = ({ size = 20, ...rest }: P) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path d="M6.62 10.79a15.1 15.1 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1c-9.39 0-17-7.61-17-17a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
  </svg>
);
export const ShareIcon = (p: P) => (
  <U {...p}>
    <path d="M4 13v6.2c0 .7.6 1.3 1.3 1.3h13.4c.7 0 1.3-.6 1.3-1.3V13" />
    <path d="M12 15.5V3.6" />
    <path d="M7.9 7.6L12 3.5l4.1 4.1" />
  </U>
);
export const MenuIcon = (p: P) => (
  <U {...p}>
    <path d="M3.8 7h16.4M3.8 12h16.4M3.8 17h16.4" />
  </U>
);
export const CloseIcon = (p: P) => (
  <U {...p}>
    <path d="M6.2 6.2l11.6 11.6M17.8 6.2L6.2 17.8" />
  </U>
);
export const FrameIcon = ({ size = 22, ...rest }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <rect x="3" y="5" width="18" height="14" rx="2.4" />
    <circle cx="8.6" cy="10.2" r="1.6" />
    <path d="M3.6 17.2l4.6-4.2 3.3 3 3-2.6 5.9 5" />
  </svg>
);
export const LockIcon = ({ size = 16, ...rest }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <rect x="4.5" y="10.5" width="15" height="9.5" rx="2.2" />
    <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
  </svg>
);
export const ChevronIcon = ({ size = 24, ...rest }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);
export const LongArrowIcon = ({ size = 34, ...rest }: P) => (
  <svg width={size} height={Math.round((size * 24) / 34)} viewBox="0 0 34 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <path d="M3 12h27" />
    <path d="M21 4l9 8-9 8" />
  </svg>
);
export const ArrowIcon = (p: P) => (
  <U {...p}>
    <path d="M4.5 12h14" />
    <path d="M12.8 6.3L18.5 12l-5.7 5.7" />
  </U>
);
export const PrintIcon = (p: P) => (
  <U {...p}>
    <path d="M7 8.5V3.5h10v5" />
    <path d="M7 18.5H5.2a1.9 1.9 0 0 1-1.9-1.9v-4.7a1.9 1.9 0 0 1 1.9-1.9h13.6a1.9 1.9 0 0 1 1.9 1.9v4.7a1.9 1.9 0 0 1-1.9 1.9H17" />
    <path d="M7 14.2h10v6.3H7z" />
  </U>
);
export const StarIcon = ({ size = 16, ...rest }: P) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path d="M12 2.6l2.85 5.78 6.38.93-4.62 4.5 1.09 6.35L12 17.16l-5.7 3-1.09-6.35-4.62-4.5 6.38-.93z" />
  </svg>
);
export const PlayIcon = ({ size = 22, ...rest }: P) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path d="M8.5 5.4a.7.7 0 0 1 1.06-.6l9.1 6.6a.7.7 0 0 1 0 1.2l-9.1 6.6a.7.7 0 0 1-1.06-.6z" />
  </svg>
);

/* A tick, for a list of things somebody actually receives. */
export const TickIcon = ({ size = 24, ...rest }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);

/* A link, for a slot where a URL has not been pasted in yet. */
export const LinkIcon = ({ size = 16, ...rest }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <path d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.7 1.7" />
    <path d="M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7l1.7-1.7" />
  </svg>
);
