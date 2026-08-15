import { RefObject, useEffect, useState } from "react";

// Doc : https://usehooks.com/useOnScreen/

export function useOnScreen<T extends Element>(
  ref: RefObject<T | null>,
  rootMargin: string = "0px"
): boolean {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    // Capture the node so cleanup can't read a ref that has already detached.
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isIntersecting;
}
