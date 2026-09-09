"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useAnimationControls,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  as?: "div" | "section" | "li" | "article" | "header";
};

/**
 * Scroll-triggered reveal.
 *
 * - Content is server-rendered, so it is present with JavaScript disabled.
 * - Collapses to a near-instant fade when the user prefers reduced motion.
 * - Safety net: if the intersection observer or animation frame loop stalls
 *   (background tab, throttled rAF), content is forced visible after 2s so it
 *   can never remain hidden.
 */
export function Reveal({ children, className, delay = 0, y = 24, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimationControls();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  useEffect(() => {
    const t = window.setTimeout(() => controls.start("visible"), 2000);
    return () => window.clearTimeout(t);
  }, [controls]);

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0.15 : 0.6,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={controls}
    >
      {children}
    </MotionTag>
  );
}
