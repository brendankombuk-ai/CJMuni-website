import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { Atmosphere, atmosphere } from "@/components/Atmosphere";
import { ImageCredit } from "@/components/community/ImageCredit";
import { COMMUNITY_IMAGES } from "@/data/community";

/**
 * Community page header.
 *
 * The home hero's photograph-and-proof-strip build, at interior-page height:
 * sized to its content rather than the viewport, with the breadcrumb that
 * PageIntro gives every other interior page. The headline deliberately takes
 * the same two-beat shape as the brand promise — "Connected capability.
 * Reliable delivery." — so the page sounds like the rest of the site.
 *
 * Stacking matches HomeHero: photograph, scrim, atmosphere shapes, the
 * section's own surface and texture, then content.
 */
export function CommunityHero() {
  const image = COMMUNITY_IMAGES.hero;

  return (
    <section
      aria-labelledby="community-title"
      className={atmosphere("hero", "flex flex-col border-b border-white/5")}
    >
      <div className="absolute inset-0 z-[-30]">
        <SmartImage
          src={image.src}
          alt={image.alt}
          slotLabel={image.src}
          priority
          quality={85}
          sizes="100vw"
          className="object-[62%_40%]"
        />
      </div>

      {/*
        The scrim. People fill this photograph edge to edge, so it is weighted
        hard left where the copy sits and eased off to the right, where the
        faces carry the image. The vertical pass gives the navigation and the
        proof strip something solid to sit against.
      */}
      <div
        className="absolute inset-0 z-[-20] bg-[linear-gradient(90deg,rgba(0,0,0,0.90)_0%,rgba(0,0,0,0.78)_34%,rgba(0,0,0,0.40)_64%,rgba(0,0,0,0.55)_100%),linear-gradient(180deg,rgba(0,0,0,0.70)_0%,rgba(0,0,0,0.12)_28%,rgba(0,0,0,0.88)_100%)]"
        aria-hidden="true"
      />

      <Atmosphere variant="hero" />

      <div className="frame pb-16 pt-10 sm:pb-20 sm:pt-12 lg:pb-28 lg:pt-14">
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-label text-white/50">
            <li className="flex items-center gap-2">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="text-white/40" aria-hidden="true">
                /
              </span>
            </li>
            <li>
              <span className="text-white/75" aria-current="page">
                Community
              </span>
            </li>
          </ol>
        </nav>

        <p className="text-[11px] font-bold uppercase tracking-label text-gold">
          Community
        </p>

        <div
          className="mt-5 h-px w-32 bg-gradient-to-r from-gold/60 to-transparent"
          aria-hidden="true"
        />

        <h1
          id="community-title"
          className="mt-6 max-w-[15ch] font-heading text-[2rem] font-extrabold uppercase leading-[1.05] tracking-headline text-white xs:text-4xl sm:text-5xl lg:text-6xl"
        >
          Stronger communities. Lasting partnerships.
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          CJ MUNI works alongside communities, local organisations,
          associations and rural villages across Papua New Guinea. Their
          strength is part of how we measure our own.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className="btn-primary">
            Partner with us
          </Link>
          <a href="#approach" className="btn-outline-light">
            Our approach
          </a>
        </div>
      </div>

      {/*
        Proof strip, as on the home page. Every line is a statement of approach
        or a fact already on the site — no invented figures.
      */}
      <div className="relative border-t border-white/10 bg-black/50">
        <ImageCredit
          credit={image.credit}
          className="absolute bottom-full right-5 mb-2.5 sm:right-8 lg:right-12"
        />
        <div className="frame py-6 sm:py-7">
          <dl className="grid gap-5 sm:grid-cols-3 sm:gap-0">
            <div className="sm:pr-8">
              <dt className="text-[10px] font-bold uppercase tracking-label text-gold">
                Approach
              </dt>
              <dd className="mt-2 font-heading text-sm font-bold leading-snug text-white sm:text-base">
                Partnership first, guided by local priorities
              </dd>
            </div>

            <div className="sm:border-l sm:border-white/10 sm:px-8">
              <dt className="text-[10px] font-bold uppercase tracking-label text-gold">
                Focus
              </dt>
              <dd className="mt-2 font-heading text-sm font-bold leading-snug text-white sm:text-base">
                Rural, village and local communities across PNG
              </dd>
            </div>

            <div className="sm:border-l sm:border-white/10 sm:pl-8">
              <dt className="text-[10px] font-bold uppercase tracking-label text-gold">
                Home
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
