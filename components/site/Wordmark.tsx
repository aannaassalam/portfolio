import Link from "next/link";
import { BRAND } from "@/json/site/content";
import { cx } from "@/lib/utils";

/**
 * Vector wordmark — no raster asset to load, and it inherits currentColor so
 * it works on every surface on the site.
 */
export default function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="#top"
      className={cx(
        "group inline-flex items-center gap-2.5 text-chalk",
        className
      )}
      aria-label={`${BRAND.name} — home`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 text-violet-500 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-90"
        fill="none"
        aria-hidden
      >
        <rect
          x="3.5"
          y="3.5"
          width="17"
          height="17"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.2"
          transform="rotate(45 12 12)"
        />
        <circle cx="12" cy="12" r="3.2" fill="currentColor" />
      </svg>
      <span className="text-[0.9rem] font-medium tracking-[0.16em]">
        {BRAND.mark}
      </span>
    </Link>
  );
}
