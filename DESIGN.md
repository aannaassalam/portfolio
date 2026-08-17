---
name: Synk Innovations — Revision Set
description: A single-page studio site built as one revision-controlled drawing set, printed as a diazo whiteprint in a single violet ink.
colors:
  print-050: "#eceaf2"
  print-100: "#e2dfec"
  print-200: "#d6d2e2"
  print-300: "#c3bed4"
  print-400: "#a9a3bd"
  ink-900: "#16151c"
  ink-700: "#2e2378"
  ink-500: "#4a3da0"
  ink-300: "#5a5199"
  plate: "#4f31c4"
  plate-deep: "#38228f"
  knock: "#f2f0f7"
  redline: "#a82a15"
  redline-soft: "#c9634f"
typography:
  display:
    fontFamily: "Archivo Narrow, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4.6vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 0.94
    letterSpacing: "-0.01em"
    textTransform: "uppercase"
  headline:
    fontFamily: "Archivo Narrow, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.6vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 0.94
    letterSpacing: "-0.01em"
    textTransform: "uppercase"
  title:
    fontFamily: "Archivo Narrow, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 0.94
    letterSpacing: "0.08em"
    textTransform: "uppercase"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
  body-fine:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
  label:
    fontFamily: "Lekton, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.14em"
    textTransform: "uppercase"
  label-sm:
    fontFamily: "Lekton, ui-monospace, monospace"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.16em"
    textTransform: "uppercase"
  measure:
    fontFamily: "Lekton, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "normal"
    fontVariantNumeric: "tabular-nums"
rounded:
  none: "0"
spacing:
  grid: "1.25rem"
  gutter: "clamp(1rem, 3vw, 2.5rem)"
  sheet-body: "3.5rem"
  sheet-body-wide: "5rem"
  shell-max: "96rem"
components:
  sheet:
    backgroundColor: "{colors.print-200}"
    textColor: "{colors.ink-700}"
    rounded: "{rounded.none}"
    padding: "3.5rem 0"
  sheet-lifted:
    backgroundColor: "{colors.print-100}"
    textColor: "{colors.ink-700}"
    rounded: "{rounded.none}"
  title-block:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.knock}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1rem"
  stamp-issue:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.knock}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.5rem"
    height: "2.75rem"
  stamp-pending:
    textColor: "{colors.redline}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.5rem"
    height: "2.75rem"
  field-label:
    textColor: "{colors.ink-500}"
    typography: "{typography.label}"
  field-label-knock:
    textColor: "{colors.knock}"
    typography: "{typography.label}"
  field-value:
    textColor: "{colors.ink-900}"
    typography: "{typography.measure}"
  field-held:
    textColor: "{colors.ink-300}"
    typography: "{typography.measure}"
    padding: "0.125rem 0.375rem"
  illustrative-stamp:
    textColor: "{colors.redline}"
    rounded: "{rounded.none}"
    padding: "0.125rem 0.375rem"
  nav-link:
    textColor: "{colors.ink-500}"
    typography: "{typography.title}"
    height: "2.75rem"
  nav-link-active:
    textColor: "{colors.ink-900}"
    typography: "{typography.title}"
    height: "2.75rem"
---

# Design System: Synk Innovations — Revision Set

## Overview

**Creative North Star: "The Drawing Office"**

The page is not a website about a studio that draws systems; it is a drawing set the studio issued. Ten sheets, numbered 01 to 10, each with a printed strip carrying its number and title, registration crosses in the frame margin, a drafting grid faint enough to letter over, and a violet title block in the bottom-right where every drawing standard puts one. The argument of the product — that this studio maps whole systems and reissues them cheaply — is made by the artifact's own form rather than asserted in copy. The issue register is the proof: it lists what the set has genuinely issued and what it is genuinely holding, and every held row is a real gap.

The print is a **diazo whiteprint, not a cyanotype**. A blueprint proper is a negative — white lines on Prussian blue — and it is also the process the drawing office abandoned. What replaced it, the diazo, develops the other way round: blue-violet ink on a ground the ammonia leaves faintly cool. So the ground carries a violet cast rather than being neutral paper, and the brand's violet is not an accent laid over the page. It is the ink every line is drawn in. This is the single most important thing to preserve: the palette has one printing ink, and inverting the ground to a dark field would not be a theme variant, it would be a different and abandoned process.

The system is deliberately flat and deliberately square. There are no shadows, no radii, no gradients, no glass, no glow, and — critically — **no cards**. Depth comes from ink weight and from two grounds one step apart, the way it does on paper. Confirmed rejections, stated in the direction contract at `pages/_document.tsx` and honoured in the build: this category's dark hero, its gradient accent, and its particle field.

**Key Characteristics:**

