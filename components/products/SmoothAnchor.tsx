"use client";

import type { ReactNode } from "react";
import { scrollToSection } from "./scrollToSection";

/**
 * A normal in-page anchor that scrolls smoothly when it can. If the target is
 * missing or JavaScript has not loaded, the browser's own jump still works.
 */
export function SmoothAnchor({
  targetId,
  className,
  children,
}: {
  targetId: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={`#${targetId}`}
      className={className}
      onClick={(event) => {
        if (scrollToSection(targetId)) event.preventDefault();
      }}
    >
      {children}
    </a>
  );
}
