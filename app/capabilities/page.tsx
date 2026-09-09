import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageIntro } from "@/components/PageIntro";
import { CapabilityCard } from "@/components/CapabilityCard";
import { Reveal } from "@/components/Reveal";
import { FinalCta } from "@/components/FinalCta";
import { CAPABILITIES } from "@/data/capabilities";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "The seven MUNI capability areas — explosives distribution, reagents and fertilizers, drill and blast, engineering and civil works, tug and barge, end-to-end supply chain and sustainable project development.",
};

export default function CapabilitiesIndexPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PageIntro
          eyebrow="Capabilities"
          title="One partner. Multiple capabilities."
          intro="Specialist products, technical capability, project execution, marine support and supply-chain delivery — coordinated around one project."
          crumbs={[{ label: "Home", href: "/" }, { label: "Capabilities" }]}
        />

        <section className="bg-ink pb-24 sm:pb-32">
          <div className="frame">
            <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {CAPABILITIES.map((capability, i) => (
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
