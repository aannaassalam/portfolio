import {
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
  Inter,
  Libre_Baskerville,
  Merriweather,
  Roboto
} from "next/font/google";

export const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist"
});

export const geist_mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-geist-mono"
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--inter",
  style: ["normal"]
});

export const merri_weather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
  style: ["italic", "normal"],
  variable: "--merri"
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
  style: ["italic", "normal"],
  variable: "--roboto"
});

export const bricolage_grotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  display: "swap",
  variable: "--bricolage"
});

export const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["italic", "normal"],
  display: "swap",
  variable: "--libre"
});
