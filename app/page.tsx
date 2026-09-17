import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { Services } from "@/components/Services";
import { FrontierAgri } from "@/components/FrontierAgri";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

/**
 * Page rhythm:
 * HERO -> PRODUCTS -> SERVICES -> FRONTIER AGRI -> EVIDENCE -> ENQUIRY -> CLOSE
 *
 * Products and services sit on black; Frontier Agri breaks to white so the
 * agriculture arm reads as a separate part of the business.
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Products />
        <Services />
        <FrontierAgri />
        <Projects />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
