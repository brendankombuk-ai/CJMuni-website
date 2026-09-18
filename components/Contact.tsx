import { EnquiryForm } from "@/components/EnquiryForm";
import { CONTACT } from "@/data/site";

/**
 * Contact details beside the enquiry form. Details first so someone who just
 * wants to phone or email does not have to read past a form to find them.
 */
export function Contact() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="frame grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="space-y-7">
          <ContactBlock label="Email">
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-ink underline-offset-4 hover:text-gold-600 hover:underline"
            >
              {CONTACT.email}
            </a>
          </ContactBlock>

          <ContactBlock label="Phone">
            <ul className="space-y-1.5">
              {CONTACT.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="text-ink underline-offset-4 hover:text-gold-600 hover:underline"
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </ContactBlock>

          <ContactBlock label="Location">
            <p className="text-charcoal">{CONTACT.location}</p>
          </ContactBlock>

          <ContactBlock label="Postal">
            <p className="text-charcoal">{CONTACT.postal}</p>
          </ContactBlock>
        </div>

        <div className="border border-black/10 bg-white p-6 sm:p-8">
          <h2 className="font-heading text-xl font-extrabold uppercase tracking-headline text-ink">
            Send an enquiry
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-charcoal">
            Tell us what you need and we will come back to you.
          </p>
          <div className="mt-7">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="text-[11px] font-bold uppercase tracking-label text-charcoal-light">
        {label}
      </span>
      <div className="mt-2 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
