import { SERVICES, SHEETS } from "@/json/site/content";
import { revealChildren, useGsapScope } from "@/lib/motion";
import Sheet from "@/ui/Sheet/Sheet";

const SHEET = SHEETS[2];

/**
 * A schedule of works: a ruled table, one row per item, the same columns all
 * the way down. Six services rendered as six cards would be this category's
 * default arrangement and the craft floor's named lazy container; a schedule
 * is what the drawing office actually issues, and it happens to be far easier
 * to scan.
 *
 * The rules are real table borders rather than gaps between cards, so the
 * columns line up across all six rows — which is the entire advantage.
 */
export default function ScheduleOfWorks() {
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
            Six disciplines, one system.
          </h3>
          <p className="note max-w-[38ch] note-fine" data-reveal>
            Every item below is scoped, drawn and issued by the same team. No
            item is subcontracted out of the set.
          </p>
        </div>

        {/* Ruled schedule. Header row uses the same field labels as every
            title block on the site, so the columns are already familiar. */}
        <div className="mt-10 hidden md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-y border-ink-700">
                <th scope="col" className="field w-16 py-3 pr-4">
                  Item
                </th>
                <th scope="col" className="field py-3 pr-6">
                  Description of works
                </th>
                <th scope="col" className="field py-3 pr-6">
                  Scope
                </th>
                <th scope="col" className="field py-3">
                  Includes
                </th>
              </tr>
            </thead>
            <tbody>
              {SERVICES.map((service) => (
                <tr
                  key={service.id}
                  className="border-b border-ink-700/25 align-top transition-colors duration-300 hover:bg-print-100/70"
                  data-reveal
                >
                  <td className="py-6 pr-4">
                    <span className="font-measure text-sm text-redline">
                      {service.number}
                    </span>
                  </td>
                  <td className="py-6 pr-6">
                    <h4 className="lettering text-lg tracking-[0.04em]">
                      {service.title}
                    </h4>
                    <p className="note mt-2 max-w-[34ch] note-fine">
                      {service.summary}
                    </p>
                  </td>
                  <td className="py-6 pr-6">
                    <p className="note max-w-[36ch] note-fine">
                      {service.detail}
                    </p>
                  </td>
                  <td className="py-6">
                    <ul className="space-y-1.5">
                      {service.capabilities.map((capability) => (
                        <li
                          key={capability}
                          className="font-measure text-xs text-ink-500"
                        >
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* The phone reading. A four-column schedule cannot be read at 390px,
            and a horizontal scroll box with no affordance hides half of it, so
            each item stacks with its fields in the schedule's own order. */}
        <ol className="mt-8 md:hidden">
          {SERVICES.map((service) => (
            <li
              key={service.id}
              className="border-t border-ink-700/25 py-6"
              data-reveal
            >
              <div className="flex items-baseline gap-3">
                <span className="font-measure text-sm text-redline">
                  {service.number}
                </span>
                <h4 className="lettering text-lg tracking-[0.04em]">
                  {service.title}
                </h4>
              </div>
              <p className="note mt-3 note-fine">{service.summary}</p>
              <div className="mt-4">
                <p className="field">Scope</p>
                <p className="note mt-1.5 note-fine">{service.detail}</p>
              </div>
              <div className="mt-4">
                <p className="field">Includes</p>
                <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
                  {service.capabilities.map((capability, i) => (
                    <li
                      key={capability}
                      className="flex items-center gap-3 font-measure text-xs text-ink-500"
                    >
                      {i > 0 && (
                        <span aria-hidden className="text-ink-300">
                          ·
                        </span>
                      )}
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Sheet>
    </div>
  );
}
