import { INDUSTRIES } from "@/data/industries";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";

export function Industries() {
  return (
    <section id="industries" className="bg-ink py-24 sm:py-32">
      <div className="frame">
        <SectionHeading
          tone="light"
          eyebrow="Environments"
          title="Built for demanding operating environments."
          intro="CJ MUNI works around mining, metals, energy, agriculture and infrastructure projects across Papua New Guinea."
        />

        <div className="mt-14 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
          {INDUSTRIES.map((industry, i) => (
            <Reveal key={industry.name} delay={(i % 3) * 0.05} className="flex">
              <div className="group relative aspect-[4/3] w-full overflow-hidden bg-ink-800">
                <div className="absolute inset-0 transition-transform duration-700 ease-muni group-hover:scale-105">
                  <SmartImage
                    src={industry.image}
                    alt={industry.imageAlt}
                    slotLabel={industry.image}
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-ink/60 transition-colors duration-500 group-hover:bg-ink/40" />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-4">
                  <span className="h-px w-6 bg-gold transition-all duration-500 group-hover:w-10" />
                  <span className="font-heading text-sm font-bold uppercase tracking-headline text-white">
                    {industry.name}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
