import type { Capability } from "@/data/capabilities";
import { CapabilityCard } from "@/components/CapabilityCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

type CapabilitySectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  items: Capability[];
  /** Alternating page rhythm — products sit on black, services on charcoal. */
  tone?: "ink" | "ink-900";
  /** Cards per row at lg. Products read better as a pair, services as a grid. */
  columns?: 2 | 3;
};

/**
 * Shared grid used by both the Products and the Services sections. Both read
 * from data/capabilities.ts, so the only difference between them is the
 * heading copy, the item list and the column count.
 */
export function CapabilitySection({
  id,
  eyebrow,
  title,
  intro,
  items,
  tone = "ink",
  columns = 3,
}: CapabilitySectionProps) {
  return (
    <section
      id={id}
      className={`${tone === "ink" ? "bg-ink" : "bg-ink-900"} py-24 sm:py-32`}
    >
      <div className="frame">
        <SectionHeading tone="light" eyebrow={eyebrow} title={title} intro={intro} />

        {/* No container fill or border — the section background shows through
            the gap so only the cards themselves read as panels. */}
        <div
          className={`mt-14 grid gap-6 sm:grid-cols-2 ${
            columns === 3 ? "lg:grid-cols-3" : ""
          }`}
        >
          {items.map((item, i) => (
            <Reveal key={item.slug} delay={(i % columns) * 0.06} className="flex">
              <CapabilityCard capability={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
