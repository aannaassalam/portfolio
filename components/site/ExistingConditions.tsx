import { useMemo, useRef } from "react";
import { PHILOSOPHY, SHEETS } from "@/json/site/content";
import { drawLines, gsap, revealChildren, useGsapScope } from "@/lib/motion";
import { fixed, seededRandom } from "@/lib/seed";
import Sheet from "@/ui/Sheet/Sheet";

const SHEET = SHEETS[1];
const VIEW = { w: 1200, h: 430 };
const COLS = 8;
const ROWS = 4;

/**
 * An as-found survey. Before a drawing office proposes anything it records
 * what is actually there, and the record is deliberately ugly: levels taken
 * wherever they could be taken, not where they would be convenient.
 *
 * So the existing conditions are a scatter of surveyed points, and the
 * proposal is the orthogonal grid drawn over them on scroll. The section's
 * argument is that the system gets mapped before it gets rebuilt, and this is
 * that argument as a drawing rather than a claim about one.
 */
function buildSurvey() {
  const rand = seededRandom(41207);
  return Array.from({ length: COLS * ROWS }, (_, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    return {
      // Surveyed: irregular, as taken on site.
      sx: fixed(70 + rand() * (VIEW.w - 150)),
      sy: fixed(56 + rand() * (VIEW.h - 120)),
      // Proposed: on the grid.
      px: fixed(96 + col * ((VIEW.w - 210) / (COLS - 1))),
      py: fixed(64 + row * ((VIEW.h - 140) / (ROWS - 1)))
    };
  });
}

export default function ExistingConditions() {
  const points = useMemo(() => buildSurvey(), []);
  const marks = useRef<(SVGGElement | null)[]>([]);

  const scope = useGsapScope<HTMLDivElement>(({ scope }) => {
    revealChildren(scope);
    drawLines(scope, { start: "top 70%" });

    // Scrubbed: each surveyed point walks to its proposed position. Staggered
    // by column so the grid resolves left to right, the way a drawing is set
    // out from a datum rather than appearing all at once.
    const state = { p: 0 };
    const place = () => {
      points.forEach((pt, i) => {
        const col = i % COLS;
        const local = gsap.utils.clamp(0, 1, (state.p - col * 0.045) / 0.8);
        const t = gsap.parseEase("power3.inOut")(local);
        const g = marks.current[i];
        if (!g) return;
        g.setAttribute(
          "transform",
          `translate(${fixed(pt.sx + (pt.px - pt.sx) * t)} ${fixed(
            pt.sy + (pt.py - pt.sy) * t
          )})`
        );
        g.style.opacity = String(0.5 + t * 0.5);
      });
    };
    place();

    gsap.to(state, {
      p: 1,
      ease: "none",
      onUpdate: place,
      scrollTrigger: {
        trigger: scope.querySelector("[data-survey]"),
        start: "top 78%",
        end: "bottom 40%",
        scrub: 0.6
      }
    });

    // The as-found annotations recede as the proposal takes over.
    //
    // fromTo, not to: a scrubbed tween captures its start value when it is
    // created, and these items were also carrying `data-reveal`, so the value
    // it captured was the stylesheet's pre-reveal opacity 0. Being the last
    // tween to render, it then pinned them at 0 — a whole schedule of content
    // invisible on desktop and half-faded on mobile. Stating both ends fixes
    // the capture, and the items no longer carry `data-reveal` at all, so this
    // is the only tween that touches their opacity.
    gsap.fromTo(
      scope.querySelectorAll("[data-symptom]"),
      { opacity: 1 },
      {
        opacity: 0.55,
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: scope.querySelector("[data-survey]"),
          start: "top 60%",
          end: "center 45%",
          scrub: 0.6
        }
      }
    );
  }, []);

  return (
    <div ref={scope}>
      <Sheet meta={SHEET} bodyClassName="py-10 md:py-14">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,30rem)_1fr] lg:gap-14">
          <div>
            <h3
              className="lettering max-w-[22ch] text-[clamp(1.5rem,2.6vw,2.5rem)]"
              data-reveal
            >
              {PHILOSOPHY.headline.join(" ")}
            </h3>
            {PHILOSOPHY.body.map((paragraph) => (
              <p key={paragraph} className="note mt-5" data-reveal>
                {paragraph}
              </p>
            ))}

            {/* The as-found defects, as a schedule. This is the carrier at
                every width — the drawing annotates it, never replaces it. */}
            <div className="mt-10 border-t border-ink-700/30 pt-6">
              <p className="field">As found</p>
              <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {PHILOSOPHY.symptoms.map((symptom, i) => (
                  <li
                    key={symptom}
                    data-symptom
                    className="flex gap-3 font-measure text-xs text-ink-500"
                  >
                    <span className="text-redline">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {symptom}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative" data-survey>
            <svg
              viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
              className="h-auto w-full"
              role="img"
              aria-label="An as-found survey of scattered marks resolving onto a proposed setting-out grid."
            >
              {/* Proposed setting-out grid, drawn in ink over the survey. */}
              <g
                stroke="var(--color-ink-700)"
                strokeOpacity="0.45"
                strokeWidth="0.9"
                fill="none"
              >
                {Array.from({ length: COLS }, (_, c) => (
                  <path
                    key={`v${c}`}
                    d={`M ${fixed(96 + c * ((VIEW.w - 210) / (COLS - 1)))} 40 L ${fixed(96 + c * ((VIEW.w - 210) / (COLS - 1)))} ${VIEW.h - 52}`}
                    data-draw
                  />
                ))}
                {Array.from({ length: ROWS }, (_, r) => (
                  <path
                    key={`h${r}`}
                    d={`M 72 ${fixed(64 + r * ((VIEW.h - 140) / (ROWS - 1)))} L ${VIEW.w - 90} ${fixed(64 + r * ((VIEW.h - 140) / (ROWS - 1)))}`}
                    data-draw
                  />
                ))}
              </g>

              {/* Datum, bottom left: every setting-out grid needs one. */}
              <g>
                <path
                  d="M 72 396 l 9 -16 l 9 16 Z"
                  fill="var(--color-redline)"
                />
                <text
                  x="96"
                  y="395"
                  className="font-measure"
                  fontSize="11"
                  fill="var(--color-redline)"
                  letterSpacing="1.4"
                >
                  DATUM
                </text>
              </g>

              {points.map((pt, i) => (
                <g
                  key={i}
                  ref={(node) => {
                    marks.current[i] = node;
                  }}
                  transform={`translate(${pt.sx} ${pt.sy})`}
                >
                  {/* A survey mark: a cross, not a dot. Deliberately carries
                      no level figure — an invented number under a survey
                      cross is a measurement this set has not taken. */}
                  <path
                    d="M -4 0 L 4 0 M 0 -4 L 0 4"
                    stroke="var(--color-plate)"
                    strokeWidth="1.5"
                  />
                </g>
              ))}
            </svg>

            <p
              className="mt-6 flex items-baseline gap-3 border-t border-ink-700/30 pt-4"
              data-reveal
            >
              <span className="field">Proposed</span>
              <span className="lettering text-sm tracking-[0.08em]">
                {PHILOSOPHY.resolvedLabel}
              </span>
            </p>
          </div>
        </div>
      </Sheet>
    </div>
  );
}
