"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { NAV_LINKS } from "@/data/site";

/**
 * Primary navigation.
 *
 * Deliberately plain: a solid white bar that is always the same height and
 * colour, so it never animates, never changes on scroll and never sits on top
 * of the content it is covering. The current page is marked so you always know
 * where you are.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white">
      <div className="frame">
        <nav
          className="flex items-center justify-between gap-6 py-4"
          aria-label="Primary"
        >
          <Logo />

          {/* Desktop links */}
          <div className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isCurrent(link.href) ? "page" : undefined}
                className={`border-b-2 pb-1 text-sm font-semibold duration-300 ${
                  isCurrent(link.href)
                    ? "border-gold text-ink"
                    : "border-transparent text-charcoal hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-primary px-6 py-3 text-[12px]">
              Request an Enquiry
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="relative block h-4 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-ink transition-all ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-0.5 w-6 -translate-y-1/2 bg-ink ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-ink transition-all ${
                  open ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </nav>
      </div>

      {/* Mobile panel — a simple list under the bar, not a full-screen takeover.
          Kept mounted and collapsed so it eases open AND closed; `invisible`
          takes it out of the tab order while it is shut. */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-black/10 bg-white transition-all duration-300 ease-muni lg:hidden ${
          open
            ? "visible max-h-[32rem] border-t opacity-100"
            : "invisible max-h-0 opacity-0"
        }`}
      >
        <div className="frame py-2">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="border-b border-black/5 last:border-0">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? undefined : -1}
                  aria-current={isCurrent(link.href) ? "page" : undefined}
                  className={`block py-4 text-base font-semibold ${
                    isCurrent(link.href) ? "text-gold-600" : "text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            tabIndex={open ? undefined : -1}
            className="btn-primary my-4 w-full"
          >
            Request an Enquiry
          </Link>
        </div>
      </div>
    </header>
  );
}
