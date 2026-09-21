import { Reveal } from "@/components/Reveal";
import { Atmosphere, atmosphere } from "@/components/Atmosphere";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductSpecifications } from "@/components/products/ProductSpecifications";
import type { ProductRange } from "@/data/products";

/**
 * One product range: imagery on one side, catalogue detail on the other.
 *
 * Odd-numbered sections flip the image to the right and take a faint tint, so
 * the seven ranges have a rhythm to scroll through without inventing a new
 * design per range. A range with a column per product (AMEX™) puts its wider
 * table below both columns rather than squeezing it beside the photograph.
 */
export function ProductSection({
  range,
  index,
}: {
  range: ProductRange;
  index: number;
}) {
  const flipped = index % 2 === 1;
  const wideSpec = range.specColumns.length > 1;
  const titleId = `${range.id}-title`;

  const specifications = (
    <ProductSpecifications
      columns={range.specColumns}
      rows={range.specs}
      note={range.specNote}
      caption={`${range.name} technical specification, typical values`}
      headingId={`${range.id}-spec`}
    />
  );

  return (
    <section
      id={range.id}
      aria-labelledby={titleId}
      className={`scroll-mt-12 border-b border-white/5 py-14 sm:py-20 ${atmosphere(
        flipped ? "explosives" : "quarry",
      )}`}
    >
      {/* The seven ranges alternate surface and light source, so scrolling
          the catalogue has a rhythm to it without a new design per range. */}
      <Atmosphere variant={flipped ? "explosives" : "quarry"} />

      <div className="frame">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal
            className={`w-full max-w-[520px] ${
              flipped ? "lg:order-2 lg:justify-self-end" : "lg:justify-self-start"
            }`}
          >
            <ProductGallery
              images={range.images}
              rangeName={range.name}
              priority={index === 0}
            />
          </Reveal>

          <Reveal delay={0.05} className={flipped ? "lg:order-1" : undefined}>
            <p className="flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-label text-white/70">
              <span className="font-heading font-extrabold text-gold">
                {range.number}
              </span>
              <span className="block h-px w-8 bg-gold" aria-hidden="true" />
              {range.descriptor}
            </p>

            <h2
              id={titleId}
              className="mt-4 font-heading text-2xl font-extrabold uppercase leading-[1.08] tracking-headline text-white sm:text-3xl lg:text-[2.35rem]"
            >
              {range.name}
            </h2>

            <dl className="mt-6 border-l-2 border-gold pl-5">
              <dt className="text-[11px] font-bold uppercase tracking-label text-white/50">
                Product Category
              </dt>
              <dd className="mt-1.5 font-heading text-base font-bold uppercase tracking-headline text-white">
                {range.category}
              </dd>
            </dl>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-[1.0625rem]">
              {range.description}
            </p>

            {wideSpec ? null : <div className="mt-8">{specifications}</div>}
          </Reveal>
        </div>

        {wideSpec ? (
          <Reveal delay={0.1} className="mt-10 sm:mt-12">
            {specifications}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
