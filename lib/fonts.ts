import { Archivo, Archivo_Narrow, Lekton } from "next/font/google";

/**
 * Three faces, chosen as objects from the drawing office rather than from the
 * usual display shortlist.
 *
 * Archivo is a signage grotesque: monolinear, squarish, the closest obtainable
 * relative of the single-stroke gothic that ASME Y14.2 specifies for lettering
 * on a drawing. Archivo Narrow does the printed sheet chrome, where title
 * blocks have always been set condensed to fit a fixed field. Lekton is drawn
 * from Olivetti's typewriter letterforms and carries every measurement — sheet
 * numbers, revision dates, dimensions, metrics — because on a real drawing the
 * numbers are typed, not lettered.
 *
 * Geist is gone with the old world: it is Vercel's face and the single most
 * predictable choice a studio site can make.
 */
export const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-draft"
});

export const archivo_narrow = Archivo_Narrow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-chrome"
});

export const lekton = Lekton({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-measure"
});
