import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Builds a genuine revision cloud: a closed path of outward-bulging arcs
 * around a rectangle, walked clockwise so every scallop bulges away from the
 * content it encircles.
 *
 * The first attempt at this was a CSS `repeating-radial-gradient` mask on a
 * border, which is the trick that looks right in a stylesheet and renders as a
 * dashed rectangle with square corners — no convex arcs at all. A cloud is
 * arcs, so it has to be drawn as arcs.
 *
 * The radius is deliberately larger than half the chord: at exactly half you
 * get semicircles that read as a scalloped edge, and a drawing office cloud is
 * fatter than that.
 */
function cloudPath(
  outerW: number,
  outerH: number,
  pitch: number,
  inset: number
) {
  const w = outerW - inset * 2;
  const h = outerH - inset * 2;
  if (w < 8 || h < 8) return "";
  const count = (len: number) => Math.max(2, Math.round(len / pitch));
  const arc = (r: number, x: number, y: number) =>
    `A ${r.toFixed(2)} ${r.toFixed(2)} 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)}`;

  const nx = count(w);
  const sx = w / nx;
  const rx = (sx / 2) * 1.22;
  const ny = count(h);
  const sy = h / ny;
  const ry = (sy / 2) * 1.22;

  const X = (v: number) => v + inset;
  const Y = (v: number) => v + inset;
  const parts = [`M ${X(0)} ${Y(0)}`];
  for (let i = 1; i <= nx; i++) parts.push(arc(rx, X(i * sx), Y(0)));
  for (let i = 1; i <= ny; i++) parts.push(arc(ry, X(w), Y(i * sy)));
  for (let i = 1; i <= nx; i++) parts.push(arc(rx, X(w - i * sx), Y(h)));
  for (let i = 1; i <= ny; i++) parts.push(arc(ry, X(0), Y(h - i * sy)));
  parts.push("Z");
  return parts.join(" ");
}

/**
 * The SVG sits PAD outside the container, and the path is drawn BULGE inside
 * the SVG, so the outermost arc tip lands only (PAD − BULGE) beyond the box.
 * Without that inset the arcs bulged a full radius past the container and were
 * sliced flush at the viewport edges on a phone, leaving half-arc nubs down
 * both sides where the cloud's vertical runs should be.
 */
const PAD = 14;
const BULGE = 8;

/**
 * Drop inside a `relative` container to cloud it. Measures the container so the
 * scallop pitch stays constant instead of stretching with the box — a cloud
 * whose bumps distort at wide viewports is the same failure as the mask.
 */
export default function RevisionCloud({ label }: { label?: string }) {
  const host = useRef<HTMLSpanElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const parent = host.current?.parentElement;
    if (!parent) return;
    const observer = new ResizeObserver(() => {
      const r = parent.getBoundingClientRect();
      setBox({ w: Math.round(r.width), h: Math.round(r.height) });
    });
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  const w = box.w + PAD * 2;
  const h = box.h + PAD * 2;
  const d = useMemo(() => cloudPath(w, h, 26, BULGE), [w, h]);

  return (
    <span
      ref={host}
      aria-hidden
      className="pointer-events-none absolute"
      style={{ inset: `-${PAD}px` }}
    >
      {d && (
        <svg
          viewBox={`0 0 ${w} ${h}`}
          width={w}
          height={h}
          className="absolute left-0 top-0 overflow-visible"
        >
          <path
            d={d}
            fill="none"
            stroke="var(--color-redline)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {label && (
        <span className="field absolute -top-2 left-7 bg-print-200 px-1.5 text-redline">
          {label}
        </span>
      )}
    </span>
  );
}
