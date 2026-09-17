import { SERVICES } from "@/data/capabilities";
import { CapabilitySection } from "@/components/CapabilitySection";

export function Services() {
  return (
    <CapabilitySection
      id="services"
      eyebrow="Services"
      title="What we deliver on the ground."
      intro="From the drill pattern to the wharf to the warehouse — six services coordinated around one project through a single accountable partner."
      items={SERVICES}
      tone="ink-900"
      columns={3}
    />
  );
}
