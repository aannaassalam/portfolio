import { CASE_STUDIES, SET, SHEETS } from "@/json/site/content";
import { drawLines, revealChildren, useGsapScope } from "@/lib/motion";
import Field from "@/ui/Field/Field";
import Sheet from "@/ui/Sheet/Sheet";
import RevisionCloud from "@/ui/RevisionCloud/RevisionCloud";
import DetailDrawing from "./DetailDrawing";

const SHEET = SHEETS[4];

type Study = (typeof CASE_STUDIES)[number];

/**
 * The issued sheets — the set's proof, and the sheet the user asked to keep
 * leading.
 *
 * Two raises from the direction round are load-bearing here, and they exist
 * precisely because this content is not yet real. Every figure carries a
 * provenance stamp saying it is illustrative, and the client field is held
 * rather than omitted: a drawing office does not delete a field it has no
 * value for, it marks it HOLD and reissues. That is a more honest way to show
 * unfinished proof than either fabricating a name or quietly leaving a gap,
 * and it costs the page nothing in credibility because it reads as procedure.
 */
function IssuedSheet({ study, index }: { study: Study; index: number }) {
  return (
    <article
      className="border-t border-ink-700 pt-8 first:border-t-0 first:pt-0"
      data-reveal
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-14">
        <div>
          {/* Sheet reference line: the same three fields on all four. */}
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
            <span className="font-measure text-sm text-redline">
              {SHEET.no}.{study.number}
            </span>
            <span className="field">{study.sector}</span>
          </div>

          <h4 className="lettering mt-4 text-[clamp(1.375rem,2.2vw,2rem)]">
            {study.title}
          </h4>
          <p className="note mt-3 max-w-[46ch]">{study.summary}</p>

          {/* Problem / approach / result as ruled notes, numbered the way a
              sheet's general notes are. */}
          <ol className="mt-7 border-t border-ink-700/25">
            {(
              [
                ["Existing condition", study.problem],
                ["Proposal", study.solution],
                ["Outcome", study.result]
              ] as const
            ).map(([label, value], i) => (
              <li
                key={label}
                className="grid gap-1 border-b border-ink-700/25 py-3.5 sm:grid-cols-[12.5rem_1fr] sm:gap-6"
              >
                <span className="field pt-0.5">
                  {String(i + 1).padStart(2, "0")} · {label}
                </span>
                <span className="note max-w-[56ch] note-fine">{value}</span>
              </li>
            ))}
          </ol>

          <dl
            className="relative mt-7 grid gap-6 sm:grid-cols-4"
            aria-describedby="rev-08-note"
          >
            <RevisionCloud label="REV 08" />
            {/* The held field. Real client names are not ours to print. */}
            <Field label="Client" held />
            {study.metrics.map((metric) => (
              <Field
                key={metric.label}
                label={metric.label}
                illustrative
                valueClassName="text-xl text-ink-700"
              >
                {metric.value}
              </Field>
            ))}
          </dl>

          <p
            id="rev-08-note"
            className="mt-8 font-measure text-[0.6875rem] leading-snug text-redline"
          >
            △ REV 08 HELD — clouded data above is unissued. See the issue
            register, sheet 01.
          </p>

          <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-ink-700/25 pt-5">
            {study.stack.map((tech, i) => (
              <li
                key={tech}
                className="flex items-center gap-3 font-measure text-[0.6875rem] tracking-[0.1em] text-ink-500"
              >
                {i > 0 && (
                  <span aria-hidden className="text-ink-300">
                    ·
                  </span>
                )}
                {tech.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:pt-8">
          <DetailDrawing seed={index + 1} className="h-auto w-full" />
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-ink-700/25 pt-3">
            <span className="field">
              Detail {SHEET.no}.{study.number} · {study.sector}
            </span>
            <span className="font-measure text-[0.6875rem] text-ink-300">
              DRAWN {SET.drawnBy} · REV {SET.revision}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function IssuedSheets() {
  const scope = useGsapScope<HTMLDivElement>(({ scope }) => {
    revealChildren(scope, "top 85%");
    drawLines(scope, { start: "top 80%" });
  }, []);

  return (
    <div ref={scope} id="work">
      <Sheet meta={SHEET}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h3
            className="lettering max-w-[20ch] text-[clamp(1.5rem,2.6vw,2.5rem)]"
            data-reveal
          >
            Ideas, engineered.
          </h3>
          {/* Said once, at the top, so no visitor mistakes the figures below
              for substantiated ones — and said again on every figure. */}
          <p
            className="note max-w-[40ch] border-l border-redline pl-4 note-fine"
            data-reveal
          >
            Every figure on this sheet is illustrative and stamped as such.
            Client names are held pending release. Real substantiated figures
            replace these before the set is issued for construction.
          </p>
        </div>

        <div className="mt-12 space-y-14">
          {CASE_STUDIES.map((study, index) => (
            <IssuedSheet key={study.number} study={study} index={index} />
          ))}
        </div>
      </Sheet>
    </div>
  );
}
