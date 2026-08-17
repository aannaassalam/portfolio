import { PRINCIPLES, SHEETS, TRUST } from "@/json/site/content";
import { revealChildren, useGsapScope } from "@/lib/motion";
import Sheet from "@/ui/Sheet/Sheet";

const SHEET = SHEETS[7];

/**
 * General notes. This is the one sheet where the world and the content were
 * already the same thing: engineering standards written as numbered clauses is
 * precisely what a drawing set's general notes are, down to the tone.
 *
 * Two columns of hanging-indent clauses, no cards, no icons. The numbering is
 * the hierarchy.
 */
export default function GeneralNotes() {
  const scope = useGsapScope<HTMLDivElement>(
    ({ scope }) => revealChildren(scope),
    []
  );

  return (
    <div ref={scope}>
      <Sheet meta={SHEET}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h3
            className="lettering max-w-[20ch] text-[clamp(1.5rem,2.6vw,2.5rem)]"
            data-reveal
          >
            Built for today. Engineered for tomorrow.
          </h3>
          <p className="note max-w-[34ch] note-fine" data-reveal>
            These notes govern every sheet in the set. Deliberately qualitative:
            no figure appears here that cannot be substantiated.
          </p>
        </div>

        <ol className="mt-11 grid gap-x-16 gap-y-7 border-t border-ink-700 pt-8 md:grid-cols-2">
          {PRINCIPLES.map((principle, i) => (
            <li key={principle.label} className="flex gap-5" data-reveal>
              <span className="font-measure text-xs text-redline">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h4 className="lettering text-sm tracking-[0.1em]">
                  {principle.label}
                </h4>
                <p className="note mt-2 max-w-[44ch] note-fine">
                  {principle.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Sectors, as a schedule of where the notes have been applied. */}
        <div className="mt-16 border-t border-ink-700/30 pt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h4 className="lettering text-base tracking-[0.06em]" data-reveal>
              {TRUST.headline}
            </h4>
            <span className="field" data-reveal>
              {TRUST.eyebrow}
            </span>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2" data-reveal>
            {TRUST.industries.map((industry, i) => (
              <li
                key={industry}
                className="flex items-center gap-3 font-measure text-[0.6875rem] tracking-[0.12em] text-ink-500"
              >
                {i > 0 && (
                  <span aria-hidden className="text-ink-300">
                    ·
                  </span>
                )}
                {industry.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>
      </Sheet>
    </div>
  );
}
