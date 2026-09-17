"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SmartImage } from "@/components/SmartImage";
import { Reveal } from "@/components/Reveal";

const FACTS = [
  "In-house logistics team",
  "Orders monitored from manufacture to delivery",
  "Tailored delivery schedules",
  "Safe and secure materials storage and handling",
];

export function SupplyChainFeature() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", reduce ? "-8%" : "8%"]);

  return (
    <section ref={ref} className="relative min-h-[90svh] overflow-hidden bg-ink">
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <SmartImage
          src="/images/library/supply-chain-feature.jpg"
          alt="CJ MUNI supply chain — processing, warehousing, port handling and road transport"
          slotLabel="/public/images/library/supply-chain-feature.jpg"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />

      <div className="frame relative flex min-h-[90svh] items-center py-24">
        <div className="max-w-xl">
          <Reveal>
            <span className="eyebrow text-gold">Supply Chain</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-heading text-4xl font-extrabold uppercase leading-[1.02] tracking-headline text-white sm:text-5xl lg:text-6xl">
              From manufacture to delivery.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
              CJ MUNI coordinates sourcing, logistics, storage, handling and
              delivery around customer requirements.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-px border border-white/15 bg-white/10 sm:grid-cols-2">
            {FACTS.map((fact, i) => (
              <Reveal as="li" key={fact} delay={0.12 + i * 0.05}>
                <div className="flex h-full items-start gap-3 bg-ink/80 p-5">
                  <span className="mt-1 block h-2 w-2 shrink-0 bg-gold" />
                  <span className="text-sm leading-snug text-white/80">{fact}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
