import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductsHero } from "@/components/products/ProductsHero";
import { ProductNavigation } from "@/components/products/ProductNavigation";
import { ProductRangeSummary } from "@/components/products/ProductRangeSummary";
import { ProductSection } from "@/components/products/ProductSection";
import { PRODUCT_RANGES } from "@/data/products";
import { CONTACT } from "@/data/site";

/**
 * The Orica product catalogue, as one page.
 *
 * Seven ranges, one scroll, a sticky range selector — rather than seven thin
 * routes. Everything on the page comes from data/products.ts, which is a
 * faithful transcription of the CJ MUNI / Orica Product Catalog 2026.
 */

const description =
  "Explore the Orica product range supplied by CJ MUNI Limited in Papua New Guinea, including AMEX™, PENTEX™, EXEL™, ENDURADET™, CONNECTADET™, CORDTEX™ and SENATEL™ products.";

export const metadata: Metadata = {
  title: { absolute: "Orica Products | CJ MUNI Limited" },
  description,
  alternates: { canonical: "/products" },
  openGraph: {
    type: "website",
    url: "/products",
    siteName: "CJ MUNI",
    title: "Orica Products | CJ MUNI Limited",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Orica Products | CJ MUNI Limited",
    description,
  },
};

export default function ProductsPage() {
  const navItems = PRODUCT_RANGES.map(({ id, number, navLabel }) => ({
    id,
    number,
    navLabel,
  }));

  return (
    <>
      <Navbar />
      <main id="main">
        <ProductsHero firstRangeId={PRODUCT_RANGES[0].id} />
        <ProductNavigation items={navItems} />

        {PRODUCT_RANGES.map((range, index) => (
          <ProductSection key={range.id} range={range} index={index} />
        ))}

        <ProductRangeSummary />

        <section className="bg-ink py-16 sm:py-20">
          <div className="frame grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h2 className="font-heading text-2xl font-extrabold uppercase leading-tight tracking-headline text-white sm:text-3xl">
                Need more information about our products?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
                Contact CJ MUNI Limited to discuss product availability, supply
                requirements and project needs.
              </p>
              <Link href="/contact" className="btn-primary mt-8">
                Contact MUNI
              </Link>
            </div>

            <ul className="space-y-3 text-sm text-white/70 lg:border-l lg:border-white/15 lg:pl-10">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="font-semibold text-white hover:text-gold"
                >
                  {CONTACT.email}
                </a>
              </li>
              {CONTACT.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="hover:text-gold"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li className="pt-2 text-white/55">{CONTACT.location}</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
