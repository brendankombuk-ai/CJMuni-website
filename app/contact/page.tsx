import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to MUNI about your next project, supply requirement or industrial capability need in Papua New Guinea.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="pt-24">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
