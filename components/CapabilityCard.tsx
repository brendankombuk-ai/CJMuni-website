import Link from "next/link";
import type { Capability } from "@/data/capabilities";
import { SmartImage } from "@/components/SmartImage";

/**
 * A single capability card. Structured so it can link to a dedicated
 * /capabilities/[slug] service page in phase two without markup changes.
 *
 * Reads Problem -> Capability -> Evidence -> Outcome -> CTA:
 *  - number + title  ...... the capability
 *  - description ........... what it solves / delivers
 *  - points ............... supporting evidence (where source material allows)
 *  - arrow + link ......... the CTA into the service page
 */
export function CapabilityCard({ capability }: { capability: Capability }) {
  return (
    <Link
      href={`/capabilities/${capability.slug}`}
      className="group relative flex flex-col overflow-hidden border border-white/10 bg-ink-800 transition-colors duration-500 ease-muni hover:border-gold/50 focus-visible:border-gold"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 ease-muni group-hover:scale-105">
          <SmartImage
            src={capability.image}
            alt={capability.imageAlt}
            slotLabel={capability.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="absolute inset-0 bg-ink/55 transition-colors duration-500 group-hover:bg-ink/35" />
        <span className="absolute left-5 top-4 font-heading text-3xl font-extrabold text-white/90 transition-transform duration-500 ease-muni group-hover:-translate-y-0.5 group-hover:text-gold">
          {capability.number}
        </span>
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col p-6">
        {/* Gold rule that expands on hover */}
        <span className="mb-5 block h-px w-10 bg-gold transition-all duration-500 ease-muni group-hover:w-20" />

        <h3 className="font-heading text-lg font-bold uppercase leading-tight tracking-headline text-white">
          {capability.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/60">
          {capability.description}
        </p>

        <span className="mt-6 inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-label text-white/70 transition-colors group-hover:text-gold">
          {capability.highLevelOnly ? "Overview" : "Explore capability"}
          <svg
            width="22"
            height="8"
            viewBox="0 0 22 8"
            fill="none"
            className="transition-transform duration-500 ease-muni group-hover:translate-x-1.5"
            aria-hidden="true"
          >
            <path d="M0 4h20M17 1l3 3-3 3" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
