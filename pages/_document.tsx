import { Html, Head, Main, NextScript } from "next/document";

/**
 * The `js` class is set by a blocking inline script rather than from React.
 * It has to land before the first paint, and it has to be absent when
 * scripting is unavailable — styles/globals.css hides the hero copy and every
 * scroll-revealed element behind `:root.js`, so that flag is the only thing
 * standing between a no-JS visitor and a permanently blank page.
 */
const MARK_JS = "document.documentElement.classList.add('js')";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: MARK_JS }} />
        <link rel="icon" href="/brand/synk-favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/brand/synk-favicon.svg" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
