import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageIntro } from "@/components/PageIntro";
import { CapabilityCard } from "@/components/CapabilityCard";
import { ContactBand } from "@/components/ContactBand";
import { PRODUCTS, SERVICES } from "@/data/capabilities";

export const metadata: Metadata = {
  title: "Products & Services",
  description:
    "CJ MUNI products and services — explosives manufacture and supply, fertilizer and reagents, drill and blast, quarry services, civil and earth moving, tug and barge, end-to-end supply chain and sustainable development projects.",
};

export default function CapabilitiesIndexPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PageIntro
          eyebrow="Products & Services"
          title="One partner. Multiple capabilities."
          intro="Specialist products, technical capability, project execution, marine support and supply-chain delivery — coordinated around one project."
          crumbs={[{ label: "Home", href: "/" }, { label: "Products & Services" }]}
        />

        <section className="bg-ink py-14 sm:py-20">
          <div className="frame">
            <h2 className="font-heading text-2xl font-extrabold uppercase tracking-headline text-white sm:text-3xl">
              Products
            </h2>
            <p className="mt-2 text-sm text-white/70">
              What we manufacture and supply.
            </p>
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              {PRODUCTS.map((capability) => (
                <CapabilityCard key={capability.slug} capability={capability} />
              ))}
            </div>

            <h2 className="mt-16 font-heading text-2xl font-extrabold uppercase tracking-headline text-white sm:text-3xl">
              Services
            </h2>
            <p className="mt-2 text-sm text-white/70">
              What we deliver on the ground.
            </p>
            <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((capability) => (
                <CapabilityCard key={capability.slug} capability={capability} />
              ))}
            </div>
          </div>
        </section>

        <ContactBand />
      </main>
      <Footer />
    </>
  );
}
