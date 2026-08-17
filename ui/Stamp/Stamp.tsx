import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/utils";

interface StampProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  /**
   * `issue` is the inked rubber stamp: a solid plate, the page's primary
   * action. `pending` is the unissued outline — same geometry, no ink yet.
   */
  variant?: "issue" | "pending";
  /** Printed above the stamp text, the way a real stamp carries its status. */
  overline?: string;
}

/**
 * The primary action is a drawing-office issue stamp, not a button.
 *
 * This is the one element the direction contract names as signature material,
 * so it gets the treatment rather than a border trick: a rotated plate with
 * knocked-out lettering, a hairline keyline inset from the edge the way a
 * real stamp's frame sits inside its own impression, and on press it rocks
 * down onto the paper instead of lifting off it — nothing on a drawing board
 * ever floated.
 */
export default function Stamp({
  href,
  children,
  variant = "issue",
  overline,
  className,
  ...props
}: StampProps) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const Tag = external ? "a" : Link;

  return (
    <Tag
      href={href}
      className={cx(
        "group relative inline-flex min-h-11 -rotate-1 flex-col justify-center px-6 py-3 transition-transform duration-300 ease-draw",
        "hover:-rotate-0 active:scale-[0.98]",
        variant === "issue"
          ? "bg-plate text-knock"
          : "border-2 border-redline text-redline",
        className
      )}
      {...(external
        ? {
            rel: "noreferrer",
            target: href.startsWith("http") ? "_blank" : undefined
          }
        : {})}
      {...props}
    >
      {/* The stamp's inner keyline. Inset, hairline, same colour as the ink. */}
      <span
        aria-hidden
        className={cx(
          "pointer-events-none absolute inset-0.75 border",
          variant === "issue" ? "border-knock/35" : "border-redline/45"
        )}
      />
      {overline && (
        <span
          className={cx(
            "relative field-sm leading-none tracking-[0.2em]",
            variant === "issue" ? "field-knock" : "text-redline/80"
          )}
        >
          {overline.toUpperCase()}
        </span>
      )}
      {/* The colour is stated here, not inherited: `.lettering` carries the
          print's ink, and on a solid plate that ink is only ~2.5:1 against the
          field. Knocked-out lettering is the whole point of a stamp. */}
      <span
        className={cx(
          "lettering relative text-base tracking-[0.06em]",
          variant === "issue" ? "text-knock" : "text-redline",
          overline && "mt-1.5"
        )}
      >
        {children}
      </span>
    </Tag>
  );
}
