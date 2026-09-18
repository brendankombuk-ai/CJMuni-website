import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";
import { CAPABILITIES, getCapability } from "@/data/capabilities";

/**
 * Phase-two service page. Built entirely from the shared CAPABILITIES data so
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
          eyebrow={`${groupLabel} ${capability.number}`}
          title={capability.title}
          intro={capability.lead}
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Products & Services", href: "/capabilities" },
            { label: capability.title },
          ]}
        />

        <section className="bg-white py-20 sm:py-28">
          <div className="frame grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Reveal>
                <span className="eyebrow text-charcoal">Overview</span>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-5 text-lg leading-relaxed text-ink sm:text-xl">
                  {capability.overview}
                </p>
              </Reveal>

              {capability.points.length ? (
                <Reveal delay={0.1}>
                  <ul className="mt-10 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2">
                    {capability.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 bg-white p-5">
                        <span className="mt-1.5 block h-2 w-2 shrink-0 bg-gold" />
                        <span className="text-sm leading-snug text-charcoal">{point}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : (
                <Reveal delay={0.1}>
                  <p className="mt-8 border-l-2 border-gold/60 pl-5 text-sm leading-relaxed text-charcoal">
                    Detailed scope for this capability is developed with each
                    client around project requirements. Talk to CJ MUNI about your
                    specific need.
                  </p>
                </Reveal>
              )}

              <Reveal delay={0.15}>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Link href="/#contact" className="btn-outline-dark">
                    Request an Enquiry
                  </Link>
                  <Link href="/capabilities" className="btn-outline-dark">
                    All Products &amp; Services
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="relative aspect-[16/10] overflow-hidden border border-ink/10">
                <SmartImage
                  src={capability.image}
                  alt={capability.imageAlt}
                  slotLabel={capability.image}
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  quality={90}
                />
                <div className="absolute inset-0 bg-ink/20" />
                <span className="absolute left-5 top-4 font-heading text-4xl font-extrabold text-white">
                  {capability.number}
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Product catalogue — only where confirmed product lines are supplied */}
        {capability.catalogue?.length ? (
          <section className="bg-white pb-20 sm:pb-28">
            <div className="frame border-t border-ink/10 pt-16 sm:pt-20">
              <Reveal>
                <span className="eyebrow text-charcoal">Products we supply</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 font-heading text-2xl font-extrabold uppercase tracking-headline text-ink sm:text-3xl">
                  Product range
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10 grid gap-px border border-ink/10 bg-ink/10 lg:grid-cols-3">
                  {capability.catalogue.map((group) => (
                    <div
                      key={group.heading}
                      className="flex h-full flex-col bg-white p-6 sm:p-8"
                    >
                      <span className="font-heading text-xs font-bold uppercase tracking-label text-charcoal">
                        {group.heading}
                      </span>
                      <span className="mt-4 block h-px w-10 bg-gold" />
                      <ul className="mt-5 space-y-3">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-2 block h-1.5 w-1.5 shrink-0 bg-gold" />
                            <span className="text-base leading-snug text-ink">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        ) : null}

        {/* Other capabilities */}
        <section className="bg-ink py-20 sm:py-28">
          <div className="frame">
            <span className="eyebrow text-white/60">Connected capability</span>
            <h2 className="mt-4 font-heading text-2xl font-extrabold uppercase tracking-headline text-white sm:text-3xl">
              Explore more capability
            </h2>
            <div className="mt-10 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
              {others.map((c) => (
                <Link
                  key={c.slug}
                  href={`/capabilities/${c.slug}`}
                  className="group flex flex-col gap-4 bg-ink-800 p-6 transition-colors hover:bg-ink-700"
                >
                  <span className="font-heading text-2xl font-extrabold text-gold">
                    {c.number}
                  </span>
                  <span className="font-heading text-base font-bold uppercase leading-tight tracking-headline text-white">
                    {c.title}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-label text-white/60 transition-colors group-hover:text-gold">
                    View
                    <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
                      <path d="M0 4h17M15 1l3 3-3 3" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
