import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

const PILLARS = [
  {
    n: "01",
    title: "Capability",
    body: "Specialist products, technical knowledge and practical field execution.",
  },
  {
    n: "02",
    title: "Reliability",
    body: "Coordinated supply and delivery designed around customer requirements.",
  },
  {
    n: "03",
    title: "Safety",
    body: "Safety-first handling, storage, operations and project discipline.",
  },
  {
    n: "04",
    title: "Partnership",
    body: "Long-term relationships built around responsiveness and trust.",
  },
  {
    n: "05",
    title: "Responsibility",
    body: "Responsible delivery and sustainable project development.",
  },
];

export function WhyMuni() {
  return (
    <section id="why-cj-muni" className="bg-white py-24 sm:py-32">
      <div className="frame">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow="Why CJ MUNI"
            title={
              <>
                Our difference is <span className="text-gold">connected</span>{" "}
                capability.
              </>
            }
            intro="CJ MUNI is built around five commitments. They are how demanding projects get products, technical support and execution from one accountable partner."
          />

          <ul className="divide-y divide-ink/10 border-t border-ink/10">
            {PILLARS.map((pillar, i) => (
              <Reveal as="li" key={pillar.n} delay={i * 0.05}>
                <div className="group grid grid-cols-[auto_1fr] gap-5 py-6 sm:grid-cols-[5rem_1fr] sm:gap-8">
                  <span className="font-heading text-2xl font-extrabold text-ink/25 transition-colors group-hover:text-gold sm:text-3xl">
                    {pillar.n}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-bold uppercase tracking-headline text-ink">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-charcoal sm:text-base">
                      {pillar.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
