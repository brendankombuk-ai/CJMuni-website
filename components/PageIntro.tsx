import Link from "next/link";
import type { ReactNode } from "react";
import {
  Atmosphere,
  atmosphere,
  type AtmosphereVariant,
} from "@/components/Atmosphere";

type Crumb = { label: string; href?: string };

/**
 * Interior page header: breadcrumb, label, title, short intro.
 *
 * Structurally unchanged — the navigation is sticky rather than floating over
 * the page, so this still needs no extra top padding to clear it. What it has
 * now is a light source: the quietest atmosphere in the system by default, or
 * the atmosphere of whatever capability the page is about, so the header and
 * the section beneath it read as one environment rather than two panels.
 */
export function PageIntro({
  eyebrow,
  title,
  intro,
  crumbs,
  variant = "page-intro",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: Crumb[];
  /** Overridden on capability pages so the header carries that capability's light. */
  variant?: AtmosphereVariant;
}) {
  return (
    <header className={atmosphere(variant, "border-b border-white/5")}>
      <Atmosphere variant={variant} />

      <div className="frame py-12 sm:py-16">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-label text-white/50">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white/70">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 ? (
                    <span className="text-white/40" aria-hidden="true">
                      /
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <p className="text-[11px] font-bold uppercase tracking-label text-gold">
          {eyebrow}
        </p>

        <div
          className="mt-5 h-px w-32 bg-gradient-to-r from-gold/60 to-transparent"
          aria-hidden="true"
        />

        <h1 className="mt-6 max-w-3xl font-heading text-3xl font-extrabold uppercase leading-[1.06] tracking-headline text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        {intro ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {intro}
          </p>
        ) : null}
      </div>
    </header>
  );
}
