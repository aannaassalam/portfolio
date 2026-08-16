import dynamic from "next/dynamic";
import { useState } from "react";
import { SERVICES } from "@/json/site/content";
import { ScrollTrigger, useGsapScope, useReducedMotion } from "@/lib/motion";
import type { FormationName } from "@/lib/three/formations";
import { cx } from "@/lib/utils";

const ServicesCanvas = dynamic(
  () => import("@/components/three/ServicesCanvas"),
  { ssr: false }
);

function ServiceBody({ service }: { service: (typeof SERVICES)[number] }) {
  return (
    <>
      <p className="text-base leading-relaxed text-mist md:text-lg">
        {service.summary}
      </p>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-muted">
        {service.detail}
      </p>
      <ul className="mt-7 flex flex-wrap gap-2">
        {service.capabilities.map((capability) => (
          <li
            key={capability}
            className="rounded-full border border-ink-600 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-slate-muted"
          >
            {capability}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  const scope = useGsapScope<HTMLElement>(({ scope }) => {
    // One trigger per step. Six state updates for the whole section — the
    // per-frame work stays in the render loop, not in React.
    scope.querySelectorAll<HTMLElement>("[data-step]").forEach((step, index) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActive(index),
        onEnterBack: () => setActive(index)
      });
    });
  }, []);

  if (reduced) {
    return (
      <section id="services" className="bg-ink-950 py-28">
        <div className="shell">
          <p className="eyebrow">What we engineer</p>
          <h2 className="mt-6 max-w-2xl text-[clamp(2rem,4.4vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.03em]">
            Six disciplines, one system.
          </h2>
          <ul className="mt-16 grid gap-12 md:grid-cols-2">
            {SERVICES.map((service) => (
              <li key={service.id} className="border-t border-ink-700 pt-6">
                <span className="font-mono text-xs text-violet-400">
                  {service.number}
                </span>
                <h3 className="mt-3 text-2xl font-medium tracking-tight">
                  {service.title}
                </h3>
                <div className="mt-4">
                  <ServiceBody service={service} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={scope}
      id="services"
      className="relative bg-ink-950"
      aria-label="What we engineer"
    >
      <div className="shell sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="grid items-center gap-8 pt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <p className="eyebrow">What we engineer</p>

            {/* All six occupy one grid cell; only the active one is visible,
                so height never jumps between disciplines. */}
            <div className="mt-8 grid">
              {SERVICES.map((service, index) => (
                <div
                  key={service.id}
                  aria-hidden={index !== active}
                  className={cx(
                    "col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    index === active
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-6 opacity-0"
                  )}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-sm text-violet-400">
                      {service.number}
                    </span>
                    <h3 className="text-[clamp(1.75rem,3.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.035em]">
                      {service.title}
                    </h3>
                  </div>
                  <div className="mt-6">
                    <ServiceBody service={service} />
                  </div>
                </div>
              ))}
            </div>

            <ol className="mt-12 flex gap-2" aria-hidden>
              {SERVICES.map((service, index) => (
                <li
                  key={service.id}
                  className={cx(
                    "h-px flex-1 transition-colors duration-500",
                    index <= active ? "bg-violet-500" : "bg-ink-600"
                  )}
                />
              ))}
            </ol>
          </div>

          <div className="relative order-first aspect-square w-full lg:order-none">
            <ServicesCanvas
              formation={SERVICES[active].id as FormationName}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#050505_78%)]" />
          </div>
        </div>
      </div>

      {/* Scroll runway: one viewport per discipline, driving the steps above. */}
      <div
        aria-hidden
        className="pointer-events-none relative"
        style={{ marginTop: "-100vh" }}
      >
        {SERVICES.map((service) => (
          <div key={service.id} data-step className="h-screen" />
        ))}
      </div>
    </section>
  );
}
