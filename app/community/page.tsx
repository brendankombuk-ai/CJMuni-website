import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Atmosphere, atmosphere } from "@/components/Atmosphere";
import { CommunityHero } from "@/components/community/CommunityHero";
import { CommunityApproach } from "@/components/community/CommunityApproach";
import { CommunityFocusAreas } from "@/components/community/CommunityFocusAreas";
import { CommunitySponsorship } from "@/components/community/CommunitySponsorship";
import { BRAND, CONTACT } from "@/data/site";

/**
 * Community.
 *
 * CJ MUNI's commitment to the communities it works alongside: the commitment
 * itself, how it is kept, where it is put to work, and the sponsorship that
 * already carries the emblem — then an open invitation. Content lives in
 * data/community.ts.
 */
export const metadata: Metadata = {
  title: "Community",
  description:
    "CJ MUNI works alongside communities, local organisations, associations and rural villages across Papua New Guinea through partnerships, sponsorships and local initiatives.",
  alternates: { canonical: "/community" },
};

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <CommunityHero />
        <CommunityApproach />
        <CommunityFocusAreas />
        <CommunitySponsorship />

        <section className={atmosphere("contact", "py-16 sm:py-20 lg:py-24")}>
          <Atmosphere variant="contact" />

          <div className="frame grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-label text-gold">
                {BRAND.idea}
              </p>
              <h2 className="mt-4 max-w-[20ch] font-heading text-2xl font-extrabold uppercase leading-[1.1] tracking-headline text-white sm:text-3xl xl:text-4xl">
                Have a community initiative we should know about?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">
                If you represent a community group, association, school or local
                organisation, we’d like to hear from you. Tell us what you’re
                working on, who it serves and how we could help.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap lg:max-w-[22rem] lg:flex-col lg:justify-self-end">
              <Link href="/contact" className="btn-primary">
                Start a conversation
              </Link>
              <Link href="/contact" className="btn-outline-light">
                Request sponsorship
              </Link>
              <p className="mt-1.5 text-sm text-white/60 sm:basis-full lg:basis-auto">
                Or email{" "}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="font-semibold text-white hover:text-gold"
                >
                  {CONTACT.email}
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
