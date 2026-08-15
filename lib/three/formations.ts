/**
 * Point-cloud formations.
 *
 * Every 3D scene on the site is the same primitive: one buffer of points that
 * lerps between named target formations. "Complexity becoming organised" is
 * literally the morph, so hero, scroll break-up and the six service visuals
 * all share this file instead of each shipping its own geometry.
 */

export type Formation = (count: number, rand: () => number) => Float32Array;

/** Deterministic PRNG — identical clouds on server, client and re-render. */
export function seededRandom(seed = 0x9e3779b9) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TAU = Math.PI * 2;

function buffer(count: number) {
  return new Float32Array(count * 3);
}

/** Evenly distributed direction on a unit sphere (Fibonacci lattice). */
function fibonacciDirection(i: number, total: number) {
  const y = 1 - (i / Math.max(total - 1, 1)) * 2;
  const radius = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = i * 2.399963229728653; // golden angle
  return [Math.cos(theta) * radius, y, Math.sin(theta) * radius] as const;
}

/** The organised state: a shell of nodes wrapped around three orbital bands. */
const core: Formation = (count, rand) => {
  const out = buffer(count);
  const shellCount = Math.floor(count * 0.7);

  for (let i = 0; i < count; i++) {
    const o = i * 3;

    if (i < shellCount) {
      const [x, y, z] = fibonacciDirection(i, shellCount);
      const r = 1.35 + (rand() - 0.5) * 0.1;
      out[o] = x * r;
      out[o + 1] = y * r;
      out[o + 2] = z * r;
      continue;
    }

    // Inner orbital bands, each tilted on a different axis.
    const band = (i - shellCount) % 3;
    const angle = rand() * TAU;
    const r = 0.55 + band * 0.32 + (rand() - 0.5) * 0.05;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const y = (rand() - 0.5) * 0.06;
    const tilt = band * 0.7;

    out[o] = x;
    out[o + 1] = y * Math.cos(tilt) - z * Math.sin(tilt);
    out[o + 2] = y * Math.sin(tilt) + z * Math.cos(tilt);
  }

  return out;
};

/** The unresolved state: the same nodes, no structure. */
const scatter: Formation = (count, rand) => {
  const out = buffer(count);
  for (let i = 0; i < count; i++) {
    const o = i * 3;
    const [x, y, z] = fibonacciDirection(i, count);
    const r = 2.2 + rand() * 5.5;
    out[o] = x * r + (rand() - 0.5) * 2;
    out[o + 1] = y * r * 0.55 + (rand() - 0.5) * 2;
    out[o + 2] = z * r - rand() * 3;
  }
  return out;
};

/** Web: stacked application layers, seen as three offset panels. */
const web: Formation = (count, rand) => {
  const out = buffer(count);
  const layers = 3;

  for (let i = 0; i < count; i++) {
    const o = i * 3;
    const layer = i % layers;
    const z = (layer - 1) * 0.85;
    const w = 2.5 - layer * 0.18;
    const h = 1.6 - layer * 0.12;
    const edge = rand() < 0.55;

    // Edge points draw the panel; the rest suggest content inside it.
    if (edge) {
      const t = rand() * 4;
      const side = Math.floor(t);
      const f = t - side;
      const x = side % 2 === 0 ? -w / 2 + f * w : side === 1 ? w / 2 : -w / 2;
      const y = side % 2 === 0 ? (side === 0 ? h / 2 : -h / 2) : -h / 2 + f * h;
      out[o] = x;
      out[o + 1] = y;
    } else {
      const row = Math.floor(rand() * 6);
      out[o] = (rand() - 0.5) * (w - 0.5);
      out[o + 1] = h / 2 - 0.34 - row * 0.22;
    }

    out[o + 2] = z + (rand() - 0.5) * 0.04;
  }

  return out;
};

/** Mobile: a single device silhouette with interface rows inside it. */
const mobile: Formation = (count, rand) => {
  const out = buffer(count);
  const w = 1.15;
  const h = 2.3;

  for (let i = 0; i < count; i++) {
    const o = i * 3;
    const outline = rand() < 0.42;

    if (outline) {
      const t = rand() * TAU;
      // Superellipse gives the rounded-rectangle device edge.
      const c = Math.cos(t);
      const s = Math.sin(t);
      out[o] = (Math.sign(c) * Math.pow(Math.abs(c), 0.35) * w) / 2;
      out[o + 1] = (Math.sign(s) * Math.pow(Math.abs(s), 0.35) * h) / 2;
    } else {
      const row = Math.floor(rand() * 9);
      const rowWidth = row === 0 ? w * 0.72 : w * (0.4 + rand() * 0.4);
      out[o] = (rand() - 0.5) * rowWidth;
      out[o + 1] = h / 2 - 0.3 - row * 0.22;
    }

    out[o + 2] = (rand() - 0.5) * 0.12;
  }

  return out;
};

/** SaaS: a dashboard grid — panels plus a plotted series. */
const saas: Formation = (count, rand) => {
  const out = buffer(count);
  const cols = 4;
  const rows = 3;

  for (let i = 0; i < count; i++) {
    const o = i * 3;
    const cell = i % (cols * rows);
    const cx = (cell % cols) - (cols - 1) / 2;
    const cy = (rows - 1) / 2 - Math.floor(cell / cols);
    const px = cx * 0.86;
    const py = cy * 0.78;

    if (rand() < 0.3) {
      // A rising series across the middle band.
      const t = rand();
      out[o] = -1.7 + t * 3.4;
      out[o + 1] = -0.4 + Math.sin(t * 6.2) * 0.18 + t * 0.8;
      out[o + 2] = 0.5;
      continue;
    }

    out[o] = px + (rand() - 0.5) * 0.7;
    out[o + 1] = py + (rand() - 0.5) * 0.62;
    out[o + 2] = (rand() - 0.5) * 0.5;
  }

  return out;
};

