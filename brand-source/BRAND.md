# Synk Innovations — logo

## The idea

Two identical elliptical arcs, counter-rotating, overlapped just enough that
they share a diagonal spine — two systems half a turn apart, running in
phase. That is what _synk_ means, and it is the argument the website makes:
complexity brought into step.

The mark is **drawn, not stroked**. It is emitted as filled outlines with a
modulated weight — full through the belly of each curve, tapering toward
terminals cut on a shear. That modulation is the difference between a
letterform and a uniform pen stroke, and it is why the mark holds its
character at 16 px and at a metre.

The **logotype** is deliberately left uniform so it never competes with the
mark. Neither depends on a font, so the logo is identical on screen, in
print, and at favicon size.

Every viewBox in these files is **measured** from the artwork's real ink
bounds by a browser, not computed by hand. An earlier revision shipped four
files clipped at the bottom because the bounding box was asserted rather than
measured; `verify.js` in the build now fails loudly if any file clips.

## Files

| File                               | Use                                                                                                               |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `synk-logo-dark.svg`               | **Primary.** Mark + SYNK, ink on light. Letterheads, documents, invoices.                                         |
| `synk-logo-light.svg`              | Primary, reversed for dark backgrounds.                                                                           |
| `synk-logo-violet.svg`             | Accent version. Screen only — never on paper.                                                                     |
| `synk-logo-full-dark/light.svg`    | Adds the INNOVATIONS descriptor, tracked to exactly the width of SYNK. Use where the full legal name must appear. |
| `synk-logo-stacked-dark/light.svg` | Square-ish spaces: social avatars, signage, merchandise.                                                          |
| `synk-mark-dark/light/violet.svg`  | Mark alone. Only where SYNK already appears nearby.                                                               |
| `synk-favicon.svg`                 | Mark on a dark tile, for browser tabs.                                                                            |
| `synk-letterhead-a4.svg`           | A4 letterhead. Logo at 46 mm, body area y≈56–258 mm.                                                              |

## Rules

**Clear space.** Keep the height of the mark free on all four sides. Nothing
— no rule, no text, no page edge — enters that margin.

**Minimum size.** Full lockup: 22 mm wide in print, 90 px on screen. Mark
alone: 6 mm / 16 px. Below that the two rings stop reading as two rings.

**Colour.** One ink. The logo is monochrome by default — that is what makes
it survive fax, embroidery, engraving and single-colour print. Violet
(`#8B5CF6`) is for screen only, and only when the background is dark enough
to carry it. On the letterhead the violet appears once, as the short rule
under the header; that restraint is the point.

**Do not:** re-draw the arcs, add a gradient or shadow, stretch the lockup,
box the mark, or set the wordmark in a font. The geometry in
`json/site/logo.ts` and these files are generated from one source — change
one, regenerate the other.

## Print notes

The **mark is already outlined** — filled paths, nothing to convert. The
logotype is still stroked; every stroked group carries `fill="none"`
explicitly, so pasting a group into another document cannot make it render
filled. (That is a real failure mode: it is what happens when a group is
lifted out of an SVG whose `fill="none"` lived only on the root element.)

If your printer requires the logotype outlined too, run _Object → Path →
Outline Stroke_ once in Illustrator and save a separate file — do not
overwrite these.
