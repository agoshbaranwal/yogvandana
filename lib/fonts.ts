import { Anek_Devanagari } from "next/font/google";

/* One typeface for the whole site, in both languages.

   It used to be two: Baloo 2 for Devanagari and Montserrat for Latin. Baloo 2
   is a rounded display face, and it was setting body copy, numbers and every
   label — soft terminals, a blobby heaviest weight, and a Devanagari that
   reads informal, which is the wrong register for a site about treating
   disease. Agosh chose to replace it (round 8, "Modern").

   Anek Devanagari was drawn this decade for Indian scripts and carries Latin
   too, so a Hindi page and an English page use the same face and hierarchy is
   made by weight and size alone. It is a variable font: one file covers every
   weight we use, which is fewer bytes than the two static weights it replaces. */

export const anek = Anek_Devanagari({
  subsets: ["devanagari", "latin"],
  variable: "--font-hi",
  display: "swap",
});

export const hindiFontClass = anek.variable;
export const englishFontClass = anek.variable;
