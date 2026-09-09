import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageIntro } from "@/components/PageIntro";
import { Projects } from "@/components/Projects";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "MUNI project and capability evidence. Structured and ready for real project photography and detail as projects are cleared for publication.",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PageIntro
          eyebrow="Capability Evidence"
          title="Projects."
          intro="A place for real project photography and detail. Content is added as projects are cleared for publication."
          crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        />
        <Projects />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
