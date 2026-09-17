import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageIntro } from "@/components/PageIntro";
import { CapabilityCard } from "@/components/CapabilityCard";
import { Reveal } from "@/components/Reveal";
import { FinalCta } from "@/components/FinalCta";
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

        <section className="bg-ink pb-24 sm:pb-32">
          <div className="frame">
            <h2 className="eyebrow text-white/70">Products</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {PRODUCTS.map((capability, i) => (
                <Reveal key={capability.slug} delay={(i % 2) * 0.06} className="flex">
                  <CapabilityCard capability={capability} />
                </Reveal>
              ))}
            </div>

            <h2 className="eyebrow mt-20 text-white/70">Services</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((capability, i) => (
                <Reveal key={capability.slug} delay={(i % 3) * 0.06} className="flex">
                  <CapabilityCard capability={capability} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
