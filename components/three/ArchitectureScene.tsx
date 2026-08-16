import { useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  type RefObject
} from "react";
import * as THREE from "three";
import { seededRandom } from "@/lib/three/formations";
import { createFacadeMaterial } from "@/lib/three/facade";
import { useScrollEnergy } from "@/lib/motion";

interface ArchitectureSceneProps {
  /** 0–1 travel through the architecture, driven by scroll. */
  progress: RefObject<number>;
  tier: "low" | "high";
}

/**
 * The system-architecture flythrough: separate structures at the start,
 * wired into one platform by the end of the scroll.
 *
 * Built in two passes so bloom has something to bite on. Most towers are
 * dark, lit only by the scene; a minority are emissive and drawn with an
 * unlit material so their values stay above the bloom threshold. A city
 * where everything glows reads as noise — the contrast between dark bulk
 * and a few hot towers is what makes it read as depth.
 *
 * Colour follows the same logic: a violet key against a midnight-blue fill,
 * so shadows stay blue and highlights stay brand-violet instead of the whole
 * frame collapsing into one purple wash.
 */
export default function ArchitectureScene({
  progress,
  tier
}: ArchitectureSceneProps) {
  const dark = useRef<THREE.InstancedMesh>(null);
  const lit = useRef<THREE.InstancedMesh>(null);
  const links = useRef<THREE.LineSegments>(null);
  const linkMaterial = useRef<THREE.LineBasicMaterial>(null);
  const pulseAttr = useRef<THREE.BufferAttribute>(null);
  const pulseMat = useRef<THREE.PointsMaterial>(null);
  const energy = useScrollEnergy();

  const { towers, litIndex, darkIndex, linkPositions, pulses } = useMemo(() => {
    const rand = seededRandom(20240);
    const span = tier === "low" ? 4 : 7;
    const towers: { x: number; z: number; height: number; hot: boolean }[] = [];

    for (let gx = -span; gx <= span; gx++) {
      for (let gz = -span; gz <= span; gz++) {
        if (gx % 3 === 0 && gz % 4 === 0) continue; // streets
        if (rand() < 0.18) continue; // plazas
        towers.push({
          x: gx * 1.6 + (rand() - 0.5) * 0.3,
          z: gz * 1.6 + (rand() - 0.5) * 0.3,
          height: 0.4 + Math.pow(rand(), 2.2) * 5.5,
          // Roughly one in six carries light. Any more and the contrast dies.
          hot: rand() < 0.17
        });
      }
    }

    const litIndex: number[] = [];
    const darkIndex: number[] = [];
    towers.forEach((t, i) => (t.hot ? litIndex : darkIndex).push(i));

    // Wire each tower to its nearest neighbour to the east — a deliberate,
    // readable mesh rather than an all-pairs hairball.
    const segments: number[] = [];
    const pulses: {
      ax: number;
      ay: number;
      az: number;
      bx: number;
      by: number;
      bz: number;
      phase: number;
    }[] = [];

    for (let i = 0; i < towers.length; i++) {
      const a = towers[i];
      let best = -1;
      let bestDist = Infinity;
      for (let j = 0; j < towers.length; j++) {
        if (i === j || towers[j].x <= a.x) continue;
        const d = (towers[j].x - a.x) ** 2 + (towers[j].z - a.z) ** 2;
        if (d < bestDist) {
          bestDist = d;
          best = j;
        }
      }
      if (best < 0 || bestDist > 9) continue;
      const b = towers[best];
      segments.push(a.x, a.height, a.z, b.x, b.height, b.z);
      pulses.push({
        ax: a.x,
        ay: a.height,
        az: a.z,
        bx: b.x,
        by: b.height,
        bz: b.z,
        phase: rand()
      });
    }

    return {
      towers,
      litIndex,
      darkIndex,
      linkPositions: Float32Array.from(segments),
      pulses
    };
  }, [tier]);

  const pulsePositions = useMemo(
    () => new Float32Array(Math.max(pulses.length, 1) * 3),
    [pulses.length]
  );

  // PointsMaterial draws hard squares without a map. One tiny canvas sprite
  // turns them into soft round pulses; disposed with the scene.
  const pulseSprite = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.35, "rgba(255,255,255,0.55)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useEffect(() => () => pulseSprite.dispose(), [pulseSprite]);

  const darkFacade = useMemo(
    () =>
      createFacadeMaterial({
        color: "#171334",
        lit: "#7E6BD8",
        occupancy: 0.14,
        glow: 0.35,
        roughness: 0.6,
        metalness: 0.35
      }),
    []
  );

  const litFacade = useMemo(
    () =>
      createFacadeMaterial({
        color: "#1E1858",
        lit: "#A98CFF",
        occupancy: 0.48,
        glow: 1.15,
        roughness: 0.42,
        metalness: 0.5
      }),
    []
  );

  useEffect(
    () => () => {
      darkFacade.dispose();
      litFacade.dispose();
    },
    [darkFacade, litFacade]
  );

  useLayoutEffect(() => {
    const matrix = new THREE.Matrix4();
    const colour = new THREE.Color();

    // Takes the ref, not ref.current: the mutation target has to be
    // dereferenced inside, or it reads as mutating a plain local.
    const place = (
      ref: RefObject<THREE.InstancedMesh | null>,
      indices: number[],
      hot: boolean
    ) => {
      const mesh = ref.current;
      if (!mesh) return;
      indices.forEach((source, slot) => {
        const tower = towers[source];
        matrix.makeScale(0.62, tower.height, 0.62);
        matrix.setPosition(tower.x, tower.height / 2, tower.z);
        mesh.setMatrixAt(slot, matrix);
        if (hot) {
          // Hot towers drift across the two brand violets, so the skyline has
          // hue movement rather than one flat colour blown out by the bloom.
          colour.setHSL(0.72 + (slot % 5) * 0.014, 0.55, 0.5);
        } else {
          colour.setHSL(0.66, 0.42, 0.34 + (slot % 7) * 0.03);
        }
        mesh.setColorAt(slot, colour);
      });
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    };

    place(dark, darkIndex, false);
    place(lit, litIndex, true);
  }, [towers, litIndex, darkIndex]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = Math.min(Math.max(progress.current ?? 0, 0), 1);
    const flow = Math.min(Math.max(energy.current ?? 0, 0), 1);
    const ease = 1 - Math.exp(-6 * dt);

    // Descend from an overview into the structure, then level out inside it.
    const targetZ = 14 - t * 26;
    const targetY = 7.5 - t * 5.6;
    state.camera.position.z += (targetZ - state.camera.position.z) * ease;
    state.camera.position.y += (targetY - state.camera.position.y) * ease;
    state.camera.position.x +=
      (state.pointer.x * 1.6 - state.camera.position.x) * ease;
    state.camera.lookAt(0, 1.4 + (1 - t) * 0.8, targetZ - 12);
    // Roll must come AFTER lookAt, which writes the whole quaternion.
    // A slight bank on the way in, levelling off once the links resolve.
    state.camera.rotation.z = (1 - t) * 0.07 + state.pointer.x * 0.02;

    // Connections resolve only in the final third — the payoff of the section.
    const wired = Math.max(0, (t - 0.45) / 0.55);
    if (linkMaterial.current) linkMaterial.current.opacity = wired * 0.5;
    if (links.current) links.current.visible = t > 0.45;

    // Data running the links once they exist. This is what turns a static
    // diagram into a system that is visibly doing something.
    if (pulseAttr.current && pulses.length) {
      const arr = pulseAttr.current.array as Float32Array;
      const clock = state.clock.elapsedTime;
      for (let i = 0; i < pulses.length; i++) {
        const p = pulses[i];
        const u = (clock * 0.28 + p.phase) % 1;
        arr[i * 3] = p.ax + (p.bx - p.ax) * u;
        arr[i * 3 + 1] = p.ay + (p.by - p.ay) * u;
        arr[i * 3 + 2] = p.az + (p.bz - p.az) * u;
      }
      pulseAttr.current.needsUpdate = true;
    }
    if (pulseMat.current) {
      pulseMat.current.opacity = wired * (0.85 + flow * 0.15);
      pulseMat.current.size = 0.16 + flow * 0.06;
    }
  });

  return (
    <>
      <fogExp2 attach="fog" args={["#04040c", 0.03]} />
      {/* Midnight-blue ambient keeps shadows blue; the violet key is the only
          warm light, so the two never merge into one flat purple. */}
      <ambientLight intensity={0.5} color="#5A6BFF" />
      <directionalLight
        position={[6, 12, 4]}
        intensity={0.55}
        color="#C4B5FD"
      />
      <pointLight
        position={[0, 6, -6]}
        intensity={22}
        distance={34}
        color="#7C3AED"
      />
      <pointLight
        position={[-9, 3, 6]}
        intensity={10}
        distance={26}
        color="#3B4BCC"
      />

      {/* Structural mass: dark, lit only by the scene. */}
      <instancedMesh
        ref={dark}
        args={[undefined, undefined, darkIndex.length]}
        castShadow={false}
      >
        <boxGeometry args={[1, 1, 1]} />
        <primitive object={darkFacade} attach="material" />
      </instancedMesh>

      {/* Lit towers: unlit and untone-mapped, so their values stay above the
          bloom threshold instead of being crushed by ACES. */}
      <instancedMesh
        ref={lit}
        args={[undefined, undefined, litIndex.length]}
        castShadow={false}
      >
        <boxGeometry args={[1, 1, 1]} />
        <primitive object={litFacade} attach="material" />
      </instancedMesh>

      <lineSegments ref={links}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linkPositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          ref={linkMaterial}
          color="#A855F7"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute
            ref={pulseAttr}
            attach="attributes-position"
            args={[pulsePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={pulseMat}
          map={pulseSprite}
          color="#EDE9FE"
          size={0.16}
          sizeAttenuation
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Ground: dark and slightly reflective so the towers sit on something. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[140, 140]} />
        <meshStandardMaterial
          color="#05050c"
          roughness={0.72}
          metalness={0.5}
        />
      </mesh>

      {/* Bloom only — no other passes. The threshold sits above the structural
          towers, so only the hot ones and the pulses flare. Skipped on the low
          tier, where the extra fill cost is not worth it. */}
      {tier === "high" && (
        <EffectComposer enableNormalPass={false}>
          <Bloom
            intensity={0.55}
            luminanceThreshold={0.62}
            luminanceSmoothing={0.2}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </>
  );
}
