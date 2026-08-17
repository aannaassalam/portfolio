import { ARCHITECTURE, BOUNDARIES, SHEETS } from "@/json/site/content";
import { drawLines, gsap, revealChildren, useGsapScope } from "@/lib/motion";
import Sheet from "@/ui/Sheet/Sheet";

const SHEET = SHEETS[6];
const VIEW = { w: 1200, h: 700 };

/** Storey heights, thickest at the bottom, the way a real section stacks. */
const STOREY = [78, 84, 78, 96, 92, 118];

/**
 * A section through the whole system.
 *
 * Sheet 01 already names the six layers, so this sheet is not allowed to just
 * redraw them — a section is worth issuing only if it shows the JUNCTIONS. So
 * the subject here is the five boundaries between the layers: what crosses
 * each one and what guarantee holds it. The riser is the one line touching all
 * six, and each junction is tapped where the boundary actually sits.
 */
export default function SectionThroughSystem() {
  const levels = ARCHITECTURE.layers
    .map((layer, i) => {
      const h = STOREY[i];
      const y = VIEW.h - 60 - STOREY.slice(0, i + 1).reduce((a, b) => a + b, 0);
      // Item numbers match sheet 01's callouts; the storeys still stack from
      // the ground up, which is how a section is drawn.
      return { ...layer, h, y, n: String(i + 1).padStart(2, "0") };
    })
    .reverse();

  const scope = useGsapScope<HTMLDivElement>(({ scope }) => {
    revealChildren(scope);
    // drawLines measures and draws every [data-draw] path, the riser included;
    // its greater length makes it finish last on its own.
    drawLines(scope, { start: "top 68%" });
  }, []);

  return (
    <div ref={scope}>
      <Sheet meta={SHEET}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16">
          <div>
            <h3
              className="lettering max-w-[20ch] text-[clamp(1.5rem,2.6vw,2.5rem)]"
              data-reveal
            >
              {ARCHITECTURE.headline.join(" ")}
            </h3>
            <p className="note mt-5" data-reveal>
              {ARCHITECTURE.body}
            </p>

            {/* The junctions. This is the information sheet 01 does not
                carry, and the reason this section is issued at all. */}
            <dl className="mt-9 border-t border-ink-700/30">
              {BOUNDARIES.map((boundary, i) => (
                <div
                  key={boundary.between}
                  className="grid gap-1 border-b border-ink-700/25 py-3.5"
                  data-reveal
                >
                  <dt className="flex items-baseline gap-3">
                    <span className="font-measure text-[0.6875rem] text-redline">
                      J{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="lettering text-sm tracking-[0.06em]">
                      {boundary.between}
                    </span>
                  </dt>
                  <dd className="note pl-9 note-fine">{boundary.detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <svg
              viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
              className="hidden h-auto w-full md:block"
              role="img"
              aria-label="A section through six stacked system storeys, tied together by a single vertical service riser."
            >
              {/* Ground line, heavier than everything above it. */}
              <path
                d={`M 60 ${VIEW.h - 60} L ${VIEW.w - 60} ${VIEW.h - 60}`}
                stroke="var(--color-ink-700)"
                strokeWidth="2"
                fill="none"
              />
              {/* Ground hatch. */}
              <path
                d={Array.from({ length: 46 }, (_, i) => {
                  const x = 60 + i * 24;
                  return `M ${x} ${VIEW.h - 60} L ${x - 14} ${VIEW.h - 40}`;
                }).join(" ")}
                stroke="var(--color-ink-700)"
                strokeOpacity="0.35"
                strokeWidth="0.8"
                fill="none"
              />

              {levels.map((level) => (
                <g key={level.name}>
                  {/* Slab: the cut member, hatched. */}
                  <rect
                    x="150"
                    y={level.y}
                    width={VIEW.w - 420}
                    height="10"
                    fill="var(--color-ink-700)"
                    fillOpacity="0.5"
                  />
                  {/* Storey volume. */}
                  <rect
                    x="150"
                    y={level.y + 10}
                    width={VIEW.w - 420}
                    height={level.h - 10}
                    fill="var(--color-plate)"
                    fillOpacity="0.045"
                    stroke="var(--color-ink-700)"
                    strokeWidth="0.9"
                    data-draw
                  />

                  {/* Level datum: a triangle on the left with its height. */}
                  <path
                    d={`M 96 ${level.y + 5} l 14 -7 l 0 14 Z`}
                    fill="var(--color-ink-700)"
                  />
                  <path
                    d={`M 110 ${level.y + 5} L 150 ${level.y + 5}`}
                    stroke="var(--color-ink-500)"
                    strokeWidth="0.7"
                    strokeDasharray="3 3"
                  />
                  <text
                    x="92"
                    y={level.y + 2}
                    textAnchor="end"
                    className="font-measure"
                    fontSize="10.5"
                    fill="var(--color-ink-500)"
                  >
                    +{VIEW.h - 60 - level.y}
                  </text>

                  {/* Storey name, lettered inside the volume. */}
                  <text
                    x="176"
                    y={level.y + level.h / 2 + 8}
                    className="lettering"
                    fontSize="18"
                    fill="var(--color-ink-700)"
                    letterSpacing="1.4"
                  >
                    {level.name}
                  </text>
                  <text
                    x={VIEW.w - 290}
                    y={level.y + level.h / 2 + 6}
                    textAnchor="end"
                    className="font-measure"
                    fontSize="11"
                    fill="var(--color-ink-500)"
                  >
                    {level.note}
                  </text>
                </g>
              ))}

              {/* The service riser: one line touching all six storeys. */}
              <path
                data-riser
                d={`M ${VIEW.w - 250} ${VIEW.h - 60} L ${VIEW.w - 250} ${levels[0].y}`}
                stroke="var(--color-redline)"
                strokeWidth="2.2"
                fill="none"
                data-draw
              />
              {/* A tap at each junction, numbered to match the schedule at
                  the left. The junction sits on the slab between two storeys,
                  not in the middle of one. */}
              {levels.slice(0, -1).map((level, i) => {
                const j = levels.length - 2 - i;
                return (
                  <g key={`junction-${level.name}`}>
                    <circle
                      cx={VIEW.w - 250}
                      cy={level.y}
                      r="5.5"
                      fill="var(--color-print-200)"
                      stroke="var(--color-redline)"
                      strokeWidth="1.6"
                    />
                    <text
                      x={VIEW.w - 236}
                      y={level.y + 4}
                      className="font-measure"
                      fontSize="10.5"
                      fill="var(--color-redline)"
                      letterSpacing="0.8"
                    >
                      J{String(j + 1).padStart(2, "0")}
                    </text>
                  </g>
                );
              })}
              <text
                x={VIEW.w - 238}
                y={levels[0].y - 12}
                className="font-measure"
                fontSize="11"
                fill="var(--color-redline)"
                letterSpacing="1.4"
              >
                ONE SYSTEM
              </text>
            </svg>

            {/* Below md the levels list above is the whole content, so the
                drawing is simply absent rather than shrunk to illegibility. */}
          </div>
        </div>
      </Sheet>
    </div>
  );
}
