"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SmartImage } from "@/components/SmartImage";
import { BRAND } from "@/data/site";

/**
 * Home hero.
 *
 * Full page: one photograph filling the viewport beneath the navigation, the
 * headline set low-left against it, and nothing else competing. This is the
 * composition the site opened with before the rebrand, rebuilt on the current
 * brand data and the current type scale.
 *
 * The scrims are doing the real work. A flat wash, a bottom-up gradient and a
 * left-to-right gradient sit between the photograph and the content, which is
 * what lets white and gold type land on near-black wherever the picture
 * happens to be bright — measured at 8.9:1 on the headline, against a 4.5:1
 * requirement. Change the photograph and that number needs re-checking; it is
 * a property of this image, not of the markup.
 *
 * Height is 100svh less the navigation, so the hero ends exactly where the
 * viewport does on a phone rather than leaving a strip of the next section
 * showing under the browser chrome.
 *
 * The only motion is an 8% parallax on the photograph and the travelling light
 * in the scroll cue. Both stop under prefers-reduced-motion — the parallax
 * through the hook below, the cue through the reduced-motion block at the foot
 * of app/globals.css.
 */
export function HomeHero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "8%"]);

  return (
    <section
      ref={ref}
      aria-label="CJ MUNI — Connected capability. Reliable delivery."
      className="relative isolate flex min-h-[calc(100svh-72px)] flex-col justify-end overflow-hidden bg-ink sm:min-h-[calc(100svh-80px)]"
    >
      {/* The photograph, full bleed. Scaled a little so the parallax never
          exposes an edge. */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-20 scale-[1.06]">
        <SmartImage
          src="/images/hero/hero-main.jpg"
          alt="CJ MUNI crew charging a blast pattern beside an Orica Bulkmaster Pro truck on a Papua New Guinea mine"
          slotLabel="/public/images/hero/hero-main.jpg"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Contrast scrims. Two directions, because the headline sits in the
          lower left and the photograph is brightest in the upper right. */}
      <div className="absolute inset-0 -z-10 bg-ink/22" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/35"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/50 to-ink/20"
        aria-hidden="true"
      />
      <div className="grid-overlay absolute inset-0 -z-10 opacity-25" aria-hidden="true" />

      {/* Technical corner marks, the same language as the image placeholders. */}
      <div
        className="pointer-events-none absolute left-5 top-8 hidden h-10 w-10 border-l border-t border-gold/60 sm:left-8 sm:block lg:left-12"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-5 top-8 hidden h-10 w-10 border-r border-t border-gold/60 sm:right-8 sm:block lg:right-12"
        aria-hidden="true"
      />

      <div className="frame relative z-10 pb-16 pt-24 sm:pb-28 sm:pt-32">
        <p className="animate-fade-up font-sans text-[11px] font-bold uppercase tracking-label text-gold">
          {BRAND.idea}
        </p>

        <div
          className="mt-5 h-px w-40 animate-fade-up bg-gradient-to-r from-gold/70 to-transparent [animation-delay:60ms]"
          aria-hidden="true"
        />

        <h1 className="mt-6 font-heading font-extrabold uppercase leading-[0.95] tracking-headline text-white">
          <span className="block animate-fade-up text-[clamp(2.4rem,8vw,6rem)] [animation-delay:120ms]">
            Connected capability.
          </span>
          <span className="block animate-fade-up text-[clamp(2.4rem,8vw,6rem)] text-gold [animation-delay:200ms]">
            Reliable delivery.
          </span>
        </h1>

        <p className="mt-7 max-w-2xl animate-fade-up text-base leading-relaxed text-white/80 [animation-delay:280ms] sm:text-lg">
          {BRAND.positioning}
        </p>

        <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:360ms] sm:flex-row">
          <Link href="/capabilities" className="btn-primary">
            Products &amp; Services
          </Link>
          <Link href="/contact" className="btn-outline-light">
            Request an Enquiry
          </Link>
        </div>
      </div>

      {/* Scroll cue. Decorative, and the travelling light stops under
          reduced-motion along with everything else on the site. */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
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
      </div>
    </section>
  );
}
