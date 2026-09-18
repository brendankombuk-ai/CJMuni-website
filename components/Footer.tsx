import Link from "next/link";
import { CAPABILITIES } from "@/data/capabilities";
import { CONTACT, NAV_LINKS } from "@/data/site";

/**
 * Footer. Three plain columns of links and the verified contact details —
 * the same destinations as the main navigation, so there is nothing here that
 * cannot be reached from the top of the page too.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink-900">
      <div className="frame py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <nav aria-label="Footer">
            <h2 className="text-[11px] font-bold uppercase tracking-label text-white/40">
              Pages
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-white/70 hover:text-gold">
                  Home
                </Link>
              </li>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Products and services">
            <h2 className="text-[11px] font-bold uppercase tracking-label text-white/40">
              Products &amp; Services
            </h2>
            <ul className="mt-4 space-y-2.5">
              {CAPABILITIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/capabilities/${c.slug}`}
                    className="text-sm text-white/70 hover:text-gold"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/products"
                  className="text-sm font-semibold text-white/80 hover:text-gold"
                >
                  Orica Products
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-label text-white/40">
              Contact
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-gold">
                  {CONTACT.email}
                </a>
              </li>
              {CONTACT.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="hover:text-gold"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li className="pt-1 text-white/50">{CONTACT.location}</li>
              <li className="text-white/50">{CONTACT.postal}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            &copy; {year} CJ MUNI. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Connected capability. Reliable delivery.
          </p>
        </div>
      </div>
    </footer>
  );
}
