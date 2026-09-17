"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

const STAGES = [
  { n: "01", label: "Product", note: "Explosives, reagents, fertilizers and inputs." },
  { n: "02", label: "Technical Capability", note: "Product knowledge and technical support." },
  { n: "03", label: "Field Execution", note: "Drill & blast and application in the field." },
  { n: "04", label: "Marine / Logistics", note: "Tug & barge support and coordinated movement." },
  { n: "05", label: "Supply Chain", note: "Sourcing, storage, handling and delivery." },
  { n: "06", label: "Project Delivery", note: "Coordinated outcomes through one partner." },
];

export function ConnectedCapability() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative overflow-hidden bg-ink-900 py-24 sm:py-32">
      <div className="grid-overlay absolute inset-0 opacity-30" />
      <div className="frame relative">
        <SectionHeading
          tone="light"
          eyebrow="Connected Capability"
          title="From product to project, CJ MUNI connects the chain."
          intro="Each capability is useful on its own. Coordinated, they remove the gaps, handoffs and interfaces that slow demanding projects down."
        />

        <div ref={ref} className="relative mt-16 pl-8 sm:pl-0">
          {/* Vertical spine */}
          <div className="absolute left-[7px] top-2 h-full w-px bg-white/12 sm:left-1/2 sm:-translate-x-1/2" />
          <motion.div
            style={{ scaleY: reduce ? 1 : lineScale }}
            className="absolute left-[7px] top-2 h-full w-px origin-top bg-gold sm:left-1/2 sm:-translate-x-1/2"
          />

          <ul className="space-y-4">
            {STAGES.map((stage, i) => (
              <Reveal
                as="li"
                key={stage.n}
                delay={i * 0.04}
                y={18}
                className={`relative sm:flex sm:items-center sm:gap-8 ${
                  i % 2 === 1 ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Node */}
                <span className="absolute -left-8 top-1.5 h-3.5 w-3.5 border border-gold bg-ink-900 sm:left-1/2 sm:-translate-x-1/2" />

                <div
                  className={`tech-panel clip-diagonal w-full p-5 sm:w-[calc(50%-2rem)] ${
                    i % 2 === 1 ? "sm:text-right" : ""
                  }`}
                >
                  <div
                    className={`flex items-baseline gap-3 ${
                      i % 2 === 1 ? "sm:flex-row-reverse" : ""
                    }`}
                  >
                    <span className="font-heading text-sm font-extrabold text-gold">
                      {stage.n}
                    </span>
                    <h3 className="font-heading text-base font-bold uppercase tracking-headline text-white">
                      {stage.label}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {stage.note}
                  </p>
                </div>
                <div className="hidden sm:block sm:w-[calc(50%-2rem)]" aria-hidden="true" />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
