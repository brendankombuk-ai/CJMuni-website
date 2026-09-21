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
  /**
   * Cells that finish the last row.
   *
   * The hairline lattice is the list's own background showing through a 1px
   * gap, so it only works while every row is full — a row that runs short
   * leaves the gap colour filling the whole missing cell, which reads as a
   * lit rectangle where a card should be. Five services in a three-column
   * grid do exactly that.
   *
   * The count differs per breakpoint, so each spacer is shown only at the
   * widths that actually need it rather than assuming one number covers both.
   */
  const spacersFor = (cols: number) => (cols - (items.length % cols)) % cols;
  const atTwo = spacersFor(2);
  const atThree = spacersFor(columns);
  const spacers = Math.max(atTwo, atThree);

  return (
    <div>
      <h3 className="eyebrow text-white/70">{heading}</h3>

      {/* The hairline grid is the same as it was — a 1px gap showing the
          border colour through. What changed is the cell: a graphite gradient
          instead of a flat fill, and a gold wash that fades in on hover. */}
      <ul
        className={`mt-5 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 ${
          columns === 3 ? "lg:grid-cols-3" : ""
        }`}
      >
        {items.map((capability) => (
          <li key={capability.slug} className="cell cell-interactive">
            <Link
              href={`/capabilities/${capability.slug}`}
              className="group relative z-[1] flex h-full flex-col p-6"
            >
              <h4 className="font-heading text-base font-bold uppercase leading-tight tracking-headline text-white">
                {capability.title}
              </h4>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-white/70">
                {capability.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-label text-gold">
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

        {Array.from({ length: spacers }, (_, i) => (
          <li
            key={`spacer-${i}`}
            aria-hidden="true"
            className={`cell ${i < atTwo ? "hidden sm:block" : "hidden"} ${
              i < atThree ? "lg:block" : "lg:hidden"
            }`}
          />
        ))}
      </ul>
    </div>
  );
}
