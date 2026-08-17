import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useSyncExternalStore
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { checkWindow } from "@/lib/functions/_helpers.lib";

if (checkWindow()) gsap.registerPlugin(ScrollTrigger);

/** useLayoutEffect warns during SSR; GSAP setup must still run pre-paint. */
export const useIsoLayoutEffect = checkWindow() ? useLayoutEffect : useEffect;

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion() {
  return checkWindow() && window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/**
 * Scopes a GSAP context to a ref and reverts every tween/ScrollTrigger it
 * created on unmount. Skipped entirely under prefers-reduced-motion, so
 * callers never have to guard their own timelines.
 */
export function useGsapScope<T extends HTMLElement>(
  setup: (ctx: { scope: T }) => void,
  deps: unknown[] = []
) {
  const ref = useRef<T>(null);

  useIsoLayoutEffect(() => {
    const scope = ref.current;
    if (!scope || prefersReducedMotion()) return;

    // Reverting the context kills every tween and ScrollTrigger it made.
    const ctx = gsap.context(() => setup({ scope }), scope);
    return () => ctx.revert();
  }, deps);

  return ref;
}

/**
 * Shared scroll energy, 0-1. ONE listener for the whole page, read every
 * frame by every 3D scene: the point clouds loosen while you move and settle
 * when you stop. A scrubbed scene that only maps position feels played back;
 * reacting to velocity is what makes it feel driven.
 */
const scrollEnergy = { current: 0 };
let energyListening = false;

function startScrollEnergy() {
  if (energyListening || !checkWindow()) return;
  energyListening = true;

  let last = window.scrollY;
  let frame = 0;

  const decay = () => {
    scrollEnergy.current *= 0.9;
    if (scrollEnergy.current < 0.002) {
      scrollEnergy.current = 0;
      frame = 0;
      return;
    }
    frame = requestAnimationFrame(decay);
  };

  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      // ~90px of travel between frames reads as a full-energy flick.
      const kick = Math.abs(y - last) / 90;
      last = y;
      scrollEnergy.current = Math.min(1, scrollEnergy.current + kick);
      if (!frame) frame = requestAnimationFrame(decay);
    },
    { passive: true }
  );
}

/** Ref handle onto the shared energy. Never triggers a React render. */
export function useScrollEnergy() {
  useEffect(() => {
    startScrollEnergy();
  }, []);
  return scrollEnergy;
}

/**
 * Scroll lock. `overflow: hidden` on the documentElement is not enough while
 * Lenis is driving: it keeps consuming wheel and touch and scrolling the page
 * behind whatever is on top. SmoothScroll registers its instance here so an
 * overlay can stop the real scroller, and the CSS lock still covers the
 * reduced-motion path where no Lenis exists.
 */
type Scroller = { stop: () => void; start: () => void };
let scroller: Scroller | null = null;

export function registerScroller(instance: Scroller | null) {
  scroller = instance;
}

export function lockScroll(locked: boolean) {
  if (!checkWindow()) return;
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (locked) scroller?.stop();
  else scroller?.start();
}

/**
 * Subscribes to a media query. useSyncExternalStore rather than
 * useState-in-an-effect: the server snapshot is explicit, and the value is
 * read during render instead of one paint late.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (notify: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false // SSR: assume no match, so the rich path is the default.
  );
}

/** Live reduced-motion flag — 3D scenes need to react, not just read once. */
export function useReducedMotion() {
  return useMediaQuery(REDUCED_MOTION_QUERY);
}

/**
 * Device budget for 3D work. Coarse pointer or a narrow viewport means we cut
 * particle counts and effects rather than shipping a stuttering scene.
 */
export function useDeviceTier(): "low" | "high" {
  const coarse = useMediaQuery("(pointer: coarse)");
  const narrow = useMediaQuery("(max-width: 767px)");
  return coarse || narrow ? "low" : "high";
}

/** Standard section entrance: `data-reveal` children rise in sequence. */
export function revealChildren(scope: HTMLElement, start = "top 78%") {
  const items = scope.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!items.length) return;

  gsap.to(items, {
    opacity: 1,
    y: 0,
    duration: 1.1,
    ease: "expo.out",
    stagger: 0.09,
    scrollTrigger: { trigger: scope, start }
  });
}

/**
 * The set's one motion: ink drawing itself onto the sheet.
 *
 * Every `[data-draw]` path is measured, its own length written back as the
 * --len custom property the stylesheet already uses for the pre-hidden dash
 * offset, then drawn to zero. Measuring per-path rather than assuming a
 * length is what keeps a short leader line from crawling while a long section
 * cut snaps: the duration is scaled off the real length, so every line on the
 * sheet draws at one speed, the way a plotter does.
 */
export function drawLines(scope: HTMLElement, { start = "top 80%" } = {}) {
  const paths = scope.querySelectorAll<SVGGeometryElement>("[data-draw]");
  if (!paths.length) return;

  paths.forEach((path) => {
    // getTotalLength throws on a detached or display:none element; a sheet
    // hidden at this point simply keeps its stylesheet default.
    let len = 1200;
    try {
      len = Math.max(1, Math.round(path.getTotalLength()));
    } catch {
      /* keep the fallback */
    }
    path.style.setProperty("--len", String(len));
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len);

    gsap.to(path, {
      strokeDashoffset: 0,
      // One plotter speed for the whole sheet: ~900 user units a second.
      duration: gsap.utils.clamp(0.5, 2.4, len / 900),
      ease: "none",
      scrollTrigger: { trigger: scope, start }
    });
  });
}

export { gsap, ScrollTrigger };
