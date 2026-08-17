---
version: 1
slug: "pages-index-tsx"
primary_target: "pages/index.tsx"
related_targets: []
---

## Scope

The single marketing page at `/`. Visitor mode: **Persuade**.

## Audience and job

A technical buyer (CTO / VP Eng) and a non-technical founder land on the same
page, mid-comparison, with several studio tabs open. Job: decide in minutes
whether this studio can own a whole system, then make contact.

## Action

Primary: reach the contact block and start an enquiry. Secondary: read the
selected work. Note the contact route itself is an open product decision (see
PRODUCT.md) — the page must not invent one.

## Proof and content

Case studies stay the leading proof at the user's instruction, with every
metric visibly marked illustrative until real figures are supplied. No
testimonials, logos or press exist and none may be fabricated.

## Chosen direction

**Revision Set** — the page is one revision-controlled engineering drawing
set. Chosen from the direction round on seed `e29fbff2` as the pick card, over
the assigned Mimic Panel; the user accepted its stated familiarity risk, so
execution carries the burden of refusing the generic blueprint rendition.
Rendered as a **diazo print**, not a cyanotype: cool violet-cast ground,
blue-violet ink, red pencil redlines, printed title blocks. The brand violet
becomes the system's ink rather than an accent.

The ten sections keep their existing order, each becoming a numbered sheet
with a real drawing-set counterpart (general arrangement, as-found survey,
schedule of works, bill of materials, issued sheets, programme, section,
general notes, drawn-by block, issue stamp).

## Memorable moment

**The issue register.** Sheet 01 carries a revision column: numbered triangles,
filled where the set has issued and outlined in red pencil where it is holding.
Every held row is TRUE — client names, project figures, enquiry route — and each
is cross-referenced to the sheet it affects, where a red-pencil revision cloud
surrounds the actual unissued data.

This replaced an earlier "revision scrub" idea and is the more honest version:
the studio's claim is that changes stay cheap, and the register demonstrates it
by pointing at the page's own unissued information rather than animating a
fictional revision history. The finish review's central finding was that the
first build was an _issue_ set rather than a _revision_ set — the register is
what closed that gap.

Rule for future work: never add a dated or superseded revision that did not
happen. The register's authority comes entirely from every row being checkable
against PRODUCT.md.

## Constraints carried in

Brand system and the ten-section order are fixed by the user. Reduced-motion
paths, the skip link and the copy-in-`json/site/content.ts` separation are
existing infrastructure to preserve.

## Built world, in short

Diazo whiteprint on a violet-cast ground; one ink for everything printed; solid
violet plates with knocked-out lettering for title blocks; red pencil reserved
for corrections, held data and current revision. Archivo Narrow caps for
lettering, Archivo for notes, Lekton for every measurement. Ten sheets, heavy
trim, drafting grid, registration marks, leader lines and numbered callouts. No
cards, no shadows, no WebGL. Motion is one thing only: ink drawing itself on,
one plotter speed, measured per path.

Palette tokens are contrast-solved, not picked by eye: ink-300 and redline were
both darkened after measuring 2.83:1 and 3.69:1 against the ground. Do not
lighten them.

## Unresolved

Contact route (form, not the wrong mailto). Real case-study data. Real social
URLs. All recorded in PRODUCT.md as launch blockers, not design decisions — and
all three now appear as held rows in the sheet 01 issue register, so the page
states them rather than hiding them. When each is resolved, remove its register
row and its revision cloud.
