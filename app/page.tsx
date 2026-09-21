import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HomeHero } from "@/components/HomeHero";
import { CapabilityLinks } from "@/components/CapabilityLinks";
import { ProjectsTeaser } from "@/components/ProjectsTeaser";
import { Atmosphere, atmosphere } from "@/components/Atmosphere";
import { PRODUCTS, SERVICES } from "@/data/capabilities";

/**
 * Home page.
 *
 * A signpost, not a brochure: say who CJ MUNI is, show what it sells, show a
 * little of the work, then hand people off to a real page. Everything here has
 * a fuller page behind it, so the page stays short enough to take in at once.
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <HomeHero />

        <section className={atmosphere("alt", "py-16 sm:py-20")}>
          <Atmosphere variant="alt" />
          <div className="frame">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-heading text-2xl font-extrabold uppercase tracking-headline text-white sm:text-3xl">
                  What we do
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70">
                  Two product lines and six services, delivered through one
                  accountable partner in Papua New Guinea.
                </p>
              </div>
              <Link
                href="/capabilities"
                className="text-[11px] font-bold uppercase tracking-label text-gold hover:text-white"
              >
                See all products &amp; services
              </Link>
            </div>

            <div className="mt-10 space-y-10">
              <CapabilityLinks heading="Products" items={PRODUCTS} columns={2} />
              <CapabilityLinks heading="Services" items={SERVICES} columns={3} />
            </div>
          </div>
        </section>

        <ProjectsTeaser />
      </main>
      <Footer />
    </>
  );
}
