import { Baloo_2, Martel, Mukta } from "next/font/google";

/* Bundled at build time, so no request ever goes to Google when a page loads.
   All three faces carry Devanagari; the site is Hindi first. */

export const baloo = Baloo_2({
  subsets: ["latin", "devanagari"],
  weight: ["600", "700", "800"],
  variable: "--font-baloo",
  display: "swap",
});

export const martel = Martel({
  subsets: ["latin", "devanagari"],
  weight: ["700", "800"],
  variable: "--font-martel",
  display: "swap",
});

export const mukta = Mukta({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mukta",
  display: "swap",
});

export const fontClass = `${baloo.variable} ${martel.variable} ${mukta.variable}`;
