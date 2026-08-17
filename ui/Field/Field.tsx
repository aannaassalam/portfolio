import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

/**
 * A title-block field: a letterspaced label with its value beneath.
 *
 * This is the fixed-plate discipline the round donated from Box Stacks — the
 * same fields in the same order every time, so a reader browses by label
 * rather than by prose. It is used for sheet metadata, service capabilities,
 * case-study figures and the contact block alike, which is why it also owns
 * the two states a drawing has for data it does not have: `held` for a value
 * still to be issued, and `illustrative` for one that is not yet real.
 */
export default function Field({
  label,
  value,
  children,
  /** Data not yet issued. Shows as a hatched HOLD rather than being omitted. */
  held = false,
  /** Real-looking figure that is not substantiated. Stamped as such. */
  illustrative = false,
  className,
  valueClassName
}: {
  label: string;
  value?: ReactNode;
  children?: ReactNode;
  held?: boolean;
  illustrative?: boolean;
  className?: string;
  valueClassName?: string;
}) {
  return (
    <div className={cx("min-w-0", className)}>
      <dt className="field">{label}</dt>
      <dd
        className={cx(
          "mt-1.5 font-measure text-sm text-ink-900",
          held && "held px-1.5 py-0.5",
          valueClassName
        )}
      >
        {held ? "HOLD" : (children ?? value)}
      </dd>
      {illustrative && (
        <p className="mt-2">
          <span className="illustrative">
            <span aria-hidden>△</span> Illustrative
          </span>
        </p>
      )}
    </div>
  );
}
