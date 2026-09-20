import Image from "next/image";
import Link from "next/link";
import { SmoothAnchor } from "@/components/products/SmoothAnchor";
import { CATALOGUE_HERO_IMAGE, CATALOGUE_INTRO } from "@/data/products";

/**
 * Catalogue header.
 *
 * Deliberately short: the first product range should already be in reach when
 * the page opens. Sized to its content like the home hero, with the headline
 * on the page itself rather than over a photograph.
 */
export function ProductsHero({ firstRangeId }: { firstRangeId: string }) {
  return (
    <header className="border-b border-white/10 bg-ink">
      <div className="frame py-8 sm:py-14">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-label text-white/50">
            <li className="flex items-center gap-2">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="text-white/40" aria-hidden="true">
                /
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Link href="/capabilities/explosives-manufacture-supply" className="hover:text-white">
                Explosives Manufacture &amp; Supply
              </Link>
              <span className="text-white/40" aria-hidden="true">
                /
              </span>
            </li>
            <li>
              <span className="text-white/70">Orica Products</span>
            </li>
          </ol>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-label text-gold">
              Product Catalog 2026
            </p>

            <h1 className="mt-4 font-heading text-3xl font-extrabold uppercase leading-[1.05] tracking-headline text-white sm:text-4xl lg:text-5xl">
              Orica Products
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              Commercial blasting products and initiation systems supplied by CJ
              MUNI Limited in Papua New Guinea.
            </p>

            <p className="mt-5 max-w-2xl text-[13px] leading-relaxed text-white/50 sm:text-sm">
              {CATALOGUE_INTRO}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <SmoothAnchor targetId={firstRangeId} className="btn-primary">
                Explore Products
              </SmoothAnchor>
              <Link href="/contact" className="btn-outline-light">
                Contact MUNI
              </Link>
            </div>
          </div>

          <figure className="m-0 w-full max-w-[560px] lg:ml-auto">
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-white/10 bg-ink-800 sm:aspect-[25/18]">
              <Image
                src={CATALOGUE_HERO_IMAGE.src}
                alt={CATALOGUE_HERO_IMAGE.alt}
                fill
                sizes="(min-width: 1024px) 560px, 92vw"
                quality={90}
                priority
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-xs text-white/50">
              {CATALOGUE_HERO_IMAGE.caption}
            </figcaption>
          </figure>
        </div>
      </div>
    </header>
  );
}
