import { useEffect, useRef, useState } from "react";
import { CONTACT, NAV_LINKS } from "@/json/site/content";
import { cx } from "@/lib/utils";
import Cta from "@/ui/Cta/Cta";
import Wordmark from "./Wordmark";

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

export default function Nav() {
  const [condensed, setCondensed] = useState(false);
  const progress = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // The page runs to ~27 viewports; without this there is no sense of how
    // much is left. Written straight to the transform on a rAF, so it never
    // re-renders React while scrolling.
    let frame = 0;
    const paint = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      if (progress.current) {
        // Plain width, not a scale transform: Tailwind's scale-x-* utility
        // composes transform from CSS variables and fought the inline value.
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
    // Whichever section owns the middle of the viewport is the active one.
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
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6 md:pt-5">
      {/* Reading progress across the full viewport width. The page runs to
          ~27 viewports, so this is the only cue for how much is left. */}
      <span
        ref={progress}
        data-scroll-progress
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-0.5 w-0 bg-linear-to-r from-violet-600 via-violet-400 to-violet-300"
      />
      <nav
        aria-label="Primary"
        className={cx(
          "shell flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-5",
          condensed
            ? "border-ink-600/80 bg-ink-900/70 shadow-[0_0_40px_-12px_rgba(124,58,237,0.45)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <Wordmark />

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cx(
                    "relative flex min-h-11 items-center rounded-full px-4 text-sm transition-colors duration-300",
                    isActive ? "text-chalk" : "text-mist hover:text-chalk"
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={cx(
                      "absolute inset-x-4 -bottom-0.5 h-px origin-left bg-violet-500 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isActive ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Cta
            href={CONTACT.primaryCta.href}
            className="hidden px-5 py-2.5 text-[0.8125rem] sm:inline-flex"
          >
            Let&apos;s talk
          </Cta>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-600 text-chalk md:hidden"
          >
            <span className="sr-only">
              {menuOpen ? "Close menu" : "Open menu"}
            </span>
            <span aria-hidden className="relative block h-3 w-4">
              <span
                className={cx(
                  "absolute inset-x-0 h-px bg-current transition-all duration-300",
                  menuOpen ? "top-1.5 rotate-45" : "top-0"
                )}
              />
              <span
                className={cx(
                  "absolute inset-x-0 h-px bg-current transition-all duration-300",
                  menuOpen ? "top-1.5 -rotate-45" : "top-3"
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="mt-2 rounded-3xl border border-ink-600/80 bg-ink-900/95 p-6 backdrop-blur-xl md:hidden"
      >
        <ul className="flex flex-col gap-1">
          {[...NAV_LINKS, { label: "Contact", href: "#contact" }].map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-ink-700 py-4 text-2xl font-medium tracking-tight text-chalk last:border-0"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
