import { Baloo_2, Montserrat } from "next/font/google";

/* Two faces, and only two: one for Devanagari, one for Latin.

   Baloo 2 carries both scripts, so a Hindi page sets everything — including
   the English words inside it, like Zoom and WhatsApp — in one face. On the
   English pages Montserrat leads and Baloo 2 sits behind it in the stack, so
   the brand and the motto, which stay in Devanagari, pick it up without a
   third family or a special class.

   Bundled at build time; no request ever goes to Google when a page loads.
   Three weights each. A Devanagari weight is 60 to 110 KB and most of her
   students open this on mobile data, so hierarchy comes from 400 / 600 / 800
   rather than from more faces. */

export const baloo = Baloo_2({
  subsets: ["latin", "devanagari"],
  weight: ["400", "600", "800"],
  variable: "--font-hi",
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-en",
  display: "swap",
});

export const fontClass = `${baloo.variable} ${montserrat.variable}`;
