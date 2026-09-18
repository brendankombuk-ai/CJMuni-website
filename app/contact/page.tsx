import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageIntro } from "@/components/PageIntro";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to CJ MUNI about your next project, supply requirement or industrial capability need in Papua New Guinea.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PageIntro
          eyebrow="Enquiries"
          title="Contact"
          intro="Talk to CJ MUNI about your next project, supply requirement or industrial capability need."
          crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
