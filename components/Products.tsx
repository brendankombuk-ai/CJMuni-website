import { PRODUCTS } from "@/data/capabilities";
import { CapabilitySection } from "@/components/CapabilitySection";

export function Products() {
  return (
    <CapabilitySection
      id="products"
      eyebrow="Products"
      title="What we manufacture and supply."
      intro="Two product lines, both backed by licensed facilities, global-standard technology and technical product support on the ground in Papua New Guinea."
      items={PRODUCTS}
      tone="ink"
      columns={2}
    />
  );
}
