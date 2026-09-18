import Link from "next/link";
import { CONTACT } from "@/data/site";

/**
 * Closing call to action. One dark band at the foot of a light page so the
 * next step is obvious without another full contact form on every page.
 */
export function ContactBand() {
  return (
    <section className="bg-ink py-16 sm:py-20">
      <div className="frame grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <h2 className="font-heading text-2xl font-extrabold uppercase leading-tight tracking-headline text-white sm:text-3xl">
            Talk to us about your project.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
            Tell us what you need supplied, drilled, shifted or shipped and we
            will come back to you with the right people and product.
          </p>
          <Link href="/contact" className="btn-primary mt-8">
            Request an Enquiry
          </Link>
        </div>

        <ul className="space-y-3 text-sm text-white/70 lg:border-l lg:border-white/15 lg:pl-10">
          <li>
            <a
              href={`mailto:${CONTACT.email}`}
              className="font-semibold text-white hover:text-gold"
            >
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
          <li className="pt-2 text-white/55">{CONTACT.location}</li>
        </ul>
      </div>
    </section>
  );
}
