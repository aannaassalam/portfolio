import { ARCHITECTURE, HERO, SET, SHEETS } from "@/json/site/content";
import { drawLines, gsap, useGsapScope } from "@/lib/motion";
import RevisionColumn from "@/ui/RevisionColumn/RevisionColumn";
import Stamp from "@/ui/Stamp/Stamp";
import TitleBlock from "@/ui/TitleBlock/TitleBlock";

const SHEET = SHEETS[0];

/**
 * Drawing-area coordinates. Deliberately shallow: the whole sheet — lettering,
 * assembly, register and the issue stamp — has to coexist inside one 900px
 * viewport, because a first viewport whose primary action sits below the fold
 * is a header, not a thesis.
 */
const VIEW = { w: 1200, h: 386 };

/**
 * The six layers as a sectioned assembly: each stratum a skewed plate in a
 * shallow axonometric, with a leader out to a numbered callout. Geometry is
 * derived rather than hand-listed so the strata stay parallel — one wrong
 * coordinate and the whole thing reads as a mistake instead of a drawing.
 */
const LAYERS = ARCHITECTURE.layers.map((layer, i) => {
  const depth = 38;
  const gap = 40;
  const plateW = 520;
  const y = 66 + i * gap;
  const x = 188 - i * (depth * 0.3);
  return {
    ...layer,
    n: String(i + 1).padStart(2, "0"),
    path: `M ${x} ${y} l ${plateW} 0 l ${depth} ${-21} l ${-plateW} 0 Z`,
    face: `M ${x} ${y} l ${plateW} 0 l 0 11 l ${-plateW} 0 Z`,
    leader: `M ${x + plateW + depth} ${y - 21} L ${VIEW.w - 258} ${y - 21}`,
    labelY: y - 21
  };
});

const LAST = LAYERS[LAYERS.length - 1];

