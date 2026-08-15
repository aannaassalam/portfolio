import { useEffect, useRef } from "react";
import { useMediaQuery, useReducedMotion } from "@/lib/motion";

/**
 * Desktop cursor: a precise dot that trails a ring, the ring opening up over
 * anything clickable. Never mounted on touch — a lagging ring on a phone is
 * just a bug with extra steps.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const finePointer = useMediaQuery("(pointer: fine)");
  const reduced = useReducedMotion();
  const enabled = finePointer && !reduced;

  useEffect(() => {
    if (!enabled) return;

    const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
    const trail = { ...pointer };
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
        dot.current.style.opacity = "1";
      }
    };

    const onOver = (event: PointerEvent) => {
      const interactive = (event.target as Element | null)?.closest?.(
        "a, button, [data-cursor='hover']"
      );
      ring.current?.toggleAttribute("data-active", Boolean(interactive));
    };

    // The ring lags on its own rAF loop; the dot tracks the pointer exactly.
    const tick = () => {
      trail.x += (pointer.x - trail.x) * 0.16;
      trail.y += (pointer.y - trail.y) * 0.16;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={ring}
        data-ring
        className="absolute left-0 top-0 h-8 w-8 rounded-full border border-violet-500/60 opacity-70 transition-[width,height,opacity,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] data-[active]:h-12 data-[active]:w-12 data-[active]:bg-violet-500/10 data-[active]:opacity-100"
      />
      <div
        ref={dot}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-chalk opacity-0 transition-opacity duration-300"
      />
    </div>
  );
}
