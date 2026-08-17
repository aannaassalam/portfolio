import type { ReactNode } from "react";
import type { Sheet as SheetMeta } from "@/json/site/content";
import { SET } from "@/json/site/content";
import { cx } from "@/lib/utils";

/**
 * One sheet of the set. Every section on the page is one of these, so the
 * frame is the only chrome the site has: a drawn border inset from the trim,
 * registration crosses at the corners, and a printed strip along the top
 * carrying the sheet number and title.
 *
 * A real sheet's frame is heavier than anything drawn inside it, which is what
 * keeps ten of these in a row from reading as ten cards — the border belongs
 * to the paper, not to the content.
 */
export default function Sheet({
  meta,
  children,
  className,
  gridded = true,
  /** The drawing area's own class, so a sheet can go full-bleed if it needs to. */
  bodyClassName
}: {
  meta: SheetMeta;
  children: ReactNode;
  className?: string;
  gridded?: boolean;
  bodyClassName?: string;
}) {
  return (
    <section
      id={meta.id}
      aria-label={`Sheet ${meta.no} — ${meta.title}`}
      className={cx(
        "relative border-t-2 border-ink-700 bg-print-200",
        className
      )}
    >
      <div className="shell relative">
        {/* Registration crosses sit in the frame margin, on the trim line. */}
        <span className="reg left-2 top-2" aria-hidden />
        <span className="reg right-2 top-2" aria-hidden />

        {/* Printed sheet strip. Number, title, and the set reference — the
            same three things in the same order on all ten. */}
        <header className="flex items-baseline gap-4 border-b border-ink-700/40 py-3">
          <span className="font-measure text-xs font-bold tracking-[0.14em] text-plate">
            {meta.no}
          </span>
          <h2 className="lettering text-sm tracking-[0.08em] text-ink-900 sm:text-base">
            {meta.title}
          </h2>
          <span className="field ml-auto hidden sm:block">
            {SET.project} · Rev {SET.revision}
          </span>
        </header>

        <div
          className={cx(
            "relative",
            gridded && "gridded",
            bodyClassName ?? "py-14 md:py-20"
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
