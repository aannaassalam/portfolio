import { CONTACT, SET, SHEETS } from "@/json/site/content";
import { revealChildren, useGsapScope } from "@/lib/motion";
import Sheet from "@/ui/Sheet/Sheet";
import Stamp from "@/ui/Stamp/Stamp";
import TitleBlock from "@/ui/TitleBlock/TitleBlock";

const SHEET = SHEETS[9];

/**
 * The issue sheet. The set closes the way a set closes: with the stamp that
 * releases it.
 *
 * The primary action is the stamp, at the largest scale it appears anywhere on
 * the page — this is the one moment the whole drawing set has been walking
 * toward, and the composition gives it the sheet rather than a strip at the
 * bottom of one.
 */
export default function Issue() {
  const scope = useGsapScope<HTMLDivElement>(
    ({ scope }) => revealChildren(scope),
    []
  );

  return (
    <div ref={scope}>
      <Sheet meta={SHEET} bodyClassName="py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_26rem] lg:gap-20">
          <div>
            <h3
              className="lettering max-w-[16ch] text-[clamp(2rem,5vw,4.25rem)]"
              data-reveal
            >
              {CONTACT.headline}
            </h3>
            <p className="note mt-6 max-w-[40ch] text-base" data-reveal>
              {CONTACT.lede}
            </p>

            <div
              className="mt-11 flex flex-wrap items-center gap-4"
              data-reveal
            >
              <Stamp
                href={CONTACT.primaryCta.href}
                overline={SET.status}
                className="px-9 py-5 [&_.lettering]:text-2xl"
              >
                {CONTACT.primaryCta.label}
              </Stamp>
              <a
                href={CONTACT.secondaryCta.href}
                className="font-measure text-xs tracking-[0.12em] text-ink-500 underline decoration-ink-300 decoration-1 underline-offset-4 transition-colors duration-300 hover:text-ink-700"
              >
                {CONTACT.secondaryCta.label.toUpperCase()}
              </a>
            </div>

            <p className="field mt-10" data-reveal>
              {CONTACT.responseNote}
            </p>
          </div>

          <div data-reveal>
            <TitleBlock sheetNo={SHEET.no} sheetTitle={SHEET.title} />
            <p className="note mt-5 max-w-[34ch] note-fine">
              {CONTACT.eyebrow} — the set is issued for tender. Nothing on it is
              built until you say so.
            </p>
          </div>
        </div>
      </Sheet>
    </div>
  );
}
