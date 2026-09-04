import { Montserrat } from "next/font/google";
import { baloo } from "./fonts";

/* The English pages' face, declared in its own module so that only the
   English layout's module graph carries it (see lib/fonts.ts). */
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "800"],
  variable: "--font-en",
  display: "swap",
  /* not preloaded: Next preloads a face on every page whose stylesheet
     declares it, which would put Montserrat on the Hindi pages too. The
     English page fetches it as soon as its stylesheet applies. */
  preload: false,
});

export const englishFontClass = `${baloo.variable} ${montserrat.variable}`;
