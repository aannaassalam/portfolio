import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { seededRandom } from "@/lib/three/formations";

interface ArchitectureSceneProps {
  /** 0–1 travel through the architecture, driven by scroll. */
  progress: RefObject<number>;
  tier: "low" | "high";
}

const BASE = new THREE.Color("#0B0B0F");
const LIT = new THREE.Color("#7C3AED");

/** Towers on a grid, with the road cells left empty. */
function buildCity(span: number, rand: () => number) {
  const towers: { x: number; z: number; height: number; lit: number }[] = [];

  for (let gx = -span; gx <= span; gx++) {
    for (let gz = -span; gz <= span; gz++) {
      if (gx % 3 === 0 && gz % 4 === 0) continue; // streets
      if (rand() < 0.18) continue; // plazas

      towers.push({
        x: gx * 1.6 + (rand() - 0.5) * 0.3,
        z: gz * 1.6 + (rand() - 0.5) * 0.3,
        height: 0.4 + Math.pow(rand(), 2.2) * 5.5,
        lit: rand()
      });
    }
  }

  return towers;
}

/**
 * The system-architecture flythrough: separate structures at the start,
 * wired into one platform by the end of the scroll.
 */
export default function ArchitectureScene({
  progress,
  tier
}: ArchitectureSceneProps) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const links = useRef<THREE.LineSegments>(null);
  const linkMaterial = useRef<THREE.LineBasicMaterial>(null);

  const { towers, linkPositions } = useMemo(() => {
    const rand = seededRandom(20240);
    const towers = buildCity(tier === "low" ? 4 : 7, rand);

    // Wire each tower to its nearest neighbour to the east — a deliberate,
    // readable mesh rather than an all-pairs hairball.
    const segments: number[] = [];
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
    }

    return { towers, linkPositions: Float32Array.from(segments) };
  }, [tier]);

  useLayoutEffect(() => {
    const instanced = mesh.current;
    if (!instanced) return;

    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();

    towers.forEach((tower, i) => {
      matrix.makeScale(0.62, tower.height, 0.62);
      matrix.setPosition(tower.x, tower.height / 2, tower.z);
      instanced.setMatrixAt(i, matrix);
      // A minority of structures glow; a city of uniform neon is noise.
      color.copy(BASE).lerp(LIT, tower.lit > 0.82 ? 0.55 : tower.lit * 0.12);
      instanced.setColorAt(i, color);
    });

    instanced.instanceMatrix.needsUpdate = true;
    if (instanced.instanceColor) instanced.instanceColor.needsUpdate = true;
  }, [towers]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = Math.min(Math.max(progress.current ?? 0, 0), 1);
    const ease = 1 - Math.exp(-6 * dt);

    // Descend from an overview into the structure, then level out inside it.
    const targetZ = 14 - t * 26;
    const targetY = 7.5 - t * 5.6;
    state.camera.position.z += (targetZ - state.camera.position.z) * ease;
    state.camera.position.y += (targetY - state.camera.position.y) * ease;
    state.camera.position.x += (state.pointer.x * 1.6 - state.camera.position.x) * ease;
    state.camera.lookAt(0, 1.4 + (1 - t) * 0.8, targetZ - 12);

    // Connections resolve only in the final third — the payoff of the section.
    if (linkMaterial.current) {
      linkMaterial.current.opacity = Math.max(0, (t - 0.45) / 0.55) * 0.5;
    }
    if (links.current) links.current.visible = t > 0.45;
  });

  return (
    <>
      <fogExp2 attach="fog" args={["#050505", 0.045]} />
      <ambientLight intensity={0.38} />
      <directionalLight position={[6, 12, 4]} intensity={0.8} color="#C4B5FD" />
      <pointLight position={[0, 6, -6]} intensity={16} distance={30} color="#7C3AED" />

      <instancedMesh
        ref={mesh}
        args={[undefined, undefined, towers.length]}
        castShadow={false}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          roughness={0.55}
          metalness={0.35}
          emissive="#2A0E63"
          emissiveIntensity={0.18}
        />
      </instancedMesh>

      <lineSegments ref={links}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linkPositions, 3]} />
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

      {/* Ground: reflective-dark plane so towers sit on something. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#080808" roughness={0.9} metalness={0.2} />
      </mesh>
    </>
  );
}
