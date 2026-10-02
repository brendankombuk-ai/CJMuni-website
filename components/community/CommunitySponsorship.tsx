import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";
import { Atmosphere, atmosphere } from "@/components/Atmosphere";
import { COMMUNITY_IMAGES, SPONSORSHIP_REQUEST_TYPES } from "@/data/community";

/**
 * Sponsorship, led by CJ MUNI's own photograph: the rugby side whose kit
 * carries the goat emblem — the same image the footer uses for Community
 * Support. The request types underneath are an open invitation, not a list
 * of sponsorships already given.
 */
export function CommunitySponsorship() {
  const image = COMMUNITY_IMAGES.sponsorship;

  return (
    <section className={atmosphere("community", "seam-top py-16 sm:py-20 lg:py-24")}>
      <Atmosphere variant="community" />

      <div className="frame grid gap-8 lg:grid-cols-[7fr_5fr] lg:items-center lg:gap-16">
        <div className="media-frame aspect-[3/2] w-full bg-ink-800">
          <SmartImage
            src={image.src}
            alt={image.alt}
            slotLabel={image.src}
            sizes="(min-width: 1024px) 55vw, 100vw"
            quality={90}
            className="object-[60%_40%]"
          />
          <span className="absolute bottom-0 left-0 z-[3] flex items-center gap-2.5 border-r border-t border-gold/40 bg-black/70 px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-label text-white">
            <span className="block h-2 w-2 rotate-45 bg-gold" aria-hidden="true" />
            CJ MUNI sponsored
          </span>
        </div>

        <div>
          <p className="eyebrow text-white/70">Sponsorship</p>
          <h2 className="mt-3.5 font-heading text-2xl font-extrabold uppercase leading-[1.12] tracking-headline text-white sm:text-3xl lg:text-[2.125rem]">
            Backing the teams and events that bring people together.
          </h2>
          <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-white/75">
            Local sport builds discipline, teamwork and pride, and gives young
            people a place to belong. That’s why CJ MUNI sponsors community
            rugby, and why our emblem runs out with the players every match
            day.
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            We also welcome sponsorship requests for:
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {SPONSORSHIP_REQUEST_TYPES.map((type) => (
              <li
                key={type}
                className="border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/80"
              >
                {type}
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="group mt-7 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-label text-gold hover:text-white"
          >
            Request sponsorship
            <svg
              width="18"
              height="8"
              viewBox="0 0 20 8"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-300 ease-muni group-hover:translate-x-1"
            >
              <path d="M0 4h17M15 1l3 3-3 3" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
