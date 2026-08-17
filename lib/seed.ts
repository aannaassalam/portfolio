/**
 * Deterministic PRNG (mulberry32). Every scattered mark on a drawing sheet —
 * survey points, freehand cloud scallops, the wobble on a hand-drawn line —
 * comes from a seed rather than Math.random, because these values are computed
 * during render and land in server-rendered SVG attributes. An unseeded value
 * would differ between the server and the client and hydration would warn.
 *
 * Lifted intact from the retired lib/three/formations.ts, which is the only
 * thing worth keeping from the previous visual world.
 */
export function seededRandom(seed = 0x9e3779b9) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Math.pow/sin are not bit-identical between Node's V8 and the browser's, and
 * these numbers land straight in SSR'd attributes — so every derived coordinate
 * is rounded to two places before it reaches the DOM.
 */
export const fixed = (n: number) => Math.round(n * 100) / 100;
