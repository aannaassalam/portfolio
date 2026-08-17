import { ABOUT, SHEETS } from "@/json/site/content";
import { drawLines, revealChildren, useGsapScope } from "@/lib/motion";
import Sheet from "@/ui/Sheet/Sheet";

const SHEET = SHEETS[8];

/**
 * The drawn-by block. Every sheet records who drew it, who checked it and who
 * approved it, and this sheet is that record enlarged: strategy, design and
 * engineering as three signatories to one product.
 *
 * The equation the old world drew with plus signs becomes a signature block,
 * which is the same idea told in the set's own language — three hands, one
 * issued drawing.
 */
export default function DrawnBy() {
  const scope = useGsapScope<HTMLDivElement>(({ scope }) => {
    revealChildren(scope);
    drawLines(scope, { start: "top 76%" });
  }, []);

  return (
    <div ref={scope}>
      <Sheet meta={SHEET} className="bg-print-100">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,30rem)_1fr] lg:gap-16">
          <div>
            <h3
              className="lettering max-w-[20ch] text-[clamp(1.5rem,2.6vw,2.5rem)]"
              data-reveal
            >
              {ABOUT.headline.join(" ")}
            </h3>
            {ABOUT.body.map((paragraph) => (
              <p key={paragraph} className="note mt-5" data-reveal>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Signature block. Three signatories ruled across, the outcome
              ruled beneath them — the arrangement on every real title block. */}
          <div>
            <div className="grid gap-px bg-ink-700/25 sm:grid-cols-3">
              {ABOUT.equation.map((item) => (
                <div
                  key={item.term}
                  className="bg-print-100 px-5 pb-10 pt-4"
                  data-reveal
                >
                  <p className="field">{item.term}</p>
                  <p className="note mt-2 note-fine">{item.note}</p>
                  {/* The signature rule: an empty line waiting for a hand. */}
                  <svg
                    viewBox="0 0 200 26"
                    className="mt-7 h-6 w-full"
                    aria-hidden
                  >
                    <path
                      d="M 2 22 L 198 22"
                      stroke="var(--color-ink-700)"
                      strokeOpacity="0.45"
                      strokeWidth="0.9"
                      fill="none"
                      data-draw
                    />
                  </svg>
                </div>
              ))}
            </div>

            <div
              className="mt-px flex flex-wrap items-baseline justify-between gap-4 bg-plate px-5 py-5"
              data-reveal
            >
              <div>
                <p className="field field-knock">{ABOUT.outcome.term}</p>
                <p className="lettering mt-1.5 text-lg text-knock">
                  {ABOUT.outcome.note}
                </p>
              </div>
              <p className="font-measure text-[0.6875rem] text-knock/70">
                APPROVED FOR ISSUE
              </p>
            </div>
          </div>
        </div>
      </Sheet>
    </div>
  );
}
