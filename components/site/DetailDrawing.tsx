import { useMemo } from "react";
import { fixed, seededRandom } from "@/lib/seed";

const W = 620;
const H = 400;

/**
 * A detail drawing, seeded per project.
 *
 * The previous world put a fake dashboard screenshot here. That was the honest
 * problem with it: a rendered UI implies a real product we cannot show, and a
 * stock photo would be worse. A drawn detail makes no such claim — it is
 * plainly a diagram of a system's shape, dimensioned and annotated, which is
 * exactly what an issued sheet carries when the thing itself is confidential.
 */
export default function DetailDrawing({
  seed,
  className
}: {
  seed: number;
  className?: string;
}) {
  const { blocks, run } = useMemo(() => {
    const rand = seededRandom(seed * 6151);

    // Stacked service blocks of varying span — the system's massing.
    const blocks = Array.from({ length: 5 }, (_, i) => {
      const w = fixed(120 + rand() * 210);
      return {
        x: fixed(96 + rand() * 90),
        y: fixed(74 + i * 52),
        w,
        h: 30,
        // Which blocks are load-bearing gets a heavier line weight.
        heavy: rand() > 0.55
      };
    });

    // A routed connection running down the right, jogging at right angles the
    // way a real service run is drawn — never a diagonal.
    let x = 470;
    let y = 64;
    const seg: string[] = [`M ${x} ${y}`];
    for (let i = 0; i < 6; i++) {
      y = fixed(y + 40 + rand() * 26);
      seg.push(`L ${x} ${y}`);
      x = fixed(x + (rand() > 0.5 ? 34 : -30));
      seg.push(`L ${x} ${y}`);
    }

    return { blocks, run: seg.join(" ") };
  }, [seed]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label="A schematic diagram of the project's system massing and service run, not to scale."
    >
      {/* Sheet inset border for the detail itself. */}
      <rect
        x="1"
        y="1"
        width={W - 2}
        height={H - 2}
        fill="none"
        stroke="var(--color-ink-700)"
        strokeOpacity="0.4"
      />

      {blocks.map((b, i) => (
        <g key={i}>
          <rect
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            fill="var(--color-plate)"
            fillOpacity={b.heavy ? 0.12 : 0.05}
            stroke="var(--color-ink-700)"
            strokeWidth={b.heavy ? 1.4 : 0.8}
            data-draw
          />
          {/* Hatching on the load-bearing blocks, drawn as a real section
              would hatch a cut member. */}
          {b.heavy && (
            <path
              d={Array.from({ length: Math.floor(b.w / 9) }, (_, k) => {
                const sx = b.x + k * 9;
                return `M ${sx} ${b.y + b.h} L ${fixed(sx + b.h)} ${b.y}`;
              }).join(" ")}
              stroke="var(--color-ink-700)"
              strokeOpacity="0.18"
              strokeWidth="0.6"
              fill="none"
              clipPath={`inset(0)`}
            />
          )}
        </g>
      ))}

      {/* The service run. */}
      <path
        d={run}
        fill="none"
        stroke="var(--color-plate)"
        strokeWidth="1.6"
        data-draw
      />

      {/* No dimension string. The massing is schematic and says so below —
          a scale bar under seeded geometry would be a measurement we do not
          have, which is the one thing this world must not fake. */}
      <text
        x="46"
        y={H - 22}
        className="font-measure"
        fontSize="10"
        fill="var(--color-ink-300)"
        letterSpacing="1.4"
      >
        SCHEMATIC · NOT TO SCALE
      </text>

      {/* Detail reference bubble, top-left, as every detail carries. */}
      <circle
        cx="46"
        cy="42"
        r="17"
        fill="none"
        stroke="var(--color-ink-700)"
        strokeWidth="1.1"
      />
      <path
        d="M 29 42 L 63 42"
        stroke="var(--color-ink-700)"
        strokeWidth="0.9"
      />
      <text
        x="46"
        y="38"
        textAnchor="middle"
        className="font-measure"
        fontSize="10"
        fill="var(--color-ink-700)"
      >
        {String(seed).padStart(2, "0")}
      </text>
    </svg>
  );
}
