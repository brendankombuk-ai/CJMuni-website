import Link from "next/link";
import type { Capability } from "@/data/capabilities";
import { SmartImage } from "@/components/SmartImage";

/**
 * A capability card: photo, name, one-line description, and a link into the
 * detail page.
 *
 * Layered into the page rather than sitting on it: a graphite surface with a
 * lit top edge, the photograph vignetted into that surface, and on hover the
 * whole card lifts three pixels while its border warms towards gold. The
 * movement is transform-and-opacity only, so it composites.
 */
export function CapabilityCard({ capability }: { capability: Capability }) {
  return (
    <Link
      href={`/capabilities/${capability.slug}`}
      className="panel-interactive group flex w-full flex-col"
    >
      <div className="media-frame aspect-[16/10] w-full border-0 border-b border-white/10 bg-ink-800 shadow-none">
        {/* Gentle push in on hover so the card reads as interactive. */}
        <div className="absolute inset-0 transition-transform duration-500 ease-muni group-hover:scale-[1.04]">
          <SmartImage
            src={capability.image}
            alt={capability.imageAlt}
            slotLabel={capability.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      <div className="relative z-[1] flex flex-1 flex-col p-6">
        <h3 className="font-heading text-lg font-bold uppercase leading-tight tracking-headline text-white">
          {capability.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">
          {capability.description}
        </p>

        <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-label text-gold">
          {capability.highLevelOnly ? "Overview" : "Read more"}
          <svg
            width="18"
            height="8"
            viewBox="0 0 22 8"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-300 ease-muni group-hover:translate-x-1"
          >
            <path d="M0 4h20M17 1l3 3-3 3" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
