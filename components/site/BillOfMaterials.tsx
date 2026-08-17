import { useState } from "react";
import { SHEETS, TECHNOLOGIES, TECH_EDGES } from "@/json/site/content";
import { drawLines, revealChildren, useGsapScope } from "@/lib/motion";
import { cx } from "@/lib/utils";
import Sheet from "@/ui/Sheet/Sheet";

const SHEET = SHEETS[3];
const VIEW = { w: 1080, h: 560 };

const at = (i: number) => ({
  x: TECHNOLOGIES[i].x * VIEW.w,
  y: TECHNOLOGIES[i].y * VIEW.h
});

/**
 * A bill of materials with its connection diagram — a parts list where every
 * part carries an item number, and a wiring diagram showing what is connected
 * to what.
 *
 * The point of the section was never that the studio can name twelve
 * technologies; it is that they are wired together. So the list and the
 * diagram share item numbers and one hover state: pointing at a row lights its
 * part and every connection running out of it.
 */
export default function BillOfMaterials() {
  const [focused, setFocused] = useState<number | null>(null);

  const scope = useGsapScope<HTMLDivElement>(({ scope }) => {
    revealChildren(scope);
    drawLines(scope, { start: "top 72%" });
  }, []);

  const linked = (i: number) =>
    focused !== null &&
    (focused === i ||
      TECH_EDGES.some(
        ([a, b]) => (a === focused && b === i) || (b === focused && a === i)
      ));

  return (
    <div ref={scope}>
      <Sheet meta={SHEET} className="bg-print-100">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h3
            className="lettering max-w-[22ch] text-[clamp(1.5rem,2.6vw,2.5rem)]"
            data-reveal
          >
            Built on technology that moves.
          </h3>
          <p className="note max-w-[38ch] note-fine" data-reveal>
            We pick tools for how well they hold up in year three, not how they
            look in a launch post.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[22rem_1fr] lg:gap-14">
          {/* The parts list. This is the content; the diagram annotates it. */}
          <ol className="border-t border-ink-700">
            {TECHNOLOGIES.map((tech, i) => (
              <li key={tech.name}>
                <button
                  type="button"
                  onMouseEnter={() => setFocused(i)}
                  onMouseLeave={() => setFocused(null)}
                  onFocus={() => setFocused(i)}
                  onBlur={() => setFocused(null)}
                  className={cx(
                    "flex min-h-11 w-full items-baseline gap-4 border-b border-ink-700/25 py-2.5 text-left transition-colors duration-300",
                    focused === i ? "bg-print-200" : "hover:bg-print-200/60"
                  )}
                >
                  <span
                    className={cx(
                      "font-measure text-[0.6875rem] transition-colors duration-300",
                      focused === i ? "text-redline" : "text-ink-300"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="lettering text-sm tracking-[0.06em]">
                    {tech.name}
                  </span>
                  <span className="ml-auto font-measure text-[0.6875rem] text-ink-500">
                    {tech.note}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          {/* Connection diagram. Hidden below lg: at that width the parts list
              alone carries every fact, and a cramped diagram carries none. */}
          <div className="hidden lg:flex lg:items-center">
            <svg
              viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
              className="h-auto w-full"
              aria-hidden
            >
              {TECH_EDGES.map(([a, b]) => {
                const from = at(a);
                const to = at(b);
                const lit =
                  focused !== null && (a === focused || b === focused);
                return (
                  <path
                    key={`${a}-${b}`}
                    d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
                    stroke={
                      lit ? "var(--color-redline)" : "var(--color-ink-700)"
                    }
                    strokeWidth={lit ? 1.5 : 0.7}
                    strokeOpacity={lit ? 0.95 : 0.28}
                    fill="none"
                    className="transition-all duration-300"
                    data-draw
                  />
                );
              })}

              {TECHNOLOGIES.map((tech, i) => {
                const p = at(i);
                const on = focused === null || linked(i);
                return (
                  <g
                    key={tech.name}
                    className="transition-opacity duration-300"
                    opacity={on ? 1 : 0.25}
                  >
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="13"
                      fill="var(--color-print-100)"
                      stroke={
                        focused === i
                          ? "var(--color-redline)"
                          : "var(--color-ink-700)"
                      }
                      strokeWidth={focused === i ? 1.8 : 1}
                    />
                    <text
                      x={p.x}
                      y={p.y + 4}
                      textAnchor="middle"
                      className="font-measure"
                      fontSize="10.5"
                      fill="var(--color-ink-700)"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </Sheet>
    </div>
  );
}
