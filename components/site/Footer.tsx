import { BRAND, FOOTER, SET } from "@/json/site/content";
import Wordmark from "./Wordmark";

/**
 * The set's back page: the drawing register. A real set closes with the list of
 * every sheet in it and the revision each one is at, which is exactly what a
 * footer nav is if you let it be one.
 */
export default function Footer() {
  return (
    <footer className="border-t border-ink-700 bg-print-100">
      <div className="shell py-14">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Wordmark />
            <p className="note mt-5 max-w-[28ch] note-fine">{BRAND.tagline}</p>
            <dl className="mt-8 grid max-w-xs grid-cols-2 gap-y-3">
              {(
                [
                  ["Set", `${SET.sheetCount} sheets`],
                  ["Revision", SET.revision],
                  ["Status", SET.status],
                  ["Office", FOOTER.location.split(" · ")[0]]
                ] as const
              ).map(([label, value]) => (
                <div key={label}>
                  <dt className="field">{label}</dt>
                  <dd className="mt-1 font-measure text-xs text-ink-700">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3">
            {FOOTER.columns.map((column) => (
              <div key={column.title}>
                <h2 className="field">{column.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(link.href.startsWith("http")
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                        className="inline-flex min-h-6 items-center font-measure text-xs text-ink-500 transition-colors duration-300 hover:text-ink-900"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-ink-700/30 pt-6">
          <p className="font-measure text-[0.6875rem] text-ink-300">
            © {new Date().getFullYear()} {BRAND.name}. {FOOTER.location}
          </p>
          <a
            href="#top"
            className="inline-flex min-h-6 items-center font-measure text-[0.6875rem] tracking-[0.14em] text-ink-500 transition-colors duration-300 hover:text-ink-900"
          >
            SHEET 01 ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
