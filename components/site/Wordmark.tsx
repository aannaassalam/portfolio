import Link from "next/link";
import { BRAND } from "@/json/site/content";
import { LOCKUP, MARK, WORDMARK } from "@/json/site/logo";
import { cx } from "@/lib/utils";

const [, , MASTER] = MARK.viewBox.split(" ").map(Number);
const markScale = LOCKUP.markSize / (2 * MARK.extent);
const wordY = (LOCKUP.markSize - WORDMARK.cap) / 2;

/**
 * The horizontal lockup, rendered from the master geometry in
 * `json/site/logo.ts` — the same coordinates that produce every SVG in
 * `public/brand/`. The symbol carries the accent; the logotype inherits the
 * surface colour.
 */
export default function Wordmark({
  className,
  markOnly = false
}: {
  className?: string;
  /** Just the aperture, for tight spaces. */
  markOnly?: boolean;
}) {
  const width = markOnly
    ? LOCKUP.markSize
    : LOCKUP.markSize + LOCKUP.gap + WORDMARK.width;

  return (
    <Link
      href="#top"
      className={cx("inline-flex min-h-11 items-center text-chalk", className)}
      aria-label={`${BRAND.name} — home`}
    >
      <svg
        viewBox={`0 0 ${width} ${LOCKUP.markSize}`}
        className="h-7 w-auto"
        role="img"
        aria-hidden
      >
        {/* Master symbol is authored centred on a 1000-unit canvas, so it is
            scaled about its own centre and then placed. */}
        <g
          className="fill-violet-400"
          fillRule="nonzero"
          transform={
            `translate(${LOCKUP.markSize / 2} ${LOCKUP.markSize / 2}) ` +
            `scale(${markScale}) translate(${-MASTER / 2} ${-MASTER / 2})`
          }
        >
          {MARK.polygons.map((points) => (
            <polygon key={points} points={points} />
          ))}
        </g>

        {!markOnly && (
          <g
            transform={`translate(${LOCKUP.markSize + LOCKUP.gap} ${wordY})`}
            fill="none"
            stroke="currentColor"
            strokeWidth={WORDMARK.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {WORDMARK.paths.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        )}
      </svg>
    </Link>
  );
}
