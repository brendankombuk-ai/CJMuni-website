import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { Atmosphere, atmosphere } from "@/components/Atmosphere";
import { BRAND } from "@/data/site";

/**
 * Home hero — full-screen.
 *
 * Structure follows the Trust & Authority + Conversion pattern: the hero
 * carries mission *and* credibility, so the first screen answers "who are you"
 * and "can you be trusted" together, with one primary CTA. The proof strip at
 * the foot is the "certs/stats" row of that pattern, pulled up into the hero
 * because a full-screen hero pushes the next section below the fold.
 *
 * Every line in that strip is already stated elsewhere on this site — licensed
 * Orica distributing agent, the two product lines and five service lines in
 * data/capabilities.ts, and the Konekaru address in data/site.ts. Nothing here
 * is a number invented to fill a slot.
 *
 * The height is the viewport minus the sticky navigation (h-10 logo + py-4 =
 * 72px, h-12 + py-4 = 80px from `sm`), so the hero fills the screen exactly
 * rather than pushing a scrollbar's worth of black below it. `svh` rather than
 * `vh` so mobile browser chrome collapsing does not jump the layout.
 *
 * `min-h` rather than `h`: on a short landscape phone the content is allowed to
 * make the section taller instead of being clipped.
 *
 * Stacking, back to front: photograph, scrim, the atmosphere shapes this
 * variant already defines, the section's own surface and texture layers from
 * `section-shell`, then content. That ordering is why the technical grid and
 * the gold light land *on* the photograph rather than behind it.
 *
 * No entrance animation, in keeping with the rest of the site — content renders
 * immediately, so there is nothing for `prefers-reduced-motion` to undo.
 */
export function HomeHero() {
  return (
    <section
      className={atmosphere(
        "hero",
        "flex min-h-[calc(100svh-4.5rem)] flex-col justify-between border-b border-white/5 sm:min-h-[calc(100svh-5rem)]",
      )}
    >
      {/* The photograph, full bleed and pushed behind every other layer. */}
      <div className="absolute inset-0 z-[-30]">
        <SmartImage
          src="/images/hero/hero-main.jpg"
          alt="CJ MUNI crew charging a blast pattern beside an Orica Bulkmaster Pro truck on a Papua New Guinea mine"
          slotLabel="/public/images/hero/hero-main.jpg"
          priority
          quality={90}
          sizes="100vw"
          className="object-[62%_50%]"
        />
      </div>

      {/*
        The scrim. This photograph is bright — pale sky, light ground — so a
        token 20% wash leaves white text at roughly 2:1. Two gradients: one
        across, weighted left so the copy sits on near-black while the truck
        stays legible on the right, and one down, so the navigation above and
        the proof strip below both have something solid to sit against.
      */}
      <div
        className="absolute inset-0 z-[-20] bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.82)_34%,rgba(0,0,0,0.45)_62%,rgba(0,0,0,0.62)_100%),linear-gradient(180deg,rgba(0,0,0,0.70)_0%,rgba(0,0,0,0.10)_26%,rgba(0,0,0,0.86)_100%)]"
        aria-hidden="true"
      />

      <Atmosphere variant="hero" />

      {/* Content */}
      <div className="frame flex flex-1 items-center py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="font-sans text-[11px] font-bold uppercase tracking-label text-gold">
            {BRAND.idea}
          </p>

          <div
            className="mt-5 h-px w-40 bg-gradient-to-r from-gold/60 to-transparent"
            aria-hidden="true"
          />

          <h1 className="mt-6 font-heading text-4xl font-extrabold uppercase leading-[1.05] tracking-headline text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            Connected capability.
            <br />
            Reliable delivery.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
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
      </div>

      {/*
        Proof strip. A <dl> rather than a row of divs: each item is a label and
        its value, which is what a description list is for, and it gives screen
        readers the pairing without any ARIA.
      */}
      <div className="relative border-t border-white/10 bg-black/45">
        <div className="frame py-6 sm:py-7">
          <dl className="grid gap-5 sm:grid-cols-3 sm:gap-0">
            <div className="sm:pr-8">
              <dt className="text-[10px] font-bold uppercase tracking-label text-gold">
                Distribution
              </dt>
              <dd className="mt-2 font-heading text-sm font-bold leading-snug text-white sm:text-base">
                Licensed Orica distributing agent in PNG
              </dd>
            </div>

            <div className="sm:border-l sm:border-white/10 sm:px-8">
              <dt className="text-[10px] font-bold uppercase tracking-label text-gold">
                Capability
              </dt>
              <dd className="mt-2 font-heading text-sm font-bold leading-snug text-white sm:text-base">
                Two product lines, five service lines
              </dd>
            </div>

            <div className="sm:border-l sm:border-white/10 sm:pl-8">
              <dt className="text-[10px] font-bold uppercase tracking-label text-gold">
                Based
              </dt>
              <dd className="mt-2 font-heading text-sm font-bold leading-snug text-white sm:text-base">
                Konekaru, Central Province, PNG
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
