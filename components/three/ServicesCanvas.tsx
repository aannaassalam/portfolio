import { useDeviceTier } from "@/lib/motion";
import type { FormationName } from "@/lib/three/formations";
import Stage from "./Stage";
import ServiceScene from "./ServiceScene";

export default function ServicesCanvas({
  formation
}: {
  formation: FormationName;
}) {
  const tier = useDeviceTier();

  return (
    <Stage
      camera={{ position: [0, 0, 5.4], fov: 45 }}
      fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-56 w-56 rounded-full border border-violet-600/30 bg-[radial-gradient(circle,rgba(124,58,237,0.22),transparent_70%)]" />
        </div>
      }
    >
      <ServiceScene formation={formation} tier={tier} />
    </Stage>
  );
}
