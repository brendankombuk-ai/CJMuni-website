import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageIntro } from "@/components/PageIntro";
import { SmartImage } from "@/components/SmartImage";
import { Atmosphere, atmosphere } from "@/components/Atmosphere";
import { CAPABILITIES, getCapability } from "@/data/capabilities";

/**
 * Capability detail page. Built entirely from the shared CAPABILITIES data so
 * new detail content only needs new fields on the data object — no new layout.
 */

export function generateStaticParams() {
  return CAPABILITIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const capability = getCapability(slug);
  if (!capability) return { title: "Capability not found" };
  return {
    title: capability.title,
    description: capability.overview,
  };
}

export default async function CapabilityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const capability = getCapability(slug);
  if (!capability) notFound();

  // Prefer siblings from the same group (product / service), topped up from
  // the full list so the row always renders three cards.
  const sameGroup = CAPABILITIES.filter(
    (c) => c.slug !== capability.slug && c.group === capability.group,
  );
  const otherGroup = CAPABILITIES.filter(
    (c) => c.slug !== capability.slug && c.group !== capability.group,
  );
  const others = [...sameGroup, ...otherGroup].slice(0, 3);

  const groupLabel = capability.group === "product" ? "Product" : "Service";

  return (
    <>
      <Navbar />
      <main id="main">
        <PageIntro
          eyebrow={groupLabel}
          title={capability.title}
          intro={capability.lead}
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Products & Services", href: "/capabilities" },
            { label: capability.title },
          ]}
          variant={capability.atmosphere}
        />

        {/* Every section on this page is lit by the capability's own
            atmosphere, so a drill and blast page feels structural and a tug
            and barge page feels marine — while both are built from the same
            primitives and stay recognisably CJ MUNI. */}
        <section className={atmosphere(capability.atmosphere, "py-14 sm:py-20")}>
          <Atmosphere variant={capability.atmosphere} />

          <div className="frame grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <p className="text-lg leading-relaxed text-white">
                {capability.overview}
              </p>

              {capability.points.length ? (
                <ul className="mt-9 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
                  {capability.points.map((point) => (
                    <li key={point} className="cell flex items-start gap-3 p-5">
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-gold" />
                      <span className="text-sm leading-snug text-white/70">
                        {point}
                      </span>
                    </li>
                  ))}

                  {/* The lattice is this list's background showing through a
                      1px gap, so an odd number of points would leave the gap
                      colour filling the whole missing cell. Only needed from
                      `sm` up, where the list becomes two columns. */}
                  {capability.points.length % 2 === 1 ? (
                    <li aria-hidden="true" className="cell hidden sm:block" />
                  ) : null}
                </ul>
              ) : (
                <p className="mt-8 border-l-2 border-gold pl-5 text-sm leading-relaxed text-white/70">
                  Detailed scope for this capability is developed with each client
                  around project requirements. Talk to CJ MUNI about your specific
                  need.
                </p>
              )}

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn-primary">
                  Request an Enquiry
                </Link>
                <Link href="/capabilities" className="btn-outline-light">
                  All Products &amp; Services
                </Link>
              </div>
            </div>

            <div className="media-frame aspect-[16/10] w-full bg-ink-800">
              <SmartImage
                src={capability.image}
                alt={capability.imageAlt}
                slotLabel={capability.image}
                sizes="(min-width: 1024px) 42vw, 100vw"
                quality={90}
              />
            </div>
          </div>
        </section>

        {/* Full catalogue on its own page — currently Orica products */}
        {capability.catalogueLink ? (
          <section className={atmosphere(capability.atmosphere, "section-continue pb-14 sm:pb-20")}>
            <div className="frame">
              <Link
                href={capability.catalogueLink.href}
                className="panel-interactive group flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="relative z-[1]">
                  <span className="eyebrow text-gold">
                    Product catalogue
                  </span>
                  <p className="mt-4 font-heading text-xl font-extrabold uppercase tracking-headline text-white sm:text-2xl">
                    {capability.catalogueLink.label}
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
                    {capability.catalogueLink.blurb}
                  </p>
                </div>
                <span className="btn-primary relative z-[1] shrink-0 self-start lg:self-auto">
                  View Products
                </span>
              </Link>
            </div>
          </section>
        ) : null}

        {/* Product catalogue — only where confirmed product lines are supplied */}
        {capability.catalogue?.length ? (
          <section className={atmosphere(capability.atmosphere, "section-continue pb-14 sm:pb-20")}>
            <div className="frame border-t border-white/10 pt-12 sm:pt-16">
              <h2 className="font-heading text-2xl font-extrabold uppercase tracking-headline text-white sm:text-3xl">
                Products we supply
              </h2>

              <div className="mt-8 grid gap-px border border-white/10 bg-white/10 lg:grid-cols-3">
                {capability.catalogue.map((group) => (
                  <div
                    key={group.heading}
                    className="cell flex h-full flex-col p-6 sm:p-7"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-label text-gold">
                      {group.heading}
                    </span>
                    <ul className="mt-4 space-y-2.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 block h-1.5 w-1.5 shrink-0 bg-gold" />
                          <span className="text-base leading-snug text-white">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Other capabilities */}
        <section className={atmosphere("alt", "seam-top py-14 sm:py-20")}>
          <Atmosphere variant="alt" />

          <div className="frame">
            <h2 className="font-heading text-2xl font-extrabold uppercase tracking-headline text-white sm:text-3xl">
              Explore more capability
            </h2>

            <ul className="mt-8 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
              {others.map((c) => (
                <li key={c.slug} className="cell cell-interactive">
                  <Link
                    href={`/capabilities/${c.slug}`}
                    className="group relative z-[1] flex h-full flex-col p-6"
                  >
                    <span className="font-heading text-base font-bold uppercase leading-tight tracking-headline text-white">
                      {c.title}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-label text-gold">
                      View
                      <svg
                        width="18"
                        height="8"
                        viewBox="0 0 20 8"
                        fill="none"
                        aria-hidden="true"
                        className="transition-transform duration-300 ease-muni group-hover:translate-x-1"
                      >
                        <path
                          d="M0 4h17M15 1l3 3-3 3"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
