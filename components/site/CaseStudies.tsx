import { useRef } from "react";
import { CASE_STUDIES } from "@/json/site/content";
import { gsap, revealChildren, useGsapScope } from "@/lib/motion";
import ProjectVisual from "./ProjectVisual";

type Study = (typeof CASE_STUDIES)[number];

function Panel({ study, index }: { study: Study; index: number }) {
  return (
    <article
      data-panel
      className="flex w-screen shrink-0 items-center px-[clamp(1.25rem,5vw,5rem)]"
    >
      <div className="grid w-full gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-center lg:gap-16">
        <div>
          <div className="flex items-center gap-4" data-panel-item>
            <span className="font-mono text-sm text-violet-400">
              {study.number}
            </span>
            <span className="eyebrow">{study.sector}</span>
          </div>

          <h3
            className="mt-6 text-[clamp(1.875rem,3.6vw,3.25rem)] font-medium leading-[1.03] tracking-[-0.035em]"
            data-panel-item
          >
            {study.title}
          </h3>

          <p
            className="mt-5 max-w-lg text-base leading-relaxed text-mist"
            data-panel-item
          >
            {study.summary}
          </p>

          <dl className="mt-8 space-y-5 border-l border-ink-700 pl-5" data-panel-item>
            {(
              [
                ["Problem", study.problem],
                ["Approach", study.solution],
                ["Result", study.result]
              ] as const
            ).map(([label, value]) => (
              <div key={label}>
                <dt className="eyebrow">{label}</dt>
                <dd className="mt-2 max-w-lg text-sm leading-relaxed text-slate-muted">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-4" data-panel-item>
            {study.metrics.map((metric) => (
              <li key={metric.label}>
                <span className="block text-2xl font-medium tracking-tight text-chalk">
                  {metric.value}
                </span>
                <span className="eyebrow mt-1 block">{metric.label}</span>
              </li>
            ))}
          </ul>

          <ul
            className="mt-8 flex flex-wrap gap-2 border-t border-ink-700 pt-6"
            data-panel-item
          >
            {study.stack.map((tech) => (
              <li
                key={tech}
                className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-slate-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative" data-panel-visual>
          <ProjectVisual
            accent={study.accent}
            seed={index + 1}
            className="h-auto w-full"
          />
        </div>
      </div>
    </article>
  );
}

/**
 * Pinned horizontal run on desktop, plain vertical stack below lg. Touch
 * devices get the layout they can actually drive rather than a hijacked
 * vertical gesture pretending to be horizontal.
 */
export default function CaseStudies() {
  const track = useRef<HTMLDivElement>(null);

  const scope = useGsapScope<HTMLElement>(({ scope }) => {
    // Section heading reveals at every breakpoint — it must never depend on
    // the desktop-only horizontal branch running.
    revealChildren(scope, "top 85%");

    const media = gsap.matchMedia();

    media.add("(min-width: 1024px)", () => {
      const rail = track.current;
      if (!rail) return;

      const distance = () => rail.scrollWidth - window.innerWidth;

      const horizontal = gsap.to(rail, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true
        }
      });

      // Panels animate against horizontal travel, not vertical scroll.
      rail.querySelectorAll<HTMLElement>("[data-panel]").forEach((panel) => {
        gsap.from(panel.querySelectorAll("[data-panel-item]"), {
          opacity: 0,
          y: 28,
          duration: 0.9,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontal,
            start: "left 72%"
          }
        });

        gsap.from(panel.querySelector("[data-panel-visual]"), {
          scale: 0.85,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontal,
            start: "left 85%"
          }
        });
      });
    });

    return () => media.revert();
  }, []);

  return (
    <section
      ref={scope}
      id="work"
      className="relative overflow-hidden border-t border-ink-800 bg-ink-950 lg:h-screen"
    >
      {/* Pinned above the rail on lg, so it condenses to a single line —
          a full-size heading would eat the panel's vertical budget. */}
      <div className="shell pb-10 pt-28 lg:absolute lg:left-0 lg:right-0 lg:top-0 lg:z-10 lg:flex lg:items-baseline lg:gap-5 lg:pb-0 lg:pt-24">
        <p className="eyebrow" data-reveal>
          Selected work
        </p>
        <h2
          className="mt-5 text-[clamp(2rem,4.4vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] lg:mt-0 lg:text-xl"
          data-reveal
        >
          Ideas, engineered.
        </h2>
      </div>

      <div
        ref={track}
        className="flex flex-col gap-24 pb-28 lg:h-screen lg:flex-row lg:gap-0 lg:pb-0 lg:pt-32"
      >
        {CASE_STUDIES.map((study, index) => (
          <Panel key={study.number} study={study} index={index} />
        ))}
      </div>
    </section>
  );
}
