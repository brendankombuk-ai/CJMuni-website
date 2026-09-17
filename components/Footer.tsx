import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CAPABILITIES } from "@/data/capabilities";
import { CONTACT, NAV_LINKS } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink-900">
      <div className="frame py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo tone="light" href="/" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              A Papua New Guinea-focused industrial partner connecting products,
              technical capability, field execution, marine support and
              supply-chain delivery.
            </p>
            <p className="mt-6 font-sans text-[11px] font-bold uppercase tracking-label text-gold">
              The Power of Partnership
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h2 className="font-sans text-[11px] font-bold uppercase tracking-label text-white/40">
              Navigate
            </h2>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products & services */}
          <nav aria-label="Products and services">
            <h2 className="font-sans text-[11px] font-bold uppercase tracking-label text-white/40">
              Products &amp; Services
            </h2>
            <ul className="mt-4 space-y-2.5">
              {CAPABILITIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/capabilities/${c.slug}`}
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="font-sans text-[11px] font-bold uppercase tracking-label text-white/40">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-gold">
                  {CONTACT.email}
                </a>
              </li>
              {CONTACT.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-gold"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li className="text-white/55">{CONTACT.location}</li>
              <li className="text-white/55">{CONTACT.postal}</li>
            </ul>
            <Link href="/#contact" className="btn-outline-light mt-6 text-[11px]">
              Request an Enquiry
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
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
