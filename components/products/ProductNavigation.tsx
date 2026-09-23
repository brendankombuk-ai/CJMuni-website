"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, scrollToSection } from "./scrollToSection";

type NavItem = { id: string; number: string; navLabel: string };

/**
 * Sticky product navigation.
 *
 * One compact bar that sits under the site header and tracks which range you
 * are reading. Real anchors, so it works with keyboard, middle-click and
 * JavaScript disabled; the click handler only upgrades the jump to a smooth
 * scroll. On narrow screens the row scrolls sideways and keeps the active chip
 * in view.
 */
export function ProductNavigation({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Scroll spy: the last range whose heading has passed the reading line is
  // the current one. Measured on scroll rather than with an intersection
  // observer so that jumping straight to a section — or scrolling past the
  // last one into the summary — still leaves the right chip marked.
  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const readingLine = window.innerHeight * 0.35;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) {
          current = section.id;
        }
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items]);

  // Keep the active chip visible inside the horizontal scroller (mobile).
  useEffect(() => {
    const scroller = scrollerRef.current;
    const chip = chipRefs.current[active];
    if (!scroller || !chip) return;
    if (scroller.scrollWidth <= scroller.clientWidth) return;

    scroller.scrollTo({
      left: chip.offsetLeft - scroller.clientWidth / 2 + chip.clientWidth / 2,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, [active]);

  return (
    <nav
      aria-label="Product ranges"
      className="sticky top-[92px] z-40 border-b border-white/10 bg-ink/95 backdrop-blur sm:top-[108px]"
    >
      <div className="frame">
        <div
          ref={scrollerRef}
          className="-mx-5 flex gap-1 overflow-x-auto px-5 py-2 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => {
            const isActive = item.id === active;
            return (
              <a
                key={item.id}
                ref={(node) => {
                  chipRefs.current[item.id] = node;
                }}
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                onClick={(event) => {
                  if (scrollToSection(item.id)) event.preventDefault();
                }}
                className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-2.5 text-[11px] font-bold uppercase tracking-label duration-300 ${
                  isActive
                    ? "border-gold text-white"
                    : "border-transparent text-white/70 hover:text-white"
                }`}
              >
                <span
                  className={isActive ? "text-gold" : "text-white/50"}
                  aria-hidden="true"
                >
                  {item.number}
                </span>
                {item.navLabel}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
