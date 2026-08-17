import type { ReactNode } from "react";
import { SET } from "@/json/site/content";
import { cx } from "@/lib/utils";

/**
 * The title block: a solid violet plate with knocked-out lettering, seated in
 * the bottom-right of a sheet the way every drawing standard puts it.
 *
 * This is where the page's colour commits at region scale rather than as an
 * accent — the plate is a field, not a border. The field order is fixed by
 * the set and never varies per sheet, which is the whole point of a title
 * block: you learn where to look once.
 */
export default function TitleBlock({
  sheetNo,
  sheetTitle,
  children,
  className,
  /**
   * One row of six instead of a two-row block. Sheet 01 uses it because at two
   * rows the plate's second row was sliced by the fold, and a title block cut
   * in half by the viewport edge reads as a mistake rather than as an edge.
   */
  strip = false
}: {
  sheetNo: string;
  sheetTitle: string;
  /** The issue stamp, seated inside the plate. */
  children?: ReactNode;
  className?: string;
  strip?: boolean;
}) {
  const fields = [
    ["Project", SET.project],
    ["Drawing", sheetTitle],
    ["Sheet", `${sheetNo} of ${SET.sheetCount}`],
    ["Scale", SET.scale],
    ["Drawn", SET.drawnBy],
    ["Rev", SET.revision]
  ] as const;

  return (
    <div className={cx("bg-plate text-knock", className)}>
      {/* Ruled field grid. The rules are the plate showing through, so they
          read as printed on it rather than drawn over it. */}
      <dl
        className={cx(
          "grid gap-px bg-plate-deep/50",
          strip ? "grid-cols-3 lg:grid-cols-6" : "grid-cols-2 sm:grid-cols-3"
        )}
      >
        {fields.map(([label, value]) => (
          <div key={label} className="bg-plate px-4 py-3">
            <dt className="field field-knock">{label}</dt>
            <dd className="mt-1 font-measure text-sm leading-tight text-knock">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      {children && (
        <div className="border-t border-knock/20 px-4 py-4">{children}</div>
      )}
    </div>
  );
}