export default function GeneralArrangement() {
  const scope = useGsapScope<HTMLElement>(({ scope }) => {
    drawLines(scope, { start: "top 92%" });

    gsap.fromTo(
      scope.querySelectorAll("[data-letter] > span"),
      { yPercent: 108 },
      {
        yPercent: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        delay: 0.12
      }
    );

    gsap.fromTo(
      scope.querySelectorAll("[data-arrival], [data-reveal]"),
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.06,
        ease: "expo.out",
        delay: 0.42
      }
    );

    gsap.fromTo(
      scope.querySelectorAll("[data-callout]"),
      { opacity: 0, x: -8 },
      {
        opacity: 1,
        x: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "expo.out",
        delay: 0.6
      }
    );
  }, []);

  return (
    <section
      ref={scope}
      id={SHEET.id}
      aria-label={`Sheet ${SHEET.no} — ${SHEET.title}`}
      className="relative"
    >
      <div className="shell">
        <header className="flex items-baseline gap-4 border-b border-ink-700/40 pb-2.5 pt-16 md:pt-20">
          <span
            className="font-measure text-xs font-bold tracking-[0.14em] text-plate"
            data-arrival
          >
            {SHEET.no}
          </span>
          <h2
            className="lettering text-sm tracking-[0.08em] sm:text-base"
            data-arrival
          >
            {SHEET.title}
          </h2>
          <span className="field ml-auto hidden sm:block" data-arrival>
            {SET.status} · Rev {SET.revision}
          </span>
        </header>

        {/* Drawing area. The frame is heavy, as a real sheet's trim is: the
            border belongs to the paper, not to the content inside it. */}
        <div className="gridded relative border-x-2 border-ink-700">
          <span className="reg left-2 top-2" aria-hidden />
          <span className="reg right-2 top-2" aria-hidden />

          <div className="grid lg:grid-cols-[1fr_15rem]">
            <div className="px-4 pb-6 pt-5 md:px-7 md:pb-7 md:pt-6">
              <h1 className="lettering max-w-[26ch] text-[clamp(1.875rem,4.6vw,4.25rem)] text-nowrap md:text-balance">
                {HERO.headline.map((line) => (
                  <span
                    key={line}
                    className="block overflow-hidden"
                    data-letter
                  >
                    <span className="block">{line}</span>
                  </span>
                ))}
              </h1>

              <p
                className="note mt-4 max-w-[52ch] text-[0.875rem]"
                data-arrival
              >
                {HERO.lede}
              </p>

              {/* The section. Below md it becomes the same six layers as a
                  plain ordered list: a drawing this wide cannot be read on a
                  phone, and the layers are content rather than decoration. */}
              <div className="mt-4 hidden md:block">
                <svg
                  viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
                  className="h-auto w-full"
                  role="img"
                  aria-label="Section through the six layers of a software system: interface, application, API, intelligence, data and infrastructure, each labelled with a numbered callout."
                >
                  <path
                    d={`M 132 52 L 132 ${LAST.labelY + 44}`}
                    stroke="var(--color-redline)"
                    strokeWidth="1.5"
                    strokeDasharray="12 4 3 4"
                    fill="none"
                  />
                  <text
                    x="128"
                    y="44"
                    textAnchor="end"
                    className="font-measure"
                    fontSize="14"
                    fill="var(--color-redline)"
                    letterSpacing="2"
                  >
                    A
                  </text>

                  {LAYERS.map((layer) => (
                    <g key={layer.name}>
                      <path
                        d={layer.face}
                        fill="var(--color-ink-700)"
                        fillOpacity="0.08"
                      />
                      <path
                        d={layer.path}
                        fill="var(--color-plate)"
                        fillOpacity="0.07"
                        stroke="var(--color-ink-700)"
                        strokeWidth="1.2"
                        data-draw
                      />
                      <path
                        d={layer.face}
                        fill="none"
                        stroke="var(--color-ink-700)"
                        strokeWidth="1"
                        data-draw
                      />
                      <path
                        d={layer.leader}
                        fill="none"
                        stroke="var(--color-ink-500)"
                        strokeWidth="0.9"
                        data-draw
                      />
                      <circle
                        cx={VIEW.w - 258}
                        cy={layer.labelY}
                        r="10"
                        fill="var(--color-print-200)"
                        stroke="var(--color-ink-700)"
                        strokeWidth="1.1"
                      />
                      <text
                        x={VIEW.w - 258}
                        y={layer.labelY + 3.5}
                        textAnchor="middle"
                        className="font-measure"
                        fontSize="10"
                        fill="var(--color-ink-700)"
                      >
                        {layer.n}
                      </text>
                      <g data-callout>
                        <text
                          x={VIEW.w - 238}
                          y={layer.labelY - 2}
                          className="lettering"
                          fontSize="16"
                          fill="var(--color-ink-700)"
                          letterSpacing="1.2"
                        >
                          {layer.name}
                        </text>
                        <text
                          x={VIEW.w - 238}
                          y={layer.labelY + 13}
                          className="font-measure"
                          fontSize="10.5"
                          fill="var(--color-ink-500)"
                        >
                          {layer.note}
                        </text>
                      </g>
                    </g>
                  ))}

                  <g
                    stroke="var(--color-ink-500)"
                    strokeWidth="0.8"
                    fill="none"
                  >
                    <path d={`M 164 50 L 164 ${LAST.labelY + 12}`} data-draw />
                    <path d="M 158 50 L 170 50" />
                    <path
                      d={`M 158 ${LAST.labelY + 12} L 170 ${LAST.labelY + 12}`}
                    />
                  </g>
                  <text
                    x="154"
                    y={(50 + LAST.labelY + 12) / 2}
                    textAnchor="middle"
                    transform={`rotate(-90 154 ${(50 + LAST.labelY + 12) / 2})`}
                    className="font-measure"
                    fontSize="10"
                    fill="var(--color-ink-500)"
                    letterSpacing="1.5"
                  >
                    ONE SYSTEM
                  </text>
                </svg>
              </div>

              <ol className="mt-7 md:hidden">
                {LAYERS.map((layer) => (
                  <li
                    key={layer.name}
                    className="flex gap-4 border-t border-ink-700/25 py-3"
                    data-arrival
                  >
                    <span className="font-measure text-xs text-plate">
                      {layer.n}
                    </span>
                    <span className="min-w-0">
                      <span className="lettering block text-sm tracking-[0.06em]">
                        {layer.name}
                      </span>
                      <span className="mt-0.5 block font-measure text-xs text-ink-500">
                        {layer.note}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* The revision column, at the right edge of the sheet where the
                contract puts it. Held rows are the set's own unissued
                information, in red pencil. */}
            <div className="border-t border-ink-700/25 px-4 py-6 lg:border-l lg:border-t-0 lg:px-5">
              <RevisionColumn />
            </div>
          </div>
        </div>

        {/* Bottom band. The stamp sits on the print ground, not inside the
            title-block plate: plate-on-plate turned the page's primary action
            into a hairline outline, and a stamp is an impression on paper. */}
        {/* Stacked, not side by side: at 24rem the six title-block fields were
            each ~88px and clipped the project name. Full width gives every
            field room, and a title strip across the foot of the sheet is how a
            wide drawing is titled anyway. */}
        <div className="border-x-2 border-b-2 border-ink-700">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 bg-print-200 px-4 py-5 md:px-7">
            <Stamp href={HERO.primaryCta.href} overline={SET.status}>
              {HERO.primaryCta.label}
            </Stamp>
            <div className="min-w-0">
              <p className="field">Disciplines</p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                {HERO.disciplines.map((item) => (
                  <li
                    key={item}
                    className="font-measure text-[0.6875rem] tracking-[0.1em] text-ink-500"
                    data-arrival
                  >
                    {item.toUpperCase()}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={HERO.secondaryCta.href}
              className="font-measure text-[0.6875rem] tracking-[0.12em] text-ink-500 underline decoration-ink-300 decoration-1 underline-offset-4 transition-colors duration-300 hover:text-ink-700"
            >
              {HERO.secondaryCta.label.toUpperCase()}
            </a>
          </div>

          <TitleBlock
            sheetNo={SHEET.no}
            sheetTitle={SHEET.title}
            strip
            className="border-t-2 border-ink-700"
          />
        </div>
      </div>
    </section>
  );
}