- One printing ink (`ink-700`) for everything printed; violet is the ink, never a highlight.
- Sheets, ruled schedules and title-block field grids as containers — never cards.
- Zero border radius anywhere, zero box-shadows anywhere.
- Exactly one motion device: ink drawing itself on, at one plotter speed.
- Red pencil is reserved: corrections, current revision, held data, focus rings.
- Wide technical drawings are replaced below the breakpoint, never shrunk and never scrolled sideways.
- Every measurement is typed in a typewriter face with tabular figures; every label is engraved in the same face.
- The small-type scale is four named steps and no literals: `.note` 14px, `.note-fine` 13px, `.field` 11px, `.field-sm` 10px.
- Data the studio does not have is _displayed as held_, not omitted.

## Colors

A developed print: a cool violet-cast ground in four steps, one printing ink in four weights, a solid plate for knocked-out lettering, and red pencil for corrections.

### Primary

The primary is the ink. Everything printed on the page is drawn in it.

- **Diazo Ink** (`ink-700`): The one printing ink. Body text, sheet titles, drawn linework, sheet borders, table rules, the brand mark. Measures **8.71:1** on the standard ground.
- **Half-Weight Ink** (`ink-500`): The second line weight a set actually prints. Every field label (`.field`), registration marks, secondary notes in the revision column. **5.75:1**.
- **Light-Weight Ink** (`ink-300`): The lightest printed weight. Held-field values, interpunct separators, inactive nav sheet numbers, the hatch on a held field. **4.62:1** — see the Contrast Floor Rule.
- **Near-Black** (`ink-900`): Structural only. Sheet-strip titles, field _values_, hairline rules in the nav toggle, and the mobile index backdrop at 45% opacity. It is not a text ink for running prose.

### Secondary

The plate: where the colour commits at region scale as a solid field rather than as an accent.

- **Plate Violet** (`plate`): Solid fields with knocked-out lettering — the title block, the ISSUE stamp, sheet numbers in the printed strip, and the one underlined link in the nav rail. As a link colour on the standard ground it measures **5.52:1**; carrying `knock` lettering on top it measures **7.23:1**.
- **Plate Deep** (`plate-deep`): The ruled lines inside a title block's field grid (at 50% opacity, so the rules read as printed _on_ the plate rather than drawn over it), and the hover state of the plate link. **7.90:1** on ground.
- **Knock** (`knock`): The knocked-out lettering itself — the paper showing through the plate. Never a background.

### Tertiary

- **Red Pencil** (`redline`): Reserved, and its reservation is the point. Revision clouds, the outlined triangle of a _held_ revision, the ILLUSTRATIVE stamp, the pending stamp variant, the reading-progress rule, the active nav sheet number, the section line on sheet 01, and every focus ring. **4.71:1**.
- **Soft Red Pencil** (`redline-soft`): Defined in the token layer at **2.63:1** on ground. Large-graphic use only; it is not a text colour and is currently near-unused.

### Neutral

The ground is the print itself, not paper. Warm neutral would be paper; this is developed.

- **Standard Ground** (`print-200`): The sheet. Seven of the ten sheets print on it, and it is the `html`/`body` background and the `theme-color`.
- **Lifted Ground** (`print-100`): One step lighter. Sheets 04, 06 and 09 print on it, as do the footer and the mobile index panel — a printing rhythm across the set, not a hierarchy signal.
- **Palest Ground** (`print-050`) and **Rule Grey** (`print-300`), **Deep Ground** (`print-400`): `print-300` is the global default border colour and the scrollbar track's rule. `print-050` and `print-400` are defined in `@theme` but effectively unused in the shipped sheets.

### Named Rules

**The One Ink Rule.** Everything _printed_ on this page is `ink-700`. Not "mostly" — the sheet borders, the linework, the lettering and the prose are one ink, because a diazo print has one. Near-black exists as a token but is confined to borders, field values and backdrops; it is never the colour of running text. A second text hue introduced anywhere is a regression.

