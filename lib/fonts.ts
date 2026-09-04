import localFont from "next/font/local";

/* Anek Devanagari, cut down and self-hosted.

   Google serves it as a variable font carrying every weight from 100 to 800.
   The Devanagari cut of that alone was 252 KB, on a site whose audience is on
   mobile data. This site sets text in exactly two weights, so `scripts/fonts.py`
   instances those two out of the variable font and subsets each to its script:
   Devanagari 88 KB a weight, Latin 17 KB.

   Two families rather than one, each with its own unicode-range: a Devanagari
   character takes the Devanagari file, everything else falls through to the
   Latin one, so a page never pays for outlines it will not draw. next/font
   demands literals, so the ranges are written out rather than named — they are
   the same two strings as RANGES in scripts/fonts.py, which is where they are
   explained. Re-run that script if a weight in globals.css changes. */

const dev = localFont({
  src: [
    { path: "../assets/fonts/anek-dev-400.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/anek-dev-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-dev",
  display: "swap",
  declarations: [
    { prop: "unicode-range", value: "U+0900-097F,U+1CD0-1CF9,U+200C-200D,U+20A8,U+20B9,U+25CC,U+A830-A839,U+A8E0-A8FF" },
  ],
});

const lat = localFont({
  src: [
    { path: "../assets/fonts/anek-lat-400.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/anek-lat-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-lat",
  display: "swap",
  /* not preloaded: small, and only reached for digits and the odd English word
     once the page is already painting */
  preload: false,
  declarations: [
    { prop: "unicode-range", value: "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215" },
  ],
});

export const hindiFontClass = `${dev.variable} ${lat.variable}`;
export const englishFontClass = hindiFontClass;
