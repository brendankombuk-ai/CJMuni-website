import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { EnquiryForm } from "@/components/EnquiryForm";
import { CONTACT } from "@/data/site";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink-900 py-24 sm:py-32">
      <div className="grid-overlay absolute inset-0 opacity-30" />
      <div className="frame relative">
        <SectionHeading
          tone="light"
          eyebrow="Enquiries"
          title="Let's build the right partnership."
          intro="Talk to MUNI about your next project, supply requirement or industrial capability need."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="space-y-8">
              <ContactBlock label="Email">
                <a href={`mailto:${CONTACT.email}`} className="text-white transition-colors hover:text-gold">
                  {CONTACT.email}
                </a>
              </ContactBlock>

              <ContactBlock label="Phone">
                <ul className="space-y-1">
                  {CONTACT.phones.map((phone) => (
                    <li key={phone}>
                      <a
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="text-white transition-colors hover:text-gold"
                      >
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </ContactBlock>

              <ContactBlock label="Location">
                <p className="text-white/80">{CONTACT.location}</p>
              </ContactBlock>

              <ContactBlock label="Postal">
                <p className="text-white/80">{CONTACT.postal}</p>
              </ContactBlock>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="border border-white/10 bg-ink-800 p-6 sm:p-8">
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-l border-gold/50 pl-5">
      <span className="font-sans text-[11px] font-bold uppercase tracking-label text-white/50">
        {label}
      </span>
      <div className="mt-2 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
