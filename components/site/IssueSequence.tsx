import { PROCESS, SHEETS } from "@/json/site/content";
import { gsap, revealChildren, useGsapScope } from "@/lib/motion";
import Sheet from "@/ui/Sheet/Sheet";

const SHEET = SHEETS[5];

/**
 * The issue sequence: a programme bar chart, which is what a drawing office
 * calls a timeline. Six stages, each a bar on a shared time axis, each with
 * its deliverable named.
 *
 * The bars overlap deliberately — discover does not stop when define starts,
 * and a programme that pretends otherwise is the version drawn for a brochure.
 */
const SPAN = [
  [0, 2.2],
  [1.6, 3.6],
  [3.0, 5.4],
  [4.6, 8.6],
  [8.0, 9.6],
  [9.2, 11]
] as const;

const TOTAL = 11;

export default function IssueSequence() {
  const scope = useGsapScope<HTMLDivElement>(({ scope }) => {
    revealChildren(scope);

    // Bars grow along the time axis as the sheet is read.
    gsap.fromTo(
      scope.querySelectorAll("[data-bar]"),
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: "left center",
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: {
          trigger: scope.querySelector("[data-programme]"),
          start: "top 78%"
        }
      }
    );
  }, []);

  return (
    <div ref={scope}>
      <Sheet meta={SHEET} className="bg-print-100">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h3
            className="lettering max-w-[20ch] text-[clamp(1.5rem,2.6vw,2.5rem)]"
            data-reveal
          >
            From first thought to final product.
          </h3>
          <p className="note max-w-[36ch] note-fine" data-reveal>
            Stages overlap because they do. Each one names what it hands to the
            next.
          </p>
        </div>

        <div className="mt-12" data-programme>
          {/* Time axis. Weeks are deliberately unlabelled: a real programme
              carries dates we cannot promise for work not yet scoped. */}
          <div className="flex items-baseline justify-between border-b border-ink-700 pb-2">
            <span className="field">Stage</span>
            <span className="field hidden md:block">Programme →</span>
            <span className="field">Issued</span>
          </div>

          <ol>
            {PROCESS.map((stage, i) => {
              const [from, to] = SPAN[i];
              return (
                <li
                  key={stage.number}
                  className="grid items-center gap-x-6 gap-y-2 border-b border-ink-700/25 py-4 md:grid-cols-[13rem_1fr_11rem]"
                  data-reveal
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-measure text-xs text-redline">
                      {stage.number}
                    </span>
                    <div>
                      <h4 className="lettering text-base tracking-[0.05em]">
                        {stage.title}
                      </h4>
                      <p className="note mt-1 max-w-[30ch] note-fine">
                        {stage.body}
                      </p>
                    </div>
                  </div>

                  {/* The bar itself. Positioned on the shared axis, so the
                      overlaps are readable as overlaps. */}
                  <div className="relative h-6 md:h-8">
                    <div className="absolute inset-y-0 left-0 right-0 border-l border-ink-700/20" />
                    <div
                      data-bar
                      className="absolute top-1/2 h-3.5 -translate-y-1/2 border border-ink-700 bg-plate/35"
                      style={{
                        left: `${(from / TOTAL) * 100}%`,
                        width: `${((to - from) / TOTAL) * 100}%`
                      }}
                    >
                      <span className="absolute inset-y-0 left-0 w-px bg-ink-700" />
                      <span className="absolute inset-y-0 right-0 w-px bg-ink-700" />
                    </div>
                  </div>

                  <p className="font-measure text-[0.6875rem] text-ink-500 md:text-right">
                    {stage.output}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </Sheet>
    </div>
  );
}
