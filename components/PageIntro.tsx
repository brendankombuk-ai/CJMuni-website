import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { label: string; href?: string };

/**
 * Interior page header: breadcrumb, label, title, short intro.
 *
 * Light and flat to match the rest of the site. The navigation is sticky
 * rather than floating over the page, so this needs no extra top padding to
 * clear it.
 */
export function PageIntro({
  eyebrow,
  title,
  intro,
  crumbs,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: Crumb[];
}) {
  return (
    <header className="border-b border-black/10 bg-white">
      <div className="frame py-12 sm:py-16">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-label text-charcoal-light">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-ink">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-charcoal">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 ? (
                    <span className="text-black/25">/</span>
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <p className="text-[11px] font-bold uppercase tracking-label text-gold-600">
          {eyebrow}
        </p>

        <h1 className="mt-4 max-w-3xl font-heading text-3xl font-extrabold uppercase leading-[1.06] tracking-headline text-ink sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        {intro ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal sm:text-lg">
            {intro}
          </p>
        ) : null}
      </div>
    </header>
  );
}
