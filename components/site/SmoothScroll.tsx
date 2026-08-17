import { useEffect } from "react";
import Lenis from "lenis";
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
  registerScroller
} from "@/lib/motion";

/**
 * Drives the page with Lenis and hands ScrollTrigger the same clock, so
 * pinned sections and scrubbed timelines stay in step with the smoothing.
 * Opted out entirely under prefers-reduced-motion — native scroll is the
 * accessible default, not a downgrade.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      anchors: true
    });

    lenis.on("scroll", ScrollTrigger.update);
    registerScroller(lenis);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      registerScroller(null);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
