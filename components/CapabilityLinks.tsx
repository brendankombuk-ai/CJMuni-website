import Link from "next/link";
import type { Capability } from "@/data/capabilities";

/**
 * Compact, text-only capability links used on the home page.
 *
 * The home page's job is to point people at the right page quickly, so these
 * carry no photography — just the name, one line of explanation and a clear
 * destination. The full cards with imagery live on /capabilities.
 */
export function CapabilityLinks({
  heading,
  items,
  columns = 3,
}: {
  heading: string;
  items: Capability[];
  columns?: 2 | 3;
}) {
  return (
    <div>
      <h3 className="font-sans text-[11px] font-bold uppercase tracking-label text-charcoal">
        {heading}
      </h3>

      <ul
        className={`mt-5 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2 ${
          columns === 3 ? "lg:grid-cols-3" : ""
        }`}
      >
        {items.map((capability) => (
          <li key={capability.slug} className="bg-white">
            <Link
              href={`/capabilities/${capability.slug}`}
              className="group flex h-full flex-col p-6 duration-300 hover:bg-black/[0.03]"
            >
              <h4 className="font-heading text-base font-bold uppercase leading-tight tracking-headline text-ink">
                {capability.title}
              </h4>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-charcoal">
                {capability.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-label text-gold-600">
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
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
