import Link from "next/link";
import { Reveal } from "@/components/Reveal";

/** Closing statement — the brand promise, the idea, and the enquiry CTA. */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="grid-overlay absolute inset-0 opacity-25" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rotate-45 border border-gold/20" />

      <div className="frame relative text-center">
        <Reveal>
          <h2 className="font-heading text-4xl font-extrabold uppercase leading-[1.03] tracking-headline text-white sm:text-5xl lg:text-6xl">
            Connected Capability.
            <br />
            <span className="text-gold">Reliable Delivery.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-6 font-sans text-sm font-bold uppercase tracking-label text-white/60">
            The Power of Partnership
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-10 flex justify-center">
            <Link href="/#contact" className="btn-primary">
              Request an Enquiry
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
