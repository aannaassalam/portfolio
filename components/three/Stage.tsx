import { Canvas, type CanvasProps } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, type ReactNode } from "react";
import { useOnScreen } from "@/hooks/utils/useOnScreen";
import { useDeviceTier, useReducedMotion } from "@/lib/motion";
import { cx } from "@/lib/utils";

interface StageProps extends Omit<CanvasProps, "children"> {
  children: ReactNode;
  className?: string;
  /** Rendered instead of the scene when the visitor opts out of motion. */
  fallback?: ReactNode;
}

/**
 * Shared R3F canvas. Owns the three things every scene here needs and none of
 * them should re-implement: a DPR ceiling, a render loop that stops when the
 * section scrolls away, and a static fallback for reduced motion.
 */
export default function Stage({
  children,
  className,
  fallback = null,
  ...props
}: StageProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const visible = useOnScreen(wrapper, "200px");
  const tier = useDeviceTier();
  const reduced = useReducedMotion();

  return (
    <div
      ref={wrapper}
      className={cx("absolute inset-0", className)}
      aria-hidden="true"
    >
      {reduced ? (
        fallback
      ) : (
        <Canvas
          frameloop={visible ? "always" : "never"}
          dpr={[1, tier === "low" ? 1.25 : 1.75]}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
            // Three's colour management is on by default; pair it with a tone
            // map so HDR emissive values roll off instead of clipping to white.
            // Verified against three 0.185.
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05,
            outputColorSpace: THREE.SRGBColorSpace
          }}
          {...props}
        >
          {children}
        </Canvas>
      )}
    </div>
  );
}
