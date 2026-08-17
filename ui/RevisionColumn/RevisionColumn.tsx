import { ISSUE_REGISTER } from "@/json/site/content";
import { cx } from "@/lib/utils";

/**
 * The revision column: numbered triangles down the right edge of the sheet,
 * each naming a revision and its status.
 *
 * This is the element the direction contract's FIRST VIEWPORT block promises,
 * and it is the set's argument made visible. A held row is drawn in red pencil
 * because that is what red pencil is for — it marks what has not been issued
 * yet, and every held row here is a real gap the page is honest about rather
 * than a decorative revision cloud.
 */
export default function RevisionColumn({
  className,
  compact = false
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cx("min-w-0", className)}>
      <p className="field border-b border-ink-700 pb-2">Issue register</p>
      <ol>
        {ISSUE_REGISTER.map((row, i) => {
          const held = row.status === "held";
          return (
            <li
              key={`${row.rev}-${row.item}`}
              className="flex gap-3 border-b border-ink-700/25 py-3"
              data-reveal
            >
              {/* Revision triangle. Filled when issued, outlined when held —
                  the standard way a drawing shows an unissued revision. */}
              <svg
                viewBox="0 0 18 16"
                className="mt-0.5 h-3.5 w-4 shrink-0"
                aria-hidden
              >
                <path
                  d="M 9 1 L 17 15 L 1 15 Z"
                  fill={held ? "none" : "var(--color-ink-700)"}
                  stroke={
                    held ? "var(--color-redline)" : "var(--color-ink-700)"
                  }
                  strokeWidth="1.4"
                />
                <text
                  x="9"
                  y="13"
                  textAnchor="middle"
                  className="font-measure"
                  fontSize="7.5"
                  fill={held ? "var(--color-redline)" : "var(--color-knock)"}
                >
                  {row.rev}
                </text>
              </svg>

              <div className="min-w-0">
                <p
                  className={cx(
                    "lettering text-xs tracking-[0.08em]",
                    held && "text-redline"
                  )}
                >
                  {row.item}
                </p>
                {!compact && (
                  <p className="mt-1 font-measure text-[0.6875rem] leading-snug text-ink-500">
                    {row.note}
                  </p>
                )}
                <p className="mt-1 field-sm tracking-[0.1em] text-ink-300">
                  SH {row.sheets} · {held ? "HELD" : "ISSUED"}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
