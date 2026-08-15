import type { PointerEvent, ReactNode } from "react";
import { cx } from "@/lib/utils";

/**
 * Card that tracks the cursor with a soft violet wash. Position is written
 * to CSS custom properties on the node, so the effect never re-renders React
 * and costs nothing on touch (no pointermove, no glow).
 */
export default function GlowCard({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  const track = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--x",
      `${event.clientX - rect.left}px`
    );
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      onPointerMove={track}
      className={cx(
        "group relative overflow-hidden border border-ink-700 bg-ink-850/60 p-7 transition-colors duration-500 hover:border-violet-600/50",
        className
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--x, 50%) var(--y, 50%), rgba(139,92,246,0.14), transparent 70%)"
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
