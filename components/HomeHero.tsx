import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { Atmosphere, atmosphere } from "@/components/Atmosphere";
import { BRAND } from "@/data/site";

/**
 * Home hero.
 *
 * Sized to the content rather than the viewport, so the first real section is
 * already visible without scrolling. No parallax, no entrance animation and no
 * text sitting on top of a photograph — the headline reads against the page.
 *
 * What the headline reads against is no longer flat black: the hero carries
 * the widest, softest light on the site, a fine technical grid behind it and
 * one gold rule under the eyebrow. The content is untouched and still the
 * brightest thing here; everything added sits behind it at single-digit
 * opacity, which is the whole point — it should register as depth, not as
 * decoration.
 */
export function HomeHero() {
  return (
    <section className={atmosphere("hero", "border-b border-white/5")}>
      <Atmosphere variant="hero" />

      <div className="frame grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div>
          <p className="font-sans text-[11px] font-bold uppercase tracking-label text-gold">
            {BRAND.idea}
          </p>

          {/* The rule the eyebrow sits on, carrying the brand colour across
              the measure of the headline and fading out. */}
          <div
            className="mt-5 h-px w-40 bg-gradient-to-r from-gold/60 to-transparent"
            aria-hidden="true"
          />

          <h1 className="mt-6 font-heading text-4xl font-extrabold uppercase leading-[1.05] tracking-headline text-white sm:text-5xl lg:text-6xl">
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

        {/* The photograph, lit into the page rather than cut out of it: a
            hairline frame, a gold edge-light along the top and a vignette
            that carries the corners back into the background behind it. */}
        <div className="relative">
          <div className="atmo-halo atmo-hide-mobile -inset-12" aria-hidden="true" />
          <div className="media-frame aspect-[4/3] w-full bg-ink-800 lg:aspect-[5/4]">
            <SmartImage
              src="/images/hero/hero-main.jpg"
              alt="CJ MUNI crew charging a blast pattern beside an Orica Bulkmaster Pro truck on a Papua New Guinea mine"
              slotLabel="/public/images/hero/hero-main.jpg"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
