import { useFrame } from "@react-three/fiber";
import { useRef, type RefObject } from "react";
import * as THREE from "three";
import PointField from "./PointField";
import { useScrollEnergy } from "@/lib/motion";

interface HeroSceneProps {
  /** 0 at rest, 1 when the hero has scrolled fully away. */
  dispersion: RefObject<number>;
  tier: "low" | "high";
}

/**
 * The digital core.
 *
 * Four layers, all driven by one dispersion value so they come apart as a
 * single system:
 *
 *   lattice   geodesic wireframe — the hard structure. A point cloud alone
 *             reads as dust; this is what gives the sphere mass and edge.
 *   points    the node field, with its neighbour edges
 *   nucleus   a lit solid inside a counter-rotating cage
 *   rings     orbital bands, the widest silhouette
 *
 * Assembly on load and dispersal on scroll are the same mechanism run in
 * opposite directions.
 */
export default function HeroScene({ dispersion, tier }: HeroSceneProps) {
  const system = useRef<THREE.Group>(null);
  const lattice = useRef<THREE.Mesh>(null);
  const latticeMat = useRef<THREE.MeshBasicMaterial>(null);
  const cage = useRef<THREE.Mesh>(null);
  const cageMat = useRef<THREE.MeshBasicMaterial>(null);
  const rings = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const key = useRef<THREE.PointLight>(null);
  const energy = useScrollEnergy();

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const spread = Math.min(Math.max(dispersion.current ?? 0, 0), 1);
    const flow = Math.min(Math.max(energy.current ?? 0, 0), 1);
    const ease = 1 - Math.exp(-3 * dt);
    const wideView = state.size.width >= 1024;

    if (system.current) {
      system.current.rotation.y += dt * 0.11;
      // Cursor tilts the whole structure rather than swinging the camera —
      // reads as inspecting an object, not a shaky handheld shot.
      system.current.rotation.x +=
        (state.pointer.y * 0.18 - system.current.rotation.x) * ease;

      // Wide screens park the core right of the headline. Narrow ones have
      // no horizontal room, so it drops below the copy instead of sitting
      // behind it — the text has to stay readable either way.
      const targetX = (wideView ? 2.55 : 0) + state.pointer.x * 0.25;
      const targetY = wideView ? 0 : -3.0;
      system.current.position.x += (targetX - system.current.position.x) * ease;
      system.current.position.y += (targetY - system.current.position.y) * ease;
    }

    // The lattice counter-rotates against the system so the two shells shear
    // past each other — that relative motion is what reads as depth.
    if (lattice.current) {
      lattice.current.rotation.y -= dt * 0.19;
      lattice.current.rotation.x += dt * 0.05;
      // Expands and thins as the system breaks up, like the cloud does.
      lattice.current.scale.setScalar(1 + spread * 0.85 + flow * 0.03);
    }
    if (latticeMat.current) {
      // Reads far heavier on a narrow viewport, where it lands behind the
      // lede and the CTAs.
      latticeMat.current.opacity = (wideView ? 0.16 : 0.09) * (1 - spread);
    }

    if (cage.current) {
      cage.current.rotation.y += dt * 0.26;
      cage.current.rotation.z -= dt * 0.13;
      cage.current.scale.setScalar(Math.max(1 - spread * 0.6, 0.001));
    }
    if (cageMat.current) {
      cageMat.current.opacity = (wideView ? 0.3 : 0.18) * (1 - spread);
    }

    if (rings.current) {
      rings.current.rotation.z -= dt * 0.06;
      rings.current.rotation.x += dt * 0.02;
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

    // Key light dims as the core disperses, and flares a little on fast scroll.
    if (key.current) {
      key.current.intensity = 14 * (1 - spread * 0.6) * (1 + flow * 0.35);
    }

    // Camera pushes in as the system comes apart: closer, and inside it.
    // Narrow viewports start further back so the whole object fits.
    const restZ = wideView ? 7.8 : 11.2;
    state.camera.position.z +=
      (restZ - spread * 3.8 - state.camera.position.z) * ease;
    state.camera.lookAt(0, wideView ? 0 : -1.9, 0);
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight
        ref={key}
        position={[2.5, 2, 3]}
        intensity={14}
        color="#8B5CF6"
      />
      <pointLight position={[-3, -1.5, -2]} intensity={6} color="#C4B5FD" />

      <group ref={system}>
        {/* Geodesic shell. Detail 1 keeps it to 80 faces — enough triangulation
            to read as engineered, few enough to stay legible behind the type. */}
        <mesh ref={lattice}>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshBasicMaterial
            ref={latticeMat}
            color="#A855F7"
            wireframe
            transparent
            opacity={0.16}
            depthWrite={false}
          />
        </mesh>

        <PointField
          count={tier === "low" ? 1400 : 3200}
          formation="core"
          dispersion={dispersion}
          assemble
          edges
          size={tier === "low" ? 6 : 7}
          lambda={1.6}
          energy={energy}
          burst={0}
        />

        {/* Cage around the nucleus, spinning the other way again. Without it
            the lit solid reads as a lone bead rather than a contained core. */}
        <mesh ref={cage}>
          <icosahedronGeometry args={[0.74, 0]} />
          <meshBasicMaterial
            ref={cageMat}
            color="#8B5CF6"
            wireframe
            transparent
            opacity={0.3}
            depthWrite={false}
          />
        </mesh>

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
