import type { RefObject } from "react";
import { useDeviceTier } from "@/lib/motion";
import Stage from "./Stage";
import HeroScene from "./HeroScene";

/**
 * Dynamic-import boundary for the hero. Everything three.js-shaped lives
 * behind these Canvas wrappers so the first HTML payload stays free of it.
 */
export default function HeroCanvas({
  dispersion
}: {
  dispersion: RefObject<number>;
}) {
  const tier = useDeviceTier();

  return (
    <Stage
      camera={{ position: [0, 0, 7.8], fov: 46 }}
      fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.32),transparent_70%)]" />
        </div>
      }
    >
      <HeroScene dispersion={dispersion} tier={tier} />
    </Stage>
  );
}
