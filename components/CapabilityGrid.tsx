import { CAPABILITIES } from "@/data/capabilities";
import { CapabilityCard } from "@/components/CapabilityCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function CapabilityGrid() {
  return (
    <section id="capabilities" className="bg-ink py-24 sm:py-32">
      <div className="frame">
        <SectionHeading
          tone="light"
          eyebrow="Capabilities"
          title="One partner. Multiple capabilities."
          intro="MUNI brings specialist products, technical capability, project execution, marine support and supply-chain delivery together — coordinated around one project through a single accountable partner."
        />

        <div className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((capability, i) => (
            <Reveal key={capability.slug} delay={(i % 3) * 0.06} className="flex">
              <CapabilityCard capability={capability} />
            </Reveal>
          ))}
          {/* Trailing panel keeps the 3-col grid visually resolved */}
          <Reveal delay={0.12} className="hidden lg:flex">
            <div className="relative flex w-full flex-col justify-between overflow-hidden border border-white/10 bg-ink-900 p-6">
              <div className="grid-overlay absolute inset-0 opacity-40" />
              <span className="relative font-heading text-3xl font-extrabold text-gold">
                07 /
              </span>
              <p className="relative font-heading text-lg font-bold uppercase leading-tight tracking-headline text-white">
                From product to project, MUNI connects the chain.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
