import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { BRAND } from "@/data/site";

/**
 * Home hero.
 *
 * Sized to the content rather than the viewport, so the first real section is
 * already visible without scrolling. No parallax, no entrance animation and no
 * text sitting on top of a photograph — the headline reads against plain black.
 */
export function HomeHero() {
  return (
    <section className="border-b border-white/10 bg-ink">
      <div className="frame grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div>
          <p className="font-sans text-[11px] font-bold uppercase tracking-label text-gold">
            {BRAND.idea}
          </p>

          <h1 className="mt-4 font-heading text-4xl font-extrabold uppercase leading-[1.05] tracking-headline text-white sm:text-5xl lg:text-6xl">
            Connected capability.
            <br />
            Reliable delivery.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            {BRAND.positioning}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/capabilities" className="btn-primary">
              Products &amp; Services
            </Link>
            <Link href="/contact" className="btn-outline-light">
              Request an Enquiry
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-800 lg:aspect-[5/4]">
          <SmartImage
            src="/images/hero/hero-main.jpg"
            alt="CJ MUNI crew charging a blast pattern beside an Orica Bulkmaster Pro truck on a Papua New Guinea mine"
            slotLabel="/public/images/hero/hero-main.jpg"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
