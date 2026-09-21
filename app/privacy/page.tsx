import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageIntro } from "@/components/PageIntro";
import { CONTACT } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How CJ MUNI handles the details you send through this website: what the enquiry form collects, who it is sent to, how long it is kept and how to have it removed.",
  alternates: { canonical: "/privacy" },
};

/**
 * Privacy policy.
 *
 * Written from what the site actually does, not from a template. Every claim
 * here is checkable against the code: the enquiry route is the only thing that
 * collects anything, Resend is the only third party it touches, the site sets
 * no cookies, and nothing is loaded from another origin — the fonts are served
 * from our own domain rather than from Google.
 *
 * If any of that changes — analytics, an embedded map, a chat widget, a CRM
 * behind the form — this page has to change with it. That is the point of
 * describing the real behaviour rather than covering every eventuality.
 */

/** Last substantive review of this text. Update when the wording changes. */
const UPDATED = "22 September 2026";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PageIntro
          eyebrow="Privacy"
          title="Privacy Policy"
          intro="What this website collects, who it goes to, and how to have it removed."
          crumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
        />

        <section className="frame py-14 sm:py-20">
          <div className="max-w-3xl space-y-12">
            <p className="text-sm text-white/50">Last updated {UPDATED}</p>

            <Block title="The short version">
              <P>
                This website has one form on it. If you fill it in, your enquiry
                is emailed to CJ MUNI and read by the people who can answer it.
                That is the only personal information the site collects.
              </P>
              <P>
                There are no cookies, no analytics, no advertising trackers and
                no third-party embeds. Nothing on these pages is loaded from
                another company&rsquo;s servers — the fonts are served from this
                domain rather than from Google — so browsing the site does not
                report your visit to anyone else.
              </P>
            </Block>

            <Block title="What the enquiry form collects">
              <P>When you submit an enquiry we receive:</P>
              <List
                items={[
                  "Your name",
                  "Your company",
                  "Your email address",
                  "Your phone number, if you choose to give one — the field is optional",
                  "The product or service you selected",
                  "The message you wrote",
                ]}
              />
              <P>
                We use these only to understand your enquiry and respond to it.
                We do not add you to a mailing list, and we do not send you
                marketing you did not ask for.
              </P>
            </Block>

            <Block title="Who it is sent to">
              <P>
                The enquiry is delivered to{" "}
                <MailLink /> by Resend, an email delivery provider, which
                processes the message solely in order to deliver it. From there
                it sits in our inbox like any other email. It is not copied into
                a customer database or shared with anyone outside CJ MUNI,
                unless answering you genuinely requires it — for example passing
                a supply question to the relevant part of our own business.
              </P>
              <P>
                We may also disclose information where the law requires it of
                us.
              </P>
            </Block>

            <Block title="How long it is kept">
              <P>
                Enquiries are kept while we are dealing with them, and
                afterwards as ordinary business correspondence, for no longer
                than we have a reason to hold them. If you would like your
                enquiry deleted, ask us and we will remove it.
              </P>
            </Block>

            <Block title="Technical records">
              <P>
                Our hosting provider, Vercel, keeps standard server logs of
                requests to the site, which include IP addresses. These are used
                to operate and secure the service, not to build a profile of
                you.
              </P>
              <P>
                The enquiry form is limited to a small number of submissions
                from the same connection in a short period, to stop automated
                abuse. That check holds an IP address briefly in memory and
                writes it nowhere.
              </P>
              <P>
                If an enquiry cannot be delivered, we record that it failed,
                along with the name, company and email address on it, so we can
                reach you by hand rather than lose your message. We do not log
                what you wrote in the message itself.
              </P>
            </Block>

            <Block title="Your choices">
              <P>
                You can ask us what we hold about you, ask us to correct it, or
                ask us to delete it. Write to <MailLink /> and we will deal with
                it.
              </P>
              <P>
                You are never obliged to use the form. Our email address, phone
                number and postal address are on the{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-gold underline underline-offset-4 hover:text-gold-400"
                >
                  contact page
                </Link>{" "}
                if you would rather reach us directly.
              </P>
            </Block>

            <Block title="Changes">
              <P>
                If we add anything to this site that collects or shares more
                than is described here, this page will be updated before it goes
                live.
              </P>
            </Block>

            <Block title="Contact">
              <P>
                CJ MUNI Limited
                <br />
                {CONTACT.location}
                <br />
                {CONTACT.postal}
                <br />
                <MailLink />
              </P>
            </Block>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function MailLink() {
  return (
    <a
      href={`mailto:${CONTACT.email}`}
      className="font-semibold text-gold underline underline-offset-4 hover:text-gold-400"
    >
      {CONTACT.email}
    </a>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-heading text-xl font-extrabold uppercase tracking-headline text-white sm:text-2xl">
        {title}
      </h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-base leading-relaxed text-white/70">{children}</p>;
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-base leading-relaxed text-white/70"
        >
          <span
            aria-hidden="true"
            className="mt-2.5 block h-px w-4 shrink-0 bg-gold"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}
