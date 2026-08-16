import { useMemo } from "react";
import { seededRandom } from "@/lib/three/formations";

const W = 640;
const H = 440;

/**
 * Procedural project visual. Case studies need a picture, and stock imagery
 * or fake dashboard screenshots would both be lies — so each panel draws an
 * abstract of its own system instead, seeded per project.
 */
export default function ProjectVisual({
  accent,
  seed,
  className
}: {
  accent: string;
  seed: number;
  className?: string;
}) {
  const { bars, series, nodes } = useMemo(() => {
    const rand = seededRandom(seed * 7919);

    // Math.pow/sin aren't bit-identical between Node's V8 and the browser's,
    // and these land straight in SSR'd attributes — round, or hydration warns.
    const fixed = (n: number) => Math.round(n * 100) / 100;

    const bars = Array.from({ length: 22 }, (_, i) => ({
      x: 56 + i * 24,
      height: fixed(20 + Math.pow(rand(), 1.6) * 150)
    }));

    const series = Array.from({ length: 26 }, (_, i) => {
      const t = i / 25;
      const y = 300 - (t * 90 + Math.sin(t * 7 + seed) * 26 + rand() * 14);
      return `${fixed(56 + t * 528)},${fixed(y)}`;
    }).join(" ");

    const nodes = Array.from({ length: 7 }, () => ({
      x: fixed(70 + rand() * 500),
      y: fixed(340 + rand() * 70),
      r: fixed(2 + rand() * 3)
    }));

    return { bars, series, nodes };
  }, [seed]);

  const id = `pv-${seed}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label="Abstract visualisation of the project's system"
    >
      <defs>
        <linearGradient id={`${id}-bar`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={accent} stopOpacity="0.05" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={W} height={H} rx="18" fill="#0B0B0F" />
      <circle cx={W * 0.72} cy={H * 0.2} r={190} fill={`url(#${id}-glow)`} />

      {/* Baseline grid */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1="40"
          x2={W - 40}
          y1={80 + i * 56}
          y2={80 + i * 56}
          stroke="#1F1F28"
          strokeWidth="1"
        />
      ))}

      {bars.map((bar) => (
        <rect
          key={bar.x}
          x={bar.x}
          y={304 - bar.height}
          width="10"
          height={bar.height}
          rx="2"
          fill={`url(#${id}-bar)`}
        />
      ))}

      <polyline
        points={series}
        fill="none"
        stroke={accent}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.9"
      />

      {nodes.map((node, i) => (
        <circle
          key={i}
          cx={node.x}
          cy={node.y}
          r={node.r}
          fill={accent}
          opacity="0.7"
        />
      ))}
      <line
        x1="40"
        x2={W - 40}
        y1="376"
        y2="376"
        stroke={accent}
        strokeWidth="1"
        strokeOpacity="0.25"
      />

      {/* Foreground panel, slightly detached — depth without a drop shadow. */}
      <rect
        x="40"
        y="40"
        width="200"
        height="76"
        rx="8"
        fill="#101014"
        stroke="#1F1F28"
      />
      <rect
        x="58"
        y="62"
        width="88"
        height="6"
        rx="3"
        fill={accent}
        opacity="0.8"
      />
      <rect x="58" y="80" width="150" height="4" rx="2" fill="#1F1F28" />
      <rect x="58" y="92" width="120" height="4" rx="2" fill="#1F1F28" />

      <rect
        x="1"
        y="1"
        width={W - 2}
        height={H - 2}
        rx="18"
        fill="none"
        stroke="#1F1F28"
      />
    </svg>
  );
}
