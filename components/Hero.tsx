"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  motion,
  useAnimationControls,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { SmartImage } from "@/components/SmartImage";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const controls = useAnimationControls();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  useEffect(() => {
    controls.start("visible");
    // Safety net against a stalled animation frame loop.
    const t = window.setTimeout(() => controls.start("visible"), 2000);
    return () => window.clearTimeout(t);
  }, [controls]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink"
      aria-label="CJ MUNI — Connected capability. Reliable delivery."
    >
      {/* Full-bleed hero image — replace at /public/images/hero/hero-main.jpg */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 z-0 scale-110">
        <SmartImage
          src="/images/hero/hero-main.jpg"
          alt="CJ MUNI crew charging a blast pattern beside an Orica Bulkmaster Pro truck on a Papua New Guinea mine"
          slotLabel="/public/images/hero/hero-main.jpg"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Controlled overlays — keep the photograph readable while protecting
          text contrast in the lower-left where the headline sits. */}
      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 z-0 bg-ink/45" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-ink/70 via-ink/20 to-transparent" />
      <div className="grid-overlay absolute inset-0 z-0 opacity-20" />

      {/* Technical corner marks */}
      <div className="pointer-events-none absolute left-6 top-28 z-10 hidden h-10 w-10 border-l border-t border-gold/60 sm:block" />
      <div className="pointer-events-none absolute right-6 top-28 z-10 hidden h-10 w-10 border-r border-t border-gold/60 sm:block" />

      <motion.div
        variants={container}
        initial="hidden"
        animate={controls}
        className="frame relative z-10 pb-16 pt-32 sm:pb-20"
      >
        <motion.p variants={item} className="eyebrow text-gold">
          The Power of Partnership
        </motion.p>

        <h1 className="mt-6 font-heading font-extrabold uppercase leading-[0.98] tracking-headline text-white">
          <motion.span
            variants={item}
            className="block text-[13vw] sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Connected Capability.
          </motion.span>
          <motion.span
            variants={item}
            className="block text-[13vw] text-gold sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Reliable Delivery.
          </motion.span>
        </h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
        >
          CJ MUNI connects specialist products, technical capability, project
          execution, marine support and supply-chain delivery around the needs of
          demanding projects.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Link href="/#contact" className="btn-primary">
            Request an Enquiry
          </Link>
          <Link href="/#products" className="btn-outline-light">
            Explore Capabilities
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        variants={item}
        initial="hidden"
        animate={controls}
        transition={{ delay: 1.1 }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-sans text-[10px] font-semibold uppercase tracking-label text-white/50">
          Scroll
        </span>
        <span className="relative block h-10 w-px overflow-hidden bg-white/20">
          <motion.span
            animate={reduce ? {} : { y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 block h-1/2 bg-gold"
          />
        </span>
      </motion.div>
    </section>
  );
}