/** AI: feed-forward layers with points travelling the connections. */
const ai: Formation = (count, rand) => {
  const out = buffer(count);
  const layers = [4, 7, 7, 3];
  const spacing = 1.15;
  const offset = ((layers.length - 1) * spacing) / 2;

  for (let i = 0; i < count; i++) {
    const o = i * 3;
    const onEdge = rand() < 0.45 && layers.length > 1;

    if (onEdge) {
      const l = Math.floor(rand() * (layers.length - 1));
      const a = Math.floor(rand() * layers[l]);
      const b = Math.floor(rand() * layers[l + 1]);
      const t = rand();
      const ax = l * spacing - offset;
      const bx = (l + 1) * spacing - offset;
      const ay = (a - (layers[l] - 1) / 2) * 0.42;
      const by = (b - (layers[l + 1] - 1) / 2) * 0.42;
      out[o] = ax + (bx - ax) * t;
      out[o + 1] = ay + (by - ay) * t;
      out[o + 2] = (rand() - 0.5) * 0.1;
      continue;
    }

    const l = Math.floor(rand() * layers.length);
    const n = Math.floor(rand() * layers[l]);
    const angle = rand() * TAU;
    const r = rand() * 0.13;
    out[o] = l * spacing - offset + Math.cos(angle) * r;
    out[o + 1] = (n - (layers[l] - 1) / 2) * 0.42 + Math.sin(angle) * r;
    out[o + 2] = (rand() - 0.5) * 0.18;
  }

  return out;
};

/** Backend: stacked storage cylinders wired to a service ring. */
const backend: Formation = (count, rand) => {
  const out = buffer(count);
  const stacks = [-1.25, 0, 1.25];

  for (let i = 0; i < count; i++) {
    const o = i * 3;
    const role = rand();

    if (role < 0.62) {
      const x = stacks[i % stacks.length];
      const disk = Math.floor(rand() * 3);
      const angle = rand() * TAU;
      const r = 0.46;
      const onRim = rand() < 0.7;
      const rr = onRim ? r : r * Math.sqrt(rand());
      out[o] = x + Math.cos(angle) * rr;
      out[o + 1] = -0.7 + disk * 0.55 + (onRim ? (rand() - 0.5) * 0.34 : 0);
      out[o + 2] = Math.sin(angle) * rr * 0.5;
      continue;
    }

    // Request paths arcing over the stacks.
    const t = rand();
    const from = stacks[Math.floor(rand() * stacks.length)];
    const to = stacks[Math.floor(rand() * stacks.length)];
    out[o] = from + (to - from) * t;
    out[o + 1] = 1.05 + Math.sin(t * Math.PI) * 0.5;
    out[o + 2] = (rand() - 0.5) * 0.6;
  }

  return out;
};

/** Cloud: distributed regions, loosely connected. */
const cloud: Formation = (count, rand) => {
  const out = buffer(count);
  const regions = 6;
  const centres: number[][] = [];

  for (let r = 0; r < regions; r++) {
    const a = (r / regions) * TAU;
    centres.push([Math.cos(a) * 1.75, Math.sin(a * 2) * 0.62, Math.sin(a) * 1.2]);
  }

  for (let i = 0; i < count; i++) {
    const o = i * 3;

    if (rand() < 0.3) {
      // Traffic between regions.
      const a = centres[Math.floor(rand() * regions)];
      const b = centres[Math.floor(rand() * regions)];
      const t = rand();
      out[o] = a[0] + (b[0] - a[0]) * t;
      out[o + 1] = a[1] + (b[1] - a[1]) * t;
      out[o + 2] = a[2] + (b[2] - a[2]) * t;
      continue;
    }

    const c = centres[i % regions];
    const [dx, dy, dz] = fibonacciDirection(i, count);
    const r = 0.18 + rand() * 0.3;
    out[o] = c[0] + dx * r;
    out[o + 1] = c[1] + dy * r;
    out[o + 2] = c[2] + dz * r;
  }

  return out;
};

export const FORMATIONS = {
  core,
  scatter,
  web,
  mobile,
  saas,
  ai,
  backend,
  cloud
} satisfies Record<string, Formation>;

export type FormationName = keyof typeof FORMATIONS;

export function buildFormation(
  name: FormationName,
  count: number,
  seed = 1337
) {
  return FORMATIONS[name](count, seededRandom(seed));
}

/**
 * Neighbour pairs within the organised formation, used to draw the network
 * edges. Computed once against `core`; the line buffer is then refilled from
 * whatever the points are currently morphed to, so edges stretch as the
 * structure breaks apart.
 */
export function buildNeighbourPairs(
  positions: Float32Array,
  maxDistance = 0.16,
  maxPairs = 420
) {
  const pairs: number[] = [];
  const count = positions.length / 3;
  const maxSq = maxDistance * maxDistance;

  // Stride rather than "first N points": the Fibonacci lattice orders points
  // pole to pole, so taking a prefix would wire up one cap and nothing else.
  const stride = Math.max(1, Math.floor(count / maxPairs));

  for (let i = 0; i < count && pairs.length < maxPairs * 2; i += stride) {
    let linked = 0;
    for (let j = i + 1; j < count && linked < 2; j++) {
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      if (dx * dx + dy * dy + dz * dz < maxSq) {
        pairs.push(i, j);
        linked++;
      }
    }
  }

  return Uint16Array.from(pairs);
}
