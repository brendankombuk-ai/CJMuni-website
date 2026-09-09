import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CapabilityGrid } from "@/components/CapabilityGrid";
import { ConnectedCapability } from "@/components/ConnectedCapability";
import { WhyMuni } from "@/components/WhyMuni";
import { SupplyChainFeature } from "@/components/SupplyChainFeature";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

/**
 * Page rhythm:
 * HERO -> CAPABILITY -> CONNECTION -> DIFFERENTIATION -> OPERATIONS
 *      -> EVIDENCE -> ENQUIRY -> CLOSE
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <CapabilityGrid />
        <ConnectedCapability />
        <WhyMuni />
        <SupplyChainFeature />
        <Projects />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
