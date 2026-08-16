/**
 * Synk Innovations — logo geometry. GENERATED, do not hand-edit.
 *
 * Source: brand-source/aperture.py (symbol) and brand-source/wordmark.py
 * (logotype). Regenerate with `python3 brand-source/build.py`, which also
 * rewrites every SVG in public/brand/ from these same coordinates — so the
 * site, the favicon and the letterhead can never drift apart.
 *
 * The symbol is the "Digital Aperture": two concentric frames of four
 * L-brackets, the inner one rotated 45 degrees, converging on a central
 * negative-space opening. Two systems, offset, sharing one centre.
 */

/** Master symbol on its authored 1000x1000 canvas. */
export const MARK = {
  viewBox: "0 0 1000 1000",
  /** Half-extent of the artwork from centre, in master units. */
  extent: 380.0,
  polygons: [
    "170.0,120.0 425.0,120.0 425.0,210.0 210.0,210.0 210.0,425.0 120.0,425.0 120.0,170.0",
    "880.0,170.0 880.0,425.0 790.0,425.0 790.0,210.0 575.0,210.0 575.0,120.0 830.0,120.0",
    "830.0,880.0 575.0,880.0 575.0,790.0 790.0,790.0 790.0,575.0 880.0,575.0 880.0,830.0",
    "120.0,830.0 120.0,575.0 210.0,575.0 210.0,790.0 425.0,790.0 425.0,880.0 170.0,880.0",
    "528.28,217.16 613.14,302.01 549.5,365.65 500.0,316.15 450.5,365.65 386.86,302.01 471.72,217.16",
    "782.84,528.28 697.99,613.14 634.35,549.5 683.85,500.0 634.35,450.5 697.99,386.86 782.84,471.72",
    "471.72,782.84 386.86,697.99 450.5,634.35 500.0,683.85 549.5,634.35 613.14,697.99 528.28,782.84",
    "217.16,471.72 302.01,386.86 365.65,450.5 316.15,500.0 365.65,549.5 302.01,613.14 217.16,528.28"
  ]
} as const;

/** SYNK, stroked geometric capitals on a 24-unit cap height. */
export const WORDMARK = {
  cap: 24,
  width: 80.52,
  strokeWidth: 2.6,
  paths: [
    "M 14.78 6.65 A 6.74 5.35 0 1 0 8.04 12.0",
    "M 8.04 12.0 A 6.74 5.35 0 1 1 1.3 17.35",
    "M 22.78 1.3 L 29.52 12.0 L 36.26 1.3",
    "M 29.52 12.0 L 29.52 22.7",
    "M 44.26 22.7 L 44.26 1.3 L 57.74 22.7 L 57.74 1.3",
    "M 65.74 1.3 L 65.74 22.7",
    "M 79.22 1.3 L 65.74 14.354",
    "M 70.323 9.86 L 79.22 22.7"
  ]
} as const;

/** Horizontal lockup metrics, in logotype units. */
export const LOCKUP = {
  markSize: 44,
  gap: 15
} as const;