**The Contrast Floor Rule.** `ink-300` (#5a5199) and `redline` (#a82a15) are **contrast-solved values, not aesthetic picks.** They were darkened from #7d73b8 and #c4331c, which measure **2.83:1** and **3.69:1** against the standard ground and therefore fail AA for small text. The shipped values are the shallowest that clear 4.5:1 against _both_ sheet grounds (`ink-300`: 4.62:1 on `print-200`, 5.21:1 on `print-100`; `redline`: 4.71:1 and 5.32:1). **Do not lighten them for prettiness.** The same arithmetic overruled two drafted values, and the direction contract at `pages/_document.tsx` now records the overrule rather than contradicting it: it names the shipped `#4F31C4` and `#A82A15`, states that the drafted `#5B3FD9` and `#C4331C` measured **4.49:1** and **3.69:1** on this ground and failed AA for small text, and instructs `do not restore`. The contract and the token layer agree; keep them that way.

**The Reserved Pencil Rule.** Red pencil marks what is wrong, what is unissued, or what is not substantiated. It is never decoration and never a second accent. If red appears on something that is finished and true, the mark is lying.

**The Brand-In-The-Ink Rule.** The brand mark renders in `ink-700`, **not** in brand violet `#8B5CF6`. `brand-source/BRAND.md` restricts the violet lockup to screens whose ground is dark enough to carry it, and this ground is a whiteprint. The brand colour is not absent from the page — it is the ink everything else is drawn in. Do not "fix" the mark by recolouring it.

## Typography

**Display Font:** Archivo Narrow (with `ui-sans-serif`, `system-ui`, `sans-serif`) — exposed as `--font-chrome`
**Body Font:** Archivo (with `ui-sans-serif`, `system-ui`, `sans-serif`) — exposed as `--font-draft`
**Label/Mono Font:** Lekton (with `ui-monospace`, `monospace`) — exposed as `--font-measure`

**Character:** Three faces chosen as objects from the drawing office rather than from a display shortlist. Archivo is a signage grotesque — monolinear, squarish — and is the closest obtainable relative of the single-stroke gothic that ASME Y14.2 specifies for lettering on a drawing. Archivo Narrow does the printed sheet chrome, because title blocks have always been set condensed to fit a fixed field. Lekton is drawn from Olivetti's typewriter letterforms and carries every measurement, because on a real drawing the numbers are typed, not lettered. `font-synthesis-weight: none` is set globally so a missing weight never gets faked.

### Hierarchy

- **Display** (600, `clamp(1.875rem, 4.6vw, 4.25rem)`, 0.94): Lettered into the drawing area of sheet 01 only. Set `text-nowrap` below md and `text-balance` above, and split into per-line masked spans so the lettering can rise into frame. Sheet 10's closing headline is a near-sibling at `clamp(2rem, 5vw, 4.25rem)`.
- **Headline** (600, `clamp(1.5rem, 2.6vw, 2.5rem)`, 0.94): The sheet heading. Eight sheets use this exact value, capped at 20–22ch. This is the workhorse size, and it should stay identical across sheets — a set whose sheet headings differ in size reads as loose leaves.
- **Title** (600, 0.875rem→1rem, tracking 0.08em): The sheet title in the printed strip, in near-black. Also the revision-column item names at 0.75rem/0.08em and the mobile index entries at 1rem/0.06em.
- **Body** (400, 0.875rem, 1.62, max 68ch): A note on a drawing — running prose, set narrow, always beneath a field label. `.note`. Colour is the ink mixed 88% with the ground, so a note sits a half-step behind lettering without becoming a second hue.
- **Body Fine** (400, 0.8125rem): `.note-fine`, the fine print beneath a note, and the only other note size there is. It carries no colour or measure of its own — it is a size step layered onto `.note`, which is why the two classes appear together on the same element and why its declaration order matters (see the Two Notes Rule).
- **Label** (400, 0.6875rem, tracking 0.14em, uppercase, `ink-500`): `.field`, the engraved field label. Every title-block field name and every note heading uses it, so the same _kind_ of word always looks the same. On a plate it swaps to the knocked-out variant (`.field-knock`).
- **Label Small** (400, 0.625rem, tracking 0.16em, uppercase): `.field-sm`, the second and last step of the label scale — revision-column metadata, the ILLUSTRATIVE stamp's lettering, the issue stamp's overline. It inherits colour from its caller rather than declaring one. The stamp overline's former one-off 0.5625rem was folded up into this step rather than earning a step for one caller; at 10px it is the smallest type in the system and the floor.
- **Measure** (400, 0.875rem, tabular figures): Every number on the page — sheet numbers, revisions, dates, dimensions, metrics. Tabular numerals are applied globally to anything carrying the measure face, which is what keeps the revision column from wobbling.

### Named Rules

**The Typed-Not-Lettered Rule.** Numbers are typed; words are lettered. Any measurement, sheet number, revision, date or metric goes in Lekton with tabular figures. Prose goes in Archivo. Headings go in Archivo Narrow, uppercase. A number set in the body face is a mistake in the same way a hand-lettered dimension would be on a real drawing.

**The Label-Before-Value Rule.** No value appears without an engraved label above it. A reader browses this page by label, not by prose, which is what makes a fixed field order worth having.

**The Four Steps Rule.** Below the headline sizes, the ramp is **four named classes and no arbitrary values**: `.note` (14px), `.note-fine` (13px), `.field` (11px), `.field-sm` (10px). That is the whole small-type scale. A repeated `text-[…]` literal is not a local decision, it is a missing step — sixteen call sites each carrying `text-[0.8125rem]` is what earned `.note-fine`, and three carrying `text-[0.625rem]` is what earned `.field-sm`. If a new size seems necessary, first check whether it can fold up into the step above it, the way the stamp overline's 0.5625rem did. 10px is the floor.

**The Two Notes Rule.** `.note-fine` **must stay declared after `.note`** in `styles/globals.css`. Both live in the same `@layer components`, so an element carrying both resolves to whichever is declared last, and the fine print has to be the one that wins. Reordering those two blocks silently reverts every fine-print caller on the page to 14px, with no error and no visual warning at the call site. Audit test: an element with `class="note note-fine"` computes to 13px.

## Layout

**The shell.** One container: `max-width: 96rem`, centred, with `padding-inline: clamp(1rem, 3vw, 2.5rem)`. It is used for the nav rail, the mobile index and every sheet's interior. There is no second container width.

**The sheet.** Each of the ten sections is a full-bleed band separated by a 2px top rule in ink, with the shell inside it. Inside the shell: two registration crosses pinned in the frame margin (`left-2 top-2`, `right-2 top-2`), the printed strip (number / title / set reference, `border-b border-ink-700/40`, `py-3`), then the drawing area — gridded by default, `py-14 md:py-20`. Sheet 10 opens up to `py-16 md:py-24`. Sheet 01 goes full-bleed and frames its drawing area with `border-x-2`.

**The drafting grid.** A 1.25rem square grid printed on the sheet from two linear gradients at 5.5% ink — faint enough to letter over, present enough that nothing on the page looks unplaced. It is a background, never a layout mechanism; the content grids are independent.

**Rhythm.** Vertical spacing is Tailwind's default scale used sparsely: `mt-1`/`mt-1.5`/`mt-2` inside a field, `mt-4` under a heading, `mt-7`–`mt-10` between blocks, and the sheet body padding above. Column gaps cluster at `gap-6` (header rows), `gap-14`, `gap-16`, `gap-20` (sheet split layouts).

**Breakpoints.** The default Tailwind set is discarded and redeclared: xs 480, sm 640, md 768, lg 1024, xl 1280, 2xl 1536, 3xl 1792.

**Responsive strategy — replacement, not compression.** A wide technical drawing cannot be read on a phone, and the information in it is content rather than decoration. So below the breakpoint the drawing is _replaced by a different markup tree carrying the same content_, never scaled to illegibility and never put in a horizontal scroll box. As built:

- **Sheet 01, General arrangement** — replaces. The 1200×386 axonometric is `hidden md:block`; the same six architecture layers render as an ordered list at `md:hidden`.
- **Sheet 03, Schedule of works** — replaces. The four-column table is `hidden md:block`; the same rows render as stacked field blocks at `md:hidden`. The source comment explicitly rejects a horizontal scroll box here.
- **Sheet 04, Bill of materials** — drops. The connection diagram is `hidden lg:flex` with no swapped counterpart, because the always-present parts list already carries the content.
- **Sheet 07, Section through system** — drops. The section SVG is `hidden … md:block`; the definition list of junctions is the whole content below md.
- **Sheets 02, 05, 08, 09, 10** — reflow only (single column to split column). **Sheet 06** reflows and suppresses one column label.

`overflow-x-auto` appears **nowhere** in the codebase, and `body` carries `overflow-x: hidden`. That is a deliberate invariant, not an accident.

### Named Rules

**The Replace-Don't-Shrink Rule.** When a drawing is too wide for the viewport, hide it and render its content another way — a list, a definition list, stacked field blocks. Never scale it down to unreadable, and never wrap it in a horizontal scroller. Audit test: at 390px wide, no element requires sideways scrolling and no drawn label is below 10px.

## Elevation & Depth

**There are no shadows in this system. Not one `box-shadow`, anywhere.** Nothing on a drawing board ever floated, so nothing here does.

Depth is conveyed three ways, all of them borrowed from paper:

1. **Ink weight.** The sheet frame is heavier (2px) than anything drawn inside it (1px hairlines, and rules at 20–40% ink). That weight hierarchy is what keeps ten sheets in a row from reading as ten cards — the border belongs to the paper, not to the content.
2. **Two grounds.** `print-100` sits one step above `print-200`. The lift is a printing rhythm, and it is the only surface-level tonal change available.
3. **The plate.** A solid violet field with knocked-out lettering reads as a region, not as an elevated card. Its internal rules are the deeper plate colour showing through a 1px grid gap, so they read as printed on the plate rather than drawn over it.

The nav rail is explicitly _printed on_ the sheet rather than floating over it: `bg-print-200/95`, no blur, no shadow, no pill. Its only state change is that the rule beneath it goes from transparent to solid ink once you leave the first sheet.

### Named Rules

**The Nothing-Floats Rule.** No `box-shadow`, no `backdrop-filter`, no translucent glass panel, no lifted hover. If an element needs to read as separate, give it a heavier rule, a different ground, or a plate. Hover states move _down_ onto the paper (the stamp presses to `scale(0.98)`), never up off it.

## Shapes

**Everything is square.** There is no radius token because there is no radius: no `rounded-*` utility is used on any surface, and the scrollbar thumb explicitly sets `border-radius: 0` to defeat the browser default. The only curves in the system are _drawn_ curves — SVG arcs in a revision cloud, the elliptical arcs of the brand mark, callout bubbles — and those are ink, not chrome.

The recurring silhouettes are all drafting objects: the rectangular sheet frame inset from the trim; the small cross of a registration mark (two 1px rules through a 0.75rem box); the numbered revision triangle (`M 9 1 L 17 15 L 1 15 Z`, filled when issued, outlined in red pencil when held); the ruled field grid; the 45° hatch on a held field; and the scalloped closed path of a revision cloud.

Rotation is used as a printing artifact, sparingly and always at a small angle: the ILLUSTRATIVE stamp sits at `-1.5deg`, the issue stamp at `-1deg` (straightening to `0` on hover). Nothing else is rotated.

### Named Rules

**The Square Corner Rule.** Radius is zero, everywhere, on everything. A rounded container in this system is immediately foreign. Curves are drawn in ink or they do not exist.

## Components

The component grammar is six pieces in `ui/`. Everything on the page is assembled from them. Note that `ui/scrollbar`, `ui/RichTextEditor`, `ui/VisuallyHiddenInput` and `ui/Logo` are **unused legacy scaffold inherited from the starter template** — they are not part of this system and are referenced by nothing. Do not extend them and do not treat them as precedent.

### Sheet

The set's only container. A full-bleed band, 2px top rule in ink, standard ground (or the lifted ground by override), the shell inside it, two registration crosses in the frame margin, and a printed strip carrying the sheet number in plate violet, the sheet title in near-black lettering, and the set reference (`Project · Rev NN`) pushed right and hidden below sm. The drawing area below is gridded by default and can be opted out or re-padded. Nine of the ten sheets use this component; sheet 01 hand-rolls an equivalent header so it can go full-bleed.

### Title Block

A solid violet plate seated bottom-right of a sheet, exactly where every drawing standard puts one. Six fields in a **fixed order that never varies per sheet** — Project, Drawing, Sheet, Scale, Drawn, Rev — as a ruled grid whose 1px rules are the deeper plate showing through the gaps. Labels are the knocked-out field variant; values are typed in the measure face. An optional footer region seats the issue stamp inside the plate, divided by a knock rule at 20%. A `strip` variant lays the six fields in one row (`grid-cols-3 lg:grid-cols-6`) for sheet 01, because at two rows the plate's second row was sliced by the fold and a title block cut in half by the viewport edge reads as a mistake rather than as an edge.

### Stamp (the primary action)

**The primary action is a drawing-office issue stamp, not a button.** A rotated plate (`-1deg`) with knocked-out lettering, a hairline keyline inset from the edge the way a real stamp's frame sits inside its own impression, an optional overline printed above the stamp text in `.field-sm` (widened to `0.2em` tracking, the one tracking override the step takes), and a minimum 2.75rem tap height.

- **Shape:** square, zero radius; `px-6 py-3`.
- **Issue variant:** solid plate violet, knock lettering. The lettering colour is _stated_, not inherited — `.lettering` carries the print's ink, and on a solid plate that ink measures only ~2.5:1 against the field.
- **Pending variant:** same geometry, no ink yet — a 2px red-pencil outline with red-pencil lettering.
- **Hover / press:** straightens to `rotate(0)` over 300ms on the draw easing, then presses _down_ to `scale(0.98)` on active. It rocks onto the paper; it never lifts off it.

### Field

A title-block field: an engraved label with its value typed beneath in near-black. Used for sheet metadata, service capabilities, case-study figures and the contact block alike, which is why it also owns the two states a drawing has for data it does not have:

- **Held** — a value still to be issued. Renders the literal word `HOLD` in light-weight ink on a 45° hatch, _displayed rather than omitted_. Sheet 05 holds the client name, because real client names are not the studio's to print.
- **Illustrative** — a real-looking figure that is not substantiated. Gets a bordered red-pencil stamp at `-1.5deg` reading `△ Illustrative`. It is a stamp, not a footnote.

### Revision Column

Numbered triangles down the sheet edge, each naming a revision, its note, its sheets, and `ISSUED` or `HELD`. An issued revision is a filled ink triangle with knocked-out numerals; a held one is outlined in red pencil with red-pencil numerals and a red-pencil item name. A `compact` variant drops the note line. Every row is `data-reveal`, so the register draws in with the sheet.

### Revision Cloud

Drop inside a `relative` container to cloud it. **It draws genuine SVG arcs** — a closed path of outward-bulging arcs walked clockwise around the measured box, at a fixed 26px scallop pitch with an arc radius 1.22× the half-chord (at exactly half-chord you get semicircles that read as a scalloped edge, and a drawing-office cloud is fatter than that). It measures its parent with a `ResizeObserver` so the pitch stays constant instead of stretching with the box. An optional label sits on the cloud in `.field` red pencil, knocked out of the ground.

**The two offsets are a fix, not a style choice.** The SVG sits 14px outside the container (`PAD`) and the path is drawn 8px inside the SVG (`BULGE`), so the outermost arc tip lands only 6px beyond the box. Without the inset the arcs bulged a full radius past the container and were sliced flush at the viewport edges on a 390px screen, leaving half-arc nubs down both sides where the cloud's vertical runs should have been. Do not collapse `PAD` and `BULGE` into one number and do not set `BULGE` to zero.

**The first attempt at this was a CSS `repeating-radial-gradient` mask on a border. It renders as a dashed rectangle with square corners — no convex arcs at all — and it was removed.** A cloud is arcs, so it must be drawn as arcs. Do not reintroduce the mask.

### Navigation (the set index)

Navigation as the set's index strip: sheet numbers and titles, not menu items. Fixed to the top, printed on the sheet at 95% ground with no blur, no shadow and no pill. Each entry pairs a measure-face sheet number with condensed lettering; the active entry turns its number red pencil and its title near-black, driven by an IntersectionObserver with a `-45%/-50%` root margin. The one plate-violet element is the underlined `10 ISSUE →` link. A red-pencil reading-progress rule (2px) runs along the bottom edge, written directly to `style.width` on a rAF so scrolling never re-renders. Below md the four links collapse to an `Index` toggle that opens **all ten sheets** on the lifted ground; opening it locks the real scroller and Escape closes it.

### Inputs

**There are none.** No form, no text input, no select exists on this page — the enquiry route is a held revision (Rev 08) rather than a shipped surface. The nearest thing to an input treatment is the focus ring: a 2px red-pencil outline at 3px offset, applied globally to `:focus-visible`. When a form is eventually drawn, it should be a ruled schedule of fields in the `Field` grammar, not a set of rounded boxes.

### Motion

Motion is **exactly one device**: ink drawing itself onto the sheet.

Every `[data-draw]` path is measured with `getTotalLength()`, its real length written back as the `--len` custom property the stylesheet already uses for the pre-hidden dash offset, then its `stroke-dashoffset` tweened to zero with linear easing. Measuring per-path rather than assuming a length is the whole point: the duration is scaled off the real length at **one plotter speed of ~900 user units per second, clamped to 0.5–2.4s**, so a short leader line does not crawl while a long section cut snaps. Every line on the sheet draws at the same speed a plotter would.

The supporting primitive is `revealChildren`: `[data-reveal]` elements rise 0.75rem and fade in on `expo.out` over 1.1s with a 0.09s stagger. Both are scoped through `useGsapScope`, which builds a GSAP context per section and reverts every tween and ScrollTrigger it created on unmount — and which **skips setup entirely under `prefers-reduced-motion`**, so callers never guard their own timelines. The one named easing token, `ease-draw` (`cubic-bezier(0.16, 1, 0.3, 1)`), handles the few CSS state transitions (the stamp straightening, the nav rule thickening).

**The double gate is load-bearing and must not be simplified.** Nothing is hidden unless something is guaranteed to un-hide it. **Five attribute families are animated from JS, and every one of them is gated in both directions:**

| Attribute              | Pre-paint state under `:root.js`    | Reduced-motion override |
| ---------------------- | ----------------------------------- | ----------------------- |
| `[data-reveal]`        | `opacity: 0`, `translateY(0.75rem)` | opacity 1, no transform |
| `[data-arrival]`       | `opacity: 0`, `translateY(0.75rem)` | opacity 1, no transform |
| `[data-callout]`       | `opacity: 0`                        | opacity 1, no transform |
| `[data-letter] > span` | `translateY(108%)`                  | opacity 1, no transform |
| `[data-draw]`          | dash offset held at `--len`         | `stroke-dashoffset: 0`  |

1. **The `:root.js` prefix.** The `js` class is added by a **blocking inline script in `pages/_document.tsx`**, so it lands before first paint and is _absent_ when scripting is unavailable. Without it, a no-JS visitor gets a permanently blank page. Never move this flag into React and never drop the prefix from a hiding rule.
2. **The reduced-motion block.** It un-hides all five families, handing a reduced-motion visitor the _finished_ state with nothing left to un-hide. `useGsapScope` skips setup entirely under `prefers-reduced-motion`, so if a family is hidden by CSS and absent from this block, it stays hidden forever.

Both halves are required per family, and the failure mode of getting it half-right is silent. Sheet 01's hero was the case that proved it: it animated `[data-arrival]`, `[data-letter] > span` and `[data-callout]` while the stylesheet gated only `[data-reveal]` and `[data-draw]`, so its server-rendered markup painted visible and then snapped away the instant hydration landed. Audit test: with scripting disabled, no gated element is hidden; with scripting on, every hero node settles visible; under reduced motion, nothing is invisible.

Determinism: any scattered mark computed at render (survey points, cloud scallops, line wobble) comes from the seeded PRNG in `lib/seed.ts` and is rounded to two decimal places by `fixed()`, because these numbers land straight into server-rendered SVG attributes and `Math.random`, `Math.pow` and `Math.sin` are not bit-identical between Node's V8 and the browser. Never use `Math.random()` in render.

### Named Rules

**The One Motion Rule.** The set has one motion vocabulary: ink drawing itself on. No parallax, no scale-on-hover, no fade-up-and-slide as a general-purpose entrance, no particle field, no 3D scene. If a new element needs to animate, it draws.

**The One Plotter Speed Rule.** Draw duration is derived from measured path length at ~900 units/sec, clamped 0.5–2.4s. Never hand-set a draw duration — a set where one line draws faster than another has two plotters.

**The Full Gate Rule.** Any attribute a timeline animates from a hidden start must appear in _both_ the `:root.js` pre-paint block and the reduced-motion block of `styles/globals.css`. Adding a new animated attribute family is a two-line stylesheet change, not just a component change, and skipping either line ships a bug that never throws.

**The One Owner Rule.** One property, one tween. A scrubbed tween captures its start value at creation time and, as the last renderer, pins the property there — so if CSS or another tween also owns that property, the scrubbed one wins and it may have captured the wrong value. Sheet 02's symptom list was the case: its `<li>`s carried `data-reveal` _and_ `data-symptom`, the scrubbed `[data-symptom]` tween read the stylesheet's pre-reveal `opacity: 0`, and an entire schedule went invisible on desktop. The fix is both halves — drop the second attribute so only one tween touches opacity, and use `fromTo` so the tween states both ends instead of reading whatever it happens to find. Never let an element carry two attributes that animate the same property, and always write a scrubbed opacity tween as `fromTo`.

**The Held-Not-Hidden Rule.** Data the studio does not have is displayed as held or stamped illustrative. It is never quietly omitted, and it is never filled with a plausible invention.

## Do's and Don'ts

### Do:

- **Do** print everything in one ink (`ink-700`), and reach for a heavier rule or a different ground when you need separation.
- **Do** keep `ink-300` at #5a5199 and `redline` at #a82a15. They are contrast-solved (4.62:1 and 4.71:1 on the standard ground) and their predecessors failed AA at 2.83:1 and 3.69:1.
- **Do** render the brand mark in ink. `brand-source/BRAND.md` binds violet to dark grounds only, and this ground is a whiteprint.
- **Do** build containers as sheets, ruled schedules, or title-block field grids.
- **Do** replace a wide drawing below md/lg with a list or stacked field blocks carrying the same content.
- **Do** put an engraved label above every value, and type every number in the measure face with tabular figures.
- **Do** reach for one of the four named small-type steps — `.note` (14px), `.note-fine` (13px), `.field` (11px), `.field-sm` (10px) — instead of writing a `text-[…]` literal. If none fits, fold the need up into the step above rather than adding a fifth.
- **Do** keep `.note-fine` declared after `.note` in `styles/globals.css`. Same cascade layer, last one wins, and the fine print has to be the winner.
- **Do** keep the `ISSUE_REGISTER` **true**. Every row must remain checkable against `PRODUCT.md` — the register's entire authority is that all of it is verifiable. As shipped, all four rows check out: the three held rows correspond exactly to PRODUCT.md's unsupplied client names, placeholder case-study metrics, and undecided contact route.
- **Do** animate by drawing, using `drawLines` on `[data-draw]` paths — and only call it in a sheet that actually has some, since it measures nodes rather than guarding for their absence.
- **Do** keep both gates on all five animated families — `[data-reveal]`, `[data-arrival]`, `[data-callout]`, `[data-letter] > span`, `[data-draw]` — in both the `:root.js` block and the reduced-motion block.
- **Do** write a scrubbed opacity tween as `fromTo` with both ends stated, and make sure exactly one tween owns any given property on any given node.
- **Do** seed any randomness through `lib/seed.ts` and round it with `fixed()`.

### Don't:

- **Don't** invert the ground to a dark field or reintroduce a dark hero. A cyanotype is the _other_, abandoned process; this is a diazo whiteprint.
- **Don't** lighten `ink-300` or `redline` for prettiness, and don't restore the drafted #5B3FD9 plate or #C4331C red pencil — they measure 4.49:1 and 3.69:1 and fail AA for small text. The direction contract names them as rejected and says so.
- **Don't** recolour the brand mark to `#8B5CF6`.
- **Don't** introduce cards. A card grid in this system is a regression, and so is any lifted, rounded, or shadowed content box.
- **Don't** add a `box-shadow`, a `border-radius`, a gradient, a blur, or a `backdrop-filter` anywhere.
- **Don't** use red pencil decoratively. It marks corrections, the current revision, and held data — nothing else.
- **Don't** rebuild the revision cloud with a CSS `repeating-radial-gradient` mask. It renders as a dashed rectangle; it was tried and removed.
- **Don't** put a wide drawing in a horizontal scroll box, and don't shrink one to illegibility. `overflow-x-auto` currently appears nowhere in the codebase — keep it that way.
- **Don't** invent a dated or superseded revision for the issue register, and don't add a second motion vocabulary.
- **Don't** hand-set a draw duration, and don't move the `js` flag out of the blocking inline script.
- **Don't** write a `text-[…]` size literal, and don't move `.note-fine` above `.note` in the stylesheet — the fine print silently jumps to 14px.
- **Don't** animate a new attribute family from JS without adding it to both gate blocks, and don't let two tweens own the same property on the same node.
- **Don't** remove `RevisionCloud`'s 8px path inset. Without it the arcs are sliced flush at the viewport edge on a phone.
- **Don't** extend `ui/scrollbar`, `ui/RichTextEditor`, `ui/VisuallyHiddenInput` or `ui/Logo` — they are dead template scaffold, not part of this system.

## Known Inconsistencies

Recorded rather than smoothed over, so a future pass fixes them deliberately instead of "correcting" the system around them.

1. **`.cloud::after` in the reduced-motion block targets nothing.** No `.cloud` class exists — not even a base rule, only this override. It is a leftover from the removed CSS-mask cloud. Safe to delete.
2. **The sheet header is duplicated.** Sheet 01 re-implements `Sheet`'s printed strip nearly verbatim to get a full-bleed frame. The shared header block (`flex flex-wrap items-end justify-between gap-6` + headline + note) is also copy-pasted across five sheets with no `SheetHead` component.
3. **Motion scroll-starts are unscaled.** `drawLines` is called from six sheets with six different start values (`top 68%`, `70%`, `72%`, `76%`, `80%`, `92%`) and no shared scale — and the `80%` one restates the function's own default, so it is a redundant argument. `revealChildren` uses its `78%` default everywhere except sheet 05, which passes `85%`. The values look hand-tuned per sheet rather than derived, so there is nothing to check a new sheet against.
4. **The breakpoint for "this drawing is too wide" is inconsistent** — `md` on sheets 01, 03 and 07, but `lg` on sheet 04. And two substantial drawings are ungated entirely: sheet 02's 1200×430 survey (its wrapper is the `[data-survey]` ScrollTrigger target, not a breakpoint gate) and sheet 05's 620×400 detail drawing, which sits inside a padding-only `lg:pt-8` wrapper. Both compress at 390px, which is the decision sheets 01/03/04/07 explicitly refuse. Unresolved.
5. **Type sizes still bypass the ramp in three places.** The four named steps cover the small scale cleanly now, but `text-[0.6875rem]` survives ×16 (measure-face text that wants `.field`'s size without its uppercase and tracking — arguably a fifth step wanting a name), `text-[0.875rem]` once in sheet 01, and the headline clamp is copy-pasted as `text-[clamp(1.5rem,2.6vw,2.5rem)]` ×8 with three further one-off clamps (`2rem/5vw/4.25rem` on sheet 10, `1.875rem/4.6vw/4.25rem` on sheet 01, `1.375rem/2.2vw/2rem` on sheet 05). The headline clamp in particular is the single most-repeated literal in the codebase and has no class. The colour layer, by contrast, is clean: `components/` and `ui/` contain **zero** hardcoded hex, and the only stray on the page is `theme-color="#D6D2E2"` in `pages/index.tsx`, duplicating `print-200` by hand.
6. **Stale prose in two places.** `components/site/Wordmark.tsx`'s docstring says "the symbol carries the accent", which the code below it contradicts with an explicit `fill-ink-700` and a comment explaining why. And `CASE_STUDIES` in `json/site/content.ts` still carries `accent: "#8B5CF6"` / `#A855F7` / `#7C3AED` / `#C4B5FD` fields from the previous visual world; nothing reads them.
7. **`print-050`, `print-400` and `redline-soft` are declared but effectively unused.** `redline-soft` measures 2.63:1 on ground and is not safe for text if someone reaches for it.

## Detector Note

`.impeccable/config.json` waives the `ai-color-palette` detector rule with a written reason: violet is a binding brand commitment documented in `brand-source/BRAND.md`, not a defaulted palette, and in the Revision Set world it is the diazo ink the whole page is drawn in. **Do not desaturate the site to satisfy that rule.** The waiver is deliberate and should survive.
