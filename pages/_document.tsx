import { Html, Head, Main, NextScript } from "next/document";

/**
 * The `js` class is set by a blocking inline script rather than from React.
 * It has to land before the first paint, and it has to be absent when
 * scripting is unavailable — styles/globals.css hides scroll-revealed elements
 * and holds the linework undrawn behind `:root.js`, so that flag is the only
 * thing standing between a no-JS visitor and a permanently blank page.
 */
const MARK_JS = "document.documentElement.classList.add('js')";

/**
 * The direction contract, emitted into the built markup so it can be audited
 * after a production build rather than trusted. React cannot render a comment
 * node, so it rides inside an inert hidden div; the comment itself is what
 * survives into the HTML and what `grep e29fbff2` finds.
 */
const CONTRACT = `<!--
  DIRECTION CONTRACT — synkinnovations.in

  THESIS: The page is one revision-controlled drawing set; issuing changes
  cheaply is the product. Refuses this category's dark hero, gradient accent
  and particle field.

  OWN-WORLD: Diazo whiteprint, never cyanotype. Ground #D6D2E2, ink #2E2378,
  solid #4F31C4 plates with knocked-out lettering, #A82A15 red pencil (both
  darkened from the drafted #5B3FD9 / #C4331C, which measured 4.49:1 and
  3.69:1 on this ground and failed AA for small text — do not restore). Sheet
  borders, registration marks, drafting grid, leader lines, callout bubbles,
  revision triangles and clouds. Archivo Narrow caps lettering, Lekton for
  every measurement. No cards, no shadows.

  STORY: A CTO and a founder both see a studio that draws whole systems and
  reissues them cheaply; they act by stamping the issue block.

  FIRST VIEWPORT: Sheet 01, full bleed. The drawing area holds the six
  architecture layers as a sectioned assembly at drawing scale, leader lines
  to numbered callouts. "WE BUILD WHAT COMES NEXT." lettered in the drawing
  area. Revision column at the right edge. Title block bottom-right, a violet
  plate; the primary action is its ISSUE stamp.

  FORM: Revision Set, candidate 1 of 7, taken as the pick over the assigned
  Mimic Panel; seed e29fbff2.

  FINISH: unreviewed and undocumented is unfinished; this build ends with the
  finish review, the verdict, DESIGN.md, and every shipping raster carrying
  its provenance
-->`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: MARK_JS }} />
        <link rel="icon" href="/brand/synk-favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/brand/synk-favicon.svg" />
      </Head>
      <body className="antialiased">
        <div hidden dangerouslySetInnerHTML={{ __html: CONTRACT }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
