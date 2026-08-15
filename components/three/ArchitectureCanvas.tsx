import type { RefObject } from "react";
import { useDeviceTier } from "@/lib/motion";
import Stage from "./Stage";
import ArchitectureScene from "./ArchitectureScene";

export default function ArchitectureCanvas({
  progress
}: {
  progress: RefObject<number>;
}) {
  const tier = useDeviceTier();

  return (
    <Stage
      camera={{ position: [0, 7.5, 14], fov: 52 }}
      fallback={
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(76,29,149,0.35),transparent_65%)]" />
      }
    >
      <ArchitectureScene progress={progress} tier={tier} />
    </Stage>
  );
}
