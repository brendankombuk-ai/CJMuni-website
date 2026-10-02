import type { ReactNode } from "react";
import { SmartImage } from "@/components/SmartImage";
import { Atmosphere, atmosphere } from "@/components/Atmosphere";
import { ImageCredit } from "@/components/community/ImageCredit";
import {
  COMMUNITY_FOCUS_AREAS,
  COMMUNITY_IMAGES,
  type CommunityFocusIcon,
} from "@/data/community";

/**
 * Where CJ MUNI contributes: one photograph beside the six focus areas. The
 * portrait crop on large screens is sized to match the height of the list,
 * so neither column runs on alone; below that the photograph leads.
 */
export function CommunityFocusAreas() {
  const image = COMMUNITY_IMAGES.celebration;

  return (
    <section className={atmosphere("alt", "seam-top-quiet py-16 sm:py-20 lg:py-24")}>
      <Atmosphere variant="alt" />

      <div className="frame grid gap-10 lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-16">
        <figure>
          <div className="media-frame aspect-[4/3] w-full bg-ink-800 lg:aspect-[4/5]">
            <SmartImage
              src={image.src}
              alt={image.alt}
              slotLabel={image.src}
              sizes="(min-width: 1024px) 38vw, 100vw"
            />
          </div>
          <figcaption className="mt-3">
            <p className="text-[13px] leading-relaxed text-white/70">
              Community celebration at the opening of a new school, Wairavanua,
              PNG.
            </p>
            <ImageCredit credit={image.credit} />
          </figcaption>
        </figure>

        <div>
          <p className="eyebrow text-white/70">Where we contribute</p>
          <h2 className="mt-3.5 font-heading text-2xl font-extrabold uppercase leading-[1.12] tracking-headline text-white sm:text-3xl lg:text-[2.125rem]">
            Practical support, close to home.
          </h2>
          <p className="mt-3.5 max-w-[52ch] text-base leading-relaxed text-white/70">
            Six areas where we put people, resources and capability to work in
            the communities around us.
          </p>

          <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
            {COMMUNITY_FOCUS_AREAS.map((area) => (
              <li
                key={area.title}
                className="grid grid-cols-[2.5rem_1fr] grid-rows-[auto_1fr] gap-x-4 border-t border-white/10 py-[1.375rem]"
              >
                <span className="row-span-2 flex h-10 w-10 items-center justify-center border border-gold/35 bg-gold/5 text-gold">
                  <FocusIcon icon={area.icon} />
                </span>
                <h3 className="pt-0.5 font-heading text-[15px] font-extrabold uppercase leading-snug tracking-headline text-white">
                  {area.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                  {area.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * Line icons for the focus areas: one 24-unit grid, one stroke weight, drawn
 * in currentColor so they take the gold of the tile they sit in.
 */
const ICON_PATHS: Record<CommunityFocusIcon, ReactNode> = {
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15.5 14.2c2.9.3 5.5 2.7 5.5 5.8" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M8.6 13.1 7 21l5-2.6 5 2.6-1.6-7.9" />
    </>
  ),
  village: (
    <>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v6h14v-6" />
      <path d="M7 16v4M17 16v4M10 16v-3h4v3" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5.5" r="2.5" />
      <circle cx="5" cy="18" r="2.5" />
      <circle cx="19" cy="18" r="2.5" />
      <path d="M10.8 7.7 6.2 15.8M13.2 7.7l4.6 8.1M7.5 18h9" />
    </>
  ),
  bridge: (
    <>
      <path d="M2 14h20" />
      <path d="M4 14c2-4.5 5-6.5 8-6.5s6 2 8 6.5" />
      <path d="M8 14V9.6M12 14V7.5M16 14V9.6" />
      <path d="M4 14v5M20 14v5" />
    </>
  ),
  growth: (
    <>
      <path d="M12 21v-9" />
      <path d="M12 12c0-4 3-7 8-7 0 5-3 7-8 7z" />
      <path d="M12 15c0-3-2.5-5.5-7-5.5 0 4 2.5 5.5 7 5.5z" />
    </>
  ),
};

function FocusIcon({ icon }: { icon: CommunityFocusIcon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICON_PATHS[icon]}
    </svg>
  );
}
