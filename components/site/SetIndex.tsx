import { useEffect, useRef, useState } from "react";
import { NAV_LINKS, SHEETS } from "@/json/site/content";
import { lockScroll } from "@/lib/motion";
import { cx } from "@/lib/utils";
import Wordmark from "./Wordmark";

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

/** Sheet number for each nav target, so the rail reads as a set index. */
const INDEX = NAV_LINKS.map((link) => {
  const id = link.href.slice(1);
  return { ...link, id, no: SHEETS.find((s) => s.id === id)?.no ?? "99" };
}).sort((a, b) => a.no.localeCompare(b.no));

/**
 * Navigation as the set's index strip: sheet numbers and titles, not menu
 * items. It stays printed on the paper rather than floating over it — no
 * blur, no shadow, no pill — because nothing on a drawing hovers above the
 * sheet. The rule beneath it thickens when you leave the first sheet, which
 * is the only state change it needs.
 */
export default function SetIndex() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Written straight to the style on a rAF so scrolling never re-renders.
    let frame = 0;
    const paint = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio =
        max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      if (progress.current) {
        progress.current.style.width = `${(ratio * 100).toFixed(3)}%`;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        onClick={() => setOpen(false)}
        className={cx(
          "fixed inset-0 -z-10 bg-ink-900/45 transition-opacity duration-400 ease-draw md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <div
        className={cx(
          "bg-print-200/95 transition-[border-color,background-color] duration-500 ease-draw",
          scrolled ? "border-b border-ink-700" : "border-b border-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="shell flex items-center gap-6 py-3"
        >
          <Wordmark />

          <ul className="ml-auto hidden items-center gap-7 md:flex">
            {INDEX.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className="group flex min-h-11 items-baseline gap-2"
                  >
                    <span
                      className={cx(
                        "field-sm tracking-[0.12em] transition-colors duration-300",
                        isActive ? "text-redline" : "text-ink-300"
                      )}
                    >
                      {item.no}
                    </span>
                    <span
                      className={cx(
                        "lettering text-xs tracking-[0.1em] transition-colors duration-300",
                        isActive
                          ? "text-ink-900"
                          : "text-ink-500 group-hover:text-ink-900"
                      )}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href="#contact"
            className="ml-auto hidden font-measure text-[0.6875rem] tracking-[0.14em] text-plate underline decoration-plate/40 decoration-1 underline-offset-4 transition-colors duration-300 hover:text-plate-deep md:ml-0 md:block"
          >
            10 ISSUE →
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="sheet-index"
            className="ml-auto flex min-h-11 items-center gap-2 md:hidden"
          >
            <span className="field">{open ? "Close" : "Index"}</span>
            <span aria-hidden className="relative block h-3 w-4">
              <span
                className={cx(
                  "absolute inset-x-0 h-px bg-ink-900 transition-all duration-300",
                  open ? "top-1.5 rotate-45" : "top-0"
                )}
              />
              <span
                className={cx(
                  "absolute inset-x-0 h-px bg-ink-900 transition-all duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3"
                )}
              />
            </span>
          </button>
        </nav>

        {/* Reading progress, drawn in red pencil along the sheet edge. */}
        <span
          ref={progress}
          data-scroll-progress
          aria-hidden
          className="block h-0.5 w-0 bg-redline"
        />
      </div>

      {/* The full set index, on a phone. Every sheet, not just the four. */}
      <div
        id="sheet-index"
        hidden={!open}
        className="border-b border-ink-700 bg-print-100 md:hidden"
      >
        <ol className="shell py-2">
          {SHEETS.map((sheet) => (
            <li key={sheet.no}>
              <a
                href={`#${sheet.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-ink-700/20 py-3.5 last:border-0"
              >
                <span className="font-measure text-[0.6875rem] text-plate">
                  {sheet.no}
                </span>
                <span className="lettering text-base tracking-[0.06em]">
                  {sheet.title}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </header>
  );
}
