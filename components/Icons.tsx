import type { SVGProps } from "react";

/* One line-drawn icon per condition, on a 48px grid, stroke only, so every one
   recolours with its family and stays legible at 26px. */

type P = SVGProps<SVGSVGElement> & { size?: number };

function S({ size = 28, children, ...rest }: P) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
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
  spine: (p) => (
    <S {...p}>
      <path d="M24 4c-4 4-4 8 0 12s4 8 0 12-4 8 0 12 4 4 0 8" />
      <rect x="19" y="9" width="10" height="5" rx="2.5" />
      <rect x="19" y="21" width="10" height="5" rx="2.5" />
      <rect x="19" y="33" width="10" height="5" rx="2.5" />
    </S>
  ),
  knee: (p) => (
    <S {...p}>
      <path d="M18 4v14a6 6 0 0 0 6 6h4" />
      <path d="M14 44l6-16" />
      <circle cx="22" cy="24" r="5" />
      <path d="M30 24l10 2" />
      <path d="M34 44l-4-14" />
    </S>
  ),
  sugar: (p) => (
    <S {...p}>
      <path d="M24 5s-12 14-12 22a12 12 0 0 0 24 0c0-8-12-22-12-22z" />
      <path d="M18 30a6 6 0 0 0 6 6" />
    </S>
  ),
  heart: (p) => (
    <S {...p}>
      <path d="M24 42S8 32 8 19a8 8 0 0 1 16-4 8 8 0 0 1 16 4c0 13-16 23-16 23z" />
      <path d="M10 24h8l3-6 4 12 3-6h10" />
    </S>
  ),
  thyroid: (p) => (
    <S {...p}>
      <path d="M24 14c-3-7-12-9-16-4s-1 13 6 17c6 3 10 0 10-3" />
      <path d="M24 14c3-7 12-9 16-4s1 13-6 17c-6 3-10 0-10-3" />
      <path d="M24 8v32" />
    </S>
  ),
  weight: (p) => (
    <S {...p}>
      <rect x="8" y="10" width="32" height="30" rx="4" />
      <path d="M14 22a10 10 0 0 1 20 0" />
      <path d="M24 22l4-5" />
      <path d="M12 34h24" />
    </S>
  ),
  moon: (p) => (
    <S {...p}>
      <path d="M40 28a16 16 0 1 1-20-20 14 14 0 0 0 20 20z" />
      <path d="M30 8l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" />
    </S>
  ),
  women: (p) => (
    <S {...p}>
      <circle cx="24" cy="17" r="10" />
      <path d="M24 27v16" />
      <path d="M17 37h14" />
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
      strokeWidth={2}
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

export const WhatsAppIcon = (p: P) => (
  <U {...p}>
    <path d="M21 12a8 8 0 0 1-11.6 7.2L4 21l1.8-5.4A8 8 0 1 1 21 12z" />
  </U>
);
export const PhoneIcon = (p: P) => (
  <U {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </U>
);
export const ShareIcon = (p: P) => (
  <U {...p}>
    <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
    <path d="M12 15V3" />
    <path d="M8 7l4-4 4 4" />
  </U>
);
export const MenuIcon = (p: P) => (
  <U {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </U>
);
export const CloseIcon = (p: P) => (
  <U {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </U>
);
export const ArrowIcon = (p: P) => (
  <U {...p}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </U>
);
export const PrintIcon = (p: P) => (
  <U {...p}>
    <path d="M7 9V3h10v6" />
    <path d="M7 18H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <path d="M7 14h10v7H7z" />
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
    <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.1-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" />
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
    <path d="M8 5v14l11-7z" />
  </svg>
);
