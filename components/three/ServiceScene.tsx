import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useScrollEnergy } from "@/lib/motion";
import * as THREE from "three";
import PointField from "./PointField";
import type { FormationName } from "@/lib/three/formations";

interface ServiceSceneProps {
  /** Changing this morphs the cloud into the next discipline's shape. */
  formation: FormationName;
  tier: "low" | "high";
}

export default function ServiceScene({ formation, tier }: ServiceSceneProps) {
  const group = useRef<THREE.Group>(null);
  const energy = useScrollEnergy();

  useFrame((state, delta) => {
    if (!group.current) return;
    const dt = Math.min(delta, 0.05);
    const ease = 1 - Math.exp(-2.5 * dt);

    group.current.rotation.y +=
      (state.pointer.x * 0.35 - group.current.rotation.y) * ease + dt * 0.04;
    group.current.rotation.x +=
      (state.pointer.y * 0.14 - group.current.rotation.x) * ease;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 4]} intensity={10} color="#8B5CF6" />
      <group ref={group}>
        <PointField
          count={tier === "low" ? 1200 : 2600}
          formation={formation}
          size={tier === "low" ? 6 : 6.5}
          lambda={2.1}
          opacity={0.85}
          seed={4242}
          energy={energy}
        />
      </group>
    </>
  );
}
