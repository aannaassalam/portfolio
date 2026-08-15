import { useFrame } from "@react-three/fiber";
import { useRef, type RefObject } from "react";
import * as THREE from "three";
import PointField from "./PointField";

interface HeroSceneProps {
  /** 0 at rest, 1 when the hero has scrolled fully away. */
  dispersion: RefObject<number>;
  tier: "low" | "high";
}

/**
 * The digital core: an organised lattice of nodes that comes apart as the
 * visitor scrolls. Assembly on load and dispersal on scroll are the same
 * mechanism run in opposite directions.
 */
export default function HeroScene({ dispersion, tier }: HeroSceneProps) {
  const system = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const key = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const spread = Math.min(Math.max(dispersion.current ?? 0, 0), 1);
    const ease = 1 - Math.exp(-3 * dt);

    if (system.current) {
      system.current.rotation.y += dt * 0.11;
      // Cursor tilts the whole structure rather than swinging the camera —
      // reads as inspecting an object, not a shaky handheld shot.
      system.current.rotation.x +=
        (state.pointer.y * 0.18 - system.current.rotation.x) * ease;

      // Wide screens park the core right of the headline. Narrow ones have
      // no horizontal room, so it drops below the copy instead of sitting
      // behind it — the text has to stay readable either way.
      const wide = state.size.width >= 1024;
      const targetX = (wide ? 2.1 : 0) + state.pointer.x * 0.25;
      const targetY = wide ? 0 : -2.6;
      system.current.position.x +=
        (targetX - system.current.position.x) * ease;
      system.current.position.y +=
        (targetY - system.current.position.y) * ease;
    }

    if (rings.current) {
      rings.current.rotation.z -= dt * 0.06;
      rings.current.traverse((child) => {
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.Material | undefined;
        if (material && "opacity" in material) {
          material.opacity = 0.34 * (1 - spread);
        }
      });
    }

    if (shell.current) {
      const scale = 1 - spread * 0.75;
      shell.current.scale.setScalar(Math.max(scale, 0.001));
      shell.current.rotation.y -= dt * 0.07;
    }

    if (key.current) key.current.intensity = 14 * (1 - spread * 0.6);

    // Camera pushes in as the system comes apart: closer, and inside it.
    // Narrow viewports start further back so the whole object fits.
    const restZ = state.size.width >= 1024 ? 7.2 : 9.6;
    state.camera.position.z += (restZ - spread * 3.8 - state.camera.position.z) * ease;
    state.camera.lookAt(0, state.size.width >= 1024 ? 0 : -1.6, 0);
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight ref={key} position={[2.5, 2, 3]} intensity={14} color="#8B5CF6" />
      <pointLight position={[-3, -1.5, -2]} intensity={6} color="#C4B5FD" />

      <group ref={system}>
        <PointField
          count={tier === "low" ? 1400 : 3200}
          formation="core"
          dispersion={dispersion}
          assemble
          edges
          size={tier === "low" ? 6 : 7}
          lambda={1.6}
        />

        {/* Solid heart of the object — the only lit surface in the scene. */}
        <mesh ref={shell}>
          <icosahedronGeometry args={[0.42, 1]} />
          <meshStandardMaterial
            color="#0B0B0F"
            emissive="#4C1D95"
            emissiveIntensity={0.3}
            roughness={0.22}
            metalness={0.95}
            flatShading
          />
        </mesh>

        <group ref={rings}>
          {[
            { radius: 1.78, rotation: [Math.PI / 2, 0, 0] },
            { radius: 2.0, rotation: [Math.PI / 2.3, 0.5, 0] },
            { radius: 2.24, rotation: [Math.PI / 1.8, -0.4, 0.3] }
          ].map((ring) => (
            <mesh
              key={ring.radius}
              rotation={ring.rotation as [number, number, number]}
            >
              <torusGeometry args={[ring.radius, 0.004, 3, 128]} />
              <meshBasicMaterial
                color="#A855F7"
                transparent
                opacity={0.34}
                depthWrite={false}
              />
            </mesh>
          ))}
        </group>
      </group>
    </>
  );
}
