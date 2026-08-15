import dynamic from "next/dynamic";
import { useRef } from "react";
import { CONTACT } from "@/json/site/content";
import { gsap, useGsapScope } from "@/lib/motion";
import Cta from "@/ui/Cta/Cta";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false
});

/**
 * The convergence. This is deliberately the hero's scene run backwards —
 * the scattered system pulling itself back into one structure — because the
 * page's argument is that we take things apart and put them back together.
 */
export default function Contact() {
  const dispersion = useRef(1);

  const scope = useGsapScope<HTMLElement>(({ scope }) => {
    gsap.to(dispersion, {
      current: 0,
      ease: "none",
      scrollTrigger: {
        trigger: scope,
        start: "top bottom",
        end: "center center",
        scrub: 0.8
      }
    });

    gsap.fromTo(
      scope.querySelectorAll("[data-cta-item]"),
      { opacity: 0, y: 26, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.3,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: scope, start: "top 55%" }
      }
    );
  }, []);

  return (
    <section
      ref={scope}
      id="contact"
      className="relative border-t border-ink-800 bg-ink-950"
    >
      <div className="relative flex min-h-screen items-center overflow-hidden py-28">
        <div className="pointer-events-none absolute inset-0">
          <HeroCanvas dispersion={dispersion} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#050505_82%)]" />

        <div className="shell relative w-full text-center">
          <p className="eyebrow" data-cta-item>
            {CONTACT.eyebrow}
          </p>

          <h2
            className="mx-auto mt-7 max-w-3xl text-[clamp(2.25rem,6vw,5rem)] font-medium leading-[1.02] tracking-[-0.04em]"
            data-cta-item
          >
            {CONTACT.headline}
          </h2>

          <p className="mt-6 text-lg text-mist" data-cta-item>
            {CONTACT.lede}
          </p>

          <div
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
            data-cta-item
          >
            <Cta href={CONTACT.primaryCta.href}>{CONTACT.primaryCta.label}</Cta>
            <Cta href={CONTACT.secondaryCta.href} variant="ghost">
              {CONTACT.secondaryCta.label}
            </Cta>
          </div>

          <p className="eyebrow mt-10" data-cta-item>
            {CONTACT.responseNote}
          </p>
        </div>
      </div>
    </section>
  );
}
