import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

type Crumb = { label: string; href?: string };

/**
 * Dark intro band for interior (phase-two) pages. Sits behind the fixed nav
 * and gives it a solid backdrop so the header reads without a full hero.
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
    <header className="relative overflow-hidden bg-ink pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div className="grid-overlay absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -right-20 top-10 h-56 w-56 rotate-45 border border-gold/20" />
      <div className="frame relative">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-label text-white/45">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-gold">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white/70">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 ? <span className="text-gold">/</span> : null}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <Reveal>
          <span className="eyebrow text-gold">{eyebrow}</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-extrabold uppercase leading-[1.03] tracking-headline text-white sm:text-5xl">
            {title}
          </h1>
        </Reveal>
        {intro ? (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {intro}
            </p>
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}
